import { Request, Response } from "express";
import { IUser, UserRole } from "../../shared/models/user";

export const getProfile = (req: Request, res: Response<IUser>) => {
  res.send({
    name: "Testy McTesterson",
    role: UserRole.STANDARD,
    email: "john@appleseed.net",
    avatar: "https://placeimg.com/140/140/any",
    ssn: 123456789,
    age: undefined,
    following: [],
  });
};
