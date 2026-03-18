import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
const Search = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isSearchPage,setIsSearchPage]= useState(false)


  useEffect(()=>{
    const isSearch = location.pathname === "/search"
    setIsSearchPage(isSearch)

  })

  const redirecToSearchPage =()=>{
    navigate("/search")

  }
  // console.log(isSearchPage);
  
  return (
    <div className='w-full min-w-75 lg:min-w-95 h-10 rounded-lg border overflow-hidden flex items-center text-neutral-600 bg-slate-50'>
      <button className='flex justify-center items-center h-full p-3'>
      <IoSearch size={22}/>
      </button>
      <div className='w-full'>
        {
          !isSearchPage ? (
            <div onClick={redirecToSearchPage}>
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
            <div className='w-full h-full'>
              <input type="text" placeholder='Search your itemsss' className='bg-transparent w-full h-full outline-none' />
            </div>
          )
        }
      </div>
     
    </div>
  )
}

export default Search
