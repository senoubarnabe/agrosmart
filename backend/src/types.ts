export type CropType = "Tomate" | "Piment" | "Oignon" | "Laitue" | "Maïs" | "Carotte";

export type Parcel = {
  id: string;
  name: string;
  crop: CropType;
  surface: number;
  surfaceUnit: "ha" | "m2";
  sowingDate: string;
  stage: string;
  createdAt: string;
};

export type SensorReading = {
  id: string;
  parcelId: string;
  soilHumidity: number;
  temperature: number;
  waterLevel: number;
  flowRate: number;
  leakDetected: boolean;
  createdAt: string;
};

export type PumpState = {
  active: boolean;
  mode: "manual" | "automatic";
  updatedAt: string;
};

export type AlertLevel = "info" | "warning" | "danger";

export type Alert = {
  id: string;
  parcelId?: string;
  level: AlertLevel;
  title: string;
  message: string;
  resolved: boolean;
  createdAt: string;
};

export type IrrigationProgram = {
  id: string;
  parcelId: string;
  nextWateringTime: string;
  durationMinutes: number;
  waterVolumeLiters: number;
  reason: string;
  createdAt: string;
};
