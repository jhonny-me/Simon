/**
 * Created by johnny on 18/01/2017.
 */
import React, {Component, PropTypes} from 'react';
require('../styles/Switch.css');

export default class Switch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: this.props.open
        }
    }

    static propTypes = {
        open: PropTypes.bool,
        statusChanged: PropTypes.func,
    }

    static defaultProps = {
        open: false
    }

    render() {
        return (
            <div>
                <i>OFF </i>
                <label className="switch">
                    <input type="checkbox"/>
                        <div className="slider"></div>
                </label>
                <i> ON</i>
            </div>
        );
    }
}