const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const apiRouter = require('./api/routes/index');

require('dotenv').config();

// Initialize the express APP
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Get the Access Token
// TODO: Validate the JWT token
//
app.use((req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            return jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userData) => {
                if (err) {
                    return res.status(401).json({
                        success: false,
                        message: "User is not authenticated",
                    });
                }
                req.user = {
                    id: userData.id,
                    email: userData.email,
                    token: token,
                    exp: userData.exp
                }
                return next();
            });
        }
        return res.unauthorized();
    }
    next();
});

app.get('/', (req, res) =>{
    res.send("API");
});

app.use('/api/v1/', apiRouter);

mongoose.connect(process.env.MONGO_URL,  { useNewUrlParser: true }).then(() => console.log('Mongo Connected'));
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
mongoose.Promise = global.Promise;
