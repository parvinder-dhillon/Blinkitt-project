import React, { useEffect } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { asyncHandler } from '../../../server/utils/asyncHandler'
const product = () => {
    const [productData,setProductData]= useState([])
    const [page,setPage]=usestate(1)
    const fetchProductData = asyncHandler(async(req,res)=>{
        const response = await Axios({
            ...SummaryApi.getProduct,
            data:{
                page:page
            }
        })
        const {data :responseData} = response
        console.log("response",response)
        if(response.success){
            setProductData(responseData.data)
            setloading(false)
        }
    })
    useEffect(()=>{
        fetchProductData()
    },[])
  return(
   
  )
}

export default product
