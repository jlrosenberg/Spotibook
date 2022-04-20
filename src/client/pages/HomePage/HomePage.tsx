import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { FeedService } from "../../services/FeedService";
import { PostCard } from "../../components/PostCard";

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
}));

export const HomePage = () => {
  const [posts, setPosts] = React.useState<any>(undefined);
  const classes = useStyles();
  const loadPosts = async () => {
    const data = await FeedService.getFeed();
    setPosts(data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className={classes.root}>
      {posts &&
        posts?.map((post: any, index: number) => {
          return (
            <div key={index} className={classes.cardContainer}>
              <PostCard post={post} />
            </div>
          );
        })}
      {!posts && <h1>Loading...</h1>}
    </div>
  );
};
