import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/common/Footer";
import Input from "../components/common/Input";
import NavBar from "../components/common/NavBar";
import PrimaryButton from "../components/common/PrimaryButton";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  const emailChange = (email: string) => {
    setEmail(email);
  };
  const firstNameChange = (email: string) => {
    setFirstName(email);
  };
  const lastNameChange = (email: string) => {
    setLastName(email);
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
            What is your <span className="font-orange">name?</span>
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
            type="email"
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
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <PrimaryButton text="Sign Up" />
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
