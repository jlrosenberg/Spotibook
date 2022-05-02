import { Avatar, Button, Card, Link, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { observer } from "mobx-react-lite";
import React from "react";
import { useNavigate } from "react-router-dom";
import { UserPayload } from "../../../shared/payloads";
import { ProfileService } from "../../services/ProfileService";
import { CurrentUserStore } from "../../stores/CurrentUserStore";

interface Props {
  user: UserPayload;
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    padding: 8,
    justifyContent: "space-between",
    marginBottom: 8,
  },
  leftContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: 8,
  },
});

export const UserCard: React.FC<Props> = observer(({ user }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const currentUser = CurrentUserStore.getInstance().user;
  const alreadyFollowing = currentUser ? currentUser.following.includes(user._id) : true

  const onProfileClicked = (e: any) => {
    e.preventDefault();
    navigate(`/profile/${user._id}`);
  };

  const onFollowClicked = (e: any) => {
    e.preventDefault();
    ProfileService.followProfile(user._id);
    // navigate(`/profile/${user._id}/follow`);
  };

  return (
    <Card className={classes.container}>
      <div className={classes.leftContainer}>
        <Avatar src={user.avatar} className={classes.avatar}>
          {user.name.charAt(0)}
        </Avatar>
        <Link onClick={onProfileClicked}>
          <Typography>{user.name}</Typography>
        </Link>
      </div>

      {!alreadyFollowing && <Button onClick={onFollowClicked}>Follow</Button>}
    </Card>
  );
});
