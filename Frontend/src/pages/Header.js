import React from 'react';
import { NavLink} from 'react-router-dom';
const Header = () => {
    const admin = JSON.parse(localStorage.getItem('Admin'))
   // console.log(admin)
    return (
        <header>
            {admin ? (
                <div className='container-fluid bg-body-secondary d-flex justify-content-between align-middle'>
                    <div className=''>
                        <div className='container-fluid m-1 '>Admin Panel</div>
                    </div>
                    <div className='d-flex align-middle'>
                        <div className='p-2'>
                            <NavLink to="/admin/admin-notice" className='nav-component text-dark text-decoration-none'>Notices</NavLink>
                        </div>
                        <div className='p-2'>
                            <NavLink to="/admin/show-result" className='nav-component text-dark text-decoration-none'>Results</NavLink>
                        </div>
                        <div className='p-2'>
                            <NavLink to="/admin/schoolarships-details" className='nav-component text-dark text-decoration-none'>Schoolarship-froms</NavLink>
                        </div>
                        <div className='p-2'>
                            <NavLink to="/admin/semesterlist" className='nav-component text-dark text-decoration-none'>Subjects</NavLink>
                        </div>
                        <div className='p-2'>
                            <NavLink to="/admin/studentlist" className='nav-component text-dark text-decoration-none'>Students</NavLink>
                        </div>
                    </div>
                  
                </div>

            ) : (
                <div className='container-fluid bg-body-secondary d-flex justify-content-between'>
                    <div className=''>
                        <div className='container-fluid m-1 align-middle'>User Panel</div>
                    </div>
                    <div className='d-flex'>
                    <div className='p-2'>
                            <NavLink to="/" className='nav-component text-dark text-decoration-none'>Results</NavLink>
                        </div>
                        <div className='p-2'>
                            <NavLink to="/notices" className='nav-component text-dark text-decoration-none'>Notices</NavLink>
                        </div>
                       
                        <div className='p-2'>
                            <NavLink to="/fac-sub" className='nav-component text-dark text-decoration-none'>Syllabus</NavLink>
                        </div>
                        <div className='p-2'>
                            <NavLink to="/schoolarships" className='nav-component text-dark text-decoration-none'>Registration Form</NavLink>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <p className='p-1'>Follow us on:</p>
                        <p className='p-1'><i className="fab fa-facebook-f" style={{ color: "#3B5998" }}></i></p>
                        <p className='p-1'><i className="fab fa-instagram" style={{ color: "purple" }}></i></p>
                        <p className='p-1'><i className="fab fa-tiktok"></i></p>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
