import axios from 'axios'
import React, {  useState } from 'react'
import { APIROUTE } from '../../components/Commonroute'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const Adminregister = () => {
    const [uname, setuname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [Cpassword, setCpassword] = useState('')
    const navigate = useNavigate()
    function loginform(e) {
        e.preventDefault()
        if (Cpassword !== password) {
            alert("password didn;t match")
            return
        }
        const data = {
            name: uname,
            email: email,
            password: password
        }
        console.log(data)
        axios.post(`${APIROUTE}admin/adminRegister`, data)
            .then((res) => {
                toast.success(res.data.message)
                navigate('/adminlogin')
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <>
            <div className='login-form m-auto border container my-3 shadow'>
                <form className='p-2' onSubmit={loginform} >
                    <p className='text-center text-success my-3 h4'>Create new account</p>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInputuname" placeholder='' onChange={(e) => setuname(e.target.value)} value={uname} />
                        <label htmlFor="floatingInputuname">Username</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInputemail" placeholder='' onChange={(e) => setemail(e.target.value)} value={email} />
                        <label htmlFor="floatingInputemail">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="floatingPass" placeholder='' onChange={(e) => setpassword(e.target.value)} value={password} />
                        <label htmlFor="floatingPass">Password</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="floatingPass" placeholder='' onChange={(e) => setCpassword(e.target.value)} value={Cpassword} />
                        <label htmlFor="floatingPass">Confirm Password</label>
                    </div>
                   
                    <div className='d-flex flex-column align-items-center justify-content-center'>
                            <input type='submit' className='w-50 btn btn-success mb-2' value="Register" />
                            <Link to="/adminlogin" className='h6 text-primary'>Already have an account?</Link>
                        </div>

                </form>
            </div>
        </>
    )
}

export default Adminregister