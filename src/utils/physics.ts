/**
 * Physics calculation utilities and Study plan logic for NCTB Class 10 (Ch 6 - 10)
 */

export interface HeatCalcParams {
  massKg: number; // m in kg
  specificHeat: number; // s in J/(kg*K)
  tempDiff: number; // Δθ in °C or K
}

export interface ExpansionCalcParams {
  initialLength: number; // L1 in m
  alpha: number; // α in K^-1 or (°C)^-1
  tempDiff: number; // Δθ in °C
}

export interface WaveCalcParams {
  frequency: number; // f in Hz
  wavelength: number; // λ in m
}

export interface SoundSpeedParams {
  tempCelsius: number; // θ in °C
}

export interface EchoCalcParams {
  soundSpeed: number; // v in m/s
  timeSeconds: number; // t in s
}

export interface MirrorLensParams {
  focalLength: number; // f in cm (positive for convex lens / concave mirror)
  objectDistance: number; // u in cm
}

export interface CoulombParams {
  q1: number; // in Coulombs (C) or microCoulombs (μC)
  q2: number;
  distance: number; // r in meters
}

export interface ElectricFieldParams {
  charge: number; // q in Coulombs
  distance: number; // r in meters
}

export const COULOMB_K = 9e9; // N*m^2/C^2

/** Calculate heat energy Q = msΔθ in Joules */
export function calculateHeat(params: HeatCalcParams): number {
  if (params.massKg < 0 || params.specificHeat < 0) {
    throw new Error('Mass and specific heat must be non-negative');
  }
  return params.massKg * params.specificHeat * params.tempDiff;
}

/** Calculate length expansion ΔL = L1 * α * Δθ in meters */
export function calculateLengthExpansion(params: ExpansionCalcParams): {
  deltaL: number;
  finalLength: number;
} {
  const deltaL = params.initialLength * params.alpha * params.tempDiff;
  return {
    deltaL: Number(deltaL.toFixed(6)),
    finalLength: Number((params.initialLength + deltaL).toFixed(6)),
  };
}

/** Calculate wave speed v = f * λ in m/s */
export function calculateWaveSpeed(params: WaveCalcParams): number {
  if (params.frequency < 0 || params.wavelength < 0) {
    throw new Error('Frequency and wavelength must be non-negative');
  }
  return Number((params.frequency * params.wavelength).toFixed(2));
}

/** Approximate speed of sound in air at temperature θ: v = 332 + 0.6 * θ (or standard v = 331 * sqrt(T/273.15)) */
export function calculateSoundSpeedAtTemp(params: SoundSpeedParams): number {
  const tempK = params.tempCelsius + 273.15;
  if (tempK <= 0) return 0;
  // Standard NCTB board formula: v = 332 + 0.6 * θ m/s
  return Number((332 + 0.6 * params.tempCelsius).toFixed(2));
}

/** Calculate echo distance d = (v * t) / 2 in meters */
export function calculateEchoDistance(params: EchoCalcParams): {
  distance: number;
  canHearEcho: boolean;
} {
  const distance = (params.soundSpeed * params.timeSeconds) / 2;
  // Persistence of hearing in human ear is 0.1 s
  const canHearEcho = params.timeSeconds >= 0.1;
  return {
    distance: Number(distance.toFixed(2)),
    canHearEcho,
  };
}

/** Calculate image distance v from 1/f = 1/u + 1/v => v = (u * f) / (u - f) */
export function calculateImagePosition(params: MirrorLensParams): {
  imageDistance: number;
  magnification: number;
  nature: 'real' | 'virtual';
} {
  const { focalLength: f, objectDistance: u } = params;
  if (u === f) {
    return {
      imageDistance: Infinity,
      magnification: Infinity,
      nature: 'real',
    };
  }
  const v = (u * f) / (u - f);
  const m = Math.abs(v / u);
  return {
    imageDistance: Number(v.toFixed(2)),
    magnification: Number(m.toFixed(2)),
    nature: v > 0 ? 'real' : 'virtual',
  };
}

/** Calculate power of a lens P = 1 / f(m) in Diopter (D) */
export function calculateLensPower(focalLengthMeters: number): number {
  if (focalLengthMeters === 0) return 0;
  return Number((1 / focalLengthMeters).toFixed(2));
}

/** Calculate Coulomb force F = (k * q1 * q2) / r^2 */
export function calculateCoulombForce(params: CoulombParams): {
  force: number;
  nature: 'repulsive' | 'attractive';
} {
  if (params.distance <= 0) {
    throw new Error('Distance must be strictly positive');
  }
  const force = (COULOMB_K * Math.abs(params.q1) * Math.abs(params.q2)) / (params.distance * params.distance);
  const isRepulsive = (params.q1 * params.q2) > 0;
  return {
    force: Number(force.toExponential(3)),
    nature: isRepulsive ? 'repulsive' : 'attractive',
  };
}

/** Calculate electric field intensity E = k * q / r^2 in N/C */
export function calculateElectricIntensity(params: ElectricFieldParams): number {
  if (params.distance <= 0) {
    throw new Error('Distance must be strictly positive');
  }
  const intensity = (COULOMB_K * Math.abs(params.charge)) / (params.distance * params.distance);
  return Number(intensity.toExponential(3));
}

/** Calculate overall progress percentage from targets */
export function calculateOverallProgress(
  completedMcq: number,
  targetMcq: number,
  completedSq: number,
  targetSq: number,
  completedCq: number,
  targetCq: number
): {
  mcqPct: number;
  sqPct: number;
  cqPct: number;
  totalWeightedPct: number;
} {
  const safeTargetMcq = Math.max(1, targetMcq);
  const safeTargetSq = Math.max(1, targetSq);
  const safeTargetCq = Math.max(1, targetCq);

  const mcqPct = Math.min(100, Math.round((completedMcq / safeTargetMcq) * 100));
  const sqPct = Math.min(100, Math.round((completedSq / safeTargetSq) * 100));
  const cqPct = Math.min(100, Math.round((completedCq / safeTargetCq) * 100));

  // Weight: 35% MCQ, 25% SQ, 40% CQ
  const totalWeightedPct = Math.round(mcqPct * 0.35 + sqPct * 0.25 + cqPct * 0.40);

  return {
    mcqPct,
    sqPct,
    cqPct,
    totalWeightedPct,
  };
}
