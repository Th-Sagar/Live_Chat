import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/connection.js";
import authRouter from "./router/auth-router.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/auth",authRouter);

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
