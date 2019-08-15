import React from 'react';
import injectSheet from 'react-jss';
import reactLogo from './logo.svg';
import d3Logo from './d3.png';
import PopulationByAgeContainer from './charts/PopulationByAgeContainer'; // eslint-disable-line no-unused-vars
import DiceStatsContainer from './charts/DiceStatsContainer'; // eslint-disable-line no-unused-vars
import AlphaBarChartContainer from './charts/AlphaBarChartContainer'; // eslint-disable-line no-unused-vars
import LineChartContainer from './charts/LineChartContainer'; // eslint-disable-line no-unused-vars

const styles = {
  '@keyframes react-logo-spin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
  app: {
    textAlign: 'center',
  },
  appHeader: {
    backgroundColor: '#222',
    height: 150,
    padding: 20,
    color: 'white',
  },
  logo: {
    width: 100,
    height: 100,
    margin: [0, 'auto'],
    position: 'relative',
  },
  d3Logo: {
    position: 'absolute',
    top: 0,
    left: -20,
    height: 100,
  },
  reactLogo: {
    animation: 'react-logo-spin infinite 20s linear',
    position: 'absolute',
    top: -20,
    left: 10,
    height: 90,
  },
  content: {
    paddingTop: 20,
  },
};

const App = ({ classes }) => {
  return (
    <div className={classes.app}>
      <header className={classes.appHeader}>
        <div className={classes.logo}>
          <img src={d3Logo} className={classes.d3Logo} alt="logo" />
          <img src={reactLogo} className={classes.reactLogo} alt="logo" />
        </div>
        <h1 className="App-title">D3 with React</h1>
      </header>
      <div className={classes.content}>
        <div style={{ margin: 50 }}>
          <AlphaBarChartContainer />
        </div>
      </div>
    </div>
  );
};

export default injectSheet(styles)(App);
