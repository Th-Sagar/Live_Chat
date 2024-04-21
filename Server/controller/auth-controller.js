import User from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userController = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    const isAlreadyExists = await User.findOne({ email });
    if (isAlreadyExists) {
      return res.status(400).json({ msg: "User already exists" });
    } else {
      const newUser = new User({
        fullName,
        email,
      });
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        newUser.set("password", hashedPassword);
        newUser.save();
        next();
      });
      return res.status(200).json({ msg: "User Created Successfully" });
    }
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};
const loginController = async (req, res,next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    } else {
      const validateUser = await bcrypt.compare(password, user.password);
      if (!validateUser) {
        return res.status(400).json({ msg: "Invalid Password" });
      } else {
        const payload = {
          userId: user._id,
          email: user.email,
        };
        const key = process.env.JWT_SECRET_KEY;
        jwt.sign(payload, key, { expiresIn: "5d" }, async (err, token) => {
          await User.updateOne(
            { _id: user._id },
            {
              $set: {
                token,
              },
            }
          );
          user.save();
         return res.status(200).json({ msg: "Login Successfull", user:{
          id:user._id,
            email:user.email,
            fullName:user.fullName,
        },
        token:token});
        });
       
      }
    }
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};


const readUsers = async(req,res)=>{
  try {
    const users = await User.find();
    const usersData = Promise.all(
      users.map(async(user)=>{
        return {
          user:{
            email:user.email,
            fullName:user.fullName
          },
          userId:user._id
        }
      })

    )
    res.status(200).json(await usersData);
    
  } catch (error) {
    res.status(400).json({
      message: error
    })
    
  }
}
export { userController, loginController,readUsers };