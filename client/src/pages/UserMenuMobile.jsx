import React from 'react'
import UserMenu from '../components/UserMenu'
import { IoClose } from "react-icons/io5";
const UserMenuMobile = () => {
  return (
    <section className='bg-white h-full w-full py-2'>
      <button onClick={()=>window.history.back()}  className='text-neutral-800 block shadow shadow-blue-300 m-3 w-fit ml-auto cursor-pointer'>
      <IoClose size={25} />
      </button>
      <div className='container mx-auto px-3 py-5 pb-8'>
      <UserMenu/>
    </div>
    </section>
  )
}

export default UserMenuMobile
