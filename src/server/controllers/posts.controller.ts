import { Request, Response } from "express";
import Post, { generateMockPost } from "../../shared/models/post";
import User from "../../shared/models/user";
import { getUserFromRequest } from "../middleware/auth";
import Filter from 'bad-words';

export const getPosts = async (req: Request, res: Response) => {
    const user = getUserFromRequest(req)
    if(!user) {
        const allPosts = await Post.find({}).populate("likes").populate("user");
        res.json(allPosts)
    }

    const followedUsers = (await User.findById(user.user_id).populate("following")).following;
    const posts = await Post.find({ user: { $in: followedUsers } }).populate("likes").populate("user");
    // const posts = await Post.find({}).populate("likes").populate("user");
    res.json(posts)
    // console.log(posts)
    // Post.find()
    // const Mockposts = [generateMockPost(), generateMockPost(), generateMockPost(), generateMockPost()]
    // res.json(Mockposts)
};

export const getPostsByUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    const posts = await Post.find({ user: userId }).populate("likes").populate("user");
    res.json(posts)
}

export const getPostsForSong = async (req: Request, res: Response) => {
    const songId = req.params.songId;
    console.log(songId)

    const posts = await Post.find({ songId: songId }).populate("likes").populate("user");
    res.json(posts)
}
export interface CreatePostPayload {
    message: string;
    songId: string;
    explicit?: boolean;
  }

export const createPost = async (req: Request<CreatePostPayload>, res: Response) => {
    const user = getUserFromRequest(req);
    const { message, songId, explicit } = req.body;
    const filter = new Filter();
    const isExplicit = filter.isProfane(message) || explicit
    if(isExplicit && user.role==="CHILD") {
        res.status(400).json({error: "Children cannot post explicit content"})
    }

    const post = await Post.create({
        message: message,
        songId: songId,
        explicit: isExplicit,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: (await User.findById(user.user_id))._id,
    })

    res.status(201).json(post)
};

export const likePost = async (req: Request, res: Response) => {
    const user = getUserFromRequest(req);
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if(!post) {
        res.status(404).json({error: "Post not found"})
    }
    const userId = (await User.findById(user.user_id))._id

    post.likes.push(userId);
    await post.save();
    res.status(200).json(post)
};