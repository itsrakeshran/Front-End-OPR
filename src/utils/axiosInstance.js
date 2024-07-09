import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.8:4000'
  // baseURL: "https://ares.adaptable.app/",
});

export default axiosInstance;
