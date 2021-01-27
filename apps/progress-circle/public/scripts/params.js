/**
 * This module defines a collection of parameters used throughout this app.
 * @module params
 */
(function () {
  var params, moduleParams;

  params = {};

  params.baseDir = '/..';

  // --- General app parameters --- //

  moduleParams = {};
  params.APP = moduleParams;

  moduleParams.TITLE = 'Progress Circle';
  moduleParams.VERSION = '??.??.??';
  moduleParams.LICENSE =
      'The MIT License (MIT). Copyright (c) 2014 Levi Lindsey <levi@levi.dev>.';

  // --- Progress circle parameters --- //

  moduleParams = {};
  params.PROGRESS_CIRCLE = moduleParams;

  moduleParams.DIAMETER = 220;
  moduleParams.DOT_RADIUS = 10;

  moduleParams.CONTAINER_SIDE_LENGTH = moduleParams.DIAMETER;

  moduleParams.DOT_COUNT = 11;

  moduleParams.DOT_REVOLUTION_PERIOD = 4000; // milliseconds per revolution
  moduleParams.COLOR_REVOLUTION_PERIOD = params.PROGRESS_CIRCLE.DOT_REVOLUTION_PERIOD * 0.3; // milliseconds per revolution
  moduleParams.RADIUS_PULSE_PERIOD = 3000; // milliseconds per pulse
  moduleParams.BRIGHTNESS_PULSE_PERIOD = 3000; // milliseconds per pulse
  moduleParams.WIND_DOWN_PERIOD = 500; // milliseconds to end spinning

  moduleParams.WIND_DOWN_REVOLUTION_DEG = 500000 / params.PROGRESS_CIRCLE.DOT_REVOLUTION_PERIOD; // degrees
  moduleParams.RADIUS_PULSE_INNER_RADIUS_RATIO = 0.8;
  moduleParams.BRIGHTNESS_PULSE_INNER_LIGHTNESS = 90; // from 0 to 100
  moduleParams.BRIGHTNESS_PULSE_OUTER_LIGHTNESS = 30; // from 0 to 100
  moduleParams.BRIGHTNESS_PULSE_INNER_SATURATION = 20; // from 0 to 100
  moduleParams.BRIGHTNESS_PULSE_OUTER_SATURATION = 90; // from 0 to 100
  moduleParams.DOT_OPACITY = 1; // from 0 to 1

  moduleParams.RADIUS_PULSE_HALF_PERIOD = params.PROGRESS_CIRCLE.RADIUS_PULSE_PERIOD * 0.5; // milliseconds per half pulse
  moduleParams.BRIGHTNESS_PULSE_HALF_PERIOD = params.PROGRESS_CIRCLE.BRIGHTNESS_PULSE_PERIOD * 0.5; // milliseconds per half pulse

  moduleParams.OPEN_OPACITY_CHANGE_DURATION = 400; // milliseconds per half pulse

  // --- Log parameters --- //

  moduleParams = {};
  params.LOG = moduleParams;

  moduleParams.RECENT_ENTRIES_LIMIT = 80;
  moduleParams.DEBUG = true;
  moduleParams.VERBOSE = true;

  // --- Miscellaneous parameters --- //

  params.ADD_CSS_TRANSITION_DELAY = 80;
  params.SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
  params.TWO_PI = Math.PI * 2;
  params.HALF_PI = Math.PI * 0.5;
  params.SMALL_SCREEN_WIDTH_THRESHOLD = 900;
  params.SMALL_SCREEN_HEIGHT_THRESHOLD = 675;

  // --- Expose this module --- //

  if (!window.app) window.app = {};
  window.app.params = params;

  console.log('params module loaded');
})();
