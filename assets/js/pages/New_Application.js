import React from "react";

const New_Application = () => {
  const handleSubmit = event => {
      event.preventDefault()
    const data = new FormData(event.target);
    console.log(data)
    fetch("http://localhost:4000/api/loans", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: data
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="amount">Enter Amount</label>
        <input id="amount" name="amount" type="text" />

        <label htmlFor="email">Enter your email</label>
        <input id="email" name="email" type="email" />

        <label htmlFor="phone_number">Phone number</label>
        <input id="phone_number" name="phone_number" type="text" />

        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" />

        <button>Send data!</button>
      </form>
    </div>
  );
};

export default New_Application;
