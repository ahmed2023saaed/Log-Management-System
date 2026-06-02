import mongoose from "mongoose"
import bcrypt from "bcrypt"

let developerSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: {
        type: String, required: true, unique: true, validate: {
            validator: function (email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message: "Invalid email address",
        }
    },
    password: {
        type: String, required: true
        //  validate: {
        //     validator: function (password) {
        //         return password.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
        //     },
        //     message: "Password must be at least 8 characters long and must contain at least one uppercase letter, one lowercase letter, one number and one special character    ",
        // }
    },
    uniqueApiKey: { type: String, unique: true }

})


developerSchema.pre("save", async function(){
    if(!this.isModified("password"))return;

    this.password = await bcrypt.hash(this.password, 10)
})



let Developer = mongoose.model("Developer", developerSchema);

export default Developer; 
