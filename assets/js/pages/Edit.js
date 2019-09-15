import React, { useEffect, useState } from "react";
import axios from 'axios'
import {Redirect} from 'react-router'

const Edit = (props) => {
  const [data, setData] = useState({
    amount: "",
    email: "",
    phone_number: "",
    name: "",
    status: "",
    interest_rate: 0
  });

  const [redirect, setRedirect] = useState(false)

  const { amount, email, phone_number, name, status, interest_rate } = data;
  const handleSubmit = event => {
    event.preventDefault();

    axios
      .put(
        `/api/loans/${props.match.params.id}`,
        { loan: { amount, email, name, phone_number, status, interest_rate } },
        { headers: { "Content-type": "application/json" } }
      )
      .then(result => {
          console.log(result)
          setRedirect(true)
      });
  };

  const onChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };

  return redirect ? <Redirect to={"/review"}/> : (
    <div className="form">
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
          pattern="(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)"
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

        <input
          id="status"
          name="status"
          type="text"
          placeholder="Status"
          value={status}
          onChange={onChange}
          required
        />

        <input
          id="interest_rate"
          name="interest_rate"
          type="text"
          placeholder="Interest Rate"
          value={interest_rate}
          onChange={onChange}
          required
        />

        <button>Apply</button>
      </form>
    </div>
  );
};

export default Edit;
