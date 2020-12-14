import Card from '@components/Card';
import Organizations from './layouts/Organizations';
import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Landing from './layouts/Landing';
import { RootState } from '@store/rootReducer';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
    authCode: state.auth.authCode,
});

type Props = ReturnType<typeof mapStateToProps>;

const Router: React.FC<Props> = ({ authCode }) => {
    console.log('Router.tsx ~ line 15 ~ authCode', authCode);
    return (
        <Switch>
            {!authCode && <Redirect from="/scm" to="/" />}
            {authCode && <Redirect from="/login" to="/scm" />}
            <Route path="/" exact component={Landing} />
            <Route path="/scm" component={Organizations} />
            <Redirect to="/scm" />
        </Switch>
    );
};

export default React.memo(connect(mapStateToProps)(Router));
