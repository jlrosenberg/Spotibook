import { CircularProgress, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../../components/NavBar";
import { LoginService } from "../../services/LoginService";

const useStyles = makeStyles({
  root: {
    background: "#efefef",
    height: "100%",
    width: "100%",
  },
  loadingContainer: {
    background: "#efefef",
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: 'auto',
  },
});

export const LoggedInPage = () => {
  const classes = useStyles();
  // const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState<boolean>();

  const checkLoggedIn = async () => {
    const isLoggedIn = await LoginService.getIsLoggedIn();
    console.log(isLoggedIn);
    setLoggedIn(isLoggedIn);
  };

  // if (loggedIn === false) {
  //   navigate("/login", { replace: true });
  // }

  useEffect(() => {
    console.log("here");
    checkLoggedIn();
  }, []);

  if (loggedIn === undefined) {
    return (
      <div className={classes.loadingContainer}>
        <Typography variant="h1">Spotibook</Typography>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className={classes.root}>
        <Outlet />
      </div>
    </>
  );
};
