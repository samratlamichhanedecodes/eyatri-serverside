const User = require("../models/user");
const Vehicle = require('../models/vehicle');
const Stop = require('../models/stop');
const Route = require('../models/route');


exports.getVehicles = async (req, res, next) => {
    const {from, to} = req.body;

    try{
        //Find the stop id's for from and to locations
        const fromStop = await Stop.findOne({ name: from });
        const toStop = await Stop.findOne({name: to});

        if(!fromStop || !toStop){
            return res.status(404).json({message: "Stops not found"});
        }

        //Find routes that include both 'from' and to 'to' stops
        const routes = await Route.find({
            'stops.stop': { $all: [fromStop._id, toStop._id]}
        })

        if(!routes || routes.length === 0){
            return res.status(404).json({ message: 'No Routes found'});
        }

        //Get vehicles associated with the identified routes
        const routeIds = routes.map((route) => route._id);
        const vehicles = await Vehicle.find({ route: { $in: routeIds}});

        res.status(200).json({message: "vehicles Found!", vehicles});

    }catch(error){
        console.error('Error:', error);
        next(error);
    }
};

exports.selectVehicle = async (req, res, next) => {
    const phone = req.body.phone;
    
    try{
        //Find the selected vehicle by phone
        const selectedVehicle = await Vehicle.findOne({ phone }).populate('route');

        if(!selectedVehicle){
            return res.status(404).json({message: 'Vehicle not found'});
        }
        //Access route information associated with the selected vehicle
        const routeInfo = selectedVehicle.route;

        res.status(200).json({
            message: 'Vehicle and Route Information',
            vehicle: selectedVehicle,
            route: routeInfo
        });
    }catch(error){
        console.error('Error:', error);
        next(error);
    }
};

exports.updateUser = (req, res, next) => {
    res.status(200).json({message: "User Updated"});
}

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


