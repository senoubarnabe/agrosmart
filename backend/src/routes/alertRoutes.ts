import { Router } from "express";
import { alerts } from "../data/store.js";

export const alertRoutes = Router();

alertRoutes.get("/", (_request, response) => {
  response.json({ data: alerts });
});

alertRoutes.patch("/:id/resolve", (request, response) => {
  const alert = alerts.find((item) => item.id === request.params.id);
  if (!alert) {
    response.status(404).json({ error: "Alerte introuvable." });
    return;
  }

  alert.resolved = true;
  response.json({ data: alert });
});
