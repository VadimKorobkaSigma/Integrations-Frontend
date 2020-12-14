import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import store from '@store/index';
import { history } from '@store/rootReducer';

import Router from './Router';

import './assets/normalize.scss';
import './assets/fonts/font.scss';

const App = React.memo(() => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Router />
        </ConnectedRouter>
    </Provider>
));

ReactDOM.render(<App />, document.getElementById('react'));
