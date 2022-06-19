import Footer from "../components/common/Footer";
import Input from "../components/common/Input";
import NavBar from "../components/common/NavBar";
import PrimaryButton from "../components/common/PrimaryButton";

const LogIn = () => {
  return (
    <div className="body">
      <NavBar showSignUp={false} />
      <div className="column-content">
        <div>
          <div className="h4" style={{ textAlign: "center" }}>
            What is your <span className="font-orange">name?</span>
          </div>
          <div className="h6">
            Your name will appear on quotes and your public profle.
          </div>
        </div>
        <div>
          <img className="user-profile-picture" alt="" />
        </div>
        <div style={{ width: "100%" }}>
          <p>Email</p>
          <Input text="example@net.com" type="text" value="" onValueChange="" />
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
            <p>First name</p>
            <Input text="John" type="text" value="" onValueChange="" />
          </div>
          <div style={{ width: "48%" }}>
            <p>Last name</p>
            <Input text="Scott" type="text" value="" onValueChange="" />
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <p>Password</p>
          <Input text="" type="password" value="" onValueChange="" />
        </div>
        <div style={{ width: "100%" }}>
          <p>Confirm password</p>
          <Input text="" type="password" value="" onValueChange="" />
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
          <p className="font-orange">Sign in</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LogIn;
