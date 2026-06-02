import Developer from "./developer.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto"

export const registerController = async (req, res, next) => {
    const {userName,password, email} = req.body;

    try {
        if(!userName || !password || !email){
            return res.status(400).json({message: "All fields are required"});
        }

        const uniqueApiKey = crypto.randomBytes(32).toString("hex")

        await Developer.create({userName,password, email, uniqueApiKey});

        return res.status(200).json({message:"Developer registered successfully"});


}catch(error){
    next(error);
}
}

export const loginController = async (req, res, next) => {

    const {email, password} = req.body;

    try{
        if(!email || !password){
            return res.status(400).json({message:"invalid user Input"});
        }

        let developer = await Developer.findOne({email});
        if(!developer){
            return res.status(400).json({message:" invalid Email or password"})
        }

        let isPasswordCorrect = await bcrypt.compare(password, developer.password);

        if(!isPasswordCorrect){
            return res.status(400).json({message:" invalid Email or password"})
        }
        const token = jwt.sign({developerId:developer._id}, process.env.JWT_SECRET_KEY, {expiresIn:"1d"});

        return res.status(200).json({message:"Developer logged in successfully", token});
    }catch(error){
        next(error);
    }
}


export const logoutController = async (req, res, next) => {
    try{
        const token = req.headers.authorization;
        if(!token){
            return res.status(400).json({message:"invalid fields user Input"})
        }

        const tokenArray = token.split(" ");

        if(tokenArray.lenght !== 2 || tokenArray[0] !== "Bearer" || !tokenArray[1]){
            return res.status(400).json({message:"invalid user Input"})
        }

        const decoded  = jwt.verify(tokenArray[1], process.env.JWT_SECRET_KEY);

        if(!decoded || !decoded.developerId){
            return res.status(400).json({message:"invalid user Input"})
        }

        const developer = await Developer.findById(decoded.developerId);
        if(!developer){
            return res.status(400).json({message:"invalid user Input"})
        }

        developer.token = null;
        await developer.save();

        return res.status(200).json({message:"Developer logged out successfully"});     
        
        
    }catch(error){
        next(error)
    }
}