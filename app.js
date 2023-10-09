const express = require('express');
const bodyParser = require("body-parser");
const { default: mongoose } = require('mongoose');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());

authRoutes = require("./routes/auth");
vehicleRoutes = require("./routes/vehicle");
organizationRoutes = require("./routes/organization");
userRoutes = require("./routes/user");

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use('/auth', authRoutes);

app.use('/vehicle', vehicleRoutes);

app.use('/organization', organizationRoutes);

app.use('/user', userRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).join({message: message, data: data});
});

username = encodeURIComponent(process.env.MONGO_USR);
password = encodeURIComponent(process.env.MONGO_PASS);

mongoose
.connect(
    `mongodb+srv://${username}:${password}@e-yatri.l4j3udy.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`
)
// mongodb+srv://<username>:<password>@e-yatri.l4j3udy.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp
.then(result =>{
    app.listen(3000);
})
.catch(error => console.log(error));
