import { configureStore } from '@reduxjs/toolkit'
import iceCreamReducer from './slices/iceCreamSlice'

export const store = configureStore({
  reducer: {
    iceCream: iceCreamReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 