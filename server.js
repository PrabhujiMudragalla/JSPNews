const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');


const routes = require('./config/_global');
const app = express();

/**
@ Middleware validations
**/

app.use( (req, res, next) => {
    next();
}, express.static(path.join(__dirname, './public/')));


/**
@ To access server from any other domains
**/
const allowCrossDomain =  (req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With,x-api-key,csrf');
    next();
}
app.use(allowCrossDomain);

/**
@ TO read Body data
**/

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/**
@ Start server
**/

app.listen(PORT,  ()=> {
    console.log("Application is running on ", PORT);
});

/**
@ load APIs 
**/

require('./routes')(app);