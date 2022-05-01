import { Button, CircularProgress, TextField, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProfileService } from "../../services/ProfileService";
import { CurrentUserStore } from "../../stores/CurrentUserStore";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: "#efefef",
    minHeight: "100%",
    margin: "auto",
    paddingTop: "36px",
    paddingBottom: "36px",
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
  field: {
    marginBottom: "16px !important",
  },
}));

export const EditProfilePage = () => {
  const [profile, setProfile] = useState<any>();
  const [name, setName] = useState<string>();
  const [avatar, setAvatar] = useState<string>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { profileId } = useParams();
  const classes = useStyles();
  const currentUser = CurrentUserStore.getInstance().user;
  const navigate = useNavigate();
  const loggedIn = !!currentUser

  if (loggedIn === false) {
    navigate("/login", { replace: true });
  }

  // TODO once we add admin roles, add check for that here
  if (currentUser._id !== profileId) {
    return <div>You are not authorized to edit this profile</div>;
  }

  const loadProfile = async () => {
    const data = await ProfileService.getProfile(profileId);
    setProfile(data);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    await ProfileService.updateProfile(profileId!, {
      name: name ?? profile.name,
      avatar: avatar ?? profile.avatar,
    });
    navigate("/profile/" + profileId);
  };

  useEffect(() => {
    loadProfile();
  }, [profileId]);

  if (!profile) {
    return <CircularProgress />;
  }
  return (
    <div className={classes.root}>
      <form onSubmit={onSubmit}>
        <TextField
          label="Name"
          defaultValue={profile.name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          fullWidth
          className={classes.field}
        />
        <TextField
          label="Avatar url"
          defaultValue={profile.avatar}
          onChange={(e) => {
            setAvatar(e.target.value);
          }}
          fullWidth
          className={classes.field}
        />
        <Button
          disabled={submitting}
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
