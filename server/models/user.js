const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  verified:{
    type:Boolean,
    default:false

  },
 
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  role:{
    type:String,
    default:"user"  // customer  or  dealer
  },
  
 cars_dealership:{
    type: []
    ,
    default: []

 },
 customer_owned:{
    type: []
    ,default: []
     },
     
     successfull_deals:{
        type:[],
        default: []

     }
 ,

},
{ timestamps: true }
);

const User = mongoose.model("user_nervesparks",userSchema);

module.exports = User