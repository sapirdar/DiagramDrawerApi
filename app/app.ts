import express from 'express';
import { userRouter } from './routes/user';
import { diagramRouter } from './routes/diagram';
import { testRouter } from './routes/test';

const path = require('path');
const config = require('../config/config');

try {
  const app = express();

  app.use('/api/auth', userRouter);
  app.use('/api/diagrams', diagramRouter);
  app.use('/api/test', testRouter);

  // connect to mongoDB database 
  const mongoose = require('mongoose');
  mongoose.connect(config.dbUrl)
    .then(() => {
      console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error: string) => {
      console.log('Unable to connect to MongoDB Atlas!');
      console.error(error);
    });

  app.listen(process.env.PORT || '3000', function () {
    console.log('App listening on port 3000!');
  });

  module.exports = app;
} catch (error) {
  console.error(error);
}