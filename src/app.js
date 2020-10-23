'use strict';

const ReactDOM = require("react-dom");
const React = require("react");
const QueryString = require("query-string");

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
            <div><a href={`https://github.com/login/oauth/authorize?${query}`}>Sign in with Github</a></div>
        );
    }
}

const domContainer = document.getElementById('react');
ReactDOM.render(React.createElement(MainPageButton), domContainer);