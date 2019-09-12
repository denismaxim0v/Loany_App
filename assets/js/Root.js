import * as React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import '../css/app.css'

import HomePage from "./pages/HomePage";
import NewApplication from "./pages/New_Application";
import Loan from "./pages/Loan";

const Root = () => {
  return (
    <BrowserRouter>
      <div className="nav-container">
        <nav className="navbar">
          <Link to={"/"} className="logo">
            LoanyApp
          </Link>
        </nav>
      </div>
      <Switch>
        <Route path="/review" component={HomePage} />
        <Route exact path="/" component={NewApplication} />
        <Route path="/new" component={NewApplication} />
        <Route path="/:id" component={(props) => <Loan {...props} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Root;
