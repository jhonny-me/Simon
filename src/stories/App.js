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
                    <button className="greenBtn"></button>
                    <button className="redBtn"></button>
                    <button className="blueBtn"></button>
                    <button className="yellowBtn"></button>
                    <div className="centralControl">
                        <div>
                            <h2>Simon™️</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}