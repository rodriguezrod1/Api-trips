const calculateOverspeedsCount = (readings) => {
    let overspeedsCount = 0;
    let inOverspeedSegment = false;

    for (const reading of readings) {
        if (reading.speed > reading.speedLimit) {
            if (!inOverspeedSegment) {
                overspeedsCount++;
                inOverspeedSegment = true;
            }
        } else {
            inOverspeedSegment = false;
        }
    }

    return overspeedsCount;
}

module.exports = { calculateOverspeedsCount }