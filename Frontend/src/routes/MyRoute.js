import React from 'react'
import Notices from '../pages/Userpages/Notices'
import { Route,Routes,Navigate } from 'react-router-dom'
import Results from '../pages/Userpages/Results'
import Schoolarships from '../pages/Userpages/Schoolarships'
import Adminlogin from '../pages/Adminpages/Adminlogin'
import Adminregister from '../pages/Adminpages/Adminregister'
import Addcourse from '../pages/Adminpages/Addcourse'
import Addsubject from '../pages/Adminpages/Addsubject'
import Addstudent from '../pages/Adminpages/Addstudent'
import Schoolarshipdetails from '../pages/Adminpages/Schoolarshipdetails'
import Adminnotice from '../pages/Adminpages/Adminnotice'
import Addresult from '../pages/Adminpages/Addresult'
import Home from '../pages/Adminpages/Home'
import Semesterlist from '../pages/Adminpages/Semesterlist'
import Editsubject from '../pages/Adminpages/Editsubject'
import Addnotice from '../pages/Adminpages/Addnotice'
import Editnotice from '../pages/Adminpages/Editnotice'
import ShowStudent from '../pages/Adminpages/ShowStudent'
import ViewStudent from '../pages/Adminpages/ViewStudent'
import EditStudent from '../pages/Adminpages/EditStudent'
import Facsub from '../pages/Userpages/Facsub'
import Showresult from '../pages/Adminpages/Showresult'
import Viewresult from '../pages/Adminpages/Viewresult'
import EditResult from '../pages/Adminpages/EditResult'
const MyRoute = () => {

  return (
    <>
    <Routes>
        <Route path="/notices" element={<Notices/>}/>
        <Route path="/" element={<Results/>}/>
        <Route path="/schoolarships" element={<Schoolarships/>}/>
        <Route path="/adminlogin" element={<Adminlogin/>}/>
        <Route path="/adminsignup" element={<Adminregister/>}/>
        <Route path="/admin/admin-homepage" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/admin/add-course" element={<ProtectedRoute><Addcourse/></ProtectedRoute>}/>
        <Route path="/admin/add-subject" element={<ProtectedRoute><Addsubject/></ProtectedRoute>}/>
        <Route path="/admin/edit-subject/:_id" element={<ProtectedRoute><Editsubject/></ProtectedRoute>}/>
        <Route path="/admin/add-student" element={<ProtectedRoute><Addstudent/></ProtectedRoute>}/>
        <Route path="/admin/add-result" element={<ProtectedRoute><Addresult/></ProtectedRoute>}/>
        <Route path="/admin/edit-notice/:_id" element={<ProtectedRoute><Editnotice/></ProtectedRoute>}/>
        <Route path="/admin/add-notice" element={<ProtectedRoute><Addnotice/></ProtectedRoute>}/>
        <Route path="/admin/admin-notice" element={<ProtectedRoute><Adminnotice/></ProtectedRoute>}/>
        <Route path="/admin/semesterlist" element={<ProtectedRoute><Semesterlist/></ProtectedRoute>}/>
        <Route path="/admin/schoolarships-details" element={<ProtectedRoute><Schoolarshipdetails/></ProtectedRoute>}/>
        <Route path="/admin/studentlist" element={<ProtectedRoute><ShowStudent/></ProtectedRoute>}/>
        <Route path="/admin/view-student/:_id" element={<ProtectedRoute><ViewStudent/></ProtectedRoute>}/>
        <Route path="/admin/edit-student/:_id" element={<ProtectedRoute><EditStudent/></ProtectedRoute>}/>
        <Route path="/fac-sub" element={<Facsub/>}/>
        <Route path="/admin/show-result" element={<ProtectedRoute><Showresult/></ProtectedRoute>}/>
        <Route path="/admin/view-result/:_id" element={<ProtectedRoute><Viewresult/></ProtectedRoute>}/>
        <Route path="/admin/edit-result/:_id" element={<ProtectedRoute><EditResult/></ProtectedRoute>}/>
    </Routes>
    </>
  )
}

export default MyRoute
export function ProtectedRoute({ children }) {
  if (localStorage.getItem('Admin')) {
    return children
  }
  else {
    return <Navigate to="/" />
  }
}