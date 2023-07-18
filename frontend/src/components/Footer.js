import React from "react";

import { makeStyles, fade } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import Fab from "@material-ui/core/Fab";

import useScrollTrigger from "@material-ui/core/useScrollTrigger";

import { Slide } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { isMobile } from "react-device-detect";
import SearchPost from "./Post/SearchPost";

function HideOnScrollDown(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="up" in={!trigger}>
      {children}
    </Slide>
  );
}

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  logo: {
    fontFamily: ["Poppins", "sans-serif"],
    backgroundColor: "black",
    fontStyle: "italic",
    fontSize: "40px",
    paddingLeft: "40px",
    color: "#bf1363",
    fontWeight: "600",
    userSelect: "none",
  },
  search: {
    position: "absolute",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: "auto",
    bottom: 0,
    backgroundColor: "black",
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: "absolute",
    top: -30,
    left: 0,
    right: 10,
    margin: "-30px auto",
  },
}));
const Footer = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <HideOnScrollDown>
        <AppBar position="fixed" color="primary" className={classes.appBar}>
          {isMobile ? (
            <Toolbar>
              <Link to="/post/add">
                <Fab
                  color="secondary"
                  aria-label="add"
                  className={classes.fabButton}
                >
                  <AddIcon />
                </Fab>
              </Link>

              <div className={classes.grow} />

              <SearchPost />
            </Toolbar>
          ) : (
            <Link to="/post/add">
              <Fab
                color="secondary"
                aria-label="add"
                className={classes.fabButton}
              >
                <AddIcon />
              </Fab>
            </Link>
          )}
        </AppBar>
      </HideOnScrollDown>
    </React.Fragment>
  );
};

export default Footer;
