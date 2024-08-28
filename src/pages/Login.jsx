import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { changeUser } from "../redux/reducer/userReducer";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import axios from 'axios'

const Login = () => {


  let dispatch = useDispatch()

  let [user , setUser] = useState({
    username:'',
    password:'',
     } )

     useEffect ( ( )=>{

      // explicitly dispacth user state based on loacl storage
  
      let user = localStorage.getItem("user");
      if ( user){

        dispatch(changeUser(JSON.parse(user)));
        
      }
  
   } , [] ) ; // for the first time



    async  function submitHandler ( e ) {

      e.preventDefault();

      let { username  , password } = user
     // do some client side input validationbefore makeing backend request
    if (  !username || ! password ){
      toast.error("Fill All details");
      return
    }
   
    else  if ( password.length < 6  ) {
      toast.error("password should be minimum 6 digit") ;
      return
     }

     try {
      let res = await axios.post( `${import.meta.env.VITE_SERVER}/api/auth/login` ,  {
        
         username  , password 
       }) 
      

       localStorage.setItem("user" , JSON.stringify(res.data));
     
        dispatch(changeUser(res.data));

        toast.success(`${res.data.name} logged in successfully` )
       
    } catch (error) {
     //400 error 

    
     toast.error(error.response.data.error) ;
      
    }







     }

  return (
    <div className="min-w-96 p-6 rounded-3xl shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0"> 
      <h1 className="text-3xl font-semibold text-center" >Login <span className="text-blue-500">Chat App</span></h1>
      <form onSubmit={submitHandler}>


     <div>
     <label className="label">Username</label>
     </div>
      <input required value={user.username} onChange={(e)=>setUser({...user , username:e.target.value})} type="text" placeholder="Enter Username" className="input w-full h-10 "/>

      <div>
     <label className="label">Password</label>
     </div>
      <input required value={user.password} onChange={(e)=>setUser({...user , password:e.target.value})} type="password" placeholder="Enter Password" className="input w-full h-10 " />

     
     <Link to={"/signup"} className="label text-blue-500 hover:underline hover:text-blue-300">Create Account</Link>

      <input type="submit" className="btn btn-primary w-full mt-4 text-lg   bg-blue-500  text-white  "/>



      </form>
      </div>
  )
  
}

export default Login