import jwt from "jsonwebtoken";

export const validateAuthToken = (req, res, next)=>{
    const {authorization} = req.headers;

    try{

        if(!authorization || typeof authorization !== "string"){
            return res.status(400).json({message:"invalid user Input"})
        }
    
        const authorizationArray = authorization.split(" ");
    
        if(authorizationArray.length !== 2 || authorizationArray[0] !== "Bearer" || !authorizationArray[1]){
            return res.status(400).json({message:"invalid user Input"})
        }
    
        const token = authorizationArray[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!decoded || !decoded.developerId){
            return res.status(400).json({message:"invalid user Input"})
        }
        req.developerId = decoded.developerId;

        return next();


    }catch(error){
        next(error);
    }


}