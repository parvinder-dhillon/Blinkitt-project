import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import OpenAvatarImage from '../components/openAvatarImage';
import AxiosToastError from '../utils/Axios.ToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import { setUserDetails } from '../store/userSlice';
import fetchUserDetails from '../utils/fetchUserDetails';
const Profile = () => {
    const user = useSelector(state => state.user)
    const [openImage, setopenImage] = useState(false)
    const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false)
    const [userData, setUserData] = useState({
        name: user.name,
        email: user.email,
        mobile: user.mobile
    })
    const [loading, setloading] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        setUserData({
            name: user.name,
            email: user.email,
            mobile: user.mobile
        })
    }, [user])
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setUserData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })

    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setloading(true)
            const response = await Axios({
                ...SummaryApi.updateUser,
                data: userData

            })
            const { data: responseData } = response
            if (responseData.success) {
                toast.success(responseData.message)
                const userData = await fetchUserDetails()
                dispatch(setUserDetails(userData.data))
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setloading(false)
        }
    }
    return (
        <div >
            {/* profile upload and display image  */}
            <div onClick={() => setopenImage(true)} className='w-20 h-20 bg-red flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>

                {
                    user.avatar ? (
                        <img src={user.avatar} alt="user.name" className='w-full h-full' />

                    ) : (
                        <FaUserCircle size={65} />
                    )
                }
            </div>
            {
                openImage && (
                    <OpenAvatarImage close={() => setopenImage(false)} />
            )}
            <button onClick={() => setProfileAvatarEdit(true)} className='text-xs min-w-20 px-3 py-1 rounded-full mt-3 border-2  border-blue-100 hover:border-blue-300 '>Edit Profile</button>
            {
                openProfileAvatarEdit && (
                    <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />
                )
            }
            {/* name, email, mobile change password */}
            <form className='my-4 grid w-auto lg:w-md gap-5' onSubmit={handleSubmit}>
                <div className='grid'>
                    <label htmlFor='name'>Name</label>
                    <input
                        type="text"
                        id='name'
                        placeholder='Enter Your Name'
                        className='p-2 bg-blue-50 outline-none shadow focus-within:shadow-blue-300 rounded' value={userData.name}
                        name='name'
                        onChange={handleOnChange} />
                </div>
                <div className='grid'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type="email"
                        id='email'
                        placeholder='Enter Your Email'
                        className='p-2 bg-blue-50 outline-none shadow focus-within:shadow-blue-300 rounded'
                        value={userData.email}
                        name='email'
                        onChange={handleOnChange} />
                </div>
                <div className='grid'>
                    <label htmlFor='mobile'>Mobile</label>
                    <input
                        type="mobile"
                        id='mobile'
                        placeholder='Enter Your Mobile'
                        className='p-2 bg-blue-50 outline-none shadow focus-within:shadow-blue-300 rounded'
                        value={userData.mobile}
                        name='mobile'
                        onChange={handleOnChange} />
                </div>
                <button className='text-md font-semibold text-center text-green-900 min-w-20 px-3 py-2 shadow hover:text-green-600 hover:shadow-blue-400 rounded mt-3 border-2  border-blue-100 tracking-widest'>
                    {
                        loading ? "loading..." : "Submit"
                    }
                </button>
            </form>
        </div>
    )
}
export default Profile
