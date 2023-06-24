const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    start: {
        time: Number,
        lat: Number,
        lon: Number,
        address: String,
    },
    end: {
        time: Number,
        lat: Number,
        lon: Number,
        address: String,
    },
    duration: Number,
    distance: Number,
    overspeedsCount: Number,
    boundingBox: {
        minLat: Number,
        maxLat: Number,
        minLon: Number,
        maxLon: Number,
    },
    readings: [{
        time: Number,
        lat: Number,
        lon: Number,
        speed: Number,
        speedLimit: Number,
    }, ],
});

module.exports = mongoose.model('Trip', TripSchema);