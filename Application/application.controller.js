import Application from "./application.model.js"

export const getAllApplicationsController = async (req, res, next) => {
    try{

        const applications = await Application.find();

        res.status(200).json(applications);

    }catch(error){
        next(error);
    }   
}
export const getApplicationByNameController = async (req, res, next) => {
    try{

        const {name} = req.params;
        
        console.log(name)
        
        const application = await Application.findOne({name});
        if(!application){
            return res.status(404).json({message:"App not found"});
        }

        res.status(200).json({message: "Application found successfully", application});

    }catch(error){
        next(error);
    }   
}
export const createApplicationController = async (req, res, next) => {
    try{

        const {name} = req.body;
        if(!name){
            return res.status(400).json({message:"invalid fields user Input"})
        }

        console.log(req.developerId);

        const application = await Application.create({name, createdAt: new Date(), developerId: req.developerId});
        res.status(200).json({message:"Application created successfully", application});

    }catch(error){
        next(error);
    }   
}
export const deleteApplicationController = async (req, res, next) => {
    try{

        const {name} = req.params;

        if(!name){
            return res.status(400).json({message:"invalid fields user input"})
        }

        const application = await Application.findOne({name});
        if(!application){
            return res.status(404).json({message:"app not found"});
        }

        await application.deleteOne({name});
        res.status(200).json({message:"Application deleted successfully"});


    }catch(error){
        next(error);
    }   
}