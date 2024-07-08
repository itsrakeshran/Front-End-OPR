import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
const itemMasterSlice = createSlice({
  name: 'itemMaster',
  initialState: {
    items: [],
    isFetching: false,
    error: false
  },
  reducers: {
    itemsFetchStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    itemsFetchSuccess: (state, action) => {
      toast.success(`Items Fetched Successfully`);
      state.isFetching = false;
      state.error = false;
      state.items = action.payload.data;
    },
    itemsFetchFailure: (state) => {
      state.isFetching = true;
      state.error = false;
      toast.error(`An Error has occurred at Items`);
    }
  }
});

export const { itemsFetchStart, itemsFetchSuccess, itemsFetchFailure } = itemMasterSlice.actions;

export default itemMasterSlice.reducer;
