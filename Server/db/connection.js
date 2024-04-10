import { mongoose } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URL;
const connectDb =async()=>{
    try {
        await mongoose.connect(url)
        console.log("Connected to db")
        
    } catch (error) {
        console.log("Error in db connection",error)
        process.exit(0);
        
    }
}

export default connectDb;