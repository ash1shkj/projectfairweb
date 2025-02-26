import React, { createContext, useEffect, useState } from 'react'


export  const addresponseContext=createContext()
export const editResponseContext=createContext()
export const tokenAuthContext=createContext()


function Contextapi({children}) {
    const [addResponse,setaddResponse]=useState("")
    const [editResponse,seteditResponse]=useState("")
    const [authorised,setauthorised]=useState(false)

    useEffect(() => {
      if(sessionStorage.getItem("token")){
        setauthorised(true)
      }
      else{
        setauthorised(false)
      }
      
    }, [authorised])
    



  return (
    <>


  <tokenAuthContext.Provider value={{authorised,setauthorised}}>
     <editResponseContext.Provider value={{editResponse,seteditResponse}}> 
     <addresponseContext.Provider value={{addResponse,setaddResponse}}>
        {children}
    </addresponseContext.Provider>
    </editResponseContext.Provider></tokenAuthContext.Provider>
    
    </>
  )
}

export default Contextapi