import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import axios from 'axios'
import { APIROUTE } from '../../components/Commonroute';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'

const Semesterlist = () => {
    const [category, setCategory] = useState('BCA')
    const list = [
        { coursename: "BCA", id: 1 },
        { coursename: "BBM", id: 2 },
        { coursename: "BBS", id: 3 },
    ]
    const [semesterList, setSemesterList] = useState([]);

    const showAllSemester = async () => {
        try {
            const res = await axios.get(`${APIROUTE}semester/show-semester`);
            setSemesterList(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        showAllSemester();
    }, [])

    const deleteSemester = async (_id) => {
        try {
            await axios.post(`${APIROUTE}semester/delete-semester/${_id}`);
            showAllSemester();
            toast.error("Semester deleted successfully");
        } catch (err) {
            console.error(err);
            toast.error("Error deleting semester");
        }
    };

    return (
        <>
            <div className="row container-fluid border">
                <div className="col-3 mt-2 border list-group">
                    <Sidebar />
                </div>
                <div className="col-9 mt-2 ">
                    <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">

                        {semesterList && semesterList.length > 0 ? (
                            <>
                                <p className='h-4 m-3'>Choose Faculty:</p>
                                <div className='container d-flex gap-3 my-3 '>
                                    {list && list.map((item) => (
                                        <div key={item.id} onClick={() => setCategory(item.coursename)} className={` item-border d-flex text-center gap-2 ps-3 btn btn-secondary btn-sm ${category === item.coursename && 'selected-item-border'}`} >
                                            {item.coursename}
                                        </div>
                                    ))}
                                </div>
                                <div className='container-fluid border m-3'>
                                    {semesterList && semesterList.filter((i) => i.course === category).map((list) => (
                                        <div key={list._id}> 
                                            <p className='text-center m-2 h5'>{list.semester}</p>
                                            <table className='table table-bordered'>
                                                <thead>
                                                    <tr className='text-center'>
                                                        <th>SN</th>
                                                        <th>Subjects</th>
                                                        <th>Theory</th>
                                                        <th>Practical</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {list.subjects && list.subjects.map((item, idx) => (
                                                        <tr className='' key={item.name}>
                                                            <td className='text-center'>{idx + 1}</td>
                                                            <td>{item.name}</td>
                                                            <td className='text-center'>{item.theory}</td>
                                                            <td className='text-center'>{item.practical}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <div className='d-flex '>
                                                <p className='btn btn-primary  m-2'>
                                                    <Link to={`/admin/edit-subject/${list._id}`} className=' text-decoration-none text-light'>Edit</Link>
                                                </p>
                                                <p className='btn btn-danger m-2' onClick={() => deleteSemester(list._id)}>Delete</p>
                                            </div>
                                            <hr />
                                        </div>
                                    ))}
                                </div>
                            </>

                        ) : (
                            <p className='h1 text-center m-4'>Empty</p>
                        )}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Semesterlist;
