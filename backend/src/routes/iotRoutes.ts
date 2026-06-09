import { Router } from "express";
import { createSensorReading } from "../services/iotService.js";

export const iotRoutes = Router();

iotRoutes.post("/readings", (request, response) => {
  const { parcelId, soilHumidity, temperature, waterLevel, flowRate, leakDetected } = request.body as {
    parcelId?: string;
    soilHumidity?: number;
    temperature?: number;
    waterLevel?: number;
    flowRate?: number;
    leakDetected?: boolean;
  };

  if (
    !parcelId ||
    typeof soilHumidity !== "number" ||
    typeof temperature !== "number" ||
    typeof waterLevel !== "number" ||
    typeof flowRate !== "number" ||
    typeof leakDetected !== "boolean"
  ) {
    response.status(400).json({ error: "Payload de mesure invalide." });
    return;
  }

  const result = createSensorReading({
    parcelId,
    soilHumidity,
    temperature,
    waterLevel,
    flowRate,
    leakDetected,
  });

  response.status(201).json({ data: result });
});
