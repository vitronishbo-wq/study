import React, { useState, useEffect } from 'react';
import { ConceptArticle, DiplomaModule, StudyMode } from '../types/minint';
import { SummaryView } from './SummaryView';
import { FlashcardView } from './FlashcardView';
import { QuestionPractice } from './QuestionPractice';
import { ArticleAiQuiz } from './ArticleAiQuiz';
import { AudioPlayer } from './AudioPlayer';
import { DpaModal } from './DpaModal';
import { DPAReferencePanel } from './DPAReferencePanel';
import {
  CheckCircle2,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  HelpCircle,
  BookOpen,
  FileText,
  Layers,
  HelpCircle as QuestionIcon,
  AArrowUp,
  AArrowDown,
  StickyNote,
  X,
  Check,
  Trash2,
  Sparkles,
  Bot,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  MapPin,
  Menu
} from 'lucide-react';

interface ReaderAreaProps {
  moduleData: DiplomaModule;
  article: ConceptArticle;
  chapterTitle: string;
  sectionTitle?: string;
  theme: 'light' | 'dark' | 'sepia';
  fontSize: 'sm' | 'md' | 'lg' | 'xl';
  onChangeFontSize: (size: 'sm' | 'md' | 'lg' | 'xl') => void;
  fontFamily: 'sans' | 'serif' | 'mono';
  onChangeFontFamily: (family: 'sans' | 'serif' | 'mono') => void;
  isStudied: boolean;
  onToggleStudied: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  articleNote?: string;
  onSaveNote?: (noteText: string) => void;
  onNextArticle: () => void;
  onPrevArticle: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  onSaveQuizScore?: (correct: number, total: number) => void;
  explorerOpen?: boolean;
  onToggleExplorer?: () => void;
}

