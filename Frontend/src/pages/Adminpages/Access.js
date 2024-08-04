import React, { useEffect, useState } from 'react'
import { APIROUTE } from '../../components/Commonroute';
import axios from 'axios';
import { toast } from 'react-toastify';

const Access = () => {
    const login = JSON.parse(localStorage.getItem("Admin"));
    const [customerlist, setCustomerlist] = useState([]);
    const [check, setCheck] = useState({});
    const getCustomerlist = async () => {
        await axios.get(`${APIROUTE}admin/getUser`)
          .then(res => {
            setCustomerlist(res.data);
          })
          .catch(err => {
            console.log(err);        
          });
      };
    
      useEffect(() => {
        // if (login.User.role === "user") {

        //   window.location.reload();
        // }
        getCustomerlist();
      }, []);
    
      const submit = async (e, _id) => {
        e.preventDefault();
        if (!check[_id]){
          alert("first confirm that you want to make this user admin")
          return;
        }
        alert("Are you sure,you want to give admin access to this user")
        const data = {
          admin_id: login.User._id,
          user_id: _id
        };
       // console.log(data);
        await axios.post(`${APIROUTE}admin/updateRole`, data)
          .then(res => {
            toast.success(res.data.message);
            localStorage.removeItem("Admin")
            window.location.reload()
          })
          .catch(err => {
            console.log(err);
          });
      };
    
      const handleCheckboxChange = (e, _id) => {
        setCheck(prevCheck => ({
          ...prevCheck,
          [_id]: e.target.checked
        }));
      };
    
    return (
        <>
            <div className=" container-fluid border">
                <div className=" mt-2">        
                    <table className='table table-bordered align-middle text-center'>
            <thead>
              <tr>
                <th>SN</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Make Admin</th>
              </tr>
            </thead>
            <tbody>
              {customerlist && customerlist.map((item, idx) => (
                <tr key={item._id}>
                  <td>{idx + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <form onSubmit={(e) => submit(e, item._id)}>
                      <input
                        type='checkbox'
                        className='mx-2'
                        onChange={(e) => handleCheckboxChange(e, item._id)}
                        checked={check[item._id] || false}
                      />
                      <input type='submit' className='btn btn-success mx-2' value='Submit' />
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
                    </div>
                </div>
            
        </>
    )
}

export default Access