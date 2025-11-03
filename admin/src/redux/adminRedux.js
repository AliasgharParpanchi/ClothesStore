import {createSlice} from '@reduxjs/toolkit'

const adminSlice = createSlice({
    name : "admin",
    initialState : {
        currentAdmin : null,
        isFetching : false,
        error: null, 
        messageError : null
    },
    reducers : {
        loginStart : (state) => {
            state.isFetching = true;
         
        },
        loginSuccess : (state, action) => {
            state.isFetching = false;
            state.currentAdmin = action.payload;
        },
        loginFailure : (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.messageError = action.payload.response.data;

        },
        //UPDATE
        updateAdminStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateAdminSuccess: (state, action) => {
            state.isFetching = false;
            state.Admin = action.payload.Admin;
        },
        updateAdminFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },//logOut admin
        logOut: (state) => {
            state.currentAdmin = null;
            state.error = null;
            state.messageError = null;
        },
    }
})


export const { loginStart, loginSuccess, loginFailure,
               updateAdminStart,updateAdminSuccess, updateAdminFailure,
               logOut
               } = adminSlice.actions;
export default adminSlice.reducer;
