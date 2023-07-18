import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Grow, Grid, Typography } from "@material-ui/core";

const Posts = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("savedPosts"))
      setSavedPosts(JSON.parse(localStorage.getItem("savedPosts")));
  }, []);

  return (
    <div>
      {savedPosts.length === 0 && (
        <Typography variant="button">No post found</Typography>
      )}
      <Grow in>
        <Grid container spacing={2}>
          {savedPosts.map((post) => {
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
