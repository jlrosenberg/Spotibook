import { Button, TextField, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { Colors } from "../../common/colors";
import { BACKGROUND_IMAGE_1 } from "../../common/static";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: 'scroll',
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
    alignItems: "center",
    // alignItems: "center",
    opacity: 0.9,
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      right: "100px",
      width: '300px',
      justifyContent: "space-between",
    },
    [theme.breakpoints.down("md")]: {
      width: "50%",
      height: 'auto',
      borderRadius: "32px",
      justifyContent: "center",
      padding: '24px',
      opacity: 0.95,

    },
    [theme.breakpoints.down("sm")]: {
      width: "75%",
      // height: '75%',
    },
    [theme.breakpoints.down("xs")]: {
      width: "85%",
      // height: '85%',
    },
  },
  field: {
    marginBottom: "16px !important",
  },
  appName: {
    marginTop: '16px !important',
    // [theme.breakpoints.up("md")]: {
    //   position: "absolute",
    //   right: "130px",
    //   top: '20px',
    //   zIndex: 3,
    //   marginBottom: '16px',
    // },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    }

  },
  appNameMobile: {
    marginBottom: '16px !important',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }

  },
  slugContainer: {
    marginRight: 'auto',
    [theme.breakpoints.down('lg')]: {
      maxWidth: '60%'
    }   
  },
  slug1: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  slug2: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  }
}));

export const RegistrationPage = () => {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [verifyPassword, setVerifyPassword] = useState<string>();
  const [name, setName] = useState<string>()
  const [passwordError, setPasswordError] = useState<string>();

  const onRegistrationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e)
    console.log("login submit");
    console.log(email);
    console.log(password);
    console.log(name)
  }

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const onVerifyPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerifyPassword(e.target.value);
  }

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const onVerifyPasswordBlur = () => {
    if(password !== verifyPassword) {
      setPasswordError('Passwords do not match');
    }else{
      setPasswordError(undefined)
    }
  }

  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.appNameMobile}>Spotibook</Typography>
      <div className={classes.slugContainer}>
      <Typography variant="h3" className={classes.slug1}>Music is the Universal Language...</Typography>
      <Typography variant="h1" className={classes.slug2}>Let's Talk.</Typography>
      </div>

      <form className={classes.formContainer} onSubmit={onRegistrationSubmit}>
        <Typography variant="h2" className={classes.appName}>Spotibook</Typography>
        <div>
        <TextField
          label="Email"
          type="email"
          placeholder="yourname@example.com"
          onChange={onEmailChange}
          className={classes.field}
          fullWidth
        />
        <TextField
          label="Name"
          placeholder="John Doe"
          onChange={onNameChange}
          className={classes.field}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          placeholder="*********"
          onChange={onPasswordChange}
          className={classes.field}
          fullWidth
          helperText="Password must be at least 8 characters long"
          error={!!passwordError}
        />
        <TextField
          label="Confirm your Password"
          type="password"
          placeholder="*********"
          onChange={onVerifyPasswordChange}
          onBlur={onVerifyPasswordBlur}
          className={classes.field}
          error={!!passwordError}
          helperText={passwordError}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>Create Account</Button>
        </div>
        <div/>
      </form>
    </div>
  );
};
