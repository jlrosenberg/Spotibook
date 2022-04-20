import { Request, Response } from "express";
import { generateMockPost } from "../../shared/models/post";

const makeMockPost = () => {
  return {
    id: "1",
    message: "Hello World",
    songId: '4cOdK2wGLETKBW3PvgPWqT',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user: {
      id: "1",
      name: "John Doe",
      avatar: "https://placeimg.com/140/140/any",
    },
  };
};

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
