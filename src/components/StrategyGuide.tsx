import React from 'react';
import { STRATEGY_RULES } from '../data/routineData';
import { Zap, CheckCircle2, AlertTriangle, ShieldCheck, HeartPulse } from 'lucide-react';

export const StrategyGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
            <Zap className="w-4 h-4" />
            <span>বিজ্ঞানসম্মত কৌশল</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
            ৩ দিনে ১০০০ MCQ, ২০০ SQ ও ১০০ CQ জয়ের মাস্টার স্ট্র্যাটেজি
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            শুধু ঘণ্টার পর ঘণ্টা টেবিলে বসে থাকলেই হবে না; ৮০০ পৃষ্ঠার প্র্যাকটিস শেষ করতে দরকার স্মার্ট মেথডোলজি। নিচে শীর্ষ ক্যাডেট ও বোর্ড ফার্স্টদের পরীক্ষিত পদ্ধতিগুলো বিস্তারিত দেওয়া হলো:
          </p>
        </div>
      </div>

      {/* Strategy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {STRATEGY_RULES.map((rule) => (
          <div
            key={rule.id}
            className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded">
                  {rule.category === 'MCQ'
                    ? '১০০০ MCQ স্ট্র্যাটেজি'
                    : rule.category === 'SQ'
                    ? '২০০ SQ মেমোরি কৌশল'
                    : rule.category === 'CQ'
                    ? '১০০ CQ সময় সাশ্রয়ী মডেল'
                    : 'পোমোডোরো ও স্বাস্থ্য গাইড'}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                {rule.title}
              </h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                {rule.subtitle}
              </p>

              <div className="space-y-2.5">
                {rule.points.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Daily Routine Summary Box */}
      <div className="bg-slate-900 text-white rounded-xl p-5 sm:p-6 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <HeartPulse className="w-5 h-5 text-rose-400" />
          <h3 className="text-base font-bold text-white">
            শারীরিক সুস্থতা ও মেন্টাল পিক পারফরম্যান্স রুলস
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="bg-slate-800/60 p-3.5 rounded-lg border border-slate-700">
            <span className="text-blue-400 font-bold block mb-1">১. পর্যাপ্ত হাইড্রেশন</span>
            <span>প্রতি ৫০ মিনিটের সেশন শেষে ২০০ মিলি পানি পান কর। ডিহাইড্রেশন ব্রেনের ফোকাস নষ্ট করে।</span>
          </div>
          <div className="bg-slate-800/60 p-3.5 rounded-lg border border-slate-700">
            <span className="text-emerald-400 font-bold block mb-1">২. স্ক্রিন ডিটক্স</span>
            <span>১০ মিনিটের বিরতিতে মোবাইল বা সোশ্যাল মিডিয়া দেখবে না। ব্যালকনিতে হাঁটাহাঁটি বা চোখ বন্ধ করে থাকো।</span>
          </div>
          <div className="bg-slate-800/60 p-3.5 rounded-lg border border-slate-700">
            <span className="text-amber-400 font-bold block mb-1">৩. ৭ ঘণ্টা নির্ভেজাল ঘুম</span>
            <span>রাত ১১টা থেকে ভোর ৬টা পর্যন্ত গাঢ় ঘুম দাও। ঘুম না হলে মস্তিষ্কের তথ্য সংরক্ষণের প্রক্রিয়া ক্ষতিগ্রস্ত হয়।</span>
          </div>
        </div>
      </div>
    </div>
  );
};
