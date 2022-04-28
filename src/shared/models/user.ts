import { Schema, model, Types } from "mongoose";

export enum UserRole {
  STANDARD = "STANDARD",
  CHILD = "CHILD",
}

export interface IUser {
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  ssn: undefined | number;
  age: undefined | number;
  following: Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, required: true },
  role: { type: String, enum: UserRole, default: UserRole.STANDARD },
  ssn: {
    type: Number,
    required: function () {
      return (this as any).role === UserRole.STANDARD;
    },
  },
  age: {
    type: Number,
    required: function () {
      return (this as any).role === UserRole.CHILD;
    },
  },
});

const User = model<IUser>("User", userSchema);

export default User;
