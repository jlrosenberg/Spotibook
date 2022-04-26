import { Request, Response } from "express";
import { generateMockPost } from "../../shared/models/post";


export const getFeed = async (req: Request, res: Response) => {
  console.log("getting feed")
  const posts = [generateMockPost(), generateMockPost(), generateMockPost(), generateMockPost()];

  console.log(posts)
  res.json({
    posts
  });
  // const { userId } = req.session;
  // const user = await User.findById(userId);
  // const feed = await Feed.find({ user: userId }).populate('user');
  // res.json({ feed });
};
