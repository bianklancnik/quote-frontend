import { Navigate, Outlet, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";

type ProtectedRouteType = {
  user: any;
  redirectPath: any;
};

const ProtectedRoute = ({ user, redirectPath = "/" }: ProtectedRouteType) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<LogIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
