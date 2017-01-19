/**
 * Created by johnny on 18/01/2017.
 */
import React, {Component, PropTypes} from 'react';
require('../styles/Switch.css');

export default class Switch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            on: this.props.open
        }
    }

    static propTypes = {
        on: PropTypes.bool,
        statusChanged: PropTypes.func,
    }

    static defaultProps = {
        on: false
    }

    onClick = () => {
        const on = this.state.on;
        this.setState({on: !on});
        this.props.statusChanged(on);
    }

    render() {
        return (
            <div>
                <i>OFF </i>
                <label className="switch">
                    <input type="checkbox" onClick={this.onClick}/>
                        <div className="slider"></div>
                </label>
                <i> ON</i>
            </div>
        );
    }
}