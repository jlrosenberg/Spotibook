import { DataThresholding, PsychologyTwoTone } from "@mui/icons-material";
import faker from "faker";
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

const postSchema = new Schema<IPost>(
  {
    message: { type: String, required: true },
    songId: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    explicit: { type: Boolean, default: false },
    likes: [{ type : Schema.Types.ObjectId, ref: 'User', default: [] }],
  },
  { collection: "posts" }
);

const Post = model<IPost>("Post", postSchema);

export default Post;

const songIdsForMocks = ['4cOdK2wGLETKBW3PvgPWqT', '6BqdNDLZ3Pdcly46pu6nwj']
export const generateMockPost = () => {
  const randomNum = Math.floor(Math.random() * 100)+100
  return {
    id: faker.random.uuid(),
    message: faker.lorem.sentence(),
    songId: songIdsForMocks[Math.floor(Math.random() * songIdsForMocks.length)],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user: {
      id: faker.random.uuid(),
      name: faker.name.findName(),
      avatar: `https://placeimg.com/${randomNum}/${randomNum}/any`,
    },
  };
}
