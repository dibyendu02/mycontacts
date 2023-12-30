import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import user from "../user-avatar.png"
import { CiMenuKebab } from "react-icons/ci";
import {useNavigate} from "react-router-dom";


const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  const cookies = new Cookies();
  const token = cookies.get("TOKEN");

  const navigate = useNavigate();

  if (!token) console.log("no token provided");

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/contacts", {
        headers: {
          Auth: `Bearer ${token}`,
        },
      });

      setContacts(response.data);
    } catch (error) {
      console.error("data fetching failed:", error.message);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);
  return (
    <div className="flex flex-col gap-5 items-center">
      <h1 className="font-bold text-xl">Contact List</h1>
      <div className="flex flex-col gap-5">
        {contacts.map((contact) => (
          <div key={contact._id} className="flex justify-around items-center gap-10 bg-slate-200 w-[80vw] p-2 rounded-md">
            <img src={user}/>
            <div>
                <h1 className="font-bold">{contact.name}</h1>
                <p>{contact.phone}</p>
            </div>
            <button 
            onClick={() => {
                navigate(contact._id);
              }}
            >
                <CiMenuKebab/>
            </button>
            
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
