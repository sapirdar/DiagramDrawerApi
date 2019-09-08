import express from 'express';
import { diagramRouter } from './routes/diagram';

const config = require('./config/config');

try {
  const app = express();

  app.use('/api/diagrams', diagramRouter);

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