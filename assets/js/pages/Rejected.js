import React, {useState, useEffect} from "react";
import {Redirect} from 'react-router'

const Rejected = () => {
    
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
      setTimeout(() => setRedirect(true), 3000)
  }, [])

  return (
      redirect ? <Redirect to={"/"} /> : 
    <div className="container-page">
      <div className="loan">
        <h1>Sorry to inform you that your application has been denied</h1>
        <h2>Please try again!</h2>
        <h4>You will be redirected shortly</h4>
      </div>
    </div>
  );
};

export default Rejected;
