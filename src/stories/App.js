/**
 * Created by johnny on 18/01/2017.
 */
import React, {Component} from 'react';
import Switch from './Switch';
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
                            <div className="middleArea">
                                <div>
                                    <h2 className="countBox">--</h2>
                                    <h3 className="subTitle">COUNT</h3>
                                </div>
                                <div>
                                    <button className="startBtn"></button>
                                    <h3 className="subTitle">START</h3>
                                </div>
                                <div>
                                    <div className="strictIndicator"></div>
                                    <button className="strictBtn"></button>
                                    <h3 className="subTitle">STRICT</h3>
                                </div>
                            </div>
                            <div className="switcher">
                                <Switch/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}