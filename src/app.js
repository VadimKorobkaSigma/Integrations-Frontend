'use strict';

import ReactDOM from "react-dom";
import React from "react";
import QueryString from "query-string";

class MainPageButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {scmSelected: false};
    }

    render() {
        const query = QueryString.stringify({
            client_id: 'Iv1.9a90765be1851cbd',
            state: 'hello',
            scope: 'user'
        });
        return (
            <div>
                <a href={`https://github.com/login/oauth/authorize?${query}`}>Sign in with Github</a>
            </div>
        );
    }
}

const domContainer = document.getElementById('react');
ReactDOM.render(React.createElement(MainPageButton), domContainer);