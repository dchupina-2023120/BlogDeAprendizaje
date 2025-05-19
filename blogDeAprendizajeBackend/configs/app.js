"use strict";

const env = process.env.NODE_ENV || "development";
console.log(` Modo actual: ${env}`);

import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { limiter } from "../middlewares/rate.limit.js";
import { rutasGenerales } from "../src/rutas.generales.js"; 

function configs(app) {
  app.use(morgan("dev")); 
  app.use(helmet()); 
  app.use(cors()); 
  app.use(express.json()); 
  app.use(express.urlencoded({ extended: true })); 
  app.use(limiter); 
}

function loadRoutes(app) {
  rutasGenerales(app); 
}

function errorHandler(err, req, res, next) {

  console.error("Error capturado:", err);

  if (Array.isArray(err?.errors)) {
    return res.status(400).json({ errors: err.errors });
  }
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ message: "Token inválido" });
  }
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Token expirado" });
  }
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ message: "ID inválido en la base de datos" });
  }
  const statusCode = err.status || 500;

  return res.status(statusCode).json({
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}

export const initServer = () => {
  const app = express(); 

  try {
    configs(app);
    loadRoutes(app);
    app.use((req, res) => {
      res.status(404).json({ message: "Ruta no encontrada" });
    });
    app.use(errorHandler);
    const port = process.env.PORT || 2636;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("❌ Server init failed:", err);
    process.exit(1);
  }
};
