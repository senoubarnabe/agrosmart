import { Router } from "express";
import { sensorReadings } from "../data/store.js";
import { getLatestReadings } from "../services/iotService.js";

export const sensorRoutes = Router();

sensorRoutes.get("/latest", (_request, response) => {
  response.json({ data: getLatestReadings() });
});

sensorRoutes.get("/history/:parcelId", (request, response) => {
  const data = sensorReadings.filter((reading) => reading.parcelId === request.params.parcelId);
  response.json({ data });
});
