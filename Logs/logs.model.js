import mongoose from "mongoose";

let logsSchema = new mongoose.Schema({

    message:{
        type: String,
        require:true
    },
    level:{
        type:String,
        require:true,
        enum:["INFO", "WARN", "ERROR"]
    },
    count:{
        type:Number,
        default:1
    },
    applicationId: {type: mongoose.Schema.Types.ObjectId, ref:"Application", require:true}

}, {
    timestamps:true
})

let Logs = mongoose.model('Logs', logsSchema)

export default Logs