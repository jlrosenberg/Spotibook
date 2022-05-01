import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../shared/models/user";
import jwt from "jsonwebtoken";
import { getUserFromRequest } from "../middleware/auth";

export const login = async (req: Request, res: Response) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email, avatar: user.avatar, name: user.name },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      await user.save();
      // user
      res.cookie("auth_token", token, { secure: true, httpOnly: true });
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};

export const logout = async (req: Request, res: Response) => {
  const user = getUserFromRequest(req);

  const dbUser = await User.findById(user.user_id);
  dbUser.token = undefined;
  await dbUser.save();
  res.clearCookie("auth_token");
  res.status(200).json({ message: "Logged out successfully" });
};

export const isLoggedIn = async (req: Request, res: Response) => {
  const user = getUserFromRequest(req);
  if(!user){
      res.json(false)
  }
  let toReturn = await User.findById(user.user_id)
  res.json(toReturn)
};
