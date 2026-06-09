import { Router } from "express";
import { irrigationPrograms } from "../data/store.js";
import { generateProgram } from "../services/irrigationService.js";

export const irrigationRoutes = Router();

irrigationRoutes.get("/programs", (_request, response) => {
  response.json({ data: irrigationPrograms });
});

irrigationRoutes.post("/programs/generate", (request, response) => {
  const { parcelId } = request.body as { parcelId?: string };

  if (!parcelId) {
    response.status(400).json({ error: "parcelId est requis." });
    return;
  }

  const program = generateProgram(parcelId);
  if (!program) {
    response.status(404).json({ error: "Parcelle introuvable." });
    return;
  }

  response.status(201).json({ data: program });
});
