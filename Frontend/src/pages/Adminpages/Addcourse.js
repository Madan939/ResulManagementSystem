import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import axios from 'axios';
import { APIROUTE } from '../../components/Commonroute';
import { toast } from 'react-toastify'

const Addcourse = () => {
  const [coursename, setcoursename] = useState('')
  const [coursefee, setcoursefee] = useState('')
  const [courselist, setcourselist] = useState([])
  const [editingCourseId, setEditingCourseId] = useState(null)

  function courseSubmit(e) {
    e.preventDefault()
    const data = {
      coursename: coursename,
      coursefee: Number(coursefee)
    }
    if (editingCourseId) {
      data._id = editingCourseId
      axios.post(`${APIROUTE}course/update-course`, data)
        .then((res) => {
          toast.success(res.data.message)
          showallcourse()
        })
        .catch(err => {
          console.error(err)
        })
    } else {
      axios.post(`${APIROUTE}course/add-course`, data)
        .then((res) => {
          toast.success(res.data.message)
          showallcourse()
        })
        .catch(err => {
          console.error(err)
        })
    }
    setcoursefee('')
    setcoursename('')
    setEditingCourseId('')
  }

  const showallcourse = async () => {
    try {
      const res = await axios.get(`${APIROUTE}course/show-course`)
      setcourselist(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    showallcourse()
  }, [])

  function editcourse(id) {
    axios.get(`${APIROUTE}course/edit-course/${id}`)
      .then(res => {
        setcoursename(res.data.coursename)
        setcoursefee(res.data.coursefee)
        setEditingCourseId(id)
      })
      .catch(err => {
        console.error(err)
      })
  }
  function deletecourse(id) {
    axios.post(`${APIROUTE}course/delete-course/${id}`)
      .then(res => {
        showallcourse()
        toast.error(res.data.message)
        console.log(res.data.message)
      })
      .catch(err => {
        console.error(err)
      })
  }
  return (
    <>

      <div className="row container-fluid border">
        <div className="col-3 mt-2 border list-group">
          <Sidebar />
        </div>
        <div className="col-9 mt-2">
          <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">
            <div className='border m-auto w-75'>
              <form className='container' onSubmit={courseSubmit}>
                <p className='text-center h4'>Course Form</p>
                <div className='mb-3'>
                  <label>Course Name:&nbsp;</label>
                  <input type='text' placeholder='enter course name' className='form-control' onChange={(e) => setcoursename(e.target.value)} value={coursename} />
                </div>
                <div className='mb-3'>
                  <label>Course Fee:&nbsp;</label>
                  <input type='text' placeholder='enter course fee' className='form-control' onChange={(e) => setcoursefee(e.target.value)} value={coursefee} />
                </div>
                {editingCourseId ? (
                  <input type='submit' value='Update' className='m-2 btn btn-primary' />
                ) : (
                  <input type='submit' value='Add' className='m-2 btn btn-primary' />
                )}

              </form>
            </div>
            <hr />
            {courselist.length>0 ? (
              <>
                <p className='text-center h4'>List of courses</p>
                <table className='table table-bordered align-middle'>
                  <thead>
                    <tr className='text-center'>
                      <th>Sn</th>
                      <th>Course_Name</th>
                      <th>Course_Fee</th>
                      <th>Created_Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courselist && courselist.map((list, idx) => (
                      <tr key={list._id} className='text-center'>
                        <td>{idx + 1}</td>
                        <td>{list.coursename}</td>
                        <td>{list.coursefee}</td>
                        <td>{list.createdAt}</td>
                        <td>
                          <p className='btn btn-primary mx-2' onClick={() => editcourse(list._id)}>Edit</p>
                          <p className='btn btn-danger' onClick={() => deletecourse(list._id)}>Delete</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Addcourse