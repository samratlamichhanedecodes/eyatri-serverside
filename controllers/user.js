const Passenger = require("../models/user");

exports.getVehicles = (req, res, next) => {
    const {from, to} = req.body;
    res.status(200).json({
        buses: [{message: "this is the array of buses" }]
    });
};

exports.selectVehicle = (req, res, next) => {
    const vehicle_id = req.body.vehicle_id;
    res.status(200).json({
        message: "Vehicle Selected"
    });
};

exports.startJourney = (req, res, next) => {
    res.status(200).json({
        message: "Journey Started"
    });
};

exports.reviewVehicle = (req, res, next) => {
    res.status(200).json({
        message: "Review page requested"
    });
};