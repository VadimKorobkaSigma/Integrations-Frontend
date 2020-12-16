import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';

import Router from './Router';
import ErrorAlert from '@components/ErrorAlert';

import './assets/normalize.scss';
import './assets/fonts/font.scss';

const alertOptions = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_RIGHT,
    timeout: 25000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.FADE,
};

const App = React.memo(() => (
    <AlertProvider template={ErrorAlert} {...alertOptions}>
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    </AlertProvider>
));

ReactDOM.render(<App />, document.getElementById('react'));
