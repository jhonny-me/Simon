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
            error: false,
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
            song: [],
        };
        this.colorClass = {
            1: "hightGreen",
            2: "hightRed",
            3: "hightBlue",
            4: "hightYellow",
        };
        this.btnRef = {
        };
        this.control = {
            userInputCount: 0,
            autoPlaying: false,
            userNotInteract: true,
        }
    }

    componentWillUnmount() {
        this.reset()
    }

    onOffChange = () => {
        const {off} = this.state;
        // reset every thing
        if (!off) {
            this.reset()
        }
        this.setState({off: !off, strict: false});
    };

    reset = () => {
        this.control = {
            userInputCount: 0,
            autoPlaying: false,
            userNotInteract: true
        };
        this.setState({count: 0, error: false});
        var id = window.setTimeout(function() {}, 0);

        while (id--) {
            window.clearTimeout(id); // will do nothing if no timeout with id is present
        }
        // reset color
        for (var i=1;i<5;i++) {
            const newClass = this.btnRef[i].className.replace(this.colorClass[i], '');
            this.btnRef[i].className = newClass;
        }
    };

    errorAlert = (func)=>{
        console.log(this.state, this.control);
        this.control.autoPlaying = true;
        this.setState({error: true});
        const that = this;
        setTimeout(()=>{
            that.setState({error: false});
            that.control.autoPlaying = false;
            func()
        }, 1000)
    };

    onStrictChange = () => {
        const strict = this.state.strict;
        this.setState({strict: !strict});
    };

    onStart = () => {
        // generate random song
        this.reset()
        var song = [];
        while(song.length < 20) {
            song.push(this.getRandomInt(1,4).toString());
        }
        this.contextProps.song = song;
        this.control.userInputCount = 0;
        this.setState({count:0});
        var id = window.setTimeout(function() {}, 0);

        while (id--) {
            window.clearTimeout(id); // will do nothing if no timeout with id is present
        }
        // start autoplay
        this.autoPlay(1)
    }

    autoPlay = (count) => {
        if (this.state.off) { return }
        this.control.autoPlaying = true;
        const that = this;
        const list = this.contextProps.song;
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
                if (++num < count) {
                    play();
                }else {
                    that.control.autoPlaying = false;
                    that.control.userInputCount = 0;
                    that.control.userNotInteract = true;
                    setTimeout(()=>{
                        if (that.control.userNotInteract) {
                            // timeout case
                            that.errorAlert(()=>{
                                that.control.autoPlaying = true;
                                setTimeout(()=>{
                                    if (that.state.strict) {
                                        that.reset();
                                        that.onStart();
                                    }else {
                                        that.autoPlay(count);
                                    }
                                }, 1000)
                            })
                        }
                    }, 3000)
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
        if (this.state.off || this.control.autoPlaying) { return }
        if (this.control.userInputCount > this.state.count) {
            return
        }
        const key = e.target.id;
        console.log(key);
        this.contextProps[key].play();
        this.control.userNotInteract = false;
        e.target.className += " " + this.colorClass[e.target.id];

    };

    onMouseUp = (e)=> {
        const {off,count} = this.state;
        const userInputCount = this.control.userInputCount;
        const autoPlaying = this.control.autoPlaying;
        debugger
        if (off || autoPlaying) { return }
        if (userInputCount > count) { return }
        const newClass = e.target.className.replace(this.colorClass[e.target.id], '');
        e.target.className = newClass;
        // do the check
        console.log(e.target.id, this.contextProps.song[userInputCount])
        if (e.target.id != this.contextProps.song[userInputCount]) {
            //error
            const that = this;
            this.errorAlert(()=>{
                that.control.autoPlaying = true;
                if (that.state.strict) {
                    that.reset()
                    that.onStart()
                }else {
                    that.control.userInputCount = 0;
                    setTimeout(()=> {
                        that.autoPlay(count + 1);
                    }, 1000)
                }
            })
        }else {

            if (userInputCount === count) {
                if (count == 19) {
                    // win
                    alert('You Win!!!');
                    this.reset();
                    this.onStart();
                }
                this.setState({count: count + 1});
                this.control.userInputCount = 0;
                const that = this
                setTimeout(()=>{
                    that.autoPlay(count + 2)
                }, 1000)
            }else {
                this.control.userInputCount += 1;
            }
        }

    }

    render() {
        const {count, strict, off, error} = this.state;
        const indicatorColor = strict ? 'orange' : 'black';
        var countBox = off? '' : error? '!!' : count === 0 ? '--' : ('0' + count.toString()).slice(-2)
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