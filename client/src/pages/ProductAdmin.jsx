import React, { useEffect, useState } from 'react'
import { asyncHandler } from '../../../server/utils/asyncHandler.js'
import SummaryApi from '../common/SummaryApi.js'
import Axios from '../utils/Axios.js'
import Loading from '../components/loading.jsx'
import ProductCartAdmin from '../components/ProductCartAdmin.jsx'


const ProductAdmin = () => {
  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setloading] = useState(false)
  const [totalPageCount,setTatalPageCount]=useState(1)
  const fetchProductData = asyncHandler(async (req, res) => {
    setloading(true)
    const response = await Axios({
      ...SummaryApi.getProduct,
      data: {
        page: page,
        limit:12
      }
    })
    const { data: responseData } = response
    console.log("response", responseData.data?.data)
    if (responseData.success) {
      setloading(false)
      setTatalPageCount(responseData.totalNoPage)
      setProductData(responseData.data?.data)
    }
  })
  useEffect(() => {
    fetchProductData()
  },[])
  console.log("productData",productData);
  
  return (
    <section className=''>
    <div className='bg-white p-2 flex items-center justify-between  shadow-md'>
                <h2 className='font-semibold'>Product</h2>
    </div>
    {
      loading&&(
        <Loading/>
      )
    }
    <div className='bg-green-50 p-4'>
    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
    {
      productData.map((p,index)=>{
        return(
          <ProductCartAdmin key={p._id+index+"productData"} data={p}/>
        )
      })
    }
    </div>
    <div className='flex justify-between my-4'>
      <button className="font-normal hover:text-green-700 hover:shadow-green-200 hover:shadow-md text-sm hover:font-bold py-3 px-5 text-center rounded-md border border-blue-200 shadow-blue-200 shadow-md hover:border-red-300 ">Previous</button>
      <button className="font-normal hover:text-green-700 hover:shadow-green-200 hover:shadow-md text-sm hover:font-bold py-3 px-5 text-center rounded-md border border-blue-200 shadow-blue-200 shadow-md hover:border-red-300 ">{page}/{totalPageCount}</button>
      <button className="font-normal hover:text-green-700 hover:shadow-green-200 hover:shadow-md text-sm hover:font-bold py-3 px-5 text-center rounded-md border border-blue-200 shadow-blue-200 shadow-md hover:border-red-300 ">Next</button>
    </div>
  
    </div>
    
    </section>
  )
}

export default ProductAdmin
