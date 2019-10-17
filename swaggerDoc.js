const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swagger: '2.0',
    swaggerDefinition:{
        info:{
            title: 'Mongo API',
            version: '1.0.0',
            description: 'Test Mongo API',
        },

        basePath: '/',
    },
    apis: ['endpoints.js'],
};


const specs = swaggerJsdoc(options);


module.exports = (app)=>{
    app.use('/documentation',swaggerUi.serve,swaggerUi.setup(specs));
};