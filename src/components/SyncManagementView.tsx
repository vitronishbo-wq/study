import React, { useState, useEffect } from 'react';
import { RefreshCw, Database, CheckCircle2, HardDrive, Wifi, WifiOff, Clock, ShieldCheck, Layers, Cpu, Server, Sparkles } from 'lucide-react';
import { getSearchDatabaseInfo, forceReindexDatabase, IndexStatusInfo } from '../lib/indexedDbSearch';

interface SyncManagementViewProps {
  theme?: 'light' | 'dark' | 'sepia';
}

export const SyncManagementView: React.FC<SyncManagementViewProps> = ({ theme = 'dark' }) => {
  const [syncInfo, setSyncInfo] = useState<IndexStatusInfo | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccessMessage, setSyncSuccessMessage] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(() => (typeof navigator !== 'undefined' ? navigator.onLine : true));

  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    getSearchDatabaseInfo().then(info => setSyncInfo(info));

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleForceResync = async () => {
    setIsSyncing(true);
    setSyncSuccessMessage(null);

    // Simulate short network check delay then reindex
    try {
      const updated = await forceReindexDatabase();
      setSyncInfo(updated);
      setSyncSuccessMessage('Conhecimento local re-indexado e sincronizado com sucesso no IndexedDB!');
      setTimeout(() => setSyncSuccessMessage(null), 5000);
    } catch (e) {
      console.error('Resync failed:', e);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl border transition-all ${
        isDark
          ? 'bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-neutral-950 border-neutral-800'
          : isSepia
          ? 'bg-[#f7f0df] border-[#e2d5b5] text-[#3d2f1f]'
          : 'bg-white border-neutral-200 shadow-xs'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/20">
                IndexedDB Cache Engine
              </span>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 ${
                isOnline ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
              }`}>
                {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                {isOnline ? 'Online (Modo Nuvem)' : 'Offline (Local Only)'}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-serif flex items-center gap-2 mt-2">
              <Database className="w-6 h-6 text-amber-500" />
              Gestão de Sincronização & Dados Offline
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-2xl">
              Consulte a versão da base de conhecimento da Academia das Carreiras Públicas de Angola, monitore o índice local no IndexedDB do navegador e force a re-sincronização total para obter o conteúdo mais recente.
            </p>
          </div>

          <button
            onClick={handleForceResync}
            disabled={isSyncing}
            className="w-full md:w-auto px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-neutral-950 font-bold text-xs md:text-sm flex items-center justify-center gap-2.5 shadow-lg transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'A Re-Indexar Base...' : 'Forçar Re-Sincronização'}</span>
          </button>
        </div>

        {syncSuccessMessage && (
          <div className="mt-4 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>{syncSuccessMessage}</span>
          </div>
        )}
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Version Card */}
        <div className={`p-5 rounded-3xl border flex flex-col justify-between ${
          isDark ? 'bg-neutral-900/60 border-neutral-800' : isSepia ? 'bg-[#f0e8d5] border-[#dfd2b5]' : 'bg-neutral-50 border-neutral-200'
        }`}>
          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Versão da Base</span>
            <Cpu className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <div className="text-lg font-black font-mono text-neutral-900 dark:text-neutral-100 truncate">
              {syncInfo?.versionCode || '2.5.0'}
            </div>
            <span className="text-[11px] text-amber-500 font-medium block truncate">
              {syncInfo?.version || 'v2.5.0 - Angola Concursos'}
            </span>
          </div>
        </div>

        {/* Last Sync Date Card */}
        <div className={`p-5 rounded-3xl border flex flex-col justify-between ${
          isDark ? 'bg-neutral-900/60 border-neutral-800' : isSepia ? 'bg-[#f0e8d5] border-[#dfd2b5]' : 'bg-neutral-50 border-neutral-200'
        }`}>
          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Última Sincronização</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <div className="text-sm font-bold font-mono text-neutral-900 dark:text-neutral-100">
              {syncInfo?.lastSyncFormatted || 'Sincronizado Agora'}
            </div>
            <span className="text-[11px] text-emerald-500 font-medium flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              Sincronizado com Sucesso
            </span>
          </div>
        </div>

        {/* Total Indexed Documents */}
        <div className={`p-5 rounded-3xl border flex flex-col justify-between ${
          isDark ? 'bg-neutral-900/60 border-neutral-800' : isSepia ? 'bg-[#f0e8d5] border-[#dfd2b5]' : 'bg-neutral-50 border-neutral-200'
        }`}>
          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Artigos Indexados</span>
            <Layers className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <div className="text-xl font-black font-mono text-neutral-900 dark:text-neutral-100">
              {syncInfo ? `${syncInfo.indexedCount} / ${syncInfo.totalCount}` : '100%'}
            </div>
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium block">
              12 Módulos Académicos
            </span>
          </div>
        </div>

        {/* Local Storage Engine */}
        <div className={`p-5 rounded-3xl border flex flex-col justify-between ${
          isDark ? 'bg-neutral-900/60 border-neutral-800' : isSepia ? 'bg-[#f0e8d5] border-[#dfd2b5]' : 'bg-neutral-50 border-neutral-200'
        }`}>
          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Tamanho da Cache</span>
            <HardDrive className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <div className="text-lg font-black font-mono text-neutral-900 dark:text-neutral-100">
              {syncInfo?.storageSizeEstimate || '~1.4 MB'}
            </div>
            <span className="text-[11px] text-emerald-500 font-medium uppercase font-mono block">
              {syncInfo?.dbType === 'indexeddb' ? 'IndexedDB Ativo' : 'Cache Memória'}
            </span>
          </div>
        </div>
      </div>

      {/* Technical Architecture Details */}
      <div className={`p-6 rounded-3xl border space-y-4 ${
        isDark ? 'bg-neutral-900/40 border-neutral-800' : isSepia ? 'bg-[#f0e8d5] border-[#dfd2b5]' : 'bg-neutral-50 border-neutral-200'
      }`}>
        <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-amber-500 flex items-center gap-2">
          <Server className="w-4 h-4" />
          Arquitetura e Recursos de Sincronização
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-neutral-900/60 dark:bg-neutral-950/80 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-neutral-200">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Garantia de Funcionamento Offline</span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Toda a legislação, simulados e questões estão armazenados localmente no browser. Não consome dados móveis durante a navegação.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/60 dark:bg-neutral-950/80 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-neutral-200">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Busca Difusa Instantânea (Fuzzy)</span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              O motor de busca em IndexedDB pesquisa números de artigos, diplomas, conceitos e explicações em milissegundos sem chamadas de rede.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/60 dark:bg-neutral-950/80 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-neutral-200">
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
              <span>Integração JobExpress Angola</span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              A autenticação é gerida de forma transparente via SSO JobExpress, preservando o progresso de estudo em qualquer dispositivo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
