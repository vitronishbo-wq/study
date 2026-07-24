import React, { useState, useEffect, useMemo } from 'react';
import { ALL_MODULES, getModuleById, getAllArticlesInModule, findArticleById } from './data';
import { ModuleId } from './types/minint';
import { useStudyState } from './hooks/useStudyState';
import { Sidebar } from './components/Sidebar';
import { Explorer } from './components/Explorer';
import { ReaderArea } from './components/ReaderArea';
import { StatusBar } from './components/StatusBar';
import { QuickFindModal } from './components/QuickFindModal';
import { StudyStatsModal } from './components/StudyStatsModal';
import { ChevronRight, Menu, BookOpen, Layers } from 'lucide-react';

export default function App() {
  const [activeModuleId, setActiveModuleId] = useState<ModuleId>('constituição');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  // Default explorerOpen to false on smartphones (< 768px) for clean YouVersion text reading
  const [explorerOpen, setExplorerOpen] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 768 : false);
  const [quickFindOpen, setQuickFindOpen] = useState(false);
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const [isBarsVisible, setIsBarsVisible] = useState(true);

  const {
    progress,
    toggleStudied,
    toggleBookmark,
    setFontSize,
    setFontFamily,
    setTheme,
    saveQuizScore,
    saveNote
  } = useStudyState();

  // Active module data
  const currentModule = useMemo(() => getModuleById(activeModuleId), [activeModuleId]);

  // All articles in the active module
  const allArticles = useMemo(() => getAllArticlesInModule(currentModule), [currentModule]);

  // Default to first article when changing module if active article isn't in module
  useEffect(() => {
    if (allArticles.length > 0) {
      const exists = allArticles.some(a => a.id === activeArticleId);
      if (!exists) {
        setActiveArticleId(allArticles[0].id);
      }
    }
  }, [activeModuleId, allArticles, activeArticleId]);

  // Current active article details
  const articleDetail = useMemo(() => {
    if (!activeArticleId) return null;
    return findArticleById(currentModule, activeArticleId);
  }, [currentModule, activeArticleId]);

  const activeArticle = articleDetail?.article || allArticles[0];

  // Navigation handlers
  const currentArticleIndex = allArticles.findIndex(a => a.id === activeArticle?.id);
  const hasNext = currentArticleIndex < allArticles.length - 1;
  const hasPrev = currentArticleIndex > 0;

  const handleNextArticle = () => {
    if (hasNext) {
      setActiveArticleId(allArticles[currentArticleIndex + 1].id);
    }
  };

  const handlePrevArticle = () => {
    if (hasPrev) {
      setActiveArticleId(allArticles[currentArticleIndex - 1].id);
    }
  };

  // Theme toggle helper
  const handleToggleTheme = () => {
    if (progress.theme === 'light') setTheme('sepia');
    else if (progress.theme === 'sepia') setTheme('dark');
    else setTheme('light');
  };

  // Keyboard shortcuts (Arrow navigation & Ctrl+K / Cmd+K Quick Find)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Trigger Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setQuickFindOpen(prev => !prev);
        return;
      }

      // Don't trigger arrows if user typing in input or modal open
      if (
        quickFindOpen ||
        ['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)
      ) {
        return;
      }

      if (e.key === 'ArrowRight') {
        if (hasNext) handleNextArticle();
      } else if (e.key === 'ArrowLeft') {
        if (hasPrev) handlePrevArticle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasNext, hasPrev, currentArticleIndex, allArticles, quickFindOpen]);

  const handleSelectQuickFindResult = (moduleId: ModuleId, articleId: string) => {
    setActiveModuleId(moduleId);
    setActiveArticleId(articleId);
  };

  // Touch Swipe Gesture State for Mobile Drawer (Left Edge Swipe to Open, Drawer Swipe Left to Close)
  const [edgeTouchStart, setEdgeTouchStart] = useState<{ x: number; y: number } | null>(null);

  const handleGlobalTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setEdgeTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleGlobalTouchEnd = (e: React.TouchEvent) => {
    if (!edgeTouchStart) return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - edgeTouchStart.x;
    const deltaY = Math.abs(touch.clientY - edgeTouchStart.y);

    // Only handle horizontal swipes if vertical scroll displacement is small (< 80px)
    if (deltaY < 80) {
      // 1. Swipe Right from Left Edge (startX < 60px) -> Open Drawer
      if (edgeTouchStart.x < 60 && deltaX > 50 && !explorerOpen) {
        setExplorerOpen(true);
      }
      // 2. Swipe Left when Drawer is Open -> Close Drawer
      else if (deltaX < -60 && explorerOpen) {
        setExplorerOpen(false);
      }
    }
    setEdgeTouchStart(null);
  };

  return (
    <div
      id="app-root-shell"
      className={`w-screen h-screen flex flex-col overflow-hidden font-sans ${
        progress.theme === 'dark' ? 'dark bg-neutral-950 text-neutral-100' : 'bg-neutral-50 text-neutral-900'
      }`}
      onTouchStart={handleGlobalTouchStart}
      onTouchEnd={handleGlobalTouchEnd}
    >
      {/* Top Main Layout: Sidebar + Explorer + Reader Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* MOBILE BACKDROP OVERLAY FOR SMARTPHONE DRAWER */}
        {explorerOpen && (
          <div
            id="mobile-explorer-backdrop"
            className="fixed inset-0 bg-neutral-950/75 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-150"
            onClick={() => setExplorerOpen(false)}
          />
        )}

        {/* MOBILE EDGE PULL HANDLE (Puxador Lateral Oculto para sinalizar o menu) */}
        {!explorerOpen && (
          <button
            onClick={() => setExplorerOpen(true)}
            className="md:hidden fixed left-0 top-1/2 -translate-y-1/2 z-30 bg-amber-500/90 text-neutral-950 p-1.5 rounded-r-xl shadow-lg border-y border-r border-amber-400/50 flex items-center gap-0.5 hover:p-2 transition-all cursor-pointer group animate-pulse"
            title="Deslize ou clique para abrir o Índice"
          >
            <ChevronRight className="w-4 h-4 text-neutral-950 font-bold" />
          </button>
        )}

        {/* MOBILE FLOATING ACTION BUTTON (FAB - Acesso Rápido ao Explorador) */}
        {!explorerOpen && (
          <button
            onClick={() => setExplorerOpen(true)}
            className="md:hidden fixed right-4 bottom-14 z-30 bg-amber-500 text-neutral-950 p-3.5 rounded-full shadow-2xl border-2 border-amber-300 flex items-center justify-center gap-2 font-bold active:scale-95 transition-all cursor-pointer hover:bg-amber-400"
            title="Abrir Explorador de Módulos"
          >
            <Layers className="w-5 h-5 text-neutral-950" />
            <span className="text-xs uppercase tracking-wider font-extrabold hidden sm:inline">Módulos</span>
          </button>
        )}

        {/* DESKTOP SIDEBAR (Visible on md+ screens) */}
        <div className="hidden md:flex flex-shrink-0 h-full">
          <Sidebar
            activeModuleId={activeModuleId}
            onSelectModule={setActiveModuleId}
            studiedArticleIds={progress.studiedArticleIds}
            theme={progress.theme}
            onToggleTheme={handleToggleTheme}
            explorerOpen={explorerOpen}
            onToggleExplorer={() => setExplorerOpen(!explorerOpen)}
            onOpenStatsModal={() => setStatsModalOpen(true)}
          />
        </div>

        {/* DESKTOP EXPLORER (Collapsible panel on md+ screens) */}
        {explorerOpen && (
          <div className="hidden md:flex flex-shrink-0 h-full">
            <Explorer
              moduleData={currentModule}
              activeArticleId={activeArticle?.id || null}
              onSelectArticle={setActiveArticleId}
              onSelectModule={setActiveModuleId}
              studiedArticleIds={progress.studiedArticleIds}
              theme={progress.theme}
              onCloseExplorer={() => setExplorerOpen(false)}
            />
          </div>
        )}

        {/* MOBILE COMBINED SLIDE-OVER DRAWER (Smartphone Sidebar + Explorer overlay) */}
        <div
          id="mobile-drawer-container"
          className={`fixed inset-y-0 left-0 z-50 flex h-full max-w-[90vw] sm:max-w-md shadow-2xl transition-transform duration-150 ease-out md:hidden ${
            explorerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar
            activeModuleId={activeModuleId}
            onSelectModule={setActiveModuleId}
            studiedArticleIds={progress.studiedArticleIds}
            theme={progress.theme}
            onToggleTheme={handleToggleTheme}
            explorerOpen={explorerOpen}
            onToggleExplorer={() => setExplorerOpen(!explorerOpen)}
            onOpenStatsModal={() => setStatsModalOpen(true)}
          />

          <Explorer
            moduleData={currentModule}
            activeArticleId={activeArticle?.id || null}
            onSelectArticle={(artId) => {
              setActiveArticleId(artId);
              setExplorerOpen(false); // Auto-close drawer on smartphone selection
            }}
            onSelectModule={setActiveModuleId}
            studiedArticleIds={progress.studiedArticleIds}
            theme={progress.theme}
            onCloseExplorer={() => setExplorerOpen(false)}
          />
        </div>

        {/* 3. ÁREA PRINCIPAL (>85% Screen Digital Book) */}
        {activeArticle ? (
          <ReaderArea
            moduleData={currentModule}
            article={activeArticle}
            chapterTitle={articleDetail?.chapterTitle || ''}
            sectionTitle={articleDetail?.sectionTitle}
            theme={progress.theme}
            fontSize={progress.fontSize}
            onChangeFontSize={setFontSize}
            fontFamily={progress.fontFamily}
            onChangeFontFamily={setFontFamily}
            isStudied={progress.studiedArticleIds.includes(activeArticle.id)}
            onToggleStudied={() => toggleStudied(activeArticle.id)}
            isBookmarked={progress.bookmarkedArticleIds.includes(activeArticle.id)}
            onToggleBookmark={() => toggleBookmark(activeArticle.id)}
            articleNote={progress.notesByArticleId[activeArticle.id] || ''}
            onSaveNote={(noteText) => saveNote(activeArticle.id, noteText)}
            onNextArticle={handleNextArticle}
            onPrevArticle={handlePrevArticle}
            hasNext={hasNext}
            hasPrev={hasPrev}
            onSaveQuizScore={(corr, tot) => saveQuizScore(activeArticle.id, corr, tot)}
            explorerOpen={explorerOpen}
            onToggleExplorer={() => setExplorerOpen(!explorerOpen)}
            onSelectArticle={(mId, aId) => {
              setActiveModuleId(mId);
              setActiveArticleId(aId);
            }}
            studiedArticleIds={progress.studiedArticleIds}
            onImmersiveScrollChange={setIsBarsVisible}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-neutral-400">
            Selecione um capítulo no explorador para iniciar a leitura.
          </div>
        )}
      </div>

      {/* 4. BARRA INFERIOR (Discrete status & progress bar with Immersive Scroll Transition) */}
      <div className={`transition-all duration-300 ease-in-out ${
        isBarsVisible
          ? 'translate-y-0 opacity-100 max-h-16'
          : 'translate-y-full opacity-0 max-h-0 overflow-hidden pointer-events-none'
      }`}>
        <StatusBar
          currentChapterTitle={articleDetail?.chapterTitle || currentModule.title}
          currentArticleCode={activeArticle?.code || ''}
          currentChapter={articleDetail?.chapter}
          studiedArticleIds={progress.studiedArticleIds}
          studiedCount={
            progress.studiedArticleIds.filter(id => allArticles.some(a => a.id === id)).length
          }
          totalArticles={allArticles.length}
          theme={progress.theme}
          onOpenQuickFind={() => setQuickFindOpen(true)}
          onOpenStatsModal={() => setStatsModalOpen(true)}
          onToggleExplorer={() => setExplorerOpen(!explorerOpen)}
        />
      </div>

      {/* 5. QUICK-FIND MODAL (Ctrl+K) */}
      <QuickFindModal
        isOpen={quickFindOpen}
        onClose={() => setQuickFindOpen(false)}
        onSelectResult={handleSelectQuickFindResult}
        studiedArticleIds={progress.studiedArticleIds}
        theme={progress.theme}
      />

      {/* 6. PAINEL DE ESTATÍSTICAS DE ESTUDO */}
      <StudyStatsModal
        isOpen={statsModalOpen}
        onClose={() => setStatsModalOpen(false)}
        progress={progress}
        theme={progress.theme}
        onSelectModule={(mId) => setActiveModuleId(mId as ModuleId)}
      />
    </div>
  );
}
