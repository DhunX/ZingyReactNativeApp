import axios from 'axios';

const BASE_URL_STAGING = 'https://api-zingy-staging.herokuapp.com/v1';
const BASE_URL_LOCAL = 'http://localhost:5000/v1';
const BASE_URL_PRODUCTION = 'https://api.zingymusic.com/v1';

import {API_KEY} from '@env';
import Toast from 'react-native-toast-message';

export const getMyInfo = async (token: string) => {
  const uri = `${BASE_URL_STAGING}/profile/my`;
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
      ? `${BASE_URL_STAGING}/info/users?username=${username}`
      : q && q.length
      ? `${BASE_URL_STAGING}/info/users?q=${q}`
      : `${BASE_URL_STAGING}/info/users`;

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
    ? `${BASE_URL_STAGING}/info/cities?city=${city}`
    : `${BASE_URL_STAGING}/info/cities`;
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
  const uri = `${BASE_URL_STAGING}/posts/latest?pageNumber=${pageNumber}&pageItemCount=${limit}`;
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

export const followUser = async ({userId, token}: {userId: string, token: string}) => {
  const uri = `${BASE_URL_STAGING}/profile/follow`;
  try {
    const response = await axios.put(uri, {
      userId: userId,
    }, {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    Toast.show({
      text1: 'Followed',
      type: 'success',
    });
    return response.data;
  } catch (error) {
    return error;
  }
};