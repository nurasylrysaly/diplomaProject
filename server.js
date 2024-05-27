const app = require('./app');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const path = require('path');

const PORT = process.env.PORT || 3030;
const API_KEY = 'd593ed8d-ae13-43cd-85c2-4237a688cf02';
const API_URL = 'https://api.2gis.com/3.0/transport/city_routes';

// const server = http.createServer(app);
// const io = socketIo(server);

// const fetchBusData = async () => {
//     try {
//         const response = await axios.get(API_URL, {
//             params: {
//                 key: API_KEY,
//                 point: '71.449074,51.169392',
//                 radius: 1000,
//                 transport_type: 'bus'
//             }
//         });
//         console.log('Bus Data:', response.data); // Log data to verify format
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching bus data:', error);
//         return [];
//     }
// };

// io.on('connection', (socket) => {
//     console.log('New client connected');

//     const intervalId = setInterval(async () => {
//         const data = await fetchBusData();
//         socket.emit('busData', data);
//     }, 5000); // Fetch data every 5 seconds

//     socket.on('disconnect', () => {
//         clearInterval(intervalId);
//         console.log('Client disconnected');
//     });
// });

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
