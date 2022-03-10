import React from "react";
import AlternativeButton from "./AlternativeButton";
import PrimaryButton from "./PrimaryButton";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <div className="logo">Quotastic</div>
      <div className="right-side">
        <PrimaryButton text="Sign up" />
        <AlternativeButton text="Login" />
      </div>
    </div>
  );
};

export default NavBar;
