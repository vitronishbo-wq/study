import { ALL_MODULES, getAllArticlesInModule } from './index';
import { ALL_CONCURSOS } from './concursos';
import {
  ConceptArticle,
  DocumentFile,
  DiplomaModule,
  SmartQuizQuestion,
  Course,
  Certificate,
  ConcursoEntry,
  CentralRepositoryData
} from '../types/minint';

/**
 * ----------------------------------------------------------------------------
 * 17. REPOSITÓRIO ÚNICO E CENTRALIZADO DE CONTEÚDOS
 * (Legislação, Documentos, Materiais, Perguntas, Respostas, Simulados)
 * ----------------------------------------------------------------------------
 */

// 1. Legislação Unificada
export function getCentralLegislation(): ConceptArticle[] {
  const allArticles: ConceptArticle[] = [];
  ALL_MODULES.forEach(mod => {
    const articles = getAllArticlesInModule(mod);
    allArticles.push(...articles);
  });
  return allArticles;
}

// 2. Documentos Oficiais, Diários da República & Editais
export const CENTRAL_DOCUMENTS: DocumentFile[] = [
  {
    id: 'doc-cra-2010',
    title: 'Constituição da República de Angola (CRA 2010 com Revisão de 2021)',
    type: 'diario_republica',
    sizeFormatted: '2.4 MB',
    category: 'Direito Constitucional',
    lastUpdated: '2026-01-15'
  },
  {
    id: 'doc-estatuto-pna',
    title: 'Decreto Presidencial n.º 152/19 — Regulamento de Carreiras da PNA',
    type: 'diario_republica',
    sizeFormatted: '1.8 MB',
    category: 'Segurança Pública',
    lastUpdated: '2026-02-10'
  },
  {
    id: 'doc-dpa-21-prov',
    title: 'Lei n.º 14/24 — Nova Divisão Político-Administrativa de Angola (21 Províncias)',
    type: 'pdf',
    sizeFormatted: '3.1 MB',
    category: 'Administração Pública',
    lastUpdated: '2026-03-01'
  },
  {
    id: 'doc-pago-carreiras',
    title: 'Lei n.º 26/22 — Lei Geral do Trabalho & Estatuto dos Funcionários Públicos',
    type: 'diario_republica',
    sizeFormatted: '2.9 MB',
    category: 'Direito Administrativo',
    lastUpdated: '2026-01-20'
  },
  {
    id: 'doc-edital-minint-2026',
    title: 'Edital de Abertura do Concurso Público MININT & PNA 2026',
    type: 'edital',
    sizeFormatted: '1.2 MB',
    category: 'Concursos Públicos',
    lastUpdated: '2026-05-12'
  }
];

// 3. Perguntas e Respostas Unificadas (QA Pairs)
export function getCentralQuestionsAndAnswers(): { id: string; question: string; answer: string; module: string }[] {
  const qaPairs: { id: string; question: string; answer: string; module: string }[] = [];
  ALL_MODULES.forEach(mod => {
    const articles = getAllArticlesInModule(mod);
    articles.forEach(art => {
      if (art.questions && art.questions.length > 0) {
        art.questions.forEach(q => {
          qaPairs.push({
            id: q.id,
            question: q.question,
            answer: q.options[q.correctAnswer] + (q.explanation ? ` — Explicativo: ${q.explanation}` : ''),
            module: mod.title
          });
        });
      }
    });
  });
  return qaPairs;
}

// 4. Simulados e Casos Práticos Unificados
export function getCentralSimulados(): SmartQuizQuestion[] {
  const simulados: SmartQuizQuestion[] = [];
  ALL_MODULES.forEach(mod => {
    const articles = getAllArticlesInModule(mod);
    articles.forEach(art => {
      if (art.questions && art.questions.length > 0) {
        art.questions.forEach(q => {
          simulados.push({
            id: q.id,
            scenarioType: 'caso_pratico',
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            examTip: q.examContext || 'Tema frequente nos exames de acesso às carreiras públicas.'
          });
        });
      }
    });
  });
  return simulados;
}

