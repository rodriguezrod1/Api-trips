
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongoString = process.env.DATABASE_URL;

app.use(express.json());

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})



app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`)
})