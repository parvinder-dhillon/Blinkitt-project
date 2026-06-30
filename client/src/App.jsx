import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/footer'
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import fetchUserDetails from './utils/fetchUserDetails';
import { setUserDetails } from './store/userSlice';
import { useDispatch } from 'react-redux';
import { setAllCategory, setAllSubCategory, setLoadingCategory } from './store/productSlice';
import SummaryApi from './common/SummaryApi';
import Axios from './utils/Axios';
import AxiosToastError from './utils/Axios.ToastError';

function App() {
  const dispatch = useDispatch()
  const fetchUser = async () => {
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
  }
  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true))
      const response = await Axios({
        ...SummaryApi.getCategory
      })
      const { data: responseData } = response
      if (responseData.success) {
        dispatch(setAllCategory(responseData?.data?.data))
        dispatch(setLoadingCategory(false))

      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory
      })
      const { data: responseData } = response
      if (responseData.success) {
        dispatch(setAllSubCategory(responseData?.data))
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  useEffect(() => {
    fetchUser()
    fetchCategory()
    fetchSubCategory()
  }, [])
  return (
    <>
    <div className='app'>
    <Header />
    <div className='main-content'>
    <main>
        <Outlet/>
    </main>
    </div>
      <Footer/>
      <Toaster />
    </div>
    </>
  )
}
export default App
