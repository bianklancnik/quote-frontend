import { Link } from "react-router-dom";
import AlternativeButton from "./AlternativeButton";
import PrimaryButton from "./PrimaryButton";

type NavBarProps = {
  showSignUp?: boolean;
  showLogIn?: boolean;
  toggleSeen?: any;
  orange?: boolean;
};

const NavBar = ({
  showSignUp = true,
  showLogIn = true,
  toggleSeen,
  orange,
}: NavBarProps) => {
  const isLoggedIn = localStorage.getItem("accessToken");
  return (
    <div className={`nav-bar ${orange && "nav-bar-orange"}`}>
      <div className="logo">
        <Link to="/" className="link">
          <img
            src={`${orange ? "quotesNavWhite.png" : "quotesNav.png"}`}
            alt=""
          />
        </Link>
      </div>
      {isLoggedIn ? (
        <div className="right-side-logged-in">
          <Link
            to="/"
            className={`link h6 ${orange ? "font-white" : "font-orange"}`}
          >
            Home
          </Link>
          <Link
            to=""
            className={`link h6 ${orange ? "font-white" : "font-orange"}`}
          >
            Settings
          </Link>
          <div
            className="h6 pointer"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Logout
          </div>
          <Link
            to="/profile"
            className="link"
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <img
              src="favicon.ico"
              style={{
                width: "30px",
                height: "30px",
                filter: "drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.15))",
                borderRadius: "50%",
              }}
              alt=""
            />
          </Link>
          <div
            className="h6"
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => toggleSeen()}
          >
            <img
              style={{ width: "30px", height: "30px" }}
              src="plusSign.png"
              alt=""
            />
          </div>
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
