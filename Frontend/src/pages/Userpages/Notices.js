import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { APIROUTE } from '../../components/Commonroute'

const Notices = () => {
  const [getnotice, setnotice] = useState([])
  const navigate = useNavigate()
  const getAllNotice = async () => {
    try {
      const res = await axios.get(`${APIROUTE}notice/show-notice`)
      setnotice(res.data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    // if (localStorage.getItem('Admin')) {
    //   navigate("/admin/admin-homepage")
    // }
    getAllNotice()
  },[])

  return (
    <>
      <div className='container-fluid'>
        <p className='h1 text-primary text-center'>Coming soon... </p>
        {/* <p className='m-3 text-center'>Notices</p>
        {getnotice && getnotice.length > 0 ? (
          <>
            {getnotice && getnotice.map((list) => (
              <div key={list._id} className='container border my-3 w-50 m-auto'>
                <p className='text-center m-1 h5' >College/Institute Name</p>
                <br />
                <p className='h6 text-center'>Notice</p><br />
                <p>{list.createdAt}</p>
                <br />
                <p className='text-center h6'>Attention Please!</p>
                <br />
                <p className='card'>{list.notice}</p>
                <br /><br />
                <p>{list.issuername}</p>
                <p>{list.post}</p>
                <br />
                <br />

              </div>
            ))}
          </>

        ) : (
          <p className='text-center h1'>Nothing to show</p>
        )} */}
      </div>
    </>
  )
}

export default Notices