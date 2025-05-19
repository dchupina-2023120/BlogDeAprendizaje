import { Schema, model } from "mongoose";

const PostSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  content:{ 
    type: String, 
    required: true 
  },
  course:   {
    type: String,
    enum: [
      "Taller", 
      "Práctica Supervisada", 
      "Tecnología"
    ],
    required: true
  },
  createdAt:{ 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: false, versionKey: false });

export default model("Post", PostSchema);
