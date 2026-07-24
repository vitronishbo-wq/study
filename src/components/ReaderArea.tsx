import React, { useState, useEffect } from 'react';
import { ConceptArticle, DiplomaModule, StudyMode, ModuleId } from '../types/minint';
import { SummaryView } from './SummaryView';
import { FlashcardView } from './FlashcardView';
import { QuestionPractice } from './QuestionPractice';
import { SmartQuiz } from './SmartQuiz';
import { AudioPlayer } from './AudioPlayer';
import { DpaModal } from './DpaModal';
import { DPAReferencePanel } from './DPAReferencePanel';
import { MobileQuickPicker } from './MobileQuickPicker';
import {
  CheckCircle2,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
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
  Menu,
  Compass,
  Eye,
  Target,
  Focus,
  Search
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
  onSelectArticle?: (moduleId: ModuleId, articleId: string) => void;
  studiedArticleIds?: string[];
  onImmersiveScrollChange?: (isBarsVisible: boolean) => void;
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
  onToggleExplorer,
  onSelectArticle,
  studiedArticleIds = [],
  onImmersiveScrollChange
}) => {
  const [activeMode, setActiveMode] = useState<StudyMode>('reading');
  const [showInlineQuestionAnswer, setShowInlineQuestionAnswer] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [noteText, setNoteText] = useState(articleNote);
  const [isDpaModalOpen, setIsDpaModalOpen] = useState(false);
  const [isMobileQuickPickerOpen, setIsMobileQuickPickerOpen] = useState(false);
  const [isSimpleExplanationOpen, setIsSimpleExplanationOpen] = useState(false);

  // Modo Foco State (Reading mask blur & active paragraph highlight)
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [focusedSectionId, setFocusedSectionId] = useState<string>('legalText');

  // In-Article Text Search State
  const [articleSearchQuery, setArticleSearchQuery] = useState('');
  const [isArticleSearchOpen, setIsArticleSearchOpen] = useState(false);

  // Helper to highlight search query matches in text
  const highlightMatch = (text: string) => {
    if (!articleSearchQuery || articleSearchQuery.trim().length < 2 || !text) {
      return text;
    }
    const trimmed = articleSearchQuery.trim();
    const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = text.split(new RegExp(`(${escaped})`, 'gi'));

    return parts.map((part, i) =>
      part.toLowerCase() === trimmed.toLowerCase() ? (
        <mark
          key={i}
          className="bg-amber-300 dark:bg-amber-500/80 text-neutral-900 dark:text-neutral-100 font-bold px-0.5 rounded-xs shadow-2xs"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Compute total occurrences of search query in current article
  const getSearchMatchCount = () => {
    if (!articleSearchQuery || articleSearchQuery.trim().length < 2) return 0;
    const q = articleSearchQuery.trim().toLowerCase();
    let count = 0;
    const checkStr = (str?: string) => {
      if (!str) return;
      const matches = str.toLowerCase().split(q).length - 1;
      count += Math.max(0, matches);
    };

    checkStr(article.code);
    checkStr(article.title);
    checkStr(article.legalText || article.definition);
    checkStr(article.simpleExplanation);
    article.importantPoints?.forEach(p => checkStr(p));
    checkStr(article.examAlert);
    return count;
  };

  // Auto-open simple explanation accordion if search matches
  useEffect(() => {
    if (articleSearchQuery && articleSearchQuery.trim().length >= 2 && article.simpleExplanation) {
      if (article.simpleExplanation.toLowerCase().includes(articleSearchQuery.trim().toLowerCase())) {
        setIsSimpleExplanationOpen(true);
      }
    }
  }, [articleSearchQuery, article.simpleExplanation]);

  const getFocusStyle = (sectionId: string) => {
    if (!isFocusMode) return '';
    const isFocused = focusedSectionId === sectionId;
    return isFocused
      ? 'ring-2 ring-amber-500/90 shadow-xl scale-[1.01] transition-all duration-300 z-10 opacity-100 backdrop-blur-none bg-white dark:bg-neutral-900 rounded-xl p-2 -m-2'
      : 'filter blur-[2.5px] opacity-30 grayscale-[30%] hover:blur-none hover:opacity-100 hover:grayscale-0 transition-all duration-300 cursor-pointer';
  };

  // Touch Swipe Navigation State (Left -> Next Article, Right -> Prev Article)
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const contentScrollRef = React.useRef<HTMLDivElement>(null);

  // Immersive Reading State (auto-hide toolbars on scroll down, reveal on scroll up)
  const [isBarsVisible, setIsBarsVisible] = useState(true);
  const lastScrollTopRef = React.useRef(0);

  // Scroll content area directly into view/top when selected article changes
  useEffect(() => {
    if (contentScrollRef.current) {
      contentScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsBarsVisible(true);
    lastScrollTopRef.current = 0;
    if (onImmersiveScrollChange) onImmersiveScrollChange(true);
  }, [article.id, activeMode, onImmersiveScrollChange]);

  // Immersive Scroll Listener
  useEffect(() => {
    const scrollContainer = contentScrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const currentScrollTop = scrollContainer.scrollTop;
      const scrollDelta = currentScrollTop - lastScrollTopRef.current;

      // Threshold of 8px to prevent jitter
      if (Math.abs(scrollDelta) > 8) {
        if (scrollDelta > 0 && currentScrollTop > 40) {
          // Scrolling down -> hide toolbars & footer
          setIsBarsVisible(false);
          if (onImmersiveScrollChange) onImmersiveScrollChange(false);
        } else if (scrollDelta < 0 || currentScrollTop <= 20) {
          // Scrolling up or at top -> reveal toolbars & footer
          setIsBarsVisible(true);
          if (onImmersiveScrollChange) onImmersiveScrollChange(true);
        }
        lastScrollTopRef.current = currentScrollTop;
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [onImmersiveScrollChange]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;

    // Swipe Left (distance > 60px) -> Next Article
    if (diffX > 60 && hasNext) {
      onNextArticle();
    }
    // Swipe Right (distance < -60px) -> Prev Article
    else if (diffX < -60 && hasPrev) {
      onPrevArticle();
    }

    setTouchStartX(null);
  };

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
      {/* Immersive Mode Quick Trigger Floating Button */}
      {!isBarsVisible && (
        <button
          onClick={() => {
            setIsBarsVisible(true);
            if (onImmersiveScrollChange) onImmersiveScrollChange(true);
          }}
          className="fixed top-3 right-4 z-40 px-3 py-1.5 rounded-full bg-amber-600/90 hover:bg-amber-600 text-white font-bold text-[11px] shadow-lg backdrop-blur-md flex items-center gap-1.5 animate-fadeIn transition-all cursor-pointer opacity-90 hover:opacity-100"
          title="Exibir barras de ferramentas e rodapé"
        >
          <Eye className="w-3.5 h-3.5 text-white" />
          <span>Leitura Imersiva (Exibir)</span>
        </button>
      )}

      {/* Discreet Reader Bar Options */}
      <div
        className={`px-3 md:px-6 border-b flex items-center justify-between gap-2.5 md:gap-4 select-none transition-all duration-300 ease-in-out z-20 ${
          isBarsVisible
            ? 'py-2.5 md:py-3 max-h-28 opacity-100 translate-y-0'
            : 'py-0 max-h-0 opacity-0 -translate-y-full overflow-hidden border-b-0 pointer-events-none'
        } ${
          isDark
            ? 'bg-neutral-900/80 border-neutral-800'
            : isSepia
            ? 'bg-[#f4ebd9] border-[#e2d5b5]'
            : 'bg-neutral-50 border-neutral-200'
        }`}
      >
        {/* Mobile Navigation Toggle Button & Breadcrumb Selector Info (Padrão Bíblia) */}
        <div className="flex items-center gap-1.5 truncate text-xs text-neutral-500 dark:text-neutral-400 min-w-0">
          {onToggleExplorer && (
            <button
              id="btn-mobile-toggle-explorer"
              onClick={onToggleExplorer}
              className="md:hidden flex items-center gap-1 px-2 py-1 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300 font-bold text-xs hover:bg-amber-500/20 transition-all flex-shrink-0 cursor-pointer shadow-2xs"
              title={explorerOpen ? 'Recolher Menu' : 'Abrir Módulos'}
            >
              <Menu className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Menu</span>
            </button>
          )}

          {/* Quick Breadcrumb Article Picker Button (Bíblia Style) */}
          <button
            onClick={() => setIsMobileQuickPickerOpen(true)}
            className="flex items-center gap-1 px-2 py-1 rounded-lg border border-neutral-300/80 dark:border-neutral-700 bg-neutral-100/80 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-semibold hover:border-amber-500 transition-all truncate text-xs cursor-pointer shadow-2xs"
            title="Navegação Rápida de Artigos"
          >
            <Compass className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <span className="truncate font-bold text-amber-700 dark:text-amber-400">{moduleData.code}</span>
            <span>›</span>
            <span className="truncate font-mono">{article.code}</span>
            <ChevronDown className="w-3 h-3 text-neutral-400 flex-shrink-0" />
          </button>
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
            <span>Smart Quiz IA MININT</span>
          </button>
        </div>

        {/* Text Size & Typography & Focus Mode Controls */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Modo Foco Toggle */}
          <button
            onClick={() => {
              setIsFocusMode(!isFocusMode);
              if (!isFocusMode) setFocusedSectionId('legalText');
            }}
            title={isFocusMode ? "Desativar Modo Foco" : "Ativar Modo Foco (Máscara de Leitura e Destaque de Texto)"}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isFocusMode
                ? 'bg-amber-600 text-white font-bold shadow-xs'
                : 'bg-neutral-200/50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            }`}
          >
            <Target className={`w-3.5 h-3.5 ${isFocusMode ? 'animate-pulse text-amber-200' : 'text-amber-500'}`} />
            <span>{isFocusMode ? 'Modo Foco ON' : 'Modo Foco'}</span>
          </button>

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

      {/* Main Content Scroll Container (with Touch Swipe Article Navigation) */}
      <div 
        ref={contentScrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8 md:px-12 lg:px-20"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
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
          <SmartQuiz
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

            {/* Modo Foco Active Banner */}
            {isFocusMode && (
              <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-900 dark:text-amber-200 flex items-center justify-between gap-3 text-xs shadow-sm animate-fadeIn">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-amber-600 dark:text-amber-400 animate-pulse flex-shrink-0" />
                  <div>
                    <strong className="font-bold">Modo Foco Ativo:</strong>
                    <span className="ml-1 opacity-90">Passe o cursor ou toque no parágrafo/bloco para focar. O restante permanece em máscara de leitura.</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsFocusMode(false)}
                  className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer flex-shrink-0"
                >
                  <X className="w-3.5 h-3.5" /> Sair do Foco
                </button>
              </div>
            )}

            {/* In-Article Search Bar Panel */}
            {isArticleSearchOpen && (
              <div className="p-3.5 rounded-2xl border bg-amber-500/10 border-amber-500/30 dark:bg-neutral-900/90 shadow-md animate-fadeIn space-y-2">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                  <input
                    id="input-article-search"
                    type="text"
                    value={articleSearchQuery}
                    onChange={(e) => setArticleSearchQuery(e.target.value)}
                    placeholder="Buscar palavra ou expressão dentro deste artigo..."
                    className="flex-1 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3 py-1.5 text-xs md:text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                  {articleSearchQuery && (
                    <button
                      onClick={() => setArticleSearchQuery('')}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer"
                      title="Limpar texto de busca"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setIsArticleSearchOpen(false);
                      setArticleSearchQuery('');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-xs font-semibold cursor-pointer"
                  >
                    Fechar
                  </button>
                </div>
                {articleSearchQuery.trim().length >= 2 && (
                  <div className="flex items-center justify-between text-[11px] text-neutral-600 dark:text-neutral-400 px-1 pt-0.5">
                    <span>
                      {getSearchMatchCount() > 0 ? (
                        <span className="text-amber-700 dark:text-amber-300 font-bold">
                          {getSearchMatchCount()} ocorrência(s) encontrada(s) e destacada(s)
                        </span>
                      ) : (
                        <span className="text-neutral-500 italic">
                          Nenhuma palavra correspondente encontrada neste artigo.
                        </span>
                      )}
                    </span>
                    <span className="text-[10px] text-neutral-400 hidden sm:inline">
                      Destaque em amarelo no texto abaixo
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* 1. TÍTULO */}
            <header 
              className={`border-b pb-4 border-neutral-200/80 dark:border-neutral-800 flex items-start justify-between gap-4 transition-all ${getFocusStyle('header')}`}
              onMouseEnter={() => isFocusMode && setFocusedSectionId('header')}
              onClick={() => isFocusMode && setFocusedSectionId('header')}
            >
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {article.code}
                </span>
                <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
                  {highlightMatch(article.title)}
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

                {/* Busca no Artigo Quick Button */}
                <button
                  onClick={() => {
                    setIsArticleSearchOpen(!isArticleSearchOpen);
                    if (!isArticleSearchOpen) {
                      setTimeout(() => {
                        const input = document.getElementById('input-article-search');
                        if (input) input.focus();
                      }, 50);
                    }
                  }}
                  id="btn-search-article"
                  title="Buscar palavra-chave neste artigo (Destacar Texto)"
                  className={`px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer ${
                    isArticleSearchOpen || articleSearchQuery
                      ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-500/30'
                      : 'border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                  }`}
                >
                  <Search className="w-3.5 h-3.5 text-amber-500" />
                  <span className="hidden sm:inline">Buscar</span>
                </button>

                {/* Modo Foco Quick Button */}
                <button
                  onClick={() => {
                    setIsFocusMode(!isFocusMode);
                    if (!isFocusMode) setFocusedSectionId('legalText');
                  }}
                  id="btn-modo-foco"
                  title={isFocusMode ? "Desativar Modo Foco" : "Ativar Modo Foco (Máscara de Leitura e Destaque)"}
                  className={`px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer ${
                    isFocusMode
                      ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-500/30'
                      : 'border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                  }`}
                >
                  <Target className={`w-3.5 h-3.5 ${isFocusMode ? 'text-amber-200 animate-pulse' : 'text-amber-500'}`} />
                  <span className="hidden sm:inline">{isFocusMode ? 'Foco ON' : 'Modo Foco'}</span>
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
            <section 
              className={`space-y-2 transition-all ${getFocusStyle('legalText')}`}
              onMouseEnter={() => isFocusMode && setFocusedSectionId('legalText')}
              onClick={() => isFocusMode && setFocusedSectionId('legalText')}
            >
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
                {highlightMatch(article.legalText || article.definition)}
              </div>
            </section>

            {/* 3. EXPLICAÇÃO SIMPLES (Accordion Colapsável - Padrão Móvel) */}
            <section 
              className={`space-y-2 border rounded-xl overflow-hidden border-amber-500/30 bg-amber-500/5 transition-all ${getFocusStyle('simpleExplanation')}`}
              onMouseEnter={() => isFocusMode && setFocusedSectionId('simpleExplanation')}
              onClick={() => isFocusMode && setFocusedSectionId('simpleExplanation')}
            >
              <button
                onClick={() => setIsSimpleExplanationOpen(!isSimpleExplanationOpen)}
                className="w-full p-3.5 flex items-center justify-between text-left hover:bg-amber-500/10 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                    Explicação Simples em Linguagem Clara
                  </span>
                </div>
                {isSimpleExplanationOpen ? (
                  <ChevronUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                )}
              </button>

              {isSimpleExplanationOpen && (
                <div className="p-4 pt-1 border-t border-amber-500/20 text-xs md:text-sm leading-relaxed text-neutral-800 dark:text-neutral-200 animate-in fade-in duration-150">
                  <p className="pl-3 border-l-2 border-amber-500/70">
                    {highlightMatch(article.simpleExplanation)}
                  </p>
                </div>
              )}
            </section>

            {/* 4. PONTOS IMPORTANTES */}
            <section 
              className={`space-y-2 transition-all ${getFocusStyle('importantPoints')}`}
              onMouseEnter={() => isFocusMode && setFocusedSectionId('importantPoints')}
              onClick={() => isFocusMode && setFocusedSectionId('importantPoints')}
            >
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
                    <span className="leading-relaxed">{highlightMatch(point)}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 5. ATENÇÃO PARA EXAME */}
            {article.examAlert && (
              <section 
                className={`space-y-2 transition-all ${getFocusStyle('examAlert')}`}
                onMouseEnter={() => isFocusMode && setFocusedSectionId('examAlert')}
                onClick={() => isFocusMode && setFocusedSectionId('examAlert')}
              >
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
                  <p className="text-xs md:text-sm font-medium leading-relaxed">{highlightMatch(article.examAlert)}</p>
                </div>
              </section>
            )}

            {/* 6. QUESTÃO E MOSTRAR RESPOSTA */}
            {inlineQuestion && (
              <section 
                className={`space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800 transition-all ${getFocusStyle('inlineQuestion')}`}
                onMouseEnter={() => isFocusMode && setFocusedSectionId('inlineQuestion')}
                onClick={() => isFocusMode && setFocusedSectionId('inlineQuestion')}
              >
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

            {/* 6.5. SMART QUIZ ADAPTATIVO GERADO COM IA (GEMINI) */}
            <section className="space-y-3 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Smart Quiz Gemini IA (Concurso MININT)
                </h2>
                <button
                  onClick={() => setActiveMode('quiz_ai')}
                  className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Modo Quiz Adaptativo <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <SmartQuiz
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

      {/* MOBILE BOTTOM NAVIGATION TOOLBAR (Barra de Ações Rápidas em Baixo - Smartphones) */}
      <nav
        id="mobile-bottom-action-bar"
        className={`md:hidden sticky bottom-0 left-0 right-0 border-t z-30 px-3 py-2 flex items-center justify-around gap-1 backdrop-blur-md shadow-lg select-none transition-all duration-300 ease-in-out ${
          isBarsVisible
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-full opacity-0 pointer-events-none'
        } ${
          isDark
            ? 'bg-neutral-900/95 border-neutral-800 text-neutral-300'
            : isSepia
            ? 'bg-[#f4ebd7]/95 border-[#ded0b1] text-[#3b2d1d]'
            : 'bg-white/95 border-neutral-200 text-neutral-700'
        }`}
      >
        <button
          onClick={() => setIsMobileQuickPickerOpen(true)}
          className="flex flex-col items-center gap-1 text-[10px] font-medium hover:text-amber-500 transition-colors cursor-pointer"
        >
          <Compass className="w-5 h-5 text-amber-500" />
          <span>Artigos</span>
        </button>

        <button
          onClick={() => {
            setIsFocusMode(!isFocusMode);
            if (!isFocusMode) setFocusedSectionId('legalText');
          }}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors cursor-pointer ${
            isFocusMode ? 'text-amber-500 font-bold' : 'hover:text-amber-500'
          }`}
        >
          <Target className="w-5 h-5 text-amber-500" />
          <span>{isFocusMode ? 'Foco ON' : 'Foco'}</span>
        </button>

        {ttsSupported && (
          <button
            onClick={isTtsPlaying ? handlePauseTts : handlePlayTts}
            className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors cursor-pointer ${
              isTtsPlaying ? 'text-amber-500 font-bold animate-pulse' : 'hover:text-amber-500'
            }`}
          >
            <Volume2 className="w-5 h-5" />
            <span>{isTtsPlaying ? 'Pausar' : 'Ouvir'}</span>
          </button>
        )}

        <button
          onClick={() => setNotesOpen(!notesOpen)}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors cursor-pointer ${
            noteText.trim().length > 0 ? 'text-amber-500 font-bold' : 'hover:text-amber-500'
          }`}
        >
          <StickyNote className="w-5 h-5" />
          <span>Anotações</span>
        </button>

        <button
          onClick={() => setIsDpaModalOpen(true)}
          className="flex flex-col items-center gap-1 text-[10px] font-medium hover:text-amber-500 transition-colors cursor-pointer"
        >
          <MapPin className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <span>DPA</span>
        </button>

        <button
          onClick={onToggleBookmark}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors cursor-pointer ${
            isBookmarked ? 'text-amber-500 font-bold' : 'hover:text-amber-500'
          }`}
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
          <span>Favorito</span>
        </button>

        <button
          onClick={onToggleStudied}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors cursor-pointer ${
            isStudied ? 'text-emerald-500 font-bold' : 'hover:text-amber-500'
          }`}
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>Estudado</span>
        </button>
      </nav>

      {/* MOBILE QUICK PICKER MODAL */}
      {onSelectArticle && (
        <MobileQuickPicker
          isOpen={isMobileQuickPickerOpen}
          onClose={() => setIsMobileQuickPickerOpen(false)}
          activeModuleId={moduleData.id}
          activeArticleId={article.id}
          onSelectArticle={onSelectArticle}
          studiedArticleIds={studiedArticleIds}
          theme={theme}
        />
      )}
    </main>
  );
};
