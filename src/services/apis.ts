import axios from 'axios';

const BASE_URL = 'https://api-zingy-staging.herokuapp.com/v1';

export const getMyInfo = async (token: string) => {
  const uri = `${BASE_URL}/profile/my`;
  console.log('getMyInfo: ', process.env.API_KEY);
  try {
    const response = await axios.get(uri, {
      headers: {
        'x-api-key': process.env.API_KEY,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllUsers = async (token: string, username?: string) => {
  const uri = username
    ? `${BASE_URL}/info/users?username=${username}`
    : `${BASE_URL}/info/users`;
  try {
    const response = await axios.get(uri, {
      headers: {
        'x-api-key': process.env.API_KEY,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getCities = async (city?: string) => {
  const uri = city
    ? `${BASE_URL}/info/cities?city=${city}`
    : `${BASE_URL}/info/cities`;
  try {
    const response = await axios.get(uri, {
      headers: {
        'x-api-key': process.env.API_KEY,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
