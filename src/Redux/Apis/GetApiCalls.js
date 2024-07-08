import axiosInstance from '../../utils/axiosInstance';
import { loginStart, loginSuccess, loginFailure } from '../Slices/AuthSlice';
import { usersFetchStart, usersFetchSuccess, usersFetchFailure } from '../Slices/usersSlice';
import { itemsFetchStart, itemsFetchSuccess, itemsFetchFailure } from '../Slices/ItemSlice';
import { vendorsFetchStart, vendorsFetchSuccess, vendorsFetchFailure } from '../Slices/VendorSlice';
import { getAllOprStart, getAllOprSuccess, getAllOprFailure } from '../Slices/OprSlice';

let token = localStorage.getItem('token');

//Auth API's
export const Login = async (dispatch, formdata) => {
  dispatch(loginStart());
  try {
    const { data } = await axiosInstance.post('/api/user/login', formdata);
    localStorage.setItem('token', data.servicetoken);
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFailure(error?.response?.data?.success));
  }
};
//Auth API's ends

//vendor Master Api
export const GetVendors = async (dispatch) => {
  dispatch(vendorsFetchStart());
  try {
    const { data } = await axiosInstance.get('/vendor', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch(vendorsFetchSuccess({ data }));
  } catch (error) {
    dispatch(vendorsFetchFailure(error?.response?.data?.success));
  }
};
//vendor Master Api ends

//user Master Api
export const GetUsers = async (dispatch) => {
  dispatch(usersFetchStart());
  try {
    const { data } = await axiosInstance.get('/api/user/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch(usersFetchSuccess({ data }));
  } catch (error) {
    dispatch(usersFetchFailure(error?.response?.data?.success));
  }
};
//User Master Api ends

//item Master Api
export const GetItems = async (dispatch) => {
  dispatch(itemsFetchStart());
  try {
    const { data } = await axiosInstance.get('/item', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch(itemsFetchSuccess({ data: data }));
  } catch (error) {
    dispatch(itemsFetchFailure(error?.response?.data?.success));
  }
};
//item Master Api ends

//Opr APis
export const GetOpr = async (dispatch) => {
  dispatch(getAllOprStart());
  try {
    const { data } = await axiosInstance.get('/opr', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch(getAllOprSuccess({ data }));
  } catch (error) {
    dispatch(getAllOprFailure(error?.response?.data?.success));
  }
};

export const GetOprDraft = async (dispatch, id) => {
  dispatch(getAllOprStart());
  try {
    const { data } = await axiosInstance.get(`/opr/draft/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch(getAllOprSuccess({ data }));
  } catch (error) {
    dispatch(getAllOprFailure(error?.response?.data?.success));
  }
};
//Opr APis ends
