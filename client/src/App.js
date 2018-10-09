import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import LandingPage from "./components/layout/LandingPage";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./hoc/privateRoute/PrivateRoute";
import AsyncComponent from "./hoc/asyncComponent/AsyncComponent";

const asyncRegister = AsyncComponent(() => {
  return import("./components/auth/Register");
});

const asyncLogin = AsyncComponent(() => {
  return import("./components/auth/Login");
});

const asyncDashboard = AsyncComponent(() => {
  return import("./components/dashboard/Dashboard");
});

const asyncLogout = AsyncComponent(() => {
  return import("./components/auth/Logout");
});

const asyncAddEducation = AsyncComponent(() => {
  return import("./components/businessProfileActions/AddEducation");
});

const asyncAddExperience = AsyncComponent(() => {
  return import("./components/businessProfileActions/AddExperience");
});

const asyncAddProject = AsyncComponent(() => {
  return import("./components/businessProfileActions/AddProject");
});

const asyncCreateProfile = AsyncComponent(() => {
  return import("./components/create-profile/CreateProfile");
});

const asyncEditProfile = AsyncComponent(() => {
  return import("./components/edit-profile/EditProfile");
});

const asyncBusinessProfiles = AsyncComponent(() => {
  return import("./components/businessProfiles/BusinessProfiles");
});

const asyncBusinessProfile = AsyncComponent(() => {
  return import("./components/businessProfile/BusinessProfile");
});

const asyncBusinessPosts = AsyncComponent(() => {
  return import("./components/posts/Posts");
});

const asyncBusinessPost = AsyncComponent(() => {
  return import("./components/post/Post");
});

const asyncNotFound = AsyncComponent(() => {
  return import("./components/notFound/NotFound");
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={asyncRegister} />
          <Route exact path="/login" component={asyncLogin} />
          <PrivateRoute exact path="/dashboard" component={asyncDashboard} />
          <PrivateRoute exact path="/logout" component={asyncLogout} />
          <PrivateRoute exact path="/add-education" component={asyncAddEducation} />
          <PrivateRoute exact path="/add-experience" component={asyncAddExperience} />
          <PrivateRoute exact path="/add-project" component={asyncAddProject} />
          <PrivateRoute exact path="/create-profile" component={asyncCreateProfile} />
          <PrivateRoute exact path="/edit-profile" component={asyncEditProfile} />
          <Route exact path="/business-profiles" component={asyncBusinessProfiles} />
          <Route
            exact
            path="/business-profile/:identityName"
            component={asyncBusinessProfile}
          />
          <PrivateRoute exact path="/feed" component={asyncBusinessPosts} />
          <PrivateRoute exact path="/posts/:postId" component={asyncBusinessPost} />
          <Route path="*" component={asyncNotFound} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
