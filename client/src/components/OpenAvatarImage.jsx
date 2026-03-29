import React from 'react'
import { useSelector } from 'react-redux'
const OpenAvatarImage = ({ close }) => {
    const user = useSelector(state => state.user)
    return (
        <section onClick={close} className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-900/90 p-4  flex items-center justify-center w-full'>
            <div className=' max-w-sm lg:max-w-xl w-full  rounded p-4 flex flex-col items-center'>
                {
                    user.avatar && (
                        <div className=''>
                            <img src={user.avatar} alt="user.name" className=' w-full h-full rounded' />
                        </div>

                    )
                }


            </div>
        </section>
    )
}

export default OpenAvatarImage
