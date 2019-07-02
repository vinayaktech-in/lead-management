import configs from './env_config';
import axios from 'axios';

const secureInstance = axios.create({
  baseURL: configs.api,
  paramsSerializer(params) {
    const searchParams = new URLSearchParams();
    for (const key of Object.keys(params)) {
      const param = params[key];
      if (Array.isArray(param)) {
        for (const p of param) {
          searchParams.append(key, p);
        }
      } else if(param) {
        searchParams.append(key, param);
      }
    }
    return searchParams.toString();
  }
});
secureInstance.defaults.headers.common['Content-Type'] = 'application/json';
export const setAuthHeader = token => {
  console.log('token set >>'+token);
  secureInstance.defaults.headers.common.Authorization = `Bearer ${ token }`;
}
export default secureInstance;
