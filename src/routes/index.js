import { Box } from "@material-ui/core";
import React from "react";
import { Route } from "react-router-dom";
import Login from "../components/auth/Login";
import LandingPage from "../components/LandingPage";

const index = () => {
  return (
    <>
      <Route
        exact
        path="/"
        render={(props) => {
          return (
            <Box>
              <LandingPage {...props} />
            </Box>
          );
        }}
      />

      <Route
        path="/login"
        render={(props) => {
          return (
            <Box>
              <Login {...props} />
            </Box>
          );
        }}
      />
    </>
  );
};

export default index;
