import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import { HiExternalLink } from "react-icons/hi";
import AxiosToastError from '../utils/Axios.ToastError'

const UserMenu = ({close}) => {
  const user = useSelector((state) => state.user)
  const dispatch =useDispatch()
  const navigate = useNavigate()
  const handleLogout =async()=>{
     try {
      const response = await  Axios({
       ...SummaryApi.logout
      })
      if(response.data.success){
        if(close){
          close()
        }
       dispatch(logout())
       localStorage.clear()
       toast.success(response.data.message)
       navigate("/")
      }
      if(response.data.error) {
       toast.error(response.data.error)
      }

     } catch (error) {
      AxiosToastError(console.log("error:",error))
     }
     
  }
  const handleClose=()=>{
    if(close){
      close()
    }
   }
  return (
    <div>
      <div className='font-semibold'>My Account</div>

      <div  className='text-sm flex items-center gap-2'>
      <span className='max-w-52 text-ellipsis line-clamp-1'>{user.name || user.mobile}</span>
      <Link onClick={handleClose} to={"/dashboard/profile"} className=' text-neutral-900 hover:text-blue-600'><HiExternalLink size={15} /></Link>
      </div>
      <Divider/>
      <div className='text-sm grid gap-2'>
        <Link onClick={handleClose} to={"/dashboard/category"} className='px-2 rounded hover:bg-blue-100' >Category</Link>
        <Link onClick={handleClose} to={"/dashboard/subCategory"} className='px-2 rounded hover:bg-blue-100' >Sub Category</Link>
        <Link onClick={handleClose} to={"/dashboard/uploadProduct"} className='px-2 rounded hover:bg-blue-100' >Upload Product</Link>
        <Link onClick={handleClose} to={"/dashboard/product"} className='px-2 rounded hover:bg-blue-100' >Product</Link>
        <Link onClick={handleClose} to={"/dashboard/myorders"} className='px-2 rounded hover:bg-blue-100' >My Orders</Link>
        <Link onClick={handleClose} to={"/dashboard/address"} className='px-2 rounded hover:bg-blue-100' >Save Adress</Link>
        <button onClick={handleLogout } className='text-left px-2 rounded cursor-pointer hover:bg-red-400'>Log Out</button>
      </div>
    </div>

  )
}
export default UserMenu
