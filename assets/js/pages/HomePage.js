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

  return (
    <div>
      <ul>
        {data.loans.map(item => (
          <div key={item.id}>
            <li>{item.name} {item.id}</li>
            <li>{item.phone_number}</li>
            <li>{item.amount}</li>
            <li>{item.status.toString()}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
