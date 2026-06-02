import { request } from "express"
import Application from "../Application/application.model.js"
import Logs from "./logs.model.js"
import Developer from "../Developer/developer.model.js"

export const getAllApplicationLogsController = async (request, response, next) =>{

    const name = request.params.name

    try{
        
        const {
            level,
            sort = "createdAt",
            page = 1,
            limit = 10,
            order = "desc"
        } = request.query
    
        const application = await Application.findOne({name})
        if(!application){
            return response.status(404).json({message:"Application not found"})
        }
        
        const filterObject = {
            applicationId: application._id,
        }
    
        if(level){
            filterObject.level = level
        }
    
        const logs = await Logs.find(filterObject)
        .sort({[sort]: order === "asc" ? 1: -1 })
        .skip((page -1) * limit)
        .limit(Number(limit))

        return response.status(200).json(logs)

    }catch(error){
        next(error)
    }  


}

export const postLogsApplicationController = async (request, response, next)=>{

    const {name} = request.params;

    try{

        const apiKey = request.headers["x-api-key"]

        if(!apiKey){
            return response.status(401).json({message:"API key is required"})
        }
        
        const developer = await Developer.findOne({uniqueApiKey: apiKey})
        if(!developer){
            return response.status(400).json({message:"invalid API key"})
        }

        const application = await Application.findOne({name});

        console.log( "the name is ", name)
    
        if(!application){
            return response.status(404).json({message:"Application not found"})
        }
        
        if(application.developerId.toString() !== developer._id){
            return response.status(403).json({message:"forbidden"})
        }
    
        const {message, level, count} = request.body
    
        const logs = await Logs.create({message, level, count, applicationId : application._id})

        return response.status(200).json({message:"logs created successfully",  logs})
    }catch(error){
        next(error)
    }

}