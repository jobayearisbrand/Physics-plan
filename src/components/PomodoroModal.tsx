import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Volume2, Sparkles, Check } from 'lucide-react';

interface PomodoroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PomodoroModal: React.FC<PomodoroModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [durationPreset, setDurationPreset] = useState<50 | 25>(50);
  const [timeLeft, setTimeLeft] = useState<number>(50 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedSessions, setCompletedSessions] = useState<number>(0);
  const [taskNote, setTaskNote] = useState<string>('অধ্যায় ৬: ২০০টি MCQ সমাধান');

  // Trigger web audio beep on finish
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch {
      // Audio fallback
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      playChime();
      if (mode === 'work') {
        setCompletedSessions((prev) => prev + 1);
        setMode('break');
        setTimeLeft(durationPreset === 50 ? 10 * 60 : 5 * 60);
      } else {
        setMode('work');
        setTimeLeft(durationPreset * 60);
      }
      setIsRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, mode, durationPreset]);

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'work' ? durationPreset * 60 : (durationPreset === 50 ? 10 * 60 : 5 * 60));
  };

  const switchPreset = (preset: 50 | 25) => {
    setIsRunning(false);
    setDurationPreset(preset);
    setMode('work');
    setTimeLeft(preset * 60);
  };

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const totalSeconds = mode === 'work' ? durationPreset * 60 : (durationPreset === 50 ? 10 * 60 : 5 * 60);
  const progressPct = Math.round(((totalSeconds - timeLeft) / totalSeconds) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl border border-slate-200 shadow-2xl p-6 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <h3 className="text-base font-bold text-slate-900">
              {mode === 'work' ? 'গভীর মনোযোগ সেশন (Study Focus)' : '১০ মিনিটের বিশ্রাম (Rest Break)'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="টাইমার বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center justify-center gap-2 my-4">
          <button
            onClick={() => switchPreset(50)}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              durationPreset === 50
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            ৫০ মি. পড়া / ১০ মি. বিরতি (প্রস্তাবিত)
          </button>
          <button
            onClick={() => switchPreset(25)}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              durationPreset === 25
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            ২৫ মি. / ৫ মি. (স্ট্যান্ডার্ড)
          </button>
        </div>

        {/* Big Timer Display */}
        <div className="text-center my-6">
          <div className="font-mono text-5xl sm:text-6xl font-black tracking-tight text-slate-900 tabular-nums">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <span className="text-xs text-slate-500 font-medium mt-2 block">
            {mode === 'work' ? '🎯 মনোযোগ সম্পূর্ণ বই ও প্র্যাকটিসে রাখুন' : '☕ পানি পান করুন এবং চোখ বিশ্রাম দিন'}
          </span>

          <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                mode === 'work' ? 'bg-blue-600' : 'bg-emerald-500'
              }`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Task Note Input */}
        <div className="mb-6">
          <label className="text-xs font-medium text-slate-700 block mb-1">বর্তমান টাস্ক:</label>
          <input
            type="text"
            value={taskNote}
            onChange={(e) => setTaskNote(e.target.value)}
            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 text-slate-800 focus:bg-white"
            placeholder="যেমন: অধ্যায় ৭ এর ৪০টি SQ মুখস্থ"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm text-white flex items-center gap-2 shadow-sm transition-all cursor-pointer ${
              isRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                <span>পজ করুন</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>শুরু করুন</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl border border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            title="টাইমার রিসেট"
            aria-label="টাইমার রিসেট"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom stats */}
        <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>আজকের সম্পন্ন সেশন: <strong className="text-blue-600">{completedSessions}</strong> টি</span>
          <span className="text-[11px] text-slate-400">অডিও অ্যালার্ট সক্রিয়</span>
        </div>
      </div>
    </div>
  );
};
