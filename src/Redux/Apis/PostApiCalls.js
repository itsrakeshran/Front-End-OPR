import axiosInstance from '../../utils/axiosInstance';
import { loginStart, loginSuccess, loginFailure } from '../Slices/AuthSlice';

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
