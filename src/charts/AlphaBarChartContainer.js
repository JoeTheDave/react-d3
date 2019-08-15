import React, { Component } from 'react';
import { ascending } from 'd3-array';
import AlphaBarChart from '../components/AlphaBarChart';

class AlphaBarChartContainer extends Component {
  state = {
    data: [],
    dataReady: false,
    sortAlpha: true,
  };

  initializeData() {
    const data = 'abcdefghijklmnopqrstuvwxyz'
      .split('')
      .reduce((accumulator, value) => {
        accumulator[value] = 0;
        return accumulator;
      }, {});
    this.setState({
      data,
      dataReady: true,
    });
  }
  onTextChange = (value) => {
    const data = this.state.data;
    Object.keys(data).forEach((key) => {
      data[key] = 0;
    });
    value
      .toLowerCase()
      .replace(/[^a-z]/g, '')
      .split('')
      .forEach((char) => {
        data[char]++;
      });
    this.setState({
      data,
    });
  };

  timer = null;

  clearTimer() {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  onTextChangeThrottled = (e) => {
    const value = e.target.value;
    this.clearTimer();
    this.timer = window.setTimeout(() => {
      this.onTextChange(value);
      this.clearTimer();
    }, 1000);
  };

  toggleSort = () => {
    this.setState((state) => ({
      sortAlpha: !state.sortAlpha,
    }));
  };

  componentDidMount() {
    this.initializeData();
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  render() {
    const data = Object.keys(this.state.data)
      .map((d) => ({
        letter: d,
        frequency: this.state.data[d],
      }))
      .sort(
        this.state.sortAlpha
          ? (a, b) => ascending(a.letter, b.letter)
          : (a, b) =>
              b.frequency - a.frequency || ascending(a.letter, b.letter),
      )
      .slice(0);

    return this.state.dataReady ? (
      <div>
        <AlphaBarChart data={data} />
        <div>
          <textarea rows="6" cols="100" onChange={this.onTextChangeThrottled} />
        </div>
        <button onClick={this.toggleSort}>
          {`Sort ${this.state.sortAlpha ? 'Value' : 'Alpha'}`}
        </button>
      </div>
    ) : null;
  }
}

export default AlphaBarChartContainer;
