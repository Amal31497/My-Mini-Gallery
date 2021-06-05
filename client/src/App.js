import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ArtProvider } from "./utils/GlobalState"

// Style
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

// Pages
import Home from "./pages/Home";
import Profile from "./pages/profile/Profile";
import Post from "./pages/post/Post";
import Genre from "./pages/genre/Genre";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import signUpSuccess from "./pages/signup/FormSuccess";
import postSuccess from "./pages/post/PostSuccess";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WatchAuthenticatedUser from "./components/WatchAuthenticatedUser";

function App() {
  return (
    <ArtProvider>
      <WatchAuthenticatedUser />
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signupSuccess" component={signUpSuccess} />
            <Route exact path="/postSuccess" component={postSuccess} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/genre" component={Genre} />
            <Route exact path="/post" component={Post} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </ArtProvider>
  );
}

export default App;