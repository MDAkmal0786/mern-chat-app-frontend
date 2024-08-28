import React, { lazy, Suspense, useEffect } from 'react'
import {Toaster} from 'react-hot-toast'

const Home = lazy(() => import('./pages/Home.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Signup = lazy(() => import('./pages/Signup.jsx'));

import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Loader from './components/Loader.jsx';
import { useSelector } from 'react-redux';

const App = ( ) => {



  let userState = useSelector((state)=>state.userReducer.user)
  return (
    <div className='p-4 h-screen  flex justify-center items-center'>
      <BrowserRouter>
      <Suspense fallback={<Loader/>}>
      <Routes>

      <Route path='/' element={userState?<Home/>:<Navigate to={"/login"}/>} />
      <Route path='/login' element={userState?<Navigate to={"/"}/>:<Login/>} />
      <Route path='/signup' element={userState?<Navigate to={"/"}/>:<Signup/>} />

      </Routes>
      <Toaster/>
     </Suspense>
      </BrowserRouter>
      
      </div>
      
  )
}

export default App ;


//   vite gives auto bundler to run 

// desgin pages ------->>>>

//   add style in index.css
//   or add another scss file in main
//   for tailwind add 

//  @tailwind base;
//  @tailwind components;
//  @tailwind utilities;
//  In index.css

// add tailwind css intellisense  ext

//  dasiy ui gives direct -  componenets classes to add directly in tailwind ...insataalation:  add from website in tailwind.config.js  --- plugins
// example daisy ui className="label input btn-primary checkbox divider avatar" make the comopnent label input and button with all focus border transition



//  make and connect a  single page application  ------------------------------------>>>>>>>>>>>>>>>>>>>>>
// npm install react-router-dom
// BrowserRouter  Routes  Route path eleemnt
// lazy loading
// loader on suspense fal back


//  connect to backend /
//  AXIOS . . . console the response and handle accordingly . . . . . . . .use try catch for Seperating  error.... can use a bool state for checking data is fetched or not in try-cath.. FINALYY
// in axios res.data   .or.. res.response.data for error
// R T K - q u e r y      has everyting isError...isloadind
// 1) npm react-hot-toast ...add <Toaster/> in app.jsx after Routes



//  2) input V A L I D A T I O N    B O T H   C L I E N  T    A N D    S E R V E R    S I D E
// data should be validated on both client and backend side  .. client .. to not make a unneccessary backend call  .. backend ... as user can hit with postman as well or other client 


// Cors cross origin resourse sharing
// if diff backend and server deployed then enable cors in  B a c k e n d
 // other wise in frontend vite config



 //    A U T H E N T I A C T I O N

// on login signup  have a global user state changed to user
// and protected routes work accordingly
// login sign up work on no user otherwise redirected to home
// home wrk on user otherwise redirected to signup


// add .env by dotenv install .. write keys as VITE_......   and use  import.meta.env

// d e p l o y i n g

// ignore .env nodemodules     
// node modules will be downloades on {npm insatll} 


// while deployed add env keys
// by default build commmand == 0)npm run build  1)npm insatll 2) npm run dev . to start 


