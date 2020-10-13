import React, { useState } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../redux/mapStateToProps';
import { setUser } from '../../redux/actions';
import { Button, CssBaseline, Typography } from '@material-ui/core';
import './auth.scss';
import Error from '../error/Error';
import Loading from '../loading/Loading';
import { SignupSchema } from './validation';
import { signup } from '../../api/signup';
import { Redirect } from 'react-router-dom';

const Signup = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [signUpInfo, setSignUpInfo] = useState({});

  const { isAuthenticated } = props.redux_state.user;

  if (isAuthenticated) {
    return <Redirect to="/restaurant/dashboard" />;
  }

  return (
    <>
      {loading && <Loading />}
      <div className="container-signup">
        <h2 style={{ color: '#fff' }}>Enter restaurant information</h2>
        {error !== '' ? <Error /> : <></>}

        <CssBaseline />
        <div className="align-center">
          <div className="row">
            <label htmlFor="name">
              What do you want to call your Restaurant
            </label>
            <input
              type="text"
              id="name"
              value={signUpInfo.restaurant_name || ''}
              placeholder="Restaurant Name *"
              onChange={(event) => {
                setSignUpInfo({
                  ...signUpInfo,
                  restaurant_name: event.target.value,
                });
              }}
            />
          </div>
          <div className="row">
            <label htmlFor="email">Administrator Email</label>
            <input
              name="email"
              type="email"
              id="email"
              placeholder="Enter Email *"
              value={signUpInfo.email || ''}
              onChange={(event) => {
                setSignUpInfo({
                  ...signUpInfo,
                  email: event.target.value,
                });
              }}
            />
          </div>
          <div className="row">
            <label htmlFor="password">Administrator Password</label>
            <input
              name="password"
              type="password"
              id="password"
              placeholder="Enter Password *"
              value={signUpInfo.password || ''}
              onChange={(event) => {
                setSignUpInfo({
                  ...signUpInfo,
                  password: event.target.value,
                });
              }}
            />
          </div>
          <div className="row">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              name="confirm-password"
              type="password"
              id="confirm-password"
              placeholder="Confirm Password *"
              value={signUpInfo.confirm_password || ''}
              onChange={(event) => {
                setSignUpInfo({
                  ...signUpInfo,
                  confirm_password: event.target.value,
                });
              }}
            />
          </div>
        </div>

        <div className="row-btn">
          <Button
            size="medium"
            variant="contained"
            color="primary"
            onClick={(event) => {
              event.preventDefault();

              // 1. Verify signup Data
              setLoading(true);
              if (!Object.keys(signUpInfo).length) {
                setError('All fields are required');
                setLoading(false);
                return;
              }

              const { value, error } = SignupSchema.validate(signUpInfo);
              if (error) {
                setError(error.message);
                setLoading(false);
                error.message.includes('confirm_password')
                  ? setError('make sure your passwords match')
                  : setError(error.message);
                return;
              }

              // 2. call signup api.

              signup(value, setLoading, setError, props.setUser);
            }}
          >
            <Typography variant="inherit">SIGNUP</Typography>
          </Button>
        </div>
      </div>
    </>
  );
};
export default connect(mapStateToProps, { setUser })(Signup);
