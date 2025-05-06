const mongoose = require("mongoose");

async function connectToMongo(url) {
    return mongoose.connect(url)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
}

module.exports = connectToMongo