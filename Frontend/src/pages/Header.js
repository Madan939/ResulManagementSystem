import React from 'react';
import { Link, NavLink} from 'react-router-dom';
const Header = () => {
    const login = JSON.parse(localStorage.getItem('Admin'));
    // console.log(admin)
    function logout(){
        alert("Are you sure you want to log out?")
        localStorage.removeItem("Admin")
        window.location.reload()
    }
    return (
        <header>
            {login ? (
                <>
                    {
                        login.User.role === "admin" ? (
                            <>
                                <div className='container-fluid bg-body-secondary d-flex justify-content-between align-middle'>
                                    <div className=''>
                                        <div className='container-fluid m-1 '>{login.User.name}</div>
                                    </div>
                                    <div className='d-flex align-middle'>
                                        <div className='p-2'>
                                            <NavLink to="/admin/admin-notice" className='nav-component text-dark text-decoration-none'>Notices</NavLink>
                                        </div>
                                        <div className='p-2'>
                                            <NavLink to="/admin/show-result" className='nav-component text-dark text-decoration-none'>Results</NavLink>
                                        </div>
                                        <div className='p-2'>
                                            <NavLink to="/admin/semesterlist" className='nav-component text-dark text-decoration-none'>Subjects</NavLink>
                                        </div>
                                        <div className='p-2'>
                                            <NavLink to="/admin/studentlist" className='nav-component text-dark text-decoration-none'>Students</NavLink>
                                        </div>
                                        <div className='p-2'>
                                            <NavLink to="/admin/schoolarships-details" className='nav-component text-dark text-decoration-none'>Schoolarship-froms</NavLink>
                                        </div>
                                    </div>

                                </div>

                            </>
                        ) : (
                            <header className='d-flex bg-primary p-3 align-items-center justify-content-between'>
                            <div className='d-flex  justify-content-center align-items-center'>
                                <p className='h2 mx-2'><i className="grad fa-solid  fa-graduation-cap fa-lg text-light"></i></p>
                                <p className='h2 text-light'>EDS</p>
                            </div>
                            <div className='d-flex '>
                                <div className='h5 mx-2'><Link className='text-light text-decoration-none' to="/">Results</Link></div>
                                <div className='h5 mx-2'><Link className='text-light text-decoration-none' to="/fac-sub">Faculty</Link></div>
                                <div className='h5 mx-2'><Link className='text-light text-decoration-none' to="/notices">Notices</Link></div>
                                <div className='h5 mx-2'><Link className='text-light text-decoration-none' to="/schoolarships">Registration Form</Link></div>
                                <div className='h5 mx-2'><Link className='text-light text-decoration-none' to="/schoolarships">Schoolarships Form</Link></div>
                            </div>
                            <div className='header-nav2  text-light d-flex'>
                                    <button className="btn " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                        <i className="fa-solid fa-bars fa-xl text-light"></i>
                                    </button>
                                    <div className="offcanvas-1 offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                                        <div className="mt-2 d-flex justify-content-between">
                                            <p className='w-25'>
                                                <button type="button" className="btn btn-light" data-bs-dismiss="offcanvas" aria-label="Close">
                                                    <i class="fa-solid fa-arrow-left fa-lg text-secondary"></i>
                                                </button>
                                            </p>
                                            <p className='w-75 text-center h2 text-primary'>
                                                {login.User.name}
                                            </p>
                                        </div>
                                        <hr/>
                                        <div className="users-offcanvas">
                                        <div className='px-3'>Profile</div>
                                        <div className='px-3'>Account Centre</div>
                                        <div className='px-3'>Your Form</div>
                                        <div className='px-3'>Academic Information</div>
                                        <div className='px-3'>Reports</div>
                                        <div className='px-3'>Help</div>
                                        <div className='px-3'>Privacy Centre</div>
                                        <div className='px-3'>Account Status</div>
                                        <div className='px-3' onClick={logout}>Log Out</div>
                                        </div>
                                    </div>
                             
                            </div>
                        </header>
                        )
                    }
                </>
            ) : (
                <></>
            )}

        </header>
    );
};

export default Header;
