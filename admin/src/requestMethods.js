import axios from 'axios';
import { useSelector } from 'react-redux';

const BASE_URL = 'http://localhost:3000/router/';

let TOKEN = "";

if (localStorage.getItem('persist:root')) {

    const parsedTOKEN = (JSON.parse(JSON.parse(localStorage.getItem('persist:root')).admin).currentAdmin != null ?
        JSON.parse(JSON.parse(localStorage.getItem('persist:root')).admin).currentAdmin : null);

    if (parsedTOKEN != null) {
        TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).admin).currentAdmin.accesToken;
    }
}

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const adminRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` }
});