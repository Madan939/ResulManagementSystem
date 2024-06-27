import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { APIROUTE } from '../../components/Commonroute'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'

const ShowStudent = () => {
    const [student,setstudentlist]=useState([])
    const showallstudent = async () => {
        await axios.get(`${APIROUTE}student/show-student`)
            .then((res) => {
                setstudentlist(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        showallstudent()
    }, [])
    //console.log(student)
    const deletestudent = async (_id) => {
        console.log(_id)
        await axios.post(`${APIROUTE}student/delete-student/${_id}`)
            .then(res => {
                showallstudent()
                toast.error(res.data.message);
            })
            .catch(err => {
                console.log(err);
                toast.error("Error deleting item");
            })
    };
  return (
    <>
    <div className="row container-fluid border">
                <div className="col-3 mt-2 border list-group">
                    <Sidebar/>
                </div>
                <div className="col-9 mt-2 ">
                    <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">
                       {student && student.length>0?(
                        <>
                        <p className='m-2 text-center'>List of Students</p>
                        <table className='student-table table table-bordered'>
                            <thead>
                                <tr className='text-center'>
                                    <th>SN</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Phone</th>
                                    <th>Gender</th>
                                    <th>Grade</th>
                                    <th>Faculty</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {student && student.map((list,idx)=>(
                                    <tr key={list._id}>
                                        <td>{idx+1}</td>
                                        <td>{list.name}</td>
                                        <td>{list.address}</td>
                                        <td>{list.phone}</td>
                                        <td>{list.gender}</td>
                                        <td>{list.grade}</td>
                                        <td>{list.faculty}</td>
                                        <td className=''>
                                            <p  className='btn btn-secondary mx-1 btn-sm'>
                                            <Link to={`/admin/view-student/${list._id}`} className='text-light text-decoration-none'>View</Link>
                                            </p>                                            
                                            <p className='btn btn-primary mx-1 btn-sm'>
                                            <Link to={`/admin/edit-student/${list._id}`} className='text-light text-decoration-none'>Edit</Link>
                                            </p>
                                            <p className='btn btn-danger mx-1 btn-sm'onClick={()=>deletestudent(list._id)}>Delete</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </>
                       ):(
                        <></>
                       )}
                    </div>
                </div>
            </div>
    </>
  )
}

export default ShowStudent