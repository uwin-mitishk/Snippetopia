import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  logo: {
    flexGrow: 1,
    fontFamily: ["cursive"],
    fontStyle: "italic",
    fontSize: "40px",
    color: "#bf1363",
    fontWeight: "600",
    userSelect: "none",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0px",
      fontSize: "25px",
    },
  },
  b: {
    fontSize: "25px",
    fontFamily: "monospace",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  },
}));

const Logo = () => {
  const classes = useStyles();

  return (
    <Typography className={classes.logo}>
      <span style={{ fontFamily: "monospace" }}>Snippetopia;</span>
   
    </Typography>
  );
};

export default Logo;
