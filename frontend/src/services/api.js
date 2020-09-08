import axios from 'axios';

const api = axios.create({
  baseURL: 'http://4d1e7f6efa7f.ngrok.io',
})

export default api;