
import MySnackBar from "../MySnackBar";
import { createContext, useContext } from "react";
//import ToDoList from "../ToDoList";
import { useState } from "react";
export  const ToastContext = createContext();
export const ToastProvider = ({children}) => {
    const [open, setOpen] = useState(false);
    const [Message, setMessage] = useState("");

    function showHideToast(message) {
        setOpen(true);
        setMessage(message);
        setTimeout(() => {
          setOpen(false);
        }, 2500);
      }
  return <ToastContext.Provider  value={{ showHideToast }}>
          <MySnackBar Open={open}message={Message} />
    
    {children}
    
    </ToastContext.Provider>;
};
 export const useToast=()=>{
    return useContext(ToastContext)
 }
