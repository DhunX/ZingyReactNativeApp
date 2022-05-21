import axios from 'axios';

export type AuthData = {
  token: string;
  email: string;
  name: string;
};

const logInBasic = async (email: string, password: string) => {
  return axios.post(
    'https://api-zingy-staging.herokuapp.com/v1/login/basic',
    {
      email,
      password,
    },
    {
      headers: {
        'x-api-key': 'b70e1cd3-8133-450b-827b-0ab3fcddee54',
        'Content-Type': 'application/json',
      },
    },
  );
};

const signUp = async (email: string, password: string, name?: string) => {
  return axios.post(
    'https://api-zingy-staging.herokuapp.com/v1/signup/',
    {
      name: name ? name : email,
      email,
      password,
    },
    {
      headers: {
        'x-api-key': 'b70e1cd3-8133-450b-827b-0ab3fcddee54',
        'Content-Type': 'application/json',
      },
    },
  );
};

const signUpWithGoogle = async (email: string, password: string) => {
  return axios.post('https://api.zingy.com/user-module/google-login', {
    username: email,
    email,
    password,
  });
};

export const authServices = {
  logInBasic,
  signUp,
  signUpWithGoogle,
};
