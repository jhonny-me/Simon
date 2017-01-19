/**
 * Created by johnny on 18/01/2017.
 */
import React, {Component} from 'react';
import Switch from './Switch';
require('../styles/App.css');
const simon1 = require('../resources/simonSound1.mp3');
const simon2 = require('../resources/simonSound2.mp3');
const simon3 = require('../resources/simonSound3.mp3');
const simon4 = require('../resources/simonSound4.mp3');

export default class App extends Component {

    constructor() {
        super();
        this.state = {

        };
        // init common use audio
        const audio1 = new Audio(simon1);
        const audio2 = new Audio(simon2);
        const audio3 = new Audio(simon3);
        const audio4 = new Audio(simon4);
        this.contextProps = {
            greenBtn: audio1,
            redBtn: audio2,
            blueBtn: audio3,
            yellowBtn: audio4,
        };
    }


    playSound = (e)=> {
        const key = e.target.className;
        console.log(key);
        this.contextProps[key].play()
    };

    render() {
        return (
            <div className="container">
                <div>
                    <button className="greenBtn" onClick={this.playSound}></button>
                    {/*<audio id="greenAudio"  preload="auto" loop="true" src="https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"></audio>*/}
                    <button className="redBtn" onClick={this.playSound}></button>
                    <button className="blueBtn" onClick={this.playSound}></button>
                    <button className="yellowBtn" onClick={this.playSound}></button>
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