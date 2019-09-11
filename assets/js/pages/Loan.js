import React, { useState, useEffect } from "react";
import axios from "axios";

const Loan = props => {
  console.log(props.match.params.id);
  const [data, setData] = useState({ loan: {}, isFetching: false });
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setData({ loan: data.loan, isFetching: true });
        const response = await axios.get(
          `http://localhost:4000/api/loans/${props.match.params.id}`
        );
        setData({ loan: response.data.loan, isFetching: false });
      } catch (e) {
        setData({ loan: data.loan, isFetching: false });
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>{props.match.params.id}</h1>
      <h1>{data.loan.name}</h1>
      <h1>{data.loan.status}</h1>
    </div>
  );
};

export default Loan;
