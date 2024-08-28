import React from 'react'
import { useSelector } from 'react-redux';
import { extractTime } from '../../utils/extractTime';

const Bubble = ({message}) => {//chat-end

  

   

    let receiver=useSelector( (state)=>state.receiverReducer.receiver ) ;
    let user=useSelector( (state)=>state.userReducer.user ) ;
    return (
        <div className={`chat ${message.senderId===user._id?"chat-end":"chat-start"}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="bubble"
              src={`${message.senderId===user._id?user.photo:receiver.photo}`} />
          </div>
        </div>
       
        <div className={`chat-bubble  text-white  ${message.senderId===user._id?"bg-sky-500":"bg-gray-400"}`}>{message.message}</div>
        <div className="chat-footer opacity-50">{extractTime(message.createdAt)}</div>
      </div>
      )
  
}

export default Bubble