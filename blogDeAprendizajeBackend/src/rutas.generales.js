import postRouter from "./posts/post.routes.js";
import commentRouter from "./comments/comment.routes.js";

/**
 * Función que recibe la app de Express y registra
 * todas las rutas en una sola llamada.
 */
export function rutasGenerales(app) {
  app.use("/api/posts", postRouter);
  app.use("/api/comments", commentRouter);
}