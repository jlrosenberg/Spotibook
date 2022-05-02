import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Typography } from "@mui/material";
import { FeedService } from "../../services/FeedService";
import { PostCard } from "../../components/PostCard";
import { PostCreationCard } from "../../components/PostCreationCard";
import { ProfileService } from "../../services/ProfileService";
import { UserCard } from "../../components/UserCard";
import { CurrentUserStore } from "../../stores/CurrentUserStore";

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
  const [users, setUsers] = useState<Array<any>>();
  const classes = useStyles();
  const loggedIn = !!CurrentUserStore.getInstance().user;
  const loadPosts = async () => {
    const data = await FeedService.getFeed();
    setPosts(data);
  };
  const loadUsers = async () => {
    const data = await ProfileService.getProfiles();
    const cleanData = data.filter((user) => {
      const isSameUser = user._id === CurrentUserStore.getInstance().user._id;
      const isNotFollowing = !CurrentUserStore.getInstance().user?.following?.includes(user._id);

      return !isSameUser && isNotFollowing;;
    });
    setUsers(cleanData);
  };

  useEffect(() => {
    loadPosts();
    loadUsers();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.cardContainer}>
        <PostCreationCard />
      </div>
      {posts &&
        posts?.map((post: any, index: number) => {
          return (
            <div key={index} className={classes.cardContainer}>
              <PostCard post={post} />
            </div>
          );
        })}
      {!posts && <h1>Loading...</h1>}
      {(loggedIn && posts?.length === 0) && (
        <Typography variant="h6">
          Looks like nobody you are following has posted yet! Try following some
          more users to see some posts in your feed
        </Typography>
      )}
      {loggedIn && posts?.length > 0 && (
        <Typography variant="h6">
          Looks like there are no more posts in your feed! Try following some of
          these other users below!
        </Typography>
      )}
      <div className={classes.cardContainer}>
        {users &&
          users.map((user) => {
            return <UserCard user={user} />;
          })}
      </div>
    </div>
  );
};
