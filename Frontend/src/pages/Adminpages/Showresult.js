import React, { useEffect, useState } from 'react'

import { APIROUTE } from '../../components/Commonroute'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'
const Showresult = () => {
    const [result, setresult] = useState([])
    const showresult = async () => {
        await axios.get(`${APIROUTE}result/show-result`)
            .then((res) => {
                setresult(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const deleteresult = async (_id) => {
        console.log(_id)
        await axios.post(`${APIROUTE}result/delete-result/${_id}`)
            .then(res => {
                showresult()
                toast.error(res.data.message);
            })
            .catch(err => {
                console.log(err);
                toast.error("Error deleting item");
            })
    };
    useEffect(() => {
        showresult()
    }, [])
    console.log(result)
    return (
        <>
            <div className=" container-fluid border" style={{ height: "100vh" }}>
              
                <div className=" mt-2 ">
                    <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">
                        <p>Result List</p>
                        {result && result.length > 0 ? (
                            <>
                                <div className='container-fluid'>
                                    <table className='table table-bordered'>
                                        <thead>
                                            <tr className='text-center'>
                                                <th>SN</th>
                                                <th>Symbol_no</th>
                                                <th>Name</th>
                                                <th>Grade</th>
                                                <th>Semester/Year</th>
                                                <th>Faculty</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result && result.map((list, idx) => (
                                                <tr className='text-center' key={list._id}>
                                                    <td>{idx + 1}</td>
                                                    <td>{list.symbolno}</td>
                                                    <td>{list.name}</td>
                                                    <td>{list.grade}</td>
                                                    <td>{list.semesteryear}</td>
                                                    <td>{list.faculty}</td>
                                                    <td>
                                                        <p className='btn btn-secondary btn-sm mx-1'>
                                                            <Link to={`/admin/view-result/${list._id}`}className='text-light text-decoration-none'>View</Link>
                                                            </p>
                                                        <p className='btn btn-primary btn-sm'>
                                                        <Link to={`/admin/edit-result/${list._id}`}className='text-light text-decoration-none'>Edit</Link>
                                                        </p>
                                                        <p className='btn btn-danger btn-sm mx-1' onClick={()=>deleteresult(list._id)}>Delete</p>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </>
                        ) : (
                            <p className='h2 text-center m-3'>No result</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Showresult