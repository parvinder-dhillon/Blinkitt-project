import React, { useState } from 'react'
import logooo from '../assets/logooo.png'
import { FaCircleUser } from "react-icons/fa6";
import Searchh from './Search'
import useMobile from '../../hooks/useMobile';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { GiShoppingCart } from "react-icons/gi";
import { useSelector } from 'react-redux';
import UserMenu from './UserMenu';

const Header = () => {
  const [isMobile] = useMobile()
  const location = useLocation()
  const isSearchPage = location.pathname === "/search"
  const navigate = useNavigate()
  const [openUserMenu, setOpenUserMenu] = useState(false)
  const user = useSelector((state) => state?.user)
  console.log("user from store :", user)
  const handleCloseUserMenu=()=>{
    setOpenUserMenu(false)
  }
  const redirecToLoginPage = () => {
    navigate("/login")
  }

  const handleMobileUser =()=>{
    if(!user._id){
      navigate("/login")
      return
    }
    navigate("/user")
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
              <button className=' text-neutral-600 lg:hidden items-center' onClick={handleMobileUser}>
                <FaCircleUser size={22} />
              </button>

              {/* Desktop */}

              <div className='hidden lg:flex items-center gap-10 '>
                {
                  user?._id ? (
                    <div className='relative'>
                      <div onClick={()=>setOpenUserMenu(preve => !preve)} className='flex select-none items-center gap-2 cursor-pointer'>
                        <p>Account</p>
                        {
                          openUserMenu ? (
                            <GoTriangleUp size={25}/>
                          ):(
                            <GoTriangleDown size={25}/>

                          )
                        } 
                      </div>
                      {
                        openUserMenu && (
                          <div className='absolute right-0 top-12'>
                          <div className='bg-white rounded p-4 min-w-52  lg:shadow-lg'>
                            <UserMenu close ={handleCloseUserMenu} />
                          </div>
                        </div>  
                        )
                      } 
               
                    </div>
                  ) : (
                    <button onClick={redirecToLoginPage} className='text-lg px-2'>Login</button>
                  )
                }
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
