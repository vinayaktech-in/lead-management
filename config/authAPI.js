import configs from './env_config';
import axios from 'axios';

const publicInstance = axios.create({
  baseURL: configs.authApi,
});
publicInstance.defaults.headers.common['Authorization'] = "Basic U2FtcGxlQ2xpZW50SWQ6c2VjcmV0";
publicInstance.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

export default publicInstance;
