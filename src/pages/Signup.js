import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../App";
import Layout from "../components/Layout";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const userRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(URL + "user/register", {
        username,
        email,
        password,
      });

      console.log(response.data);
      console.log("Registration successful.");

      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };
  return (
    <Layout>
      <div className="bg-black w-full flex justify-center ">
        <div className="bg-gray-100 w-80 h-full flex flex-col gap-5 items-center p-10 top-32 rounded-md">
          <input
            className="text-black w-full p-2 rounded border border-black"
            placeholder="username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            className="text-black w-full p-2 rounded border border-black"
            placeholder="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            className="text-black w-full p-2 rounded border border-black"
            placeholder="password"
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button
            className="bg-slate-300 hover:bg-slate-400 hover:text-white p-2 px-4 rounded-md"
            onClick={userRegister}
          >
            Register
          </button>
          <Link to="/login">
            <button className="py-1 px-3 hover:bg-white rounded-md border border-black">
              Login
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
