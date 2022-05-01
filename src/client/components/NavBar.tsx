import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
  Avatar,
  Popover,
  ListItem,
  List,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import React, { useState } from "react";
import { Search } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { Colors } from "../common/colors";
import { CurrentUserStore } from "../stores/CurrentUserStore";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { LoginService } from "../services/LoginService";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchField: {
    background: Colors.white,
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
  const navigate = useNavigate()
  const user = CurrentUserStore.getInstance().getUser();
  
  const onProfileClicked = (e: any) => {
    setAnchorEl(e.currentTarget)
  }
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const [anchorEl, setAnchorEl] = useState();

  const onViewProfile = () => {
    navigate(`/profile/${user.user_id}`);
  }

  const onEditProfile = () => {
    navigate(`/profile/${user.user_id}/edit`);
  }

  const onLogOut = async() => {
    await LoginService.logout();
    navigate("/login");
  }

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
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Spotibook
          </Typography>
        </div>

        <TextField
          placeholder="Search"
          variant="standard"
          className={classes.searchField}
          onChange={onSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search></Search>
              </InputAdornment>
            ),
          }}
        />
        <IconButton onClick={onProfileClicked}><Avatar src={user.avatar}/></IconButton>
        <Popover
              id='settings'
              open={!!anchorEl}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(undefined)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <List>
                <ListItem onClick={onViewProfile}><Typography>View Profile</Typography></ListItem>
                <ListItem onClick={onEditProfile}><Typography>Edit Profile</Typography></ListItem>
                <ListItem onClick={onLogOut}><Typography>Log out</Typography></ListItem>
              </List>
        </Popover>
      </Toolbar>
    </AppBar>
  );
});
