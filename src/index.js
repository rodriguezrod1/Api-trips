
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routes = require("./routes/api")

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


/*mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})*/


app.use(express.json())
app.use("/api", routes)


app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`)
})