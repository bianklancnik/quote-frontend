import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlternativeButton from "../components/common/AlternativeButton";
import Input from "../components/common/Input";
import PrimaryButton from "../components/common/PrimaryButton";

const ProfileSettings = () => {
  //Update profile settings
  const [mail, setMail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  //Update password
  const [currPass, setCurrPass] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");

  const [message, setMessage] = useState<string>("");

  const currPassChange = (password: string) => {
    setCurrPass(password);
  };
  const newPassChange = (password: string) => {
    setNewPass(password);
  };
  const confirmPassChange = (password: string) => {
    setConfirmPass(password);
  };

  const updatePassword = () => {
    if (!currPass || !newPass || !confirmPass) {
      setMessage("Fields must not be empty!");
    } else if (currPass === newPass) {
      setMessage("New password can not be the same as old password!");
    } else if (newPass !== confirmPass) {
      setMessage("Passwords do not match!");
    } else {
      const token = JSON.parse(localStorage.getItem("accessToken") || "{}");

      let password = { newPassword: newPass };

      fetch("http://localhost:5000/auth/me/update-password", {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        }),
        body: JSON.stringify(password),
      })
        .then((res) => {
          if (!res.ok) {
            return res.text().then((text) => {
              throw new Error(text);
            });
          } else {
            setMessage("Password successfully updated!");
            setDefaultSettings(true);
            setChangePass(false);
            setChangePic(false);
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
          setMessage(msg);
        });
    }
  };

  //Page display
  const [defaultSettings, setDefaultSettings] = useState<boolean>(true);
  const [changePass, setChangePass] = useState<boolean>(false);
  const [changePic, setChangePic] = useState<boolean>(false);

  const getUserInformation = () => {
    const token = JSON.parse(localStorage.getItem("accessToken") || "{}");

    fetch("http://localhost:5000/auth/me", {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        const { firstName, lastName, email } = response;
        setMail(email);
        setFirstName(firstName);
        setLastName(lastName);
      });
  };

  useEffect(() => {
    getUserInformation();
  }, []);

  return (
    <div className="pop-up">
      <div className="pop-up-content">
        <div className="h4">
          Profile <span className="font-orange h4">settings.</span>
        </div>
        {defaultSettings && (
          <div className="h6">Change your profile settings</div>
        )}
        {changePass && <div className="h6">Change your password</div>}
        {changePic && <div className="h6">Change your profile photo</div>}
        {defaultSettings && (
          <>
            <div className="width-100">
              <p style={{ marginBottom: "2%" }} className="content">
                Email
              </p>
              <Input
                text=""
                type="text"
                value={mail}
                onValueChange={() => {}}
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
                  text=""
                  type="text"
                  value={firstName}
                  onValueChange={() => {}}
                />
              </div>
              <div style={{ width: "48%" }}>
                <p style={{ marginBottom: "2%" }} className="content">
                  Last name
                </p>
                <Input
                  text=""
                  type="text"
                  value={lastName}
                  onValueChange={() => {}}
                />
              </div>
            </div>
            {message && (
              <div className="content" style={{ textAlign: "center" }}>
                {message}
              </div>
            )}
            <div
              className="gap"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ width: "48%" }}
                onClick={() => {
                  setChangePass(true);
                  setDefaultSettings(false);
                  setChangePic(false);
                  setMessage("");
                }}
              >
                <PrimaryButton text="Change password" />
              </div>
              <div
                style={{ width: "48%" }}
                onClick={() => {
                  setChangePic(true);
                  setDefaultSettings(false);
                  setChangePass(false);
                  setMessage("");
                }}
              >
                <AlternativeButton text="Change profile picture" />
              </div>
            </div>{" "}
          </>
        )}

        {changePass && (
          <>
            <div className="width-100">
              <p style={{ marginBottom: "2%" }} className="content">
                Current password
              </p>
              <Input
                text=""
                type="password"
                value={currPass}
                onValueChange={currPassChange}
              />
            </div>
            <div className="width-100">
              <p style={{ marginBottom: "2%" }} className="content">
                New password
              </p>
              <Input
                text=""
                type="password"
                value={newPass}
                onValueChange={newPassChange}
              />
            </div>
            <div className="width-100">
              <p style={{ marginBottom: "2%" }} className="content">
                Confirm password
              </p>
              <Input
                text=""
                type="password"
                value={confirmPass}
                onValueChange={confirmPassChange}
              />
            </div>
            {message && (
              <div
                className="content"
                style={{ color: "red", textAlign: "center" }}
              >
                {message}
              </div>
            )}
          </>
        )}

        {changePic && (
          <>
            <div
              style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="favicon.ico"
                alt=""
                style={{
                  marginBottom: "1%",
                  width: "50px",
                  height: "50px",
                  filter: "drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.15))",
                  borderRadius: "50%",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PrimaryButton text="Upload new image" />
            </div>
          </>
        )}

        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            alignItems: "center",
            gap: "30px",
          }}
        >
          {defaultSettings && (
            <>
              <div>
                <PrimaryButton text="Submit" />
              </div>
              <Link to="/" className="link">
                <div className="content" style={{ color: "black" }}>
                  Cancel
                </div>
              </Link>
            </>
          )}
          {changePass && (
            <div onClick={updatePassword}>
              <PrimaryButton text="Submit" />
            </div>
          )}
          {changePic && (
            <div>
              <PrimaryButton text="Submit" />
            </div>
          )}
          {(changePass || changePic) && (
            <div
              className="content"
              onClick={() => {
                setDefaultSettings(true);
                setChangePass(false);
                setChangePic(false);
                setMessage("");
              }}
              style={{ cursor: "pointer" }}
            >
              Cancel
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
