const Trip = require('../models/Trip')
const { getAddress } = require('../utils/geocode')
const { calculateBoundingBox } = require("../utils/boundingBox")
const { calculateOverspeedsCount } = require("../utils/overSpeeds")
const { calculateDistance } = require("../utils/distance")


function testing(req, res) {
    return res.json({ message: "Test API." });
}


const get = async(req, res) => {

    // Aplicar filtros y paginación
    const { start_gte, start_lte, distance_gte, limit, offset } = req.query;
    const query = Trip.find();

    if (start_gte) query.where('start.time').gte(start_gte);
    if (start_lte) query.where('start.time').lte(start_lte);
    if (distance_gte) query.where('distance').gte(distance_gte);

    if (limit) query.limit(parseInt(limit));
    if (offset) query.skip(parseInt(offset));

    try {
        const trips = await query.exec();
        return res.json(trips);
    } catch (error) {
        console.error('Error fetching trips:', error);
        return res.status(500).json({ message: 'Error fetching trips' });
    }
}


const store = async(req, res) => {

    const { readings } = req.body;

    if (readings.length < 5) {
        res.status(400).json({ message: 'Se requieren al menos 5 lecturas para construir un viaje.' });
        return;
    }

    if (readings.some(reading => !reading.time)) {
        res.status(400).json({ message: 'Todas las lecturas deben tener la propiedad time.' });
        return;
    }

    readings.sort((a, b) => a.time - b.time);

    const startReading = readings[0];
    const endReading = readings[readings.length - 1];

    const startLat = startReading.location.lat;
    const startLon = startReading.location.lon;

    const endLat = endReading.location.lat;
    const endLon = endReading.location.lon;

    const startAddress = await getAddress(startLat, startLon);
    const endAddress = await getAddress(endLat, endLon);

    const duration = endReading.time - startReading.time;
    const distance = readings.reduce((acc, curr, index) => {
        if (index === 0) return 0;
        return acc + calculateDistance(readings[index - 1], curr);
    }, 0);

    const overspeedsCount = calculateOverspeedsCount(readings);
    const boundingBox = calculateBoundingBox(readings);

    const trip = new Trip({
        start: {
            time: startReading.time,
            lat: startLat,
            lon: startLon,
            address: startAddress
        },
        end: {
            time: endReading.time,
            lat: endLat,
            lon: endLon,
            address: endAddress
        },
        duration,
        distance,
        overspeedsCount,
        boundingBox
    });

    await trip.save();
    res.status(201).json(trip);
}


module.exports = {get, store, testing }