import axios from 'axios';
import react from 'react';
import { Spin } from 'antd'

Vue.use(Toast);

axios.defaults.baseURL = 'http://dengheng.top:2222/';  
// axios.defaults.headers.common['Authorization'] = token;
axios.defaults.timeout=10000;

//拦截器
axios.interceptors.request.use(function (config) {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration:0
  });
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
 
axios.interceptors.response.use(function (response) {
    Toast.clear();
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

  const http =axios;

  export default http;