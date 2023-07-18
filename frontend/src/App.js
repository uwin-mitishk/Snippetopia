import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";

import Posts from "./components/Post/Posts";
import CreatePost from "./components/Post/CreatePost";
import Footer from "./components/Footer";
import Login from "./components/User/Login";
import Register from "./components/User/Signup";
import PostScreen from "./components/Post/PostScreen";
import ErrorPage from "./components/ErrorPage";
import SavedPosts from "./components/Post/SavedPost";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Route component={Navbar} path="/" />
        <Route component={Footer} path="/" exact />
        <Switch>
          <Route component={Posts} path="/" exact />
          <Route component={SavedPosts} path="/savedPosts" exact />
          <Route component={Login} path="/user/login" exact />
          <Route component={Register} path="/user/signup" exact />
          <Route component={CreatePost} path="/post/add" exact />
          <Route component={CreatePost} path="/post/edit/:id" exact />
          <Route component={PostScreen} path="/post/:id" exact />

          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
