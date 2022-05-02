import { Button, Link, TextField, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../common/colors";
import { BACKGROUND_IMAGE_1 } from "../../common/static";
import { LoginService } from "../../services/LoginService";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${BACKGROUND_IMAGE_1})`,
    height: "100vh",
    width: "100vw",
    backgroundSize: "cover",
    flexDirection: "column",
  },
  formContainer: {
    maxWidth: "500px",
    height: "100%",
    backgroundColor: Colors.white,
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // alignItems: "center",
    opacity: 0.9,
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      right: "100px",
      width: "275px",
    },
    [theme.breakpoints.down("md")]: {
      width: "50%",
      height: "50%",
      borderRadius: "32px",
      opacity: 0.95,
    },
    [theme.breakpoints.down("sm")]: {
      width: "75%",
      height: "75%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "85%",
      height: "85%",
    },
  },
  field: {
    marginBottom: "16px !important",
  },
  appNameContainer: {
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      right: "130px",
      top: "20px",
      zIndex: 3,
      marginBottom: "16px",
    },
  },
}));

export const LoginPage = () => {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const onLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await LoginService.login({ email, password });
    checkLoggedIn();
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const checkLoggedIn = async () => {
    // TODO josh fix the return type of getIsLoggedIn
    const res = (await LoginService.getIsLoggedIn()) as any;
    if (res.email) {
      navigate("../home", { replace: true });
    }
    console.log(res);
  };

  const onRegisterClick = () => {
    navigate("../register");
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.appNameContainer}>
        Spotibook
      </Typography>

      <form className={classes.formContainer} onSubmit={onLoginSubmit}>
        <Link onClick={onRegisterClick}>
          <Typography>New user? Click here to register!</Typography>
        </Link>
        <TextField
          label="email"
          type="email"
          placeholder="yourname@example.com"
          onChange={onEmailChange}
          className={classes.field}
          fullWidth
        />
        <TextField
          label="password"
          type="password"
          placeholder="*********"
          onChange={onPasswordChange}
          className={classes.field}
          fullWidth
        />
        <Typography variant="body2">
          <a href="foo">Forgot your password?</a>
        </Typography>
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </div>
  );
};
