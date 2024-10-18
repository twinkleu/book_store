import mongoose from "mongoose";

const Connection = async (MONGODB_URL) => {
  await mongoose
    .connect(MONGODB_URL, {})
    .then((data) => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.log("Error while connecting to DB", err);
    });
};

export default Connection;
