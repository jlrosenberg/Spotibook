import { Schema, model, Types } from "mongoose";

export enum UserRoleEnum {
  STANDARD = "STANDARD",
  CHILD = "CHILD",
}

export type UserRole = "STANDARD" | "CHILD";
export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  ssn?: number;
  age?: number;
  avatar?: string;
}

export interface IUser extends CreateUserPayload {
  password: string;
  token: string;
  following: (Types.ObjectId | { _id: string })[];
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String, required: true },
    role: { type: String, enum: UserRoleEnum, default: UserRoleEnum.STANDARD },
    ssn: {
      type: Number,
      required: function () {
        return (this as any).role === UserRoleEnum.STANDARD;
      },
    },
    age: {
      type: Number,
      required: function () {
        return (this as any).role === UserRoleEnum.CHILD;
      },
    },
    password: { type: String },
    token: { type: String },
    following: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  },
  { collection: "users" }
);

const User = model<IUser>("User", userSchema);

export default User;
