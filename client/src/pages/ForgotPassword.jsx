import React from 'react'
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/Axios.ToastError';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const ForgotPassword = () => {
  const [data, setData] = useState({
      email: "",
  })
  const validateValue = Object.values(data).every(el => el)
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
      console.log("hit this",data);
      try {
        const response = await Axios({
            ...SummaryApi.ForgotPassword,
            data:data
        })
        console.log("this is the response", response);
        if (response.data.error) {
            toast.error(response.data.message)
        }
        if (response.data.success) {
            toast.success(response.data.message)
            navigate("/verify-forgot-password-otp",{
              state:data
            })
            setData({
                email: "",
            })
      
        }
      
      } catch (error) {
          AxiosToastError(error)
      }

  }
  return (
      <section className='w-full  container mx-auto px-2'>
          <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
              <p className='font-semibold text-green-700'>Change your password</p>

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
                  <button disabled={!validateValue} className={`${validateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white font-semibold py-2 rounded-lg my-3 tracking-widest`}>Send Otp</button>
              </form>
              <p>
                  Already have account ? <Link to={"/login"} className='font-semibold text-green-600 hover:text-green-900'>Login</Link>
              </p>
          </div>
      </section>
  )
}

export default ForgotPassword

