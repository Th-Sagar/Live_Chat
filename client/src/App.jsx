import Dashboard from "./modules/Dashboard";
import Form from "./modules/Form";
import { Routes, Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, auth = false }) => {
  const isLoggedin = localStorage.getItem("user:token") !== null || false;

  if (!isLoggedin && auth) {
    return <Navigate to={"/users/sign_in"} />;
  } else if (
    isLoggedin &&
    ["/users/sign_in", "/users/sign_up"].includes(window.location.pathname)
  ) {
    return <Navigate to={"/"} />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute auth={true}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/sign_in"
        element={
          <ProtectedRoute>
            <Form isSigninPage={true} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/sign_up"
        element={
          <ProtectedRoute>
            <Form isSigninPage={false} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
