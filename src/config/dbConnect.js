import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://foxhere:24f4FYBQR0@cluster0.9muljyp.mongodb.net/first"
);

let db = mongoose.connection;

export default db;
