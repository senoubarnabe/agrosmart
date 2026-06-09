import { Router } from "express";
import { pumpState } from "../data/store.js";

export const pumpRoutes = Router();

pumpRoutes.get("/", (_request, response) => {
  response.json({ data: pumpState });
});

pumpRoutes.post("/", (request, response) => {
  const { active, mode } = request.body as { active?: boolean; mode?: "manual" | "automatic" };

  if (typeof active !== "boolean") {
    response.status(400).json({ error: "Le champ active doit être un booléen." });
    return;
  }

  pumpState.active = active;
  pumpState.mode = mode || "manual";
  pumpState.updatedAt = new Date().toISOString();

  response.json({ data: pumpState });
});
