(function() {

// ------------------------------------------------ //
// Params



// ------------------------------------------------ //
// Constants



// ------------------------------------------------ //

  var svg, svgPos, svgDefs, viewport, previousTime, running, recoverFromWindowBlur;

  window.addEventListener('load', init, false);

  function init() {
    setRandomParameterSet();

    var currentTime = Date.now();

    createMiscElements();
    addEventListeners();

    adjustBallCountForViewportSize();

    colorShifter.init(svgDefs, currentTime);
    ballHandler.init(svg, svgDefs, viewport, currentTime);
    touchAnimator.init(svg, svgDefs);

    // Start the animation loop
    running = true;
    recoverFromWindowBlur = false;
    previousTime = currentTime;
    util.myRequestAnimationFrame(animationLoop);

    handleInitialAutoTouches();
    handleRecurringAutoTouches();
  }

  function createMiscElements() {
    var body = document.getElementsByTagName('body')[0];
    body.style.width = '100%';
    body.style.height = '100%';
    body.style.margin = '0px';
    body.style.backgroundImage = PARAMS.COLOR.BACKGROUND_IMAGE;
    //body.style.background = '#222';

    svg = document.createElementNS(SVG_NAMESPACE, 'svg');
    svg.style.position = 'absolute';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.zIndex = '2147483647';
    body.appendChild(svg);

    svgDefs = document.createElementNS(SVG_NAMESPACE, 'defs');
    svg.appendChild(svgDefs);

    viewport = { width: 0, height: 0 };
    util.determineViewportDimensions(viewport);
  }

  function onWindowBlur() {
    console.log('onWindowBlur');
    running = false;
  }

  function onWindowFocus() {
    console.log('onWindowFocus');
    running = true;
    recoverFromWindowBlur = true;
    animationLoop();
  }

  function addEventListeners() {
    // Window events
    window.addEventListener('resize', function() {
      util.determineViewportDimensions(viewport);
    }, false);
    window.addEventListener('blur', onWindowBlur, false);
    window.addEventListener('focus', onWindowFocus, false);

    // Touch events
    svgPos = util.getPageXY(svg);
    svg.addEventListener('mousedown', function(e) {
      ballHandler.handleTouch({
        x: e.pageX + svgPos.x,
        y: e.pageY + svgPos.y
      });
    }, false);
    svg.addEventListener('touchstart', function(e) {
      ballHandler.handleTouch({
        x: e.changedTouches[0].pageX + svgPos.x,
        y: e.changedTouches[0].pageY + svgPos.y
      });
    }, false);
  }

  function handleInitialAutoTouches() {
    var index = 0;

    PARAMS.AUTO_TOUCHES.forEach(function(autoTouch) {
      setTimeout(handleNextAutoTouch, autoTouch.TIME);
    });

    function handleNextAutoTouch() {
      var autoTouch = PARAMS.AUTO_TOUCHES[index++];
      ballHandler.handleTouch({
        x: autoTouch.POS_RATIO.X * viewport.width,
        y: autoTouch.POS_RATIO.Y * viewport.height
      });
    }
  }

  function handleRecurringAutoTouches() {
    if (!isNaN(PARAMS.RECURRING_AUTO_TOUCH_PERIOD)) {
      setInterval(function () {
        ballHandler.handleTouch({
          x: Math.random() * viewport.width,
          y: Math.random() * viewport.height
        });
      }, PARAMS.RECURRING_AUTO_TOUCH_PERIOD);
    }
  }

  function animationLoop() {
    var currentTime, deltaTime;

    if (running) {
      currentTime = Date.now();
      deltaTime = currentTime - previousTime;

      if (recoverFromWindowBlur) {
        recoverFromWindowBlur = false;
        colorShifter.recoverFromWindowBlur(deltaTime);
        touchAnimator.recoverFromWindowBlur(deltaTime);
        ballHandler.recoverFromWindowBlur(deltaTime);
      } else {
        colorShifter.update(currentTime);
        touchAnimator.update(currentTime);
        ballHandler.update(currentTime, deltaTime);
      }

      previousTime = currentTime;
      util.myRequestAnimationFrame(animationLoop);
    }
  }

  function setRandomParameterSet() {
    var parameterOptions, selectedSetName;

    parameterOptions = [
        'BUBBLE',
//        'GRAVITY',
        'GROWTH',
//        'DEPENDENT',
//        'INDEPENDENT',
        'METABUBBLE',
//        'RESISTANCE',
        'SQUISH',
        'SWARM'
//        'TOUCH_OF_DEATH'
    ];

    selectedSetName = parameterOptions[parseInt(Math.random() * parameterOptions.length)];

    window.PARAMS = window['PARAMS_' + selectedSetName];

    initializeDependentConstants();
  }

  function adjustBallCountForViewportSize() {
    PARAMS.BASE.BALL_COUNT =
        parseInt(PARAMS.BASE.BALL_COUNT * viewport.width * viewport.height * 0.000001);
  }

  // ---------------------------------------------- //
  // ballHandler



  // ---------------------------------------------- //
  // touchAnimator



  // ---------------------------------------------- //
  // colorShifter



  // ---------------------------------------------- //
  // util



  // ---------------------------------------------- //
})();