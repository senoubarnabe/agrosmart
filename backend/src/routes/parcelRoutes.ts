import { Router } from "express";
import { parcels } from "../data/store.js";
import { createParcel } from "../services/parcelService.js";
import type { CropType } from "../types.js";

export const parcelRoutes = Router();

const allowedCrops: CropType[] = ["Tomate", "Piment", "Oignon", "Laitue", "Maïs", "Carotte"];

parcelRoutes.get("/", (_request, response) => {
  response.json({ data: parcels });
});

parcelRoutes.post("/", (request, response) => {
  const { name, crop, surface, surfaceUnit, sowingDate } = request.body as {
    name?: string;
    crop?: CropType;
    surface?: number;
    surfaceUnit?: "ha" | "m2";
    sowingDate?: string;
  };

  if (!crop || !allowedCrops.includes(crop)) {
    response.status(400).json({ error: "Culture invalide ou manquante." });
    return;
  }

  if (!surface || surface <= 0) {
    response.status(400).json({ error: "La superficie doit être supérieure à 0." });
    return;
  }

  if (!surfaceUnit || !["ha", "m2"].includes(surfaceUnit)) {
    response.status(400).json({ error: "Unité de superficie invalide." });
    return;
  }

  if (!sowingDate) {
    response.status(400).json({ error: "Date de semis manquante." });
    return;
  }

  const parcel = createParcel({ name, crop, surface, surfaceUnit, sowingDate });
  response.status(201).json({ data: parcel });
});
