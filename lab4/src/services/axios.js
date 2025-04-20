import axios from 'axios';
import { getAuth } from 'firebase/auth';

const instance = axios.create({
  baseURL: import.meta.env.VITE_DATABASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use(
  async (config) => {
    const user = getAuth().currentUser;

    if (user) {
      const token = await user.getIdToken();
      config.url = config.url + `.json?auth=${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      const result = await memoizedRefreshToken();

      if (result?.accessToken) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${result.accessToken}`,
        };
        return axios(config);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
