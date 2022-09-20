import { Link } from "react-router-dom";
import useWindowDimensions from "../hooks/useWindowDimensions";
import AlternativeButton from "./AlternativeButton";
import PrimaryButton from "./PrimaryButton";
import { slide as Menu } from "react-burger-menu";
import { MdArrowForwardIos } from "react-icons/md";
import { useEffect, useState } from "react";

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
  const { width } = useWindowDimensions();
  const mobile = width! <= 768;
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();

  const getUserInformation = () => {
    if (isLoggedIn) {
      const token = JSON.parse(localStorage.getItem("accessToken") || "{}");

      fetch(`${process.env.REACT_APP_URL}/user/me`, {
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          const { firstName, lastName } = response;
          setFirstName(firstName);
          setLastName(lastName);
        });
    }
  };

  useEffect(() => {
    getUserInformation();
  }, [isLoggedIn]);

  return (
    <>
      {!mobile ? (
        //Desktop navigation bar
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
                to="/settings"
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
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
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
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
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
      ) : (
        //Mobile navigation bar
        <div className={`nav-bar-mobile`}>
          {isLoggedIn ? (
            <Menu>
              <div className="right-side-logged-in-mobile">
                <div className="burger-link">
                  <Link
                    to="/profile"
                    className="link"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
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
                  <div style={{ color: "black", marginRight: "25%" }}>
                    <Link
                      to="/profile"
                      className="link pointer"
                      style={{ color: "black" }}
                    >
                      {firstName} {lastName}
                    </Link>
                  </div>
                </div>
                <div className="burger-link">
                  <Link to="/" className="link h6" style={{ color: "black" }}>
                    Home
                  </Link>
                  <Link to="/">
                    <MdArrowForwardIos color="black" />
                  </Link>
                </div>
                <div className="burger-link">
                  <Link
                    to="/settings"
                    className="link h6"
                    style={{ color: "black" }}
                  >
                    Settings
                  </Link>
                  <Link to="/settings">
                    <MdArrowForwardIos color="black" />
                  </Link>
                </div>
                <div
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                  className="font-orange burger-link"
                >
                  <div className="h6 pointer">Logout</div>
                  <MdArrowForwardIos
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                    }}
                    className="pointer"
                  />
                </div>
              </div>
            </Menu>
          ) : (
            <>
              <Menu>
                <div className="right-side">
                  <div className="burger-link">
                    <Link to="/" className="link h6" style={{ color: "black" }}>
                      Home
                    </Link>
                    <Link to="/">
                      <MdArrowForwardIos color="black" />
                    </Link>
                  </div>
                  {showSignUp && (
                    <div style={{ marginTop: "10%" }}>
                      <Link to="/signup" className="link">
                        <PrimaryButton text="Sign up" />
                      </Link>
                    </div>
                  )}
                  {showLogIn && (
                    <div style={{ marginTop: "5%" }}>
                      <Link to="/login" className="link">
                        <AlternativeButton text="Login" />
                      </Link>
                    </div>
                  )}
                </div>
              </Menu>
              <div></div>
            </>
          )}
          <div className="quotes-logo-mobile">
            <Link to="/" className="link">
              <img src="quotesNav.png" alt="" />
            </Link>
          </div>
          {isLoggedIn ? (
            <div
              className="h6"
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                justifyContent: "right",
                paddingRight: "14%",
              }}
            >
              <img
                style={{ width: "30px", height: "30px" }}
                src="plusSign.png"
                alt=""
                onClick={() => toggleSeen()}
              />
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default NavBar;
