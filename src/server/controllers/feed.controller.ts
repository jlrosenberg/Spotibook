import { Request, Response } from "express";

const makeMockPost = () => {
  return {
    id: "1",
    message: "Hello World",
    createdAt: new Date(),
    user: {
      id: "1",
      name: "John Doe",
      avatar: "https://placeimg.com/140/140/any",
    },
  };
};

export const getFeed = async (req: Request, res: Response) => {
  console.log("getting feed")
  const posts = [makeMockPost(), makeMockPost()]

  console.log(posts)
  res.json({
    posts
  });
  // const { userId } = req.session;
  // const user = await User.findById(userId);
  // const feed = await Feed.find({ user: userId }).populate('user');
  // res.json({ feed });
};
