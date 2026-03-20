import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import useMobile from '../../hooks/useMobile';
import { Link } from 'react-router-dom';


const Searchh = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobile] = useMobile()
  const [isSearchPage, setIsSearchPage] = useState(false)


  useEffect(() => {
    const isSearch = location.pathname === "/search"
    setIsSearchPage(isSearch)
  })
  const redirecToSearchPage = () => {
    navigate("/search")
  }
  // console.log(isSearchPage);
  return (
    <div className='w-full lg:min-w-150 min-w-48 lg:10 lg:h-12 rounded-lg lg:rounded-xl  overflow-hidden flex items-center bg-slate-100  group focus-within:border-amber-400'>
      <div>
        {
          (isMobile && isSearchPage) ? (
            <Link to={"/"} className='flex justify-center items-center h-full p-2 m-1 group-focus-within:text-green-500 bg-white rounded-full shadow-md'>
              <FaArrowLeft size={15} />
            </Link>
          ) : (
            <button className='flex justify-center items-center h-full p-2  group-focus-within:text-green-500'>
              <IoSearch size={20} />
            </button>
          )
        }

      </div>

      <div className='w-full'>
        {
          !isSearchPage ? (
            <div onClick={redirecToSearchPage} className='w-full h-full'>
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  'Search "milk"',
                  1000, // wait 1s before replacing "Mice" with "Hamsters"
                  'Search "flour"',
                  1000,
                  'Search "bread"',
                  1000,
                  'Search "sugar"',
                  1000,
                  'Search "egg"',
                  1000,
                  'Search "rice"',
                  1000,
                  'Search "panner"',
                  1000,
                  'Search "chocolate"',
                  1000,
                  'Search "protien"',
                  1000,
                  'Search "curd"',
                  1000,
                  'Search "toys"',
                  1000,
                  'Search "bags"',
                  1000
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
          ) : (
            <div className='w-full h-full flex item-center'>
              <input name='text' type="text" placeholder='Search your items' autoFocus className='bg-transparent w-full h-full outline-none' />
            </div>
          )
        }
      </div>
    </div>
  )
}
export default Searchh
