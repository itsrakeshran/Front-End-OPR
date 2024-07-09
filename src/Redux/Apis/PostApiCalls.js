import axiosInstance from '../../utils/axiosInstance';
import { loginStart, loginSuccess, loginFailure, createUserStart, createUserSuccess, createUserFailure } from '../Slices/AuthSlice';
import { vendorsCreateStart, vendorsCreateSuccess, vendorsCreateFailure } from '../Slices/VendorSlice';
import { itemCreateFailure, itemCreateStart, itemCreateSuccess } from '../Slices/ItemSlice';
let token = localStorage.getItem('token');
//Auth API's
export const Login = async (dispatch, formdata) => {
  dispatch(loginStart());
  try {
    const { data } = await axiosInstance.post('/api/user/login', formdata);
    console.log(data);
    localStorage.setItem('token', data.servicetoken);
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFailure(error?.response?.data?.success));
  }
};

export const Signup = async (dispatch, formdata) => {
  dispatch(createUserStart());
  try {
    const { data } = await axiosInstance.post('/api/user/user', formdata);
    dispatch(createUserSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(createUserFailure());
  }
};
//Auth API's ends

//Master APis
export const CreateVendor = async (dispatch, formData) => {
  console.log('data', formData);
  dispatch(vendorsCreateStart());
  try {
    const { data } = await axiosInstance.post('/api/vendor/vendor', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    dispatch(vendorsCreateSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(vendorsCreateFailure());
  }
};
//Master apis ends

//Master Item Api
export const CreateItem = async (dispatch, formData) => {
  dispatch(itemCreateStart());
  try {
    const { data } = await axiosInstance.post('/api/item/item', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    dispatch(itemCreateSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(itemCreateFailure());
  }
};
//Master Item Api end
