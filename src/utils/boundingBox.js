 const calculateBoundingBox = (readings) => {
     let minLat = Infinity,
         minLon = Infinity,
         maxLat = -Infinity,
         maxLon = -Infinity;

     readings.forEach(reading => {
         minLat = Math.min(minLat, reading.lat);
         minLon = Math.min(minLon, reading.lon);
         maxLat = Math.max(maxLat, reading.lat);
         maxLon = Math.max(maxLon, reading.lon);
     });

     return { minLat, minLon, maxLat, maxLon };
 }

 module.exports = { calculateBoundingBox }