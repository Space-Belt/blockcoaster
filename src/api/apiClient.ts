import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://rickandmortyapi.com/documentation',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
