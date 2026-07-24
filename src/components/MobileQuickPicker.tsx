import React, { useState } from 'react';
import { ALL_MODULES } from '../data';
import { DiplomaModule, ModuleId, ConceptArticle } from '../types/minint';
import { X, ChevronRight, BookOpen, CheckCircle2 } from 'lucide-react';

interface MobileQuickPickerProps {
  isOpen: boolean;
  onClose: () => void;
  activeModuleId: ModuleId;
  activeArticleId: string | null;
  onSelectArticle: (moduleId: ModuleId, articleId: string) => void;
  studiedArticleIds: string[];
  theme: 'light' | 'dark' | 'sepia';
}

export const MobileQuickPicker: React.FC<MobileQuickPickerProps> = ({
  isOpen,
  onClose,
  activeModuleId,
  activeArticleId,
  onSelectArticle,
  studiedArticleIds,
  theme
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<ModuleId>(activeModuleId);
  const [activeTab, setActiveTab] = useState<'module' | 'chapter' | 'article'>('module');
  const [selectedChapterIdx, setSelectedChapterIdx] = useState<number>(0);

  if (!isOpen) return null;

  const currentModule = ALL_MODULES.find(m => m.id === selectedModuleId) || ALL_MODULES[0];
  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end md:hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-950/80 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      {/* Bottom Sheet Modal Container */}
      <div className={`relative z-10 w-full max-h-[85vh] rounded-t-3xl border-t shadow-2xl flex flex-col overflow-hidden transition-all ${
        isDark
          ? 'bg-neutral-900 border-neutral-800 text-neutral-100'
          : isSepia
          ? 'bg-[#f5ead5] border-[#ded0b1] text-[#362718]'
          : 'bg-white border-neutral-200 text-neutral-900'
      }`}>
        {/* Handle Bar */}
        <div className="w-12 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700 mx-auto mt-3 mb-1" />

        {/* Modal Header */}
        <div className="px-5 py-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold">Navegação Rápida (Bíblia/Artigos)</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Step Tabs (Module > Chapter > Article) */}
        <div className="flex border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-950/40 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('module')}
            className={`flex-1 py-3 text-center transition-all border-b-2 ${
              activeTab === 'module'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-bold'
                : 'border-transparent text-neutral-500'
            }`}
          >
            1. Diploma
          </button>
          <button
            onClick={() => setActiveTab('chapter')}
            className={`flex-1 py-3 text-center transition-all border-b-2 ${
              activeTab === 'chapter'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-bold'
                : 'border-transparent text-neutral-500'
            }`}
          >
            2. Capítulo
          </button>
          <button
            onClick={() => setActiveTab('article')}
            className={`flex-1 py-3 text-center transition-all border-b-2 ${
              activeTab === 'article'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-bold'
                : 'border-transparent text-neutral-500'
            }`}
          >
            3. Artigo
          </button>
        </div>

        {/* Tab 1: Module Selector */}
        {activeTab === 'module' && (
          <div className="p-4 overflow-y-auto space-y-2 max-h-[50vh]">
            <p className="text-xs text-neutral-500 mb-2">Selecione o Diploma ou Lei Oficial:</p>
            {ALL_MODULES.map((mod) => (
              <button
                key={mod.id}
                onClick={() => {
                  setSelectedModuleId(mod.id);
                  setSelectedChapterIdx(0);
                  setActiveTab('chapter');
                }}
                className={`w-full text-left p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                  selectedModuleId === mod.id
                    ? 'border-amber-500/60 bg-amber-500/10 text-amber-900 dark:text-amber-200 font-bold'
                    : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <div>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                    {mod.hierarchyLabel || mod.shortTitle}
                  </span>
                  <span className="text-sm font-semibold">{mod.title}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </button>
            ))}
          </div>
        )}

        {/* Tab 2: Chapter Selector */}
        {activeTab === 'chapter' && (
          <div className="p-4 overflow-y-auto space-y-2 max-h-[50vh]">
            <p className="text-xs text-neutral-500 mb-2">Capítulos de {currentModule.shortTitle}:</p>
            {currentModule.chapters.map((chap, idx) => (
              <button
                key={chap.id}
                onClick={() => {
                  setSelectedChapterIdx(idx);
                  setActiveTab('article');
                }}
                className={`w-full text-left p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                  selectedChapterIdx === idx
                    ? 'border-amber-500/60 bg-amber-500/10 text-amber-900 dark:text-amber-200 font-bold'
                    : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <div>
                  <span className="text-xs font-mono text-amber-600 dark:text-amber-400 block">
                    Capítulo {idx + 1}
                  </span>
                  <span className="text-sm font-semibold">{chap.title}</span>
                  <span className="text-[11px] text-neutral-400 block mt-0.5">
                    {chap.articles ? chap.articles.length : 0} Artigos disponíveis
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </button>
            ))}
          </div>
        )}

        {/* Tab 3: Article Grid / List Selector (YouVersion style grid) */}
        {activeTab === 'article' && (
          <div className="p-4 overflow-y-auto max-h-[50vh] space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <span>Selecione o Artigo desejado:</span>
              <span className="font-semibold text-amber-600 dark:text-amber-400">
                {currentModule.chapters[selectedChapterIdx]?.title}
              </span>
            </div>

            {/* Quick Article Grid (Bible chapter grid style) */}
            <div className="grid grid-cols-2 gap-2">
              {(currentModule.chapters[selectedChapterIdx]?.articles || []).map((art: ConceptArticle) => {
                const isStudied = studiedArticleIds.includes(art.id);
                const isActive = activeArticleId === art.id && selectedModuleId === activeModuleId;

                return (
                  <button
                    key={art.id}
                    onClick={() => {
                      onSelectArticle(selectedModuleId, art.id);
                      onClose();
                    }}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all active:scale-98 ${
                      isActive
                        ? 'border-amber-500 bg-amber-500/20 ring-2 ring-amber-500/30'
                        : isStudied
                        ? 'border-emerald-500/40 bg-emerald-500/10'
                        : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                        {art.code}
                      </span>
                      {isStudied && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      )}
                    </div>
                    <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200 line-clamp-2 mt-1">
                      {art.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
