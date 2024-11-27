const express = require('express');
const {pool} = require('../config/database.js');
const { validateLocationDetails,validateLoationDetails, validateSchoolDetails} = require('../middleware/validation.js');
const {calculateDistance} = require('../utils/distanceCalculator.js');
const { latitudeKeys } = require('geolib');


const router = express.Router();
//to add scool 
router.post('/addSchool', validateSchoolDetails, async(req,res)=> {
    try {
        const {name, address, latitude, longitude} = req.body;
        
        const[result] = await pool.execute(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES(?,?,?,?)',
            [name,address,latitude, longitude]
        );

        res.status(201).json({
            message: 'School registered Successfuly',
            schoolId: result.insertId
        })
    } catch(error){
        console.error('Error adding school', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to add school'
        })
    }
})

//to get school
router.get('/listSchool', validateLocationDetails, async(req,res,next)=>{
    try {

        const {latitude, longitude} = req.query;
        const userLat = parseFloat(latitude);
        const userLong = parseFloat(longitude);

        const [schools] = await pool.execute('SELECt * from schools');
        //calculate distance per school
        const schoolWithDistance = schools.map(school => ({
            ...school,
            distance: calculateDistance(userLat, userLong, school.latitude, school.longitude)
        }));
        const sortedSchools = schoolWithDistance.sort((a,b)=> a.distance - b.distance);
        res.status(200).json({
            total: sortedSchools.length,
            schools: sortedSchools
          });
    } catch(error){
        console.error('error  listing schools: ', error);
        res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to retrieve schools'
        })
    }
})

module.exports = router