export const ReaderArea: React.FC<ReaderAreaProps> = ({
  moduleData,
  article,
  chapterTitle,
  sectionTitle,
  theme,
  fontSize,
  onChangeFontSize,
  fontFamily,
  onChangeFontFamily,
  isStudied,
  onToggleStudied,
  isBookmarked,
  onToggleBookmark,
  articleNote = '',
  onSaveNote,
  onNextArticle,
  onPrevArticle,
  hasNext,
  hasPrev,
  onSaveQuizScore,
  explorerOpen,
  onToggleExplorer
}) => {
  const [activeMode, setActiveMode] = useState<StudyMode>('reading');
  const [showInlineQuestionAnswer, setShowInlineQuestionAnswer] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [noteText, setNoteText] = useState(articleNote);
  const [isDpaModalOpen, setIsDpaModalOpen] = useState(false);

  // Sync internal note text when article changes or external prop changes
  useEffect(() => {
    setNoteText(articleNote);
  }, [article.id, articleNote]);

  // Text-to-Speech (TTS) State
  const [ttsSupported, setTtsSupported] = useState<boolean>(true);
  const [isTtsPlaying, setIsTtsPlaying] = useState<boolean>(false);
  const [isTtsPaused, setIsTtsPaused] = useState<boolean>(false);
  const [ttsRate, setTtsRate] = useState<number>(1.0);
  const [ttsVoices, setTtsVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState<number>(0);

  // Initialize SpeechSynthesis and Voice options
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setTtsSupported(false);
      return;
    }

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setTtsVoices(availableVoices);
      // Try finding a Portuguese voice (pt-PT or pt-BR)
      const ptIndex = availableVoices.findIndex(v => v.lang.toLowerCase().startsWith('pt'));
      if (ptIndex !== -1) {
        setSelectedVoiceIndex(ptIndex);
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Cancel speech synthesis whenever current article changes
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsTtsPlaying(false);
      setIsTtsPaused(false);
    }
  }, [article.id]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Build full readable string for current article
  const buildSpeechText = (): string => {
    const parts: string[] = [];
    parts.push(`${article.code}: ${article.title}.`);
    if (article.legalText) {
      parts.push(`Texto legal: ${article.legalText}`);
    } else if (article.definition) {
      parts.push(`Definição: ${article.definition}`);
    }
    if (article.simpleExplanation) {
      parts.push(`Explicação simples: ${article.simpleExplanation}`);
    }
    if (article.importantPoints && article.importantPoints.length > 0) {
      parts.push(`Pontos importantes: ${article.importantPoints.join('. ')}`);
    }
    return parts.join(' ');
  };

  const handlePlayTts = () => {
    if (!ttsSupported || typeof window === 'undefined') return;

    if (isTtsPaused) {
      window.speechSynthesis.resume();
      setIsTtsPlaying(true);
      setIsTtsPaused(false);
      return;
    }

    window.speechSynthesis.cancel();

    const textToRead = buildSpeechText();
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = ttsRate;

    if (ttsVoices.length > 0 && ttsVoices[selectedVoiceIndex]) {
      utterance.voice = ttsVoices[selectedVoiceIndex];
    } else {
      utterance.lang = 'pt-PT';
    }

    utterance.onend = () => {
      setIsTtsPlaying(false);
      setIsTtsPaused(false);
    };

    utterance.onerror = () => {
      setIsTtsPlaying(false);
      setIsTtsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsTtsPlaying(true);
    setIsTtsPaused(false);
  };

  const handlePauseTts = () => {
    if (!ttsSupported || typeof window === 'undefined') return;
    if (isTtsPlaying) {
      window.speechSynthesis.pause();
      setIsTtsPlaying(false);
      setIsTtsPaused(true);
    }
  };

  const handleStopTts = () => {
    if (!ttsSupported || typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    setIsTtsPlaying(false);
    setIsTtsPaused(false);
  };

  const handleRateChange = (newRate: number) => {
    setTtsRate(newRate);
    if (isTtsPlaying) {
      window.speechSynthesis.cancel();
      setTimeout(() => {
        handlePlayTts();
      }, 50);
    }
  };

  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';

  // Font size class mapper
  const fontSizeClasses = {
    sm: 'text-xs md:text-sm leading-relaxed',
    md: 'text-sm md:text-base leading-relaxed',
    lg: 'text-base md:text-lg leading-relaxed',
    xl: 'text-lg md:text-xl leading-relaxed'
  }[fontSize];

  // Font family class mapper
  const fontFamilyClass = {
    sans: 'font-sans',
    serif: 'font-serif',
    mono: 'font-mono'
  }[fontFamily];

  // Inline question from reading view
  const inlineQuestion = article.questions && article.questions[0];

  return (
    <main
      id="main-reader-container"
      className={`flex-1 flex flex-col h-full overflow-hidden transition-colors duration-150 ${
        isDark
          ? 'bg-neutral-950 text-neutral-100'
          : isSepia
          ? 'bg-[#faf4e8] text-[#3b2d1d]'
          : 'bg-white text-neutral-900'
      }`}
    >
      {/* Discreet Reader Bar Options */}
      <div
        className={`px-3 md:px-6 py-2.5 md:py-3 border-b flex items-center justify-between gap-2.5 md:gap-4 select-none ${
          isDark
            ? 'bg-neutral-900/80 border-neutral-800'
            : isSepia
            ? 'bg-[#f4ebd9] border-[#e2d5b5]'
            : 'bg-neutral-50 border-neutral-200'
        }`}
      >
        {/* Mobile Navigation Toggle Button & Breadcrumb Info */}
        <div className="flex items-center gap-2 truncate text-xs text-neutral-500 dark:text-neutral-400 min-w-0">
          {onToggleExplorer && (
            <button
              id="btn-mobile-toggle-explorer"
              onClick={onToggleExplorer}
              className="md:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300 font-bold text-xs hover:bg-amber-500/20 transition-all flex-shrink-0 cursor-pointer shadow-2xs"
              title={explorerOpen ? 'Recolher Menu' : 'Abrir Módulos e Conteúdos'}
            >
              <Menu className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Módulos</span>
            </button>
          )}

          <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate">{moduleData.shortTitle}</span>
          <span>›</span>
          <span className="truncate hidden sm:inline">{chapterTitle}</span>
          {sectionTitle && (
            <>
              <span className="hidden sm:inline">›</span>
              <span className="truncate hidden md:inline">{sectionTitle}</span>
            </>
          )}
        </div>

        {/* Study Mode Selector Pills */}
        <div className="flex items-center gap-1 bg-neutral-200/60 dark:bg-neutral-800 p-1 rounded-lg text-xs font-medium">
          <button
            onClick={() => setActiveMode('reading')}
            className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-all ${
              activeMode === 'reading'
                ? isDark
                  ? 'bg-amber-950 text-amber-300 font-semibold shadow-xs'
                  : 'bg-white text-neutral-900 font-semibold shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Leitura</span>
          </button>

          <button
            onClick={() => setActiveMode('summary')}
            className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-all ${
              activeMode === 'summary'
                ? isDark
                  ? 'bg-amber-950 text-amber-300 font-semibold shadow-xs'
                  : 'bg-white text-neutral-900 font-semibold shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resumo</span>
          </button>

          <button
            onClick={() => setActiveMode('flashcards')}
            className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-all ${
              activeMode === 'flashcards'
                ? isDark
                  ? 'bg-amber-950 text-amber-300 font-semibold shadow-xs'
                  : 'bg-white text-neutral-900 font-semibold shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Flashcards ({article.flashcards.length})</span>
          </button>

          <button
            onClick={() => setActiveMode('questions')}
            className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-all ${
              activeMode === 'questions'
                ? isDark
                  ? 'bg-amber-950 text-amber-300 font-semibold shadow-xs'
                  : 'bg-white text-neutral-900 font-semibold shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            <QuestionIcon className="w-3.5 h-3.5" />
            <span>Questões ({article.questions.length})</span>
          </button>

          <button
            onClick={() => setActiveMode('quiz_ai')}
            className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-all ${
              activeMode === 'quiz_ai'
                ? isDark
                  ? 'bg-amber-950 text-amber-300 font-semibold shadow-xs'
                  : 'bg-white text-neutral-900 font-semibold shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Quiz IA (3 Questões)</span>
          </button>
        </div>

        {/* Text Size & Typography Controls */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Typography Family */}
          <div className="flex items-center bg-neutral-200/50 dark:bg-neutral-800 rounded-md p-0.5 text-[11px]">
            <button
              onClick={() => onChangeFontFamily('serif')}
              className={`px-2 py-0.5 rounded font-serif ${
                fontFamily === 'serif' ? 'bg-white dark:bg-neutral-700 shadow-xs font-bold' : 'opacity-70'
              }`}
            >
              Serif
            </button>
            <button
              onClick={() => onChangeFontFamily('sans')}
              className={`px-2 py-0.5 rounded font-sans ${
                fontFamily === 'sans' ? 'bg-white dark:bg-neutral-700 shadow-xs font-bold' : 'opacity-70'
              }`}
            >
              Sans
            </button>
          </div>

          {/* Size Adjusters */}
          <div className="flex items-center gap-1 border-l border-neutral-300 dark:border-neutral-800 pl-2">
            <button
              onClick={() => {
                if (fontSize === 'xl') onChangeFontSize('lg');
                else if (fontSize === 'lg') onChangeFontSize('md');
                else if (fontSize === 'md') onChangeFontSize('sm');
              }}
              title="Diminuir tamanho do texto"
              className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
            >
              <AArrowDown className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                if (fontSize === 'sm') onChangeFontSize('md');
                else if (fontSize === 'md') onChangeFontSize('lg');
                else if (fontSize === 'lg') onChangeFontSize('xl');
              }}
              title="Aumentar tamanho do texto"
              className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
            >
              <AArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Scroll Container */}
      <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 lg:px-20">
        {activeMode === 'summary' && (
          <SummaryView
            article={article}
            theme={theme}
            isStudied={isStudied}
            onToggleStudied={onToggleStudied}
            isBookmarked={isBookmarked}
            onToggleBookmark={onToggleBookmark}
          />
        )}

        {activeMode === 'flashcards' && (
          <FlashcardView
            article={article}
            theme={theme}
            articleTitle={`${article.code} - ${article.title}`}
          />
        )}

        {activeMode === 'questions' && (
          <QuestionPractice
            questions={article.questions}
            theme={theme}
            articleTitle={`${article.code} - ${article.title}`}
            onSaveScore={onSaveQuizScore}
          />
        )}

        {activeMode === 'quiz_ai' && (
          <ArticleAiQuiz
            article={article}
            theme={theme}
            onSaveQuizScore={onSaveQuizScore}
          />
        )}

        {/* STRICT LEITURA MODE (Adhering to Master Directive Order) */}
        {activeMode === 'reading' && (
          <article className={`max-w-3xl mx-auto space-y-6 ${fontFamilyClass}`}>
            {/* AudioPlayer Component at the Top */}
            <AudioPlayer article={article} theme={theme} />

            {/* DPA Quick Reference Panel (Lei n.º 14/24 - 21 Províncias) */}
            <DPAReferencePanel
              theme={theme}
              onOpenFullModal={() => setIsDpaModalOpen(true)}
            />

            {/* 1. TÍTULO */}
            <header className="border-b pb-4 border-neutral-200/80 dark:border-neutral-800 flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {article.code}
                </span>
                <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
                  {article.title}
                </h1>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Notes Popover Button */}
                <div className="relative">
                  <button
                    onClick={() => setNotesOpen(!notesOpen)}
                    title={noteText.trim().length > 0 ? "Anotações guardadas (clique para abrir)" : "Adicionar anotação a este artigo"}
                    className={`p-2 rounded-lg border transition-all relative flex items-center gap-1.5 text-xs font-medium ${
                      noteText.trim().length > 0
                        ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800 font-semibold'
                        : 'border-neutral-300 dark:border-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
                    }`}
                  >
                    <StickyNote className="w-4 h-4" />
                    <span className="hidden sm:inline">Anotação</span>
                    {noteText.trim().length > 0 && (
                      <span className="w-2 h-2 rounded-full bg-amber-500 absolute -top-0.5 -right-0.5 ring-2 ring-white dark:ring-neutral-950 animate-pulse" />
                    )}
                  </button>

                  {/* Discrete Notes Popover Panel */}
                  {notesOpen && (
                    <>
                      {/* Invisible backdrop to dismiss popover without disrupting scroll or reading */}
                      <div
                        className="fixed inset-0 z-20 bg-transparent"
                        onClick={() => setNotesOpen(false)}
                      />

                      <div
                        className={`absolute right-0 mt-2 w-80 md:w-96 rounded-2xl shadow-xl border z-30 p-4 space-y-3 transition-all ${
                          isDark
                            ? 'bg-neutral-900 border-neutral-700 text-neutral-100 shadow-black/50'
                            : isSepia
                            ? 'bg-[#f5ead5] border-[#ded0b1] text-[#3b2d1d] shadow-neutral-400/20'
                            : 'bg-white border-neutral-200 text-neutral-900 shadow-neutral-200/80'
                        }`}
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800">
                          <div className="flex items-center gap-2">
                            <StickyNote className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                            <span className="text-xs font-bold uppercase tracking-wider">
                              Anotações ({article.code})
                            </span>
                          </div>
                          <button
                            onClick={() => setNotesOpen(false)}
                            className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <textarea
                          value={noteText}
                          onChange={(e) => {
                            const val = e.target.value;
                            setNoteText(val);
                            onSaveNote?.(val);
                          }}
                          placeholder="Escreva suas anotações, resumos pessoais ou lembretes sobre este artigo..."
                          rows={5}
                          className={`w-full p-3 text-xs md:text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none ${
                            isDark
                              ? 'bg-neutral-950 border-neutral-800 text-neutral-100 placeholder-neutral-600'
                              : isSepia
                              ? 'bg-[#fcf7ee] border-[#e2d5b8] text-[#362718] placeholder-[#a39274]'
                              : 'bg-neutral-50 border-neutral-200 text-neutral-900 placeholder-neutral-400'
                          }`}
                          autoFocus
                        />

                        <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
                          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                            <Check className="w-3 h-3" /> Salvo automaticamente
                          </span>
                          {noteText.trim().length > 0 && (
                            <button
                              onClick={() => {
                                setNoteText('');
                                onSaveNote?.('');
                              }}
                              className="text-red-500 hover:underline flex items-center gap-1 font-medium transition-colors"
                            >
                              <Trash2 className="w-3 h-3" /> Limpar nota
                            </button>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* DPA Quick Reference Button (Lei n.º 14/24) */}
                <button
                  onClick={() => setIsDpaModalOpen(true)}
                  id="btn-dpa-reference"
                  title="Consultar Nova Divisão Político-Administrativa (21 Províncias - Lei n.º 14/24)"
                  className="px-2.5 py-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-300 hover:bg-amber-500/20 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span className="hidden sm:inline">DPA (21 Províncias)</span>
                </button>

                {/* Audio Reader TTS Quick Button */}
                {ttsSupported && (
                  <button
                    onClick={isTtsPlaying ? handlePauseTts : handlePlayTts}
                    title={isTtsPlaying ? 'Pausar Áudio-Leitura' : 'Ouvir Artigo em Voz Alta (TTS)'}
                    className={`p-2 rounded-lg border transition-all flex items-center gap-1.5 text-xs font-medium cursor-pointer ${
                      isTtsPlaying
                        ? 'bg-amber-500 text-white border-amber-600 shadow-xs animate-pulse font-bold'
                        : isTtsPaused
                        ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200'
                        : 'border-neutral-300 dark:border-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span className="hidden md:inline">
                      {isTtsPlaying ? 'Pausar' : isTtsPaused ? 'Continuar' : 'Ouvir'}
                    </span>
                  </button>
                )}

                <button
                  onClick={onToggleBookmark}
                  title={isBookmarked ? 'Remover dos Favoritos' : 'Guardar nos Favoritos'}
                  className={`p-2 rounded-lg border transition-all ${
                    isBookmarked
                      ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
                      : 'border-neutral-300 dark:border-neutral-800 text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={onToggleStudied}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                    isStudied
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800'
                      : 'border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {isStudied ? 'Estudado' : 'Marcar Estudado'}
                </button>
              </div>
            </header>

            {/* Text-To-Speech (TTS) Control Bar */}
            {ttsSupported && (
              <div
                id="tts-player-bar"
                className={`p-3.5 rounded-2xl border flex flex-wrap items-center justify-between gap-3 transition-all ${
                  isTtsPlaying
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-900 dark:text-amber-200'
                    : isDark
                    ? 'bg-neutral-900/60 border-neutral-800'
                    : isSepia
                    ? 'bg-[#f4ead5] border-[#ded0b1]'
                    : 'bg-neutral-50 border-neutral-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl ${isTtsPlaying ? 'bg-amber-500 text-white animate-pulse' : 'bg-neutral-200/80 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'}`}>
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block">
                      {isTtsPlaying
                        ? 'A ler artigo em voz alta...'
                        : isTtsPaused
                        ? 'Áudio pausado'
                        : 'Áudio-Leitura em Voz Alta (TTS)'}
                    </span>
                    <span className="text-[11px] opacity-70 block">
                      {isTtsPlaying
                        ? 'Clique em pausar ou parar para interromper a leitura'
                        : 'Ouve a leitura automática do texto legal e definições'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Play / Pause Button */}
                  {!isTtsPlaying ? (
                    <button
                      onClick={handlePlayTts}
                      id="btn-tts-play"
                      className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isTtsPaused ? 'Continuar' : 'Ouvir'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={handlePauseTts}
                      id="btn-tts-pause"
                      className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                    >
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>Pausar</span>
                    </button>
                  )}

                  {/* Stop Button */}
                  {(isTtsPlaying || isTtsPaused) && (
                    <button
                      onClick={handleStopTts}
                      id="btn-tts-stop"
                      className="px-3.5 py-1.5 rounded-xl bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>Parar</span>
                    </button>
                  )}

                  {/* Speed Rate selector */}
                  <div className="flex items-center gap-1 bg-neutral-200/60 dark:bg-neutral-800/80 p-1 rounded-xl text-[11px]">
                    {[0.8, 1.0, 1.25, 1.5].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => handleRateChange(rate)}
                        className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                          ttsRate === rate
                            ? 'bg-amber-500 text-white shadow-xs'
                            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>

                  {/* Voice selector */}
                  {ttsVoices.length > 1 && (
                    <select
                      value={selectedVoiceIndex}
                      onChange={(e) => setSelectedVoiceIndex(Number(e.target.value))}
                      className="text-xs p-1 rounded-xl border bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none max-w-[140px] truncate"
                      title="Escolher Voz do Sistema"
                    >
                      {ttsVoices.map((voice, idx) => (
                        <option key={idx} value={idx}>
                          {voice.name} ({voice.lang})
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            )}

            {/* 2. DEFINIÇÃO / TEXTO LEGAL COMPLETO */}
            <section className="space-y-2">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                {article.legalText ? 'Texto Legal Oficial (Diploma Integra)' : 'Definição e Conceito Base'}
              </h2>
              <div
                className={`p-5 rounded-xl border leading-relaxed ${fontSizeClasses} ${
                  isDark
                    ? 'bg-neutral-900/50 border-neutral-800 text-neutral-200'
                    : isSepia
                    ? 'bg-[#f5ead5] border-[#ded0b1] text-[#362718]'
                    : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                }`}
              >
                {article.legalText || article.definition}
              </div>
            </section>

            {/* 3. EXPLICAÇÃO SIMPLES */}
            <section className="space-y-2">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Explicação Simples
              </h2>
              <p
                className={`${fontSizeClasses} text-neutral-800 dark:text-neutral-300 bg-transparent pl-3 border-l-2 border-amber-500/70`}
              >
                {article.simpleExplanation}
              </p>
            </section>

            {/* 4. PONTOS IMPORTANTES */}
            <section className="space-y-2">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Pontos Importantes
              </h2>
              <ul className="space-y-2">
                {article.importantPoints.map((point, idx) => (
                  <li
                    key={idx}
                    className={`p-3 rounded-lg border text-xs md:text-sm flex items-start gap-2.5 ${
                      isDark
                        ? 'bg-neutral-900/30 border-neutral-800/80 text-neutral-300'
                        : isSepia
                        ? 'bg-[#f7f0df] border-[#e2d5b7] text-[#423323]'
                        : 'bg-white border-neutral-200 text-neutral-800'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 mt-2" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 5. ATENÇÃO PARA EXAME */}
            {article.examAlert && (
              <section className="space-y-2">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Atenção para Exame
                </h2>
                <div
                  className={`p-4 rounded-xl border flex items-start gap-3 ${
                    isDark
                      ? 'bg-amber-950/20 border-amber-800/40 text-amber-200'
                      : isSepia
                      ? 'bg-[#e8d2a2]/30 border-[#c2aa78] text-[#423323]'
                      : 'bg-amber-50 border-amber-200 text-amber-950'
                  }`}
                >
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs md:text-sm font-medium leading-relaxed">{article.examAlert}</p>
                </div>
              </section>
            )}

            {/* 6. QUESTÃO E MOSTRAR RESPOSTA */}
            {inlineQuestion && (
              <section className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  Questão Prática de Fixação
                </h2>
                <div
                  className={`p-5 rounded-xl border space-y-3 ${
                    isDark
                      ? 'bg-neutral-900/40 border-neutral-800'
                      : isSepia
                      ? 'bg-[#f4ebd7] border-[#ded0b1]'
                      : 'bg-neutral-50/80 border-neutral-200'
                  }`}
                >
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
                    {inlineQuestion.question}
                  </p>

                  <div className="space-y-1.5">
                    {inlineQuestion.options.map((opt, optIdx) => (
                      <div
                        key={optIdx}
                        className={`p-2.5 rounded-lg border text-xs flex items-center gap-2 ${
                          showInlineQuestionAnswer && optIdx === inlineQuestion.correctAnswer
                            ? 'bg-emerald-100 border-emerald-400 text-emerald-950 dark:bg-emerald-950/80 dark:border-emerald-700 dark:text-emerald-200 font-bold'
                            : 'bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800'
                        }`}
                      >
                        <span className="font-mono font-bold text-neutral-400">
                          {String.fromCharCode(65 + optIdx)})
                        </span>
                        <span>{opt}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => setShowInlineQuestionAnswer(!showInlineQuestionAnswer)}
                      className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      {showInlineQuestionAnswer ? 'Ocultar Resposta' : 'Mostrar Resposta'}
                    </button>
                  </div>

                  {showInlineQuestionAnswer && (
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs leading-relaxed text-neutral-800 dark:text-neutral-200">
                      <span className="font-bold block text-amber-800 dark:text-amber-400">
                        Resposta Correta: Opção {String.fromCharCode(65 + inlineQuestion.correctAnswer)}
                      </span>
                      <p className="mt-0.5">{inlineQuestion.explanation}</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* 6.5. QUIZ RÁPIDO GERADO COM IA (GEMINI) */}
            <section className="space-y-3 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Quiz Rápido Gemini IA
                </h2>
                <button
                  onClick={() => setActiveMode('quiz_ai')}
                  className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Modo Quiz Exclusivo <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <ArticleAiQuiz
                article={article}
                theme={theme}
                onSaveQuizScore={onSaveQuizScore}
              />
            </section>

            {/* 7. SEGUINTE BUTTON (Master Order Directive) */}
            <footer className="pt-8 pb-12 flex items-center justify-between border-t border-neutral-200 dark:border-neutral-800 select-none">
              <button
                onClick={onPrevArticle}
                disabled={!hasPrev}
                className="px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 disabled:opacity-30 border-neutral-300 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
              >
                <ChevronLeft className="w-4 h-4" /> Anterior
              </button>

              <button
                onClick={onNextArticle}
                disabled={!hasNext}
                className="px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs disabled:opacity-30 bg-amber-900 text-amber-50 hover:bg-amber-800 dark:bg-amber-500 dark:text-neutral-950 dark:hover:bg-amber-400 transition-all"
              >
                Seguinte Artigo <ChevronRight className="w-4 h-4" />
              </button>
            </footer>
          </article>
        )}
      </div>

      {/* DPA Legal Reference Modal (Lei n.º 14/24) */}
      <DpaModal
        isOpen={isDpaModalOpen}
        onClose={() => setIsDpaModalOpen(false)}
        theme={theme}
      />
    </main>
  );
};
