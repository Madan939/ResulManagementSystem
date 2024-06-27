import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import axios from 'axios'
import { APIROUTE } from '../../components/Commonroute'
import { Link } from 'react-router-dom'

const Home = () => {
  const [sname,setname]=useState('')
  const [student,setstudent]= useState([])
  function subform(e){
    e.preventDefault()
    const data={
      id:Date.now(),
      name:sname
    }
    axios.post(`${APIROUTE}student/search-student`,data)
    .then((res)=>{
      setstudent(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
    //console.log(data)
  }
  console.log(student)
  return (
    <>
      <div className="row container-fluid border my-2">
        <div className="col-3 mt-2 border list-group">
          <Sidebar />
        </div>
        <div className="col-9 mt-2 " style={{ height: "100vh" }}>
          <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">
            <form className="d-flex" role="search" onSubmit={subform}>
              <input className="form-control me-2" type="search" placeholder="Search students" aria-label="Search" onChange={(e)=>setname(e.target.value)} value={sname}/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            {student && student.length>0?(
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
                                {student && student.map((list,idx)=>(
                                    <tr key={list._id}>
                                        <td>{idx+1}</td>
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
            ):(<>
            </>)}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home