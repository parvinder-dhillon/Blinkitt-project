import React, { useEffect, useState } from 'react'
import UploadSubCategory from '../components/UploadSubCategory'
import { asyncHandler } from '../../../server/utils/asyncHandler'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import TableFormat from '../components/TableFormat'

const SubCategory = () => {
  const [openAddSubCategory,setOpenAddSubCategory]=useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading]=useState(false) 
  const fetchCategoryData =asyncHandler(async(req,res)=>{
    setLoading(true)
    const response =await Axios({
      ...SummaryApi.getSubCategory
    })
    const{ data : responseData } = response
    if(responseData.success){
      setData(responseData.data)
    }
    setLoading(false)
  })
  useEffect(()=>{
    fetchCategoryData()
  },[])
  const column =[]
  return (
    <section>
      <div className='bg-white p-2 flex items-center justify-between  shadow-md'>
        <h2 className='font-semibold'>SubCategory</h2>
        <button onClick={() => setOpenAddSubCategory(true)} className='text-sm font-semibold text-center text-green-900 min-w-20 px-3 py-2 shadow hover:text-green-600 hover:shadow-blue-400 rounded border-2  border-blue-100 tracking-widest'>Add SubCategory</button>
      </div>
      <div>
      <TableFormat data={data} column={column}/> 
      </div>
      {
        openAddSubCategory &&(
          <UploadSubCategory close={() => setOpenAddSubCategory(false)}/>
        )
      }
    </section>
  )
}

export default SubCategory
