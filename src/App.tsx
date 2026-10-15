import React, { useState, useEffect } from 'react';
import { Header, NavTab } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { RoutineView } from './components/RoutineView';
import { ChapterVault } from './components/ChapterVault';
import { PracticeHub } from './components/PracticeHub';
import { TrackerView } from './components/TrackerView';
import { StrategyGuide } from './components/StrategyGuide';
import { PomodoroModal } from './components/PomodoroModal';
import { PrintModal } from './components/PrintModal';
import { calculateOverallProgress } from './utils/physics';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('routine');
  const [isTimerOpen, setIsTimerOpen] = useState<boolean>(false);
  const [isPrintOpen, setIsPrintOpen] = useState<boolean>(false);

  // Targets
  const totalTargetMcq = 1000;
  const totalTargetSq = 200;
  const totalTargetCq = 100;

  // State with localStorage persistence
  const [completedSlotIds, setCompletedSlotIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nctb_completed_slots');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completedMcq, setCompletedMcq] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('nctb_mcq_count');
      return saved ? parseInt(saved, 10) : 150; // default seed for testability
    } catch {
      return 150;
    }
  });

  const [completedSq, setCompletedSq] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('nctb_sq_count');
      return saved ? parseInt(saved, 10) : 40;
    } catch {
      return 40;
    }
  });

  const [completedCq, setCompletedCq] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('nctb_cq_count');
      return saved ? parseInt(saved, 10) : 15;
    } catch {
      return 15;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nctb_completed_slots', JSON.stringify(completedSlotIds));
    } catch {
      // ignore
    }
  }, [completedSlotIds]);

  useEffect(() => {
    try {
      localStorage.setItem('nctb_mcq_count', completedMcq.toString());
    } catch {
      // ignore
    }
  }, [completedMcq]);

  useEffect(() => {
    try {
      localStorage.setItem('nctb_sq_count', completedSq.toString());
    } catch {
      // ignore
    }
  }, [completedSq]);

  useEffect(() => {
    try {
      localStorage.setItem('nctb_cq_count', completedCq.toString());
    } catch {
      // ignore
    }
  }, [completedCq]);

  // Handle slot completion
  const handleToggleSlot = (slotId: string, mcq: number, sq: number, cq: number) => {
    setCompletedSlotIds((prev) => {
      const isAlreadyDone = prev.includes(slotId);
      if (isAlreadyDone) {
        // Untick and subtract
        setCompletedMcq((m) => Math.max(0, m - mcq));
        setCompletedSq((s) => Math.max(0, s - sq));
        setCompletedCq((c) => Math.max(0, c - cq));
        return prev.filter((id) => id !== slotId);
      } else {
        // Tick and add
        setCompletedMcq((m) => Math.min(totalTargetMcq, m + mcq));
        setCompletedSq((s) => Math.min(totalTargetSq, s + sq));
        setCompletedCq((c) => Math.min(totalTargetCq, c + cq));
        return [...prev, slotId];
      }
    });
  };

  const handleIncrementTarget = (type: 'mcq' | 'sq' | 'cq', amount: number) => {
    if (type === 'mcq') {
      setCompletedMcq((prev) => Math.min(totalTargetMcq + 500, prev + amount));
    } else if (type === 'sq') {
      setCompletedSq((prev) => Math.min(totalTargetSq + 100, prev + amount));
    } else if (type === 'cq') {
      setCompletedCq((prev) => Math.min(totalTargetCq + 50, prev + amount));
    }
  };

  const handleSetTarget = (type: 'mcq' | 'sq' | 'cq', value: number) => {
    if (type === 'mcq') setCompletedMcq(Math.max(0, value));
    if (type === 'sq') setCompletedSq(Math.max(0, value));
    if (type === 'cq') setCompletedCq(Math.max(0, value));
  };

  const handleResetProgress = () => {
    if (window.confirm('আপনি কি সমস্ত প্রোগ্রেস ও চেকলিস্ট রিসেট করতে চান?')) {
      setCompletedSlotIds([]);
      setCompletedMcq(0);
      setCompletedSq(0);
      setCompletedCq(0);
    }
  };

  const progress = calculateOverallProgress(
    completedMcq,
    totalTargetMcq,
    completedSq,
    totalTargetSq,
    completedCq,
    totalTargetCq
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Header adhering to Top Bar Contract */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenTimer={() => setIsTimerOpen(true)}
        onOpenPrint={() => setIsPrintOpen(true)}
        completedMcq={completedMcq}
        totalTargetMcq={totalTargetMcq}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Hero Banner with targets strip */}
        <HeroBanner
          onTabChange={setActiveTab}
          completedMcq={completedMcq}
          totalTargetMcq={totalTargetMcq}
          completedSq={completedSq}
          totalTargetSq={totalTargetSq}
          completedCq={completedCq}
          totalTargetCq={totalTargetCq}
          weightedPct={progress.totalWeightedPct}
        />

        {/* Tab View Container */}
        <div>
          {activeTab === 'routine' && (
            <RoutineView
              completedSlotIds={completedSlotIds}
              onToggleSlot={handleToggleSlot}
              onOpenTimer={() => setIsTimerOpen(true)}
            />
          )}

          {activeTab === 'chapters' && <ChapterVault />}

          {activeTab === 'practice' && (
            <PracticeHub onIncrementTarget={handleIncrementTarget} />
          )}

          {activeTab === 'tracker' && (
            <TrackerView
              completedMcq={completedMcq}
              totalTargetMcq={totalTargetMcq}
              completedSq={completedSq}
              totalTargetSq={totalTargetSq}
              completedCq={completedCq}
              totalTargetCq={totalTargetCq}
              onSetTarget={handleSetTarget}
              onIncrementTarget={handleIncrementTarget}
              onResetProgress={handleResetProgress}
              weightedPct={progress.totalWeightedPct}
            />
          )}

          {activeTab === 'strategy' && <StrategyGuide />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              <p className="font-semibold text-slate-700">
                পদার্থবিজ্ঞান ৩-দিনের মাস্টার প্ল্যান (অধ্যায় ৬-১০)
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) বাংলাদেশ সিলেবাস অনুসারে প্রণীত
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPrintOpen(true)}
                className="hover:text-blue-700 transition-colors cursor-pointer"
              >
                প্রিন্ট রুটিন
              </button>
              <span aria-hidden="true">·</span>
              <button
                onClick={() => setIsTimerOpen(true)}
                className="hover:text-blue-700 transition-colors cursor-pointer"
              >
                পোমোডোরো স্টাডি মোড
              </button>
              <span aria-hidden="true">·</span>
              <a
                href="https://nctb.gov.bd"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-700 transition-colors"
              >
                nctb.gov.bd
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PomodoroModal isOpen={isTimerOpen} onClose={() => setIsTimerOpen(false)} />
      <PrintModal isOpen={isPrintOpen} onClose={() => setIsPrintOpen(false)} />
    </div>
  );
}
