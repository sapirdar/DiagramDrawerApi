import express from 'express';
const bodyParser = require('body-parser');

const testRouter = express.Router();

testRouter.use(bodyParser.json());

testRouter.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


testRouter.get('/', (req, res, next) => {
    res.status(200).json('done');
});


export { testRouter }
