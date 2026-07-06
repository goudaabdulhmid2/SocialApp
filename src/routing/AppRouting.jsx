import { createBrowserRouter } from "react-router-dom";

import UserLayout from '../layouts/UserLayout/UserLayout'
import AuthLayout from '../layouts/AuthLayout/AuthLayout'
import Home from '../pages/Home/Home'
import Profile from '../pages/Profile/Profile'
import NotFound from '../pages/NotFound/NotFound'
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";


export  const router = createBrowserRouter([
    {
        path:'',
        element: <UserLayout/>,
        children: [
            {
                index:true,
                element:<Home/>
            },
            {
                path:'profile',
                element:<Profile/>
            }
        ]
    },
    {
        path:'',
        element:<AuthLayout/>,
        children:[
            {
                path:"login",
                element:<Login/>
            },

            {
                path:'register',
                element:<Register/>
            }
        ]
    },

    {
        path:"*",
        element:<NotFound/>
    }
])