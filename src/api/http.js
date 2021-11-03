import axios from 'axios';

const instance = axios.create({
  timeout: 5000,
  baseURL: 'https://limitless-sierra-67996.herokuapp.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  config => config,
  err => {
    const { response } = err;
    const { status } = response ?? 500;
    if (status >= 500) {
      response.data = {
        message: '서버 에러 잠시 후 다시 시작해주세요.',
      };
    }
    return Promise.reject(response);
  }
);

export default instance;
