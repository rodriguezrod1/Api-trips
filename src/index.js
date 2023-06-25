const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routes = require("./routes/api")

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json())
app.use("/api", routes)

// initialize the server only if this file is running
if (require.main === module) {
    app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`))
}

// export the property app equal to the constant app which is the instance of express
module.exports.app = app