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

export default function App() {
  const [activeModuleId, setActiveModuleId] = useState<ModuleId>('constituição');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [quickFindOpen, setQuickFindOpen] = useState(false);
  const [statsModalOpen, setStatsModalOpen] = useState(false);

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

  return (
    <div
      id="app-root-shell"
      className={`w-screen h-screen flex flex-col overflow-hidden font-sans ${
        progress.theme === 'dark' ? 'dark bg-neutral-950 text-neutral-100' : 'bg-neutral-50 text-neutral-900'
      }`}
    >
      {/* Top Main Layout: Sidebar + Explorer + Reader Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* 1. BARRA LATERAL (Narrow 5-module switcher) */}
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

        {/* 2. EXPLORADOR (Chapters & Outline Tree) */}
        {explorerOpen && (
          <Explorer
            moduleData={currentModule}
            activeArticleId={activeArticle?.id || null}
            onSelectArticle={setActiveArticleId}
            onSelectModule={setActiveModuleId}
            studiedArticleIds={progress.studiedArticleIds}
            theme={progress.theme}
          />
        )}

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
          />
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-neutral-400">
            Selecione um capítulo no explorador para iniciar a leitura.
          </div>
        )}
      </div>

      {/* 4. BARRA INFERIOR (Discrete status & progress bar) */}
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
      />

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
