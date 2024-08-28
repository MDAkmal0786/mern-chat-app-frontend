import {  createContext,  useContext,  useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {io} from 'socket.io-client'
export const SocketContext = createContext( ) ;


  export const useSocketContext=()=>{
    return useContext( SocketContext);
  }


export const SocketContextProvider=({children})=>{

      const [socket , setSocket] = useState(null) ;
      const [onlineUsers , setOnlineUsers] = useState([]) ;
      let user = useSelector( (state)=>state.userReducer.user )
      
      useEffect( ()=>{
     
        if ( user ) {
            const socket = io(import.meta.env.VITE_SERVER , {   // tell backend a connection is made  . . . . when user state is changed
                query:{
                    userId:user._id
                }
            }) ;  
            setSocket(socket) ;

        socket.on("getOnlineUsers" ,(users)=>{setOnlineUsers(users)} );

            return ()=> socket.close() ; 
        }
        else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }


      } , [user] )
     

    
   return  <SocketContext.Provider value={{socket , onlineUsers}}>
    {children}
   </SocketContext.Provider>
}





