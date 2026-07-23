import React, { useState } from 'react';
import { X, MapPin, Search, BookOpen, ExternalLink, Scale, Building2, CheckCircle } from 'lucide-react';

interface DpaModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark' | 'sepia';
}

export interface ProvinceInfo {
  name: string;
  capital: string;
  isNew?: boolean;
  note?: string;
  region?: string;
}

export const PROVINCES_DPA: ProvinceInfo[] = [
  // Tradicionais
  { name: 'Cabinda', capital: 'Cabinda', region: 'Norte' },
  { name: 'Zaire', capital: 'Mbanza Congo', region: 'Norte' },
  { name: 'Uíge', capital: 'Uíge', region: 'Norte' },
  { name: 'Bengo', capital: 'Dande (Caxito)', region: 'Norte' },
  { name: 'Luanda', capital: 'Ingombota', note: 'Antigo município de Luanda desmembrado', region: 'Norte' },
  { name: 'Cuanza-Norte', capital: 'Cazengo (N\'dalatando)', region: 'Norte' },
  { name: 'Cuanza-Sul', capital: 'Sumbe', region: 'Centro-Oeste' },
  { name: 'Malanje', capital: 'Malanje', region: 'Norte/Centro' },
  { name: 'Lunda-Norte', capital: 'Dundo', region: 'Leste' },
  { name: 'Lunda-Sul', capital: 'Saurimo', region: 'Leste' },
  { name: 'Benguela', capital: 'Benguela', region: 'Centro-Oeste' },
  { name: 'Huambo', capital: 'Huambo', region: 'Centro' },
  { name: 'Bié', capital: 'Cuito', region: 'Centro' },
  { name: 'Moxico', capital: 'Luena', note: 'Reduzida com a criação de Moxico Leste', region: 'Leste' },
  { name: 'Huíla', capital: 'Lubango', region: 'Sul' },
  { name: 'Namibe', capital: 'Moçâmedes', region: 'Sul' },
  { name: 'Cunene', capital: 'Cuanhama (Ondjiva)', region: 'Sul' },
  { name: 'Cubango', capital: 'Menongue', note: 'Território da divisão do antigo Cuando Cubango', region: 'Sul' },
  
  // Novas Províncias
  { name: 'Icolo e Bengo', capital: 'Catete', isNew: true, note: 'Divisão da província de Luanda', region: 'Norte' },
  { name: 'Moxico Leste', capital: 'Cazombo', isNew: true, note: 'Divisão da província do Moxico', region: 'Leste' },
  { name: 'Quando', capital: 'Mavinga', isNew: true, note: 'Divisão do antigo Cuando Cubango', region: 'Sul' },
];

