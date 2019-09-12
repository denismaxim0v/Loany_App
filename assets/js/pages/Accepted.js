import React from "react";

const Accepted = props => {
  return (
    <div className="container-page">
      <div className="loan">
        <h1>Your loan application has been reviewed and accepted!</h1>
        <ul>
          <li><h3>Name</h3>{props.state.loan.name}</li>
          <li><h3>Amount</h3>{props.state.loan.amount}</li>
          <li><h3>Email</h3>{props.state.loan.email}</li>
          <li><h3>Phone</h3>{props.state.loan.phone_number}</li>
          <li><h3>Interest Rate</h3>{props.state.loan.interest_rate}</li>
        </ul>
      </div>
    </div>
  );
};

export default Accepted;
