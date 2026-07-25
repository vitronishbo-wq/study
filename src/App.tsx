import React, { useState, useEffect, useMemo } from 'react';
import { ALL_MODULES, getModuleById, getAllArticlesInModule, findArticleById } from './data';
import { ModuleId } from './types/minint';
import { useStudyState } from './hooks/useStudyState';
import { Sidebar } from './components/Sidebar';
import { Explorer } from './components/Explorer';
import { ReaderArea } from './components/ReaderArea';
import { HomePortal } from './components/HomePortal';
import { StatusBar } from './components/StatusBar';
import { QuickFindModal } from './components/QuickFindModal';
import { StudyStatsModal } from './components/StudyStatsModal';
import { SettingsModal } from './components/SettingsModal';
import { ChevronRight, Menu, BookOpen, Layers, Building2, ArrowLeft } from 'lucide-react';
import { initSearchDatabase } from './lib/indexedDbSearch';

export default function App() {
  const [viewMode, setViewMode] = useState<'portal' | 'reader'>('portal');
  const [activeTab, setActiveTab] = useState<string>('biblioteca');
  const [activeModuleId, setActiveModuleId] = useState<ModuleId>('educacao');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  // Default explorerOpen to false on smartphones (< 768px) for clean text reading
  const [explorerOpen, setExplorerOpen] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 768 : false);
  const [quickFindOpen, setQuickFindOpen] = useState(false);
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [isBarsVisible, setIsBarsVisible] = useState(true);

  // Initialize IndexedDB search database on app launch
  useEffect(() => {
    initSearchDatabase().catch(err => {
      console.log('IndexedDB search warm-up note:', err);
    });
  }, []);

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

  // Total articles across all modules
  const totalArticlesAcrossModules = useMemo(() => {
    return ALL_MODULES.reduce((acc, m) => acc + getAllArticlesInModule(m).length, 0);
  }, []);

  const totalStudiedCount = progress.studiedArticleIds.length;
  const overallPercentage = totalArticlesAcrossModules > 0
    ? Math.round((totalStudiedCount / totalArticlesAcrossModules) * 100)
    : 0;

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

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'biblioteca' || tabId === 'concursos' || tabId === 'simulados' || tabId === 'perfil' || tabId === 'definicoes') {
      setViewMode('portal');
    }
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
    setViewMode('reader');
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

    if (deltaY < 80) {
      if (edgeTouchStart.x < 60 && deltaX > 50 && !explorerOpen) {
        setExplorerOpen(true);
      } else if (deltaX < -60 && explorerOpen) {
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

        {/* MOBILE EDGE PULL HANDLE */}
        {!explorerOpen && (
          <button
            onClick={() => setExplorerOpen(true)}
            className="md:hidden fixed left-0 top-1/2 -translate-y-1/2 z-30 bg-amber-500/90 text-neutral-950 p-1.5 rounded-r-xl shadow-lg border-y border-r border-amber-400/50 flex items-center gap-0.5 hover:p-2 transition-all cursor-pointer group animate-pulse"
            title="Deslize ou clique para abrir o Índice"
          >
            <ChevronRight className="w-4 h-4 text-neutral-950 font-bold" />
          </button>
        )}

        {/* MOBILE FLOATING ACTION BUTTON */}
        {!explorerOpen && (
          <button
            onClick={() => setExplorerOpen(true)}
            className="md:hidden fixed right-4 bottom-14 z-30 bg-amber-500 text-neutral-950 p-3.5 rounded-full shadow-2xl border-2 border-amber-300 flex items-center justify-center gap-2 font-bold active:scale-95 transition-all cursor-pointer hover:bg-amber-400"
            title="Abrir Índice do Documento"
          >
            <Layers className="w-5 h-5 text-neutral-950" />
            <span className="text-xs uppercase tracking-wider font-extrabold hidden sm:inline">Índice</span>
          </button>
        )}

        {/* DESKTOP SIDEBAR */}
        <div className="hidden md:flex flex-shrink-0 h-full">
          <Sidebar
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
            theme={progress.theme}
            onToggleTheme={handleToggleTheme}
            explorerOpen={explorerOpen}
            onToggleExplorer={() => setExplorerOpen(!explorerOpen)}
            overallPercentage={overallPercentage}
            totalArticlesCount={totalArticlesAcrossModules}
            totalStudiedCount={totalStudiedCount}
            onOpenStatsModal={() => setStatsModalOpen(true)}
          />
        </div>

        {/* DESKTOP EXPLORER */}
        {explorerOpen && viewMode === 'reader' && (
          <div className="hidden md:flex flex-shrink-0 h-full">
            <Explorer
              moduleData={currentModule}
              activeArticleId={activeArticle?.id || null}
              onSelectArticle={(artId) => {
                setActiveArticleId(artId);
                setViewMode('reader');
              }}
              onSelectModule={(mId) => {
                setActiveModuleId(mId);
                setViewMode('reader');
              }}
              studiedArticleIds={progress.studiedArticleIds}
              theme={progress.theme}
              onCloseExplorer={() => setExplorerOpen(false)}
            />
          </div>
        )}

        {/* MOBILE COMBINED SLIDE-OVER DRAWER */}
        <div
          id="mobile-drawer-container"
          className={`fixed inset-y-0 left-0 z-50 flex h-full max-w-[90vw] sm:max-w-md shadow-2xl transition-transform duration-150 ease-out md:hidden ${
            explorerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar
            activeTab={activeTab}
            onSelectTab={(tabId) => {
              handleSelectTab(tabId);
              setExplorerOpen(false);
            }}
            theme={progress.theme}
            onToggleTheme={handleToggleTheme}
            explorerOpen={explorerOpen}
            onToggleExplorer={() => setExplorerOpen(!explorerOpen)}
            overallPercentage={overallPercentage}
            totalArticlesCount={totalArticlesAcrossModules}
            totalStudiedCount={totalStudiedCount}
            onOpenStatsModal={() => setStatsModalOpen(true)}
          />

          {viewMode === 'reader' && (
            <Explorer
              moduleData={currentModule}
              activeArticleId={activeArticle?.id || null}
              onSelectArticle={(artId) => {
                setActiveArticleId(artId);
                setViewMode('reader');
                setExplorerOpen(false);
              }}
              onSelectModule={(mId) => {
                setActiveModuleId(mId);
                setViewMode('reader');
                setExplorerOpen(false);
              }}
              studiedArticleIds={progress.studiedArticleIds}
              theme={progress.theme}
              onCloseExplorer={() => setExplorerOpen(false)}
            />
          )}
        </div>

        {/* 3. MAIN AREA: PORTAL HOME OR DIGITAL READER */}
        {viewMode === 'portal' ? (
          <HomePortal
            onSelectModule={(mId, aId) => {
              setActiveModuleId(mId);
              if (aId) setActiveArticleId(aId);
              setViewMode('reader');
            }}
            progress={progress}
            theme={progress.theme}
            onOpenQuickFind={() => setQuickFindOpen(true)}
            onOpenStatsModal={() => setStatsModalOpen(true)}
          />
        ) : activeArticle ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Bar Navigation & Breadcrumb */}
            <div className="px-4 py-2 border-b bg-neutral-900/90 border-neutral-800 text-neutral-200 text-xs flex items-center justify-between z-10 shadow-xs">
              <button
                onClick={() => setViewMode('portal')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold hover:bg-amber-500/30 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar à Biblioteca</span>
              </button>

              {/* Mandatory Breadcrumb */}
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-neutral-300 truncate max-w-md">
                <span className="text-amber-400 font-bold">Biblioteca</span>
                <span className="text-neutral-600">›</span>
                <span className="truncate text-amber-200">{currentModule.shortTitle}</span>
                {articleDetail?.chapterTitle && (
                  <>
                    <span className="text-neutral-600">›</span>
                    <span className="truncate text-neutral-400 hidden sm:inline">{articleDetail.chapterTitle.split('—')[0]}</span>
                  </>
                )}
                {activeArticle && (
                  <>
                    <span className="text-neutral-600">›</span>
                    <span className="font-bold text-amber-400">{activeArticle.code}</span>
                  </>
                )}
              </div>
            </div>

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
                setViewMode('reader');
              }}
              studiedArticleIds={progress.studiedArticleIds}
              onImmersiveScrollChange={setIsBarsVisible}
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-neutral-400">
            Selecione um capítulo no explorador para iniciar a leitura.
          </div>
        )}
      </div>

      {/* BARRA INFERIOR STATUS BAR */}
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
          onOpenSettingsModal={() => setSettingsModalOpen(true)}
          onToggleExplorer={() => setExplorerOpen(!explorerOpen)}
        />
      </div>

      {/* QUICK-FIND MODAL */}
      <QuickFindModal
        isOpen={quickFindOpen}
        onClose={() => setQuickFindOpen(false)}
        onSelectResult={handleSelectQuickFindResult}
        studiedArticleIds={progress.studiedArticleIds}
        theme={progress.theme}
      />

      {/* PAINEL DE ESTATÍSTICAS DE ESTUDO */}
      <StudyStatsModal
        isOpen={statsModalOpen}
        onClose={() => setStatsModalOpen(false)}
        progress={progress}
        theme={progress.theme}
        onSelectModule={(mId) => setActiveModuleId(mId as ModuleId)}
      />

      {/* PAINEL DE DEFINIÇÕES */}
      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        theme={progress.theme}
      />
    </div>
  );
}
