import React, { useState, useEffect } from "react";
import axios from "axios";
import Accepted from './Accepted'
import Rejected from './Rejected'

const Loan = props => {

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
      {data.loan.status ? <Accepted state={data}/> : <Rejected state={data} />}
    </div>
  );
};

export default Loan;
