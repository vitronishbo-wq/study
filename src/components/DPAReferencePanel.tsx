import React, { useState } from 'react';
import {
  MapPin,
  Search,
  ChevronDown,
  ChevronUp,
  Scale,
  Building2,
  BookOpen,
  Sparkles,
  Maximize2,
  ExternalLink
} from 'lucide-react';
import { PROVINCES_DPA, ProvinceInfo } from './DpaModal';

interface DPAReferencePanelProps {
  theme: 'light' | 'dark' | 'sepia';
  onOpenFullModal?: () => void;
}

export const DPAReferencePanel: React.FC<DPAReferencePanelProps> = ({
  theme,
  onOpenFullModal
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'new' | 'traditional'>('all');

  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';

  const filteredProvinces = PROVINCES_DPA.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.capital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.note && p.note.toLowerCase().includes(searchTerm.toLowerCase()));

    if (filterType === 'new') return matchesSearch && p.isNew;
    if (filterType === 'traditional') return matchesSearch && !p.isNew;
    return matchesSearch;
  });

  return (
    <section
      id="dpa-reference-panel"
      className={`rounded-3xl border transition-all shadow-xs overflow-hidden ${
        isOpen
          ? isDark
            ? 'bg-neutral-900/90 border-amber-500/40 text-neutral-100'
            : isSepia
            ? 'bg-[#f5ebd6] border-[#dac9a6] text-[#3b2d1d]'
            : 'bg-white border-amber-400/60 text-neutral-900'
          : isDark
          ? 'bg-neutral-900/60 border-neutral-800 text-neutral-300 hover:border-neutral-700'
          : isSepia
          ? 'bg-[#f4ead5]/80 border-[#ded0b1] text-[#3d2f1f]'
          : 'bg-neutral-50/80 border-neutral-200 text-neutral-800 hover:border-neutral-300'
      }`}
    >
      {/* Panel Header / Quick Toggle Bar */}
      <div className="p-3.5 sm:p-4 flex items-center justify-between gap-3 select-none">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 text-left flex-1 cursor-pointer group"
          title={isOpen ? 'Recolher Painel DPA' : 'Expandir Consulta DPA'}
        >
          <div
            className={`p-2.5 rounded-2xl transition-all ${
              isOpen
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Consulta Rápida DPA
              </span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-300">
                Lei n.º 14/24 (21 Províncias)
              </span>
            </div>
            <p className="text-xs font-medium opacity-80 mt-0.5">
              {isOpen
                ? 'Verifique as capitais e a lista das 21 províncias sem sair da leitura'
                : 'Clique para expandir o painel de consulta da Divisão Político-Administrativa de Angola'}
            </p>
          </div>
        </button>

        <div className="flex items-center gap-2">
          {onOpenFullModal && (
            <button
              onClick={onOpenFullModal}
              className="p-2 rounded-xl text-xs font-semibold border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Abrir em ecrã inteiro"
            >
              <Maximize2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="hidden md:inline">Expandir</span>
            </button>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all cursor-pointer"
            title={isOpen ? 'Recolher' : 'Expandir'}
          >
            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expanded Inline Reference Area */}
      {isOpen && (
        <div className="p-4 sm:p-5 border-t border-neutral-200/80 dark:border-neutral-800 space-y-4 animate-fadeIn">
          {/* Controls: Search & Filter Pills */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Pesquisar província ou capital..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>

            <div className="flex items-center gap-1 bg-neutral-200/60 dark:bg-neutral-800/80 p-1 rounded-xl text-xs w-full sm:w-auto justify-center">
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  filterType === 'all'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                }`}
              >
                Todas (21)
              </button>
              <button
                onClick={() => setFilterType('new')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  filterType === 'new'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                }`}
              >
                Novas (3)
              </button>
              <button
                onClick={() => setFilterType('traditional')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  filterType === 'traditional'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                }`}
              >
                Tradicionais (18)
              </button>
            </div>
          </div>

          {/* Province Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
            {filteredProvinces.map((prov) => (
              <div
                key={prov.name}
                className={`p-2.5 rounded-xl border text-xs transition-all ${
                  prov.isNew
                    ? 'bg-amber-500/15 border-amber-500/50 shadow-2xs font-semibold'
                    : isDark
                    ? 'bg-neutral-800/60 border-neutral-800'
                    : isSepia
                    ? 'bg-[#ede1c7] border-[#d8caaa]'
                    : 'bg-white border-neutral-200'
                }`}
              >
                <div className="flex items-center justify-between gap-1.5">
                  <span className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                    <Building2 className={`w-3.5 h-3.5 ${prov.isNew ? 'text-amber-600 dark:text-amber-400' : 'text-neutral-400'}`} />
                    {prov.name}
                  </span>
                  {prov.isNew && (
                    <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-500 text-white">
                      NOVA
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px] text-neutral-600 dark:text-neutral-300">
                  <span className="opacity-70">Capital:</span>
                  <span className="font-bold text-amber-700 dark:text-amber-400">{prov.capital}</span>
                </div>
                {prov.note && (
                  <p className="mt-1 text-[10px] text-neutral-500 dark:text-neutral-400 italic truncate">
                    {prov.note}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Legal Reference Summary Bar */}
          <div className="pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px]">
            <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
              <Scale className="w-3.5 h-3.5 text-amber-500" />
              <span>Base Legal: <strong>Lei n.º 14/24, de 5 de Setembro</strong> (DPA de Angola)</span>
            </div>
            <div className="flex items-center gap-3 text-neutral-500 text-[10px]">
              <span>Art. 213.º CRA</span>
              <span>•</span>
              <span>Dec. Pres. 268/24 & 270/24</span>
              <span>•</span>
              <span>Lei n.º 8/25</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
