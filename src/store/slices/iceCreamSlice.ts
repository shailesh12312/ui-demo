import { createSlice } from '@reduxjs/toolkit'

export interface IceCream {
  name: string
  rating: number
  color: string
  rotation: string
}

interface IceCreamState {
  items: IceCream[]
}

const initialState: IceCreamState = {
  items: [
    { name: "Vanilla", rating: 4.5, color: "bg-yellow-100", rotation: "rotate-12" },
    { name: "Chocolate", rating: 4.7, color: "bg-amber-900", rotation: "rotate-0" },
    { name: "Strawberry", rating: 4.3, color: "bg-pink-400", rotation: "-rotate-12" },
    { name: "Mint", rating: 4.2, color: "bg-green-400", rotation: "rotate-12" },
    { name: "Blueberry", rating: 4.4, color: "bg-blue-400", rotation: "rotate-0" },
    { name: "Mango", rating: 4.6, color: "bg-amber-500", rotation: "-rotate-12" },
    { name: "Pistachio", rating: 4.1, color: "bg-green-600", rotation: "rotate-12" },
    { name: "Coffee", rating: 4.8, color: "bg-brown-500", rotation: "rotate-0" },
    { name: "Raspberry", rating: 4.3, color: "bg-red-400", rotation: "-rotate-12" },
    { name: "Coconut", rating: 4.0, color: "bg-gray-100", rotation: "rotate-12" },
  ]
}

export const iceCreamSlice = createSlice({
  name: 'iceCream',
  initialState,
  reducers: {}
})

export default iceCreamSlice.reducer 