const axios = require('axios');

async function getAddressFromCoordinates(lat, lon) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
    try {
        const response = await axios.get(url);
        return response.data.display_name;
    } catch (error) {
        console.error('Error fetching address:', error);
        return null;
    }
}

module.exports = { getAddressFromCoordinates };