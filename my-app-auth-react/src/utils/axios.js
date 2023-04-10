import axios from 'axios';
import {URL_BACK} from '../constants/path'

const axiosInstance = axios.create({
  baseURL: URL_BACK+'/api/Auth',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
