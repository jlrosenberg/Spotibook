import { Request, Response } from "express";
import User, {
  CreateUserPayload,
  IUser,
  UserRole,
} from "../../shared/models/user";
import { generateUserPayload, UserPayload } from "../../shared/payloads";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserFromRequest } from "../middleware/auth";

export const getUser = async (req: Request, res: Response<UserPayload>) => {
  const { userId } = req.params;
  console.log(userId)
  const user = await User.findById(userId).populate("following");
  // console.log*
  console.log(user)
  if (user) {
    res.json(generateUserPayload(user));
  } else {
    res.status(404).json({ message: "User not found" } as any);
  }
};

export const followUser = async(req: Request, res: Response) => {
  const { userId } = req.params;
  const currentUser = getUserFromRequest(req);

  const currentUserDb = await User.findById(currentUser.user_id);
  const userToFollowDb = await User.findById(userId);

  console.log(currentUserDb.following);
  if (currentUserDb.following == undefined){
    currentUserDb.following = [];
  }
  console.log(currentUserDb.following);

  currentUserDb.following.push(userToFollowDb._id);
  await currentUserDb.save();

  const newUser = await User.findById(currentUser.user_id);

  res.json(newUser);

}


export const getUsers = async (req: Request, res: Response<UserPayload[]>) => {
  const { name } = req.params;
  let users;
  if(name){
    users = await User.find({
      name: { $regex: name, $options: "i" },
    }).populate("following");
  }else{
    users = await User.find({})
  }

  const payload = users.map((user) => generateUserPayload(user));

  res.json(payload);
};

export const createUser = async (
  req: Request<CreateUserPayload>,
  res: Response
) => {
  // console.log(req)
  // console.log(req.body)
  const { email, password, ...otherAttributes } = req.body;

  //Encrypt user password
  const encryptedPassword = await bcrypt.hash(password, 10);

  // Create user in our database
  const user = await User.create({
    ...otherAttributes,
    email: email.toLowerCase(), // sanitize: convert email to lowercase
    password: encryptedPassword,
    // ssn: '1233454567',
    avatar: "https://i.pravatar.cc/300?img=5",
  });

  // Create token
  const token = jwt.sign({ user_id: user._id, email, avatar: user.avatar, name: user.name }, process.env.TOKEN_KEY, {
    expiresIn: "2h",
  });
  // save user token
  user.token = token;

  await user.save();

  res.cookie("auth_token", token, { secure: true, httpOnly: true });
  res.status(201).json(user);
};

export const editUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const update = req.body;
  await User.findByIdAndUpdate(userId, update);
  const user = await User.findById(userId);
  res.status(200).json(user);
};
