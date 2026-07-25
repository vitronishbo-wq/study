import React, { useState, useEffect, useRef } from 'react';
import { ModuleId } from '../types/minint';
import { Search, Command, X, Check, ArrowRight, Database } from 'lucide-react';
import { searchIndexedDB, IndexedSearchResult, initSearchDatabase } from '../lib/indexedDbSearch';

interface QuickFindModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (moduleId: ModuleId, articleId: string) => void;
  studiedArticleIds: string[];
  theme: 'light' | 'dark' | 'sepia';
}

// Helper function to normalize text (strips accents, lowercases)
const normalizeText = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

/**
 * Visually highlight matching query text segments within original text, preserving original casing & accents.
 */
const highlightMatches = (text: string, query: string): React.ReactNode => {
  if (!text) return '';
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return text;

  const normText = normalizeText(text);
  const normQuery = normalizeText(trimmedQuery);

  // Split tokens by space
  const tokens = normQuery.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return text;

  // Find all match character ranges [start, end]
  const matches: [number, number][] = [];
  const sortedTokens = [...tokens].sort((a, b) => b.length - a.length);

  sortedTokens.forEach(token => {
    let pos = 0;
    while ((pos = normText.indexOf(token, pos)) !== -1) {
      matches.push([pos, pos + token.length]);
      pos += Math.max(1, token.length);
    }
  });

  if (matches.length === 0) return text;

  // Merge overlapping or adjacent ranges
  matches.sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  matches.forEach(range => {
    if (merged.length === 0) {
      merged.push(range);
    } else {
      const last = merged[merged.length - 1];
      if (range[0] <= last[1]) {
        last[1] = Math.max(last[1], range[1]);
      } else {
        merged.push(range);
      }
    }
  });

  // Construct highlighted nodes
  const nodes: React.ReactNode[] = [];
  let lastIdx = 0;

  merged.forEach(([start, end], i) => {
    if (start > lastIdx) {
      nodes.push(text.slice(lastIdx, start));
    }
    nodes.push(
      <mark
        key={`match-${i}`}
        className="bg-amber-400/40 text-amber-950 dark:text-amber-200 font-bold px-0.5 rounded shadow-2xs"
      >
        {text.slice(start, end)}
      </mark>
    );
    lastIdx = end;
  });

  if (lastIdx < text.length) {
    nodes.push(text.slice(lastIdx));
  }

  return <>{nodes}</>;
};

/**
 * Truncate snippet text around the match location so the keyword is visible
 */
const truncateAroundMatch = (text: string, query: string, maxLength = 130): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;

  const normText = normalizeText(text);
  const normQuery = normalizeText(query.trim());

  if (!normQuery) return text.slice(0, maxLength) + '...';

  const firstToken = normQuery.split(/\s+/)[0] || normQuery;
  const idx = normText.indexOf(firstToken);

  if (idx === -1) {
    return text.slice(0, maxLength) + '...';
  }

  const start = Math.max(0, idx - 30);
  const end = Math.min(text.length, idx + firstToken.length + 80);

  let snippet = text.slice(start, end);
  if (start > 0) snippet = '...' + snippet;
  if (end < text.length) snippet = snippet + '...';

  return snippet;
};

/**
 * Select the best snippet string from an indexed result item for a given query
 */
const getBestSnippetFromItem = (res: IndexedSearchResult, query: string): string => {
  const normQuery = normalizeText(query.trim());
  if (!normQuery) return res.simpleExplanation || res.definition || res.legalText || '';

  const candidates = [
    res.simpleExplanation,
    res.definition,
    res.legalText,
    res.examAlert,
    ...(res.importantPoints || [])
  ].filter(Boolean) as string[];

  for (const cand of candidates) {
    if (normalizeText(cand).includes(normQuery)) {
      return truncateAroundMatch(cand, query);
    }
  }

  // Token fallback
  const tokens = normQuery.split(/\s+/).filter(Boolean);
  for (const cand of candidates) {
    const normCand = normalizeText(cand);
    if (tokens.some(tok => normCand.includes(tok))) {
      return truncateAroundMatch(cand, query);
    }
  }

  return truncateAroundMatch(res.simpleExplanation || res.definition || res.legalText || '', query);
};

