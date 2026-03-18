import React from 'react'
import logooo from '../assets/logooo.png'
import Searchh from './Search'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <header className='h-15 shadow-md sticky top-0 lg:h-20 '>
      <div className='container mx-auto flex justify-between items-center h-full px-4'>
        <div className='h-full'>
          {/* logo */}
          <Link to={"/"} className='h-full'>
            <img
              src={logooo}
              width={150}
              height={40}
              alt="logo"
              className='hidden lg:block'
            />

            <img
              src={logooo}
              width={100}
              height={20}
              alt="logo"
              className='lg:hidden mt-1'
            />
          </Link>
        </div>
        {/* search */}
        <div>
          <Searchh/>
        </div>

        {/* login and cart */}
        <div>
          login and my cart
        </div>
      </div>
    </header>
  )
}

export default Header
