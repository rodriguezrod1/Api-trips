const haversine = require('haversine')

const calculateDistance = (point1, point2) => {
    const distance = haversine(point1, point2, { unit: 'km' });
    return distance;
}

module.exports = { calculateDistance }