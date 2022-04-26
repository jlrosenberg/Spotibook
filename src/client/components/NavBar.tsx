import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import React from "react";
import { Search } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { Colors } from "../common/colors";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
  },
  searchField: {
    background: Colors.white,
    borderRadius: '8px',
    '& .MuiInputBase-input': {
      padding: '8px !important'
    }
  },
  leftSide: {
    display: 'flex',
    alignItems: 'center',
  }
});

export const NavBar = () => {
  const classes = useStyles()


  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
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
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};
