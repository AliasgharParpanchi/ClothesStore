import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: null,
        messageError: null
    },
    reducers: {
        //login
        loginStart: (state) => {
            state.isFetching = true;
            state.messageError= null;
            state.error = false;

        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.messageError= null;
            state.error = false;
            state.currentUser = action.payload;

        },
        loginFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.messageError = action.payload.response.data || 'خطایی پیش آمده دوباره امتحان کنید';

        },//Register
        registerStart: (state) => {
            state.isFetching = true;
            state.error = null;
            state.messageError = null;
        },
        registerSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = null;
            state.messageError = null;
        },
        registerFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.messageError = action.payload.response.data || 'خطایی پیش آمده دوباره امتحان کنید';
        },
        // Update User
        updateUserStart: (state) => {
            state.isFetching = true;
            state.error = null;
            state.messageError = null;
        },
        updateUserSuccess: (state, action) => {
            state.isFetching = false;
            state.messageError= null;
            state.error = false;
            state.currentUser = action.payload;
        },
        updateUserFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.messageError = action.payload.response.data || 'خطایی پیش آمده دوباره امتحان کنید';
        },
        //خروج از حساب کاربری
        logout: (state) => {
            state.currentUser = null;
            state.error = null;
            state.messageError = null;
        },
        //حذف حساب کاربری
        deleteAccountStart: (state) => {
            state.isFetching = true;
            state.error = null;
            state.messageError = null;
          },
          deleteAccountSuccess: (state) => {
            state.isFetching = false;
            state.currentUser = null;
            state.error = null;
            state.messageError = null;
          },
          deleteAccountFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.messageError = action.payload.response.data || 'خطایی پیش آمده دوباره امتحان کنید';
          },

    }
})


export const { loginStart, loginSuccess, loginFailure,
    registerStart, registerSuccess, registerFailure,
    updateUserStart, updateUserSuccess, updateUserFailure,
    logout, deleteAccountStart, deleteAccountSuccess, deleteAccountFailure,
} = userSlice.actions;
export default userSlice.reducer;
