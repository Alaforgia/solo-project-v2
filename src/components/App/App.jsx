import React, { useEffect, useState } from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import InfoPage from "../InfoPage/InfoPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import CreateRecipe from "../CreateRecipe";
import MyRecipes from "../MyRecipe";
import Details from "../Details";
import Edit from "../Edit";
import Modal from "../Modal";
import Dropdown from "../Dropdown";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <div className="bg-[#f6f9f0] min-h-screen flex flex-col items-center relative ">
        <Dropdown isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        <Nav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        <div className="flex flex-col items-center grow">
          <Switch>
            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
            >
              <UserPage />
            </ProtectedRoute>

            {/* <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute> */}

            <Route exact path="/login">
              {user.id ? (
                // If the user is already logged in,
                // redirect them to your home page
                <Redirect to="/" />
              ) : (
                // Otherwise, show the Login Page
                <LoginPage />
              )}
            </Route>

            <Route exact path="/create-recipe">
              <CreateRecipe />
            </Route>

            <Route exact path="/registration">
              {user.id ? (
                // If the user is already logged in,
                // redirect them to your home page
                <Redirect to="/" />
              ) : (
                // Otherwise, show the Registration Page
                <RegisterPage />
              )}
            </Route>

            <Route exact path="/">
              {user.id ? (
                // If the user is already logged in,
                // redirect them to your home page
                <MyRecipes />
              ) : (
                // Otherwise, show the Login Page
                <Redirect to="/login" />
              )}
            </Route>
            <Route exact path="/details/:id">
              {user.id ? (
                // If the user is already logged in,
                // redirect them to your home page
                <Details />
              ) : (
                // Otherwise, show the Login Page
                <Redirect to="/login" />
              )}
            </Route>
            <Route exact path="/edit/:id">
              {user.id ? (
                // If the user is already logged in,
                // redirect them to your home page
                <Edit />
              ) : (
                // Otherwise, show the Login Page
                <Redirect to="/login" />
              )}
            </Route>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
