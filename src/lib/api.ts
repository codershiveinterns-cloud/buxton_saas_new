import axios from 'axios';

const api = axios.create({
    baseURL: 'https://buxton-saas-new.onrender.com/api', // Backend server port
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
