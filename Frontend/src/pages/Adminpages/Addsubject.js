import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { APIROUTE } from '../../components/Commonroute';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Addsubject = () => {
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');
  const [subjects, setSubjects] = useState(Array.from({ length: 5 }, () => ({ name: '', theory: '', practical: '' })));
  const [courseList, setCourseList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${APIROUTE}course/show-course`);
        setCourseList(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      course: course,
      semester: semester,
      subjects: subjects
    };

    axios.post(`${APIROUTE}semester/add-semester`, data)
      .then((res) => {
        toast.success(res.data.message);
        navigate('/admin/semesterlist');
        // Clear form fields after successful submission
        setCourse('');
        setSemester('');
        setSubjects(Array.from({ length: 5 }, () => ({ name: '', theory: '', practical: '' })));
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to add semester');
      });
  };

  const handleSubjectChange = (index, key, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][key] = value;
    setSubjects(updatedSubjects);
  };

  return (
    <>
      <div className="row container-fluid border">
        <div className="col-3 mt-2 border list-group">
          <Sidebar />
        </div>
        <div className="col-9 mt-2">
          <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">
            <br />
            <p className='h6 text-center'>You can add course, semester/year, and subjects by fulfilling the form below:</p>
            <div className='w-75 border m-auto mb-3 mt-3'>
              <form onSubmit={handleSubmit} className='m-3'>
                <div className="row">
                  <div className="col-6">
                    <label>Faculty:</label>
                    <select className="custom-select form-control" onChange={(e) => setCourse(e.target.value)} value={course}>
                      <option value="">Choose faculty</option>
                      {courseList.map((list) => (
                        <option key={list._id} value={list.coursename}>{list.coursename}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-6">
                    <label htmlFor='sem'>Semester/Year:</label>
                    <input type='text' placeholder='Enter semester' className='form-control' onChange={(e) => setSemester(e.target.value)} value={semester} />
                  </div>
                </div>
                <div className='container-fluid border my-3'>
                  <div className='row'>
                    <div className='col-6 text-center'>Subjects</div>
                    <div className='col-6 text-center'>Credit hours</div>
                  </div>
                  {subjects.map((subject, index) => (
                    <div key={index} className='row m-2'>
                      <div className='col-6'>
                        <label htmlFor={`sub${index + 1}`}>{`Subject ${index + 1}`}</label>
                        <input type='text' placeholder='' id={`sub${index + 1}`} className='form-control' onChange={(e) => handleSubjectChange(index, 'name', e.target.value)} value={subject.name} />
                      </div>
                      <div className='col-6'>
                        <div className='row'>
                          <div className='col-6'>
                            <label htmlFor={`th${index + 1}`}>Theory</label>
                            <input type='text' id={`th${index + 1}`} placeholder='' className='form-control' onChange={(e) => handleSubjectChange(index, 'theory', e.target.value)} value={subject.theory} />
                          </div>
                          <div className='col-6'>
                            <label htmlFor={`p${index + 1}`}>Practical</label>
                            <input type='text' id={`p${index + 1}`} placeholder='' className='form-control' onChange={(e) => handleSubjectChange(index, 'practical', e.target.value)} value={subject.practical} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <input type='submit' value='Add' className='btn btn-primary m-2' />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Addsubject;
