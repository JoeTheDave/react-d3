import { create } from 'jss';

import cache from 'jss-cache';
import nested from 'jss-nested';
import compose from 'jss-compose';
import camelCase from 'jss-camel-case';
import defaultUnit from 'jss-default-unit';
import expand from 'jss-expand';
import vendorPrefixer from 'jss-vendor-prefixer';
import propsSort from 'jss-props-sort';

// This list is not exaustive, it's just our local overrides.
// More can be found here:
// https://github.com/cssinjs/jss-default-unit/blob/master/src/defaultUnits.js
const defaultUnitOverrides = {
  'animation-delay': '',
  'animation-duration': '',
  'perspective-origin-x': '',
  'perspective-origin-y': '',
  'transform-origin': '',
  'transform-origin-x': '',
  'transform-origin-y': '',
  'transform-origin-z': '',
  'transition-delay': '',
  'transition-duration': '',
  'line-height': 'px',
  'stroke-width': 'px',
  'stroke-miterlimit': '',
};

const isStorybook = process.env.NODE_ENV === 'storybook';

const plugins = [
  // Order matters!
  // https://github.com/cssinjs/jss/blob/master/docs/plugins.md#order-does-matter
  nested(),
  compose(),
  camelCase(),
  defaultUnit(defaultUnitOverrides),
  expand(),
  vendorPrefixer(),
  propsSort(),
];

if (!isStorybook) {
  plugins.unshift(cache());
}

const jssInstance = create({ plugins });

export default jssInstance;
