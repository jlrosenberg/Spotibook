import { DataThresholding, PsychologyTwoTone } from "@mui/icons-material";
import { Schema, Types, model } from "mongoose";
import { IUser } from "./user";

export interface IPost {
  message: string;
  songId: string;
  createdAt: Date;
  updatedAt: Date;
  user: Types.ObjectId | IUser;
  explicit: boolean;
  likes: Types.ObjectId[];
}

const postSchema = new Schema<IPost>({
  message: { type: String, required: true },
  songId: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: "users" },
  explicit: { type: Boolean, default: false },
});

const Post = model<IPost>("Post", postSchema);

export default Post;
