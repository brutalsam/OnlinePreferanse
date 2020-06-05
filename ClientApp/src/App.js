import React, { Component } from "react";
import { Route, Router } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Preferanse } from "./components/Preferanse";
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { ApplicationPaths } from "./components/api-authorization/ApiAuthorizationConstants";
import { GamesList } from "./components/Games";
import "./custom.css";
import history from './history';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Router history={history}>
        <Layout>
          <Route exact path="/" component={Home} />
          <AuthorizeRoute path="/gamesList" component={GamesList} />
          <AuthorizeRoute path="/table" component={Preferanse} />
          <Route
            path={ApplicationPaths.ApiAuthorizationPrefix}
            component={ApiAuthorizationRoutes}
          />
        </Layout>
      </Router>
    );
  }
}
