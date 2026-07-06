/* eslint-disable react-refresh/only-export-components */
import {useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext()


export default function AuthProvider({children}) {
    const [token, setToken] = useState(()=>
        localStorage.getItem('userToken')
    )
    
    function saveToken(token){
        localStorage.setItem("userToken",token)
        setToken(token)
    }

    function removeToken(){
        setToken(null)
        localStorage.removeItem('userToken')
    }

    
    return (
    <AuthContext.Provider value={{token, saveToken, removeToken}}>
        {children}
    </AuthContext.Provider>
  )
}

