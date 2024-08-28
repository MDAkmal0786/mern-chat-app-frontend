import { useState } from "react"
import { Link } from "react-router-dom"
import  toast from 'react-hot-toast'
import axios from 'axios'
import {  useDispatch } from 'react-redux'
import { changeUser } from '../redux/reducer/userReducer'

const Signup = () => {

 
  let dispatch = useDispatch();

  let [user , setUser] = useState({

    name:'',
    username:'',
    password:'',
    confirmPassword:'',
    gender:''

  } )

   
  async function submitHandler( e ) {

    e.preventDefault() ;

    let {name , username  , password , confirmPassword , gender} = user
     // do some client side input validationbefore makeing backend request
    if ( !name || !username || ! password || !confirmPassword || !gender){
      toast.error("Fill All details");
      return
    }
    else if ( password != confirmPassword  ) {
      toast.error("password dont match") ;
      return
     }
    else  if ( password.length < 6  ) {
      toast.error("password should be minimum 6 digit") ;
      return
     }

  //  c o n n n e c t   t o   b a k e n d

    try {
      let res = await axios.post(`${import.meta.env.VITE_SERVER}/api/auth/signup` ,  {
        
        name , username  , password , confirmPassword , gender 
       }) 

       
       localStorage.setItem("user" , JSON.stringify(res.data));
        dispatch(changeUser(res.data));

        toast.success("user registered successfully")
       
    } catch (error) {
     //400 error 
      toast.error(error.response.data.error) ;
      
    }





  
  }

    

  return (
    <div className="min-w-96 p-6 rounded-3xl shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0"> 
      <h1 className="text-3xl font-semibold text-center" >Signup <span className="text-blue-500">Chat App</span></h1>

      <form onSubmit={submitHandler} >
     <div>
     <label className="label">Name</label>
     </div>
      <input value={user.name} onChange={(e)=>setUser({...user , name:e.target.value })} required type="text" placeholder="Enter Name" className="input w-full h-10 "/>

     <div>
     <label className="label">Username</label>
     </div>
      <input value={user.username} onChange={(e)=>setUser({...user , username:e.target.value })} required type="text" placeholder="Enter Username" className="input w-full h-10 "/>

      <div>
     <label className="label">Password</label>
     </div>
      <input value={user.password} onChange={(e)=>setUser({...user , password:e.target.value })} required type="password" placeholder="Enter Password" className="input w-full h-10 " />
      <div>
     <label className="label">Confirm Password</label>
     </div>
      <input value={user.confirmPassword} onChange={(e)=>setUser({...user , confirmPassword:e.target.value })} required type="password" placeholder="Enter Password" className="input w-full h-10 " />

      <div className="mt-6">
        <input checked={user.gender==="male"} onChange={()=>setUser({...user , gender:"male"} ) }  className="checkbox  " type="checkbox"/>
        <label className="label inline-block mx-1">Male</label>
        <input checked={user.gender==="female"} onChange={()=>setUser({...user , gender:"female"})} className="checkbox " type="checkbox"/>
        <label className="label inline-block mx-1">Female</label>
      </div>

     <Link to={"/login"} className="label text-blue-500 hover:underline hover:text-blue-300">Allready have an Account?</Link>

      <input type="submit" className="btn btn-primary w-full mt-4 text-lg bg-blue-500  text-white  "/>

      </form>
      </div>
  )
}

export default Signup;

