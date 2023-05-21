import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState:{
    user : null,
    userEmail : null
  } ,
  reducers: {
    login: (state,action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
    addEmail: (state,action) => {
      state.userEmail = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { login,logout,addEmail } = userSlice.actions

export default userSlice.reducer