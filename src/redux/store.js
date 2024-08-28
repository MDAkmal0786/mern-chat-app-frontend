import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './reducer/userReducer'
import { receiverReducer } from './reducer/receiverReducer'

export const store = configureStore ( {
  reducer : {
  
       userReducer : userReducer.reducer ,
       receiverReducer : receiverReducer.reducer ,

  } ,
})