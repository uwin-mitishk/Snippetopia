import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/user";
import { Redirect } from "react-router-dom";
import wallpaper from "../../wallpaper.jpg";
import Error from "../Error";
import userInput from "../../custom hooks/use-input";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${wallpaper})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signup = () => {
  const classes = useStyles();
  const { isLoggedin } = useSelector((state) => state.userLogin);
  const { errMessage, loading } = useSelector((state) => state.userRegister);
  const dispatch = useDispatch();

  const {
    value: username,
    valueChangeHandler: usernameChangeHandler,
    hasError: usernameHasError,
    inputBlurHandler: usernameBlurHandler,
  } = userInput((username) => username !== "");

  const {
    value: email,
    valueChangeHandler: emailChangeHandler,
    hasError: emailHasError,
    inputBlurHandler: emailBlurHandler,
  } = userInput((email) =>
    email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  );

  const {
    value: password,
    valueChangeHandler: passwordChangeHandler,
    hasError: passwordHasError,
    inputBlurHandler: passwordBlurHandler,
  } = userInput((password) => password.length >= 6);

  const {
    value: confirmpassword,
    valueChangeHandler: confirmpasswordChangeHandler,
    hasError: confirmpasswordHasError,
    inputBlurHandler: confirmpasswordBlurHandler,
  } = userInput((confirmpassword) => confirmpassword === password);

  if (isLoggedin) return <Redirect to="/" />;

  const formInValid =
    usernameHasError ||
    passwordHasError ||
    emailHasError ||
    confirmpasswordHasError;

  const submitHandler = (e) => {
    e.preventDefault();
    if (formInValid) return null;

    dispatch(register(username, email, password, confirmpassword));
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="uname"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  value={username}
                  onChange={usernameChangeHandler}
                  onBlur={usernameBlurHandler}
                />
                <Error
                  message="Username can't be empty"
                  condition={usernameHasError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                />
                <Error condition={emailHasError} message="Invalid email" />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={passwordChangeHandler}
                  onBlur={passwordBlurHandler}
                />
                <Error
                  condition={passwordHasError}
                  message="password must be 6 characters long"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmpassword"
                  autoComplete="current-password"
                  value={confirmpassword}
                  onChange={confirmpasswordChangeHandler}
                  onBlur={confirmpasswordBlurHandler}
                />
                <Error
                  condition={confirmpasswordHasError}
                  message="Password does not match"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              disabled={formInValid}
            >
              Sign Up
            </Button>
            {loading && <CircularProgress color="secondary" />}

            <Error message={errMessage} condition={errMessage ? true : false} />
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link to="/user/login" variant="body2">
                  {"Have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Signup;

// <form className={classes.form} noValidate>
// <Grid item xs={12}>
//
// </Grid>
// <Grid item xs={12}>
//   <TextField
//     variant="outlined"
//     required
//     fullWidth
//     id="email"
//     label="Email Address"
//     name="email"
//     autoComplete="email"
//   />
// </Grid>
// <Grid item xs={6}>
//   <TextField
//     variant="outlined"
//     required
//     fullWidth
//     name="password"
//     label="Password"
//     type="password"
//     id="password"
//     autoComplete="current-password"
//   />
// </Grid>
// <Grid item xs={6}>
//   <TextField
//     variant="outlined"
//     required
//     fullWidth
//     name="confirmpassword"
//     label="Confirm Password"
//     type="password"
//     id="confirmpassword"
//     autoComplete="current-password"
//   />
// </Grid>
// <Button
//   type="submit"
//   fullWidth
//   variant="contained"
//   color="secondary"
//   className={classes.submit}
// >
//   Sign Up
// </Button>
// <Grid container justify="flex-end">
//   <Grid item>
//     <Link href="/user/login" variant="body2">
//       Already have an account? Sign in
//     </Link>
//   </Grid>
// </Grid>
// </form>
