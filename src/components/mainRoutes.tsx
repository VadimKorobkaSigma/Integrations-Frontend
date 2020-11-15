import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom/esm/react-router-dom";
import ScmsView from "../views/scmsView";
import AuthorizationPageRedirector from "../views/authorizationPageRedirector";
import Organizations from "../views/organizationsView";
import Repositories from "../views/repositoriesView";
import * as React from "react";
import {RouteComponentProps} from "react-router-dom";
import OrgSettingsView from '../views/orgSettingsView';

export default function MainRoutes() {
    return <BrowserRouter>
        <Switch>
            <Route exact path={"/"}><Redirect to={"/scm"}/></Route>
            <Route exact path={"/scm"}><ScmsView/></Route>

            <Route exact path={"/scm/:scmId/authorize"} component={AuthorizationPageRedirector}/>

            <Route exact path={"/scm/:scmId/organizations"} component={Organizations}/>

            <Route exact path={"/scm/:scmId/organizations/:orgId/repos"} component={Repositories}/>
            <Route exact path={"/scm/:scmId/organizations/:orgId/settings"} component={OrgSettingsView}/>
        </Switch>
    </BrowserRouter>;
}

export type PropsWithScmId = RouteComponentProps<{ scmId: string }>;
