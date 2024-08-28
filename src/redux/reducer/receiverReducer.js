import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  receiver: null,
}

export const receiverReducer = createSlice({
  name: 'receiverReducer',
  initialState,
  reducers: {
  
    changeReceiver: (state, action) => {
      state.receiver = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeReceiver } = receiverReducer.actions