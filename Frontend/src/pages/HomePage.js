import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { APIROUTE } from '../components/Commonroute';
import Sidebar from '../components/Sidebar';
import { useReactToPrint } from 'react-to-print';

const HomePage = () => {
    const login = JSON.parse(localStorage.getItem('Admin'));
    const navigate = useNavigate();
    useEffect(() => {
        if (!login) {
            navigate('/adminlogin')
        }
    }, [])
    const [sname, setname] = useState('')
    const [student, setstudent] = useState([])
    function subform1(e) {
        e.preventDefault()
        const data = {
            id: Date.now(),
            name: sname
        }
        axios.post(`${APIROUTE}student/search-student`, data)
            .then((res) => {
                setstudent(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        //console.log(data)
    }
    //console.log(student)
    const componentRef=useRef()
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
      setIsOpen(true);
    };
    const handleprint = useReactToPrint({
      content: () => componentRef.current,
    });
    const [symbolno, setsymbolno] = useState('')
    const [result, setresult] = useState([])
    function subform(e) {
      e.preventDefault()
      const data = {
        id: Date.now(),
        symbolno: symbolno
      }
      axios.post(`${APIROUTE}result/search-result`, data)
        .then((res) => {
            setresult(res.data);
        })
        .catch(err => {
          alert("Please input correct symbol_no")
          console.log(err)
        })
      setsymbolno('')
    }
    const theorymarks = (theory) => {
      return (theory / 15).toFixed(2)
    }
    const practicalmarks = (practical) => {
      return (practical / 10).toFixed(2)
    }
    const total = (theory, practical) => {
      return (parseFloat(theory) + parseFloat(practical)) / 25;
    };
  
    const finalmarks = () => {
      let totalFinalMarks = 0;
      result.subjects && result.subjects.forEach(subject => {
        totalFinalMarks += total(subject.theory, subject.practical);
      });
      return (totalFinalMarks / 5).toFixed(2);
    };
    return (
        <>
            {login.User.role === "admin" ? (
                <>
                    <div className="row container-fluid border my-2">
                        <div className="col-3 mt-2 border list-group">
                            <Sidebar />
                        </div>
                        <div className="col-9 mt-2 " style={{ height: "100vh" }}>
                            <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">
                                <form className="d-flex" role="search" onSubmit={subform1}>
                                    <input className="form-control me-2" type="search" placeholder="Search students" aria-label="Search" onChange={(e) => setname(e.target.value)} value={sname} />
                                    <button className="btn btn-outline-success" type="submit">Search</button>
                                </form>
                                {student && student.length > 0 ? (
                                    <>
                                        <p>student list</p>
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
                                                {student && student.map((list, idx) => (
                                                    <tr key={list._id}>
                                                        <td>{idx + 1}</td>
                                                        <td>{list.name}</td>
                                                        <td>{list.address}</td>
                                                        <td>{list.phone}</td>
                                                        <td>{list.gender}</td>
                                                        <td>{list.grade}</td>
                                                        <td>{list.faculty}</td>
                                                        <td className='text-center'>
                                                            <Link to={`/admin/view-student/${list._id}`} className='btn btn-secondary btn-sm text-decoration-none'>View</Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </>
                                ) : (<>
                                </>)}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                <div className='container'>
        <p className='text-center h5 m-4'>Search your results </p><br /><br />
        <form className='m-auto w-50 border mb-3' onSubmit={subform}>
          <div className='m-3 row'>
            <div className='col-8'>
              <input type='text' placeholder='enter your symbol no' className='form-control' onChange={(e) => setsymbolno(e.target.value)} value={symbolno} />
            </div>
            <div className='col-4'><input type='submit' value='search' className='btn btn-primary w-100' /></div>
          </div>
        </form>
        {result && result._id ? (
          <div className='result my-3 container-fluid border w-75 m-auto'>
            <p className='result-paragraph h5 text-center m-4'>Examination Board</p>
            <p className='result-paragraph h3 text-center m-3'>GRADE SHEET</p><br />
            <div className='d-flex justify-content-around'>
              <p className='result-paragraph'>Name of the Student:<i className='mx-4'>{result.name}</i></p>
              <p className='result-paragraph'>Symbol_no:<i className='mx-4'>{result.symbolno}</i></p>
            </div>
            <div className='d-flex justify-content-around'>
              <p className='result-paragraph'>Grade:<i className='mx-4'>{result.grade}</i></p>
              <p className='result-paragraph'>Faculty:<i className='mx-4'>{result.faculty}</i></p>
              <p className='result-paragraph'>Semester/Year:<i className='mx-4'>{result.semesteryear}</i></p>
            </div><br />
            <table className='table table-bordered'>
              <thead>
                <tr className='result-table-head text-center'>
                  <th>SN</th>
                  <th>SUBJECTS</th>
                  <th>CREDIT HOUR</th>
                  <th>TH</th>
                  <th>PR</th>
                  <th>FINAL</th>
                </tr>
              </thead>
              <tbody>
                {result.subjects && result.subjects.map((item, idx) => (
                  <tr key={item.name}>
                    <td className='text-center'>{idx + 1}</td>
                    <td>{item.name}</td>
                    <td className='text-center'>{item.credithour}</td>
                    <td className='text-center'>{theorymarks(item.theory)}</td>
                    <td className='text-center'>{practicalmarks(item.practical)}</td>
                    <td className='text-center'>{total(item.theory, item.practical)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <th colSpan="4" className="gpa text-center">GRADE POINT AVERAGE(GPA):</th>
                  <td colSpan="1" className="text-center">{finalmarks()}</td>
                </tr>
              </tfoot>
            </table>
            <br />
            <div>
              <p className='result-paragraph'>1.ONE CREDIT HOURS EQUALS 4 CLOCK HOURS</p>
              <p className='result-paragraph'> TH:Theory,PR:Practical</p>
            </div>
            <br />
            <button type="button" className="btn btn-primary" onClick={openModal}>
            Print result
          </button>
          <br/><br/>
          {isOpen && (
        <div  className="modal fade show" tabIndex="1" aria-labelledby="exampleModalLabel" aria-modal="true" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body"ref={componentRef} >
                <div className='card'>
                  <div className='container'>
                  <div className='result my-3 container-fluid border m-auto'>
            <p className='result-paragraph h5 text-center m-4'>Examination Board</p>
            <p className='result-paragraph h3 text-center m-3'>GRADE SHEET</p><br />
            <div className='d-flex justify-content-around'>
              <p className='result-paragraph'>Name of the Student:<i className='mx-4'>{result.name}</i></p>
              <p className='result-paragraph'>Symbol_no:<i className='mx-4'>{result.symbolno}</i></p>
            </div>
            <div className='d-flex justify-content-around'>
              <p className='result-paragraph'>Grade:<i className='mx-4'>{result.grade}</i></p>
              <p className='result-paragraph'>Faculty:<i className='mx-4'>{result.faculty}</i></p>
              <p className='result-paragraph'>Semester/Year:<i className='mx-4'>{result.semesteryear}</i></p>
            </div><br />
            <table className='table table-bordered'>
              <thead>
                <tr className='result-table-head text-center'>
                  <th>SN</th>
                  <th>SUBJECTS</th>
                  <th>CREDIT HOUR</th>
                  <th>TH</th>
                  <th>PR</th>
                  <th>FINAL</th>
                </tr>
              </thead>
              <tbody>
                {result.subjects && result.subjects.map((item, idx) => (
                  <tr key={item.name}>
                    <td className='text-center'>{idx + 1}</td>
                    <td>{item.name}</td>
                    <td className='text-center'>{item.credithour}</td>
                    <td className='text-center'>{theorymarks(item.theory)}</td>
                    <td className='text-center'>{practicalmarks(item.practical)}</td>
                    <td className='text-center'>{total(item.theory, item.practical)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <th colSpan="4" className="gpa text-center">GRADE POINT AVERAGE(GPA):</th>
                  <td colSpan="1" className="text-center">{finalmarks()}</td>
                </tr>
              </tfoot>
            </table>
            <br />
            <div>
              <p className='result-paragraph'>1.ONE CREDIT HOURS EQUALS 4 CLOCK HOURS</p>
              <p className='result-paragraph'> TH:Theory,PR:Practical</p>
            </div>
            </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsOpen(false)} aria-label="Close">Close</button>
                <button type="button" className="btn btn-success">Download</button>
                <button type="button" className="btn btn-primary" onClick={handleprint}>Print Result</button>
              </div>
            </div>
          </div>
        </div>
      )}
          </div>
        ) : (
          <p></p>
        )}

      </div> 
                </>
            )}
        </>
    )
}

export default HomePage