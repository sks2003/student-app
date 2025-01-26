import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  // const apiUrl = process.env.REACT_APP_API_URL;
  // console.log(apiUrl);

  const getPasswords = async () => {
    let req = await fetch(import.meta.env.VITE_API_URL);
    let passwords = await req.json();
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const savePassword = async () => {
    let c = confirm(
      "Are you sure to add this subject , with correct credentials ?"
    );
    if (c) {
      if (form.site.length > 0 && form.username.length > 0) {
        let req = await fetch(import.meta.env.VITE_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, id: uuidv4() }),
        });
        //let req = await fetch("http://localhost:3000/");
        let passwords = await req.json();
        //console.log(passwords);
        setPasswordArray(passwords);

        // Otherwise clear the form and show toast
        setform({ site: "", username: "", password: "" });
        toast.success("Subject Saved!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log(passwordArray);
      } else {
        toast.info("not valid entry!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const deletePassword = async (id, site) => {
    //console.log("Deleting password with id ", id);
    let c = confirm("Do you really want to delete this subject?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));

      await fetch(import.meta.env.VITE_API_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, site }),
      });

      toast.info("Subject deleted !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // const editPassword = async (id, site) => {
  //   // console.log(passwordArray);
  //   console.log(id);
  //   setform({ ...passwordArray.filter((i) => i.id === id)[0], id: id });
  //   setPasswordArray(passwordArray.filter((item) => item.id !== id));
  //   let req = await fetch("http://localhost:3000/", {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ id, site }),
  //   });
  //   // let temp = await req.json();
  //   // console.log(temp);
  // };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
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
      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div> */}
      <div className=" p-2 md:mycontainer min-h-[88.2vh]">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-500"> &lt;</span>

          <span>Mark</span>
          <span className="text-green-500">IT/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Attendence Marker
        </p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter subject code"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter subject name"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Subjects</h2>
          {passwordArray.length === 0 && <div> No subjects to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Subject code</th>
                  <th className="py-2">Subject name</th>
                  <th className="py-2"></th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center">
                        {item.site}
                      </td>
                      <td className="py-2 border border-white text-center">
                        {item.username}
                      </td>
                      {/* <td className="py-2 border border-white text-center">
                        {item.password}
                      </td> */}
                      <td className="py-2 border border-white text-center ">
                        <Link to={`/${item.site}`}>
                          <li className="text-blue-500">
                            <span className="text-green-500">Expand</span>
                          </li>
                        </Link>
                      </td>
                      <td className="justify-center py-2 border border-white text-center">
                        {/* <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(item.id, item.site);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span> */}
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item.id, item.site);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
