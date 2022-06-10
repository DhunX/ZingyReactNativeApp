import axios from 'axios';

const BASE_URL = 'https://api-zingy-staging.herokuapp.com/v1';

import {API_KEY} from '@env';

export const getMyInfo = async (token: string) => {
  const uri = `${BASE_URL}/profile/my`;
  try {
    const response = await axios.get(uri, {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllUsers = async ({
  token,
  username,
  q,
}: {
  token: string;
  username?: string;
  q?: string;
}) => {
  const uri =
    username && username.length
      ? `${BASE_URL}/info/users?username=${username}`
      : q && q.length
      ? `${BASE_URL}/info/users?q=${q}`
      : `${BASE_URL}/info/users`;

  if (q && q.length) {
    console.log(uri);
  }
  try {
    const response = await axios.get(uri, {
      headers: {
        'x-api-key': API_KEY,
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
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getLatestPosts = async ({
  pageNumber,
  limit,
}: {
  pageNumber: number;
  limit: number;
}) => {
  const uri = `${BASE_URL}/posts/latest?pageNumber=${pageNumber}&pageItemCount=${limit}`;
  try {
    const response = await axios.get(uri, {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
