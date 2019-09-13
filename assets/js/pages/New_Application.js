import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import axios from "axios";

const New_Application = () => {
  const [data, setData] = useState({
    amount: "",
    email: "",
    phone_number: "",
    name: ""
  });
  const [loan, setLoan] = useState({ id: 0, loan: "" });
  const [redirect, setRedirect] = useState(false);

  const { amount, email, phone_number, name } = data;
  console.log(data);
  const handleSubmit = event => {
    event.preventDefault();

    axios
      .post(
        "/api/loans",
        { loan: { amount, email, name, phone_number } },
        { headers: { "Content-type": "application/json" } }
      )
      .then(result => {
        setLoan({
          id: result.data.id,
          status: result.data.loan ? "accepted" : "rejected"
        });
        setRedirect(true);
      });
  };

  const onChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };

  const handleInvalid = e => {
    e.target.setCustomValidity("Please match it")
  }
  return redirect ? (
    <Redirect to={`/${loan.id}`} />
  ) : (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <input
          id="name"
          name="name"
          placeholder="Name"
          type="text"
          value={name}
          onChange={onChange}
          required
        />

        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
        />

        <input
          id="phone_number"
          name="phone_number"
          placeholder="Phone Number, format: +333333333333"
          type="tel"
          pattern='(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)'
          value={phone_number}
          onChange={onChange}
          required
        />

        <input
          id="amount"
          name="amount"
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={onChange}
          required
        />

        <button>Apply</button>
      </form>
    </div>
  );
};

export default New_Application;
