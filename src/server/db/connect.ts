import mongoose from 'mongoose';

console.log('connection to db initiated');

mongoose.connect(process.env.MONGODB_URI || '');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});