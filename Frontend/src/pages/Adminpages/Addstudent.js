import React, { useEffect, useState } from 'react'

import axios from 'axios'
import {toast} from 'react-toastify'
import { APIROUTE } from '../../components/Commonroute'
import {useNavigate} from 'react-router-dom'
const Addstudent = () => {
    const [studentname, setstudentname] = useState('')
    const [symbolno, setsymbolno] = useState('')
    const [address, setaddress] = useState('')
    const [dob, setdob] = useState('')
    const [phone, setphone] = useState('')
    const [gender, setgender] = useState('')
    const [grade, setgrade] = useState('')
    const [course, setcourse] = useState('')
    const [semyer, setsemyer] = useState('')
    const [courselist, setcourselist] = useState([])
    const navigate=useNavigate()
    const submit = (e) => {
        e.preventDefault()
        const data = {
          
            symbolno: symbolno,
            name: studentname,
            address: address,
            phone: phone,
            dob: dob,
            gender: gender,
            grade: grade,
            faculty: course,
            semesteryear:semyer
        }
        axios.post(`${APIROUTE}student/add-student`,data)
        .then((res)=>{
            toast.success(res.data.message)
            navigate('/admin/studentlist')
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const showallcourse = async () => {
        await axios.get(`${APIROUTE}course/show-course`)
            .then((res) => {
                setcourselist(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        showallcourse()
    }, [])
    //console.log(courselist)
    return (
        <>
            <div className="container-fluid border">
               
                <div className=" mt-2 ">
                    <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">
                        <p className='text-center p-3 '> Add a student by fullfilling the form below:</p>
                        <div className='w-75 m-auto border'>
                            <p className='h4  text-center' >Student Form</p>
                            <form className='p-2' onSubmit={submit}>
                                <div className='p-2 border mb-2'>
                                    <p className='text-center'>Academic information</p>
                                    <div className="row mb-2">
                                        <div className='col-6'>
                                            <label htmlFor="symbolno">Symbolno</label>
                                            <input type="text" id="symbolno" placeholder='Enter symbol no' className='form-control' onChange={(e) => setsymbolno(e.target.value)} value={symbolno} />
                                        </div>
                                        <div className='col-6'>
                                            <label htmlFor="class">Grade</label>
                                            <input type="text" id="class" placeholder='Enter grade of student' className='form-control' onChange={(e) => setgrade(e.target.value)} value={grade} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                    <div className='col-6'>
                                        <label htmlFor="course">Faculty</label>
                                        <select onChange={(e) => setcourse(e.target.value)} className='form-control'>
                                            <option defaultValue=''>choose faculty </option>
                                            {courselist.map((list) => {
                                                return <option key={list._id} value={list.coursename}>{list.coursename}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className='col-6'>
                                        <label htmlFor="sem/yer">Semester/Year</label>
                                        <input type="text" id="sem/yer" placeholder='Enter semester/year' className='form-control' onChange={(e) => setsemyer(e.target.value)} value={semyer} />
                                    </div>

                                </div>
                                </div>
                                <div className='p-2 border mb-2'>
                                    <p className='text-center'>Personal Information</p>
                                    <div className=' mb-2'>
                                        <label htmlFor="floatingInputf">Full Name</label>
                                        <input type="text" id="floatingInputf" placeholder='Enter full name' className='form-control' onChange={(e) => setstudentname(e.target.value)} value={studentname} />                      
                                </div>
                                <div className="row mb-2">
                                    <div className='col-6'>
                                        <label htmlFor="phone">Phone</label>
                                        <input type="text" id="phone" placeholder='Enter phone no' className='form-control' onChange={(e) => setphone(e.target.value)} value={phone} />
                                    </div>
                                    <div className='col-6'>
                                        <label htmlFor="address">Address</label>
                                        <input type="double" id="address" placeholder='Enter Address' className='form-control' onChange={(e) => setaddress(e.target.value)} value={address} />
                                    </div>
                                </div>
                                <div className=" mb-2">
                                    <label htmlFor="date">Date of birth</label>
                                    <input type="date" id="date" placeholder='' className='form-control' onChange={(e) => setdob(e.target.value)} value={dob} />
                                </div>
                                <div className='mb-2 '>
                                    <label>Gender&nbsp;&nbsp;</label>
                                    <input type="radio" className="" id="m" placeholder='' onChange={(e) => setgender(e.target.value)} value="Male" checked={gender === "Male"} />
                                    <label htmlFor="m">Male&nbsp;</label>
                                    <input type="radio" className="custom-control-input" id="f" placeholder='' onChange={(e) => setgender(e.target.value)} value="Female" checked={gender === "Female"} />
                                    <label htmlFor="f">Female&nbsp;</label>
                                </div>
                                </div>       
                                <input type='submit' value="Submit" className='btn w-25 btn-primary' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Addstudent