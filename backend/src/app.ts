import cors from "cors";
import express, { type ErrorRequestHandler } from "express";
import morgan from "morgan";
import { apiRoutes } from "./routes/index.js";

const corsOrigin = process.env.CORS_ORIGIN || "*";

export const app = express();

app.use(cors({ origin: corsOrigin }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/", (_request, response) => {
  response.json({
    name: "AgroSmart API",
    version: "0.1.0",
    docs: "/api/health",
  });
});

app.use("/api", apiRoutes);

app.use((_request, response) => {
  response.status(404).json({ error: "Route introuvable." });
});

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ error: "Erreur interne du serveur." });
};

app.use(errorHandler);
