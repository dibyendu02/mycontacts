import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import user from "../user-avatar.png";
import { URL } from "../App";
import { FaWhatsapp } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import Layout from "../components/Layout";

const SingleContact = () => {
  const [contact, setContact] = useState([]);
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);

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
  const openWhatsapp = () => {
    var whatsappURL = "https://wa.me/" + contact.phone;
    window.open(whatsappURL, "_blank");
  };

  useEffect(() => {
    fetchContact();
  }, []);
  return (
    <Layout>
      <div className="flex flex-col items-center gap-5 bg-black w-96 ">
        <div className="bg-white p-12 rounded-md">
          <img src={user} width="150px" />
        </div>
        <div className=" text-xl flex flex-col items-center text-white">
          <h1 className="font-bold">{contact.name}</h1>
          <h1>Phone : {contact.phone}</h1>
          <h1>Email : {contact.email}</h1>
        </div>
        <div className="flex gap-5">
          <button className="bg-slate-200 px-10 py-3 rounded-md text-md">
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
    </Layout>
  );
};

export default SingleContact;
