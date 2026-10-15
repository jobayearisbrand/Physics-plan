import React from 'react';
import { X, Printer, Download, CheckSquare } from 'lucide-react';
import { THREE_DAY_MASTER_PLAN } from '../data/routineData';
import { CHAPTERS_DATA } from '../data/chaptersData';

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintModal: React.FC<PrintModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Toolbar (hidden in print) */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 no-print">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              প্রিন্টেবল ৩ দিনের মাস্টার প্ল্যান ও ফর্মুলা শিট
            </h3>
            <p className="text-xs text-slate-500">
              এটি সরাসরি প্রিন্ট করুন বা ব্রাউজারের প্রিন্ট অপশন থেকে "Save as PDF" নির্বাচন করুন
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>প্রিন্ট / PDF ডাউনলোড</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              aria-label="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-900 font-sans print:p-0">
          {/* Document Header */}
          <div className="text-center pb-4 border-b-2 border-slate-800">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              এনসিটিবি দশম শ্রেণি: পদার্থবিজ্ঞান ৩ দিনের মহা-বিপ্লব মাস্টার প্ল্যান
            </h1>
            <p className="text-sm font-semibold text-slate-700 mt-1">
              অধ্যায় ৬ থেকে অধ্যায় ১০ · লক্ষ্যমাত্রা: ১০০০+ MCQ, ২০০+ SQ (ক+খ), এবং ১০০+ CQ
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-slate-600 mt-2 font-mono">
              <span>দিন ১: অধ্যায় ৬ ও ৭ (৪০০ MCQ, ৮০ SQ, ৪০ CQ)</span>
              <span>·</span>
              <span>দিন ২: অধ্যায় ৮ ও ৯ (৪০০ MCQ, ৮০ SQ, ৪০ CQ)</span>
              <span>·</span>
              <span>দিন ৩: অধ্যায় ১০ + মেগা টেস্ট (২০০ MCQ, ৪০ SQ, ২০ CQ)</span>
            </div>
          </div>

          {/* 3-Day Routine Table */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-300 pb-1">
              ১. তিন দিনের পূর্ণাঙ্গ সময়সূচি ও টাস্ক তালিকা
            </h2>

            {THREE_DAY_MASTER_PLAN.map((day) => (
              <div key={day.dayNumber} className="border border-slate-300 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                  <h3 className="text-base font-bold text-blue-900">
                    {day.bengaliDayName} — {day.focusChapters}
                  </h3>
                  <span className="text-xs font-mono font-bold bg-slate-100 px-2 py-0.5 rounded">
                    টার্গেট: {day.dailyTotalMcq} MCQ | {day.dailyTotalSq} SQ | {day.dailyTotalCq} CQ
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {day.slots.map((slot) => (
                    <div key={slot.id} className="p-2.5 bg-slate-50 rounded border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between font-bold text-slate-800">
                        <span>{slot.timeRange}</span>
                        <span className="text-blue-700 font-mono">
                          {slot.mcqTarget}M · {slot.sqTarget}S · {slot.cqTarget}C
                        </span>
                      </div>
                      <p className="font-semibold text-slate-900">{slot.title}</p>
                      <ul className="list-disc pl-4 text-slate-600 space-y-0.5">
                        {slot.actionItems.map((act, i) => (
                          <li key={i}>{act}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Formula Quick-Reference Sheet */}
          <div className="space-y-4 pt-4 border-t border-slate-300">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-300 pb-1">
              ২. অধ্যায় ৬-১০ এর সবচেয়ে গুরুত্বপূর্ণ ফর্মুলা চিটশিট
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {CHAPTERS_DATA.map((ch) => (
                <div key={ch.id} className="p-3 border border-slate-300 rounded-lg bg-slate-50">
                  <h4 className="font-bold text-slate-900 mb-1.5">
                    অধ্যায় {ch.chapterNumber}: {ch.bengaliTitle}
                  </h4>
                  <div className="space-y-1 font-mono">
                    {ch.formulas.slice(0, 3).map((f) => (
                      <div key={f.id} className="bg-white p-1.5 rounded border border-slate-200">
                        <span className="font-bold text-blue-800">{f.name}: </span>
                        <span>{f.formula}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Speed Rules Checklist */}
          <div className="pt-4 border-t border-slate-300 text-xs text-slate-700 space-y-1.5">
            <h3 className="font-bold text-slate-900">মাস্টার টেকনিক রিমাইন্ডার:</h3>
            <p>✓ <strong>MCQ 3-Pass Method:</strong> সহজগুলো ১০ সেকেন্ডে দাগাও, সূত্রের অংক ক্যালকুলেটরে একবারে কর।</p>
            <p>✓ <strong>CQ Structural Model:</strong> প্রতি অধ্যায়ের ৫টি ফুল সমাধান কর, বাকি ১৫টি Given & Formula মিলিয়ে নাও।</p>
            <p>✓ <strong>SQ Keyword Rule:</strong> ক-এ মূল সংজ্ঞা এবং খ-এ কারণ ও ব্যাখ্যা আলাদা প্যারায় লিখবে।</p>
          </div>
        </div>
      </div>
    </div>
  );
};
