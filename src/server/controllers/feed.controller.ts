import { Request, Response } from "express";

export const getFeed = async (req: Request, res: Response) => {
  res.json({});
  // const { userId } = req.session;
  // const user = await User.findById(userId);
  // const feed = await Feed.find({ user: userId }).populate('user');
  // res.json({ feed });
};
