import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../../../shared/models/user";
import { Colors } from "../../common/colors";
import { BACKGROUND_IMAGE_1 } from "../../common/static";
import { LoginService } from "../../services/LoginService";
import { ProfileService } from "../../services/ProfileService";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "scroll",
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
      width: "300px",
      justifyContent: "space-between",
    },
    [theme.breakpoints.down("md")]: {
      width: "50%",
      height: "auto",
      borderRadius: "32px",
      justifyContent: "center",
      padding: "24px",
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
    marginTop: "16px !important",
    // [theme.breakpoints.up("md")]: {
    //   position: "absolute",
    //   right: "130px",
    //   top: '20px',
    //   zIndex: 3,
    //   marginBottom: '16px',
    // },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  appNameMobile: {
    marginBottom: "16px !important",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  slugContainer: {
    marginRight: "auto",
    [theme.breakpoints.down("lg")]: {
      maxWidth: "60%",
    },
  },
  slug1: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  slug2: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

export const RegistrationPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [verifyPassword, setVerifyPassword] = useState<string>();
  const [name, setName] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [ssn, setSsn] = useState<number>();
  const [role, setRole] = useState<UserRole>();
  const [age, setAge] = useState<number>();

  const onRegistrationSubmit = async (e: any) => {
    e.preventDefault();
    if (
      !name ||
      !email ||
      !password ||
      !verifyPassword ||
      password != verifyPassword ||
      !role
    ) {
      setPasswordError("Please fill all fields");
      return;
    }
    setSubmitting(true);
    await ProfileService.createProfile({
      name,
      email,
      password,
      ssn,
      role,
      age,
    });
    checkLoggedIn()
    setSubmitting(false);
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onVerifyPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerifyPassword(e.target.value);
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSsnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSsn(Number(e.target.value));
  };

  const onVerifyPasswordBlur = () => {
    if (password !== verifyPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError(undefined);
    }
  };

  const checkLoggedIn = async() => {
    const res = await LoginService.getIsLoggedIn() as any
    if(res.email){
      navigate('../home', {replace: true})
    }
    console.log(res)
  }

  useEffect(()=>{
    checkLoggedIn()
  }, [])

  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.appNameMobile}>
        Spotibook
      </Typography>
      <div className={classes.slugContainer}>
        <Typography variant="h3" className={classes.slug1}>
          Music is the Universal Language...
        </Typography>
        <Typography variant="h1" className={classes.slug2}>
          Let's Talk.
        </Typography>
      </div>

      <form className={classes.formContainer} onSubmit={onRegistrationSubmit}>
        <Typography variant="h2" className={classes.appName}>
          Spotibook
        </Typography>
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
          <FormControl style={{ width: "100%" }}>
            <FormLabel>Account Type</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              onChange={(e) => setRole(e.target.value as UserRole)}
            >
              <FormControlLabel
                value="STANDARD"
                control={<Radio />}
                label="Adult"
              />
              <FormControlLabel
                value="CHILD"
                control={<Radio />}
                label="Child"
              />
            </RadioGroup>
          </FormControl>
          {role === "STANDARD" && (
            <TextField
              label="SSN"
              type="number"
              fullWidth
              className={classes.field}
              onChange={onSsnChange}
            />
          )}
          {role === "CHILD" && (
            <TextField
              label="Age"
              type="number"
              className={classes.field}
              fullWidth
              onChange={(e) => {
                setAge(Number(e.target.value));
              }}
            />
          )}

          <TextField
            label="Password"
            type="password"
            placeholder="*********"
            onChange={onPasswordChange}
            className={classes.field}
            fullWidth
            // help,erText="Password must be at least 8 characters long"
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={submitting}
          >
            Create Account
          </Button>
        </div>
        <div />
      </form>
    </div>
  );
};
