import UserDashboard from "containers/UserDashboard";
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Error404Page from "../components/Error404Page";
import Signin from "../containers/auth/Signin";
import SingleSpell from "../containers/spells/SingleSpell";
import SpellCompendium from "../containers/spells/SpellCompendium";
import AuthenticateRoute from "./AuthenticateRoute";
import RedirectIfAuthenticated from "./RedirectIfAuthenticated";

// Paths
const HOME_PATH = "/";
const USER_DASHBOARD_PATH = "/home";
const SIGNIN_PATH = "/signin";
const SPELLS_PATH = "/spells";
const SPELLS_SIGNLE_PATH = "/spells/:id";

interface IRoutesProps {
  readonly isAuthenticated: boolean;
}

export default function Routes(props: IRoutesProps) {
  return (
    <Switch>
      {/* path: / */}
      <RedirectIfAuthenticated
        exact={true}
        path={HOME_PATH}
        component={Signin}
        redirectPath={USER_DASHBOARD_PATH}
        isAuthenticated={props.isAuthenticated}
      />

       {/* Path: /signin */}
       <RedirectIfAuthenticated
        path={SIGNIN_PATH}
        component={Signin}
        redirectPath={USER_DASHBOARD_PATH}
        isAuthenticated={props.isAuthenticated}
      />

      {/* Path: /dashboard */}
      <AuthenticateRoute
        exact={true}
        authenticatePath={SIGNIN_PATH}
        path={USER_DASHBOARD_PATH}
        component={UserDashboard}
        isAuthenticated={props.isAuthenticated}
      />

      {/* Path: /spells */}
      <AuthenticateRoute
        exact={true}
        authenticatePath={SIGNIN_PATH}
        path={SPELLS_PATH}
        component={SpellCompendium}
        isAuthenticated={props.isAuthenticated}
      />

      {/* Path: /spell/:id */}
      <AuthenticateRoute
        authenticatePath={SIGNIN_PATH}
        path={SPELLS_SIGNLE_PATH}
        component={SingleSpell}
        isAuthenticated={props.isAuthenticated}
      />
      <Route component={Error404Page} />
    </Switch>
  );
}
