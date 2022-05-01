import { Avatar, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { UserPayload } from "../../../shared/payloads";
import { PostCard } from "../../components/PostCard";
import { UserCard } from "../../components/UserCard";

interface Props {
  profile: UserPayload;
  posts: Array<any>;
}

const useStyles = makeStyles((theme: Theme) => ({
  cardContainer: {
    width: "100%",
    marginBottom: '8px',
    // marginBottom: 24,
  },
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
  topContainer: {
    marginTop: 24,
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },
}));

export const ProfilePageContent: React.FC<Props> = ({ profile, posts }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.topContainer}>
        <Avatar src={profile.avatar} />
        <Typography variant="h4">{profile.name}</Typography>
      </div>
      <div className={classes.cardContainer} style={{marginBottom: '24px'}}>
        <Typography variant="button" style={{marginTop: 24}}>Posts</Typography>
        {posts.map((post, index) => (
          <div key={index} className={classes.cardContainer}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
      <div className={classes.cardContainer}>
        <Typography variant="button" style={{marginTop: 24}}>Following</Typography>
        {profile.following.map((follower) => (
          <UserCard user={follower as any} />
        ))}
      </div>
    </div>
  );
};
