import React from 'react';
import injectSheet from 'react-jss';
import { scaleLinear } from 'd3-scale';
import { easeExpInOut } from 'd3-ease';
import { line } from 'd3-shape';
import { extent } from 'd3-array';
import Animate from 'react-move/Animate';
import { interpolate } from 'flubber';

const styles = {
  chartFrame: {
    border: 'solid 1px #EEE',
  },
};

const getDataPath = (data, width, height) => {
  const xDomain = extent(data, (d) => d.x);
  const xScale = scaleLinear()
    .range([0, width])
    .domain(xDomain);

  const yDomain = extent(data, (d) => d.y);
  const yDomainRange = Math.abs(yDomain[0] - yDomain[1]);
  yDomain[0] = Math.floor(yDomain[0] + yDomainRange * 1.1);
  yDomain[1] = Math.ceil(yDomain[1] - yDomainRange * 1.1);
  const yScale = scaleLinear()
    .range([height, 0])
    .domain(yDomain);

  const chartLine = line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y));

  return chartLine(data);
};

const LineChart = ({ classes, data, prevData, width, height }) => {
  const interpolator = interpolate(
    getDataPath(prevData, width, height),
    getDataPath(data, width, height),
  );

  return (
    <svg className={classes.chartFrame} width={width} height={height}>
      <Animate
        start={{
          opacity: 0,
          d: interpolator(0),
        }}
        enter={[
          {
            opacity: [0.7],
            timing: { duration: 1000 },
          },
        ]}
        update={{
          opacity: [0.7],
          d: interpolator,
          timing: { duration: 1000, ease: easeExpInOut },
        }}
      >
        {(state) => {
          return (
            <path
              fill={'none'}
              stroke={'steelblue'}
              strokeLinejoin={'round'}
              strokeLinecap={'round'}
              strokeWidth={1.5}
              {...state}
            />
          );
        }}
      </Animate>
    </svg>
  );
};

LineChart.propTypes = {};

LineChart.defaultProps = {};

export default injectSheet(styles)(LineChart);
