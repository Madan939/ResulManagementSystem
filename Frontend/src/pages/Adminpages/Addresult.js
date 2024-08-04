import React, { useEffect, useState } from 'react';
import { APIROUTE } from '../../components/Commonroute';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Addresult = () => {
  const [courselist, setcourselist] = useState([]);
  const [symbolno, setsymbolno] = useState('');
  const [grade, setgrade] = useState('');
  const [faculty, setfaculty] = useState('');
  const [semyer, setsemyer] = useState('');
  const [name, setname] = useState('');
  const [subjects, setSubjects] = useState([
    { name: '', theory: '', practical: '', credithour: '' },
    { name: '', theory: '', practical: '', credithour: '' },
    { name: '', theory: '', practical: '', credithour: '' },
    { name: '', theory: '', practical: '', credithour: '' },
    { name: '', theory: '', practical: '', credithour: '' }
  ]);
  const navigate = useNavigate();

  const showallcourse = async () => {
    try {
      const res = await axios.get(`${APIROUTE}course/show-course`);
      setcourselist(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    showallcourse();
  }, []);

  const handleAddSubject = () => {
    setSubjects([...subjects, { name: '', theory: '', practical: '', credithour: '' }]);
  };

  const handleRemoveSubject = (index) => {
    const updatedSubjects = [...subjects];
    updatedSubjects.splice(index, 1);
    setSubjects(updatedSubjects);
  };

  const handleSubjectChange = (index, key, value) => {
    const updatedSubjects = [...subjects];
    if (key === 'theory' || key === 'practical' || key === 'credithour') {
      updatedSubjects[index][key] = isNaN(parseFloat(value)) ? '' : parseFloat(value);
    } else {
      updatedSubjects[index][key] = value;
    }
    setSubjects(updatedSubjects);
  };

  const formsubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      symbolno: symbolno,
      grade: grade,
      faculty: faculty,
      semesteryear: semyer,
      subjects: subjects
    };
    axios.post(`${APIROUTE}result/add-result`, data)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        navigate("/admin/show-result");
      })
      .catch(err => {
        console.log(err);
      });
    console.log(data);
  };

  return (
    <>
      <div className="container-fluid border">

        <div className=" mt-2">
          <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">
            <div className='my-3 m-auto border'>
              <form className='m-2' onSubmit={formsubmit}>
                <p className='text-center m-2'>Result Form</p>
                <div className='row mb-2'>
                  <div className='col-6'>
                    <label htmlFor='sym'>Symbol_no</label>
                    <input type='text' placeholder='eg:72902087' className='form-control' id="sym" onChange={(e) => setsymbolno(e.target.value)} value={symbolno} />
                  </div>
                  <div className='col-6'>
                    <label htmlFor='gr'>Grade</label>
                    <input type='text' placeholder='eg:Bachelor' className='form-control' id="gr" onChange={(e) => setgrade(e.target.value)} value={grade} />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className='col-6'>
                    <label htmlFor="course">Faculty</label>
                    <select className='form-control' onChange={(e) => setfaculty(e.target.value)} value={faculty}>
                      <option defaultValue=''>choose faculty </option>
                      {courselist.map((list) => {
                        return <option key={list._id} value={list.coursename}>{list.coursename}</option>
                      })}
                    </select>
                  </div>
                  <div className='col-6'>
                    <label htmlFor="sem/yer">Semester/Year</label>
                    <input type="text" id="sem/yer" placeholder='eg: First Semester/Year' className='form-control' onChange={(e) => setsemyer(e.target.value)} value={semyer} />
                  </div>
                </div>
                <div className='mb-2'>
                  <label htmlFor='nm'>Full Name</label>
                  <input type='text' placeholder='eg:Ram Bahadur Thapa' className='form-control' id="nm" onChange={(e) => setname(e.target.value)} value={name} />
                </div>
                {subjects.map((subject, index) => (
                  <div key={index}>
                    <div className='row mb-2'>
                      <div className='col-6'>
                        <label>{`Subject-${index + 1}`}</label>
                        <input type='text' className='form-control' onChange={(e) => handleSubjectChange(index, 'name', e.target.value)} value={subject.name} />
                      </div>
                      <div className='col-6'>
                        <div className='row'>
                          <div className='col-4'>
                            <label>Credit_hour</label>
                            <input type='text' className='form-control' onChange={(e) => handleSubjectChange(index, 'credithour', e.target.value)} value={subject.credithour} />
                          </div>
                          <div className='col-4'>
                            <label>Theory</label>
                            <input type='text' className='form-control' onChange={(e) => handleSubjectChange(index, 'theory', e.target.value)} value={subject.theory} />
                          </div>
                          <div className='col-4'>
                            <label>Practical</label>
                            <input type='text' className='form-control' onChange={(e) => handleSubjectChange(index, 'practical', e.target.value)} value={subject.practical} />
                          </div>
                        </div>
                      </div>
                    </div>
                    {index >= 5 && (
                      <div className="text-end mb-2">
                        <button type="button" className="btn btn-danger" onClick={() => handleRemoveSubject(index)}>Remove</button>
                      </div>
                    )}
                  </div>
                ))}
                {subjects.length < 10 && (
                  <div className="mb-2">
                    <button type="button" className="btn btn-secondary" onClick={handleAddSubject}>Add Subject</button>
                  </div>
                )}
                <input type='submit' value="Add-result" className='btn btn-primary' />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addresult;
