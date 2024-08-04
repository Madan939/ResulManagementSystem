import React, { useState } from 'react'

import { APIROUTE } from '../../components/Commonroute'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Addnotice = () => {
    const [iname, setiname] = useState('')
    const [ipost, setipost] = useState('')
    const [notice, setnotice] = useState('')
    const navigate = useNavigate()
    function handlesubmit(e) {
        e.preventDefault()
        const data = {
            issuername: iname,
            post: ipost,
            notice: notice
        }
        axios.post(`${APIROUTE}notice/add-notice`, data)
            .then((res) => {
                toast.success(res.data.message)
                navigate('/admin/admin-notice')
            })
            .catch(err => {
                console.log(err)
            })
        console.log(data)
    }
    return (
        <>
            <div className=" container-fluid border">
                <div className=" mt-2 border " style={{ height: "100vh" }}>
                    <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">
                        <p className='h4 text-center'>Add notice to notify your information</p>
                        <div className='w-75 m-auto my-3 border'>
                            <form className='' onSubmit={handlesubmit}>
                                <div className='m-2'>
                                    <label htmlFor='iname'>Issuer Name:&nbsp;</label>
                                    <input type='text' placeholder='enter your name' className='form-control' onChange={(e) => setiname(e.target.value)} value={iname} />
                                </div>
                                <div className='m-2'>
                                    <label htmlFor='ipost'>Issuer post:&nbsp;</label>
                                    <input type='text' id='ipost' placeholder='enter your post' className='form-control' onChange={(e) => setipost(e.target.value)} value={ipost} />
                                </div>
                                <div className='m-2'>
                                    <label htmlFor='ipost'>Notice:&nbsp;</label>
                                    <textarea id='ipost' rows='6' placeholder='enter notice' className='form-control' onChange={(e) => setnotice(e.target.value)} value={notice}></textarea>
                                </div>
                                <input type='submit' value='submit' className='m-2 btn btn-primary' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Addnotice