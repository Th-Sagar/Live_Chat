import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/connection.js";
import authRouter from "./router/auth-router.js";
import convRouter from "./router/conv-router.js";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import User from "./models/user-model.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});
let users = [];

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  socket.on("addUser", (userId) => {
    const isUserExist = users.find((user) => user.userId === userId);
    if (!isUserExist) {
      const user = {
        userId,
        socketId: socket.id,
      };
      users.push(user);
      io.emit("getUsers", users);
    }
  });
  socket.on(
    "sendMessage",
    async ({ senderId, recevierId, message, conversataionId }) => {
      const recevier = users.find((user) => user.userId === recevierId);
      const sender = users.find((user) => user.userId === senderId);
      const user = await User.findById(senderId);

      if (recevier) {
        io.to(recevier.socketId)
          .to(sender.socketId)
          .emit("getMessage", {
            senderId,
            message,
            conversataionId,
            recevierId,
            user: {
              id: user._id,
              fullName: user.fullName,
             email: user.email,
            },
          });
      }
    }
  );

  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit("getUsers", users);
  });
});

//io.on for all user connected
//socket.on for individual user connected

app.use("/auth", authRouter);
app.use("/api", convRouter);

connectDb().then(() => {
  server.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
