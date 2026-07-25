import React from 'react';
import { X, Settings, Database, RefreshCw, HardDrive, ShieldCheck } from 'lucide-react';
import { SyncManagementView } from './SyncManagementView';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark' | 'sepia';
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  theme
}) => {
  if (!isOpen) return null;

  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className={`w-full max-w-4xl max-h-[90vh] rounded-3xl border shadow-2xl overflow-hidden flex flex-col ${
        isDark
          ? 'bg-neutral-900 border-neutral-800 text-neutral-100 shadow-black/80'
          : isSepia
          ? 'bg-[#f7f0df] border-[#e2d5b5] text-[#3d2f1f] shadow-amber-950/20'
          : 'bg-white border-neutral-200 text-neutral-900 shadow-neutral-900/15'
      }`}>
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-200 dark:border-neutral-800/80 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-serif flex items-center gap-2">
                Painel de Definições & Sincronização
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Gestão da Base de Dados de Conhecimento IndexedDB
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-neutral-200/60 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          <SyncManagementView theme={theme} />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800/80 bg-neutral-50 dark:bg-neutral-900/50 flex items-center justify-between text-xs font-mono text-neutral-500 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-amber-500" />
            <span>Academia das Carreiras Públicas • Angola 2026</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 font-bold text-xs text-neutral-800 dark:text-neutral-200 transition-all cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
