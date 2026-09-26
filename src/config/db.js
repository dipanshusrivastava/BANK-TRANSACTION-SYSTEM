const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Mongo DB connected succesfully");
    })
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = connectDB;