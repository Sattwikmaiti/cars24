import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Navbar from "./Navbar";
import axios from 'axios';

const Product = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const [value, setValue] = useState(null);
  useEffect(() => {
    // Reset copied state after 3 seconds
    const timeoutId = setTimeout(() => {
      setCopied(false);
    }, 3000);

    // Cleanup function to clear timeout
    return () => clearTimeout(timeoutId);
  }, [copied]); // Only re-run the effect if copied state changes

  const buy = async (dealId) => {
    const id = localStorage.getItem('id');
    console.log(id);
    try {
      const res = await axios.put('https://cars24.onrender.com/api/car/transaction', { deal_id: dealId, buyer_id: id });
      console.log(res);
      alert("Successfully bought the car");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {data?.map((car, index) => (
        <div key={index} className={car.isClosed ? "bg-red-400 sm:max-w-sm text-white shadow-md p-4 my-4" : "bg-blue-400 sm:max-w-sm text-white shadow-md p-4 my-4"}>
          <Accordion className="border-b border-blue-800">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="text-blue-300" />}
              aria-controls="panel2-content"
              id="panel2-header"
              className="bg-blue-800"
            >
              <Typography className="text-blue-800"> CAR_ID : {car?.car_id} </Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-blue-700">
              <Typography className="text-blue-200">
                {copied ? <span style={{ color: 'red' }}>Copied.</span> : null}
                <span style={{ color: 'black' }} 
                onClick={() => {navigator.clipboard.writeText(car?.car_id)}}
                
                
                >copy car_id <ContentCopyIcon /></span>
              </Typography>
              <Typography className="text-blue-200">Dealer-Id : {car.dealer_id}</Typography>
              <Typography className="text-blue-200">Car Price : Rs {car.price}</Typography>
              <Typography className={car.isClosed ? 'text-red-500' : 'text-blue-200'}>Closed : {car.isClosed === true ? "Yes" : "No"}</Typography>
              <Typography className="text-blue-200">Time Period of EMI (in months) : {car.timeperiod_of_emi} months</Typography>
              <button onClick={() => {
                console.log(car._id);
                buy(car._id);
              }}>Buy This Deal</button>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default Product;
