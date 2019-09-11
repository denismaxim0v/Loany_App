import React, {useState} from "react";
import axios from 'axios'

const New_Application = () => {
    const [data, setData] = useState({amount: '', email: '', phone_number: '', name: ''})
    const { amount, email, phone_number, name } = data;
    console.log(data)
  const handleSubmit = event => {
    event.preventDefault()
    
    console.log(data)
    axios.post('/api/loans', { loan: {amount, email, name, phone_number} }, {headers: {"Content-type": "application/json"}})
          .then((result) => {
              console.log(result)
          });
  };

  const onChange = e => {
      setData({...data, [e.target.name]: e.target.value})
      console.log(e.target.name, e.target.value)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="amount">Enter Amount</label>
        <input id="amount" name="amount" type="text"  value={amount} onChange={onChange} />

        <label htmlFor="email">Enter your email</label>
        <input id="email" name="email" type="email"  value={email} onChange={onChange} />

        <label htmlFor="phone_number">Phone number</label>
        <input id="phone_number" name="phone_number" type="text"  value={phone_number} onChange={onChange}/>

        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text"  value={name} onChange={onChange}/>

        <button>Send data!</button>
      </form>
    </div>
  );
};

export default New_Application;
