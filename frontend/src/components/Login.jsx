import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function Login({ setIsAuthenticated }) {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      handleError("Please enter email/password");
    } else {
      try {
        const url = `${import.meta.env.VITE_API_URL}/auth/login`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginInfo),
        });
        const result = await response.json();
        const { success, message, jwtToken, name, error } = result;

        if (success) {
          handleSuccess(message);
          localStorage.setItem("token", jwtToken);
          localStorage.setItem("loggedInUser", name);
          setTimeout(() => {
            setIsAuthenticated(true);
          }, 1000); // Navigate immediately after success
        } else if (error) {
          const details = error?.details[0].message;
          handleError(details);
        } else if (!success) {
          handleError(message);
        }
      } catch (err) {
        handleError(err);
      }
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl mb-5">Login</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-lg">
                Email
              </label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Enter your email..."
                value={loginInfo.email}
                className="w-full text-lg p-2 border-b border-black focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-lg">
                Password
              </label>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="Enter your password..."
                value={loginInfo.password}
                className="w-full text-lg p-2 border-b border-black focus:outline-none"
              />
            </div>
            <button className="bg-purple-600 text-white text-lg py-2 px-4 rounded-md mt-3 hover:bg-purple-700">
              Login
            </button>
            <span className="text-sm mt-2">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-purple-600">
                Signup
              </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
