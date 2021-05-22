import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import Genre from "./pages/Genre";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {

  return (
    <Router>
      <div>
          <Navbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/genre" component={Genre} />
            <Route exact path="/post" component={Post} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          <Footer />
      </div>
    </Router>
  );
}

export default App;
