import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/connection.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("welcome to the server");
});

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
