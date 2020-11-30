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
import Menu from '../components/restaurant/menu/Menu';
import MenuIndex from '../components/restaurant/menu/Index';
import Dashboard from '../components/restaurant/Dashboard';
import Settings from '../components/restaurant/Settings';
import Orders from '../components/restaurant/Orders';

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
        exact
        path="/restaurant/menu"
        render={(props) => {
          if (!isAuthenticated) {
            return <Redirect to="/login" />;
          }
          return (
            <Box>
              <MenuIndex {...props} />
            </Box>
          );
        }}
      />
      <Route
        exact
        path="/restaurant/menu/add-item"
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
        exact
        path="/restaurant/settings"
        render={(props) => {
          if (!isAuthenticated) {
            return <Redirect to="/login" />;
          }
          return (
            <Box>
              <Settings {...props} />
            </Box>
          );
        }}
      />
      <Route
        exact
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
      <Route
        exact
        path="/restaurant/orders"
        render={(props) => {
          if (!isAuthenticated) {
            return <Redirect to="/login" />;
          }
          return (
            <Box>
              <Orders {...props} />
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
