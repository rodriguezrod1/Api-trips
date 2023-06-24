const {get, store } = require('../controllers/tripsController')
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


describe('get', () => {

    it('should return all trips', async() => {
        const trips = await get();
        expect(trips).toBeDefined();
        expect(trips.length).toBeGreaterThan(0);
    });

    it('should filter trips by start time', async() => {
        const start_gte = '2023-06-24T00:00:00Z';
        const trips = await get({ start_gte });
        expect(trips.length).toBeGreaterThan(0);
        for (const trip of trips) {
            expect(trip.start.time).toBeGreaterThanOrEqual(start_gte);
        }
    });

    it('should filter trips by end time', async() => {
        const start_lte = '2023-06-24T00:00:00Z';
        const trips = await get({ start_lte });
        expect(trips.length).toBeGreaterThan(0);
        for (const trip of trips) {
            expect(trip.start.time).toBeLessThanOrEqual(start_lte);
        }
    });

    it('should filter trips by distance', async() => {
        const distance_gte = 100;
        const trips = await get({ distance_gte });
        expect(trips.length).toBeGreaterThan(0);
        for (const trip of trips) {
            expect(trip.distance).toBeGreaterThanOrEqual(distance_gte);
        }
    });
});



describe('store', () => {
    it('should create a new trip', async() => {
        const readings = [{
                time: '2023-06-24T00:00:00Z',
                location: {
                    lat: 10,
                    lon: 10
                }
            },
            {
                time: '2023-06-24T01:00:00Z',
                location: {
                    lat: 20,
                    lon: 20
                }
            }
        ];
        const trip = await store({ readings });
        expect(trip).toBeDefined();
        expect(trip.start.time).toBe(readings[0].time);
        expect(trip.end.time).toBe(readings[1].time);
        expect(trip.distance).toBe(100);
    });

    it('should fail if the readings are not valid', async() => {
        const readings = [{ time: '2023-06-24T00:00:00Z' }];
        try {
            await store({ readings });
            fail('Should have thrown an error');
        } catch (error) {
            expect(error.message).toBe('Se requieren al menos 5 lecturas para construir un viaje.');
        }
    });
});