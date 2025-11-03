import axios from 'axios';

const BASE_URL = 'http://localhost:3000/router/';
let TOKEN = "";
if (localStorage.getItem('persist:root')) {

    const parsedTOKEN = (JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser != null ?
        JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser : null);

    if (parsedTOKEN != null) {
        TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.accesToken;
    }
}

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` }
});