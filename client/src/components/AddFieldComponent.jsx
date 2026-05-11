import React from 'react'
import { IoClose } from 'react-icons/io5'
const AddFieldComponent = ({close,value,onChange,submit}) => {
    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-900/90 p-10 flex  items-center justify-center' >
            <div className='bg-white rounded p-4 lg:w-md min-w-xs grid gap-4'>
                <div className='flex items-center justify-center gap-3'>
                    <h1 className='font-semibold'>
                        Add Field
                    </h1>
                    <button onClick={close} className='text-neutral-800 block shadow hover:text-red-600 hover:shadow-red-600 shadow-blue-300 rounded ml-auto cursor-pointer'>
                        <IoClose size={25} />
                    </button>
                </div>
                <input
                    type="text"
                    id='name'
                    placeholder='Enter Product Name'
                    name='name'
                    value={value}
                    onChange={onChange}
                    className='bg-blue-50 p-2 outline-none shadow w-full  focus-within:shadow-blue-300 rounded'
                />
                <button onClick={submit} className='text-md font-semibold text-center text-green-900 block max-w-36 px-3 py-2 shadow hover:text-green-600 hover:shadow-blue-400 m-auto rounded mt-3 border-2  border-blue-100 tracking-widest'>
                    Add Fields
                </button>
            </div>
        </section>
    )
}

export default AddFieldComponent
