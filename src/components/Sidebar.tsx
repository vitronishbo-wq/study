import React, { useState } from 'react';
import { useVitronisAuth } from '../hooks/useVitronisAuth';
import {
  BookOpen,
  Building2,
  Sparkles,
  Bookmark,
  History,
  FolderDown,
  User as UserIcon,
  Settings,
  Sun,
  Moon,
  BarChart2,
  X,
  TrendingUp,
  Award,
  BookMarked
} from 'lucide-react';

export interface SidebarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  theme: 'light' | 'dark' | 'sepia';
  onToggleTheme: () => void;
  explorerOpen: boolean;
  onToggleExplorer: () => void;
  overallPercentage?: number;
  totalArticlesCount?: number;
  totalStudiedCount?: number;
  onOpenStatsModal?: () => void;
}

export interface FunctionalTab {
  id: string;
  title: string;
  shortTitle: string;
  icon: React.ReactNode;
}

export const PERMANENT_SIDEBAR_TABS: FunctionalTab[] = [
  {
    id: 'biblioteca',
    title: 'Biblioteca de Legislação Oficial',
    shortTitle: 'Biblioteca',
    icon: <BookOpen className="w-5 h-5" />
  },
  {
    id: 'concursos',
    title: 'Carreiras & Concursos Públicos',
    shortTitle: 'Concursos',
    icon: <Building2 className="w-5 h-5" />
  },
  {
    id: 'simulados',
    title: 'Simulados & Exercícios',
    shortTitle: 'Simulados',
    icon: <Sparkles className="w-5 h-5" />
  },
  {
    id: 'favorites',
    title: 'Artigos Favoritos',
    shortTitle: 'Favoritos',
    icon: <Bookmark className="w-5 h-5" />
  },
  {
    id: 'history',
    title: 'Histórico de Leitura',
    shortTitle: 'Histórico',
    icon: <History className="w-5 h-5" />
  },
  {
    id: 'downloads',
    title: 'Downloads & Leitura Offline',
    shortTitle: 'Downloads',
    icon: <FolderDown className="w-5 h-5" />
  },
  {
    id: 'perfil',
    title: 'Perfil do Candidato',
    shortTitle: 'Perfil',
    icon: <UserIcon className="w-5 h-5" />
  },
  {
    id: 'definicoes',
    title: 'Definições & Sincronização',
    shortTitle: 'Definições',
    icon: <Settings className="w-5 h-5" />
  }
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  theme,
  onToggleTheme,
  explorerOpen,
  onToggleExplorer,
  overallPercentage = 0,
  totalArticlesCount = 0,
  totalStudiedCount = 0,
  onOpenStatsModal
}) => {
  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';
  const [showStats, setShowStats] = useState(false);
  const { user, isAuthenticated } = useVitronisAuth();

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
      {/* Top Functional Navigation */}
      <div className="flex flex-col items-center gap-3">
        {/* Document Explorer Toggle Button */}
        <button
          id="btn-toggle-explorer"
          onClick={onToggleExplorer}
          title={explorerOpen ? 'Ocultar Índice do Documento' : 'Mostrar Índice do Documento'}
          className={`p-2.5 rounded-xl transition-all cursor-pointer ${
            explorerOpen
              ? isDark
                ? 'bg-amber-950/80 text-amber-400 ring-1 ring-amber-500/40'
                : 'bg-amber-100 text-amber-900 ring-1 ring-amber-300'
              : 'hover:bg-neutral-200/60 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
          }`}
        >
          <BookMarked className="w-5 h-5" />
        </button>

        <div className="w-8 h-[1px] bg-neutral-300 dark:bg-neutral-800 my-1" />

        {/* 8 Permanent Sidebar Functional Modules */}
        <nav className="flex flex-col items-center gap-2.5 w-full px-2" aria-label="Módulos Permanentes">
          {PERMANENT_SIDEBAR_TABS.map(tab => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                id={`sidebar-tab-${tab.id}`}
                onClick={() => onSelectTab(tab.id)}
                title={tab.title}
                className={`group relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'bg-amber-600 text-white ring-2 ring-amber-400/50 shadow-md'
                      : isSepia
                      ? 'bg-[#d2be92] text-[#3d2f1f] ring-2 ring-[#a88f5e]'
                      : 'bg-amber-900 text-amber-50 shadow-sm'
                    : isDark
                    ? 'hover:bg-neutral-800/60 text-neutral-400 hover:text-neutral-100'
                    : 'hover:bg-neutral-200/60 text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {tab.icon}
                <span className="text-[9px] font-semibold tracking-tight truncate max-w-[44px] mt-0.5">
                  {tab.shortTitle}
                </span>

                {/* Hover Tooltip */}
                <div className="absolute left-16 z-50 hidden group-hover:flex flex-col whitespace-nowrap bg-neutral-900 text-neutral-100 text-xs px-3 py-1.5 rounded-md shadow-lg pointer-events-none">
                  <span className="font-semibold">{tab.title}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Controls: Statistics & Theme */}
      <div className="flex flex-col items-center gap-2">
        {/* Stats Toggle Button */}
        <button
          id="btn-toggle-stats"
          onClick={() => setShowStats(!showStats)}
          title="Ver Estatísticas de Estudo"
          className={`relative p-2.5 rounded-lg transition-all cursor-pointer ${
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
          className="p-2.5 rounded-lg hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-colors cursor-pointer"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-neutral-600" />
          )}
        </button>
      </div>

      {/* Statistics Slide-out Popover */}
      {showStats && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
            onClick={() => setShowStats(false)}
          />

          <div
            id="stats-popover-panel"
            className={`absolute left-16 md:left-20 top-auto bottom-4 z-50 w-80 rounded-2xl border shadow-2xl p-4 transition-all animate-in fade-in duration-150 ${
              isDark
                ? 'bg-neutral-900/95 border-neutral-800 text-neutral-100 shadow-black/80'
                : isSepia
                ? 'bg-[#f7f0df] border-[#e2d5b5] text-[#3d2f1f] shadow-amber-950/20'
                : 'bg-white/95 border-neutral-200 text-neutral-900 shadow-neutral-900/15'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider">Avanço no Estudo</h3>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400">
                    Progresso de leitura e exercícios
                  </p>
                </div>
              </div>
              <button
                id="btn-close-stats"
                onClick={() => setShowStats(false)}
                className="p-1 rounded-md hover:bg-neutral-200/60 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="my-3 p-3 rounded-xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 dark:text-amber-400">
                  Conclusão Global
                </span>
                <div className="text-2xl font-black font-mono tracking-tight text-neutral-900 dark:text-amber-300">
                  {overallPercentage}%
                </div>
                <div className="text-[11px] text-neutral-600 dark:text-neutral-400">
                  <span className="font-semibold text-neutral-900 dark:text-neutral-200">{totalStudiedCount}</span> de {totalArticlesCount} artigos concluídos
                </div>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-amber-500/20 border-t-amber-500 flex items-center justify-center font-bold text-xs text-amber-600 dark:text-amber-400">
                <Award className="w-5 h-5 text-amber-500" />
              </div>
            </div>

            {onOpenStatsModal && (
              <button
                id="btn-open-full-stats-modal"
                onClick={() => {
                  setShowStats(false);
                  onOpenStatsModal();
                }}
                className="w-full mb-3 py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <BarChart2 className="w-4 h-4" />
                Painel Completo de Desempenho
              </button>
            )}

            <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full transition-all duration-500 ease-out"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
          </div>
        </>
      )}
    </aside>
  );
};


