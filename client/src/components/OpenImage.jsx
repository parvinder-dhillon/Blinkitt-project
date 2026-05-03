import React from 'react'
import { IoClose } from 'react-icons/io5'
import { useSelector } from 'react-redux'
const OpenImage = ({ close, url }) => {
    const user = useSelector(state => state.user)
    return (
        <section className='fixed z-50 top-0 bottom-0 left-0 right-0  bg-neutral-900/90 p-10 flex items-center justify-center w-full'>
            <div className='max-w-60 max-h-max relative lg:max-h-sm lg:max-w-sm w-full rounded p-10 bg-linear-330 from-gray-800/70 to-cyan-600/70'>
            <div className='inline-block absolute top-2 right-2'>
            <button onClick={close} className='text-neutral-800 shadow hover:text-red-600 hover:shadow-red-600 shadow-blue-300 rounded w-fit ml-auto cursor-pointer'>
                    <IoClose size={25} />
                </button>
            </div>
                <div className='w-full h-full'>
                {
                    user.avatar && (
                        <div className=''>
                            <img src={url} alt="full screen" className=' w-full h-full rounded object-scale-down' />
                        </div>
                    )
                }
                </div>
             
            </div>
        </section>
    )
}

export default OpenImage
