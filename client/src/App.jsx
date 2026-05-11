import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/footer'
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import fetchUserDetails from './utils/fetchUserDetails';
import { setUserDetails } from './store/userSlice';
import { useDispatch } from 'react-redux';
import { setAllCategory,setAllSubCategory } from './store/productSlice';
import SummaryApi from './common/SummaryApi';
import Axios from './utils/Axios';
import AxiosToastError from './utils/Axios.ToastError';

function App() {

  const dispatch = useDispatch()
  const fetchUser =async()=>{
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
  }
  const fetchCategory =async()=>{
          try {
              const response = await Axios({
                  ...SummaryApi.getCategory
              })
              const { data : responseData} =response
              if(responseData.success){
                dispatch(setAllCategory(responseData?.data?.data))
              }
          } catch (error) {
              AxiosToastError(error)
          }
      }
  const fetchSubCategory =async()=>{
          try {
              const response = await Axios({
                  ...SummaryApi.getSubCategory
              })
              const { data : responseData} =response
              if(responseData.success){
                dispatch(setAllSubCategory(responseData?.data))
              }
          } catch (error) {
              AxiosToastError(error)
          }
      }
  useEffect(()=>{
    fetchUser()
    fetchCategory()
    fetchSubCategory()
  },[])
  return (
     <> 
    <Header/>
      <main className='min-h-[84vh] '>
      <Outlet/>
      </main>
      <Footer/>
      <Toaster/>
    </>
  )
}
export default App
