import React, { useState, useEffect } from 'react';
import { ConceptArticle, AiQuizQuestion } from '../types/minint';
import {
  Sparkles,
  Bot,
  CheckCircle2,
  XCircle,
  RotateCcw,
  HelpCircle,
  Award,
  Loader2,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface ArticleAiQuizProps {
  article: ConceptArticle;
  theme: 'light' | 'dark' | 'sepia';
  onSaveQuizScore?: (correct: number, total: number) => void;
}

export const ArticleAiQuiz: React.FC<ArticleAiQuizProps> = ({
  article,
  theme,
  onSaveQuizScore
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<AiQuizQuestion[] | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [validations, setValidations] = useState<Record<number, { isCorrect: boolean; feedback: string; validating: boolean }>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<{ correct: number; total: number } | null>(null);

  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';

  // Construct full text of article for Gemini prompt
  const getArticleFullContent = () => {
    const legalTextStr = article.legalText ? `Texto Legal: ${article.legalText}` : `Definição: ${article.definition}`;
    const simpleExpStr = `Explicação Simples: ${article.simpleExplanation}`;
    const pointsStr = `Pontos Importantes:\n- ${article.importantPoints.join('\n- ')}`;
    const alertStr = article.examAlert ? `Atenção Exame: ${article.examAlert}` : '';

    return `${article.code} - ${article.title}\n\n${legalTextStr}\n\n${simpleExpStr}\n\n${pointsStr}\n\n${alertStr}`.trim();
  };

  // Generate 3 questions using Gemini API
  const generateQuiz = async () => {
    setLoading(true);
    setError(null);
    setQuestions(null);
    setSelectedOptions({});
    setValidations({});
    setQuizSubmitted(false);
    setScore(null);

    try {
      const fullContent = getArticleFullContent();
      const response = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          articleCode: article.code,
          articleTitle: article.title,
          content: fullContent,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao obter quiz da API Gemini.');
      }

      const data = await response.json();
      if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
        setQuestions(data.questions.slice(0, 3)); // Ensure exactly 3 questions
      } else {
        throw new Error('Formato de questões inválido recebido.');
      }
    } catch (err: any) {
      console.error('Erro na geração do quiz:', err);
      setError('Não foi possível gerar o quiz com o Gemini neste momento. Verifique a sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Reset quiz when article changes
  useEffect(() => {
    setQuestions(null);
    setSelectedOptions({});
    setValidations({});
    setQuizSubmitted(false);
    setScore(null);
    setError(null);
  }, [article.id]);

  // Handle Option Click
  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (quizSubmitted) return; // Prevent changing after submit
    setSelectedOptions(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  // Validate answer individually or batch with Gemini
  const validateQuestionWithGemini = async (qIndex: number, question: AiQuizQuestion) => {
    const selectedOpt = selectedOptions[qIndex];
    if (selectedOpt === undefined) return;

    setValidations(prev => ({
      ...prev,
      [qIndex]: { ...prev[qIndex], validating: true, isCorrect: selectedOpt === question.correctAnswer, feedback: '' }
    }));

    const isCorrect = selectedOpt === question.correctAnswer;
    const selectedOptionText = question.options[selectedOpt];

    try {
      const res = await fetch('/api/quiz/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleTitle: `${article.code} - ${article.title}`,
          questionText: question.question,
          selectedOptionText: selectedOptionText,
          isCorrect: isCorrect,
          explanation: question.explanation,
          articleContent: getArticleFullContent()
        })
      });

      if (res.ok) {
        const data = await res.json();
        setValidations(prev => ({
          ...prev,
          [qIndex]: {
            isCorrect,
            feedback: data.feedback || question.explanation,
            validating: false
          }
        }));
      } else {
        setValidations(prev => ({
          ...prev,
          [qIndex]: {
            isCorrect,
            feedback: question.explanation,
            validating: false
          }
        }));
      }
    } catch {
      setValidations(prev => ({
        ...prev,
        [qIndex]: {
          isCorrect,
          feedback: question.explanation,
          validating: false
        }
      }));
    }
  };

  // Submit all answers and calculate score
  const handleSubmitQuiz = async () => {
    if (!questions) return;

    let correctCount = 0;
    const newValidations: Record<number, { isCorrect: boolean; feedback: string; validating: boolean }> = {};

    // Validate each answered question
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const selected = selectedOptions[i];
      const isCorrect = selected === q.correctAnswer;
      if (isCorrect) correctCount++;

      newValidations[i] = {
        isCorrect,
        feedback: q.explanation,
        validating: false
      };
    }

    setValidations(newValidations);
    setScore({ correct: correctCount, total: questions.length });
    setQuizSubmitted(true);

    if (onSaveQuizScore) {
      onSaveQuizScore(correctCount, questions.length);
    }

    // Trigger individual Gemini detailed validations in background
    for (let i = 0; i < questions.length; i++) {
      if (selectedOptions[i] !== undefined) {
        validateQuestionWithGemini(i, questions[i]);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      {/* Quiz Banner Header */}
      <div className={`p-6 rounded-2xl border transition-all ${
        isDark
          ? 'bg-gradient-to-br from-amber-950/40 via-neutral-900 to-amber-900/20 border-amber-800/40'
          : isSepia
          ? 'bg-gradient-to-br from-[#f4e8d0] via-[#f7f0df] to-[#eedfb9] border-[#ded0b1]'
          : 'bg-gradient-to-br from-amber-50 via-white to-amber-100/50 border-amber-200'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-500/20 text-amber-800 dark:text-amber-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                Validado com IA Gemini
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                3 Perguntas Rápidas
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Bot className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              Quiz Inteligente do Artigo
            </h2>
            <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
              Questões inéditas geradas em tempo real com base <strong className="text-amber-800 dark:text-amber-300">exclusiva no {article.code} ({article.title})</strong>.
            </p>
          </div>

          {!questions && !loading && (
            <button
              onClick={generateQuiz}
              className="px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Gerar Quiz do Artigo
            </button>
          )}

          {questions && (
            <button
              onClick={generateQuiz}
              disabled={loading}
              className="px-4 py-2 rounded-xl border border-amber-500/30 hover:bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Gerar Novas Questões
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className={`p-12 rounded-2xl border text-center space-y-4 ${
          isDark ? 'bg-neutral-900/50 border-neutral-800' : 'bg-white border-neutral-200'
        }`}>
          <div className="relative w-12 h-12 mx-auto">
            <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
            <Bot className="w-6 h-6 text-amber-600 absolute inset-0 m-auto" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              O Gemini está analisando o {article.code}...
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Sintetizando 3 perguntas de múltipla escolha baseadas rigorosamente no texto legal.
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="p-6 rounded-2xl border border-red-300 bg-red-50 text-red-900 dark:bg-red-950/40 dark:border-red-800 dark:text-red-200 space-y-3 text-center">
          <p className="text-sm font-semibold">{error}</p>
          <button
            onClick={generateQuiz}
            className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition-all inline-flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Tentar Novamente
          </button>
        </div>
      )}

      {/* Initial Call To Action State when quiz is not generated yet */}
      {!questions && !loading && !error && (
        <div className={`p-8 rounded-2xl border text-center space-y-4 ${
          isDark ? 'bg-neutral-900/30 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
        }`}>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Pronto para testar a sua retenção?
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              A IA analisará o conteúdo deste artigo em segundos para criar 3 perguntas personalizadas de escolha múltipla e validar suas respostas.
            </p>
          </div>
          <button
            onClick={generateQuiz}
            className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Iniciar Quiz de 3 Questões IA
          </button>
        </div>
      )}

      {/* Questions Render */}
      {questions && !loading && (
        <div className="space-y-6">
          {/* Score Header when submitted */}
          {quizSubmitted && score && (
            <div className={`p-5 rounded-2xl border flex items-center justify-between ${
              score.correct === 3
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200'
                : score.correct >= 2
                ? 'bg-amber-50 border-amber-300 text-amber-950 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-200'
                : 'bg-red-50 border-red-300 text-red-950 dark:bg-red-950/40 dark:border-red-800 dark:text-red-200'
            }`}>
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 flex-shrink-0 text-amber-500" />
                <div>
                  <h4 className="font-bold text-base">
                    Resultado do Quiz: {score.correct} de {score.total} acertos ({Math.round((score.correct / score.total) * 100)}%)
                  </h4>
                  <p className="text-xs opacity-90">
                    {score.correct === 3
                      ? 'Excelente! Você dominou o conteúdo deste artigo legal!'
                      : score.correct >= 2
                      ? 'Muito bom! Reveja os comentários da IA abaixo para aperfeiçoar.'
                      : 'Continue a praticar. O Gemini forneceu explicações detalhadas em cada questão.'}
                  </p>
                </div>
              </div>
              <button
                onClick={generateQuiz}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-neutral-900 border border-current shadow-xs hover:opacity-80 transition-all flex items-center gap-1.5 flex-shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Repetir
              </button>
            </div>
          )}

          {/* List of 3 Questions */}
          {questions.map((q, qIndex) => {
            const selectedOpt = selectedOptions[qIndex];
            const validation = validations[qIndex];

            return (
              <div
                key={q.id || qIndex}
                className={`p-6 rounded-2xl border transition-all ${
                  isDark
                    ? 'bg-neutral-900/60 border-neutral-800'
                    : isSepia
                    ? 'bg-[#f6ebd7] border-[#ded0b1]'
                    : 'bg-white border-neutral-200 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {qIndex + 1}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Pergunta {qIndex + 1} de 3
                    </span>
                  </div>

                  {validation && (
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                      validation.isCorrect
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                    }`}>
                      {validation.isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correto
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" /> Incorreto
                        </>
                      )}
                    </span>
                  )}
                </div>

                <p className="text-sm md:text-base font-semibold text-neutral-900 dark:text-neutral-100 leading-snug mb-4">
                  {q.question}
                </p>

                {/* Options List */}
                <div className="space-y-2 mb-4">
                  {q.options.map((optText, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    const isCorrectAnswer = q.correctAnswer === optIdx;

                    let optionStyle = isDark
                      ? 'bg-neutral-950 border-neutral-800 text-neutral-200 hover:border-neutral-700'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-800 hover:border-neutral-300';

                    if (quizSubmitted || validation) {
                      if (isCorrectAnswer) {
                        optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 dark:bg-emerald-950/80 dark:border-emerald-700 dark:text-emerald-200 font-semibold';
                      } else if (isSelected && !isCorrectAnswer) {
                        optionStyle = 'bg-red-50 border-red-400 text-red-950 dark:bg-red-950/80 dark:border-red-700 dark:text-red-200 font-semibold';
                      } else {
                        optionStyle = 'opacity-50 border-neutral-200 dark:border-neutral-800';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-amber-100/80 border-amber-500 text-amber-950 dark:bg-amber-950 dark:border-amber-500 dark:text-amber-200 font-semibold ring-2 ring-amber-500/30';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(qIndex, optIdx)}
                        disabled={quizSubmitted}
                        className={`w-full p-3.5 rounded-xl border text-xs md:text-sm text-left flex items-start gap-3 transition-all cursor-pointer disabled:cursor-default ${optionStyle}`}
                      >
                        <span className={`w-5 h-5 rounded-md text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-amber-600 text-white'
                            : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-snug">{optText}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Individual Answer Feedback / Explanation */}
                {validation && (
                  <div className={`p-4 rounded-xl text-xs leading-relaxed border space-y-1.5 animate-fadeIn ${
                    validation.isCorrect
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-200'
                      : 'bg-amber-50 border-amber-200 text-amber-950 dark:bg-amber-950/50 dark:border-amber-800 dark:text-amber-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold flex items-center gap-1.5">
                        <Bot className="w-4 h-4 text-amber-600" />
                        Validação Gemini IA:
                      </span>
                      {validation.validating && (
                        <span className="flex items-center gap-1 text-[11px] opacity-75">
                          <Loader2 className="w-3 h-3 animate-spin" /> Atualizando...
                        </span>
                      )}
                    </div>
                    <p className="text-xs md:text-sm">{validation.feedback || q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Bottom Submit Action */}
          {!quizSubmitted && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedOptions).length < questions.length}
                className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                <CheckCircle2 className="w-4 h-4" />
                Validar Respostas com IA ({Object.keys(selectedOptions).length}/3 Selecionadas)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
