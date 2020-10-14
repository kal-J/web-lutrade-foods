import React, { useState } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../redux/mapStateToProps';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MobileRightMenuSlider from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import './styles.scss';
import {
  AppBar,
  Toolbar,
  ListItem,
  IconButton,
  ListItemText,
  Divider,
  List,
  Typography,
  Box,
} from '@material-ui/core';
import colors from '../layout/colors';

const useStyles = makeStyles((theme) => ({
  menuSliderContainer: {
    width: 250,
    background: colors.primary,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  listItem: {
    color: '#fff',
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navbar: {
    backgroundColor: colors.primary,
  },
}));

const menuItems = [
  {
    listText: 'Home',
    path: '/',
  },
  {
    listText: 'About lutrade',
    path: '/about-us',
  },
  {
    listText: 'Dashboard',
    path: '/dashboard',
  },
  {
    listText: 'Contact Us',
    path: '/contact-us',
  },
];

const isNotAuthMenuItems = [
  {
    listText: 'Home',
    path: '/',
  },
  {
    listText: 'About Us',
    path: '/about-us',
  },
  {
    listText: 'Login',
    path: '/login',
  },
  {
    listText: 'Sign up',
    path: '/signup',
  },
  {
    listText: 'Contact Us',
    path: '/contact-us',
  },
];

export const NavBar = (props) => {
  const [state, setstate] = useState({
    left: false,
  });
  const toggleSlider = (slider, open) => {
    setstate({ ...state, [slider]: open });
  };
  const classes = useStyles();

  const { isAuthenticated } = props.redux_state.user;

  const sideList = (slider) => (
    <Box className={classes.menuSliderContainer} component="div">
      <Divider />
      {isAuthenticated ? (
        <List>
          {menuItems.map((item, key) => (
            <Link
              style={{ textDecoration: 'none' }}
              key={key}
              to={item.path}
              onClick={() => toggleSlider('left', false)}
            >
              <ListItem button>
                <ListItemText
                  className={classes.listItem}
                  primary={item.listText}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      ) : (
        <List>
          {isNotAuthMenuItems.map((item, key) => (
            <Link
              style={{ textDecoration: 'none' }}
              key={key}
              to={item.path}
              onClick={() => toggleSlider('left', false)}
            >
              <ListItem button>
                <ListItemText
                  className={classes.listItem}
                  primary={item.listText}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      )}
    </Box>
  );

  return (
    <React.Fragment>
      <Box component="nav">
        <AppBar className={classes.navbar} position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => toggleSlider('left', true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <Link style={{ textDecoration: 'none', color: '#fff' }} to="/">
                lutrade
              </Link>
            </Typography>

            <Button color="inherit">
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  style={{ textDecoration: 'none', color: '#fff' }}
                >
                  Login
                </Link>
              ) : (
                <Link
                  to="/logout"
                  style={{ textDecoration: 'none', color: '#fff' }}
                >
                  Logout
                </Link>
              )}
            </Button>
            <MobileRightMenuSlider
              anchor="left"
              open={state.left}
              onClose={() => toggleSlider('left', false)}
            >
              {sideList('left')}
            </MobileRightMenuSlider>
          </Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
  );
};

export default connect(mapStateToProps)(NavBar);
