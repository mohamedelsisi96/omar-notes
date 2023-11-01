import axios from "axios";
import { children, createContext, useState } from "react";



export let UserContext = createContext()

export default function UserContextProvider( {children}){
  let [token,setToken]=useState(window.localStorage.getItem('token'))
 async function sendDataToSignin(values){
return await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signUp',values)
.then((response)=>response)
.catch((error)=>error)
  }

  function LogOutUser(){
    window.localStorage.removeItem('token')
    setToken(null)
  }

    return <UserContext.Provider value={{sendDataToSignin,token,setToken,LogOutUser}}>

        {children}
    </UserContext.Provider>
}