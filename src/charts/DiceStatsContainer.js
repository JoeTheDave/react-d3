import React, { Component, Fragment } from 'react';
import DiceStats from '../components/DiceStats';
import DimensionContols from '../components/DimensionContols';

class DiceStatsContainer extends Component {
  defaultWidth = 960;
  defaultHeight = 500;
  state = {
    data: [
      { result: 2, frequency: 0, percentage: 0 },
      { result: 3, frequency: 0, percentage: 0 },
      { result: 4, frequency: 0, percentage: 0 },
      { result: 5, frequency: 0, percentage: 0 },
      { result: 6, frequency: 0, percentage: 0 },
      { result: 7, frequency: 0, percentage: 0 },
      { result: 8, frequency: 0, percentage: 0 },
      { result: 9, frequency: 0, percentage: 0 },
      { result: 10, frequency: 0, percentage: 0 },
      { result: 11, frequency: 0, percentage: 0 },
      { result: 12, frequency: 0, percentage: 0 },
    ],
    dataReady: false,
    width: this.defaultWidth,
    height: this.defaultHeight,
  };

  rollDie = () => Math.floor(Math.random() * 6) + 1;

  compileStatistics = () => {
    const state = this.state;
    const dieRolls = 10000000;
    for (let i = 0; i < dieRolls; i++) {
      const result = this.rollDie() + this.rollDie();
      state.data.find((d) => d.result === result).frequency++;
    }
    state.data.forEach((d) => {
      d.percentage = (d.frequency / dieRolls) * 100;
    });
    state.dataReady = true;
    this.setState(state);
  };

  componentDidMount() {
    this.compileStatistics();
  }

  setDimensionsHandler = (x, y) => {
    this.setState({
      width: x,
      height: y,
    });
  };

  render() {
    return this.state.dataReady ? (
      <Fragment>
        <DiceStats
          data={this.state.data}
          width={this.state.width}
          height={this.state.height}
        />
        <DimensionContols
          setDimensionsHandler={this.setDimensionsHandler}
          defaultWidth={this.defaultWidth}
          defaultHeight={this.defaultHeight}
        />
      </Fragment>
    ) : null;
  }
}

export default DiceStatsContainer;
