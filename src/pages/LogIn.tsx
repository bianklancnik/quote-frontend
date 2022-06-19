import { useState } from "react";
import { Link } from "react-router-dom";
import AlternativeButton from "../components/common/AlternativeButton";
import Footer from "../components/common/Footer";
import Input from "../components/common/Input";
import NavBar from "../components/common/NavBar";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <AlternativeButton text="Log In" />
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
