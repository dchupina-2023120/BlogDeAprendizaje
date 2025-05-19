"use strict"; // Habilita el modo estricto para mejorar la seguridad y evitar errores comunes

import dotenv from "dotenv";
dotenv.config(); // Cargar variables de entorno desde .env

import { connectDB } from "./configs/mongo.js"; // Conexión a la base de datos
import { initServer } from "./configs/app.js"; // Inicialización del servidor Express
import { seedPosts } from "./data/seed.js"; //Traer los posts para mostrarlos

// Iniciar conexión a MongoDB
(async () => {
  try {
    await connectDB(); // Esperar a que la base de datos se conecte antes de levantar el servidor
    await seedPosts(); 
    initServer(); // Inicializar el servidor Express solo si la BD está conectada
  } catch (err) {
    console.error(
      "❌ Error crítico en la inicialización de la aplicación:",
      err
    );
    process.exit(1); // Cerrar la aplicación si hay un error crítico
  }
})();
