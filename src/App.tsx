import { useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";
import ProfileSettings from "./pages/ProfileSettings";
import SignUp from "./pages/SignUp";

type ProtectedRouteType = {
  user: any;
  redirectPath?: any;
};

const ProtectedRoute = ({ user, redirectPath = "/" }: ProtectedRouteType) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

function App() {
  const [user, setUser] = useState(localStorage.getItem("accessToken"));

  const onLogIn = () => {
    setUser(localStorage.getItem("accessToken") || "{}");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route element={<ProtectedRoute user={!user} />}>
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<LogIn onLogIn={onLogIn} />} />
          </Route>
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
