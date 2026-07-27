import User from "../models/User.js";
//import Userfrom from "../models/User";
import bcrypt from "bcryptjs";

export const register = async(req, res) => {
  try{
      const {name, email,password } = req.body;
      //check if user already register
      const userExists = await User.findOne({ email });
      if(userExists){
        return res.status(400).json({message: "User already exists"})
      }
     //Hash password 
     const  hashPassword = await bcrypt.hash(password,10);

     //Create User 
     await User.create({
        name,
        email,
        password: hashPassword
     });
     res.json({ message: "User registered successfully"});

  }
  catch (error) {
    console.error("REGISTER ERROR:");
    console.error(error);

    return res.status(500).json({
        message: error.message,
        stack: error.stack
    });
}
};