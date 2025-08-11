const {admin , password} = process.env
export const connectionStr = "mongodb+srv://"+admin+":"+password+"@ashanapi.vtr1hsy.mongodb.net/RestaurantDB?retryWrites=true&w=majority&appName=AshanApi";