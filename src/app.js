import ReactDOM from "react-dom";
import React from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import ScmSelector from "./components/scmSelector";
import OAuthCallbackHandler from "./components/oauthCallbackHandler";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Route path={"/callback"} component={OAuthCallbackHandler}/>
                <Route exact path={"/"} component={ScmSelector}/>
            </BrowserRouter>
        );
    }
}

const domContainer = document.getElementById('react');
ReactDOM.render(React.createElement(App), domContainer);