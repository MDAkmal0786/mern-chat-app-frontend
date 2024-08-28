import axios from "axios";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import { TbMessages } from "react-icons/tb";
import { changeUser } from "../redux/reducer/userReducer";
import { changeReceiver } from "../redux/reducer/receiverReducer";
import { useDispatch } from "react-redux";


const NoChat = () => {

  let dispatch = useDispatch()

 async function logoutHandler(){
    
        
        localStorage.removeItem("user") ;
        dispatch( changeUser(null) ) ;
        dispatch( changeReceiver(null) ) ;

        toast.success( "Logout Successfully") ;
       
    
  }
  return (
    <div className="bg-gray-400 h-[500px] bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 w-full">
    <div className="h-full w-full flex items-center justify-center relative">
       <div className="text-white text-xl cursor-pointer absolute top-6 right-6 " onClick={logoutHandler} >
        <FiLogOut/>
        </div>
       <div>
       <h1 className="font-extrabold text-2xl text-center">Select a chat to start messaging</h1>
       <TbMessages className="mx-auto text-3xl mt-2" />
       </div>
    </div>
    </div>
  )
}

export default NoChat