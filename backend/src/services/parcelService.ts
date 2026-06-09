import { createId, parcels } from "../data/store.js";
import type { CropType, Parcel } from "../types.js";

export type CreateParcelInput = {
  name?: string;
  crop: CropType;
  surface: number;
  surfaceUnit: "ha" | "m2";
  sowingDate: string;
};

const cropStages: Record<CropType, string> = {
  Tomate: "Germination",
  Piment: "Croissance",
  Oignon: "Bulbaison",
  Laitue: "Pré-récolte",
  Maïs: "Croissance active",
  Carotte: "Développement racinaire",
};

export function createParcel(input: CreateParcelInput) {
  const parcel: Parcel = {
    id: createId("parcel"),
    name: input.name || `Parcelle ${input.crop}`,
    crop: input.crop,
    surface: input.surface,
    surfaceUnit: input.surfaceUnit,
    sowingDate: input.sowingDate,
    stage: cropStages[input.crop],
    createdAt: new Date().toISOString(),
  };

  parcels.push(parcel);
  return parcel;
}
