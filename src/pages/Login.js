import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { URL } from "../App";
import Layout from "../components/Layout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();
  const navigate = useNavigate();

  const userLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(URL + "user/login", {
        email,
        password,
      });
      cookies.set("TOKEN", response.data.token, {
        path: "/",
      });

      console.log("Login successful.");

      navigate("/contacts");

      //for updating the token
      window.location.reload();
    } catch (error) {
      alert("login failed");
      console.error("Login failed:", error.message);
    }
  };

  return (
    <Layout>
      <div className="bg-black w-full flex justify-center pt-20">
        <div className="bg-gray-100 w-80 h-full flex flex-col gap-5 items-center p-10 top-32 rounded-md">
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
            className="bg-slate-300 hover:bg-slate-500 hover:text-white p-2 px-4 rounded-md"
            onClick={userLogin}
          >
            Login
          </button>
          <Link to="/signup">
            <button className="py-1 px-3 border border-black hover:bg-white rounded-md">
              Register
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
