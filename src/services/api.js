// src/services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });
    
    // Assuming the UUID is part of the response
    const userData = {
      ...response.data,
      uuid: response.data.uuid // or the correct property name for UUID
    };

    return userData;
};

const register = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      email,
      password
    });

    // Assuming your server returns data in this structure
    // Adjust based on your actual server response
    const userData = {
      ...response.data,
      uuid: response.data.uuid
    };

    return userData;
  } catch (error) {
    // Handle or throw the error as needed
    console.error('Error in registration:', error);
    throw error;
  }
};

const addMood = async (userId, mood, rating) => {
  const response = await axios.post(`${API_URL}/mood/add`, {
    userId,
    mood,
    rating
  });
  
  return response.data;
};

const getMoodsByUserId = async (userId) => {
  const response = await axios.get(`${API_URL}/mood/user/${userId}`);
  return response.data;
};

export default {
  login,
  register,
  addMood,
  getMoodsByUserId,
  // other methods...
};
