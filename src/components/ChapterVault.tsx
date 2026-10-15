import React, { useState } from 'react';
import { CHAPTERS_DATA, Chapter } from '../data/chaptersData';
import {
  calculateHeat,
  calculateWaveSpeed,
  calculateEchoDistance,
  calculateSoundSpeedAtTemp,
  calculateImagePosition,
  calculateLensPower,
  calculateCoulombForce,
  calculateElectricIntensity,
} from '../utils/physics';
import { Calculator, BookOpen, Layers, CheckCircle2, HelpCircle } from 'lucide-react';

export const ChapterVault: React.FC = () => {
  const [selectedChapterId, setSelectedChapterId] = useState<number>(6);

  // Calculator states
  // Ch 6: Heat Q = msΔθ
  const [massKg, setMassKg] = useState<number>(1.5);
  const [specificHeat, setSpecificHeat] = useState<number>(4200); // Water
  const [tempDiff, setTempDiff] = useState<number>(25);

  // Ch 7: Wave v = fλ & Echo
  const [frequency, setFrequency] = useState<number>(256);
  const [wavelength, setWavelength] = useState<number>(1.33);
  const [soundTemp, setSoundTemp] = useState<number>(25);
  const [echoTime, setEchoTime] = useState<number>(0.15);

  // Ch 8/9: Optics 1/f = 1/u + 1/v & P = 1/f
  const [focalLength, setFocalLength] = useState<number>(15);
  const [objectDistance, setObjectDistance] = useState<number>(25);

  // Ch 10: Coulomb Force F = k q1 q2 / r^2
  const [charge1, setCharge1] = useState<number>(2); // in microCoulombs
  const [charge2, setCharge2] = useState<number>(5);
  const [chargeDistance, setChargeDistance] = useState<number>(0.2); // in meters

  const activeChapter = CHAPTERS_DATA.find((c) => c.id === selectedChapterId) || CHAPTERS_DATA[0];

  // Calculated values
  const calculatedHeat = calculateHeat({ massKg, specificHeat, tempDiff });
  const calculatedWaveSpeed = calculateWaveSpeed({ frequency, wavelength });
  const speedAtTemp = calculateSoundSpeedAtTemp({ tempCelsius: soundTemp });
  const calculatedEcho = calculateEchoDistance({ soundSpeed: speedAtTemp, timeSeconds: echoTime });
  const calculatedOptics = calculateImagePosition({ focalLength, objectDistance });
  const calculatedPower = calculateLensPower(focalLength / 100);
  const calculatedCoulomb = calculateCoulombForce({
    q1: charge1 * 1e-6,
    q2: charge2 * 1e-6,
    distance: chargeDistance,
  });

  return (
    <div className="space-y-6">
      {/* Chapter Selection Horizontal Tabs */}
      <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">অধ্যায় ও সূত্র ভল্ট</h2>
            <p className="text-xs text-slate-500">এনসিটিবি দশম শ্রেণির পদার্থবিজ্ঞান অধ্যায় ৬-১০ এর পূর্ণাঙ্গ সূত্র ও ক্যালকুলেটর</p>
          </div>
          <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
            বোর্ড সিলেবাস (nctb.gov.bd)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {CHAPTERS_DATA.map((ch) => {
            const isSelected = ch.id === selectedChapterId;
            return (
              <button
                key={ch.id}
                onClick={() => setSelectedChapterId(ch.id)}
                className={`p-2.5 rounded-lg text-left transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <span className={`text-[11px] block font-semibold ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                  অধ্যায় ০{ch.chapterNumber} (দিন {ch.targetDay})
                </span>
                <span className="text-xs sm:text-sm font-bold block truncate mt-0.5">
                  {ch.bengaliTitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Chapter Overview Box */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
              <span>অধ্যায় {activeChapter.chapterNumber}</span>
              <span aria-hidden="true">·</span>
              <span className="text-blue-600 font-semibold">{activeChapter.englishTitle}</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-700 font-semibold">গুরুত্ব: {activeChapter.importance}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              {activeChapter.bengaliTitle}
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              {activeChapter.tagline}
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-700">
            <span className="font-semibold block text-slate-900 mb-0.5">বোর্ড গুরুত্ব:</span>
            <span>{activeChapter.boardWeight}</span>
          </div>
        </div>

        {/* Visual diagram for Optics chapters */}
        {(activeChapter.id === 8 || activeChapter.id === 9) && (
          <div className="mt-5 p-4 bg-slate-900 rounded-xl text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/2 rounded-lg overflow-hidden border border-slate-800">
                <img
                  src="/src/assets/images/optics_light_prism_1792069671937.jpg"
                  alt="Refraction through prism and convex lens"
                  className="w-full h-auto object-cover max-h-56"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="w-full md:w-1/2 space-y-2">
                <span className="text-xs font-mono text-cyan-400">চিত্র ভিত্তিক অ্যানালাইসিস</span>
                <h4 className="text-base font-bold text-white">
                  প্রিজমে প্রতিসরণ ও লেন্সের ফোকাসিং কৌশল
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  বোর্ড পরীক্ষায় রশ্মিচিত্র আঁকার সময় আপতন কোণ (i), প্রতিসরণ কোণ (r), বিচ্যুতি কোণ (δ) এবং অবশ্যই আলোক রশ্মির তীরচিহ্ন (Arrow) স্পষ্টভাবে দেখাতে হবে। উত্তল লেন্সে সমান্তরাল আলোক রশ্মি প্রধান ফোকাসে মিলিত হয় (অভিসারী ক্রিয়া)।
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Physics Calculator for this chapter */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-4 h-4 text-blue-600" />
            <h4 className="text-sm font-bold text-slate-900">
              ইন্টারেক্টিভ পদার্থবিজ্ঞান ক্যালকুলেটর (লাইভ ভ্যালু টেস্ট)
            </h4>
          </div>

          {activeChapter.id === 6 && (
            <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl p-4 sm:p-5">
              <span className="text-xs font-semibold text-blue-800 block mb-3 font-mono">
                সূত্র: Q = m · s · Δθ (গৃহীত বা বর্জিত তাপ নির্ণয়)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    বস্তুর ভর m (কেজি / kg):
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={massKg}
                    onChange={(e) => setMassKg(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white px-3 py-1.5 text-sm rounded-lg border border-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    আপেক্ষিক তাপ s (J/kg·K):
                  </label>
                  <select
                    value={specificHeat}
                    onChange={(e) => setSpecificHeat(parseFloat(e.target.value))}
                    className="w-full bg-white px-3 py-1.5 text-sm rounded-lg border border-slate-300 font-mono"
                  >
                    <option value={4200}>পানি (Water): ৪২০০ J/kg·K</option>
                    <option value={2100}>বরফ (Ice): ২১০০ J/kg·K</option>
                    <option value={2000}>জলীয় বাষ্প: ২০০০ J/kg·K</option>
                    <option value={400}>তামা (Copper): ৪০০ J/kg·K</option>
                    <option value={460}>লোহা (Iron): ৪৬০ J/kg·K</option>
                    <option value={130}>সীসা (Lead): ১৩০ J/kg·K</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    তাপমাত্রার পরিবর্তন Δθ (°C বা K):
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={tempDiff}
                    onChange={(e) => setTempDiff(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white px-3 py-1.5 text-sm rounded-lg border border-slate-300 font-mono"
                  />
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-blue-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">প্রয়োজনীয় তাপ (Q):</span>
                <span className="font-mono text-base font-bold text-blue-700">
                  {calculatedHeat.toLocaleString()} জুল (J) / {(calculatedHeat / 1000).toFixed(2)} kJ
                </span>
              </div>
            </div>
          )}

          {activeChapter.id === 7 && (
            <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl p-4 sm:p-5 space-y-4">
              <span className="text-xs font-semibold text-blue-800 block font-mono">
                সূত্র ১: v = f · λ (তরঙ্গ বেগ) | সূত্র ২: d = (v · t) / 2 (প্রতিধ্বনি ও গভীরতা)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">কম্পাঙ্ক f (Hz):</label>
                  <input
                    type="number"
                    value={frequency}
                    onChange={(e) => setFrequency(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white px-3 py-1.5 text-sm rounded-lg border border-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">তরঙ্গদৈর্ঘ্য λ (m):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={wavelength}
                    onChange={(e) => setWavelength(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white px-3 py-1.5 text-sm rounded-lg border border-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">বায়ুর তাপমাত্রা θ (°C):</label>
                  <input
                    type="number"
                    value={soundTemp}
                    onChange={(e) => setSoundTemp(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white px-3 py-1.5 text-sm rounded-lg border border-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">প্রতিধ্বনি সময় t (s):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={echoTime}
                    onChange={(e) => setEchoTime(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white px-3 py-1.5 text-sm rounded-lg border border-slate-300 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-lg border border-blue-200 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">তরঙ্গ বেগ (v = fλ):</span>
                  <span className="font-mono text-sm font-bold text-blue-700">{calculatedWaveSpeed} m/s</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-blue-200 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">প্রতিফলকের দূরত্ব (d):</span>
                  <span className="font-mono text-sm font-bold text-emerald-700">
                    {calculatedEcho.distance} মিটার ({calculatedEcho.canHearEcho ? 'প্রতিধ্বনি শোনা যাবে' : 'শোনা যাবে না'})
                  </span>
                </div>
              </div>
            </div>
          )}

          {(activeChapter.id === 8 || activeChapter.id === 9) && (
            <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl p-4 sm:p-5 space-y-4">
              <span className="text-xs font-semibold text-blue-800 block font-mono">
                সূত্র: 1/f = 1/u + 1/v (প্রতিবিম্ব দূরত্ব ও বিবর্ধন) | P = 1 / f(m) (লেন্সের ক্ষমতা)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    ফোকাস দূরত্ব f (cm) [উত্তল/অবতল + বা -]:
                  </label>
                  <input
                    type="number"
                    value={focalLength}
                    onChange={(e) => setFocalLength(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white px-3 py-1.5 text-sm rounded-lg border border-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    লক্ষ্যবস্তুর দূরত্ব u (cm):
                  </label>
                  <input
                    type="number"
                    value={objectDistance}
                    onChange={(e) => setObjectDistance(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white px-3 py-1.5 text-sm rounded-lg border border-slate-300 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded-lg border border-blue-200">
                  <span className="text-[11px] text-slate-500 block">প্রতিবিম্ব দূরত্ব (v)</span>
                  <span className="font-mono text-sm font-bold text-blue-700">
                    {calculatedOptics.imageDistance} cm
                  </span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-blue-200">
                  <span className="text-[11px] text-slate-500 block">রৈখিক বিবর্ধন (|m|)</span>
                  <span className="font-mono text-sm font-bold text-purple-700">
                    {calculatedOptics.magnification} গুণ ({calculatedOptics.nature === 'real' ? 'বাস্তব ও উল্টো' : 'অবাস্তব ও সোজা'})
                  </span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-blue-200">
                  <span className="text-[11px] text-slate-500 block">লেন্সের ক্ষমতা (P)</span>
                  <span className="font-mono text-sm font-bold text-emerald-700">
                    {calculatedPower > 0 ? `+${calculatedPower}` : calculatedPower} D (ডায়প্টার)
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeChapter.id === 10 && (
            <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl p-4 sm:p-5 space-y-4">
              <span className="text-xs font-semibold text-blue-800 block font-mono">
                সূত্র: F = k · (q₁ · q₂) / r² (কুলম্বের বল, k = 9 × 10⁹ N·m²/C²)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">আধান q₁ (মাইক্রোকুলম্ব μC):</label>
                  <input
                    type="number"
                    value={charge1}
                    onChange={(e) => setCharge1(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white px-3 py-1.5 text-sm rounded-lg border border-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">আধান q₂ (মাইক্রোকুলম্ব μC):</label>
                  <input
                    type="number"
                    value={charge2}
                    onChange={(e) => setCharge2(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white px-3 py-1.5 text-sm rounded-lg border border-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">দূরত্ব r (মিটার m):</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0.01"
                    value={chargeDistance}
                    onChange={(e) => setChargeDistance(parseFloat(e.target.value) || 0.01)}
                    className="w-full bg-white px-3 py-1.5 text-sm rounded-lg border border-slate-300 font-mono"
                  />
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-blue-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">পারস্পরিক তড়িৎ বল (F):</span>
                <span className="font-mono text-sm font-bold text-blue-700">
                  {calculatedCoulomb.force} N ({calculatedCoulomb.nature === 'repulsive' ? 'বিকর্ষণ বল' : 'আকর্ষণ বল'})
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Formulas Vault Section */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <h4 className="text-base font-bold text-slate-900">
              অধ্যায়ের মূল সূত্রাবলি ও বোর্ড হ্যাক্স (Formula Vault)
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeChapter.formulas.map((item) => (
              <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-colors">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold text-slate-800">{item.name}</span>
                  <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                    {item.units}
                  </span>
                </div>
                <div className="font-mono text-sm font-bold text-blue-700 bg-white p-2.5 rounded-lg border border-blue-100 mb-2">
                  {item.formula}
                </div>
                <p className="text-xs text-slate-600 mb-2">
                  <span className="font-semibold text-slate-700">অর্থ: </span>
                  {item.meaning}
                </p>
                <div className="text-[11px] text-amber-900 bg-amber-50 p-2 rounded border border-amber-200/60 flex items-start gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>{item.tips}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CQ Patterns & Solving Strategies */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-purple-600" />
            <h4 className="text-base font-bold text-slate-900">
              বোর্ড সৃজনশীলের কমন প্যাটার্ন ও সমাধান কৌশল (CQ Blueprint)
            </h4>
          </div>

          <div className="space-y-4">
            {activeChapter.cqPatterns.map((pattern, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-purple-200/80 bg-purple-50/30">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-800 mb-2">
                  <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  <span>টাইপ: {pattern.type}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-3">
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-800 block mb-1">প্রয়োগ (গ) নমুনা:</span>
                    <span className="text-slate-600 leading-relaxed">{pattern.questionGyo}</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-800 block mb-1">উচ্চতর দক্ষতা (ঘ) নমুনা:</span>
                    <span className="text-slate-600 leading-relaxed">{pattern.questionGho}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="text-emerald-900 bg-emerald-50/80 p-2 rounded border border-emerald-200">
                    <span className="font-bold">সমাধান কৌশল: </span>
                    <span>{pattern.solveStrategy}</span>
                  </div>
                  <div className="text-rose-900 bg-rose-50/80 p-2 rounded border border-rose-200">
                    <span className="font-bold">কমন ভুলসমূহ: </span>
                    <span>{pattern.commonMistakes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
