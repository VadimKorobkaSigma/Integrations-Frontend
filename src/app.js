import ReactDOM from "react-dom";
import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import SourceControlManagers from "./views/sourceControlManagers";
import Organizations from './views/organizations';
import Repositories from './views/repositories';
import AuthorizationPageRedirector from './views/authorizationPageRedirector';
import MainContext from './services/mainContext';
import {RootStore} from "./services/rootStore";
import './assets/main.css';

const store = new RootStore()

class App extends React.Component {
    render() {
        return <MainContext.Provider value={store}>
            <div style={{fontSize: '150%', fontFamily: 'sans-serif'}}>
                <h1><span className='highlight'>Cx</span>Integrations</h1>
                <hr/>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={"/"}><Redirect to={'/scm'}/></Route>
                        <Route exact path={"/scm"}><SourceControlManagers/></Route>

                        <Route exact path={"/scm/:scmId/authorize"} component={AuthorizationPageRedirector}/>

                        <Route exact path={'/scm/:scmId/organizations'} component={Organizations}/>

                        <Route exact path={'/scm/:scmId/organizations/:orgName/repos'} component={Repositories}/>
                    </Switch>
                </BrowserRouter>
            </div>
        </MainContext.Provider>
    }
}

const domContainer = document.getElementById('react');
ReactDOM.render(React.createElement(App), domContainer);
