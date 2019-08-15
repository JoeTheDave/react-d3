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
import { easeExpInOut } from 'd3-ease';
import { max, maxBy, range } from 'lodash';
import NodeGroup from 'react-move/NodeGroup';

const styles = {
  chartFrame: {
    border: 'solid 1px #EEE',
  },
  bar: {
    stroke: '#666',
    opacity: 1,
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.7,
    },
  },
};

const yScalePeriod = (maxDomain) => {
  if (maxDomain >= 1274) {
    return 200;
  }
  if (maxDomain >= 638) {
    return 100;
  }
  if (maxDomain >= 284) {
    return 50;
  }
  if (maxDomain >= 128) {
    return 20;
  }
  if (maxDomain >= 64) {
    return 10;
  }
  if (maxDomain >= 29) {
    return 5;
  }
  if (maxDomain >= 13) {
    return 2;
  }
  return 1;
};

const AlphaBarChart = ({ classes, data, width, height }) => {
  const modifiedWidth = width - 60;
  const modifiedHeight = height - 60;
  const highestFrequency = maxBy(data, (d) => d.frequency).frequency;
  const yDomain = max([Math.ceil(highestFrequency * 1.15), 10]);

  const xScale = scaleBand()
    .domain(data.map((d) => d.letter))
    .range([0, modifiedWidth])
    .padding(0.1);

  const yScale = scaleLinear()
    .domain([yDomain, 0])
    .range([0, modifiedHeight]);

  const colorScale = scaleLinear()
    .domain([0, highestFrequency])
    .range(['#CCC', '#0000FF']);

  console.log(data);
  return (
    <svg className={classes.chartFrame} width={width} height={height}>
      <g transform={'translate(50, 10)'}>
        {range(
          yScalePeriod(yDomain),
          yDomain + yScalePeriod(yDomain),
          yScalePeriod(yDomain),
        ).map((d) => (
          <line
            key={`guideline-${d}`}
            x1={0}
            y1={yScale(d) + 0.5}
            x2={modifiedWidth}
            y2={yScale(d) + 0.5}
            stroke={'#EEE'}
          />
        ))}

        <NodeGroup
          data={data}
          keyAccessor={(d) => d.letter}
          start={() => ({
            x: 0,
            y: modifiedHeight,
            height: 0,
            color: colorScale(0),
            frequency: 0,
            textOpacity: 0,
          })}
          enter={(d) => ({
            x: [xScale(d.letter)],
            y: [yScale(d.frequency)],
            height: [modifiedHeight - yScale(d.frequency)],
            color: [colorScale(d.frequency)],
            frequency: [d.frequency],
            textOpacity: [d.frequency > 0 ? 1 : 0],
            timing: { duration: 750, ease: easeExpInOut },
          })}
          update={(d, i) => {
            return {
              x: [xScale(d.letter)],
              y: [yScale(d.frequency)],
              height: [modifiedHeight - yScale(d.frequency)],
              color: [colorScale(d.frequency)],
              frequency: [d.frequency],
              textOpacity: [d.frequency > 0 ? 1 : 0],
              timing: { duration: 750, delay: i * 50, ease: easeExpInOut },
            };
          }}
          leave={() => ({
            x: [0],
            y: [modifiedHeight],
            height: [0],
            color: [colorScale(0)],
            frequency: [0],
            textOpacity: [0],
            timing: { duration: 750, ease: easeExpInOut },
          })}
        >
          {(nodes) => (
            <g>
              {nodes.map((node) => {
                if (node.data.letter === 'a') {
                  console.log(node.state.height);
                }
                return (
                  <g key={`data-item-${node.key}`}>
                    <text
                      textAnchor={'middle'}
                      fontSize={11}
                      opacity={node.state.textOpacity}
                      x={node.state.x + xScale.bandwidth() / 2}
                      y={node.state.y - 10}
                    >
                      {Math.round(node.state.frequency, 0)}
                    </text>
                    <rect
                      className={classes.bar}
                      fill={node.state.color}
                      x={node.state.x}
                      y={node.state.y}
                      width={xScale.bandwidth()}
                      height={node.state.height}
                    />
                  </g>
                );
              })}
            </g>
          )}
        </NodeGroup>

        <Axis {...axisPropsFromTickScale(yScale, 9)} style={{ orient: LEFT }} />
        <text
          textAnchor={'middle'}
          transform={`translate(-32, ${modifiedHeight / 2}) rotate(-90)`}
        >
          Frequency
        </text>
      </g>

      <g transform={`translate(50, ${modifiedHeight + 10})`}>
        <Axis
          {...axisPropsFromBandedScale(xScale, data.length)}
          style={{ orient: BOTTOM }}
        />
      </g>
    </svg>
  );
};

AlphaBarChart.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      letter: PropTypes.string.isRequired,
      frequency: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

AlphaBarChart.defaultProps = {
  width: 960,
  height: 500,
  data: [],
};

export default injectSheet(styles)(AlphaBarChart);
