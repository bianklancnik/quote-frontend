import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/common/Footer";
import Input from "../components/common/Input";
import NavBar from "../components/common/NavBar";
import PrimaryButton from "../components/common/PrimaryButton";

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  const [error, setError] = useState(false);
  const [eMsg, setEMsg] = useState("");

  const signUp = () => {
    setError(false);
    setEMsg("");
    if (email || firstName || lastName || password || conPassword) {
      let signUpUrl = "http://localhost:5000/auth/signup";
      let signUpData = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        confirmPassword: conPassword,
      };

      fetch(signUpUrl, {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(signUpData),
      })
        .then((res) => {
          if (!res.ok) {
            return res.text().then((text) => {
              setError(true);
              throw new Error(text);
            });
          } else {
            return navigate("/login");
          }
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
  const firstNameChange = (firstName: string) => {
    setFirstName(firstName);
  };
  const lastNameChange = (lastName: string) => {
    setLastName(lastName);
  };
  const passwordChange = (password: string) => {
    setPassword(password);
  };
  const confirmPasswordChange = (conPassword: string) => {
    setConPassword(conPassword);
  };

  return (
    <div className="body">
      <NavBar showSignUp={false} />
      <div className="column-content">
        <div>
          <div className="h4 text-center">
            What is your <span className="font-orange h4">name?</span>
          </div>
          <div className="h6 text-center">
            Your name will appear on quotes and your public profle.
          </div>
        </div>
        <div>
          <img className="user-profile-picture" alt="" />
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
        <div
          style={{
            width: "100%",
            display: "flex",
            flexFlow: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "48%" }}>
            <p style={{ marginBottom: "2%" }} className="content">
              First name
            </p>
            <Input
              text="John"
              type="text"
              value={firstName}
              onValueChange={firstNameChange}
            />
          </div>
          <div style={{ width: "48%" }}>
            <p style={{ marginBottom: "2%" }} className="content">
              Last name
            </p>
            <Input
              text="Scott"
              type="text"
              value={lastName}
              onValueChange={lastNameChange}
            />
          </div>
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
        <div className="width-100">
          <p style={{ marginBottom: "2%" }} className="content">
            Confirm password
          </p>
          <Input
            text=""
            type="password"
            value={conPassword}
            onValueChange={confirmPasswordChange}
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
          <div onClick={signUp}>
            <PrimaryButton text="Sign Up" />
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
          <p>Already have an account?</p>
          <Link to="/login" className="link">
            <p className="font-orange">Sign in</p>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
