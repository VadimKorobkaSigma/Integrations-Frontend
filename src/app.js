import ReactDOM from "react-dom";
import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import SourceControlManagers from "./components/sourceControlManagers";
import OAuthCallbackHandler from "./components/oauthCallbackHandler";
import Organizations from './components/organizations';
import Repositories from './components/repositories';

function App() {
    return (
        <div style={{fontSize: '150%', fontFamily: 'sans-serif'}}>
            <h1>CxIntegrations</h1>
            <hr/>
            <BrowserRouter>
                <Switch>
                    <Route exact path={"/"}><Redirect to={'/scm'}/></Route>
                    <Route exact path={"/scm"}><SourceControlManagers/></Route>

                    <Route exact path={'/scm/:scmId/organizations'} component={Organizations} />

                    <Route exact path={'/scm/:scmId/organizations/:orgId/repos'} component={Repositories}/>

                    <Route exact path={"/callback"}><OAuthCallbackHandler/></Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

const domContainer = document.getElementById('react');
ReactDOM.render(React.createElement(App), domContainer);