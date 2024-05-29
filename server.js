const app = require('./app');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const path = require('path');

const PORT = process.env.PORT || 3030;
const API_KEY = 'd593ed8d-ae13-43cd-85c2-4237a688cf02';
const API_URL = 'https://api.2gis.com/3.0/transport/city_routes';

const server = http.createServer(app);


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
