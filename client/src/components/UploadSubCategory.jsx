import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/uploadImage.js';
import SummaryApi from '../common/SummaryApi.js';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios.js';
import AxiosToastError from '../utils/Axios.ToastError.js';
import { useSelector } from 'react-redux';
const UploadSubCategory = ({ close,fetchData}) => {
    const [subCategorydata, setSubCategoryData] = useState({
        _id:"",
        name: "",
        image: "",
        category: []
    })

    const allcategory = useSelector(state => state.product.allCategory)
    const [loading, setLoading] = useState(false)
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setSubCategoryData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    const handleUploadSubCategoryImages = async (e) => {
        const file = e.target.files[0]
        if (!file) {
            return
        }
        setLoading(true)
        const response = await uploadImage(file)
        const { data: imageResponse } = response
        setSubCategoryData((preve) => {
            return {
                ...preve,
                image: imageResponse.data.url
            }
        })
        setLoading(false)
    }
    const handleRemoveCategorySelected = (categoryId) => {
        const index = subCategorydata.category.findIndex(el => el._id === categoryId)
        subCategorydata.category.splice(index, 1)
        setSubCategoryData((preve) => {
            return {
                ...preve
            }
        })
    }
    const handleSubmitSubCategory = async(e)=>{
        e.preventDefault()
        if (loading) return;
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.createSubCategory,
                data: subCategorydata
            })
            const { data: responseData } = response
            if (responseData.success) {
                toast.success(responseData.message)
                close()
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
            fetchData()
        }
    }

    return (
        <section className='fixed top-0 z-999 left-0 right-0 bottom-0 bg-neutral-900/50 p-4 flex items-center justify-center'>
            <div className='bg-white max-w-4xl w-full p-4 rounded'>
                <div className='flex items-center justify-center'>
                    <h1 className='font-semibold'>Add SubCategory</h1>
                    <button onClick={close} className='text-neutral-800 block shadow hover:text-red-600 hover:shadow-red-600 shadow-blue-300 rounded ml-auto cursor-pointer'>
                        <IoClose size={25} />
                    </button>
                </div>
                <form onSubmit={handleSubmitSubCategory} className='my-3 grid gap-4'>
                    <div className='w-full'>
                        <label className='font-normal text-neutral-600' htmlFor="subCategoryName">Name</label>
                        <input
                            type="text"
                            id='subCategoryName'
                            placeholder='Enter SubCategory name'
                            className='p-2 w-full mt-2 bg-blue-50 outline-none shadow focus-within:shadow-blue-300 rounded'
                            value={subCategorydata.name}
                            name='name'
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className='grid gap-2'>
                        <p className='font-normal text-neutral-600'>Image</p>
                        <div className='flex gap-4 flex-col lg:flex-row items-center'>
                            <div className='border border-slate-300 h-36 w-full lg:w-36 text-slate-400 flex items-center justify-center rounded'>
                                {
                                    subCategorydata.image ? (
                                        <img src={subCategorydata.image} className='w-full h-full object-scale-down' alt="category" />
                                    ) : (
                                        <p className='text-sm'>No Image</p>
                                    )
                                }
                            </div>
                            <label htmlFor="uploadSubCategoryImage">
                                <div className={`${!subCategorydata.name ? "text-neutral-400 bg-neutral-200" : "text-green-900 hover:shadow-blue-400 cursor-pointer hover:text-green-600"} text-xs font-semibold text-center  min-w-20 px-3 py-2 shadow  rounded border-2 border-blue-100 tracking-widest`}>
                                    {
                                        loading ? "Loading..." : "Upload Image"
                                    }
                                </div>
                                <input disabled={!subCategorydata.name} onChange={handleUploadSubCategoryImages} type="file" id='uploadSubCategoryImage' className='hidden' />
                            </label>
                        </div>
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="">Select Category</label>
                        <div className='border'>
                            {/* Display value */}
                            <div className='flex flex-wrap gap-2'>
                                {
                                    subCategorydata.category.map((cat, index) => {
                                        return(
                                            <p key={cat._id + "selectedValue"} className='bg-white shadow-md px-1 m-1 flex items-center gap-2'>{cat.name}
                                                <button onClick={() => handleRemoveCategorySelected(cat._id)} className=' text-neutral-800 block shadow hover:text-red-600 hover:shadow-red-600 shadow-blue-300 rounded ml-auto cursor-pointer'>
                                                    <IoClose size={15}/>
                                                </button>
                                            </p>
                                        )
                                    })
                                }
                            </div>
                            {/* select Category */}
                            <select name="" id="" className='w-full p-2 bg-transparent outline-0'
                            onChange={(e) => {
                                const value = e.target.value
                                const categoryDetails = allcategory.find(el => el._id == value)
                                console.log("category data is here",categoryDetails)
                                setSubCategoryData((preve) => {
                                    return {
                                        ...preve,
                                        category: [...preve.category, categoryDetails]

                                    }
                                })

                            }}
                            >
                                <option value={""}>Select category</option>
                                {
                                    allcategory.map((category, index)=>{
                                        return (
                                            <option value={category?._id} key={index+"subcategory"}>{category?.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <button  disabled={!subCategorydata.image || !subCategorydata.name || !subCategorydata.category[0]}className={`${!subCategorydata.image || !subCategorydata.name || !subCategorydata.category[0]? "text-neutral-400 bg-neutral-200" : "text-green-900 cursor-pointer hover:shadow-green-400 hover:text-green-600"} text-md font-semibold text-center  min-w-20 px-3 py-2 shadow  rounded border-2 border-blue-100 tracking-widest`}>
                        Add SubCategory
                    </button>
                </form>
            </div>
        </section>
    )
}
export default UploadSubCategory



