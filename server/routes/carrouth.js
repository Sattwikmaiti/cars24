const express = require("express");
const deals=require('../models/deals')
const car = require("../models/car");
const user=require("../models/user");
const router = express.Router();
// Middleware to check if the user is authenticated, verified, and has a specific role
const verifyUserRole = require('../middleware/authMiddleware');

const isAdminWithVerifiedDetails = require('../middleware/adminMiddleware');


router.post('/cars', async (req, res) => {

    const dealer=req.body.dealer
    console.log("--",req.body)
    const customer=req.body.customer
    try {

        if(dealer)
          {
            const users=await user.findById(dealer)
            console.log("cars")
            return res.status(200).json(users.cars_dealership)
          }

          if(customer){
            const users=await user.findById(customer)
            return res.status(200).json(users.customer_owned)
          }
       
        const cars = await car.find();
        
        return res.json(cars);

       
    } catch (error) {
        res.status(500).json({ message: error });
    }

});
router.post('/getdeals', async (req, res) => {

    
    try {

        
        const cars = await deals.find();
        
        return res.json(cars);

       
    } catch (error) {
        res.status(500).json({ message: error });
    }

});

//dealer ka id do in request
 
router.put('/add-deal', verifyUserRole('dealer'),async (req, res) => {
    try {

      const deal=new deals({
        car_id:req.body.carId,
        dealer_id:req.body.dealerId,
        price :req.body.price,
        timeperiod_of_emi:req.body.emi


      })
   

      await deal.save();

      const dealerId = req.body.dealerId;

      // Assuming user represents your Dealer model
      const dealer = await user.findById(dealerId);

      if (!dealer) {
          return res.status(404).json({ message: "Dealer not found" });
      }
      

      // Update the car_dealership array of the dealer with the new car
      dealer.cars_dealership.push(deal);

      // Save the updated dealer
      await dealer.save();
console.log("0")
      // Return the updated dealer
     const carId=req.body.carId

      const cars = await car.findById(carId);

      if (!cars) {
          return res.status(404).json({ message: "Car not found" });
      }
  
      console.log('1')
      // Ensure uniqueness of dealerId in the dealer array
  var arr=cars.dealer
console.log("2")
  if(!arr.includes(dealerId))
   cars.dealer.push(dealerId);
     console.log("3")
      // Assuming 'deal' is defined somewhere in your code
      // Push 'deal' into the 'deals' array
      cars.deals.push(deal);
  console.log("4")
      // Save the updated 'cars' document
      await cars.save();
  
     
        res.status(200).json("success");
    } catch (error) {
        res.status(500).json({ message: error });
    }
}
);


router.post('/allcar',isAdminWithVerifiedDetails,async(req,res)=>{
    const newCar = new car({
        name: req.body.name,
        model: req.body.model,
       
    });
    try {
        const savedCar = await newCar.save();
        res.json(savedCar);
    } catch (error) {
        res.json({ message: error });
    }
})

router.post('/addcar',async(req,res)=>{
    const newCar = new car({
        name: req.body.name,
        model: req.body.model,
       
    });
    try {
        const savedCar = await newCar.save();
        res.json(savedCar);
    } catch (error) {
        res.json({ message: error });
    }
})


async function markDealAsSold(carId, dealId,buyerId) {
    console.log(carId,dealId,buyerId)
    try {
        // Find the car by its ID
        const cars = await car.findById(carId);
        console.log(cars)
        if (!cars) {
            return res.status(500).json({  message: "error"});
        }

        // Find the index of the deal within the deals array
        const dealIndex = cars.deals.findIndex(deal => deal._id.toString() === dealId);
console.log(dealIndex)
        if (dealIndex === -1) {
            return res.status(500).json({ success: false, message: "error" });
        }

        // Update the isSold property of the deal
        cars.deals[dealIndex].isClosed = true;
        cars.deals[dealIndex].buyer_id =buyerId
console.log(cars)
        // Save the updated car object
        await cars.save();
console.log("hpgaya")
    ;
    } catch (error) {
         
    }
}
router.put('/transaction',async(req,res)=>
{
    const deal_id=req.body.deal_id;
    const buyer_id=req.body.buyer_id;

    try{
        const deal=await deals.findById(deal_id);
        const buyer=await user.findById(buyer_id);
        const dealer=await user.findById(deal.dealer_id);
        
        console.log('1')
        deal.isClosed = true;
        deal.buyer_id = buyer_id
        buyer.customer_owned.push(deal);
        console.log('2')
        dealer.successfull_deals.push(deal);
        console.log('3')
        
        console.log('4')
        
        console.log('5')


        await buyer.save();
        console.log('6')
        await dealer.save();
        console.log('7')
        await deal.save()
        console.log('8')
       markDealAsSold(deal.car_id,deal_id,buyer_id)

      return  res.status(200).json("success")

    }
   catch(err){
   return res.status(500).json("eroor")
   }


    





})






module.exports = router;


