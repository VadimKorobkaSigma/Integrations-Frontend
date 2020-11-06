import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom/esm/react-router-dom";
import SourceControlManagers from "../views/sourceControlManagers";
import AuthorizationPageRedirector from "../views/authorizationPageRedirector";
import Organizations from "../views/organizations";
import Repositories from "../views/repositories";
import * as React from "react";

export default function MainRoutes() {
    return <BrowserRouter>
        <Switch>
            <Route exact path={"/"}><Redirect to={"/scm"}/></Route>
            <Route exact path={"/scm"}><SourceControlManagers/></Route>

            <Route exact path={"/scm/:scmId/authorize"} component={AuthorizationPageRedirector}/>

            <Route exact path={"/scm/:scmId/organizations"} component={Organizations}/>

            <Route exact path={"/scm/:scmId/organizations/:orgName/repos"} component={Repositories}/>
        </Switch>
    </BrowserRouter>;
}