import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
const token = localStorage.getItem('token');
const userInfoString = localStorage.getItem('userInfo');

const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo,
    token,
    isFetching: false,
    error: false,
    errMsg: '',
    isLogged: Boolean(token)
  },
  reducers: {
    loginStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
      state.isLogged = false;
    },
    loginSuccess: (state, action) => {
      state.errMsg = '';
      state.isFetching = false;
      state.error = false;
      state.userInfo = action.payload.user;
      state.token = action.payload.servicetoken;
      state.isLogged = true;
      toast.success(`Logged in Successfully!`);
      localStorage.setItem('token', state.token);
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    },
    loginFailure: (state, action) => {
      state.errMsg = action.payload;
      state.isFetching = false;
      state.error = true;
      state.isLogged = false;
      toast.error(`An error has occurred!`);
    },

    UpdateStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
    },
    UpdateSuccess: (state, action) => {
      state.errMsg = '';
      state.isFetching = false;
      state.userInfo = action.payload.user;
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    },
    UpdateFailure: (state, action) => {
      state.errMsg = action.payload;
      state.isFetching = false;
      state.error = true;
    },
    logOut: (state, action) => {
    
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
    }
  }
});

export const { logOut, loginStart, loginSuccess, loginFailure, UpdateStart, UpdateSuccess, UpdateFailure } = authSlice.actions;
export default authSlice.reducer;
