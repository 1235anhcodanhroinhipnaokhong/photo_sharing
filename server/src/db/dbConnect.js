const mongoose = require('mongoose');
require('dotenv').config();
const { DB_USER, DB_PASSWORD, DB_APP } = process.env;

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ypetl7o.mongodb.net/?retryWrites=true&w=majority&appName=${DB_APP}`;
async function dbConnect() {
  mongoose
    .connect(uri, { dbName: 'photo_sharing' })
    .then(() => {
      console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
      console.log('Unable to connect to MongoDB Atlas!');
      console.error(error);
    });
}

module.exports = dbConnect;
