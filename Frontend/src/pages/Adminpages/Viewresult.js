import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { APIROUTE } from '../../components/Commonroute';
import axios from 'axios';
import {toast} from 'react-toastify'

const Viewresult = () => {
    const [result, setresult] = useState([]);
    const { _id } = useParams();
const navigate=useNavigate();
    useEffect(() => {
        if (_id) {
            axios.get(`${APIROUTE}result/view-result/${_id}`)
                .then(res => {
                    setresult(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [_id]);

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
        return totalFinalMarks / 5;
    };
    const deleteresult = async (_id) => {
        console.log(_id)
        await axios.post(`${APIROUTE}result/delete-result/${_id}`)
            .then(res => {
                toast.error(res.data.message);
                navigate('/admin/show-result')
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
                    <Sidebar />
                </div>
                <div className="col-9 mt-2 ">
                    <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">

                        <div className='result m-3 container-fluid border'>
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
                            <div>
                                <p className='result-paragraph'>1.ONE CREDIT HOURS EQUALS 4 CLOCK HOURS</p>
                                <p className='result-paragraph'> TH:Theory,PR:Practical</p>
                            </div>
                            <br />
                        
                            <p className='btn btn-primary btn-sm'>
                                <Link to={`/admin/edit-result/${_id}`} className='text-light text-decoration-none'>Edit</Link>
                            </p>
                            <p className='btn btn-danger btn-sm mx-1' onClick={() => deleteresult(_id)}>Delete</p>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Viewresult;
