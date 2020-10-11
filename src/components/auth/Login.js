import React from "react";
import {
  Box,
  Button,
  CssBaseline,
  makeStyles,
  Typography,
} from "@material-ui/core";
import colors from "../layout/colors";
import { Link } from "react-router-dom";
import "./auth.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: theme.spacing(50),
  },
  row: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  input: {
    margin: "1em 0",
  },
  label: {
    color: "#fff",
  },
  form_footer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Login = () => {
  const classes = useStyles();
  return (
    <Box className={[classes.container, "auth"]}>
      <h2 style={{ color: "#fff" }}>LOGIN</h2>

      <CssBaseline />
      <form className="form">
        <div className={classes.row}>
          <label className={classes.label} htmlFor="email">
            Email
          </label>
          <input
            className={classes.input}
            name="email"
            type="text"
            placeholder="Email"
          />
        </div>

        <div className={classes.row}>
          <label className={classes.label} htmlFor="password">
            Password
          </label>
          <input
            className={classes.input}
            name="password"
            type="text"
            placeholder="Password"
          />
        </div>

        <div className={classes.form_footer}>
          <Typography>
            <Link>Forgot password ?</Link>
          </Typography>
          <Typography style={{ margin: "1em" }}>
            Dont have an account ? <Link>signup</Link>
          </Typography>
        </div>

        <div className={classes.row}>
          <Button
            size="medium"
            variant="contained"
            color="primary"
            onClick={() => {}}
          >
            <Typography variant="p">LOGIN</Typography>
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default Login;
