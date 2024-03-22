import React,{useState,useEffect} from 'react'
import Navbar from './Navbar'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import CarProduct from './CarProduct';
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
 
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
const addDeal=async()=>{ 
  

  try{
    const res=await axios.post('https://cars24.onrender.com/api/car/addcar',{name:carId,model:dealerId})
    console.log(res)
    alert("Successfully added the car")
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
    const response=await axios.post(`https://cars24.onrender.com/api/car/cars`,
    
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
    
  <Button
      onClick={handleOpen}
      style={{
        padding: '10px 20px ',
        backgroundColor: '#4caf50',
        color: '#fff',
        borderRadius: '30px',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px',
        position: 'relative',
        overflow: 'hidden',
        margin: '10px 10px 10px 0  ',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
      className="animated-button"
    >
      <span>Click To Add CAR</span>
    </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           Add Details of CAR 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Car Name  : 
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
                Model Name : 
              </label>
              <div className="mt-2">
                <input 
              
                value={dealerId}
                  id="email"
                  onInput={(e)=>{e.preventDefault(); setdealerId(e.target.value); }}
                  name="email"
                  type="email"

                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
            
            <button onClick={addDeal} style={{backgroundColor:'green',margin:4,padding:2}}>Add-Deal</button>
          </Typography>
        </Box>
      </Modal>
  <CarProduct data={data}/>




    </div>
  )
}

export default Deals
