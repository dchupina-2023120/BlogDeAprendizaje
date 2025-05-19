import { Router } from "express";
import { 
    getPosts, 
    getPostById, 
    createPost 
} from "./post.controller.js";
import { validatePost } from '../validations/validatePost.js';


const postRouter = Router();
postRouter.get("/", getPosts);
postRouter.get("/:id", getPostById);
postRouter.post("/", validatePost, createPost);

export default postRouter;