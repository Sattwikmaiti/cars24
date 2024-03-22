import React,{useState} from 'react'

import Product from './Product';
import Navbar from "./Navbar"
import axios  from 'axios';
const Profile = () => {
 

  const [data,setdata]=useState(null)
  React.useEffect(() => {
    const fetchData = async () => {
    
      const response=await axios.get(`https://cars24.onrender.com/api/auth/profile/${localStorage.getItem('id')}`);
      const result = response.data
      console.log(result)
      setdata(result)
    };
    fetchData();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="bg-white rounded-lg shadow-md p-8">
  <h2 className="text-3xl font-bold text-gray-900 mb-6">User Profile</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="bg-blue-100 rounded-lg p-6">
      <h3 className="text-xl font-bold text-blue-900 mb-4">Email</h3>
      <p className="text-lg text-blue-800">{data?.email}</p>
    </div>
    <div className="bg-green-100 rounded-lg p-6">
      <h3 className="text-xl font-bold text-green-900 mb-4">Verified Status</h3>
      <p className="text-lg text-green-800">{data?.verified === true ? "Verified Account" : "Not Verified Account"}</p>
    </div>
    <div className="bg-yellow-100 rounded-lg p-6">
      <h3 className="text-xl font-bold text-yellow-900 mb-4">User Role</h3>
      <p className="text-lg text-yellow-800">{data?.role}</p>
    </div>
    <div className="bg-pink-100 rounded-lg p-6">
      <h3 className="text-xl font-bold text-pink-900 mb-4">Admin</h3>
      <p className="text-lg text-pink-800">{data?.isAdmin === true ? "Admin" : "Not Admin"}</p>
    </div>
    <div className="bg-purple-100 rounded-lg p-6">
      <h3 className="text-xl font-bold text-purple-900 mb-4">Your Secret ID</h3>
      <p className="text-lg text-purple-800">{data?._id}</p>
    </div>
  </div>
</div>

      {/* <h2 className="text-2xl my-5 font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
         EMAIL :  {data?.email}
        </h2>

        <h2 className="text-2xl my-5 font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          VERIFIED STATUS : {data?.verified===true?"Verified Account":"Not Verified Account"}
        </h2>
        <h2 className="text-2xl my-5 font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
         USER ROLE :  {data?.role}
        </h2>
        <h2 className="text-2xl my-5 font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
         ADMIN :  {data?.isAdmin===true?"Admin":"Not Admin"}
        </h2>
        <h2 className="text-2xl my-5 font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
         DEALERSHIP ID :  {data?._id}
        </h2> */}

        <div className="w1" style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
          <div className="left">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          
          {data?.role==="dealer"?"Cars DealerShip":""}
                  </h2>

 


<Product data={data?.cars_dealership} />

          </div>
          <div className="right">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          
          {data?.role==="dealer"?"Successfull_deals:":""}
                  </h2>

 
     <Product data={data?.successfull_deals} />
          </div>
        </div>
     

         
         
    
         <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          
          {data?.role==="user"?"Cars Owned":""}
                  </h2>

 


<Product data={data?.customer_owned} />

    </div>
  )
}

export default Profile
