import React from 'react';
import TimerComponent from './components/TimerComponent';

export default class App extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return <TimerComponent />;
  }
}
