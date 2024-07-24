import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { APIROUTE } from '../components/Commonroute';
import axios from 'axios';

const Confirmation = () => {
    const[validUrl,setValidUrl]=useState(false);
    const params=useParams();
    useEffect(()=>{
        const verifyemail=async()=>{
            try{
                const url=`${APIROUTE}admin/verifyEmail/${params.token}`
                const {data}= await axios.get(url)
                console.log(data)
                setValidUrl(true)

            }
            catch(err){
               // console.log(err)
                setValidUrl(false)
            }
        }
        verifyemail()
    })
  return (
    <>
    <p className='h2 text-center '>User Registered successfully</p>
    <Link to="/adminlogin" className='btn btn-primary text-light'>Back to Log In</Link>
    </>
  )
}

export default Confirmation