import React from 'react'
import { IoClose } from 'react-icons/io5'

const ConfirmBox = ({ cancel, confirm, close }) => {
  return (
    <div className='fixed top-0 right-0 left-0 bottom-0 z-500 bg-neutral-800/70 p-4 flex  items-center justify-center'>
      
      <div className='bg-white w-full max-w-md p-4 rounded'>
        <div className='flex flex-wrap'>
        <h1 className='font-semibold top-0'>Permanent Delete</h1>
      <button onClick={close} className=' text-neutral-800 block shadow hover:text-red-600 hover:shadow-red-600 shadow-blue-300 rounded ml-auto cursor-pointer'>
            <IoClose size={25} />
          </button>
        </div>
     
        <p className='my-4'>Are you sure for permanent delete?</p>
        <div className='flex justify-around items-center gap-3'>
          <button onClick={() => cancel(true)} className='text-xs min-w-20 px-3 py-1 rounded-full mt-3 border-2  border-red-100 hover:border-red-500 hover:text-red-500 hover:font-bold'>Cancel</button>
          <button onClick={() => confirm(true)} className='text-xs min-w-20 px-3 py-1 rounded-full mt-3 border-2  border-green-100 hover:border-green-500 hover:text-green-500 hover:font-bold'>Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmBox
