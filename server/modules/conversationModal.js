import mongoose, { Schema, model } from "mongoose";

const conversationSchema = new Schema(
  {
    participants: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const Conversation = model("conversation", conversationSchema);
