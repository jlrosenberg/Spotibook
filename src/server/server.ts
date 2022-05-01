import "dotenv/config";
import express from "express";
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
import { createPost, getPosts, getPostsByUser, getPostsForSong, likePost } from "./controllers/posts.controller";
import {
  createUser,
  editUser,
  followUser,
  getUser,
  getUsers,
} from "./controllers/users.controller";
import SpotifyWebApi from "spotify-web-api-node";
import { spotifyAuthorize } from "./spotify_auth";
import { verifyToken } from "./middleware/auth";
import { isLoggedIn, login, logout } from "./controllers/sessions.controller";
import { getSongById, searchForSongs } from "./controllers/spotifySearch.controller";
const path = require("path");

const PORT = process.env.port ?? 4443;
const main = async () => {
  const MONGO_URI = process.env.MONGO_URI ?? "mongodb://localhost:27017/spotibook";
  console.log(MONGO_URI)
  console.log(process.env.SPOTIFY_CLIENT_ID);
  mongoose.connect(MONGO_URI);
  const spotify = await spotifyAuthorize();

  const app = express();

  app.use(express.json());
  app.use(cookieParser());

  // set up auth middleware
  // app.use(verifyToken)

  // Serves the frontend dist code
  app.use(express.static("dist", { index: "index.html" }));

  // Fallback route for 404s - this will enable client side routing to work
  // with refreshes, but we need to make a 404 page on the client
  // app.use('*', express.static('dist', {index: 'index.html'}));

  // PUT OTHER ROUTES HERE

  // Posts
  app.get("/api/v1/posts", getPosts);
  app.get("/api/v1/songs/:songId/posts", getPostsForSong);
  app.post("/api/v1/posts", verifyToken, createPost);
  app.post("/api/v1/posts/:postId/like", verifyToken, likePost);

  app.get("/api/v1/songs/:songId", getSongById);
  app.post("/api/v1/songs/search", searchForSongs)

  // Users
  app.get("/api/v1/users/:userId", getUser);
  app.get("/api/v1/users", getUsers);
  app.post("/api/v1/users", createUser);
  app.patch("/api/v1/users/:userId", verifyToken, editUser);
  app.get("/api/v1/users/:userId/posts", getPostsByUser);
  app.post("/api/v1/users/:userId/follow", verifyToken, followUser);

  // Authentication
  app.get("/api/v1/logged_in", isLoggedIn)
  app.post("/api/v1/login", login);
  app.get("/api/v1/logout", logout);

  /* final catch-all route to index.html defined last */
  app.get("*", function (req, res, next) {
    console.log("here");
    res.sendFile(path.join(__dirname, "../../dist/"));
  });

  // Start the node server
  app.listen(PORT, () => {
    console.log(`started on port ${PORT}`);
  });
};

main();
