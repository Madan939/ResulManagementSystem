import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
const Sidebar = () => {
   const navigate=useNavigate()
    return (
        <>
            <div className='side container-fluid border'>
                <div className='sidebar '>    
                    <Link className='sidebar-link p-1' to="/admin/admin-homepage">
                    <i className="fa-solid fa-house p-1"></i>Home
                    </Link>
                </div>
                <div className='sidebar'>       
                    <Link className='sidebar-link p-1' to="/admin/add-student"><i className="fa-solid fa-user-plus p-1"></i>Add-Student</Link>
                </div>
                <div className='sidebar'>    
                    <Link className='sidebar-link p-1' to="/admin/add-result"><i className="fa-solid fa-plus p-1"></i>Add-Result</Link>
                </div>
                <div className='sidebar'>    
                    <Link className='sidebar-link p-1' to="/admin/add-notice"><i className="fa-solid fa-plus p-1"></i>Add-Notice</Link>
                </div>
                <div className='sidebar'>
                    <Link className='sidebar-link p-1' to="/admin/add-course"><i className="fa-solid fa-plus p-1"></i>Add-Course</Link>
                </div>
                <div className='sidebar'>                    
                    <Link className='sidebar-link p-1' to="/admin/add-subject"><i className="fa-solid fa-plus p-1"></i>Add-Subject</Link>
                </div>
                <div className='sidebar 'onClick={() => {
                    localStorage.removeItem('Admin')
                    navigate("/")
                    window.location.reload()
                   }}>            
                    <Link className='sidebar-link p-1'><i className="fa-solid fa-right-from-bracket p-1 " ></i>Log out</Link>
                </div>
            </div>
        </>
    )
}

export default Sidebar