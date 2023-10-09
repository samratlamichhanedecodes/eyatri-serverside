const Vehicle = require("../models/vehicle");

exports.myRoutes = (req, res, next) => {
    res.status(200).json({
        message: "Vehicle Request for Routes"
    });
};