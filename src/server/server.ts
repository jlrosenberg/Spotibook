import express from "express";
import mongoose from "mongoose";
import Post from "../shared/models/post";
import { getFeed } from "./controllers/feed.controller";
import { getProfile } from "./controllers/profile.controller";
const path = require("path");

const PORT = process.env.port ?? 4443;

mongoose.connect(process.env.port ?? "mongodb://localhost:27017/spotibook");

const app = express();

app.use(express.json());

// Serves the frontend dist code
app.use(express.static("dist", { index: "index.html" }));

// Fallback route for 404s - this will enable client side routing to work
// with refreshes, but we need to make a 404 page on the client
// app.use('*', express.static('dist', {index: 'index.html'}));

// PUT OTHER ROUTES HERE

app.get("/api/v1/feed", getFeed);
app.get("/api/v1/profile/:profileId", getProfile);

/* final catch-all route to index.html defined last */
app.get("*", function (req, res, next) {
  console.log("here");
  res.sendFile(path.join(__dirname, "../../dist/"));
});

// Start the node server
app.listen(PORT, () => {
  console.log(`started on port ${PORT}`);
});
