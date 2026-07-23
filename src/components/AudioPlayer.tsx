import React, { useState, useEffect, useRef } from 'react';
import { ConceptArticle } from '../types/minint';
import {
  Volume2,
  Play,
  Pause,
  Square,
  Sparkles,
  VolumeX,
  Gauge
} from 'lucide-react';

interface AudioPlayerProps {
  article: ConceptArticle;
  theme: 'light' | 'dark' | 'sepia';
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ article, theme }) => {
  const [supported, setSupported] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [rate, setRate] = useState<number>(1.0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState<number>(0);
  const [charProgress, setCharProgress] = useState<{ current: number; total: number }>({ current: 0, total: 0 });

  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';

  // Build full read string
  const buildSpeechText = (): string => {
    const parts: string[] = [];
    parts.push(`${article.code}: ${article.title}.`);
    if (article.legalText) {
      parts.push(`Texto legal: ${article.legalText}`);
    } else if (article.definition) {
      parts.push(`Definição: ${article.definition}`);
    }
    if (article.simpleExplanation) {
      parts.push(`Explicação simplificada: ${article.simpleExplanation}`);
    }
    if (article.importantPoints && article.importantPoints.length > 0) {
      parts.push(`Pontos chave: ${article.importantPoints.join('. ')}`);
    }
    return parts.join(' ');
  };

  // Check Web Speech API support & load voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSupported(false);
      return;
    }

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      // Prefer Portuguese voices (pt-PT, pt-AO, pt-BR)
      const ptIndex = availableVoices.findIndex(v => v.lang.toLowerCase().startsWith('pt'));
      if (ptIndex !== -1) {
        setSelectedVoiceIndex(ptIndex);
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Cancel speech synthesis whenever current article changes
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      setCharProgress({ current: 0, total: 0 });
    }
  }, [article.id]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!supported) {
    return (
      <div className={`p-3 rounded-2xl border flex items-center gap-2 text-xs opacity-60 ${
        isDark ? 'bg-neutral-900 border-neutral-800 text-neutral-400' : 'bg-neutral-100 border-neutral-200 text-neutral-600'
      }`}>
        <VolumeX className="w-4 h-4 text-neutral-400" />
        <span>O seu navegador não suporta a síntese de voz (Web Speech API).</span>
      </div>
    );
  }

  const handlePlay = () => {
    if (typeof window === 'undefined') return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    window.speechSynthesis.cancel();

    const fullText = buildSpeechText();
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.rate = rate;

    if (voices.length > 0 && voices[selectedVoiceIndex]) {
      utterance.voice = voices[selectedVoiceIndex];
    } else {
      utterance.lang = 'pt-PT';
    }

    utterance.onboundary = (event) => {
      if (event.name === 'word' || event.charIndex !== undefined) {
        setCharProgress({
          current: event.charIndex,
          total: fullText.length
        });
      }
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCharProgress({ current: fullText.length, total: fullText.length });
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    setCharProgress({ current: 0, total: fullText.length });
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (typeof window === 'undefined') return;
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCharProgress({ current: 0, total: 0 });
  };

  const handleRateChange = (newRate: number) => {
    setRate(newRate);
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setTimeout(() => {
        handlePlay();
      }, 50);
    }
  };

  const progressPercent =
    charProgress.total > 0
      ? Math.min(100, Math.round((charProgress.current / charProgress.total) * 100))
      : 0;

  return (
    <div
      id="audio-player-container"
      className={`p-4 rounded-3xl border transition-all shadow-xs ${
        isPlaying
          ? 'bg-amber-500/10 border-amber-500/50 text-amber-900 dark:text-amber-200'
          : isDark
          ? 'bg-neutral-900/80 border-neutral-800 text-neutral-100'
          : isSepia
          ? 'bg-[#f4ead5] border-[#dfd2b5] text-[#3d2f1f]'
          : 'bg-white border-neutral-200 text-neutral-900'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Title & Status */}
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-2xl flex items-center justify-center transition-all ${
              isPlaying
                ? 'bg-amber-500 text-white animate-pulse'
                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
            }`}
          >
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Áudio-Leitor (Text-to-Speech)
              </h4>
              {isPlaying && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
              )}
            </div>
            <p className="text-xs font-medium opacity-80 truncate max-w-xs sm:max-w-md">
              {isPlaying
                ? `A ler: ${article.code} - ${article.title}`
                : isPaused
                ? 'Leitura em pausa'
                : 'Ouvir a narração em voz alta do diploma em estudo'}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Play / Pause Toggle Button */}
          {!isPlaying ? (
            <button
              id="btn-audio-player-play"
              onClick={handlePlay}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isPaused ? 'Continuar' : 'Ouvir Artigo'}</span>
            </button>
          ) : (
            <button
              id="btn-audio-player-pause"
              onClick={handlePause}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <Pause className="w-4 h-4 fill-current" />
              <span>Pausar</span>
            </button>
          )}

          {/* Stop Button */}
          {(isPlaying || isPaused) && (
            <button
              id="btn-audio-player-stop"
              onClick={handleStop}
              className="px-3 py-2 rounded-xl bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              title="Parar leitura"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">Parar</span>
            </button>
          )}

          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800/80 p-1 rounded-xl text-xs">
            <Gauge className="w-3.5 h-3.5 ml-1 opacity-60" />
            {[0.8, 1.0, 1.25, 1.5, 2.0].map((r) => (
              <button
                key={r}
                onClick={() => handleRateChange(r)}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  rate === r
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                }`}
              >
                {r}x
              </button>
            ))}
          </div>

          {/* Voice Selector (if multiple available) */}
          {voices.length > 1 && (
            <select
              value={selectedVoiceIndex}
              onChange={(e) => setSelectedVoiceIndex(Number(e.target.value))}
              className="text-xs p-1.5 rounded-xl border bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none max-w-[130px] truncate"
              title="Selecionar Voz"
            >
              {voices.map((voice, idx) => (
                <option key={idx} value={idx}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Progress Bar (when playing or paused) */}
      {(isPlaying || isPaused || progressPercent > 0) && (
        <div className="mt-3 pt-2 border-t border-neutral-200/50 dark:border-neutral-800/50">
          <div className="flex items-center justify-between text-[10px] font-mono font-bold opacity-70 mb-1">
            <span>Progresso da Leitura</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
