import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateHeat,
  calculateLengthExpansion,
  calculateWaveSpeed,
  calculateSoundSpeedAtTemp,
  calculateEchoDistance,
  calculateImagePosition,
  calculateLensPower,
  calculateCoulombForce,
  calculateElectricIntensity,
  calculateOverallProgress,
} from './physics.ts';

test('calculateHeat: returns correct Q = msΔθ', () => {
  // m = 2kg, water s = 4200 J/kg.K, Δθ = 20°C -> Q = 2 * 4200 * 20 = 168,000 J
  const q = calculateHeat({ massKg: 2, specificHeat: 4200, tempDiff: 20 });
  assert.equal(q, 168000);
});

test('calculateLengthExpansion: calculates ΔL and final length', () => {
  // L1 = 10m, α = 11 x 10^-6, Δθ = 50°C
  const res = calculateLengthExpansion({
    initialLength: 10,
    alpha: 0.000011,
    tempDiff: 50,
  });
  assert.equal(res.deltaL, 0.0055);
  assert.equal(res.finalLength, 10.0055);
});

test('calculateWaveSpeed: returns correct v = f * λ', () => {
  // f = 256 Hz, λ = 1.33 m -> v = 340.48 m/s
  const v = calculateWaveSpeed({ frequency: 256, wavelength: 1.33 });
  assert.equal(v, 340.48);
});

test('calculateSoundSpeedAtTemp: calculates speed at 30°C', () => {
  // v = 332 + 0.6 * 30 = 350 m/s
  const v = calculateSoundSpeedAtTemp({ tempCelsius: 30 });
  assert.equal(v, 350);
});

test('calculateEchoDistance: calculates echo reflection distance and hearing persistence', () => {
  // At v = 332 m/s, t = 0.1s -> d = 16.6m, canHearEcho = true
  const res = calculateEchoDistance({ soundSpeed: 332, timeSeconds: 0.1 });
  assert.equal(res.distance, 16.6);
  assert.equal(res.canHearEcho, true);

  // If time is 0.05s (< 0.1s), echo cannot be distinguished by human ear
  const res2 = calculateEchoDistance({ soundSpeed: 340, timeSeconds: 0.05 });
  assert.equal(res2.canHearEcho, false);
});

test('calculateImagePosition: mirrors and lenses', () => {
  // Concave mirror / convex lens with f = 10, u = 15 -> v = (15*10)/(15-10) = 30cm, real image
  const res = calculateImagePosition({ focalLength: 10, objectDistance: 15 });
  assert.equal(res.imageDistance, 30);
  assert.equal(res.magnification, 2);
  assert.equal(res.nature, 'real');

  // Object within focal length: f = 10, u = 5 -> v = (5*10)/(5-10) = -10cm, virtual
  const res2 = calculateImagePosition({ focalLength: 10, objectDistance: 5 });
  assert.equal(res2.imageDistance, -10);
  assert.equal(res2.nature, 'virtual');
});

test('calculateLensPower: calculates P = 1/f', () => {
  // f = 0.2 m (20 cm) -> P = +5 D
  assert.equal(calculateLensPower(0.2), 5);
  // f = -0.5 m (-50 cm) -> P = -2 D
  assert.equal(calculateLensPower(-0.5), -2);
});

test('calculateCoulombForce and calculateElectricIntensity', () => {
  // q1 = 2e-6, q2 = -3e-6, r = 0.1m
  const res = calculateCoulombForce({ q1: 2e-6, q2: -3e-6, distance: 0.1 });
  assert.equal(res.nature, 'attractive');

  // E = k * q / r^2 with q = 1e-6, r = 1m -> 9e9 * 1e-6 / 1 = 9000 N/C = 9.000e+3
  const e = calculateElectricIntensity({ charge: 1e-6, distance: 1 });
  assert.equal(e, 9000);
});

test('calculateOverallProgress: computes target percentages and weighted progress', () => {
  const p = calculateOverallProgress(500, 1000, 100, 200, 50, 100);
  assert.equal(p.mcqPct, 50);
  assert.equal(p.sqPct, 50);
  assert.equal(p.cqPct, 50);
  assert.equal(p.totalWeightedPct, 50);
});
