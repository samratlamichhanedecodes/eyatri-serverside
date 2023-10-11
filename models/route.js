const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const routeSchema = new Schema({
    route_name: {
        type: String,
        required: true,
    },
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization'
    },
    linestring: {
            type: {
                type: String,
                enum: ['LineString'],
                // required: true
            },
            coordinates: {
                type: [[Number]],
                // default: [[]]
                // required: true
            }
    },
    stops: [{
        stop: {
            type: Schema.Types.ObjectId,
            ref: 'Stop'
        },
        position: {
            type: Number, // Represents the position or order of the stop in the route
            required: true
        }
    }]
})

module.exports = mongoose.model('Route', routeSchema);