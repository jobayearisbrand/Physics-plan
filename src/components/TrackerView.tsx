import React from 'react';
import { Target, CheckCircle2, Trophy, Flame, Plus, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TrackerViewProps {
  completedMcq: number;
  totalTargetMcq: number;
  completedSq: number;
  totalTargetSq: number;
  completedCq: number;
  totalTargetCq: number;
  onSetTarget: (type: 'mcq' | 'sq' | 'cq', value: number) => void;
  onIncrementTarget: (type: 'mcq' | 'sq' | 'cq', amount: number) => void;
  onResetProgress: () => void;
  weightedPct: number;
}

export const TrackerView: React.FC<TrackerViewProps> = ({
  completedMcq,
  totalTargetMcq,
  completedSq,
  totalTargetSq,
  completedCq,
  totalTargetCq,
  onSetTarget,
  onIncrementTarget,
  onResetProgress,
  weightedPct,
}) => {
  const handleAdd = (type: 'mcq' | 'sq' | 'cq', amount: number) => {
    onIncrementTarget(type, amount);
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.7 },
    });
  };

  const mcqPct = Math.min(100, Math.round((completedMcq / totalTargetMcq) * 100));
  const sqPct = Math.min(100, Math.round((completedSq / totalTargetSq) * 100));
  const cqPct = Math.min(100, Math.round((completedCq / totalTargetCq) * 100));

  // Milestones
  const milestones = [
    { name: '১০০ MCQ স্পিড স্টার্ট', target: 100, current: completedMcq, unlocked: completedMcq >= 100 },
    { name: '৫০০ MCQ মাইলস্টোন', target: 500, current: completedMcq, unlocked: completedMcq >= 500 },
    { name: '১০০০ MCQ গ্র্যান্ড ফিনিশ', target: 1000, current: completedMcq, unlocked: completedMcq >= 1000 },
    { name: '১০০ SQ আয়ত্ত', target: 100, current: completedSq, unlocked: completedSq >= 100 },
    { name: '২০০ SQ পূর্ণাঙ্গ সমাপ্তি', target: 200, current: completedSq, unlocked: completedSq >= 200 },
    { name: '৫০ CQ কাঠামোগত সমাধান', target: 50, current: completedCq, unlocked: completedCq >= 50 },
    { name: '১০০ CQ মাস্টারক্লাস', target: 100, current: completedCq, unlocked: completedCq >= 100 },
    { name: 'পদার্থবিজ্ঞান A+ নিশ্চিত', target: 100, current: weightedPct, unlocked: weightedPct >= 100 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">টার্গেট ট্র্যাকার ও প্রোগ্রেস মনিটর</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            ১০০০+ MCQ, ২০০+ SQ এবং ১০০+ CQ এর লাইভ অগ্রগতি আপডেট করুন
          </p>
        </div>

        <button
          onClick={onResetProgress}
          className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>প্রোগ্রেস রিসেট</span>
        </button>
      </div>

      {/* 3 Main Target Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* MCQ Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded">
              MCQ টার্গেট
            </span>
            <span className="text-sm font-mono font-bold text-slate-700">{mcqPct}%</span>
          </div>

          <div>
            <div className="flex items-baseline justify-between font-mono mb-1.5">
              <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
                {completedMcq}
              </span>
              <span className="text-xs text-slate-400">/ {totalTargetMcq} সম্পন্ন</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-300"
                style={{ width: `${mcqPct}%` }}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <span className="text-[11px] font-semibold text-slate-500 block">কুইক অ্যাড:</span>
            <div className="grid grid-cols-4 gap-1.5 text-xs font-mono">
              <button
                onClick={() => handleAdd('mcq', 10)}
                className="p-1.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded border border-slate-200 transition-colors cursor-pointer"
              >
                +১০
              </button>
              <button
                onClick={() => handleAdd('mcq', 25)}
                className="p-1.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded border border-slate-200 transition-colors cursor-pointer"
              >
                +২৫
              </button>
              <button
                onClick={() => handleAdd('mcq', 50)}
                className="p-1.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded border border-slate-200 transition-colors cursor-pointer"
              >
                +৫০
              </button>
              <button
                onClick={() => handleAdd('mcq', 100)}
                className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors cursor-pointer font-bold"
              >
                +১০০
              </button>
            </div>
          </div>
        </div>

        {/* SQ Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
              SQ (ক + খ) টার্গেট
            </span>
            <span className="text-sm font-mono font-bold text-slate-700">{sqPct}%</span>
          </div>

          <div>
            <div className="flex items-baseline justify-between font-mono mb-1.5">
              <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
                {completedSq}
              </span>
              <span className="text-xs text-slate-400">/ {totalTargetSq} সম্পন্ন</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full transition-all duration-300"
                style={{ width: `${sqPct}%` }}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <span className="text-[11px] font-semibold text-slate-500 block">কুইক অ্যাড:</span>
            <div className="grid grid-cols-4 gap-1.5 text-xs font-mono">
              <button
                onClick={() => handleAdd('sq', 5)}
                className="p-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded border border-slate-200 transition-colors cursor-pointer"
              >
                +৫
              </button>
              <button
                onClick={() => handleAdd('sq', 10)}
                className="p-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded border border-slate-200 transition-colors cursor-pointer"
              >
                +১০
              </button>
              <button
                onClick={() => handleAdd('sq', 20)}
                className="p-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded border border-slate-200 transition-colors cursor-pointer"
              >
                +২০
              </button>
              <button
                onClick={() => handleAdd('sq', 40)}
                className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors cursor-pointer font-bold"
              >
                +৪০
              </button>
            </div>
          </div>
        </div>

        {/* CQ Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded">
              CQ (সৃজনশীল) টার্গেট
            </span>
            <span className="text-sm font-mono font-bold text-slate-700">{cqPct}%</span>
          </div>

          <div>
            <div className="flex items-baseline justify-between font-mono mb-1.5">
              <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
                {completedCq}
              </span>
              <span className="text-xs text-slate-400">/ {totalTargetCq} সম্পন্ন</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-purple-600 h-full transition-all duration-300"
                style={{ width: `${cqPct}%` }}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <span className="text-[11px] font-semibold text-slate-500 block">কুইক অ্যাড:</span>
            <div className="grid grid-cols-4 gap-1.5 text-xs font-mono">
              <button
                onClick={() => handleAdd('cq', 2)}
                className="p-1.5 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-700 rounded border border-slate-200 transition-colors cursor-pointer"
              >
                +২
              </button>
              <button
                onClick={() => handleAdd('cq', 5)}
                className="p-1.5 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-700 rounded border border-slate-200 transition-colors cursor-pointer"
              >
                +৫
              </button>
              <button
                onClick={() => handleAdd('cq', 10)}
                className="p-1.5 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-700 rounded border border-slate-200 transition-colors cursor-pointer"
              >
                +১০
              </button>
              <button
                onClick={() => handleAdd('cq', 20)}
                className="p-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors cursor-pointer font-bold"
              >
                +২০
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones and Badges */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <h3 className="text-base font-bold text-slate-900">অর্জন ও মাইলস্টোন আনলক</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border text-center transition-all ${
                m.unlocked
                  ? 'bg-amber-50/70 border-amber-300 text-amber-900 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
              }`}
            >
              <div className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center bg-white border border-slate-200 shadow-xs">
                {m.unlocked ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Flame className="w-4 h-4 text-slate-300" />
                )}
              </div>
              <span className="text-xs font-bold block">{m.name}</span>
              <span className="text-[10px] font-mono text-slate-500 mt-0.5 block">
                {m.unlocked ? 'আনলকড ✓' : `টার্গেট: ${m.target}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
