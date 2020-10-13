import React from 'react';
import firebase from '../firebase';
import { connect } from 'react-redux';
import { mapStateToProps } from '../redux/mapStateToProps';
import { setUser, setLoading, setError } from '../redux/actions';
import { Box } from '@material-ui/core';
import { Redirect, Route } from 'react-router-dom';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import LandingPage from '../components/LandingPage';
import Menu from '../components/restaurant/Menu';
import Dashboard from '../components/restaurant/Dashboard';

const index = (props) => {
  const { isAuthenticated } = props.redux_state.user;
  const { setUser, setLoading, setError } = props;

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

      <Route
        path="/logout"
        render={(props) => {
          setLoading(true);

          firebase
            .auth()
            .signOut()
            .then(() => {
              setUser({
                isAuthenticated: false,
              });
              setLoading(false);
            })
            .catch((error) => {
              setError(error.message);
              setLoading(false);
            });
          return <Redirect to="/" />;
        }}
      />

      <Route
        path="/signup"
        render={(props) => {
          return (
            <Box>
              <Signup {...props} />
            </Box>
          );
        }}
      />

      {/** Protected Routes */}
      <Route
        path="/restaurant/menu"
        render={(props) => {
          if (!isAuthenticated) {
            return <Redirect to="/login" />;
          }
          return (
            <Box>
              <Menu {...props} />
            </Box>
          );
        }}
      />

      <Route
        path="/restaurant/dashboard"
        render={(props) => {
          if (!isAuthenticated) {
            return <Redirect to="/login" />;
          }
          return (
            <Box>
              <Dashboard {...props} />
            </Box>
          );
        }}
      />
    </>
  );
};

export default connect(mapStateToProps, { setUser, setLoading, setError })(
  index
);
