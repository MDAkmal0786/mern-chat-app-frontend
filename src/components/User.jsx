import { useDispatch, useSelector } from "react-redux";
import { changeReceiver } from "../redux/reducer/receiverReducer";
import { useSocketContext } from "../../utils/socketAuth";


const User = ({user}) => { 
  
  const {onlineUsers} = useSocketContext( ) ;
  const isOnline=onlineUsers.includes( user._id ) ;

  let dispatch = useDispatch() ;
  let receiver=useSelector( (state)=>state.receiverReducer.receiver ) ;

  

  


  return (
    <>
    <div className={`flex gap-6 p-2 items-center rounded cursor-pointer hover:bg-sky-500 ${ receiver?._id===user._id?"bg-sky-500":""}`  }  onClick={ ()=>{dispatch(changeReceiver(user))}}>

<div className={`avatar ${isOnline?"online":""}`}>
  <div className="w-12 rounded-full">
    <img src={user.photo} alt="user" />
  </div>
</div>

<div className="text-md text-white">{user.name}</div>
        
    </div>
    <div className="divider my-[1px]"></div>
    </>

  )
}

export default User