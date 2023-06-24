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
    distance: Number,
    duration: Number,
    overspeedsCount: Number,
    boundingBox: {
        minLat: Number,
        maxLat: Number,
        minLon: Number,
        maxLon: Number,
    }
});

module.exports = mongoose.model('Trip', TripSchema);