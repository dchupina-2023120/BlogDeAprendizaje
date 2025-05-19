import { Router } from "express";
import { 
    getComments, 
    createComment 
} from "./comment.controller.js";
import { validateComment } from '../validations/validateComment.js';

const commentRouter = Router();
commentRouter.get("/", getComments);
commentRouter.post("/", validateComment, createComment);

export default commentRouter;