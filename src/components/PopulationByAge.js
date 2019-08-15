import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleOrdinal } from 'd3-scale';
import { arc, pie } from 'd3-shape';

// Not based on incoming props, so can be efficiently defined once up here.
const colorScale = scaleOrdinal().range([
  '#98abc5',
  '#8a89a6',
  '#7b6888',
  '#6b486b',
  '#a05d56',
  '#d0743c',
  '#ff8c00',
]);

// Not based on incoming props, so can be efficiently defined once up here.
const pieLayout = pie()
  .sort(null)
  .value((d) => d.population);

class PopulationByAge extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  };

  render() {
    const { data, width, height } = this.props;
    const radius = Math.min(width, height) / 2;

    const arcLayout = arc()
      .outerRadius(radius - 10)
      .innerRadius(10);

    return (
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2},${height / 2})`}>
          {pieLayout(data).map((d, i) => {
            console.log(d);
            return (
              <g className="arc" key={i}>
                <path
                  d={arcLayout(d)}
                  style={{ fill: colorScale(d.data.age) }}
                />
                <text
                  textAnchor={'middle'}
                  transform={`translate(${arcLayout.centroid(d).join(',')})`}
                  dy=".35em"
                >
                  {d.data.age}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    );
  }
}

export default PopulationByAge;
