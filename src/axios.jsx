import axios from "axios";

export const authFetch = axios.create({
  baseURL: 'https://foodapp-backend-6mjj.onrender.com'
});

authFetch.interceptors.request.use(
  (config) => {
    if (config.url !== '/admin/token') {
      config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    }
    console.log(config.headers.Authorization)
    return config;
  },
  (error) => {
    Promise.reject(error);
  } 
)

authFetch.interceptors.response.use(
  (config) => {
    return config
  },
  async error => {
    const originalRequest = error.config;
    console.log('original request',error.message)
    console.log(error.response)

    // Check if the error response indicates a 'JWT expired' error
    if ((error.response.data.error === 'jwt expired' || error.response.data.error === 'token is not valid') && error.response.data.message.toLowerCase() === 'failed' && !originalRequest._retry) {
      error.config._retry = true; // Mark the request to prevent an infinite loop

      // Refresh tokens here and update the axiosInstance headers with the new tokens
      try {
      console.log('hi da 2');
        const response = await axios.post('https://foodapp-backend-6mjj.onrender.com/admin/token', null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('refreshToken')}`
          }
        });
        const data = await response.data;
        console.log(data)
        if (data.message.toLowerCase() === 'success') {
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          console.log(localStorage.getItem('accessToken'))
          return await axios({ baseURL: 'https://foodapp-backend-6mjj.onrender.com', url: error.response?.config?.url, method: error.response?.method, headers: { Authorization: `Bearer ${data.accessToken}` } });
        }
      } catch (refreshError) {
        console.log(refreshError.message)
        // Handle token refresh error or other errors
        return Promise.reject(refreshError);
      }

      // After refreshing tokens, re-initiate the original request
    }
    // return axiosInstance(originalRequest);
    return Promise.reject(error);
  }
)