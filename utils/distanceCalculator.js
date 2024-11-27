const geolib = require('geolib');
//for sorting mechanism
// googled to calculate the distance landed on this package call geoLib used by many apps 


function calculateDistance(latitude1, longitude1,latitude2,longitude2){

const point1 = {latitude:latitude1, longitude:longitude1}
const point2 = {latitude:latitude2, longitude:longitude2}
return geolib.getDistance(point1, point2) / 1000;


}


module.exports = {
    calculateDistance
}

console.log(calculateDistance(28.7041, 77.1025, 34.0522, -118.2437)); // new delhi and los_angeles
