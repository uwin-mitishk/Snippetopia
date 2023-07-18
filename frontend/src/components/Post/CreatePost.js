import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { TextareaAutosize, LinearProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Filebase from "react-file-base64";
import userInput from "../../custom hooks/use-input";
import Error from "../Error";
import { createPost, editPost, fetchPost } from "../../actions/post";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authStatusChecker } from "../../actions/user";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progress: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const PostForm = ({ post }) => {
  const classes = useStyles();
  const history = useHistory();
  const {
    value: title,
    valueChangeHandler: titleChangeHandler,
    hasError: titleHasError,
    inputBlurHandler: titleBlurHandler,
  } = userInput((title) => title !== "", post.title ? post.title : "");

  const {
    value: description,
    valueChangeHandler: descChangeHandler,
    inputBlurHandler: descBlurHandler,
    hasError: descHasError,
  } = userInput((description) => description.length >= 20, post.description);

  const [images, setImages] = useState(post.imageFiles ? post.imageFiles : []);
  const [tags, setTags] = useState(post.tags ? post.tags : []);

  const [tagsFieldBlur, setTagsFieldBlur] = useState(false);

  const tagsChangeHandler = (e) => {
    const tags = e.target.value;
    const tagsArray = tags.split(",");
    setTags(tagsArray);
  };

  const tagsFilter = () => {
    const tagsFilter = tags.filter((tag) => tag !== "");
    setTags(tagsFilter);
    setTagsFieldBlur(true);
  };

  const buttonDisable =
    titleHasError || descHasError || tags.length === 0 || images.length === 0;

  const { message: validationError } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  //checking wether user has manually altered token or not
  const { isLoggedin } = useSelector((state) => state.userLogin);
  const submitHandler = (e) => {
    e.preventDefault();

    //checking wether user has manually altered token or not
    dispatch(authStatusChecker());
    if (isLoggedin) {
      if (Object.keys(post).length !== 0) {
        dispatch(
          editPost(
            {
              id: post._id,
              title,
              description,
              tags,
              imageFiles: images,
            },
            history
          )
        );
      } else {
        dispatch(
          createPost(
            {
              title,
              description,
              tags,
              imageFiles: images,
            },
            history
          )
        );
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {Object.keys(post).length === 0 ? "Add Post" : "Edit Post"}
        </Typography>

        <Error
          condition={validationError ? true : false}
          message={validationError}
        />
        <form
          className={classes.form}
          noValidate
          onSubmit={submitHandler}
          hidden={validationError ? true : false}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                name="title"
                variant="outlined"
                autoComplete="off"
                fullWidth
                id="title"
                label="Title"
                autoFocus
                color="secondary"
                value={title}
                defaultValue={post.title ? post.title : null}
                onChange={titleChangeHandler}
                onBlur={titleBlurHandler}
              />
              <Error message="Title can't be empty" condition={titleHasError} />
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="body2"
                color="textPrimary"
                style={{ marginBottom: "10px", fontWeight: "bold" }}
              >
                {post.imageFiles ? "Edit code snippets" : "Add code snippets"}
              </Typography>
              <Filebase
                type="file"
                multiple={true}
                onDone={(images) => setImages(images)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextareaAutosize
                rowsMax={50}
                cols={52}
                aria-label="description"
                placeholder="Add description"
                color="pink"
                value={description}
                onChange={descChangeHandler}
                onBlur={descBlurHandler}
              />
              <Error
                message="Description must be 20 characters long"
                condition={descHasError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="primary"
                fullWidth
                variant="outlined"
                label="Tags"
                value={tags}
                placeholder="Add tags (comma-seperated)"
                onBlur={tagsFilter}
                onChange={tagsChangeHandler}
              />
              {tags.map((tag, index) => {
                return (
                  <Button
                    disabled
                    variant="contained"
                    key={index}
                    style={{
                      color: "whitesmoke",
                      backgroundColor: "black",

                      border: "1px solid white",
                    }}
                    size="small"
                  >
                    {tag}
                  </Button>
                );
              })}
              {tagsFieldBlur ? (
                <Error
                  message="Please add atleast one relevant tag"
                  condition={tags.length === 0 ? true : false}
                />
              ) : null}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            disabled={buttonDisable}
          >
            {Object.keys(post).length !== 0 ? "Edit Post" : "Add Post"}
          </Button>
        </form>
      </div>
    </Container>
  );
};

const CreatePost = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { post, loading } = useSelector((state) => state.post);
  useEffect(() => {
    const postId = props.match.params.id;

    if (postId !== undefined) {
      dispatch(fetchPost(postId));
    }
  }, [dispatch, props.match.params.id]);
  const { isLoggedin } = useSelector((state) => state.userLogin);
  return (
    <div>
      {loading && (
        <LinearProgress className={classes.progress} color="secondary" />
      )}

      {!loading ? (
        isLoggedin ? (
          <PostForm post={post} />
        ) : (
          <Typography variant="button" color="textPrimary">
            Please <Link to="/user/login"> login </Link> or{" "}
            <Link to="/user/signup">signup</Link> to proceed
          </Typography>
        )
      ) : null}
    </div>
  );
};

export default CreatePost;
