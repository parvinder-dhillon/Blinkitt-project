import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/Axios.ToastError';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const validateValue = Object.values(data).every(el => el)
    const [showPassword, setShowPassword] = useState(false)
    const [showconfirmPassword, setShowconfirmPassword] = useState(false)
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

        if (data.password !== data.confirmPassword) {
            toast.error("password and consfirmPassword must be same")
            return
        }

        try {
            const response = await Axios({
                ...SummaryApi.register,
                data: data
            })
            if (response.data.error) {
                toast.error(response.data.message)
            }
            if (response.data.success) {
                toast.success(response.data.message)
                setData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
                navigate("/login")

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
                    <div className='grid' >
                        <label htmlFor="name">Name :</label>
                        <input
                            type="text"
                            id='name'
                            autoFocus
                            className='bg-blue-50 p-2 border outline-0  focus-within:border-green-500 rounded-lg'
                            name='name'
                            value={data.name}
                            onChange={handleChange}
                            placeholder='Enter your name'
                        />
                    </div>
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
                    </div>
                    <div className='grid'>
                        <label htmlFor="confirmPassword">confirmPassword :</label>
                        <div className='bg-blue-50 p-2 border focus-within:border-green-500 rounded-lg flex items-center'>
                            <input
                                type={showconfirmPassword ? "text" : "password"}
                                id='confirmPassword'
                                autoFocus
                                className='w-full outline-none'
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleChange}
                                placeholder='Enter your confirmPassword'

                            />
                            <div onClick={() => setShowconfirmPassword(preve => !preve)} className='cursor-pointer'>
                                {
                                    showconfirmPassword ? (
                                        <FaRegEye />
                                    ) : (
                                        <FaRegEyeSlash />
                                    )
                                }

                            </div>
                        </div>
                    </div>
                    <button disabled={!validateValue} className={`${validateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white font-semibold py-2 rounded-lg my-3 tracking-widest`}>Register</button>
                </form>

                <p>
                    Already have account ? <Link to={"/login"} className='font-semibold text-green-600 hover:text-green-900'>Login</Link>
                </p>
            </div>
        </section>
    )
}

export default Register
