import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";
import AnimatedHamburgerButton from "../Hamburger/AnimatedHamburgerButton";

function Nav({ isNavOpen, setIsNavOpen }) {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav w-full">
      <Link to="/">
        <h2 className=" font-oswald text-black pl-5 text-2xl">Whose Recipe Is It Anyways?</h2>
      </Link>
      <div className="mainNavLinks">
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Account
            </Link>
          </>
        )}
        {user.id && (
          <>
            <Link className="navLink" to="/create-recipe">
              Create Recipe
            </Link>
          </>
        )}
        {user.id && (
          <>
            <Link className="navLink" to="/">
              My Recipes
            </Link>

            <LogOutButton className="navLink" to="/login" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
      <AnimatedHamburgerButton isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
    </div>
  );
}

export default Nav;
