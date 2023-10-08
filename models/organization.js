const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    org_name: {
        type: Schema.Types.ObjectId,
        required: true
    },
    vehicles: [{
        type: Schema.Types.ObjectId,
        ref: 'Vehicle'
    }],
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }   
});

module.exports = mongoose.model('Organization', organizationSchema);