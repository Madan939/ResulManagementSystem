import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { APIROUTE } from '../../components/Commonroute'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
const Adminnotice = () => {
    const [getnotice, setnotice] = useState([])
    const getAllNotice = async () => {
        try {
            const res = await axios.get(`${APIROUTE}notice/show-notice`)
            setnotice(res.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getAllNotice()
    }, [])
    const deletenotice = async (_id) => {
        console.log(_id)
        await axios.post(`${APIROUTE}notice/delete-notice/${_id}`)
            .then(res => {
                getAllNotice()
                toast.error(res.data.message);
            })
            .catch(err => {
                console.log(err);
                toast.error("Error deleting item");
            })
    };
    // console.log(getnotice)
    return (
        <>
            <div className="container-fluid border">
               
                <div className=" mt-2 ">
                    <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">
                        {getnotice && getnotice.length > 0 ? (
                            <>
                                {getnotice && getnotice.map((list) => (
                                    <div key={list._id}  className='container border my-3 w-75 m-auto'>
                                        <p className='text-center m-1 h4' >College/Institute Name</p>
                                        <br />
                                        <p className='h5 text-center'>Notice</p><br />
                                        <p>{list.createdAt}</p>
                                        <br />
                                        <p className='text-center h5'>Attention Please!</p>
                                        <br />                                 
                                        <p className='card'>
                                            <p className='container-fluid'>{list.notice}</p></p>                                    
                                        <br /><br />
                                        <p>{list.issuername}</p>
                                        <p>{list.post}</p>
                                        <br />
                                        <div>
                                            <Link to={`/admin/edit-notice/${list._id}`} className='m-2 btn btn-primary'>Edit</Link>
                                            <p className='m-2 btn btn-danger' onClick={() => deletenotice(list._id)}>Delete</p>
                                        </div>

                                    </div>
                                ))}
                            </>

                        ) : (
                            <p className='text-center h1'>Empty Notice</p>
                        )}

                    </div>
                </div>
            </div>

        </>
    )
}

export default Adminnotice