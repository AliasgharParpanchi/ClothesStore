import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        Carts: [],
        quantity: 0,
        total: 0,
        isFetching : false,
        error: false
    },
    reducers: {
        //GET ALL
        getCartStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getCartSuccess: (state, action) => {
            state.isFetching = false;
            state.Carts = action.payload;
        },
        getCartFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        // Add a new Cart
        addCartStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addCartSuccess: (state, action) => {
            state.quantity += 1;
            state.Carts.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
            state.isFetching = false;
        },
        addCartFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        // DELETE Cart
        deleteCartStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteCartSuccess: (state, action) => {
            state.isFetching = false;
            state.Carts.length = 0;
            state.quantity = 0;
            state.total = 0;
        },
        deleteCartFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
})


export const { getCartStart, getCartSuccess, getCartFailure,
    addCartStart, addCartSuccess, addCartFailure,
    deleteCartStart, deleteCartSuccess, deleteCartFailure } = cartSlice.actions;
export default cartSlice.reducer;
