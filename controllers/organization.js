const Vehicle = require('../models/vehicle');
const Route = require('../models/route')


exports.addVehicle = async (req, res, next) => {
    const {phone, org_name, vehicle_num} = req.body;
    const route_name = req.body.route_name;
    try{
        const existingVehicle = await Vehicle.findOne({ phone });

        if(!existingVehicle){
            const org = await Organization.findOne({org_name});

            if(!org){
                return res.status(404).json({message: "Organization and Vehicle both not found"});
            }

            const route = await Route.findOne({ route_name, organization: org._id });

            if(!route){
                return res.status(404).json({ message: "Route with the above name could not be found"});
            }

            // Create a new vehicle if it doesn't exist
            const newVehicle = new Vehicle({
                phone,
                org_name, // Assign the organization to the vehicle
                vehicle_num,
                route: route._id
                // Other vehicle fields
            });

            await newVehicle.save();
            res.status(201).json({ message: 'Vehicle created successfully', otp: newVehicle.otp });

        }else{

            // If the vehicle already exists, update its OTP or perform other actions
            const newOTP = randomstring.generate({
                length: 4,
                charset: 'numeric',
            });

            existingVehicle.otp = newOTP;
            await existingVehicle.save();

            res.status(200).json({ message: 'Vehicle already exists', otp: existingVehicle.otp });
        }

    }catch(error){
        console.error('Error:', error);
        next(error);
    };
};

exports.removeVehicle = async (req, res, next) => {
    const phone = req.body.phone;
    try{
        const existingVehicle = await Vehicle.findOneAndDelete({phone});

        if(!existingVehicle){
            res.status(404).json("Vehicle not found");
        }

        res.json({message: "Vehicle succesfully removed.", Vehicle: existingVehicle.phone});

    }catch(error){
        console.error('Error:', error);
        next(error);
    };
};

exports.addRoute = async (req, res, next) => {
    const {route_name, organization, linestring} = req.body;
    try{
        const existingRoute = await Route.findOne({route_name});
        
        if(!existingRoute){
            const newRoute = new Route({
                route_name,
                organization,
                linestring,

            })

        }else{
            res.json({message: "This route already exists"});

        }
    }catch(error){
        console.error('Error:', error);
        next(error);
    }
};

exports.removeRoute = async (req, res, next) => {

    const route_name = req.body.route_name;
    const org_name = req.body.org_name;

    try{
        const existingRoute = await Route.findOneAndDelete({ route_name, org_name });

        if(!existingRoute){

            res.status(404).json({message: "Route cannot be found!!"});

        }else{

            res.json({message: "Route deleted successfully", route: existingRoute.route_name});

        }
    }catch(error){
        console.error('Error:', error);
        next(error);
    }
}