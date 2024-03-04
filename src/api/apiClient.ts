import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
