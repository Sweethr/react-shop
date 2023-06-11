import { createSlice } from "@reduxjs/toolkit";

export const storeSlice = createSlice({
    name: "popup",
    initialState: {
        value: null
    },
    reducers: {
        set: (state, actions) => {
            state.value = actions.payload;
        }
    }
})

export const { set } = storeSlice.actions
export default storeSlice.reducer