import { CircularProgress, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostCard } from "../../components/PostCard";
import { FeedService } from "../../services/FeedService";
import { SearchService } from "../../services/SearchService";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: "#efefef",
    minHeight: "100%",
    margin: "auto",
    [theme.breakpoints.up("md")]: {
      maxWidth: "500px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    [theme.breakpoints.down("md")]: {
      padding: "16px",
    },
  },
  cardContainer: {
    padding: "8px 4px",
    width: "100%",
  },
  image: {
    marginRight: "8px",
  },
  songContainer: {
    minHeight: "100px",
    marginBottom: "24px",
    display: "flex",
    marginTop: "32px",
    width: "100%",
  },
  songInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
}));

export const SearchPage = () => {
  const { songId } = useParams();
  const [song, setSong] = useState<any>();
  const [posts, setPosts] = useState<any>();
  const classes = useStyles();

  const artist = song?.artists[0].name;
  const image = song?.album?.images[0];
  console.log(posts);

  const loadSong = async () => {
    const data = await SearchService.getSongById(songId!);
    setSong(data);
    console.log(data);
  };

  const loadPosts = async () => {
    const data = await FeedService.getPostsForSong(songId!);
    setPosts(data);
  };
  useEffect(() => {
    loadSong();
    loadPosts();
  }, [songId]);

  if (!song) {
    return <CircularProgress />;
  }
  return (
    <div className={classes.root}>
      <div className={classes.songContainer}>
        <img
          className={classes.image}
          src={image?.url}
          height="100"
          width="100"
        ></img>
        <div className={classes.songInfo}>
          <Typography variant="h4">{song?.name}</Typography>
          <Typography variant="h6">{artist}</Typography>
        </div>
      </div>

      <div className={classes.cardContainer}>
        <Typography variant="button" paragraph>
          Posts
        </Typography>
        {posts && posts.length === 0 && (
          <Typography variant="overline" paragraph>
            No posts yet about this song... you could be the first!
          </Typography>
        )}
        {posts &&
          posts.map((post: any) => {
            return (
              <div key={post.id}>
                <PostCard post={post} />
              </div>
            );
          })}
      </div>
    </div>
  );
};
