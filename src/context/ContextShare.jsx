import React,{useState,createContext} from "react"

export const addProjectResponseContext = createContext();
export const editProjectResponseContext = createContext();
function ContextShare ({children}) {
  // children is a predefined props name used to share data between components
  // Creating a state that needs to be shared
  const [addProjectResponse, setAddProjectResponse] = useState([]);
  const [editProjectResponse, seteditProjectResponse] = useState([]);
  return (
    <>
      <addProjectResponseContext.Provider value={{addProjectResponse, setAddProjectResponse}}> 
        <editProjectResponseContext.Provider value={{editProjectResponse, seteditProjectResponse}}>
          {children}
          </editProjectResponseContext.Provider>
      </addProjectResponseContext.Provider>

    </>
  )
}


export default ContextShare;
