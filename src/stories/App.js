/**
 * Created by johnny on 18/01/2017.
 */
import React, {Component} from 'react';
require('../styles/App.css');

export default class App extends Component {

    render() {
        return (
            <div className="container">
                <div>
                    <i className="greenBtn"></i>
                    <i className="redBtn"></i>
                    <i className="blueBtn"></i>
                    <i className="yellowBtn"></i>
                    <div className="centralControl">
                        <h2 style={{textAlign: 'center'}}>Simon™️</h2>
                    </div>
                </div>
            </div>
        );
    }
}