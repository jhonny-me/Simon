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
            1: audio1,
            2: audio2,
            3: audio3,
            4: audio4,
            song: '',
        };
        this.colorClass = {
            1: "hightGreen",
            2: "hightRed",
            3: "hightBlue",
            4: "hightYellow",
        };
        this.btnRef = {

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
        // generate random song
        var song = '';
        while(song.length < 20) {
            song += this.getRandomInt(1,4).toString();
        }
        this.contextProps.song = song;

        // start autoplay
        this.autoPlay(4)
    }

    autoPlay = (count) => {

        const that = this;
        const list = this.contextProps.song.slice(count).split('');

        let num = 0;
        const play = () => {
            const key = list[num];
            that.contextProps[key].play();
            that.btnRef[key].className += " " + that.colorClass[key];
            setTimeout(() => {
                const newClass = that.btnRef[key].className.replace(that.colorClass[key], '');
                that.btnRef[key].className = newClass;
            }, 500);
            setTimeout(() => {
                // ...
                if (num++ < count) {
                    play();
                }
            }, 1000);
        };

        play();
    }

    // Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    onMouseDown = (e)=> {
        if (this.state.off) { return }
        const key = e.target.id;
        console.log(key);
        this.contextProps[key].play();

        e.target.className += " " + this.colorClass[e.target.id];
        console.log(e.target.className)
    };

    onMouseUp = (e)=> {
        if (this.state.off) { return }
        console.log(e.target.className);
        const newClass = e.target.className.replace(this.colorClass[e.target.id], '');
        e.target.className = newClass;
    }

    render() {
        const {count, strict, off} = this.state;
        const indicatorColor = strict ? 'orange' : 'black';
        var countBox = off? '' : count === 0 ? '--' : ('0' + count.toString()).slice(-2)
        return (
            <div className="container">
                <div>
                    <a className="greenBtn" id="1" ref={(a)=>{this.btnRef[1] = a}} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}></a>
                    <a className="redBtn" id="2" ref={(a)=>{this.btnRef[2] =a}} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}></a>
                    <a className="blueBtn" id="3" ref={(a)=>{this.btnRef[3]=a}} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}></a>
                    <a className="yellowBtn" id="4" ref={(a)=>{this.btnRef[4]=a}} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}></a>
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