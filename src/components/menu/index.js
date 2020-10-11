import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MobileRightMenuSlider from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import {
  AppBar,
  Toolbar,
  ListItem,
  ListItemIcon,
  IconButton,
  ListItemText,
  Divider,
  List,
  Typography,
  Box,
} from "@material-ui/core";
import { AssignmentInd, Home, Apps, ContactMail } from "@material-ui/icons";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import colors from "../layout/colors";

const useStyles = makeStyles((theme) => ({
  menuSliderContainer: {
    width: 250,
    background: colors.primary,
    height: "100%",
  },

  listItem: {
    color: "#fff",
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
    listIcon: <Home />,
    listText: "Home",
    path: "/",
  },
  {
    listIcon: <AssignmentInd />,
    listText: "Resume",
    path: "/resume",
  },
  {
    listIcon: <Apps />,
    listText: "Portfolio",
    path: "/portfolio",
  },
  {
    listIcon: <ContactMail />,
    listText: "Hire me",
    path: "/contact",
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
  const sideList = (slider) => (
    <Box className={classes.menuSliderContainer} component="div">
      <Divider />
      <List>
        {menuItems.map((item, key) => (
          <Link style={{ textDecoration: "none" }} key={key} to={item.path}>
            <ListItem button>
              <ListItemIcon className={classes.listItem}>
                {item.listIcon}
              </ListItemIcon>
              <ListItemText
                className={classes.listItem}
                primary={item.listText}
              />
            </ListItem>
          </Link>
        ))}
      </List>
      <List>
        <a style={{ textDecoration: "none" }} href="https://github.com/kal-J">
          <ListItem button>
            <ListItemIcon className={classes.listItem}>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText className={classes.listItem} primary="Github" />
          </ListItem>
        </a>

        <a
          style={{ textDecoration: "none" }}
          href="https://twitter.com/kal_code"
        >
          <ListItem button>
            <ListItemIcon className={classes.listItem}>
              <TwitterIcon />
            </ListItemIcon>
            <ListItemText className={classes.listItem} primary="Twitter" />
          </ListItem>
        </a>
      </List>
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
              onClick={() => toggleSlider("left", true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              lutrade
            </Typography>
            <Button color="inherit">Login</Button>
            <MobileRightMenuSlider
              anchor="left"
              open={state.left}
              onClose={() => toggleSlider("left", false)}
            >
              {sideList("left")}
            </MobileRightMenuSlider>
          </Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
  );
};

export default NavBar;
