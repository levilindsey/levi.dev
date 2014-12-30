(function() {

  var PARAMS = {
    // -------------------------------------------------- //
    //               v   Play with me!!   v               //
    SPOKE_COUNT: 50,
    SPOKE_WIDTH: 15,

    MINOR_EASING_FUNCTION: 'easeInOutQuad',
    MAJOR_EASING_FUNCTION: 'easeInOutQuad',

    MAX_ANGLE_DELTA: Math.PI * 0.75,

    MIN_HUE: 0, // from 0 to 360
    MAX_HUE: 360,

    MIN_SATURATION: 0, // percentage
    MAX_SATURATION: 100,

    MIN_LIGHTNESS: 0, // percentage
    MAX_LIGHTNESS: 100,

    MIN_MINOR_TRANSITION_TIME: 1000, // milliseconds
    MAX_MINOR_TRANSITION_TIME: 3000,

    MIN_MAJOR_TRANSITION_TIME: 2000, // milliseconds
    MAX_MAJOR_TRANSITION_TIME: 5000,

    MIN_RADIUS: 20, // pixels
    MAX_RADIUS: 200,

    CIRCLE_COLOR_INNER: '#F1EEFF',
    CIRCLE_COLOR_OUTER: '#111',

    TOP_CIRCLE_RADIUS_RATIO: 0.1,
    SPOKE_END_ELLIPSE_LIGHTNESS_OFFSET: -8,

    BACKGROUND_COLOR: '#222222'
    // -------------------------------------------------- //
  };

  var SPOKE_HALF_WIDTH = PARAMS.SPOKE_WIDTH * 0.5,
      RAD_TO_DEG = 180 / Math.PI,
      SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

  var majorTransition, spokes;

  window.addEventListener('load', init, false);

  function init() {
    var body, svg, currentTime, i;

    spokes = [];
    currentTime = Date.now();

    createMajorTransition(currentTime);

    body = document.getElementsByTagName('body')[0];
    body.style.width = '100%';
    body.style.height = '100%';
    body.style.background = PARAMS.BACKGROUND_COLOR;

    svg = document.createElementNS(SVG_NAMESPACE, 'svg');
    svg.style.width = PARAMS.MAX_RADIUS * 2 + 'px';
    svg.style.height = PARAMS.MAX_RADIUS * 2 + 'px';
    body.appendChild(svg);

    createBottomCircle(svg);

    for (i = 0; i < PARAMS.SPOKE_COUNT; i++) {
      spokes[i] = createSpoke(currentTime);
      svg.appendChild(spokes[i].polygonElement);
      svg.appendChild(spokes[i].ellipseElement);
    }

    createTopCircle(svg);

    myRequestAnimationFrame(animationLoop);
  }

  function createBottomCircle(svg) {
    var circle, defs, radialGradient, stop1, stop2;

    defs = document.createElementNS(SVG_NAMESPACE, 'defs');
    svg.appendChild(defs);

    radialGradient = document.createElementNS(SVG_NAMESPACE, 'radialGradient');
    radialGradient.id = 'bottomGradient';
    radialGradient.setAttribute('cx', '50%');
    radialGradient.setAttribute('cy', '50%');
    radialGradient.setAttribute('r', '50%');
    radialGradient.setAttribute('fx', '50%');
    radialGradient.setAttribute('fy', '50%');
    defs.appendChild(radialGradient);

    stop1 = document.createElementNS(SVG_NAMESPACE, 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.style.stopColor = PARAMS.CIRCLE_COLOR_INNER;
    stop1.style.stopOpacity = '1';
    radialGradient.appendChild(stop1);

    stop2 = document.createElementNS(SVG_NAMESPACE, 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.style.stopColor = PARAMS.CIRCLE_COLOR_OUTER;
    stop2.style.stopOpacity = '1';
    radialGradient.appendChild(stop2);

    circle = document.createElementNS(SVG_NAMESPACE, 'circle');
    circle.setAttribute('cx', PARAMS.MAX_RADIUS);
    circle.setAttribute('cy', PARAMS.MAX_RADIUS);
    circle.setAttribute('r', PARAMS.MAX_RADIUS);
    circle.setAttribute('fill', 'url(#' + radialGradient.id + ')');
    svg.appendChild(circle);
  }

  function createTopCircle(svg) {
    var circle, defs, radialGradient, stop1, stop2, stop3, stop4, stop5;

    defs = document.createElementNS(SVG_NAMESPACE, 'defs');
    svg.appendChild(defs);

    radialGradient = document.createElementNS(SVG_NAMESPACE, 'radialGradient');
    radialGradient.id = 'topGradient';
    radialGradient.setAttribute('cx', '50%');
    radialGradient.setAttribute('cy', '50%');
    radialGradient.setAttribute('r', '50%');
    radialGradient.setAttribute('fx', '50%');
    radialGradient.setAttribute('fy', '50%');
    defs.appendChild(radialGradient);

    stop1 = document.createElementNS(SVG_NAMESPACE, 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.style.stopColor = PARAMS.CIRCLE_COLOR_INNER;
    stop1.style.stopOpacity = '1';
    radialGradient.appendChild(stop1);

    stop2 = document.createElementNS(SVG_NAMESPACE, 'stop');
    stop2.setAttribute('offset', '10%');
    stop2.style.stopColor = PARAMS.CIRCLE_COLOR_INNER;
    stop2.style.stopOpacity = '0.1';
    radialGradient.appendChild(stop2);

    stop3 = document.createElementNS(SVG_NAMESPACE, 'stop');
    stop3.setAttribute('offset', '50%');
    stop3.style.stopColor = PARAMS.CIRCLE_COLOR_INNER;
    stop3.style.stopOpacity = '0';
    radialGradient.appendChild(stop3);

    stop4 = document.createElementNS(SVG_NAMESPACE, 'stop');
    stop4.setAttribute('offset', '90%');
    stop4.style.stopColor = PARAMS.CIRCLE_COLOR_OUTER;
    stop4.style.stopOpacity = '0.05';
    radialGradient.appendChild(stop4);

    stop5 = document.createElementNS(SVG_NAMESPACE, 'stop');
    stop5.setAttribute('offset', '100%');
    stop5.style.stopColor = PARAMS.CIRCLE_COLOR_OUTER;
    stop5.style.stopOpacity = '0.4';
    radialGradient.appendChild(stop5);

    circle = document.createElementNS(SVG_NAMESPACE, 'circle');
    circle.setAttribute('cx', PARAMS.MAX_RADIUS);
    circle.setAttribute('cy', PARAMS.MAX_RADIUS);
    circle.setAttribute('r', PARAMS.MAX_RADIUS);
    circle.setAttribute('fill', 'url(#' + radialGradient.id + ')');
    svg.appendChild(circle);
  }

  function createMajorTransition(time) {
    var h1, h2, s1, s2, l1, l2;
    h1 = getRandom(PARAMS.MIN_HUE, PARAMS.MAX_HUE);
    h2 = getRandom(PARAMS.MIN_HUE, PARAMS.MAX_HUE);
    s1 = getRandom(PARAMS.MIN_SATURATION, PARAMS.MAX_SATURATION);
    s2 = getRandom(PARAMS.MIN_SATURATION, PARAMS.MAX_SATURATION);
    l1 = getRandom(PARAMS.MIN_LIGHTNESS, PARAMS.MAX_LIGHTNESS);
    l2 = getRandom(PARAMS.MIN_LIGHTNESS, PARAMS.MAX_LIGHTNESS);

    majorTransition = {
      hue: {
        startLowerThreshold: h1,
        startUpperThreshold: h2,
        endLowerThreshold: h1,
        endUpperThreshold: h2,
        currentLowerThreshold: h1,
        currentUpperThreshold: h2,
        startTime: time,
        endTime: time
      },
      saturation: {
        startLowerThreshold: s1,
        startUpperThreshold: s2,
        endLowerThreshold: s1,
        endUpperThreshold: s2,
        currentLowerThreshold: s1,
        currentUpperThreshold: s2,
        startTime: time,
        endTime: time
      },
      lightness: {
        startLowerThreshold: l1,
        startUpperThreshold: l2,
        endLowerThreshold: l1,
        endUpperThreshold: l2,
        currentLowerThreshold: l1,
        currentUpperThreshold: l2,
        startTime: time,
        endTime: time
      }
    };

    updateMajorTransition(time + 1);
  }

  function createSpoke(time) {
    var polygonElement, ellipseElement, angle, color, radius, spoke;

    polygonElement = document.createElementNS(SVG_NAMESPACE, 'polygon');
    ellipseElement = document.createElementNS(SVG_NAMESPACE, 'ellipse');
    angle = createNewAngle();
    color = createNewColor();
    radius = createNewRadius();

    spoke = {
      polygonElement: polygonElement,
      ellipseElement: ellipseElement,
      angle: {
        start: angle,
        end: angle,
        startTime: time,
        endTime: time
      },
      color: {
        start: color,
        end: color,
        startTime: time,
        endTime: time
      },
      radius: {
        start: radius,
        end: radius,
        startTime: time,
        endTime: time
      }
    };

    applyValues(spoke, angle, color, radius);

    // Bootstrap the animation
    createNewTransition(spoke, 'angle');
    createNewTransition(spoke, 'color');
    createNewTransition(spoke, 'radius');

    return spoke;
  }

  function animationLoop() {
    var currentTime = Date.now();

    updateMajorTransition(currentTime);

    spokes.forEach(function(spoke) {
      updateSpoke(spoke, currentTime);
    });

    myRequestAnimationFrame(animationLoop);
  }

  function updateSpoke(spoke, currentTime) {
    var angle, color, radius, duration, weight1, weight2;

    handleTransitionCompletion(spoke, 'angle', currentTime);
    handleTransitionCompletion(spoke, 'color', currentTime);
    handleTransitionCompletion(spoke, 'radius', currentTime);

    duration = spoke.angle.endTime - spoke.angle.startTime;
    weight2 = (currentTime - spoke.angle.startTime) / duration;
    weight2 = applyEasing(weight2, PARAMS.MINOR_EASING_FUNCTION);
    weight1 = 1 - weight2;
    angle = getWeightedAverage(spoke.angle.start, spoke.angle.end, weight1, weight2);

    duration = spoke.color.endTime - spoke.color.startTime;
    weight2 = (currentTime - spoke.color.startTime) / duration;
    weight2 = applyEasing(weight2, PARAMS.MINOR_EASING_FUNCTION);
    weight1 = 1 - weight2;
    color = interpolateColors(spoke.color.start, spoke.color.end, weight1, weight2);

    duration = spoke.radius.endTime - spoke.radius.startTime;
    weight2 = (currentTime - spoke.radius.startTime) / duration;
    weight2 = applyEasing(weight2, PARAMS.MINOR_EASING_FUNCTION);
    weight1 = 1 - weight2;
    radius = getWeightedAverage(spoke.radius.start, spoke.radius.end, weight1, weight2);

    applyValues(spoke, angle, color, radius);
  }

  function handleTransitionCompletion(spoke, property, currentTime) {
    if (spoke[property].endTime < currentTime) {
      createNewTransition(spoke, property);
    }
  }

  function createNewTransition(spoke, property) {
    spoke[property].startTime = spoke[property].endTime;
    spoke[property].endTime = spoke[property].endTime + createNewDuration();
    spoke[property].start = spoke[property].end;

    switch (property) {
      case 'angle':
        spoke[property].end = createNearbyAngle(spoke.angle.start);
        break;
      case 'color':
        spoke[property].end = createNewColor();
        break;
      case 'radius':
        spoke[property].end = createNewRadius();
        break;
      default:
        return;
    }
  }

  function applyValues(spoke, angle, color, radius) {
    applyCoordinates(spoke.polygonElement, spoke.ellipseElement, angle, radius);
    spoke.polygonElement.setAttribute('fill', colorToString(color));
    spoke.ellipseElement.setAttribute('fill', colorToString({
      h: color.h,
      s: color.s,
      l: color.l + PARAMS.SPOKE_END_ELLIPSE_LIGHTNESS_OFFSET
    }));
  }

  function applyCoordinates(polygonElement, ellipseElement, angle, radius) {
    var sinAngle, cosAngle, baseX, baseY, offsetX, offsetY, points, rx;

    sinAngle = Math.sin(angle);
    cosAngle = Math.cos(angle);
    baseX = PARAMS.MAX_RADIUS + radius * cosAngle;
    baseY = PARAMS.MAX_RADIUS + radius * sinAngle;
    offsetX = SPOKE_HALF_WIDTH * sinAngle;
    offsetY = SPOKE_HALF_WIDTH * cosAngle;
    rx = SPOKE_HALF_WIDTH * applyEasing((1 - radius / PARAMS.MAX_RADIUS), 'easeOutCubic');

    points = PARAMS.MAX_RADIUS + ',' + PARAMS.MAX_RADIUS +
      ' ' + (baseX + offsetX) + ',' + (baseY - offsetY) +
      ' ' + (baseX - offsetX) + ',' + (baseY + offsetY);
    polygonElement.setAttribute('points', points);

    ellipseElement.setAttribute('rx', rx);
    ellipseElement.setAttribute('ry', SPOKE_HALF_WIDTH);
    ellipseElement.setAttribute('transform',
      'translate(' + baseX + ' ' + baseY + ') ' +
        'rotate(' + angle * RAD_TO_DEG + ')');
  }

  function updateMajorTransition(currentTime) {
    var duration, weight1, weight2;

    handleMajorTransitionCompletion('hue', currentTime);
    handleMajorTransitionCompletion('saturation', currentTime);
    handleMajorTransitionCompletion('lightness', currentTime);

    duration = majorTransition.hue.endTime - majorTransition.hue.startTime;
    weight2 = (currentTime - majorTransition.hue.startTime) / duration;
    weight2 = applyEasing(weight2, PARAMS.MAJOR_EASING_FUNCTION);
    weight1 = 1 - weight2;
    majorTransition.hue.currentLowerThreshold = getWeightedAverage(
      majorTransition.hue.startLowerThreshold,
      majorTransition.hue.endLowerThreshold,
      weight1,
      weight2);
    majorTransition.hue.currentUpperThreshold = getWeightedAverage(
      majorTransition.hue.startUpperThreshold,
      majorTransition.hue.endUpperThreshold,
      weight1,
      weight2);

    duration = majorTransition.saturation.endTime - majorTransition.saturation.startTime;
    weight2 = (currentTime - majorTransition.saturation.startTime) / duration;
    weight2 = applyEasing(weight2, PARAMS.MAJOR_EASING_FUNCTION);
    weight1 = 1 - weight2;
    majorTransition.saturation.currentLowerThreshold = getWeightedAverage(
      majorTransition.saturation.startLowerThreshold,
      majorTransition.saturation.endLowerThreshold,
      weight1,
      weight2);
    majorTransition.saturation.currentUpperThreshold = getWeightedAverage(
      majorTransition.saturation.startUpperThreshold,
      majorTransition.saturation.endUpperThreshold,
      weight1,
      weight2);

    duration = majorTransition.lightness.endTime - majorTransition.lightness.startTime;
    weight2 = (currentTime - majorTransition.lightness.startTime) / duration;
    weight2 = applyEasing(weight2, PARAMS.MAJOR_EASING_FUNCTION);
    weight1 = 1 - weight2;
    majorTransition.lightness.currentLowerThreshold = getWeightedAverage(
      majorTransition.lightness.startLowerThreshold,
      majorTransition.lightness.endLowerThreshold,
      weight1,
      weight2);
    majorTransition.lightness.currentUpperThreshold = getWeightedAverage(
      majorTransition.lightness.startUpperThreshold,
      majorTransition.lightness.endUpperThreshold,
      weight1,
      weight2);
  }

  function handleMajorTransitionCompletion(property, currentTime) {
    var r1, r2;
    if (majorTransition[property].endTime < currentTime) {
      switch (property) {
        case 'hue':
          r1 = getRandom(PARAMS.MIN_HUE, PARAMS.MAX_HUE);
          r2 = getRandom(PARAMS.MIN_HUE, PARAMS.MAX_HUE);
          break;
        case 'saturation':
          r1 = getRandom(PARAMS.MIN_SATURATION, PARAMS.MAX_SATURATION);
          r2 = getRandom(PARAMS.MIN_SATURATION, PARAMS.MAX_SATURATION);
          break;
        case 'lightness':
          r1 = getRandom(PARAMS.MIN_LIGHTNESS, PARAMS.MAX_LIGHTNESS);
          r2 = getRandom(PARAMS.MIN_LIGHTNESS, PARAMS.MAX_LIGHTNESS);
          break;
        default:
          return;
      }

      majorTransition[property].startLowerThreshold = majorTransition[property].endLowerThreshold;
      majorTransition[property].startUpperThreshold = majorTransition[property].endUpperThreshold;
      if (r1 > r2) {
        majorTransition[property].endLowerThreshold = r2;
        majorTransition[property].endUpperThreshold = r1;
      } else {
        majorTransition[property].endLowerThreshold = r1;
        majorTransition[property].endUpperThreshold = r2;
      }
      majorTransition[property].startTime = majorTransition[property].endTime;
      majorTransition[property].endTime = majorTransition[property].endTime + getRandom(PARAMS.MIN_MAJOR_TRANSITION_TIME, PARAMS.MAX_MAJOR_TRANSITION_TIME);
    }
  }

  function createNewDuration() {
    return getRandom(PARAMS.MIN_MINOR_TRANSITION_TIME, PARAMS.MAX_MINOR_TRANSITION_TIME);
  }

  // The resulting angle will be within PI of the given angle
  function createNewAngle() {
    return getRandom(0, 2 * Math.PI);
  }

  // The resulting angle will be within PI of the given angle
  function createNearbyAngle(angle) {
    return getRandom(angle - PARAMS.MAX_ANGLE_DELTA, angle + PARAMS.MAX_ANGLE_DELTA);
  }

  function createNewColor() {
    return {
      h: getRandom(majorTransition.hue.currentLowerThreshold, majorTransition.hue.currentUpperThreshold),
      s: getRandom(majorTransition.saturation.currentLowerThreshold, majorTransition.saturation.currentUpperThreshold),
      l: getRandom(majorTransition.lightness.currentLowerThreshold, majorTransition.lightness.currentUpperThreshold)
    };
  }

  function createNewRadius() {
    return getRandom(PARAMS.MIN_RADIUS, PARAMS.MAX_RADIUS, 'easeOutQuad');
  }

  function interpolateColors(color1, color2, weight1, weight2) {
    return {
      h: getWeightedAverage(color1.h, color2.h, weight1, weight2),
      s: getWeightedAverage(color1.s, color2.s, weight1, weight2),
      l: getWeightedAverage(color1.l, color2.l, weight1, weight2)
    };
  }

  function getWeightedAverage(number1, number2, weight1, weight2) {
    return number1 * weight1 + number2 * weight2;
  }

  function colorToString(color) {
    return 'hsla(' + color.h + ',' + color.s + '%,' + color.l + '%, 1.0)';
  }

  function getRandom(min, max, easingFunction) {
    var r;
    if (typeof easingFunction != 'undefined') {
      r = applyEasing(Math.random(), easingFunction);
      return min + r * (max - min);
    } else {
      return min + Math.random() * (max - min);
    }
  }

  function applyEasing(t, easingFunction) {
    switch (easingFunction) {
      case 'linear': return t;
      case 'easeInQuad': return t * t;
      case 'easeOutQuad': return t * (2 - t);
      case 'easeInOutQuad': return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      case 'easeInCubic': return t * t * t;
      case 'easeOutCubic': return 1 + --t * t * t;
      case 'easeInOutCubic': return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      case 'easeInQuart': return t * t * t * t;
      case 'easeOutQuart': return 1 - --t * t * t * t;
      case 'easeInOutQuart': return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
      case 'easeInQuint': return t * t * t * t * t;
      case 'easeOutQuint': return 1 + --t * t * t * t * t;
      case 'easeInOutQuint': return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
      default: return t;
    }
  }

  var myRequestAnimationFrame =
    window.requestAnimationFrame || // the standard
      window.webkitRequestAnimationFrame || // chrome/safari
      window.mozRequestAnimationFrame || // firefox
      window.oRequestAnimationFrame || // opera
      window.msRequestAnimationFrame || // ie
      function(callback) { // default
        window.setTimeout(callback, 16); // 60fps
      };

})();
