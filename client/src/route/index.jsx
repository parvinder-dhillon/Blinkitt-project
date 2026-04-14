import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Search from '../pages/Search'
import Register from '../pages/Register'
import Login from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword'
import VerifyForgotPasswordOtp from '../pages/VerifyForgotPasswordOtp'
import ResetPassword from '../pages/ResetPassword'
import UserMenuMobile from '../pages/UserMenuMobile'
import Dashboard from '../layout/Dashboard'
import Profile from '../pages/Profile'
import MyOrders from '../pages/MyOrders'
import Address from '../pages/Address'
import Category from '../pages/Category'
import SubCategory from '../pages/SubCategory'
import UploadProduct from '../pages/UploadProduct'
import ProductAdmin from '../pages/ProductAdmin'
const router = createBrowserRouter([
    {
        path:"",
        element:<App/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"search",
                element:<Search/>
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"register",
                element:<Register/>
            },
            {
                path:"forgot-password",
                element:<ForgotPassword/>
            },
            {
                path:"verify-forgot-password-otp",
                element:<VerifyForgotPasswordOtp/>
            },
            {
                path:"reset-password",
                element:<ResetPassword/>
            },
            {
                path:"user",
                element:<UserMenuMobile/>
            },
            {
                path:"dashboard",
                element:<Dashboard/>,
                children:[
                    {
                        path:"profile",
                        element:<Profile/>
                    },
                    {
                        path:"myorders",
                        element:<MyOrders/>
                    },
                    {
                        path:"address",
                        element:<Address/>
                    },
                    {
                        path:"category",
                        element:<Category/>
                    },
                    {
                        path:"product",
                        element:<ProductAdmin/>
                    },
                    {
                        path:"subCategory",
                        element:<SubCategory/>
                    },
                    {
                        path:"uploadProduct",
                        element:<UploadProduct />
                    },
                ]
            }

        ]

    }
])

export default router