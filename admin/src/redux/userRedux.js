import { createSlice } from "@reduxjs/toolkit";


const UserSlice = createSlice({
    name: "User",
    initialState: {
        Users: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        //GET ALL
        getUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getUserSuccess: (state, action) => {
            state.isFetching = false;
            state.Users = action.payload;
        },
        getUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const {
    getUserStart,
    getUserSuccess,
    getUserFailure
} = UserSlice.actions;
export default UserSlice.reducer;