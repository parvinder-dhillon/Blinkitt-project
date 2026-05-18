import React from 'react'

const ProductCartAdmin = ({data}) => {
  return (
    <div className='w-36 relative bg-white p-4 rounded'>
        <div className=''>
        <img src={data?.image[0]} alt={data?.name} className=' w-full h-full object-scale-down' />
        <p className='text-ellipsis mb-3 line-clamp-2  font-medium '>{data?.name}</p>
        <p className=' absolute bottom-1 left-2 text-slate-400'>{data?.unit}</p>
      </div>
    </div>
  )
}

export default ProductCartAdmin
