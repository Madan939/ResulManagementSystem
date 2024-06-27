import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import { APIROUTE } from '../../components/Commonroute';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Editsubject = () => {
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');
  const [subjects, setSubjects] = useState([
    { name: '', theory: '', practical: '' },
    { name: '', theory: '', practical: '' },
    { name: '', theory: '', practical: '' },
    { name: '', theory: '', practical: '' },
    { name: '', theory: '', practical: '' }
  ]);
  const [courseList, setCourseList] = useState([]);
  const { _id } = useParams();
  const navigate = useNavigate();

  const showAllCourses = async () => {
    try {
      const res = await axios.get(`${APIROUTE}course/show-course`);
      setCourseList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    showAllCourses();
    if (_id) {
      axios.get(`${APIROUTE}semester/edit-semester/${_id}`)
        .then(res => {
          const { course, semester, subjects } = res.data;
          setCourse(course);
          setSemester(semester);
          setSubjects(subjects);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      _id: _id,
      course: course,
      semester: semester,
      subjects: subjects
    };

    try {
      await axios.post(`${APIROUTE}semester/update-semester`, data);
      toast.success('Semester updated successfully');
      navigate('/admin/semesterlist');
    } catch (error) {
      console.log(error);
      toast.error('Error updating semester');
    }

    console.log(data);
  }

  const handleSubjectChange = (index, key, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][key] = value;
    setSubjects(updatedSubjects);
  };

  return (
    <div className="row container-fluid border">
      <div className="col-3 mt-2 border list-group">
        <Sidebar />
      </div>
      <div className="col-9 mt-2">
        <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">
          <div className='w-75 border m-auto'>
            <form onSubmit={handleSubmit}>
            <div className="row">
                  <div className="col-6">
                    <label>Faculty:</label>
                    <select className="custom-select form-control" onChange={(e) => setCourse(e.target.value)} value={course||''}>
                      <option value="">Choose faculty</option>
                      {courseList.map((list) => (
                        <option key={list._id} value={list.coursename}>{list.coursename}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-6">
                    <label htmlFor='sem'>Semester/Year:</label>
                    <input type='text' placeholder='Enter semester' className='form-control' onChange={(e) => setSemester(e.target.value)} value={semester||''} />
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
                      <input type='text' placeholder='' id={`sub${index + 1}`} className='form-control' onChange={(e) => handleSubjectChange(index, 'name', e.target.value)} value={subject.name || ''} />
                    </div>
                    <div className='col-6'>
                      <div className='row'>
                        <div className='col-6'>
                          <label htmlFor={`th${index + 1}`}>Theory</label>
                          <input type='text' id={`th${index + 1}`} placeholder='' className='form-control' onChange={(e) => handleSubjectChange(index, 'theory', e.target.value)} value={subject.theory || ''} />
                        </div>
                        <div className='col-6'>
                          <label htmlFor={`p${index + 1}`}>Practical</label>
                          <input type='text' id={`p${index + 1}`} placeholder='' className='form-control' onChange={(e) => handleSubjectChange(index, 'practical', e.target.value)} value={subject.practical || ''} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <input type='submit' value='Update' className='btn btn-success m-2' />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editsubject;
