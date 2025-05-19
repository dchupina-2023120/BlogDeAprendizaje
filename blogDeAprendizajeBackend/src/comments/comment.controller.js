import Comment from "./comment.model.js";

// Listar comentarios (opcional filtro por postId)
export const getComments = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.postId) filter.postId = req.query.postId;
    const comments = await Comment.find(filter).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

// Crear nuevo comentario, fecha auto ahora
export const createComment = async (req, res, next) => {
  try {
    const { postId, name, text } = req.body;
    const newComment = new Comment({ postId, name, text });
    const saved = await newComment.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};