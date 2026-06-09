import { alerts, createId } from "../data/store.js";
import type { Alert, SensorReading } from "../types.js";

export function evaluateReadingAlerts(reading: SensorReading) {
  const generated: Alert[] = [];

  if (reading.soilHumidity < 25) {
    generated.push({
      id: createId("alert-dry-soil"),
      parcelId: reading.parcelId,
      level: "danger",
      title: "Sol trop sec",
      message: `Humidité du sol à ${reading.soilHumidity}%. Arrosage recommandé.`,
      resolved: false,
      createdAt: new Date().toISOString(),
    });
  }

  if (reading.waterLevel < 30) {
    generated.push({
      id: createId("alert-water-level"),
      level: "warning",
      title: "Réservoir bas",
      message: `Niveau d'eau à ${reading.waterLevel}%. Prévoir un remplissage.`,
      resolved: false,
      createdAt: new Date().toISOString(),
    });
  }

  if (reading.leakDetected) {
    generated.push({
      id: createId("alert-leak"),
      parcelId: reading.parcelId,
      level: "danger",
      title: "Fuite détectée",
      message: "Un débit anormal indique une possible fuite d'eau.",
      resolved: false,
      createdAt: new Date().toISOString(),
    });
  }

  alerts.unshift(...generated);
  return generated;
}
