import { configureStore } from '@reduxjs/toolkit'
import storeReducer from './Store/StoreSlice'
import popupReducer from './Store/PopupSlice'
import inventoryReducer from './Store/inventorySlice'

export const store = configureStore({
    reducer: {
        store: storeReducer,
        popup: popupReducer,
        inventory: inventoryReducer
    },
})