import { FaSearch } from "react-icons/fa";
import User from "./User";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from 'axios'
import {useSelector} from 'react-redux'

const Sidebar = () => {

  let user = useSelector((state)=>state.userReducer.user)

  let [searchName,setSearchName] = useState("");
  let [name , setName]=useState("")
  let [data , setData] = useState([]);

  useEffect( ()=> {

      axios.get( `${import.meta.env.VITE_SERVER}/api/users` , { params: { searchName , userId:user._id } } ).then((res)=>{ 
       
        setData(res.data.users);
      }).catch((error)=>{
        toast.error(error.response.data.error )    ;
      })       
     
  } , [searchName] ) ;
  

  return (
    <div className="p-4 h-[500px] w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">

        <form onSubmit={ ( e)=>{ e.preventDefault();  setSearchName(name);  } } className="flex gap-2">
        <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Search..." className="input input-bordered rounded-full"/>
        <button type="submit" className="btn btn-circle bg-sky-500 text-white ">  <FaSearch className="text-lg"/></button>

        </form>
        <div className="divider mb-1"></div>   



       <div className="h-[400px] scrollbar-hide overflow-y-auto">



        {
          data.map((i , index)=><User key={index} user={i}/>)
        }
     
       
       </div>
        </div>
  )
}

export default Sidebar