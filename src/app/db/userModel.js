const {default : mongoose}=require("mongoose")

const userModel = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  city: String,
  contact:String,
  img_path:String
});


export const userSchema = mongoose.models.userData ||
mongoose.model("userData",userModel) 
