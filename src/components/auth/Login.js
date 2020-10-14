import React, { useState } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../redux/mapStateToProps';
import { setUser } from '../../redux/actions';
import {
  Box,
  Button,
  CssBaseline,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import './auth.scss';
import { LoginSchema } from './validation';
import { login } from '../../api/login';
import Loading from '../loading/Loading';
import Error from '../error/Error';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.spacing(50),
  },
  row: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  input: {
    margin: '1em 0',
  },
  label: {
    color: '#fff',
  },
  form_footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const [loginInfo, setLoginInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { isAuthenticated } = props.redux_state.user;

  if (isAuthenticated) {
    return <Redirect to="/restaurant/dashboard" />;
  }

  return (
    <>
      {loading && <Loading />}
      <Box className={[classes.container, 'auth']}>
        <h2 style={{ color: '#fff' }}>LOGIN</h2>
        {error !== '' ? <Error /> : <></>}

        <CssBaseline />
        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();

            // 1. Verify login Data
            setLoading(true);
            if (!Object.keys(loginInfo).length) {
              setError('Email and Password is required');
              setLoading(false);
              return;
            }

            const { value, error } = LoginSchema.validate(loginInfo);
            if (error) {
              setError(error.message);
              setLoading(false);

              return;
            }

            // 2. call login api.

            login(value, setLoading, setError, props.setUser);
          }}
        >
          <div className={classes.row}>
            <label className={classes.label} htmlFor="email">
              Email
            </label>
            <input
              className={classes.input}
              name="email"
              type="text"
              placeholder="Email"
              value={loginInfo.email || ''}
              onChange={(event) => {
                setLoginInfo({ ...loginInfo, email: event.target.value });
              }}
            />
          </div>

          <div className={classes.row}>
            <label className={classes.label} htmlFor="password">
              Password
            </label>
            <input
              className={classes.input}
              name="password"
              type="password"
              placeholder="Password"
              value={loginInfo.password || ''}
              onChange={(event) => {
                setLoginInfo({ ...loginInfo, password: event.target.value });
              }}
            />
          </div>

          <div className={classes.form_footer}>
            <Typography>
              <Link to='/forgot-password'>Forgot password ?</Link>
            </Typography>
            <Typography style={{ margin: '1em' }}>
              Dont have an account ? <Link to="/signup">signup</Link>
            </Typography>
          </div>

          <div className={classes.row}>
            <Button
              size="medium"
              variant="contained"
              color="primary"
              type="submit"
            >
              <Typography variant="inherit">LOGIN</Typography>
            </Button>
          </div>
        </form>
      </Box>
    </>
  );
};

export default connect(mapStateToProps, { setUser })(Login);
