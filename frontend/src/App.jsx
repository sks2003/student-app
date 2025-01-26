import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Courses from "./components/Courses";
import Signup from "./components/Signup";
import Logout from "./components/Logout";

function AuthWrapper({ children, isAuthenticated }) {
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      isAuthenticated(true);
    } else {
      isAuthenticated(false);
    }
  }, [token]);
  return children;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" />,
    },
    {
      path: "/home",
      element: isAuthenticated ? (
        <>
          <Navbar setIsAuthenticated={setIsAuthenticated} />
          <div className="bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
            <div className="bg-blue-700 text-white">Home</div>
            <Manager />
          </div>
          <Footer />
        </>
      ) : (
        <Navigate to="/login" />
      ),
    },
    {
      path: "/:slug",
      element: isAuthenticated ? (
        <>
          <Navbar setIsAuthenticated={setIsAuthenticated} />
          <div className="bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
            <div className="bg-red-700 text-white">Student List</div>
            <Courses />
          </div>
          <Footer />
        </>
      ) : (
        <Navigate to="/login" />
      ),
    },
    {
      path: "/login",
      element: !isAuthenticated ? (
        <>
          <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
            <Login setIsAuthenticated={setIsAuthenticated} />
          </div>
        </>
      ) : (
        <Navigate to="/home" />
      ),
    },
    {
      path: "/signup",
      element: !isAuthenticated ? (
        <>
          <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
            <Signup />
          </div>
        </>
      ) : (
        <Navigate to="/home" />
      ),
    },
  ]);

  return (
    <AuthWrapper isAuthenticated={setIsAuthenticated}>
      <RouterProvider router={router} />
    </AuthWrapper>
  );
}

export default App;
