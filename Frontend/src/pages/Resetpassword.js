import React, { useState } from 'react'
import { APIROUTE } from '../components/Commonroute';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Resetpassword = () => {
    const {_id,token}=useParams()
    const[newpass,setnewpass]=useState('');
    const [confirmpass,setconfirmpass]=useState('');
    const navigate=useNavigate()
   // console.log(email)
    function submit(e){
        e.preventDefault();
        if(newpass===confirmpass){
            const data={
                _id:_id,
                token:token,
                password:newpass
            }
            axios.post(`${APIROUTE}admin/resetPassword`, data)
            .then((res)=>{
                toast.success(res.data.message)
                navigate("/adminlogin")
            })
            .catch(err=>{
              toast.error("failed to update the password")
            })
        }
        else{
            toast.error("password didn't match");
        }
    }
  return (
    <>
       <div className='card w-50 m-auto mt-3'>
                <p className='h4 m-2 text-center'>Reset your password</p>
                <hr/>
                <form className='p-2'onSubmit={submit} >
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="floatingInput1" placeholder='' onChange={(e)=>setnewpass(e.target.value)} value={newpass}/>
                        <label htmlFor="floatingInput1">new password</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="floatingInput" placeholder='' onChange={(e)=>setconfirmpass(e.target.value)} value={confirmpass}/>
                        <label htmlFor="floatingInput">confirm password</label>
                    </div>
                    <div>
                        <Link to="/adminlogin" className='btn btn-success m-1'>Back to log In</Link>
                        <input type='submit'className='btn btn-primary m-1' value="Update password"/>
                    </div>
                </form>
            </div>
    </>
  )
}

export default Resetpassword