import React,{useState,useEffect} from 'react'
import Navbar from './Navbar'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import Product from './Product';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const Deals = () => {
  const [open, setOpen] = React.useState(false);
  const [carId,setcarId]=useState("")
  const [ dealerId,setdealerId]=useState("")
  const[emi,setemi]=useState(0)
  const[price,setprice]=useState(0)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
const addDeal=async()=>{ 
  
  const id=localStorage.getItem('id')
  try{
    const res=await axios.put('https://cars24.onrender.com/api/car/add-deal',{carId:carId,dealerId:id,emi:emi,price:price})
    console.log(res)
    alert("Successfully added the deal")
  }catch(err)
  {
    console.log(err)
  
  }


}
const [data,setdata]=useState(null)


useEffect(() => {
const id=localStorage.getItem('id')
console.log("id is hrer",id)
  const fetchData = async () => {

try{
    const response=await axios.post(`https://cars24.onrender.com/api/car/getdeals`,
    
    );
    const result = response.data
    console.log(result)
    setdata(result)
  } catch (error) {
    console.error(error);
  }     

}
fetchData();

},[])






  return (
    <div>
  <Navbar />
    
  <button className="bg-blue-500 my-5 mx-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:shadow-outline" onClick={handleOpen}>Click To Add Deal</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           Add Details of Deal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Car Id : 
              </label>
              <div className="mt-2">
                <input 
              
                value={carId}
                  id="email"
                  onInput={(e)=>{e.preventDefault(); setcarId(e.target.value); }}
                  name="email"
                  type="email"

                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
           
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Price (in INR): 
              </label>
              <div className="mt-2">
                <input 
              
                value={price}
                  id="email"
                  onInput={(e)=>{e.preventDefault(); setprice(e.target.value); }}
                  name="email"
                  type="number"

                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                TimePeriod of EMI (in months): 
              </label>
              <div className="mt-2">
                <input 
              
                value={emi}
                  id="email"
                  onInput={(e)=>{e.preventDefault(); setemi(e.target.value); }}
                  name="email"
                  type="number"

                  required
                  className="block my-4  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <button onClick={addDeal} style={{backgroundColor:'green',margin:4,padding:2}}>Add-Deal</button>
          </Typography>
        </Box>
      </Modal>
  <Product data={data}/>




    </div>
  )
}

export default Deals
