import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { APIROUTE } from '../../components/Commonroute';
import { useNavigate, useParams } from 'react-router-dom';

const EditStudent = () => {
  const [studentname, setStudentname] = useState('');
  const [symbolno, setSymbolno] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [grade, setGrade] = useState('');
  const [course, setCourse] = useState('');
  const [semyer, setSemyer] = useState('');
  const [courselist, setCourselist] = useState([]);
  const navigate = useNavigate();
  const { _id } = useParams();

  const submit = (e) => {
    e.preventDefault();
    const data = {
        _id:_id,
      symbolno: symbolno,
      name: studentname,
      address: address,
      phone: phone,
      dob: dob,
      gender: gender,
      grade: grade,
      faculty: course,
      semesteryear: semyer
    }
    axios.post(`${APIROUTE}student/update-student`,data)
    .then((res)=>{
        toast.success(res.data.message)
         navigate('/admin/studentlist')
    })
    .catch(err=>{
        console.log(err)
    })
    console.log(data);
  }

  const showAllCourse = async () => {
    try {
      const res = await axios.get(`${APIROUTE}course/show-course`);
      setCourselist(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    showAllCourse();
    if (_id) {
      axios.get(`${APIROUTE}student/edit-student/${_id}`)
        .then(res => {
          setStudentname(res.data.name);
          setSymbolno(res.data.symbolno);
          setAddress(res.data.address);
          setPhone(res.data.phone);
          setGender(res.data.gender);
          setGrade(res.data.grade);
          setCourse(res.data.faculty);
          setSemyer(res.data.semesteryear);
          // Format date
          const formattedDate = new Date(res.data.dob).toISOString().slice(0, 16);
          setDob(formattedDate);
          console.log(res.data)
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [_id]);

  return (
    <>
      <div className="row container-fluid border">
        <div className="col-3 mt-2 border list-group">
          <Sidebar />
        </div>
        <div className="col-9 mt-2 ">
          <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">
            <p>Edit student</p>
            <div className='w-75 m-auto border'>
              <p className='h4  text-center'>Student Form</p>
              <form className='p-2' onSubmit={submit}>
                <div className='p-2 border mb-2'>
                  <p className='text-center'>Academic information</p>
                  <div className="row mb-2">
                    <div className='col-6'>
                      <label htmlFor="symbolno">Symbolno</label>
                      <input type="text" id="symbolno" placeholder='Enter symbol no' className='form-control' onChange={(e) => setSymbolno(e.target.value)} value={symbolno} />
                    </div>
                    <div className='col-6'>
                      <label htmlFor="class">Grade</label>
                      <input type="text" id="class" placeholder='Enter grade of student' className='form-control' onChange={(e) => setGrade(e.target.value)} value={grade} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className='col-6'>
                      <label htmlFor="course">Faculty</label>
                      <select onChange={(e) => setCourse(e.target.value)} className='form-control' value={course || ''}>
                        <option>choose faculty </option>
                        {courselist.map((list) => {
                          return <option key={list._id} value={list.coursename}>{list.coursename}</option>
                        })}
                      </select>
                    </div>
                    <div className='col-6'>
                      <label htmlFor="sem/yer">Semester/Year</label>
                      <input type="text" id="sem/yer" placeholder='Enter semester/year' className='form-control' onChange={(e) => setSemyer(e.target.value)} value={semyer || ''} />
                    </div>
                  </div>
                </div>
                <div className='p-2 border mb-2'>
                  <p className='text-center'>Personal Information</p>
                  <div className=' mb-2'>
                    <label htmlFor="floatingInputf">Full Name</label>
                    <input type="text" id="floatingInputf" placeholder='Enter full name' className='form-control' onChange={(e) => setStudentname(e.target.value)} value={studentname || ''} />
                  </div>
                  <div className="row mb-2">
                    <div className='col-6'>
                      <label htmlFor="phone">Phone</label>
                      <input type="text" id="phone" placeholder='Enter phone no' className='form-control' onChange={(e) => setPhone(e.target.value)} value={phone || ''} />
                    </div>
                    <div className='col-6'>
                      <label htmlFor="address">Address</label>
                      <input type="double" id="address" placeholder='Enter Address' className='form-control' onChange={(e) => setAddress(e.target.value)} value={address || ''} />
                    </div>
                  </div>
                  <div className=" mb-2">
                    <label htmlFor="date">Date of birth</label>
                    <input type="datetime-local" id="date" placeholder='' className='form-control' onChange={(e) => setDob(e.target.value)} value={dob || ''} />
                  </div>
                  <div className='mb-2 '>
                    <label>Gender&nbsp;&nbsp;</label>
                    <input type="radio" className="" id="m" placeholder='' onChange={(e) => setGender(e.target.value)} value="Male" checked={gender === "Male" || ''} />
                    <label htmlFor="m">Male&nbsp;</label>
                    <input type="radio" className="custom-control-input" id="f" placeholder='' onChange={(e) => setGender(e.target.value)} value="Female" checked={gender === "Female" || ''} />
                    <label htmlFor="f">Female&nbsp;</label>
                  </div>
                </div>
                <input type='submit' value="update" className='btn w-25 btn-success' />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditStudent;
