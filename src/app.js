'use strict';

const ReactDOM = require("react-dom");

const React = require("react");

class MainPageButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {scmSelected: false};
    }

    render() {
        let result;
        if (this.state.scmSelected) {
            result = 'SCM selected.'
        } else {
            result = React.createElement(
                'button',
                {onClick: () => this.setState({scmSelected: true})},
                'Choose SCM'
            );
        }
        return result;
    }
}

const domContainer = document.getElementById('react');
ReactDOM.render(React.createElement(MainPageButton), domContainer);