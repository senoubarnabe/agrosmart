import type { Alert, IrrigationProgram, Parcel, PumpState, SensorReading } from "../types.js";

const now = () => new Date().toISOString();

export const parcels: Parcel[] = [
  {
    id: "parcel-tomatoes",
    name: "Parcelle Tomates",
    crop: "Tomate",
    surface: 1.2,
    surfaceUnit: "ha",
    sowingDate: "2026-04-01",
    stage: "Fructification",
    createdAt: now(),
  },
  {
    id: "parcel-corn",
    name: "Parcelle Maïs Doux",
    crop: "Maïs",
    surface: 0.8,
    surfaceUnit: "ha",
    sowingDate: "2026-05-08",
    stage: "Croissance",
    createdAt: now(),
  },
];

export const sensorReadings: SensorReading[] = [
  {
    id: "reading-1",
    parcelId: "parcel-tomatoes",
    soilHumidity: 42,
    temperature: 34,
    waterLevel: 28,
    flowRate: 3.2,
    leakDetected: false,
    createdAt: now(),
  },
  {
    id: "reading-2",
    parcelId: "parcel-corn",
    soilHumidity: 18,
    temperature: 34,
    waterLevel: 28,
    flowRate: 3.2,
    leakDetected: false,
    createdAt: now(),
  },
];

export const pumpState: PumpState = {
  active: false,
  mode: "manual",
  updatedAt: now(),
};

export const alerts: Alert[] = [
  {
    id: "alert-dry-corn",
    parcelId: "parcel-corn",
    level: "danger",
    title: "Sol trop sec",
    message: "L'humidité du sol est sous le seuil critique pour la parcelle de maïs.",
    resolved: false,
    createdAt: now(),
  },
  {
    id: "alert-water-low",
    level: "warning",
    title: "Réservoir bas",
    message: "Le niveau du réservoir est inférieur à 30%.",
    resolved: false,
    createdAt: now(),
  },
];

export const irrigationPrograms: IrrigationProgram[] = [];

export function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}
