import React, { useState, useMemo } from 'react';
import { ALL_MODULES, getAllArticlesInModule } from '../data';
import { ModuleId } from '../types/minint';
import {
  BookMarked,
  Shield,
  ShieldAlert,
  History,
  Globe,
  Moon,
  Sun,
  BookOpen,
  BarChart2,
  X,
  CheckCircle2,
  TrendingUp,
  Award
} from 'lucide-react';

interface SidebarProps {
  activeModuleId: ModuleId;
  onSelectModule: (id: ModuleId) => void;
  studiedArticleIds: string[];
  theme: 'light' | 'dark' | 'sepia';
  onToggleTheme: () => void;
  explorerOpen: boolean;
  onToggleExplorer: () => void;
}

const MODULE_ICONS: Record<string, React.ReactNode> = {
  BookMarked: <BookMarked className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5" />,
  History: <History className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />
};

export const Sidebar: React.FC<SidebarProps> = ({
  activeModuleId,
  onSelectModule,
  studiedArticleIds = [],
  theme,
  onToggleTheme,
  explorerOpen,
  onToggleExplorer
}) => {
  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';
  const [showStats, setShowStats] = useState(false);

  // Compute stats per module and globally
  const moduleStats = useMemo(() => {
    return ALL_MODULES.map(mod => {
      const articles = getAllArticlesInModule(mod);
      const total = articles.length;
      const studied = articles.filter(a => studiedArticleIds.includes(a.id)).length;
      const percentage = total > 0 ? Math.round((studied / total) * 100) : 0;
      return {
        module: mod,
        total,
        studied,
        percentage
      };
    });
  }, [studiedArticleIds]);

  const totalArticlesCount = useMemo(() => {
    return moduleStats.reduce((acc, curr) => acc + curr.total, 0);
  }, [moduleStats]);

  const totalStudiedCount = useMemo(() => {
    return moduleStats.reduce((acc, curr) => acc + curr.studied, 0);
  }, [moduleStats]);

  const overallPercentage =
    totalArticlesCount > 0 ? Math.round((totalStudiedCount / totalArticlesCount) * 100) : 0;

  return (
    <aside
      id="sidebar-container"
      className={`relative w-16 md:w-20 flex-shrink-0 border-r flex flex-col justify-between py-4 select-none transition-colors duration-150 ${
        isDark
          ? 'bg-neutral-900 border-neutral-800 text-neutral-300'
          : isSepia
          ? 'bg-[#f4ecd8] border-[#e2d5b5] text-[#5c4b37]'
          : 'bg-neutral-50 border-neutral-200 text-neutral-700'
      }`}
    >
      {/* Top Branding / Tree Toggle */}
      <div className="flex flex-col items-center gap-4">
        <button
          id="btn-toggle-explorer"
          onClick={onToggleExplorer}
          title={explorerOpen ? 'Ocultar Explorador de Capítulos' : 'Mostrar Explorador de Capítulos'}
          className={`p-2.5 rounded-lg transition-all ${
            explorerOpen
              ? isDark
                ? 'bg-neutral-800 text-amber-400'
                : 'bg-amber-100 text-amber-900'
              : 'hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50'
          }`}
        >
          <BookOpen className="w-5 h-5" />
        </button>

        <div className="w-8 h-[1px] bg-neutral-300 dark:bg-neutral-800 my-1" />

        {/* 5 Core Modules Only */}
        <nav className="flex flex-col items-center gap-3 w-full px-2" aria-label="Módulos de Estudo">
          {ALL_MODULES.map(mod => {
            const isActive = mod.id === activeModuleId;
            const stat = moduleStats.find(s => s.module.id === mod.id);
            const isCompleted = stat && stat.percentage === 100;

            return (
              <button
                key={mod.id}
                id={`sidebar-module-${mod.id}`}
                onClick={() => onSelectModule(mod.id)}
                title={`${mod.title} (${stat?.percentage || 0}%)`}
                className={`group relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all ${
                  isActive
                    ? isDark
                      ? 'bg-neutral-800 text-amber-400 ring-1 ring-amber-500/30'
                      : isSepia
                      ? 'bg-[#e8dcb8] text-[#3d2f1f] ring-1 ring-[#b8a078]'
                      : 'bg-amber-900 text-amber-50 shadow-xs'
                    : isDark
                    ? 'hover:bg-neutral-800/60 text-neutral-400 hover:text-neutral-100'
                    : 'hover:bg-neutral-200/60 text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {MODULE_ICONS[mod.iconName] || <BookMarked className="w-5 h-5" />}
                <span className="text-[9px] font-medium tracking-tight truncate max-w-[44px] mt-0.5">
                  {mod.shortTitle}
                </span>

                {/* Completion indicator dot */}
                {stat && stat.percentage > 0 && (
                  <span
                    className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
                      isCompleted ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  />
                )}

                {/* Tooltip on Hover */}
                <div className="absolute left-16 z-50 hidden group-hover:flex flex-col whitespace-nowrap bg-neutral-900 text-neutral-100 text-xs px-3 py-1.5 rounded-md shadow-lg pointer-events-none">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{mod.title}</span>
                    <span className="font-mono text-[10px] text-amber-400">{stat?.percentage || 0}%</span>
                  </div>
                  <span className="text-[10px] opacity-75">{mod.hierarchyLabel}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Controls: Statistics Panel Toggle & Theme Toggle */}
      <div className="flex flex-col items-center gap-2">
        {/* Minimalist Stats Toggle Button */}
        <button
          id="btn-toggle-stats"
          onClick={() => setShowStats(!showStats)}
          title="Ver Estatísticas de Avanço do Concurso"
          className={`relative p-2.5 rounded-lg transition-all ${
            showStats
              ? isDark
                ? 'bg-amber-950/80 text-amber-400 ring-1 ring-amber-500/40'
                : 'bg-amber-100 text-amber-900 ring-1 ring-amber-300'
              : 'hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 text-neutral-600 dark:text-neutral-400'
          }`}
        >
          <BarChart2 className="w-5 h-5" />
          <span className="text-[9px] font-mono font-bold block text-center leading-none mt-0.5 text-amber-600 dark:text-amber-400">
            {overallPercentage}%
          </span>
        </button>

        {/* Theme Toggle Button */}
        <button
          id="btn-toggle-theme"
          onClick={onToggleTheme}
          title={`Modo Atual: ${theme.toUpperCase()}. Clique para alternar.`}
          className="p-2.5 rounded-lg hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-colors"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-neutral-600" />
          )}
        </button>
      </div>

      {/* Minimalist Slide-out Statistics Popover Panel */}
      {showStats && (
        <>
          {/* Backdrop for easy closing */}
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
            onClick={() => setShowStats(false)}
          />

          <div
            id="stats-popover-panel"
            className={`absolute left-16 md:left-20 top-auto bottom-4 z-50 w-80 md:w-88 rounded-2xl border shadow-2xl p-4 transition-all animate-in fade-in duration-150 ${
              isDark
                ? 'bg-neutral-900/95 border-neutral-800 text-neutral-100 shadow-black/80'
                : isSepia
                ? 'bg-[#f7f0df] border-[#e2d5b5] text-[#3d2f1f] shadow-amber-950/20'
                : 'bg-white/95 border-neutral-200 text-neutral-900 shadow-neutral-900/15'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider">Avanço no Concurso</h3>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400">
                    Progresso de estudo dos 5 Módulos
                  </p>
                </div>
              </div>
              <button
                id="btn-close-stats"
                onClick={() => setShowStats(false)}
                className="p-1 rounded-md hover:bg-neutral-200/60 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Overall Contest Summary Card */}
            <div className="my-3 p-3 rounded-xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 dark:text-amber-400">
                  Conclusão Global
                </span>
                <div className="text-2xl font-black font-mono tracking-tight text-neutral-900 dark:text-amber-300">
                  {overallPercentage}%
                </div>
                <div className="text-[11px] text-neutral-600 dark:text-neutral-400">
                  <span className="font-semibold text-neutral-900 dark:text-neutral-200">{totalStudiedCount}</span> de {totalArticlesCount} tópicos concluídos
                </div>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-amber-500/20 border-t-amber-500 flex items-center justify-center font-bold text-xs text-amber-600 dark:text-amber-400">
                <Award className="w-5 h-5 text-amber-500" />
              </div>
            </div>

            {/* Global Progress Bar Track */}
            <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden mb-4">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full transition-all duration-500 ease-out"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>

            {/* Per-Module Progress Breakdown */}
            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block">
                Percentagem por Módulo
              </span>

              {moduleStats.map(({ module: mod, total, studied, percentage }) => {
                const isActive = mod.id === activeModuleId;
                return (
                  <button
                    key={mod.id}
                    onClick={() => {
                      onSelectModule(mod.id);
                      setShowStats(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg transition-all border ${
                      isActive
                        ? isDark
                          ? 'bg-neutral-800/80 border-amber-500/40 text-neutral-100'
                          : isSepia
                          ? 'bg-[#ede3c9] border-[#c4b18c] text-[#3d2f1f]'
                          : 'bg-amber-50/80 border-amber-200 text-neutral-900'
                        : isDark
                        ? 'hover:bg-neutral-800/40 border-neutral-800/60 text-neutral-300'
                        : 'hover:bg-neutral-100 border-neutral-200/60 text-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 truncate pr-2">
                        <span className="text-amber-600 dark:text-amber-400 flex-shrink-0">
                          {MODULE_ICONS[mod.iconName] || <BookMarked className="w-4 h-4" />}
                        </span>
                        <span className="text-xs font-semibold truncate">{mod.title}</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0 font-mono text-xs font-bold">
                        {percentage === 100 && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        )}
                        <span
                          className={
                            percentage === 100
                              ? 'text-emerald-500'
                              : percentage > 0
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-neutral-400'
                          }
                        >
                          {percentage}%
                        </span>
                      </div>
                    </div>

                    {/* Progress bar line and stats */}
                    <div className="flex items-center justify-between text-[10px] text-neutral-500 dark:text-neutral-400 mb-1">
                      <span>{mod.shortTitle}</span>
                      <span>
                        {studied}/{total} tópicos
                      </span>
                    </div>

                    <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          percentage === 100
                            ? 'bg-emerald-500'
                            : percentage > 0
                            ? 'bg-amber-500'
                            : 'bg-transparent'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </aside>
  );
};

