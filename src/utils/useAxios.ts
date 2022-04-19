import axios from 'axios';
export default axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Credentials': 'true',
  },
  //   withCredentials: true,
});
