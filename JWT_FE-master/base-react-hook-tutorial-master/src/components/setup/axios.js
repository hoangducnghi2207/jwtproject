import axios from "axios";
import {toast} from "react-toastify"
// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: 'http://localhost:8000'
});
instance.defaults.withCredentials=true // show cookie 
// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("jwt")}`;
// // Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
    // config.headers.Authorization
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// // Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return (response)
}, function (err) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  const status = err.response?.status || 500;
  // we can handle global errors here
  switch (status) {
    // authentication (token related issues)
    case 401: {
      // toast.error("not authorize user")
      console.log(32,err.response.data);
      return (err.response.data);
    }

    // forbidden (permission related issues)
    case 403: {
      return Promise.reject(err);
    }

    // bad request
    case 400: {
      return Promise.reject(err);
    }

    // not found
    case 404: {
      return Promise.reject(err);
    }

    // conflict
    case 409: {
      return Promise.reject(err);
    }

    // unprocessable
    case 422: {
      return Promise.reject(err);
    }

    // generic api error (server related) unexpected
    default: {
      return Promise.reject(err);
    }
  }

 
});

export default instance
