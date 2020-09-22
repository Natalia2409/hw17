import React, {Component} from 'react';
import './timerPlay.css';

export default class TimerPlay extends Component {
    state = {
        timer: 10,
        autoplay: false,
        disabled: false,
        progress: 100
    }

    timer = () => {
        this.setState({
            timer: this.state.timer - 1,
            disabled: true
        });
        if (this.state.timer < 1) {
            clearInterval(this.timerId);
        } 
    }

    leftTime(value) {
        this.setState({
            progress: this.state.progress - value 
        })
    }

    componentDidMount() { 
        if (this.state.autoplay) {
            this.startTimer();
        }
    }

    startTimer = () => {
        this.timerId = setInterval(this.timer, 1000);
        this.left = setInterval(() => {
            this.leftTime(10)
        }, 1000)
    }

    stopTimer = () => {
        clearInterval(this.timerId);
        clearInterval(this.left);
        this.setState({
            disabled: false
        });
    }

    render() {
        const {timer, disabled} = this.state;
        return (
           <div>
                <div className="timer">{timer}</div>
                <div className="btns">
                    <button className="start" disabled={disabled} onClick={this.startTimer}>Start</button>
                    <button className="stop" disabled={!disabled} onClick={this.stopTimer}>Stop</button>
                </div>
                <div className="progress-loader" style={{ width: `${this.state.progress}%` }}></div>
           </div>
        )
    }
}