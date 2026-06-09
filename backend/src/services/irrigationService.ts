import { createId, irrigationPrograms, parcels, sensorReadings } from "../data/store.js";
import type { IrrigationProgram } from "../types.js";

export function generateProgram(parcelId: string) {
  const parcel = parcels.find((item) => item.id === parcelId);
  if (!parcel) return null;

  const latest = sensorReadings.find((reading) => reading.parcelId === parcelId);
  const soilHumidity = latest?.soilHumidity ?? 50;
  const waterVolumeLiters = soilHumidity < 25 ? 450 : soilHumidity < 45 ? 300 : 150;
  const durationMinutes = soilHumidity < 25 ? 40 : soilHumidity < 45 ? 25 : 12;

  const program: IrrigationProgram = {
    id: createId("program"),
    parcelId,
    nextWateringTime: "17:30",
    durationMinutes,
    waterVolumeLiters,
    reason: soilHumidity < 25 ? "Sol sec détecté" : "Programme préventif optimisé",
    createdAt: new Date().toISOString(),
  };

  irrigationPrograms.unshift(program);
  return program;
}
