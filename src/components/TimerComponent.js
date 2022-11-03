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
    //isPlaying Logic may need to be swtiched
    this.onTimerToggle = this.onTimerToggle.bind(this);
    this.onClickReset = this.onClickReset.bind(this);
    this.onModeSelect = this.onModeSelect.bind(this);
  }

  onTimerToggle() {
    if (!this.state.isPlaying) {
      this.timer = setInterval(() => {
        if (this.state.seconds === 0 && this.state.focus === 0) {
          this.setState({
            seconds: 0,
            focus: 0,
          });
        } else if (this.state.seconds <= 0) {
          this.setState((prevState) => ({
            seconds: 59,
            focus: prevState.focus - 1,
          }));
          //this needs work the else if part -- Complete
        } else {
          this.setState({
            seconds: this.state.seconds - 1,
          });
        }
      }, 1000);

      // clearInterval(this.timer); did not need this afterall? I thought I would need to clear interval within inital If statement...
      // after testing, I realized i did not need too.
    }
    //Find a way to make this reset to 59 instead of going to the negative numbers

    //I want to make one BUTTON with both Pause and Play functionality...figured out the play part, not yet the pause...
    // UPDATE --- I THINK I FIGURED IT OUT!
    this.setState({
      isPlaying: !this.state.isPlaying,
    });
    if (this.state.isPlaying) {
      clearInterval(this.timer);
    }
  }

  onClickReset(name) {
    console.log(name);
    if (name === this.state.curActiveButton) {
      this.setState({
        isPlaying: false,
        focus: DEFAULT_START_TIME[name],
        seconds: DEFAULT_START_TIME.seconds,
      });
    } else {
      this.setState({
        isPlaying: false,
        focus: DEFAULT_START_TIME.focus,
        seconds: DEFAULT_START_TIME.seconds,
      });
    }

    //The reset needs to be updated now, considering I've had to make lots of changes, and now once reset is clicked
    //It resets to 25 mins, instead of the respective time required. (e.g 5 mins or 15 mins depending on the break)
    clearInterval(this.timer);
  }
  // need to figure out how to clear the interval...pause the countdown and keep it there
  //Update --- figured this out!
  //How do I know which mins and seconds to use, depending on name//
  onModeSelect(name) {
    // console.log('Ive been clicked', `${[name]}`);
    if (name !== this.state.curActiveButton) {
      this.setState({
        curActiveButton: name,
        isPlaying: false,
        focus: DEFAULT_START_TIME[`${name}`],
        // focus: this.state.curActiveButton === name ? `${name}` : '',
        seconds: DEFAULT_START_TIME.seconds, //This is not entirely correct, only dispalying 1 form of mins, must look here//
        // I believe I found the fix, I used a dynamic selector with a template string to pick the name of the button passed in.
        //Then I had to switch at the "minutes" to "focus" to match the button name dynamically.
        //Now getting a reset bug :/
      });
    }

    clearInterval(this.timer);
  }
  // You must delete other Components (short & long breaks, create one component and simply pass in the specified information)
  render() {
    const playOrPause = this.state.isPlaying === false ? 'Play' : 'Pause';
    // const activeClass = this.state.curActiveButton ? 'active' : '';
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
          <div className="mode-button-container">
            <button
              className={this.state.curActiveButton === 'focus' ? 'active' : ''}
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
          {/* <Timer data={this.state} /> */}
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
    );
  }
}
