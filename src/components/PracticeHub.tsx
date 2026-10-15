import React, { useState } from 'react';
import { SAMPLE_MCQ_BANK, SAMPLE_SQ_BANK, SAMPLE_CQ_BLUEPRINT, MCQQuestion, SQItem } from '../data/questionsData';
import { CheckCircle2, XCircle, HelpCircle, Award, Eye, EyeOff, RotateCcw, ChevronRight, Bookmark, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PracticeHubProps {
  onIncrementTarget: (type: 'mcq' | 'sq' | 'cq', amount: number) => void;
}

export const PracticeHub: React.FC<PracticeHubProps> = ({ onIncrementTarget }) => {
  const [hubMode, setHubMode] = useState<'mcq' | 'sq' | 'cq'>('mcq');

  // MCQ state
  const [mcqIndex, setMcqIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [mcqScore, setMcqScore] = useState<number>(0);
  const [mcqChapterFilter, setMcqChapterFilter] = useState<number | 'all'>('all');

  // SQ state
  const [sqFilter, setSqFilter] = useState<number | 'all'>('all');
  const [sqTypeFilter, setSqTypeFilter] = useState<'all' | 'জ্ঞান (ক)' | 'অনুধাবন (খ)'>('all');
  const [revealedSqIds, setRevealedSqIds] = useState<string[]>([]);

  // Filtered MCQs
  const filteredMcqs = SAMPLE_MCQ_BANK.filter((q) => {
    if (mcqChapterFilter === 'all') return true;
    return q.chapterId === mcqChapterFilter;
  });

  const currentMcq = filteredMcqs[mcqIndex] || filteredMcqs[0];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentMcq.correctIndex;
    if (isCorrect) {
      setMcqScore((prev) => prev + 1);
      onIncrementTarget('mcq', 1);
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.6 },
      });
    }
  };

  const handleNextMcq = () => {
    if (mcqIndex < filteredMcqs.length - 1) {
      setMcqIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Loop or finish
      setMcqIndex(0);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    }
  };

  const handleRestartQuiz = () => {
    setMcqIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setMcqScore(0);
  };

  // Filtered SQs
  const filteredSqs = SAMPLE_SQ_BANK.filter((sq) => {
    const chapterMatch = sqFilter === 'all' || sq.chapterId === sqFilter;
    const typeMatch = sqTypeFilter === 'all' || sq.type === sqTypeFilter;
    return chapterMatch && typeMatch;
  });

  const toggleRevealSq = (id: string) => {
    setRevealedSqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Practice Mode Selector Tabs */}
      <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">ইন্টারেক্টিভ প্র্যাকটিস হাব</h2>
          <p className="text-xs text-slate-500">
            ১০০০+ MCQ, ২০০+ SQ এবং ১০০+ CQ লক্ষ্য অর্জনের জন্য সরাসরি প্র্যাকটিস করুন
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg w-full sm:w-auto">
          <button
            onClick={() => setHubMode('mcq')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-all cursor-pointer ${
              hubMode === 'mcq' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            MCQ স্পিড টেস্ট
          </button>
          <button
            onClick={() => setHubMode('sq')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-all cursor-pointer ${
              hubMode === 'sq' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            SQ ফ্ল্যাশ রিভিশন (ক+খ)
          </button>
          <button
            onClick={() => setHubMode('cq')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-all cursor-pointer ${
              hubMode === 'cq' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            CQ সলভিং ব্লুপ্রিন্ট
          </button>
        </div>
      </div>

      {/* MODE 1: MCQ Interactive Test */}
      {hubMode === 'mcq' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">অধ্যায় ফিল্টার:</span>
              <select
                value={mcqChapterFilter}
                onChange={(e) => {
                  setMcqChapterFilter(e.target.value === 'all' ? 'all' : parseInt(e.target.value, 10));
                  setMcqIndex(0);
                  setSelectedOption(null);
                  setIsAnswerSubmitted(false);
                }}
                className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium"
              >
                <option value="all">সকল অধ্যায় (৬-১০)</option>
                <option value={6}>অধ্যায় ৬: তাপের প্রভাব</option>
                <option value={7}>অধ্যায় ৭: তরঙ্গ ও শব্দ</option>
                <option value={8}>অধ্যায় ৮: আলোর প্রতিফলন</option>
                <option value={9}>অধ্যায় ৯: আলোর প্রতিসরণ</option>
                <option value={10}>অধ্যায় ১০: স্থির তড়িৎ</option>
              </select>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-slate-500">
                প্রশ্ন: <strong className="text-slate-900">{mcqIndex + 1}</strong> / {filteredMcqs.length}
              </span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                স্কোর: {mcqScore}
              </span>
            </div>
          </div>

          {currentMcq && (
            <div className="mt-5 space-y-5">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-blue-700">{currentMcq.chapterName}</span>
                <span>উৎস: {currentMcq.source}</span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {currentMcq.question}
              </h3>

              {/* Options Grid */}
              <div className="space-y-2.5">
                {currentMcq.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentMcq.correctIndex;

                  let optionStyle = 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-800';

                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'border-rose-500 bg-rose-50 text-rose-900 line-through';
                    } else {
                      optionStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    optionStyle = 'border-blue-600 bg-blue-50 text-blue-900 font-semibold shadow-xs';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full p-3.5 rounded-xl border text-left text-sm flex items-center justify-between transition-all cursor-pointer ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center text-xs font-mono font-bold text-slate-700 shrink-0">
                          {['ক', 'খ', 'গ', 'ঘ'][idx]}
                        </span>
                        <span>{option}</span>
                      </div>

                      {isAnswerSubmitted && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {isAnswerSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3">
                <button
                  onClick={handleRestartQuiz}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>পুনরায় শুরু</span>
                </button>

                <div className="flex items-center gap-2">
                  {!isAnswerSubmitted ? (
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={selectedOption === null}
                      className={`px-5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        selectedOption !== null
                          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      উত্তর যাচাই করুন
                    </button>
                  ) : (
                    <button
                      onClick={handleNextMcq}
                      className="px-5 py-2 text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>পরবর্তী প্রশ্ন</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Explanation & Formula Box (Revealed on submission) */}
              {isAnswerSubmitted && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 mt-4 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <HelpCircle className="w-4 h-4 text-blue-600" />
                    <span>ব্যাখ্যা ও সূত্র হ্যাক্স:</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{currentMcq.explanation}</p>
                  {currentMcq.formulaTip && (
                    <div className="font-mono text-blue-800 bg-blue-50 px-2.5 py-1 rounded inline-block">
                      💡 {currentMcq.formulaTip}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* MODE 2: SQ (Knowledge & Comprehension) Bank */}
      {hubMode === 'sq' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-700">ফিল্টার:</span>
              <select
                value={sqFilter}
                onChange={(e) => setSqFilter(e.target.value === 'all' ? 'all' : parseInt(e.target.value, 10))}
                className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium"
              >
                <option value="all">সকল অধ্যায় (৬-১০)</option>
                <option value={6}>অধ্যায় ৬: তাপ</option>
                <option value={7}>অধ্যায় ৭: তরঙ্গ ও শব্দ</option>
                <option value={8}>অধ্যায় ৮: প্রতিফলন</option>
                <option value={9}>অধ্যায় ৯: প্রতিসরণ</option>
                <option value={10}>অধ্যায় ১০: স্থির তড়িৎ</option>
              </select>

              <select
                value={sqTypeFilter}
                onChange={(e) => setSqTypeFilter(e.target.value as any)}
                className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium"
              >
                <option value="all">জ্ঞান ও অনুধাবন উভয়ই</option>
                <option value="জ্ঞান (ক)">জ্ঞানমূলক 'ক' (১ নম্বর)</option>
                <option value="অনুধাবন (খ)">অনুধাবনমূলক 'খ' (২ নম্বর)</option>
              </select>
            </div>

            <button
              onClick={() => {
                if (revealedSqIds.length === filteredSqs.length) {
                  setRevealedSqIds([]);
                } else {
                  setRevealedSqIds(filteredSqs.map((s) => s.id));
                }
              }}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 cursor-pointer flex items-center gap-1"
            >
              {revealedSqIds.length === filteredSqs.length ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>সব উত্তর লুকান</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>সব উত্তর দেখুন</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-4">
            {filteredSqs.map((sq) => {
              const isRevealed = revealedSqIds.includes(sq.id);

              return (
                <div
                  key={sq.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold mb-1">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            sq.type === 'জ্ঞান (ক)'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {sq.type}
                        </span>
                        <span className="text-slate-500">{sq.chapterName}</span>
                        <span aria-hidden="true" className="text-slate-300">
                          ·
                        </span>
                        <span className="text-slate-500 font-mono text-[11px]">{sq.source}</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {sq.question}
                      </h4>
                    </div>

                    <button
                      onClick={() => toggleRevealSq(sq.id)}
                      className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 text-slate-700 shrink-0 cursor-pointer"
                    >
                      {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{isRevealed ? 'লুকান' : 'উত্তর'}</span>
                    </button>
                  </div>

                  {isRevealed && (
                    <div className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-2 text-xs sm:text-sm">
                      <p className="text-slate-800 leading-relaxed font-sans">{sq.answer}</p>
                      <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-amber-800 text-xs">
                        <Bookmark className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>
                          <strong>মুখস্থ কিওয়ার্ড:</strong> {sq.highlightKeyword}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE 3: CQ Blueprint & Solved Breakdown */}
      {hubMode === 'cq' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-700 mb-1">
              <span>{SAMPLE_CQ_BLUEPRINT.chapterName}</span>
              <span aria-hidden="true">·</span>
              <span>১০ নম্বরের পূর্ণাঙ্গ মডেল বিশ্লেষণ</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {SAMPLE_CQ_BLUEPRINT.title}
            </h3>
          </div>

          {/* Scenario (উদ্দীপক) Box */}
          <div className="p-4 bg-purple-50/50 border border-purple-200/80 rounded-xl space-y-2">
            <span className="text-xs font-bold text-purple-900 uppercase block tracking-wide">
              উদ্দীপক (Stimulus):
            </span>
            <p className="text-sm text-slate-800 leading-relaxed">
              {SAMPLE_CQ_BLUEPRINT.scenario}
            </p>
            {SAMPLE_CQ_BLUEPRINT.stimulusData && (
              <div className="text-xs font-mono text-purple-900 bg-white p-2.5 rounded-lg border border-purple-100">
                {SAMPLE_CQ_BLUEPRINT.stimulusData}
              </div>
            )}
          </div>

          {/* Questions & Step-by-Step Solutions */}
          <div className="space-y-4">
            {/* ক */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/30">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                <span>(ক) জ্ঞানমূলক প্রশ্ন [১ নম্বর]</span>
              </div>
              <p className="text-sm font-semibold text-slate-900 mb-2">
                {SAMPLE_CQ_BLUEPRINT.questions.k.q}
              </p>
              <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-700">
                <span className="font-bold text-emerald-700">উত্তর: </span>
                {SAMPLE_CQ_BLUEPRINT.questions.k.a}
              </div>
            </div>

            {/* খ */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/30">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                <span>(খ) অনুধাবনমূলক প্রশ্ন [২ নম্বর]</span>
              </div>
              <p className="text-sm font-semibold text-slate-900 mb-2">
                {SAMPLE_CQ_BLUEPRINT.questions.kh.q}
              </p>
              <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-700">
                <span className="font-bold text-emerald-700">উত্তর: </span>
                {SAMPLE_CQ_BLUEPRINT.questions.kh.a}
              </div>
            </div>

            {/* গ */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/30">
              <div className="flex items-center justify-between text-xs font-bold text-blue-700 mb-1">
                <span>(গ) প্রয়োগমূলক গাণিতিক সমস্যা [৩ নম্বর]</span>
              </div>
              <p className="text-sm font-semibold text-slate-900 mb-2">
                {SAMPLE_CQ_BLUEPRINT.questions.g.q}
              </p>
              <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-2 text-xs sm:text-sm">
                <span className="font-bold text-blue-700 block">গাণিতিক সমাধানের ধাপসমূহ:</span>
                <div className="font-mono text-xs space-y-1.5 bg-slate-50 p-3 rounded border border-slate-200 text-slate-800">
                  {SAMPLE_CQ_BLUEPRINT.questions.g.calcSteps.map((step, idx) => (
                    <div key={idx} className="leading-relaxed">
                      {step}
                    </div>
                  ))}
                </div>
                <div className="text-xs font-bold text-emerald-800 bg-emerald-50 p-2 rounded">
                  ফলাফল: {SAMPLE_CQ_BLUEPRINT.questions.g.result}
                </div>
              </div>
            </div>

            {/* ঘ */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/30">
              <div className="flex items-center justify-between text-xs font-bold text-purple-700 mb-1">
                <span>(ঘ) উচ্চতর দক্ষতা ও গাণিতিক বিশ্লেষণ [৪ নম্বর]</span>
              </div>
              <p className="text-sm font-semibold text-slate-900 mb-2">
                {SAMPLE_CQ_BLUEPRINT.questions.gh.q}
              </p>
              <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-2 text-xs sm:text-sm">
                <span className="font-bold text-purple-700 block">বিশ্লেষণের বৈজ্ঞানিক প্রমাণ:</span>
                <div className="font-mono text-xs space-y-1.5 bg-slate-50 p-3 rounded border border-slate-200 text-slate-800">
                  {SAMPLE_CQ_BLUEPRINT.questions.gh.calcSteps.map((step, idx) => (
                    <div key={idx} className="leading-relaxed">
                      {step}
                    </div>
                  ))}
                </div>
                <div className="text-xs font-bold text-purple-900 bg-purple-50 p-2 rounded border border-purple-200">
                  সিদ্ধান্ত ও রায়: {SAMPLE_CQ_BLUEPRINT.questions.gh.verdict}
                </div>
              </div>
            </div>
          </div>

          {/* Examiner Secret Tip */}
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900">
            <strong>{SAMPLE_CQ_BLUEPRINT.examinerTips}</strong>
          </div>
        </div>
      )}
    </div>
  );
};
