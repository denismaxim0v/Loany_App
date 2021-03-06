import React, { useState, useEffect } from "react";
import axios from "axios";
import {Redirect} from 'react-router'

const HomePage = () => {
  const [data, setData] = useState({ loans: [], isFetching: false });
  const [edit, setEdit] = useState({status: false, id: ''})

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setData({ loans: data.loans, isFetching: true });
        const response = await axios.get("http://localhost:4000/api/loans");
        setData({ loans: response.data.loans, isFetching: false });
      } catch (e) {
        setData({ loans: data.loans, isFetching: false });
      }
    };
    fetchUsers();
  }, []);

  const handle_delete = async id => {
    const response = await axios.delete(
      `http://localhost:4000/api/loans/${id}`
    );
    setData({loans: data.loans.filter(el => el.id != id), isFetching: true})
  };

  const handle_edit = (id) => {
    console.log(id)
    setEdit({status: true, id: id})
  }

  return (
    <div className='container-page'>
      <ul className="loans">
        {data.loans.map(item => (
          <div className="item" key={item.id}> 
            <li><h3>Name</h3>{item.name}</li>
            <li><h3>Email</h3>{item.email}</li>
            <li><h3>Phone</h3>{item.phone_number}</li>
            <li><h3>Amount</h3>{item.amount} BGN</li>
            <li><h3>interest_rate</h3>{item.interest_rate ? item.interest_rate : 'rejected'}</li>
            <li><h3>Status</h3>{item.status ? 'accepted' : 'rejected'}</li>
            <button className='danger' onClick={() => handle_delete(item.id)}>Delete</button>
            <button className='edit' onClick={() => handle_edit(item.id)}>Edit</button>
          </div>
        ))}
        {edit.status && <Redirect to={`${edit.id}/edit`}/>}
      </ul>
    </div>
  );
};

export default HomePage;
