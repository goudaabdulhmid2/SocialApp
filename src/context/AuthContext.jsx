/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { createContext } from "react";
import AuthServices from "../services/AuthServices";
import {Spinner} from "@heroui/react";

export const AuthContext = createContext()


export default function AuthProvider({children}) {

   
    const [token, setToken] = useState(()=>
        localStorage.getItem('userToken')
    )

    const [userData, setUserData] = useState(null)

    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        if(token != null){
            getLoggedUserData();
        }
    },[token])




    async function getLoggedUserData(){
        setIsLoading(true)
        try{
            const {data} = await AuthServices.getLoggedUserData();
            console.log(data.user);
            
            setUserData(data.user)
        
        }catch(err){
            if(err.status == 401 ){
                console.log(err)
                localStorage.removeItem('userToken')
                setToken(null)
            }
        }finally{
            setIsLoading(false)
        }
    }


    
    
    function saveToken(token){
        localStorage.setItem("userToken",token)
        setToken(token)
    }

    function removeToken(){
        setToken(null)
        localStorage.removeItem('userToken')
    }

    function saveUsreData(data){
        setUserData(data)
    }

    function removeUsreData(){
        setUserData(null)
      
    }

    if(isLoading){
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Spinner />
            </div>
        )
    }

    return (
    <AuthContext.Provider value={{token, saveToken, removeToken, userData, saveUsreData, removeUsreData, isLoading}}>
        {children}
    </AuthContext.Provider>
  )
}

