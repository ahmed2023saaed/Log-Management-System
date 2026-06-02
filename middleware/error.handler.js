export const errorHandler = (error, request, response, next)=>{

    console.error(error)

    if(error.name === "MongoServerError" || error.code === 11000 || error.name === "ValidationError"){
        response.status(400).json({message:"Invalid user Data"})
    }


}