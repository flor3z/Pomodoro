import React from 'react';
import Timer from './Timer';

const DEFAULT_START_TIME = {
  focus: 25,
  seconds: 0,
  shortBreak: 5,
  longBreak: 15,
};

export default class TimerComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focus: DEFAULT_START_TIME.focus,
      seconds: DEFAULT_START_TIME.seconds,
      shortBreak: DEFAULT_START_TIME.shortBreak,
      longBreak: DEFAULT_START_TIME.longBreak,
      isPlaying: false,
      curActiveButton: 'focus',
    };
    this.onTimerToggle = this.onTimerToggle.bind(this);
    this.onClickReset = this.onClickReset.bind(this);
    this.onModeSelect = this.onModeSelect.bind(this);
  }

  onTimerToggle() {
    if (!this.state.isPlaying) {
      this.timer = setInterval(() => {
        if (this.state.seconds === 0 && this.state.focus === 0) {
          clearInterval(this.timer);
          this.setState({
            seconds: 0,
            focus: 0,
          });
        } else if (this.state.seconds <= 0) {
          this.setState((prevState) => ({
            seconds: 59,
            focus: prevState.focus - 1,
          }));
        } else {
          this.setState({
            seconds: this.state.seconds - 1,
          });
        }
      }, 1000);
    }
    this.setState({
      isPlaying: !this.state.isPlaying,
    });
    if (this.state.isPlaying) {
      console.log(this.state.isPlaying);
      clearInterval(this.timer);
    }
  }

  onClickReset(name) {
    if (name === this.state.curActiveButton) {
      this.setState({
        isPlaying: false,
        focus: DEFAULT_START_TIME[name],
        seconds: DEFAULT_START_TIME.seconds,
      });
    }

    clearInterval(this.timer);
  }

  onModeSelect(name) {
    if (name !== this.state.curActiveButton) {
      this.setState({
        curActiveButton: name,
        isPlaying: false,
        focus: DEFAULT_START_TIME[name],
        seconds: DEFAULT_START_TIME.seconds,
      });
    }

    clearInterval(this.timer);
  }

  render() {
    const playOrPause = this.state.isPlaying === false ? 'Play' : 'Pause';

    return (
      <div
        className={
          this.state.curActiveButton === 'focus'
            ? `${this.state.curActiveButton}-Bg`
            : this.state.curActiveButton === 'shortBreak'
            ? `${this.state.curActiveButton}-Bg`
            : 'longBreak-Bg'
        }
      >
        <div className="timer-container">
          <div className="background-image">
            <div className="all-controls-container">
              <div className="mode-button-container">
                <button
                  className={
                    this.state.curActiveButton === 'focus' ? 'active' : ''
                  }
                  name="focus"
                  onClick={(e) => this.onModeSelect(e.target.name)}
                >
                  Focus
                </button>
                <button
                  className={
                    this.state.curActiveButton === 'shortBreak' ? 'active' : ''
                  }
                  name="shortBreak"
                  onClick={(e) => this.onModeSelect(e.target.name)}
                >
                  Short Break
                </button>
                <button
                  className={
                    this.state.curActiveButton === 'longBreak' ? 'active' : ''
                  }
                  name="longBreak"
                  onClick={(e) => this.onModeSelect(e.target.name)}
                >
                  Long Break
                </button>
              </div>
              <Timer minutes={this.state.focus} seconds={this.state.seconds} />

              <div className="time-controls">
                <button className="btn" onClick={this.onTimerToggle}>
                  {playOrPause}
                </button>
                <button
                  className="btn"
                  onClick={() => this.onClickReset(this.state.curActiveButton)}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
