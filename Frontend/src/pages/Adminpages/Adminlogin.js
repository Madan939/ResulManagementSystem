import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { APIROUTE } from '../../components/Commonroute'
const Adminlogin = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const navigate = useNavigate()
    function loginform(e) {
        e.preventDefault()
        const data = {
            email: email,
            password: password
        }
        //console.log(data)
        axios.post(`${APIROUTE}admin/adminLogin`, data)
            .then((res) => {
                console.log(res.data)
                localStorage.setItem('Admin',JSON.stringify(res.data))
                  navigate("/")
                 window.location.reload()
            })
            .catch(err => {
                //alert("email and password didn't match")
                console.log(err)
            })

    }
    useEffect(() => {
        if (localStorage.getItem('Admin')) {
            navigate("/admin/admin-homepage")
        }

    }, [])
    return (
        <>
            <div className='w-25 m-auto border container my-3'>
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
                    <hr/>
                    <div className=''>
                        <input type='submit' value="Login" className='btn btn-primary my-1 w-100' />
                        <hr/>
                        <Link to="/forgotpassword">forgot password?</Link>
                        <hr/>
                        <Link className='my-1 w-100 btn btn-success' to="/adminsignup">Register</Link>
                    </div>

                </form>
            </div>
        </>
    )
}

export default Adminlogin