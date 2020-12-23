import Organizations from './layouts/Organizations';
import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Landing from './layouts/Landing';
import { parseQuery } from '@services/utils';

const ScmContext = React.createContext({
    authCode: '',
    integrationType: '',
});

const Router = () => {
    const [authCode, setAuthCode] = React.useState('');
    const [integrationType, setIntegrationType] = React.useState('');

    React.useEffect(() => {
        const { code, state } = parseQuery(location.search);

        if (!code || !state) {
            return;
        }

        localStorage.setItem('SCM_CODE', code);
        localStorage.setItem('SCM_TYPE', state);
        setAuthCode(code);
        setIntegrationType(state);
    }, []);

    return (
        <ScmContext.Provider value={{ authCode, integrationType }}>
            <Switch>
                {!authCode && <Redirect from="/scm" to="/" />}
                {authCode && <Redirect from="/login" to="/scm" />}
                <Route path="/" exact component={Landing} />
                <Route path="/scm" component={Organizations} />
                {authCode && <Redirect to="/scm" />}
            </Switch>
        </ScmContext.Provider>
    );
};

export default React.memo(Router);
