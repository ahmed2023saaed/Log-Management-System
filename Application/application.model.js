import mongoose from "mongoose"

let applicationSchema = new mongoose.Schema({
    name:{type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(name){
                return /^[a-zA-Z0-9_-]+$/.test(name);
            }
        }
    },

    createdAt:{type:Date, default:Date.now},
    developerId:{type:mongoose.Schema.Types.ObjectId, ref:"Developer"}

})

const Application = mongoose.model("Application",applicationSchema);
export default Application;