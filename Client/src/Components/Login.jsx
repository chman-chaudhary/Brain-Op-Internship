import React, { useState } from 'react'
import "./login.css"
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import "./loader.css"
import axios from 'axios'

function Login() {

    const navigate = useNavigate();
    const [error, setError] = useState();
    const { register, handleSubmit, watch, formState: { errors, isSubmitting }, } = useForm();
    const password = watch("password");
    const onSubmit = async (data) => {
        try {
            let formData = { ...data };
            let response = await axios.post("http://localhost:3000/login", formData, { withCredentials: true });
            if (response.data.success) {
                return navigate("/home");
            } else setError(response.data.message);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Navbar />
            {isSubmitting && <div className="x-50 flex justify-center items-center w-full h-screen"><div className="loader"></div></div>}
            <div className='w-full flex justify-center pt-32'>
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    {error && <p className='text-red-500 text-base'>{error}</p>}
                    <div className="flex-column">
                        <label>Email </label></div>
                    <div className="inputForm">
                        <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg"><g id="Layer_3" data-name="Layer 3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g></svg>
                        <input {...register("email", { required: { value: true, message: "Email is mandatory" } })} type="text" className="input" placeholder="Enter your Email" />
                    </div>
                    {errors.email && <p className='text-red-500 text-base'>{errors.email.message}</p>}
                    <div className="flex-column">
                        <label>Password </label></div>
                    <div className="inputForm">
                        <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>
                        <input {...register("password", { required: { value: true, message: "Password is mandatory" } })} type="password" className="input" placeholder="Enter your Password" />
                    </div>
                    {errors.password && <p className='text-red-500 text-base'>{errors.password.message}</p>}
                    <button className="button-submit">Log In</button>
                    <p className="p">Don't have an account? <Link to="/signup"><span className="span">Sign Up</span></Link></p>
                </form>
            </div>
        </>
    )
}

export default Login
