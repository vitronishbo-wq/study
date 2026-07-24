import React, { useState, useEffect } from 'react';
import { ConceptArticle, SmartQuizQuestion } from '../types/minint';
import { useLocalFlashcards, SavedFlashcard } from '../hooks/useLocalFlashcards';
import {
  Sparkles,
  Bot,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  Loader2,
  BookOpen,
  Zap,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sliders,
  Target,
  FileCheck,
  Layers,
  Plus,
  BookmarkCheck,
  Trash2,
  Search,
  Brain,
  RotateCw,
  Check,
  FileText,
  Bookmark,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SmartQuizProps {
  article: ConceptArticle;
  theme: 'light' | 'dark' | 'sepia';
  onSaveQuizScore?: (correct: number, total: number) => void;
}

export interface ExtractedTermFlashcard {
  id: string;
  front: string;
  back: string;
  articleRef: string;
  tag?: string;
}

export const SmartQuiz: React.FC<SmartQuizProps> = ({
  article,
  theme,
  onSaveQuizScore
}) => {
  // Navigation tabs inside SmartQuiz
  const [activeTab, setActiveTab] = useState<'quiz' | 'term_flashcards' | 'my_deck'>('quiz');

  // Local Storage Deck Hook
  const { deck, addCard, addMultipleCards, removeCard, clearDeck, isSaved } = useLocalFlashcards();

  // --- QUIZ STATE ---
  const [difficulty, setDifficulty] = useState<'iniciante' | 'intermediario' | 'concurso_minint'>('concurso_minint');
  const [scenarioStyle, setScenarioStyle] = useState<'caso_pratico' | 'pegadinha_rasteira' | 'misto'>('misto');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<SmartQuizQuestion[] | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<{ correct: number; total: number } | null>(null);
  const [showDistractorDetails, setShowDistractorDetails] = useState<Record<number, boolean>>({});

  // --- TERM FLASHCARDS EXTRACTION STATE ---
  const [isExtractingTerms, setIsExtractingTerms] = useState<boolean>(false);
  const [termExtractError, setTermExtractError] = useState<string | null>(null);
  const [extractedTerms, setExtractedTerms] = useState<ExtractedTermFlashcard[]>([]);
  const [flippedTerms, setFlippedTerms] = useState<Record<string, boolean>>({});

  // --- DECK PRACTICE STATE ---
  const [deckSearchQuery, setDeckSearchQuery] = useState('');
  const [deckPracticeIndex, setDeckPracticeIndex] = useState(0);
  const [isDeckFlipped, setIsDeckFlipped] = useState(false);
  const [masteredDeckIds, setMasteredDeckIds] = useState<Set<string>>(new Set());

  // Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Construct full text of article for Gemini prompt
  const getArticleFullContent = () => {
    const legalTextStr = article.legalText ? `Texto Legal Oficial: ${article.legalText}` : `Definição: ${article.definition}`;
    const simpleExpStr = `Explicação Simples: ${article.simpleExplanation}`;
    const pointsStr = `Pontos Importantes:\n- ${article.importantPoints.join('\n- ')}`;
    const alertStr = article.examAlert ? `Atenção Exame: ${article.examAlert}` : '';

    return `${article.code} - ${article.title}\n\n${legalTextStr}\n\n${simpleExpStr}\n\n${pointsStr}\n\n${alertStr}`.trim();
  };

  // Reset states on article change
  useEffect(() => {
    setQuestions(null);
    setSelectedOptions({});
    setSubmitted(false);
    setScore(null);
    setError(null);
    setShowDistractorDetails({});
    setExtractedTerms([]);
    setTermExtractError(null);
    setFlippedTerms({});
  }, [article.id]);

  // Generate Smart Quiz Questions
  const generateSmartQuiz = async () => {
    setLoading(true);
    setError(null);
    setQuestions(null);
    setSelectedOptions({});
    setSubmitted(false);
    setScore(null);
    setShowDistractorDetails({});

    try {
      const fullContent = getArticleFullContent();
      const response = await fetch('/api/quiz/generate-smart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          articleCode: article.code,
          articleTitle: article.title,
          content: fullContent,
          difficulty,
          scenarioStyle
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao conectar com o serviço de Inteligência Artificial.');
      }

      const data = await response.json();
      if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
        setQuestions(data.questions.slice(0, 3));
      } else {
        throw new Error('Não foi possível formatar as questões adaptativas.');
      }
    } catch (err: any) {
      console.error('Erro na geração do Smart Quiz:', err);
      setError('Erro ao gerar o Smart Quiz com o Gemini IA. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Generate Key Legal Terms Flashcards
  const generateTermFlashcards = async () => {
    setIsExtractingTerms(true);
    setTermExtractError(null);

    const fullContent = getArticleFullContent();

    try {
      const response = await fetch('/api/flashcards/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleCode: article.code,
          articleTitle: article.title,
          content: fullContent
        })
      });

      if (!response.ok) {
        throw new Error('Falha na extração de termos-chave via IA.');
      }

      const data = await response.json();
      if (data.flashcards && Array.isArray(data.flashcards)) {
        const terms: ExtractedTermFlashcard[] = data.flashcards.map((fc: any, index: number) => ({
          id: `term-${article.id}-${index}-${Date.now()}`,
          front: fc.front,
          back: fc.back,
          articleRef: fc.articleRef || article.code,
          tag: fc.tag || 'Termo Chave'
        }));
        setExtractedTerms(terms);
        setFlippedTerms({});
      } else {
        throw new Error('Formato inesperado retornado pela IA.');
      }
    } catch (err: any) {
      console.error('Erro na extração de termos-chave:', err);
      setTermExtractError('Erro ao extrair termos-chave com o Gemini. Tente novamente.');
    } finally {
      setIsExtractingTerms(false);
    }
  };

  const handleSaveTermToDeck = (term: ExtractedTermFlashcard) => {
    addCard({
      id: term.id,
      front: term.front,
      back: term.back,
      articleCode: term.articleRef || article.code,
      articleTitle: article.title,
      tag: term.tag || 'Termo Chave'
    });
    showToast(`Termo guardado com sucesso no seu Deck Local!`);
  };

  const handleSaveAllTermsToDeck = () => {
    if (extractedTerms.length === 0) return;
    const cardsToSave = extractedTerms.map(t => ({
      id: t.id,
      front: t.front,
      back: t.back,
      articleCode: t.articleRef || article.code,
      articleTitle: article.title,
      tag: t.tag || 'Termo Chave'
    }));
    addMultipleCards(cardsToSave);
    showToast(`${extractedTerms.length} cartões guardados no seu Deck Local!`);
  };

  const handleSaveQuestionTipToDeck = (q: SmartQuizQuestion, qIndex: number) => {
    const cardId = `quiz-tip-${q.id || qIndex}-${article.id}`;
    addCard({
      id: cardId,
      front: `[Questão Concurso - ${article.code}] ${q.question.slice(0, 110)}...`,
      back: `Fundamentação: ${q.explanation}\n\nDica de Ouro: ${q.examTip || ''}`,
      articleCode: article.code,
      articleTitle: article.title,
      tag: 'Dica Concurso'
    });
    showToast(`Dica da Questão ${qIndex + 1} guardada no seu Deck Local!`);
  };

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (submitted) return;
    setSelectedOptions(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const handleSubmitQuiz = () => {
    if (!questions) return;

    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedOptions[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    setScore({ correct: correctCount, total: questions.length });
    setSubmitted(true);

    if (onSaveQuizScore) {
      onSaveQuizScore(correctCount, questions.length);
    }
  };

  const toggleDistractorDetails = (qIndex: number) => {
    setShowDistractorDetails(prev => ({
      ...prev,
      [qIndex]: !prev[qIndex]
    }));
  };

  const toggleTermFlip = (termId: string) => {
    setFlippedTerms(prev => ({
      ...prev,
      [termId]: !prev[termId]
    }));
  };

  // Filtered local deck items for search
  const filteredDeck = deck.filter(c =>
    c.front.toLowerCase().includes(deckSearchQuery.toLowerCase()) ||
    c.back.toLowerCase().includes(deckSearchQuery.toLowerCase()) ||
    c.articleCode.toLowerCase().includes(deckSearchQuery.toLowerCase()) ||
    (c.tag && c.tag.toLowerCase().includes(deckSearchQuery.toLowerCase()))
  );

  const currentDeckCard = filteredDeck[deckPracticeIndex];

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-600 text-white px-5 py-3 rounded-2xl shadow-xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <BookmarkCheck className="w-4 h-4" />
          {toastMessage}
        </div>
      )}

      {/* Primary Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'quiz'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
        >
          <Zap className="w-4 h-4" />
          Smart Quiz (Exame 3 Questões)
        </button>

        <button
          onClick={() => {
            setActiveTab('term_flashcards');
            if (extractedTerms.length === 0 && !isExtractingTerms) {
              generateTermFlashcards();
            }
          }}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'term_flashcards'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          Flashcards de Termos-Chave IA
          {extractedTerms.length > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-200 text-amber-900 font-extrabold">
              {extractedTerms.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('my_deck')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'my_deck'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          Meu Deck Guardado
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
            activeTab === 'my_deck' ? 'bg-white text-amber-900' : 'bg-amber-500/20 text-amber-700 dark:text-amber-300'
          }`}>
            {deck.length}
          </span>
        </button>
      </div>

      {/* TAB 1: SMART QUIZ (EXAM QUESTIONS) */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          {/* Banner / Selector Header */}
          <div className={`p-6 rounded-2xl border shadow-sm transition-all ${
            isDark
              ? 'bg-gradient-to-br from-neutral-900 via-neutral-900 to-amber-950/40 border-amber-800/40'
              : isSepia
              ? 'bg-gradient-to-br from-[#f4e8d0] via-[#f7f0df] to-[#eedfb9] border-[#ded0b1]'
              : 'bg-gradient-to-br from-amber-500/10 via-white to-amber-100/40 border-amber-200'
          }`}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-amber-500 text-white flex items-center gap-1 shadow-xs">
                    <Zap className="w-3 h-3" />
                    Smart Quiz IA Adaptativo
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> Foco Concurso MININT / PNA
                  </span>
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <Bot className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  Exame Prático de Alto Nível • {article.code}
                </h2>
                <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
                  Crie questões realistas baseadas no <strong className="text-amber-800 dark:text-amber-300">{article.title}</strong>, simulando cenários práticos, pegadinhas jurídicas e análises minuciosas.
                </p>
              </div>

              {!loading && (
                <button
                  onClick={generateSmartQuiz}
                  className="px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-98 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  {questions ? 'Gerar Novas Questões' : 'Gerar Simulando Concurso'}
                </button>
              )}
            </div>

            {/* Customization Options Bar */}
            <div className="mt-6 pt-5 border-t border-neutral-200/80 dark:border-neutral-800 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Difficulty selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-amber-500" /> Nível de Dificuldade:
                </label>
                <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-950 p-1 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs">
                  <button
                    onClick={() => setDifficulty('iniciante')}
                    className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all ${
                      difficulty === 'iniciante'
                        ? 'bg-amber-500 text-white font-bold shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                    }`}
                  >
                    Iniciante
                  </button>
                  <button
                    onClick={() => setDifficulty('intermediario')}
                    className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all ${
                      difficulty === 'intermediario'
                        ? 'bg-amber-500 text-white font-bold shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                    }`}
                  >
                    Intermediário
                  </button>
                  <button
                    onClick={() => setDifficulty('concurso_minint')}
                    className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all ${
                      difficulty === 'concurso_minint'
                        ? 'bg-amber-600 text-white font-bold shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                    }`}
                  >
                    🎯 Concurso MININT
                  </button>
                </div>
              </div>

              {/* Scenario Style Selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5 text-amber-500" /> Estilo de Questão:
                </label>
                <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-950 p-1 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs">
                  <button
                    onClick={() => setScenarioStyle('caso_pratico')}
                    className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all ${
                      scenarioStyle === 'caso_pratico'
                        ? 'bg-amber-500 text-white font-bold shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                    }`}
                  >
                    👮 Caso Prático
                  </button>
                  <button
                    onClick={() => setScenarioStyle('pegadinha_rasteira')}
                    className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all ${
                      scenarioStyle === 'pegadinha_rasteira'
                        ? 'bg-amber-500 text-white font-bold shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                    }`}
                  >
                    ⚡ Pegadinhas
                  </button>
                  <button
                    onClick={() => setScenarioStyle('misto')}
                    className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all ${
                      scenarioStyle === 'misto'
                        ? 'bg-amber-600 text-white font-bold shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                    }`}
                  >
                    🔀 Exame Misto
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className={`p-12 rounded-2xl border text-center space-y-4 ${
              isDark ? 'bg-neutral-900/50 border-neutral-800' : 'bg-white border-neutral-200'
            }`}>
              <div className="relative w-14 h-14 mx-auto">
                <Loader2 className="w-14 h-14 text-amber-500 animate-spin" />
                <Bot className="w-7 h-7 text-amber-600 absolute inset-0 m-auto" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  O Gemini está elaborando questões de nível de Concurso...
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Sintetizando cenários práticos e fundamentação legal técnica do {article.code}.
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="p-6 rounded-2xl border border-red-300 bg-red-50 text-red-900 dark:bg-red-950/40 dark:border-red-800 dark:text-red-200 space-y-3 text-center">
              <p className="text-sm font-semibold">{error}</p>
              <button
                onClick={generateSmartQuiz}
                className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Tentar Novamente
              </button>
            </div>
          )}

          {/* Call To Action State */}
          {!questions && !loading && !error && (
            <div className={`p-10 rounded-2xl border text-center space-y-4 ${
              isDark ? 'bg-neutral-900/30 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                  Simulado de Alta Exigência com IA
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Clique no botão para gerar 3 questões exclusivas contextualizadas com a jurisprudência, doutrina e regulamentos oficiais do MININT de Angola.
                </p>
              </div>
              <button
                onClick={generateSmartQuiz}
                className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Gerar Simulados do {article.code}
              </button>
            </div>
          )}

          {/* Active Questions Container */}
          {questions && !loading && (
            <div className="space-y-6">
              {/* Score Header */}
              {submitted && score && (
                <div className={`p-6 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  score.correct === 3
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200'
                    : score.correct >= 2
                    ? 'bg-amber-50 border-amber-300 text-amber-950 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-200'
                    : 'bg-red-50 border-red-300 text-red-950 dark:bg-red-950/40 dark:border-red-800 dark:text-red-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <Award className="w-10 h-10 flex-shrink-0 text-amber-500" />
                    <div>
                      <h4 className="font-bold text-base md:text-lg">
                        Resultado: {score.correct} de {score.total} acertos ({Math.round((score.correct / score.total) * 100)}%)
                      </h4>
                      <p className="text-xs opacity-90 leading-relaxed mt-0.5">
                        {score.correct === 3
                          ? 'Desempenho Notável! Você domina a aplicação prática deste artigo do MININT.'
                          : score.correct >= 2
                          ? 'Muito Bom! Analise as justificativas das opções abaixo para consolidar 100%.'
                          : 'Continue treinando! Leia a fundamentação detalhada do professor Gemini para cada questão.'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={generateSmartQuiz}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white dark:bg-neutral-900 border border-current shadow-xs hover:opacity-80 transition-all flex items-center justify-center gap-1.5 flex-shrink-0 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" /> Novo Simulado
                  </button>
                </div>
              )}

              {/* Render List of Questions */}
              {questions.map((q, qIndex) => {
                const selectedOpt = selectedOptions[qIndex];
                const isCorrect = selectedOpt === q.correctAnswer;
                const tipCardId = `quiz-tip-${q.id || qIndex}-${article.id}`;
                const alreadySavedInDeck = isSaved(tipCardId);

                return (
                  <div
                    key={q.id || qIndex}
                    className={`p-6 rounded-2xl border space-y-4 transition-all ${
                      isDark
                        ? 'bg-neutral-900/60 border-neutral-800'
                        : isSepia
                        ? 'bg-[#f6ebd7] border-[#ded0b1]'
                        : 'bg-white border-neutral-200 shadow-xs'
                    }`}
                  >
                    {/* Question Metadata Header */}
                    <div className="flex items-center justify-between gap-2 border-b pb-3 border-neutral-200/60 dark:border-neutral-800">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-amber-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                          Q{qIndex + 1}
                        </span>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                          {q.scenarioType === 'caso_pratico'
                            ? '👮 Caso Prático de Campo'
                            : q.scenarioType === 'pegadinha_rasteira'
                            ? '⚡ Pegadinha de Concurso'
                            : '⚖️ Artigo e Competências'}
                        </span>
                      </div>

                      {submitted && (
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                            isCorrect
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                          }`}>
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="w-4 h-4" /> Gabarito Correto
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4" /> Incorreto
                              </>
                            )}
                          </span>

                          <button
                            onClick={() => handleSaveQuestionTipToDeck(q, qIndex)}
                            disabled={alreadySavedInDeck}
                            className={`p-1.5 rounded-lg border text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                              alreadySavedInDeck
                                ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-300'
                                : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-amber-100 dark:hover:bg-amber-950 text-neutral-700 dark:text-neutral-300'
                            }`}
                            title="Salvar esta questão e dica no seu Deck Local"
                          >
                            {alreadySavedInDeck ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                            <span className="hidden sm:inline">{alreadySavedInDeck ? 'Salvo' : '+ Deck'}</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Question Statement */}
                    <p className="text-sm md:text-base font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
                      {q.question}
                    </p>

                    {/* Multiple Choice Options */}
                    <div className="space-y-2 pt-1">
                      {q.options.map((optText, optIdx) => {
                        const isSelected = selectedOpt === optIdx;
                        const isCorrectAnswer = q.correctAnswer === optIdx;

                        let optionStyle = isDark
                          ? 'bg-neutral-950 border-neutral-800 text-neutral-200 hover:border-neutral-700'
                          : 'bg-neutral-50 border-neutral-200 text-neutral-800 hover:border-neutral-300';

                        if (submitted) {
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
                            disabled={submitted}
                            className={`w-full p-3.5 rounded-xl border text-xs md:text-sm text-left flex items-start gap-3 transition-all cursor-pointer disabled:cursor-default ${optionStyle}`}
                          >
                            <span className={`w-5 h-5 rounded-md text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              isSelected
                                ? 'bg-amber-600 text-white'
                                : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
                            }`}>
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="leading-snug flex-1">{optText}</span>

                            {submitted && isCorrectAnswer && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                            )}
                            {submitted && isSelected && !isCorrectAnswer && (
                              <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Submitted Detailed Explanation Section */}
                    {submitted && (
                      <div className="pt-3 border-t border-neutral-200/80 dark:border-neutral-800 space-y-3">
                        {/* Main Fundamentation */}
                        <div className={`p-4 rounded-xl text-xs leading-relaxed border space-y-1.5 ${
                          isCorrect
                            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200'
                            : 'bg-amber-50/80 border-amber-200 text-amber-950 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-200'
                        }`}>
                          <span className="font-bold flex items-center gap-1.5 text-xs text-amber-800 dark:text-amber-400">
                            <FileCheck className="w-4 h-4" />
                            Fundamentação do Gabarito Oficial ({article.code}):
                          </span>
                          <p className="text-xs md:text-sm leading-relaxed">{q.explanation}</p>

                          {/* Exam Gold Tip */}
                          {q.examTip && (
                            <div className="mt-2 pt-2 border-t border-amber-300/40 dark:border-amber-800/40 flex items-start gap-2">
                              <Zap className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                              <p className="text-xs font-medium text-amber-900 dark:text-amber-300">
                                <strong>Dica de Ouro de Concurso:</strong> {q.examTip}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Distractors Breakdown Toggle Button */}
                        {q.distractorExplanations && q.distractorExplanations.length > 0 && (
                          <div>
                            <button
                              onClick={() => toggleDistractorDetails(qIndex)}
                              className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <HelpCircle className="w-3.5 h-3.5" />
                              {showDistractorDetails[qIndex]
                                ? 'Ocultar Análise das 4 Opções'
                                : 'Ver Por Que Cada Opção Está Certa ou Errada'}
                              {showDistractorDetails[qIndex] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>

                            {showDistractorDetails[qIndex] && (
                              <div className="mt-2 p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs space-y-2 animate-fadeIn">
                                <span className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                                  Análise Detalhada dos Distratores:
                                </span>
                                {q.distractorExplanations.map((exp, dIdx) => (
                                  <div key={dIdx} className="flex items-start gap-2 text-neutral-600 dark:text-neutral-400">
                                    <span className={`font-mono font-bold ${
                                      dIdx === q.correctAnswer ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-500'
                                    }`}>
                                      {String.fromCharCode(65 + dIdx)}):
                                    </span>
                                    <span>{exp}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Submit Button */}
              {!submitted && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(selectedOptions).length < questions.length}
                    className="px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-98 disabled:opacity-40 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Validar e Ver Gabarito Comentado ({Object.keys(selectedOptions).length}/3 Marcadas)
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: EXTRACTION OF KEY LEGAL TERMS (FLASHCARDS) */}
      {activeTab === 'term_flashcards' && (
        <div className="space-y-6">
          {/* Header */}
          <div className={`p-6 rounded-2xl border ${
            isDark ? 'bg-neutral-900/60 border-neutral-800' : isSepia ? 'bg-[#f6ebd7] border-[#ded0b1]' : 'bg-white border-neutral-200'
          } flex flex-col md:flex-row md:items-center justify-between gap-4`}>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase bg-amber-500/20 text-amber-800 dark:text-amber-300 flex items-center gap-1">
                  <Brain className="w-3.5 h-3.5 text-amber-600" />
                  Termos & Conceitos-Chave
                </span>
                <span className="text-xs text-neutral-500 font-mono">
                  {article.code}
                </span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                Flashcards de Memorização do {article.title}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                O Gemini extrai prazos, atribuições e termos fundamentais em formato de perguntas e respostas diretas.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {extractedTerms.length > 0 && (
                <button
                  onClick={handleSaveAllTermsToDeck}
                  className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <BookmarkCheck className="w-4 h-4" />
                  Guardar Todos no Meu Deck ({extractedTerms.length})
                </button>
              )}

              <button
                onClick={generateTermFlashcards}
                disabled={isExtractingTerms}
                className="px-4 py-2.5 rounded-xl bg-neutral-900 text-white dark:bg-amber-500 dark:text-neutral-950 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isExtractingTerms ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                    Sintetizando...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    {extractedTerms.length > 0 ? 'Re-Gerar Termos' : 'Extrair Termos com IA'}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Loading */}
          {isExtractingTerms && (
            <div className={`p-10 rounded-2xl border text-center space-y-3 ${
              isDark ? 'bg-neutral-900/50 border-neutral-800' : 'bg-white border-neutral-200'
            }`}>
              <Loader2 className="w-10 h-10 text-amber-500 animate-spin mx-auto" />
              <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                Analisando o texto do {article.code} para criar cartões de memorização...
              </p>
            </div>
          )}

          {/* Error */}
          {termExtractError && !isExtractingTerms && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs text-center font-medium">
              {termExtractError}
            </div>
          )}

          {/* Render Extracted Terms Grid */}
          {!isExtractingTerms && extractedTerms.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {extractedTerms.map((term, tIdx) => {
                const isFlipped = !!flippedTerms[term.id];
                const savedInDeck = isSaved(term.id, term.front, term.articleRef);

                return (
                  <div
                    key={term.id}
                    className={`p-5 rounded-2xl border min-h-[200px] flex flex-col justify-between transition-all relative ${
                      isDark ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white border-neutral-200 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between border-b pb-2 border-neutral-100 dark:border-neutral-800">
                      <span className="text-[10px] font-mono font-bold uppercase text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded bg-amber-500/10">
                        {term.tag || 'Termo Chave'}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        {tIdx + 1}/{extractedTerms.length}
                      </span>
                    </div>

                    <div
                      onClick={() => toggleTermFlip(term.id)}
                      className="my-4 text-center cursor-pointer space-y-2 py-2"
                    >
                      {isFlipped ? (
                        <div className="animate-fadeIn">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-600 dark:text-emerald-400 block">
                            Resposta / Definição
                          </span>
                          <p className="text-sm font-serif font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                            {term.back}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <span className="text-[10px] uppercase tracking-wider font-bold text-amber-600 dark:text-amber-400 block">
                            Termo / Conceito
                          </span>
                          <p className="text-sm md:text-base font-bold text-neutral-900 dark:text-neutral-100">
                            {term.front}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                      <button
                        onClick={() => toggleTermFlip(term.id)}
                        className="text-amber-600 dark:text-amber-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        {isFlipped ? 'Ver Pergunta' : 'Ver Resposta'}
                      </button>

                      <button
                        onClick={() => handleSaveTermToDeck(term)}
                        disabled={savedInDeck}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1 cursor-pointer ${
                          savedInDeck
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                        }`}
                      >
                        {savedInDeck ? (
                          <>
                            <BookmarkCheck className="w-3.5 h-3.5" /> Salvo no Deck
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" /> + Salvar no Deck
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MY SAVED LOCAL DECK (MANAGED VIA LOCALSTORAGE) */}
      {activeTab === 'my_deck' && (
        <div className="space-y-6">
          {/* Deck Header */}
          <div className={`p-6 rounded-2xl border ${
            isDark ? 'bg-neutral-900/60 border-neutral-800' : isSepia ? 'bg-[#f6ebd7] border-[#ded0b1]' : 'bg-white border-neutral-200'
          } space-y-4`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase bg-amber-500 text-white flex items-center gap-1">
                    <Bookmark className="w-3.5 h-3.5" />
                    Deck Pessoal de Cartões
                  </span>
                  <span className="text-xs text-neutral-500 font-mono">
                    Salvo no localStorage do seu navegador
                  </span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                  Meu Baralho de Revisão ({deck.length} Cartões)
                </h3>
              </div>

              {deck.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm('Tem certeza que deseja apagar todos os cartões do seu deck local?')) {
                      clearDeck();
                      showToast('Seu Deck Local foi limpo.');
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs font-bold hover:bg-red-100 transition-all flex items-center gap-1.5 self-start sm:self-center cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Limpar Meu Deck
                </button>
              )}
            </div>

            {/* Search filter input */}
            {deck.length > 0 && (
              <div className="relative">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Pesquisar por termo, conceito ou artigo (ex: CRA Art 12, MININT...)"
                  value={deckSearchQuery}
                  onChange={e => setDeckSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            )}
          </div>

          {/* Empty Deck State */}
          {deck.length === 0 && (
            <div className={`p-10 rounded-2xl border text-center space-y-3 ${
              isDark ? 'bg-neutral-900/30 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
            }`}>
              <Bookmark className="w-10 h-10 text-neutral-400 mx-auto" />
              <h4 className="font-bold text-sm text-neutral-800 dark:text-neutral-200">
                Seu Deck Local está vazio
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
                Vá até a aba "Flashcards de Termos-Chave IA" ou faça um Smart Quiz e clique em "+ Salvar no Deck" para guardar os melhores cartões no seu navegador.
              </p>
              <button
                onClick={() => {
                  setActiveTab('term_flashcards');
                  if (extractedTerms.length === 0) generateTermFlashcards();
                }}
                className="px-4 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs shadow-xs hover:bg-amber-700 transition-all cursor-pointer"
              >
                Gerar Termos do {article.code}
              </button>
            </div>
          )}

          {/* Active Deck Player / Reviewer */}
          {filteredDeck.length > 0 && (
            <div className="space-y-6">
              {/* Interactive 3D Card Viewer */}
              {currentDeckCard && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
                    <span>Revisão {deckPracticeIndex + 1} de {filteredDeck.length}</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">{currentDeckCard.articleCode}</span>
                  </div>

                  <div
                    onClick={() => setIsDeckFlipped(!isDeckFlipped)}
                    className={`min-h-[220px] p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between shadow-md ${
                      isDeckFlipped
                        ? isDark ? 'bg-amber-950/40 border-amber-600 text-amber-100' : 'bg-amber-50 border-amber-300 text-neutral-900'
                        : isDark ? 'bg-neutral-900 border-neutral-800 text-neutral-100' : 'bg-white border-neutral-200 text-neutral-900'
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold uppercase tracking-wider text-[10px] px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-800 dark:text-amber-300">
                        {currentDeckCard.tag || 'Guardado'}
                      </span>
                      <span className="text-neutral-400 flex items-center gap-1">
                        <RotateCw className="w-3 h-3" /> Clique para virar
                      </span>
                    </div>

                    <div className="my-4 text-center px-4">
                      {isDeckFlipped ? (
                        <div className="space-y-1 animate-fadeIn">
                          <span className="text-[10px] font-bold text-emerald-600 uppercase block">Resposta</span>
                          <p className="text-sm md:text-base font-serif font-normal">{currentDeckCard.back}</p>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-amber-600 uppercase block">Conceito</span>
                          <p className="text-base md:text-lg font-bold">{currentDeckCard.front}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center text-[11px] text-neutral-400 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                      <span>Artigo: {currentDeckCard.articleCode}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeCard(currentDeckCard.id);
                          showToast('Cartão removido do Deck.');
                          if (deckPracticeIndex >= filteredDeck.length - 1) {
                            setDeckPracticeIndex(Math.max(0, filteredDeck.length - 2));
                          }
                        }}
                        className="text-red-500 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" /> Remover este Cartão
                      </button>
                    </div>
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => {
                        setIsDeckFlipped(false);
                        setDeckPracticeIndex(prev => (prev - 1 + filteredDeck.length) % filteredDeck.length);
                      }}
                      className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" /> Anterior
                    </button>

                    <button
                      onClick={() => {
                        setIsDeckFlipped(false);
                        setDeckPracticeIndex(prev => (prev + 1) % filteredDeck.length);
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                    >
                      Próximo <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Grid of all deck items */}
              <div className="space-y-2 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Todos os Cartões no Deck ({filteredDeck.length}):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredDeck.map((card, idx) => (
                    <div
                      key={card.id}
                      onClick={() => {
                        setDeckPracticeIndex(idx);
                        setIsDeckFlipped(false);
                      }}
                      className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                        deckPracticeIndex === idx
                          ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/30 font-semibold'
                          : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <span className="font-bold text-neutral-900 dark:text-neutral-100 line-clamp-2">
                          {card.front}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeCard(card.id);
                          }}
                          className="text-neutral-400 hover:text-red-500 p-1 cursor-pointer"
                          title="Remover"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                        <span className="font-mono">{card.articleCode}</span>
                        <span className="bg-amber-500/10 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded">
                          {card.tag || 'Cartão'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
