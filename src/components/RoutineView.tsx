import React, { useState } from 'react';
import { THREE_DAY_MASTER_PLAN, DayPlan, TimeSlot } from '../data/routineData';
import { CheckCircle2, Circle, Clock, Flame, BookOpen, Lightbulb, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RoutineViewProps {
  completedSlotIds: string[];
  onToggleSlot: (slotId: string, mcq: number, sq: number, cq: number) => void;
  onOpenTimer: () => void;
}

export const RoutineView: React.FC<RoutineViewProps> = ({
  completedSlotIds,
  onToggleSlot,
  onOpenTimer,
}) => {
  const [selectedDay, setSelectedDay] = useState<1 | 2 | 3>(1);

  const currentPlan = THREE_DAY_MASTER_PLAN.find((d) => d.dayNumber === selectedDay) || THREE_DAY_MASTER_PLAN[0];

  const handleSlotClick = (slot: TimeSlot) => {
    const isCompleted = completedSlotIds.includes(slot.id);
    onToggleSlot(slot.id, slot.mcqTarget, slot.sqTarget, slot.cqTarget);
    if (!isCompleted) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Day Selector Segmented Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900">৩ দিনের মাস্টার শিডিউল</h2>
          <p className="text-xs text-slate-500">প্রতিটি স্লটের কাজ শেষ করে টিকমার্ক দিন ও প্রোগ্রেস বৃদ্ধি করুন</p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg w-full sm:w-auto overflow-x-auto">
          {THREE_DAY_MASTER_PLAN.map((plan) => {
            const isDaySelected = selectedDay === plan.dayNumber;
            const completedCount = plan.slots.filter((s) => completedSlotIds.includes(s.id)).length;
            const isAllCompleted = completedCount === plan.slots.length;

            return (
              <button
                key={plan.dayNumber}
                onClick={() => setSelectedDay(plan.dayNumber)}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isDaySelected
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>দিন ০{plan.dayNumber}</span>
                {isAllCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 font-mono">
                    {completedCount}/{plan.slots.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Day Focus Card */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-xl p-5 sm:p-6 shadow-md border border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-blue-300 font-medium mb-1">
              <span>{currentPlan.bengaliDayName}</span>
              <span aria-hidden="true">·</span>
              <span>ফোকাস: {currentPlan.focusChapters}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
              {currentPlan.headline}
            </h3>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              {currentPlan.summary}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-lg border border-white/10 shrink-0">
            <div className="text-center">
              <span className="text-[10px] text-slate-300 block uppercase">দিনের লক্ষ্য</span>
              <div className="text-sm font-bold text-white flex items-center gap-1.5">
                <span className="text-blue-300 font-mono tabular-nums">{currentPlan.dailyTotalMcq}</span>
                <span className="text-blue-300">MCQ</span>
                <span>·</span>
                <span className="text-emerald-300 font-mono tabular-nums">{currentPlan.dailyTotalSq}</span>
                <span className="text-emerald-300">SQ</span>
                <span>·</span>
                <span className="text-purple-300 font-mono tabular-nums">{currentPlan.dailyTotalCq}</span>
                <span className="text-purple-300">CQ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Time Slots Timeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {currentPlan.slots.map((slot, index) => {
          const isDone = completedSlotIds.includes(slot.id);

          return (
            <div
              key={slot.id}
              className={`rounded-xl border transition-all p-5 flex flex-col justify-between ${
                isDone
                  ? 'bg-emerald-50/70 border-emerald-300 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-blue-300 shadow-sm'
              }`}
            >
              <div>
                {/* Header of Slot */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>{slot.timeRange}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-blue-600">{slot.chapterBadge}</span>
                    </div>
                    <h4 className={`text-base font-bold ${isDone ? 'text-emerald-900 line-through' : 'text-slate-900'}`}>
                      {slot.title}
                    </h4>
                  </div>

                  <button
                    onClick={() => handleSlotClick(slot)}
                    className={`p-2 rounded-lg transition-colors cursor-pointer shrink-0 ${
                      isDone
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-slate-100 text-slate-500 hover:bg-blue-100 hover:text-blue-700'
                    }`}
                    title={isDone ? 'সম্পন্ন হিসেবে চিহ্নিত' : 'সম্পন্ন করতে ক্লিক করুন'}
                    aria-label={`স্লট ${index + 1} সম্পন্ন অবস্থা পরিবর্তন`}
                  >
                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                  </button>
                </div>

                {/* Target Chips */}
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-4 pb-3 border-b border-slate-100">
                  <span className="font-semibold text-slate-900">এই সেশনের টার্গেট:</span>
                  <span className="font-mono text-blue-700">{slot.mcqTarget} MCQ</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-emerald-700">{slot.sqTarget} SQ</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-purple-700">{slot.cqTarget} CQ</span>
                </div>

                {/* Action Items List */}
                <div className="space-y-2 mb-4">
                  <div className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <span>করণীয় ধাপসমূহ:</span>
                  </div>
                  <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5 pl-5 list-disc marker:text-blue-500">
                    {slot.actionItems.map((item, idx) => (
                      <li key={idx} className="leading-snug">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Pro Tip & Timer Trigger */}
              <div className="pt-3 border-t border-slate-100 mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                <div className="flex items-start gap-1.5 text-xs text-amber-800 bg-amber-50/80 p-2 rounded-lg border border-amber-200/60 w-full sm:w-auto flex-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span className="leading-tight">{slot.proTip}</span>
                </div>

                <button
                  onClick={onOpenTimer}
                  className="px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-blue-700 hover:bg-slate-100 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  <Clock className="w-3 h-3 text-blue-600" />
                  <span>টাইমারে শুরু</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
