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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/new"} className="nav-link">
                  New Application
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/new" component={NewApplication} />
        <Route path="/:id" component={(props) => <Loan {...props} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Root;
