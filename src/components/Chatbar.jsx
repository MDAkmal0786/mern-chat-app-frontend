import { FiLogOut } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import {  useDispatch, useSelector } from 'react-redux'
import { changeUser } from '../redux/reducer/userReducer'
import axios from "axios";
import {toast} from 'react-hot-toast'
import { changeReceiver } from "../redux/reducer/receiverReducer";
import Bubble from "./Bubble.jsx";
import { BiLoader } from "react-icons/bi";
import { IoSend } from "react-icons/io5";
import { useSocketContext } from "../../utils/socketAuth";
import notification from "../assets/notification.mp3"



const Chatbar = () => {

  const {socket} = useSocketContext() ;

  

  let [sendMessage,setSendMessage] = useState("") ;
  let [loading , setLoading] = useState(false) ;
  let receiver=useSelector( (state)=>state.receiverReducer.receiver ) ;
  let user=useSelector( (state)=>state.userReducer.user ) ;
  let dispatch = useDispatch() ;
  let lastMessageRef = useRef(null); // hold reference to a HTML ELEMENT NOT A REACT COMPONENT
  
 
  let [receiverMessages , setReceiverMessages ]  = useState ( [] ) ;
  let [mssgSent , setMssgSent] = useState(null ) ;


  useEffect(()=>{
    setTimeout(()=>{
lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    },100);


  },[receiverMessages])
  

  useEffect ( ()=> {
    

    axios.get( `${import.meta.env.VITE_SERVER}/api/messages?receiverId=${receiver?._id}&senderId=${user._id}` ).then((res)=>{ 
         
      setReceiverMessages( res.data.messages ) ;
     
      
    }).catch( (error)=>{
      toast.error( error.response.data.error )    ;     
   
    } ) 

  }  , [mssgSent , receiver] ) ;


  //  we when  reciever and online get messages.. listen to it  

  useEffect( ()=>{

    socket?.on("newMessage" , (newMessage)=>{
      let sound = new Audio(notification);  // so mssg is sent to DB as well socket server send to the reciever 
      sound.play();
      setReceiverMessages( [...receiverMessages , newMessage] )
      
    } )
     return ()=>socket?.off("newMessage") ;   // cleanup function for not listen to this event on unmounting
  } , [socket , receiverMessages] ) ;



  async function logoutHandler() {    
        toast.success( "logout successfully" ) ;
        
        localStorage.removeItem("user") ;
        dispatch( changeUser(null) ) ;
        dispatch( changeReceiver(null) ) ;  
  }

  async function sendHandler(e){
    e.preventDefault();
    // send message
    if ( !sendMessage){
      return
    }
    setLoading(true) ;

    try {
      let res = await  axios.post( `${import.meta.env.VITE_SERVER}/api/messages/send?receiverId=${receiver?._id}&senderId=${user._id}` , {message:sendMessage} );
      setSendMessage("");
    } catch (error) {
      toast.error(error.response.data.error)
      
    }finally{
      setLoading(false) ;
      setMssgSent(Math.random()*100);
    }
  }
 

  
  return (
    <div className="bg-gray-400 h-[500px] bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 w-full">

     
        <div className="p-2 bg-gray-500 flex items-center justify-between  ">
        <div className="flex items-center gap-4">
        <div className="w-10 rounded-full"><img  src={receiver.photo} alt="user"/></div>
        <h2 className="text-lg text-black font-bold">{receiver.name}</h2>
        </div>

        <div className="text-white text-xl cursor-pointer" onClick={logoutHandler}>
        <FiLogOut/>
        </div>
      </div>




  {
     <div className="h-[360px]  px-4 py-2 scrollbar-hide overflow-y-auto ">

      {
        receiverMessages.map((message , index)=><div key={index} ref={lastMessageRef}><Bubble message={message}/></div>)
      }
      </div>
  }
 



    <div className="p-4 ">
    <form>
    <label className="input input-bordered flex items-center gap-2  ">
    <input value={sendMessage} onChange={(e)=>{setSendMessage(e.target.value)}} type="text" placeholder="Send a message" className="grow" />
   <button onClick={sendHandler}> {loading?<BiLoader />:<IoSend />} </button>
    </label>
    </form>
    </div>
       
      </div>
  )
}
export default Chatbar