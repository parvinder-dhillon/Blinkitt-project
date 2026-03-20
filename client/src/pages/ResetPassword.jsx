import React, { useState,useEffect } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/Axios.ToastError';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
const ResetPassword = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    })
    const validateValue = Object.values(data).every(el => el)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showconfirmPassword, setShowconfirmPassword] = useState(false)
    useEffect(() => {
        if (!(location.state?.data?.success)) {
            navigate("/")

        }
        if (location.state?.email) {
            setData((preve) => {
                return {
                    ...preve,
                    email: location?.state?.email
                }
            })
        }

    }, [])
    console.log("data reset password", data)
    const handleChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }

        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (data.newPassword !== data.confirmPassword) {
            toast.error("newpassword and confirmPassword must be same")
            return
        }
        console.log("hit this", data);
        try {
            const response = await Axios({
                ...SummaryApi.ResetPassword,
                data: data
            })
            

            console.log("this is the response", response);
            if (response.data.error) {
                toast.error(response.data.message)
            }
            if (response.data.success) {
                toast.success(response.data.message)
                navigate("/login")
                setData({
                    email: "",
                    newPassword: "",
                    confirmPassword: ""
                })

            }

        } catch (error) {
            AxiosToastError(error)
        }

    }
    return (
        <section className='w-full  container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p className='font-semibold' >Create your new password :</p>

                <form className='grid gap-4 mt-6' onSubmit={handleSubmit} action="">
       
                   
                    <div className='grid'>
                        <label htmlFor="newPassword">newPassword :</label>
                        <div className='bg-blue-50 p-2 border focus-within:border-green-500 rounded-lg flex items-center'>
                            <input
                                type={showNewPassword ? "text" : "password"}
                                id='newPassword'
                                autoFocus
                                className='w-full outline-none'
                                name='newPassword'
                                value={data.newPassword}
                                onChange={handleChange}
                                placeholder='Enter your password'

                            />
                            <div onClick={() => setShowNewPassword(preve => !preve)} className='cursor-pointer'>
                                {
                                    showNewPassword ? (
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
                    <button disabled={!validateValue} className={`${validateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white font-semibold py-2 rounded-lg my-3 tracking-widest`}>Change Password</button>
                </form>
                <p>
                    Already have account ? <Link to={"/login"} className='font-semibold text-green-600 hover:text-green-900'>Login</Link>
                </p>
            </div>
        </section>
    )

}

export default ResetPassword
