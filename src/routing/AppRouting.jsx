import { createBrowserRouter } from "react-router-dom";

import UserLayout from '../layouts/UserLayout/UserLayout'
import AuthLayout from '../layouts/AuthLayout/AuthLayout'
import Home from '../pages/Home/Home'
import Profile from '../pages/Profile/Profile'
import NotFound from '../pages/NotFound/NotFound'
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import ProtectedAuthRoutes from "./ProtectedAuthRoutes";
import ProtectedRoute from "./ProtectedRoute";
import PostDetails from "../pages/post-details/PostDetails";


export  const router = createBrowserRouter([
    {
        path:'',
        element: <UserLayout/>,
        children: [
            {
                index:true,
                element:<ProtectedRoute>
                    <Home/>
                </ProtectedRoute>
            },
            {
                path:'profile',
                element: <ProtectedRoute>
                    <Profile/>
                    </ProtectedRoute>
            },
            {
                path:'posts/:id',
                element:<ProtectedRoute>
                    <PostDetails/>
                </ProtectedRoute>
            }
        ]
    },
    {
        path:'',
        element:<AuthLayout/>,
        children:[
            {
                path:"login",
                element:<ProtectedAuthRoutes>
                            <Login/>
                    </ProtectedAuthRoutes>
            },

            {
                path:'register',
                element:<ProtectedAuthRoutes>
                    <Register/>
                </ProtectedAuthRoutes>
            }
        ]
    },

    {
        path:"*",
        element:<NotFound/>
    }
])