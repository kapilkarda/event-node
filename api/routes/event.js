const { check, validationResult } = require('express-validator/check');
const errorCheck = require('../middlewares/errorHandler');
const {createEvent, fetchEvent, fetchEventSingleById, fetchfilterEvent } = require('../controllers/event');

module.exports.create = (req, res, next) => {

	let eventData = req.body;
	 // eventData.user = req.user.id;
	createEvent(eventData).then((responseData) => res.send(responseData)).catch((err) => next(err));
}

module.exports.fetch = (req, res, next) => {
	fetchEvent().then((responseData) => res.send(responseData)).catch((err) => next(err));
}

module.exports.fetchSingleEvent = (req, res, next) => {
	const eventId = req.params.eventId;
	fetchEventSingleById(eventId).then((responseData) => res.send(responseData)).catch((err) => next(err));
}

module.exports.filterEvent = (req, res, next) => {

	let startDate, lat, lng;
	if(typeof(req.query.startDate) !== "undefined" ){
		
		const date = new Date(req.query.startDate);
    
        date.setDate(date.getDate());
        startDate = date.toISOString();
	}else{

		startDate = null;
	}

	if(typeof(req.query.lat) !== "undefined" && typeof(req.query.lng) !== "undefined"   ){
		lat = req.query.lat;
		lng = req.query.lng;
	}else{

		lat = null;
		lng = null;
	}
	fetchfilterEvent(startDate, lat, lng).then((responseData) => res.send(responseData)).catch((err) => next(err));
}