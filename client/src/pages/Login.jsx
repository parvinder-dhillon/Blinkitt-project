import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/Axios.ToastError';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    })
    const validateValue = Object.values(data).every(el => el)
    const [showPassword, setShowPassword] = useState(false)
    const navigate =useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }

        })
    }

    console.log("data", data)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await Axios({
                ...SummaryApi.login,
                data: data
            })
            if (response.data.error) {
                toast.error(response.data.message)
            }
            if (response.data.success) {
                toast.success(response.data.message)
                
                setData({
                    email: "",
                    password: "",
                })
                navigate("/")
            }
            console.log("this is the response", response);
        } catch (error) {
            AxiosToastError(error)
        }

    }
    return (
        <section className='w-full  container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p>Welcome to grocerynow</p>
                <form className='grid gap-4 mt-6' onSubmit={handleSubmit} action="">
                    <div className='grid'>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id='email'
                            autoFocus
                            className='bg-blue-50 p-2 border  focus-within:border-green-500 outline-0 rounded-lg'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                        />
                    </div>
                    <div className='grid'>
                        <label htmlFor="password">Password :</label>
                        <div className='bg-blue-50 p-2 border focus-within:border-green-500 rounded-lg flex items-center'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                autoFocus
                                className='w-full outline-none'
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                placeholder='Enter your password'

                            />
                            <div onClick={() => setShowPassword(preve => !preve)} className='cursor-pointer'>
                                {
                                    showPassword ? (
                                        <FaRegEye />
                                    ) : (
                                        <FaRegEyeSlash />
                                    )
                                }
                            </div>
                        </div>
                    <Link to={"/forgot-password"} className='ml-auto font-semibold text-green-600 mt-2 hover:text-green-900'>Forgotten password?</Link>
                    </div>
                    <button disabled={!validateValue} className={`${validateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white font-semibold py-2 rounded-lg my-3 tracking-widest`}>Register</button>
                </form>

                <p>
                    Don't have an account ? <Link to={"/register"} className='font-semibold text-green-600 hover:text-green-900'>Create Account</Link>
                </p>
            </div>
        </section>
    )
}

export default Login
