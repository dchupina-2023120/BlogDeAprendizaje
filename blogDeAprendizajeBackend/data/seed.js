import Post from "../src/posts/post.model.js";
import Comment from "../src/comments/comment.model.js";

const posts = [

  {
    title: "Página de Portafolio Personal",
    content:
      "Sitio web individual donde se muestran habilidades, trayectoria y trabajos del desarrollador, utilizando un diseño adaptable con efectos visuales.",
    course: "Taller",
    createdAt: new Date(2025, 0, 20),
  },
  {
    title: "Sistema de Gestión de Inventario",
    content:
      "Herramienta web diseñada para organizar productos, permitir búsquedas avanzadas y generar informes de existencias.",
    course: "Taller",
    createdAt: new Date(2025, 1, 3),
  },

  {
    title: "Infografía sobre HTML Semántico",
    content:
      "Diseño gráfico explicativo que destaca cómo las etiquetas semánticas mejoran la estructura, SEO y accesibilidad.",
    course: "Tecnología",
    createdAt: new Date(2025, 0, 20),
  },
  {
    title: "Diagrama del Ciclo de Vida Web",
    content:
      "Esquema visual que detalla las fases por las que pasa una aplicación web desde su concepción hasta su mantenimiento.",
    course: "Tecnología",
    createdAt: new Date(2025, 0, 27),
  },

  {
    title: "Sistema de Contactos Web",
    content:
      "Agenda online con funciones para manejar contactos personales, incluyendo lista de tareas para seguimiento.",
    course: "Práctica Supervisada",
    createdAt: new Date(2025, 0, 20),
  },
  {
    title: "Control Académico Escolar",
    content:
      "Aplicación CRUD que permite el manejo de estudiantes y grupos, con roles y sistema básico de acceso.",
    course: "Práctica Supervisada",
    createdAt: new Date(2025, 1, 3),
  },
];

export async function seedPosts() {
  await Comment.deleteMany({});
  await Post.deleteMany({});

  const insertedPosts = await Post.insertMany(posts);

  const commentsData = insertedPosts.map(post => ({
    postId: post._id,
    name: "DE: Diego Chupina",
    text: `¡Me encanta el proyecto "${post.title}"`,
  }));

  await Comment.insertMany(commentsData);

  console.log("Seed de posts y comentarios completado");
}
