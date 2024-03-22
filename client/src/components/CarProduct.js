// import React,{useState} from 'react'
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { CopyToClipboard } from 'react-copy-to-clipboard';

// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import Navbar from "./Navbar"
// import axios  from 'axios';
// const CarProduct = ({data}) => {
//   const [value, setValue] = useState(null);
//   const [copied, setCopied] = useState(false);

//   return (
//     <div>
      
//      {
//       data?.map((car,index)=>
//       {

//         return (<div className="bg-blue-400 sm:max-w-sm text-white shadow-md p-4 my-4">
//   <Accordion className="border-b border-blue-800">
//     <AccordionSummary
//       expandIcon={<ExpandMoreIcon className="text-blue-300" />}
//       aria-controls="panel2-content"
//       id="panel2-header"
//       className="bg-blue-800"
//     >
//      <Typography className="text-blue-800"> CAR_ID : {car?._id} </Typography>
  

//     </AccordionSummary>
//     <AccordionDetails className="bg-blue-700">


//       <Typography className="text-blue-200">
        
//         {copied ? <span style={{ color: 'red' }}>Copied.</span> : null}
    
//         <span
//   style={{
//     color: 'black',
//     cursor: 'pointer', // Change mouse pointer to pointer style
//   }}
//   onClick={() => {
//     alert("copied carid")
//     navigator.clipboard.writeText(car?._id);
//   }}
//   onMouseEnter={(e) => { e.target.style.color = 'red'; }} // Change color on hover
//   onMouseLeave={(e) => { e.target.style.color = 'black'; }} // Reset color when not hovering
// >
//   copy car_id <ContentCopyIcon />
// </span>

      
//       </Typography>
//       <Typography className="text-blue-200">
//       Brand Name :  {car.name}
      
//       </Typography>
//       <Typography className="text-blue-200">
        
//       Car Model :  {car.model}
        
//       </Typography>
     
//     </AccordionDetails>
//   </Accordion>
// </div>)



//        })
//      }
         
//     </div>
//   )
// }

// export default CarProduct

import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import axios from 'axios';

const CarProduct = ({ data }) => {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center">
      {data?.map((car, index) => (
        <div key={index} className="w-full max-w-md bg-black  rounded-md shadow-md overflow-hidden my-4">
          <Accordion className="border-b border-black">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="text-blue-500" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="bg-blue-500"
            >
              <Typography className="text-black">CAR ID: {car?._id}</Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-gray-400">
              <div className="flex flex-col w-full">
                <Typography className="text-gray-600 my-2">Brand Name: {car.name}</Typography>
                <Typography className="text-gray-600 my-2">Car Model: {car.model}</Typography>
                <div className="flex justify-between items-center">
                  <Typography className="text-gray-600 my-2">Copy Car ID</Typography>
                  <span
                    className="flex items-center cursor-pointer hover:text-red-500 transition-colors duration-300"
                    onClick={() => {
                      navigator.clipboard.writeText(car?._id);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                  >
                    {copied ? (
                      <span className="text-red-500 mr-1">Copied!</span>
                    ) : (
                      <span className="text-gray-600 mr-1">Click to copy</span>
                    )}
                    <ContentCopyIcon className="text-gray-600" />
                  </span>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default CarProduct;

