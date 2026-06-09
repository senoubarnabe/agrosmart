import { createId, sensorReadings } from "../data/store.js";
import type { SensorReading } from "../types.js";
import { evaluateReadingAlerts } from "./alertService.js";

export type CreateReadingInput = Omit<SensorReading, "id" | "createdAt">;

export function getLatestReadings() {
  const latest = new Map<string, SensorReading>();

  for (const reading of sensorReadings) {
    const current = latest.get(reading.parcelId);
    if (!current || new Date(reading.createdAt) > new Date(current.createdAt)) {
      latest.set(reading.parcelId, reading);
    }
  }

  return Array.from(latest.values());
}

export function createSensorReading(input: CreateReadingInput) {
  const reading: SensorReading = {
    id: createId("reading"),
    parcelId: input.parcelId,
    soilHumidity: input.soilHumidity,
    temperature: input.temperature,
    waterLevel: input.waterLevel,
    flowRate: input.flowRate,
    leakDetected: input.leakDetected,
    createdAt: new Date().toISOString(),
  };

  sensorReadings.unshift(reading);
  const generatedAlerts = evaluateReadingAlerts(reading);

  return { reading, generatedAlerts };
}
