import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlternativeButton from "../components/common/AlternativeButton";
import Footer from "../components/common/Footer";
import Input from "../components/common/Input";
import NavBar from "../components/common/NavBar";

const LogIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  const [eMsg, setEMsg] = useState("");

  const logIn = () => {
    setError(false);
    setEMsg("");
    if (email && password) {
      let logInUrl = "http://localhost:5000/auth/login";

      let logInData = {
        email: email,
        password: password,
      };

      fetch(logInUrl, {
        method: "post",
        headers: new Headers({
          //Authorization: "bearer " + this.props.authState.accessToken.value,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(logInData),
      })
        .then((res) => {
          if (!res.ok) {
            return res.text().then((text) => {
              setError(true);
              throw new Error(text);
            });
          } else {
            return res.json();
          }
        })
        .then((result) => {
          localStorage.setItem(
            "userToken",
            JSON.stringify(result["accessToken"])
          );
          return navigate("/");
        })
        .catch((err) => {
          const x = JSON.parse(err["message"]);
          let msg;
          if (Array.isArray(x)) {
            msg = x["message" as any].filter(
              (v: any, i: any, a: any) =>
                a.findIndex((v2: any) => v2.id === v.id) === i
            );
          } else msg = x["message"];
          setEMsg(msg);
        });
    } else {
      setError(true);
      setEMsg("Fields must not be empty!");
    }
  };

  const emailChange = (email: string) => {
    setEmail(email);
  };
  const passwordChange = (password: string) => {
    setPassword(password);
  };

  return (
    <div className="body">
      <NavBar showLogIn={false} />
      <div className="column-content">
        <div>
          <div className="h4 text-center" style={{ marginBottom: "2%" }}>
            Welcome <span className="font-orange">back!</span>
          </div>
          <div className="h6 text-center" style={{ marginBottom: "4%" }}>
            Thank you for coming back. Hope you have a good day and inspire
            others.
          </div>
        </div>
        <div className="width-100">
          <p style={{ marginBottom: "2%" }} className="content">
            Email
          </p>
          <Input
            text="example@net.com"
            type="text"
            value={email}
            onValueChange={emailChange}
          />
        </div>
        <div className="width-100">
          <p style={{ marginBottom: "2%" }} className="content">
            Password
          </p>
          <Input
            text=""
            type="password"
            value={password}
            onValueChange={passwordChange}
          />
        </div>
        {error && (
          <div
            className="content"
            style={{ color: "red", textAlign: "center" }}
          >
            {eMsg}
          </div>
        )}
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div onClick={logIn}>
            <AlternativeButton text="Log In" />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexFlow: "row",
            justifyContent: "space-between",
          }}
        >
          <p>Don't have an account?</p>
          <Link to="/signup" className="link">
            <p className="font-orange">Sign up</p>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LogIn;
