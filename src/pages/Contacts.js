import React, { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import user from "../user.jpg";
import { CiMenuKebab } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { URL } from "../App";
import Layout from "../components/Layout";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("+91");
  const [phone, setPhone] = useState("");

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

  const cookies = new Cookies();
  const token = cookies.get("TOKEN");

  const navigate = useNavigate();

  if (!token) console.log("no token provided");

  const fetchContacts = async () => {
    try {
      const response = await axios.get(URL + "contacts", {
        headers: {
          Auth: `Bearer ${token}`,
        },
      });

      setContacts(response.data);
    } catch (error) {
      console.error("data fetching failed:", error.message);
    }
  };

  const createContact = async (e) => {
    e.preventDefault();

    try {
      if (!name || !email || !phone) {
        alert("Please fill in all fields");
        return;
      }
      const completePhone = code + phone;

      const response = await axios.post(
        URL + "contacts",
        {
          name,
          email,
          phone: completePhone,
        },
        {
          headers: {
            Auth: `Bearer ${token}`,
          },
        }
      );

      fetchContacts();

      setName("");
      setEmail("");
      setCode("+91");
      setPhone("");

      setIsOpen(false);
    } catch (error) {
      console.error("User creation failed:", error.message);

      console.log(error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);
  return (
    <Layout>
      <div className="w-96 flex flex-col gap-5 items-center">
        <h1 className="font-bold text-xl text-white">Contact List</h1>
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className="bg-slate-200 w-[80%] h-14 rounded-md "
        >
          + Create Contact
        </button>

        <div className="flex flex-col gap-5 w-[80%] ">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="flex  items-center gap-10 bg-slate-200 p-2 rounded-md"
            >
              <div>
                <img src={user} width={50} style={{borderRadius: "50%"}} />
              </div>
              <div className="flex justify-between w-[70%] ">
                <div>
                  <h1 className="font-bold">{contact.name}</h1>
                  <p>{contact.phone}</p>
                </div>
                <button
                  onClick={() => {
                    navigate(contact._id);
                  }}
                >
                  <CiMenuKebab />
                </button>
              </div>
            </div>
          ))}
        </div>

        {isOpen && (
          <div
            ref={ref}
            className="bg-slate-200 absolute flex flex-col gap-5 items-center w-80 top-40 p-5 rounded-md"
          >
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="name"
              className="w-[90%] h-14 rounded-md p-2"
            />
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="email"
              className="w-[90%] h-14 rounded-md p-2"
            />
            <div className="w-[90%] flex gap-2">
              <input
                onChange={(e) => {
                  setCode(e.target.value);
                }}
                value={code}
                placeholder="code"
                className="w-14 h-14 rounded-md p-2"
              />
              <input
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                placeholder="phone"
                className="w-[90%] h-14 rounded-md p-2"
              />
            </div>

            <button
              onClick={createContact}
              className="bg-black hover:bg-slate-500 text-white w-[50%] h-12 rounded-md "
            >
              Create
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Contacts;
