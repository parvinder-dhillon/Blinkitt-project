import React, { useEffect, useRef, useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/Axios.ToastError';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const VerifyForgotPasswordOtp = () => {
    const [data, setData] = useState(["","","","","",""])
    const navigate =useNavigate()
    const inputRef = useRef([])
    const location = useLocation()
    useEffect(()=>{
        if(!location?.state?.email){
            navigate("/forgot-password")
        }
    }),[]

    const validateValue =data.every(el => el)
    console.log("data", data)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await Axios({
                ...SummaryApi.VerifyForgotPasswordOtp,
                data:{
                    otp : data.join(""),
                    email:location.state?.email
                }
            })
            if (response.data.error) {
                toast.error(response.data.message)
            }
            if (response.data.success) {
                toast.success(response.data.message)
                setData(["","","","","",""])
                navigate("/reset-password",{
                    state:{
                        data:response.data,
                        email:location.state?.email
                    }
                })
            }
            console.log("this is the response", response);
        } catch (error) {
            AxiosToastError(error)
        }

    }
    return (
        <section className='w-full  container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p className='font-semibold text-green-700 text-lg'>Enter OTP :</p>
                <form className='grid gap-4 mt-6' onSubmit={handleSubmit} action="">
                    <div className='grid'>
                        <label className='font-semibold' htmlFor="otp">OTP:</label>
                        <div className='flex gap-2 justify-between mt-4 text-center'
                            onPaste={(e)=>{
                                const paste =e.clipboardData.getData("text").replace(/\D/g,"").slice(0,6)
                                const newData =paste.split("")
                                setData(newData)
                                inputRef.current[newData.length - 1]?.focus()
                            }}
                            >
                            {
                                data.map((element,index)=>{
                                    return(
                                        <input
                                        key={"otp"+index}
                                        type="text"
                                        inputMode='numeric'
                                        pattern='[0-9]*'
                                        maxLength={1}
                                        ref={(ref)=>{
                                            inputRef.current[index]= ref
                                            return ref
                                        }}
                                        value={data[index]}
                                        onChange={(e)=>{
                                            const value =e.target.value
                                            if(!/^\d?$/.test(value))return
                                            const newData =[...data]
                                            newData[index] =value
                                            setData(newData)
                                            if(value && index < 5){
                                                inputRef.current[index+1].focus()
                                            }
                                        }}
                                        onKeyDown={(e)=>{
                                            if(e.key === "Backspace" && !data[index] && index > 0){
                                                inputRef.current[index - 1].focus()
                                            }
                                        }}
                                        
                                        className='bg-blue-50 p-2 border  focus-within:border-green-500 outline-0 rounded-lg font-semibold w-full max-w-14 text-center'
                                    />
                                    )
                                })
                            }
                        </div>
                      
                    </div>
                    <button disabled={!validateValue} className={`${validateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white font-semibold py-2 rounded-lg my-3 tracking-widest`}>Verify Otp</button>
                </form>

                <p>
                    Don't have an account ? <Link to={"/register"} className='font-semibold text-green-600 hover:text-green-900'>Create Account</Link>
                </p>
            </div>
        </section>
    )
}


export default VerifyForgotPasswordOtp

