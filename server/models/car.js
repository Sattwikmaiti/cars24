const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  model:{
    type: String,
    required: true,
  },
  
  dealer:{ type :[] ,} ,
  
  deals:{ type :[] } ,
  
   
   



},  { timestamps: true });

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
