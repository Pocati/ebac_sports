import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Produto } from '../types'

type FavoritosState = {
  items: Produto[]
}

const initialState: FavoritosState = {
  items: []
}

const favoritosSlice = createSlice({
  name: 'favoritos',
  initialState,
  reducers: {
    favoritar: (state, action: PayloadAction<Produto>) => {
      const produto = action.payload
      const index = state.items.findIndex((p) => p.id === produto.id)

      if (index !== -1) {
        state.items.splice(index, 1)
      } else {
        state.items.push(produto)
      }
    }
  }
})

export const { favoritar } = favoritosSlice.actions
export default favoritosSlice.reducer