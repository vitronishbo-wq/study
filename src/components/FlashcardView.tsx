import React, { useState, useEffect, useMemo } from 'react';
import { ConceptArticle, Flashcard } from '../types/minint';
import {
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Check,
  Sparkles,
  Shuffle,
  Eye,
  CheckCircle2,
  BookOpen,
  Brain,
  AlertTriangle,
  Lightbulb,
  FileText,
  Loader2,
  Layers,
  Award
} from 'lucide-react';

interface FlashcardViewProps {
  article: ConceptArticle;
  theme: 'light' | 'dark' | 'sepia';
  articleTitle?: string;
}

export interface ExtractedFlashcard extends Flashcard {
  tag?: string;
  source?: 'auto' | 'custom' | 'gemini';
}

export const FlashcardView: React.FC<FlashcardViewProps> = ({
  article,
  theme,
  articleTitle
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [filterMode, setFilterMode] = useState<'all' | 'pending'>('all');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [geminiCards, setGeminiCards] = useState<ExtractedFlashcard[]>([]);

  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';
  const displayTitle = articleTitle || `${article.code} - ${article.title}`;

  // 1. Auto-extract key concepts from article properties
  const autoExtractedCards = useMemo<ExtractedFlashcard[]>(() => {
    const cards: ExtractedFlashcard[] = [];

    // Definition
    if (article.definition) {
      cards.push({
        id: `${article.id}-def`,
        front: `Qual é o conceito e definição central do ${article.code}?`,
        back: article.definition,
        articleRef: article.code,
        tag: 'Conceito Chave',
        source: 'auto'
      });
    }

    // Exam Alert / Trap
    if (article.examAlert) {
      cards.push({
        id: `${article.id}-alert`,
        front: `Qual é a pegadinha ou atenção especial de exame para o ${article.code}?`,
        back: article.examAlert,
        articleRef: article.code,
        tag: 'Atenção Exame',
        source: 'auto'
      });
    }

    // Simple Explanation
    if (article.simpleExplanation) {
      cards.push({
        id: `${article.id}-simple`,
        front: `Como resumir o significado do ${article.code} em termos simples?`,
        back: article.simpleExplanation,
        articleRef: article.code,
        tag: 'Resumo',
        source: 'auto'
      });
    }

    // Important Points
    if (article.importantPoints && article.importantPoints.length > 0) {
      article.importantPoints.forEach((pt, idx) => {
        cards.push({
          id: `${article.id}-pt-${idx}`,
          front: `Ponto Importante #${idx + 1} sobre o ${article.code} (${article.title})`,
          back: pt,
          articleRef: article.code,
          tag: 'Regra Jurídica',
          source: 'auto'
        });
      });
    }

    // Legal Text
    if (article.legalText) {
      cards.push({
        id: `${article.id}-legal`,
        front: `Qual é a redação/literalidade legal oficial do ${article.code}?`,
        back: article.legalText,
        articleRef: article.code,
        tag: 'Texto Legal',
        source: 'auto'
      });
    }

    return cards;
  }, [article]);

  // Combine static flashcards, auto-extracted cards, and Gemini cards
  const allCards = useMemo<ExtractedFlashcard[]>(() => {
    const combined: ExtractedFlashcard[] = [];
    const seenIds = new Set<string>();

    // 1. Pre-defined article flashcards if available
    if (article.flashcards && article.flashcards.length > 0) {
      article.flashcards.forEach(card => {
        if (!seenIds.has(card.id)) {
          seenIds.add(card.id);
          combined.push({
            ...card,
            tag: 'Oficial',
            source: 'custom'
          });
        }
      });
    }

    // 2. Gemini generated cards
    geminiCards.forEach(card => {
      if (!seenIds.has(card.id)) {
        seenIds.add(card.id);
        combined.push(card);
      }
    });

    // 3. Auto-extracted cards from article text
    autoExtractedCards.forEach(card => {
      if (!seenIds.has(card.id)) {
        seenIds.add(card.id);
        combined.push(card);
      }
    });

    return combined;
  }, [article.flashcards, geminiCards, autoExtractedCards]);

  // Filter cards based on pending/mastered filter
  const visibleCards = useMemo(() => {
    if (filterMode === 'pending') {
      const filtered = allCards.filter(c => !masteredIds.has(c.id));
      return filtered.length > 0 ? filtered : allCards; // fallback to all if none pending
    }
    return allCards;
  }, [allCards, filterMode, masteredIds]);

  // Reset indices on article change
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setGeminiCards([]);
    setAiError(null);
  }, [article.id]);

  // Ensure currentIndex stays within bounds
  useEffect(() => {
    if (currentIndex >= visibleCards.length) {
      setCurrentIndex(0);
    }
  }, [visibleCards.length, currentIndex]);

  // Handle Keyboard Navigation (Space for flip, Arrow keys for prev/next)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid triggering when user is typing in inputs
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [visibleCards.length]);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % visibleCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + visibleCards.length) % visibleCards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    if (visibleCards.length > 1) {
      let randomIndex = Math.floor(Math.random() * visibleCards.length);
      if (randomIndex === currentIndex) {
        randomIndex = (randomIndex + 1) % visibleCards.length;
      }
      setCurrentIndex(randomIndex);
    }
  };

  const toggleMastered = (cardId: string) => {
    setMasteredIds(prev => {
      const next = new Set(prev);
      if (next.has(cardId)) {
        next.delete(cardId);
      } else {
        next.add(cardId);
      }
      return next;
    });
  };

  // Generate deeper flashcards with Gemini
  const extractWithGemini = async () => {
    setIsAiLoading(true);
    setAiError(null);

    const fullText = `${article.code} - ${article.title}\n\n` +
      `Definição: ${article.definition}\n\n` +
      `Texto Legal: ${article.legalText || ''}\n\n` +
      `Explicação: ${article.simpleExplanation}\n\n` +
      `Pontos: ${article.importantPoints.join('; ')}\n\n` +
      `Atenção: ${article.examAlert || ''}`;

    try {
      const res = await fetch('/api/flashcards/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleCode: article.code,
          articleTitle: article.title,
          content: fullText
        })
      });

      if (!res.ok) {
        throw new Error('Erro ao conectar com servidor Gemini.');
      }

      const data = await res.json();
      if (data.flashcards && Array.isArray(data.flashcards)) {
        const formattedGeminiCards: ExtractedFlashcard[] = data.flashcards.map((c: any, idx: number) => ({
          id: `gemini-${article.id}-${idx}-${Date.now()}`,
          front: c.front,
          back: c.back,
          articleRef: c.articleRef || article.code,
          tag: c.tag || 'IA Gemini',
          source: 'gemini'
        }));

        setGeminiCards(formattedGeminiCards);
        setIsFlipped(false);
        setCurrentIndex(0);
      } else {
        throw new Error('A resposta da IA não continha o formato esperado.');
      }
    } catch (err: any) {
      console.error('Erro ao gerar flashcards via IA:', err);
      setAiError('Não foi possível extrair novos conceitos com a IA neste momento.');
    } finally {
      setIsAiLoading(false);
    }
  };

  if (visibleCards.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-neutral-500">
        Nenhum flashcard disponível para este artigo.
      </div>
    );
  }

  const currentCard = visibleCards[currentIndex];
  const isMastered = masteredIds.has(currentCard.id);
  const masteredCount = allCards.filter(c => masteredIds.has(c.id)).length;
  const progressPercent = Math.round((masteredCount / allCards.length) * 100);

  // Icon mapping for card tag
  const getTagIcon = (tag?: string) => {
    if (tag?.includes('Conceito')) return <Brain className="w-3.5 h-3.5 text-blue-500" />;
    if (tag?.includes('Exame') || tag?.includes('Atenção')) return <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />;
    if (tag?.includes('Resumo')) return <Lightbulb className="w-3.5 h-3.5 text-yellow-500" />;
    if (tag?.includes('Texto Legal')) return <FileText className="w-3.5 h-3.5 text-indigo-500" />;
    if (tag?.includes('Gemini') || tag?.includes('IA')) return <Sparkles className="w-3.5 h-3.5 text-purple-500" />;
    return <BookOpen className="w-3.5 h-3.5 text-amber-500" />;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-4 select-none">
      {/* Top Banner & AI Extraction Bar */}
      <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
        isDark ? 'bg-neutral-900/60 border-neutral-800' : isSepia ? 'bg-[#f5ead5] border-[#dfd2b5]' : 'bg-white border-neutral-200'
      }`}>
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" /> Extrator de Conceitos-Chave
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-800 dark:text-amber-300">
              {allCards.length} Cartões
            </span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Extraídos automaticamente do <strong className="text-neutral-800 dark:text-neutral-200">{article.code}</strong> para repetição espaçada.
          </p>
        </div>

        <button
          onClick={extractWithGemini}
          disabled={isAiLoading}
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 flex-shrink-0 cursor-pointer disabled:opacity-50"
        >
          {isAiLoading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Sintetizando...
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              Extrair + Conceitos com IA
            </>
          )}
        </button>
      </div>

      {aiError && (
        <div className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 p-3 rounded-xl border border-red-200 dark:border-red-800">
          {aiError}
        </div>
      )}

      {/* Progress & Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-500 dark:text-neutral-400">
        {/* Progress Bar */}
        <div className="flex-1 space-y-1">
          <div className="flex justify-between text-[11px] font-semibold">
            <span>Progresso do Artigo: {masteredCount} de {allCards.length} dominados</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center gap-1 self-end sm:self-center bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] transition-all cursor-pointer ${
              filterMode === 'all'
                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
            }`}
          >
            Todos ({allCards.length})
          </button>
          <button
            onClick={() => setFilterMode('pending')}
            className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] transition-all cursor-pointer ${
              filterMode === 'pending'
                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
            }`}
          >
            Pendentes ({allCards.length - masteredCount})
          </button>
        </div>
      </div>

      {/* 3D Flip Card Container */}
      <div className="relative group perspective-1000">
        <div
          id={`flashcard-3d-${currentCard.id}`}
          onClick={() => setIsFlipped(!isFlipped)}
          className={`min-h-[280px] md:min-h-[300px] p-8 rounded-3xl border-2 cursor-pointer transition-all duration-500 flex flex-col justify-between shadow-md hover:shadow-xl relative ${
            isFlipped
              ? isDark
                ? 'bg-gradient-to-br from-amber-950/60 via-neutral-900 to-amber-900/40 border-amber-600/70 text-amber-100'
                : isSepia
                ? 'bg-gradient-to-br from-[#e8dec5] to-[#f4e8d0] border-[#c8b793] text-[#362718]'
                : 'bg-gradient-to-br from-amber-50 via-white to-amber-100/60 border-amber-300 text-neutral-900'
              : isDark
              ? 'bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-neutral-950 border-neutral-800 text-neutral-100'
              : isSepia
              ? 'bg-[#f7f0e0] border-[#dfd2b5] text-[#3d2f1f]'
              : 'bg-white border-neutral-200 text-neutral-900'
          }`}
        >
          {/* Card Top Row */}
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 border border-neutral-200/50 dark:border-neutral-700/50">
              {getTagIcon(currentCard.tag)}
              {currentCard.tag || 'Conceito Legal'}
            </span>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-neutral-400">
                {currentIndex + 1} / {visibleCards.length}
              </span>
              <span className="text-xs px-2 py-1 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 font-medium flex items-center gap-1">
                <RotateCw className={`w-3 h-3 transition-transform duration-300 ${isFlipped ? 'rotate-180' : ''}`} />
                {isFlipped ? 'Verso (Resposta)' : 'Frente (Pergunta)'}
              </span>
            </div>
          </div>

          {/* Central Card Text Content */}
          <div className="my-6 text-center text-base md:text-xl font-medium leading-relaxed px-2 flex-1 flex items-center justify-center">
            {isFlipped ? (
              <div className="space-y-2 animate-fadeIn">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block">
                  Fundamentação / Resposta do Artigo
                </span>
                <p className="font-serif font-normal">{currentCard.back}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block">
                  Conceito / Questão de Memorização
                </span>
                <p className="font-serif font-medium">{currentCard.front}</p>
              </div>
            )}
          </div>

          {/* Card Bottom Row */}
          <div className="flex items-center justify-between text-xs pt-3 border-t border-neutral-200/50 dark:border-neutral-800/50">
            <span className="font-mono text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
              {currentCard.articleRef || displayTitle}
            </span>

            {isMastered ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 text-xs">
                <CheckCircle2 className="w-4 h-4" /> Dominado
              </span>
            ) : (
              <span className="text-neutral-400 text-[11px]">
                Pressione Espaço ou clique para virar
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Control Buttons Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="px-4 py-2.5 text-xs font-bold rounded-xl border border-neutral-300 dark:border-neutral-800 flex items-center gap-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer"
            title="Anterior (Seta Esquerda)"
          >
            <ChevronLeft className="w-4 h-4" /> Anterior
          </button>

          <button
            onClick={handleShuffle}
            className="px-3 py-2.5 text-xs font-semibold rounded-xl border border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer flex items-center gap-1"
            title="Baralhar cartões"
          >
            <Shuffle className="w-3.5 h-3.5" /> Baralhar
          </button>
        </div>

        <button
          onClick={() => toggleMastered(currentCard.id)}
          className={`px-5 py-2.5 text-xs font-bold rounded-xl border flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
            isMastered
              ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700'
              : 'border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:border-emerald-500 hover:text-emerald-600'
          }`}
        >
          <Check className="w-4 h-4" />
          {isMastered ? 'Cartão Dominado ✓' : 'Marcar como Dominado'}
        </button>

        <button
          onClick={handleNext}
          className="px-4 py-2.5 text-xs font-bold rounded-xl border border-neutral-300 dark:border-neutral-800 flex items-center gap-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer"
          title="Próximo (Seta Direita)"
        >
          Próximo <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
