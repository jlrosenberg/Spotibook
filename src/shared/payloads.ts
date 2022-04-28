import { UserRole } from "./models/user";

export interface PostPayload extends Document {
  _id: string;
  message: string;
  songId: string;
  createdAt: Date;
  updatedAt: Date;
  user: UserPayload;
  explicit: boolean;
}

export interface UserPayload extends Document {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  ssn: undefined | number;
  age: undefined | number;
  following: { username: string }[];
}
