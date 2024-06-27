import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Link, useParams } from 'react-router-dom'
import { APIROUTE } from '../../components/Commonroute'
import axios from 'axios'

const ViewStudent = () => {
    const [student, setstudent] = useState([])
    const { _id } = useParams()
    const date = new Date(student.dob)
    const Year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    console.log(Year, month, day)
    useEffect(() => {
        if (_id) {
            axios.get(`${APIROUTE}student/view-student/${_id}`)
                .then(res => {
                    setstudent(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [_id]);
    console.log(student)
    return (
        <>
            <div className="row container-fluid border">
                <div className="col-3 mt-2 border list-group">
                    <Sidebar />
                </div>
                <div className="col-9 mt-2 ">
                    <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">
                        <div className='my-3 w-75 m-auto border'>
                            <p className='h4 my-2 text-center'>College/Institute Name</p>
                            <br />
                            <div className='container-fluid'>
                                <div className='container-fluid mb-2 border'>
                                    <p className='text-center h5 m-2'>Personal Information</p>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <p><strong>Name:</strong>&nbsp;<span>{student.name}</span></p>
                                        </div>
                                        <div className='col-6'>
                                            <p><strong>Phone:</strong>&nbsp;<span>{student.phone}</span></p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-4'>
                                            <p><strong>DOB:</strong>&nbsp;<span>{Year}-{month}-{day}</span></p>
                                        </div>
                                        <div className='col-4'>
                                            <p><strong>Address:</strong>&nbsp;<span>{student.address}</span></p>
                                        </div>
                                        <div className='col-4'>
                                            <p><strong>Gender:</strong>&nbsp;<span>{student.gender}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='container-fluid'>
                                <div className='container-fluid border mb-3'>
                                    <p className='h5 text-center m-2'>Academic Information</p>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <p><strong>Symbol_no:</strong>&nbsp;<span>{student.symbolno}</span></p>
                                        </div>
                                        <div className='col-6'>
                                            <p><strong>Grade:</strong>&nbsp;<span>{student.grade}</span></p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <p><strong>Faculty:</strong>&nbsp;<span>{student.faculty}</span></p>
                                        </div>
                                        <div className='col-6'>
                                            <p><strong>Semester/Year:</strong>&nbsp;<span>{student.semesteryear}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div className='d-flex justify-content-between'>
                            <div className='w-100 btn btn-primary m-1 '>
                            <Link to={`/admin/edit-student/${student._id}`} className='text-light text-decoration-none'>Edit Information</Link>
                            </div>
                            <div className=' w-100 btn btn-danger m-1'>Delete Information</div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewStudent