import { Router } from "express";
import { alertRoutes } from "./alertRoutes.js";
import { healthRoutes } from "./healthRoutes.js";
import { irrigationRoutes } from "./irrigationRoutes.js";
import { iotRoutes } from "./iotRoutes.js";
import { parcelRoutes } from "./parcelRoutes.js";
import { pumpRoutes } from "./pumpRoutes.js";
import { sensorRoutes } from "./sensorRoutes.js";

export const apiRoutes = Router();

apiRoutes.use("/health", healthRoutes);
apiRoutes.use("/parcels", parcelRoutes);
apiRoutes.use("/sensors", sensorRoutes);
apiRoutes.use("/iot", iotRoutes);
apiRoutes.use("/pump", pumpRoutes);
apiRoutes.use("/alerts", alertRoutes);
apiRoutes.use("/irrigation", irrigationRoutes);
