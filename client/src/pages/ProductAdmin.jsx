import React, { useEffect, useState } from 'react'
import { asyncHandler } from '../../../server/utils/asyncHandler.js'
import SummaryApi from '../common/SummaryApi.js'
import Axios from '../utils/Axios.js'
import Loading from '../components/loading.jsx'
import ProductCartAdmin from '../components/ProductCartAdmin.jsx'
import { IoSearchOutline } from 'react-icons/io5'
const ProductAdmin = () => {
  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setloading] = useState(false)
  const [totalPageCount,setTotalPageCount]=useState(1)
  const [search,setSearch]=useState("")
  const fetchProductData = asyncHandler(async (req, res) => {
    setloading(true)
    const response = await Axios({
      ...SummaryApi.getProduct,
      data: {
        page: page,
        limit:12,
        search:search
      }
    })
    console.log("page",page)
    const { data: responseData } = response
    if (responseData.success) {
      setloading(false)
      setTotalPageCount(responseData.data?.totalNoPage)
      setProductData(responseData.data?.data)
    }
  })
  useEffect(() => {
    fetchProductData()
  },[page])
  const handleNext =()=>{
    if(page ===totalPageCount) return;
    if(page !== totalPageCount){
      setPage(preve => preve + 1)
    }
  }
  const handlePrevious =()=>{
    if(page !== totalPageCount){
      setPage(preve => preve - 1)
    }
  }
  const handleOnChange=(e)=>{
    const {value} =e.target
    setSearch(value)
    setPage(1)
  }
  useEffect(()=>{
    let flag = true
    const interval = setTimeout(() => {
      if(flag){
        fetchProductData()
        flag = false
      }
    },300);
    return()=>{
      clearTimeout(interval);
    }
  },[search])
  return (
    <section className='grid gap-1'>
    <div className='bg-white p-2 flex items-center justify-between  gap-4 shadow-md '>
                <h2 className='font-semibold'>Product</h2>
                <div className='flex items-center  bg-blue-50 px-4 gap-3 py-2 rounded shadow-xs hover:shadow-md  justify-center'>
                  <IoSearchOutline size={20}/>

                  <input type="text" placeholder='Search Product here ...' className='h-full outline-none bg-transparent' value={search} onChange={handleOnChange} />
                  
                </div>
    </div>
    <div className='bg-green-50 relative h-150 p-4'>
   <div className=''>
   <div className='grid relative grid-cols-2 h-full md:grid-cols-4 lg:grid-cols-6 gap-4'>
   <div className='absolute z-50 left-0 right-0 top-50'>
    {
      loading&&(
        <Loading/>
      )
    }
    </div>
   
    {
      productData.map((p,index)=>{
        return(
          <ProductCartAdmin key={p._id+index+"productData"} data={p}/>
        )
      })
    }
    </div>
   </div>
    <div className='flex absolute bottom-0 left-0 right-0 justify-between my-4 '>
      <button onClick={handlePrevious} className="font-normal hover:text-green-700 hover:shadow-green-200 hover:shadow-md text-sm hover:font-bold py-3 px-5 w-30 text-center rounded-md border border-blue-200 shadow-blue-200 shadow-md hover:border-red-300 ">Previous</button>
      <button className="font-normal text-slate-500 bg-white border shadow-lg shadow-blue-50 border-blue-100 text-sm w-full py-3 px-5 text-center">{page}/{totalPageCount}</button>
      <button onClick={handleNext} className="font-normal  hover:text-green-700 hover:shadow-green-200 hover:shadow-md text-sm w-30 hover:font-bold py-3 px-5 text-center rounded-md border border-blue-200 shadow-blue-200 shadow-md hover:border-red-300 ">Next</button>
    </div>
  
    </div>
    </section>
  )
}

export default ProductAdmin
