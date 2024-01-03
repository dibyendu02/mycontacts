import logo from "./logo.svg";
import "./App.css";
import { Outlet, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Contacts from "./pages/Contacts";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import SingleContact from "./pages/SingleContact";

const cookies = new Cookies();

export const URL = "https://mycontacts-api-42d8.onrender.com" + "/api/";

function App() {
  let token = cookies.get("TOKEN");
  useEffect(() => {
    token = cookies.get("TOKEN");
    
  }, []);
  
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="contacts" element={token ? <Contacts /> : <Navigate to="/login" />}/>
        <Route path="contacts/:id" element={<SingleContact/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
