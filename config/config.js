const mongoose = require("mongoose");

// const dbUri =
//   "mongodb+srv://user:Ycs999TwFM7xOwAu@cluster0.rs91c.mongodb.net/test";
// const dbUri = "mongodb://localhost:27017/online_magazin";
const connectDB = async (dbUri) => {
  const conn = await mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  console.log(`MongoDB Connected:${conn.connection.host}`);
};

module.exports = connectDB;
