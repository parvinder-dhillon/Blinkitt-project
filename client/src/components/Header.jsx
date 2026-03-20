import React from 'react'
import logooo from '../assets/logooo.png'
import { FaCircleUser } from "react-icons/fa6";
import Searchh from './Search'
import useMobile from '../../hooks/useMobile';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GiShoppingCart } from "react-icons/gi";

const Header = () => {
  const [isMobile] = useMobile()
  const location = useLocation()
  const isSearchPage = location.pathname === "/search"
  const navigate = useNavigate()

  const redirecToLoginPage =()=>{
    navigate("/login")
  }
  return (
    <header className=' h-25  lg:shadow-md bg-white flex flex-col justify-center sticky top-0 lg:h-22 '>
      {
        !(isSearchPage && isMobile) && (
          <div className='w-full  container mx-auto flex justify-between items-center px-4'>
            <div className=' h-full'>
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
                  width={80}
                  height={30}
                  alt="logo"
                  className='lg:hidden mt-1'
                />
              </Link>
            </div>
            {/* search */}
            <div className=' hidden lg:block'>
              <Searchh />
            </div>

                         {/* login and cart */}
            <div>
              {/* user icon display in only mobile version */}
              <button className=' text-neutral-600 lg:hidden items-center'>
                <FaCircleUser size={22} />
              </button>

                              {/* Desktop */}

              <div className='hidden lg:flex items-center gap-10 '>
                <button onClick={redirecToLoginPage} className='text-lg px-2'>Login</button>
                <button className='flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 rounded text-white'>
                  {/* add to cart icons */}
                  <div className='animate-bounce'>
                  <GiShoppingCart size={28} />
                  </div>
                  <div className='font-semibold'>
                    <p>My Cart</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )
      }

      <div className='container px-3 lg:hidden mx-auto'>
        <Searchh />
      </div>
    </header>
  )
}

export default Header
