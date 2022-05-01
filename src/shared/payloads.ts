import { UserRole } from "./models/user";

export interface PostPayload {
  _id: string;
  message: string;
  songId: string;
  createdAt: Date;
  updatedAt: Date;
  user: UserPayload;
  explicit: boolean;
  likes: { _id: string }[];
}

export interface UserPayload {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  ssn: undefined | number;
  age: undefined | number;
  following: { _id: string }[];
}

export const generateUserPayload = (user: any): UserPayload => {
  return {
    _id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    role: user.role,
    ssn: user.ssn,
    age: user.age,
    following: user.following,
  };
};
