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

export const createJobPost = async (token: string, {genre, skill, location, duration, description}: {genre: string, skill: string, location: string, duration: string, description: string}) => {
    const uri = `${BASE_URL_STAGING}/writer/post`;
    try {
        const response = await axios.post(uri, {
                genre: genre,
                skill: skill,
                location: location,
                duration: duration,
                description: description,
                type: POST_TYPES.JOB_POST,
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

export const createHireMePost = async (token: string, {genre, skill, location, duration, description}: {genre: string, skill: string, location: string, duration: string, description: string}) => {
    const uri = `${BASE_URL_STAGING}/writer/post`;
    try {
        const response = await axios.post(uri, {
                genre: genre,
                skill: skill,
                location: location,
                duration: duration,
                description: description,
                type: POST_TYPES.HIRE_ME_POST,
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

export const createRSVPPost = async (token: string, {eventName, date, location, duration, description}: {eventName: string, date: string, location: string, duration: string, description: string}) => {
    const uri = `${BASE_URL_STAGING}/writer/post`;
    try {
        const response = await axios.post(uri, {
                location: location,
                duration: duration,
                eventName: eventName,
                date: date,
                description: description,
                type: POST_TYPES.EVENT_POST,
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