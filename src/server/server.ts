import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { getPosts } from "./controllers/posts.controller";
import {
  createUser,
  editUser,
  getUser,
  getUsers,
} from "./controllers/users.controller";
import SpotifyWebApi from "spotify-web-api-node";
import { spotifyAuthorize } from "./spotify_auth";
const path = require("path");

const PORT = process.env.port ?? 4443;

const main = async () => {
  mongoose.connect("mongodb://localhost:27017/spotibook");
  const spotify = await spotifyAuthorize();

  const app = express();

  app.use(express.json());

  // Serves the frontend dist code
  app.use(express.static("dist", { index: "index.html" }));

  // Fallback route for 404s - this will enable client side routing to work
  // with refreshes, but we need to make a 404 page on the client
  // app.use('*', express.static('dist', {index: 'index.html'}));

  // PUT OTHER ROUTES HERE

  // Posts
  app.get("/api/v1/posts", getPosts);
  app.post("/api/v1/posts", () => {});
  app.post("/api/v1/posts/:postId/like", () => {});

  // Users
  app.get("/api/v1/users/:userId", getUser);
  app.get("/api/v1/users", getUsers);
  app.post("/api/v1/users", createUser);
  app.patch("/api/v1/users/:userId", editUser);

  // Authentication
  app.post("/api/v1/login", () => {});
  app.delete("/api/v1/logout", () => {});

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
