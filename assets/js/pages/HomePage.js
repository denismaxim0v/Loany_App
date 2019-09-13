import React, { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const [data, setData] = useState({ loans: [], isFetching: false });

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
    console.log(response);
  };

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
          </div>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
