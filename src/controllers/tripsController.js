const Trip = require('../models/Trip');
const { getAddressFromCoordinates } = require('../utils/geocode');


function testing(req, res) {
    return res.json("test");
}


async function get(req, res) {

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
        return res.status(500).json({ error: 'Error fetching trips' });
    }
}


async function store(req, res) {

    const { readings } = req.body;

    if (readings.length < 5) {
        res.status(400).send('Se requieren al menos 5 lecturas para construir un viaje.');
        return;
    }

    if (readings.some(reading => !reading.time)) {
        res.status(400).send('Todas las lecturas deben tener la propiedad time.');
        return;
    }

    readings.sort((a, b) => a.time - b.time);

    const startReading = readings[0];
    const endReading = readings[readings.length - 1];

    const startAddress = await getAddress(startReading.lat, startReading.lon);
    const endAddress = await getAddress(endReading.lat, endReading.lon);

    const duration = endReading.time - startReading.time;
    const distance = readings.reduce((acc, curr, index) => {
        if (index === 0) return 0;
        return acc + calculateDistance(readings[index - 1], curr);
    }, 0);

    const overspeedsCount = calculateOverspeedsCount(readings);
    const boundingBox = calculateBoundingBox(readings);

    const trip = new Trip({
        start: { time: startReading.time, address: startAddress },
        end: { time: endReading.time, address: endAddress },
        duration,
        distance,
        overspeedsCount,
        boundingBox,
        readings
    });

    await trip.save();
    res.status(201).json(trip);

}


module.exports = {get, store, testing };