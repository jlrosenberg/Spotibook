import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Popover,
  ListItem,
  List,
} from "@mui/material";

import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Colors } from "../common/colors";
import { CurrentUserStore } from "../stores/CurrentUserStore";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { LoginService } from "../services/LoginService";
import { SongPicker } from "./SongPicker";
import { Home, Login } from "@mui/icons-material";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchField: {
    background: Colors.white,
    width: '100%',
    maxWidth: '400px',
    borderRadius: "8px",
    "& .MuiInputBase-input": {
      padding: "8px !important",
    },
  },
  leftSide: {
    display: "flex",
    alignItems: "center",
  },
});

export const NavBar = observer(() => {
  const classes = useStyles();
  const navigate = useNavigate();
  const user = CurrentUserStore.getInstance().user;
  const filterExplicit = user?.role === "CHILD";

  const loggedIn = !!user
  const onProfileClicked = (e: any) => {
    if(!loggedIn) {
      alert("To take profile actions, you must be logged in. You will now be redirected");
      navigate('/login');
    }
    setAnchorEl(e.currentTarget);
  };
  const [anchorEl, setAnchorEl] = useState();

  const onViewProfile = () => {
    navigate(`/profile/${user.user_id ?? user._id}`);
  };

  const onEditProfile = () => {
    navigate(`/profile/${user.user_id ?? user._id}/edit`);
  };

  const onLogOut = async () => {
    await LoginService.logout();
    navigate("/login");
  };

  const onSearch = async (song: any) => {
    navigate(`/songs/${song.id}`);
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.root}>
        <div className={classes.leftSide}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate("/")}
          >
            {/* <MenuIcon /> */}
            <Home />
          </IconButton>
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Spotibook
          </Typography> */}
        </div>

        <div className={classes.searchField}>
          <SongPicker
            filterExplicit={filterExplicit}
            onSongSelected={onSearch}
            placeholder="Search for posts about a song"
            // width="400px"
          />
        </div>
        <IconButton onClick={onProfileClicked} color="inherit">
          {user ? <Avatar src={user.avatar} /> : <Login />}
        </IconButton>
        <Popover
          id="settings"
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(undefined)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <List>
            <ListItem onClick={onViewProfile}>
              <Typography>View Profile</Typography>
            </ListItem>
            <ListItem onClick={onEditProfile}>
              <Typography>Edit Profile</Typography>
            </ListItem>
            <ListItem onClick={onLogOut}>
              <Typography>Log out</Typography>
            </ListItem>
          </List>
        </Popover>
      </Toolbar>
    </AppBar>
  );
});
