import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
const userMasterSlice = createSlice({
  name: 'userMaster',
  initialState: {
    users: [],
    isFetching: false,
    error: false
  },
  reducers: {
    usersFetchStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    usersFetchSuccess: (state, action) => {
      toast.success(`Users Fetched Successfully`);
      state.isFetching = false;
      state.error = false;
      state.users = action.payload.data;
    },
    usersFetchFailure: (state) => {
      state.isFetching = true;
      state.error = false;
      toast.error(`An Error has occurred at Users`);
    }
  }
});

export const { usersFetchStart, usersFetchSuccess, usersFetchFailure } = userMasterSlice.actions;

export default userMasterSlice.reducer;
