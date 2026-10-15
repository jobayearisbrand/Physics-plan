import React from 'react';
import { Target, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { NavTab } from './Header';

interface HeroBannerProps {
  onTabChange: (tab: NavTab) => void;
  completedMcq: number;
  totalTargetMcq: number;
  completedSq: number;
  totalTargetSq: number;
  completedCq: number;
  totalTargetCq: number;
  weightedPct: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onTabChange,
  completedMcq,
  totalTargetMcq,
  completedSq,
  totalTargetSq,
  completedCq,
  totalTargetCq,
  weightedPct,
}) => {
  return (
    <div className="relative bg-slate-900 text-white rounded-2xl overflow-hidden border border-slate-800 shadow-xl mb-8">
      {/* Background visual asset with measured scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_physics_mastery_1792069672751.jpg"
          alt="Physics Laboratory and Study Instruments"
          className="w-full h-full object-cover opacity-35"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Resilient fallback
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/70" />
      </div>

      <div className="relative z-10 p-6 sm:p-8 lg:p-10">
        <div className="max-w-3xl">
          {/* Metadata with typographic separator */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm font-medium text-blue-300 mb-3 tracking-wide">
            <span>NCTB জাতীয় শিক্ষাক্রম (দশম শ্রেণি)</span>
            <span aria-hidden="true">·</span>
            <span>অধ্যায় ৬ থেকে ১০</span>
            <span aria-hidden="true">·</span>
            <span>সময়সীমা: ৭২ ঘণ্টা (৩ দিন)</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight text-balance">
            ৩ দিনের পদার্থবিজ্ঞান মহা-বিপ্লব: <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-teal-300">
              ১০০০+ MCQ · ২০০+ SQ · ১০০+ CQ
            </span>{' '}
            মাস্টার প্ল্যান
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
            বস্তুর ওপর তাপের প্রভাব, তরঙ্গ ও শব্দ, আলোর প্রতিফলন, প্রতিসরণ এবং স্থির তড়িৎ—এই ৫টি সবচেয়ে গুরুত্বপূর্ণ অধ্যায় বোর্ড স্ট্যান্ডার্ড স্পিড টেকনিক ও পোমোডোরো রুটিন মেনে ৩ দিনে সম্পূর্ণ আয়ত্ত করুন।
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onTabChange('routine')}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 rounded-lg transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>৩ দিনের রুটিন দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onTabChange('practice')}
              className="px-5 py-2.5 text-sm font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>ইন্টারেক্টিভ টেস্ট শুরু করুন</span>
            </button>

            <button
              onClick={() => onTabChange('chapters')}
              className="px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              সূত্র ভল্ট ও ক্যালকুলেটর →
            </button>
          </div>
        </div>

        {/* Real-time Target Dashboard Strip */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 backdrop-blur-sm p-3.5 rounded-xl border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
              <span>MCQ লক্ষ্যমাত্রা</span>
              <span className="font-mono tabular-nums text-blue-400 font-semibold">
                {Math.round((completedMcq / totalTargetMcq) * 100)}%
              </span>
            </div>
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="text-2xl font-bold text-white tabular-nums">{completedMcq}</span>
              <span className="text-xs text-slate-400">/ {totalTargetMcq}</span>
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-blue-500 h-full transition-all duration-500"
                style={{ width: `${Math.min(100, (completedMcq / totalTargetMcq) * 100)}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm p-3.5 rounded-xl border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
              <span>SQ (ক + খ) লক্ষ্যমাত্রা</span>
              <span className="font-mono tabular-nums text-emerald-400 font-semibold">
                {Math.round((completedSq / totalTargetSq) * 100)}%
              </span>
            </div>
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="text-2xl font-bold text-white tabular-nums">{completedSq}</span>
              <span className="text-xs text-slate-400">/ {totalTargetSq}</span>
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-500"
                style={{ width: `${Math.min(100, (completedSq / totalTargetSq) * 100)}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm p-3.5 rounded-xl border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
              <span>CQ (সৃজনশীল) লক্ষ্যমাত্রা</span>
              <span className="font-mono tabular-nums text-purple-400 font-semibold">
                {Math.round((completedCq / totalTargetCq) * 100)}%
              </span>
            </div>
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="text-2xl font-bold text-white tabular-nums">{completedCq}</span>
              <span className="text-xs text-slate-400">/ {totalTargetCq}</span>
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-purple-500 h-full transition-all duration-500"
                style={{ width: `${Math.min(100, (completedCq / totalTargetCq) * 100)}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm p-3.5 rounded-xl border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
              <span>সার্বিক অর্জন</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-amber-400 font-mono tabular-nums">{weightedPct}%</span>
              <span className="text-xs text-slate-400 font-sans">প্রস্তুতি সম্পন্ন</span>
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full transition-all duration-500"
                style={{ width: `${weightedPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
