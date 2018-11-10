import Character from "containers/characters/Character";
import CharacterCompendium from "containers/characters/CharacterCompendium";
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Error404Page from "../components/Error404Page";
import Signin from "../containers/auth/Signin";
import Spell from "../containers/spells/Spell";
import SpellCompendium from "../containers/spells/SpellCompendium";
import AuthenticateRoute from "./AuthenticateRoute";
import RedirectIfAuthenticated from "./RedirectIfAuthenticated";

// Paths
const ROOT_PATH = "/";
const SIGNIN_PATH = "/signin";
const HOME_PATH = "/home";
const CHARACTERS_PATH = "/characters";
const CHARACTERS_SINGLE_PATH = "/characters/:id";
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
        path={ROOT_PATH}
        component={Signin}
        redirectPath={HOME_PATH}
        isAuthenticated={props.isAuthenticated}
      />

       {/* Path: /signin */}
       <RedirectIfAuthenticated
        path={SIGNIN_PATH}
        component={Signin}
        redirectPath={HOME_PATH}
        isAuthenticated={props.isAuthenticated}
      />

      {/* Path: /home */}
      <AuthenticateRoute
        exact={true}
        authenticatePath={SIGNIN_PATH}
        path={HOME_PATH}
        component={SpellCompendium}
        isAuthenticated={props.isAuthenticated}
      />

      {/* Path: /characters */}
      <AuthenticateRoute
        exact={true}
        authenticatePath={SIGNIN_PATH}
        path={CHARACTERS_PATH}
        component={CharacterCompendium}
        isAuthenticated={props.isAuthenticated}
      />

      {/* Path: /characters/:id */}
      <AuthenticateRoute
        authenticatePath={SIGNIN_PATH}
        path={CHARACTERS_SINGLE_PATH}
        component={Character}
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
        component={Spell}
        isAuthenticated={props.isAuthenticated}
      />
      
      <Route component={Error404Page} />
    </Switch>
  );
}
