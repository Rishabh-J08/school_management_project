const Joi = require('joi');


const schoolSchema = Joi.object({
    name: Joi.string().required()
    .trim()
    .min(2)
    .max(99)
    .message({
        'string.empty' : 'School name can not be empty',
        'string.min'   :  'School name must atleast have 2 chars',
        'string.max'   :   'School name cannot exceed 99 chars'
    }),

    address: Joi.string().required()
    .trim()
    .min(2)
    .max(255)
    .message({
        'string.empty': 'Address cannot be empty',
        'string.min': 'Address must be at least 2 characters long',
        'string.max': 'Address cannot exceed 255 characters'
    }),
    
    latitude: Joi.number().required()
    .min(-90) // min and max taken from https://docs.mapbox.com/help/glossary/lat-lon/
    .max(90)
    .messages({
      'number.min': 'Latitude must be between -90 and 90',   
      'number.max': 'Latitude must be between -90 and 90'
    }),

    longitude: Joi.number().required()
    .min(-180) // min and max tajen from https://docs.mapbox.com/help/glossary/lat-lon/
    .max(180)
    .messages({
      'number.min': 'Longitude must be between -180 and 180',
      'number.max': 'Longitude must be between -180 and 180'
    })
})

function validateSchoolDetails(req,res,next){
    const {error } = schoolSchema.validate(req.body)

    if (error){
        return res.status(404).json({
            error:"Validation Failed",
            details: error.details[0].message
        })
    }
    next();
}


function validateLocationDetails(req,res,next){
    const {latitude, longitude} = req.query;
    const locationSchema = Joi.object({
        latitude: Joi.number().required()
    .min(-90) // min and max taken from https://docs.mapbox.com/help/glossary/lat-lon/
    .max(90)
    .messages({
      'number.min': 'Latitude must be between -90 and 90',   
      'number.max': 'Latitude must be between -90 and 90'
    }),

    longitude: Joi.number().required()
    .min(-180) // min and max tajen from https://docs.mapbox.com/help/glossary/lat-lon/
    .max(180)
    .messages({
      'number.min': 'Longitude must be between -180 and 180',
      'number.max': 'Longitude must be between -180 and 180'
    })

        
    })
    const {error} = locationSchema.validate({latitude,longitude})
    if (error) {
        return res.status(400).json({
          error: 'Validation Failed',
          details: error.details[0].message
        });
      }

      next();
}

module.exports = {
    validateSchoolDetails,
    validateLocationDetails
}