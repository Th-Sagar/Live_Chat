import e from "express";
import { mongoose } from "mongoose";

const userSchema = new mongoose.schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

const Users = new mongoose.model("users", userSchema);

export default Users;
