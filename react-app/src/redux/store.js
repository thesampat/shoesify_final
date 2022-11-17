import { configureStore } from '@reduxjs/toolkit'
import UserSlice  from './authslice'

export default configureStore({
    reducer: {
        user: UserSlice,
    },
  })