import React from "react";
import { handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged out");
    setTimeout(() => {
      setIsAuthenticated(false);
      navigate("/login");
    }, 1000);
  };
  return (
    <nav className="bg-slate-800 text-white w-full">
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold flex justify-between items-center text-white text-2xl">
          <span className="text-green-500"> &lt;</span>
          <span>Mark</span>
          <span className="text-green-500">IT/&gt;</span>
        </div>
        {/* <ul>
                    <li className='flex gap-4 '>
                        <a className='hover:font-bold' href='/'>Home</a>
                        <a className='hover:font-bold' href='#'>About</a>
                        <a className='hover:font-bold' href='#'>Contact</a>
                    </li>
                </ul> */}
        <div className="flex flex-col md:flex-row gap-4">
          <button className="text-white bg-green-700 hover:bg-green-900 my-5 mx-2 rounded-full justify-between items-center ring-white ring-1">
            <a className="flex-row font-bold px-2" href="/">
              Home
            </a>
          </button>
          <button className="text-white bg-green-700 hover:bg-green-900 my-5 mx-2 rounded-full flex  justify-between items-center ring-white ring-1">
            <img
              className="invert  w-12 p-2"
              src="/icons/github.png"
              alt="github logo"
            />
            <span className="font-bold px-10 md:px-2">
              <a
                href="https://github.com/sks2003?tab=repositories"
                target="_blank"
              >
                GitHub
              </a>
            </span>
          </button>
          <button
            onClick={() => {
              handleLogout();
            }}
            className="bg-purple-600 text-white hover:bg-purple-800 my-5 mx-2 font-bold px-2 rounded-full justify-between items-center ring-white ring-1"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
