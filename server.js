// require third party modules
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// require local moduels
const initEndpoints = require('./endpoints');
const swaggerDoc = require('./swaggerDoc');


// connect mongoose
const mongoUri = 'mongodb://localhost:27017/userDatabase';
const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(mongoUri,config).then((result)=>{

    console.log('DataBase Connected');

}).catch((err)=>{
        console.log(err);
});

//middleware
app.use(bodyParser.json());
initEndpoints(app);
swaggerDoc(app);

// port
const port = process.env.PORT || 3002;

// server

app.use((err,req,res,next)=>console.error('There was an error',err));

app.listen(port,(err)=>{

        if(err)
        {
            throw err;
        }
        else
        {
            console.log('server started on');
            console.log('localhost:3002/documentation');
        }
});