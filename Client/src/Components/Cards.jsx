import React, { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component"
import Loader from "./Loader.jsx"
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Cards() {

    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [products, setProducts] = useState([]);

    const fetch = async () => {
        let response = await axios.get("http://localhost:3000/products", { withCredentials: true });
        if (response.data.isLogin) {
            setProducts(products.concat(response.data.products))
        } else {
            navigate("/login");
        }
    }

    useEffect(() => {
        if (cookies.token && cookies.token !== "") {
            fetch();
        } else {
            navigate("/login");
        }
    }, []);


    return (
        <InfiniteScroll dataLength={products.length} next={fetch} hasMore={true} loader={<Loader />} className='container mx-auto flex flex-wrap gap-x-8 gap-y-5 lg:justify-start xl:justify-start md:justify-start justify-center items-stretch pt-24'>
            {products.map((product) => {
                return <Card product={product} key={product._id} />
            })}
        </InfiniteScroll>
    )
}

export default Cards
