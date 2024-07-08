import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './Slices/AuthSlice';
import VendorSlice from './Slices/VendorSlice';
import usersSlice from './Slices/usersSlice';
import ItemSlice from './Slices/ItemSlice';
import OprSlice from './Slices/OprSlice';
import VerticalSlice from './Slices/VerticalSlice';

export default configureStore({
  reducer: {
    auth: AuthSlice,
    vendorMaster: VendorSlice,
    usersMaster: usersSlice,
    itemMaster: ItemSlice,
    verticle: VerticalSlice,
    opr: OprSlice
  }
});
