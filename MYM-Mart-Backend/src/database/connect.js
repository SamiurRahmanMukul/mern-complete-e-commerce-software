/* eslint-disable no-console */
const mongoose = require('mongoose');

const connectionString = process.env.MONGO_URI;

const connectDatabase = async () => {
  try {
    await mongoose
      .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        // useCreateIndex: true, // for mongoose 6.x
        // useFindAndModify: false, // for mongoose 6.x
      })
      .then(() => {
        console.log('Connection establish to MongoDB database successful!');
      })
      .catch((error) => {
        console.log('Error connecting to MongoDB: ', error.message);
      });
  } catch (error) {
    console.log('Database connection error: ', error.message);
  }
};

module.exports = connectDatabase;
