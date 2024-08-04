import React, { useEffect, useState } from 'react'

import { APIROUTE } from '../../components/Commonroute'
import axios from 'axios'
import {toast} from 'react-toastify'
import {useNavigate, useParams} from 'react-router-dom'
const Editnotice = () => {
    const[iname,setiname]=useState('')
    const[ipost,setipost]=useState('')
    const[notice,setnotice]=useState('')
    const navigate=useNavigate()
    const {_id}=useParams()
    const handlesubmit=async(e)=>{
        e.preventDefault()
        const data={
            _id:_id,
            issuername:iname,
            post:ipost,
            notice:notice
        }
        await axios.post(`${APIROUTE}notice/update-notice`, data)
        .then(res => {
            toast.success(res.data.message);
             navigate('/admin/admin-notice')
    
        })
        .catch(err => {
            console.log(err)
           
        })
    
        console.log(data)
    }
    useEffect(() => {
        if(_id){
            axios.get(`${APIROUTE}notice/edit-notice/${_id}`)
            .then(res => {
                setiname(res.data.issuername)
                setipost(res.data.post)
                setnotice(res.data.notice)
                 
            })
            .catch(err => {
                console.log(err)
            })      
        }
      }, [_id]);
  return (
    <>
       <div className=" container-fluid border">
                <div className=" mt-2 ">
                    <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">
                       <p className='h4 text-center'>Add notice to notify your information</p>
                       <div className='w-75 m-auto my-3 border'>
                        <form className='' onSubmit={handlesubmit}>
                            <div className='m-2'>
                                <label htmlFor='iname'>Issuer Name:&nbsp;</label>
                                <input type='text' placeholder='enter your name' className='form-control' onChange={(e)=>setiname(e.target.value)} value={iname||''}/>
                            </div>
                            <div className='m-2'>
                                <label htmlFor='ipost'>Issuer post:&nbsp;</label>
                                <input type='text'id='ipost' placeholder='enter your post' className='form-control'onChange={(e)=>setipost(e.target.value)} value={ipost||''}/>
                            </div>
                            <div className='m-2'>
                                <label htmlFor='ipost'>Notice:&nbsp;</label>
                                <textarea type='text'id='ipost' rows='6' placeholder='enter notice' className='form-control'onChange={(e)=>setnotice(e.target.value)} value={notice||''}></textarea>
                            </div>
                            <input type='submit' value='update' className='m-2 btn btn-success'/>
                        </form>
                       </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default Editnotice