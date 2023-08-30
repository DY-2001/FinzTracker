const mongoose = require("mongoose");
const connectDB = async () => {
  // console.log("here")
  mongoose
    .connect(
      "mongodb+srv://dushyantist:mongo1234@cluster0.mycblpm.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

module.exports = { connectDB };
