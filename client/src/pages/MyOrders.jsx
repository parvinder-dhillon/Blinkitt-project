import React, { useState } from 'react'
const MyOrders = () => {
  const [on,seton]=useState(false)
  const onchange = ()=>{
    seton(true)
  }
  return (
    <>
     <button className='bg-red-400' onClick={onchange} >on</button>
    {
      on && (
        <p className='bg-black text-white'>harmit</p>
      )
    }
    </>
   
  )
}

export default MyOrders
