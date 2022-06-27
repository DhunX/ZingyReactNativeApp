import axios from 'axios';

const BASE_URL_STAGING = 'https://api-zingy-staging.herokuapp.com/v1';
const BASE_URL_LOCAL = 'http://localhost:5000/v1';
const BASE_URL_PRODUCTION = 'https://api.zingymusic.com/v1';

import {API_KEY} from '@env';
import { POST_TYPES } from '../constants';

export const createTextPost = async (token: string, value: string) => {
    const uri = `${BASE_URL_STAGING}/writer/post`;
    try {
        const response = await axios.post(uri, {
              description: value,
              type: POST_TYPES.TEXT_POST,
        }, {
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        return response;
    } catch (error) {
        return error;
    }
};