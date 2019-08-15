import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = {
  dimensionControls: {
    width: 165,
    margin: [30, 'auto'],
    border: 'solid 1px #EEE',
    padding: 20,
  },
  formInput: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: [0, 10, 10, 10],
    '&>label': {
      fontSize: 10,
    },
  },
  buttonRow: {
    paddingRight: 10,
    textAlign: 'right',
  },
};

class DimensionControls extends Component {
  static propTypes = {
    setDimensionsHandler: PropTypes.func.isRequired,
    defaultWidth: PropTypes.number.isRequired,
    defaultHeight: PropTypes.number.isRequired,
  };

  xDim = null;
  yDim = null;

  componentDidMount() {
    this.xDim.value = this.props.defaultWidth;
    this.yDim.value = this.props.defaultHeight;
  }

  onSetDimensions = () => {
    const regX = /^\d+$/;
    if (!regX.test(this.xDim.value) || !parseInt(this.xDim.value, 10)) {
      this.xDim.value = this.props.defaultWidth;
    }
    if (!regX.test(this.yDim.value) || !parseInt(this.yDim.value, 10)) {
      this.yDim.value = this.props.defaultHeight;
    }
    this.props.setDimensionsHandler(
      parseInt(this.xDim.value, 10),
      parseInt(this.yDim.value, 10),
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.dimensionControls}>
        <div className={classes.formInput}>
          <label>X</label>
          <input type="text" ref={(input) => (this.xDim = input)} />
        </div>
        <div className={classes.formInput}>
          <label>Y</label>
          <input type="text" ref={(input) => (this.yDim = input)} />
        </div>
        <div className={classes.buttonRow}>
          <button type="button" onClick={this.onSetDimensions}>
            Set Dimensions
          </button>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(DimensionControls);
