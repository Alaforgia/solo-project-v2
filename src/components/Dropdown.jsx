import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "./LogOutButton/LogOutButton";
import { useSelector } from "react-redux";

function Dropdown({ isNavOpen, setIsNavOpen }) {
  const user = useSelector((store) => store.user);

  const onClickHandler = () => {
    setIsNavOpen(false);
  };

  return (
    <div
      className={`absolute ${
        isNavOpen ? "top-0" : "top-minus-full"
      } left-0 w-full min-h-screen bg-black transition-all duration-300`}
    >
      <nav className="flex flex-col items-center justify-center min-h-screen w-full">
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link onClick={onClickHandler} className="text-[#f9f6f0] text-center pb-[24px]" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link onClick={onClickHandler} className="text-[#f9f6f0] text-center pb-[24px]" to="/user">
              Account
            </Link>
          </>
        )}
        {user.id && (
          <>
            <Link onClick={onClickHandler} className="text-[#f9f6f0] text-center pb-[24px]" to="/create-recipe">
              Create Recipe
            </Link>
          </>
        )}
        {user.id && (
          <>
            <Link onClick={onClickHandler} className="text-[#f9f6f0] text-center pb-[24px]" to="/">
              My Recipes
            </Link>

            <LogOutButton className="text-[#f9f6f0] text-center pb-[24px]" to="/login" />
          </>
        )}

        <Link onClick={onClickHandler} className="text-[#f9f6f0] text-center pb-[24px]" to="/about">
          About
        </Link>
      </nav>
    </div>
  );
}

export default Dropdown;
