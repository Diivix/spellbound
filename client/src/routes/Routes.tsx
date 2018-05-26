import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Error404Page from "../components/Error404Page";
import Signin from "../containers/Signin";
import SpellCompendium from "../containers/SpellCompendium";
import AuthenticateRoute from "./AuthenticateRoute";
import { homePath, signinPath, spellcompendiumPath } from "./paths";
import RedirectIfAuthenticated from "./RedirectIfAuthenticated";

interface IRoutesProps {
  readonly isAuthenticated: boolean;
}

export default function Routes(props: IRoutesProps) {
  return (
    <Switch>
      {/* path: / */}
      <RedirectIfAuthenticated
        exact={true}
        path={homePath}
        component={Signin}
        redirectPath={spellcompendiumPath}
        isAuthenticated={props.isAuthenticated}
      />

      {/* Path: /spells */}
      <AuthenticateRoute
        authenticatePath={signinPath}
        path={spellcompendiumPath}
        component={SpellCompendium}
        isAuthenticated={props.isAuthenticated}
      />

      {/* Path: /signin */}
      <RedirectIfAuthenticated
        path={signinPath}
        component={Signin}
        redirectPath={spellcompendiumPath}
        isAuthenticated={props.isAuthenticated}
      />

      <Route component={Error404Page} />
    </Switch>
  );
}
