const request  = require('supertest')
const { app } = require("../index")
const { Trip } = require('../models/Trip')


// Test data
const testReadings = [{
        "time": 1642500462000,
        "speed": 9,
        "speedLimit": 38,
        "location": {
            "lat": -33.580158,
            "lon": -70.567227
        }
    },
    {
        "time": 1642500466000,
        "speed": 26,
        "speedLimit": 38,
        "location": {
            "lat": -33.58013,
            "lon": -70.566995
        }
    },
    {
        "time": 1642500470000,
        "speed": 28,
        "speedLimit": 38,
        "location": {
            "lat": -33.580117,
            "lon": -70.566633
        }
    },
    {
        "time": 1642500474000,
        "speed": 13,
        "speedLimit": 38,
        "location": {
            "lat": -33.580078,
            "lon": -70.566408
        }
    },
    {
        "time": 1642500478000,
        "speed": 18,
        "speedLimit": 38,
        "location": {
            "lat": -33.580005,
            "lon": -70.566498
        }
    },
    {
        "time": 1642500482000,
        "speed": 32,
        "speedLimit": 38,
        "location": {
            "lat": -33.58002,
            "lon": -70.566837
        }
    },
    {
        "time": 1642500486000,
        "speed": 38,
        "speedLimit": 38,
        "location": {
            "lat": -33.580038,
            "lon": -70.567265
        }
    },
    {
        "time": 1642500490000,
        "speed": 38,
        "speedLimit": 38,
        "location": {
            "lat": -33.580043,
            "lon": -70.56773
        }
    },
    {
        "time": 1642500494000,
        "speed": 35,
        "speedLimit": 38,
        "location": {
            "lat": -33.580048,
            "lon": -70.56817
        }
    },
    {
        "time": 1642500498000,
        "speed": 20,
        "speedLimit": 38,
        "location": {
            "lat": -33.580053,
            "lon": -70.568502
        }
    }
];


/*beforeEach(async() => {
    await Trip.deleteMany();
});*/


describe('POST /api/trips', () => {
    test('Debe crear y guardar un nuevo viaje', async() => {
        const response = await request(app)
            .post('/api/trips')
            .send({ readings: testReadings });

        expect(response.status).toBe(201);

        const trip = await Trip.findById(response.body._id);
        expect(trip).toBeDefined();
        expect(trip.readings.length).toBe(testReadings.length);
    });
});


describe('GET /api/trips', () => {
    test('Debe devolver una lista de viajes', async() => {
        const response = await request(app).get('/api/trips').send();
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(0);
    });
});
