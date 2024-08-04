import React from 'react'
import { Link} from 'react-router-dom'
const Sidebar = () => {
   function logout(){
    alert("Are you sure you want to log out?")
    localStorage.removeItem('Admin')
    window.location.reload()
   }
    return (
        <>
            <div className='side container-fluid '>
            <div className='d-flex mt-2 justify-content-center  w-100 '>
                    <p className='h4 mx-2'><i className="grad text-dark fa-solid fa-user-tie fa-lg"></i></p>
                    <p className='h4'>ADMIN</p>
                </div>
                <div className='sidebar '>    
                    <Link className='sidebar-link p-1' to="/">
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
                <div className='sidebar'>                    
                    <Link className='sidebar-link p-1' to="/access"><i className="fa-solid fa-plus p-1"></i>Access</Link>
                </div>
                <div className='sidebar 'onClick={logout}>            
                    <Link className='sidebar-link p-1'><i className="fa-solid fa-right-from-bracket p-1 " ></i>Log out</Link>
                </div>
            </div>
        </>
    )
}

export default Sidebar