export const DpaModal: React.FC<DpaModalProps> = ({ isOpen, onClose, theme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'new' | 'traditional'>('all');

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div
        id="dpa-modal-container"
        className={`w-full max-w-4xl max-h-[90vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden transition-all ${
          isDark
            ? 'bg-neutral-900 border-neutral-800 text-neutral-100'
            : isSepia
            ? 'bg-[#f8f2e4] border-[#d8c8a8] text-[#2c2217]'
            : 'bg-white border-neutral-200 text-neutral-900'
        }`}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-200/80 dark:border-neutral-800 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  Lei n.º 14/24, de 5 de Setembro
                </span>
                <span className="text-xs font-semibold text-neutral-500">21 Províncias • 326 Municípios</span>
              </div>
              <h3 className="text-xl font-bold mt-1">
                Nova Divisão Político-Administrativa (DPA) de Angola
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filters */}
        <div className="p-4 border-b border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-900/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Pesquisar província ou capital..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          <div className="flex items-center gap-1 bg-neutral-200/60 dark:bg-neutral-800/80 p-1 rounded-xl text-xs w-full sm:w-auto justify-center">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                filterType === 'all'
                  ? 'bg-amber-500 text-white font-bold shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              Todas (21)
            </button>
            <button
              onClick={() => setFilterType('new')}
              className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                filterType === 'new'
                  ? 'bg-amber-500 text-white font-bold shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              Novas (3)
            </button>
            <button
              onClick={() => setFilterType('traditional')}
              className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                filterType === 'traditional'
                  ? 'bg-amber-500 text-white font-bold shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              Tradicionais (18)
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Quick Legal Framework Box */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-bold text-xs uppercase tracking-wider">
              <Scale className="w-4 h-4" />
              <span>Enquadramento Legal e Fundamentação</span>
            </div>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
              A <strong>Lei n.º 14/24, de 5 de Setembro (Lei da DPA)</strong> redefiniu a divisão territorial da República de Angola para <strong>21 Províncias, 326 Municípios e 378 Comunas</strong>. Esta legislação concretiza o princípio constitucional da desconcentração e descentralização administrativa (Artigo 213.º da CRA) para reduzir as assimetrias regionais.
            </p>
          </div>

          {/* Grid of Provinces */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3 flex items-center justify-between">
              <span>Lista de Províncias e Capitais ({filteredProvinces.length})</span>
              <span className="text-[11px] font-normal text-amber-600 dark:text-amber-400">
                Novas províncias marcadas em destaque
              </span>
            </h4>

            {filteredProvinces.length === 0 ? (
              <p className="text-center py-8 text-xs text-neutral-500">
                Nenhuma província ou capital encontrada para a pesquisa &quot;{searchTerm}&quot;.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredProvinces.map((prov) => (
                  <div
                    key={prov.name}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      prov.isNew
                        ? 'bg-amber-500/10 border-amber-500/50 shadow-xs ring-1 ring-amber-500/30'
                        : isDark
                        ? 'bg-neutral-800/40 border-neutral-800 hover:border-neutral-700'
                        : isSepia
                        ? 'bg-[#f0e6d2] border-[#ded0b1]'
                        : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Building2 className={`w-4 h-4 ${prov.isNew ? 'text-amber-600 dark:text-amber-400' : 'text-neutral-400'}`} />
                        <span className="font-bold text-sm">{prov.name}</span>
                      </div>
                      {prov.isNew && (
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-amber-500 text-white">
                          NOVA
                        </span>
                      )}
                    </div>

                    <div className="mt-2 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300">
                        <span className="text-neutral-400 font-medium">Capital:</span>
                        <span className="font-semibold text-amber-700 dark:text-amber-300">{prov.capital}</span>
                      </div>

                      {prov.note && (
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 italic">
                          • {prov.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Complementary Norms Section */}
          <div className="pt-4 border-t border-neutral-200/80 dark:border-neutral-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Legislação Complementar e Regulamentos DPA</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
                <span className="font-bold block text-amber-700 dark:text-amber-400 mb-1">
                  Artigo 213.º da CRA
                </span>
                <p className="text-neutral-600 dark:text-neutral-400 text-[11px] leading-relaxed">
                  Fundamento constitucional que legitima a desconcentração administrativa para reduzir as assimetrias regionais.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
                <span className="font-bold block text-amber-700 dark:text-amber-400 mb-1">
                  Decreto Presidencial n.º 268/24
                </span>
                <p className="text-neutral-600 dark:text-neutral-400 text-[11px] leading-relaxed">
                  Aprova o Plano de Acção para a Implementação da Nova DPA e o respetivo cronograma executivo.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
                <span className="font-bold block text-amber-700 dark:text-amber-400 mb-1">
                  Decreto Presidencial n.º 270/24
                </span>
                <p className="text-neutral-600 dark:text-neutral-400 text-[11px] leading-relaxed">
                  Define a Nova Classificação dos Municípios e a reestruturação das unidades territoriais.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
                <span className="font-bold block text-amber-700 dark:text-amber-400 mb-1">
                  Lei n.º 8/25, de 16 de Setembro
                </span>
                <p className="text-neutral-600 dark:text-neutral-400 text-[11px] leading-relaxed">
                  Estabelece a Codificação Nacional das Unidades Territoriais para a uniformização de códigos oficiais.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/80 flex items-center justify-between">
          <span className="text-[11px] text-neutral-500">
            Fonte Oficial: Lei n.º 14/24 de 5 de Setembro • Legislação Jurídica de Angola
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-all cursor-pointer"
          >
            Concluído
          </button>
        </div>
      </div>
    </div>
  );
};
