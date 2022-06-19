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
        <Link to="/" className="link">
          <img src="quotesNav.png" alt="" />
        </Link>
      </div>
      <div className="right-side">
        {showLogIn && (
          <Link to="/login" className="link">
            <AlternativeButton text="Login" />
          </Link>
        )}
        {showSignUp && (
          <Link to="/signup" className="link">
            <PrimaryButton text="Sign up" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
