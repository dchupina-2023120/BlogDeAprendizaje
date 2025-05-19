import { body, validationResult } from 'express-validator';

export const validateComment = [
  body('name')
    .isString()
    .isLength({ min: 2 })
    .withMessage('El nombre debe tener al menos 2 caracteres'),
  body('text')
    .isString()
    .isLength({ min: 6 })
    .withMessage('El texto del comentario debe tener al menos 6 caracteres'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map(err => err.msg) });
    }
    next();
  }
];