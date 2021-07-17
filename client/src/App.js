import React from "react";
// React DOM
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Context provider (Global State)
import { ArtProvider } from "./utils/GlobalState"

// Style
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

// Pages
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Post from "./pages/Post/Post";
import Genre from "./pages/Genre/Genre";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ArtPage from "./pages/ArtPage/ArtPage";
import signUpSuccess from "./pages/Signup/FormSuccess";
import postSuccess from "./pages/Post/PostSuccess";
import GenrePage from "./pages/GenrePage/GenrePage";
import Search from "./pages/Search/Search";

// Components
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import WatchAuthenticatedUser from "./components/WatchAuthenticatedUser";

function App() {
  return (
    //  Global State Context Provider (User ID)
    <ArtProvider>
      {/* Authenticator (checks if the user is logged in or not) */}
      <WatchAuthenticatedUser />
      <Router>
        <div>
          <Navbar />
          <Switch>
            {/* Home */}
            <Route exact path="/" component={Home} />
            {/* Exsact paths */}
            <Route exact path="/signupSuccess" component={signUpSuccess} />
            <Route exact path="/postSuccess" component={postSuccess} />
            <Route exact path="/genre" component={Genre} />
            <Route exact path="/post" component={Post} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            {/* Flexible paths */}
            <Route path="/profile" component={Profile} />
            <Route path="/artPage" component={ArtPage} />
            <Route path="/genresearch" component={GenrePage} />
            <Route path="/search" component={Search} />
          </Switch>
        </div>
      </Router>
    </ArtProvider>
  );
}

export default App;