const mongoose = require("mongoose");

const dealsSchema = new mongoose.Schema({
   
    car_id:{
        type:String
    },
    dealer_id:{
        type:String
    },
    isClosed:{
        type: Boolean,
        default:false
    }
   ,
   buyer_id:{
    type:String,
    default:""
    
   },
   price :{
    type:Number // in INR
   }
   ,
   timeperiod_of_emi:{
    type:Number, // in months 
    default:0
   }



},  { timestamps: true });

const deals = mongoose.model("deals", dealsSchema);

module.exports = deals;
