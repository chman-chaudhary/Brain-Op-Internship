import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios"

function Navbar() {

    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [btnText, setBtnText] = useState("Login");

    useEffect(() => {
        if (cookies.token && cookies.token !== "") {
            setBtnText("Logout");
        } else {
            setBtnText("Login");
        }
    }, [])

    const handleClick = async () => {
        if (cookies.token === "" || !cookies.token) {
            navigate("/login");
            setBtnText("Login");
        } else {
            console.log("For logout");
            let response = await axios.get("http://localhost:3000/logout", { withCredentials: true });
            if (response.data.success) {
                setBtnText("Login");
            }
            window.location.reload();
        }
    }


    return (
        <div className='text-white bg-[rgba(0,0,0,0.1)] min-h-fit w-full flex justify-between items-center uppercase text-2xl px-10 py-3 fixed z-10 backdrop-blur-md'>
            <div><Link to="/"><span>food store</span></Link></div>

            <button
                className="overflow-hidden w-32 p-2 h-12 bg-white text-black border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group">{btnText}
                <span
                    className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"
                ></span>
                <span
                    className="absolute w-36 h-32 -top-8 -left-2 bg-indigo-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"
                ></span>
                <span
                    className="absolute w-36 h-32 -top-8 -left-2 bg-indigo-600 rotate-12 transform scale-x-0 group-hover:scale-x-50 transition-transform group-hover:duration-1000 duration-500 origin-left"
                ></span>
                <span
                    className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10" onClick={handleClick}
                >{btnText}</span>
            </button>
        </div>
    )
}

export default Navbar
