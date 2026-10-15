import React from 'react';
import { BookOpen, Calendar, Target, Award, Clock, Printer } from 'lucide-react';

export type NavTab = 'routine' | 'chapters' | 'practice' | 'tracker' | 'strategy';

interface HeaderProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenTimer: () => void;
  onOpenPrint: () => void;
  completedMcq: number;
  totalTargetMcq: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenTimer,
  onOpenPrint,
  completedMcq,
  totalTargetMcq,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-8 h-16">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <button
            onClick={() => onTabChange('routine')}
            className="flex items-center gap-2 text-left text-slate-900 hover:text-blue-700 transition-colors cursor-pointer group min-w-0 shrink"
            aria-label="পদার্থবিজ্ঞান ৩ দিনের মাস্টার প্ল্যান হোমপেজে যান"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-sm shrink-0">
              <span className="font-mono">১০</span>
            </div>
            <div className="truncate">
              <span className="text-sm sm:text-lg font-bold tracking-tight block truncate">
                পদার্থবিজ্ঞান ৩-দিনের প্ল্যান
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 hidden sm:block -mt-0.5 whitespace-nowrap">
                অধ্যায় ৬-১০ · ১০০০ MCQ · ২০০ SQ · ১০০ CQ
              </span>
            </div>
          </button>

          {/* Zone 2: 5 Concise Single-Line Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium text-slate-600"
            aria-label="প্রধান নেভিগেশন"
          >
            <button
              onClick={() => onTabChange('routine')}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'routine'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>৩ দিনের রুটিন</span>
            </button>

            <button
              onClick={() => onTabChange('chapters')}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'chapters'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>অধ্যায় ও সূত্র ভল্ট</span>
            </button>

            <button
              onClick={() => onTabChange('practice')}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'practice'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>প্র্যাকটিস হাব</span>
            </button>

            <button
              onClick={() => onTabChange('tracker')}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'tracker'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>টার্গেট ট্র্যাকার</span>
            </button>

            <button
              onClick={() => onTabChange('strategy')}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'strategy'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>কৌশল ও স্পিড রুলস</span>
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action (with timer toggle utility) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={onOpenTimer}
              className="px-2.5 sm:px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
              title="৫০/১০ পোমোডোরো স্টাডি টাইমার খুলুন"
              aria-label="পোমোডোরো স্টাডি টাইমার"
            >
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">পোমোডোরো</span>
            </button>

            <button
              onClick={onOpenPrint}
              className="px-2.5 sm:px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-lg transition-all shadow-sm whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
              aria-label="রুটিন প্রিন্ট বা পিডিএফ সেভ করুন"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>প্রিন্ট</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-100 text-xs overflow-x-auto">
          <button
            onClick={() => onTabChange('routine')}
            className={`px-2 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'routine' ? 'text-blue-700 font-bold bg-blue-50' : 'text-slate-600'
            }`}
          >
            রুটিন
          </button>
          <button
            onClick={() => onTabChange('chapters')}
            className={`px-2 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'chapters' ? 'text-blue-700 font-bold bg-blue-50' : 'text-slate-600'
            }`}
          >
            অধ্যায় ও সূত্র
          </button>
          <button
            onClick={() => onTabChange('practice')}
            className={`px-2 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'practice' ? 'text-blue-700 font-bold bg-blue-50' : 'text-slate-600'
            }`}
          >
            প্র্যাকটিস
          </button>
          <button
            onClick={() => onTabChange('tracker')}
            className={`px-2 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'tracker' ? 'text-blue-700 font-bold bg-blue-50' : 'text-slate-600'
            }`}
          >
            ট্র্যাকার
          </button>
          <button
            onClick={() => onTabChange('strategy')}
            className={`px-2 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'strategy' ? 'text-blue-700 font-bold bg-blue-50' : 'text-slate-600'
            }`}
          >
            কৌশল
          </button>
        </div>
      </div>
    </header>
  );
};
