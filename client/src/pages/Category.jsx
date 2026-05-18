import React, { useEffect, useState } from 'react'
import UploadCategoryModle from '../components/UploadCategoryModle'
import Loading from '../components/loading'
import NoData from '../components/NoData'
import Axios from '../utils/Axios.js'
import AxiosToastError from '../utils/Axios.ToastError.js'
import SummaryApi from '../common/SummaryApi.js'
import EditCategory from '../components/EditCategory'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import ConfirmDeleteBox from '../components/ConfirmDeleteBox.jsx'

const Category = () => {
    const [uploadCategory, setUploadCategory] = useState(false)
    const [loading,setloading] =useState(false)
    const [categoryData,setCategoryData] =useState([])
    const [openEdit,setOpenEdit] = useState(false)
    const [editData,setEditData] =useState({
        name :"",
        image:""
    })
    const [openConfirmDeleteBox,setopenConfirmDeleteBox] = useState(false)
    const [deleteCategory,setDeleteCategory]=useState({
        _id:""
    })
    const allcategory = useSelector(state => state.product.allCategory)

    useEffect(()=>{
        setCategoryData(allcategory)
    },[allcategory])
    
    const fetchCategory =async()=>{
        try {
            setloading(true)
            const response = await Axios({
                ...SummaryApi.getCategory
            })
            const { data : responseData} =response
            if(responseData.success){
                setCategoryData(responseData?.data?.data)
            }
            console.log("response data :",responseData?.data.data)
        } catch (error) {
            
        }finally{
            setloading(false)
        }
    }
    useEffect(()=>{
        fetchCategory()
    },[])
    const handleDeleteCategory = async () => {
        try { 
            setloading(true)
            const response =await Axios({
                ...SummaryApi.deleteCategory,
                data:deleteCategory
            })
            const {data :responseData} =response
            if(responseData.success){
                toast.success(responseData.message)
                setopenConfirmDeleteBox(false)
                fetchCategory() 
                setloading(false)
            }
            
        } catch (error) {
            AxiosToastError(error)
        }
    }
   
    return(
        <section>
            <div className='bg-white p-2 flex items-center justify-between  shadow-md'>
                <h2 className='font-semibold'>Category</h2>
                <button onClick={() => setUploadCategory(true)} className='text-sm font-semibold text-center text-green-900 min-w-20 px-3 py-2 shadow hover:text-green-600 hover:shadow-blue-400 rounded border-2  border-blue-100 tracking-widest'>Add Category</button>
            </div>
            {
                !categoryData[0] && !loading && (
                    <NoData/>
                )
            }
            <div className='p-4 grid md:grid-cols-2 grid-cols-2 lg:grid-cols-6 gap-2'>
            { 
                categoryData.map((category,index)=>{
                    return(
                        <div key={category._id} className='w-32 text-center h-56 rounded shadow-md'>
                            <img src={category.image} alt={category.name} className='w-full m-auto object-scale-down' />
                            <div className='flex items-center justify-center gap-1'>
                            <button onClick={() => {
                                 setOpenEdit(true)
                                 setEditData(category)}} className='flex-1 text-xs max-w-15 py-1 rounded-full border-2  border-blue-100 hover:border-blue-300 '>Edit</button>
                            <button  onClick={()=>{
                                setopenConfirmDeleteBox(true)
                                setDeleteCategory(category)
                            }} className='flex-1 text-xs max-w-15 py-1 rounded-full border-2  border-blue-100 hover:border-red-300 '>Delete</button>
                            </div>
                        </div>
                    )
                })
            }
            </div>
            {
                loading && (
                    <Loading/>
                )
            }
            {
                uploadCategory && (
                    <UploadCategoryModle fetchData={fetchCategory} close={()=>setUploadCategory(false)}/>
                )
            }
            {
                openEdit && (
                    <EditCategory data={editData} close={()=>setOpenEdit(false)} fetchData={allcategory}/>
                )
            }
            {
                openConfirmDeleteBox && (
                    <ConfirmDeleteBox close={()=>setopenConfirmDeleteBox(false)} cancel={()=>setopenConfirmDeleteBox(false)} confirm={handleDeleteCategory}/>
                )
                
            }
            
        </section>
    )
    
}
export default Category




