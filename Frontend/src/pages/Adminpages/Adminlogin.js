import axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { APIROUTE } from '../../components/Commonroute'
const Adminlogin = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const navigate=useNavigate()
    function loginform(e) {
        e.preventDefault()
        const data = {
            email: email,
            password: password
        }
        console.log(data)
        axios.post(`${APIROUTE}admin/adminLogin`, data)
            .then((res) => {
                console.log(res.data.admin)
               localStorage.setItem('Admin', JSON.stringify(res.data.admin))      
               navigate("/admin/admin-homepage") 
                window.location.reload()
            })
            .catch(err => {
                alert("email and password didn't match")
                console.log(err)
            })

    }
    useEffect(()=>{
        if(localStorage.getItem('Admin')){
            navigate("/admin/admin-homepage") 
                 
        }
        
    },[])
  return (
    <>
        <div className='w-50 m-auto border container my-3' style={{ height: "100vh" }}>
                <p className='h2 text-primary text-center' >Login Form</p>
                <form className='p-2' onSubmit={loginform} >
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder='' onChange={(e) => setemail(e.target.value)} value={email} />
                        <label htmlFor="floatingInput">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="floatingPrice" placeholder='' onChange={(e) => setpassword(e.target.value)} value={password} />
                        <label htmlFor="floatingPrice">Password</label>
                    </div>
                    <div className=''>
                        <input type='submit' value="Login" className='btn btn-primary m-2' />
                        <Link className='m-2 ' to="/adminsignup">Didn't have an account?Register</Link>
                    </div>

                </form>
            </div>
    </>
  )
}

export default Adminlogin