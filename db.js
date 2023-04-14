const mongoose = require('mongoose');

connectDB().catch(err => console.log(err));

async function connectDB() {
  await mongoose.connect("mongodb+srv://aryankd730:carRental123@clustercar.ldn9xd7.mongodb.net/?retryWrites=true&w=majority");
  console.log("We are connected");

   
}

module.exports = connectDB;