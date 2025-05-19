import { body, validationResult } from 'express-validator';

export const validatePost = [
  body('title')
    .isString()
    .isLength({ min: 8 })
    .withMessage('El título debe tener al menos 8 caracteres'),
  body('content')
    .isString()
    .isLength({ min: 15 })
    .withMessage('El contenido debe tener al menos 15 caracteres'),
  body('course')
    .isIn(['Taller', 'Práctica Supervisada', 'Tecnología'])
    .withMessage('El curso debe ser Taller, Práctica Supervisada o Tecnología'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map(err => err.msg) });
    }
    next();
  }
];