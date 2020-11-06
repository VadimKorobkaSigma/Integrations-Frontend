import ReactDOM from "react-dom";
import * as React from "react";
import MainContext from './services/mainContext';
import {RootStore} from "./services/rootStore";
import './assets/main.css';
import MainRoutes from "./components/mainRoutes";

const rootStore = new RootStore()

function App() {
    return <MainContext.Provider value={rootStore}>
        <div className='defaultFont'>
            <h1>
                <span className='highlight'>Cx</span>Integrations
            </h1>
            <hr/>
            <MainRoutes/>
        </div>
    </MainContext.Provider>
}

const domContainer = document.getElementById('react');
ReactDOM.render(React.createElement(App), domContainer);
