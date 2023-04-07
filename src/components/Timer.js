import React from 'react';

export default class Timer extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className="time">
        <h1>
          {this.props.minutes === 0
            ? '00'
            : this.props.minutes < 10
            ? '0' + this.props.minutes
            : this.props.minutes}
          :
          {this.props.seconds === 0
            ? '00'
            : this.props.seconds < 10
            ? '0' + this.props.seconds
            : this.props.seconds}
        </h1>
      </div>
    );
  }
}
