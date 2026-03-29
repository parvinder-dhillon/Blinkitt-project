import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/Axios.ToastError'
import { IoClose } from "react-icons/io5";
import { upadateAvatar } from '../store/userSlice'
import { FaUserCircle } from "react-icons/fa";
const UserProfileAvatarEdit = ({ close }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [uploadLoading, setUploadLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const handleUploadAvatarImage = async (e) => {
        const file = e.target.files[0]
        if (!file) {
            return
        }
        const formData = new FormData()
        formData.append('avatar', file)

        try {
            setUploadLoading(true)
            const response = await Axios({
                ...SummaryApi.uploadAvatar,
                data: formData
            })
            const { data: resposeData } = response
            dispatch(upadateAvatar(resposeData.data.avatar))
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setUploadLoading(false)
            if (close) {
                close()
            }
        }
    }
    const handleDeleteAvatar = async () => {
        try {
            setDeleteLoading(true)
            await Axios({
                ...SummaryApi.deleteAvatar
            })
            dispatch(upadateAvatar(""))
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setDeleteLoading(false)
            if (close) {
                close()
            }
        }
    }
    return (
        <section  className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-900/50 p-4  flex items-center justify-center w-full'>
            <div className='bg-white  max-w-sm w-full  rounded p-4 flex flex-col items-center'>
                <button onClick={close} className='text-neutral-800 block shadow hover:text-red-600 hover:shadow-red-600 shadow-blue-300 rounded w-fit ml-auto cursor-pointer'>
                    <IoClose size={25} />
                </button>
                <div  className='w-20 h-20 bg-red flex items-center justify-center  rounded-full overflow-hidden drop-shadow-sm'>
                    {
                        user.avatar ? (
                            <img src={user.avatar} alt="user.name" className='w-full h-full' />
                        ) : (
                            <FaUserCircle size={65} />
                        )
                    }
                </div>
                <form onSubmit={handleSubmit} action="" className='flex gap-3 '>
                    <label htmlFor="uploadProfile">
                        <div className='text-xs cursor-pointer text-center font-normal min-w-20 px-3 py-1 rounded-full mt-3 border-2  border-blue-100 hover:border-green-400  hover:text-green-800 hover:font-bold'>
                            {
                                uploadLoading ? "Uploading..." : "Upload"
                            }
                        </div>
                        <input onChange={handleUploadAvatarImage} type="file" id='uploadProfile' className='hidden' />
                    </label>
                    <div onClick={handleDeleteAvatar} className='text-xs cursor-pointer text-center hover:text-red-800 font-normal min-w-20 px-3 py-1 rounded-full mt-3 border-2  border-blue-100 hover:border-red-400 hover:font-bold'>
                        {
                            deleteLoading ? "Deleting..." : "Delete"
                        }
                    </div>
                </form>
            </div>

        </section>
    )
}
export default UserProfileAvatarEdit
