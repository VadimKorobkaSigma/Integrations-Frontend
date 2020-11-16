import ReactDOM from "react-dom";
import * as React from "react";
import MainContext from './services/mainContext';
import {RootStore} from "./stores/rootStore";
import './assets/main.scss';

import MainRoutes from "./components/mainRoutes";

const rootStore = new RootStore();

function App() {
    return <MainContext.Provider value={rootStore}>
        <h1>
            <span className='highlight'>Cx</span>Integrations
        </h1>
        <hr/>
        <MainRoutes/>
    </MainContext.Provider>
}

const domContainer = document.getElementById('react');
ReactDOM.render(React.createElement(App), domContainer);
