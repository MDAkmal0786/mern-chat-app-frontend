import React from 'react'
import Sidebar from '../components/Sidebar.jsx'
import Chatbar from '../components/Chatbar.jsx'
import NoChat from '../components/NoChat.jsx'
import {  useSelector } from 'react-redux';

const Home = () => {
  let receiver=useSelector( (state)=>state.receiverReducer.receiver ) ;
 
  return (
    <div className='flex flex-wrap justify-center h-full overflow-x-auto gap-8 sm:flex-nowrap scrollbar-hide  rounded-lg '>
<Sidebar/>{
  receiver?<Chatbar/>:<NoChat/>

}
    </div>
  )
}

export default Home