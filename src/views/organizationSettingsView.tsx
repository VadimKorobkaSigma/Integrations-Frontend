import * as React from "react";
import {FormEvent} from "react";
import {RouteComponentProps} from "react-router-dom";
import domWrapper from "../services/domWrapper";

type PropType = RouteComponentProps<{
    scmId: string,
    orgId: string,
}>;

export default class extends React.Component<PropType> {
    state = {team: '', secret: ''}

    constructor(props: PropType) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        domWrapper.setWindowTitle('Organization properties');
    }

    handleSave(event: FormEvent) {
        event.preventDefault();
        console.log('handleSave', event);
    }

    handleChange(event) {
        const {name} = event.target;
        this.setState({[name]: event.target.value});
    }

    render() {
        return <form onSubmit={this.handleSave}>
            <div>
                <label>
                    Team
                    <input type="text" name="team" value={this.state.team} onChange={this.handleChange}/>
                </label>
            </div>
            <div>
                <label>
                    CxGo secret
                    <input type="text" name="secret" value={this.state.secret} onChange={this.handleChange}/>
                </label>
            </div>
            <button type="submit">Save</button>
        </form>;
    }
}