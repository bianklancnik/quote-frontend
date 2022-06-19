import React from "react";
import { Link } from "react-router-dom";
import AlternativeButton from "./AlternativeButton";
import PrimaryButton from "./PrimaryButton";

type NavBarProps = {
  showSignUp?: boolean;
  showLogIn?: boolean;
};

const NavBar = ({ showSignUp = true, showLogIn = true }: NavBarProps) => {
  return (
    <div className="nav-bar">
      <div className="logo">
        <img src="quotesNav.png" alt="" />
      </div>
      <div className="right-side">
        {showSignUp && (
          <Link to="/signup" className="link">
            <PrimaryButton text="Sign up" />
          </Link>
        )}
        {showLogIn && (
          <Link to="/" className="link">
            <AlternativeButton text="Login" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
