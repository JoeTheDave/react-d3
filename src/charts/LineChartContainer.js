import React, { Component } from 'react';
import { Range } from 'rc-slider';
import { take } from 'lodash';
import 'rc-slider/assets/index.css';
import LineChart from '../components/LineChart';

const dataPoints = 1000;
const width = 800;
const height = 450;

class LineChartContainer extends Component {
  state = {
    data: [],
    dataReady: false,
    range: [0, dataPoints - 1],
    prevRange: [0, dataPoints - 1],
    dataBoundaries: [0, dataPoints - 1],
  };

  initializeData() {
    const data = [];
    let y = 100;
    for (let x = 0; x < dataPoints; x++) {
      data.push({ x, y });
      y += Math.floor(Math.random() * 11) - 5;
    }
    this.setState({
      data,
      dataReady: true,
    });
  }

  onSliderChange = (range) => {
    this.setState((state) => ({
      dataBoundaries: range,
    }));
  };

  onChangeComplete = (range) => {
    this.setState((state) => ({
      dataBoundaries: range,
      prevRange: this.state.range,
      range,
    }));
  };

  getDataForRange(range) {
    const [lowRange, highRange] = range;
    return take(this.state.data, highRange + 1).splice(lowRange);
  }

  componentDidMount() {
    this.initializeData();
  }

  render() {
    const { dataReady, range, prevRange, data } = this.state;
    return dataReady ? (
      <div>
        <LineChart
          data={this.getDataForRange(range)}
          prevData={this.getDataForRange(prevRange)}
          width={width}
          height={height}
        />
        <div style={{ width: 500, margin: '50px auto' }}>
          <Range
            min={0}
            max={data.length - 1}
            defaultValue={[0, data.length - 1]}
            allowCross={false}
            pushable={true}
            onChange={this.onSliderChange}
            onAfterChange={this.onChangeComplete}
          />
        </div>
        <div style={{ width: 200, margin: '20px auto', textAlign: 'center' }}>
          {`${this.state.dataBoundaries[0] + 1} - ${this.state
            .dataBoundaries[1] + 1}`}
        </div>
      </div>
    ) : null;
  }
}

export default LineChartContainer;
