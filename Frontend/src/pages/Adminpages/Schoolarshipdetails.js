import React from 'react'
import Sidebar from '../../components/Sidebar'

const Schoolarshipdetails = () => {
  return (
    <>
        <div className="row container-fluid border">
                <div className="col-3 mt-2 border list-group">
                    <Sidebar/>
                </div>
                <div className="col-9 mt-2 ">
                    <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">
                       <p>schoolarships details</p>
                    </div>
                </div>
            </div>
    </>
  )
}

export default Schoolarshipdetails