import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import {
  Axis,
  axisPropsFromTickScale,
  axisPropsFromBandedScale,
  LEFT,
  BOTTOM,
} from 'react-d3-axis';
import { scaleLinear, scaleBand } from 'd3-scale';
import { maxBy, range, sumBy } from 'lodash';

const styles = {
  chartFrame: {
    border: 'solid 1px #EEE',
  },
  bar: {
    stroke: '#666',
    opacity: 0.5,
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.7,
    },
  },
};

const DiceStats = ({ classes, data, width, height }) => {
  const modifiedWidth = width - 60;
  const modifiedHeight = height - 60;
  const totalDiceRolls = sumBy(data, (d) => d.frequency);
  const highestPercentage = maxBy(data, (d) => d.percentage).percentage;

  const xScale = scaleBand()
    .domain(data.map((d) => d.result))
    .range([0, modifiedWidth])
    .padding(0.2);

  const yScale = scaleLinear()
    .domain([
      2 * Math.round((highestPercentage + 1) / 2), // Rounded up to the nearest multiple of 2
      0,
    ])
    .range([0, modifiedHeight]);

  const colorScale = scaleLinear()
    .domain([0, highestPercentage])
    .range(['red', 'green']);

  return (
    <svg className={classes.chartFrame} width={width} height={height}>
      <g transform={'translate(50, 10)'}>
        {range(2, 20, 2).map((d) => (
          <line
            key={`guideline-${d}`}
            x1={0}
            y1={yScale(d) + 0.5}
            x2={modifiedWidth}
            y2={yScale(d) + 0.5}
            stroke={'#EEE'}
          />
        ))}
        {data.map((d) => (
          <g key={`data-item-${d.result}`}>
            <text
              textAnchor={'middle'}
              fontSize={11}
              x={xScale(d.result) + xScale.bandwidth() / 2}
              y={yScale(d.percentage) + 20}
            >
              {Math.round(d.percentage * 10000) / 10000}%
            </text>
            <rect
              className={classes.bar}
              fill={colorScale(d.percentage)}
              x={xScale(d.result)}
              y={yScale(d.percentage)}
              width={xScale.bandwidth()}
              height={modifiedHeight - yScale(d.percentage)}
            />
          </g>
        ))}
        <Axis {...axisPropsFromTickScale(yScale, 9)} style={{ orient: LEFT }} />
        <text
          textAnchor={'middle'}
          transform={`translate(-28, ${modifiedHeight / 2}) rotate(-90)`}
        >
          Percentage
        </text>
        <text
          textAnchor={'middle'}
          transform={`translate(${modifiedWidth * 0.8}, ${modifiedHeight *
            0.1})`}
        >{`Results from ${totalDiceRolls
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} dice rolls`}</text>
      </g>

      <g transform={`translate(50, ${modifiedHeight + 10})`}>
        <Axis
          {...axisPropsFromBandedScale(xScale, data.length)}
          style={{ orient: BOTTOM }}
        />
        <text
          textAnchor={'middle'}
          transform={`translate(${modifiedWidth / 2}, 35)`}
        >
          Die Roll
        </text>
      </g>
    </svg>
  );
};

DiceStats.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      result: PropTypes.number.isRequired,
      frequency: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

DiceStats.defaultProps = {
  width: 960,
  height: 500,
  data: {
    results: [],
    total: 0,
  },
};

export default injectSheet(styles)(DiceStats);
