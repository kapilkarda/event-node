const mongoose = require('mongoose');
 
// Geo-location
const GeoSchema = new mongoose.Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number], // <longitude>, <latitude> 
        index: '2dsphere'
    }
});

const EventSchema = mongoose.Schema({

	title: {
		type: String
	},
	// user: {
 //        type: mongoose.Schema.Types.ObjectId,
 //        ref: 'User'
 //    },
	description:{
		type: String
	},
	
	location: GeoSchema,

	startDate: {
		type: Date,
		default: Date.now
	},

	endDate: {
		type: Date,
		default: Date.now
	},

	startTime: {
		type: String,
		default: '0'
	},

	endTime: {
		type: String,
		default: '0'
	}
 
}, {
	timestamps: true
});

module.exports = mongoose.model('Event', EventSchema);
