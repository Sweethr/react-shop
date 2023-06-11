import { createSlice } from "@reduxjs/toolkit";

export const storeSlice = createSlice({
    name: "store",
    initialState: {
        value: []
    },
    reducers: {
        add: (state, actions) => {
            let { text, id } = actions.payload
            state.value.push({ text, id, status: false });
        }
    }
})

export const { add, remove, status } = storeSlice.actions
export default storeSlice.reducer