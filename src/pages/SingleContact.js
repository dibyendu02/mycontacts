import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import user from "../user.jpg";
import { URL } from "../App";
import { FaWhatsapp } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import Layout from "../components/Layout";

const SingleContact = () => {
  const [contact, setContact] = useState([]);
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("+91");
  const [phone, setPhone] = useState("");

    

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  //outside button click handle to close dialouge box
  const ref = useRef(null);
  useEffect(() => {
    // Function to handle clicks outside the div
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        // Clicked outside the div
        setIsUpdateOpen(false);
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

  const fetchContact = async () => {
    try {
      const response = await axios.get(URL + `contacts/${id}`, {
        headers: {
          Auth: `Bearer ${token}`,
        },
      });
      setContact(response.data);

      setName(contact?.name);
      setEmail(contact?.email);
      
      //needs to check this code
      // if (contact?.phone) {
      //   setPhone(contact.phone.slice(3));
      // } else {
      //   setPhone('');
      // }
    } catch (error) {
      console.error("data fetching failed:", error.message);
    }
  };
  const deleteContact = async () => {
    try {
      const response = await axios.delete(URL + `contacts/${id}`, {
        headers: {
          Auth: `Bearer ${token}`,
        },
      });

      navigate("/contacts");
    } catch (error) {
      console.error("deleting failed:", error.message);
    }
  };

  const updateContact = async(e) => {
    e.preventDefault();

    try {
      if (!name || !email || !phone) {
        alert("Please fill in all fields");
        return;
      }
      const completePhone = code + phone;

      const response = await axios.put(
        URL + `contacts/${id}`,
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

      fetchContact();

      setName("");
      setEmail("");
      setCode("+91");
      setPhone("");

      setIsUpdateOpen(false);
    } catch (error) {
      console.error("User update failed:", error.message);

    }
  }

  const openWhatsapp = () => {
    var whatsappURL = "https://wa.me/" + contact.phone;
    window.open(whatsappURL, "_blank");
  };

  useEffect(() => {
    fetchContact();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center gap-5 w-96 p-5 ">
        <div className="bg-white p-12 rounded-md">
          <img src={user} width="150px" />
        </div>
        <div className=" text-xl flex flex-col items-center text-white">
          <h1 className="font-bold">{contact.name}</h1>
          <h1>Phone : {contact.phone}</h1>
          <h1>Email : {contact.email}</h1>
        </div>
        <div className="flex gap-5">
          <button
          onClick={() => {
            setIsUpdateOpen(true);
          }}
          className="bg-slate-200 px-10 py-3 rounded-md text-md">
            Update
          </button>
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="bg-slate-200 px-10 py-3 rounded-md text-md"
          >
            Delete
          </button>
        </div>
        <div className="flex flex-col gap-5">
          <div
            onClick={openWhatsapp}
            className="bg-green-600 text-white w-80 p-3 flex justify-center items-center gap-2 rounded-md "
          >
            <FaWhatsapp size={20} />
            <h1>Whatsapp</h1>
          </div>
          <a
            href={`tel:${contact.phone}`}
            className="bg-red-600 text-white w-80 p-3 flex justify-center items-center gap-2 rounded-md "
          >
            <IoCall size={20} />
            <h1>Call</h1>
          </a>
        </div>

        {isOpen && (
          <div className="flex flex-col justify-center items-center gap-5 bg-slate-200 w-80 h-[20%] p-2 absolute top-60 rounded-md ">
            <p>Are you sure, you want to delete {contact.name} ?</p>
            <div className="flex gap-5">
              <button
                onClick={deleteContact}
                className="bg-black text-white p-2"
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
                className="bg-black text-white p-2"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      {isUpdateOpen && (
          <div
            ref={ref}
            className="bg-slate-200 absolute flex flex-col gap-5 items-center w-80 top-40 p-5 rounded-md"
          >
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="name"
              value={name}
              className="w-[90%] h-14 rounded-md p-2"
            />
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="email"
              value={email}
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
                value={phone}
                className="w-[90%] h-14 rounded-md p-2"
              />
            </div>

            <button
              onClick={updateContact}
              className="bg-black hover:bg-slate-500 text-white w-[50%] h-12 rounded-md "
            >
              Update
            </button>
          </div>
        )}
    </Layout>
  );
};

export default SingleContact;
