import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { useHistory } from "react-router-dom";
import Logo from "../Logo";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../../actions/post";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { LinearProgress, Container } from "@material-ui/core";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SaveButton from "./SaveButton";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "black",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },

  root: {
    maxWidth: "100vw",
    display: "flex",
    margin: "20px",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "black",
    border: "1px solid black",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  media: {
    flex: 1,
  },

  img: {
    height: "70vh",
    maxWidth: "70vw",
    display: "block",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      maxWidth: 345,
      height: 345,
    },
  },
  progress: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PostScreen = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { loading, post, message } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    const postId = props.match.params.id;
    dispatch(fetchPost(postId));
  }, [dispatch]);

  //check if post is available to view
  const getPost = !loading && message === "" && Object.keys(post).length !== 0;

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = getPost ? post.imageFiles.length : 0;

  const handleClose = () => {
    history.push("/");
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Dialog
        fullScreen
        open={true}
        TransitionComponent={Transition}
        scroll="body"
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="close"
              onClick={handleClose}
              style={{ marginRight: "10px" }}
            >
              <CloseIcon />
            </IconButton>
            <Logo />
            <SaveButton post={getPost && post} toastable={true} />
          </Toolbar>
        </AppBar>
        {message !== "" && (
          <Typography variant="h6" color="error">
            {message}
          </Typography>
        )}
        <Card className={classes.root} component="div">
          {loading && (
            <LinearProgress color="secondary" className={classes.progress} />
          )}
          <CardMedia className={classes.media} component="div">
            <img
              className={classes.img}
              alt={getPost && post.title}
              src={getPost && post.imageFiles[activeStep].base64}
            />
            <MobileStepper
              steps={maxSteps}
              position="static"
              variant="text"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </CardMedia>
          <CardContent component="div" style={{ flex: 2, color: "white" }}>
            <Typography gutterBottom variant="h5" component="h2">
              {getPost && post.title}
            </Typography>
            <Container maxWidth="lg">
              <Typography
                variant="body2"
                color="textSecondary"
                align="justify"
                style={{
                  color: "whitesmoke",
                  fontFamily: "monospace",
                  whiteSpace: "pre-line",
                }}
              >
                {getPost && post.description}
              </Typography>
              <Typography style={{ maxWidth: "25ch", paddingTop: "20px" }}>
                {getPost &&
                  post.tags.map((tag) => {
                    return (
                      <button
                        disabled
                        style={{
                          color: "black",
                          backgroundColor: "gray",
                          marginRight: "2px",
                        }}
                      >
                        {tag}
                      </button>
                    );
                  })}
              </Typography>
            </Container>
          </CardContent>
        </Card>
      </Dialog>
    </>
  );
};

export default PostScreen;
