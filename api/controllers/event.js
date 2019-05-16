const mongoose = require('mongoose');
const Event = require('../models/event');

module.exports.createEvent = (eventData) => {
	return new Promise((resolve, reject) => {
		new Event(eventData).save().then((eventData) => {
			 const responseData = {
                'success': true,
                'data': eventData
            }
			resolve(responseData);
		}).catch((err) => reject(err));
	});
}

module.exports.fetchEvent = (eventData) => {
	return new Promise((resolve, reject) => {
		Event.find({}).sort("").populate('user').then((eventData) => {
			 const responseData = {
                'success': true,
                'data': eventData
            }
			resolve(responseData);
		}).catch((err) => reject(err));
	});
}

module.exports.fetchEventSingleById = (eventId) => {
	return new Promise((resolve, reject) => {
		Event.findOne({_id: eventId}).populate('user').then((eventData) => {
			 const responseData = {
                'success': true,
                'data': eventData
            }
			resolve(responseData);
		}).catch((err) => reject(err));
	});
}

module.exports.fetchfilterEvent = (startDate, lat, lng) => {
	return new Promise((resolve, reject) => {
		if(lat != null && lng != null && startDate == null){
		 Event.aggregate([{
		                $geoNear: {

		                    "near": {
		                        type: "Point",
		                        coordinates: [parseFloat(lng), parseFloat(lat)]
		                    },

		                    "maxDistance": 7 * 1000,
		                    "distanceField": "distance",
		                    "includeLocs": "dist.location",
		                    "distanceMultiplier": 0.000621371,
		                    "spherical": true
		                }
		            }]).then((eventData) => {
					 const responseData = {
		                'success': true,
		                'data': eventData
		            }
					resolve(responseData);
				}).catch((err) => reject(err));
		
		} else if(startDate != null && lat == null){

		  Event.aggregate([{
                $match: {

                    startDate: {
                        $gte: new Date(startDate)
                    }
                }

            }]).then((eventData) => {
					 const responseData = {
		                'success': true,
		                'data': eventData
		            }
					resolve(responseData);
				}).catch((err) => reject(err));
		} else {
			Event.aggregate([{
			    $geoNear: {

			        "near": {
			            type: "Point",
			            coordinates: [parseFloat(lng), parseFloat(lat)]
			        },

			        "maxDistance": 7 * 1000,
			        "distanceField": "distance",
			        "includeLocs": "dist.location",
			        "distanceMultiplier": 0.000621371,
			        "spherical": true
			    }
			}]).then((result) => {

			    var dateFilter = new Date(startDate);
			    const filterDate = result.filter(async(d) => {

			        return d.startDate  >= dateFilter
			    });

			    const responseData = {
			            'success': true,
			            'message': 'Events Found Successfully.',
			            'data': filterDate
			        }

			    resolve(responseData)
			}).catch((error) => reject('location & category not found'))
			}
		});
}
