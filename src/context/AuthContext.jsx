/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext()


export default function AuthProvider({children}) {

   
    const [token, setToken] = useState(()=>
        localStorage.getItem('userToken')
    )

    const [userData, setUserData] = useState(()=>
       JSON.parse(localStorage.getItem('userData')) 
    );

    
    
    function saveToken(token){
        localStorage.setItem("userToken",token)
        setToken(token)
    }

    function removeToken(){
        setToken(null)
        localStorage.removeItem('userToken')
    }

    function saveUsreData(data){
        localStorage.setItem('userData',data)
        setUserData(data)
    }

    function removeUsreData(){
        setUserData(null)
        localStorage.removeItem('userData')

        
    }

    
    return (
    <AuthContext.Provider value={{token, saveToken, removeToken, userData, saveUsreData, removeUsreData}}>
        {children}
    </AuthContext.Provider>
  )
}

