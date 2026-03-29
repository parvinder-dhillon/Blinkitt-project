import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'
const Dashboard = () => {
    return (
        <section className='bg-white'>
            <div className=' bg-white container mx-auto p-3 grid lg:grid-cols-[250px_3fr]'>
                {/* left for menu */}
                <div className='py-4 sticky top-25 overflow-y-auto hidden lg:block '>
                    <UserMenu/>
                </div>
                {/* right for content */}
                <div className='bg-white p-4'>
                    <Outlet/>
                </div>
            </div>
        </section>
    )
}

export default Dashboard
