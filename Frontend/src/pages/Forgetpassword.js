import React, { useState } from 'react'
import { APIROUTE } from '../components/Commonroute';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Forgetpassword = () => {
    const [email,setemail]=useState('');
    const navigate=useNavigate();
    function submit(e){
        e.preventDefault();
        const data={
            email
        }
        axios.post(`${APIROUTE}admin/forgetPassword`, data)
        .then((res) => {
           navigate("/confirmreset")
        })
        .catch(err => {
            return alert("email didn't match")
        })
    }
  return (
    <>
      <div className='card w-50 m-auto mt-3'>
                <p className='h4 m-2 text-center'>Find your account</p>
                <hr/>
                <p className='h5 m-2 '>Please enter your email to search for your account </p>
                <br/>
                <form className='p-2' onSubmit={submit}>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder='' onChange={(e)=>setemail(e.target.value)} value={email} />
                        <label htmlFor="floatingInput">Email</label>
                    </div>
                    <div>
                        <Link to="/adminlogin" className='btn btn-secondary my-1'>Cancel</Link>
                        <input type='submit'className='btn btn-primary m-1 ' value="Search"/>
                    </div>
                </form>
            </div>
    </>
  )
}

export default Forgetpassword