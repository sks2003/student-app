import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Courses = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", attendence: 0 });
  const [passwordArray, setPasswordArray] = useState([]);
  //const [att, setatt] = useState(0);

  const getPasswords = async () => {
    let req = await fetch(`${import.meta.env.VITE_API_URL}/${slug}`);
    let passwords = await req.json();
    setPasswordArray(passwords);
    //console.log(passwords);
  };

  const { slug } = useParams();

  useEffect(() => {
    getPasswords();
  }, []);

  const increase = async (id) => {
    //console.log("clicked", id);
    setPasswordArray(
      passwordArray.map((item) =>
        item.id === id ? { ...item, attendence: item.attendence + 1 } : item
      )
    );
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/${slug}/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ increment: 1 }),
      }
    );
    const res = await response.json();
    //console.log(res);
  };

  const decrease = async (id) => {
    setPasswordArray(
      passwordArray.map((item) =>
        item.id === id ? { ...item, attendence: item.attendence - 1 } : item
      )
    );
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/${slug}/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ increment: -1 }),
      }
    );
    const res = await response.json();
    //console.log(res);
  };

  const savePassword = async () => {
    //console.log(att);
    if (form.site.length > 0 && form.username.length > 0) {
      let req = await fetch(`${import.meta.env.VITE_API_URL}/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });
      let passwords = await req.json();
      //console.log(passwords);
      setPasswordArray(passwords);

      // Otherwise clear the form and show toast
      setform({ site: "", username: "", attendence: 0 });
      toast.success("Student info Saved!", {
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
  };

  const deletePassword = async (id) => {
    //console.log("Deleting password with id ", id);
    let c = confirm("Do you really want to delete this student profile?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));

      await fetch(`${import.meta.env.VITE_API_URL}/${slug}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      toast.info("Student info deleted !", {
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

  const editPassword = async (item, id) => {
    setform({ ...passwordArray.filter((i) => i.id === id)[0], id: id });
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
    let req = await fetch(`${import.meta.env.VITE_API_URL}/${slug}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  };

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
          Your own Attendence Manager
        </p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Roll number"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Name"
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
          <h2 className="font-bold text-2xl py-4">Students List</h2>
          {passwordArray.length === 0 && <div> No students to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Roll.No</th>
                  <th className="py-2">Name</th>
                  <th className="py-2">Attendence</th>
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
                      <td className="py-2 border border-white text-center">
                        <button
                          onClick={() => {
                            decrease(item.id);
                          }}
                          type="button"
                          className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        >
                          -
                        </button>
                        {item.attendence}{" "}
                        <button
                          onClick={() => {
                            increase(item.id);
                          }}
                          type="button"
                          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                          +
                        </button>
                      </td>
                      <td className="justify-center py-2 border border-white text-center">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(item, item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item.id);
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

export default Courses;
