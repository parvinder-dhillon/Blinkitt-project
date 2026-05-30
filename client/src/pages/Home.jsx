import React, { useEffect } from 'react'
import banner from '../assets/banner.jpg'
import bannerMobile from '../assets/banner-mobile.jpg'
import { useSelector } from 'react-redux'
const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  
  console.log("categoryData", categoryData)
  const handleRedirectProductListPage = (id, cat) => {
    console.log(id, cat)
  }
  return (
    <section className='min-h-screen px-8 py-2 bg-white'>
      <div className='container h-full mx-auto'>
        <div className={`w-full h-full min-h-48 bg-blue-100 rounded ${!banner && "animate-pulse my-2"}`}>
          <img src={banner} className='w-full h-full hidden lg:block' alt='banner' />
          <img src={bannerMobile} className='w-full h-full lg:hidden' alt='banner' />
        </div>
      </div>
      <div className='container h-full mx-auto px-4 my-2 grid grid-cols-2 md:grid-cols-7 lg:grid-cols-8 gap-2'>
        {
          loadingCategory ? (
            new Array(20).fill(null).map((c, index) => {
              return (
                <div key={index} className='rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
                  <div className='bg-blue-100 min-h-24 rounded'></div>
                  <div className='bg-blue-100 h-8 rounded'></div>
                </div>
              )
            })
          ) : (
            categoryData.map((cat, index) => {
              return (
                <div key={cat._id + index} className='w-full h-full' onClick={handleRedirectProductListPage(cat._id, cat.name)}>
                  <div>
                    <img className='w-full h-full' src={cat.image} alt="" />
                  </div>
                </div>
              )
            })
          )
        }
      </div>
    </section>
  )
}
export default Home
