import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
}

export const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
  
    changeUser: (state, action) => {
      state.user = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeUser } = userReducer.actions