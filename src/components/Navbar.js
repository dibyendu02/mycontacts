import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const Navbar = () => {
  const cookies = new Cookies();
  let token = cookies.get("TOKEN");

  const logout = () => {
    // Destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    console.log("Logout successful");
    // Force a refresh or re-render to reflect the logout state
    window.location.reload();
  };
  return (
    <nav className="flex flex-col justify-between px-10 py-5 ">
      <div>
        <h1 className="font-bold text-xl ">My Contacts</h1>
      </div>

      <ul className="flex gap-5 ">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contacts">Contacts</Link>
        </li>
        {!token && <li>
          <Link to="/signup">Signup</Link>
        </li>}
        {token ?
        <button onClick={logout}>Logout</button> :
        <li>
          <Link to="/login">Login</Link>
        </li>}
      </ul>
    </nav>
  );
};

export default Navbar;
