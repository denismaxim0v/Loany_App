import * as React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import HomePage from "./pages/HomePage";
import NewApplication from "./pages/New_Application";
import Accepted from "./pages/Accepted";
import Rejected from "./pages/Rejected";
import Loan from "./pages/Loan";

const Root = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to={"/"} className="navbar-brand">
            React CRUD Example
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
                  New Applicatoin
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/loan"} className="nav-link">
                  Index
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
        <Route path="/:id/rejected" component={Rejected} />
        <Route path="/:id/accepted" component={Accepted} />
      </Switch>
    </BrowserRouter>
  );
};

export default Root;