export const QuickFindModal: React.FC<QuickFindModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
  studiedArticleIds,
  theme
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<IndexedSearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';

  // Warm up or initialize IndexedDB on modal open
  useEffect(() => {
    if (isOpen) {
      initSearchDatabase().catch(() => {});
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Execute IndexedDB search when query changes
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    let isMounted = true;
    searchIndexedDB(trimmed, 50).then(res => {
      if (isMounted) {
        setResults(res);
        setSelectedIndex(0);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [query]);

  // Ensure selected result item is smoothly scrolled into view inside search results list
  useEffect(() => {
    if (itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [selectedIndex]);

  // Handle keyboard navigation inside search results
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (results.length > 0 ? (prev + 1) % results.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results.length > 0 && results[selectedIndex]) {
          const item = results[selectedIndex];
          onSelectResult(item.moduleId, item.articleId);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, onSelectResult]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-black/50 backdrop-blur-xs select-none">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />

      <div
        id="quick-find-modal-dialog"
        className={`relative z-10 w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col transition-all animate-in fade-in zoom-in-95 duration-150 ${
          isDark
            ? 'bg-neutral-900 border-neutral-800 text-neutral-100 shadow-black/80'
            : isSepia
            ? 'bg-[#f7f0df] border-[#e2d5b5] text-[#3d2f1f]'
            : 'bg-white border-neutral-200 text-neutral-900 shadow-xl'
        }`}
      >
        {/* Modal Search Input Header */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Busca Rápida (ex: 'Artigo 207', 'PNA', 'Independência', 'Pena de morte')..."
            className="w-full text-sm font-medium bg-transparent outline-none placeholder-neutral-400 dark:placeholder-neutral-500"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
          {!query.trim() ? (
            <div className="p-8 text-center space-y-2">
              <Command className="w-8 h-8 mx-auto text-neutral-400 opacity-40" />
              <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                Digite um termo de pesquisa para localizar instantaneamente qualquer artigo ou lei dos 5 módulos.
              </p>
              <div className="flex items-center justify-center gap-2 pt-2 text-[11px] font-mono text-neutral-400">
                <span className="px-2 py-0.5 rounded border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800">
                  ↑ ↓ Para Navegar
                </span>
                <span className="px-2 py-0.5 rounded border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800">
                  ↵ Para Abrir
                </span>
                <span className="px-2 py-0.5 rounded border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800">
                  ESC Para Fechar
                </span>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-xs text-neutral-500 dark:text-neutral-400">
              Nenhum artigo encontrado para a palavra-chave <span className="font-bold text-amber-600 dark:text-amber-400">"{query}"</span>.
            </div>
          ) : (
            results.map((res, idx) => {
              const isSelected = idx === selectedIndex;
              const isStudied = studiedArticleIds.includes(res.articleId);
              const snippetText = getBestSnippetFromItem(res, query);

              return (
                <button
                  key={`${res.id}-${idx}`}
                  ref={el => { itemRefs.current[idx] = el; }}
                  onClick={() => {
                    onSelectResult(res.moduleId, res.articleId);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? isDark
                        ? 'bg-amber-950/70 border-amber-500/50 text-neutral-100'
                        : isSepia
                        ? 'bg-[#eadebe] border-[#c2b18c] text-[#3d2f1f]'
                        : 'bg-neutral-900 text-white border-neutral-900'
                      : isDark
                      ? 'bg-neutral-900/40 border-neutral-800/80 text-neutral-300 hover:bg-neutral-800/50'
                      : 'bg-white border-neutral-200/80 text-neutral-800 hover:bg-neutral-100'
                  }`}
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      <span>{res.moduleShortTitle}</span>
                      <span>•</span>
                      <span className="truncate">{res.chapterTitle}</span>
                    </div>

                    <div className="flex items-center gap-2 font-semibold text-xs md:text-sm">
                      <span className="font-mono text-amber-500 dark:text-amber-400 flex-shrink-0">
                        {highlightMatches(res.code, query)}
                      </span>
                      <span className="truncate">
                        {highlightMatches(res.title, query)}
                      </span>
                    </div>

                    <p className={`text-xs line-clamp-2 leading-relaxed opacity-90 ${isSelected ? 'text-neutral-200' : 'text-neutral-600 dark:text-neutral-400'}`}>
                      {highlightMatches(snippetText, query)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between self-stretch flex-shrink-0 text-xs">
                    {isStudied ? (
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-500">
                        <Check className="w-3.5 h-3.5" /> Estudado
                      </span>
                    ) : (
                      <span className="text-[10px] opacity-50">Não lido</span>
                    )}
                    {isSelected && (
                      <ArrowRight className="w-4 h-4 text-amber-400 mt-2" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-neutral-200 dark:border-neutral-800/80 bg-neutral-50 dark:bg-neutral-900/50 flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <div className="flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-amber-500" />
            <span>IndexedDB Busca Offline: {results.length} resultados</span>
          </div>
          <span className="hidden sm:inline">Pressione ESC para fechar</span>
        </div>
      </div>
    </div>
  );
};
