import React from "react";
import { useState, useEffect } from "react";
import { BookmarkBorder, Bookmark } from "@material-ui/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SaveButton = ({ post, toastable }) => {
  const [saved, isSaved] = useState(false);
  console.log(toastable);
  useEffect(() => {
    createLsIfNotExist();

    if (isPostExistInLs()) {
      console.log("post already saved");
      isSaved(true);
    } else {
      console.log("post not saved");

      isSaved(false);
    }
  });

  const saveHandler = () => {
    isSaved(!saved);

    let getSavedPosts = JSON.parse(localStorage.getItem("savedPosts"));
    if (!saved) {
      getSavedPosts.push(post);
      if (toastable)
        toast("Post bookmarked successfully", {
          type: "success",
          position: "top-center",
          closeOnClick: true,
          autoClose: 1000,
        });
      localStorage.setItem("savedPosts", JSON.stringify(getSavedPosts));
    } else {
      // remove from save
      const filteredSavedPosts = getSavedPosts.filter(
        (savedPost) => savedPost._id !== post._id
      );

      if (toastable)
        toast("Post removed from bookmark", {
          type: "error",
          position: "top-center",
          closeOnClick: true,
          autoClose: 1000,
          pauseOnHover: false,
        });

      localStorage.setItem("savedPosts", JSON.stringify(filteredSavedPosts));
    }
  };

  const createLsIfNotExist = () => {
    if (localStorage.getItem("savedPosts")) return true;
    createLs();
  };

  const createLs = () => {
    localStorage.setItem("savedPosts", JSON.stringify([]));
  };

  const isPostExistInLs = () => {
    if (localStorage.getItem("savedPosts")) {
      const savedPosts = JSON.parse(localStorage.getItem("savedPosts"));

      if (savedPosts.length !== 0) {
        const isExist = savedPosts.some(
          (savedPost) => savedPost._id === post._id
        );
        console.log(isExist);
        return isExist;
      } else {
        console.log("No item found");
        return false;
      }
    }
  };

  return (
    <>
      <ToastContainer />
      {saved ? (
        <Bookmark
          style={{ color: "red", marginRight: "auto" }}
          onClick={saveHandler}
          fontSize="default"
        />
      ) : (
        <BookmarkBorder
          style={{ color: "red", marginRight: "auto" }}
          onClick={saveHandler}
        />
      )}
    </>
  );
};

export default SaveButton;
