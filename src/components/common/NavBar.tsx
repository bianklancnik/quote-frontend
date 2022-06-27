import React from "react";
import { Link } from "react-router-dom";
import AlternativeButton from "./AlternativeButton";
import PrimaryButton from "./PrimaryButton";

type NavBarProps = {
  showSignUp?: boolean;
  showLogIn?: boolean;
};

const NavBar = ({ showSignUp = true, showLogIn = true }: NavBarProps) => {
  const isLoggedIn = localStorage.getItem("accessToken");
  return (
    <div className="nav-bar">
      <div className="logo">
        <Link to="/" className="link">
          <img src="quotesNav.png" alt="" />
        </Link>
      </div>
      {isLoggedIn ? (
        <div className="right-side-logged-in">
          <Link to="/" className="link font-orange h6">
            Home
          </Link>
          <Link to="" className="link font-orange h6">
            Settings
          </Link>
          <div
            className="font-orange h6 pointer"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Logout
          </div>
          <img
            src="favicon.ico"
            style={{
              width: "26px",
              height: "26px",
              filter: "drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.15))",
              borderRadius: "50%",
            }}
            alt=""
          />
          <Link
            to=""
            className="link font-orange h6"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img src="plusSign.png" alt="" />
          </Link>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default NavBar;
