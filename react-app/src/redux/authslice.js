import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
  name: 'authSlicer',

  initialState: {
    user: 'None',
  },
  reducers: {
    setuser: (state) => {
     
      state.value = 'SAm'
    },
  },
})

// Action creators are generated for each case reducer function
export const { setuser } = UserSlice.actions

export default UserSlice.reducer