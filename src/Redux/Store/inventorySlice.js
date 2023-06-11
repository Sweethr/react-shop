import { createSlice } from "@reduxjs/toolkit";

export const storeSlice = createSlice({
    name: "inventory",
    initialState: {
        value: JSON.parse(localStorage.getItem("userInventory")) ? JSON.parse(localStorage.getItem("userInventory")).inventory : []
    },
    reducers: {
        createItem: (state, actions) => {
            state.value.push(actions.payload);
        },
        deleteItem: (state, actions) => {
            state.value = state.value.filter(item => item !== actions.payload);
        },
        addItems: (state, actions) => {
            state.value.concat(actions.payload);
        }
    }
})

export const { createItem, deleteItem, addItems } = storeSlice.actions
export default storeSlice.reducer