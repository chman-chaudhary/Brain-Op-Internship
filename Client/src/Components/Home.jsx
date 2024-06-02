import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Cards from './Cards'
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);

    useEffect(() => {
        if (!cookies.token || cookies.token === "")
            navigate("/login");
    }, [])

    return (
        <>
            <Navbar />
            <Cards />
        </>
    )
}

export default Home
