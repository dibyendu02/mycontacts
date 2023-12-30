import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import user from "../user-avatar.png"
import { URL } from '../App';

const SingleContact = () => {
    const [contact, setContact] = useState([]);
    const { id } = useParams();

    const cookies = new Cookies();
    const token = cookies.get("TOKEN");

    const fetchContact = async () => {
        try {
          const response = await axios.get(URL+`contacts/${id}`, {
            headers: {
              Auth: `Bearer ${token}`,
            },
          });
          setContact(response.data);
        } catch (error) {
          console.error("data fetching failed:", error.message);
        }
      };

    useEffect(() => {
        fetchContact();
      }, []);
  return (
    <div className="flex flex-col justify-center items-center gap-10">
        <img src={user} width="150px" />
        <div className=' text-xl flex flex-col items-center'>
            <h1>Name : {contact.name}</h1>
            <h1>Phone : {contact.phone}</h1>
            <h1>Email : {contact.email}</h1>
        </div>
    </div>
  )
}

export default SingleContact