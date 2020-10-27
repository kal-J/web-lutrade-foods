import React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: theme.spacing(60),
  },
  text: {
    color: "#fff",
    textAlign: "center",
  },
  btn_wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: theme.spacing(20),
  },
}));

const LandingPage = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Typography className={classes.text} variant="h2">
        Welcome!
      </Typography>
      <Typography className={classes.text} variant="h3">
        Its time to take your restaurant online.
      </Typography>
      <Box className={classes.btn_wrapper}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() => props.history.push("/login")}
        >
          <Typography variant="h5">Get Started</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
