import { Schema, model, Types } from "mongoose";

const CommentSchema = new Schema(
  {
    postId: { 
      type: Types.ObjectId, 
      ref: "Post", 
      required: true 
    },
    name: { 
      type: String, 
      required: true 
    },
    text: { 
      type: String, 
      required: true 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
  },
  { timestamps: false, versionKey: false }
);

export default model("Comment", CommentSchema);
