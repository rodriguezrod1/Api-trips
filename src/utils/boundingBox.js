 const calculateBoundingBox = (readings) => {
     let minLat = Infinity,
         minLon = Infinity,
         maxLat = -Infinity,
         maxLon = -Infinity;

     readings.forEach(reading => {
         minLat = Math.min(minLat, reading.location.lat);
         minLon = Math.min(minLon, reading.location.lon);
         maxLat = Math.max(maxLat, reading.location.lat);
         maxLon = Math.max(maxLon, reading.location.lon);
     });

     return { minLat, minLon, maxLat, maxLon };
 }

 module.exports = { calculateBoundingBox }