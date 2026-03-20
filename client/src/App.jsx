import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/footer'
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <Header/>
      <main className='min-h-[84vh]'>
        <Outlet/>
      </main>
      <Footer/>
      <Toaster/>
    </>
  )
}
export default App
