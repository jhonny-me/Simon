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
            off: true,
            strict: false,
            count: 0,

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

    onOffChange = () => {
        const {off} = this.state;
        // reset every thing
        if (!off) {
            this.reset()
        }else {
            this.setState({off: !off});
        }
    };

    reset = () => {
        this.setState({off: true, count: 0, strict: false});
    }

    onStrictChange = () => {
        const strict = this.state.strict;
        this.setState({strict: !strict});
    };

    onStart = () => {
        this.setState({count: 1});
    }

    playSound = (e)=> {
        const key = e.target.className;
        console.log(key);
        this.contextProps[key].play();
    };

    render() {
        const {count, strict, off} = this.state;
        const indicatorColor = strict ? 'orange' : 'black';
        var countBox = off? '' : count === 0 ? '--' : ('0' + count.toString()).slice(-2)
        return (
            <div className="container">
                <div>
                    <button className="greenBtn" disabled={this.state.off} onClick={this.playSound}></button>
                    {/*<audio id="greenAudio"  preload="auto" loop="true" src="https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"></audio>*/}
                    <button className="redBtn" disabled={this.state.off} onClick={this.playSound}></button>
                    <button className="blueBtn" disabled={this.state.off} onClick={this.playSound}></button>
                    <button className="yellowBtn" disabled={this.state.off} onClick={this.playSound}></button>
                    <div className="centralControl">
                        <div>
                            <h2>Simon™️</h2>
                            <div className="middleArea">
                                <div>
                                    <h2 className="countBox">{countBox}</h2>
                                    <h3 className="subTitle">COUNT</h3>
                                </div>
                                <div>
                                    <button className="startBtn" onClick={this.onStart} disabled={this.state.off}></button>
                                    <h3 className="subTitle">START</h3>
                                </div>
                                <div>
                                    <div className="strictIndicator" style={{backgroundColor:indicatorColor}}></div>
                                    <button className="strictBtn" disabled={this.state.off} onClick={this.onStrictChange}></button>
                                    <h3 className="subTitle">STRICT</h3>
                                </div>
                            </div>
                            <div className="switcher">
                                <Switch on={!this.state.off} statusChanged={this.onOffChange}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}