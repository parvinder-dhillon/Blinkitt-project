import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/Axios.ToastError'
const UserMenu = ({close}) => {
  const user = useSelector((state) => state.user)
  const dispatch =useDispatch()
  const handleLogout =async()=>{
     try {
      const response = await  Axios({
       ...SummaryApi.logout
      })
      if (response.data.success) {
        close()
       dispatch(logout())
       localStorage.clear()
       toast.success(response.data.message)
      }
      if (response.data.error) {
       toast.error(response.data.error)
      }

     } catch (error) {
      AxiosToastError(console.log("eroorjfnf:",error))
     }
  }
  return (
    <div>
      <div className='font-semibold'>My Account</div>
      <div className='text-sm'>{user.name || user.mobile}</div>
      <Divider/>
      <div className='text-sm grid gap-2'>
        <Link to={""} className='px-2' >My Orders</Link>
        <Link to={""} className='px-2' >Save Adress</Link>
        <button onClick={handleLogout } className='text-left px-2'>Log Out</button>
      </div>
    </div>

  )
}

export default UserMenu
