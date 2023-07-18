import React, { useEffect } from "react";
import Post from "./Post";
import { fetchPostClearer, fetchPosts } from "../../actions/post";
import { Grow, Grid, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@material-ui/core";

const Posts = () => {
  const { posts, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    if (posts.length === 0) dispatch(fetchPosts());
    dispatch(fetchPostClearer());
  }, [dispatch]);

  return (
    <div>
      {loading && <CircularProgress color="secondary" />}
      {!loading && posts.length === 0 && (
        <Typography variant="button">No post found</Typography>
      )}
      <Grow in>
        <Grid container spacing={2}>
          {posts.map((post) => {
            return (
              <Grid item xs={12} md={4} lg={4} sm={12} key={post._id}>
                <Post post={post} postId={post._id} />
              </Grid>
            );
          })}
        </Grid>
      </Grow>
    </div>
  );
};

export default Posts;
