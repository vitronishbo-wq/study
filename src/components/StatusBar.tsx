import React, { useState, useMemo } from 'react';
import { WifiOff, BookOpen, BarChart2, Search, Clock, X, CheckCircle2, Zap, FileText, HelpCircle, Brain } from 'lucide-react';
import { Chapter, ConceptArticle } from '../types/minint';

interface StatusBarProps {
  currentChapterTitle: string;
  currentArticleCode: string;
  currentChapter?: Chapter;
  studiedArticleIds?: string[];
  studiedCount: number;
  totalArticles: number;
  theme: 'light' | 'dark' | 'sepia';
  onOpenQuickFind?: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  currentChapterTitle,
  currentArticleCode,
  currentChapter,
  studiedArticleIds = [],
  studiedCount,
  totalArticles,
  theme,
  onOpenQuickFind
}) => {
  const [timelineOpen, setTimelineOpen] = useState(false);

  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';

  const progressPercent = totalArticles > 0 ? Math.round((studiedCount / totalArticles) * 100) : 0;

  // Flatten articles in current chapter
  const chapterArticles: ConceptArticle[] = useMemo(() => {
    if (!currentChapter) return [];
    const list: ConceptArticle[] = [];
    if (currentChapter.articles) list.push(...currentChapter.articles);
    if (currentChapter.sections) {
      currentChapter.sections.forEach(sec => list.push(...sec.articles));
    }
    return list;
  }, [currentChapter]);

  // Calculate chapter complexity and estimated study timeline
  const timelineStats = useMemo(() => {
    if (chapterArticles.length === 0) {
      return {
        totalEstMin: 5,
        remainingMin: 5,
        readingMin: 2,
        reviewMin: 1,
        cardsMin: 1,
        quizMin: 1,
        complexityLabel: 'Baixa',
        complexityColor: 'emerald',
        studiedInChapter: 0,
        totalInChapter: 0,
        chapterProgressPct: 0
      };
    }

    let wordCount = 0;
    let questionsCount = 0;
    let flashcardsCount = 0;

    chapterArticles.forEach(art => {
      const text = `${art.legalText || ''} ${art.definition} ${art.simpleExplanation} ${(art.importantPoints || []).join(' ')} ${art.examAlert || ''}`;
      wordCount += text.split(/\s+/).filter(Boolean).length;
      questionsCount += art.questions ? art.questions.length : 0;
      flashcardsCount += art.flashcards ? art.flashcards.length : 0;
    });

    const readingMin = Math.max(1, Math.round(wordCount / 140));
    const reviewMin = Math.max(1, Math.round(chapterArticles.length * 1.5));
    const cardsMin = Math.max(1, Math.round(flashcardsCount * 0.5));
    const quizMin = Math.max(1, Math.round(questionsCount * 1.2));

    const totalEstMin = readingMin + reviewMin + cardsMin + quizMin;

    const studiedInChapter = chapterArticles.filter(art => studiedArticleIds.includes(art.id)).length;
    const totalInChapter = chapterArticles.length;
    const chapterProgressPct = totalInChapter > 0 ? Math.round((studiedInChapter / totalInChapter) * 100) : 0;

    const remainingMin = Math.max(0, Math.round(totalEstMin * (1 - studiedInChapter / totalInChapter)));

    let complexityLabel = 'Baixa';
    let complexityColor: 'emerald' | 'amber' | 'rose' = 'emerald';

    if (totalEstMin >= 16 || questionsCount >= 3) {
      complexityLabel = 'Alta (Intensa)';
      complexityColor = 'rose';
    } else if (totalEstMin >= 8) {
      complexityLabel = 'Média';
      complexityColor = 'amber';
    }

    return {
      totalEstMin,
      remainingMin,
      readingMin,
      reviewMin,
      cardsMin,
      quizMin,
      complexityLabel,
      complexityColor,
      studiedInChapter,
      totalInChapter,
      chapterProgressPct
    };
  }, [chapterArticles, studiedArticleIds]);

  return (
    <footer
      id="status-bar-container"
      className={`h-8 flex-shrink-0 px-3 md:px-4 border-t text-[11px] font-mono flex items-center justify-between select-none transition-colors duration-150 relative ${
        isDark
          ? 'bg-neutral-900 border-neutral-800/80 text-neutral-400'
          : isSepia
          ? 'bg-[#f0e7d3] border-[#e2d5b5] text-[#5e4f3c]'
          : 'bg-neutral-100 border-neutral-200 text-neutral-600'
      }`}
    >
      {/* 1. Capítulo & Artigo Atual */}
      <div className="flex items-center gap-2 truncate max-w-xs md:max-w-sm">
        <BookOpen className="w-3.5 h-3.5 opacity-70 flex-shrink-0" />
        <span className="truncate">{currentChapterTitle}</span>
        <span>•</span>
        <span className="font-semibold text-neutral-800 dark:text-neutral-200">{currentArticleCode}</span>
      </div>

      {/* 2. Quick Find (Ctrl+K) Button */}
      {onOpenQuickFind && (
        <button
          id="btn-statusbar-quickfind"
          onClick={onOpenQuickFind}
          className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors text-neutral-700 dark:text-neutral-300 font-semibold"
          title="Abrir Busca Rápida (Ctrl+K)"
        >
          <Search className="w-3 h-3 text-amber-500" />
          <span>Busca Rápida</span>
          <kbd className="hidden lg:inline-block px-1 py-0.2 bg-neutral-200 dark:bg-neutral-800 rounded text-[9px]">
            Ctrl+K
          </kbd>
        </button>
      )}

      {/* 3. Linha do Tempo & Complexidade do Capítulo */}
      <div className="relative flex items-center">
        <button
          onClick={() => setTimelineOpen(!timelineOpen)}
          title="Ver Linha do Tempo Estimada de Estudo do Capítulo"
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[10px] md:text-[11px] font-semibold transition-all ${
            timelineStats.complexityColor === 'rose'
              ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-900'
              : timelineStats.complexityColor === 'amber'
              ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-900'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-900'
          }`}
        >
          <Clock className="w-3 h-3 animate-pulse" />
          <span>~{timelineStats.remainingMin}m restantes</span>
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80 hidden md:inline-block" />
          <span className="hidden md:inline text-[9px] uppercase tracking-wider opacity-90">
            {timelineStats.complexityLabel}
          </span>
        </button>

        {/* Popover detalhado da Linha do Tempo de Estudo */}
        {timelineOpen && (
          <>
            <div
              className="fixed inset-0 z-30 bg-transparent"
              onClick={() => setTimelineOpen(false)}
            />
            <div
              className={`absolute bottom-9 right-0 w-80 md:w-96 rounded-2xl shadow-2xl border z-40 p-4 space-y-3 font-sans transition-all ${
                isDark
                  ? 'bg-neutral-900 border-neutral-700 text-neutral-100 shadow-black/70'
                  : isSepia
                  ? 'bg-[#f5ead5] border-[#ded0b1] text-[#3b2d1d] shadow-neutral-400/30'
                  : 'bg-white border-neutral-200 text-neutral-900 shadow-neutral-300/80'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider">
                      Linha do Tempo de Estudo
                    </h4>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-normal truncate max-w-[220px]">
                      {currentChapterTitle}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setTimelineOpen(false)}
                  className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Complexidade & Duração total */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className={`p-2.5 rounded-xl border flex flex-col justify-between ${
                  isDark ? 'bg-neutral-950 border-neutral-800' : isSepia ? 'bg-[#fcf7ee] border-[#e2d5b8]' : 'bg-neutral-50 border-neutral-200'
                }`}>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wide">Complexidade</span>
                  <div className="flex items-center gap-1.5 font-bold mt-1">
                    <span className={`w-2 h-2 rounded-full ${
                      timelineStats.complexityColor === 'rose' ? 'bg-rose-500' : timelineStats.complexityColor === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`} />
                    <span>{timelineStats.complexityLabel}</span>
                  </div>
                </div>

                <div className={`p-2.5 rounded-xl border flex flex-col justify-between ${
                  isDark ? 'bg-neutral-950 border-neutral-800' : isSepia ? 'bg-[#fcf7ee] border-[#e2d5b8]' : 'bg-neutral-50 border-neutral-200'
                }`}>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wide">Tempo Estimado</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-base font-extrabold text-amber-600 dark:text-amber-400">
                      ~{timelineStats.totalEstMin}
                    </span>
                    <span className="text-xs font-medium text-neutral-500">minutos</span>
                  </div>
                </div>
              </div>

              {/* Barra de Progresso do Capítulo */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                  <span>Progresso no Capítulo</span>
                  <span>{timelineStats.studiedInChapter} de {timelineStats.totalInChapter} artigos ({timelineStats.chapterProgressPct}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${timelineStats.chapterProgressPct}%` }}
                  />
                </div>
              </div>

              {/* Fases do Cronograma do Capítulo */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Fases Sugeridas de Preparação
                </span>

                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/60 dark:border-neutral-800/60">
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-blue-500" />
                      <span>1. Leitura do Texto Legal & Explicação</span>
                    </div>
                    <span className="font-semibold text-neutral-500 text-[11px]">~{timelineStats.readingMin}m</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/60 dark:border-neutral-800/60">
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>2. Pontos-Chave & Alertas de Prova</span>
                    </div>
                    <span className="font-semibold text-neutral-500 text-[11px]">~{timelineStats.reviewMin}m</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/60 dark:border-neutral-800/60">
                    <div className="flex items-center gap-2">
                      <Brain className="w-3.5 h-3.5 text-purple-500" />
                      <span>3. Memorização por Flashcards</span>
                    </div>
                    <span className="font-semibold text-neutral-500 text-[11px]">~{timelineStats.cardsMin}m</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/60 dark:border-neutral-800/60">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-3.5 h-3.5 text-emerald-500" />
                      <span>4. Resolução de Questões</span>
                    </div>
                    <span className="font-semibold text-neutral-500 text-[11px]">~{timelineStats.quizMin}m</span>
                  </div>
                </div>
              </div>

              {/* Mensagem de incentivo */}
              <div className="flex items-center gap-2 p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-[11px]">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-amber-500" />
                <span>
                  {timelineStats.remainingMin === 0
                    ? '🎉 Capítulo concluído! Excelente ritmo de estudo!'
                    : `Faltam aproximadamente ~${timelineStats.remainingMin} min para dominar totalmente este capítulo.`}
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 4. Progresso Geral do Módulo */}
      <div className="hidden lg:flex items-center gap-2">
        <BarChart2 className="w-3.5 h-3.5 opacity-70" />
        <span>
          Módulo: {studiedCount}/{totalArticles} ({progressPercent}%)
        </span>
        <div className="w-16 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden ml-1">
          <div
            className="h-full bg-amber-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 5. Modo Offline */}
      <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
        <WifiOff className="w-3.5 h-3.5" />
        <span className="text-[10px] uppercase tracking-wide">100% Offline</span>
      </div>
    </footer>
  );
};

