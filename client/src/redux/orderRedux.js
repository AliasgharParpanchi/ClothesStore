import { createSlice } from '@reduxjs/toolkit'

const orderSlice = createSlice({
    name: "order",
    initialState: {
        id : null,
        isFetching : false,
        error : false,
        messageError : null
    },
    reducers: {
        // Add a new Order
        addOrderStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addOrderSuccess: (state, action) => {
            state.id = action.payload._id;
            state.isFetching = false;
        },
        addOrderFailure: (state) => {
            state.isFetching = false;
            state.error = true;
            state.messageError = action.payload.response.data;
        },
        //Delete Order from client
        deleteOrder: (state) => {
            state.id = null;
        }
    }
});

export const { deleteOrder,
    addOrderStart, addOrderSuccess, addOrderFailure} = orderSlice.actions;
export default orderSlice.reducer;