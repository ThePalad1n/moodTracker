// src/services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:3001/api';   // replace with your API base URL

const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password
    });
    
    return response.data;
};

// Add more API methods as needed

export default {
  login,
  // other methods...
};