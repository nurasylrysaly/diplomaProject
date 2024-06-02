const app = require('./app');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const path = require('path');

const PORT = process.env.PORT || 3030;
const API_KEY = 'ec310ba8-50e5-4019-b2cf-5dd62b26f390';
const API_URL = 'https://api.2gis.com/3.0/transport/city_routes';

const server = http.createServer(app);


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
