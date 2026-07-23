import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy Firebase Firestore initialization helper
let dbInstance: ReturnType<typeof getFirestore> | null = null;

function getFirestoreDb() {
  if (dbInstance) return dbInstance;
  if (getApps().length > 0) {
    dbInstance = getFirestore();
    return dbInstance;
  }

  try {
    let credential;
    if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
      const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/^"|"$/g, '').replace(/\\n/g, '\n');
      credential = cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      });
    } else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const serviceAccount = typeof process.env.FIREBASE_SERVICE_ACCOUNT === 'string'
        ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
        : process.env.FIREBASE_SERVICE_ACCOUNT;
      credential = cert(serviceAccount);
    } else {
      const filePath = path.join(process.cwd(), "firebase-credentials.json");
      if (fs.existsSync(filePath)) {
        const serviceAccount = JSON.parse(fs.readFileSync(filePath, "utf8"));
        credential = cert(serviceAccount);
      }
    }

    if (credential) {
      initializeApp({ credential });
      dbInstance = getFirestore();
      console.log("🔥 Firebase Admin inicializado com sucesso!");
      return dbInstance;
    }
  } catch (err) {
    console.error("Erro ao inicializar Firebase Admin:", err);
  }
  return null;
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Endpoint de diagnóstico do Firebase Firestore
app.get("/api/firebase/status", async (req, res) => {
  try {
    const db = getFirestoreDb();
    if (!db) {
      return res.status(503).json({
        connected: false,
        message: "Firebase não configurado. Adicione a variável FIREBASE_SERVICE_ACCOUNT no Render (Opção 1) ou crie o ficheiro firebase-credentials.json (Opção 2)."
      });
    }
    // Test write/read ping
    const pingRef = db.collection("_healthcheck").doc("ping");
    await pingRef.set({ timestamp: new Date().toISOString(), status: "active" });
    const doc = await pingRef.get();
    res.json({
      connected: true,
      projectId: "study-35616",
      message: "Ligação ao Firestore estabelecida com sucesso!",
      data: doc.data()
    });
  } catch (error: any) {
    console.error("Erro no healthcheck do Firestore:", error);
    res.status(500).json({
      connected: false,
      error: error.message || "Erro de ligação ao Firestore."
    });
  }
});

// Endpoint to generate 3 quiz questions based ONLY on the provided article content
app.post("/api/quiz/generate", async (req, res) => {
  try {
    const { articleCode, articleTitle, content } = req.body;
    if (!content) {
      return res.status(400).json({ error: "Conteúdo do artigo não foi fornecido." });
    }

    const prompt = `Gere um quiz com EXATAMENTE 3 perguntas de escolha múltipla (com 4 opções cada, indexadas de 0 a 3) baseado EXCLUSIVAMENTE e APENAS no seguinte texto do artigo legal ("${articleCode} - ${articleTitle}"):

---
${content}
---

Instruções estritas:
1. Todas as perguntas devem ser diretamente respondíveis apenas com as informações presentes no texto acima.
2. Cada pergunta deve ter 4 opções plausíveis de resposta (A, B, C, D).
3. Indique o índice da resposta correta (0 para A, 1 para B, 2 para C, 3 para D).
4. Forneça uma explicação detalhada fundamentada no texto do artigo.
5. As perguntas devem testar o conhecimento importante para candidatos ao concurso público do Ministério do Interior (MININT) de Angola.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: "Você é um elaborador especialista de exames para o Ministério do Interior (MININT) de Angola. Crie questões precisas baseadas estritamente no texto fornecido.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  correctAnswer: { type: Type.INTEGER },
                  explanation: { type: Type.STRING }
                },
                required: ["id", "question", "options", "correctAnswer", "explanation"]
              }
            }
          },
          required: ["questions"]
        }
      }
    });

    const jsonText = response.text || "{}";
    const data = JSON.parse(jsonText);
    res.json(data);
  } catch (error: any) {
    console.error("Erro ao gerar quiz no servidor com Gemini:", error);
    res.status(500).json({ error: "Não foi possível gerar o quiz com a IA no momento. Tente novamente." });
  }
});

// Endpoint to validate a specific answer with Gemini explanation
app.post("/api/quiz/validate", async (req, res) => {
  try {
    const { articleTitle, questionText, selectedOptionText, isCorrect, explanation, articleContent } = req.body;

    const prompt = `Valide a resposta dada pelo estudante para a seguinte questão de concurso do MININT:
Artigo: "${articleTitle}"
Conteúdo do artigo: "${articleContent}"
Pergunta: "${questionText}"
Resposta do estudante: "${selectedOptionText}"
Gabarito correto: ${isCorrect ? "O estudante acertou!" : "O estudante errou."}
Explicação base: "${explanation}"

Por favor, escreva uma breve validação e comentário pedagógico (2-3 frases) fundamentado estritamente no artigo, explicando por que a opção escolhida está ${isCorrect ? "correta e qual o ponto chave a memorizar" : "incorreta e qual o conceito correto no artigo"}.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: "Você é um professor mentor do concurso do MININT de Angola. Seja claro, encorajador e direto ao ponto.",
      }
    });

    res.json({ feedback: response.text || "Validação concluída." });
  } catch (error: any) {
    console.error("Erro ao validar resposta com Gemini:", error);
    res.status(500).json({ error: "Erro ao validar resposta." });
  }
});

// Endpoint to extract key concept flashcards from article content using Gemini AI
app.post("/api/flashcards/extract", async (req, res) => {
  try {
    const { articleCode, articleTitle, content } = req.body;
    if (!content) {
      return res.status(400).json({ error: "Conteúdo do artigo não foi fornecido." });
    }

    const prompt = `Extraia os conceitos-chave cruciais e crie de 4 a 6 flashcards de memorização técnica para o concurso do MININT de Angola baseado EXCLUSIVAMENTE neste artigo ("${articleCode} - ${articleTitle}"):

---
${content}
---

Instruções:
- Crie cartões com "front" (uma pergunta direta ou termo/conceito-chave a definir) e "back" (a resposta precisa, prazo, atribuição ou fundamentação jurídica segundo o texto).
- Foque em prazos, competências, princípios, proibições, sanções ou deveres mencionados no artigo.
- Inclua a referência do artigo.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: "Você é um especialista em técnicas de repetição espaçada e memorização para concursos públicos jurídicos e policiais de Angola.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            flashcards: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  front: { type: Type.STRING },
                  back: { type: Type.STRING },
                  articleRef: { type: Type.STRING },
                  tag: { type: Type.STRING }
                },
                required: ["id", "front", "back"]
              }
            }
          },
          required: ["flashcards"]
        }
      }
    });

    const jsonText = response.text || "{}";
    const data = JSON.parse(jsonText);
    res.json(data);
  } catch (error: any) {
    console.error("Erro ao extrair flashcards com Gemini:", error);
    res.status(500).json({ error: "Não foi possível extrair flashcards via IA." });
  }
});

// Vite middleware setup
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
