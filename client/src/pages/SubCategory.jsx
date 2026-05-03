import React, { useEffect, useState } from 'react'
import UploadSubCategory from '../components/UploadSubCategory'
import Axios from '../utils/Axios.js'
import SummaryApi from '../common/SummaryApi.js'
import TableFormat from '../components/TableFormat'
import { createColumnHelper } from '@tanstack/react-table'
import AxiosToastError from '../utils/Axios.ToastError.js'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import OpenImage from '../components/OpenImage.jsx'
import EditSubcategory from '../components/EditSubcategory.jsx'
import ConfirmDeleteBox from '../components/ConfirmDeleteBox.jsx'
import toast from 'react-hot-toast'
const SubCategory = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false)
  const [data, setData] = useState([])
  const [openImage, setopenImage] = useState("")
  const [loading, setLoading] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDeleteConfirmBox,setOpenDeleteConfirmBox] = useState(false)
  const [editData, setEditData] = useState({
    _id: ""
  })
  const [deleteData,setDeleteData] = useState({
    _id: ""
  })
  
  const columnHelper = createColumnHelper()
  
  const column = [
    columnHelper.accessor("name", {
      header: "Name"
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => {
        return (<div className='flex justify-center items-center'>
          <img
            src={row.original.image}
            alt={row.original.name}
            onClick={() => { setopenImage(row.original.image) }}
            className='w-8 h-8 cursor-pointer' />
        </div>
        )
      }
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => {
        return (
          <>
            {
              // console.log("all category is hereee",row.original.category[0])
              row.original.category.map((c, index) => {
                return (
                  <p key={c._id + "table"} className='shadow-md px-1 inline-block ' >{c.name}</p>

                )
              })
            }
          </>
        )
      }
    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className='flex items-center justify-center gap-3'>
            <button onClick={
              () => {
                setOpenEdit(true)
                setEditData(row.original)
              }}
              className='p-2 bg-blue-50 rounded-full hover:text-green-600'>
              <MdEdit size={20} />
            </button>
            <button onClick={()=>{
              setOpenDeleteConfirmBox(true),
              setDeleteData(row.original)

            }} className='p-2 bg-blue-50 rounded-full hover:text-red-600'>
              <MdDelete size={20} />
            </button>
          </div>
        )
      }
    })
  ]
  const handleDeleteSubcatgeory = async () =>{
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data:deleteData
      })
      const {data:responseData} = response
      if(responseData.success){
        toast.success(responseData.message)
        setOpenDeleteConfirmBox(false)
        fetchSubCategoryData()
        setLoading(false)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <section>
      <div className='bg-white p-2 flex items-center justify-between  shadow-md'>
        {/* {
          loading&&(
            <Loading/>
          )
        } */}
        <h2 className='font-semibold'>SubCategory</h2>
        <button onClick={() => setOpenAddSubCategory(true)} className='text-sm font-semibold text-center text-green-900 min-w-20 px-3 py-2 shadow hover:text-green-600 hover:shadow-blue-400 rounded border-2  border-blue-100 tracking-widest'>Add SubCategory</button>
      </div>
      <div>
        <TableFormat data={data} column={column} />
      </div>
      {
        openAddSubCategory && (
          <UploadSubCategory fetchData={} close={() => setOpenAddSubCategory(false)} />
        )
      }
      {
        openImage &&
        <OpenImage close={() => setopenImage("")} url={openImage} />
      }
      {
        openEdit &&
        <EditSubcategory fetchData={fetchSubCategoryData} data={editData} close={() => setOpenEdit(false)} />
      }
      {
        openDeleteConfirmBox &&
        <ConfirmDeleteBox cancel={()=>setOpenDeleteConfirmBox(false)} confirm={handleDeleteSubcatgeory} close={()=>setOpenDeleteConfirmBox(false)}/>
      }
    </section>
  )
}

export default SubCategory
