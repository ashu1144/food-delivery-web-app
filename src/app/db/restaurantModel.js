const {default : mongoose}=require("mongoose")

const restaurantModel = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  city: String,
  contact:String,
  img_path:String
});


const foodModel = new mongoose.Schema({
  name: String,
  description : String,
  img_path:String,
  price: String,
  resto_id:mongoose.Schema.Types.ObjectId
});

export const foodSchema = mongoose.models.foods || mongoose.model("foods",foodModel)

export const restaurantSchema = mongoose.models.restaurantData ||
mongoose.model("restaurantData",restaurantModel) 
