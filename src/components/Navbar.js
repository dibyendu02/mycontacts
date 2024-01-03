import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const cookies = new Cookies();
  let token = cookies.get("TOKEN");

  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef(null);
  useEffect(() => {
    // Function to handle clicks outside the div
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        // Clicked outside the div
        setIsOpen(false);
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const logout = () => {
    // Destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    console.log("Logout successful");
    // Force a refresh or re-render to reflect the logout state
    window.location.reload();
  };
  return (
    <nav className="flex justify-between items-center w-96 py-10 px-5  text-white ">
      <div>
        <Link to="/"><h1 className="font-bold text-2xl ">Keeper</h1></Link>
      </div>
      <div className="relative">
        <RxHamburgerMenu
          onClick={() => {
            
            setIsOpen(isOpen ? false : true);
            // console.log(isOpen);
          }}
          size={24}
        />
        {isOpen && (
          <ul ref={ref} className="flex flex-col items-center gap-5 w-28 py-5 absolute right-0 top-8 rounded-md text-black font-bold bg-slate-300 z-10 ">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contacts">Contacts</Link>
            </li>
            {!token && (
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            )}
            {token ? (
              <button onClick={logout}>Logout</button>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
