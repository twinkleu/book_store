import express from "express";
import dotenv from "dotenv";
import Connection from "./config/db.js";
import { router } from "./routes/index.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(express.json());

//db connect
Connection(MONGODB_URL);

//routes
router(app);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT:${PORT}`);
});
