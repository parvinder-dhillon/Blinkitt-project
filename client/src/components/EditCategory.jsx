import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/uploadImage.js';
import SummaryApi from '../common/SummaryApi.js';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios.js';
import AxiosToastError from '../utils/Axios.ToastError.js';

const EditCategory = ({ close, fetchData,data:category }) => {
    const [data, setData] = useState({
        _id : category._id,
        name: category.name,
        image: category.image
    })
    const [loading,setLoading]= useState(false)
    const handleSubmit =async(e)=>{
        e.preventDefault()
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.updateCategory,
                data:data
            })
            const {data : responseData} = response
            if (responseData.success) {
                toast.success(responseData.message)
                close()
                fetchData()
            }
        } catch (error) {
            AxiosToastError(error)
            
        }finally{
            setLoading(false)
            
        }
    }
    const handleOnChange = (e) => {
        const {name,value} = e.target
        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }
    const handleUploadCategoryImages =async(e)=>{
        const file = e.target.files[0]
        if(!file){
            return
        }
        setLoading(true)
        const response =await uploadImage(file)
        const {data : imageResponse}=response
        setLoading(false)
        setData((preve)=>{
            return {
                ...preve,
                image:imageResponse.data.url
            }
        })
    }
    return (
        <section className='fixed top-0 left-0 right-0 bottom-0 bg-neutral-900/50 p-4 flex items-center justify-center'>
            <div className='bg-white max-w-4xl w-full p-4 rounded '>
                <div className='flex items-center justify-center'>
                    <h1 className='font-semibold'>Edit Category</h1>
                    <button onClick={close} className='text-neutral-800 block shadow hover:text-red-600 hover:shadow-red-600 shadow-blue-300 rounded ml-auto cursor-pointer'>
                        <IoClose size={25} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className='my-3 grid gap-4'>
                    <div className='w-full'>
                        <label className='font-normal text-neutral-600' htmlFor="categoryName">Name</label>
                        <input
                            type="text"
                            id='categoryName'
                            placeholder='Enter category name'
                            className='p-2 w-full mt-2 bg-blue-50 outline-none shadow focus-within:shadow-blue-300 rounded'
                            value={data.name}
                            name='name'
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className='grid gap-2'>
                        <p className='font-normal text-neutral-600'>Image</p>
                        <div className='flex gap-4 flex-col lg:flex-row items-center'>
                            <div  className='border border-slate-300 h-36 w-full lg:w-36 text-slate-400 flex items-center justify-center rounded'>
                                {
                                    data.image ? (
                                        <img src={data.image} className='w-full h-full object-scale-down' alt="category" />
                                    ):(
                                        <p className='text-sm'>No Image</p>
                                    )
                                }
                            </div>
                            <label htmlFor="uploadCategoryImage">
                            <div className={`${!data.name ? "text-neutral-400 bg-neutral-200":"text-green-900 hover:shadow-blue-400 hover:text-green-600"} text-xs font-semibold text-center  min-w-20 px-3 py-2 shadow  rounded border-2 border-blue-100 tracking-widest`}>
                                {
                                    loading ? "Loading..." : "Upload Image"
                                }

                                </div>
                            <input disabled={!data.name} onChange={handleUploadCategoryImages} type="file" id='uploadCategoryImage' className='hidden'/>
                            </label>
                           

                        </div>
                    </div>
                    <button className={`${!data.image || !data.name ? "text-neutral-400  bg-neutral-200":"text-green-900 hover:shadow-green-400 hover:text-green-600"} text-md font-semibold text-center  min-w-20 px-3 py-2 shadow  rounded border-2 border-blue-100 tracking-widest`}> 
                        Update Category
                    </button>
                </form>
            </div>
        </section>
    )
}

export default EditCategory