// 5. Cursos de Preparação Intensiva (Evolução)
export const CENTRAL_COURSES: Course[] = [
  {
    id: 'curso-minint-pna-2026',
    title: 'Curso Preparatório Intensivo MININT & PNA 2026',
    category: 'Carreiras Policiais & Defesa',
    description: 'Aulas completas sobre Constituição, Regulamentos da Polícia, Código Penal e Ética Comportamental.',
    instructor: 'Coronel Dr. António Mateus & Profa. Dra. Maria do Céu',
    durationHours: 45,
    lessons: [
      { id: 'v1', title: 'Fundamentos da CRA e Direitos Fundamentais', durationMinutes: 35, summary: 'Análise detalhada do Artigo 1.º ao 30.º da CRA.' },
      { id: 'v2', title: 'Hierarquia Policial e Uso da Força', durationMinutes: 40, summary: 'Princípio da Proporcionalidade e Estatuto Orgânico da PNA.' }
    ],
    certificateEligible: true
  },
  {
    id: 'curso-dpa-administracao-2026',
    title: 'Nova Divisão Político-Administrativa (21 Províncias) & Administração Pública',
    category: 'Administração Geral & Governos Provinciais',
    description: 'Estudo do novo mapa territorial de Angola, províncias criadas (Icolo e Bengo, Moxico Leste, Cuando, etc.) e órgãos locais.',
    instructor: 'Mestre Gabriel Kwanza',
    durationHours: 30,
    lessons: [
      { id: 'v3', title: 'A Nova Lei da DPA (Lei 14/24)', durationMinutes: 50, summary: 'Compreender a reformulação territorial de Angola.' }
    ],
    certificateEligible: true
  }
];

// 6. Certificados de Aproveitamento Emitidos
export const CENTRAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-001',
    code: 'JOB-ANG-2026-9812',
    title: 'Certificado de Preparação em Direito Constitucional e Legislação Angolana',
    recipientName: 'Candidato Aprovado JobExpress',
    issueDate: '2026-06-15',
    hoursCount: 40,
    validationUrl: 'https://jobexpress-angola.onrender.com/validar-certificado'
  }
];

// 7. Novas Oportunidades e Concursos Públicos
export function getCentralConcursos(): ConcursoEntry[] {
  return ALL_CONCURSOS.map(c => ({
    id: c.id,
    ministryName: c.ministryName,
    title: `Concurso Público de Acesso — ${c.shortName}`,
    positionsCount: c.id === 'minint' ? 12500 : c.id === 'minsa' ? 8400 : 5000,
    educationLevel: 'Ensino Médio',
    status: c.badge.includes('Aberto') ? 'Aberto' : 'Previsto',
    noticeUrl: 'https://jobexpress-angola.onrender.com',
    updatedAt: '2026-07-25'
  }));
}

// 8. Repositório Mestre Unificado
export const CentralRepository: CentralRepositoryData = {
  get legislacao() {
    return getCentralLegislation();
  },
  documentos: CENTRAL_DOCUMENTS,
  materiais: ALL_MODULES,
  get perguntasRespostas() {
    return getCentralQuestionsAndAnswers();
  },
  get simulados() {
    return getCentralSimulados();
  },
  cursos: CENTRAL_COURSES,
  certificados: CENTRAL_CERTIFICATES,
  get concursos() {
    return getCentralConcursos();
  }
};

/**
 * Função de busca global no Repositório Único
 */
export function queryCentralRepository(term: string) {
  if (!term || term.trim().length < 2) return null;
  const lower = term.toLowerCase().trim();

  const matchedLegis = getCentralLegislation().filter(art =>
    art.title.toLowerCase().includes(lower) ||
    art.code.toLowerCase().includes(lower) ||
    art.definition.toLowerCase().includes(lower)
  ).slice(0, 5);

  const matchedDocs = CENTRAL_DOCUMENTS.filter(doc =>
    doc.title.toLowerCase().includes(lower) ||
    doc.category.toLowerCase().includes(lower)
  );

  const matchedQA = getCentralQuestionsAndAnswers().filter(qa =>
    qa.question.toLowerCase().includes(lower) ||
    qa.answer.toLowerCase().includes(lower)
  ).slice(0, 5);

  return {
    legislacao: matchedLegis,
    documentos: matchedDocs,
    perguntasRespostas: matchedQA,
    totalResults: matchedLegis.length + matchedDocs.length + matchedQA.length
  };
}
