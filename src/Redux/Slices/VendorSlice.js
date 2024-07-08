import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
const vendorMasterSlice = createSlice({
  name: 'vendorMaster',
  initialState: {
    vendors: [],
    isFetching: false,
    error: false
  },
  reducers: {
    vendorsFetchStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    vendorsFetchSuccess: (state, action) => {
      toast.success(`Vendor Fetched Successfully`);
      state.isFetching = false;
      state.error = false;
      state.vendors = action.payload.data;
    },
    vendorsFetchFailure: (state) => {
      state.isFetching = true;
      state.error = false;
      toast.error(`An Error has occurred at vendors`);
    }
  }
});

export const { vendorsFetchStart, vendorsFetchSuccess, vendorsFetchFailure } = vendorMasterSlice.actions;

export default vendorMasterSlice.reducer;
