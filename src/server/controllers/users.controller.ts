import { Request, Response } from "express";
import User, { IUser, UserRole } from "../../shared/models/user";
import { generateUserPayload, UserPayload } from "../../shared/payloads";

export const getUser = async (req: Request, res: Response<UserPayload>) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("following", "_id");

  res.send(generateUserPayload(user));
};

export const getUsers = async (req: Request, res: Response<UserPayload[]>) => {
  const { name } = req.params;
  const users = await User.find({
    name: { $regex: name, $options: "i" },
  }).populate("following", "_id");

  const payload = users.map((user) => generateUserPayload(user));

  res.send(payload);
};

export const createUser = async (
  req: Request,
  res: Response<UserPayload[]>
) => {
  const newUser = new User(req.body);

  await newUser.save();
  res.status(200);
};

export const editUser = async (req: Request, res: Response<UserPayload[]>) => {
  const { id } = req.params;
  const update = req.body;
  await User.findByIdAndUpdate(id, req.body);
  res.status(200);
};
