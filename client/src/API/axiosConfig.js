import axios from 'axios';

const axiosBase = axios.create({ 
    // baseURL: 'http://localhost:5500/api/'

    baseURL: 'https://evangadi-forem-api-deploy-server.onrender.com/api'
    });
    
export default axiosBase;