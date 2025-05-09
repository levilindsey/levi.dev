'use strict';

/**
 * This module defines a singleton that fetches and parses data for the app.
 *
 * @module data
 */
(function () {

  var config = {};

  config.youtubeVideoBaseUrl = '//www.youtube.com/embed';
  config.youtubeThumbnailBaseUrl = 'http://img.youtube.com/vi';

  config.vimeoVideoBaseUrl = '//player.vimeo.com/video';

  config.appRootPath = window.appRootPath || 'example';
  config.metadataUrl = config.appRootPath + '/dist/data.min.json';

  var data = {};

  data.config = config;
  data.dataRequestState = 'request-not-sent';
  data.combinedMetadata = {};
  data.collectionMetadata = {};
  data.postData = [];

  data.fetchData = fetchData;

  window.app = window.app || {};
  app.data = data;

  // ---  --- //

  function fetchData(callback) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', onLoad, false);
    xhr.addEventListener('error', onError, false);
    xhr.addEventListener('abort', onAbort, false);

    console.log('Sending request to ' + config.metadataUrl);

    xhr.open('GET', config.metadataUrl, true);
    xhr.send();

    data.dataRequestState = 'waiting-for-response';

    // ---  --- //

    function onLoad() {
      console.log('Response status=' + xhr.status + ' (' + xhr.statusText + ')');
      //console.log('Response body=' + xhr.response);

      data.dataRequestState = 'received-response';

      try {
        data.combinedMetadata = JSON.parse(xhr.response);
      } catch (error) {
        data.combinedMetadata = {};
        data.collectionMetadata = {};
        data.postData = [];
        console.error('Unable to parse response body as JSON: ' + xhr.response);
        return;
      }

      data.collectionMetadata = data.combinedMetadata.collectionMetadata;
      data.postData = data.combinedMetadata.posts;

      updatePostsSrcUrls();

      callback();
    }

    function onError() {
      console.error('An error occurred while transferring the data');

      data.dataRequestState = 'error-with-request';
    }

    function onAbort() {
      console.error('The transfer has been cancelled by the user');

      data.dataRequestState = 'error-with-request';
    }
  }

  function updatePostsSrcUrls() {
    data.postData.forEach(updatePostSrcUrls);

    // ---  --- //

    function updatePostSrcUrls(postDatum) {
      var postBaseUrl = data.collectionMetadata.baseUrl + '/' + postDatum.id + '/';

      postDatum.images.forEach(updateSrcImageMetadata);
      postDatum.videos.forEach(updateSrcVideoMetadata);

      postDatum.thumbnailSrc = postBaseUrl + data.collectionMetadata.thumbnailName;
      postDatum.logoSrc = postBaseUrl + data.collectionMetadata.logoName;

      // ---  --- //

      function updateSrcImageMetadata(imageMetadatum) {
        imageMetadatum.src = postBaseUrl + imageMetadatum.fileName;
      }

      function updateSrcVideoMetadata(videoMetadatum) {
        switch (videoMetadatum.videoHost) {
          case 'youtube':
            videoMetadatum.videoSrc = config.youtubeVideoBaseUrl + '/' + videoMetadatum.id + '?enablejsapi=1';
            videoMetadatum.thumbnailSrc = config.youtubeThumbnailBaseUrl + '/' + videoMetadatum.id + '/default.jpg';
            break;
          case 'vimeo':
            videoMetadatum.videoSrc = config.vimeoVideoBaseUrl + '/' + videoMetadatum.id;
            videoMetadatum.thumbnailSrc = null;
            break;
          default:
            throw new Error('Invalid video host: ' + videoMetadatum.videoHost);
        }
      }
    }
  }

  console.log('data module loaded');
})();

'use strict';

(function() {
    window.jsKonamiCode = {};

    // TODO: You should assign your own callback here.
    window.jsKonamiCode.callback = defaultCallback;

    window.jsKonamiCode.keyDelayThresholdMs = 700;

    window.jsKonamiCode.konamiCodeSequence = [
        'ArrowUp',
        'ArrowUp',
        'ArrowDown',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'ArrowLeft',
        'ArrowRight',
        'KeyB',
        'KeyA',
    ];

    const KEY_CODE_CONFIGURATIONS = {
        'ArrowUp': {
            code: 'ArrowUp',
            key: 'ArrowUp',
        },
        'ArrowDown': {
            code: 'ArrowDown',
            key: 'ArrowDown',
        },
        'ArrowLeft': {
            code: 'ArrowLeft',
            key: 'ArrowLeft',
        },
        'ArrowRight': {
            code: 'ArrowRight',
            key: 'ArrowRight',
        },
        'KeyW': {
            code: 'KeyW',
            key: 'w',
        },
        'KeyS': {
            code: 'KeyS',
            key: 's',
        },
        'KeyA': {
            code: 'KeyA',
            key: 'a',
        },
        'KeyD': {
            code: 'KeyD',
            key: 'd',
        },
        'KeyB': {
            code: 'KeyB',
            key: 'b',
        },
    };

    let latestKeyPressTime = -window.jsKonamiCode.keyDelayThresholdMs;

    let currentCodeSequence = [];
    let currentKeySequence = [];

    function setUp() {
        document.addEventListener('keydown', onKeyDown, false);
    }

    function onKeyDown(event) {
        // Update the time.
        const previousKeyPressTime = latestKeyPressTime;
        latestKeyPressTime = Date.now();

        // Clear stale key sequences.
        if (latestKeyPressTime >= previousKeyPressTime + window.jsKonamiCode.keyDelayThresholdMs) {
            currentCodeSequence = [];
            currentKeySequence = [];
        }

        // Record the current key.
        currentCodeSequence.push(event.code);
        currentKeySequence.push(event.key);

        if (checkForMatch()) {
            window.jsKonamiCode.callback();
        }
    }

    function checkForMatch() {
        const expectedSequence = window.jsKonamiCode.konamiCodeSequence;

        if (currentCodeSequence.length < expectedSequence) {
            return false;
        }

        let foundMatch = true;
        for (let i = 0; i < expectedSequence.length; i++) {
            if (currentCodeSequence[currentCodeSequence.length - 1 - i] !==
                expectedSequence[expectedSequence.length - 1 - i]) {
                foundMatch = false;
                break;
            }
        }

        if (foundMatch) {
            return true;
        }

        foundMatch = true;
        for (let i = 0; i < expectedSequence.length; i++) {
            if (currentKeySequence[currentKeySequence.length - 1 - i].toLowerCase() !==
                KEY_CODE_CONFIGURATIONS[expectedSequence[expectedSequence.length - 1 - i]].key
                    .toLowerCase()) {
                foundMatch = false;
                break;
            }
        }

        return foundMatch;
    }

    function defaultCallback() {
        console.log("");
        console.log("REST 30");
        console.log("");

        const audio = document.querySelector('#konami-code-confirmation-sound');
        audio.volume = 0.08;
        audio.play();
    }

    window.addEventListener('load', setUp, false);
})();
'use strict';

/**
 * This module defines a singleton that drives the app.
 *
 * @module main
 */
(function () {

  var main = {};

  main.grid = null;

  window.app = window.app || {};
  app.main = main;

  window.addEventListener('load', initHexGrid, false);

  // ---  --- //

  /**
   * This is the event handler for the completion of the DOM loading. This creates the Grid
   * within the body element.
   */
  function initHexGrid() {
    console.log('onDocumentLoad');

    window.removeEventListener('load', initHexGrid);

    var hexGridContainer = document.getElementById('hex-grid-area');

    main.grid = window.hg.controller.createNewHexGrid(hexGridContainer, app.data.postData, false);

    app.parameters.initDatGui(main.grid);

    app.data.fetchData(updateTileData);
  }

  function updateTileData() {
    window.hg.controller.setGridPostData(main.grid, app.data.postData);

    app.parameters.updateForNewPostData(app.data.postData);
  }

  console.log('main module loaded');
})();

'use strict';

/**
 * This module defines a singleton that renders a menu panel across the top of the window.
 *
 * @module menu-panel
 */
(function () {

  var config = {};

  var menuPanel = {};

  menuPanel.config = config;

  window.app = window.app || {};
  app.menuPanel = menuPanel;

  // ---  --- //

  console.log('menu-panel module loaded');
})();

'use strict';

/**
 * This module defines a singleton that handles the contents of folders within the dat.GUI menu that represent
 * miscellaneous parameters.
 *
 * @module miscellaneous-parameters
 */
(function () {

  var config = {};

  config.folders = [
    {
      name: 'Main',
      isOpen: true,
      createItems: createMainItems,
      children: [
        {
          name: 'Pre-Set Configurations',
          isOpen: true,
          createItems: createPreSetConfigurationsItems,
          children: [
          ]
        },
        {
          name: 'Filter Posts',
          isOpen: true,
          createItems: createFilterPostsItems,
          children: [
          ]
        }
      ]
    },
    {
      name: 'Grid',
      isOpen: false,
      createItems: createGridItems
    },
    {
      name: 'Annotations',
      isOpen: false,
      createItems: createAnnotationsItems
    },
    {
      name: 'Particle System',
      isOpen: false,
      createItems: createParticleSystemItems
    },
    {
      name: 'Input',
      isOpen: false,
      createItems: createInputItems
    }
  ];

  config.defaultPreSet = 'gold-scale';

  config.preSetConfigs = {};

  config.preSetConfigs['gold-scale'] = {
    Grid: {
      tileGap: 4,
      backgroundHue: 40,
      backgroundSaturation: 15,
      backgroundLightness: 3,
      tileHue: 45,
      tileSaturation: 10,
      tileLightness: 7
    },
    TilePost: {
      inactiveScreenOpacity: 0.84,
      inactiveScreenHue: 40,
      inactiveScreenSaturation: 1,
      inactiveScreenLightness: 1
    },
    LineJob: {
      lineWidth: 4,
      startSaturation: 100,
      startLightness: 80,
      startOpacity: 0.3,
      endSaturation: 100,
      endLightness: 60,
      endOpacity: 0,
      sameDirectionProb: 0.6
    },
    HighlightRadiateJob: {
      deltaSaturation: 50,
      deltaLightness: 20,
    },
    HighlightHoverJob: {
      deltaSaturation: 10,
      deltaLightness: 20,
    },
    ColorWaveJob: {
      deltaSaturation: 20,
      deltaLightness: 14,
      wavelength: 4000,
      period: 4500,
      originY: 2000
    },
    ColorShiftJob: {
      hueDeltaMin: 0,
      hueDeltaMax: 0,
      saturationDeltaMin: -10,
      saturationDeltaMax: 8,
      lightnessDeltaMin: -5,
      lightnessDeltaMax: 5,

      imageBackgroundScreenOpacityDeltaMin: -0.05,
      imageBackgroundScreenOpacityDeltaMax: 0.05,

      transitionDurationMin: 800,
      transitionDurationMax: 2000
    },
    DisplacementWaveJob: {
      period: 1000000,
      tileDeltaX: 0,
      tileDeltaY: 0
    },
    OpenPostJob: {
      fadePostDurationOffset: 300
    },
    ClosePostJob: {
      duration: 200
    }
  };
  config.preSetConfigs['stormy-sea'] = {
    LineJob: {
      isRecurring: true
    }
  };
  config.preSetConfigs['color-worms'] = {
    Grid: {
      tileOuterRadius: 50,
      tileHue: 39,
      tileSaturation: 49,
      tileLightness: 12
    },
    Tile: {
      dragCoeff: 0.02,
      neighborSpringCoeff: 0.000004,
      innerAnchorSpringCoeff: 0.00002,
      borderAnchorSpringCoeff: 0.00002
    },
    LineJob: {
      isRecurring: true,
      lineWidth: 12,
      lineLength: 400,
      duration: 70000,
      lineSidePeriod: 1000,
      startSaturation: 100,
      startLightness: 60,
      startOpacity: 0.8,
      endSaturation: 100,
      endLightness: 60,
      endOpacity: 0,
      sameDirectionProb: 0.75,
      avgDelay: 2000,
      delayDeviationRange: 200
    },
    LinesRadiateJob: {
      lineWidth: 7,
      lineLength: 250,
      duration: 30000,
      lineSidePeriod: 120,
      startSaturation: 100,
      startLightness: 60,
      startOpacity: 0.8,
      endSaturation: 100,
      endLightness: 60,
      endOpacity: 0,
      sameDirectionProb: 0.75
    },
    DisplacementWaveJob: {
      period: 1000000,
      tileDeltaX: 0,
      tileDeltaY: 0
    },
    ColorWaveJob: {
      period: 1000000,
      deltaLightness: 0
    },
    Input: {
      contentTileClickAnimation: 'None',
      emptyTileClickAnimation: 'Radiate Lines'
    },
    OpenPostJob: {
      expandedDisplacementTileCount: 4
    }
  };
  config.preSetConfigs['crazy-flux'] = {
    Grid: {
      tileOuterRadius: 60,
      tileGap: 40,
      tileHue: 24,
      tileSaturation: 75,
      tileLightness: 50
    },
    LineJob: {
      isRecurring: true,
      lineWidth: 100,
      duration: 3000,
      startSaturation: 100,
      startLightness: 60,
      startOpacity: 0.7,
      endSaturation: 100,
      endLightness: 60,
      endOpacity: 0,
      sameDirectionProb: 0.25,
      avgDelay: 20,
      delayDeviationRange: 10
    },
    Input: {
      contentTileClickAnimation: 'None',
      emptyTileClickAnimation: 'Radiate Lines'
    },
    DisplacementWaveJob: {
      period: 1400,
      tileDeltaX: 140,
      tileDeltaY: -120,
      originX: 2000,
      originY: 1800
    },
    ColorShiftJob: {
      hueDeltaMin: -180,
      hueDeltaMax: 180,
    }
  };
  config.preSetConfigs['wire-frame'] = {
    LineJob: {
      isRecurring: true
    },
    Annotations: {
      annotations: {
        tileNeighborConnections: {
          enabled: true
        },
        tileAnchorCenters: {
          enabled: true
        },
        transparentTiles: {
          enabled: true
        },
        lineAnimationGapPoints: {
          enabled: true
        },
        lineAnimationCornerData: {
          enabled: true
        },
        sectorAnchorCenters: {
          enabled: true
        }
      }
    },
    Input: {
      contentTileClickAnimation: 'None',
      emptyTileClickAnimation: 'Radiate Lines'
    },
    DisplacementWaveJob: {
      originX: 1600,
      originY: 1800
    },
    Tile: {
      dragCoeff: 0.013,
      neighborSpringCoeff: 0.000002,
      innerAnchorSpringCoeff: 0.00001,
      borderAnchorSpringCoeff: 0.00002
    }
  };

  // ---  --- //

  var miscParams = {};

  miscParams.init = init;
  miscParams.config = config;

  window.app = window.app || {};
  app.miscParams = miscParams;

  // ---  --- //

  function init(grid) {
    miscParams.grid = grid;
  }

  function createMainItems(folder) {
    var data = {
      'Go Home': window.app.parameters.goHome,
      'Hide Menu': window.app.parameters.hideMenu
    };

    folder.add(data, 'Go Home');
    folder.add(data, 'Hide Menu');
  }

  function createPreSetConfigurationsItems(parentFolder) {
    var data = {};

    Object.keys(config.preSetConfigs).forEach(addPreSetConfig);

    // ---  --- //

    function addPreSetConfig(preSetName) {
      data[preSetName] = window.app.parameters.updateToPreSetConfigs.bind(window.app.parameters,
        config.preSetConfigs[preSetName]);
      parentFolder.add(data, preSetName);
    }
  }

  function createFilterPostsItems(parentFolder) {
    var data = {
      'all': filterPosts.bind(window.app.parameters, 'all'),
      'work': filterPosts.bind(window.app.parameters, 'work'),
      'research': filterPosts.bind(window.app.parameters, 'research'),
      'side-projects': filterPosts.bind(window.app.parameters, 'side-project')
    };

    parentFolder.add(data, 'all');
    parentFolder.add(data, 'work');
    parentFolder.add(data, 'research');
    parentFolder.add(data, 'side-projects');
    window.app.parameters.categoriesFolder = parentFolder.addFolder('All Categories');

    // ---  --- //

    function filterPosts(category) {
      window.app.parameters.categoryData[category].menuItem.setValue(true);
    }
  }

  function createGridItems(folder) {
    var colors = {};
    colors.backgroundColor = window.hg.util.hslToHsv({
      h: window.hg.Grid.config.backgroundHue,
      s: window.hg.Grid.config.backgroundSaturation * 0.01,
      l: window.hg.Grid.config.backgroundLightness * 0.01
    });
    colors.tileColor = window.hg.util.hslToHsv({
      h: window.hg.Grid.config.tileHue,
      s: window.hg.Grid.config.tileSaturation * 0.01,
      l: window.hg.Grid.config.tileLightness * 0.01
    });

    folder.add(miscParams.grid, 'isVertical')
        .onChange(function () {
          window.hg.controller.resetGrid(miscParams.grid);
        });
    folder.add(window.hg.Grid.config, 'tileOuterRadius', 10, 400)
        .onChange(function () {
          window.hg.Grid.config.computeDependentValues();
          window.hg.controller.resetGrid(miscParams.grid);
        });
    folder.add(window.hg.Grid.config, 'tileGap', -50, 100)
        .onChange(function () {
          window.hg.Grid.config.computeDependentValues();
          window.hg.controller.resetGrid(miscParams.grid);
        });
    folder.addColor(colors, 'backgroundColor')
        .onChange(function () {
          var color = window.hg.util.hsvToHsl(colors.backgroundColor);

          window.hg.Grid.config.backgroundHue = color.h;
          window.hg.Grid.config.backgroundSaturation = color.s * 100;
          window.hg.Grid.config.backgroundLightness = color.l * 100;

          miscParams.grid.setBackgroundColor();
        });
    folder.addColor(colors, 'tileColor')
        .onChange(function () {
          var color = window.hg.util.hsvToHsl(colors.tileColor);

          window.hg.Grid.config.tileHue = color.h;
          window.hg.Grid.config.tileSaturation = color.s * 100;
          window.hg.Grid.config.tileLightness = color.l * 100;

          miscParams.grid.updateTileColor();
          if (window.hg.Annotations.config.annotations['contentTiles'].enabled) {
            miscParams.grid.annotations.toggleAnnotationEnabled('contentTiles', true);
          }
        });
    folder.add(window.hg.Grid.config, 'firstRowYOffset', -100, 100)
        .onChange(function () {
          window.hg.Grid.config.computeDependentValues();
          window.hg.controller.resetGrid(miscParams.grid);
        });
    folder.add(window.hg.Grid.config, 'contentStartingRowIndex', 0, 4).step(1)
        .onChange(function () {
          window.hg.Grid.config.computeDependentValues();
          miscParams.grid.computeContentIndices();
          window.hg.controller.resetGrid(miscParams.grid);
        });
    folder.add(window.hg.Grid.config, 'targetContentAreaWidth', 500, 1500)
        .onChange(function () {
          window.hg.Grid.config.computeDependentValues();
          miscParams.grid.computeContentIndices();
          window.hg.controller.resetGrid(miscParams.grid);
        });
    folder.add(window.hg.Grid.config, 'contentDensity', 0.1, 1.0)
        .onChange(function () {
          window.hg.Grid.config.computeDependentValues();
          miscParams.grid.computeContentIndices();
          window.hg.controller.resetGrid(miscParams.grid);
        });
  }

  function createAnnotationsItems(folder) {
    var key, data;

    for (key in window.hg.Annotations.config.annotations) {
      data = {};
      data[key] = window.hg.Annotations.config.annotations[key].enabled;

      folder.add(data, key).onChange(function (value) {
        miscParams.grid.annotations.toggleAnnotationEnabled(this.property, value);
      });
    }
  }

  function createInputItems(folder) {
    folder.add(window.hg.Input.config, 'contentTileClickAnimation',
        Object.keys(window.hg.Input.config.possibleClickAnimations));
    folder.add(window.hg.Input.config, 'emptyTileClickAnimation',
        Object.keys(window.hg.Input.config.possibleClickAnimations));
  }

  function createParticleSystemItems(folder) {
    folder.add(window.hg.Tile.config, 'dragCoeff', 0.000001, 0.1);
    folder.add(window.hg.Tile.config, 'neighborSpringCoeff', 0.000001, 0.0001);
    folder.add(window.hg.Tile.config, 'neighborDampingCoeff', 0.000001, 0.009999);
    folder.add(window.hg.Tile.config, 'innerAnchorSpringCoeff', 0.000001, 0.0001);
    folder.add(window.hg.Tile.config, 'innerAnchorDampingCoeff', 0.000001, 0.009999);
    folder.add(window.hg.Tile.config, 'borderAnchorSpringCoeff', 0.000001, 0.0001);
    folder.add(window.hg.Tile.config, 'borderAnchorDampingCoeff', 0.000001, 0.009999);
    folder.add(window.hg.Tile.config, 'forceSuppressionLowerThreshold', 0.000001, 0.009999);
    folder.add(window.hg.Tile.config, 'velocitySuppressionLowerThreshold', 0.000001, 0.009999);
    folder.add(window.hg.Grid.config, 'tileMass', 0.1, 10)
        .onChange(function (value) {
          miscParams.grid.updateTileMass(value);
        });
  }

  console.log('miscellaneous-parameters module loaded');
})();

'use strict';

/**
 * This module defines a singleton that handles the communication between the dat.GUI controller
 * and the hex-grid parameters.
 *
 * @module parameters
 */
(function () {

  var parameters = {},
      config = {},
      originalHgConfigs = {};

  config.datGuiWidth = 300;

  config.folders = [
    createMiscellaneousFolders,
    {
      name: 'Animations',
      isOpen: false,
      createItems: null,
      children: [
        createTransientAnimationsFolder,
        createPersistentAnimationsFolder
      ]
    }
  ];

  // ---  --- //

  parameters.config = config;
  parameters.initDatGui = initDatGui;
  parameters.updateForNewPostData = updateForNewPostData;
  parameters.goHome = goHome;
  parameters.hideMenu = hideMenu;
  parameters.updateToPreSetConfigs = updateToPreSetConfigs;
  parameters.filterPosts = filterPosts;
  parameters.recordOpenChildFolders = recordOpenChildFolders;
  parameters.grid = null;
  parameters.gui = null;
  parameters.categoriesFolder = null;
  parameters.allCategories = [];
  parameters.categoryData = {};

  window.app = window.app || {};
  app.parameters = parameters;

  // ---  --- //

  /**
   * Sets up the dat.GUI controller.
   *
   * @param {Grid} grid
   */
  function initDatGui(grid) {
    parameters.grid = grid;

    storeOriginalConfigValues();

    window.app.miscParams.init(grid);
    window.app.persistentParams.init(grid);
    window.app.transientParams.init(grid);

    createDatGui();

    window.app.parameters.updateToPreSetConfigs.call(window.app.parameters,
        window.app.miscParams.config.preSetConfigs[window.app.miscParams.config.defaultPreSet]);

    var debouncedResize = window.hg.util.debounce(resize, 300);
    window.addEventListener('resize', debouncedResize, false);
    debouncedResize();
  }

  function resize() {
    setTimeout(function () {
      // Don't show the menu on smaller screens.
      if (window.hg.controller.isSmallScreen) {
        hideMenu();
      } else {
        showMenu();
      }
    }, 10);
  }

  function createDatGui() {
    parameters.gui = new dat.GUI();
    parameters.gui.close();
    parameters.gui.width = config.datGuiWidth;

    window.gui = parameters.gui;

    // Don't show the menu on smaller screens.
    if (window.hg.controller.isSmallScreen) {
      hideMenu();
    } else {
      showMenu();
    }

    createFolders();
  }

  function createFolders() {
    createChildFolders(config.folders, parameters.gui);
  }

  function createChildFolders(childFolderConfigs, parentFolder) {
    childFolderConfigs.forEach(function (folderConfig) {
      if (typeof folderConfig === 'function') {
        folderConfig(parentFolder);
      } else {
        var folder = parentFolder.addFolder(folderConfig.name);

        folderConfig.folder = folder;

        if (folderConfig.isOpen) {
          folder.open();
        }

        if (folderConfig.createItems) {
          folderConfig.createItems(folder);
        }

        // Recursively create descendent folders
        if (folderConfig.children) {
          createChildFolders(folderConfig.children, folder);
        }
      }
    });
  }

  function createMiscellaneousFolders(parentFolder) {
    createChildFolders(window.app.miscParams.config.folders, parentFolder);
  }

  function createTransientAnimationsFolder(parentFolder) {
    createChildFolders(window.app.transientParams.config.folders, parentFolder);
  }

  function createPersistentAnimationsFolder(parentFolder) {
    createChildFolders(window.app.persistentParams.config.folders, parentFolder);
  }

  function recordOpenFolders() {
    recordOpenChildFolders(config.folders);
    window.app.parameters.recordOpenChildFolders(window.app.miscParams.config.folders);
    window.app.parameters.recordOpenChildFolders(window.app.transientParams.config.folders);
    window.app.parameters.recordOpenChildFolders(window.app.persistentParams.config.folders);
  }

  function recordOpenChildFolders(childFolderConfigs) {
    childFolderConfigs.forEach(function (folderConfig) {
      if (typeof folderConfig !== 'function') {
        folderConfig.isOpen = !folderConfig.folder.closed;

        // Recurse
        if (folderConfig.children) {
          recordOpenChildFolders(folderConfig.children);
        }
      }
    });
  }

  /**
   * @param {Array.<PostData>} postData
   */
  function updateForNewPostData(postData) {
    parameters.allCategories = getAllCategories(postData);
    addCategoryMenuItems();

    // ---  --- //

    function getAllCategories(postData) {
      // Collect a mapping from each category to its number of occurrences
      var categoryMap = postData.reduce(function (map, datum) {
        return datum.categories.reduce(function (map, category) {
          map[category] = map[category] ? map[category] + 1 : 1;
          return map;
        }, map);
      }, {});

      // Collect an array containing each category, sorted by the number of occurrences of each category (in
      // DESCENDING order)
      var categoryArray = Object.keys(categoryMap)
          .sort(function (category1, category2) {
            return categoryMap[category2] - categoryMap[category1];
          });

      return categoryArray;
    }

    function addCategoryMenuItems() {
      parameters.categoryData = {};

      // Add an item for showing all categories
      addCategoryItem(parameters.categoryData, 'all', parameters.categoriesFolder);
      parameters.categoryData['all']['all'] = true;

      // Add an item for showing each individual category
      parameters.allCategories.forEach(function (category) {
        addCategoryItem(parameters.categoryData, category, parameters.categoriesFolder);
      });

      // ---  --- //

      function addCategoryItem(categoryData, label, folder) {
        categoryData[label] = {};
        categoryData[label][label] = false;
        categoryData[label].menuItem = folder.add(categoryData[label], label)
            .onChange(function () {
              filterPosts(label);
            });
      }
    }
  }

  function storeOriginalConfigValues() {
    // Each module/file in the hex-grid project stores a reference to its constructor or singleton in the global hg
    // namespace
    originalHgConfigs = Object.keys(window.hg).reduce(function (configs, key) {
      if (window.hg[key].config) {
        configs[key] = window.hg.util.deepCopy(window.hg[key].config);
      }
      return configs;
    }, {});
  }

  var categoryStackSize = 0;

  function filterPosts(category) {
    categoryStackSize++;

    // Only filter when the checkbox is checked
    if (parameters.categoryData[category][category]) {
      // Make sure all other category filters are off (manual radio button logic)
      Object.keys(parameters.categoryData).forEach(function (key) {
        // Only turn off the other filters that are turned on
        if (parameters.categoryData[key][key] && key !== category) {
          parameters.categoryData[key].menuItem.setValue(false);
        }
      });

      window.hg.controller.filterGridPostDataByCategory(parameters.grid, category);
    } else if (categoryStackSize === 1) {
      // If unchecking a textbox, turn on the 'all' filter
      parameters.categoryData['all'].menuItem.setValue(true);
    }

    categoryStackSize--;
  }

  function goHome() {
    console.log('Go Home clicked');
    window.location.href = '/';
  }

  function hideMenu() {
    // console.log('Hide Menu clicked');
    document.querySelector('body > .dg').style.display = 'none';
  }

  function showMenu() {
    document.querySelector('body > .dg').style.display = 'block';
  }

  function updateToPreSetConfigs(preSetConfig) {
    console.log('Updating to pre-set configuration', preSetConfig);

    recordOpenFolders();
    resetAllConfigValues();
    setPreSetConfigValues(preSetConfig);

    parameters.grid.annotations.refresh();
    window.hg.Grid.config.computeDependentValues();
    window.hg.controller.resetGrid(parameters.grid);
    parameters.grid.setBackgroundColor();
    parameters.grid.resize();

    refreshDatGui();
  }

  function resetAllConfigValues() {
    // Reset each module's configuration parameters back to their default values
    Object.keys(window.hg).forEach(function (moduleName) {
      if (window.hg[moduleName].config) {
        Object.keys(originalHgConfigs[moduleName]).forEach(function (parameterName) {
          window.hg[moduleName].config[parameterName] =
            window.hg.util.deepCopy(originalHgConfigs[moduleName][parameterName]);
        });
      }
    });
  }

  function setPreSetConfigValues(preSetConfig) {
    Object.keys(preSetConfig).forEach(function (moduleName) {
      // Set all of the special parameters for this new pre-set configuration
      Object.keys(preSetConfig[moduleName]).forEach(function (key) {
        setModuleToMatchPreSet(window.hg[moduleName].config, preSetConfig[moduleName], key);
      });

      // Update the recurrence of any transient job
      if (window.hg.controller.transientJobs[moduleName] &&
          window.hg.controller.transientJobs[moduleName].toggleRecurrence) {
        window.hg.controller.transientJobs[moduleName].toggleRecurrence(
          parameters.grid,
          window.hg[moduleName].config.isRecurring,
          window.hg[moduleName].config.avgDelay,
          window.hg[moduleName].config.delayDeviationRange);
      }
    });

    // ---  --- //

    function setModuleToMatchPreSet(moduleConfig, preSetConfig, key) {
      // Recurse on nested objects in the configuration
      if (typeof preSetConfig[key] === 'object') {
        Object.keys(preSetConfig[key]).forEach(function (childKey) {
          setModuleToMatchPreSet(moduleConfig[key], preSetConfig[key], childKey);
        });
      } else {
        moduleConfig[key] = preSetConfig[key];
      }
    }
  }

  function refreshDatGui() {
    parameters.gui.destroy();
    createDatGui();
  }

  console.log('parameters module loaded');
})();

'use strict';

/**
 * This module defines a singleton that handles the contents of folders within the dat.GUI menu that represent
 * persistent animation parameters.
 *
 * @module persistent-animation-parameters
 */
(function () {

  var config = {};

  config.folders = [
    {
      name: 'Persistent',
      isOpen: false,
      createItems: null,
      children: [
        {
          name: 'Color Shift',
          isOpen: false,
          createItems: createColorShiftItems
        },
        {
          name: 'Color Wave',
          isOpen: false,
          createItems: createColorWaveItems
        },
        {
          name: 'Displacement Wave',
          isOpen: false,
          createItems: createDisplacementWaveItems
        }
      ]
    }
  ];

  // ---  --- //

  var persistentParams = {};

  persistentParams.init = init;
  persistentParams.config = config;

  window.app = window.app || {};
  app.persistentParams = persistentParams;

  // ---  --- //

  function init(grid) {
    persistentParams.grid = grid;
  }

  function createColorShiftItems(folder) {
    folder.add(window.hg.ColorShiftJob.config, 'transitionDurationMin', 1, 10000)
        .onChange(function (value) {
          window.hg.ColorShiftJob.config.transitionDurationMax = Math.max(
              window.hg.ColorShiftJob.config.transitionDurationMin,
              window.hg.ColorShiftJob.config.transitionDurationMax
          );
        });
    folder.add(window.hg.ColorShiftJob.config, 'transitionDurationMax', 1, 10000)
        .onChange(function (value) {
          window.hg.ColorShiftJob.config.transitionDurationMin = Math.min(
              window.hg.ColorShiftJob.config.transitionDurationMin,
              window.hg.ColorShiftJob.config.transitionDurationMax
          );
        });
    folder.add(window.hg.ColorShiftJob.config, 'hueDeltaMin', -360, 360)
        .onChange(function (value) {
          window.hg.ColorShiftJob.config.hueDeltaMax = Math.max(
              window.hg.ColorShiftJob.config.hueDeltaMin,
              window.hg.ColorShiftJob.config.hueDeltaMax
          );
        });
    folder.add(window.hg.ColorShiftJob.config, 'hueDeltaMax', -360, 360)
        .onChange(function (value) {
          window.hg.ColorShiftJob.config.hueDeltaMin = Math.min(
              window.hg.ColorShiftJob.config.hueDeltaMin,
              window.hg.ColorShiftJob.config.hueDeltaMax
          );
        });
    folder.add(window.hg.ColorShiftJob.config, 'saturationDeltaMin', -100, 100)
        .onChange(function (value) {
          window.hg.ColorShiftJob.config.saturationDeltaMax = Math.max(
              window.hg.ColorShiftJob.config.saturationDeltaMin,
              window.hg.ColorShiftJob.config.saturationDeltaMax
          );
        });
    folder.add(window.hg.ColorShiftJob.config, 'saturationDeltaMax', -100, 100)
        .onChange(function (value) {
          window.hg.ColorShiftJob.config.saturationDeltaMin = Math.min(
              window.hg.ColorShiftJob.config.saturationDeltaMin,
              window.hg.ColorShiftJob.config.saturationDeltaMax
          );
        });
    folder.add(window.hg.ColorShiftJob.config, 'lightnessDeltaMin', -100, 100)
        .onChange(function (value) {
          window.hg.ColorShiftJob.config.lightnessDeltaMax = Math.max(
              window.hg.ColorShiftJob.config.lightnessDeltaMin,
              window.hg.ColorShiftJob.config.lightnessDeltaMax
          );
        });
    folder.add(window.hg.ColorShiftJob.config, 'lightnessDeltaMax', -100, 100)
        .onChange(function (value) {
          window.hg.ColorShiftJob.config.lightnessDeltaMin = Math.min(
              window.hg.ColorShiftJob.config.lightnessDeltaMin,
              window.hg.ColorShiftJob.config.lightnessDeltaMax
          );
        });
    folder.add(window.hg.ColorShiftJob.config, 'imageBackgroundScreenOpacityDeltaMin', -1.0, 1.0)
        .onChange(function (value) {
          window.hg.ColorShiftJob.config.imageBackgroundScreenOpacityDeltaMax = Math.max(
              window.hg.ColorShiftJob.config.imageBackgroundScreenOpacityDeltaMin,
              window.hg.ColorShiftJob.config.imageBackgroundScreenOpacityDeltaMax
          );
        });
    folder.add(window.hg.ColorShiftJob.config, 'imageBackgroundScreenOpacityDeltaMax', -1.0, 1.0)
        .onChange(function (value) {
          window.hg.ColorShiftJob.config.imageBackgroundScreenOpacityDeltaMin = Math.min(
              window.hg.ColorShiftJob.config.imageBackgroundScreenOpacityDeltaMin,
              window.hg.ColorShiftJob.config.imageBackgroundScreenOpacityDeltaMax
          );
        });
  }

  function createColorWaveItems(folder) {
    folder.add(window.hg.ColorWaveJob.config, 'period', 1, 10000)
        .onChange(function (value) {
          window.hg.ColorWaveJob.config.halfPeriod = value / 2;
        });
    folder.add(window.hg.ColorWaveJob.config, 'wavelength', 1, 4000)
        .onChange(function () {
          window.hg.controller.persistentJobs.ColorWaveJob.start(persistentParams.grid);
        });
    folder.add(window.hg.ColorWaveJob.config, 'originX', -500, 3000)
        .onChange(function () {
          window.hg.controller.persistentJobs.ColorWaveJob.start(persistentParams.grid);
        });
    folder.add(window.hg.ColorWaveJob.config, 'originY', -500, 3000)
        .onChange(function () {
          window.hg.controller.persistentJobs.ColorWaveJob.start(persistentParams.grid);
        });
    folder.add(window.hg.ColorWaveJob.config, 'deltaHue', 0, 360);
    folder.add(window.hg.ColorWaveJob.config, 'deltaSaturation', 0, 100);
    folder.add(window.hg.ColorWaveJob.config, 'deltaLightness', 0, 100);
    folder.add(window.hg.ColorWaveJob.config, 'opacity', 0, 1);
  }

  function createDisplacementWaveItems(folder) {
    folder.add(window.hg.DisplacementWaveJob.config, 'period', 1, 10000)
        .onChange(function (value) {
          window.hg.DisplacementWaveJob.config.halfPeriod = value / 2;
        });
    folder.add(window.hg.DisplacementWaveJob.config, 'wavelength', 1, 4000)
        .onChange(function () {
          window.hg.controller.persistentJobs.DisplacementWaveJob.start(persistentParams.grid);
        });
    folder.add(window.hg.DisplacementWaveJob.config, 'originX', -500, 3000)
        .onChange(function () {
          window.hg.controller.persistentJobs.DisplacementWaveJob.start(persistentParams.grid);
        });
    folder.add(window.hg.DisplacementWaveJob.config, 'originY', -500, 3000)
        .onChange(function () {
          window.hg.controller.persistentJobs.DisplacementWaveJob.start(persistentParams.grid);
        });
    folder.add(window.hg.DisplacementWaveJob.config, 'tileDeltaX', -300, 300);
    folder.add(window.hg.DisplacementWaveJob.config, 'tileDeltaY', -300, 300);
  }

  console.log('persistent-animation-parameters module loaded');
})();

'use strict';

/**
 * This module defines a singleton that handles the contents of folders within the dat.GUI menu that represent
 * transient animation parameters.
 *
 * @module transient-animation-parameters
 */
(function () {

  var config = {};

  config.folders = [
    {
      name: 'Transient',
      isOpen: false,
      createItems: null,
      children: [
        {
          name: 'Open/Close Post',
          isOpen: false,
          createItems: createOpenClosePostItems
        },
        {
          name: 'Displacement Radiate',
          isOpen: false,
          createItems: createDisplacementRadiateItems
        },
        {
          name: 'Hover Highlight',
          isOpen: false,
          createItems: createHoverHighlightItems
        },
        {
          name: 'Radiating Highlight',
          isOpen: false,
          createItems: createRadiatingHighlightItems
        },
        {
          name: 'Intra-Tile Radiate',
          isOpen: false,
          createItems: createIntraTileRadiateItems
        },
        {
          name: 'Random Lines',
          isOpen: false,
          createItems: createRandomLinesItems
        },
        {
          name: 'Radiating Lines',
          isOpen: false,
          createItems: createRadiatingLinesItems
        },
        {
          name: 'Pan',
          isOpen: false,
          createItems: createPanItems
        },
        {
          name: 'Spread',
          isOpen: false,
          createItems: createSpreadItems
        },
        {
          name: 'Tile Border',
          isOpen: false,
          createItems: createTileBorderItems
        }
      ]
    }
  ];

  // ---  --- //

  var transientParams = {};

  transientParams.init = init;
  transientParams.config = config;

  window.app = window.app || {};
  app.transientParams = transientParams;

  // ---  --- //

  function init(grid) {
    transientParams.grid = grid;
  }

  function createOpenClosePostItems(folder) {
    var data = {
      'triggerOpenPost': window.hg.controller.transientJobs.OpenPostJob.createRandom.bind(
          window.hg.controller, transientParams.grid),
      'triggerClosePost': window.hg.controller.transientJobs.ClosePostJob.createRandom.bind(
              window.hg.controller, transientParams.grid, false),
      'triggerTogglePost': function () {
        if (transientParams.grid.isPostOpen) {
          data.triggerClosePost();
        } else {
          data.triggerOpenPost();
        }
      }
    };

    folder.add(data, 'triggerTogglePost');

    folder.add(window.hg.OpenPostJob.config, 'duration', 10, 10000)
        .name('Open Duration');
    folder.add(window.hg.ClosePostJob.config, 'duration', 10, 10000)
        .name('Close Duration');
    folder.add(window.hg.OpenPostJob.config, 'expandedDisplacementTileCount', 0, 5)
        .step(1);
  }

  function createDisplacementRadiateItems(folder) {
    var data = {
      'triggerDisplacement':
          window.hg.controller.transientJobs.DisplacementRadiateJob.createRandom.bind(
              window.hg.controller, transientParams.grid)
    };

    folder.add(data, 'triggerDisplacement');

    folder.add(window.hg.DisplacementRadiateJob.config, 'duration', 10, 10000);

    // TODO:

    folder.add(window.hg.DisplacementRadiateJob.config, 'isRecurring')
        .onChange(toggleRecurrence);
    folder.add(window.hg.DisplacementRadiateJob.config, 'avgDelay', 10, 10000)
        .onChange(toggleRecurrence);
    folder.add(window.hg.DisplacementRadiateJob.config, 'delayDeviationRange', 0, 10000)
        .onChange(toggleRecurrence);

    // ---  --- //

    function toggleRecurrence() {
      window.hg.controller.transientJobs.DisplacementRadiateJob.toggleRecurrence(
          transientParams.grid,
          window.hg.DisplacementRadiateJob.config.isRecurring,
          window.hg.DisplacementRadiateJob.config.avgDelay,
          window.hg.DisplacementRadiateJob.config.delayDeviationRange);
    }
  }

  function createHoverHighlightItems(folder) {
    var data, colors;

    colors = [];
    colors.deltaColor = window.hg.util.hslToHsv({
      h: window.hg.HighlightHoverJob.config.deltaHue,
      s: window.hg.HighlightHoverJob.config.deltaSaturation * 0.01,
      l: window.hg.HighlightHoverJob.config.deltaLightness * 0.01
    });

    data = {
      'triggerHighlightHover': window.hg.controller.transientJobs.HighlightHoverJob.createRandom.bind(
          window.hg.controller, transientParams.grid)
    };

    folder.add(data, 'triggerHighlightHover');

    folder.add(window.hg.HighlightHoverJob.config, 'duration', 10, 10000);
    folder.addColor(colors, 'deltaColor')
        .onChange(function () {
          var color = window.hg.util.hsvToHsl(colors.deltaColor);

          window.hg.HighlightHoverJob.config.deltaHue = color.h;
          window.hg.HighlightHoverJob.config.deltaSaturation = color.s * 100;
          window.hg.HighlightHoverJob.config.deltaLightness = color.l * 100;
        });
    folder.add(window.hg.HighlightHoverJob.config, 'opacity', 0, 1);

    folder.add(window.hg.HighlightHoverJob.config, 'isRecurring')
        .onChange(toggleRecurrence);
    folder.add(window.hg.HighlightHoverJob.config, 'avgDelay', 10, 2000)
        .onChange(toggleRecurrence);
    folder.add(window.hg.HighlightHoverJob.config, 'delayDeviationRange', 0, 2000)
        .onChange(toggleRecurrence);

    // ---  --- //

    function toggleRecurrence() {
      window.hg.controller.transientJobs.HighlightHoverJob.toggleRecurrence(
          transientParams.grid,
          window.hg.HighlightHoverJob.config.isRecurring,
          window.hg.HighlightHoverJob.config.avgDelay,
          window.hg.HighlightHoverJob.config.delayDeviationRange);
    }
  }

  function createRadiatingHighlightItems(folder) {
    var data, colors;

    colors = [];
    colors.deltaColor = window.hg.util.hslToHsv({
      h: window.hg.HighlightRadiateJob.config.deltaHue,
      s: window.hg.HighlightRadiateJob.config.deltaSaturation * 0.01,
      l: window.hg.HighlightRadiateJob.config.deltaLightness * 0.01
    });

    data = {
      'triggerHighlightRadiate':
          window.hg.controller.transientJobs.HighlightRadiateJob.createRandom.bind(
              window.hg.controller, transientParams.grid)
    };

    folder.add(data, 'triggerHighlightRadiate');

    folder.add(window.hg.HighlightRadiateJob.config, 'shimmerSpeed', 0.1, 10);
    folder.add(window.hg.HighlightRadiateJob.config, 'shimmerWaveWidth', 1, 2000);
    folder.add(window.hg.HighlightRadiateJob.config, 'duration', 10, 10000);
    folder.addColor(colors, 'deltaColor')
        .onChange(function () {
          var color = window.hg.util.hsvToHsl(colors.deltaColor);

          window.hg.HighlightRadiateJob.config.deltaHue = color.h;
          window.hg.HighlightRadiateJob.config.deltaSaturation = color.s * 100;
          window.hg.HighlightRadiateJob.config.deltaLightness = color.l * 100;
        });
    folder.add(window.hg.HighlightRadiateJob.config, 'opacity', 0, 1);

    folder.add(window.hg.HighlightRadiateJob.config, 'isRecurring')
        .onChange(toggleRecurrence);
    folder.add(window.hg.HighlightRadiateJob.config, 'avgDelay', 10, 10000)
        .onChange(toggleRecurrence);
    folder
        .add(window.hg.HighlightRadiateJob.config, 'delayDeviationRange', 0, 10000)
        .onChange(toggleRecurrence);

    // ---  --- //

    function toggleRecurrence() {
      window.hg.controller.transientJobs.HighlightRadiateJob.toggleRecurrence(
          transientParams.grid,
          window.hg.HighlightRadiateJob.config.isRecurring,
          window.hg.HighlightRadiateJob.config.avgDelay,
          window.hg.HighlightRadiateJob.config.delayDeviationRange);
    }
  }

  function createIntraTileRadiateItems(folder) {
    var data = {
      'triggerIntraTileRadiate':
          window.hg.controller.transientJobs.IntraTileRadiateJob.createRandom.bind(
              window.hg.controller, transientParams.grid)
    };

    folder.add(data, 'triggerIntraTileRadiate');

    folder.add(window.hg.IntraTileRadiateJob.config, 'duration', 10, 10000);

    // TODO:

    folder.add(window.hg.IntraTileRadiateJob.config, 'isRecurring')
        .onChange(toggleRecurrence);
    folder.add(window.hg.IntraTileRadiateJob.config, 'avgDelay', 10, 10000)
        .onChange(toggleRecurrence);
    folder.add(window.hg.IntraTileRadiateJob.config, 'delayDeviationRange',
        0, 10000)
        .onChange(toggleRecurrence);

    // ---  --- //

    function toggleRecurrence() {
      window.hg.controller.transientJobs.IntraTileRadiateJob.toggleRecurrence(
          transientParams.grid,
          window.hg.IntraTileRadiateJob.config.isRecurring,
          window.hg.IntraTileRadiateJob.config.avgDelay,
          window.hg.IntraTileRadiateJob.config.delayDeviationRange);
    }
  }

  function createRandomLinesItems(folder) {
    var data = {
      'triggerLine': window.hg.controller.transientJobs.LineJob.createRandom.bind(
          window.hg.controller, transientParams.grid)
    };

    folder.add(data, 'triggerLine');

    folder.add(window.hg.LineJob.config, 'duration', 100, 20000);
    folder.add(window.hg.LineJob.config, 'lineWidth', 1, 100);
    folder.add(window.hg.LineJob.config, 'lineLength', 10, 60000);
    folder.add(window.hg.LineJob.config, 'lineSidePeriod', 5, 500);
    folder.add(window.hg.LineJob.config, 'startSaturation', 0, 100);
    folder.add(window.hg.LineJob.config, 'startLightness', 0, 100);
    folder.add(window.hg.LineJob.config, 'startOpacity', 0, 1);
    folder.add(window.hg.LineJob.config, 'endSaturation', 0, 100);
    folder.add(window.hg.LineJob.config, 'endLightness', 0, 100);
    folder.add(window.hg.LineJob.config, 'endOpacity', 0, 1);
    folder.add(window.hg.LineJob.config, 'sameDirectionProb', 0, 1);

    folder.add(window.hg.LineJob.config, 'isBlurOn');
    folder.add(window.hg.LineJob.config, 'blurStdDeviation', 0, 80);

    folder.add(window.hg.LineJob.config, 'isRecurring')
        .onChange(toggleRecurrence);
    folder.add(window.hg.LineJob.config, 'avgDelay', 10, 10000)
        .onChange(toggleRecurrence);
    folder.add(window.hg.LineJob.config, 'delayDeviationRange', 0, 10000)
        .onChange(toggleRecurrence);

    // ---  --- //

    function toggleRecurrence() {
      window.hg.controller.transientJobs.LineJob.toggleRecurrence(
          transientParams.grid,
          window.hg.LineJob.config.isRecurring,
          window.hg.LineJob.config.avgDelay,
          window.hg.LineJob.config.delayDeviationRange);
    }
  }

  function createRadiatingLinesItems(folder) {
    var data = {
      'triggerLinesRadiate': window.hg.controller.transientJobs.LinesRadiateJob.createRandom.bind(
          window.hg.controller, transientParams.grid)
    };

    folder.add(data, 'triggerLinesRadiate');

    folder.add(window.hg.LinesRadiateJob.config, 'duration', 100, 20000);
    folder.add(window.hg.LinesRadiateJob.config, 'lineWidth', 1, 100);
    folder.add(window.hg.LinesRadiateJob.config, 'lineLength', 10, 60000);
    folder.add(window.hg.LinesRadiateJob.config, 'lineSidePeriod', 5, 500);
    folder.add(window.hg.LinesRadiateJob.config, 'startSaturation', 0, 100);
    folder.add(window.hg.LinesRadiateJob.config, 'startLightness', 0, 100);
    folder.add(window.hg.LinesRadiateJob.config, 'startOpacity', 0, 1);
    folder.add(window.hg.LinesRadiateJob.config, 'endSaturation', 0, 100);
    folder.add(window.hg.LinesRadiateJob.config, 'endLightness', 0, 100);
    folder.add(window.hg.LinesRadiateJob.config, 'endOpacity', 0, 1);
    folder.add(window.hg.LinesRadiateJob.config, 'sameDirectionProb', 0, 1);

    folder.add(window.hg.LinesRadiateJob.config, 'isBlurOn');
    folder.add(window.hg.LinesRadiateJob.config, 'blurStdDeviation', 0, 80);

    folder.add(window.hg.LinesRadiateJob.config, 'isRecurring')
        .onChange(toggleRecurrence);
    folder.add(window.hg.LinesRadiateJob.config, 'avgDelay', 10, 10000)
        .onChange(toggleRecurrence);
    folder.add(window.hg.LinesRadiateJob.config, 'delayDeviationRange', 0, 10000)
        .onChange(toggleRecurrence);

    // ---  --- //

    function toggleRecurrence() {
      window.hg.controller.transientJobs.LinesRadiateJob.toggleRecurrence(
          transientParams.grid,
          window.hg.LinesRadiateJob.config.isRecurring,
          window.hg.LinesRadiateJob.config.avgDelay,
          window.hg.LinesRadiateJob.config.delayDeviationRange);
    }
  }

  function createPanItems(folder) {
    var data = {
      'triggerPan':
          window.hg.controller.transientJobs.PanJob.createRandom.bind(
              window.hg.controller, transientParams.grid)
    };

    folder.add(data, 'triggerPan');

    folder.add(window.hg.PanJob.config, 'duration', 10, 10000);

    folder.add(window.hg.PanJob.config, 'isRecurring')
        .onChange(toggleRecurrence);
    folder.add(window.hg.PanJob.config, 'avgDelay', 10, 10000)
        .onChange(toggleRecurrence);
    folder.add(window.hg.PanJob.config, 'delayDeviationRange', 0, 10000)
        .onChange(toggleRecurrence);

    // ---  --- //

    function toggleRecurrence() {
      window.hg.controller.transientJobs.PanJob.toggleRecurrence(
          transientParams.grid,
          window.hg.PanJob.config.isRecurring,
          window.hg.PanJob.config.avgDelay,
          window.hg.PanJob.config.delayDeviationRange);
    }
  }

  function createSpreadItems(folder) {
    var data = {
      'triggerSpread':
          window.hg.controller.transientJobs.SpreadJob.createRandom.bind(
              window.hg.controller, transientParams.grid)
    };

    folder.add(data, 'triggerSpread');

    folder.add(window.hg.SpreadJob.config, 'duration', 10, 10000);

    folder.add(window.hg.SpreadJob.config, 'displacementRatio', 0.01, 1);

    folder.add(window.hg.SpreadJob.config, 'isRecurring')
        .onChange(toggleRecurrence);
    folder.add(window.hg.SpreadJob.config, 'avgDelay', 10, 10000)
        .onChange(toggleRecurrence);
    folder.add(window.hg.SpreadJob.config, 'delayDeviationRange', 0, 10000)
        .onChange(toggleRecurrence);

    // ---  --- //

    function toggleRecurrence() {
      window.hg.controller.transientJobs.SpreadJob.toggleRecurrence(
          transientParams.grid,
          window.hg.SpreadJob.config.isRecurring,
          window.hg.SpreadJob.config.avgDelay,
          window.hg.SpreadJob.config.delayDeviationRange);
    }
  }

  function createTileBorderItems(folder) {
    var data = {
      'triggerTileBorder': window.hg.controller.transientJobs.TileBorderJob.createRandom.bind(
              window.hg.controller, transientParams.grid)
    };

    folder.add(data, 'triggerTileBorder');

    folder.add(window.hg.TileBorderJob.config, 'duration', 10, 10000);

    // TODO:

    folder.add(window.hg.TileBorderJob.config, 'isRecurring')
        .onChange(toggleRecurrence);
    folder.add(window.hg.TileBorderJob.config, 'avgDelay', 10, 10000)
        .onChange(toggleRecurrence);
    folder.add(window.hg.TileBorderJob.config, 'delayDeviationRange', 0, 10000)
        .onChange(toggleRecurrence);

    // ---  --- //

    function toggleRecurrence() {
      window.hg.controller.transientJobs.TileBorderJob.toggleRecurrence(
          transientParams.grid,
          window.hg.TileBorderJob.config.isRecurring,
          window.hg.TileBorderJob.config.avgDelay,
          window.hg.TileBorderJob.config.delayDeviationRange);
    }
  }

  console.log('transient-animation-parameters module loaded');
})();

/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */
var dat=dat||{};dat.gui=dat.gui||{};dat.utils=dat.utils||{};dat.controllers=dat.controllers||{};dat.dom=dat.dom||{};dat.color=dat.color||{};dat.utils.css=function(){return{load:function(e,a){var a=a||document,c=a.createElement("link");c.type="text/css";c.rel="stylesheet";c.href=e;a.getElementsByTagName("head")[0].appendChild(c)},inject:function(e,a){var a=a||document,c=document.createElement("style");c.type="text/css";c.innerHTML=e;a.getElementsByTagName("head")[0].appendChild(c)}}}();
dat.utils.common=function(){var e=Array.prototype.forEach,a=Array.prototype.slice;return{BREAK:{},extend:function(c){this.each(a.call(arguments,1),function(a){for(var f in a)this.isUndefined(a[f])||(c[f]=a[f])},this);return c},defaults:function(c){this.each(a.call(arguments,1),function(a){for(var f in a)this.isUndefined(c[f])&&(c[f]=a[f])},this);return c},compose:function(){var c=a.call(arguments);return function(){for(var d=a.call(arguments),f=c.length-1;f>=0;f--)d=[c[f].apply(this,d)];return d[0]}},
each:function(a,d,f){if(e&&a.forEach===e)a.forEach(d,f);else if(a.length===a.length+0)for(var b=0,n=a.length;b<n;b++){if(b in a&&d.call(f,a[b],b)===this.BREAK)break}else for(b in a)if(d.call(f,a[b],b)===this.BREAK)break},defer:function(a){setTimeout(a,0)},toArray:function(c){return c.toArray?c.toArray():a.call(c)},isUndefined:function(a){return a===void 0},isNull:function(a){return a===null},isNaN:function(a){return a!==a},isArray:Array.isArray||function(a){return a.constructor===Array},isObject:function(a){return a===
Object(a)},isNumber:function(a){return a===a+0},isString:function(a){return a===a+""},isBoolean:function(a){return a===false||a===true},isFunction:function(a){return Object.prototype.toString.call(a)==="[object Function]"}}}();
dat.controllers.Controller=function(e){var a=function(a,d){this.initialValue=a[d];this.domElement=document.createElement("div");this.object=a;this.property=d;this.__onFinishChange=this.__onChange=void 0};e.extend(a.prototype,{onChange:function(a){this.__onChange=a;return this},onFinishChange:function(a){this.__onFinishChange=a;return this},setValue:function(a){this.object[this.property]=a;this.__onChange&&this.__onChange.call(this,a);this.updateDisplay();return this},getValue:function(){return this.object[this.property]},
updateDisplay:function(){return this},isModified:function(){return this.initialValue!==this.getValue()}});return a}(dat.utils.common);
dat.dom.dom=function(e){function a(b){if(b==="0"||e.isUndefined(b))return 0;b=b.match(d);return!e.isNull(b)?parseFloat(b[1]):0}var c={};e.each({HTMLEvents:["change"],MouseEvents:["click","mousemove","mousedown","mouseup","mouseover"],KeyboardEvents:["keydown"]},function(b,a){e.each(b,function(b){c[b]=a})});var d=/(\d+(\.\d+)?)px/,f={makeSelectable:function(b,a){if(!(b===void 0||b.style===void 0))b.onselectstart=a?function(){return false}:function(){},b.style.MozUserSelect=a?"auto":"none",b.style.KhtmlUserSelect=
a?"auto":"none",b.unselectable=a?"on":"off"},makeFullscreen:function(b,a,d){e.isUndefined(a)&&(a=true);e.isUndefined(d)&&(d=true);b.style.position="absolute";if(a)b.style.left=0,b.style.right=0;if(d)b.style.top=0,b.style.bottom=0},fakeEvent:function(b,a,d,f){var d=d||{},m=c[a];if(!m)throw Error("Event type "+a+" not supported.");var l=document.createEvent(m);switch(m){case "MouseEvents":l.initMouseEvent(a,d.bubbles||false,d.cancelable||true,window,d.clickCount||1,0,0,d.x||d.clientX||0,d.y||d.clientY||
0,false,false,false,false,0,null);break;case "KeyboardEvents":m=l.initKeyboardEvent||l.initKeyEvent;e.defaults(d,{cancelable:true,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false,keyCode:void 0,charCode:void 0});m(a,d.bubbles||false,d.cancelable,window,d.ctrlKey,d.altKey,d.shiftKey,d.metaKey,d.keyCode,d.charCode);break;default:l.initEvent(a,d.bubbles||false,d.cancelable||true)}e.defaults(l,f);b.dispatchEvent(l)},bind:function(b,a,d,c){b.addEventListener?b.addEventListener(a,d,c||false):b.attachEvent&&
b.attachEvent("on"+a,d);return f},unbind:function(b,a,d,c){b.removeEventListener?b.removeEventListener(a,d,c||false):b.detachEvent&&b.detachEvent("on"+a,d);return f},addClass:function(b,a){if(b.className===void 0)b.className=a;else if(b.className!==a){var d=b.className.split(/ +/);if(d.indexOf(a)==-1)d.push(a),b.className=d.join(" ").replace(/^\s+/,"").replace(/\s+$/,"")}return f},removeClass:function(b,a){if(a){if(b.className!==void 0)if(b.className===a)b.removeAttribute("class");else{var d=b.className.split(/ +/),
c=d.indexOf(a);if(c!=-1)d.splice(c,1),b.className=d.join(" ")}}else b.className=void 0;return f},hasClass:function(a,d){return RegExp("(?:^|\\s+)"+d+"(?:\\s+|$)").test(a.className)||false},getWidth:function(b){b=getComputedStyle(b);return a(b["border-left-width"])+a(b["border-right-width"])+a(b["padding-left"])+a(b["padding-right"])+a(b.width)},getHeight:function(b){b=getComputedStyle(b);return a(b["border-top-width"])+a(b["border-bottom-width"])+a(b["padding-top"])+a(b["padding-bottom"])+a(b.height)},
getOffset:function(a){var d={left:0,top:0};if(a.offsetParent){do d.left+=a.offsetLeft,d.top+=a.offsetTop;while(a=a.offsetParent)}return d},isActive:function(a){return a===document.activeElement&&(a.type||a.href)}};return f}(dat.utils.common);
dat.controllers.OptionController=function(e,a,c){var d=function(f,b,e){d.superclass.call(this,f,b);var h=this;this.__select=document.createElement("select");if(c.isArray(e)){var j={};c.each(e,function(a){j[a]=a});e=j}c.each(e,function(a,b){var d=document.createElement("option");d.innerHTML=b;d.setAttribute("value",a);h.__select.appendChild(d)});this.updateDisplay();a.bind(this.__select,"change",function(){h.setValue(this.options[this.selectedIndex].value)});this.domElement.appendChild(this.__select)};
d.superclass=e;c.extend(d.prototype,e.prototype,{setValue:function(a){a=d.superclass.prototype.setValue.call(this,a);this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue());return a},updateDisplay:function(){this.__select.value=this.getValue();return d.superclass.prototype.updateDisplay.call(this)}});return d}(dat.controllers.Controller,dat.dom.dom,dat.utils.common);
dat.controllers.NumberController=function(e,a){var c=function(d,f,b){c.superclass.call(this,d,f);b=b||{};this.__min=b.min;this.__max=b.max;this.__step=b.step;d=this.__impliedStep=a.isUndefined(this.__step)?this.initialValue==0?1:Math.pow(10,Math.floor(Math.log(this.initialValue)/Math.LN10))/10:this.__step;d=d.toString();this.__precision=d.indexOf(".")>-1?d.length-d.indexOf(".")-1:0};c.superclass=e;a.extend(c.prototype,e.prototype,{setValue:function(a){if(this.__min!==void 0&&a<this.__min)a=this.__min;
else if(this.__max!==void 0&&a>this.__max)a=this.__max;this.__step!==void 0&&a%this.__step!=0&&(a=Math.round(a/this.__step)*this.__step);return c.superclass.prototype.setValue.call(this,a)},min:function(a){this.__min=a;return this},max:function(a){this.__max=a;return this},step:function(a){this.__step=a;return this}});return c}(dat.controllers.Controller,dat.utils.common);
dat.controllers.NumberControllerBox=function(e,a,c){var d=function(f,b,e){function h(){var a=parseFloat(l.__input.value);c.isNaN(a)||l.setValue(a)}function j(a){var b=o-a.clientY;l.setValue(l.getValue()+b*l.__impliedStep);o=a.clientY}function m(){a.unbind(window,"mousemove",j);a.unbind(window,"mouseup",m)}this.__truncationSuspended=false;d.superclass.call(this,f,b,e);var l=this,o;this.__input=document.createElement("input");this.__input.setAttribute("type","text");a.bind(this.__input,"change",h);
a.bind(this.__input,"blur",function(){h();l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())});a.bind(this.__input,"mousedown",function(b){a.bind(window,"mousemove",j);a.bind(window,"mouseup",m);o=b.clientY});a.bind(this.__input,"keydown",function(a){if(a.keyCode===13)l.__truncationSuspended=true,this.blur(),l.__truncationSuspended=false});this.updateDisplay();this.domElement.appendChild(this.__input)};d.superclass=e;c.extend(d.prototype,e.prototype,{updateDisplay:function(){var a=this.__input,
b;if(this.__truncationSuspended)b=this.getValue();else{b=this.getValue();var c=Math.pow(10,this.__precision);b=Math.round(b*c)/c}a.value=b;return d.superclass.prototype.updateDisplay.call(this)}});return d}(dat.controllers.NumberController,dat.dom.dom,dat.utils.common);
dat.controllers.NumberControllerSlider=function(e,a,c,d,f){var b=function(d,c,f,e,l){function o(b){b.preventDefault();var d=a.getOffset(g.__background),c=a.getWidth(g.__background);g.setValue(g.__min+(g.__max-g.__min)*((b.clientX-d.left)/(d.left+c-d.left)));return false}function y(){a.unbind(window,"mousemove",o);a.unbind(window,"mouseup",y);g.__onFinishChange&&g.__onFinishChange.call(g,g.getValue())}b.superclass.call(this,d,c,{min:f,max:e,step:l});var g=this;this.__background=document.createElement("div");
this.__foreground=document.createElement("div");a.bind(this.__background,"mousedown",function(b){a.bind(window,"mousemove",o);a.bind(window,"mouseup",y);o(b)});a.addClass(this.__background,"slider");a.addClass(this.__foreground,"slider-fg");this.updateDisplay();this.__background.appendChild(this.__foreground);this.domElement.appendChild(this.__background)};b.superclass=e;b.useDefaultStyles=function(){c.inject(f)};d.extend(b.prototype,e.prototype,{updateDisplay:function(){this.__foreground.style.width=
(this.getValue()-this.__min)/(this.__max-this.__min)*100+"%";return b.superclass.prototype.updateDisplay.call(this)}});return b}(dat.controllers.NumberController,dat.dom.dom,dat.utils.css,dat.utils.common,".slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}");
dat.controllers.FunctionController=function(e,a,c){var d=function(c,b,e){d.superclass.call(this,c,b);var h=this;this.__button=document.createElement("div");this.__button.innerHTML=e===void 0?"Fire":e;a.bind(this.__button,"click",function(a){a.preventDefault();h.fire();return false});a.addClass(this.__button,"button");this.domElement.appendChild(this.__button)};d.superclass=e;c.extend(d.prototype,e.prototype,{fire:function(){this.__onChange&&this.__onChange.call(this);this.__onFinishChange&&this.__onFinishChange.call(this,
this.getValue());this.getValue().call(this.object)}});return d}(dat.controllers.Controller,dat.dom.dom,dat.utils.common);
dat.controllers.BooleanController=function(e,a,c){var d=function(c,b){d.superclass.call(this,c,b);var e=this;this.__prev=this.getValue();this.__checkbox=document.createElement("input");this.__checkbox.setAttribute("type","checkbox");a.bind(this.__checkbox,"change",function(){e.setValue(!e.__prev)},false);this.domElement.appendChild(this.__checkbox);this.updateDisplay()};d.superclass=e;c.extend(d.prototype,e.prototype,{setValue:function(a){a=d.superclass.prototype.setValue.call(this,a);this.__onFinishChange&&
this.__onFinishChange.call(this,this.getValue());this.__prev=this.getValue();return a},updateDisplay:function(){this.getValue()===true?(this.__checkbox.setAttribute("checked","checked"),this.__checkbox.checked=true):this.__checkbox.checked=false;return d.superclass.prototype.updateDisplay.call(this)}});return d}(dat.controllers.Controller,dat.dom.dom,dat.utils.common);
dat.color.toString=function(e){return function(a){if(a.a==1||e.isUndefined(a.a)){for(a=a.hex.toString(16);a.length<6;)a="0"+a;return"#"+a}else return"rgba("+Math.round(a.r)+","+Math.round(a.g)+","+Math.round(a.b)+","+a.a+")"}}(dat.utils.common);
dat.color.interpret=function(e,a){var c,d,f=[{litmus:a.isString,conversions:{THREE_CHAR_HEX:{read:function(a){a=a.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return a===null?false:{space:"HEX",hex:parseInt("0x"+a[1].toString()+a[1].toString()+a[2].toString()+a[2].toString()+a[3].toString()+a[3].toString())}},write:e},SIX_CHAR_HEX:{read:function(a){a=a.match(/^#([A-F0-9]{6})$/i);return a===null?false:{space:"HEX",hex:parseInt("0x"+a[1].toString())}},write:e},CSS_RGB:{read:function(a){a=a.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
return a===null?false:{space:"RGB",r:parseFloat(a[1]),g:parseFloat(a[2]),b:parseFloat(a[3])}},write:e},CSS_RGBA:{read:function(a){a=a.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);return a===null?false:{space:"RGB",r:parseFloat(a[1]),g:parseFloat(a[2]),b:parseFloat(a[3]),a:parseFloat(a[4])}},write:e}}},{litmus:a.isNumber,conversions:{HEX:{read:function(a){return{space:"HEX",hex:a,conversionName:"HEX"}},write:function(a){return a.hex}}}},{litmus:a.isArray,conversions:{RGB_ARRAY:{read:function(a){return a.length!=
3?false:{space:"RGB",r:a[0],g:a[1],b:a[2]}},write:function(a){return[a.r,a.g,a.b]}},RGBA_ARRAY:{read:function(a){return a.length!=4?false:{space:"RGB",r:a[0],g:a[1],b:a[2],a:a[3]}},write:function(a){return[a.r,a.g,a.b,a.a]}}}},{litmus:a.isObject,conversions:{RGBA_OBJ:{read:function(b){return a.isNumber(b.r)&&a.isNumber(b.g)&&a.isNumber(b.b)&&a.isNumber(b.a)?{space:"RGB",r:b.r,g:b.g,b:b.b,a:b.a}:false},write:function(a){return{r:a.r,g:a.g,b:a.b,a:a.a}}},RGB_OBJ:{read:function(b){return a.isNumber(b.r)&&
a.isNumber(b.g)&&a.isNumber(b.b)?{space:"RGB",r:b.r,g:b.g,b:b.b}:false},write:function(a){return{r:a.r,g:a.g,b:a.b}}},HSVA_OBJ:{read:function(b){return a.isNumber(b.h)&&a.isNumber(b.s)&&a.isNumber(b.v)&&a.isNumber(b.a)?{space:"HSV",h:b.h,s:b.s,v:b.v,a:b.a}:false},write:function(a){return{h:a.h,s:a.s,v:a.v,a:a.a}}},HSV_OBJ:{read:function(b){return a.isNumber(b.h)&&a.isNumber(b.s)&&a.isNumber(b.v)?{space:"HSV",h:b.h,s:b.s,v:b.v}:false},write:function(a){return{h:a.h,s:a.s,v:a.v}}}}}];return function(){d=
false;var b=arguments.length>1?a.toArray(arguments):arguments[0];a.each(f,function(e){if(e.litmus(b))return a.each(e.conversions,function(e,f){c=e.read(b);if(d===false&&c!==false)return d=c,c.conversionName=f,c.conversion=e,a.BREAK}),a.BREAK});return d}}(dat.color.toString,dat.utils.common);
dat.GUI=dat.gui.GUI=function(e,a,c,d,f,b,n,h,j,m,l,o,y,g,i){function q(a,b,r,c){if(b[r]===void 0)throw Error("Object "+b+' has no property "'+r+'"');c.color?b=new l(b,r):(b=[b,r].concat(c.factoryArgs),b=d.apply(a,b));if(c.before instanceof f)c.before=c.before.__li;t(a,b);g.addClass(b.domElement,"C");r=document.createElement("span");g.addClass(r,"property-name");r.innerHTML=b.property;var e=document.createElement("div");e.appendChild(r);e.appendChild(b.domElement);c=s(a,e,c.before);g.addClass(c,k.CLASS_CONTROLLER_ROW);
g.addClass(c,typeof b.getValue());p(a,c,b);a.__controllers.push(b);return b}function s(a,b,d){var c=document.createElement("li");b&&c.appendChild(b);d?a.__ul.insertBefore(c,params.before):a.__ul.appendChild(c);a.onResize();return c}function p(a,d,c){c.__li=d;c.__gui=a;i.extend(c,{options:function(b){if(arguments.length>1)return c.remove(),q(a,c.object,c.property,{before:c.__li.nextElementSibling,factoryArgs:[i.toArray(arguments)]});if(i.isArray(b)||i.isObject(b))return c.remove(),q(a,c.object,c.property,
{before:c.__li.nextElementSibling,factoryArgs:[b]})},name:function(a){c.__li.firstElementChild.firstElementChild.innerHTML=a;return c},listen:function(){c.__gui.listen(c);return c},remove:function(){c.__gui.remove(c);return c}});if(c instanceof j){var e=new h(c.object,c.property,{min:c.__min,max:c.__max,step:c.__step});i.each(["updateDisplay","onChange","onFinishChange"],function(a){var b=c[a],H=e[a];c[a]=e[a]=function(){var a=Array.prototype.slice.call(arguments);b.apply(c,a);return H.apply(e,a)}});
g.addClass(d,"has-slider");c.domElement.insertBefore(e.domElement,c.domElement.firstElementChild)}else if(c instanceof h){var f=function(b){return i.isNumber(c.__min)&&i.isNumber(c.__max)?(c.remove(),q(a,c.object,c.property,{before:c.__li.nextElementSibling,factoryArgs:[c.__min,c.__max,c.__step]})):b};c.min=i.compose(f,c.min);c.max=i.compose(f,c.max)}else if(c instanceof b)g.bind(d,"click",function(){g.fakeEvent(c.__checkbox,"click")}),g.bind(c.__checkbox,"click",function(a){a.stopPropagation()});
else if(c instanceof n)g.bind(d,"click",function(){g.fakeEvent(c.__button,"click")}),g.bind(d,"mouseover",function(){g.addClass(c.__button,"hover")}),g.bind(d,"mouseout",function(){g.removeClass(c.__button,"hover")});else if(c instanceof l)g.addClass(d,"color"),c.updateDisplay=i.compose(function(a){d.style.borderLeftColor=c.__color.toString();return a},c.updateDisplay),c.updateDisplay();c.setValue=i.compose(function(b){a.getRoot().__preset_select&&c.isModified()&&B(a.getRoot(),true);return b},c.setValue)}
function t(a,b){var c=a.getRoot(),d=c.__rememberedObjects.indexOf(b.object);if(d!=-1){var e=c.__rememberedObjectIndecesToControllers[d];e===void 0&&(e={},c.__rememberedObjectIndecesToControllers[d]=e);e[b.property]=b;if(c.load&&c.load.remembered){c=c.load.remembered;if(c[a.preset])c=c[a.preset];else if(c[w])c=c[w];else return;if(c[d]&&c[d][b.property]!==void 0)d=c[d][b.property],b.initialValue=d,b.setValue(d)}}}function I(a){var b=a.__save_row=document.createElement("li");g.addClass(a.domElement,
"has-save");a.__ul.insertBefore(b,a.__ul.firstChild);g.addClass(b,"save-row");var c=document.createElement("span");c.innerHTML="&nbsp;";g.addClass(c,"button gears");var d=document.createElement("span");d.innerHTML="Save";g.addClass(d,"button");g.addClass(d,"save");var e=document.createElement("span");e.innerHTML="New";g.addClass(e,"button");g.addClass(e,"save-as");var f=document.createElement("span");f.innerHTML="Revert";g.addClass(f,"button");g.addClass(f,"revert");var m=a.__preset_select=document.createElement("select");
a.load&&a.load.remembered?i.each(a.load.remembered,function(b,c){C(a,c,c==a.preset)}):C(a,w,false);g.bind(m,"change",function(){for(var b=0;b<a.__preset_select.length;b++)a.__preset_select[b].innerHTML=a.__preset_select[b].value;a.preset=this.value});b.appendChild(m);b.appendChild(c);b.appendChild(d);b.appendChild(e);b.appendChild(f);if(u){var b=document.getElementById("dg-save-locally"),l=document.getElementById("dg-local-explain");b.style.display="block";b=document.getElementById("dg-local-storage");
localStorage.getItem(document.location.href+".isLocal")==="true"&&b.setAttribute("checked","checked");var o=function(){l.style.display=a.useLocalStorage?"block":"none"};o();g.bind(b,"change",function(){a.useLocalStorage=!a.useLocalStorage;o()})}var h=document.getElementById("dg-new-constructor");g.bind(h,"keydown",function(a){a.metaKey&&(a.which===67||a.keyCode==67)&&x.hide()});g.bind(c,"click",function(){h.innerHTML=JSON.stringify(a.getSaveObject(),void 0,2);x.show();h.focus();h.select()});g.bind(d,
"click",function(){a.save()});g.bind(e,"click",function(){var b=prompt("Enter a new preset name.");b&&a.saveAs(b)});g.bind(f,"click",function(){a.revert()})}function J(a){function b(f){f.preventDefault();e=f.clientX;g.addClass(a.__closeButton,k.CLASS_DRAG);g.bind(window,"mousemove",c);g.bind(window,"mouseup",d);return false}function c(b){b.preventDefault();a.width+=e-b.clientX;a.onResize();e=b.clientX;return false}function d(){g.removeClass(a.__closeButton,k.CLASS_DRAG);g.unbind(window,"mousemove",
c);g.unbind(window,"mouseup",d)}a.__resize_handle=document.createElement("div");i.extend(a.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"});var e;g.bind(a.__resize_handle,"mousedown",b);g.bind(a.__closeButton,"mousedown",b);a.domElement.insertBefore(a.__resize_handle,a.domElement.firstElementChild)}function D(a,b){a.domElement.style.width=b+"px";if(a.__save_row&&a.autoPlace)a.__save_row.style.width=b+"px";if(a.__closeButton)a.__closeButton.style.width=
b+"px"}function z(a,b){var c={};i.each(a.__rememberedObjects,function(d,e){var f={};i.each(a.__rememberedObjectIndecesToControllers[e],function(a,c){f[c]=b?a.initialValue:a.getValue()});c[e]=f});return c}function C(a,b,c){var d=document.createElement("option");d.innerHTML=b;d.value=b;a.__preset_select.appendChild(d);if(c)a.__preset_select.selectedIndex=a.__preset_select.length-1}function B(a,b){var c=a.__preset_select[a.__preset_select.selectedIndex];c.innerHTML=b?c.value+"*":c.value}function E(a){a.length!=
0&&o(function(){E(a)});i.each(a,function(a){a.updateDisplay()})}e.inject(c);var w="Default",u;try{u="localStorage"in window&&window.localStorage!==null}catch(K){u=false}var x,F=true,v,A=false,G=[],k=function(a){function b(){localStorage.setItem(document.location.href+".gui",JSON.stringify(d.getSaveObject()))}function c(){var a=d.getRoot();a.width+=1;i.defer(function(){a.width-=1})}var d=this;this.domElement=document.createElement("div");this.__ul=document.createElement("ul");this.domElement.appendChild(this.__ul);
g.addClass(this.domElement,"dg");this.__folders={};this.__controllers=[];this.__rememberedObjects=[];this.__rememberedObjectIndecesToControllers=[];this.__listening=[];a=a||{};a=i.defaults(a,{autoPlace:true,width:k.DEFAULT_WIDTH});a=i.defaults(a,{resizable:a.autoPlace,hideable:a.autoPlace});if(i.isUndefined(a.load))a.load={preset:w};else if(a.preset)a.load.preset=a.preset;i.isUndefined(a.parent)&&a.hideable&&G.push(this);a.resizable=i.isUndefined(a.parent)&&a.resizable;if(a.autoPlace&&i.isUndefined(a.scrollable))a.scrollable=
true;var e=u&&localStorage.getItem(document.location.href+".isLocal")==="true";Object.defineProperties(this,{parent:{get:function(){return a.parent}},scrollable:{get:function(){return a.scrollable}},autoPlace:{get:function(){return a.autoPlace}},preset:{get:function(){return d.parent?d.getRoot().preset:a.load.preset},set:function(b){d.parent?d.getRoot().preset=b:a.load.preset=b;for(b=0;b<this.__preset_select.length;b++)if(this.__preset_select[b].value==this.preset)this.__preset_select.selectedIndex=
b;d.revert()}},width:{get:function(){return a.width},set:function(b){a.width=b;D(d,b)}},name:{get:function(){return a.name},set:function(b){a.name=b;if(m)m.innerHTML=a.name}},closed:{get:function(){return a.closed},set:function(b){a.closed=b;a.closed?g.addClass(d.__ul,k.CLASS_CLOSED):g.removeClass(d.__ul,k.CLASS_CLOSED);this.onResize();if(d.__closeButton)d.__closeButton.innerHTML=b?k.TEXT_OPEN:k.TEXT_CLOSED}},load:{get:function(){return a.load}},useLocalStorage:{get:function(){return e},set:function(a){u&&
((e=a)?g.bind(window,"unload",b):g.unbind(window,"unload",b),localStorage.setItem(document.location.href+".isLocal",a))}}});if(i.isUndefined(a.parent)){a.closed=false;g.addClass(this.domElement,k.CLASS_MAIN);g.makeSelectable(this.domElement,false);if(u&&e){d.useLocalStorage=true;var f=localStorage.getItem(document.location.href+".gui");if(f)a.load=JSON.parse(f)}this.__closeButton=document.createElement("div");this.__closeButton.innerHTML=k.TEXT_CLOSED;g.addClass(this.__closeButton,k.CLASS_CLOSE_BUTTON);
this.domElement.appendChild(this.__closeButton);g.bind(this.__closeButton,"click",function(){d.closed=!d.closed})}else{if(a.closed===void 0)a.closed=true;var m=document.createTextNode(a.name);g.addClass(m,"controller-name");f=s(d,m);g.addClass(this.__ul,k.CLASS_CLOSED);g.addClass(f,"title");g.bind(f,"click",function(a){a.preventDefault();d.closed=!d.closed;return false});if(!a.closed)this.closed=false}a.autoPlace&&(i.isUndefined(a.parent)&&(F&&(v=document.createElement("div"),g.addClass(v,"dg"),g.addClass(v,
k.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild(v),F=false),v.appendChild(this.domElement),g.addClass(this.domElement,k.CLASS_AUTO_PLACE)),this.parent||D(d,a.width));g.bind(window,"resize",function(){d.onResize()});g.bind(this.__ul,"webkitTransitionEnd",function(){d.onResize()});g.bind(this.__ul,"transitionend",function(){d.onResize()});g.bind(this.__ul,"oTransitionEnd",function(){d.onResize()});this.onResize();a.resizable&&J(this);d.getRoot();a.parent||c()};k.toggleHide=function(){A=!A;i.each(G,
function(a){a.domElement.style.zIndex=A?-999:999;a.domElement.style.opacity=A?0:1})};k.CLASS_AUTO_PLACE="a";k.CLASS_AUTO_PLACE_CONTAINER="ac";k.CLASS_MAIN="main";k.CLASS_CONTROLLER_ROW="cr";k.CLASS_TOO_TALL="taller-than-window";k.CLASS_CLOSED="closed";k.CLASS_CLOSE_BUTTON="close-button";k.CLASS_DRAG="drag";k.DEFAULT_WIDTH=245;k.TEXT_CLOSED="Close Controls";k.TEXT_OPEN="Open Controls";g.bind(window,"keydown",function(a){document.activeElement.type!=="text"&&(a.which===72||a.keyCode==72)&&k.toggleHide()},
false);i.extend(k.prototype,{add:function(a,b){return q(this,a,b,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(a,b){return q(this,a,b,{color:true})},remove:function(a){this.__ul.removeChild(a.__li);this.__controllers.slice(this.__controllers.indexOf(a),1);var b=this;i.defer(function(){b.onResize()})},destroy:function(){this.autoPlace&&v.removeChild(this.domElement)},addFolder:function(a){if(this.__folders[a]!==void 0)throw Error('You already have a folder in this GUI by the name "'+
a+'"');var b={name:a,parent:this};b.autoPlace=this.autoPlace;if(this.load&&this.load.folders&&this.load.folders[a])b.closed=this.load.folders[a].closed,b.load=this.load.folders[a];b=new k(b);this.__folders[a]=b;a=s(this,b.domElement);g.addClass(a,"folder");return b},open:function(){this.closed=false},close:function(){this.closed=true},onResize:function(){var a=this.getRoot();if(a.scrollable){var b=g.getOffset(a.__ul).top,c=0;i.each(a.__ul.childNodes,function(b){a.autoPlace&&b===a.__save_row||(c+=
g.getHeight(b))});window.innerHeight-b-20<c?(g.addClass(a.domElement,k.CLASS_TOO_TALL),a.__ul.style.height=window.innerHeight-b-20+"px"):(g.removeClass(a.domElement,k.CLASS_TOO_TALL),a.__ul.style.height="auto")}a.__resize_handle&&i.defer(function(){a.__resize_handle.style.height=a.__ul.offsetHeight+"px"});if(a.__closeButton)a.__closeButton.style.width=a.width+"px"},remember:function(){if(i.isUndefined(x))x=new y,x.domElement.innerHTML=a;if(this.parent)throw Error("You can only call remember on a top level GUI.");
var b=this;i.each(Array.prototype.slice.call(arguments),function(a){b.__rememberedObjects.length==0&&I(b);b.__rememberedObjects.indexOf(a)==-1&&b.__rememberedObjects.push(a)});this.autoPlace&&D(this,this.width)},getRoot:function(){for(var a=this;a.parent;)a=a.parent;return a},getSaveObject:function(){var a=this.load;a.closed=this.closed;if(this.__rememberedObjects.length>0){a.preset=this.preset;if(!a.remembered)a.remembered={};a.remembered[this.preset]=z(this)}a.folders={};i.each(this.__folders,function(b,
c){a.folders[c]=b.getSaveObject()});return a},save:function(){if(!this.load.remembered)this.load.remembered={};this.load.remembered[this.preset]=z(this);B(this,false)},saveAs:function(a){if(!this.load.remembered)this.load.remembered={},this.load.remembered[w]=z(this,true);this.load.remembered[a]=z(this);this.preset=a;C(this,a,true)},revert:function(a){i.each(this.__controllers,function(b){this.getRoot().load.remembered?t(a||this.getRoot(),b):b.setValue(b.initialValue)},this);i.each(this.__folders,
function(a){a.revert(a)});a||B(this.getRoot(),false)},listen:function(a){var b=this.__listening.length==0;this.__listening.push(a);b&&E(this.__listening)}});return k}(dat.utils.css,'<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>',
".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear;border:0;position:absolute;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-x:hidden}.dg.a.has-save ul{margin-top:27px}.dg.a.has-save ul.closed{margin-top:0}.dg.a .save-row{position:fixed;top:0;z-index:1002}.dg li{-webkit-transition:height 0.1s ease-out;-o-transition:height 0.1s ease-out;-moz-transition:height 0.1s ease-out;transition:height 0.1s ease-out}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;overflow:hidden;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li > *{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:9px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n",
dat.controllers.factory=function(e,a,c,d,f,b,n){return function(h,j,m,l){var o=h[j];if(n.isArray(m)||n.isObject(m))return new e(h,j,m);if(n.isNumber(o))return n.isNumber(m)&&n.isNumber(l)?new c(h,j,m,l):new a(h,j,{min:m,max:l});if(n.isString(o))return new d(h,j);if(n.isFunction(o))return new f(h,j,"");if(n.isBoolean(o))return new b(h,j)}}(dat.controllers.OptionController,dat.controllers.NumberControllerBox,dat.controllers.NumberControllerSlider,dat.controllers.StringController=function(e,a,c){var d=
function(c,b){function e(){h.setValue(h.__input.value)}d.superclass.call(this,c,b);var h=this;this.__input=document.createElement("input");this.__input.setAttribute("type","text");a.bind(this.__input,"keyup",e);a.bind(this.__input,"change",e);a.bind(this.__input,"blur",function(){h.__onFinishChange&&h.__onFinishChange.call(h,h.getValue())});a.bind(this.__input,"keydown",function(a){a.keyCode===13&&this.blur()});this.updateDisplay();this.domElement.appendChild(this.__input)};d.superclass=e;c.extend(d.prototype,
e.prototype,{updateDisplay:function(){if(!a.isActive(this.__input))this.__input.value=this.getValue();return d.superclass.prototype.updateDisplay.call(this)}});return d}(dat.controllers.Controller,dat.dom.dom,dat.utils.common),dat.controllers.FunctionController,dat.controllers.BooleanController,dat.utils.common),dat.controllers.Controller,dat.controllers.BooleanController,dat.controllers.FunctionController,dat.controllers.NumberControllerBox,dat.controllers.NumberControllerSlider,dat.controllers.OptionController,
dat.controllers.ColorController=function(e,a,c,d,f){function b(a,b,c,d){a.style.background="";f.each(j,function(e){a.style.cssText+="background: "+e+"linear-gradient("+b+", "+c+" 0%, "+d+" 100%); "})}function n(a){a.style.background="";a.style.cssText+="background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);";a.style.cssText+="background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
a.style.cssText+="background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";a.style.cssText+="background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";a.style.cssText+="background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"}var h=function(e,l){function o(b){q(b);a.bind(window,"mousemove",q);a.bind(window,
"mouseup",j)}function j(){a.unbind(window,"mousemove",q);a.unbind(window,"mouseup",j)}function g(){var a=d(this.value);a!==false?(p.__color.__state=a,p.setValue(p.__color.toOriginal())):this.value=p.__color.toString()}function i(){a.unbind(window,"mousemove",s);a.unbind(window,"mouseup",i)}function q(b){b.preventDefault();var c=a.getWidth(p.__saturation_field),d=a.getOffset(p.__saturation_field),e=(b.clientX-d.left+document.body.scrollLeft)/c,b=1-(b.clientY-d.top+document.body.scrollTop)/c;b>1?b=
1:b<0&&(b=0);e>1?e=1:e<0&&(e=0);p.__color.v=b;p.__color.s=e;p.setValue(p.__color.toOriginal());return false}function s(b){b.preventDefault();var c=a.getHeight(p.__hue_field),d=a.getOffset(p.__hue_field),b=1-(b.clientY-d.top+document.body.scrollTop)/c;b>1?b=1:b<0&&(b=0);p.__color.h=b*360;p.setValue(p.__color.toOriginal());return false}h.superclass.call(this,e,l);this.__color=new c(this.getValue());this.__temp=new c(0);var p=this;this.domElement=document.createElement("div");a.makeSelectable(this.domElement,
false);this.__selector=document.createElement("div");this.__selector.className="selector";this.__saturation_field=document.createElement("div");this.__saturation_field.className="saturation-field";this.__field_knob=document.createElement("div");this.__field_knob.className="field-knob";this.__field_knob_border="2px solid ";this.__hue_knob=document.createElement("div");this.__hue_knob.className="hue-knob";this.__hue_field=document.createElement("div");this.__hue_field.className="hue-field";this.__input=
document.createElement("input");this.__input.type="text";this.__input_textShadow="0 1px 1px ";a.bind(this.__input,"keydown",function(a){a.keyCode===13&&g.call(this)});a.bind(this.__input,"blur",g);a.bind(this.__selector,"mousedown",function(){a.addClass(this,"drag").bind(window,"mouseup",function(){a.removeClass(p.__selector,"drag")})});var t=document.createElement("div");f.extend(this.__selector.style,{width:"122px",height:"102px",padding:"3px",backgroundColor:"#222",boxShadow:"0px 1px 3px rgba(0,0,0,0.3)"});
f.extend(this.__field_knob.style,{position:"absolute",width:"12px",height:"12px",border:this.__field_knob_border+(this.__color.v<0.5?"#fff":"#000"),boxShadow:"0px 1px 3px rgba(0,0,0,0.5)",borderRadius:"12px",zIndex:1});f.extend(this.__hue_knob.style,{position:"absolute",width:"15px",height:"2px",borderRight:"4px solid #fff",zIndex:1});f.extend(this.__saturation_field.style,{width:"100px",height:"100px",border:"1px solid #555",marginRight:"3px",display:"inline-block",cursor:"pointer"});f.extend(t.style,
{width:"100%",height:"100%",background:"none"});b(t,"top","rgba(0,0,0,0)","#000");f.extend(this.__hue_field.style,{width:"15px",height:"100px",display:"inline-block",border:"1px solid #555",cursor:"ns-resize"});n(this.__hue_field);f.extend(this.__input.style,{outline:"none",textAlign:"center",color:"#fff",border:0,fontWeight:"bold",textShadow:this.__input_textShadow+"rgba(0,0,0,0.7)"});a.bind(this.__saturation_field,"mousedown",o);a.bind(this.__field_knob,"mousedown",o);a.bind(this.__hue_field,"mousedown",
function(b){s(b);a.bind(window,"mousemove",s);a.bind(window,"mouseup",i)});this.__saturation_field.appendChild(t);this.__selector.appendChild(this.__field_knob);this.__selector.appendChild(this.__saturation_field);this.__selector.appendChild(this.__hue_field);this.__hue_field.appendChild(this.__hue_knob);this.domElement.appendChild(this.__input);this.domElement.appendChild(this.__selector);this.updateDisplay()};h.superclass=e;f.extend(h.prototype,e.prototype,{updateDisplay:function(){var a=d(this.getValue());
if(a!==false){var e=false;f.each(c.COMPONENTS,function(b){if(!f.isUndefined(a[b])&&!f.isUndefined(this.__color.__state[b])&&a[b]!==this.__color.__state[b])return e=true,{}},this);e&&f.extend(this.__color.__state,a)}f.extend(this.__temp.__state,this.__color.__state);this.__temp.a=1;var h=this.__color.v<0.5||this.__color.s>0.5?255:0,j=255-h;f.extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+"px",marginTop:100*(1-this.__color.v)-7+"px",backgroundColor:this.__temp.toString(),border:this.__field_knob_border+
"rgb("+h+","+h+","+h+")"});this.__hue_knob.style.marginTop=(1-this.__color.h/360)*100+"px";this.__temp.s=1;this.__temp.v=1;b(this.__saturation_field,"left","#fff",this.__temp.toString());f.extend(this.__input.style,{backgroundColor:this.__input.value=this.__color.toString(),color:"rgb("+h+","+h+","+h+")",textShadow:this.__input_textShadow+"rgba("+j+","+j+","+j+",.7)"})}});var j=["-moz-","-o-","-webkit-","-ms-",""];return h}(dat.controllers.Controller,dat.dom.dom,dat.color.Color=function(e,a,c,d){function f(a,
b,c){Object.defineProperty(a,b,{get:function(){if(this.__state.space==="RGB")return this.__state[b];n(this,b,c);return this.__state[b]},set:function(a){if(this.__state.space!=="RGB")n(this,b,c),this.__state.space="RGB";this.__state[b]=a}})}function b(a,b){Object.defineProperty(a,b,{get:function(){if(this.__state.space==="HSV")return this.__state[b];h(this);return this.__state[b]},set:function(a){if(this.__state.space!=="HSV")h(this),this.__state.space="HSV";this.__state[b]=a}})}function n(b,c,e){if(b.__state.space===
"HEX")b.__state[c]=a.component_from_hex(b.__state.hex,e);else if(b.__state.space==="HSV")d.extend(b.__state,a.hsv_to_rgb(b.__state.h,b.__state.s,b.__state.v));else throw"Corrupted color state";}function h(b){var c=a.rgb_to_hsv(b.r,b.g,b.b);d.extend(b.__state,{s:c.s,v:c.v});if(d.isNaN(c.h)){if(d.isUndefined(b.__state.h))b.__state.h=0}else b.__state.h=c.h}var j=function(){this.__state=e.apply(this,arguments);if(this.__state===false)throw"Failed to interpret color arguments";this.__state.a=this.__state.a||
1};j.COMPONENTS="r,g,b,h,s,v,hex,a".split(",");d.extend(j.prototype,{toString:function(){return c(this)},toOriginal:function(){return this.__state.conversion.write(this)}});f(j.prototype,"r",2);f(j.prototype,"g",1);f(j.prototype,"b",0);b(j.prototype,"h");b(j.prototype,"s");b(j.prototype,"v");Object.defineProperty(j.prototype,"a",{get:function(){return this.__state.a},set:function(a){this.__state.a=a}});Object.defineProperty(j.prototype,"hex",{get:function(){if(!this.__state.space!=="HEX")this.__state.hex=
a.rgb_to_hex(this.r,this.g,this.b);return this.__state.hex},set:function(a){this.__state.space="HEX";this.__state.hex=a}});return j}(dat.color.interpret,dat.color.math=function(){var e;return{hsv_to_rgb:function(a,c,d){var e=a/60-Math.floor(a/60),b=d*(1-c),n=d*(1-e*c),c=d*(1-(1-e)*c),a=[[d,c,b],[n,d,b],[b,d,c],[b,n,d],[c,b,d],[d,b,n]][Math.floor(a/60)%6];return{r:a[0]*255,g:a[1]*255,b:a[2]*255}},rgb_to_hsv:function(a,c,d){var e=Math.min(a,c,d),b=Math.max(a,c,d),e=b-e;if(b==0)return{h:NaN,s:0,v:0};
a=a==b?(c-d)/e:c==b?2+(d-a)/e:4+(a-c)/e;a/=6;a<0&&(a+=1);return{h:a*360,s:e/b,v:b/255}},rgb_to_hex:function(a,c,d){a=this.hex_with_component(0,2,a);a=this.hex_with_component(a,1,c);return a=this.hex_with_component(a,0,d)},component_from_hex:function(a,c){return a>>c*8&255},hex_with_component:function(a,c,d){return d<<(e=c*8)|a&~(255<<e)}}}(),dat.color.toString,dat.utils.common),dat.color.interpret,dat.utils.common),dat.utils.requestAnimationFrame=function(){return window.webkitRequestAnimationFrame||
window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1E3/60)}}(),dat.dom.CenteredDiv=function(e,a){var c=function(){this.backgroundElement=document.createElement("div");a.extend(this.backgroundElement.style,{backgroundColor:"rgba(0,0,0,0.8)",top:0,left:0,display:"none",zIndex:"1000",opacity:0,WebkitTransition:"opacity 0.2s linear"});e.makeFullscreen(this.backgroundElement);this.backgroundElement.style.position="fixed";this.domElement=
document.createElement("div");a.extend(this.domElement.style,{position:"fixed",display:"none",zIndex:"1001",opacity:0,WebkitTransition:"-webkit-transform 0.2s ease-out, opacity 0.2s linear"});document.body.appendChild(this.backgroundElement);document.body.appendChild(this.domElement);var c=this;e.bind(this.backgroundElement,"click",function(){c.hide()})};c.prototype.show=function(){var c=this;this.backgroundElement.style.display="block";this.domElement.style.display="block";this.domElement.style.opacity=
0;this.domElement.style.webkitTransform="scale(1.1)";this.layout();a.defer(function(){c.backgroundElement.style.opacity=1;c.domElement.style.opacity=1;c.domElement.style.webkitTransform="scale(1)"})};c.prototype.hide=function(){var a=this,c=function(){a.domElement.style.display="none";a.backgroundElement.style.display="none";e.unbind(a.domElement,"webkitTransitionEnd",c);e.unbind(a.domElement,"transitionend",c);e.unbind(a.domElement,"oTransitionEnd",c)};e.bind(this.domElement,"webkitTransitionEnd",
c);e.bind(this.domElement,"transitionend",c);e.bind(this.domElement,"oTransitionEnd",c);this.backgroundElement.style.opacity=0;this.domElement.style.opacity=0;this.domElement.style.webkitTransform="scale(1.1)"};c.prototype.layout=function(){this.domElement.style.left=window.innerWidth/2-e.getWidth(this.domElement)/2+"px";this.domElement.style.top=window.innerHeight/2-e.getHeight(this.domElement)/2+"px"};return c}(dat.dom.dom,dat.utils.common),dat.dom.dom,dat.utils.common);
'use strict';

/**
 * This module defines a singleton that helps coordinate the various components of the hex-grid
 * package.
 *
 * The controller singleton handles provides convenient helper functions for creating and running
 * grids and animations. It stores these objects and updates them in response to various system
 * events--e.g., window resize.
 *
 * @module controller
 */
(function () {

  var controller = {},
      config = {},
      internal = {};

  controller.persistentJobs = {
    ColorShiftJob: {
      constructorName: 'ColorShiftJob',
      jobs: [],
      create: createPersistentJob.bind(controller, 'ColorShiftJob'),
      start: restartPersistentJob.bind(controller, 'ColorShiftJob'),
      cancel: cancelPersistentJob.bind(controller, 'ColorShiftJob')
    },
    ColorWaveJob: {
      constructorName: 'ColorWaveJob',
      jobs: [],
      create: createPersistentJob.bind(controller, 'ColorWaveJob'),
      start: restartPersistentJob.bind(controller, 'ColorWaveJob'),
      cancel: cancelPersistentJob.bind(controller, 'ColorWaveJob')
    },
    DisplacementWaveJob: {
      constructorName: 'DisplacementWaveJob',
      jobs: [],
      create: createPersistentJob.bind(controller, 'DisplacementWaveJob'),
      start: restartPersistentJob.bind(controller, 'DisplacementWaveJob'),
      cancel: cancelPersistentJob.bind(controller, 'DisplacementWaveJob')
    },

    // --- For internal use --- //

    ColorResetJob: {
      constructorName: 'ColorResetJob',
      jobs: [],
      create: createPersistentJob.bind(controller, 'ColorResetJob'),
      start: restartPersistentJob.bind(controller, 'ColorResetJob'),
      cancel: cancelPersistentJob.bind(controller, 'ColorResetJob')
    },
    DisplacementResetJob: {
      constructorName: 'DisplacementResetJob',
      jobs: [],
      create: createPersistentJob.bind(controller, 'DisplacementResetJob'),
      start: restartPersistentJob.bind(controller, 'DisplacementResetJob'),
      cancel: cancelPersistentJob.bind(controller, 'DisplacementResetJob')
    }
  };

  controller.transientJobs = {
    OpenPostJob: {
      constructorName: 'OpenPostJob',
      jobs: [],
      timeouts: [],
      create: createTransientJob.bind(controller, null, 'OpenPostJob'),
      createRandom: openRandomPost,
      toggleRecurrence: toggleJobRecurrence.bind(controller, 'OpenPostJob'),
      canRunWithOpenGrid: false
    },
    ClosePostJob: {
      constructorName: 'ClosePostJob',
      jobs: [],
      timeouts: [],
      create: createTransientJob.bind(controller, null, 'ClosePostJob'),
      createRandom: closePost,
      toggleRecurrence: toggleJobRecurrence.bind(controller, 'ClosePostJob'),
      canRunWithOpenGrid: true
    },
    CarouselImageSlideJob: {
      constructorName: 'CarouselImageSlideJob',
      jobs: [],
      timeouts: [],
      create: createTransientJob.bind(controller, null, 'CarouselImageSlideJob'),
      createRandom: null,
      toggleRecurrence: null,
      canRunWithOpenGrid: true
    },
    DilateSectorsJob: {
      constructorName: 'DilateSectorsJob',
      jobs: [],
      timeouts: [],
      create: createTransientJob.bind(controller, null, 'DilateSectorsJob'),
      createRandom: null,
      toggleRecurrence: null,
      canRunWithOpenGrid: true
    },
    FadePostJob: {
      constructorName: 'FadePostJob',
      jobs: [],
      timeouts: [],
      create: createTransientJob.bind(controller, null, 'FadePostJob'),
      createRandom: null,
      toggleRecurrence: null,
      canRunWithOpenGrid: true
    },
    DisplacementRadiateJob: {
      constructorName: 'DisplacementRadiateJob',
      jobs: [],
      timeouts: [],
      create: createTransientJob.bind(controller, null, 'DisplacementRadiateJob'),
      createRandom: createTransientJobWithARandomTile.bind(controller, 'DisplacementRadiateJob'),
      toggleRecurrence: toggleJobRecurrence.bind(controller, 'DisplacementRadiateJob'),
      canRunWithOpenGrid: true
    },
    HighlightHoverJob: {
      constructorName: 'HighlightHoverJob',
      jobs: [],
      timeouts: [],
      create: createTransientJob.bind(controller, null, 'HighlightHoverJob'),
      createRandom: createTransientJobWithARandomTile.bind(controller, 'HighlightHoverJob'),
      toggleRecurrence: toggleJobRecurrence.bind(controller, 'HighlightHoverJob'),
      canRunWithOpenGrid: true
    },
    HighlightRadiateJob: {
      constructorName: 'HighlightRadiateJob',
      jobs: [],
      timeouts: [],
      create: createTransientJob.bind(controller, null, 'HighlightRadiateJob'),
      createRandom: createTransientJobWithARandomTile.bind(controller, 'HighlightRadiateJob'),
      toggleRecurrence: toggleJobRecurrence.bind(controller, 'HighlightRadiateJob'),
      canRunWithOpenGrid: true
    },
    IntraTileRadiateJob: {
      constructorName: 'IntraTileRadiateJob',
      jobs: [],
      timeouts: [],
      create: createTransientJob.bind(controller, null, 'IntraTileRadiateJob'),
      createRandom: createTransientJobWithARandomTile.bind(controller, 'IntraTileRadiateJob'),
      toggleRecurrence: toggleJobRecurrence.bind(controller, 'IntraTileRadiateJob'),
      canRunWithOpenGrid: true
    },
    LineJob: {
      constructorName: 'LineJob',
      jobs: [],
      timeouts: [],
      create: createTransientJob.bind(controller, randomLineCreator, 'LineJob'),
      createRandom: createTransientJobWithARandomTile.bind(controller, 'LineJob'),
      toggleRecurrence: toggleJobRecurrence.bind(controller, 'LineJob'),
      canRunWithOpenGrid: false
    },
    LinesRadiateJob: {
      constructorName: 'LinesRadiateJob',
      jobs: [],
      timeouts: [],
      create: createTransientJob.bind(controller, linesRadiateCreator, 'LinesRadiateJob'),
      createRandom: createTransientJobWithARandomTile.bind(controller, 'LinesRadiateJob'),
      toggleRecurrence: toggleJobRecurrence.bind(controller, 'LinesRadiateJob'),
      canRunWithOpenGrid: false
    },
    PanJob: {
      constructorName: 'PanJob',
      jobs: [],
      timeouts: [],
      create: createTransientJob.bind(controller, null, 'PanJob'),
      createRandom: createTransientJobWithARandomTile.bind(controller, 'PanJob'),
      toggleRecurrence: toggleJobRecurrence.bind(controller, 'PanJob'),
      canRunWithOpenGrid: true
    },
    SpreadJob: {
      constructorName: 'SpreadJob',
      jobs: [],
      timeouts: [],
      create: createTransientJob.bind(controller, null, 'SpreadJob'),
      createRandom: createTransientJobWithARandomTile.bind(controller, 'SpreadJob'),
      toggleRecurrence: toggleJobRecurrence.bind(controller, 'SpreadJob'),
      canRunWithOpenGrid: true
    },
    TileBorderJob: {
      constructorName: 'TileBorderJob',
      jobs: [],
      timeouts: [],
      create: createTransientJob.bind(controller, null, 'TileBorderJob'),
      createRandom: createTransientJobWithARandomTile.bind(controller, 'TileBorderJob'),
      toggleRecurrence: toggleJobRecurrence.bind(controller, 'TileBorderJob'),
      canRunWithOpenGrid: true
    }
  };

  internal.grids = [];
  internal.inputs = [];
  internal.annotations = [];
  internal.postData = [];
  internal.performanceCheckJob = true;

  controller.isLowPerformanceBrowser = false;
  controller.isSafariBrowser = false;
  controller.isIosBrowser = false;
  controller.isSmallScreen = false;

  // ------------------------------------------------------------------------------------------- //
  // Expose this singleton

  controller.config = config;

  controller.createNewHexGrid = createNewHexGrid;
  controller.resetGrid = resetGrid;
  controller.resetPersistentJobs = resetPersistentJobs;
  controller.setGridPostData = setGridPostData;
  controller.filterGridPostDataByCategory = filterGridPostDataByCategory;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.controller = controller;

  window.addEventListener('load', initController, false);

  function initController() {
    window.removeEventListener('load', initController);

    var debouncedResize = window.hg.util.debounce(resize, 300);
    window.addEventListener('resize', debouncedResize, false);
  }

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  /**
   * Starts repeating any AnimationJobs that are configured to recur.
   *
   * @param {Window.hg.Grid} grid
   */
  function startRecurringAnimations(grid) {
    Object.keys(controller.transientJobs).forEach(function (key) {
      var config = window.hg[controller.transientJobs[key].constructorName].config;

      if (config.isRecurring) {
        controller.transientJobs[key].toggleRecurrence(grid, true, config.avgDelay,
            config.delayDeviationRange);
      }
    });
  }

  /**
   * @param {String} jobId
   * @param {Grid} grid
   * @param {Tile} tile
   * @param {Function} onComplete
   * @param {*} [extraArg]
   * @returns {AnimationJob}
   */
  function generalTransientJobCreator(jobId, grid, tile, onComplete, extraArg) {
    return new window.hg[controller.transientJobs[jobId].constructorName](grid, tile, onComplete,
        extraArg);
  }

  /**
   * @param {?Function} creator
   * @param {Array.<AnimationJob>} jobId
   * @param {Grid} grid
   * @param {?Tile} tile
   * @param {*} [extraArg]
   * @returns {?AnimationJob}
   */
  function createTransientJob(creator, jobId, grid, tile, extraArg) {
    var job;

    if (!grid.isPostOpen || controller.transientJobs[jobId].canRunWithOpenGrid) {
      creator = creator || generalTransientJobCreator.bind(controller, jobId);

      // Create the job with whatever custom logic is needed for this particular type of job
      job = creator(grid, tile, onComplete, extraArg);

      // Store a reference to this job within the controller
      controller.transientJobs[jobId].jobs[grid.index].push(job);
      window.hg.animator.startJob(job);

      return job;
    } else {
      console.log('Cannot create a ' + controller.transientJobs[jobId].constructorName +
          ' while the Grid is expanded');

      return null;
    }

    // ---  --- //

    function onComplete() {
      // Destroy both references to this now-complete job
      controller.transientJobs[jobId].jobs[grid.index].splice(
          controller.transientJobs[jobId].jobs[grid.index].indexOf(job), 1);
    }
  }

  /**
   * @param {String} jobId
   * @param {Grid} grid
   * @returns {?AnimationJob}
   */
  function createTransientJobWithARandomTile(jobId, grid) {
    return controller.transientJobs[jobId].create(grid, getRandomOriginalTile(grid));
  }

  /**
   * Toggles whether an AnimationJob is automatically repeated.
   *
   * @param {String} jobId
   * @param {Grid} grid
   * @param {Boolean} isRecurring
   * @param {Number} avgDelay
   * @param {Number} delayDeviationRange
   */
  function toggleJobRecurrence(jobId, grid, isRecurring, avgDelay, delayDeviationRange) {
    var minDelay, maxDelay, actualDelayRange, jobTimeouts;

    jobTimeouts = controller.transientJobs[jobId].timeouts;

    // Compute the delay deviation range
    minDelay = avgDelay - delayDeviationRange * 0.5;
    minDelay = minDelay > 0 ? minDelay : 1;
    maxDelay = avgDelay + delayDeviationRange * 0.5;
    actualDelayRange = maxDelay - minDelay;

    // Stop any pre-existing recurrence
    if (jobTimeouts[grid.index]) {
      clearTimeout(jobTimeouts[grid.index]);
      jobTimeouts[grid.index] = null;
    }

    // Should we start the recurrence?
    if (isRecurring) {
      jobTimeouts[grid.index] = setTimeout(recur, avgDelay);
    }

    // ---  --- //

    /**
     * Creates a new occurrence of the AnimationJob and starts a new timeout to repeat this.
     */
    function recur() {
      var delay = Math.random() * actualDelayRange + minDelay;
      controller.transientJobs[jobId].createRandom(grid);
      jobTimeouts[grid.index] = setTimeout(recur, delay);
    }
  }

  /**
   * @param {String} jobId
   * @param {Grid} grid
   */
  function createPersistentJob(jobId, grid) {
    var jobDefinition, job;

    jobDefinition = controller.persistentJobs[jobId];

    job = new window.hg[jobDefinition.constructorName](grid);
    jobDefinition.jobs[grid.index].push(job);
    jobDefinition.start(grid, jobDefinition.jobs[grid.index].length - 1);
  }

  /**
   * @param {String} jobId
   * @param {Grid} grid
   * @param {Number} [jobIndex] If not given, ALL persistent jobs (of this bound type) will be
   * restarted for the given grid.
   */
  function restartPersistentJob(jobId, grid, jobIndex) {
    if (typeof jobIndex !== 'undefined') {
      window.hg.animator.startJob(controller.persistentJobs[jobId].jobs[grid.index][jobIndex]);
    } else {
      controller.persistentJobs[jobId].jobs[grid.index].forEach(window.hg.animator.startJob);
    }
  }

  /**
   * @param {String} jobId
   * @param {Grid} grid
   * @param {Number} [jobIndex] If not given, ALL persistent jobs (of this bound type) will be
   * cancelled for the given grid.
   */
  function cancelPersistentJob(jobId, grid, jobIndex) {
    if (typeof jobIndex !== 'undefined') {
      controller.persistentJobs[jobId].jobs[grid.index][jobIndex].cancel();
    } else {
      controller.persistentJobs[jobId].jobs[grid.index].forEach(function (job) {
        job.cancel();
      });
    }
  }

  /**
   * Resizes all of the hex-grid components.
   */
  function resize() {
    internal.grids.forEach(resetGrid);
  }

  /**
   * @param {Grid} grid
   * @returns {Tile}
   */
  function getRandomOriginalTile(grid) {
    var tileIndex = parseInt(Math.random() * grid.originalTiles.length);
    return grid.originalTiles[tileIndex];
  }

  /**
   * @param {Grid} grid
   * @returns {Tile}
   */
  function getRandomContentTile(grid) {
    var contentIndex = parseInt(Math.random() * grid.contentTiles.length);
    return grid.contentTiles[contentIndex];
  }

  // --- One-time-job creation functions --- //

  /**
   * @param {Grid} grid
   * @param {Tile} tile
   * @param {Function} onComplete
   * @returns {Window.hg.LineJob}
   */
  function randomLineCreator(grid, tile, onComplete) {
    return window.hg.LineJob.createRandomLineJob(grid, onComplete);
  }

  /**
   * @param {Grid} grid
   * @param {Tile} tile
   * @param {Function} onComplete
   * @returns {Window.hg.LinesRadiateJob}
   */
  function linesRadiateCreator(grid, tile, onComplete) {
    var job = new window.hg.LinesRadiateJob(grid, tile, onAllLinesComplete);

    // Also store references to each of the individual child lines
    job.lineJobs.forEach(function (lineJob) {
      controller.transientJobs.LineJob.jobs[grid.index].push(lineJob);
    });

    return job;

    // ---  --- //

    function onAllLinesComplete() {
      // Destroy the references to the individual child lines
      job.lineJobs.forEach(function (lineJob) {
        controller.transientJobs.LineJob.jobs[grid.index].splice(
            controller.transientJobs.LineJob.jobs[grid.index].indexOf(lineJob), 1);
      });

      onComplete();
    }
  }

  // --- One-time-job random creation functions --- //

  /**
   * @param {Grid} grid
   * @returns {?Window.hg.OpenPostJob}
   */
  function openRandomPost(grid) {
    // If no post is open, pick a random content tile, and open the post; otherwise, do nothing
    if (!grid.isPostOpen) {
      return controller.transientJobs.OpenPostJob.create(grid, getRandomContentTile(grid));
    } else {
      return null;
    }
  }

  /**
   * @param {Grid} grid
   * @param {Boolean} isPairedWithAnotherOpen
   * @returns {?Window.hg.ClosePostJob}
   */
  function closePost(grid, isPairedWithAnotherOpen) {
    // If a post is open, close it; otherwise, do nothing
    if (grid.isPostOpen) {
      return controller.transientJobs.ClosePostJob.create(
          grid, grid.expandedTile, isPairedWithAnotherOpen);
    } else {
      return null;
    }
  }

  // ------------------------------------------------------------------------------------------- //
  // Public static functions

  /**
   * Creates a Grid object and registers it with the animator.
   *
   * @param {HTMLElement} parent
   * @param {Array.<Object>} tileData
   * @param {Boolean} isVertical
   * @returns {Window.hg.Grid}
   */
  function createNewHexGrid(parent, tileData, isVertical) {
    var grid, index, annotations, input;

    index = internal.grids.length;

    initializeJobArraysForGrid(index);

    grid = new window.hg.Grid(index, parent, tileData, isVertical);
    internal.grids.push(grid);

    annotations = grid.annotations;
    internal.annotations.push(annotations);

    input = new window.hg.Input(grid);
    internal.inputs.push(input);

    window.hg.animator.startJob(grid);

    controller.persistentJobs.ColorResetJob.create(grid);
    controller.persistentJobs.DisplacementResetJob.create(grid);

    window.hg.animator.startJob(annotations);

    controller.persistentJobs.ColorShiftJob.create(grid);
    controller.persistentJobs.ColorWaveJob.create(grid);
    controller.persistentJobs.DisplacementWaveJob.create(grid);

    startRecurringAnimations(grid);

    handleSafariBrowser(grid);
    handleIosBrowser();
    handleSmallScreen();

    return grid;

    // ---  --- //

    function initializeJobArraysForGrid(index) {
      Object.keys(controller.persistentJobs).forEach(function (key) {
        controller.persistentJobs[key].jobs[index] = [];
      });

      Object.keys(controller.transientJobs).forEach(function (key) {
        controller.transientJobs[key].jobs[index] = [];
      });
    }
  }

  /**
   * @param {Grid} grid
   */
  function resetGrid(grid) {
    var expandedTile;
    var expandedPostId = grid.isPostOpen ? grid.expandedTile.postData.id : null;

    window.hg.animator.cancelAll();

    grid.resize();

    resetPersistentJobs(grid);

    if (expandedPostId) {
      expandedTile = getTileFromPostId(grid, expandedPostId);
      controller.transientJobs.OpenPostJob.create(grid, expandedTile);
    }

    if (internal.performanceCheckJob) {
      runPerformanceCheck();
    }

    handleSafariBrowser(grid);
    handleIosBrowser();
    handleSmallScreen();
  }

  /**
   * @param {Grid} grid
   * @param {String} postId
   */
  function getTileFromPostId(grid, postId) {
    var i, count;

    for (i = 0, count = grid.originalTiles.length; i < count; i += 1) {
      if (grid.originalTiles[i].holdsContent && grid.originalTiles[i].postData.id === postId) {
        return grid.originalTiles[i];
      }
    }

    return null;
  }

  /**
   * @param {Grid} grid
   */
  function resetPersistentJobs(grid) {
    window.hg.animator.startJob(grid);

    controller.persistentJobs.ColorResetJob.start(grid);
    controller.persistentJobs.DisplacementResetJob.start(grid);

    window.hg.animator.startJob(internal.annotations[grid.index]);

    // Don't run these persistent animations on low-performance browsers
    if (!controller.isLowPerformanceBrowser) {
      controller.persistentJobs.ColorShiftJob.start(grid);
      controller.persistentJobs.ColorWaveJob.start(grid);
      controller.persistentJobs.DisplacementWaveJob.start(grid);
    }
  }

  /**
   * @param {Grid} grid
   */
  function stopPersistentJobsForLowPerformanceBrowser(grid) {
    controller.persistentJobs.ColorShiftJob.cancel(grid);
    controller.persistentJobs.ColorWaveJob.cancel(grid);
    controller.persistentJobs.DisplacementWaveJob.cancel(grid);
  }

  /**
   * @param {Grid} grid
   * @param {Array.<PostData>} postData
   */
  function setGridPostData(grid, postData) {
    internal.postData[grid.index] = postData;

    setGridFilteredPostData(grid, postData);

    openPostForHash(grid);
  }

  /**
   * @param {Grid} grid
   * @param {String} category A value of 'all' will match all categories.
   */
  function filterGridPostDataByCategory(grid, category) {
    var matches;
    var postData = internal.postData[grid.index];

    if (category !== 'all') {
      matches = postData.filter(function (postDatum) {
        return postDatum.categories.indexOf(category) >= 0;
      });
    } else {
      matches = postData.slice(0);
    }

    setGridFilteredPostData(grid, matches);
  }

  /**
   * @param {Grid} grid
   * @param {Array.<PostData>} postData
   */
  function setGridFilteredPostData(grid, postData) {
    //TODO: check that these resets are correct
    grid.isPostOpen = false;
    grid.pagePost = null;
    grid.isTransitioning = false;
    grid.expandedTile = null;
    grid.sectors = null;
    grid.allNonContentTiles = null;

    grid.postData = postData;

    grid.computeContentIndices();

    resetGrid(grid);
  }

  /**
   * @param {Grid} grid
   */
  function openPostForHash(grid) {
    if (location.hash.length > 1) {
      var tile = getTileFromPostId(grid, location.hash.substr(1));
      if (tile) {
        internal.inputs[0].createClickAnimation(grid, tile);
      }
    }
  }

  /**
   * @param {Grid} grid
   */
  function handleSafariBrowser(grid) {
    if (window.hg.util.checkForSafari()) {
      console.info('Is a Safari browser');

      controller.isSafariBrowser = true;

      // Safari browsers do not recognize pointer events on SVG children that overflow the SVG container
      grid.svg.style.width = grid.parent.offsetWidth + 'px';
      grid.svg.style.height = grid.parent.offsetHeight + 'px';
    }
  }

  function handleIosBrowser() {
    if (window.hg.util.checkForIos()) {
      console.info('Is an iOS browser');

      controller.isIosBrowser = true;
    }
  }

  function handleSmallScreen() {
    if (document.documentElement.clientWidth < 1250) {
      console.info('Is a small-screen browser');
      controller.isSmallScreen = true;
    } else {
      controller.isSmallScreen = false;
    }
  }

  function handleLowPerformanceBrowser() {
    window.hg.util.requestAnimationFrame(function () {
      controller.isLowPerformanceBrowser = true;

      internal.grids.forEach(stopPersistentJobsForLowPerformanceBrowser);

      resize();

      displayLowPerformanceMessage();
    });

    // ---  --- //

    function displayLowPerformanceMessage() {
      console.info('Is a low-performance browser');

      var messagePanel = document.createElement('div');
      var body = document.getElementsByTagName('body')[0];
      body.appendChild(messagePanel);

      messagePanel.innerHTML = 'Switching to low-performance mode.';
      messagePanel.style.zIndex = 5000;
      messagePanel.style.position = 'absolute';
      messagePanel.style.top = '0';
      messagePanel.style.right = '0';
      messagePanel.style.bottom = '0';
      messagePanel.style.left = '0';
      messagePanel.style.width = '70%';
      messagePanel.style.height = '70%';
      messagePanel.style.margin = 'auto';
      messagePanel.style.padding = '5%';
      messagePanel.style.fontSize = '5em';
      messagePanel.style.fontWeight = 'bold';
      messagePanel.style.opacity = '1';
      messagePanel.style.color = 'white';
      messagePanel.style.backgroundColor = 'rgba(60,0,0,0.6)';
      window.hg.util.setTransition(messagePanel, 'opacity 1s linear 1.5s');

      setTimeout(function () {
        messagePanel.style.opacity = '0';

        setTimeout(function () {
          body.removeChild(messagePanel);
        }, 2500);
      }, 10);
    }
  }

  function runPerformanceCheck() {
    var maxRatioOfMaxDeltaTimeFrames = 0.25;
    var numberOfFramesToCheck = 20;

    var frameCount, maxDeltaTimeFrameCount;

    internal.performanceCheckJob = {
      start: function (startTime) {
        frameCount = 0;
        maxDeltaTimeFrameCount = 0;
        internal.performanceCheckJob.startTime = startTime;
        internal.performanceCheckJob.isComplete = false;
      },
      update: function (currentTime, deltaTime) {
        frameCount++;

        // Does the current frame fail the speed test?
        if (deltaTime >= window.hg.animator.config.deltaTimeUpperThreshold) {
          maxDeltaTimeFrameCount++;
        }

        // Has the performance check finished?
        if (frameCount >= numberOfFramesToCheck) {
          internal.performanceCheckJob.isComplete = true;
          internal.performanceCheckJob = null;

          console.info('--- PERFORMANCE DIAGNOSTICS ---');
          console.info('maxDeltaTimeFrameCount',maxDeltaTimeFrameCount);
          console.info('frameCount',frameCount);
          console.info('-------------------------------');

          // Did the overall performance test fail?
          if (maxDeltaTimeFrameCount / frameCount > maxRatioOfMaxDeltaTimeFrames) {
            handleLowPerformanceBrowser();
          }
        }
      },
      draw: function () {},
      cancel: function () {},
      init: function () {},
      isComplete: true
    };

    // Run this on the next frame so that some of the setup noise from the current early frame is ignored
    window.hg.util.requestAnimationFrame(function () {
      window.hg.animator.startJob(internal.performanceCheckJob);
    });
  }

  console.log('controller module loaded');
})();

/**
 * This module defines a collection of static general utility functions.
 *
 * @module util
 */
(function () {
  /**
   * Adds an event listener for each of the given events to each of the given elements.
   *
   * @param {Array.<HTMLElement>} elements The elements to add event listeners to.
   * @param {Array.<String>} events The event listeners to add to the elements.
   * @param {Function} callback The single callback for handling the events.
   */
  function listenToMultipleForMultiple(elements, events, callback) {
    elements.forEach(function (element) {
      events.forEach(function (event) {
        util.listen(element, event, callback);
      });
    });
  }

  /**
   * Creates a DOM element with the given tag name, appends it to the given parent element, and
   * gives it the given id and classes.
   *
   * @param {String} tagName The tag name to give the new element.
   * @param {HTMLElement} [parent] The parent element to append the new element to.
   * @param {String} [id] The id to give the new element.
   * @param {Array.<String>} [classes] The classes to give the new element.
   * @returns {HTMLElement} The new element.
   */
  function createElement(tagName, parent, id, classes) {
    var element = document.createElement(tagName);
    if (parent) {
      parent.appendChild(element);
    }
    if (id) {
      element.id = id;
    }
    if (classes) {
      classes.forEach(function (className) {
        addClass(element, className)
      });
    }
    return element;
  }

  /**
   * Determines whether the given element contains the given class.
   *
   * @param {HTMLElement} element The element to check.
   * @param {String} className The class to check for.
   * @returns {Boolean} True if the element does contain the class.
   */
  function containsClass(element, className) {
    var startIndex, indexAfterEnd;
    startIndex = element.className.indexOf(className);
    if (startIndex >= 0) {
      if (startIndex === 0 || element.className[startIndex - 1] === ' ') {
        indexAfterEnd = startIndex + className.length;
        if (indexAfterEnd === element.className.length ||
            element.className[indexAfterEnd] === ' ') {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Toggles whether the given element has the given class. If the enabled argument is given, then
   * the inclusion of the class will be forced. That is, if enabled=true, then this will ensure the
   * element has the class; if enabled=false, then this will ensure the element does NOT have the
   * class; if enabled=undefined, then this will simply toggle whether the element has the class.
   *
   * @param {HTMLElement} element The element to add the class to or remove the class from.
   * @param {String} className The class to add or remove.
   * @param {Boolean} [enabled] If given, then the inclusion of the class will be forced.
   */
  function toggleClass(element, className, enabled) {
    if (typeof enabled === 'undefined') {
      if (containsClass(element, className)) {
        removeClass(element, className);
      } else {
        addClass(element, className);
      }
    } else if (enabled) {
      addClass(element, className);
    } else {
      removeClass(element, className);
    }
  }

  /**
   * Gets the coordinates of the element relative to the top-left corner of the page.
   *
   * @param {HTMLElement} element The element to get the coordinates of.
   * @returns {{x: Number, y: Number}} The coordinates of the element relative to the top-left
   * corner of the page.
   */
  function getPageOffset(element) {
    var x = 0, y = 0;
    while (element) {
      x += element.offsetLeft;
      y += element.offsetTop;
      element = element.offsetParent;
    }
    x -= util.getScrollLeft();
    y -= util.getScrollTop();
    return { x: x, y: y };
  }

  /**
   * Gets the dimensions of the viewport.
   *
   * @returns {{w: Number, h: Number}} The dimensions of the viewport.
   */
  function getViewportSize() {
    var w, h;
    if (typeof window.innerWidth !== 'undefined') {
      // Good browsers
      w = window.innerWidth;
      h = window.innerHeight;
    } else if (typeof document.documentElement !== 'undefined' &&
        typeof document.documentElement.clientWidth !== 'undefined' &&
        document.documentElement.clientWidth !== 0) {
      // IE6 in standards compliant mode
      w = document.documentElement.clientWidth;
      h = document.documentElement.clientHeight;
    } else {
      // Older versions of IE
      w = document.getElementsByTagName('body')[0].clientWidth;
      h = document.getElementsByTagName('body')[0].clientHeight;
    }
    return { w: w, h: h };
  }

  /**
   * Removes the given child element from the given parent element if the child does indeed belong
   * to the parent.
   *
   * @param {HTMLElement} parent The parent to remove the child from.
   * @param {HTMLElement} child The child to remove.
   * @returns {Boolean} True if the child did indeed belong to the parent.
   */
  function removeChildIfPresent(parent, child) {
    if (child && child.parentNode === parent) {
      parent.removeChild(child);
      return true;
    }
    return false
  }

  /**
   * Adds the given class to the given element.
   *
   * @param {HTMLElement} element The element to add the class to.
   * @param {String} className The class to add.
   */
  function addClass(element, className) {
    element.setAttribute('class', element.className + ' ' + className);
  }

  /**
   * Removes the given class from the given element.
   *
   * @param {HTMLElement} element The element to remove the class from.
   * @param {String} className The class to remove.
   */
  function removeClass(element, className) {
    element.setAttribute('class', element.className.split(' ').filter(function (value) {
      return value !== className;
    }).join(' '));
  }

  /**
   * Removes all classes from the given element.
   *
   * @param {HTMLElement} element The element to remove all classes from.
   */
  function clearClasses(element) {
    element.className = '';
  }

  /**
   * Calculates the width that the DOM would give to a div with the given text. The given tag
   * name, parent, id, and classes allow the width to be affected by various CSS rules.
   *
   * @param {String} text The text to determine the width of.
   * @param {String} tagName The tag name this text would supposedly have.
   * @param {HTMLElement} [parent] The parent this text would supposedly be a child of; defaults
   * to the document body.
   * @param {String} [id] The id this text would supposedly have.
   * @param {Array.<String>} [classes] The classes this text would supposedly have.
   * @returns {Number} The width of the text under these conditions.
   */
  function getTextWidth(text, tagName, parent, id, classes) {
    var tmpElement, width;
    parent = parent || document.getElementsByTagName('body')[0];
    tmpElement = util.createElement(tagName, null, id, classes);
    tmpElement.style.position = 'absolute';
    tmpElement.style.visibility = 'hidden';
    tmpElement.style.whiteSpace = 'nowrap';
    parent.appendChild(tmpElement);
    tmpElement.innerHTML = text;
    width = tmpElement.clientWidth;
    parent.removeChild(tmpElement);
    return width;
  }

  /**
   * Encodes and concatenates the given URL parameters into a single query string.
   *
   * @param {Object} rawParams An object whose properties represent the URL query string
   * parameters.
   * @return {String} The query string.
   */
  function encodeQueryString(rawParams) {
    var parameter, encodedParams;
    encodedParams = [];
    for (parameter in rawParams) {
      if (rawParams.hasOwnProperty(parameter)) {
        encodedParams.push(encodeURIComponent(parameter) + '=' +
            encodeURIComponent(rawParams[parameter]));
      }
    }
    return '?' + encodedParams.join('&');
  }

  /**
   * Retrieves the value corresponding to the given name from the given query string.
   *
   * (borrowed from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript)
   *
   * @param {String} queryString The query string containing the parameter.
   * @param {String} name The (non-encoded) name of the parameter value to retrieve.
   * @returns {String} The query string parameter value, or null if the parameter was not found.
   */
  function getQueryStringParameterValue(queryString, name) {
    var regex, results;
    name = encodeURIComponent(name);
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    regex = new RegExp('[\\?&]' + name + '=([^&#]*)', 'i');
    results = regex.exec(queryString);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  /**
   * Sets the CSS transition style of the given element.
   *
   * @param {HTMLElement} element The element.
   * @param {Number} value The transition string.
   */
  function setTransition(element, value) {
    element.style.transition = value;
    element.style.WebkitTransition = value;
    element.style.MozTransition = value;
    element.style.msTransition = value;
    element.style.OTransition = value;
  }

  /**
   * Sets the CSS transition duration style of the given element.
   *
   * @param {HTMLElement} element The element.
   * @param {Number} value The duration.
   */
  function setTransitionDurationSeconds(element, value) {
    element.style.transitionDuration = value + 's';
    element.style.WebkitTransitionDuration = value + 's';
    element.style.MozTransitionDuration = value + 's';
    element.style.msTransitionDuration = value + 's';
    element.style.OTransitionDuration = value + 's';
  }

  /**
   * Sets the CSS transition delay style of the given element.
   *
   * @param {HTMLElement} element The element.
   * @param {Number} value The delay.
   */
  function setTransitionDelaySeconds(element, value) {
    element.style.transitionDelay = value + 's';
    element.style.WebkitTransitionDelay = value + 's';
    element.style.MozTransitionDelay = value + 's';
    element.style.msTransitionDelay = value + 's';
    element.style.OTransitionDelay = value + 's';
  }

  /**
   * Sets the userSelect style of the given element to 'none'.
   *
   * @param {HTMLElement} element
   */
  function setUserSelectNone(element) {
    element.style.userSelect = 'none';
    element.style.webkitUserSelect = 'none';
    element.style.MozUserSelect = 'none';
    element.style.msUserSelect = 'none';
  }

  /**
   * Removes any children elements from the given parent that have the given class.
   *
   * @param {HTMLElement} parent The parent to remove children from.
   * @param {String} className The class to match.
   */
  function removeChildrenWithClass(parent, className) {
    var matchingChildren, i, count;

    matchingChildren = parent.querySelectorAll('.' + className);

    for (i = 0, count = matchingChildren.length; i < count; i++) {
      parent.removeChild(matchingChildren[i]);
    }
  }

  /**
   * Sets the CSS transition-timing-function style of the given element with the given cubic-
   * bezier points.
   *
   * @param {HTMLElement} element The element.
   * @param {{p1x: Number, p1y: Number, p2x: Number, p2y: Number}} bezierPts The cubic-bezier
   * points to use for this timing function.
   */
  function setTransitionCubicBezierTimingFunction(element, bezierPts) {
    var value = 'cubic-bezier(' + bezierPts.p1x + ',' + bezierPts.p1y + ',' + bezierPts.p2x + ',' +
        bezierPts.p2y + ')';
    element.style.transitionTimingFunction = value;
    element.style.WebkitTransitionTimingFunction = value;
    element.style.MozTransitionTimingFunction = value;
    element.style.msTransitionTimingFunction = value;
    element.style.OTransitionTimingFunction = value;
  }

  // A collection of different types of easing functions.
  var easingFunctions = {
    linear: function (t) {
      return t;
    },
    easeInQuad: function (t) {
      return t * t;
    },
    easeOutQuad: function (t) {
      return t * (2 - t);
    },
    easeInOutQuad: function (t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    easeInCubic: function (t) {
      return t * t * t;
    },
    easeOutCubic: function (t) {
      return 1 + --t * t * t;
    },
    easeInOutCubic: function (t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    easeInQuart: function (t) {
      return t * t * t * t;
    },
    easeOutQuart: function (t) {
      return 1 - --t * t * t * t;
    },
    easeInOutQuart: function (t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    },
    easeInQuint: function (t) {
      return t * t * t * t * t;
    },
    easeOutQuint: function (t) {
      return 1 + --t * t * t * t * t;
    },
    easeInOutQuint: function (t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
    }
  };

  // A collection of the inverses of different types of easing functions.
  var inverseEasingFunctions = {
    linear: function (t) {
      return t;
    },
    easeInQuad: function (t) {
      return Math.sqrt(t);
    },
    easeOutQuad: function (t) {
      return 1 - Math.sqrt(1 - t);
    },
    easeInOutQuad: function (t) {
      return t < 0.5 ? Math.sqrt(t * 0.5) : 1 - 0.70710678 * Math.sqrt(1 - t);
    }
  };

  /**
   * A cross-browser compatible requestAnimationFrame. From
   * https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
   *
   * @type {Function}
   */
  var requestAnimationFrame =
      (window.requestAnimationFrame || // the standard
      window.webkitRequestAnimationFrame || // chrome/safari
      window.mozRequestAnimationFrame || // firefox
      window.oRequestAnimationFrame || // opera
      window.msRequestAnimationFrame || // ie
      function (callback) { // default
        window.setTimeout(callback, 16); // 60fps
      }).bind(window);

  /**
   * Calculates the x and y coordinates represented by the given Bezier curve at the given
   * percentage.
   *
   * @param {Number} percent Expressed as a number between 0 and 1.
   * @param {Array.<{x:Number,y:Number}>} controlPoints
   * @returns {{x:Number,y:Number}}
   */
  function getXYFromPercentWithBezier(percent, controlPoints) {
    var x, y, oneMinusPercent, tmp1, tmp2, tmp3, tmp4;

    oneMinusPercent = 1 - percent;
    tmp1 = oneMinusPercent * oneMinusPercent * oneMinusPercent;
    tmp2 = 3 * percent * oneMinusPercent * oneMinusPercent;
    tmp3 = 3 * percent * percent * oneMinusPercent;
    tmp4 = percent * percent * percent;

    x = controlPoints[0].x * tmp1 +
        controlPoints[1].x * tmp2 +
        controlPoints[2].x * tmp3 +
        controlPoints[3].x * tmp4;
    y = controlPoints[0].y * tmp1 +
        controlPoints[1].y * tmp2 +
        controlPoints[2].y * tmp3 +
        controlPoints[3].y * tmp4;

    return {x: x, y: y};
  }

  /**
   * Applies the given transform to the given element as a CSS style in a cross-browser compatible
   * manner.
   *
   * @param {HTMLElement} element
   * @param {String} transform
   */
  function setTransform(element, transform) {
    element.style.webkitTransform = transform;
    element.style.MozTransform = transform;
    element.style.msTransform = transform;
    element.style.OTransform = transform;
    element.style.transform = transform;
  }

  /**
   * Returns a copy of the given array with its contents re-arranged in a random order.
   *
   * The original array is left in its original order.
   *
   * @param {Array} array
   * @returns {Array}
   */
  function shuffle(array) {
    var i, j, count, temp;

    for (i = 0, count = array.length; i < count; i += 1) {
      j = parseInt(Math.random() * count);
      temp = array[j];
      array[j] = array[i];
      array[i] = temp;
    }

    return array;
  }

  /**
   * Return true if the given point would be located within the given polyline if its two ends
   * were connected.
   *
   * If the given boolean is true, then the given polyline is interpreted as being a polygon--i.e.
   * the first and last points are equivalent.
   *
   * This is an implementation of the even-odd rule algorithm.
   *
   * @param {Number} pointX
   * @param {Number} pointY
   * @param {Array.<Number>} coordinates
   * @param {Boolean} isClosed
   */
  function isPointInsidePolyline(pointX, pointY, coordinates, isClosed) {
    var pointIsInside, i, count, p1X, p1Y, p2X, p2Y, previousX, previousY, currentX, currentY;

    pointIsInside = false;

    if (isClosed) {
      // There is no area within a straight line
      if (coordinates.length < 6) {
        return pointIsInside;
      }

      previousX = coordinates[coordinates.length - 4];
      previousY = coordinates[coordinates.length - 3];
    } else {
      // There is no area within a straight line
      if (coordinates.length < 4) {
        return pointIsInside;
      }

      previousX = coordinates[coordinates.length - 2];
      previousY = coordinates[coordinates.length - 1];
    }

    for (i = 0, count = coordinates.length - 2; i < count; i += 2) {
      currentX = coordinates[i];
      currentY = coordinates[i + 1];

      if (currentX > previousX) {
        p1X = previousX;
        p1Y = previousY;
        p2X = currentX;
        p2Y = currentY;
      } else {
        p1X = currentX;
        p1Y = currentY;
        p2X = previousX;
        p2Y = previousY;
      }

      if ((currentX < pointX) === (pointX <= previousX) &&
          (pointY - p1Y) * (p2X - p1X) < (p2Y - p1Y) * (pointX - p1X)) {
        pointIsInside = !pointIsInside;
      }

      previousX = currentX;
      previousY = currentY;
    }

    return pointIsInside;
  }

  /**
   * Performs a shallow copy of the given object.
   *
   * This only copies enumerable properties.
   *
   * @param {Object} object
   * @returns {Object}
   */
  function shallowCopy(object) {
    var key, cloneObject;

    if (typeof object === 'object') {
      cloneObject = {};

      for (key in object) {
        cloneObject[key] = object[key];
      }

      return cloneObject;
    } else {
      return object;
    }
  }

  /**
   * Performs a deep copy of the given object.
   *
   * This only copies enumerable properties.
   *
   * @param {Object} object
   * @returns {Object}
   */
  function deepCopy(object) {
    var key, cloneObject;

    if (typeof object === 'object') {
      // Hack: Not a good/robust copy policy
      if (object instanceof Array) {
        cloneObject = [];
      } else {
        cloneObject = {};
      }

      for (key in object) {
        if (typeof object[key] === 'object') {
          cloneObject[key] = deepCopy(object[key]);
        } else {
          cloneObject[key] = object[key];
        }
      }

      return cloneObject;
    } else {
      return object;
    }
  }

  /**
   * Converts the given HSL color values to HSV color values.
   *
   * @param {{h:Number,s:Number,l:Number}} hsl
   * @returns {{h:Number,s:Number,v:Number}}
   */
  function hslToHsv(hsl) {
    var temp = hsl.s * (hsl.l < 0.5 ? hsl.l : 1 - hsl.l);
    return {
      h: hsl.h,
      s: 2 * temp / (hsl.l + temp),
      v: hsl.l + temp
    };
  }

  /**
   * Converts the given HSV color values to HSL color values.
   *
   * @param {{h:Number,s:Number,v:Number}} hsv
   * @returns {{h:Number,s:Number,l:Number}}
   */
  function hsvToHsl(hsv) {
    var temp = (2 - hsv.s) * hsv.v;
    return {
      h: hsv.h,
      s: hsv.s * hsv.v / (temp < 1 ? temp : 2.00000001 - temp),
      l: temp * 0.5
    };
  }

  /**
   * @param {String} hex
   * @returns {{r:Number,g:Number,b:Number}}
   */
  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);
    return {
      r: r,
      g: g,
      b: b,
    }
  }

  /**
   * @param {{r:Number,g:Number,b:Number}} rgb
   * @returns {{h:Number,s:Number,l:Number}}
   */
  function rgbToHsl(rgb) {
    var r = rgb.r / 255;
    var g = rgb.g / 255;
    var b = rgb.b / 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = (max + min) / 2;
    var s = (max + min) / 2;
    var l = (max + min) / 2;

    if (max === min) {
      h = 0;
      s = 0;
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    h = Math.round(360 * h);
    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    l = Math.round(l);
    return {
      h: h,
      s: s,
      l: l,
    }
  }

  /**
   * @param {Number} value
   * @param {Number} min
   * @param {Number} max
   * #returns {Number}
   */
  function clamp(value, min, max) {
    return Math.max(Math.min(value, max), min);
  }

  /**
   * Checks the given element and all of its ancestors, and returns the first that contains the
   * given class.
   *
   * @param {?HTMLElement} element
   * @param {String} className
   * @returns {?HTMLElement}
   */
  function findClassInSelfOrAncestors(element, className) {
    while (element) {
      if (window.hg.util.containsClass(element, className)) {
        return element;
      }
    }

    return null;
  }

  var utilStyleSheet;

  /**
   * Adds the given style rule to a style sheet for the current document.
   *
   * @param {String} styleRule
   */
  function addRuleToStyleSheet(styleRule) {
    // Create the custom style sheet if it doesn't already exist
    if (!utilStyleSheet) {
      utilStyleSheet = document.createElement('style');
      document.getElementsByTagName('head')[0].appendChild(utilStyleSheet);
    }

    // Add the given rule to the custom style sheet
    if (utilStyleSheet.styleSheet) {
      utilStyleSheet.styleSheet.cssText = styleRule;
    } else {
      utilStyleSheet.appendChild(document.createTextNode(styleRule));
    }
  }

  function checkForSafari() {
    return /Safari/i.test(window.navigator.userAgent) && !/Chrome/i.test(window.navigator.userAgent);
  }

  function checkForIos() {
    return /iPhone|iPod|iPad/i.test(window.navigator.userAgent);
  }

  /**
   * Taken from Underscore.js.
   *
   * Returns a function, that, as long as it continues to be invoked, will not be triggered. The function will be
   * called after it stops being called for N milliseconds. If immediate is passed, trigger the function on the
   * leading edge, instead of the trailing.
   *
   * @param {Function} fn
   * @param {Number} delay
   * @param {Boolean} [immediate]
   * @returns {Function}
   */
  function debounce(fn, delay, immediate) {
    var timeout;

    return function () {
      var context = this;
      var args = arguments;
      var callNow = immediate && !timeout;

      var later = function () {
        timeout = null;
        if (!immediate) {
          fn.apply(context, args);
        }
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, delay);

      if (callNow) {
        fn.apply(context, args);
      }
    };
  }

  /**
   * @returns {Boolean}
   */
  function isSmallScreen() {
    return window.innerWidth < 660;
  }

  // ------------------------------------------------------------------------------------------- //
  // Expose this module

  /**
   * Exposes the static util functions.
   *
   * @global
   */
  var util = {
    listenToMultipleForMultiple: listenToMultipleForMultiple,
    createElement: createElement,
    containsClass: containsClass,
    toggleClass: toggleClass,
    getPageOffset: getPageOffset,
    getViewportSize: getViewportSize,
    removeChildIfPresent: removeChildIfPresent,
    addClass: addClass,
    removeClass: removeClass,
    clearClasses: clearClasses,
    getTextWidth: getTextWidth,
    encodeQueryString: encodeQueryString,
    getQueryStringParameterValue: getQueryStringParameterValue,
    setTransition: setTransition,
    setTransitionDurationSeconds: setTransitionDurationSeconds,
    setTransitionDelaySeconds: setTransitionDelaySeconds,
    setUserSelectNone: setUserSelectNone,
    removeChildrenWithClass: removeChildrenWithClass,
    setTransitionCubicBezierTimingFunction: setTransitionCubicBezierTimingFunction,
    easingFunctions: easingFunctions,
    inverseEasingFunctions: inverseEasingFunctions,
    requestAnimationFrame: requestAnimationFrame,
    getXYFromPercentWithBezier: getXYFromPercentWithBezier,
    setTransform: setTransform,
    shuffle: shuffle,
    isPointInsidePolyline: isPointInsidePolyline,
    shallowCopy: shallowCopy,
    deepCopy: deepCopy,
    hsvToHsl: hsvToHsl,
    hslToHsv: hslToHsv,
    hexToRgb: hexToRgb,
    rgbToHsl: rgbToHsl,
    clamp: clamp,
    findClassInSelfOrAncestors: findClassInSelfOrAncestors,
    addRuleToStyleSheet: addRuleToStyleSheet,
    checkForSafari: checkForSafari,
    checkForIos: checkForIos,
    debounce: debounce,
    isSmallScreen: isSmallScreen,
    svgNamespace: 'http://www.w3.org/2000/svg',
    xlinkNamespace: 'http://www.w3.org/1999/xlink'
  };

  // Expose this module
  window.hg = window.hg || {};
  window.hg.util = util;

  console.log('util module loaded');
})();

/**
 * This module defines a singleton for animating things.
 *
 * The animator singleton handles the animation loop for the application and updates all
 * registered AnimationJobs during each animation frame.
 *
 * @module animator
 */
(function () {
  /**
   * @typedef {{start: Function, update: Function(Number, Number), draw: Function, cancel: Function, init: Function, isComplete: Boolean}} AnimationJob
   */

  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var animator = {};
  var config = {};

  config.deltaTimeUpperThreshold = 160;

  // ------------------------------------------------------------------------------------------- //
  // Expose this singleton

  animator.jobs = [];
  animator.previousTime = window.performance && window.performance.now() || 0;
  animator.isLooping = false;
  animator.isPaused = true;
  animator.startJob = startJob;
  animator.cancelJob = cancelJob;
  animator.cancelAll = cancelAll;

  animator.config = config;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.animator = animator;

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  /**
   * This is the animation loop that drives all of the animation.
   *
   * @param {Number} currentTime
   */
  function animationLoop(currentTime) {
    var deltaTime = currentTime - animator.previousTime;
    deltaTime = deltaTime > config.deltaTimeUpperThreshold ?
        config.deltaTimeUpperThreshold : deltaTime;
    animator.isLooping = true;

    if (!animator.isPaused) {
      updateJobs(currentTime, deltaTime);
      drawJobs();
      window.hg.util.requestAnimationFrame(animationLoop);
    } else {
      animator.isLooping = false;
    }

    animator.previousTime = currentTime;
  }

  /**
   * Updates all of the active AnimationJobs.
   *
   * @param {Number} currentTime
   * @param {Number} deltaTime
   */
  function updateJobs(currentTime, deltaTime) {
    var i, count;

    for (i = 0, count = animator.jobs.length; i < count; i += 1) {
      animator.jobs[i].update(currentTime, deltaTime);

      // Remove jobs from the list after they are complete
      if (animator.jobs[i].isComplete) {
        removeJob(animator.jobs[i], i);
        i--;
        count--;
      }
    }
  }

  /**
   * Removes the given job from the collection of active, animating jobs.
   *
   * @param {AnimationJob} job
   * @param {Number} [index]
   */
  function removeJob(job, index) {
    var count;

    if (typeof index === 'number') {
      animator.jobs.splice(index, 1);
    } else {
      for (index = 0, count = animator.jobs.length; index < count; index += 1) {
        if (animator.jobs[index] === job) {
          animator.jobs.splice(index, 1);
          break;
        }
      }
    }

    // Stop the animation loop when there are no more jobs to animate
    if (animator.jobs.length === 0) {
      animator.isPaused = true;
    }
  }

  /**
   * Draws all of the active AnimationJobs.
   */
  function drawJobs() {
    var i, count;

    for (i = 0, count = animator.jobs.length; i < count; i += 1) {
      animator.jobs[i].draw();
    }
  }

  /**
   * Starts the animation loop if it is not already running
   */
  function startAnimationLoop() {
    animator.isPaused = false;

    if (!animator.isLooping) {
      animator.isLooping = true;
      window.hg.util.requestAnimationFrame(firstAnimationLoop);
    }

    // ---  --- //

    /**
     * The time value provided by requestAnimationFrame appears to be the number of milliseconds since the page loaded.
     * However, the rest of the application logic expects time values relative to the Unix epoch. This bootstrapping
     * function helps in translating from the one time frame to the other.
     *
     * @param {Number} currentTime
     */
    function firstAnimationLoop(currentTime) {
      animator.previousTime = currentTime;

      window.hg.util.requestAnimationFrame(animationLoop);
    }
  }

  // ------------------------------------------------------------------------------------------- //
  // Public static functions

  /**
   * Starts the given AnimationJob.
   *
   * @param {AnimationJob} job
   */
  function startJob(job) {
    // Is this a restart?
    if (!job.isComplete) {
      console.log('Job restarting: ' + job.constructor.name);

      if (job.refresh) {
        job.refresh();
      } else {
        job.cancel();

        job.init();// TODO: get rid of this init function
        job.start(animator.previousTime);
      }
    } else {
      console.log('Job starting: ' + job.constructor.name);

      job.init();// TODO: get rid of this init function
      job.start(animator.previousTime);
      animator.jobs.push(job);
    }

    startAnimationLoop();
  }

  /**
   * Cancels the given AnimationJob.
   *
   * @param {AnimationJob} job
   */
  function cancelJob(job) {
    console.log('Job cancelling: ' + job.constructor.name);

    job.cancel();
    removeJob(job);
  }

  /**
   * Cancels all running AnimationJobs.
   */
  function cancelAll() {
    while (animator.jobs.length) {
      cancelJob(animator.jobs[0]);
    }
  }

  console.log('animator module loaded');
})();

/**
 * @typedef {AnimationJob} Annotations
 */

/**
 * This module defines a constructor for Annotations objects.
 *
 * Annotations objects creates and modifies visual representations of various aspects of a
 * Grid. This can be very useful for testing purposes.
 *
 * @module Annotations
 */
(function () {
  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var config = {};

  config.forceLineLengthMultiplier = 4000;
  config.velocityLineLengthMultiplier = 300;

  config.contentTileHue = 187;
  config.contentTileSaturation = 50;
  config.contentTileLightness = 30;

  config.borderTileHue = 267;
  config.borderTileSaturation = 0;
  config.borderTileLightness = 30;

  config.cornerTileHue = 267;
  config.cornerTileSaturation = 50;
  config.cornerTileLightness = 30;

  config.annotations = {
    'tileNeighborConnections': {
      enabled: false,
      create: createTileNeighborConnections,
      destroy: destroyTileNeighborConnections,
      update: updateTileNeighborConnections,
      priority: 1300
    },
    'tileAnchorCenters': {
      enabled: false,
      create: createTileAnchorCenters,
      destroy: destroyTileAnchorCenters,
      update: updateTileAnchorCenters,
      priority: 500
    },
    'transparentTiles': {
      enabled: false,
      create: makeTilesTransparent,
      destroy: makeTilesVisible,
      update: function () {},
      priority: 400
    },
    'tileIndices': {
      enabled: false,
      create: createTileIndices,
      destroy: destroyTileIndices,
      update: updateTileIndices,
      priority: 1000
    },
    'tileForces': {
      enabled: false,
      create: createTileForces,
      destroy: destroyTileForces,
      update: updateTileForces,
      priority: 1100
    },
    'tileVelocities': {
      enabled: false,
      create: createTileVelocities,
      destroy: destroyTileVelocities,
      update: updateTileVelocities,
      priority: 1200
    },
    'sectorColors': {
      enabled: false,
      create: fillSectorColors,
      destroy: function () {},
      update: fillSectorColors,
      priority: 0
    },
    'borderTiles': {
      enabled: false,
      create: fillBorderTiles,
      destroy: function () {},
      update: fillBorderTiles,
      priority: 200
    },
    'contentTiles': {// TODO: remove this?
      enabled: false,
      create: fillContentTiles,
      destroy: function () {},
      update: fillContentTiles,
      priority: 100
    },
    'cornerTiles': {
      enabled: false,
      create: fillCornerTiles,
      destroy: function () {},
      update: fillCornerTiles,
      priority: 300
    },
    'tileParticleCenters': {
      enabled: false,
      create: createTileParticleCenters,
      destroy: destroyTileParticleCenters,
      update: updateTileParticleCenters,
      priority: 600
    },
    'tileDisplacementColors': {
      enabled: false,
      create: createTileDisplacementColors,
      destroy: destroyTileDisplacementColors,
      update: updateTileDisplacementColors,
      priority: 700
    },
    'tileInnerRadii': {
      enabled: false,
      create: createTileInnerRadii,
      destroy: destroyTileInnerRadii,
      update: updateTileInnerRadii,
      priority: 800
    },
    'tileOuterRadii': {
      enabled: false,
      create: createTileOuterRadii,
      destroy: destroyTileOuterRadii,
      update: updateTileOuterRadii,
      priority: 900
    },
    'contentAreaGuidelines': {
      enabled: false,
      create: drawContentAreaGuideLines,
      destroy: removeContentAreaGuideLines,
      update:  function () {},
      priority: 1400
    },
    'lineAnimationGapPoints': {
      enabled: false,
      create: function () {},
      destroy: destroyLineAnimationGapPoints,
      update:  updateLineAnimationGapPoints,
      priority: 1500
    },
    'lineAnimationCornerData': {
      enabled: false,
      create: function () {},
      destroy: destroyLineAnimationCornerConfigurations,
      update:  updateLineAnimationCornerConfigurations,
      priority: 1600
    },
    'panCenterPoints': {
      enabled: false,
      create: createPanCenterPoints,
      destroy: destroyPanCenterPoints,
      update: updatePanCenterPoints,
      priority: 1700
    },
    'sectorAnchorCenters': {
      enabled: false,
      create: createSectorAnchorCenters,
      destroy: destroySectorAnchorCenters,
      update: updateSectorAnchorCenters,
      priority: 1800
    }
  };

  config.annotationsArray = [];

  //  --- Dependent parameters --- //

  config.computeDependentValues = function () {
    config.annotationsArray = Object.keys(config.annotations).map(function (key) {
      return config.annotations[key];
    });

    config.annotationsArray.sort(function comparator(a, b) {
      return a.priority - b.priority;
    });
  };

  config.computeDependentValues();

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @constructor
   * @param {Grid} grid
   */
  function Annotations(grid) {
    var annotations = this;

    annotations.grid = grid;
    annotations.startTime = 0;
    annotations.isComplete = true;
    annotations.annotations = window.hg.util.shallowCopy(config.annotations);

    annotations.contentAreaGuideLines = [];
    annotations.tileParticleCenters = [];
    annotations.tileAnchorLines = [];
    annotations.tileAnchorCenters = [];
    annotations.tileDisplacementCircles = [];
    annotations.tileInnerRadii = [];
    annotations.tileOuterRadii = [];
    annotations.neighborLines = [];
    annotations.forceLines = [];
    annotations.velocityLines = [];
    annotations.indexTexts = [];
    annotations.lineAnimationGapDots = [];
    annotations.lineAnimationSelfCornerDots = [];
    annotations.lineAnimationLowerNeighborCornerDots = [];
    annotations.lineAnimationUpperNeighborCornerDots = [];
    annotations.sectorAnchorLines = [];
    annotations.sectorAnchorCenters = [];

    annotations.originalGridCenterDot = null;
    annotations.currentGridCenterDot = null;
    annotations.panCenterDot = null;

    annotations.toggleAnnotationEnabled = toggleAnnotationEnabled;
    annotations.createAnnotations = createAnnotations;
    annotations.destroyAnnotations = destroyAnnotations;
    annotations.setExpandedAnnotations = setExpandedAnnotations;

    annotations.start = start;
    annotations.update = update;
    annotations.draw = draw;
    annotations.cancel = cancel;
    annotations.init = init;
    annotations.refresh = refresh;
  }

  Annotations.config = config;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.Annotations = Annotations;

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  // --------------------------------------------------- //
  // Annotation creation functions

  /**
   * Draws content tiles with a different color.
   *
   * @this Annotations
   */
  function fillContentTiles() {
    var annotations, i, count;

    annotations = this;

    for (i = 0, count = annotations.grid.originalTiles.length; i < count; i += 1) {
      if (annotations.grid.originalTiles[i].holdsContent) {
        annotations.grid.originalTiles[i].currentColor.h = config.contentTileHue;
        annotations.grid.originalTiles[i].currentColor.s = config.contentTileSaturation;
        annotations.grid.originalTiles[i].currentColor.l = config.contentTileLightness;
      }
    }
  }

  /**
   * Draws border tiles with a different color.
   *
   * @this Annotations
   */
  function fillBorderTiles() {
    var annotations, i, count;

    annotations = this;

    for (i = 0, count = annotations.grid.allTiles.length; i < count; i += 1) {
      if (annotations.grid.allTiles[i].getIsBorderTile()) {
        annotations.grid.allTiles[i].currentColor.h = config.borderTileHue;
        annotations.grid.allTiles[i].currentColor.s = config.borderTileSaturation;
        annotations.grid.allTiles[i].currentColor.l = config.borderTileLightness;
      }
    }
  }

  /**
   * Draws corner tiles with a different color.
   *
   * @this Annotations
   */
  function fillCornerTiles() {
    var annotations, i, count;

    annotations = this;

    for (i = 0, count = annotations.grid.originalBorderTiles.length; i < count; i += 1) {
      if (annotations.grid.originalBorderTiles[i].isCornerTile) {
        annotations.grid.originalTiles[i].currentColor.h = config.cornerTileHue;
        annotations.grid.originalTiles[i].currentColor.s = config.cornerTileSaturation;
        annotations.grid.originalTiles[i].currentColor.l = config.cornerTileLightness;
      }
    }
  }

  /**
   * Draws all of the tiles as transparent.
   *
   * @this Annotations
   */
  function makeTilesTransparent() {
    var annotations, i, count;

    annotations = this;

    for (i = 0, count = annotations.grid.allTiles.length; i < count; i += 1) {
      annotations.grid.allTiles[i].element.setAttribute('opacity', '0');
    }
  }

  /**
   * Draws vertical guidelines along the left and right sides of the main content area.
   *
   * @this Annotations
   */
  function drawContentAreaGuideLines() {
    var annotations, line;

    annotations = this;
    annotations.contentAreaGuideLines = [];

    line = document.createElementNS(window.hg.util.svgNamespace, 'line');
    annotations.grid.svg.appendChild(line);
    annotations.contentAreaGuideLines[0] = line;

    line.setAttribute('x1', annotations.grid.contentAreaLeft);
    line.setAttribute('y1', 0);
    line.setAttribute('x2', annotations.grid.contentAreaLeft);
    line.setAttribute('y2', annotations.grid.height);
    line.setAttribute('stroke', 'red');
    line.setAttribute('stroke-width', '2');

    line = document.createElementNS(window.hg.util.svgNamespace, 'line');
    annotations.grid.svg.appendChild(line);
    annotations.contentAreaGuideLines[1] = line;

    line.setAttribute('x1', annotations.grid.contentAreaRight);
    line.setAttribute('y1', 0);
    line.setAttribute('x2', annotations.grid.contentAreaRight);
    line.setAttribute('y2', annotations.grid.height);
    line.setAttribute('stroke', 'red');
    line.setAttribute('stroke-width', '2');
  }

  /**
   * Creates a dot at the center of each tile at its current position.
   *
   * @this Annotations
   */
  function createTileParticleCenters() {
    var annotations, i, count;

    annotations = this;
    annotations.tileParticleCenters = [];

    for (i = 0, count = annotations.grid.allTiles.length; i < count; i += 1) {
      annotations.tileParticleCenters[i] =
          document.createElementNS(window.hg.util.svgNamespace, 'circle');
      annotations.grid.svg.appendChild(annotations.tileParticleCenters[i]);

      annotations.tileParticleCenters[i].setAttribute('r', '4');
      annotations.tileParticleCenters[i].setAttribute('fill', 'gray');
    }
  }

  /**
   * Creates a dot at the center of each tile at its currentAnchor position.
   *
   * @this Annotations
   */
  function createTileAnchorCenters() {
    var annotations, i, count;

    annotations = this;
    annotations.tileAnchorLines = [];
    annotations.tileAnchorCenters = [];

    for (i = 0, count = annotations.grid.allTiles.length; i < count; i += 1) {
      annotations.tileAnchorLines[i] =
          document.createElementNS(window.hg.util.svgNamespace, 'line');
      annotations.grid.svg.appendChild(annotations.tileAnchorLines[i]);

      annotations.tileAnchorLines[i].setAttribute('stroke', '#666666');
      annotations.tileAnchorLines[i].setAttribute('stroke-width', '2');

      annotations.tileAnchorCenters[i] =
          document.createElementNS(window.hg.util.svgNamespace, 'circle');
      annotations.grid.svg.appendChild(annotations.tileAnchorCenters[i]);

      annotations.tileAnchorCenters[i].setAttribute('r', '4');
      annotations.tileAnchorCenters[i].setAttribute('fill', '#888888');
    }
  }

  /**
   * Creates a circle over each tile at its currentAnchor position, which will be used to show colors
   * that indicate its displacement from its original position.
   *
   * @this Annotations
   */
  function createTileDisplacementColors() {
    var annotations, i, count;

    annotations = this;
    annotations.tileDisplacementCircles = [];

    for (i = 0, count = annotations.grid.allTiles.length; i < count; i += 1) {
      annotations.tileDisplacementCircles[i] =
          document.createElementNS(window.hg.util.svgNamespace, 'circle');
      annotations.grid.svg.appendChild(annotations.tileDisplacementCircles[i]);

      annotations.tileDisplacementCircles[i].setAttribute('r', '80');
      annotations.tileDisplacementCircles[i].setAttribute('opacity', '0.4');
      annotations.tileDisplacementCircles[i].setAttribute('fill', 'white');
    }
  }

  /**
   * Creates the inner radius of each tile.
   *
   * @this Annotations
   */
  function createTileInnerRadii() {
    var annotations, i, count;

    annotations = this;
    annotations.tileInnerRadii = [];

    for (i = 0, count = annotations.grid.allTiles.length; i < count; i += 1) {
      annotations.tileInnerRadii[i] =
          document.createElementNS(window.hg.util.svgNamespace, 'circle');
      annotations.grid.svg.appendChild(annotations.tileInnerRadii[i]);

      annotations.tileInnerRadii[i].setAttribute('stroke', 'blue');
      annotations.tileInnerRadii[i].setAttribute('stroke-width', '1');
      annotations.tileInnerRadii[i].setAttribute('fill', 'transparent');
    }
  }

  /**
   * Creates the outer radius of each tile.
   *
   * @this Annotations
   */
  function createTileOuterRadii() {
    var annotations, i, count;

    annotations = this;
    annotations.tileOuterRadii = [];

    for (i = 0, count = annotations.grid.allTiles.length; i < count; i += 1) {
      annotations.tileOuterRadii[i] =
          document.createElementNS(window.hg.util.svgNamespace, 'circle');
      annotations.grid.svg.appendChild(annotations.tileOuterRadii[i]);

      annotations.tileOuterRadii[i].setAttribute('stroke', 'green');
      annotations.tileOuterRadii[i].setAttribute('stroke-width', '1');
      annotations.tileOuterRadii[i].setAttribute('fill', 'transparent');
    }
  }

  /**
   * Creates lines connecting each tile to each of its neighborStates.
   *
   * @this Annotations
   */
  function createTileNeighborConnections() {
    var annotations, i, j, iCount, jCount, tile, neighborStates, neighbor;

    annotations = this;
    annotations.neighborLines = [];

    for (i = 0, iCount = annotations.grid.allTiles.length; i < iCount; i += 1) {
      tile = annotations.grid.allTiles[i];
      neighborStates = tile.getNeighborStates();
      annotations.neighborLines[i] = [];

      for (j = 0, jCount = neighborStates.length; j < jCount; j += 1) {
        neighbor = neighborStates[j];

        if (neighbor) {
          annotations.neighborLines[i][j] =
              document.createElementNS(window.hg.util.svgNamespace, 'line');
          annotations.grid.svg.appendChild(annotations.neighborLines[i][j]);

          annotations.neighborLines[i][j].setAttribute('stroke', 'purple');
          annotations.neighborLines[i][j].setAttribute('stroke-width', '1');
        }
      }
    }
  }

  /**
   * Creates lines representing the cumulative force acting on each tile.
   *
   * @this Annotations
   */
  function createTileForces() {
    var annotations, i, count;

    annotations = this;
    annotations.forceLines = [];

    for (i = 0, count = annotations.grid.allTiles.length; i < count; i += 1) {
      annotations.forceLines[i] = document.createElementNS(window.hg.util.svgNamespace, 'line');
      annotations.grid.svg.appendChild(annotations.forceLines[i]);

      annotations.forceLines[i].setAttribute('stroke', 'orange');
      annotations.forceLines[i].setAttribute('stroke-width', '2');
    }
  }

  /**
   * Creates lines representing the velocity of each tile.
   *
   * @this Annotations
   */
  function createTileVelocities() {
    var annotations, i, count;

    annotations = this;
    annotations.velocityLines = [];

    for (i = 0, count = annotations.grid.allTiles.length; i < count; i += 1) {
      annotations.velocityLines[i] = document.createElementNS(window.hg.util.svgNamespace, 'line');
      annotations.grid.svg.appendChild(annotations.velocityLines[i]);

      annotations.velocityLines[i].setAttribute('stroke', 'red');
      annotations.velocityLines[i].setAttribute('stroke-width', '2');
    }
  }

  /**
   * Creates the index of each tile.
   *
   * @this Annotations
   */
  function createTileIndices() {
    var annotations, i, count;

    annotations = this;
    annotations.indexTexts = [];

    for (i = 0, count = annotations.grid.allTiles.length; i < count; i += 1) {
      annotations.indexTexts[i] = document.createElementNS(window.hg.util.svgNamespace, 'text');
      annotations.indexTexts[i].innerHTML =
          !isNaN(annotations.grid.allTiles[i].originalIndex) ? annotations.grid.allTiles[i].originalIndex : '?';
      annotations.grid.svg.appendChild(annotations.indexTexts[i]);

      annotations.indexTexts[i].setAttribute('font-size', '16');
      annotations.indexTexts[i].setAttribute('fill', 'black');
      annotations.indexTexts[i].setAttribute('pointer-events', 'none');
    }
  }

  /**
   * Draws the tiles of each Sector with a different color.
   *
   * @this Annotations
   */
  function fillSectorColors() {
    var annotations, i, iCount, j, jCount, sector, sectorHue;

    annotations = this;

    for (i = 0, iCount = annotations.grid.sectors.length; i < iCount; i += 1) {
      sector = annotations.grid.sectors[i];
      sectorHue = 60 * i + 20;

      for (j = 0, jCount = sector.tiles.length; j < jCount; j += 1) {
        sector.tiles[j].currentColor.h = sectorHue;
        sector.tiles[j].currentColor.s = window.hg.Grid.config.tileSaturation;
        sector.tiles[j].currentColor.l = window.hg.Grid.config.tileLightness;
      }
    }
  }

  /**
   * Creates a dot at the center of the grid, the center of the viewport, and highlights the base tile for the current
   * pan.
   *
   * @this Annotations
   */
  function createPanCenterPoints() {
    var annotations;

    annotations = this;

    // Current grid center dot
    annotations.currentGridCenterDot = document.createElementNS(window.hg.util.svgNamespace, 'circle');
    annotations.grid.svg.appendChild(annotations.currentGridCenterDot);

    annotations.currentGridCenterDot.setAttribute('r', '8');
    annotations.currentGridCenterDot.setAttribute('fill', 'chartreuse');

    // Current pan center dot
    annotations.panCenterDot = document.createElementNS(window.hg.util.svgNamespace, 'circle');
    annotations.grid.svg.appendChild(annotations.panCenterDot);

    annotations.panCenterDot.setAttribute('r', '5');
    annotations.panCenterDot.setAttribute('fill', 'red');

    // Original grid center dot
    annotations.originalGridCenterDot = document.createElementNS(window.hg.util.svgNamespace, 'circle');
    annotations.grid.svg.appendChild(annotations.originalGridCenterDot);

    annotations.originalGridCenterDot.setAttribute('r', '2');
    annotations.originalGridCenterDot.setAttribute('fill', 'yellow');
  }

  /**
   * Creates a dot at the anchor position of each sector.
   *
   * @this Annotations
   */
  function createSectorAnchorCenters() {
    var annotations, i;

    annotations = this;
    annotations.sectorAnchorLines = [];
    annotations.sectorAnchorCenters = [];

    for (i = 0; i < annotations.grid.sectors.length; i += 1) {
      annotations.sectorAnchorLines[i] =
          document.createElementNS(window.hg.util.svgNamespace, 'line');
      annotations.grid.svg.appendChild(annotations.sectorAnchorLines[i]);

      annotations.sectorAnchorLines[i].setAttribute('stroke', '#999999');
      annotations.sectorAnchorLines[i].setAttribute('stroke-width', '2');

      annotations.sectorAnchorCenters[i] =
          document.createElementNS(window.hg.util.svgNamespace, 'circle');
      annotations.grid.svg.appendChild(annotations.sectorAnchorCenters[i]);

      annotations.sectorAnchorCenters[i].setAttribute('r', '5');
      annotations.sectorAnchorCenters[i].setAttribute('fill', '#BBBBBB');
    }
  }

  // --------------------------------------------------- //
  // Annotation destruction functions

  /**
   * Draws all of the tiles as transparent.
   *
   * @this Annotations
   */
  function makeTilesVisible() {
    var annotations, i, count;

    annotations = this;

    for (i = 0, count = annotations.grid.originalTiles.length; i < count; i += 1) {
      annotations.grid.originalTiles[i].element.setAttribute('opacity', '1');
    }
  }

  /**
   * Draws vertical guidelines along the left and right sides of the main content area.
   *
   * @this Annotations
   */
  function removeContentAreaGuideLines() {
    var annotations, i, count;

    annotations = this;

    for (i = 0, count = annotations.contentAreaGuideLines.length; i < count; i += 1) {
      annotations.grid.svg.removeChild(annotations.contentAreaGuideLines[i]);
    }

    annotations.contentAreaGuideLines = [];
  }

  /**
   * Destroys a dot at the center of each tile at its current position.
   *
   * @this Annotations
   */
  function destroyTileParticleCenters() {
    var annotations, i, count;

    annotations = this;

    for (i = 0, count = annotations.tileParticleCenters.length; i < count; i += 1) {
      annotations.grid.svg.removeChild(annotations.tileParticleCenters[i]);
    }

    annotations.tileParticleCenters = [];
  }

  /**
   * Destroys a dot at the center of each tile at its currentAnchor position.
   *
   * @this Annotations
   */
  function destroyTileAnchorCenters() {
    var annotations, i, count;

    annotations = this;

    for (i = 0, count = annotations.tileAnchorLines.length; i < count; i += 1) {
      annotations.grid.svg.removeChild(annotations.tileAnchorLines[i]);
      annotations.grid.svg.removeChild(annotations.tileAnchorCenters[i]);
    }

    annotations.tileAnchorLines = [];
    annotations.tileAnchorCenters = [];
  }

  /**
   * Destroys a circle over each tile at its currentAnchor position, which will be used to show colors
   * that indicate its displacement from its original position.
   *
   * @this Annotations
   */
  function destroyTileDisplacementColors() {
    var annotations, i, count;

    annotations = this;

    for (i = 0, count = annotations.tileDisplacementCircles.length; i < count; i += 1) {
      annotations.grid.svg.removeChild(annotations.tileDisplacementCircles[i]);
    }

    annotations.tileDisplacementCircles = [];
  }

  /**
   * Destroys the inner radius of each tile.
   *
   * @this Annotations
   */
  function destroyTileInnerRadii() {
    var annotations, i, count;

    annotations = this;

    for (i = 0, count = annotations.tileInnerRadii.length; i < count; i += 1) {
      annotations.grid.svg.removeChild(annotations.tileInnerRadii[i]);
    }

    annotations.tileInnerRadii = [];
  }

  /**
   * Destroys the outer radius of each tile.
   *
   * @this Annotations
   */
  function destroyTileOuterRadii() {
    var annotations, i, count;

    annotations = this;

    for (i = 0, count = annotations.tileOuterRadii.length; i < count; i += 1) {
      annotations.grid.svg.removeChild(annotations.tileOuterRadii[i]);
    }

    annotations.tileOuterRadii = [];
  }

  /**
   * Destroys lines connecting each tile to each of its neighborStates.
   *
   * @this Annotations
   */
  function destroyTileNeighborConnections() {
    var annotations, i, j, iCount, jCount;

    annotations = this;

    for (i = 0, iCount = annotations.neighborLines.length; i < iCount; i += 1) {
      for (j = 0, jCount = annotations.neighborLines[i].length; j < jCount; j += 1) {
        if (annotations.neighborLines[i][j]) {
          annotations.grid.svg.removeChild(annotations.neighborLines[i][j]);
        }
      }
    }

    annotations.neighborLines = [];
  }

  /**
   * Destroys lines representing the cumulative force acting on each tile.
   *
   * @this Annotations
   */
  function destroyTileForces() {
    var annotations, i, count;

    annotations = this;

    for (i = 0, count = annotations.forceLines.length; i < count; i += 1) {
      annotations.grid.svg.removeChild(annotations.forceLines[i]);
    }

    annotations.forceLines = [];
  }

  /**
   * Destroys lines representing the velocity of each tile.
   *
   * @this Annotations
   */
  function destroyTileVelocities() {
    var annotations, i, count;

    annotations = this;

    for (i = 0, count = annotations.velocityLines.length; i < count; i += 1) {
      annotations.grid.svg.removeChild(annotations.velocityLines[i]);
    }

    annotations.velocityLines = [];
  }

  /**
   * Destroys the index of each tile.
   *
   * @this Annotations
   */
  function destroyTileIndices() {
    var annotations, i, count;

    annotations = this;

    for (i = 0, count = annotations.indexTexts.length; i < count; i += 1) {
      annotations.grid.svg.removeChild(annotations.indexTexts[i]);
    }

    annotations.indexTexts = [];
  }

  /**
   * Destroys the dots at the positions of each corner gap point of each line animation.
   *
   * @this Annotations
   */
  function destroyLineAnimationGapPoints() {
    var annotations, i, count;

    annotations = this;

    for (i = 0, count = annotations.lineAnimationGapDots.length; i < count; i += 1) {
      annotations.grid.svg.removeChild(annotations.lineAnimationGapDots[i]);
    }

    annotations.lineAnimationGapDots = [];
  }

  /**
   * Destroys annotations describing the corner configurations of each line animation.
   *
   * @this Annotations
   */
  function destroyLineAnimationCornerConfigurations() {
    var annotations, i, count;

    annotations = this;

    for (i = 0, count = annotations.lineAnimationSelfCornerDots.length; i < count; i += 1) {
      annotations.grid.svg.removeChild(annotations.lineAnimationSelfCornerDots[i]);
    }

    for (i = 0, count = annotations.lineAnimationLowerNeighborCornerDots.length;
         i < count; i += 1) {
      annotations.grid.svg.removeChild(annotations.lineAnimationLowerNeighborCornerDots[i]);
    }

    for (i = 0, count = annotations.lineAnimationUpperNeighborCornerDots.length;
         i < count; i += 1) {
      annotations.grid.svg.removeChild(annotations.lineAnimationUpperNeighborCornerDots[i]);
    }

    annotations.lineAnimationSelfCornerDots = [];
    annotations.lineAnimationLowerNeighborCornerDots = [];
    annotations.lineAnimationUpperNeighborCornerDots = [];
  }

  /**
   * Destroys the dots at the center of the grid and the center of the viewport and stops highlighting the base tile
   * for the current pan.
   *
   * @this Annotations
   */
  function destroyPanCenterPoints() {
    var annotations;

    annotations = this;

    if (annotations.originalGridCenterDot) {
      annotations.grid.svg.removeChild(annotations.originalGridCenterDot);
      annotations.grid.svg.removeChild(annotations.currentGridCenterDot);
      annotations.grid.svg.removeChild(annotations.panCenterDot);

      annotations.originalGridCenterDot = null;
      annotations.currentGridCenterDot = null;
      annotations.panCenterDot = null;
    }
  }

  /**
   * Destroys a dot at the anchor position of each sector.
   *
   * @this Annotations
   */
  function destroySectorAnchorCenters() {
    var annotations, i;

    annotations = this;

    for (i = 0; i < annotations.sectorAnchorLines.length; i += 1) {
      annotations.grid.svg.removeChild(annotations.sectorAnchorLines[i]);
      annotations.grid.svg.removeChild(annotations.sectorAnchorCenters[i]);
    }

    annotations.sectorAnchorLines = [];
    annotations.sectorAnchorCenters = [];
  }

  // --------------------------------------------------- //
  // Annotation updating functions

  /**
   * Updates a dot at the center of each tile at its current position.
   *
   * @this Annotations
   */
  function updateTileParticleCenters() {
    var annotations, i, count;

    annotations = this;

    for (i = 0, count = annotations.grid.allTiles.length; i < count; i += 1) {
      annotations.tileParticleCenters[i].setAttribute('cx', annotations.grid.allTiles[i].particle.px);
      annotations.tileParticleCenters[i].setAttribute('cy', annotations.grid.allTiles[i].particle.py);
    }
  }

  /**
   * Updates a dot at the center of each tile at its currentAnchor position.
   *
   * @this Annotations
   */
  function updateTileAnchorCenters() {
    var annotations, i, count;

    annotations = this;

    for (i = 0, count = annotations.grid.allTiles.length; i < count; i += 1) {
      annotations.tileAnchorLines[i].setAttribute('x1', annotations.grid.allTiles[i].particle.px);
      annotations.tileAnchorLines[i].setAttribute('y1', annotations.grid.allTiles[i].particle.py);
      annotations.tileAnchorLines[i].setAttribute('x2', annotations.grid.allTiles[i].currentAnchor.x);
      annotations.tileAnchorLines[i].setAttribute('y2', annotations.grid.allTiles[i].currentAnchor.y);
      annotations.tileAnchorCenters[i].setAttribute('cx', annotations.grid.allTiles[i].currentAnchor.x);
      annotations.tileAnchorCenters[i].setAttribute('cy', annotations.grid.allTiles[i].currentAnchor.y);
    }
  }

  /**
   * Updates the color of a circle over each tile at its currentAnchor position according to its
   * displacement from its original position.
   *
   * @this Annotations
   */
  function updateTileDisplacementColors() {
    var annotations, i, count, deltaX, deltaY, angle, distance, colorString;

    annotations = this;

    for (i = 0, count = annotations.grid.allTiles.length; i < count; i += 1) {
      deltaX = annotations.grid.allTiles[i].particle.px - annotations.grid.allTiles[i].originalAnchor.x;
      deltaY = annotations.grid.allTiles[i].particle.py - annotations.grid.allTiles[i].originalAnchor.y;

      angle = Math.atan2(deltaX, deltaY) * 180 / Math.PI;
      distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      colorString = 'hsl(' + angle + ',' +
          distance / window.hg.DisplacementWaveJob.config.displacementAmplitude * 100 + '%,80%)';

      annotations.tileDisplacementCircles[i].setAttribute('fill', colorString);
      annotations.tileDisplacementCircles[i]
          .setAttribute('cx', annotations.grid.allTiles[i].particle.px);
      annotations.tileDisplacementCircles[i]
          .setAttribute('cy', annotations.grid.allTiles[i].particle.py);
    }
  }

  /**
   * Updates the inner radius of each tile.
   *
   * @this Annotations
   */
  function updateTileInnerRadii() {
    var annotations, i, count;

    annotations = this;

    for (i = 0, count = annotations.grid.allTiles.length; i < count; i += 1) {
      annotations.tileInnerRadii[i].setAttribute('cx', annotations.grid.allTiles[i].particle.px);
      annotations.tileInnerRadii[i].setAttribute('cy', annotations.grid.allTiles[i].particle.py);
      annotations.tileInnerRadii[i].setAttribute('r',
              annotations.grid.allTiles[i].outerRadius * window.hg.Grid.config.sqrtThreeOverTwo);
    }
  }

  /**
   * Updates the outer radius of each tile.
   *
   * @this Annotations
   */
  function updateTileOuterRadii() {
    var annotations, i, count;

    annotations = this;

    for (i = 0, count = annotations.grid.allTiles.length; i < count; i += 1) {
      annotations.tileOuterRadii[i].setAttribute('cx', annotations.grid.allTiles[i].particle.px);
      annotations.tileOuterRadii[i].setAttribute('cy', annotations.grid.allTiles[i].particle.py);
      annotations.tileOuterRadii[i].setAttribute('r', annotations.grid.allTiles[i].outerRadius);
    }
  }

  /**
   * Updates lines connecting each tile to each of its neighborStates.
   *
   * @this Annotations
   */
  function updateTileNeighborConnections() {
    var annotations, i, j, iCount, jCount, tile, neighborStates, neighbor;

    annotations = this;

    for (i = 0, iCount = annotations.grid.allTiles.length; i < iCount; i += 1) {
      tile = annotations.grid.allTiles[i];
      neighborStates = tile.getNeighborStates();

      for (j = 0, jCount = neighborStates.length; j < jCount; j += 1) {
        neighbor = neighborStates[j];

        if (neighbor) {
          annotations.neighborLines[i][j].setAttribute('x1', tile.particle.px);
          annotations.neighborLines[i][j].setAttribute('y1', tile.particle.py);
          annotations.neighborLines[i][j].setAttribute('x2', neighbor.tile.particle.px);
          annotations.neighborLines[i][j].setAttribute('y2', neighbor.tile.particle.py);
        }
      }
    }
  }

  /**
   * Updates lines representing the cumulative force acting on each tile.
   *
   * @this Annotations
   */
  function updateTileForces() {
    var annotations, i, count;

    annotations = this;

    for (i = 0, count = annotations.grid.allTiles.length; i < count; i += 1) {
      annotations.forceLines[i].setAttribute('x1', annotations.grid.allTiles[i].particle.px);
      annotations.forceLines[i].setAttribute('y1', annotations.grid.allTiles[i].particle.py);
      annotations.forceLines[i].setAttribute('x2', annotations.grid.allTiles[i].particle.px +
          annotations.grid.allTiles[i].particle.fx * config.forceLineLengthMultiplier);
      annotations.forceLines[i].setAttribute('y2', annotations.grid.allTiles[i].particle.py +
          annotations.grid.allTiles[i].particle.fy * config.forceLineLengthMultiplier);
    }
  }

  /**
   * Updates lines representing the velocity of each tile.
   *
   * @this Annotations
   */
  function updateTileVelocities() {
    var annotations, i, count;

    annotations = this;

    for (i = 0, count = annotations.grid.allTiles.length; i < count; i += 1) {
      annotations.velocityLines[i].setAttribute('x1', annotations.grid.allTiles[i].particle.px);
      annotations.velocityLines[i].setAttribute('y1', annotations.grid.allTiles[i].particle.py);
      annotations.velocityLines[i].setAttribute('x2', annotations.grid.allTiles[i].particle.px +
          annotations.grid.allTiles[i].particle.vx * config.velocityLineLengthMultiplier);
      annotations.velocityLines[i].setAttribute('y2', annotations.grid.allTiles[i].particle.py +
          annotations.grid.allTiles[i].particle.vy * config.velocityLineLengthMultiplier);
    }
  }

  /**
   * Updates the index of each tile.
   *
   * @this Annotations
   */
  function updateTileIndices() {
    var annotations, i, count;

    annotations = this;

    for (i = 0, count = annotations.grid.allTiles.length; i < count; i += 1) {
      annotations.indexTexts[i].setAttribute('x', annotations.grid.allTiles[i].particle.px - 10);
      annotations.indexTexts[i].setAttribute('y', annotations.grid.allTiles[i].particle.py + 6);
    }
  }

  /**
   * Draws a dot at the position of each corner gap point of each line animation.
   *
   * @this Annotations
   */
  function updateLineAnimationGapPoints() {
    var annotations, i, iCount, j, jCount, k, line;

    annotations = this;

    destroyLineAnimationGapPoints.call(annotations);
    annotations.lineAnimationGapDots = [];

    for (k = 0, i = 0,
             iCount = window.hg.controller.transientJobs.LineJob.jobs[annotations.grid.index].length;
         i < iCount;
         i += 1) {
      line = window.hg.controller.transientJobs.LineJob.jobs[annotations.grid.index][i];

      for (j = 0, jCount = line.gapPoints.length; j < jCount; j += 1, k += 1) {
        annotations.lineAnimationGapDots[k] =
            document.createElementNS(window.hg.util.svgNamespace, 'circle');
        annotations.lineAnimationGapDots[k].setAttribute('cx', line.gapPoints[j].x);
        annotations.lineAnimationGapDots[k].setAttribute('cy', line.gapPoints[j].y);
        annotations.lineAnimationGapDots[k].setAttribute('r', '4');
        annotations.lineAnimationGapDots[k].setAttribute('fill', 'white');
        annotations.grid.svg.appendChild(annotations.lineAnimationGapDots[k]);
      }
    }
  }

  /**
   * Draws some annotations describing the corner configurations of each line animation.
   *
   * @this Annotations
   */
  function updateLineAnimationCornerConfigurations() {
    var annotations, i, iCount, j, jCount, line, pos, dot;

    annotations = this;

    destroyLineAnimationCornerConfigurations.call(annotations);
    annotations.lineAnimationSelfCornerDots = [];
    annotations.lineAnimationLowerNeighborCornerDots = [];
    annotations.lineAnimationUpperNeighborCornerDots = [];

    for (i = 0, iCount = window.hg.controller.transientJobs.LineJob.jobs[annotations.grid.index].length;
         i < iCount; i += 1) {
      line = window.hg.controller.transientJobs.LineJob.jobs[annotations.grid.index][i];

      for (j = 0, jCount = line.corners.length; j < jCount; j += 1) {
        // Self corner: red dot
        pos = getCornerPosition(line.tiles[j], line.corners[j]);
        dot = document.createElementNS(window.hg.util.svgNamespace, 'circle');
        dot.setAttribute('cx', pos.x);
        dot.setAttribute('cy', pos.y);
        dot.setAttribute('r', '3');
        dot.setAttribute('fill', '#ffaaaa');
        annotations.grid.svg.appendChild(dot);
        annotations.lineAnimationSelfCornerDots.push(dot);

        // Lower neighbor corner: green dot
        if (line.lowerNeighbors[j]) {
          pos = getCornerPosition(line.lowerNeighbors[j].tile, line.lowerNeighborCorners[j]);
          dot = document.createElementNS(window.hg.util.svgNamespace, 'circle');
          dot.setAttribute('cx', pos.x);
          dot.setAttribute('cy', pos.y);
          dot.setAttribute('r', '3');
          dot.setAttribute('fill', '#aaffaa');
          annotations.grid.svg.appendChild(dot);
          annotations.lineAnimationLowerNeighborCornerDots.push(dot);
        }

        // Upper neighbor corner: blue dot
        if (line.upperNeighbors[j]) {
          pos = getCornerPosition(line.upperNeighbors[j].tile, line.upperNeighborCorners[j]);
          dot = document.createElementNS(window.hg.util.svgNamespace, 'circle');
          dot.setAttribute('cx', pos.x);
          dot.setAttribute('cy', pos.y);
          dot.setAttribute('r', '3');
          dot.setAttribute('fill', '#aaaaff');
          annotations.grid.svg.appendChild(dot);
          annotations.lineAnimationUpperNeighborCornerDots.push(dot);
        }
      }
    }

    function getCornerPosition(tile, corner) {
      return {
        x: tile.outerVertices[corner * 2],
        y: tile.outerVertices[corner * 2 + 1]
      };
    }
  }

  /**
   * Updates the dots at the center of the grid and the center of the viewport and highlights the base tile for the
   * current pan.
   *
   * @this Annotations
   */
  function updatePanCenterPoints() {
    var annotations, panJob;

    annotations = this;

    if (annotations.originalGridCenterDot) {
      annotations.originalGridCenterDot.setAttribute('cx', annotations.grid.originalCenter.x);
      annotations.originalGridCenterDot.setAttribute('cy', annotations.grid.originalCenter.y);

      annotations.currentGridCenterDot.setAttribute('cx', annotations.grid.currentCenter.x);
      annotations.currentGridCenterDot.setAttribute('cy', annotations.grid.currentCenter.y);

      annotations.panCenterDot.setAttribute('cx', annotations.grid.panCenter.x);
      annotations.panCenterDot.setAttribute('cy', annotations.grid.panCenter.y);

      panJob = window.hg.controller.transientJobs.PanJob.jobs[annotations.grid.index][0];
      if (panJob) {
        panJob.baseTile.currentColor.h = 0;
        panJob.baseTile.currentColor.s = 0;
        panJob.baseTile.currentColor.l = 90;
      }
    }
  }

  /**
   * Updates a dot at the anchor position of each sector.
   *
   * @this Annotations
   */
  function updateSectorAnchorCenters() {
    var annotations, i, expandedAnchorX, expandedAnchorY, collapsedAnchorX, collapsedAnchorY;

    annotations = this;

    for (i = 0; i < annotations.sectorAnchorLines.length; i += 1) {
      expandedAnchorX = annotations.grid.sectors[i].currentAnchor.x;
      expandedAnchorY = annotations.grid.sectors[i].currentAnchor.y;
      collapsedAnchorX = annotations.grid.sectors[i].originalAnchor.x -
          annotations.grid.sectors[i].expandedDisplacement.x;
      collapsedAnchorY = annotations.grid.sectors[i].originalAnchor.y -
          annotations.grid.sectors[i].expandedDisplacement.y;

      annotations.sectorAnchorLines[i].setAttribute('x1', expandedAnchorX);
      annotations.sectorAnchorLines[i].setAttribute('y1', expandedAnchorY);
      annotations.sectorAnchorLines[i].setAttribute('x2', collapsedAnchorX);
      annotations.sectorAnchorLines[i].setAttribute('y2', collapsedAnchorY);
      annotations.sectorAnchorCenters[i].setAttribute('cx', collapsedAnchorX);
      annotations.sectorAnchorCenters[i].setAttribute('cy', collapsedAnchorY);
    }
  }

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  /**
   * Toggles whether the given annotation is enabled.
   *
   * @this Annotations
   * @param {String} annotation
   * @param {Boolean} enabled
   * @throws {Error}
   */
  function toggleAnnotationEnabled(annotation, enabled) {
    var annotations;

    annotations = this;

    annotations.annotations[annotation].enabled = enabled;

    if (enabled) {
      annotations.annotations[annotation].create.call(annotations);
    } else {
      annotations.annotations[annotation].destroy.call(annotations);
    }
  }

  /**
   * Computes spatial parameters of the tile annotations and creates SVG elements to represent
   * these annotations.
   *
   * @this Annotations
   */
  function createAnnotations() {
    var annotations, i, count;

    annotations = this;

    for (i = 0, count = config.annotationsArray.length; i < count; i += 1) {
      if (config.annotationsArray[i].enabled) {
        config.annotationsArray[i].create.call(annotations);
      }
    }
  }

  /**
   * Destroys the SVG elements used to represent grid annotations.
   *
   * @this Annotations
   */
  function destroyAnnotations() {
    var annotations, i, count;

    annotations = this;

    for (i = 0, count = config.annotationsArray.length; i < count; i += 1) {
      config.annotationsArray[i].destroy.call(annotations);
    }
  }

  /**
   * Updates the annotation states to reflect whether the grid is currently expanded.
   *
   * @this Annotations
   * @param {Boolean} isExpanded
   */
  function setExpandedAnnotations(isExpanded) {
    var annotations;

    annotations = this;

    if (annotations.annotations.tileNeighborConnections.enabled) {
      destroyTileNeighborConnections.call(annotations);
      createTileNeighborConnections.call(annotations);
    }
  }

  /**
   * Sets this AnimationJob as started.
   *
   * @this Annotations
   */
  function start() {
    var grid = this;

    grid.isComplete = false;
  }

  /**
   * Updates the animation progress of this AnimationJob to match the given time.
   *
   * @this Annotations
   * @param {Number} currentTime
   * @param {Number} deltaTime
   */
  function update(currentTime, deltaTime) {
    var annotations, i, count;

    annotations = this;

    for (i = 0, count = config.annotationsArray.length; i < count; i += 1) {
      if (config.annotationsArray[i].enabled) {
        config.annotationsArray[i].update.call(annotations);
      }
    }
  }

  /**
   * Draws the current state of this AnimationJob.
   *
   * @this Annotations
   */
  function draw() {
    // TODO: is there any of the update logic that should instead be handled here?
  }

  /**
   * Stops this AnimationJob, and returns the element to its original form.
   *
   * @this Annotations
   */
  function cancel() {
    var grid = this;

    grid.isComplete = true;
  }

  /**
   * @this Annotations
   */
  function init() {
    var job = this;

    config.computeDependentValues();
  }

  function refresh() {
    var job = this;

    init();

    job.annotations = window.hg.util.shallowCopy(config.annotations);
  }

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  console.log('Annotations module loaded');
})();

/**
* This module defines a constructor for Carousel objects.
*
* Carousel objects display the images and videos for a post.
*
* @module Carousel
*/
(function () {

  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var config;

  config = {};

  config.thumbnailHeight = 80;
  config.thumbnailRibbonPadding = 3;
  config.prevNextButtonPadding = 10;
  config.prevNextButtonHeight = 41;
  config.prevNextButtonWidth = 24;

  // ---  --- //

  config.aspectRatio = 16 / 9;

  config.vimeoMetadataBaseUrl = 'http://vimeo.com/api/v2/video';

  //  --- Dependent parameters --- //

  config.computeDependentValues = function () {
    config.thumbnailWidth = config.thumbnailHeight * config.aspectRatio;
  };

  config.computeDependentValues();

  function addChevronDefinition() {
    var body = document.querySelector('body');
    var svg = document.createElementNS(window.hg.util.svgNamespace, 'svg');
    var symbol = document.createElementNS(window.hg.util.svgNamespace, 'symbol');
    var chevron = document.createElementNS(window.hg.util.svgNamespace, 'path');

    body.appendChild(svg);
    svg.appendChild(symbol);
    symbol.appendChild(chevron);

    svg.style.display = 'none';
    symbol.setAttribute('id', 'chevron-left');
    symbol.setAttribute('viewBox', '0 0 247.88 428.75');
    chevron.setAttribute('d', 'M149.03125,428.29625,0.54125,214.36625,149.03125,0.44725l97.959,0.000001-148.49,213.92,148.49,213.92z');
  }

  addChevronDefinition();

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @constructor
   * @global
   * @param {Grid} grid
   * @param {PagePost} pagePost
   * @param {HTMLElement} parent
   * @param {Array.<String>} images
   * @param {Array.<String>} videos
   * @param {Boolean} [waitToLoadMedia=false]
   */
  function Carousel(grid, pagePost, parent, images, videos, waitToLoadMedia) {
    var carousel = this;

    carousel.grid = grid;
    carousel.pagePost = pagePost;
    carousel.parent = parent;
    carousel.elements = null;
    carousel.currentIndex = 0;
    carousel.previousIndex = 0;
    carousel.mediaMetadata = null;
    carousel.currentIndexPositionRatio = 0;

    carousel.loadMedia = loadMedia;
    carousel.onSlideFinished = onSlideFinished;
    carousel.draw = draw;
    carousel.destroy = destroy;

    createMediaMetadataArray.call(carousel, images, videos);
    createElements.call(carousel, waitToLoadMedia);

    console.log('Carousel created');
  }

  Carousel.config = config;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.Carousel = Carousel;

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  /**
   * @this Carousel
   * @param {Array.<String>} images
   * @param {Array.<String>} videos
   */
  function createMediaMetadataArray(images, videos) {
    var carousel = this;

    carousel.mediaMetadata = videos.concat(images).map(function (medium) {
      medium.isVideo = !!medium.videoHost;
      return medium;
    });
  }

  /**
   * @this Carousel
   * @param {Boolean} [waitToLoadMedia=false]
   */
  function createElements(waitToLoadMedia) {
    var carousel = this;

    var container = document.createElement('div');
    var slidersContainer = document.createElement('div');
    var mainMediaRibbon = document.createElement('div');
    var thumbnailsRibbon = document.createElement('div');
    var buttonsContainer = document.createElement('div');
    var captionsPanel = document.createElement('div');
    var captionsText = document.createElement('p');
    var previousButtonPanel = document.createElement('div');
    var previousButtonSvg = document.createElementNS(window.hg.util.svgNamespace, 'svg');
    var previousButtonUse = document.createElementNS(window.hg.util.svgNamespace, 'use');
    var nextButtonPanel = document.createElement('div');
    var nextButtonSvg = document.createElementNS(window.hg.util.svgNamespace, 'svg');
    var nextButtonUse = document.createElementNS(window.hg.util.svgNamespace, 'use');

    carousel.parent.appendChild(container);
    container.appendChild(slidersContainer);
    slidersContainer.appendChild(mainMediaRibbon);
    slidersContainer.appendChild(thumbnailsRibbon);
    slidersContainer.appendChild(buttonsContainer);
    buttonsContainer.appendChild(previousButtonPanel);
    previousButtonPanel.appendChild(previousButtonSvg);
    previousButtonSvg.appendChild(previousButtonUse);
    buttonsContainer.appendChild(nextButtonPanel);
    nextButtonPanel.appendChild(nextButtonSvg);
    nextButtonSvg.appendChild(nextButtonUse);
    container.appendChild(captionsPanel);
    captionsPanel.appendChild(captionsText);

    carousel.elements = {};
    carousel.elements.container = container;
    carousel.elements.slidersContainer = slidersContainer;
    carousel.elements.mainMediaRibbon = mainMediaRibbon;
    carousel.elements.thumbnailsRibbon = thumbnailsRibbon;
    carousel.elements.buttonsContainer = buttonsContainer;
    carousel.elements.captionsPanel = captionsPanel;
    carousel.elements.captionsText = captionsText;
    carousel.elements.previousButtonPanel = previousButtonPanel;
    carousel.elements.previousButtonSvg = previousButtonSvg;
    carousel.elements.previousButtonUse = previousButtonUse;
    carousel.elements.nextButtonPanel = nextButtonPanel;
    carousel.elements.nextButtonSvg = nextButtonSvg;
    carousel.elements.nextButtonUse = nextButtonUse;
    carousel.elements.mainMedia = [];
    carousel.elements.thumbnails = [];
    carousel.elements.thumbnailScreens = [];

    container.setAttribute('data-hg-carousel-container', 'data-hg-carousel-container');

    slidersContainer.setAttribute('data-hg-carousel-sliders-container',
      'data-hg-carousel-sliders-container');
    slidersContainer.style.position = 'relative';
    slidersContainer.style.overflow = 'hidden';
    slidersContainer.style.width = '100%';
    window.hg.util.setUserSelectNone(container);

    mainMediaRibbon.style.position = 'relative';
    mainMediaRibbon.style.width = '100%';
    mainMediaRibbon.style.height = '0';
    mainMediaRibbon.style.padding = '56.25% 0 0 0';

    thumbnailsRibbon.style.position = 'relative';
    thumbnailsRibbon.style.width = config.thumbnailWidth * carousel.mediaMetadata.length + 'px';
    thumbnailsRibbon.style.height = config.thumbnailHeight + 'px';
    thumbnailsRibbon.style.left = 'calc(50% - ' + config.thumbnailWidth / 2 + 'px)';
    thumbnailsRibbon.style.paddingTop = config.thumbnailRibbonPadding + 'px';

    buttonsContainer.style.position = 'absolute';
    buttonsContainer.style.top = '0';
    buttonsContainer.style.width = '100%';
    buttonsContainer.style.height = '0';
    buttonsContainer.style.padding = '56.25% 0 0 0';

    previousButtonPanel.setAttribute('data-hg-carousel-button', 'data-hg-carousel-button');
    previousButtonPanel.style.position = 'absolute';
    previousButtonPanel.style.top = '0';
    previousButtonPanel.style.left = '0';
    previousButtonPanel.style.width = 'calc(33.33% - ' + config.prevNextButtonPadding + 'px)';
    previousButtonPanel.style.height = '100%';
    previousButtonPanel.style.cursor = 'pointer';
    previousButtonPanel.addEventListener('click', goToPrevious.bind(carousel), false);

    previousButtonSvg.style.position = 'absolute';
    previousButtonSvg.style.top = '0';
    previousButtonSvg.style.bottom = '0';
    previousButtonSvg.style.left = '0';
    previousButtonSvg.style.margin = 'auto';
    previousButtonSvg.style.height = config.prevNextButtonHeight + 'px';
    previousButtonSvg.style.width = config.prevNextButtonWidth + 'px';
    previousButtonSvg.style.paddingLeft = config.prevNextButtonPadding + 'px';

    previousButtonUse.setAttributeNS(window.hg.util.xlinkNamespace, 'xlink:href', '#chevron-left');

    nextButtonPanel.setAttribute('data-hg-carousel-button', 'data-hg-carousel-button');
    nextButtonPanel.style.position = 'absolute';
    nextButtonPanel.style.top = '0';
    nextButtonPanel.style.right = '0';
    nextButtonPanel.style.width = 'calc(66.67% - ' + config.prevNextButtonPadding + 'px)';
    nextButtonPanel.style.height = '100%';
    nextButtonPanel.style.cursor = 'pointer';
    nextButtonPanel.addEventListener('click', goToNext.bind(carousel), false);

    window.hg.util.setTransform(nextButtonSvg, 'scaleX(-1)');
    nextButtonSvg.style.position = 'absolute';
    nextButtonSvg.style.top = '0';
    nextButtonSvg.style.bottom = '0';
    nextButtonSvg.style.right = '0';
    nextButtonSvg.style.margin = 'auto';
    nextButtonSvg.style.height = config.prevNextButtonHeight + 'px';
    nextButtonSvg.style.width = config.prevNextButtonWidth + 'px';
    nextButtonSvg.style.paddingLeft = config.prevNextButtonPadding + 'px';

    nextButtonUse.setAttributeNS(window.hg.util.xlinkNamespace, 'xlink:href', '#chevron-left');

    captionsPanel.setAttribute('data-hg-captions-panel', 'data-hg-captions-panel');

    captionsText.style.margin = '0';
    captionsText.style.padding = '0';
    carousel.elements.captionsPanel.setAttribute('data-hg-selected', 'data-hg-selected');

    if (!waitToLoadMedia) {
      loadMedia.call(carousel);
    }

    // The Carousel should display differently when it contains zero or one item
    if (carousel.mediaMetadata.length === 0) {
      container.style.display = 'none';
      captionsPanel.style.display = 'none';
    } else {
      // Show the caption for the first media item
      captionsText.innerHTML = carousel.mediaMetadata[0].description;

      if (carousel.mediaMetadata.length === 1) {
        thumbnailsRibbon.style.display = 'none';
      }
    }

    setPrevNextButtonVisibility.call(carousel);
  }

  /**
   * @this Carousel
   */
  function setPrevNextButtonVisibility() {
    var prevVisibility, nextVisibility, panelVisibility;
    var carousel = this;

    // We don't want the prev/next buttons blocking any video controls
    if (!carousel.mediaMetadata.length ||
        carousel.mediaMetadata[carousel.currentIndex].isVideo) {
      prevVisibility = 'hidden';
      nextVisibility = 'hidden';
      panelVisibility = 'hidden';
    } else {
      prevVisibility = carousel.currentIndex > 0 ? 'visible' : 'hidden';
      nextVisibility = carousel.currentIndex < carousel.mediaMetadata.length - 1 ?
        'visible' : 'hidden';
      panelVisibility = 'visible';
    }

    carousel.elements.previousButtonPanel.style.visibility = prevVisibility;
    carousel.elements.nextButtonPanel.style.visibility = nextVisibility;
    carousel.elements.buttonsContainer.style.visibility = panelVisibility;
  }

  /**
   * @this Carousel
   */
  function goToPrevious() {
    var nextIndex;
    var carousel = this;

    if (carousel.currentIndex > 0) {
      nextIndex = (carousel.currentIndex + carousel.mediaMetadata.length - 1) %
        carousel.mediaMetadata.length;
      goToIndex.call(carousel, nextIndex);
    } else {
      console.warn('Carousel cannot go to previous. Already at first medium.');
    }
  }

  /**
   * @this Carousel
   */
  function goToNext() {
    var nextIndex;
    var carousel = this;

    if (carousel.currentIndex < carousel.mediaMetadata.length - 1) {
      nextIndex = (carousel.currentIndex + 1) % carousel.mediaMetadata.length;
      goToIndex.call(carousel, nextIndex);
    } else {
      console.warn('Carousel cannot go to next. Already at last medium.');
    }
  }

  /**
   * @this Carousel
   * @param {Number} nextIndex
   */
  function goToIndex(nextIndex) {
    var carousel = this;

    carousel.previousIndex = carousel.currentIndex;
    carousel.currentIndex = nextIndex;

    window.hg.controller.transientJobs.CarouselImageSlideJob.create(carousel.grid, null, carousel);

    // Pause any playing video
    if (carousel.mediaMetadata[carousel.previousIndex].isVideo) {
      switch (carousel.mediaMetadata[carousel.previousIndex].videoHost) {
        case 'youtube':
          carousel.elements.mainMedia[carousel.previousIndex].querySelector('iframe').contentWindow
            .postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
          break;
        case 'vimeo':
          carousel.elements.mainMedia[carousel.previousIndex].querySelector('iframe').contentWindow
            .postMessage('{"method": "pause", "value": ""}', '*');
          break;
        default:
          throw new Error('Invalid video host: ' +
            carousel.mediaMetadata[carousel.previousIndex].videoHost);
      }
    }

    // Hide the caption text
    carousel.elements.captionsPanel.removeAttribute('data-hg-selected');

    // Mark the old thumbnail as un-selected
    carousel.elements.thumbnails[carousel.previousIndex].removeAttribute('data-hg-selected');

    // Mark the current thumbnail as selected
    carousel.elements.thumbnails[carousel.currentIndex].setAttribute('data-hg-selected',
      'data-hg-selected');

    setPrevNextButtonVisibility.call(carousel);
  }

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  // ------------------------------------------------------------------------------------------- //
  // Public static functions

  /**
   * @this Carousel
   */
  function loadMedia() {
    var carousel = this;

    if (carousel.elements.mainMedia.length === 0) {
      carousel.mediaMetadata.forEach(addMedium);
    }

    if (carousel.mediaMetadata.length > 0) {
      // Mark the first thumbnail as selected
      carousel.elements.thumbnails[0].setAttribute('data-hg-selected', 'data-hg-selected');
    }

    // ---  --- //

    function addMedium(mediumMetadatum, index) {
      var mainMediaElement, iframeElement, thumbnailElement, thumbnailScreenElement, thumbnailSrc;

      if (mediumMetadatum.isVideo) {
        iframeElement = document.createElement('iframe');
        iframeElement.setAttribute('src', mediumMetadatum.videoSrc);
        iframeElement.setAttribute('allowfullscreen', 'allowfullscreen');
        iframeElement.setAttribute('frameborder', '0');
        iframeElement.style.position = 'absolute';
        iframeElement.style.top = '0';
        iframeElement.style.width = '100%';
        iframeElement.style.height = '100%';

        mainMediaElement = document.createElement('div');
        mainMediaElement.appendChild(iframeElement);

        switch (mediumMetadatum.videoHost) {
          case 'youtube':
            thumbnailSrc = mediumMetadatum.thumbnailSrc;
            break;
          case 'vimeo':
            thumbnailSrc = '';
            fetchVimeoThumbnail(mediumMetadatum, index);
            break;
          default:
            throw new Error('Invalid video host: ' + mediumMetadatum.videoHost);
        }
      } else {
        mainMediaElement = document.createElement('div');
        mainMediaElement.style.backgroundImage = 'url(' + mediumMetadatum.src + ')';
        mainMediaElement.style.backgroundSize = 'contain';
        mainMediaElement.style.backgroundRepeat = 'no-repeat';
        mainMediaElement.style.backgroundPosition = '50% 50%';

        thumbnailSrc = mediumMetadatum.src;
      }

      mainMediaElement.setAttribute('data-hg-carousel-main-media',
        'data-hg-carousel-main-media');
      mainMediaElement.style.position = 'absolute';
      mainMediaElement.style.top = '0';
      mainMediaElement.style.left = index * 100 + '%';
      mainMediaElement.style.width = '100%';
      mainMediaElement.style.height = '0';
      mainMediaElement.style.padding = '56.25% 0 0 0';

      thumbnailElement = document.createElement('div');
      thumbnailElement.setAttribute('data-hg-carousel-thumbnail',
        'data-hg-carousel-thumbnail');
      thumbnailElement.style.backgroundImage = 'url(' + thumbnailSrc + ')';
      thumbnailElement.style.backgroundSize = 'contain';
      thumbnailElement.style.backgroundRepeat = 'no-repeat';
      thumbnailElement.style.backgroundPosition = '50% 50%';
      thumbnailElement.style.width = config.thumbnailWidth + 'px';
      thumbnailElement.style.height = config.thumbnailHeight + 'px';
      thumbnailElement.style.styleFloat = 'left';
      thumbnailElement.style.cssFloat = 'left';

      thumbnailScreenElement = document.createElement('div');
      thumbnailScreenElement.setAttribute('data-hg-carousel-thumbnail-screen',
        'data-hg-carousel-thumbnail-screen');
      thumbnailScreenElement.style.width = '100%';
      thumbnailScreenElement.style.height = '100%';
      thumbnailScreenElement.style.cursor = 'pointer';
      thumbnailScreenElement.addEventListener('click', goToIndex.bind(carousel, index), false);

      carousel.elements.mainMedia.push(mainMediaElement);
      carousel.elements.thumbnails.push(thumbnailElement);
      carousel.elements.thumbnailScreens.push(thumbnailScreenElement);

      carousel.elements.mainMediaRibbon.appendChild(mainMediaElement);
      carousel.elements.thumbnailsRibbon.appendChild(thumbnailElement);
      thumbnailElement.appendChild(thumbnailScreenElement);

      // ---  --- //

      function fetchVimeoThumbnail(mediumMetadatum, index) {
        var url = config.vimeoMetadataBaseUrl + '/' + mediumMetadatum.id + '.json';
        var xhr = new XMLHttpRequest();

        xhr.addEventListener('load', onLoad, false);
        xhr.addEventListener('error', onError, false);
        xhr.addEventListener('abort', onAbort, false);

        console.log('Sending request for Vimeo metadata to ' + url);

        xhr.open('GET', url, true);
        xhr.send();

        // ---  --- //

        function onLoad() {
          var responseData;

          console.log('Vimeo metadata response status=' + xhr.status +
            ' (' + xhr.statusText + ')');

          try {
            responseData = JSON.parse(xhr.response);
          } catch (error) {
            console.error('Unable to parse Vimeo metadata response body as JSON: ' + xhr.response);
            return;
          }

          mediumMetadatum.thumbnailSrc = responseData[0].thumbnail_large;

          carousel.elements.thumbnails[index].style.backgroundImage =
            'url(' + mediumMetadatum.thumbnailSrc + ')';
        }

        function onError() {
          console.error('An error occurred while loading the Vimeo thumbnail');
        }

        function onAbort() {
          console.error('The Vimeo thumbnail load has been cancelled by the user');
        }
      }
    }
  }

  /**
   * @this Carousel
   */
  function onSlideFinished() {
    var carousel = this;

    // Show the caption for the current media item
    carousel.elements.captionsText.innerHTML =
      carousel.mediaMetadata[carousel.currentIndex].description;
    carousel.elements.captionsPanel.setAttribute('data-hg-selected', 'data-hg-selected');
  }

  /**
   * @this Carousel
   */
  function draw() {
    var carousel = this;

    carousel.elements.mainMediaRibbon.style.left = -carousel.currentIndexPositionRatio * 100 + '%';
    carousel.elements.thumbnailsRibbon.style.left = 'calc(50% - ' + (config.thumbnailWidth / 2 +
      carousel.currentIndexPositionRatio * config.thumbnailWidth) + 'px';
  }

  /**
   * @this Carousel
   */
  function destroy() {
    var carousel = this;

    carousel.parent.removeChild(carousel.elements.container);
    carousel.elements.container = null;
  }

  console.log('Carousel module loaded');
})();

/**
 * @typedef {AnimationJob} Grid
 */

/**
 * @typedef {Object} PostData
 * @property {String} id
 * @property {String} titleShort
 * @property {String} titleLong
 * @property {Array.<String>} urls
 * @property {String} jobTitle
 * @property {String} location
 * @property {String} date
 * @property {Array.<String>} categories
 * @property {Array.<ImageData>} images
 * @property {Array.<VideoData>} videos
 * @property {String} content An extended description of the post in markdown syntax.
 */

/**
 * @typedef {Object} ImageData
 * @property {String} fileName
 * @property {String} description
 */

/**
 * @typedef {Object} VideoData
 * @property {'youtube'|'vimeo'} videoHost
 * @property {String} id
 * @property {String} description
 */

/**
 * This module defines a constructor for Grid objects.
 *
 * Grid objects define a collection of hexagonal tiles that animate and display dynamic,
 * textual content.
 *
 * @module Grid
 */
(function () {
  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  // TODO:
  // - update the tile radius and the targetContentAreaWidth with the screen width?
  //   - what is my plan for mobile devices?

  var config = {};

  config.targetContentAreaWidth = 900;
  config.backgroundHue = 230;
  config.backgroundSaturation = 1;
  config.backgroundLightness = 4;
  config.tileHue = 230;//147;
  config.tileSaturation = 67;
  config.tileLightness = 22;
  config.tileOuterRadius = document.documentElement.clientWidth > 812 ? 100 : 72;
  config.tileGap = 12;
  config.contentStartingRowIndex = 2;
  config.firstRowYOffset = config.tileOuterRadius * -0.8;
  config.contentDensity = 1.0;//0.6;
  config.tileMass = 1;

  //  --- Dependent parameters --- //

  config.computeDependentValues = function () {
    config.sqrtThreeOverTwo = Math.sqrt(3) / 2;
    config.twoOverSqrtThree = 2 / Math.sqrt(3);

    config.tileInnerRadius = config.tileOuterRadius * config.sqrtThreeOverTwo;

    config.longGap = config.tileGap * config.twoOverSqrtThree;

    config.tileShortLengthWithGap = config.tileInnerRadius * 2 + config.tileGap;
    config.tileLongLengthWithGap = config.tileOuterRadius * 2 + config.longGap;
  };

  config.computeDependentValues();

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @global
   * @constructor
   * @param {Number} index
   * @param {HTMLElement} parent
   * @param {Array.<PostData>} postData
   * @param {Boolean} [isVertical]
   */
  function Grid(index, parent, postData, isVertical) {
    var grid = this;

    grid.index = index;
    grid.parent = parent;
    grid.postData = postData;
    grid.isVertical = isVertical;

    grid.actualContentAreaWidth = config.targetContentAreaWidth;

    grid.isComplete = true;

    grid.svg = null;
    grid.svgDefs = null;
    grid.originalTiles = [];
    grid.originalBorderTiles = [];
    grid.contentTiles = [];
    grid.originalContentInnerIndices = null;
    grid.innerIndexOfLastContentTile = null;
    grid.originalCenter = null;
    grid.currentCenter = null;
    grid.panCenter = null;
    grid.isPostOpen = false;
    grid.pagePost = null;
    grid.isTransitioning = false;
    grid.expandedTile = null;
    grid.sectors = null;
    grid.allTiles = null;
    grid.allNonContentTiles = null;
    grid.lastExpansionJob = null;
    grid.scrollTop = Number.NaN;

    grid.annotations = new window.hg.Annotations(grid);

    grid.actualContentAreaWidth = Number.NaN;
    grid.rowDeltaY = Number.NaN;
    grid.tileDeltaX = Number.NaN;
    grid.tileNeighborDistance = Number.NaN;
    grid.oddRowTileCount = Number.NaN;
    grid.evenRowTileCount = Number.NaN;
    grid.oddRowXOffset = Number.NaN;
    grid.rowCount = Number.NaN;
    grid.evenRowXOffset = Number.NaN;
    grid.contentAreaLeft = Number.NaN;
    grid.contentAreaRight = Number.NaN;
    grid.oddRowContentStartIndex = Number.NaN;
    grid.evenRowContentStartIndex = Number.NaN;
    grid.oddRowContentTileCount = Number.NaN;
    grid.evenRowContentTileCount = Number.NaN;
    grid.oddRowContentEndIndex = Number.NaN;
    grid.evenRowContentEndIndex = Number.NaN;
    grid.actualContentInnerIndices = Number.NaN;
    grid.innerIndexOfLastContentTile = Number.NaN;
    grid.rowCount = Number.NaN;
    grid.height = Number.NaN;

    grid.resize = resize;
    grid.start = start;
    grid.update = update;
    grid.draw = draw;
    grid.cancel = cancel;
    grid.init = init;

    grid.setBackgroundColor = setBackgroundColor;
    grid.updateTileColor = updateTileColor;
    grid.updateTileMass = updateTileMass;
    grid.setHoveredTile = setHoveredTile;
    grid.createPagePost = createPagePost;
    grid.destroyPagePost = destroyPagePost;
    grid.updateAllTilesCollection = updateAllTilesCollection;
    grid.computeContentIndices = computeContentIndices;

    grid.parent.setAttribute('data-hg-grid-parent', 'data-hg-grid-parent');

    createSvg.call(grid);
    setBackgroundColor.call(grid);
    computeContentIndices.call(grid);
    resize.call(grid);
  }

  Grid.config = config;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.Grid = Grid;

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  /**
   * Computes various parameters of the grid. These include:
   *
   * - row count
   * - number of tiles in even and odd rows
   * - the vertical and horizontal displacement between neighbor tiles
   * - the horizontal positions of the first tiles in even and odd rows
   *
   * @this Grid
   */
  function computeGridParameters() {
    var grid, parentWidth, parentHalfWidth, parentHeight, innerContentCount, rowIndex, i, count,
        emptyRowsContentTileCount, minInnerTileCount;

    grid = this;

    parentWidth = grid.parent.clientWidth;
    parentHalfWidth = parentWidth * 0.5;
    parentHeight = grid.parent.clientHeight;

    grid.originalCenter.x = parentHalfWidth;
    grid.originalCenter.y = parentHeight * 0.5;
    grid.currentCenter.x = grid.originalCenter.x;
    grid.currentCenter.y = grid.originalCenter.y;
    grid.panCenter.x = grid.originalCenter.x;
    grid.panCenter.y = grid.originalCenter.y;

    grid.actualContentAreaWidth = parentWidth < config.targetContentAreaWidth ?
        parentWidth : config.targetContentAreaWidth;

    if (grid.isVertical) {
      grid.rowDeltaY = config.tileOuterRadius * 1.5 + config.tileGap * config.sqrtThreeOverTwo;
      grid.tileDeltaX = config.tileShortLengthWithGap;

      grid.oddRowTileCount = Math.ceil((parentHalfWidth - (config.tileInnerRadius + config.tileGap)) / config.tileShortLengthWithGap) * 2 + 1;
      grid.evenRowTileCount = Math.ceil((parentHalfWidth - (config.tileShortLengthWithGap + config.tileGap * 0.5)) / config.tileShortLengthWithGap) * 2 + 2;

      grid.oddRowXOffset = parentHalfWidth - config.tileShortLengthWithGap * (grid.oddRowTileCount - 1) / 2;

      grid.rowCount = Math.ceil((parentHeight - (config.firstRowYOffset + config.tileOuterRadius * 2 + config.tileGap * Math.sqrt(3))) / grid.rowDeltaY) + 2;
    } else {
      grid.rowDeltaY = config.tileInnerRadius + config.tileGap * 0.5;
      grid.tileDeltaX = config.tileOuterRadius * 3 + config.tileGap * Math.sqrt(3);

      grid.oddRowTileCount = Math.ceil((parentHalfWidth - (grid.tileDeltaX - config.tileOuterRadius)) / grid.tileDeltaX) * 2 + 1;
      grid.evenRowTileCount = Math.ceil((parentHalfWidth - (grid.tileDeltaX + (config.tileGap * config.sqrtThreeOverTwo) + config.tileOuterRadius * 0.5)) / grid.tileDeltaX) * 2 + 2;

      grid.oddRowXOffset = parentHalfWidth - grid.tileDeltaX * (grid.oddRowTileCount - 1) / 2;

      grid.rowCount = Math.ceil((parentHeight - (config.firstRowYOffset + config.tileInnerRadius * 3 + config.tileGap * 2)) / grid.rowDeltaY) + 4;
    }

    grid.evenRowXOffset = grid.oddRowXOffset +
        (grid.evenRowTileCount > grid.oddRowTileCount ? -1 : 1) * grid.tileDeltaX * 0.5;

    // --- Row inner content information --- //

    grid.contentAreaLeft = parentHalfWidth - grid.actualContentAreaWidth * 0.5;
    grid.contentAreaRight = grid.contentAreaLeft + grid.actualContentAreaWidth;

    if (grid.isVertical) {
      grid.oddRowContentStartIndex = Math.ceil((grid.contentAreaLeft - (grid.oddRowXOffset - config.tileInnerRadius)) / grid.tileDeltaX);
      grid.evenRowContentStartIndex = Math.ceil((grid.contentAreaLeft - (grid.evenRowXOffset - config.tileInnerRadius)) / grid.tileDeltaX);
    } else {
      grid.oddRowContentStartIndex = Math.ceil((grid.contentAreaLeft - (grid.oddRowXOffset - config.tileOuterRadius)) / grid.tileDeltaX);
      grid.evenRowContentStartIndex = Math.ceil((grid.contentAreaLeft - (grid.evenRowXOffset - config.tileOuterRadius)) / grid.tileDeltaX);
    }

    grid.oddRowContentTileCount = grid.oddRowTileCount - grid.oddRowContentStartIndex * 2;
    grid.evenRowContentTileCount = grid.evenRowTileCount - grid.evenRowContentStartIndex * 2;

    grid.oddRowContentEndIndex = grid.oddRowContentStartIndex + grid.oddRowContentTileCount - 1;
    grid.evenRowContentEndIndex = grid.evenRowContentStartIndex + grid.evenRowContentTileCount - 1;

    // Update the content inner indices to account for empty rows at the start of the grid
    grid.actualContentInnerIndices = [];
    emptyRowsContentTileCount = Math.ceil(config.contentStartingRowIndex / 2) * grid.oddRowContentTileCount +
        Math.floor(config.contentStartingRowIndex / 2) * grid.evenRowContentTileCount;
    for (i = 0, count = grid.originalContentInnerIndices.length; i < count; i += 1) {
      grid.actualContentInnerIndices[i] = grid.originalContentInnerIndices[i] + emptyRowsContentTileCount;
    }

    grid.innerIndexOfLastContentTile = grid.actualContentInnerIndices[grid.actualContentInnerIndices.length - 1];

    // Add empty rows at the end of the grid
    minInnerTileCount = emptyRowsContentTileCount + grid.innerIndexOfLastContentTile + 1;
    innerContentCount = 0;
    rowIndex = 0;

    while (minInnerTileCount > innerContentCount) {
      innerContentCount += rowIndex % 2 === 0 ?
          grid.oddRowContentTileCount : grid.evenRowContentTileCount;
      rowIndex += 1;
    }

    // Make sure the grid element is tall enough to contain the needed number of rows
    if (rowIndex > grid.rowCount) {
      grid.rowCount = rowIndex + (grid.isVertical ? 0 : 1);
      grid.height = (grid.rowCount - 2) * grid.rowDeltaY;
    } else {
      grid.height = parentHeight;
    }
  }

  /**
   * Calculates the tile indices within the content area column that will represent tiles with
   * content.
   *
   * @this Grid
   */
  function computeContentIndices() {
    var grid, i, j, count, tilesRepresentation;

    grid = this;

    // Use 1s to represent the tiles that hold data
    tilesRepresentation = [];
    count = grid.postData.length;
    for (i = 0; i < count; i += 1) {
      tilesRepresentation[i] = 1;
    }

    // Use 0s to represent the empty tiles
    count = (1 / config.contentDensity) * grid.postData.length;
    for (i = grid.postData.length; i < count; i += 1) {
      tilesRepresentation[i] = 0;
    }

    tilesRepresentation = window.hg.util.shuffle(tilesRepresentation);

    // Record the resulting indices of the elements representing tile content
    grid.originalContentInnerIndices = [];
    for (i = 0, j = 0, count = tilesRepresentation.length; i < count; i += 1) {
      if (tilesRepresentation[i]) {
        grid.originalContentInnerIndices[j++] = i;
      }
    }
  }

  /**
   * Creates the SVG element for the grid.
   *
   * @this Grid
   */
  function createSvg() {
    var grid;

    grid = this;

    grid.svg = document.createElementNS(window.hg.util.svgNamespace, 'svg');
    grid.parent.appendChild(grid.svg);

    grid.svg.style.display = 'block';
    grid.svg.style.position = 'relative';
    grid.svg.style.width = '100%';
    grid.svg.style.height = '100%';
    grid.svg.style.zIndex = '1000';
    grid.svg.style.overflow = 'visible';
    grid.svg.style.pointerEvents = 'none';
    grid.svg.setAttribute('data-hg-svg', 'data-hg-svg');

    grid.svgDefs = document.createElementNS(window.hg.util.svgNamespace, 'defs');
    grid.svg.appendChild(grid.svgDefs);
  }

  /**
   * Creates the tile elements for the grid.
   *
   * @this Grid
   */
  function createTiles() {
    var grid, tileIndex, rowIndex, rowCount, columnIndex, columnCount, anchorX, anchorY,
        isMarginTile, isBorderTile, isCornerTile, isOddRow, contentAreaIndex, postDataIndex,
        defaultNeighborDeltaIndices, tilesNeighborDeltaIndices, oddRowIsLarger, isLargerRow;

    grid = this;

    grid.originalTiles = [];
    grid.originalBorderTiles = [];
    tileIndex = 0;
    contentAreaIndex = 0;
    postDataIndex = 0;
    anchorY = config.firstRowYOffset;
    rowCount = grid.rowCount;
    tilesNeighborDeltaIndices = [];

    defaultNeighborDeltaIndices = getDefaultNeighborDeltaIndices.call(grid);
    oddRowIsLarger = grid.oddRowTileCount > grid.evenRowTileCount;

    for (rowIndex = 0; rowIndex < rowCount; rowIndex += 1, anchorY += grid.rowDeltaY) {
      isOddRow = rowIndex % 2 === 0;
      isLargerRow = oddRowIsLarger && isOddRow || !oddRowIsLarger && !isOddRow;

      if (isOddRow) {
        anchorX = grid.oddRowXOffset;
        columnCount = grid.oddRowTileCount;
      } else {
        anchorX = grid.evenRowXOffset;
        columnCount = grid.evenRowTileCount;
      }

      for (columnIndex = 0; columnIndex < columnCount;
           tileIndex += 1, columnIndex += 1, anchorX += grid.tileDeltaX) {
        isMarginTile = isOddRow ?
            columnIndex < grid.oddRowContentStartIndex ||
                columnIndex > grid.oddRowContentEndIndex :
            columnIndex < grid.evenRowContentStartIndex ||
                columnIndex > grid.evenRowContentEndIndex;

        isBorderTile = grid.isVertical ?
            (columnIndex === 0 || columnIndex === columnCount - 1 ||
              rowIndex === 0 || rowIndex === rowCount - 1) :
            (rowIndex <= 1 || rowIndex >= rowCount - 2 ||
                isLargerRow && (columnIndex === 0 || columnIndex === columnCount - 1));

        isCornerTile = isBorderTile && (grid.isVertical ?
            ((columnIndex === 0 || columnIndex === columnCount - 1) &&
                (rowIndex === 0 || rowIndex === rowCount - 1)) :
            ((rowIndex <= 1 || rowIndex >= rowCount - 2) &&
                (isLargerRow && (columnIndex === 0 || columnIndex === columnCount - 1))));

        grid.originalTiles[tileIndex] = new window.hg.Tile(grid.svg, grid, anchorX, anchorY,
            config.tileOuterRadius, grid.isVertical, config.tileHue, config.tileSaturation,
            config.tileLightness, null, tileIndex, rowIndex, columnIndex, isMarginTile,
            isBorderTile, isCornerTile, isLargerRow, config.tileMass);

        if (isBorderTile) {
          grid.originalBorderTiles.push(grid.originalTiles[tileIndex]);
        }

        // Is the current tile within the content column?
        if (!isMarginTile) {
          // Does the current tile get to hold content?
          if (contentAreaIndex === grid.actualContentInnerIndices[postDataIndex]) {
            grid.originalTiles[tileIndex].setContent(grid.postData[postDataIndex]);
            grid.contentTiles[postDataIndex] = grid.originalTiles[tileIndex];
            postDataIndex += 1;
          }
          contentAreaIndex += 1;
        }

        // Determine the neighbor index offsets for the current tile
        tilesNeighborDeltaIndices[tileIndex] = getNeighborDeltaIndices.call(grid, rowIndex, rowCount,
            columnIndex, columnCount, isLargerRow, defaultNeighborDeltaIndices);
      }
    }

    setNeighborTiles.call(grid, tilesNeighborDeltaIndices);

    updateAllTilesCollection.call(grid, grid.originalTiles);
  }

  /**
   * Connects each tile with references to its neighborStates.
   *
   * @this Grid
   * @param {Array.<Array.<Number>>} tilesNeighborDeltaIndices
   */
  function setNeighborTiles(tilesNeighborDeltaIndices) {
    var grid, i, j, iCount, jCount, neighborTiles;

    grid = this;

    neighborTiles = [];

    // Give each tile references to each of its neighborStates
    for (i = 0, iCount = grid.originalTiles.length; i < iCount; i += 1) {
      // Get the neighborStates around the current tile
      for (j = 0, jCount = 6; j < jCount; j += 1) {
        neighborTiles[j] = !isNaN(tilesNeighborDeltaIndices[i][j]) ?
            grid.originalTiles[i + tilesNeighborDeltaIndices[i][j]] : null;
      }

      grid.originalTiles[i].setNeighborTiles(neighborTiles);
    }
  }

  /**
   * Get the actual neighbor index offsets for the tile described by the given parameters.
   *
   * NaN is used to represent the tile not having a neighbor on that side.
   *
   * @this Grid
   * @param {Number} rowIndex
   * @param {Number} rowCount
   * @param {Number} columnIndex
   * @param {Number} columnCount
   * @param {Boolean} isLargerRow
   * @param {Array.<Number>} defaultNeighborDeltaIndices
   * @returns {Array.<Number>}
   */
  function getNeighborDeltaIndices(rowIndex, rowCount, columnIndex, columnCount, isLargerRow,
                                   defaultNeighborDeltaIndices) {
    var grid, neighborDeltaIndices;

    grid = this;

    neighborDeltaIndices = defaultNeighborDeltaIndices.slice(0);

    // Remove neighbor indices according to the tile's position in the grid
    if (grid.isVertical) {
      // Is this the row with more or fewer tiles?
      if (isLargerRow) {
        // Is this the first column?
        if (columnIndex === 0) {
          neighborDeltaIndices[3] = Number.NaN;
          neighborDeltaIndices[4] = Number.NaN;
          neighborDeltaIndices[5] = Number.NaN;
        }

        // Is this the last column?
        if (columnIndex === columnCount - 1) {
          neighborDeltaIndices[0] = Number.NaN;
          neighborDeltaIndices[1] = Number.NaN;
          neighborDeltaIndices[2] = Number.NaN;
        }
      } else {
        // Is this the first column?
        if (columnIndex === 0) {
          neighborDeltaIndices[4] = Number.NaN;
        }

        // Is this the last column?
        if (columnIndex === columnCount - 1) {
          neighborDeltaIndices[1] = Number.NaN;
        }
      }

      // Is this the first row?
      if (rowIndex === 0) {
        neighborDeltaIndices[0] = Number.NaN;
        neighborDeltaIndices[5] = Number.NaN;
      }

      // Is this the last row?
      if (rowIndex === rowCount - 1) {
        neighborDeltaIndices[2] = Number.NaN;
        neighborDeltaIndices[3] = Number.NaN;
      }
    } else {
      if (isLargerRow) {
        // Is this the first column?
        if (columnIndex === 0) {
          neighborDeltaIndices[4] = Number.NaN;
          neighborDeltaIndices[5] = Number.NaN;
        }

        // Is this the last column?
        if (columnIndex === columnCount - 1) {
          neighborDeltaIndices[1] = Number.NaN;
          neighborDeltaIndices[2] = Number.NaN;
        }
      }

      // Is this the first or second row?
      if (rowIndex ===0) {
        neighborDeltaIndices[0] = Number.NaN;
        neighborDeltaIndices[1] = Number.NaN;
        neighborDeltaIndices[5] = Number.NaN;
      } else if (rowIndex === 1) {
        neighborDeltaIndices[0] = Number.NaN;
      }

      // Is this the last or second-to-last row?
      if (rowIndex === rowCount - 1) {
        neighborDeltaIndices[2] = Number.NaN;
        neighborDeltaIndices[3] = Number.NaN;
        neighborDeltaIndices[4] = Number.NaN;
      } else if (rowIndex === rowCount - 2) {
        neighborDeltaIndices[3] = Number.NaN;
      }
    }

    return neighborDeltaIndices;
  }

  /**
   * Calculates the index offsets of the neighborStates of a tile.
   *
   * @this Grid
   * @returns {Array.<Number>}
   */
  function getDefaultNeighborDeltaIndices() {
    var grid, maxColumnCount, neighborDeltaIndices;

    grid = this;
    neighborDeltaIndices = [];
    maxColumnCount = grid.oddRowTileCount > grid.evenRowTileCount ?
        grid.oddRowTileCount : grid.evenRowTileCount;

    // Neighbor delta indices are dependent on current screen dimensions
    if (grid.isVertical) {
      neighborDeltaIndices[0] = -maxColumnCount + 1; // top-right
      neighborDeltaIndices[1] = 1; // right
      neighborDeltaIndices[2] = maxColumnCount; // bottom-right
      neighborDeltaIndices[3] = maxColumnCount - 1; // bottom-left
      neighborDeltaIndices[4] = -1; // left
      neighborDeltaIndices[5] = -maxColumnCount; // top-left
    } else {
      neighborDeltaIndices[0] = -maxColumnCount * 2 + 1; // top
      neighborDeltaIndices[1] = -maxColumnCount + 1; // top-right
      neighborDeltaIndices[2] = maxColumnCount; // bottom-right
      neighborDeltaIndices[3] = maxColumnCount * 2 - 1; // bottom
      neighborDeltaIndices[4] = maxColumnCount - 1; // bottom-left
      neighborDeltaIndices[5] = -maxColumnCount; // top-left
    }

    return neighborDeltaIndices;
  }

  /**
   * Removes all content from the SVG.
   *
   * @this Grid
   */
  function clearSvg() {
    var grid, svg;

    grid = this;
    svg = grid.svg;

    grid.annotations.destroyAnnotations();

    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    grid.svg.appendChild(grid.svgDefs);
  }

  /**
   * Sets an 'data-hg-index' attribute on each tile element to match that tile's current index in this
   * grid's allTiles array.
   *
   * @this Grid
   */
  function setTileIndexAttributes() {
    var grid, i, count;

    grid = this;

    for (i = 0, count = grid.allTiles.length; i < count; i += 1) {
      grid.allTiles[i].element.setAttribute('data-hg-index', i);
    }
  }

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  /**
   * Prints to the console some information about this grid.
   *
   * This is useful for testing purposes.
   */
  function logGridInfo() {
    var grid = this;

    console.log('// --- Grid Info: ------- //');
    console.log('// - Tile count=' + grid.originalTiles.length);
    console.log('// - Row count=' + grid.rowCount);
    console.log('// - Odd row tile count=' + grid.oddRowTileCount);
    console.log('// - Even row tile count=' + grid.evenRowTileCount);
    console.log('// ------------------------- //');
  }

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  /**
   * Computes spatial parameters of the tiles in this grid.
   *
   * @this Grid
   */
  function resize() {
    var grid;

    grid = this;

    if (grid.allTiles) {
      grid.allTiles.forEach(function (tile) {
        tile.destroy();
      });
    }

    if (grid.isPostOpen) {
      grid.pagePost.destroy();
    }

    grid.originalCenter = {x: Number.NaN, y: Number.NaN};
    grid.currentCenter = {x: Number.NaN, y: Number.NaN};
    grid.panCenter = {x: Number.NaN, y: Number.NaN};
    grid.isPostOpen = false;
    grid.isTransitioning = false;
    grid.expandedTile = null;
    grid.sectors = [];
    grid.allTiles = null;
    grid.allNonContentTiles = null;
    grid.lastExpansionJob = null;
    grid.parent.style.overflowX = 'hidden';
    grid.parent.style.overflowY = 'auto';

    clearSvg.call(grid);
    computeGridParameters.call(grid);

    createTiles.call(grid);

    logGridInfo.call(grid);
  }

  /**
   * Sets the color of this grid's background.
   *
   * @this Grid
   */
  function setBackgroundColor() {
    var grid = this;

    grid.parent.style.backgroundColor = 'hsl(' + config.backgroundHue + ',' +
        config.backgroundSaturation + '%,' + config.backgroundLightness + '%)';
  }

  /**
   * Sets the color of this grid's tiles.
   *
   * @this Grid
   */
  function updateTileColor() {
    var grid, i, count;

    grid = this;

    for (i = 0, count = grid.allNonContentTiles.length; i < count; i += 1) {
      grid.allNonContentTiles[i].setColor(config.tileHue, config.tileSaturation,
          config.tileLightness);
    }
  }

  /**
   * Sets the mass of this grid's tiles.
   *
   * @this Grid
   * @param {Number} mass
   */
  function updateTileMass(mass) {
    var grid, i, count;

    grid = this;

    for (i = 0, count = grid.allTiles.length; i < count; i += 1) {
      grid.allTiles[i].particle.m = mass;
    }
  }

  /**
   * Sets this AnimationJob as started.
   *
   * @this Grid
   */
  function start() {
    var grid = this;

    grid.isComplete = false;
  }

  /**
   * Updates the animation progress of this AnimationJob to match the given time.
   *
   * @this Grid
   * @param {Number} currentTime
   * @param {Number} deltaTime
   */
  function update(currentTime, deltaTime) {
    var grid, i, count;

    grid = this;

    for (i = 0, count = grid.allTiles.length; i < count; i += 1) {
      grid.allTiles[i].update(currentTime, deltaTime);
    }
  }

  /**
   * Draws the current state of this AnimationJob.
   *
   * @this Grid
   */
  function draw() {
    var grid, i, count;

    grid = this;

    for (i = 0, count = grid.allTiles.length; i < count; i += 1) {
      grid.allTiles[i].draw();
    }

    if (grid.isPostOpen) {
      grid.pagePost.draw();
    }
  }

  /**
   * Stops this AnimationJob, and returns the element to its original form.
   *
   * @this Grid
   */
  function cancel() {
    var grid = this;

    grid.isComplete = true;
  }

  /**
   * Sets the tile that the pointer is currently hovering over.
   *
   * @this Grid
   * @param {Tile} hoveredTile
   */
  function setHoveredTile(hoveredTile) {
    var grid = this;

    if (grid.hoveredTile) {
      grid.hoveredTile.setIsHighlighted(false);
    }

    if (hoveredTile) {
      hoveredTile.setIsHighlighted(true);
    }

    grid.hoveredTile = hoveredTile;
  }

  /**
   * @this Grid
   * @param {Tile} tile
   * @param {{x:Number,y:Number}} startPosition
   * @returns {PagePost}
   */
  function createPagePost(tile, startPosition) {
    var grid = this;

    grid.pagePost = new window.hg.PagePost(tile, startPosition);

    return grid.pagePost;
  }

  /**
   * @this Grid
   */
  function destroyPagePost() {
    var grid = this;

    grid.pagePost.destroy();
    grid.pagePost = null;
  }

  /**
   * Sets the allTiles property to be the given array.
   *
   * @this Grid
   * @param {Array.<Tile>} newTiles
   */
  function updateAllTilesCollection(newTiles) {
    var grid = this;
    var i, count, j;

    grid.allTiles = newTiles;
    grid.allNonContentTiles = [];

    // Create a collection of all of the non-content tiles
    for (j = 0, i = 0, count = newTiles.length; i < count; i += 1) {
      if (!newTiles[i].holdsContent) {
        grid.allNonContentTiles[j++] = newTiles[i];
      }
    }

    // Reset the annotations for the new tile collection
    grid.annotations.destroyAnnotations();
    grid.annotations.createAnnotations();

    setTileIndexAttributes.call(grid);
  }

  /**
   * @this Grid
   */
  function init() {
    var job = this;

    config.computeDependentValues();
  }

  console.log('Grid module loaded');
})();

/**
 * This module defines a constructor for Input objects.
 *
 * Input objects handle the user-input logic for a Grid.
 *
 * @module Input
 */
(function () {

  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var config = {};

  config.contentTileClickAnimation = 'Radiate Highlight'; // 'Radiate Highlight'|'Radiate Lines'|'Random Line'|'None'
  config.emptyTileClickAnimation = 'Radiate Highlight'; // 'Radiate Highlight'|'Radiate Lines'|'Random Line'|'None'

  config.possibleClickAnimations = {
    'Radiate Highlight': window.hg.controller.transientJobs.HighlightRadiateJob.create,
    'Radiate Lines': window.hg.controller.transientJobs.LinesRadiateJob.create,
    'Random Line': window.hg.controller.transientJobs.LineJob.create,
    'None': function () {}
  };

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @constructor
   * @global
   * @param {Grid} grid
   */
  function Input(grid) {
    var input = this;

    input.grid = grid;

    // Exposing this function so that we can automatically open the post corresponding to the URL.
    // How this is accessed should be refactored.
    input.createClickAnimation = createClickAnimation;

    addPointerEventListeners.call(input);
  }

  Input.config = config;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.Input = Input;

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  /**
   * Adds event listeners for mouse and touch events for the grid.
   *
   * @this Input
   */
  function addPointerEventListeners() {
    var input;

    input = this;

    document.addEventListener('mouseover', handlePointerOver, false);
    document.addEventListener('mouseout', handlePointerOut, false);
    document.addEventListener('mousemove', handlePointerMove, false);
    document.addEventListener('mousedown', handlePointerDown, false);
    document.addEventListener('mouseup', handlePointerUp, false);
    document.addEventListener('keydown', handleKeyDown, false);
    // TODO: add touch support

    function handlePointerOver(event) {
      var tile;

      if (tile = getTileFromEvent(event)) {

        if (tile.element.getAttribute('data-hg-post-tile')) {
          // TODO: reset the other tile parameters
        }

        input.grid.setHoveredTile(tile);
      }
    }

    function handlePointerOut(event) {
      var tile;

      if (!event.relatedTarget || event.relatedTarget.nodeName === 'HTML') {
        console.log('The mouse left the viewport');

        input.grid.setHoveredTile(null);
      } else if (tile = getTileFromEvent(event)) {

        if (tile.element.getAttribute('data-hg-post-tile')) {
          // TODO: reset the other tile parameters
        }

        input.grid.setHoveredTile(null);

        window.hg.controller.transientJobs.HighlightHoverJob.create(input.grid, tile);

        event.stopPropagation();
      }
    }

    function handlePointerMove(event) {
      if (event.target.getAttribute('data-hg-post-tile')) {
        // TODO:
      } else if (event.target.getAttribute('data-hg-tile')) {
        // TODO:
      }
    }

    function handlePointerDown(event) {
      if (event.target.getAttribute('data-hg-post-tile')) {
        // TODO:
      }
    }

    function handlePointerUp(event) {
      var tile;

      if (event.button === 0 && (tile = getTileFromEvent(event))) {

        if (tile.element.getAttribute('data-hg-post-tile')) {
          // TODO:
        }

        createClickAnimation.call(input, input.grid, tile);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape' || event.key === 'Esc') {
        closeOpenPost.call(input, false);
      }
    }

    function getTileFromEvent(event) {
      var tileIndex;

      if (event.target.getAttribute('data-hg-tile')) {
        tileIndex = event.target.getAttribute('data-hg-index');
        return input.grid.allTiles[tileIndex];
      } else if (event.target.parentElement.getAttribute('data-hg-tile')) {
        tileIndex = event.target.parentElement.getAttribute('data-hg-index');
        return input.grid.allTiles[tileIndex];
      } else {
        return null;
      }
    }
  }

  /**
   * @param {Grid} grid
   * @param {Tile} tile
   * @this Input
   */
  function createClickAnimation(grid, tile) {
    var input = this;

    if (tile.holdsContent) {
      // Trigger an animation for the click
      config.possibleClickAnimations[config.contentTileClickAnimation](grid, tile);

      // Close any open post
      closeOpenPost.call(input, true);

      // Open the post for the given tile
      window.hg.controller.transientJobs.OpenPostJob.create(grid, tile);
    } else {
      // Trigger an animation for the click
      config.possibleClickAnimations[config.emptyTileClickAnimation](grid, tile);

      // Close any open post
      closeOpenPost.call(input, false);
    }
  }

  /**
   * @param {Boolean} isPairedWithAnotherOpen
   * @this Input
   */
  function closeOpenPost(isPairedWithAnotherOpen) {
    var input = this;

    // Close any open post
    if (input.grid.isPostOpen) {
      window.hg.controller.transientJobs.ClosePostJob.create(
          input.grid, input.grid.expandedTile, isPairedWithAnotherOpen);
    }
  }

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  console.log('Input module loaded');
})();

/**
 * This module defines a constructor for PagePost objects.
 *
 * PagePost objects handle the actual textual contents of the main, enlarged post area.
 *
 * @module PagePost
 */
(function () {

  // TODO: also update the tilepost drawing to utilize the reset job

  // TODO: refactor PagePost, TilePost, and Carousel code

  // TODO: sort post items by date

  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var config;

  config = {};

  config.urlLabels = {
    'homepage': 'Homepage',
    'published': 'Published at',
    'demo': 'Demo',
    'npm': 'NPM registry',
    'bower': 'Bower registry',
    'codepen': 'CodePen',
    'github': 'Source code',
    'googleCode': 'Source code',
    'githubProfile': 'GitHub',
    'linkedin': 'LinkedIn',
    'twitter': 'Twitter',
    'facebook': 'Facebook',
    'googlePlus': 'Google+',
    'reverbNation': 'Reverb Nation',
    'resume': 'Resume',
    'youtube': 'YouTube',
    'soundcloud': 'SoundCloud',
    'itchio': 'itch.io',
    'ludum-dare': 'Ludum Dare',
    'global-game-jam': 'Global Game Jam',
    'gmtk': 'GMTK game jam',
    'devlog': 'Devlog',
    'snoring-cat': 'Snoring Cat LLC',
    'chrome-web-store': 'Chrome Web Store',
    'play-store': 'Google Play Store',
    'app-store': 'Apple App Store',
    'godot-asset-library': 'Godot Asset Library',
  };

  config.monthLabels = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
  };

  //  --- Dependent parameters --- //

  config.computeDependentValues = function () {
  };

  config.computeDependentValues();

  function addCloseDefinition() {
    var body = document.querySelector('body');
    var svg = document.createElementNS(window.hg.util.svgNamespace, 'svg');
    var symbol = document.createElementNS(window.hg.util.svgNamespace, 'symbol');
    var close = document.createElementNS(window.hg.util.svgNamespace, 'path');

    body.appendChild(svg);
    svg.appendChild(symbol);
    symbol.appendChild(close);

    svg.style.display = 'none';
    symbol.setAttribute('id', 'close');
    symbol.setAttribute('width', '40');
    symbol.setAttribute('height', '40');
    symbol.setAttribute('viewBox', '0 0 12.9 9.1');
    close.setAttribute('d', 'M1.8-1.9 0-0.1 4.6 4.6 0 9.2l1.8 1.8 4.6-4.6 4.6 4.6 1.8-1.8-4.6-4.6 4.6-4.6-1.8-1.8-4.6 4.6z');
    window.hg.util.addClass(close, 'close-path');
  }

  addCloseDefinition();

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @constructor
   * @global
   * @param {Tile} tile
   * @param {{x:Number,y:Number}} startCenter
   */
  function PagePost(tile, startCenter) {
    var pagePost = this;

    pagePost.tile = tile;
    pagePost.elements = null;
    pagePost.carousel = null;
    pagePost.opacity = 0;
    pagePost.paddingX = Number.NaN;
    pagePost.paddingY = Number.NaN;
    pagePost.halfWidth = Number.NaN;
    pagePost.halfHeight = Number.NaN;
    pagePost.innerWrapperPaddingFromCss = Number.NaN;
    pagePost.center = {
      x: startCenter.x,
      y: startCenter.y
    };

    pagePost.loadCarouselMedia = loadCarouselMedia;
    pagePost.draw = draw;
    pagePost.destroy = destroy;

    createElements.call(pagePost);

    console.log('PagePost created: postId=' + tile.postData.id +
    ', tileIndex=' + tile.originalIndex);
  }

  PagePost.config = config;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.PagePost = PagePost;

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  /**
   * @this PagePost
   */
  function createElements() {
    var pagePost = this;

    var converter = new showdown.Converter();
    converter.setFlavor('github');

    var horizontalSideLength = window.hg.Grid.config.tileShortLengthWithGap *
        (window.hg.OpenPostJob.config.expandedDisplacementTileCount + 4.25);
    var verticalSideLength = window.hg.Grid.config.longGap *
        (window.hg.OpenPostJob.config.expandedDisplacementTileCount * 2) +
        window.hg.Grid.config.tileOuterRadius *
        (3 * window.hg.OpenPostJob.config.expandedDisplacementTileCount + 2);

    // Adjust post dimensions for smaller openings
    switch (window.hg.OpenPostJob.config.expandedDisplacementTileCount) {
      case 2:
        verticalSideLength += window.hg.Grid.config.tileOuterRadius;
        break;
      case 1:
        verticalSideLength += window.hg.Grid.config.tileOuterRadius * 3;
        horizontalSideLength -= window.hg.Grid.config.tileShortLengthWithGap;
        break;
      case 0:
        verticalSideLength += window.hg.Grid.config.tileOuterRadius * 4;
        horizontalSideLength -= window.hg.Grid.config.tileShortLengthWithGap;
        break;
      default:
        break;
    }

    var horizontalPadding = 1.4 * window.hg.Grid.config.tileShortLengthWithGap;
    var verticalPadding = 2.65 * window.hg.Grid.config.tileOuterRadius;

    var width, height, paddingX, paddingY, gradientColor1String,
      gradientColor2String, innerWrapperPaddingFromCss, innerWrapperVerticalPadding;

    if (pagePost.tile.grid.isVertical) {
      width = horizontalSideLength;
      height = verticalSideLength;
      paddingX = horizontalPadding;
      paddingY = verticalPadding;
    } else {
      width = verticalSideLength;
      height = horizontalSideLength;
      paddingX = verticalPadding;
      paddingY = horizontalPadding;
    }

    paddingY += 32;

    width -= paddingX * 2;
    height -= paddingY * 2;

    // Mobile responsiveness.
    var closeButtonTop = NaN;
    if (height + paddingY * 2 > window.innerHeight) {
      paddingY = 100;
      height = window.innerHeight - paddingY * 2;
      closeButtonTop = 68;
    }
    if (window.hg.util.isSmallScreen()) {
      width = window.innerWidth;
      paddingX = 0;
    }

    pagePost.paddingX = paddingX;
    pagePost.paddingY = paddingY;
    pagePost.halfWidth = width / 2;
    pagePost.halfHeight = height / 2;

    gradientColor1String = 'hsl(' +
      window.hg.Grid.config.backgroundHue + ',' +
      window.hg.Grid.config.backgroundSaturation + '%,' +
      window.hg.Grid.config.backgroundLightness + '%)';
    gradientColor2String = 'hsla(' +
      window.hg.Grid.config.backgroundHue + ',' +
      window.hg.Grid.config.backgroundSaturation + '%,' +
      window.hg.Grid.config.backgroundLightness + '%,0)';

    // ---  --- //

    var container = document.createElement('div');
    var outerWrapper = document.createElement('div');
    var innerWrapper = document.createElement('div');
    var title = document.createElement('h1');
    var content = document.createElement('div');
    var closeButton = document.createElement('a');
    var logo = document.createElement('div');
    var date = document.createElement('div');
    var location = document.createElement('div');
    var jobTitle = document.createElement('div');
    var urls = document.createElement('div');
    var categories = document.createElement('div');
    var topGradient = document.createElement('div');
    var bottomGradient = document.createElement('div');

    pagePost.tile.grid.parent.appendChild(container);
    container.appendChild(outerWrapper);
    outerWrapper.appendChild(innerWrapper);
    innerWrapper.appendChild(closeButton);
    innerWrapper.appendChild(logo);
    innerWrapper.appendChild(date);
    innerWrapper.appendChild(location);
    innerWrapper.appendChild(jobTitle);
    innerWrapper.appendChild(title);
    innerWrapper.appendChild(urls);
    innerWrapper.appendChild(content);
    innerWrapper.appendChild(categories);
    container.appendChild(topGradient);
    container.appendChild(bottomGradient);

    pagePost.elements = [];
    pagePost.elements.outerWrapper = outerWrapper;
    pagePost.elements.container = container;
    pagePost.elements.title = title;
    pagePost.elements.content = content;
    pagePost.elements.closeButton = closeButton;
    pagePost.elements.logo = logo;
    pagePost.elements.date = date;
    pagePost.elements.urls = urls;
    pagePost.elements.categories = categories;

    container.setAttribute('data-hg-post-container', 'data-hg-post-container');
    container.style.position = 'absolute';
    container.style.width = width + paddingX + 'px';
    container.style.height = height + paddingY * 2 + 'px';
    container.style.margin = '0';
    container.style.padding = '0';
    container.style.overflow = 'hidden';
    container.style.zIndex = window.hg.controller.isSafariBrowser ? '1500' : '500';

    outerWrapper.setAttribute('data-hg-post-outer-wrapper', 'data-hg-post-outer-wrapper');
    outerWrapper.style.width = width + 'px';
    outerWrapper.style.height = height + paddingY * 2 + 'px';
    outerWrapper.style.margin = '0';
    outerWrapper.style.padding = '0 0 0 ' + paddingX + 'px';
    outerWrapper.style.overflow = 'auto';
    outerWrapper.style.webkitOverflowScrolling = 'touch';// This is important for scrolling on mobile devices

    innerWrapper.setAttribute('data-hg-post-inner-wrapper', 'data-hg-post-inner-wrapper');
    innerWrapperPaddingFromCss =
      parseInt(window.getComputedStyle(innerWrapper, null).getPropertyValue('padding-top'));
    innerWrapperVerticalPadding = innerWrapperPaddingFromCss + paddingY;
    innerWrapper.style.padding =
      innerWrapperVerticalPadding + 'px ' + innerWrapperPaddingFromCss + 'px ' +
      innerWrapperVerticalPadding + 'px ' + innerWrapperPaddingFromCss + 'px';
    innerWrapper.style.minHeight = height - innerWrapperPaddingFromCss * 2 + 'px';
    innerWrapper.style.overflowX = 'hidden';

    pagePost.innerWrapperPaddingFromCss = innerWrapperPaddingFromCss;

    title.setAttribute('data-hg-post-title', 'data-hg-post-title');
    title.innerHTML = pagePost.tile.postData.titleLong;

    topGradient.style.position = 'absolute';
    topGradient.style.top = '0';
    topGradient.style.left = paddingX + 'px';
    topGradient.style.height = paddingY + 'px';
    topGradient.style.width = width + 'px';
    topGradient.style.backgroundColor = '#000000';
    topGradient.style.background =
      'linear-gradient(0,' + gradientColor2String + ',' + gradientColor1String + ' 75%)';
    topGradient.style.pointerEvents = 'none';

    bottomGradient.style.position = 'absolute';
    bottomGradient.style.bottom = '0';
    bottomGradient.style.left = paddingX + 'px';
    bottomGradient.style.height = paddingY + 'px';
    bottomGradient.style.width = width + 'px';
    bottomGradient.style.backgroundColor = '#000000';
    bottomGradient.style.background =
      'linear-gradient(0,' + gradientColor1String + ' 25%,' + gradientColor2String + ')';
    bottomGradient.style.pointerEvents = 'none';

    content.setAttribute('data-hg-post-content', 'data-hg-post-content');
    content.innerHTML = converter.makeHtml(pagePost.tile.postData.content);

    closeButton.setAttribute('data-hg-post-close', 'data-hg-post-close');
    closeButton.setAttribute('href', '#');
    if (closeButtonTop) {
      closeButton.style.top = closeButtonTop + 'px';
    }
    closeButton.addEventListener('click', function () {
      // Close any open post
      var grid = pagePost.tile.grid;
      if (grid.isPostOpen) {
        window.hg.controller.transientJobs.ClosePostJob.create(grid, grid.expandedTile, false);
      }
    }, false);

    var closeButtonSvg = document.createElementNS(window.hg.util.svgNamespace, 'svg');
    var closeButtonUse = document.createElementNS(window.hg.util.svgNamespace, 'use');

    closeButton.appendChild(closeButtonSvg);
    closeButtonSvg.appendChild(closeButtonUse);

    closeButtonSvg.setAttribute('width', '40');
    closeButtonSvg.setAttribute('height', '40');
    closeButtonUse.setAttributeNS(window.hg.util.xlinkNamespace, 'xlink:href', '#close');

    logo.setAttribute('data-hg-post-logo', 'data-hg-post-logo');
    logo.style.backgroundImage = 'url(' + pagePost.tile.postData.logoSrc + ')';

    date.setAttribute('data-hg-post-date', 'data-hg-post-date');
    addDate.call(pagePost);

    location.setAttribute('data-hg-post-location', 'data-hg-post-location');
    location.innerHTML = pagePost.tile.postData.location;

    jobTitle.setAttribute('data-hg-post-job-title', 'data-hg-post-job-title');
    jobTitle.innerHTML = pagePost.tile.postData.jobTitle;

    urls.setAttribute('data-hg-post-urls', 'data-hg-post-urls');
    addUrls.call(pagePost);

    categories.setAttribute('data-hg-post-categories', 'data-hg-post-categories');
    addCategories.call(pagePost);

    // Create the Carousel and insert it before the post's main contents
    pagePost.carousel = new window.hg.Carousel(pagePost.tile.grid, pagePost, innerWrapper,
      pagePost.tile.postData.images, pagePost.tile.postData.videos, true);
    innerWrapper.removeChild(pagePost.carousel.elements.container);
    innerWrapper.insertBefore(pagePost.carousel.elements.container, urls);

    setTimeout(function () {
      // If the post ID in the URL hash matches the text of a header in the post content, then the
      // browser will automatically scroll downward to the header, which we want to prevent.
      if (pagePost.elements.outerWrapper) {
        pagePost.elements.outerWrapper.scrollTo(0, 0);
      }
    }, 10);

    draw.call(pagePost);
  }

  /**
   * @this PagePost
   */
  function addDate() {
    var pagePost = this;
    var dateElement = pagePost.elements.date;
    var dateValue = pagePost.tile.postData.date;

    // Date values can be given as a single string or as an object with a start and end property
    if (typeof dateValue === 'object') {
      dateElement.innerHTML = parseDateString(dateValue.start) + ' &ndash; ' + parseDateString(dateValue.end);
    } else {
      dateElement.innerHTML = parseDateString(dateValue);
    }

    // Hide the date panel if no date was given
    if (!pagePost.tile.postData.date) {
      dateElement.style.display = 'none';
    }

    // ---  --- //

    function parseDateString(dateString) {
      var dateParts;

      if (dateString.toLowerCase() === 'present') {
        return dateString;
      } else {
        dateParts = dateString.split('/');

        switch (dateParts.length) {
          case 1:
            return dateParts[0];
          case 2:
            return config.monthLabels[dateParts[0]] + ' ' + dateParts[1];
          case 3:
            return config.monthLabels[dateParts[0]] + ' ' + dateParts[1] + ', ' + dateParts[2];
          default:
            throw new Error('Invalid date string format: ' + dateString);
        }
      }
    }
  }

  /**
   * @this PagePost
   */
  function addUrls() {
    var pagePost = this;
    var urlsElement = pagePost.elements.urls;
    var urlKeys = Object.keys(pagePost.tile.postData.urls);

    urlKeys.forEach(function (key) {
      addUrl(key, pagePost.tile.postData.urls[key]);
    });

    // Hide the URLs panel if no URLs were given
    if (!urlKeys.length) {
      urlsElement.style.display = 'none';
    }

    // ---  --- //

    function addUrl(key, url) {
      var label, cleanedUrl, paragraphElement, linkElement;

      // Remove the protocol from the URL to make it more human-readable
      cleanedUrl = url.replace(/^.*:\/\//, '');

      label = config.urlLabels[key];

      if (!label) {
        console.warn('Unknown URL type: ' + key);
        label = key;
      }

      // --- Create the elements --- //

      paragraphElement = document.createElement('p');
      linkElement = document.createElement('a');

      paragraphElement.innerHTML = label + ': ';
      paragraphElement.style.overflow = 'hidden';
      paragraphElement.style.whiteSpace = 'nowrap';
      paragraphElement.style.textOverflow = 'ellipsis';

      linkElement.innerHTML = cleanedUrl;
      linkElement.setAttribute('href', url);

      paragraphElement.appendChild(linkElement);
      urlsElement.appendChild(paragraphElement);
    }
  }

  /**
   * @this PagePost
   */
  function addCategories() {
    var pagePost = this;
    var categoriesElement = pagePost.elements.categories;

    pagePost.tile.postData.categories.forEach(addCategoryCard);

    // Hide the categories panel if no categories were given
    if (!pagePost.tile.postData.categories.length) {
      categoriesElement.style.display = 'none';
    }

    // ---  --- //

    function addCategoryCard(category) {
      var categoryCard = document.createElement('span');
      categoriesElement.appendChild(categoryCard);

      categoryCard.setAttribute('data-hg-post-category-card', 'data-hg-post-category-card');
      categoryCard.style.display = 'inline-block';
      categoryCard.innerHTML = category;
    }
  }

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  // ------------------------------------------------------------------------------------------- //
  // Public static functions

  /**
   * @this PagePost
   */
  function loadCarouselMedia() {
    var pagePost = this;

    pagePost.carousel.loadMedia();
  }

  /**
   * @this PagePost
   */
  function draw() {
    var pagePost = this;

    pagePost.elements.container.style.left =
      pagePost.center.x - pagePost.halfWidth - pagePost.paddingX + 'px';
    pagePost.elements.container.style.top =
      pagePost.center.y - pagePost.halfHeight - pagePost.paddingY + 'px';

    pagePost.elements.container.style.opacity = pagePost.opacity;

    pagePost.carousel.draw();
  }

  /**
   * @this PagePost
   */
  function destroy() {
    var pagePost = this;

    pagePost.carousel.destroy();

    pagePost.tile.grid.parent.removeChild(pagePost.elements.container);
    pagePost.elements = null;
  }

  console.log('PagePost module loaded');
})();

/**
 * This module defines a constructor for Sector objects.
 *
 * Sector objects define a collection of hexagonal tiles that lie within a single sector of the
 * grid--outward from a given tile position.
 *
 * Sectors are one-sixth of the grid.
 *
 * Sectors are used to animate open and close a hole in the grid around a given tile, so that the
 * contents of that tile can be shown in an expanded form.
 *
 * @module Sector
 */
(function () {
  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var config = {};

  //  --- Dependent parameters --- //

  config.computeDependentValues = function () {
  };

  config.computeDependentValues();

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @global
   * @constructor
   * @param {Grid} grid
   * @param {Tile} baseTile
   * @param {Number} sectorIndex
   * @param {Number} expandedDisplacementTileCount
   *
   * PRE-CONDITION: The given baseTile is not a border tile (i.e., it has six neighbors).
   * PRE-CONDITION: The grid is in a closed state.
   *
   * POST-CONDITION: This sector is NOT guaranteed to collect all of the pre-existing tiles in the
   * sector nor to create all of the needed new tiles in the sector (but it probably will).
   */
  function Sector(grid, baseTile, sectorIndex, expandedDisplacementTileCount) {
    var sector = this;

    sector.grid = grid;
    sector.baseTile = baseTile;
    sector.index = sectorIndex;
    sector.expandedDisplacementTileCount = expandedDisplacementTileCount;
    sector.originalAnchor = {x: Number.NaN, y: Number.NaN};
    sector.currentAnchor = {x: Number.NaN, y: Number.NaN};
    sector.majorNeighborDelta = {x: Number.NaN, y: Number.NaN};
    sector.minorNeighborDelta = {x: Number.NaN, y: Number.NaN};
    sector.expandedDisplacement = {x: Number.NaN, y: Number.NaN};
    sector.tiles = null;
    sector.tilesByIndex = null;
    sector.newTiles = null;

    sector.initializeExpandedStateExternalTileNeighbors =
      initializeExpandedStateExternalTileNeighbors;
    sector.destroy = destroy;
    sector.setOriginalPositionForExpansion = setSectorOriginalPositionForExpansion;
    sector.updateCurrentPosition = updateSectorCurrentPosition;

    setUpExpandedDisplacementValues.call(sector);
    setUpTiles.call(sector);
  }

  Sector.config = config;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.Sector = Sector;

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  /**
   * Calculates major and minor neighbor values and displacement values for the expanded grid
   * configuration.
   *
   * @this Sector
   */
  function setUpExpandedDisplacementValues() {
    var sector, expansionDirectionNeighborIndex, expansionDirectionNeighborDeltaX,
        expansionDirectionNeighborDeltaY;

    sector = this;

    // Compute which directions to iterate through tiles for this sector

    sector.majorNeighborIndex = sector.index;
    sector.minorNeighborIndex = (sector.index + 1) % 6;

    // Compute the axially-aligned distances between adjacent tiles

    sector.majorNeighborDelta.x =
        sector.baseTile.neighborStates[sector.majorNeighborIndex].tile.originalAnchor.x -
        sector.baseTile.originalAnchor.x;
    sector.majorNeighborDelta.y =
        sector.baseTile.neighborStates[sector.majorNeighborIndex].tile.originalAnchor.y -
        sector.baseTile.originalAnchor.y;
    sector.minorNeighborDelta.x =
        sector.baseTile.neighborStates[sector.minorNeighborIndex].tile.originalAnchor.x -
        sector.baseTile.originalAnchor.x;
    sector.minorNeighborDelta.y =
        sector.baseTile.neighborStates[sector.minorNeighborIndex].tile.originalAnchor.y -
        sector.baseTile.originalAnchor.y;

    // Compute the axially-aligned displacement values of this sector when the grid is expanded

    expansionDirectionNeighborIndex = (sector.index + 5) % 6;

    expansionDirectionNeighborDeltaX =
        sector.baseTile.neighborStates[expansionDirectionNeighborIndex].tile.originalAnchor.x -
        sector.baseTile.originalAnchor.x;
    expansionDirectionNeighborDeltaY =
        sector.baseTile.neighborStates[expansionDirectionNeighborIndex].tile.originalAnchor.y -
        sector.baseTile.originalAnchor.y;

    sector.expandedDisplacement.x =
        sector.expandedDisplacementTileCount * expansionDirectionNeighborDeltaX;
    sector.expandedDisplacement.y =
        sector.expandedDisplacementTileCount * expansionDirectionNeighborDeltaY;

    // Set up the base position values for this overall grid

    sector.originalAnchor.x = sector.baseTile.originalAnchor.x + sector.majorNeighborDelta.x;
    sector.originalAnchor.y = sector.baseTile.originalAnchor.y + sector.majorNeighborDelta.y;
    sector.currentAnchor.x = sector.originalAnchor.x;
    sector.currentAnchor.y = sector.originalAnchor.y;
  }

  /**
   * Populates the collection of tiles that lie within this sector. These include both the
   * pre-existing tiles and new tiles that are created.
   *
   * @this Sector
   */
  function setUpTiles() {
    var sector;

    sector = this;

    sector.tilesByIndex = [];
    sector.newTiles = [];
    sector.tiles = [];

    // Get the old and new tiles for this sector, and set up neighbor states for the expanded grid
    // configuration
    collectOldTilesInSector.call(sector);
    collectNewTilesInSector.call(sector);

    // Re-assign temporary neighbor states for tiles in this sector
    initializeExpandedStateInternalTileNeighbors.call(sector);

    // Convert the two-dimensional array to a flat array
    flattenTileCollection.call(sector);
  }

  /**
   * Collects references to the pre-existing tiles that lie within this sector.
   *
   * PRE-CONDITION: The baseTile is not a border tile (i.e., it has six neighbors).
   *
   * POST-CONDITION: This double-pass major-to-minor line-iteration algorithm is NOT guaranteed to
   * collect all of the tiles in the viewport (but it is likely to) (the breaking edge case is
   * when the viewport's aspect ratio is very large or very small).
   *
   * @this Sector
   */
  function collectOldTilesInSector() {
    var sector;

    sector = this;

    // Collect all of the tiles for this sector into a two-dimensional array
    iterateOverTilesInSectorInMajorOrder();
    iterateOverTilesInSectorInMinorOrder();

    // ---  --- //

    function iterateOverTilesInSectorInMajorOrder() {
      var majorTile, currentTile, majorIndex, minorIndex;

      majorIndex = 0;
      majorTile = sector.baseTile.neighborStates[sector.majorNeighborIndex].tile;

      // Iterate over the major indices of the sector (aka, the "rows" of the sector)
      do {
        currentTile = majorTile;
        minorIndex = 0;

        // Set up the inner array for this "row" of the sector
        sector.tilesByIndex[majorIndex] = sector.tilesByIndex[majorIndex] || [];

        // Iterate over the minor indices of the sector (aka, the "columns" of the sector)
        do {
          // Store the current tile in the "row" if it hasn't already been stored
          if (!sector.tilesByIndex[majorIndex][minorIndex]) {
            addOldTileToSector.call(sector, currentTile, majorIndex, minorIndex);
          }

          minorIndex++;

        } while (currentTile.neighborStates[sector.minorNeighborIndex] &&
            (currentTile = currentTile.neighborStates[sector.minorNeighborIndex].tile));

        majorIndex++;

      } while (majorTile.neighborStates[sector.majorNeighborIndex] &&
          (majorTile = majorTile.neighborStates[sector.majorNeighborIndex].tile));
    }

    function iterateOverTilesInSectorInMinorOrder() {
      var minorTile, currentTile, majorIndex, minorIndex;

      minorIndex = 0;
      minorTile = sector.baseTile.neighborStates[sector.majorNeighborIndex].tile;

      // Iterate over the minor indices of the sector (aka, the "columns" of the sector)
      do {
        currentTile = minorTile;
        majorIndex = 0;

        // Iterate over the major indices of the sector (aka, the "rows" of the sector)
        do {
          // Set up the inner array for this "row" of the sector
          sector.tilesByIndex[majorIndex] = sector.tilesByIndex[majorIndex] || [];

          // Store the current tile in the "column" if it hasn't already been stored
          if (!sector.tilesByIndex[majorIndex][minorIndex]) {
            addOldTileToSector.call(sector, currentTile, majorIndex, minorIndex);
          }

          majorIndex++;

        } while (currentTile.neighborStates[sector.majorNeighborIndex] &&
            (currentTile = currentTile.neighborStates[sector.majorNeighborIndex].tile));

        minorIndex++;

      } while (minorTile.neighborStates[sector.minorNeighborIndex] &&
          (minorTile = minorTile.neighborStates[sector.minorNeighborIndex].tile));
    }
  }

  /**
   * Creates new tiles that will be shown within this sector.
   *
   * PRE-CONDITION: The baseTile is not a border tile (i.e., it has six neighbors).
   *
   * POST-CONDITION: this double-pass major-to-minor line-iteration algorithm is NOT guaranteed to
   * collect all of the tiles in the viewport (but it is likely to) (the breaking edge case is
   * when the viewport's aspect ratio is very large or very small).
   *
   * @this Sector
   */
  function collectNewTilesInSector() {
    var sector, bounds;

    sector = this;

    bounds = computeBounds();

    // Collect all of the tiles for this sector into a two-dimensional array
    iterateOverTilesInSectorInMajorOrder(bounds);
    iterateOverTilesInSectorInMinorOrder(bounds);

    // ---  --- //

    /**
     * This calculates the min and max x and y coordinates for the furthest positions at which we may need to create
     * new tiles.
     *
     * This considers tile positions within the closed grid--i.e., before the sectors have expanded.
     *
     * These extremes are found by the following steps:
     *
     * 1. Calculate a viewport bounding box around the base tile
     * 2. Subtract or add an offset to the bounding box according to the displacement that the sector will undergo
     *
     * @returns {{minX: Number, maxX: Number, minY: Number, maxY: Number}}
     */
    function computeBounds() {
      var minX, maxX, minY, maxY, viewportHalfWidth, viewportHalfHeight;

      // Calculate the dimensions of the viewport with a little extra padding around the edges
      viewportHalfWidth = window.innerWidth / 2 + window.hg.Grid.config.tileLongLengthWithGap;
      viewportHalfHeight = window.innerHeight / 2 + window.hg.Grid.config.tileLongLengthWithGap;

      // Calculate the viewport bounding box around the base tile BEFORE sector expansion has been considered
      minX = sector.baseTile.originalAnchor.x - viewportHalfWidth;
      maxX = sector.baseTile.originalAnchor.x + viewportHalfWidth;
      minY = sector.baseTile.originalAnchor.y - viewportHalfHeight;
      maxY = sector.baseTile.originalAnchor.y + viewportHalfHeight;

      // Add the offset from sector expansion
      minX -= sector.expandedDisplacement.x;
      maxX -= sector.expandedDisplacement.x;
      minY -= sector.expandedDisplacement.y;
      maxY -= sector.expandedDisplacement.y;

      return {
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY
      };
    }

    function iterateOverTilesInSectorInMajorOrder(bounds) {
      var startX, startY, anchorX, anchorY, majorIndex, minorIndex;

      startX = sector.baseTile.originalAnchor.x + sector.majorNeighborDelta.x;
      startY = sector.baseTile.originalAnchor.y + sector.majorNeighborDelta.y;

      // Set up the first "column"
      majorIndex = 0;
      minorIndex = 0;
      anchorX = startX;
      anchorY = startY;

      // Iterate over the major indices of the sector (aka, the "rows" of the sector)
      do {
        // Set up the inner array for this "row" of the sector
        sector.tilesByIndex[majorIndex] = sector.tilesByIndex[majorIndex] || [];

        // Iterate over the minor indices of the sector (aka, the "columns" of the sector)
        do {
          // Create a new tile if one did not already exist for this position
          if (!sector.tilesByIndex[majorIndex][minorIndex]) {
            createNewTileInSector.call(sector, majorIndex, minorIndex, anchorX, anchorY);
          }

          // Set up the next "column"
          minorIndex++;
          anchorX += sector.minorNeighborDelta.x;
          anchorY += sector.minorNeighborDelta.y;

        } while (anchorX >= bounds.minX && anchorX <= bounds.maxX && anchorY >= bounds.minY && anchorY <= bounds.maxY);

        // Set up the next "row"
        majorIndex++;
        minorIndex = 0;
        anchorX = startX + majorIndex * sector.majorNeighborDelta.x;
        anchorY = startY + majorIndex * sector.majorNeighborDelta.y;

      } while (anchorX >= bounds.minX && anchorX <= bounds.maxX && anchorY >= bounds.minY && anchorY <= bounds.maxY);
    }

    function iterateOverTilesInSectorInMinorOrder(bounds) {
      var startX, startY, anchorX, anchorY, majorIndex, minorIndex;

      startX = sector.baseTile.originalAnchor.x + sector.majorNeighborDelta.x;
      startY = sector.baseTile.originalAnchor.y + sector.majorNeighborDelta.y;

      // Set up the first "column"
      majorIndex = 0;
      minorIndex = 0;
      anchorX = startX;
      anchorY = startY;

      // Iterate over the minor indices of the sector (aka, the "columns" of the sector)
      do {
        // Iterate over the major indices of the sector (aka, the "rows" of the sector)
        do {
          // Set up the inner array for this "row" of the sector
          sector.tilesByIndex[majorIndex] = sector.tilesByIndex[majorIndex] || [];

          // Create a new tile if one did not already exist for this position
          if (!sector.tilesByIndex[majorIndex][minorIndex]) {
            createNewTileInSector.call(sector, majorIndex, minorIndex, anchorX, anchorY);
          }

          // Set up the next "row"
          majorIndex++;
          anchorX += sector.majorNeighborDelta.x;
          anchorY += sector.majorNeighborDelta.y;

        } while (anchorX >= bounds.minX && anchorX <= bounds.maxX && anchorY >= bounds.minY && anchorY <= bounds.maxY);

        // Set up the next "column"
        majorIndex = 0;
        minorIndex++;
        anchorX = startX + minorIndex * sector.minorNeighborDelta.x;
        anchorY = startY + minorIndex * sector.minorNeighborDelta.y;

      } while (anchorX >= bounds.minX && anchorX <= bounds.maxX && anchorY >= bounds.minY && anchorY <= bounds.maxY);
    }
  }

  /**
   * Adds the given pre-existing tile to this Sector's two-dimensional tile collection.
   *
   * Initializes the tile's expandedState configuration.
   *
   * @this Sector
   * @param {Tile} tile
   * @param {Number} majorIndex
   * @param {Number} minorIndex
   */
  function addOldTileToSector(tile, majorIndex, minorIndex) {
    var sector = this;

    sector.tilesByIndex[majorIndex][minorIndex] = tile;

    window.hg.Tile.initializeTileExpandedState(tile, sector, majorIndex, minorIndex);

    tile.sectorAnchorOffset.x = tile.originalAnchor.x - sector.originalAnchor.x;
    tile.sectorAnchorOffset.y = tile.originalAnchor.y - sector.originalAnchor.y;
  }

  /**
   * Adds a new tile to this Sector's two-dimensional tile collection.
   *
   * Initializes the new tile's expandedState configuration.
   *
   * @this Sector
   * @param {Number} majorIndex
   * @param {Number} minorIndex
   * @param {Number} anchorX
   * @param {Number} anchorY
   */
  function createNewTileInSector(majorIndex, minorIndex, anchorX, anchorY) {
    var sector = this;

    var tile = new window.hg.Tile(sector.grid.svg, sector.grid, anchorX, anchorY,
        window.hg.Grid.config.tileOuterRadius, sector.grid.isVertical, window.hg.Grid.config.tileHue,
        window.hg.Grid.config.tileSaturation, window.hg.Grid.config.tileLightness, null, Number.NaN, Number.NaN,
        Number.NaN, true, false, false, false, window.hg.Grid.config.tileMass);

    addOldTileToSector.call(sector, tile, majorIndex, minorIndex);
    sector.newTiles[sector.newTiles.length] = tile;

    return tile;
  }

  /**
   * Calculates and stores the internal neighbor states for the expanded grid configuration for
   * each tile in this Sector.
   *
   * POST-CONDITION: this does not address external neighbor relations for tiles that lie on the
   * outside edge of this sector.
   *
   * @this Sector
   */
  function initializeExpandedStateInternalTileNeighbors() {
    var sector, majorIndex, minorIndex;

    sector = this;

    // Iterate over the major indices of the sector (aka, the "rows" of the sector)
    for (majorIndex = 0; sector.tilesByIndex[majorIndex]; majorIndex += 1) {

      // Iterate over the minor indices of the sector (aka, the "columns" of the sector)
      for (minorIndex in sector.tilesByIndex[majorIndex]) {
        setTileNeighborStates(sector, majorIndex, parseInt(minorIndex));
      }
    }

    // ---  --- //

    function setTileNeighborStates(sector, majorIndex, minorIndex) {
      var tile, neighborRelationIndex, neighborMajorIndex, neighborMinorIndex;

      tile = sector.tilesByIndex[majorIndex][minorIndex];

      for (neighborRelationIndex = 0; neighborRelationIndex < 6; neighborRelationIndex += 1) {

        // Determine the major and minor indices of the current neighbor
        switch (neighborRelationIndex) {
          case sector.index:
            neighborMajorIndex = majorIndex + 1;
            neighborMinorIndex = minorIndex;
            break;
          case (sector.index + 1) % 6:// TODO: pre-compute these case values
            neighborMajorIndex = majorIndex;
            neighborMinorIndex = minorIndex + 1;
            break;
          case (sector.index + 2) % 6:
            neighborMajorIndex = majorIndex - 1;
            neighborMinorIndex = minorIndex + 1;
            break;
          case (sector.index + 3) % 6:
            neighborMajorIndex = majorIndex - 1;
            neighborMinorIndex = minorIndex;
            break;
          case (sector.index + 4) % 6:
            neighborMajorIndex = majorIndex;
            neighborMinorIndex = minorIndex - 1;
            break;
          case (sector.index + 5) % 6:
            neighborMajorIndex = majorIndex + 1;
            neighborMinorIndex = minorIndex - 1;
            break;
          default:
            throw new Error('Invalid neighborRelationIndex: ' + neighborRelationIndex);
        }

        // Has a tile been created for the neighbor position?
        if (sector.tilesByIndex[neighborMajorIndex] &&
            sector.tilesByIndex[neighborMajorIndex][neighborMinorIndex]) {

          window.hg.Tile.setTileNeighborState(tile, neighborRelationIndex,
              sector.tilesByIndex[neighborMajorIndex][neighborMinorIndex]);
        }
      }
    }
  }

  /**
   * Converts the two-dimensional sector.tilesByIndex array into the flat sector.tiles array.
   *
   * @this Sector
   */
  function flattenTileCollection() {
    var sector, i, majorIndex, minorIndex;

    sector = this;

    i = 0;
    for (majorIndex in sector.tilesByIndex) {
      for (minorIndex in sector.tilesByIndex[majorIndex]) {
        sector.tiles[i++] = sector.tilesByIndex[majorIndex][minorIndex];
      }
    }
  }

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  /**
   * Calculates and stores the external neighbor states for the expanded grid configuration for
   * each tile in this Sector.
   *
   * @this Sector
   * @param {Array.<Sector>} sectors
   */
  function initializeExpandedStateExternalTileNeighbors(sectors) {
    var sector, innerEdgeTiles, neighborTileArrays, i, count, lowerNeighborIndex,
        upperNeighborIndex, innerEdgeNeighborSector, neighborMajorIndex;

    sector = this;

    lowerNeighborIndex = (sector.index + 2) % 6;
    upperNeighborIndex = (sector.index + 3) % 6;

    innerEdgeNeighborSector = sectors[(sector.index + 1) % 6];

    innerEdgeTiles = sector.tilesByIndex[0];
    neighborTileArrays = innerEdgeNeighborSector.tilesByIndex;

    i = sector.expandedDisplacementTileCount;
    neighborMajorIndex = 0;

    // --- Handle the first edge tile --- //

    if (innerEdgeTiles[i]) {
      // The first edge tile with an external neighbor will only have the lower neighbor
      window.hg.Tile.setTileNeighborState(innerEdgeTiles[i], lowerNeighborIndex,
          innerEdgeNeighborSector.tilesByIndex[neighborMajorIndex][0]);
    }

    // --- Handle the middle edge tiles --- //

    for (i += 1, count = innerEdgeTiles.length - 1; i < count; i += 1) {

      // The upper neighbor for the last tile
      window.hg.Tile.setTileNeighborState(innerEdgeTiles[i], upperNeighborIndex,
          innerEdgeNeighborSector.tilesByIndex[neighborMajorIndex][0]);

      neighborMajorIndex += 1;

      // The lower neighbor for the last tile
      window.hg.Tile.setTileNeighborState(innerEdgeTiles[i], lowerNeighborIndex,
          innerEdgeNeighborSector.tilesByIndex[neighborMajorIndex][0]);
    }

    // --- Handle the last edge tile --- //

    if (innerEdgeTiles[i]) {
      // The upper neighbor for the last tile
      window.hg.Tile.setTileNeighborState(innerEdgeTiles[i], upperNeighborIndex,
          innerEdgeNeighborSector.tilesByIndex[neighborMajorIndex][0]);

      neighborMajorIndex += 1;

      // The last edge tile with an external neighbor might not have the lower neighbor
      if (innerEdgeNeighborSector.tilesByIndex[neighborMajorIndex] &&
          innerEdgeNeighborSector.tilesByIndex[neighborMajorIndex][0]) {
        window.hg.Tile.setTileNeighborState(innerEdgeTiles[i], lowerNeighborIndex,
            innerEdgeNeighborSector.tilesByIndex[neighborMajorIndex][0]);
      }
    }

    // --- Mark the inner edge tiles as border tiles --- //

    // If the dimensions of the expanded post area are larger than that of the viewport, then we cannot simply use the
    // number of tiles along a side of this area
    count = sector.expandedDisplacementTileCount + 1;
    count = innerEdgeTiles.length < count ? innerEdgeTiles.length : count;

    for (i = 0; i < count; i += 1) {
      innerEdgeTiles[i].expandedState.isBorderTile = true;
    }

    // --- Mark the outer edge tiles as border tiles --- //

    i = innerEdgeTiles.length - 1 - sector.expandedDisplacementTileCount;
    i = i < 0 ? 0 : i;

    for (count = neighborTileArrays.length; i < count; i += 1) {
      if (neighborTileArrays[i][0]) {
        neighborTileArrays[i][0].expandedState.isBorderTile = true;
      }
    }

    // --- Mark the outermost sector tiles as border tiles --- //
    for (i = 0, count = sector.tilesByIndex.length; i < count; i += 1) {
      if (sector.tilesByIndex[i].length) {
        sector.tilesByIndex[i][sector.tilesByIndex[i].length - 1].expandedState.isBorderTile = true;
      }
    }
  }

  /**
   * Frees up memory used by this Sector.
   *
   * @this Sector
   * @param {Boolean} alsoDestroyOriginalTileExpandedState
   */
  function destroy(alsoDestroyOriginalTileExpandedState) {
    var sector, i, count;

    sector = this;

    if (alsoDestroyOriginalTileExpandedState) {
      for (i = 0, count = sector.tiles.length; i < count; i += 1) {
        sector.tiles[i].expandedState = null;
      }
    }

    for (i = 0, count = sector.newTiles.length; i < count; i += 1) {
      sector.newTiles[i].neighborStates = null;
      sector.newTiles[i].destroy();
    }
  }

  /**
   * Updates the base position of this Sector and the positions of all of its Tiles.
   *
   * @this Sector
   * @param {Boolean} isExpanded
   */
  function setSectorOriginalPositionForExpansion(isExpanded) {
    var sector, i, count, dx, dy;

    sector = this;

    if (isExpanded) {
      dx = sector.expandedDisplacement.x;
      dy = sector.expandedDisplacement.y;
    } else {
      dx = -sector.expandedDisplacement.x;
      dy = -sector.expandedDisplacement.y;
    }

    sector.originalAnchor.x += dx;
    sector.originalAnchor.y += dy;

    for (i = 0, count = sector.tiles.length; i < count; i += 1) {
      sector.tiles[i].originalAnchor.x += dx;
      sector.tiles[i].originalAnchor.y += dy;
    }
  }

  /**
   * Updates the current position of this Sector and the positions of all of its Tiles.
   *
   * @this Sector
   * @param {Number} dx
   * @param {Number} dy
   */
  function updateSectorCurrentPosition(dx, dy) {
    var sector, i, count;

    sector = this;

    sector.currentAnchor.x = sector.originalAnchor.x + dx;
    sector.currentAnchor.y = sector.originalAnchor.y + dy;

    for (i = 0, count = sector.tiles.length; i < count; i += 1) {
      sector.tiles[i].currentAnchor.x += dx;
      sector.tiles[i].currentAnchor.y += dy;
    }
  }

  console.log('Sector module loaded');
})();

/**
 * This module defines a constructor for Tile objects.
 *
 * Tile objects handle the particle logic and the hexagon SVG-shape logic for a single
 * hexagonal tile within a Grid.
 *
 * @module Tile
 */
(function () {
  /**
   * @typedef {Object} PostData
   * @property {String} id
   * @property {String} titleShort
   * @property {String} titleLong
   * @property {String} thumbnailSrc
   * @property {?Number} emphasis
   * @property {Array.<String>} mainImages
   * @property {String} content
   */

  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var config;

  config = {};

  config.dragCoeff = 0.01;

  config.neighborSpringCoeff = 0.00001;
  config.neighborDampingCoeff = 0.001;

  config.innerAnchorSpringCoeff = 0.00004;
  config.innerAnchorDampingCoeff = 0.001;

  config.borderAnchorSpringCoeff = 0.00004;
  config.borderAnchorDampingCoeff = 0.001;

  config.forceSuppressionLowerThreshold = 0.0005;
  config.velocitySuppressionLowerThreshold = 0.0005;
  // TODO: add similar, upper thresholds

  config.innerRadiusDiff = 4.0;

  config.nonContentTileRadiusMultiplier = 1.0;

  //  --- Dependent parameters --- //

  config.computeDependentValues = function () {
    config.forceSuppressionThresholdNegative = -config.forceSuppressionLowerThreshold;
    config.velocitySuppressionThresholdNegative = -config.velocitySuppressionLowerThreshold;
  };

  config.computeDependentValues();

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @constructor
   * @global
   * @param {HTMLElement} svg
   * @param {Grid} grid
   * @param {Number} anchorX
   * @param {Number} anchorY
   * @param {Number} outerRadius
   * @param {Boolean} isVertical
   * @param {Number} hue
   * @param {Number} saturation
   * @param {Number} lightness
   * @param {?PostData} postData
   * @param {Number} tileIndex
   * @param {Number} rowIndex
   * @param {Number} columnIndex
   * @param {Boolean} isMarginTile
   * @param {Boolean} isBorderTile
   * @param {Boolean} isCornerTile
   * @param {Boolean} isInLargerRow
   * @param {Number} mass
   */
  function Tile(svg, grid, anchorX, anchorY, outerRadius, isVertical, hue, saturation, lightness,
    postData, tileIndex, rowIndex, columnIndex, isMarginTile, isBorderTile,
    isCornerTile, isInLargerRow, mass) {
    var tile = this;

    tile.svg = svg;
    tile.grid = grid;
    tile.element = null;
    tile.outerPolygonElement = null;
    tile.innerPolygonElement = null;
    tile.currentAnchor = { x: anchorX, y: anchorY };
    tile.originalAnchor = { x: anchorX, y: anchorY };
    tile.sectorAnchorOffset = { x: Number.NaN, y: Number.NaN };
    tile.outerRadius = outerRadius;
    tile.isVertical = isVertical;

    tile.originalColor = { h: hue, s: saturation, l: lightness };
    tile.currentColor = { h: hue, s: saturation, l: lightness };

    tile.postData = postData;
    tile.holdsContent = !!postData;
    tile.tilePost = null;
    tile.originalIndex = tileIndex;
    tile.rowIndex = rowIndex;
    tile.columnIndex = columnIndex;
    tile.isMarginTile = isMarginTile;
    tile.isBorderTile = isBorderTile;
    tile.isCornerTile = isCornerTile;
    tile.isInLargerRow = isInLargerRow;

    tile.expandedState = null;

    tile.isHighlighted = false;

    tile.imageScreenOpacity = Number.NaN;

    tile.neighborStates = [];
    tile.outerVertices = null;
    tile.innerVertices = null;
    tile.currentVertexOuterDeltas = null;
    tile.originalVertexOuterDeltas = null;
    tile.expandedVertexOuterDeltas = null;
    tile.currentVertexInnerDeltas = null;
    tile.originalVertexInnerDeltas = null;
    tile.expandedVertexInnerDeltas = null;
    tile.particle = null;

    tile.setContent = setContent;
    tile.setNeighborTiles = setNeighborTiles;
    tile.setColor = setColor;
    tile.setIsHighlighted = setIsHighlighted;
    tile.update = update;
    tile.draw = draw;
    tile.applyExternalForce = applyExternalForce;
    tile.fixPosition = fixPosition;
    tile.getNeighborStates = getNeighborStates;
    tile.getIsBorderTile = getIsBorderTile;
    tile.setIsBorderTile = setIsBorderTile;
    tile.destroy = destroy;
    tile.hide = hide;
    tile.show = show;

    createElement.call(tile);
    createParticle.call(tile, mass);

    if (tile.holdsContent) {
      createTilePost.call(tile);
    }
  }

  Tile.computeVertexOuterDeltas = computeVertexOuterDeltas;
  Tile.computeVertexInnerDeltas = computeVertexInnerDeltas;
  Tile.setTileNeighborState = setTileNeighborState;
  Tile.initializeTileExpandedState = initializeTileExpandedState;
  Tile.config = config;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.Tile = Tile;

  initStaticFields();

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  /**
   * Creates the polygon element for this tile.
   *
   * @this Tile
   */
  function createElement() {
    var tile = this;

    updateVerticesForPostRadius.call(tile);

    createElementForNoTilePost.call(tile);
  }

  /**
   * @this Tile
   */
  function updateVerticesForPostRadius() {
    var tile = this;

    var radiusMultiplier = tile.holdsContent && !!tile.postData.emphasis ? tile.postData.emphasis : 1.0;
    var radius = tile.outerRadius * radiusMultiplier;
    if (!tile.holdsContent) {
      radius *= config.nonContentTileRadiusMultiplier;
    }

    tile.originalVertexOuterDeltas = computeVertexOuterDeltas(radius, tile.isVertical);
    tile.currentVertexOuterDeltas = tile.originalVertexOuterDeltas.slice(0);
    tile.originalVertexInnerDeltas = computeVertexInnerDeltas(radius, tile.isVertical, radiusMultiplier);
    tile.currentVertexInnerDeltas = tile.originalVertexInnerDeltas.slice(0);
    tile.outerVertices = [];
    tile.innerVertices = tile.holdsContent ? [] : null;
    updateVertices.call(tile, tile.currentAnchor.x, tile.currentAnchor.y);
  }

  /**
   * @this Tile
   */
  function createElementForTilePost() {
    var tile, id;

    tile = this;

    id = !isNaN(tile.originalIndex) ? tile.originalIndex : parseInt(Math.random() * 1000000 + 1000);

    if (tile.element) {
      tile.svg.removeChild(tile.element);
    }
    tile.element = document.createElementNS(window.hg.util.svgNamespace, 'a');
    tile.svg.appendChild(tile.element);
    tile.outerPolygonElement = document.createElementNS(window.hg.util.svgNamespace, 'polygon');
    tile.element.appendChild(tile.outerPolygonElement);
    tile.innerPolygonElement = document.createElementNS(window.hg.util.svgNamespace, 'polygon');
    tile.element.appendChild(tile.innerPolygonElement);

    tile.element.id = 'hg-' + id;
    tile.element.setAttribute('data-hg-tile', 'data-hg-tile');
    tile.element.style.cursor = 'pointer';
    tile.element.style.pointerEvents = 'auto';
    tile.element.setAttribute('href', '#' + tile.postData.id);

    // Set the vertices
    draw.call(tile);
  }

  /**
   * @this Tile
   */
  function createElementForNoTilePost() {
    var tile, id;

    tile = this;

    id = !isNaN(tile.originalIndex) ? tile.originalIndex : parseInt(Math.random() * 1000000 + 1000);

    if (tile.element) {
      tile.svg.removeChild(tile.element);
    }
    tile.element = document.createElementNS(window.hg.util.svgNamespace, 'polygon');
    tile.svg.appendChild(tile.element);
    tile.outerPolygonElement = tile.element;

    tile.element.id = 'hg-' + id;
    tile.element.setAttribute('data-hg-tile', 'data-hg-tile');
    tile.element.style.cursor = 'normal';
    tile.element.style.pointerEvents = 'auto';

    // Set the color and vertices
    draw.call(tile);
  }

  /**
   * Creates the particle properties for this tile.
   *
   * @this Tile
   * @param {Number} mass
   */
  function createParticle(mass) {
    var tile;

    tile = this;

    tile.particle = {};
    tile.particle.px = tile.currentAnchor.x;
    tile.particle.py = tile.currentAnchor.y;
    tile.particle.vx = 0;
    tile.particle.vy = 0;
    tile.particle.fx = 0;
    tile.particle.fy = 0;
    tile.particle.m = mass;
    tile.particle.forceAccumulatorX = 0;
    tile.particle.forceAccumulatorY = 0;
  }

  /**
   * Computes and stores the locations of the vertices of the hexagon for this tile.
   *
   * @this Tile
   * @param {Number} anchorX
   * @param {Number} anchorY
   */
  function updateVertices(anchorX, anchorY) {
    var tile, trigIndex, coordIndex;

    tile = this;

    for (trigIndex = 0, coordIndex = 0; trigIndex < 6; trigIndex += 1) {
      tile.outerVertices[coordIndex] = anchorX + tile.currentVertexOuterDeltas[coordIndex++];
      tile.outerVertices[coordIndex] = anchorY + tile.currentVertexOuterDeltas[coordIndex++];
    }

    if (tile.holdsContent) {
      for (trigIndex = 0, coordIndex = 0; trigIndex < 6; trigIndex += 1) {
        tile.innerVertices[coordIndex] = anchorX + tile.currentVertexInnerDeltas[coordIndex++];
        tile.innerVertices[coordIndex] = anchorY + tile.currentVertexInnerDeltas[coordIndex++];
      }
    }
  }

  /**
   * Creates a new TilePost object with this Tile's post data.
   *
   * @this Tile
   */
  function createTilePost() {
    var tile = this;

    createElementForTilePost.call(tile);

    tile.element.setAttribute('data-hg-post-tilePost', 'data-hg-post-tilePost');

    tile.tilePost = new window.hg.TilePost(tile);

    draw.call(tile);
  }

  /**
   * Destroys this Tile's TilePost object.
   *
   * @this Tile
   */
  function destroyTilePost() {
    var tile = this;

    createElementForNoTilePost.call(tile);

    tile.element.removeAttribute('data-hg-post-tilePost');

    tile.tilePost.destroy();
    tile.tilePost = null;
  }

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  /**
   * Initializes some static fields that can be pre-computed.
   */
  function initStaticFields() {
    var i, theta, deltaTheta, horizontalStartTheta, verticalStartTheta;

    deltaTheta = Math.PI / 3;
    horizontalStartTheta = -deltaTheta;
    verticalStartTheta = Math.PI / 6 - 2 * deltaTheta;

    config.horizontalSines = [];
    config.horizontalCosines = [];
    for (i = 0, theta = horizontalStartTheta; i < 6; i += 1, theta += deltaTheta) {
      config.horizontalSines[i] = Math.sin(theta);
      config.horizontalCosines[i] = Math.cos(theta);
    }

    config.verticalSines = [];
    config.verticalCosines = [];
    for (i = 0, theta = verticalStartTheta; i < 6; i += 1, theta += deltaTheta) {
      config.verticalSines[i] = Math.sin(theta);
      config.verticalCosines[i] = Math.cos(theta);
    }
  }

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  /**
   * Sets this tile's content.
   *
   * @this Tile
   * @param {?Object} postData
   */
  function setContent(postData) {
    var tile, usedToHoldContent;

    tile = this;

    usedToHoldContent = tile.holdsContent;

    tile.postData = postData;
    tile.holdsContent = !!postData;

    updateVerticesForPostRadius.call(tile);

    if (usedToHoldContent) {
      destroyTilePost.call(tile);
      createTilePost.call(tile);
    } else {
      createTilePost.call(tile);
    }
  }

  /**
   * Sets this tile's neighbor tiles.
   *
   * @this Tile
   * @param {Array.<Tile>} neighborTiles
   */
  function setNeighborTiles(neighborTiles) {
    var tile, i, neighborTile;

    tile = this;

    for (i = 0; i < 6; i += 1) {
      neighborTile = neighborTiles[i];

      setTileNeighborState(tile, i, neighborTile);
    }
  }

  /**
   * Sets this tile's color values.
   *
   * @this Tile
   * @param {Number} hue
   * @param {Number} saturation
   * @param {Number} lightness
   */
  function setColor(hue, saturation, lightness) {
    var tile = this;

    if (tile.isHighlighted) {
      hue = hue + window.hg.HighlightHoverJob.config.deltaHue;
      saturation = saturation + window.hg.HighlightHoverJob.config.deltaSaturation;
      lightness = lightness + window.hg.HighlightHoverJob.config.deltaLightness;
    }

    tile.originalColor.h = hue;
    tile.originalColor.s = saturation;
    tile.originalColor.l = lightness;

    tile.currentColor.h = hue;
    tile.currentColor.s = saturation;
    tile.currentColor.l = lightness;
  }

  /**
   * Sets whether this tile is highlighted.
   *
   * @this Tile
   * @param {Boolean} isHighlighted
   */
  function setIsHighlighted(isHighlighted) {
    var tile, hue, saturation, lightness, backgroundImageScreenOpacity;

    tile = this;

    if (isHighlighted) {
      if (tile.isHighlighted) {
        // Nothing is changing
        hue = tile.originalColor.h;
        saturation = tile.originalColor.s;
        lightness = tile.originalColor.l;
      } else {
        // Add the highlight
        hue = tile.originalColor.h + window.hg.HighlightHoverJob.config.deltaHue * window.hg.HighlightHoverJob.config.opacity;
        saturation = tile.originalColor.s + window.hg.HighlightHoverJob.config.deltaSaturation * window.hg.HighlightHoverJob.config.opacity;
        lightness = tile.originalColor.l + window.hg.HighlightHoverJob.config.deltaLightness * window.hg.HighlightHoverJob.config.opacity;
      }
    } else {
      if (tile.isHighlighted) {
        // Remove the highlight
        hue = tile.originalColor.h - window.hg.HighlightHoverJob.config.deltaHue * window.hg.HighlightHoverJob.config.opacity;
        saturation = tile.originalColor.s - window.hg.HighlightHoverJob.config.deltaSaturation * window.hg.HighlightHoverJob.config.opacity;
        lightness = tile.originalColor.l - window.hg.HighlightHoverJob.config.deltaLightness * window.hg.HighlightHoverJob.config.opacity;
      } else {
        // Nothing is changing
        hue = tile.originalColor.h;
        saturation = tile.originalColor.s;
        lightness = tile.originalColor.l;
      }
    }

    tile.originalColor.h = hue;
    tile.originalColor.s = saturation;
    tile.originalColor.l = lightness;

    tile.currentColor.h = hue;
    tile.currentColor.s = saturation;
    tile.currentColor.l = lightness;

    tile.isHighlighted = isHighlighted;
  }

  /**
   * Update the state of this tile particle for the current time step.
   *
   * @this Tile
   * @param {Number} currentTime
   * @param {Number} deltaTime
   */
  function update(currentTime, deltaTime) {
    var tile, i, count, neighborStates, isBorderTile, neighborState, lx, ly, lDotX, lDotY,
      dotProd, length, temp, springForceX, springForceY;

    tile = this;

    if (!tile.particle.isFixed) {

      // Some different properties should be used when the grid is expanded
      neighborStates = tile.getNeighborStates();
      isBorderTile = tile.getIsBorderTile();

      // --- Accumulate forces --- //

      // --- Drag force --- //

      tile.particle.forceAccumulatorX += -config.dragCoeff * tile.particle.vx;
      tile.particle.forceAccumulatorY += -config.dragCoeff * tile.particle.vy;

      // --- Spring forces from neighbor tiles --- //

      for (i = 0, count = neighborStates.length; i < count; i += 1) {
        neighborState = neighborStates[i];

        if (neighborState) {
          if (neighborState.springForceX) {
            tile.particle.forceAccumulatorX += neighborState.springForceX;
            tile.particle.forceAccumulatorY += neighborState.springForceY;

            neighborState.springForceX = 0;
            neighborState.springForceY = 0;
          } else {
            lx = neighborState.tile.particle.px - tile.particle.px;
            ly = neighborState.tile.particle.py - tile.particle.py;
            lDotX = neighborState.tile.particle.vx - tile.particle.vx;
            lDotY = neighborState.tile.particle.vy - tile.particle.vy;
            dotProd = lx * lDotX + ly * lDotY;
            length = Math.sqrt(lx * lx + ly * ly);

            temp = (config.neighborSpringCoeff * (length - neighborState.restLength) +
              config.neighborDampingCoeff * dotProd / length) / length;
            springForceX = lx * temp;
            springForceY = ly * temp;

            tile.particle.forceAccumulatorX += springForceX;
            tile.particle.forceAccumulatorY += springForceY;

            neighborState.neighborsRelationshipObj.springForceX = -springForceX;
            neighborState.neighborsRelationshipObj.springForceY = -springForceY;
          }
        }
      }

      // --- Spring forces from currentAnchor point --- //

      lx = tile.currentAnchor.x - tile.particle.px;
      ly = tile.currentAnchor.y - tile.particle.py;
      length = Math.sqrt(lx * lx + ly * ly);

      if (length > 0) {
        lDotX = -tile.particle.vx;
        lDotY = -tile.particle.vy;
        dotProd = lx * lDotX + ly * lDotY;

        if (isBorderTile) {
          temp = (config.borderAnchorSpringCoeff * length + config.borderAnchorDampingCoeff *
            dotProd / length) / length;
        } else {
          temp = (config.innerAnchorSpringCoeff * length + config.innerAnchorDampingCoeff *
            dotProd / length) / length;
        }

        springForceX = lx * temp;
        springForceY = ly * temp;

        tile.particle.forceAccumulatorX += springForceX;
        tile.particle.forceAccumulatorY += springForceY;
      }

      // --- Update particle state --- //

      tile.particle.fx = tile.particle.forceAccumulatorX / tile.particle.m * deltaTime;
      tile.particle.fy = tile.particle.forceAccumulatorY / tile.particle.m * deltaTime;
      tile.particle.px += tile.particle.vx * deltaTime;
      tile.particle.py += tile.particle.vy * deltaTime;
      tile.particle.vx += tile.particle.fx;
      tile.particle.vy += tile.particle.fy;

      // Kill all velocities and forces below a threshold
      tile.particle.fx = tile.particle.fx < config.forceSuppressionLowerThreshold &&
        tile.particle.fx > config.forceSuppressionThresholdNegative ?
        0 : tile.particle.fx;
      tile.particle.fy = tile.particle.fy < config.forceSuppressionLowerThreshold &&
        tile.particle.fy > config.forceSuppressionThresholdNegative ?
        0 : tile.particle.fy;
      tile.particle.vx = tile.particle.vx < config.velocitySuppressionLowerThreshold &&
        tile.particle.vx > config.velocitySuppressionThresholdNegative ?
        0 : tile.particle.vx;
      tile.particle.vy = tile.particle.vy < config.velocitySuppressionLowerThreshold &&
        tile.particle.vy > config.velocitySuppressionThresholdNegative ?
        0 : tile.particle.vy;

      // Reset force accumulator for next time step
      tile.particle.forceAccumulatorX = 0;
      tile.particle.forceAccumulatorY = 0;

      // Compute new vertex locations
      updateVertices.call(tile, tile.particle.px, tile.particle.py);
    }
  }

  /**
   * Update the SVG attributes for this tile to match its current particle state.
   *
   * @this Tile
   */
  function draw() {
    var tile, i, pointsString, colorString;

    tile = this;

    // Set the outer vertices
    for (i = 0, pointsString = ''; i < 12;) {
      pointsString += tile.outerVertices[i++] + ',' + tile.outerVertices[i++] + ' ';
    }
    tile.outerPolygonElement.setAttribute('points', pointsString);

    if (!!tile.innerPolygonElement) {
      // Set the inner vertices
      for (i = 0, pointsString = ''; i < 12;) {
        pointsString += tile.innerVertices[i++] + ',' + tile.innerVertices[i++] + ' ';
      }
      tile.innerPolygonElement.setAttribute('points', pointsString);
    }

    if (!tile.holdsContent) {
      // Set the color
      colorString = 'hsl(' +
        tile.currentColor.h + ',' +
        tile.currentColor.s + '%,' +
        tile.currentColor.l + '%)';
      tile.outerPolygonElement.setAttribute('fill', colorString);
    } else if (tile.tilePost) {
      var h, s, l;
      var a = !!tile.postData.emphasis ? tile.postData.emphasis : 0.5;
      a = Math.pow(a, 2.5) * 0.8;

      // Set the border color
      if (!!tile.postData.color && tile.postData.color.length > 1) {
        var rgb = window.hg.util.hexToRgb(tile.postData.color);
        var hsl = window.hg.util.rgbToHsl(rgb);
        h = hsl.h;
        s = window.hg.util.clamp(hsl.s, 60, 99);
        l = window.hg.util.clamp(hsl.l, 70, 99);
      } else {
        h = tile.currentColor.h;
        s = Math.max(tile.currentColor.s - 0, 0);
        l = Math.min(tile.currentColor.l + 100, 100);
      }
      colorString = 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')';
      tile.outerPolygonElement.setAttribute('fill', colorString);

      // Set the position and opacity of the TilePost
      tile.tilePost.draw();
    }
  }

  /**
   * Adds the given force, which will take effect during the next call to update.
   *
   * @this Tile
   * @param {Number} fx
   * @param {Number} fy
   */
  function applyExternalForce(fx, fy) {
    var tile;

    tile = this;

    tile.particle.forceAccumulatorX += fx;
    tile.particle.forceAccumulatorY += fy;
  }

  /**
   * Fixes the position of this tile to the given coordinates.
   *
   * @this Tile
   * @param {Number} px
   * @param {Number} py
   */
  function fixPosition(px, py) {
    var tile;

    tile = this;

    tile.particle.isFixed = true;
    tile.particle.px = px;
    tile.particle.py = py;
  }

  /**
   * @returns {Object}
   */
  function getNeighborStates() {
    var tile = this;
    return tile.grid.isPostOpen ? tile.expandedState.neighborStates : tile.neighborStates;
  }

  /**
   * @returns {Boolean}
   */
  function getIsBorderTile() {
    var tile = this;
    return tile.grid.isPostOpen ? tile.expandedState.isBorderTile : tile.isBorderTile;
  }

  /**
   * @param {Boolean} isBorderTile
   */
  function setIsBorderTile(isBorderTile) {
    var tile = this;

    if (tile.grid.isPostOpen) {
      tile.expandedState.isBorderTile = isBorderTile;
    } else {
      tile.isBorderTile = isBorderTile;
    }
  }

  // ------------------------------------------------------------------------------------------- //
  // Public static functions

  /**
   * Computes the offsets of the vertices from the center of the hexagon.
   *
   * @param {Number} radius
   * @param {Boolean} isVertical
   * @returns {Array.<Number>}
   */
  function computeVertexOuterDeltas(radius, isVertical) {
    var trigIndex, coordIndex, sines, cosines, currentVertexDeltas;

    // Grab the pre-computed sine and cosine values
    if (isVertical) {
      sines = config.verticalSines;
      cosines = config.verticalCosines;
    } else {
      sines = config.horizontalSines;
      cosines = config.horizontalCosines;
    }

    for (trigIndex = 0, coordIndex = 0, currentVertexDeltas = [];
      trigIndex < 6;
      trigIndex += 1) {
      currentVertexDeltas[coordIndex++] = radius * cosines[trigIndex];
      currentVertexDeltas[coordIndex++] = radius * sines[trigIndex];
    }

    return currentVertexDeltas;
  }

  /**
   * Computes the offsets of the vertices from the center of the hexagon.
   *
   * @param {Number} radius
   * @param {Boolean} isVertical
   * @param {Number} borderThicknessMultiplier
   * @returns {Array.<Number>}
   */
  function computeVertexInnerDeltas(radius, isVertical, borderThicknessMultiplier) {
    var trigIndex, coordIndex, sines, cosines, currentVertexDeltas;

    var radiusDiff = config.innerRadiusDiff * borderThicknessMultiplier

    radius -= radiusDiff;

    // Grab the pre-computed sine and cosine values
    if (isVertical) {
      sines = config.verticalSines;
      cosines = config.verticalCosines;
    } else {
      sines = config.horizontalSines;
      cosines = config.horizontalCosines;
    }

    for (trigIndex = 0, coordIndex = 0, currentVertexDeltas = [];
      trigIndex < 6;
      trigIndex += 1) {
      currentVertexDeltas[coordIndex++] = radius * cosines[trigIndex];
      currentVertexDeltas[coordIndex++] = radius * sines[trigIndex];
    }

    return currentVertexDeltas;
  }

  /**
   * Creates the neighbor-tile state for the given tile according to the given neighbor tile. Also
   * sets the reciprocal state for the neighbor tile.
   *
   * @param {Tile} tile
   * @param {Number} neighborRelationIndex
   * @param {?Tile} neighborTile
   */
  function setTileNeighborState(tile, neighborRelationIndex, neighborTile) {
    var neighborStates, neighborNeighborStates,
      neighborNeighborRelationIndex;

    neighborStates = tile.getNeighborStates();

    if (neighborTile) {
      // Initialize the neighbor relation data from this tile to its neighbor
      initializeTileNeighborRelationData(neighborStates, neighborRelationIndex, neighborTile);

      // -- Give the neighbor tile a reference to this tile --- //

      neighborNeighborStates = neighborTile.getNeighborStates();

      neighborNeighborRelationIndex = (neighborRelationIndex + 3) % 6;

      // Initialize the neighbor relation data from the neighbor to this tile
      initializeTileNeighborRelationData(neighborNeighborStates, neighborNeighborRelationIndex,
        tile);

      // Share references to each other's neighbor relation objects
      neighborStates[neighborRelationIndex].neighborsRelationshipObj =
        neighborNeighborStates[neighborNeighborRelationIndex];
      neighborNeighborStates[neighborNeighborRelationIndex].neighborsRelationshipObj =
        neighborStates[neighborRelationIndex];
    } else {
      neighborStates[neighborRelationIndex] = null;
    }

    // ---  --- //

    function initializeTileNeighborRelationData(neighborStates, neighborRelationIndex,
      neighborTile) {
      neighborStates[neighborRelationIndex] = neighborStates[neighborRelationIndex] || {
        tile: neighborTile,
        restLength: window.hg.Grid.config.tileShortLengthWithGap,
        neighborsRelationshipObj: null,
        springForceX: 0,
        springForceY: 0
      };
    }
  }

  /**
   * @param {Tile} tile
   * @param {Sector} sector
   * @param {Number} majorIndex
   * @param {Number} minorIndex
   */
  function initializeTileExpandedState(tile, sector, majorIndex, minorIndex) {
    tile.expandedState = {
      sector: sector,
      sectorMajorIndex: majorIndex,
      sectorMinorIndex: minorIndex,
      neighborStates: [],
      isBorderTile: false
    };
  }

  /**
   * @this Tile
   */
  function destroy() {
    var tile = this;

    if (tile.holdsContent) {
      destroyTilePost.call(tile);
    }
    tile.svg.removeChild(tile.element);
  }

  /**
   * Sets this Tile and its TilePost to have a display of none.
   *
   * @this Tile
   */
  function hide() {
    var tile = this;

    tile.element.style.display = 'none';
    if (tile.holdsContent) {
      tile.tilePost.elements.title.style.display = 'none';
    }
  }

  /**
   * Sets this Tile and its TilePost to have a display of block.
   *
   * @this Tile
   */
  function show() {
    var tile = this;

    tile.element.style.display = 'block';
    if (tile.holdsContent) {
      tile.tilePost.elements.title.style.display = 'block';
    }
  }

  console.log('Tile module loaded');
})();

/**
 * This module defines a constructor for TilePost objects.
 *
 * TilePost objects handle the actual textual contents of the Tile objects.
 *
 * @module TilePost
 */
(function () {
  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var config;

  config = {};

  config.activeScreenOpacity = 0.0;
  config.inactiveScreenOpacity = 0.8;
  config.inactiveScreenHue = 230;
  config.inactiveScreenSaturation = 1;
  config.inactiveScreenLightness = 4;

  config.fontSize = document.documentElement.clientWidth > 812 ? 18 : 14;

  //  --- Dependent parameters --- //

  config.computeDependentValues = function () {
  };

  config.computeDependentValues();

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @constructor
   * @global
   * @param {Tile} tile
   */
  function TilePost(tile) {
    var tilePost = this;

    tilePost.tile = tile;
    tilePost.elements = null;

    tilePost.draw = draw;
    tilePost.destroy = destroy;

    createElements.call(tilePost);
  }

  TilePost.config = config;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.TilePost = TilePost;

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  /**
   * @this TilePost
   */
  function createElements() {
    var tilePost = this;

    var patternId = 'hg-pattern-' + tilePost.tile.postData.id;

    var screenColorString = 'hsl(' + window.hg.TilePost.config.inactiveScreenHue + ',' +
      window.hg.TilePost.config.inactiveScreenSaturation + '%,' +
      window.hg.TilePost.config.inactiveScreenLightness + '%)';

    var outerSideLength = window.hg.Grid.config.tileOuterRadius * 2;

    var textTop = -config.fontSize * (1.5 + 0.53 * (tilePost.tile.postData.titleShort.split('\n').length - 1));

    var longRadiusRatio = 1;
    var shortRadiusRatio = window.hg.Grid.config.tileOuterRadius / window.hg.Grid.config.tileInnerRadius;
    var offsetDistance = (1 - shortRadiusRatio) / 2;

    var imageWidth, imageHeight, imageX, imageY;
    if (tilePost.tile.grid.isVertical) {
      imageWidth = shortRadiusRatio;
      imageHeight = longRadiusRatio;
      imageX = offsetDistance;
      imageY = '0';
    } else {
      imageWidth = longRadiusRatio;
      imageHeight = shortRadiusRatio;
      imageX = '0';
      imageY = offsetDistance;
    }

    // --- Create the elements, add them to the DOM, save them in this TilePost --- //

    var backgroundPattern = document.createElementNS(window.hg.util.svgNamespace, 'pattern');
    var backgroundImage = document.createElementNS(window.hg.util.svgNamespace, 'image');
    var backgroundImageScreen = document.createElementNS(window.hg.util.svgNamespace, 'rect');
    var title = document.createElement('h2');

    tilePost.tile.grid.svgDefs.appendChild(backgroundPattern);
    backgroundPattern.appendChild(backgroundImage);
    backgroundPattern.appendChild(backgroundImageScreen);
    tilePost.tile.grid.parent.appendChild(title);

    tilePost.elements = [];
    tilePost.elements.backgroundPattern = backgroundPattern;
    tilePost.elements.backgroundImage = backgroundImage;
    tilePost.elements.backgroundImageScreen = backgroundImageScreen;
    tilePost.elements.title = title;

    // --- Set the parameters of the elements --- //

    backgroundPattern.setAttribute('id', patternId);
    backgroundPattern.setAttribute('patternContentUnits', 'objectBoundingBox');
    backgroundPattern.setAttribute('width', '1');
    backgroundPattern.setAttribute('height', '1');

    backgroundImage.setAttributeNS(window.hg.util.xlinkNamespace, 'xlink:href', tilePost.tile.postData.thumbnailSrc);
    backgroundImage.setAttribute('preserveAspectRatio', 'none');
    backgroundImage.setAttribute('x', imageX);
    backgroundImage.setAttribute('y', imageY);
    backgroundImage.setAttribute('width', imageWidth);
    backgroundImage.setAttribute('height', imageHeight);
    // TODO: this should have worked, but the aspect ratio was NOT being maintained; it may have been a browser bug
    //backgroundImage.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    //backgroundImage.setAttribute('width', '1');
    //backgroundImage.setAttribute('height', '1');

    backgroundImageScreen.setAttribute('width', '1');
    backgroundImageScreen.setAttribute('height', '1');
    backgroundImageScreen.setAttribute('fill', screenColorString);

    tilePost.tile.element.setAttribute('fill', 'url(#' + patternId + ')');

    title.innerHTML = tilePost.tile.postData.titleShort;
    title.setAttribute('data-hg-tile-title', 'data-hg-tile-title');
    title.style.position = 'absolute';
    title.style.left = -outerSideLength / 2 + 'px';
    title.style.top = textTop + 'px';
    title.style.width = outerSideLength + 'px';
    title.style.height = outerSideLength + 'px';
    title.style.fontSize = config.fontSize + 'px';
    title.style.textAlign = 'center';
    title.style.whiteSpace = 'pre-wrap';
    title.style.pointerEvents = 'none';
    title.style.zIndex = '1200';

    tilePost.tile.imageScreenOpacity = config.inactiveScreenOpacity;
    draw.call(tilePost);

    // TODO: for the canvas version: http://stackoverflow.com/a/4961439/489568
  }

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  /**
   * @this TilePost
   */
  function draw() {
    var tilePost = this;

    // Keep hovered tiles highlighted
    var backgroundImageScreenOpacity = tilePost.tile.isHighlighted ?
        window.hg.TilePost.config.activeScreenOpacity : tilePost.tile.imageScreenOpacity;

    // Have the title change across a wider opacity range than the background screen
    var titleOpacity = 0.5 + (backgroundImageScreenOpacity - 0.5) * 2;
    titleOpacity = titleOpacity > 1 ? 1 : (titleOpacity < 0 ? 0 : titleOpacity);
    titleOpacity *= Math.pow(!!tilePost.tile.postData.emphasis ? tilePost.tile.postData.emphasis : 0.5, 0.7);

    window.hg.util.setTransform(tilePost.elements.title,
        'translate(' + tilePost.tile.particle.px + 'px,' + tilePost.tile.particle.py + 'px)');
    tilePost.elements.backgroundImageScreen.setAttribute('opacity', backgroundImageScreenOpacity);

    // Only set the title opacity for collapsed tiles
    if (tilePost.tile.grid.expandedTile !== tilePost.tile) {
      tilePost.elements.title.style.opacity = titleOpacity;
    }
  }

  /**
   * @this TilePost
   */
  function destroy() {
    var tilePost = this;

    tilePost.tile.grid.parent.removeChild(tilePost.elements.title);
    tilePost.tile.grid.svgDefs.removeChild(tilePost.elements.backgroundPattern);
  }

  console.log('TilePost module loaded');
})();

/**
 * @typedef {AnimationJob} ColorResetJob
 */

/**
 * This module defines a constructor for ColorResetJob objects.
 *
 * ColorResetJob objects reset tile color values during each animation frame.
 *
 * @module ColorResetJob
 */
(function () {
  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var config = {};

  //  --- Dependent parameters --- //

  config.computeDependentValues = function () {
  };

  config.computeDependentValues();

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  /**
   * Sets this ColorResetJob as started.
   *
   * @this ColorResetJob
   * @param {Number} startTime
   */
  function start(startTime) {
    var job = this;

    job.startTime = startTime;
    job.isComplete = false;
  }

  /**
   * Updates the animation progress of this ColorResetJob to match the given time.
   *
   * This should be called from the overall animation loop.
   *
   * @this ColorResetJob
   * @param {Number} currentTime
   * @param {Number} deltaTime
   */
  function update(currentTime, deltaTime) {
    var job, i, count;

    job = this;

    for (i = 0, count = job.grid.allTiles.length; i < count; i += 1) {
      job.grid.allTiles[i].currentColor.h = job.grid.allTiles[i].originalColor.h;
      job.grid.allTiles[i].currentColor.s = job.grid.allTiles[i].originalColor.s;
      job.grid.allTiles[i].currentColor.l = job.grid.allTiles[i].originalColor.l;
      job.grid.allTiles[i].imageScreenOpacity = window.hg.TilePost.config.inactiveScreenOpacity;
    }
  }

  /**
   * Draws the current state of this ColorResetJob.
   *
   * This should be called from the overall animation loop.
   *
   * @this ColorResetJob
   */
  function draw() {
    // This animation job updates the state of actual tiles, so it has nothing of its own to draw
  }

  /**
   * Stops this ColorResetJob, and returns the element its original form.
   *
   * @this ColorResetJob
   */
  function cancel() {
    var job = this;

    job.isComplete = true;
  }

  /**
   * @this ColorResetJob
   */
  function refresh() {
    var job = this;

    init.call(job);
  }

  /**
   * @this ColorResetJob
   */
  function init() {
  }

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @constructor
   * @global
   * @param {Grid} grid
   */
  function ColorResetJob(grid) {
    var job = this;

    job.grid = grid;
    job.startTime = 0;
    job.isComplete = true;

    job.start = start;
    job.update = update;
    job.draw = draw;
    job.cancel = cancel;
    job.refresh = refresh;
    job.init = init;

    job.init();

    console.log('ColorResetJob created');
  }

  ColorResetJob.config = config;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.ColorResetJob = ColorResetJob;

  console.log('ColorResetJob module loaded');
})();

/**
 * @typedef {AnimationJob} ColorShiftJob
 */

/**
 * @typedef {Object} ShiftStatus
 * @property {Number} timeStart
 * @property {Number} timeEnd
 */

/**
 * @typedef {ShiftStatus} NonContentTileShiftStatus
 * @property {Number} hueDeltaStart
 * @property {Number} hueDeltaEnd
 * @property {Number} saturationDeltaStart
 * @property {Number} saturationDeltaEnd
 * @property {Number} lightnessDeltaStart
 * @property {Number} lightnessDeltaEnd
 */

/**
 * @typedef {ShiftStatus} ContentTileShiftStatus
 * @property {Number} opacityDeltaStart
 * @property {Number} opacityDeltaEnd
 */

/**
 * This module defines a constructor for ColorShiftJob objects.
 *
 * ColorShiftJob objects animate the colors of the tiles in a random fashion.
 *
 * @module ColorShiftJob
 */
(function () {
  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var config = {};

  config.hueDeltaMin = -20;
  config.hueDeltaMax = 20;
  config.saturationDeltaMin = 0;
  config.saturationDeltaMax = 0;
  config.lightnessDeltaMin = 0;
  config.lightnessDeltaMax = 0;

  config.imageBackgroundScreenOpacityDeltaMin = -0.05;
  config.imageBackgroundScreenOpacityDeltaMax = 0.05;

  config.transitionDurationMin = 200;
  config.transitionDurationMax = 2000;

  //  --- Dependent parameters --- //

  config.computeDependentValues = function () {
  };

  config.computeDependentValues();

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  /**
   * Creates a shift status object for each tile to keep track of their individual animation
   * progress.
   *
   * @this ColorShiftJob
   */
  function initTileShiftStatuses() {
    var job, i, count;

    job = this;

    job.shiftStatusesNonContentTiles = [];
    job.shiftStatusesContentTiles = [];

    for (i = 0, count = job.grid.allNonContentTiles.length; i < count; i += 1) {
      job.shiftStatusesNonContentTiles[i] = {
        timeStart: 0,
        timeEnd: 0,
        hueDeltaStart: 0,
        hueDeltaEnd: 0,
        saturationDeltaStart: 0,
        saturationDeltaEnd: 0,
        lightnessDeltaStart: 0,
        lightnessDeltaEnd: 0,
      };
    }

    for (i = 0, count = job.grid.contentTiles.length; i < count; i += 1) {
      job.shiftStatusesContentTiles[i] = {
        timeStart: 0,
        timeEnd: 0,
        opacityDeltaStart: 0,
        opacityDeltaEnd: 0,
      };
    }
  }

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  /**
   * Updates the animation progress of the given non-content tile.
   *
   * @param {Number} currentTime
   * @param {Tile} tile
   * @param {NonContentTileShiftStatus} shiftStatus
   */
  function updateNonContentTile(currentTime, tile, shiftStatus) {
    if (currentTime > shiftStatus.timeEnd) {
      assignNewNonContentTileTransition(currentTime, shiftStatus);
    }

    var progress = (currentTime - shiftStatus.timeStart) /
        (shiftStatus.timeEnd - shiftStatus.timeStart);

    tile.currentColor.h += progress *
        (shiftStatus.hueDeltaEnd - shiftStatus.hueDeltaStart) +
        shiftStatus.hueDeltaStart;
    tile.currentColor.s += progress *
        (shiftStatus.saturationDeltaEnd - shiftStatus.saturationDeltaStart) +
        shiftStatus.saturationDeltaStart;
    tile.currentColor.l += progress *
        (shiftStatus.lightnessDeltaEnd - shiftStatus.lightnessDeltaStart) +
        shiftStatus.lightnessDeltaStart;

    // Also add a gradual hue shift across all tiles.
    tile.currentColor.h += currentTime / 300;
    tile.currentColor.h %= 360;
  }

  /**
   * Updates the animation progress of the given content tile.
   *
   * @param {Number} currentTime
   * @param {Tile} tile
   * @param {ContentTileShiftStatus} shiftStatus
   */
  function updateContentTile(currentTime, tile, shiftStatus) {
    if (currentTime > shiftStatus.timeEnd) {
      assignNewContentTileTransition(currentTime, shiftStatus);
    }

    var progress = (currentTime - shiftStatus.timeStart) /
        (shiftStatus.timeEnd - shiftStatus.timeStart);

    tile.imageScreenOpacity += progress *
        (shiftStatus.opacityDeltaEnd - shiftStatus.opacityDeltaStart) +
        shiftStatus.opacityDeltaStart;
    // tile.imageScreenOpacity += -tileProgress * config.opacity *
    //     config.deltaOpacityImageBackgroundScreen;
  }

  /**
   * @param {Number} currentTime
   * @param {NonContentTileShiftStatus} shiftStatus
   */
  function assignNewNonContentTileTransition(currentTime, shiftStatus) {
    assignNewTransitionDuration(currentTime, shiftStatus);

    shiftStatus.hueDeltaStart = shiftStatus.hueDeltaEnd;
    shiftStatus.hueDeltaEnd = getNewHueDelta();

    shiftStatus.saturationDeltaStart = shiftStatus.saturationDeltaEnd;
    shiftStatus.saturationDeltaEnd = getNewSaturationDelta();

    shiftStatus.lightnessDeltaStart = shiftStatus.lightnessDeltaEnd;
    shiftStatus.lightnessDeltaEnd = getNewLightnessDelta();
  }

  /**
   * @param {Number} currentTime
   * @param {ContentTileShiftStatus} shiftStatus
   */
  function assignNewContentTileTransition(currentTime, shiftStatus) {
    assignNewTransitionDuration(currentTime, shiftStatus);

    shiftStatus.opacityDeltaStart = shiftStatus.opacityDeltaEnd;
    shiftStatus.opacityDeltaEnd = getNewOpacityDelta();
  }

  /**
   * Create a new duration value, and set up the start and end time to account for any time gap
   * between the end of the last transition and the current time.
   *
   * @param {Number} currentTime
   * @param {ShiftStatus} shiftStatus
   */
  function assignNewTransitionDuration(currentTime, shiftStatus) {
    var elapsedTimeSinceEnd = currentTime - shiftStatus.timeEnd;
    var newDuration = getNewTransitionDuration();
    while (newDuration <= elapsedTimeSinceEnd) {
      elapsedTimeSinceEnd -= newDuration;
      newDuration = getNewTransitionDuration();
    }

    shiftStatus.timeStart = currentTime - elapsedTimeSinceEnd;
    shiftStatus.timeEnd = shiftStatus.timeStart + newDuration;
  }

  /**
   * @returns {Number} A random shift transition duration value between the configured min and max.
   */
  function getNewTransitionDuration() {
    return Math.random() * (config.transitionDurationMax - config.transitionDurationMin) +
        config.transitionDurationMin;
  }

  /**
   * @returns {Number} A random hue delta value between the configured min and max.
   */
  function getNewHueDelta() {
    return Math.random() * (config.hueDeltaMax - config.hueDeltaMin) + config.hueDeltaMin;
  }

  /**
   * @returns {Number} A random saturation delta value between the configured min and max.
   */
  function getNewSaturationDelta() {
    return Math.random() * (config.saturationDeltaMax - config.saturationDeltaMin) +
        config.saturationDeltaMin;
  }

  /**
   * @returns {Number} A random lightness delta value between the configured min and max.
   */
  function getNewLightnessDelta() {
    return Math.random() * (config.lightnessDeltaMax - config.lightnessDeltaMin) +
        config.lightnessDeltaMin;
  }

  /**
   * @returns {Number} A random opacity delta value between the configured min and max.
   */
  function getNewOpacityDelta() {
    return Math.random() * (config.imageBackgroundScreenOpacityDeltaMax -
        config.imageBackgroundScreenOpacityDeltaMin) +
        config.imageBackgroundScreenOpacityDeltaMin;
  }

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  /**
   * Sets this ColorShiftJob as started.
   *
   * @this ColorShiftJob
   * @param {Number} startTime
   */
  function start(startTime) {
    var job, i, count;

    job = this;

    job.startTime = startTime;
    job.isComplete = false;

    for (i = 0, count = job.shiftStatusesNonContentTiles.length; i < count; i += 1) {
      job.shiftStatusesNonContentTiles[i].timeStart = startTime;
      job.shiftStatusesNonContentTiles[i].timeEnd = startTime;
    }

    for (i = 0, count = job.shiftStatusesContentTiles.length; i < count; i += 1) {
      job.shiftStatusesContentTiles[i].timeStart = startTime;
      job.shiftStatusesContentTiles[i].timeEnd = startTime;
    }
  }

  /**
   * Updates the animation progress of this ColorShiftJob to match the given time.
   *
   * This should be called from the overall animation loop.
   *
   * @this ColorShiftJob
   * @param {Number} currentTime
   * @param {Number} deltaTime
   */
  function update(currentTime, deltaTime) {
    var job, i, count;

    job = this;

    for (i = 0, count = job.grid.allNonContentTiles.length; i < count; i += 1) {
      updateNonContentTile(currentTime, job.grid.allNonContentTiles[i],
          job.shiftStatusesNonContentTiles[i]);
    }

    for (i = 0, count = job.grid.contentTiles.length; i < count; i += 1) {
      updateContentTile(currentTime, job.grid.contentTiles[i],
          job.shiftStatusesContentTiles[i]);
    }
  }

  /**
   * Draws the current state of this ColorShiftJob.
   *
   * This should be called from the overall animation loop.
   *
   * @this ColorShiftJob
   */
  function draw() {
    // This animation job updates the state of actual tiles, so it has nothing of its own to draw
  }

  /**
   * Stops this ColorShiftJob.
   *
   * @this ColorShiftJob
   */
  function cancel() {
    var job = this;

    job.isComplete = true;
  }

  /**
   * @this ColorShiftJob
   */
  function refresh() {
    var job = this;

    init.call(job);
  }

  /**
   * @this ColorShiftJob
   */
  function init() {
    var job = this;

    config.computeDependentValues();
    initTileShiftStatuses.call(job);
  }

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @constructor
   * @global
   * @param {Grid} grid
   */
  function ColorShiftJob(grid) {
    var job = this;

    job.grid = grid;
    job.shiftStatusesNonContentTiles = null;
    job.shiftStatusesContentTiles = null;
    job.startTime = 0;
    job.isComplete = true;

    job.start = start;
    job.update = update;
    job.draw = draw;
    job.cancel = cancel;
    job.refresh = refresh;
    job.init = init;

    job.init();

    console.log('ColorShiftJob created');
  }

  ColorShiftJob.config = config;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.ColorShiftJob = ColorShiftJob;

  console.log('ColorShiftJob module loaded');
})();

/**
 * @typedef {AnimationJob} ColorWaveJob
 */

/**
 * This module defines a constructor for ColorWaveJob objects.
 *
 * ColorWaveJob objects animate the tiles of a Grid in order to create waves of color.
 *
 * @module ColorWaveJob
 */
(function () {
  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var config = {};

  config.period = 1000;
  config.wavelength = 600;
  config.originX = -100;
  config.originY = 1400;

  // Amplitude (will range from negative to positive)
  config.deltaHue = 0;
  config.deltaSaturation = 0;
  config.deltaLightness = 5;

  config.deltaOpacityImageBackgroundScreen = 0.18;

  config.opacity = 0.5;

  //  --- Dependent parameters --- //

  config.computeDependentValues = function () {
    config.halfPeriod = config.period / 2;
  };

  config.computeDependentValues();

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  /**
   * Calculates a wave offset value for each tile according to their positions in the grid.
   *
   * @this ColorWaveJob
   */
  function initTileProgressOffsets() {
    var job, i, count, tile, length, deltaX, deltaY, halfWaveProgressWavelength;

    job = this;

    halfWaveProgressWavelength = config.wavelength / 2;
    job.waveProgressOffsetsNonContentTiles = [];
    job.waveProgressOffsetsContentTiles = [];

    // Calculate offsets for the non-content tiles
    for (i = 0, count = job.grid.allNonContentTiles.length; i < count; i += 1) {
      tile = job.grid.allNonContentTiles[i];

      deltaX = tile.originalAnchor.x - config.originX;
      deltaY = tile.originalAnchor.y - config.originY;
      length = Math.sqrt(deltaX * deltaX + deltaY * deltaY) + config.wavelength;

      job.waveProgressOffsetsNonContentTiles[i] =
          -(length % config.wavelength - halfWaveProgressWavelength) / halfWaveProgressWavelength;
    }

    // Calculate offsets for the content tiles
    for (i = 0, count = job.grid.contentTiles.length; i < count; i += 1) {
      tile = job.grid.contentTiles[i];

      deltaX = tile.originalAnchor.x - config.originX;
      deltaY = tile.originalAnchor.y - config.originY;
      length = Math.sqrt(deltaX * deltaX + deltaY * deltaY) + config.wavelength;

      job.waveProgressOffsetsContentTiles[i] =
          -(length % config.wavelength - halfWaveProgressWavelength) / halfWaveProgressWavelength;
    }
  }

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  /**
   * Updates the animation progress of the given non-content tile.
   *
   * @param {Number} progress From -1 to 1
   * @param {Tile} tile
   * @param {Number} waveProgressOffset From -1 to 1
   */
  function updateNonContentTile(progress, tile, waveProgressOffset) {
    var tileProgress =
        Math.sin(((((progress + 1 + waveProgressOffset) % 2) + 2) % 2 - 1) * Math.PI);

    tile.currentColor.h += config.deltaHue * tileProgress * config.opacity;
    tile.currentColor.s += config.deltaSaturation * tileProgress * config.opacity;
    tile.currentColor.l += config.deltaLightness * tileProgress * config.opacity;
  }

  /**
   * Updates the animation progress of the given content tile.
   *
   * @param {Number} progress From -1 to 1
   * @param {Tile} tile
   * @param {Number} waveProgressOffset From -1 to 1
   */
  function updateContentTile(progress, tile, waveProgressOffset) {
    var tileProgress =
        Math.sin(((((progress + 1 + waveProgressOffset) % 2) + 2) % 2 - 1) * Math.PI) * 0.5 + 0.5;

    tile.imageScreenOpacity += -tileProgress * config.opacity *
        config.deltaOpacityImageBackgroundScreen;
  }

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  /**
   * Sets this ColorWaveJob as started.
   *
   * @this ColorWaveJob
   * @param {Number} startTime
   */
  function start(startTime) {
    var job = this;

    job.startTime = startTime;
    job.isComplete = false;
  }

  /**
   * Updates the animation progress of this ColorWaveJob to match the given time.
   *
   * This should be called from the overall animation loop.
   *
   * @this ColorWaveJob
   * @param {Number} currentTime
   * @param {Number} deltaTime
   */
  function update(currentTime, deltaTime) {
    var job, progress, i, count;

    job = this;

    progress = (currentTime + config.halfPeriod) / config.period % 2 - 1;

    for (i = 0, count = job.grid.allNonContentTiles.length; i < count; i += 1) {
      updateNonContentTile(progress, job.grid.allNonContentTiles[i],
          job.waveProgressOffsetsNonContentTiles[i]);
    }

    for (i = 0, count = job.grid.contentTiles.length; i < count; i += 1) {
      updateContentTile(progress, job.grid.contentTiles[i],
          job.waveProgressOffsetsContentTiles[i]);
    }
  }

  /**
   * Draws the current state of this ColorWaveJob.
   *
   * This should be called from the overall animation loop.
   *
   * @this ColorWaveJob
   */
  function draw() {
    // This animation job updates the state of actual tiles, so it has nothing of its own to draw
  }

  /**
   * Stops this ColorWaveJob, and returns the element its original form.
   *
   * @this ColorWaveJob
   */
  function cancel() {
    var job = this;

    job.isComplete = true;
  }

  /**
   * @this ColorWaveJob
   */
  function refresh() {
    var job = this;

    init.call(job);
  }

  /**
   * @this ColorWaveJob
   */
  function init() {
    var job = this;

    config.computeDependentValues();
    initTileProgressOffsets.call(job);
  }

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @constructor
   * @global
   * @param {Grid} grid
   */
  function ColorWaveJob(grid) {
    var job = this;

    job.grid = grid;
    job.waveProgressOffsetsNonContentTiles = null;
    job.waveProgressOffsetsContentTiles = null;
    job.startTime = 0;
    job.isComplete = true;

    job.start = start;
    job.update = update;
    job.draw = draw;
    job.cancel = cancel;
    job.refresh = refresh;
    job.init = init;

    job.init();

    console.log('ColorWaveJob created');
  }

  ColorWaveJob.config = config;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.ColorWaveJob = ColorWaveJob;

  console.log('ColorWaveJob module loaded');
})();

/**
 * @typedef {AnimationJob} DisplacementResetJob
 */

/**
 * This module defines a constructor for DisplacementResetJob objects.
 *
 * DisplacementResetJob objects reset tile displacement values during each animation frame.
 *
 * @module DisplacementResetJob
 */
(function () {
  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var config = {};

  //  --- Dependent parameters --- //

  config.computeDependentValues = function () {
  };

  config.computeDependentValues();

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  /**
   * Sets this DisplacementResetJob as started.
   *
   * @this DisplacementResetJob
   * @param {Number} startTime
   */
  function start(startTime) {
    var job = this;

    job.startTime = startTime;
    job.isComplete = false;
  }

  /**
   * Updates the animation progress of this DisplacementResetJob to match the given time.
   *
   * This should be called from the overall animation loop.
   *
   * @this DisplacementResetJob
   * @param {Number} currentTime
   * @param {Number} deltaTime
   */
  function update(currentTime, deltaTime) {
    var job, i, count;

    job = this;

    // Update the Tiles
    for (i = 0, count = job.grid.allTiles.length; i < count; i += 1) {
      job.grid.allTiles[i].currentAnchor.x = job.grid.allTiles[i].originalAnchor.x;
      job.grid.allTiles[i].currentAnchor.y = job.grid.allTiles[i].originalAnchor.y;
    }

    if (job.grid.isPostOpen) {
      // Update the Carousel
      job.grid.pagePost.carousel.currentIndexPositionRatio =
        job.grid.pagePost.carousel.currentIndex;
    }
  }

  /**
   * Draws the current state of this DisplacementResetJob.
   *
   * This should be called from the overall animation loop.
   *
   * @this DisplacementResetJob
   */
  function draw() {
    // This animation job updates the state of actual tiles, so it has nothing of its own to draw
  }

  /**
   * Stops this DisplacementResetJob, and returns the element its original form.
   *
   * @this DisplacementResetJob
   */
  function cancel() {
    var job = this;

    job.isComplete = true;
  }

  /**
   * @this DisplacementResetJob
   */
  function refresh() {
    var job = this;

    init.call(job);
  }

  /**
   * @this DisplacementResetJob
   */
  function init() {
  }

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @constructor
   * @global
   * @param {Grid} grid
   */
  function DisplacementResetJob(grid) {
    var job = this;

    job.grid = grid;
    job.startTime = 0;
    job.isComplete = true;

    job.start = start;
    job.update = update;
    job.draw = draw;
    job.cancel = cancel;
    job.refresh = refresh;
    job.init = init;

    job.init();

    console.log('DisplacementResetJob created');
  }

  DisplacementResetJob.config = config;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.DisplacementResetJob = DisplacementResetJob;

  console.log('DisplacementResetJob module loaded');
})();

/**
 * @typedef {AnimationJob} DisplacementWaveJob
 */

/**
 * This module defines a constructor for DisplacementWaveJob objects.
 *
 * DisplacementWaveJob objects animate the tiles of a Grid in order to create waves of
 * motion.
 *
 * @module DisplacementWaveJob
 */
(function () {
  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var config = {};

  config.period = 3200;
  config.wavelength = 1800;
  config.originX = 0;
  config.originY = 0;

  // Amplitude (will range from negative to positive)
  config.tileDeltaX = -15;
  config.tileDeltaY = -config.tileDeltaX * Math.sqrt(3);

  //  --- Dependent parameters --- //

  config.computeDependentValues = function () {
    config.halfPeriod = config.period / 2;

    config.displacementAmplitude =
        Math.sqrt(config.tileDeltaX * config.tileDeltaX +
            config.tileDeltaY * config.tileDeltaY);
  };

  config.computeDependentValues();

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  /**
   * Calculates a wave offset value for each tile according to their positions in the grid.
   *
   * @this DisplacementWaveJob
   */
  function initTileProgressOffsets() {
    var job, i, count, tile, length, deltaX, deltaY, halfWaveProgressWavelength;

    job = this;

    halfWaveProgressWavelength = config.wavelength / 2;
    job.waveProgressOffsets = [];

    for (i = 0, count = job.grid.allTiles.length; i < count; i += 1) {
      tile = job.grid.allTiles[i];

      deltaX = tile.originalAnchor.x - config.originX;
      deltaY = tile.originalAnchor.y - config.originY;
      length = Math.sqrt(deltaX * deltaX + deltaY * deltaY) + config.wavelength;

      job.waveProgressOffsets[i] = -(length % config.wavelength - halfWaveProgressWavelength)
          / halfWaveProgressWavelength;
    }
  }

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  /**
   * Updates the animation progress of the given tile.
   *
   * @param {Number} progress
   * @param {Tile} tile
   * @param {Number} waveProgressOffset
   */
  function updateTile(progress, tile, waveProgressOffset) {
    var tileProgress =
        Math.sin(((((progress + 1 + waveProgressOffset) % 2) + 2) % 2 - 1) * Math.PI);

    tile.currentAnchor.x += config.tileDeltaX * tileProgress;
    tile.currentAnchor.y += config.tileDeltaY * tileProgress;
  }

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  /**
   * Sets this DisplacementWaveJob as started.
   *
   * @this DisplacementWaveJob
   * @param {Number} startTime
   */
  function start(startTime) {
    var job = this;

    job.startTime = startTime;
    job.isComplete = false;
  }

  /**
   * Updates the animation progress of this DisplacementWaveJob to match the given time.
   *
   * This should be called from the overall animation loop.
   *
   * @this DisplacementWaveJob
   * @param {Number} currentTime
   * @param {Number} deltaTime
   */
  function update(currentTime, deltaTime) {
    var job, progress, i, count;

    job = this;

    progress = (currentTime + config.halfPeriod) / config.period % 2 - 1;

    for (i = 0, count = job.grid.allTiles.length; i < count; i += 1) {
      updateTile(progress, job.grid.allTiles[i], job.waveProgressOffsets[i]);
    }
  }

  /**
   * Draws the current state of this DisplacementWaveJob.
   *
   * This should be called from the overall animation loop.
   *
   * @this DisplacementWaveJob
   */
  function draw() {
    // This animation job updates the state of actual tiles, so it has nothing of its own to draw
  }

  /**
   * Stops this DisplacementWaveJob, and returns the element its original form.
   *
   * @this DisplacementWaveJob
   */
  function cancel() {
    var job = this;

    job.isComplete = true;
  }

  /**
   * @this DisplacementWaveJob
   */
  function refresh() {
    var job = this;

    init.call(job);
  }

  /**
   * @this DisplacementWaveJob
   */
  function init() {
    var job = this;

    config.computeDependentValues();
    initTileProgressOffsets.call(job);
  }

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @constructor
   * @global
   * @param {Grid} grid
   */
  function DisplacementWaveJob(grid) {
    var job = this;

    job.grid = grid;
    job.waveProgressOffsets = null;
    job.startTime = 0;
    job.isComplete = true;

    job.start = start;
    job.update = update;
    job.draw = draw;
    job.cancel = cancel;
    job.refresh = refresh;
    job.init = init;

    job.init();

    console.log('DisplacementWaveJob created');
  }

  DisplacementWaveJob.config = config;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.DisplacementWaveJob = DisplacementWaveJob;

  console.log('DisplacementWaveJob module loaded');
})();

/**
 * @typedef {AnimationJob} CarouselImageSlideJob
 */

/**
 * This module defines a constructor for CarouselImageSlideJob objects.
 *
 * @module CarouselImageSlideJob
 */
(function () {
  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var config = {};

  config.duration = 300;

  //  --- Dependent parameters --- //

  config.computeDependentValues = function () {
  };

  config.computeDependentValues();

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  /**
   * @this CarouselImageSlideJob
   */
  function handleComplete(wasCancelled) {
    var job = this;

    console.log('CarouselImageSlideJob ' + (wasCancelled ? 'cancelled' : 'completed'));

    job.isComplete = true;
    job.onComplete();

    job.carousel.onSlideFinished();
  }

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  /**
   * Sets this CarouselImageSlideJob as started.
   *
   * @this CarouselImageSlideJob
   * @param {Number} startTime
   */
  function start(startTime) {
    var job = this;

    job.startTime = startTime;
    job.isComplete = false;

    job.indexInitialDisplacement = job.carousel.previousIndex - job.carousel.currentIndex;
  }

  /**
   * Updates the animation progress of this CarouselImageSlideJob to match the given time.
   *
   * This should be called from the overall animation loop.
   *
   * @this CarouselImageSlideJob
   * @param {Number} currentTime
   * @param {Number} deltaTime
   */
  function update(currentTime, deltaTime) {
    var job, progress;

    job = this;

    // Calculate progress with an easing function
    progress = (currentTime - job.startTime) / job.duration;
    progress = 1 - window.hg.util.easingFunctions.easeInOutCubic(progress);
    progress = progress < 0 ? 0 : progress;

    job.carousel.currentIndexPositionRatio += job.indexInitialDisplacement * progress;

    // Is the job done?
    if (progress === 0) {
      handleComplete.call(job, false);
    }
  }

  /**
   * Draws the current state of this CarouselImageSlideJob.
   *
   * This should be called from the overall animation loop.
   *
   * @this CarouselImageSlideJob
   */
  function draw() {
    // This animation job updates the state of the carousel and has nothing of its own to draw
  }

  /**
   * Stops this CarouselImageSlideJob, and returns the element its original form.
   *
   * @this CarouselImageSlideJob
   */
  function cancel() {
    var job = this;

    handleComplete.call(job, true);
  }

  /**
   * @this CarouselImageSlideJob
   */
  function init() {
    var job = this;

    config.computeDependentValues();
  }

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @constructor
   * @global
   * @param {Grid} grid
   * @param {Tile} tile
   * @param {Function} onComplete
   * @param {Carousel} carousel
   */
  function CarouselImageSlideJob(grid, tile, onComplete, carousel) {
    var job = this;

    job.grid = grid;
    job.baseTile = grid.expandedTile;
    job.startTime = 0;
    job.isComplete = true;
    job.carousel = carousel;

    job.indexInitialDisplacement = Number.NaN;

    job.duration = config.duration;

    job.start = start;
    job.update = update;
    job.draw = draw;
    job.cancel = cancel;
    job.onComplete = onComplete;
    job.init = init;

    console.log('CarouselImageSlideJob created: currentIndex=' + job.carousel.currentIndex +
      ', previousIndex=' + job.carousel.previousIndex);
  }

  CarouselImageSlideJob.config = config;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.CarouselImageSlideJob = CarouselImageSlideJob;

  console.log('CarouselImageSlideJob module loaded');
})();

/**
 * @typedef {AnimationJob} ClosePostJob
 */

/**
 * This module defines a constructor for ClosePostJob objects.
 *
 * @module ClosePostJob
 */
(function () {
  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var config = {};

  config.duration = 500;

  //  --- Dependent parameters --- //

  config.computeDependentValues = function () {
  };

  config.computeDependentValues();

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  /**
   * @this ClosePostJob
   */
  function handleComplete(wasCancelled) {
    var job = this;

    console.log('ClosePostJob ' + (wasCancelled ? 'cancelled' : 'completed'));

    destroySectors.call(job);

    // Don't reset some state if another expansion job started after this one did
    if (job.grid.lastExpansionJob === job) {
      // Destroy the expanded tile expanded state
      job.baseTile.expandedState = null;

      job.grid.sectors = [];
      job.grid.updateAllTilesCollection(job.grid.originalTiles);

      job.grid.isTransitioning = false;
      job.grid.expandedTile = null;

      // TODO: this should instead fade out the old persistent animations and fade in the new ones
      // Restart the persistent jobs now the the overall collection of tiles has changed
      window.hg.controller.resetPersistentJobs(job.grid);
    }

    job.isComplete = true;
    job.onComplete();
  }

  /**
   * @this ClosePostJob
   */
  function destroySectors() {
    var job, i, count, alsoDestroyOriginalTileExpandedState;

    job = this;

    alsoDestroyOriginalTileExpandedState = job.grid.lastExpansionJob === job;

    // Destroy the sectors
    for (i = 0, count = job.sectors.length; i < count; i += 1) {
      job.sectors[i].destroy(alsoDestroyOriginalTileExpandedState);
    }

    job.sectors = [];
  }

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  /**
   * Sets this ClosePostJob as started.
   *
   * @this ClosePostJob
   * @param {Number} startTime
   */
  function start(startTime) {
    var panDisplacement;
    var job = this;

    job.startTime = startTime;
    job.isComplete = false;

    job.grid.isPostOpen = false;
    job.grid.isTransitioning = true;
    job.grid.lastExpansionJob = job;

    panDisplacement = {
      x: job.grid.originalCenter.x - job.grid.panCenter.x,
      y: job.grid.originalCenter.y - job.grid.panCenter.y
    };

    // Start the sub-jobs
    window.hg.controller.transientJobs.SpreadJob.create(job.grid, job.baseTile)
        .duration = config.duration + window.hg.OpenPostJob.config.spreadDurationOffset;
    window.hg.controller.transientJobs.PanJob.create(job.grid, job.baseTile, {
      x: job.grid.panCenter.x,
      y: job.grid.panCenter.y
    })
        .duration = config.duration + window.hg.OpenPostJob.config.panDurationOffset;
    window.hg.controller.transientJobs.DilateSectorsJob.create(job.grid, job.baseTile, panDisplacement)
        .duration = config.duration + window.hg.OpenPostJob.config.dilateSectorsDurationOffset;
    window.hg.controller.transientJobs.FadePostJob.create(job.grid, job.baseTile)
        .duration = config.duration + window.hg.OpenPostJob.config.fadePostDurationOffset;

    job.grid.annotations.setExpandedAnnotations(false);

    // Turn scrolling back on
    job.grid.parent.style.overflowY = 'auto';
  }

  /**
   * Updates the animation progress of this ClosePostJob to match the given time.
   *
   * This should be called from the overall animation loop.
   *
   * @this ClosePostJob
   * @param {Number} currentTime
   * @param {Number} deltaTime
   */
  function update(currentTime, deltaTime) {
    var job = this;

    // Is the job done?
    if (currentTime - job.startTime >= config.duration) {
      handleComplete.call(job, false);
    }
  }

  /**
   * Draws the current state of this ClosePostJob.
   *
   * This should be called from the overall animation loop.
   *
   * @this ClosePostJob
   */
  function draw() {
    // This animation job updates the state of actual tiles, so it has nothing of its own to draw
  }

  /**
   * Stops this ClosePostJob, and returns the element its original form.
   *
   * @this ClosePostJob
   */
  function cancel() {
    var job = this;

    handleComplete.call(job, true);
  }

  /**
   * @this ClosePostJob
   */
  function init() {
    var job = this;

    config.computeDependentValues();
  }

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @constructor
   * @global
   * @param {Grid} grid
   * @param {Tile} tile
   * @param {Function} onComplete
   * @param {Boolean} isPairedWithAnotherOpen
   */
  function ClosePostJob(grid, tile, onComplete, isPairedWithAnotherOpen) {
    var job = this;

    job.grid = grid;
    job.baseTile = grid.expandedTile;
    job.startTime = 0;
    job.isComplete = true;
    job.sectors = grid.sectors;

    job.start = start;
    job.update = update;
    job.draw = draw;
    job.cancel = cancel;
    job.onComplete = onComplete;
    job.init = init;

    if (!isPairedWithAnotherOpen) {
      // If there isn't another OpenPostJob that will assign the hash, then clear it here.
      history.pushState({}, document.title, '/');
    }

    console.log('ClosePostJob created: tileIndex=' + job.baseTile.originalIndex);
  }

  ClosePostJob.config = config;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.ClosePostJob = ClosePostJob;

  console.log('ClosePostJob module loaded');
})();

/**
 * @typedef {AnimationJob} DilateSectorsJob
 */

/**
 * This module defines a constructor for DilateSectorsJob objects.
 *
 * @module DilateSectorsJob
 */
(function () {
  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var config = {};

  config.duration = 500;

  //  --- Dependent parameters --- //

  config.computeDependentValues = function () {
  };

  config.computeDependentValues();

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  /**
   * @this DilateSectorsJob
   */
  function handleComplete(wasCancelled) {
    var job = this;

    console.log('DilateSectorsJob ' + (wasCancelled ? 'cancelled' : 'completed'));

    job.isComplete = true;
    job.onComplete();
  }

  /**
   * @this OpenPostJob
   */
  function setFinalPositions() {
    var i;

    var job = this;

    // Displace the sectors
    for (i = 0; i < 6; i += 1) {
      // Update the Sector's base position to account for the panning
      job.sectors[i].originalAnchor.x += job.panDisplacement.x;
      job.sectors[i].originalAnchor.y += job.panDisplacement.y;

      job.sectors[i].setOriginalPositionForExpansion(job.isExpanding);
    }
  }

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  /**
   * Sets this DilateSectorsJob as started.
   *
   * @this DilateSectorsJob
   * @param {Number} startTime
   */
  function start(startTime) {
    var job = this;

    job.startTime = startTime;
    job.isComplete = false;

    // Set the final positions at the start, and animate everything in "reverse"
    setFinalPositions.call(job);
  }

  /**
   * Updates the animation progress of this DilateSectorsJob to match the given time.
   *
   * This should be called from the overall animation loop.
   *
   * @this DilateSectorsJob
   * @param {Number} currentTime
   * @param {Number} deltaTime
   */
  function update(currentTime, deltaTime) {
    var job, progress, i, dx, dy;

    job = this;

    // Calculate progress with an easing function
    // Because the final positions were set at the start, the progress needs to update in "reverse"
    progress = (currentTime - job.startTime) / job.duration;
    progress = 1 - window.hg.util.easingFunctions.easeOutQuint(progress);
    progress = progress < 0 ? 0 : (job.isExpanding ? progress : -progress);

    // Update the offsets for each of the six sectors
    for (i = 0; i < 6; i += 1) {
      dx = job.sectors[i].expandedDisplacement.x * progress;
      dy = job.sectors[i].expandedDisplacement.y * progress;

      job.sectors[i].updateCurrentPosition(dx, dy);
    }

    // Is the job done?
    if (progress === 0) {
      handleComplete.call(job, false);
    }
  }

  /**
   * Draws the current state of this DilateSectorsJob.
   *
   * This should be called from the overall animation loop.
   *
   * @this DilateSectorsJob
   */
  function draw() {
    // This animation job updates the state of actual tiles, so it has nothing of its own to draw
  }

  /**
   * Stops this DilateSectorsJob, and returns the element its original form.
   *
   * @this DilateSectorsJob
   */
  function cancel() {
    var job = this;

    handleComplete.call(job, true);
  }

  /**
   * @this DilateSectorsJob
   */
  function init() {
    var job = this;

    config.computeDependentValues();
  }

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @constructor
   * @global
   * @param {Grid} grid
   * @param {Tile} tile
   * @param {Function} onComplete
   * @param {{x:Number,y:Number}} panDisplacement
   */
  function DilateSectorsJob(grid, tile, onComplete, panDisplacement) {
    var job = this;

    job.grid = grid;
    job.baseTile = grid.expandedTile;
    job.startTime = 0;
    job.isComplete = true;
    job.panDisplacement = panDisplacement;
    job.sectors = grid.sectors;
    job.parentExpansionJob = job.grid.lastExpansionJob;
    job.isExpanding = grid.isPostOpen;

    job.duration = config.duration;

    job.start = start;
    job.update = update;
    job.draw = draw;
    job.cancel = cancel;
    job.onComplete = onComplete;
    job.init = init;

    console.log('DilateSectorsJob created: tileIndex=' + job.baseTile.originalIndex);
  }

  DilateSectorsJob.config = config;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.DilateSectorsJob = DilateSectorsJob;

  console.log('DilateSectorsJob module loaded');
})();

/**
 * @typedef {AnimationJob} DisplacementRadiateJob
 */

/**
 * This module defines a constructor for DisplacementRadiateJob objects.
 *
 * @module DisplacementRadiateJob
 */
(function () {
  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var config = {};

  config.duration = 500;
  config.waveSpeed = 3; // pixels / millisecond
  config.waveWidth = 500;

  config.displacementDistance = 50;

  config.isRecurring = false;
  config.avgDelay = 4000;
  config.delayDeviationRange = 3800;

  //  --- Dependent parameters --- //

  config.computeDependentValues = function () {
    // TODO:
  };

  config.computeDependentValues();

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  /**
   * Calculates and stores the maximal displacement values for all tiles.
   *
   * @this DisplacementRadiateJob
   */
  function initializeDisplacements() {
    // TODO:
//    var job, i, iCount, j, jCount, k, tiles, displacementRatio;
//
//    job = this;
//
//    displacementRatio =
//        (window.hg.Grid.config.tileShortLengthWithGap + window.hg.Grid.config.tileGap) /
//        (window.hg.Grid.config.tileShortLengthWithGap);
//
//    job.displacements = [];
//
//    k = 0;
//
//    if (job.grid.isPostOpen) {
//      // Consider all of the old AND new tiles
//      for (i = 0, iCount = job.grid.sectors.length; i < iCount; i += 1) {
//        tiles = job.grid.sectors[i].tiles;
//
//        for (j = 0, jCount = tiles.length; j < jCount; j += 1) {
//          job.displacements[k] = {
//            tile: tiles[j],
//            displacementX: displacementRatio *
//                (tiles[j].originalAnchorX - job.tile.originalAnchorX),
//            displacementY: displacementRatio *
//                (tiles[j].originalAnchorY - job.tile.originalAnchorY)
//          };
//          k += 1;
//        }
//      }
//    } else {
//      for (i = 0, iCount = job.grid.originalTiles.length; i < iCount; i += 1) {
//        job.displacements[i] = {
//          tile: job.grid.originalTiles[i],
//          displacementX: displacementRatio *
//              (job.grid.originalTiles[i].originalAnchorX - job.tile.originalAnchorX),
//          displacementY: displacementRatio *
//              (job.grid.originalTiles[i].originalAnchorY - job.tile.originalAnchorY)
//        };
//      }
//    }
  }

  /**
   * @this DisplacementRadiateJob
   */
  function handleComplete(wasCancelled) {
    var job = this;

    console.log('DisplacementRadiateJob ' + (wasCancelled ? 'cancelled' : 'completed'));

    job.isComplete = true;

    job.onComplete();
  }

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  /**
   * Sets this DisplacementRadiateJob as started.
   *
   * @this DisplacementRadiateJob
   * @param {Number} startTime
   */
  function start(startTime) {
    var job = this;

    job.startTime = startTime;
    job.isComplete = false;
  }

  /**
   * Updates the animation progress of this DisplacementRadiateJob to match the given time.
   *
   * This should be called from the overall animation loop.
   *
   * @this DisplacementRadiateJob
   * @param {Number} currentTime
   * @param {Number} deltaTime
   */
  function update(currentTime, deltaTime) {
    // TODO:
//    var job, progress, i, count;
//
//    job = this;
//
//    if (currentTime > job.startTime + config.duration) {
//      handleComplete.call(job, false);
//    } else {
//      // Ease-out halfway, then ease-in back
//      progress = (currentTime - job.startTime) / config.duration;
//      progress = (progress > 0.5 ? 1 - progress : progress) * 2;
//      progress = window.hg.util.easingFunctions.easeOutQuint(progress);
//
//      // Displace the tiles
//      for (i = 0, count = job.displacements.length; i < count; i += 1) {
//        job.displacements[i].tile.anchorX += job.displacements[i].displacementX * progress;
//        job.displacements[i].tile.anchorY += job.displacements[i].displacementY * progress;
//      }
//    }
  }

  /**
   * Draws the current state of this DisplacementRadiateJob.
   *
   * This should be called from the overall animation loop.
   *
   * @this DisplacementRadiateJob
   */
  function draw() {
    // This animation job updates the state of actual tiles, so it has nothing of its own to draw
  }

  /**
   * Stops this DisplacementRadiateJob, and returns the element its original form.
   *
   * @this DisplacementRadiateJob
   */
  function cancel() {
    var job = this;

    handleComplete.call(job, true);
  }

  /**
   * @this DisplacementRadiateJob
   */
  function init() {
    var job = this;

    config.computeDependentValues();
    // TODO:
  }

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @constructor
   * @global
   * @param {Grid} grid
   * @param {Tile} tile
   * @param {Function} onComplete
   */
  function DisplacementRadiateJob(grid, tile, onComplete) {
    var job = this;

    job.grid = grid;
    job.tile = tile;
    job.startTime = 0;
    job.isComplete = true;

    job.displacements = null;

    job.start = start;
    job.update = update;
    job.draw = draw;
    job.cancel = cancel;
    job.onComplete = onComplete;
    job.init = init;

    initializeDisplacements.call(job);

    console.log('DisplacementRadiateJob created: tileIndex=' + job.tile.originalIndex);
  }

  DisplacementRadiateJob.config = config;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.DisplacementRadiateJob = DisplacementRadiateJob;

  console.log('DisplacementRadiateJob module loaded');
})();

/**
 * @typedef {AnimationJob} FadePostJob
 */

/**
 * This module defines a constructor for FadePostJob objects.
 *
 * @module FadePostJob
 */
(function () {
  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var config = {};

  config.duration = 500;

  config.quick1FadeDurationRatio = 0.7;
  config.quick2FadeDurationRatio = 0.3;

  //  --- Dependent parameters --- //

  config.computeDependentValues = function () {
  };

  config.computeDependentValues();

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  /**
   * @this FadePostJob
   */
  function handleComplete(wasCancelled) {
    var job = this;

    console.log('FadePostJob ' + (wasCancelled ? 'cancelled' : 'completed'));

    job.isComplete = true;
    job.onComplete();

    if (!job.isFadingIn) {
      // Don't reset some state if another expansion job started after this one did
      if (job.parentExpansionJob === job.grid.lastExpansionJob) {
        job.grid.destroyPagePost();
      } else {
        job.pagePost.destroy();

        job.baseTile.currentVertexOuterDeltas = job.baseTile.originalVertexOuterDeltas.slice(0);
        job.baseTile.currentVertexInnerDeltas = job.baseTile.originalVertexInnerDeltas.slice(0);
      }

      job.baseTile.show();
    } else {
      // Don't reset some state if another expansion job started after this one did
      if (job.parentExpansionJob === job.grid.lastExpansionJob) {
        job.baseTile.hide();
      }
    }

    job.baseTile.element.style.pointerEvents = 'auto';
  }

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  /**
   * @param {Array.<Number>} currentVertexDeltas
   * @param {Array.<Number>} oldVertexDeltas
   * @param {Array.<Number>} newVertexDeltas
   * @param {Number} progress
   */
  function interpolateVertexDeltas(currentVertexDeltas, oldVertexDeltas, newVertexDeltas,
    progress) {
    var i, count;

    for (i = 0, count = currentVertexDeltas.length; i < count; i += 1) {
      currentVertexDeltas[i] =
        oldVertexDeltas[i] + (newVertexDeltas[i] - oldVertexDeltas[i]) * progress;
    }
  }

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  /**
   * Sets this FadePostJob as started.
   *
   * @this FadePostJob
   * @param {Number} startTime
   */
  function start(startTime) {
    var expandedTileOuterRadius;
    var job = this;

    job.startTime = startTime;
    job.isComplete = false;

    job.pagePostStartPosition = {};
    job.pagePostDisplacement = {};

    job.baseTile.show();

    if (job.isFadingIn) {
      job.pagePostStartPosition.x = job.baseTile.particle.px;
      job.pagePostStartPosition.y = job.baseTile.particle.py;
      job.pagePostDisplacement.x = job.grid.originalCenter.x - job.pagePostStartPosition.x;
      job.pagePostDisplacement.y = job.grid.originalCenter.y - job.pagePostStartPosition.y +
        job.grid.scrollTop;

      job.pagePost = job.grid.createPagePost(job.baseTile, job.pagePostStartPosition);

      expandedTileOuterRadius = window.hg.OpenPostJob.config.expandedDisplacementTileCount *
        window.hg.Grid.config.tileShortLengthWithGap;

      job.baseTile.expandedVertexOuterDeltas =
        window.hg.Tile.computeVertexOuterDeltas(expandedTileOuterRadius, job.grid.isVertical);
      job.baseTile.expandedVertexInnerDeltas =
        window.hg.Tile.computeVertexInnerDeltas(expandedTileOuterRadius, job.grid.isVertical, 1.0);
    } else {
      job.pagePostStartPosition.x = job.grid.originalCenter.x;
      job.pagePostStartPosition.y = job.grid.originalCenter.y + job.grid.scrollTop;
      job.pagePostDisplacement.x = job.pagePostStartPosition.x - job.grid.currentCenter.x;
      job.pagePostDisplacement.y = job.pagePostStartPosition.y - job.grid.currentCenter.y -
        job.grid.scrollTop;
    }

    job.baseTile.element.style.pointerEvents = 'none';
  }

  /**
   * Updates the animation progress of this FadePostJob to match the given time.
   *
   * This should be called from the overall animation loop.
   *
   * @this FadePostJob
   * @param {Number} currentTime
   * @param {Number} deltaTime
   */
  function updateFadeIn(currentTime, deltaTime) {
    var job, progress, uneasedProgress, quick1FadeProgress, quick2FadeProgress;

    job = this;

    // Calculate progress with an easing function
    progress = (currentTime - job.startTime) / job.duration;
    uneasedProgress = progress;
    progress = window.hg.util.easingFunctions.easeOutCubic(progress);
    progress = progress > 1 ? 1 : progress;

    // Some parts of the animation should happen at different speeds
    quick1FadeProgress = progress / config.quick1FadeDurationRatio;
    quick1FadeProgress = (quick1FadeProgress > 1 ? 1 : quick1FadeProgress);
    quick2FadeProgress = progress / config.quick2FadeDurationRatio;
    quick2FadeProgress = (quick2FadeProgress > 1 ? 1 : quick2FadeProgress);

    // Update the opacity of the center Tile
    job.baseTile.element.style.opacity = 1 - quick1FadeProgress;
    job.baseTile.tilePost.elements.title.style.opacity = 1 - quick2FadeProgress;

    // Update the opacity of the PagePost
    job.pagePost.opacity = uneasedProgress;

    // Update the position of the PagePost
    job.pagePost.center.x = job.pagePostStartPosition.x +
      job.pagePostDisplacement.x * progress;
    job.pagePost.center.y = job.pagePostStartPosition.y +
      job.pagePostDisplacement.y * progress;

    interpolateVertexDeltas(job.baseTile.currentVertexOuterDeltas, job.baseTile.originalVertexOuterDeltas,
      job.baseTile.expandedVertexOuterDeltas, quick1FadeProgress);
    interpolateVertexDeltas(job.baseTile.currentVertexInnerDeltas, job.baseTile.originalVertexInnerDeltas,
      job.baseTile.expandedVertexInnerDeltas, quick1FadeProgress);

    // Is the job done?
    if (progress === 1) {
      handleComplete.call(job, false);
    }
  }

  /**
   * Updates the animation progress of this FadePostJob to match the given time.
   *
   * This should be called from the overall animation loop.
   *
   * @this FadePostJob
   * @param {Number} currentTime
   * @param {Number} deltaTime
   */
  function updateFadeOut(currentTime, deltaTime) {
    var job, progress, quick1FadeProgress;

    job = this;

    // Calculate progress with an easing function
    progress = (currentTime - job.startTime) / job.duration;
    progress = window.hg.util.easingFunctions.easeOutQuint(progress);
    progress = progress > 1 ? 1 : progress;

    // Some parts of the animation should happen at different speeds
    quick1FadeProgress = progress / config.quick1FadeDurationRatio;
    quick1FadeProgress = (quick1FadeProgress > 1 ? 1 : quick1FadeProgress);

    // Update the opacity of the center Tile
    job.baseTile.element.style.opacity = progress;
    job.baseTile.tilePost.elements.title.style.opacity = progress;

    // Update the opacity of the PagePost
    job.pagePost.opacity = 1 - quick1FadeProgress;

    // Update the position of the PagePost
    job.pagePost.center.x = job.pagePostStartPosition.x +
      job.pagePostDisplacement.x * progress;
    job.pagePost.center.y = job.pagePostStartPosition.y +
      job.pagePostDisplacement.y * progress;

    interpolateVertexDeltas(job.baseTile.currentVertexOuterDeltas, job.baseTile.expandedVertexOuterDeltas,
      job.baseTile.originalVertexOuterDeltas, quick1FadeProgress);
    interpolateVertexDeltas(job.baseTile.currentVertexInnerDeltas, job.baseTile.expandedVertexInnerDeltas,
      job.baseTile.originalVertexInnerDeltas, quick1FadeProgress);

    // Is the job done?
    if (progress === 1) {
      handleComplete.call(job, false);
    }
  }

  /**
   * Draws the current state of this FadePostJob.
   *
   * This should be called from the overall animation loop.
   *
   * @this FadePostJob
   */
  function draw() {
    var job = this;

    job.pagePost.draw();
  }

  /**
   * Stops this FadePostJob, and returns the element its original form.
   *
   * @this FadePostJob
   */
  function cancel() {
    var job = this;

    handleComplete.call(job, true);
  }

  /**
   * @this FadePostJob
   */
  function init() {
    var job = this;

    config.computeDependentValues();
  }

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @constructor
   * @global
   * @param {Grid} grid
   * @param {Tile} tile
   * @param {Function} onComplete
   */
  function FadePostJob(grid, tile, onComplete) {
    var job = this;

    job.grid = grid;
    job.baseTile = grid.expandedTile;
    job.startTime = 0;
    job.isComplete = true;
    job.pagePost = grid.pagePost;
    job.parentExpansionJob = job.grid.lastExpansionJob;
    job.isFadingIn = grid.isPostOpen;
    job.pagePostStartPosition = null;
    job.pagePostDisplacement = null;

    job.duration = config.duration;

    job.start = start;
    job.update = job.isFadingIn ? updateFadeIn : updateFadeOut;
    job.draw = draw;
    job.cancel = cancel;
    job.onComplete = onComplete;
    job.init = init;

    console.log('FadePostJob created: tileIndex=' + job.baseTile.originalIndex +
      ', isFadingIn=' + job.isFadingIn);
  }

  FadePostJob.config = config;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.FadePostJob = FadePostJob;

  console.log('FadePostJob module loaded');
})();

/**
 * @typedef {AnimationJob} HighlightHoverJob
 */

/**
 * This module defines a constructor for HighlightHoverJob objects.
 *
 * @module HighlightHoverJob
 */
(function () {
  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var config = {};

  config.duration = 200;

  config.deltaHue = 0;
  config.deltaSaturation = 0;
  config.deltaLightness = 50;

  config.opacity = 0.5;

  config.isRecurring = false;
  config.avgDelay = 30;
  config.delayDeviationRange = 20;

  //  --- Dependent parameters --- //

  config.computeDependentValues = function () {
  };

  config.computeDependentValues();

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  /**
   * @this HighlightHoverJob
   */
  function handleComplete(wasCancelled) {
    var job = this;

//    console.log('HighlightHoverJob ' + (wasCancelled ? 'cancelled' : 'completed'));

    job.isComplete = true;

    job.onComplete();
  }

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  /**
   * Updates the background image screen opacity of the given content tile according to the given
   * durationRatio.
   *
   * @param {Tile} tile
   * @param {Number} durationRatio Specifies how far this animation is through its overall
   * duration.
   */
  function updateContentTile(tile, durationRatio) {
    var opacity = window.hg.TilePost.config.activeScreenOpacity +
        (durationRatio * (window.hg.TilePost.config.inactiveScreenOpacity -
        window.hg.TilePost.config.activeScreenOpacity));

    tile.imageScreenOpacity = opacity;
  }

  /**
   * Updates the color of the given non-content tile according to the given durationRatio.
   *
   * @param {Tile} tile
   * @param {Number} durationRatio Specifies how far this animation is through its overall
   * duration.
   */
  function updateNonContentTile(tile, durationRatio) {
    var opacity = config.opacity * (1 - durationRatio);

    tile.currentColor.h += config.deltaHue * opacity;
    tile.currentColor.s += config.deltaSaturation * opacity;
    tile.currentColor.l += config.deltaLightness * opacity;
  }

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  /**
   * Sets this HighlightHoverJob as started.
   *
   * @this HighlightHoverJob
   * @param {Number} startTime
   */
  function start(startTime) {
    var job = this;

    job.startTime = startTime;
    job.isComplete = false;
  }

  /**
   * Updates the animation progress of this HighlightHoverJob to match the given time.
   *
   * This should be called from the overall animation loop.
   *
   * @this HighlightHoverJob
   * @param {Number} currentTime
   * @param {Number} deltaTime
   */
  function update(currentTime, deltaTime) {
    var job, durationRatio;

    job = this;

    // When the tile is re-highlighted after this job has started, then this job should be
    // cancelled
    if (job.tile.isHighlighted) {
      job.cancel();
      return;
    }

    if (currentTime > job.startTime + config.duration) {
      job.updateTile(job.tile, 1);
      handleComplete.call(job, false);
    } else {
      durationRatio = (currentTime - job.startTime) / config.duration;

      job.updateTile(job.tile, durationRatio);
    }
  }

  /**
   * Draws the current state of this HighlightHoverJob.
   *
   * This should be called from the overall animation loop.
   *
   * @this HighlightHoverJob
   */
  function draw() {
    // This animation job updates the state of actual tiles, so it has nothing of its own to draw
  }

  /**
   * Stops this HighlightHoverJob, and returns the element its original form.
   *
   * @this HighlightHoverJob
   */
  function cancel() {
    var job = this;

    handleComplete.call(job, true);
  }

  /**
   * @this HighlightHoverJob
   */
  function init() {
  }

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @constructor
   * @global
   * @param {Grid} grid
   * @param {Tile} tile
   * @param {Function} onComplete
   */
  function HighlightHoverJob(grid, tile, onComplete) {
    var job = this;

    job.grid = grid;
    job.tile = tile;
    job.startTime = 0;
    job.isComplete = true;

    job.updateTile = tile.holdsContent ? updateContentTile : updateNonContentTile;

    job.start = start;
    job.update = update;
    job.draw = draw;
    job.cancel = cancel;
    job.onComplete = onComplete;
    job.init = init;

//    console.log('HighlightHoverJob created: tileIndex=' + job.tile.originalIndex);
  }

  HighlightHoverJob.config = config;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.HighlightHoverJob = HighlightHoverJob;

  console.log('HighlightHoverJob module loaded');
})();

/**
 * @typedef {AnimationJob} HighlightRadiateJob
 */

/**
 * This module defines a constructor for HighlightRadiateJob objects.
 *
 * @module HighlightRadiateJob
 */
(function () {
  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var config = {};

  config.shimmerSpeed = 3; // pixels / millisecond
  config.shimmerWaveWidth = 500;
  config.duration = 500;

  config.deltaHue = 0;
  config.deltaSaturation = 0;
  config.deltaLightness = 50;

  config.opacity = 0.5;

  config.isRecurring = false;
  config.avgDelay = 4000;
  config.delayDeviationRange = 3800;

  //  --- Dependent parameters --- //

  config.computeDependentValues = function () {
  };

  config.computeDependentValues();

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  /**
   * Calculates the distance from each tile in the grid to the starting point of this
   * HighlightRadiateJob.
   *
   * This cheats by only calculating the distance to the tiles' original center. This allows us to
   * not need to re-calculate tile distances during each time step.
   *
   * @this HighlightRadiateJob
   */
  function calculateTileDistances() {
    var job, i, count, deltaX, deltaY, distanceOffset;

    job = this;

    distanceOffset = -window.hg.Grid.config.tileShortLengthWithGap;

    for (i = 0, count = job.grid.allNonContentTiles.length; i < count; i += 1) {
      deltaX = job.grid.allNonContentTiles[i].originalAnchor.x - job.startPoint.x;
      deltaY = job.grid.allNonContentTiles[i].originalAnchor.y - job.startPoint.y;
      job.distancesNonContentTiles[i] = Math.sqrt(deltaX * deltaX + deltaY * deltaY) +
          distanceOffset;
    }

    for (i = 0, count = job.grid.contentTiles.length; i < count; i += 1) {
      deltaX = job.grid.contentTiles[i].originalAnchor.x - job.startPoint.x;
      deltaY = job.grid.contentTiles[i].originalAnchor.y - job.startPoint.y;
      job.distancesContentTiles[i] = Math.sqrt(deltaX * deltaX + deltaY * deltaY) + distanceOffset;
    }
  }

  /**
   * @this HighlightRadiateJob
   */
  function handleComplete(wasCancelled) {
    var job = this;

    console.log('HighlightRadiateJob ' + (wasCancelled ? 'cancelled' : 'completed'));

    job.isComplete = true;

    job.onComplete();
  }

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  /**
   * Updates the color of the given non-content tile according to the given waveWidthRatio and
   * durationRatio.
   *
   * @param {Tile} tile
   * @param {Number} waveWidthRatio Specifies the tile's relative distance to the min and max
   * shimmer distances.
   * @param {Number} oneMinusDurationRatio Specifies how far this animation is through its overall
   * duration.
   */
  function updateNonContentTile(tile, waveWidthRatio, oneMinusDurationRatio) {
    var opacity = waveWidthRatio * config.opacity * oneMinusDurationRatio;

    tile.currentColor.h += config.deltaHue * opacity;
    tile.currentColor.s += config.deltaSaturation * opacity;
    tile.currentColor.l += config.deltaLightness * opacity;
  }

  /**
   * Updates the color of the given content tile according to the given waveWidthRatio and
   * durationRatio.
   *
   * @param {Tile} tile
   * @param {Number} waveWidthRatio Specifies the tile's relative distance to the min and max
   * shimmer distances.
   * @param {Number} oneMinusDurationRatio Specifies how far this animation is through its overall
   * duration.
   */
  function updateContentTile(tile, waveWidthRatio, oneMinusDurationRatio) {
    tile.imageScreenOpacity += -waveWidthRatio * config.opacity * oneMinusDurationRatio *
        (window.hg.TilePost.config.inactiveScreenOpacity -
        window.hg.TilePost.config.activeScreenOpacity);
  }

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  /**
   * Sets this HighlightRadiateJob as started.
   *
   * @this HighlightRadiateJob
   * @param {Number} startTime
   */
  function start(startTime) {
    var job = this;

    job.startTime = startTime;
    job.isComplete = false;
  }

  /**
   * Updates the animation progress of this HighlightRadiateJob to match the given time.
   *
   * This should be called from the overall animation loop.
   *
   * @this HighlightRadiateJob
   * @param {Number} currentTime
   * @param {Number} deltaTime
   */
  function update(currentTime, deltaTime) {
    var job, currentMaxDistance, currentMinDistance, i, count, distance, waveWidthRatio,
        oneMinusDurationRatio, animatedSomeTile;

    job = this;

    if (currentTime > job.startTime + config.duration) {
      handleComplete.call(job, false);
    } else {
      oneMinusDurationRatio = 1 - (currentTime - job.startTime) / config.duration;

      currentMaxDistance = config.shimmerSpeed * (currentTime - job.startTime);
      currentMinDistance = currentMaxDistance - config.shimmerWaveWidth;

      animatedSomeTile = false;

      for (i = 0, count = job.grid.allNonContentTiles.length; i < count; i += 1) {
        distance = job.distancesNonContentTiles[i];

        if (distance > currentMinDistance && distance < currentMaxDistance) {
          waveWidthRatio = (distance - currentMinDistance) / config.shimmerWaveWidth;

          updateNonContentTile(job.grid.allNonContentTiles[i], waveWidthRatio,
              oneMinusDurationRatio);

          animatedSomeTile = true;
        }
      }

      for (i = 0, count = job.grid.contentTiles.length; i < count; i += 1) {
        distance = job.distancesContentTiles[i];

        if (distance > currentMinDistance && distance < currentMaxDistance) {
          waveWidthRatio = (distance - currentMinDistance) / config.shimmerWaveWidth;

          updateContentTile(job.grid.contentTiles[i], waveWidthRatio, oneMinusDurationRatio);

          animatedSomeTile = true;
        }
      }

      if (!animatedSomeTile) {
        handleComplete.call(job, false);
      }
    }
  }

  /**
   * Draws the current state of this HighlightRadiateJob.
   *
   * This should be called from the overall animation loop.
   *
   * @this HighlightRadiateJob
   */
  function draw() {
    // This animation job updates the state of actual tiles, so it has nothing of its own to draw
  }

  /**
   * Stops this HighlightRadiateJob, and returns the element its original form.
   *
   * @this HighlightRadiateJob
   */
  function cancel() {
    var job = this;

    handleComplete.call(job, true);
  }

  /**
   * @this HighlightRadiateJob
   */
  function init() {
  }

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @constructor
   * @global
   * @param {Grid} grid
   * @param {Tile} tile
   * @param {Function} [onComplete]
   */
  function HighlightRadiateJob(grid, tile, onComplete) {
    var job = this;

    job.grid = grid;
    job.startPoint = {x: tile.originalAnchor.x, y: tile.originalAnchor.y};
    job.distancesNonContentTiles = [];
    job.distancesContentTiles = [];
    job.startTime = 0;
    job.isComplete = true;

    job.onComplete = onComplete || function () {};

    job.start = start;
    job.update = update;
    job.draw = draw;
    job.cancel = cancel;
    job.init = init;

    calculateTileDistances.call(job);

    console.log('HighlightRadiateJob created: tileIndex=' + (tile && tile.originalIndex));
  }

  HighlightRadiateJob.config = config;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.HighlightRadiateJob = HighlightRadiateJob;

  console.log('HighlightRadiateJob module loaded');
})();

/**
 * @typedef {AnimationJob} IntraTileRadiateJob
 */

/**
 * This module defines a constructor for IntraTileRadiateJob objects.
 *
 * @module IntraTileRadiateJob
 */
(function () {
  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var config = {};

  config.duration = 500;

  // TODO:

  config.isRecurring = false;
  config.avgDelay = 4000;
  config.delayDeviationRange = 3800;

  //  --- Dependent parameters --- //

  config.computeDependentValues = function () {
    // TODO:
  };

  config.computeDependentValues();

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  /**
   * @this IntraTileRadiateJob
   */
  function handleComplete(wasCancelled) {
    var job = this;

    console.log('IntraTileRadiateJob ' + (wasCancelled ? 'cancelled' : 'completed'));

    job.isComplete = true;

    job.onComplete();
  }

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  /**
   * Sets this IntraTileRadiateJob as started.
   *
   * @this IntraTileRadiateJob
   * @param {Number} startTime
   */
  function start(startTime) {
    var job = this;

    job.startTime = startTime;
    job.isComplete = false;
  }

  /**
   * Updates the animation progress of this IntraTileRadiateJob to match the given time.
   *
   * This should be called from the overall animation loop.
   *
   * @this IntraTileRadiateJob
   * @param {Number} currentTime
   * @param {Number} deltaTime
   */
  function update(currentTime, deltaTime) {
    // TODO:
//    var job, currentMaxDistance, currentMinDistance, i, count, distance, waveWidthRatio,
//        oneMinusDurationRatio, animatedSomeTile;
//
//    job = this;
//
//    if (currentTime > job.startTime + config.duration) {
//      handleComplete.call(job, false);
//    } else {
//      oneMinusDurationRatio = 1 - (currentTime - job.startTime) / config.duration;
//
//      currentMaxDistance = config.shimmerSpeed * (currentTime - job.startTime);
//      currentMinDistance = currentMaxDistance - config.shimmerWaveWidth;
//
//      animatedSomeTile = false;
//
//      for (i = 0, count = job.grid.originalTiles.length; i < count; i += 1) {
//        distance = job.tileDistances[i];
//
//        if (distance > currentMinDistance && distance < currentMaxDistance) {
//          waveWidthRatio = (distance - currentMinDistance) / config.shimmerWaveWidth;
//
//          updateTile(job.grid.originalTiles[i], waveWidthRatio, oneMinusDurationRatio);
//
//          animatedSomeTile = true;
//        }
//      }
//
//      if (!animatedSomeTile) {
//        handleComplete.call(job, false);
//      }
//    }**;
  }

  /**
   * Draws the current state of this IntraTileRadiateJob.
   *
   * This should be called from the overall animation loop.
   *
   * @this IntraTileRadiateJob
   */
  function draw() {
    var job;

    job = this;

    // TODO:
  }

  /**
   * Stops this IntraTileRadiateJob, and returns the element its original form.
   *
   * @this IntraTileRadiateJob
   */
  function cancel() {
    var job = this;

    handleComplete.call(job, true);
  }

  /**
   * @this IntraTileRadiateJob
   */
  function init() {
    var job = this;

    config.computeDependentValues();
    // TODO:
  }

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @constructor
   * @global
   * @param {Grid} grid
   * @param {Tile} tile
   * @param {Function} onComplete
   */
  function IntraTileRadiateJob(grid, tile, onComplete) {
    var job = this;

    job.grid = grid;
    job.tile = tile;
    job.startTime = 0;
    job.isComplete = true;

    job.start = start;
    job.update = update;
    job.draw = draw;
    job.cancel = cancel;
    job.onComplete = onComplete;
    job.init = init;

    console.log('IntraTileRadiateJob created: tileIndex=' + job.tile.originalIndex);
  }

  IntraTileRadiateJob.config = config;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.IntraTileRadiateJob = IntraTileRadiateJob;

  console.log('IntraTileRadiateJob module loaded');
})();

/**
 * @typedef {AnimationJob} LineJob
 */

/**
 * This module defines a constructor for LineJob objects.
 *
 * @module LineJob
 */
(function () {
  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var config = {};

  config.duration = 2000;
  config.lineWidth = 28;
  config.lineLength = 60000;
  config.lineSidePeriod = 5; // milliseconds per tile side

  config.startSaturation = 100;
  config.startLightness = 100;
  config.startOpacity = 0.6;

  config.endSaturation = 30;
  config.endLightness = 80;
  config.endOpacity = 0;

  config.sameDirectionProb = 0.8;

  config.blurStdDeviation = 2;
  config.isBlurOn = false;

  config.isRecurring = true;
  config.avgDelay = 2200;
  config.delayDeviationRange = 2100;

  // ---  --- //

  config.NEIGHBOR = 0;
  config.LOWER_SELF = 1;
  config.UPPER_SELF = 2;

  config.oppositeDirectionProb = 0;
  config.epsilon = 0.00001;

  config.haveDefinedLineBlur = false;
  config.filterId = 'random-line-filter';

  //  --- Dependent parameters --- //

  config.computeDependentValues = function () {
    config.distantSidewaysDirectionProb = (1 - config.sameDirectionProb) / 2;
    config.closeSidewaysDirectionProb = (1 - config.oppositeDirectionProb) / 2;
  };

  config.computeDependentValues();

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  /**
   * Creates an SVG definition that is used for blurring the lines of LineJobs.
   *
   * @this LineJob
   */
  function defineLineBlur() {
    var job, filter, feGaussianBlur;

    job = this;

    // Create the elements

    filter = document.createElementNS(window.hg.util.svgNamespace, 'filter');
    job.grid.svgDefs.appendChild(filter);

    feGaussianBlur = document.createElementNS(window.hg.util.svgNamespace, 'feGaussianBlur');
    filter.appendChild(feGaussianBlur);

    // Define the blur

    filter.setAttribute('id', config.filterId);
    filter.setAttribute('x', '-10%');
    filter.setAttribute('y', '-10%');
    filter.setAttribute('width', '120%');
    filter.setAttribute('height', '120%');

    feGaussianBlur.setAttribute('in', 'SourceGraphic');
    feGaussianBlur.setAttribute('result', 'blurOut');

    config.filter = filter;
    config.feGaussianBlur = feGaussianBlur;
  }

  /**
   * Creates the start and end hue for the line of this animation.
   *
   * @this LineJob
   */
  function createHues() {
    var job;

    job = this;

    job.startHue = Math.random() * 360;
    job.endHue = Math.random() * 360;
  }

  /**
   * Creates the polyline SVG element that is used to render this animation.
   *
   * @this LineJob
   */
  function createPolyline() {
    var job;

    job = this;

    job.polyline = document.createElementNS(window.hg.util.svgNamespace, 'polyline');
    job.grid.svg.insertBefore(job.polyline, job.grid.svg.firstChild);

    job.polyline.setAttribute('fill-opacity', '0');

    if (config.isBlurOn) {
      job.polyline.setAttribute('filter', 'url(#' + config.filterId + ')');
    }
  }

  /**
   * Updates the color values of the line of this animation.
   *
   * @this LineJob
   */
  function updateColorValues() {
    var job, progress, oneMinusProgress;

    job = this;

    progress = job.ellapsedTime / job.duration;
    oneMinusProgress = 1 - progress;

    job.currentColor.h = oneMinusProgress * job.startHue + progress * job.endHue;
    job.currentColor.s = oneMinusProgress * job.startSaturation + progress * job.endSaturation;
    job.currentColor.l = oneMinusProgress * job.startLightness + progress * job.endLightness;
    job.currentOpacity = oneMinusProgress * job.startOpacity + progress * job.endOpacity;
  }

  /**
   * Updates the state of this job to handle its completion.
   *
   * @this LineJob
   */
  function handleCompletion() {
    var job;

    job = this;

    console.log('LineJob completed');

    if (job.polyline) {
      job.grid.svg.removeChild(job.polyline);
      job.polyline = null;
    }

    job.tiles = [];
    job.corners = [];
    job.direction = Number.NaN;
    job.currentCornerIndex = Number.NaN;
    job.hasReachedEdge = true;

    job.isComplete = true;

    job.onComplete(job);
  }

  /**
   * Determines whether this LineJob has reached the edge of the grid.
   *
   * @this LineJob
   */
  function checkHasAlmostReachedEdge() {
    var job;

    job = this;

    if (job.direction === (job.corners[job.currentCornerIndex] + 3) % 6) {
      // When the job is at the opposite corner of a tile from the direction it is headed, then it
      // has not reached the edge
      job.hasAlmostReachedEdge = false;
    } else {
      job.hasAlmostReachedEdge = !job.lowerNeighbors[job.currentCornerIndex] ||
          !job.upperNeighbors[job.currentCornerIndex];
    }
  }

  /**
   * Determines the neighbors of this job's current tile at the current corner.
   *
   * @this LineJob
   */
  function determineNeighbors() {
    var job, lowerNeigborTileIndex, upperNeigborTileIndex, currentCorner;

    job = this;
    currentCorner = job.corners[job.currentCornerIndex];

    if (job.grid.isVertical) {
      lowerNeigborTileIndex = (currentCorner + 5) % 6;
      upperNeigborTileIndex = currentCorner;
    } else {
      lowerNeigborTileIndex = currentCorner;
      upperNeigborTileIndex = (currentCorner + 1) % 6;
    }

    job.lowerNeighbors[job.currentCornerIndex] =
        job.tiles[job.currentCornerIndex].neighborStates[lowerNeigborTileIndex];
    job.upperNeighbors[job.currentCornerIndex] =
        job.tiles[job.currentCornerIndex].neighborStates[upperNeigborTileIndex];

    job.lowerNeighborCorners[job.currentCornerIndex] = (currentCorner + 2) % 6;
    job.upperNeighborCorners[job.currentCornerIndex] = (currentCorner + 4) % 6;
  }

  /**
   * Returns the next vertex in the path of this animation.
   *
   * @this LineJob
   */
  function chooseNextVertex() {
    var job, cornerConfig, neighborProb, lowerSelfProb, upperSelfProb, random, relativeDirection,
        absoluteDirection, nextCorner, nextTile, currentCorner;

    job = this;
    currentCorner = job.corners[job.currentCornerIndex];

    // The first segment of a line animation is forced to go in a given direction
    if (job.currentCornerIndex === 0) {
      relativeDirection = job.forcedInitialRelativeDirection;
      job.latestDirection = relativeToAbsoluteDirection(relativeDirection, currentCorner);
    } else {
      cornerConfig = (currentCorner - job.direction + 6) % 6;

      // Determine relative direction probabilities
      switch (cornerConfig) {
        case 0:
          neighborProb = job.sameDirectionProb;
          lowerSelfProb = config.distantSidewaysDirectionProb;
          upperSelfProb = config.distantSidewaysDirectionProb;
          break;
        case 1:
          neighborProb = config.closeSidewaysDirectionProb;
          lowerSelfProb = config.closeSidewaysDirectionProb;
          upperSelfProb = config.oppositeDirectionProb;
          break;
        case 2:
          neighborProb = config.distantSidewaysDirectionProb;
          lowerSelfProb = job.sameDirectionProb;
          upperSelfProb = config.distantSidewaysDirectionProb;
          break;
        case 3:
          neighborProb = config.oppositeDirectionProb;
          lowerSelfProb = config.closeSidewaysDirectionProb;
          upperSelfProb = config.closeSidewaysDirectionProb;
          break;
        case 4:
          neighborProb = config.distantSidewaysDirectionProb;
          lowerSelfProb = config.distantSidewaysDirectionProb;
          upperSelfProb = job.sameDirectionProb;
          break;
        case 5:
          neighborProb = config.closeSidewaysDirectionProb;
          lowerSelfProb = config.oppositeDirectionProb;
          upperSelfProb = config.closeSidewaysDirectionProb;
          break;
        default:
          throw new Error('Invalid state: cornerConfig=' + cornerConfig);
      }

      // Determine the next direction to travel
      do {
        // Pick a random direction
        random = Math.random();
        relativeDirection = random < neighborProb ? config.NEIGHBOR :
                random < neighborProb + lowerSelfProb ? config.LOWER_SELF : config.UPPER_SELF;
        absoluteDirection = relativeToAbsoluteDirection(relativeDirection, currentCorner);

        // Disallow the line from going back the way it just came
      } while (absoluteDirection === (job.latestDirection + 3) % 6);

      job.latestDirection = absoluteDirection;
    }

    // Determine the next corner configuration
    switch (relativeDirection) {
      case config.NEIGHBOR:
        if (job.grid.isVertical) {
          nextCorner = (currentCorner + 1) % 6;
          nextTile = job.tiles[job.currentCornerIndex].neighborStates[(currentCorner + 5) % 6].tile;
        } else {
          nextCorner = (currentCorner + 1) % 6;
          nextTile = job.tiles[job.currentCornerIndex].neighborStates[currentCorner].tile;
        }
        break;
      case config.LOWER_SELF:
        nextCorner = (currentCorner + 5) % 6;
        nextTile = job.tiles[job.currentCornerIndex];
        break;
      case config.UPPER_SELF:
        nextCorner = (currentCorner + 1) % 6;
        nextTile = job.tiles[job.currentCornerIndex];
        break;
      default:
        throw new Error('Invalid state: relativeDirection=' + relativeDirection);
    }

    job.currentCornerIndex = job.corners.length;

    job.corners[job.currentCornerIndex] = nextCorner;
    job.tiles[job.currentCornerIndex] = nextTile;

    determineNeighbors.call(job);
    checkHasAlmostReachedEdge.call(job);
  }

  /**
   * Translates the givern relative direction to an absolute direction.
   *
   * @param {Number} relativeDirection
   * @param {Number} corner
   * @returns {Number}
   */
  function relativeToAbsoluteDirection(relativeDirection, corner) {
    switch (relativeDirection) {
      case config.NEIGHBOR:
        return corner;
      case config.LOWER_SELF:
        return (corner + 4) % 6;
      case config.UPPER_SELF:
        return (corner + 2) % 6;
      default:
        throw new Error('Invalid state: relativeDirection=' + relativeDirection);
    }
  }

  /**
   * Updates the parameters of the segments of this animation.
   *
   * @this LineJob
   */
  function updateSegments() {
    var job, distanceTravelled, frontSegmentLength, backSegmentLength, segmentsTouchedCount,
        distancePastEdge, segmentsPastEdgeCount;

    job = this;

    // --- Compute some values of the polyline at the current time --- //

    distanceTravelled = job.ellapsedTime / job.lineSidePeriod * window.hg.Grid.config.tileOuterRadius;
    segmentsTouchedCount = parseInt(job.ellapsedTime / job.lineSidePeriod) + 1;

    // Add additional vertices to the polyline as needed
    while (segmentsTouchedCount >= job.corners.length && !job.hasAlmostReachedEdge) {
      chooseNextVertex.call(job);
    }

    frontSegmentLength = distanceTravelled % window.hg.Grid.config.tileOuterRadius;
    backSegmentLength = (job.lineLength - frontSegmentLength +
        window.hg.Grid.config.tileOuterRadius) % window.hg.Grid.config.tileOuterRadius;

    job.frontSegmentEndRatio = frontSegmentLength / window.hg.Grid.config.tileOuterRadius;
    job.backSegmentStartRatio = 1 - (backSegmentLength / window.hg.Grid.config.tileOuterRadius);

    job.isShort = job.lineLength < window.hg.Grid.config.tileOuterRadius;
    job.isStarting = distanceTravelled < job.lineLength;

    // Check whether the line has reached the edge
    if (job.hasAlmostReachedEdge && segmentsTouchedCount >= job.corners.length) {
      job.hasReachedEdge = true;
    }

    // --- Determine how many segments are included in the polyline --- //

    // When the polyline is neither starting nor ending and is not shorter than the length of a
    // segment, then this is how many segments it includes
    job.segmentsIncludedCount = parseInt((job.lineLength - frontSegmentLength -
        backSegmentLength - config.epsilon) / window.hg.Grid.config.tileOuterRadius) + 2;

    // Subtract from the number of included segments depending on current conditions
    if (job.isShort) {
      // The polyline is shorter than a tile side

      if (job.isStarting || job.hasReachedEdge) {
        // One end of the polyline would lie outside the grid
        job.segmentsIncludedCount = 1;
      } else {
        if (frontSegmentLength - job.lineLength >= 0) {
          // The polyline is between corners
          job.segmentsIncludedCount = 1;
        } else {
          // The polyline is across a corner
          job.segmentsIncludedCount = 2;
        }
      }
    } else {
      // The polyline is longer than a tile side

      if (job.isStarting) {
        // The polyline is starting; the back of the polyline would lie outside the grid
        job.segmentsIncludedCount = segmentsTouchedCount;
      }

      if (job.hasReachedEdge) {
        // The polyline is ending; the front of the polyline would lie outside the grid
        segmentsPastEdgeCount = segmentsTouchedCount - job.corners.length + 1;
        distancePastEdge = distanceTravelled - (job.corners.length - 1) *
            window.hg.Grid.config.tileOuterRadius;

        if (distancePastEdge > job.lineLength) {
          handleCompletion.call(job);
        }

        job.segmentsIncludedCount -= segmentsPastEdgeCount;
      }
    }
  }


  /**
   * Calculates the points in the middle of the gaps between tiles at each known corner.
   *
   * @this LineJob
   */
  function computeCornerGapPoints() {
    var job, i, count;

    job = this;

    job.gapPoints = [];

    for (i = 0, count = job.corners.length; i < count; i += 1) {
      job.gapPoints[i] = computeCornerGapPoint(job.tiles[i], job.corners[i], job.lowerNeighbors[i],
          job.upperNeighbors[i], job.lowerNeighborCorners[i], job.upperNeighborCorners[i]);
    }
  }

  /**
   * Calculates the point in the middle of the gap between tiles at the given corner.
   *
   * @param {Tile} tile
   * @param {Number} corner
   * @param {Object} lowerNeighbor
   * @param {Object} upperNeighbor
   * @param {Number} lowerNeighborCorner
   * @param {Number} upperNeighborCorner
   * @returns {{x:Number,y:Number}}
   */
  function computeCornerGapPoint(tile, corner, lowerNeighbor, upperNeighbor, lowerNeighborCorner,
                             upperNeighborCorner) {
    var count, xSum, ySum;

    if (lowerNeighbor) {
      if (upperNeighbor) {
        count = 3;
        xSum = tile.particle.px + lowerNeighbor.tile.particle.px + upperNeighbor.tile.particle.px;
        ySum = tile.particle.py + lowerNeighbor.tile.particle.py + upperNeighbor.tile.particle.py;
      } else {
        count = 2;
        xSum = tile.outerVertices[corner * 2] + lowerNeighbor.tile.outerVertices[lowerNeighborCorner * 2];
        ySum = tile.outerVertices[corner * 2 + 1] +
            lowerNeighbor.tile.outerVertices[lowerNeighborCorner * 2 + 1];
      }
    } else {
      if (upperNeighbor) {
        count = 2;
        xSum = tile.outerVertices[corner * 2] + upperNeighbor.tile.outerVertices[upperNeighborCorner * 2];
        ySum = tile.outerVertices[corner * 2 + 1] +
            upperNeighbor.tile.outerVertices[upperNeighborCorner * 2 + 1];
      } else {
        count = 1;
        xSum = tile.outerVertices[corner * 2];
        ySum = tile.outerVertices[corner * 2 + 1];
      }
    }

    return {
      x: xSum / count,
      y: ySum / count
    };
  }

  /**
   * Calculates the points of the SVG polyline element.
   *
   * @this LineJob
   */
  function computePolylinePoints() {
    var job, gapPointsIndex, polylinePointsIndex, stopIndex;

    job = this;

    job.polylinePoints = [];
    gapPointsIndex = job.currentCornerIndex;

    if (job.extraStartPoint && job.isStarting) {
      // Add the extra, forced initial point (this is useful for making radiating lines actually
      // start from the center of the tile and not show any gap around the corners of the tile)
      job.polylinePoints[0] = job.extraStartPoint;

      polylinePointsIndex = job.segmentsIncludedCount + 1;
      stopIndex = 1;
    } else {
      polylinePointsIndex = job.segmentsIncludedCount;
      stopIndex = 0;
    }

    // Add the frontend segment point
    if (!job.hasReachedEdge) {
      job.polylinePoints[polylinePointsIndex] = {
        x: job.gapPoints[gapPointsIndex].x * job.frontSegmentEndRatio +
            job.gapPoints[gapPointsIndex - 1].x * (1 - job.frontSegmentEndRatio),
        y: job.gapPoints[gapPointsIndex].y * job.frontSegmentEndRatio +
            job.gapPoints[gapPointsIndex - 1].y * (1 - job.frontSegmentEndRatio)
      };
    } else {
      job.polylinePoints[polylinePointsIndex] = {
        x: job.gapPoints[gapPointsIndex].x,
        y: job.gapPoints[gapPointsIndex].y
      };
    }

    polylinePointsIndex -= 1;
    gapPointsIndex -= 1;

    // Add the internal segment points
    for (; polylinePointsIndex > stopIndex; polylinePointsIndex -= 1, gapPointsIndex -= 1) {
      job.polylinePoints[polylinePointsIndex] = job.gapPoints[gapPointsIndex];
    }

    // Add the back-end segment point
    if (!job.isStarting) {
      job.polylinePoints[polylinePointsIndex] = {
        x: job.gapPoints[gapPointsIndex + 1].x * job.backSegmentStartRatio +
            job.gapPoints[gapPointsIndex].x * (1 - job.backSegmentStartRatio),
        y: job.gapPoints[gapPointsIndex + 1].y * job.backSegmentStartRatio +
            job.gapPoints[gapPointsIndex].y * (1 - job.backSegmentStartRatio)
      }
    } else {
      job.polylinePoints[polylinePointsIndex] = {
        x: job.gapPoints[gapPointsIndex].x,
        y: job.gapPoints[gapPointsIndex].y
      };
    }
  }

  /**
   * Updates the actual SVG elements to render the current state of this animation.
   *
   * @this LineJob
   */
  function drawSegments() {
    var job, i, count, pointsString;

    job = this;

    // Create the points string
    pointsString = '';
    for (i = 0, count = job.polylinePoints.length; i < count; i += 1) {
      pointsString += job.polylinePoints[i].x + ',' + job.polylinePoints[i].y + ' ';
    }

    // Update the attributes of the polyline SVG element
    job.polyline.setAttribute('points', pointsString);
    job.polyline.setAttribute('stroke', 'hsl(' + job.currentColor.h + ',' + job.currentColor.s +
        '%,' + job.currentColor.l + '%)');
    job.polyline.setAttribute('stroke-opacity', job.currentOpacity);
    job.polyline.setAttribute('stroke-width', job.lineWidth);
  }

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  /**
   * Sets this LineJob as started.
   *
   * @this LineJob
   * @param {Number} startTime
   */
  function start(startTime) {
    var job = this;

    job.startTime = startTime;
    job.isComplete = false;
  }

  /**
   * Updates the animation progress of this LineJob to match the given time.
   *
   * This should be called from the overall animation loop.
   *
   * @this LineJob
   * @param {Number} currentTime
   * @param {Number} deltaTime
   */
  function updateWithBlur(currentTime, deltaTime) {
    var job = this;

    job.ellapsedTime = currentTime - job.startTime;

    if (job.ellapsedTime >= job.duration) {
      handleCompletion.call(job);
    } else {
      updateColorValues.call(job);
      updateSegments.call(job);

      config.feGaussianBlur.setAttribute('stdDeviation', job.blurStdDeviation);

      if (!job.isComplete) {
        computeCornerGapPoints.call(job);
        computePolylinePoints.call(job);
      }
    }
  }
  function updateWithOutBlur(currentTime, deltaTime) {
    var job = this;

    job.ellapsedTime = currentTime - job.startTime;

    if (job.ellapsedTime >= job.duration) {
      handleCompletion.call(job);
    } else {
      updateColorValues.call(job);
      updateSegments.call(job);

      if (!job.isComplete) {
        computeCornerGapPoints.call(job);
        computePolylinePoints.call(job);
      }
    }
  }

  /**
   * Draws the current state of this LineJob.
   *
   * This should be called from the overall animation loop.
   *
   * @this LineJob
   */
  function draw() {
    var job = this;

    drawSegments.call(job);
  }

  /**
   * Stops this LineJob, and returns the element its original form.
   *
   * @this LineJob
   */
  function cancel() {
    var job;

    job = this;

    handleCompletion.call(job);
  }

  /**
   * @this LineJob
   */
  function init() {
    var job = this;

    config.computeDependentValues();
  }

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @constructor
   * @global
   * @param {Grid} grid
   * @param {Tile} tile
   * @param {Number} corner
   * @param {Number} direction
   * @param {Number} forcedInitialRelativeDirection
   * @param {Function} [onComplete]
   * @param {{x:Number,y:Number}} extraStartPoint
   * @throws {Error}
   */
  function LineJob(grid, tile, corner, direction, forcedInitialRelativeDirection,
                            onComplete, extraStartPoint) {
    var job = this;

    job.grid = grid;
    job.tiles = [tile];
    job.corners = [corner];
    job.lowerNeighbors = [];
    job.upperNeighbors = [];
    job.lowerNeighborCorners = [];
    job.upperNeighborCorners = [];
    job.direction = direction;
    job.forcedInitialRelativeDirection = forcedInitialRelativeDirection;
    job.extraStartPoint = extraStartPoint;
    job.currentCornerIndex = 0;
    job.frontSegmentEndRatio = Number.NaN;
    job.backSegmentStartRatio = Number.NaN;
    job.latestDirection = direction;
    job.polyline = null;
    job.gapPoints = [];
    job.polylinePoints = null;
    job.hasReachedEdge = false;
    job.startTime = 0;
    job.ellapsedTime = 0;
    job.isComplete = true;

    job.startHue = Number.NaN;
    job.endHue = Number.NaN;
    job.currentColor = {
      h: Number.NaN,
      s: config.startSaturation,
      l: config.startLightness
    };
    job.currentOpacity = config.startOpacity;

    job.duration = config.duration;
    job.lineWidth = config.lineWidth;
    job.lineLength = config.lineLength;
    job.lineSidePeriod = config.lineSidePeriod;

    job.startSaturation = config.startSaturation;
    job.startLightness = config.startLightness;
    job.startOpacity = config.startOpacity;

    job.endSaturation = config.endSaturation;
    job.endLightness = config.endLightness;
    job.endOpacity = config.endOpacity;

    job.sameDirectionProb = config.sameDirectionProb;

    job.blurStdDeviation = config.blurStdDeviation;
    job.isBlurOn = config.isBlurOn;

    job.onComplete = onComplete || function () {};

    job.start = start;
    job.update = job.isBlurOn ? updateWithBlur : updateWithOutBlur;
    job.draw = draw;
    job.cancel = cancel;
    job.init = init;

    if (!config.haveDefinedLineBlur) {
      config.haveDefinedLineBlur = true;
      defineLineBlur.call(job);
    }

    if (!checkIsValidInitialCornerConfiguration(job)) {
      throw new Error('LineJob created with invalid initial corner configuration: ' +
          'tileIndex=' + tile.originalIndex + ', corner=' + corner + ', direction=' + direction);
    } else {
      determineNeighbors.call(job);
      createHues.call(job);
      createPolyline.call(job);

      console.log('LineJob created: tileIndex=' + tile.originalIndex + ', corner=' + corner +
          ', direction=' + direction);
    }
  }

  /**
   * Creates a LineJob that is initialized at a tile vertex along the border of the grid.
   *
   * @param {Grid} grid
   * @param {Function} onComplete
   */
  function createRandomLineJob(grid, onComplete) {
    var tile, corner, direction, forcedInitialRelativeDirection;

    // Pick a random, non-corner, border tile to start from
    do {
      tile = grid.originalBorderTiles[parseInt(Math.random() * grid.originalBorderTiles.length)];
    } while (tile.isCornerTile);

    // Determine which corner and direction to use based on the selected tile
    if (grid.isVertical) {
      if (!tile.neighborStates[4]) { // Left side
        if (tile.isInLargerRow) {
          if (Math.random() < 0.5) {
            corner = 0;
            forcedInitialRelativeDirection = config.UPPER_SELF;
            //forcedInitialAbsoluteDirection = 2;
          } else {
            corner = 3;
            forcedInitialRelativeDirection = config.LOWER_SELF;
            //forcedInitialAbsoluteDirection = 1;
          }
        } else { // Smaller row
          if (Math.random() < 0.5) {
            corner = 4;
            forcedInitialRelativeDirection = config.LOWER_SELF;
            //forcedInitialAbsoluteDirection = 2;
          } else {
            corner = 5;
            forcedInitialRelativeDirection = config.UPPER_SELF;
            //forcedInitialAbsoluteDirection = 1;
          }
        }
        direction = tile.originalAnchor.y < grid.originalCenter.y ? 2 : 1;
      } else if (!tile.neighborStates[1]) { // Right side
        if (tile.isInLargerRow) {
          if (Math.random() < 0.5) {
            corner = 0;
            forcedInitialRelativeDirection = config.LOWER_SELF;
            //forcedInitialAbsoluteDirection = 4;
          } else {
            corner = 3;
            forcedInitialRelativeDirection = config.UPPER_SELF;
            //forcedInitialAbsoluteDirection = 5;
          }
        } else { // Smaller row
          if (Math.random() < 0.5) {
            corner = 1;
            forcedInitialRelativeDirection = config.LOWER_SELF;
            //forcedInitialAbsoluteDirection = 5;
          } else {
            corner = 2;
            forcedInitialRelativeDirection = config.UPPER_SELF;
            //forcedInitialAbsoluteDirection = 4;
          }
        }
        direction = tile.originalAnchor.y < grid.originalCenter.y ? 4 : 5;
      } else if (!tile.neighborStates[0]) { // Top side
        if (Math.random() < 0.5) {
          corner = 1;
          forcedInitialRelativeDirection = config.UPPER_SELF;
        } else {
          corner = 5;
          forcedInitialRelativeDirection = config.LOWER_SELF;
        }
        //forcedInitialAbsoluteDirection = 3;
        direction = 3;
      } else { // Bottom side
        if (Math.random() < 0.5) {
          corner = 2;
          forcedInitialRelativeDirection = config.LOWER_SELF;
        } else {
          corner = 4;
          forcedInitialRelativeDirection = config.UPPER_SELF;
        }
        //forcedInitialAbsoluteDirection = 0;
        direction = 0;
      }
    } else { // Not vertical
      if (!tile.neighborStates[0]) { // Top side
        if (tile.rowIndex === 0) { // First row
          if (Math.random() < 0.5) {
            corner = 1;
            forcedInitialRelativeDirection = config.UPPER_SELF;
            //forcedInitialAbsoluteDirection = 3;
          } else {
            corner = 4;
            forcedInitialRelativeDirection = config.LOWER_SELF;
            //forcedInitialAbsoluteDirection = 2;
          }
        } else { // Second row
          if (Math.random() < 0.5) {
            corner = 0;
            forcedInitialRelativeDirection = config.UPPER_SELF;
            //forcedInitialAbsoluteDirection = 2;
          } else {
            corner = 5;
            forcedInitialRelativeDirection = config.LOWER_SELF;
            //forcedInitialAbsoluteDirection = 3;
          }
        }
        direction = tile.originalAnchor.x < grid.originalCenter.x ? 2 : 3;
      } else if (!tile.neighborStates[3]) { // Bottom side
        if (tile.rowIndex === grid.rowCount - 1) { // Last row
          if (Math.random() < 0.5) {
            corner = 1;
            forcedInitialRelativeDirection = config.LOWER_SELF;
            //forcedInitialAbsoluteDirection = 5;
          } else {
            corner = 4;
            forcedInitialRelativeDirection = config.UPPER_SELF;
            //forcedInitialAbsoluteDirection = 0;
          }
        } else { // Second-to-last row
          if (Math.random() < 0.5) {
            corner = 2;
            forcedInitialRelativeDirection = config.LOWER_SELF;
            //forcedInitialAbsoluteDirection = 0;
          } else {
            corner = 3;
            forcedInitialRelativeDirection = config.UPPER_SELF;
            //forcedInitialAbsoluteDirection = 5;
          }
        }
        direction = tile.originalAnchor.x < grid.originalCenter.x ? 0 : 5;
      } else if (!tile.neighborStates[4]) { // Left side
        if (Math.random() < 0.5) {
          corner = 3;
          forcedInitialRelativeDirection = config.LOWER_SELF;
        } else {
          corner = 5;
          forcedInitialRelativeDirection = config.UPPER_SELF;
        }
        //forcedInitialAbsoluteDirection = 1;
        direction = 1;
      } else { // Right side
        if (Math.random() < 0.5) {
          corner = 0;
          forcedInitialRelativeDirection = config.LOWER_SELF;
        } else {
          corner = 2;
          forcedInitialRelativeDirection = config.UPPER_SELF;
        }
        //forcedInitialAbsoluteDirection = 4;
        direction = 4;
      }
    }

    return new LineJob(grid, tile, corner, direction, forcedInitialRelativeDirection,
        onComplete, null);
  }

  /**
   * Checks whether the given LineJob has a valid corner configuration for its initial
   * position.
   *
   * @param {LineJob} job
   */
  function checkIsValidInitialCornerConfiguration(job) {
    var tile, corner, direction, forcedInitialRelativeDirection, isValidEdgeDirection;

    tile = job.tiles[0];
    corner = job.corners[0];
    direction = job.direction;
    forcedInitialRelativeDirection = job.forcedInitialRelativeDirection;

    if (tile.isCornerTile) {
      return false;
    }

    if (tile.isBorderTile) {
      if (job.grid.isVertical) {
        if (!tile.neighborStates[4]) { // Left side
          isValidEdgeDirection = direction === 1 || direction === 2;

          if (tile.isInLargerRow) {
            switch (corner) {
              case 0:
                return forcedInitialRelativeDirection === config.UPPER_SELF && isValidEdgeDirection;
              case 1:
                return true;
              case 2:
                return true;
              case 3:
                return forcedInitialRelativeDirection === config.LOWER_SELF && isValidEdgeDirection;
              case 4:
                return false;
              case 5:
                return false;
            }
          } else {
            switch (corner) {
              case 0:
                return true;
              case 1:
                return true;
              case 2:
                return true;
              case 3:
                return true;
              case 4:
                return forcedInitialRelativeDirection === config.LOWER_SELF && isValidEdgeDirection;
              case 5:
                return forcedInitialRelativeDirection === config.UPPER_SELF && isValidEdgeDirection;
            }
          }
        } else if (!tile.neighborStates[1]) { // Right side
          isValidEdgeDirection = direction === 4 || direction === 5;

          if (tile.isInLargerRow) {
            switch (corner) {
              case 0:
                return forcedInitialRelativeDirection === config.LOWER_SELF && isValidEdgeDirection;
              case 1:
                return false;
              case 2:
                return false;
              case 3:
                return forcedInitialRelativeDirection === config.UPPER_SELF && isValidEdgeDirection;
              case 4:
                return true;
              case 5:
                return true;
            }
          } else { // Smaller row
            switch (corner) {
              case 0:
                return true;
              case 1:
                return forcedInitialRelativeDirection === config.LOWER_SELF && isValidEdgeDirection;
              case 2:
                return forcedInitialRelativeDirection === config.UPPER_SELF && isValidEdgeDirection;
              case 3:
                return true;
              case 4:
                return true;
              case 5:
                return true;
            }
          }
        } else if (!tile.neighborStates[0]) { // Top side
          isValidEdgeDirection = direction === 3;

          switch (corner) {
            case 0:
              return false;
            case 1:
              return forcedInitialRelativeDirection === config.UPPER_SELF && isValidEdgeDirection;
            case 2:
              return true;
            case 3:
              return true;
            case 4:
              return true;
            case 5:
              return forcedInitialRelativeDirection === config.LOWER_SELF && isValidEdgeDirection;
          }
        } else { // Bottom side
          isValidEdgeDirection = direction === 0;

          switch (corner) {
            case 0:
              return true;
            case 1:
              return true;
            case 2:
              return forcedInitialRelativeDirection === config.LOWER_SELF && isValidEdgeDirection;
            case 3:
              return false;
            case 4:
              return forcedInitialRelativeDirection === config.UPPER_SELF && isValidEdgeDirection;
            case 5:
              return true;
          }
        }
      } else { // Not vertical
        if (!tile.neighborStates[0]) { // Top side
          isValidEdgeDirection = direction === 2 || direction === 3;

          if (tile.rowIndex === 0) { // First row
            switch (corner) {
              case 0:
                return false;
              case 1:
                return forcedInitialRelativeDirection === config.UPPER_SELF && isValidEdgeDirection;
              case 2:
                return true;
              case 3:
                return true;
              case 4:
                return forcedInitialRelativeDirection === config.LOWER_SELF && isValidEdgeDirection;
              case 5:
                return false;
            }
          } else { // Second row
            switch (corner) {
              case 0:
                return forcedInitialRelativeDirection === config.UPPER_SELF && isValidEdgeDirection;
              case 1:
                return true;
              case 2:
                return true;
              case 3:
                return true;
              case 4:
                return true;
              case 5:
                return forcedInitialRelativeDirection === config.LOWER_SELF && isValidEdgeDirection;
            }
          }
        } else if (!tile.neighborStates[3]) { // Bottom side
          isValidEdgeDirection = direction === 0 || direction === 5;

          if (tile.rowIndex === job.grid.rowCount - 1) { // Last row
            switch (corner) {
              case 0:
                return true;
              case 1:
                return forcedInitialRelativeDirection === config.LOWER_SELF && isValidEdgeDirection;
              case 2:
                return false;
              case 3:
                return false;
              case 4:
                return forcedInitialRelativeDirection === config.UPPER_SELF && isValidEdgeDirection;
              case 5:
                return true;
            }
          } else { // Second-to-last row
            switch (corner) {
              case 0:
                return true;
              case 1:
                return true;
              case 2:
                return forcedInitialRelativeDirection === config.LOWER_SELF && isValidEdgeDirection;
              case 3:
                return forcedInitialRelativeDirection === config.UPPER_SELF && isValidEdgeDirection;
              case 4:
                return true;
              case 5:
                return true;
            }
          }
        } else if (!tile.neighborStates[4]) { // Left side
          isValidEdgeDirection = direction === 1;

          switch (corner) {
            case 0:
              return true;
            case 1:
              return true;
            case 2:
              return true;
            case 3:
              return forcedInitialRelativeDirection === config.LOWER_SELF && isValidEdgeDirection;
            case 4:
              return false;
            case 5:
              return forcedInitialRelativeDirection === config.UPPER_SELF && isValidEdgeDirection;
          }
        } else { // Right side
          isValidEdgeDirection = direction === 4;

          switch (corner) {
            case 0:
              return forcedInitialRelativeDirection === config.LOWER_SELF && isValidEdgeDirection;
            case 1:
              return false;
            case 2:
              return forcedInitialRelativeDirection === config.UPPER_SELF && isValidEdgeDirection;
            case 3:
              return true;
            case 4:
              return true;
            case 5:
              return true;
          }
        }
      }
    }

    return true;
  }

  LineJob.config = config;
  LineJob.createRandomLineJob = createRandomLineJob;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.LineJob = LineJob;

  console.log('LineJob module loaded');
})();

/**
 * @typedef {AnimationJob} LinesRadiateJob
 */

/**
 * This module defines a constructor for LinesRadiateJob objects.
 *
 * @module LinesRadiateJob
 */
(function () {
  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var config = {};

  config.duration = 700;
  config.lineWidth = 24;
  config.lineLength = 1300;
  config.lineSidePeriod = 30; // milliseconds per tile side

  config.startSaturation = 100;
  config.startLightness = 100;
  config.startOpacity = 0.8;

  config.endSaturation = 100;
  config.endLightness = 70;
  config.endOpacity = 0;

  config.sameDirectionProb = 0.85;

  config.blurStdDeviation = 2;
  config.isBlurOn = false;

  config.isRecurring = false;
  config.avgDelay = 2000;
  config.delayDeviationRange = 1800;

  // ---  --- //

  config.haveDefinedLineBlur = false;
  config.filterId = 'random-line-filter';

  //  --- Dependent parameters --- //

  config.computeDependentValues = function () {
  };

  config.computeDependentValues();

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  /**
   * Creates an SVG definition that is used for blurring the lines of LineJobs.
   *
   * @this LinesRadiateJob
   */
  function defineLineBlur() {
    var job, filter, feGaussianBlur;

    job = this;

    // Create the elements

    filter = document.createElementNS(window.hg.util.svgNamespace, 'filter');
    job.grid.svgDefs.appendChild(filter);

    feGaussianBlur = document.createElementNS(window.hg.util.svgNamespace, 'feGaussianBlur');
    filter.appendChild(feGaussianBlur);

    // Define the blur

    filter.setAttribute('id', config.filterId);
    filter.setAttribute('x', '-10%');
    filter.setAttribute('y', '-10%');
    filter.setAttribute('width', '120%');
    filter.setAttribute('height', '120%');

    feGaussianBlur.setAttribute('in', 'SourceGraphic');
    feGaussianBlur.setAttribute('result', 'blurOut');

    job.feGaussianBlur = feGaussianBlur;
  }

  /**
   * Creates the individual LineJobs that comprise this LinesRadiateJob.
   *
   * @this LinesRadiateJob
   */
  function createLineJobs() {
    var job, i, line;

    job = this;
    job.lineJobs = [];

    for (i = 0; i < 6; i += 1) {
      try {
        line = new window.hg.LineJob(job.grid, job.tile, i, i,
            window.hg.LineJob.config.NEIGHBOR, job.onComplete, job.extraStartPoint);
      } catch (error) {
        console.debug(error.message);
        continue;
      }

      job.lineJobs.push(line);

      // Replace the line animation's normal parameters with some that are specific to radiating
      // lines
      line.duration = config.duration;
      line.lineWidth = config.lineWidth;
      line.lineLength = config.lineLength;
      line.lineSidePeriod = config.lineSidePeriod;

      line.startSaturation = config.startSaturation;
      line.startLightness = config.startLightness;
      line.startOpacity = config.startOpacity;

      line.endSaturation = config.endSaturation;
      line.endLightness = config.endLightness;
      line.endOpacity = config.endOpacity;

      line.sameDirectionProb = config.sameDirectionProb;

      line.filterId = config.filterId;
      line.blurStdDeviation = config.blurStdDeviation;
      line.isBlurOn = config.isBlurOn;

      if (config.isBlurOn) {
        line.polyline.setAttribute('filter', 'url(#' + config.filterId + ')');
      } else {
        line.polyline.setAttribute('filter', 'none');
      }
    }
  }

  /**
   * Checks whether this job is complete. If so, a flag is set and a callback is called.
   *
   * @this LinesRadiateJob
   */
  function checkForComplete() {
    var job, i;

    job = this;

    for (i = 0; i < job.lineJobs.length; i += 1) {
      if (job.lineJobs[i].isComplete) {
        job.lineJobs.splice(i--, 1);
      } else {
        return;
      }
    }

    console.log('LinesRadiateJob completed');

    job.isComplete = true;
  }

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  /**
   * Sets this LinesRadiateJob as started.
   *
   * @this LinesRadiateJob
   * @param {Number} startTime
   */
  function start(startTime) {
    var job, i, count;

    job = this;

    job.startTime = startTime;
    job.isComplete = false;

    for (i = 0, count = job.lineJobs.length; i < count; i += 1) {
      job.lineJobs[i].start(startTime);
    }
  }

  /**
   * Updates the animation progress of this LinesRadiateJob to match the given time.
   *
   * This should be called from the overall animation loop.
   *
   * @this LinesRadiateJob
   * @param {Number} currentTime
   * @param {Number} deltaTime
   */
  function update(currentTime, deltaTime) {
    var job, i, count;

    job = this;

    // Update the extra point
    job.extraStartPoint.x = job.tile.particle.px;
    job.extraStartPoint.y = job.tile.particle.py;

    for (i = 0, count = job.lineJobs.length; i < count; i += 1) {
      job.lineJobs[i].update(currentTime, deltaTime);

      if (job.lineJobs[i].isComplete) {
        job.lineJobs.splice(i, 1);
        i--;
        count--;
      }
    }

    job.feGaussianBlur.setAttribute('stdDeviation', config.blurStdDeviation);

    checkForComplete.call(job);
  }

  /**
   * Draws the current state of this LinesRadiateJob.
   *
   * This should be called from the overall animation loop.
   *
   * @this LinesRadiateJob
   */
  function draw() {
    var job, i, count;

    job = this;

    for (i = 0, count = job.lineJobs.length; i < count; i += 1) {
      job.lineJobs[i].draw();
    }
  }

  /**
   * Stops this LinesRadiateJob, and returns the element its original form.
   *
   * @this LinesRadiateJob
   */
  function cancel() {
    var job, i, count;

    job = this;

    for (i = 0, count = job.lineJobs.length; i < count; i += 1) {
      job.lineJobs[i].cancel();
    }

    job.lineJobs = [];

    job.isComplete = true;
  }

  /**
   * @this LinesRadiateJob
   */
  function init() {
  }

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @constructor
   * @global
   * @param {Grid} grid
   * @param {Tile} tile
   * @param {Function} [onComplete]
   */
  function LinesRadiateJob(grid, tile, onComplete) {
    var job = this;

    job.grid = grid;
    job.tile = tile;
    job.extraStartPoint = { x: tile.particle.px, y: tile.particle.py };
    job.startTime = 0;
    job.isComplete = true;
    job.lineJobs = null;

    job.onComplete = onComplete || function () {};

    job.start = start;
    job.update = update;
    job.draw = draw;
    job.cancel = cancel;
    job.init = init;

    if (!config.haveDefinedLineBlur) {
      defineLineBlur.call(job);
    }

    createLineJobs.call(job);

    console.log('LinesRadiateJob created: tileIndex=' + tile.originalIndex);
  }

  LinesRadiateJob.config = config;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.LinesRadiateJob = LinesRadiateJob;

  console.log('LinesRadiateJob module loaded');
})();

/**
 * @typedef {AnimationJob} OpenPostJob
 */

/**
 * This module defines a constructor for OpenPostJob objects.
 *
 * @module OpenPostJob
 */
(function () {
  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var config = {};

  config.duration = 500;

  config.expandedDisplacementTileCount = 3;

  config.spreadDurationOffset = -200;
  config.panDurationOffset = -100;
  config.fadePostDurationOffset = 1100;
  config.dilateSectorsDurationOffset = 0;

  //  --- Dependent parameters --- //

  config.computeDependentValues = function () {
  };

  config.computeDependentValues();

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  /**
   * @this OpenPostJob
   */
  function handleComplete(wasCancelled) {
    var job = this;

    console.log('OpenPostJob ' + (wasCancelled ? 'cancelled' : 'completed'));

    job.grid.isTransitioning = false;

    // Don't reset some state if another expansion job started after this one did
    if (job.grid.lastExpansionJob === job) {
      job.grid.pagePost.loadCarouselMedia();
    }

    job.isComplete = true;
    job.onComplete();
  }

  /**
   * Creates the Sectors for expanding the grid.
   *
   * @this OpenPostJob
   */
  function createSectors() {
    var job, i, j, jCount, k, sectorTiles, allExpandedTiles;

    job = this;

    // Create the sectors
    for (i = 0; i < 6; i += 1) {
      job.sectors[i] = new window.hg.Sector(job.grid, job.baseTile, i,
          config.expandedDisplacementTileCount);
    }

    // Connect the sectors' tiles' external neighbor states
    for (i = 0; i < 6; i += 1) {
      job.sectors[i].initializeExpandedStateExternalTileNeighbors(job.sectors);
    }

//    dumpSectorInfo.call(job);

    // De-allocate the now-unnecessary two-dimensional sector tile collections
    for (i = 0; i < 6; i += 1) {
      job.sectors[i].tilesByIndex = null;
    }

    // Set up the expanded state for the selected tile (which is a member of no sector)
    window.hg.Tile.initializeTileExpandedState(job.baseTile, null, Number.NaN, Number.NaN);

    job.grid.sectors = job.sectors;

    // Give the grid a reference to the new complete collection of all tiles
    allExpandedTiles = [];
    for (k = 0, i = 0; i < 6; i += 1) {
      sectorTiles = job.sectors[i].tiles;

      for (j = 0, jCount = sectorTiles.length; j < jCount; j += 1, k += 1) {
        allExpandedTiles[k] = sectorTiles[j];
      }
    }
    allExpandedTiles[k] = job.baseTile;
    job.grid.updateAllTilesCollection(allExpandedTiles);
  }

  /**
   * Logs the new Sector data.
   *
   * @this OpenPostJob
   */
  function dumpSectorInfo() {
    var job, i;

    job = this;

    for (i = 0; i < 6; i += 1) {
      console.log(job.sectors[i]);
    }
  }

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  /**
   * Sets this OpenPostJob as started.
   *
   * @this OpenPostJob
   * @param {Number} startTime
   */
  function start(startTime) {
    var panDisplacement;
    var job = this;

    job.startTime = startTime;
    job.isComplete = false;

    if (job.grid.isTransitioning) {
      job.previousJob.cancel();
    }

    job.grid.isPostOpen = true;
    job.grid.isTransitioning = true;
    job.grid.expandedTile = job.baseTile;
    job.grid.lastExpansionJob = job;

    // Turn scrolling off while the grid is expanded
    job.grid.parent.style.overflow = 'hidden';

    createSectors.call(job);

    job.grid.annotations.setExpandedAnnotations(true);

    // Start the sub-jobs
    window.hg.controller.transientJobs.SpreadJob.create(job.grid, job.baseTile)
        .duration = config.duration + config.spreadDurationOffset;
    window.hg.controller.transientJobs.PanJob.create(job.grid, job.baseTile)
        .duration = config.duration + config.panDurationOffset;

    panDisplacement = {
      x: job.grid.panCenter.x - job.grid.originalCenter.x,
      y: job.grid.panCenter.y - job.grid.originalCenter.y
    };

    window.hg.controller.transientJobs.DilateSectorsJob.create(job.grid, job.baseTile, panDisplacement)
        .duration = config.duration + config.dilateSectorsDurationOffset;
    window.hg.controller.transientJobs.FadePostJob.create(job.grid, job.baseTile)
        .duration = config.duration + config.fadePostDurationOffset;

    // TODO: this should instead fade out the old persistent animations and fade in the new ones
    window.hg.controller.resetPersistentJobs(job.grid);
  }

  /**
   * Updates the animation progress of this OpenPostJob to match the given time.
   *
   * This should be called from the overall animation loop.
   *
   * @this OpenPostJob
   * @param {Number} currentTime
   * @param {Number} deltaTime
   */
  function update(currentTime, deltaTime) {
    var job = this;

    // Is the job done?
    if (currentTime - job.startTime >= config.duration) {
      handleComplete.call(job, false);
    }
  }

  /**
   * Draws the current state of this OpenPostJob.
   *
   * This should be called from the overall animation loop.
   *
   * @this OpenPostJob
   */
  function draw() {
    // This animation job updates the state of actual tiles, so it has nothing of its own to draw
  }

  /**
   * Stops this OpenPostJob, and returns the element its original form.
   *
   * @this OpenPostJob
   */
  function cancel() {
    var job = this;

    handleComplete.call(job, true);
  }

  /**
   * @this OpenPostJob
   */
  function init() {
    var job = this;

    config.computeDependentValues();
  }

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @constructor
   * @global
   * @param {Grid} grid
   * @param {Tile} tile
   * @param {Function} onComplete
   */
  function OpenPostJob(grid, tile, onComplete) {
    var job = this;

    job.grid = grid;
    job.baseTile = tile;
    job.startTime = 0;
    job.isComplete = true;
    job.sectors = [];
    job.previousJob = grid.lastExpansionJob;

    job.start = start;
    job.update = update;
    job.draw = draw;
    job.cancel = cancel;
    job.onComplete = onComplete;
    job.init = init;

    // Update the location hash to reference the current post.
    var hash = job.baseTile.postData ? '#' + job.baseTile.postData.id : '';
    history.pushState({}, document.title, hash);

    console.log('OpenPostJob created: tileIndex=' + job.baseTile.originalIndex);
  }

  OpenPostJob.config = config;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.OpenPostJob = OpenPostJob;

  console.log('OpenPostJob module loaded');
})();

/**
 * @typedef {AnimationJob} PanJob
 */

/**
 * This module defines a constructor for PanJob objects.
 *
 * @module PanJob
 */
(function () {
  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var config = {};

  config.duration = 400;

  config.displacementRatio = 0.28;

  config.isRecurring = false;
  config.avgDelay = 300;
  config.delayDeviationRange = 0;

  //  --- Dependent parameters --- //

  config.computeDependentValues = function () {
  };

  config.computeDependentValues();

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  /**
   * @this PanJob
   */
  function handleComplete(wasCancelled) {
    var job = this;

    console.log('PanJob ' + (wasCancelled ? 'cancelled' : 'completed'));

    job.isComplete = true;

    job.onComplete();
  }

  /**
   * @this PanJob
   */
  function setFinalPositions() {
    var job, i, count;

    job = this;

    // Displace the tiles
    for (i = 0, count = job.grid.allTiles.length; i < count; i += 1) {
      job.grid.allTiles[i].originalAnchor.x += job.displacement.x;
      job.grid.allTiles[i].originalAnchor.y += job.displacement.y;
    }

    // Update the grid
    job.grid.panCenter.x += job.displacement.x;
    job.grid.panCenter.y += job.displacement.y;
  }

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  /**
   * Sets this PanJob as started.
   *
   * @this PanJob
   * @param {Number} startTime
   */
  function start(startTime) {
    var job = this;

    job.reverseDisplacement = {x: job.endPoint.x - job.startPoint.x, y: job.endPoint.y - job.startPoint.y};
    job.displacement = {x: -job.reverseDisplacement.x, y: -job.reverseDisplacement.y};

    job.startTime = startTime;
    job.isComplete = false;

    // Set the final positions at the start, and animate everything in "reverse"
    setFinalPositions.call(job);
  }

  /**
   * Updates the animation progress of this PanJob to match the given time.
   *
   * This should be called from the overall animation loop.
   *
   * @this PanJob
   * @param {Number} currentTime
   * @param {Number} deltaTime
   */
  function update(currentTime, deltaTime) {
    var job, progress, i, count, displacementX, displacementY;

    job = this;

    // Calculate progress with an easing function
    // Because the final positions were set at the start, the progress needs to update in "reverse"
    progress = (currentTime - job.startTime) / job.duration;
    progress = 1 - window.hg.util.easingFunctions.easeOutQuint(progress);
    progress = progress < 0 ? 0 : progress;

    displacementX = job.reverseDisplacement.x * progress;
    displacementY = job.reverseDisplacement.y * progress;

    // Displace the tiles
    for (i = 0, count = job.grid.allTiles.length; i < count; i += 1) {
      job.grid.allTiles[i].currentAnchor.x += displacementX;
      job.grid.allTiles[i].currentAnchor.y += displacementY;
    }

    // Update the grid
    job.grid.currentCenter.x = job.grid.panCenter.x + displacementX;
    job.grid.currentCenter.y = job.grid.panCenter.y + displacementY;

    // Is the job done?
    if (progress === 0) {
      handleComplete.call(job, false);
    }
  }

  /**
   * Draws the current state of this PanJob.
   *
   * This should be called from the overall animation loop.
   *
   * @this PanJob
   */
  function draw() {
    // This animation job updates the state of actual tiles, so it has nothing of its own to draw
  }

  /**
   * Stops this PanJob, and returns the element its original form.
   *
   * @this PanJob
   */
  function cancel() {
    var job = this;

    handleComplete.call(job, true);
  }

  /**
   * @this PanJob
   */
  function init() {
  }

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @constructor
   * @global
   * @param {Grid} grid
   * @param {?Tile} tile
   * @param {Function} onComplete
   * @param {{x:Number,y:Number}} [destinationPoint]
   */
  function PanJob(grid, tile, onComplete, destinationPoint) {
    var job = this;

    job.grid = grid;
    job.baseTile = tile;
    job.reverseDisplacement = null;
    job.displacement = null;
    job.startTime = 0;
    job.isComplete = true;

    grid.scrollTop = grid.parent.scrollTop;

    // The current viewport coordinates of the point that we would like to move to the center of the viewport
    job.endPoint = destinationPoint || {
      x: tile.originalAnchor.x,
      y: tile.originalAnchor.y - grid.scrollTop
    };

    // The center of the viewport
    job.startPoint = {x: grid.originalCenter.x, y: grid.originalCenter.y};

    job.duration = config.duration;

    job.start = start;
    job.update = update;
    job.draw = draw;
    job.cancel = cancel;
    job.onComplete = onComplete;
    job.init = init;

    console.log('PanJob created: tileIndex=' + job.baseTile.originalIndex);
  }

  PanJob.config = config;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.PanJob = PanJob;

  console.log('PanJob module loaded');
})();

/**
 * @typedef {AnimationJob} SpreadJob
 */

/**
 * This module defines a constructor for SpreadJob objects.
 *
 * @module SpreadJob
 */
(function () {
  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var config = {};

  config.duration = 300;

  config.displacementRatio = 0.2;

  config.isRecurring = false;
  config.avgDelay = 4000;
  config.delayDeviationRange = 3800;

  //  --- Dependent parameters --- //

  config.computeDependentValues = function () {
  };

  config.computeDependentValues();

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  /**
   * Calculates and stores the maximal displacement values for all tiles.
   *
   * @this SpreadJob
   */
  function initializeDisplacements() {
    var job, i, count;

    job = this;

    job.displacements = [];

    for (i = 0, count = job.grid.allTiles.length; i < count; i += 1) {
      job.displacements[i] = {
        tile: job.grid.allTiles[i],
        dx: config.displacementRatio *
            (job.grid.allTiles[i].originalAnchor.x - job.baseTile.originalAnchor.x),
        dy: config.displacementRatio *
            (job.grid.allTiles[i].originalAnchor.y - job.baseTile.originalAnchor.y)
      };
    }
  }

  /**
   * @this SpreadJob
   */
  function handleComplete(wasCancelled) {
    var job = this;

    console.log('SpreadJob ' + (wasCancelled ? 'cancelled' : 'completed'));

    job.isComplete = true;

    job.onComplete();
  }

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  /**
   * Sets this SpreadJob as started.
   *
   * @this SpreadJob
   * @param {Number} startTime
   */
  function start(startTime) {
    var job = this;

    job.startTime = startTime;
    job.isComplete = false;
  }

  /**
   * Updates the animation progress of this SpreadJob to match the given time.
   *
   * This should be called from the overall animation loop.
   *
   * @this SpreadJob
   * @param {Number} currentTime
   * @param {Number} deltaTime
   */
  function update(currentTime, deltaTime) {
    var job, progress, i, count;

    job = this;

    if (currentTime > job.startTime + job.duration) {
      handleComplete.call(job, false);
    } else {
      // Ease-out halfway, then ease-in back
      progress = (currentTime - job.startTime) / job.duration;
      progress = (progress > 0.5 ? 1 - progress : progress) * 2;
      progress = window.hg.util.easingFunctions.easeOutQuint(progress);

      // Displace the tiles
      for (i = 0, count = job.displacements.length; i < count; i += 1) {
        job.displacements[i].tile.currentAnchor.x += job.displacements[i].dx * progress;
        job.displacements[i].tile.currentAnchor.y += job.displacements[i].dy * progress;
      }
    }
  }

  /**
   * Draws the current state of this SpreadJob.
   *
   * This should be called from the overall animation loop.
   *
   * @this SpreadJob
   */
  function draw() {
    // This animation job updates the state of actual tiles, so it has nothing of its own to draw
  }

  /**
   * Stops this SpreadJob, and returns the element its original form.
   *
   * @this SpreadJob
   */
  function cancel() {
    var job = this;

    handleComplete.call(job, true);
  }

  /**
   * @this SpreadJob
   */
  function init() {
  }

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @constructor
   * @global
   * @param {Grid} grid
   * @param {Tile} tile
   * @param {Function} onComplete
   */
  function SpreadJob(grid, tile, onComplete) {
    var job = this;

    job.grid = grid;
    job.baseTile = tile;
    job.startTime = 0;
    job.isComplete = true;

    job.displacements = null;

    job.duration = config.duration;

    job.start = start;
    job.update = update;
    job.draw = draw;
    job.cancel = cancel;
    job.onComplete = onComplete;
    job.init = init;

    initializeDisplacements.call(job);

    console.log('SpreadJob created: tileIndex=' + job.baseTile.originalIndex);
  }

  SpreadJob.config = config;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.SpreadJob = SpreadJob;

  console.log('SpreadJob module loaded');
})();

/**
 * @typedef {AnimationJob} TileBorderJob
 */

/**
 * This module defines a constructor for TileBorderJob objects.
 *
 * @module TileBorderJob
 */
(function () {
  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var config = {};

  config.duration = 500;

  // TODO:

  config.isRecurring = false;
  config.avgDelay = 4000;
  config.delayDeviationRange = 3800;

  //  --- Dependent parameters --- //

  config.computeDependentValues = function () {
    // TODO:
  };

  config.computeDependentValues();

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  /**
   * @this TileBorderJob
   */
  function handleComplete(wasCancelled) {
    var job = this;

    console.log('TileBorderJob ' + (wasCancelled ? 'cancelled' : 'completed'));

    job.isComplete = true;

    job.onComplete();
  }

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  /**
   * Sets this TileBorderJob as started.
   *
   * @this TileBorderJob
   * @param {Number} startTime
   */
  function start(startTime) {
    var job = this;

    job.startTime = startTime;
    job.isComplete = false;
  }

  /**
   * Updates the animation progress of this TileBorderJob to match the given time.
   *
   * This should be called from the overall animation loop.
   *
   * @this TileBorderJob
   * @param {Number} currentTime
   * @param {Number} deltaTime
   */
  function update(currentTime, deltaTime) {
    // TODO:
//    var job, currentMaxDistance, currentMinDistance, i, count, distance, waveWidthRatio,
//        oneMinusDurationRatio, animatedSomeTile;
//
//    job = this;
//
//    if (currentTime > job.startTime + config.duration) {
//      handleComplete.call(job, false);
//    } else {
//      oneMinusDurationRatio = 1 - (currentTime - job.startTime) / config.duration;
//
//      currentMaxDistance = config.shimmerSpeed * (currentTime - job.startTime);
//      currentMinDistance = currentMaxDistance - config.shimmerWaveWidth;
//
//      animatedSomeTile = false;
//
//      for (i = 0, count = job.grid.originalTiles.length; i < count; i += 1) {
//        distance = job.tileDistances[i];
//
//        if (distance > currentMinDistance && distance < currentMaxDistance) {
//          waveWidthRatio = (distance - currentMinDistance) / config.shimmerWaveWidth;
//
//          updateTile(job.grid.originalTiles[i], waveWidthRatio, oneMinusDurationRatio);
//
//          animatedSomeTile = true;
//        }
//      }
//
//      if (!animatedSomeTile) {
//        handleComplete.call(job, false);
//      }
//    }**;
  }

  /**
   * Draws the current state of this TileBorderJob.
   *
   * This should be called from the overall animation loop.
   *
   * @this TileBorderJob
   */
  function draw() {
    var job;

    job = this;

    // TODO:
  }

  /**
   * Stops this TileBorderJob, and returns the element its original form.
   *
   * @this TileBorderJob
   */
  function cancel() {
    var job = this;

    handleComplete.call(job, true);
  }

  /**
   * @this TileBorderJob
   */
  function init() {
    var job = this;

    config.computeDependentValues();
    // TODO:
  }

  // ------------------------------------------------------------------------------------------- //
  // Expose this module's constructor

  /**
   * @constructor
   * @global
   * @param {Grid} grid
   * @param {Tile} tile
   * @param {Function} onComplete
   */
  function TileBorderJob(grid, tile, onComplete) {
    var job = this;

    job.grid = grid;
    job.tile = tile;
    job.startTime = 0;
    job.isComplete = true;

    job.start = start;
    job.update = update;
    job.draw = draw;
    job.cancel = cancel;
    job.onComplete = onComplete;
    job.init = init;

    console.log('TileBorderJob created: tileIndex=' + job.baseTile.originalIndex);
  }

  TileBorderJob.config = config;

  // Expose this module
  window.hg = window.hg || {};
  window.hg.TileBorderJob = TileBorderJob;

  console.log('TileBorderJob module loaded');
})();

;/*! showdown v 1.9.1 - 02-11-2019 */
(function(){
/**
 * Created by Tivie on 13-07-2015.
 */

function getDefaultOpts (simple) {
  'use strict';

  var defaultOptions = {
    omitExtraWLInCodeBlocks: {
      defaultValue: false,
      describe: 'Omit the default extra whiteline added to code blocks',
      type: 'boolean'
    },
    noHeaderId: {
      defaultValue: false,
      describe: 'Turn on/off generated header id',
      type: 'boolean'
    },
    prefixHeaderId: {
      defaultValue: false,
      describe: 'Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic \'section-\' prefix',
      type: 'string'
    },
    rawPrefixHeaderId: {
      defaultValue: false,
      describe: 'Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the " char is used in the prefix)',
      type: 'boolean'
    },
    ghCompatibleHeaderId: {
      defaultValue: false,
      describe: 'Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)',
      type: 'boolean'
    },
    rawHeaderId: {
      defaultValue: false,
      describe: 'Remove only spaces, \' and " from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids',
      type: 'boolean'
    },
    headerLevelStart: {
      defaultValue: false,
      describe: 'The header blocks level start',
      type: 'integer'
    },
    parseImgDimensions: {
      defaultValue: false,
      describe: 'Turn on/off image dimension parsing',
      type: 'boolean'
    },
    simplifiedAutoLink: {
      defaultValue: false,
      describe: 'Turn on/off GFM autolink style',
      type: 'boolean'
    },
    excludeTrailingPunctuationFromURLs: {
      defaultValue: false,
      describe: 'Excludes trailing punctuation from links generated with autoLinking',
      type: 'boolean'
    },
    literalMidWordUnderscores: {
      defaultValue: false,
      describe: 'Parse midword underscores as literal underscores',
      type: 'boolean'
    },
    literalMidWordAsterisks: {
      defaultValue: false,
      describe: 'Parse midword asterisks as literal asterisks',
      type: 'boolean'
    },
    strikethrough: {
      defaultValue: false,
      describe: 'Turn on/off strikethrough support',
      type: 'boolean'
    },
    tables: {
      defaultValue: false,
      describe: 'Turn on/off tables support',
      type: 'boolean'
    },
    tablesHeaderId: {
      defaultValue: false,
      describe: 'Add an id to table headers',
      type: 'boolean'
    },
    ghCodeBlocks: {
      defaultValue: true,
      describe: 'Turn on/off GFM fenced code blocks support',
      type: 'boolean'
    },
    tasklists: {
      defaultValue: false,
      describe: 'Turn on/off GFM tasklist support',
      type: 'boolean'
    },
    smoothLivePreview: {
      defaultValue: false,
      describe: 'Prevents weird effects in live previews due to incomplete input',
      type: 'boolean'
    },
    smartIndentationFix: {
      defaultValue: false,
      description: 'Tries to smartly fix indentation in es6 strings',
      type: 'boolean'
    },
    disableForced4SpacesIndentedSublists: {
      defaultValue: false,
      description: 'Disables the requirement of indenting nested sublists by 4 spaces',
      type: 'boolean'
    },
    simpleLineBreaks: {
      defaultValue: false,
      description: 'Parses simple line breaks as <br> (GFM Style)',
      type: 'boolean'
    },
    requireSpaceBeforeHeadingText: {
      defaultValue: false,
      description: 'Makes adding a space between `#` and the header text mandatory (GFM Style)',
      type: 'boolean'
    },
    ghMentions: {
      defaultValue: false,
      description: 'Enables github @mentions',
      type: 'boolean'
    },
    ghMentionsLink: {
      defaultValue: 'https://github.com/{u}',
      description: 'Changes the link generated by @mentions. Only applies if ghMentions option is enabled.',
      type: 'string'
    },
    encodeEmails: {
      defaultValue: true,
      description: 'Encode e-mail addresses through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities',
      type: 'boolean'
    },
    openLinksInNewWindow: {
      defaultValue: false,
      description: 'Open all links in new windows',
      type: 'boolean'
    },
    backslashEscapesHTMLTags: {
      defaultValue: false,
      description: 'Support for HTML Tag escaping. ex: \<div>foo\</div>',
      type: 'boolean'
    },
    emoji: {
      defaultValue: false,
      description: 'Enable emoji support. Ex: `this is a :smile: emoji`',
      type: 'boolean'
    },
    underline: {
      defaultValue: false,
      description: 'Enable support for underline. Syntax is double or triple underscores: `__underline word__`. With this option enabled, underscores no longer parses into `<em>` and `<strong>`',
      type: 'boolean'
    },
    completeHTMLDocument: {
      defaultValue: false,
      description: 'Outputs a complete html document, including `<html>`, `<head>` and `<body>` tags',
      type: 'boolean'
    },
    metadata: {
      defaultValue: false,
      description: 'Enable support for document metadata (defined at the top of the document between `«««` and `»»»` or between `---` and `---`).',
      type: 'boolean'
    },
    splitAdjacentBlockquotes: {
      defaultValue: false,
      description: 'Split adjacent blockquote blocks',
      type: 'boolean'
    }
  };
  if (simple === false) {
    return JSON.parse(JSON.stringify(defaultOptions));
  }
  var ret = {};
  for (var opt in defaultOptions) {
    if (defaultOptions.hasOwnProperty(opt)) {
      ret[opt] = defaultOptions[opt].defaultValue;
    }
  }
  return ret;
}

function allOptionsOn () {
  'use strict';
  var options = getDefaultOpts(true),
      ret = {};
  for (var opt in options) {
    if (options.hasOwnProperty(opt)) {
      ret[opt] = true;
    }
  }
  return ret;
}

/**
 * Created by Tivie on 06-01-2015.
 */

// Private properties
var showdown = {},
    parsers = {},
    extensions = {},
    globalOptions = getDefaultOpts(true),
    setFlavor = 'vanilla',
    flavor = {
      github: {
        omitExtraWLInCodeBlocks:              true,
        simplifiedAutoLink:                   true,
        excludeTrailingPunctuationFromURLs:   true,
        literalMidWordUnderscores:            true,
        strikethrough:                        true,
        tables:                               true,
        tablesHeaderId:                       true,
        ghCodeBlocks:                         true,
        tasklists:                            true,
        disableForced4SpacesIndentedSublists: true,
        simpleLineBreaks:                     true,
        requireSpaceBeforeHeadingText:        true,
        ghCompatibleHeaderId:                 true,
        ghMentions:                           true,
        backslashEscapesHTMLTags:             true,
        emoji:                                true,
        splitAdjacentBlockquotes:             true
      },
      original: {
        noHeaderId:                           true,
        ghCodeBlocks:                         false
      },
      ghost: {
        omitExtraWLInCodeBlocks:              true,
        parseImgDimensions:                   true,
        simplifiedAutoLink:                   true,
        excludeTrailingPunctuationFromURLs:   true,
        literalMidWordUnderscores:            true,
        strikethrough:                        true,
        tables:                               true,
        tablesHeaderId:                       true,
        ghCodeBlocks:                         true,
        tasklists:                            true,
        smoothLivePreview:                    true,
        simpleLineBreaks:                     true,
        requireSpaceBeforeHeadingText:        true,
        ghMentions:                           false,
        encodeEmails:                         true
      },
      vanilla: getDefaultOpts(true),
      allOn: allOptionsOn()
    };

/**
 * helper namespace
 * @type {{}}
 */
showdown.helper = {};

/**
 * TODO LEGACY SUPPORT CODE
 * @type {{}}
 */
showdown.extensions = {};

/**
 * Set a global option
 * @static
 * @param {string} key
 * @param {*} value
 * @returns {showdown}
 */
showdown.setOption = function (key, value) {
  'use strict';
  globalOptions[key] = value;
  return this;
};

/**
 * Get a global option
 * @static
 * @param {string} key
 * @returns {*}
 */
showdown.getOption = function (key) {
  'use strict';
  return globalOptions[key];
};

/**
 * Get the global options
 * @static
 * @returns {{}}
 */
showdown.getOptions = function () {
  'use strict';
  return globalOptions;
};

/**
 * Reset global options to the default values
 * @static
 */
showdown.resetOptions = function () {
  'use strict';
  globalOptions = getDefaultOpts(true);
};

/**
 * Set the flavor showdown should use as default
 * @param {string} name
 */
showdown.setFlavor = function (name) {
  'use strict';
  if (!flavor.hasOwnProperty(name)) {
    throw Error(name + ' flavor was not found');
  }
  showdown.resetOptions();
  var preset = flavor[name];
  setFlavor = name;
  for (var option in preset) {
    if (preset.hasOwnProperty(option)) {
      globalOptions[option] = preset[option];
    }
  }
};

/**
 * Get the currently set flavor
 * @returns {string}
 */
showdown.getFlavor = function () {
  'use strict';
  return setFlavor;
};

/**
 * Get the options of a specified flavor. Returns undefined if the flavor was not found
 * @param {string} name Name of the flavor
 * @returns {{}|undefined}
 */
showdown.getFlavorOptions = function (name) {
  'use strict';
  if (flavor.hasOwnProperty(name)) {
    return flavor[name];
  }
};

/**
 * Get the default options
 * @static
 * @param {boolean} [simple=true]
 * @returns {{}}
 */
showdown.getDefaultOptions = function (simple) {
  'use strict';
  return getDefaultOpts(simple);
};

/**
 * Get or set a subParser
 *
 * subParser(name)       - Get a registered subParser
 * subParser(name, func) - Register a subParser
 * @static
 * @param {string} name
 * @param {function} [func]
 * @returns {*}
 */
showdown.subParser = function (name, func) {
  'use strict';
  if (showdown.helper.isString(name)) {
    if (typeof func !== 'undefined') {
      parsers[name] = func;
    } else {
      if (parsers.hasOwnProperty(name)) {
        return parsers[name];
      } else {
        throw Error('SubParser named ' + name + ' not registered!');
      }
    }
  }
};

/**
 * Gets or registers an extension
 * @static
 * @param {string} name
 * @param {object|function=} ext
 * @returns {*}
 */
showdown.extension = function (name, ext) {
  'use strict';

  if (!showdown.helper.isString(name)) {
    throw Error('Extension \'name\' must be a string');
  }

  name = showdown.helper.stdExtName(name);

  // Getter
  if (showdown.helper.isUndefined(ext)) {
    if (!extensions.hasOwnProperty(name)) {
      throw Error('Extension named ' + name + ' is not registered!');
    }
    return extensions[name];

    // Setter
  } else {
    // Expand extension if it's wrapped in a function
    if (typeof ext === 'function') {
      ext = ext();
    }

    // Ensure extension is an array
    if (!showdown.helper.isArray(ext)) {
      ext = [ext];
    }

    var validExtension = validate(ext, name);

    if (validExtension.valid) {
      extensions[name] = ext;
    } else {
      throw Error(validExtension.error);
    }
  }
};

/**
 * Gets all extensions registered
 * @returns {{}}
 */
showdown.getAllExtensions = function () {
  'use strict';
  return extensions;
};

/**
 * Remove an extension
 * @param {string} name
 */
showdown.removeExtension = function (name) {
  'use strict';
  delete extensions[name];
};

/**
 * Removes all extensions
 */
showdown.resetExtensions = function () {
  'use strict';
  extensions = {};
};

/**
 * Validate extension
 * @param {array} extension
 * @param {string} name
 * @returns {{valid: boolean, error: string}}
 */
function validate (extension, name) {
  'use strict';

  var errMsg = (name) ? 'Error in ' + name + ' extension->' : 'Error in unnamed extension',
      ret = {
        valid: true,
        error: ''
      };

  if (!showdown.helper.isArray(extension)) {
    extension = [extension];
  }

  for (var i = 0; i < extension.length; ++i) {
    var baseMsg = errMsg + ' sub-extension ' + i + ': ',
        ext = extension[i];
    if (typeof ext !== 'object') {
      ret.valid = false;
      ret.error = baseMsg + 'must be an object, but ' + typeof ext + ' given';
      return ret;
    }

    if (!showdown.helper.isString(ext.type)) {
      ret.valid = false;
      ret.error = baseMsg + 'property "type" must be a string, but ' + typeof ext.type + ' given';
      return ret;
    }

    var type = ext.type = ext.type.toLowerCase();

    // normalize extension type
    if (type === 'language') {
      type = ext.type = 'lang';
    }

    if (type === 'html') {
      type = ext.type = 'output';
    }

    if (type !== 'lang' && type !== 'output' && type !== 'listener') {
      ret.valid = false;
      ret.error = baseMsg + 'type ' + type + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"';
      return ret;
    }

    if (type === 'listener') {
      if (showdown.helper.isUndefined(ext.listeners)) {
        ret.valid = false;
        ret.error = baseMsg + '. Extensions of type "listener" must have a property called "listeners"';
        return ret;
      }
    } else {
      if (showdown.helper.isUndefined(ext.filter) && showdown.helper.isUndefined(ext.regex)) {
        ret.valid = false;
        ret.error = baseMsg + type + ' extensions must define either a "regex" property or a "filter" method';
        return ret;
      }
    }

    if (ext.listeners) {
      if (typeof ext.listeners !== 'object') {
        ret.valid = false;
        ret.error = baseMsg + '"listeners" property must be an object but ' + typeof ext.listeners + ' given';
        return ret;
      }
      for (var ln in ext.listeners) {
        if (ext.listeners.hasOwnProperty(ln)) {
          if (typeof ext.listeners[ln] !== 'function') {
            ret.valid = false;
            ret.error = baseMsg + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + ln +
              ' must be a function but ' + typeof ext.listeners[ln] + ' given';
            return ret;
          }
        }
      }
    }

    if (ext.filter) {
      if (typeof ext.filter !== 'function') {
        ret.valid = false;
        ret.error = baseMsg + '"filter" must be a function, but ' + typeof ext.filter + ' given';
        return ret;
      }
    } else if (ext.regex) {
      if (showdown.helper.isString(ext.regex)) {
        ext.regex = new RegExp(ext.regex, 'g');
      }
      if (!(ext.regex instanceof RegExp)) {
        ret.valid = false;
        ret.error = baseMsg + '"regex" property must either be a string or a RegExp object, but ' + typeof ext.regex + ' given';
        return ret;
      }
      if (showdown.helper.isUndefined(ext.replace)) {
        ret.valid = false;
        ret.error = baseMsg + '"regex" extensions must implement a replace string or function';
        return ret;
      }
    }
  }
  return ret;
}

/**
 * Validate extension
 * @param {object} ext
 * @returns {boolean}
 */
showdown.validateExtension = function (ext) {
  'use strict';

  var validateExtension = validate(ext, null);
  if (!validateExtension.valid) {
    console.warn(validateExtension.error);
    return false;
  }
  return true;
};

/**
 * showdownjs helper functions
 */

if (!showdown.hasOwnProperty('helper')) {
  showdown.helper = {};
}

/**
 * Check if var is string
 * @static
 * @param {string} a
 * @returns {boolean}
 */
showdown.helper.isString = function (a) {
  'use strict';
  return (typeof a === 'string' || a instanceof String);
};

/**
 * Check if var is a function
 * @static
 * @param {*} a
 * @returns {boolean}
 */
showdown.helper.isFunction = function (a) {
  'use strict';
  var getType = {};
  return a && getType.toString.call(a) === '[object Function]';
};

/**
 * isArray helper function
 * @static
 * @param {*} a
 * @returns {boolean}
 */
showdown.helper.isArray = function (a) {
  'use strict';
  return Array.isArray(a);
};

/**
 * Check if value is undefined
 * @static
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 */
showdown.helper.isUndefined = function (value) {
  'use strict';
  return typeof value === 'undefined';
};

/**
 * ForEach helper function
 * Iterates over Arrays and Objects (own properties only)
 * @static
 * @param {*} obj
 * @param {function} callback Accepts 3 params: 1. value, 2. key, 3. the original array/object
 */
showdown.helper.forEach = function (obj, callback) {
  'use strict';
  // check if obj is defined
  if (showdown.helper.isUndefined(obj)) {
    throw new Error('obj param is required');
  }

  if (showdown.helper.isUndefined(callback)) {
    throw new Error('callback param is required');
  }

  if (!showdown.helper.isFunction(callback)) {
    throw new Error('callback param must be a function/closure');
  }

  if (typeof obj.forEach === 'function') {
    obj.forEach(callback);
  } else if (showdown.helper.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      callback(obj[i], i, obj);
    }
  } else if (typeof (obj) === 'object') {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        callback(obj[prop], prop, obj);
      }
    }
  } else {
    throw new Error('obj does not seem to be an array or an iterable object');
  }
};

/**
 * Standardidize extension name
 * @static
 * @param {string} s extension name
 * @returns {string}
 */
showdown.helper.stdExtName = function (s) {
  'use strict';
  return s.replace(/[_?*+\/\\.^-]/g, '').replace(/\s/g, '').toLowerCase();
};

function escapeCharactersCallback (wholeMatch, m1) {
  'use strict';
  var charCodeToEscape = m1.charCodeAt(0);
  return '¨E' + charCodeToEscape + 'E';
}

/**
 * Callback used to escape characters when passing through String.replace
 * @static
 * @param {string} wholeMatch
 * @param {string} m1
 * @returns {string}
 */
showdown.helper.escapeCharactersCallback = escapeCharactersCallback;

/**
 * Escape characters in a string
 * @static
 * @param {string} text
 * @param {string} charsToEscape
 * @param {boolean} afterBackslash
 * @returns {XML|string|void|*}
 */
showdown.helper.escapeCharacters = function (text, charsToEscape, afterBackslash) {
  'use strict';
  // First we have to escape the escape characters so that
  // we can build a character class out of them
  var regexString = '([' + charsToEscape.replace(/([\[\]\\])/g, '\\$1') + '])';

  if (afterBackslash) {
    regexString = '\\\\' + regexString;
  }

  var regex = new RegExp(regexString, 'g');
  text = text.replace(regex, escapeCharactersCallback);

  return text;
};

/**
 * Unescape HTML entities
 * @param txt
 * @returns {string}
 */
showdown.helper.unescapeHTMLEntities = function (txt) {
  'use strict';

  return txt
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
};

var rgxFindMatchPos = function (str, left, right, flags) {
  'use strict';
  var f = flags || '',
      g = f.indexOf('g') > -1,
      x = new RegExp(left + '|' + right, 'g' + f.replace(/g/g, '')),
      l = new RegExp(left, f.replace(/g/g, '')),
      pos = [],
      t, s, m, start, end;

  do {
    t = 0;
    while ((m = x.exec(str))) {
      if (l.test(m[0])) {
        if (!(t++)) {
          s = x.lastIndex;
          start = s - m[0].length;
        }
      } else if (t) {
        if (!--t) {
          end = m.index + m[0].length;
          var obj = {
            left: {start: start, end: s},
            match: {start: s, end: m.index},
            right: {start: m.index, end: end},
            wholeMatch: {start: start, end: end}
          };
          pos.push(obj);
          if (!g) {
            return pos;
          }
        }
      }
    }
  } while (t && (x.lastIndex = s));

  return pos;
};

/**
 * matchRecursiveRegExp
 *
 * (c) 2007 Steven Levithan <stevenlevithan.com>
 * MIT License
 *
 * Accepts a string to search, a left and right format delimiter
 * as regex patterns, and optional regex flags. Returns an array
 * of matches, allowing nested instances of left/right delimiters.
 * Use the "g" flag to return all matches, otherwise only the
 * first is returned. Be careful to ensure that the left and
 * right format delimiters produce mutually exclusive matches.
 * Backreferences are not supported within the right delimiter
 * due to how it is internally combined with the left delimiter.
 * When matching strings whose format delimiters are unbalanced
 * to the left or right, the output is intentionally as a
 * conventional regex library with recursion support would
 * produce, e.g. "<<x>" and "<x>>" both produce ["x"] when using
 * "<" and ">" as the delimiters (both strings contain a single,
 * balanced instance of "<x>").
 *
 * examples:
 * matchRecursiveRegExp("test", "\\(", "\\)")
 * returns: []
 * matchRecursiveRegExp("<t<<e>><s>>t<>", "<", ">", "g")
 * returns: ["t<<e>><s>", ""]
 * matchRecursiveRegExp("<div id=\"x\">test</div>", "<div\\b[^>]*>", "</div>", "gi")
 * returns: ["test"]
 */
showdown.helper.matchRecursiveRegExp = function (str, left, right, flags) {
  'use strict';

  var matchPos = rgxFindMatchPos (str, left, right, flags),
      results = [];

  for (var i = 0; i < matchPos.length; ++i) {
    results.push([
      str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end),
      str.slice(matchPos[i].match.start, matchPos[i].match.end),
      str.slice(matchPos[i].left.start, matchPos[i].left.end),
      str.slice(matchPos[i].right.start, matchPos[i].right.end)
    ]);
  }
  return results;
};

/**
 *
 * @param {string} str
 * @param {string|function} replacement
 * @param {string} left
 * @param {string} right
 * @param {string} flags
 * @returns {string}
 */
showdown.helper.replaceRecursiveRegExp = function (str, replacement, left, right, flags) {
  'use strict';

  if (!showdown.helper.isFunction(replacement)) {
    var repStr = replacement;
    replacement = function () {
      return repStr;
    };
  }

  var matchPos = rgxFindMatchPos(str, left, right, flags),
      finalStr = str,
      lng = matchPos.length;

  if (lng > 0) {
    var bits = [];
    if (matchPos[0].wholeMatch.start !== 0) {
      bits.push(str.slice(0, matchPos[0].wholeMatch.start));
    }
    for (var i = 0; i < lng; ++i) {
      bits.push(
        replacement(
          str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end),
          str.slice(matchPos[i].match.start, matchPos[i].match.end),
          str.slice(matchPos[i].left.start, matchPos[i].left.end),
          str.slice(matchPos[i].right.start, matchPos[i].right.end)
        )
      );
      if (i < lng - 1) {
        bits.push(str.slice(matchPos[i].wholeMatch.end, matchPos[i + 1].wholeMatch.start));
      }
    }
    if (matchPos[lng - 1].wholeMatch.end < str.length) {
      bits.push(str.slice(matchPos[lng - 1].wholeMatch.end));
    }
    finalStr = bits.join('');
  }
  return finalStr;
};

/**
 * Returns the index within the passed String object of the first occurrence of the specified regex,
 * starting the search at fromIndex. Returns -1 if the value is not found.
 *
 * @param {string} str string to search
 * @param {RegExp} regex Regular expression to search
 * @param {int} [fromIndex = 0] Index to start the search
 * @returns {Number}
 * @throws InvalidArgumentError
 */
showdown.helper.regexIndexOf = function (str, regex, fromIndex) {
  'use strict';
  if (!showdown.helper.isString(str)) {
    throw 'InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string';
  }
  if (regex instanceof RegExp === false) {
    throw 'InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp';
  }
  var indexOf = str.substring(fromIndex || 0).search(regex);
  return (indexOf >= 0) ? (indexOf + (fromIndex || 0)) : indexOf;
};

/**
 * Splits the passed string object at the defined index, and returns an array composed of the two substrings
 * @param {string} str string to split
 * @param {int} index index to split string at
 * @returns {[string,string]}
 * @throws InvalidArgumentError
 */
showdown.helper.splitAtIndex = function (str, index) {
  'use strict';
  if (!showdown.helper.isString(str)) {
    throw 'InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string';
  }
  return [str.substring(0, index), str.substring(index)];
};

/**
 * Obfuscate an e-mail address through the use of Character Entities,
 * transforming ASCII characters into their equivalent decimal or hex entities.
 *
 * Since it has a random component, subsequent calls to this function produce different results
 *
 * @param {string} mail
 * @returns {string}
 */
showdown.helper.encodeEmailAddress = function (mail) {
  'use strict';
  var encode = [
    function (ch) {
      return '&#' + ch.charCodeAt(0) + ';';
    },
    function (ch) {
      return '&#x' + ch.charCodeAt(0).toString(16) + ';';
    },
    function (ch) {
      return ch;
    }
  ];

  mail = mail.replace(/./g, function (ch) {
    if (ch === '@') {
      // this *must* be encoded. I insist.
      ch = encode[Math.floor(Math.random() * 2)](ch);
    } else {
      var r = Math.random();
      // roughly 10% raw, 45% hex, 45% dec
      ch = (
        r > 0.9 ? encode[2](ch) : r > 0.45 ? encode[1](ch) : encode[0](ch)
      );
    }
    return ch;
  });

  return mail;
};

/**
 *
 * @param str
 * @param targetLength
 * @param padString
 * @returns {string}
 */
showdown.helper.padEnd = function padEnd (str, targetLength, padString) {
  'use strict';
  /*jshint bitwise: false*/
  // eslint-disable-next-line space-infix-ops
  targetLength = targetLength>>0; //floor if number or convert non-number to 0;
  /*jshint bitwise: true*/
  padString = String(padString || ' ');
  if (str.length > targetLength) {
    return String(str);
  } else {
    targetLength = targetLength - str.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
    }
    return String(str) + padString.slice(0,targetLength);
  }
};

/**
 * POLYFILLS
 */
// use this instead of builtin is undefined for IE8 compatibility
if (typeof console === 'undefined') {
  console = {
    warn: function (msg) {
      'use strict';
      alert(msg);
    },
    log: function (msg) {
      'use strict';
      alert(msg);
    },
    error: function (msg) {
      'use strict';
      throw msg;
    }
  };
}

/**
 * Common regexes.
 * We declare some common regexes to improve performance
 */
showdown.helper.regexes = {
  asteriskDashAndColon: /([*_:~])/g
};

/**
 * EMOJIS LIST
 */
showdown.helper.emojis = {
  '+1':'\ud83d\udc4d',
  '-1':'\ud83d\udc4e',
  '100':'\ud83d\udcaf',
  '1234':'\ud83d\udd22',
  '1st_place_medal':'\ud83e\udd47',
  '2nd_place_medal':'\ud83e\udd48',
  '3rd_place_medal':'\ud83e\udd49',
  '8ball':'\ud83c\udfb1',
  'a':'\ud83c\udd70\ufe0f',
  'ab':'\ud83c\udd8e',
  'abc':'\ud83d\udd24',
  'abcd':'\ud83d\udd21',
  'accept':'\ud83c\ude51',
  'aerial_tramway':'\ud83d\udea1',
  'airplane':'\u2708\ufe0f',
  'alarm_clock':'\u23f0',
  'alembic':'\u2697\ufe0f',
  'alien':'\ud83d\udc7d',
  'ambulance':'\ud83d\ude91',
  'amphora':'\ud83c\udffa',
  'anchor':'\u2693\ufe0f',
  'angel':'\ud83d\udc7c',
  'anger':'\ud83d\udca2',
  'angry':'\ud83d\ude20',
  'anguished':'\ud83d\ude27',
  'ant':'\ud83d\udc1c',
  'apple':'\ud83c\udf4e',
  'aquarius':'\u2652\ufe0f',
  'aries':'\u2648\ufe0f',
  'arrow_backward':'\u25c0\ufe0f',
  'arrow_double_down':'\u23ec',
  'arrow_double_up':'\u23eb',
  'arrow_down':'\u2b07\ufe0f',
  'arrow_down_small':'\ud83d\udd3d',
  'arrow_forward':'\u25b6\ufe0f',
  'arrow_heading_down':'\u2935\ufe0f',
  'arrow_heading_up':'\u2934\ufe0f',
  'arrow_left':'\u2b05\ufe0f',
  'arrow_lower_left':'\u2199\ufe0f',
  'arrow_lower_right':'\u2198\ufe0f',
  'arrow_right':'\u27a1\ufe0f',
  'arrow_right_hook':'\u21aa\ufe0f',
  'arrow_up':'\u2b06\ufe0f',
  'arrow_up_down':'\u2195\ufe0f',
  'arrow_up_small':'\ud83d\udd3c',
  'arrow_upper_left':'\u2196\ufe0f',
  'arrow_upper_right':'\u2197\ufe0f',
  'arrows_clockwise':'\ud83d\udd03',
  'arrows_counterclockwise':'\ud83d\udd04',
  'art':'\ud83c\udfa8',
  'articulated_lorry':'\ud83d\ude9b',
  'artificial_satellite':'\ud83d\udef0',
  'astonished':'\ud83d\ude32',
  'athletic_shoe':'\ud83d\udc5f',
  'atm':'\ud83c\udfe7',
  'atom_symbol':'\u269b\ufe0f',
  'avocado':'\ud83e\udd51',
  'b':'\ud83c\udd71\ufe0f',
  'baby':'\ud83d\udc76',
  'baby_bottle':'\ud83c\udf7c',
  'baby_chick':'\ud83d\udc24',
  'baby_symbol':'\ud83d\udebc',
  'back':'\ud83d\udd19',
  'bacon':'\ud83e\udd53',
  'badminton':'\ud83c\udff8',
  'baggage_claim':'\ud83d\udec4',
  'baguette_bread':'\ud83e\udd56',
  'balance_scale':'\u2696\ufe0f',
  'balloon':'\ud83c\udf88',
  'ballot_box':'\ud83d\uddf3',
  'ballot_box_with_check':'\u2611\ufe0f',
  'bamboo':'\ud83c\udf8d',
  'banana':'\ud83c\udf4c',
  'bangbang':'\u203c\ufe0f',
  'bank':'\ud83c\udfe6',
  'bar_chart':'\ud83d\udcca',
  'barber':'\ud83d\udc88',
  'baseball':'\u26be\ufe0f',
  'basketball':'\ud83c\udfc0',
  'basketball_man':'\u26f9\ufe0f',
  'basketball_woman':'\u26f9\ufe0f&zwj;\u2640\ufe0f',
  'bat':'\ud83e\udd87',
  'bath':'\ud83d\udec0',
  'bathtub':'\ud83d\udec1',
  'battery':'\ud83d\udd0b',
  'beach_umbrella':'\ud83c\udfd6',
  'bear':'\ud83d\udc3b',
  'bed':'\ud83d\udecf',
  'bee':'\ud83d\udc1d',
  'beer':'\ud83c\udf7a',
  'beers':'\ud83c\udf7b',
  'beetle':'\ud83d\udc1e',
  'beginner':'\ud83d\udd30',
  'bell':'\ud83d\udd14',
  'bellhop_bell':'\ud83d\udece',
  'bento':'\ud83c\udf71',
  'biking_man':'\ud83d\udeb4',
  'bike':'\ud83d\udeb2',
  'biking_woman':'\ud83d\udeb4&zwj;\u2640\ufe0f',
  'bikini':'\ud83d\udc59',
  'biohazard':'\u2623\ufe0f',
  'bird':'\ud83d\udc26',
  'birthday':'\ud83c\udf82',
  'black_circle':'\u26ab\ufe0f',
  'black_flag':'\ud83c\udff4',
  'black_heart':'\ud83d\udda4',
  'black_joker':'\ud83c\udccf',
  'black_large_square':'\u2b1b\ufe0f',
  'black_medium_small_square':'\u25fe\ufe0f',
  'black_medium_square':'\u25fc\ufe0f',
  'black_nib':'\u2712\ufe0f',
  'black_small_square':'\u25aa\ufe0f',
  'black_square_button':'\ud83d\udd32',
  'blonde_man':'\ud83d\udc71',
  'blonde_woman':'\ud83d\udc71&zwj;\u2640\ufe0f',
  'blossom':'\ud83c\udf3c',
  'blowfish':'\ud83d\udc21',
  'blue_book':'\ud83d\udcd8',
  'blue_car':'\ud83d\ude99',
  'blue_heart':'\ud83d\udc99',
  'blush':'\ud83d\ude0a',
  'boar':'\ud83d\udc17',
  'boat':'\u26f5\ufe0f',
  'bomb':'\ud83d\udca3',
  'book':'\ud83d\udcd6',
  'bookmark':'\ud83d\udd16',
  'bookmark_tabs':'\ud83d\udcd1',
  'books':'\ud83d\udcda',
  'boom':'\ud83d\udca5',
  'boot':'\ud83d\udc62',
  'bouquet':'\ud83d\udc90',
  'bowing_man':'\ud83d\ude47',
  'bow_and_arrow':'\ud83c\udff9',
  'bowing_woman':'\ud83d\ude47&zwj;\u2640\ufe0f',
  'bowling':'\ud83c\udfb3',
  'boxing_glove':'\ud83e\udd4a',
  'boy':'\ud83d\udc66',
  'bread':'\ud83c\udf5e',
  'bride_with_veil':'\ud83d\udc70',
  'bridge_at_night':'\ud83c\udf09',
  'briefcase':'\ud83d\udcbc',
  'broken_heart':'\ud83d\udc94',
  'bug':'\ud83d\udc1b',
  'building_construction':'\ud83c\udfd7',
  'bulb':'\ud83d\udca1',
  'bullettrain_front':'\ud83d\ude85',
  'bullettrain_side':'\ud83d\ude84',
  'burrito':'\ud83c\udf2f',
  'bus':'\ud83d\ude8c',
  'business_suit_levitating':'\ud83d\udd74',
  'busstop':'\ud83d\ude8f',
  'bust_in_silhouette':'\ud83d\udc64',
  'busts_in_silhouette':'\ud83d\udc65',
  'butterfly':'\ud83e\udd8b',
  'cactus':'\ud83c\udf35',
  'cake':'\ud83c\udf70',
  'calendar':'\ud83d\udcc6',
  'call_me_hand':'\ud83e\udd19',
  'calling':'\ud83d\udcf2',
  'camel':'\ud83d\udc2b',
  'camera':'\ud83d\udcf7',
  'camera_flash':'\ud83d\udcf8',
  'camping':'\ud83c\udfd5',
  'cancer':'\u264b\ufe0f',
  'candle':'\ud83d\udd6f',
  'candy':'\ud83c\udf6c',
  'canoe':'\ud83d\udef6',
  'capital_abcd':'\ud83d\udd20',
  'capricorn':'\u2651\ufe0f',
  'car':'\ud83d\ude97',
  'card_file_box':'\ud83d\uddc3',
  'card_index':'\ud83d\udcc7',
  'card_index_dividers':'\ud83d\uddc2',
  'carousel_horse':'\ud83c\udfa0',
  'carrot':'\ud83e\udd55',
  'cat':'\ud83d\udc31',
  'cat2':'\ud83d\udc08',
  'cd':'\ud83d\udcbf',
  'chains':'\u26d3',
  'champagne':'\ud83c\udf7e',
  'chart':'\ud83d\udcb9',
  'chart_with_downwards_trend':'\ud83d\udcc9',
  'chart_with_upwards_trend':'\ud83d\udcc8',
  'checkered_flag':'\ud83c\udfc1',
  'cheese':'\ud83e\uddc0',
  'cherries':'\ud83c\udf52',
  'cherry_blossom':'\ud83c\udf38',
  'chestnut':'\ud83c\udf30',
  'chicken':'\ud83d\udc14',
  'children_crossing':'\ud83d\udeb8',
  'chipmunk':'\ud83d\udc3f',
  'chocolate_bar':'\ud83c\udf6b',
  'christmas_tree':'\ud83c\udf84',
  'church':'\u26ea\ufe0f',
  'cinema':'\ud83c\udfa6',
  'circus_tent':'\ud83c\udfaa',
  'city_sunrise':'\ud83c\udf07',
  'city_sunset':'\ud83c\udf06',
  'cityscape':'\ud83c\udfd9',
  'cl':'\ud83c\udd91',
  'clamp':'\ud83d\udddc',
  'clap':'\ud83d\udc4f',
  'clapper':'\ud83c\udfac',
  'classical_building':'\ud83c\udfdb',
  'clinking_glasses':'\ud83e\udd42',
  'clipboard':'\ud83d\udccb',
  'clock1':'\ud83d\udd50',
  'clock10':'\ud83d\udd59',
  'clock1030':'\ud83d\udd65',
  'clock11':'\ud83d\udd5a',
  'clock1130':'\ud83d\udd66',
  'clock12':'\ud83d\udd5b',
  'clock1230':'\ud83d\udd67',
  'clock130':'\ud83d\udd5c',
  'clock2':'\ud83d\udd51',
  'clock230':'\ud83d\udd5d',
  'clock3':'\ud83d\udd52',
  'clock330':'\ud83d\udd5e',
  'clock4':'\ud83d\udd53',
  'clock430':'\ud83d\udd5f',
  'clock5':'\ud83d\udd54',
  'clock530':'\ud83d\udd60',
  'clock6':'\ud83d\udd55',
  'clock630':'\ud83d\udd61',
  'clock7':'\ud83d\udd56',
  'clock730':'\ud83d\udd62',
  'clock8':'\ud83d\udd57',
  'clock830':'\ud83d\udd63',
  'clock9':'\ud83d\udd58',
  'clock930':'\ud83d\udd64',
  'closed_book':'\ud83d\udcd5',
  'closed_lock_with_key':'\ud83d\udd10',
  'closed_umbrella':'\ud83c\udf02',
  'cloud':'\u2601\ufe0f',
  'cloud_with_lightning':'\ud83c\udf29',
  'cloud_with_lightning_and_rain':'\u26c8',
  'cloud_with_rain':'\ud83c\udf27',
  'cloud_with_snow':'\ud83c\udf28',
  'clown_face':'\ud83e\udd21',
  'clubs':'\u2663\ufe0f',
  'cocktail':'\ud83c\udf78',
  'coffee':'\u2615\ufe0f',
  'coffin':'\u26b0\ufe0f',
  'cold_sweat':'\ud83d\ude30',
  'comet':'\u2604\ufe0f',
  'computer':'\ud83d\udcbb',
  'computer_mouse':'\ud83d\uddb1',
  'confetti_ball':'\ud83c\udf8a',
  'confounded':'\ud83d\ude16',
  'confused':'\ud83d\ude15',
  'congratulations':'\u3297\ufe0f',
  'construction':'\ud83d\udea7',
  'construction_worker_man':'\ud83d\udc77',
  'construction_worker_woman':'\ud83d\udc77&zwj;\u2640\ufe0f',
  'control_knobs':'\ud83c\udf9b',
  'convenience_store':'\ud83c\udfea',
  'cookie':'\ud83c\udf6a',
  'cool':'\ud83c\udd92',
  'policeman':'\ud83d\udc6e',
  'copyright':'\u00a9\ufe0f',
  'corn':'\ud83c\udf3d',
  'couch_and_lamp':'\ud83d\udecb',
  'couple':'\ud83d\udc6b',
  'couple_with_heart_woman_man':'\ud83d\udc91',
  'couple_with_heart_man_man':'\ud83d\udc68&zwj;\u2764\ufe0f&zwj;\ud83d\udc68',
  'couple_with_heart_woman_woman':'\ud83d\udc69&zwj;\u2764\ufe0f&zwj;\ud83d\udc69',
  'couplekiss_man_man':'\ud83d\udc68&zwj;\u2764\ufe0f&zwj;\ud83d\udc8b&zwj;\ud83d\udc68',
  'couplekiss_man_woman':'\ud83d\udc8f',
  'couplekiss_woman_woman':'\ud83d\udc69&zwj;\u2764\ufe0f&zwj;\ud83d\udc8b&zwj;\ud83d\udc69',
  'cow':'\ud83d\udc2e',
  'cow2':'\ud83d\udc04',
  'cowboy_hat_face':'\ud83e\udd20',
  'crab':'\ud83e\udd80',
  'crayon':'\ud83d\udd8d',
  'credit_card':'\ud83d\udcb3',
  'crescent_moon':'\ud83c\udf19',
  'cricket':'\ud83c\udfcf',
  'crocodile':'\ud83d\udc0a',
  'croissant':'\ud83e\udd50',
  'crossed_fingers':'\ud83e\udd1e',
  'crossed_flags':'\ud83c\udf8c',
  'crossed_swords':'\u2694\ufe0f',
  'crown':'\ud83d\udc51',
  'cry':'\ud83d\ude22',
  'crying_cat_face':'\ud83d\ude3f',
  'crystal_ball':'\ud83d\udd2e',
  'cucumber':'\ud83e\udd52',
  'cupid':'\ud83d\udc98',
  'curly_loop':'\u27b0',
  'currency_exchange':'\ud83d\udcb1',
  'curry':'\ud83c\udf5b',
  'custard':'\ud83c\udf6e',
  'customs':'\ud83d\udec3',
  'cyclone':'\ud83c\udf00',
  'dagger':'\ud83d\udde1',
  'dancer':'\ud83d\udc83',
  'dancing_women':'\ud83d\udc6f',
  'dancing_men':'\ud83d\udc6f&zwj;\u2642\ufe0f',
  'dango':'\ud83c\udf61',
  'dark_sunglasses':'\ud83d\udd76',
  'dart':'\ud83c\udfaf',
  'dash':'\ud83d\udca8',
  'date':'\ud83d\udcc5',
  'deciduous_tree':'\ud83c\udf33',
  'deer':'\ud83e\udd8c',
  'department_store':'\ud83c\udfec',
  'derelict_house':'\ud83c\udfda',
  'desert':'\ud83c\udfdc',
  'desert_island':'\ud83c\udfdd',
  'desktop_computer':'\ud83d\udda5',
  'male_detective':'\ud83d\udd75\ufe0f',
  'diamond_shape_with_a_dot_inside':'\ud83d\udca0',
  'diamonds':'\u2666\ufe0f',
  'disappointed':'\ud83d\ude1e',
  'disappointed_relieved':'\ud83d\ude25',
  'dizzy':'\ud83d\udcab',
  'dizzy_face':'\ud83d\ude35',
  'do_not_litter':'\ud83d\udeaf',
  'dog':'\ud83d\udc36',
  'dog2':'\ud83d\udc15',
  'dollar':'\ud83d\udcb5',
  'dolls':'\ud83c\udf8e',
  'dolphin':'\ud83d\udc2c',
  'door':'\ud83d\udeaa',
  'doughnut':'\ud83c\udf69',
  'dove':'\ud83d\udd4a',
  'dragon':'\ud83d\udc09',
  'dragon_face':'\ud83d\udc32',
  'dress':'\ud83d\udc57',
  'dromedary_camel':'\ud83d\udc2a',
  'drooling_face':'\ud83e\udd24',
  'droplet':'\ud83d\udca7',
  'drum':'\ud83e\udd41',
  'duck':'\ud83e\udd86',
  'dvd':'\ud83d\udcc0',
  'e-mail':'\ud83d\udce7',
  'eagle':'\ud83e\udd85',
  'ear':'\ud83d\udc42',
  'ear_of_rice':'\ud83c\udf3e',
  'earth_africa':'\ud83c\udf0d',
  'earth_americas':'\ud83c\udf0e',
  'earth_asia':'\ud83c\udf0f',
  'egg':'\ud83e\udd5a',
  'eggplant':'\ud83c\udf46',
  'eight_pointed_black_star':'\u2734\ufe0f',
  'eight_spoked_asterisk':'\u2733\ufe0f',
  'electric_plug':'\ud83d\udd0c',
  'elephant':'\ud83d\udc18',
  'email':'\u2709\ufe0f',
  'end':'\ud83d\udd1a',
  'envelope_with_arrow':'\ud83d\udce9',
  'euro':'\ud83d\udcb6',
  'european_castle':'\ud83c\udff0',
  'european_post_office':'\ud83c\udfe4',
  'evergreen_tree':'\ud83c\udf32',
  'exclamation':'\u2757\ufe0f',
  'expressionless':'\ud83d\ude11',
  'eye':'\ud83d\udc41',
  'eye_speech_bubble':'\ud83d\udc41&zwj;\ud83d\udde8',
  'eyeglasses':'\ud83d\udc53',
  'eyes':'\ud83d\udc40',
  'face_with_head_bandage':'\ud83e\udd15',
  'face_with_thermometer':'\ud83e\udd12',
  'fist_oncoming':'\ud83d\udc4a',
  'factory':'\ud83c\udfed',
  'fallen_leaf':'\ud83c\udf42',
  'family_man_woman_boy':'\ud83d\udc6a',
  'family_man_boy':'\ud83d\udc68&zwj;\ud83d\udc66',
  'family_man_boy_boy':'\ud83d\udc68&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
  'family_man_girl':'\ud83d\udc68&zwj;\ud83d\udc67',
  'family_man_girl_boy':'\ud83d\udc68&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
  'family_man_girl_girl':'\ud83d\udc68&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
  'family_man_man_boy':'\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc66',
  'family_man_man_boy_boy':'\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
  'family_man_man_girl':'\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc67',
  'family_man_man_girl_boy':'\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
  'family_man_man_girl_girl':'\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
  'family_man_woman_boy_boy':'\ud83d\udc68&zwj;\ud83d\udc69&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
  'family_man_woman_girl':'\ud83d\udc68&zwj;\ud83d\udc69&zwj;\ud83d\udc67',
  'family_man_woman_girl_boy':'\ud83d\udc68&zwj;\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
  'family_man_woman_girl_girl':'\ud83d\udc68&zwj;\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
  'family_woman_boy':'\ud83d\udc69&zwj;\ud83d\udc66',
  'family_woman_boy_boy':'\ud83d\udc69&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
  'family_woman_girl':'\ud83d\udc69&zwj;\ud83d\udc67',
  'family_woman_girl_boy':'\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
  'family_woman_girl_girl':'\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
  'family_woman_woman_boy':'\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc66',
  'family_woman_woman_boy_boy':'\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
  'family_woman_woman_girl':'\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc67',
  'family_woman_woman_girl_boy':'\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
  'family_woman_woman_girl_girl':'\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
  'fast_forward':'\u23e9',
  'fax':'\ud83d\udce0',
  'fearful':'\ud83d\ude28',
  'feet':'\ud83d\udc3e',
  'female_detective':'\ud83d\udd75\ufe0f&zwj;\u2640\ufe0f',
  'ferris_wheel':'\ud83c\udfa1',
  'ferry':'\u26f4',
  'field_hockey':'\ud83c\udfd1',
  'file_cabinet':'\ud83d\uddc4',
  'file_folder':'\ud83d\udcc1',
  'film_projector':'\ud83d\udcfd',
  'film_strip':'\ud83c\udf9e',
  'fire':'\ud83d\udd25',
  'fire_engine':'\ud83d\ude92',
  'fireworks':'\ud83c\udf86',
  'first_quarter_moon':'\ud83c\udf13',
  'first_quarter_moon_with_face':'\ud83c\udf1b',
  'fish':'\ud83d\udc1f',
  'fish_cake':'\ud83c\udf65',
  'fishing_pole_and_fish':'\ud83c\udfa3',
  'fist_raised':'\u270a',
  'fist_left':'\ud83e\udd1b',
  'fist_right':'\ud83e\udd1c',
  'flags':'\ud83c\udf8f',
  'flashlight':'\ud83d\udd26',
  'fleur_de_lis':'\u269c\ufe0f',
  'flight_arrival':'\ud83d\udeec',
  'flight_departure':'\ud83d\udeeb',
  'floppy_disk':'\ud83d\udcbe',
  'flower_playing_cards':'\ud83c\udfb4',
  'flushed':'\ud83d\ude33',
  'fog':'\ud83c\udf2b',
  'foggy':'\ud83c\udf01',
  'football':'\ud83c\udfc8',
  'footprints':'\ud83d\udc63',
  'fork_and_knife':'\ud83c\udf74',
  'fountain':'\u26f2\ufe0f',
  'fountain_pen':'\ud83d\udd8b',
  'four_leaf_clover':'\ud83c\udf40',
  'fox_face':'\ud83e\udd8a',
  'framed_picture':'\ud83d\uddbc',
  'free':'\ud83c\udd93',
  'fried_egg':'\ud83c\udf73',
  'fried_shrimp':'\ud83c\udf64',
  'fries':'\ud83c\udf5f',
  'frog':'\ud83d\udc38',
  'frowning':'\ud83d\ude26',
  'frowning_face':'\u2639\ufe0f',
  'frowning_man':'\ud83d\ude4d&zwj;\u2642\ufe0f',
  'frowning_woman':'\ud83d\ude4d',
  'middle_finger':'\ud83d\udd95',
  'fuelpump':'\u26fd\ufe0f',
  'full_moon':'\ud83c\udf15',
  'full_moon_with_face':'\ud83c\udf1d',
  'funeral_urn':'\u26b1\ufe0f',
  'game_die':'\ud83c\udfb2',
  'gear':'\u2699\ufe0f',
  'gem':'\ud83d\udc8e',
  'gemini':'\u264a\ufe0f',
  'ghost':'\ud83d\udc7b',
  'gift':'\ud83c\udf81',
  'gift_heart':'\ud83d\udc9d',
  'girl':'\ud83d\udc67',
  'globe_with_meridians':'\ud83c\udf10',
  'goal_net':'\ud83e\udd45',
  'goat':'\ud83d\udc10',
  'golf':'\u26f3\ufe0f',
  'golfing_man':'\ud83c\udfcc\ufe0f',
  'golfing_woman':'\ud83c\udfcc\ufe0f&zwj;\u2640\ufe0f',
  'gorilla':'\ud83e\udd8d',
  'grapes':'\ud83c\udf47',
  'green_apple':'\ud83c\udf4f',
  'green_book':'\ud83d\udcd7',
  'green_heart':'\ud83d\udc9a',
  'green_salad':'\ud83e\udd57',
  'grey_exclamation':'\u2755',
  'grey_question':'\u2754',
  'grimacing':'\ud83d\ude2c',
  'grin':'\ud83d\ude01',
  'grinning':'\ud83d\ude00',
  'guardsman':'\ud83d\udc82',
  'guardswoman':'\ud83d\udc82&zwj;\u2640\ufe0f',
  'guitar':'\ud83c\udfb8',
  'gun':'\ud83d\udd2b',
  'haircut_woman':'\ud83d\udc87',
  'haircut_man':'\ud83d\udc87&zwj;\u2642\ufe0f',
  'hamburger':'\ud83c\udf54',
  'hammer':'\ud83d\udd28',
  'hammer_and_pick':'\u2692',
  'hammer_and_wrench':'\ud83d\udee0',
  'hamster':'\ud83d\udc39',
  'hand':'\u270b',
  'handbag':'\ud83d\udc5c',
  'handshake':'\ud83e\udd1d',
  'hankey':'\ud83d\udca9',
  'hatched_chick':'\ud83d\udc25',
  'hatching_chick':'\ud83d\udc23',
  'headphones':'\ud83c\udfa7',
  'hear_no_evil':'\ud83d\ude49',
  'heart':'\u2764\ufe0f',
  'heart_decoration':'\ud83d\udc9f',
  'heart_eyes':'\ud83d\ude0d',
  'heart_eyes_cat':'\ud83d\ude3b',
  'heartbeat':'\ud83d\udc93',
  'heartpulse':'\ud83d\udc97',
  'hearts':'\u2665\ufe0f',
  'heavy_check_mark':'\u2714\ufe0f',
  'heavy_division_sign':'\u2797',
  'heavy_dollar_sign':'\ud83d\udcb2',
  'heavy_heart_exclamation':'\u2763\ufe0f',
  'heavy_minus_sign':'\u2796',
  'heavy_multiplication_x':'\u2716\ufe0f',
  'heavy_plus_sign':'\u2795',
  'helicopter':'\ud83d\ude81',
  'herb':'\ud83c\udf3f',
  'hibiscus':'\ud83c\udf3a',
  'high_brightness':'\ud83d\udd06',
  'high_heel':'\ud83d\udc60',
  'hocho':'\ud83d\udd2a',
  'hole':'\ud83d\udd73',
  'honey_pot':'\ud83c\udf6f',
  'horse':'\ud83d\udc34',
  'horse_racing':'\ud83c\udfc7',
  'hospital':'\ud83c\udfe5',
  'hot_pepper':'\ud83c\udf36',
  'hotdog':'\ud83c\udf2d',
  'hotel':'\ud83c\udfe8',
  'hotsprings':'\u2668\ufe0f',
  'hourglass':'\u231b\ufe0f',
  'hourglass_flowing_sand':'\u23f3',
  'house':'\ud83c\udfe0',
  'house_with_garden':'\ud83c\udfe1',
  'houses':'\ud83c\udfd8',
  'hugs':'\ud83e\udd17',
  'hushed':'\ud83d\ude2f',
  'ice_cream':'\ud83c\udf68',
  'ice_hockey':'\ud83c\udfd2',
  'ice_skate':'\u26f8',
  'icecream':'\ud83c\udf66',
  'id':'\ud83c\udd94',
  'ideograph_advantage':'\ud83c\ude50',
  'imp':'\ud83d\udc7f',
  'inbox_tray':'\ud83d\udce5',
  'incoming_envelope':'\ud83d\udce8',
  'tipping_hand_woman':'\ud83d\udc81',
  'information_source':'\u2139\ufe0f',
  'innocent':'\ud83d\ude07',
  'interrobang':'\u2049\ufe0f',
  'iphone':'\ud83d\udcf1',
  'izakaya_lantern':'\ud83c\udfee',
  'jack_o_lantern':'\ud83c\udf83',
  'japan':'\ud83d\uddfe',
  'japanese_castle':'\ud83c\udfef',
  'japanese_goblin':'\ud83d\udc7a',
  'japanese_ogre':'\ud83d\udc79',
  'jeans':'\ud83d\udc56',
  'joy':'\ud83d\ude02',
  'joy_cat':'\ud83d\ude39',
  'joystick':'\ud83d\udd79',
  'kaaba':'\ud83d\udd4b',
  'key':'\ud83d\udd11',
  'keyboard':'\u2328\ufe0f',
  'keycap_ten':'\ud83d\udd1f',
  'kick_scooter':'\ud83d\udef4',
  'kimono':'\ud83d\udc58',
  'kiss':'\ud83d\udc8b',
  'kissing':'\ud83d\ude17',
  'kissing_cat':'\ud83d\ude3d',
  'kissing_closed_eyes':'\ud83d\ude1a',
  'kissing_heart':'\ud83d\ude18',
  'kissing_smiling_eyes':'\ud83d\ude19',
  'kiwi_fruit':'\ud83e\udd5d',
  'koala':'\ud83d\udc28',
  'koko':'\ud83c\ude01',
  'label':'\ud83c\udff7',
  'large_blue_circle':'\ud83d\udd35',
  'large_blue_diamond':'\ud83d\udd37',
  'large_orange_diamond':'\ud83d\udd36',
  'last_quarter_moon':'\ud83c\udf17',
  'last_quarter_moon_with_face':'\ud83c\udf1c',
  'latin_cross':'\u271d\ufe0f',
  'laughing':'\ud83d\ude06',
  'leaves':'\ud83c\udf43',
  'ledger':'\ud83d\udcd2',
  'left_luggage':'\ud83d\udec5',
  'left_right_arrow':'\u2194\ufe0f',
  'leftwards_arrow_with_hook':'\u21a9\ufe0f',
  'lemon':'\ud83c\udf4b',
  'leo':'\u264c\ufe0f',
  'leopard':'\ud83d\udc06',
  'level_slider':'\ud83c\udf9a',
  'libra':'\u264e\ufe0f',
  'light_rail':'\ud83d\ude88',
  'link':'\ud83d\udd17',
  'lion':'\ud83e\udd81',
  'lips':'\ud83d\udc44',
  'lipstick':'\ud83d\udc84',
  'lizard':'\ud83e\udd8e',
  'lock':'\ud83d\udd12',
  'lock_with_ink_pen':'\ud83d\udd0f',
  'lollipop':'\ud83c\udf6d',
  'loop':'\u27bf',
  'loud_sound':'\ud83d\udd0a',
  'loudspeaker':'\ud83d\udce2',
  'love_hotel':'\ud83c\udfe9',
  'love_letter':'\ud83d\udc8c',
  'low_brightness':'\ud83d\udd05',
  'lying_face':'\ud83e\udd25',
  'm':'\u24c2\ufe0f',
  'mag':'\ud83d\udd0d',
  'mag_right':'\ud83d\udd0e',
  'mahjong':'\ud83c\udc04\ufe0f',
  'mailbox':'\ud83d\udceb',
  'mailbox_closed':'\ud83d\udcea',
  'mailbox_with_mail':'\ud83d\udcec',
  'mailbox_with_no_mail':'\ud83d\udced',
  'man':'\ud83d\udc68',
  'man_artist':'\ud83d\udc68&zwj;\ud83c\udfa8',
  'man_astronaut':'\ud83d\udc68&zwj;\ud83d\ude80',
  'man_cartwheeling':'\ud83e\udd38&zwj;\u2642\ufe0f',
  'man_cook':'\ud83d\udc68&zwj;\ud83c\udf73',
  'man_dancing':'\ud83d\udd7a',
  'man_facepalming':'\ud83e\udd26&zwj;\u2642\ufe0f',
  'man_factory_worker':'\ud83d\udc68&zwj;\ud83c\udfed',
  'man_farmer':'\ud83d\udc68&zwj;\ud83c\udf3e',
  'man_firefighter':'\ud83d\udc68&zwj;\ud83d\ude92',
  'man_health_worker':'\ud83d\udc68&zwj;\u2695\ufe0f',
  'man_in_tuxedo':'\ud83e\udd35',
  'man_judge':'\ud83d\udc68&zwj;\u2696\ufe0f',
  'man_juggling':'\ud83e\udd39&zwj;\u2642\ufe0f',
  'man_mechanic':'\ud83d\udc68&zwj;\ud83d\udd27',
  'man_office_worker':'\ud83d\udc68&zwj;\ud83d\udcbc',
  'man_pilot':'\ud83d\udc68&zwj;\u2708\ufe0f',
  'man_playing_handball':'\ud83e\udd3e&zwj;\u2642\ufe0f',
  'man_playing_water_polo':'\ud83e\udd3d&zwj;\u2642\ufe0f',
  'man_scientist':'\ud83d\udc68&zwj;\ud83d\udd2c',
  'man_shrugging':'\ud83e\udd37&zwj;\u2642\ufe0f',
  'man_singer':'\ud83d\udc68&zwj;\ud83c\udfa4',
  'man_student':'\ud83d\udc68&zwj;\ud83c\udf93',
  'man_teacher':'\ud83d\udc68&zwj;\ud83c\udfeb',
  'man_technologist':'\ud83d\udc68&zwj;\ud83d\udcbb',
  'man_with_gua_pi_mao':'\ud83d\udc72',
  'man_with_turban':'\ud83d\udc73',
  'tangerine':'\ud83c\udf4a',
  'mans_shoe':'\ud83d\udc5e',
  'mantelpiece_clock':'\ud83d\udd70',
  'maple_leaf':'\ud83c\udf41',
  'martial_arts_uniform':'\ud83e\udd4b',
  'mask':'\ud83d\ude37',
  'massage_woman':'\ud83d\udc86',
  'massage_man':'\ud83d\udc86&zwj;\u2642\ufe0f',
  'meat_on_bone':'\ud83c\udf56',
  'medal_military':'\ud83c\udf96',
  'medal_sports':'\ud83c\udfc5',
  'mega':'\ud83d\udce3',
  'melon':'\ud83c\udf48',
  'memo':'\ud83d\udcdd',
  'men_wrestling':'\ud83e\udd3c&zwj;\u2642\ufe0f',
  'menorah':'\ud83d\udd4e',
  'mens':'\ud83d\udeb9',
  'metal':'\ud83e\udd18',
  'metro':'\ud83d\ude87',
  'microphone':'\ud83c\udfa4',
  'microscope':'\ud83d\udd2c',
  'milk_glass':'\ud83e\udd5b',
  'milky_way':'\ud83c\udf0c',
  'minibus':'\ud83d\ude90',
  'minidisc':'\ud83d\udcbd',
  'mobile_phone_off':'\ud83d\udcf4',
  'money_mouth_face':'\ud83e\udd11',
  'money_with_wings':'\ud83d\udcb8',
  'moneybag':'\ud83d\udcb0',
  'monkey':'\ud83d\udc12',
  'monkey_face':'\ud83d\udc35',
  'monorail':'\ud83d\ude9d',
  'moon':'\ud83c\udf14',
  'mortar_board':'\ud83c\udf93',
  'mosque':'\ud83d\udd4c',
  'motor_boat':'\ud83d\udee5',
  'motor_scooter':'\ud83d\udef5',
  'motorcycle':'\ud83c\udfcd',
  'motorway':'\ud83d\udee3',
  'mount_fuji':'\ud83d\uddfb',
  'mountain':'\u26f0',
  'mountain_biking_man':'\ud83d\udeb5',
  'mountain_biking_woman':'\ud83d\udeb5&zwj;\u2640\ufe0f',
  'mountain_cableway':'\ud83d\udea0',
  'mountain_railway':'\ud83d\ude9e',
  'mountain_snow':'\ud83c\udfd4',
  'mouse':'\ud83d\udc2d',
  'mouse2':'\ud83d\udc01',
  'movie_camera':'\ud83c\udfa5',
  'moyai':'\ud83d\uddff',
  'mrs_claus':'\ud83e\udd36',
  'muscle':'\ud83d\udcaa',
  'mushroom':'\ud83c\udf44',
  'musical_keyboard':'\ud83c\udfb9',
  'musical_note':'\ud83c\udfb5',
  'musical_score':'\ud83c\udfbc',
  'mute':'\ud83d\udd07',
  'nail_care':'\ud83d\udc85',
  'name_badge':'\ud83d\udcdb',
  'national_park':'\ud83c\udfde',
  'nauseated_face':'\ud83e\udd22',
  'necktie':'\ud83d\udc54',
  'negative_squared_cross_mark':'\u274e',
  'nerd_face':'\ud83e\udd13',
  'neutral_face':'\ud83d\ude10',
  'new':'\ud83c\udd95',
  'new_moon':'\ud83c\udf11',
  'new_moon_with_face':'\ud83c\udf1a',
  'newspaper':'\ud83d\udcf0',
  'newspaper_roll':'\ud83d\uddde',
  'next_track_button':'\u23ed',
  'ng':'\ud83c\udd96',
  'no_good_man':'\ud83d\ude45&zwj;\u2642\ufe0f',
  'no_good_woman':'\ud83d\ude45',
  'night_with_stars':'\ud83c\udf03',
  'no_bell':'\ud83d\udd15',
  'no_bicycles':'\ud83d\udeb3',
  'no_entry':'\u26d4\ufe0f',
  'no_entry_sign':'\ud83d\udeab',
  'no_mobile_phones':'\ud83d\udcf5',
  'no_mouth':'\ud83d\ude36',
  'no_pedestrians':'\ud83d\udeb7',
  'no_smoking':'\ud83d\udead',
  'non-potable_water':'\ud83d\udeb1',
  'nose':'\ud83d\udc43',
  'notebook':'\ud83d\udcd3',
  'notebook_with_decorative_cover':'\ud83d\udcd4',
  'notes':'\ud83c\udfb6',
  'nut_and_bolt':'\ud83d\udd29',
  'o':'\u2b55\ufe0f',
  'o2':'\ud83c\udd7e\ufe0f',
  'ocean':'\ud83c\udf0a',
  'octopus':'\ud83d\udc19',
  'oden':'\ud83c\udf62',
  'office':'\ud83c\udfe2',
  'oil_drum':'\ud83d\udee2',
  'ok':'\ud83c\udd97',
  'ok_hand':'\ud83d\udc4c',
  'ok_man':'\ud83d\ude46&zwj;\u2642\ufe0f',
  'ok_woman':'\ud83d\ude46',
  'old_key':'\ud83d\udddd',
  'older_man':'\ud83d\udc74',
  'older_woman':'\ud83d\udc75',
  'om':'\ud83d\udd49',
  'on':'\ud83d\udd1b',
  'oncoming_automobile':'\ud83d\ude98',
  'oncoming_bus':'\ud83d\ude8d',
  'oncoming_police_car':'\ud83d\ude94',
  'oncoming_taxi':'\ud83d\ude96',
  'open_file_folder':'\ud83d\udcc2',
  'open_hands':'\ud83d\udc50',
  'open_mouth':'\ud83d\ude2e',
  'open_umbrella':'\u2602\ufe0f',
  'ophiuchus':'\u26ce',
  'orange_book':'\ud83d\udcd9',
  'orthodox_cross':'\u2626\ufe0f',
  'outbox_tray':'\ud83d\udce4',
  'owl':'\ud83e\udd89',
  'ox':'\ud83d\udc02',
  'package':'\ud83d\udce6',
  'page_facing_up':'\ud83d\udcc4',
  'page_with_curl':'\ud83d\udcc3',
  'pager':'\ud83d\udcdf',
  'paintbrush':'\ud83d\udd8c',
  'palm_tree':'\ud83c\udf34',
  'pancakes':'\ud83e\udd5e',
  'panda_face':'\ud83d\udc3c',
  'paperclip':'\ud83d\udcce',
  'paperclips':'\ud83d\udd87',
  'parasol_on_ground':'\u26f1',
  'parking':'\ud83c\udd7f\ufe0f',
  'part_alternation_mark':'\u303d\ufe0f',
  'partly_sunny':'\u26c5\ufe0f',
  'passenger_ship':'\ud83d\udef3',
  'passport_control':'\ud83d\udec2',
  'pause_button':'\u23f8',
  'peace_symbol':'\u262e\ufe0f',
  'peach':'\ud83c\udf51',
  'peanuts':'\ud83e\udd5c',
  'pear':'\ud83c\udf50',
  'pen':'\ud83d\udd8a',
  'pencil2':'\u270f\ufe0f',
  'penguin':'\ud83d\udc27',
  'pensive':'\ud83d\ude14',
  'performing_arts':'\ud83c\udfad',
  'persevere':'\ud83d\ude23',
  'person_fencing':'\ud83e\udd3a',
  'pouting_woman':'\ud83d\ude4e',
  'phone':'\u260e\ufe0f',
  'pick':'\u26cf',
  'pig':'\ud83d\udc37',
  'pig2':'\ud83d\udc16',
  'pig_nose':'\ud83d\udc3d',
  'pill':'\ud83d\udc8a',
  'pineapple':'\ud83c\udf4d',
  'ping_pong':'\ud83c\udfd3',
  'pisces':'\u2653\ufe0f',
  'pizza':'\ud83c\udf55',
  'place_of_worship':'\ud83d\uded0',
  'plate_with_cutlery':'\ud83c\udf7d',
  'play_or_pause_button':'\u23ef',
  'point_down':'\ud83d\udc47',
  'point_left':'\ud83d\udc48',
  'point_right':'\ud83d\udc49',
  'point_up':'\u261d\ufe0f',
  'point_up_2':'\ud83d\udc46',
  'police_car':'\ud83d\ude93',
  'policewoman':'\ud83d\udc6e&zwj;\u2640\ufe0f',
  'poodle':'\ud83d\udc29',
  'popcorn':'\ud83c\udf7f',
  'post_office':'\ud83c\udfe3',
  'postal_horn':'\ud83d\udcef',
  'postbox':'\ud83d\udcee',
  'potable_water':'\ud83d\udeb0',
  'potato':'\ud83e\udd54',
  'pouch':'\ud83d\udc5d',
  'poultry_leg':'\ud83c\udf57',
  'pound':'\ud83d\udcb7',
  'rage':'\ud83d\ude21',
  'pouting_cat':'\ud83d\ude3e',
  'pouting_man':'\ud83d\ude4e&zwj;\u2642\ufe0f',
  'pray':'\ud83d\ude4f',
  'prayer_beads':'\ud83d\udcff',
  'pregnant_woman':'\ud83e\udd30',
  'previous_track_button':'\u23ee',
  'prince':'\ud83e\udd34',
  'princess':'\ud83d\udc78',
  'printer':'\ud83d\udda8',
  'purple_heart':'\ud83d\udc9c',
  'purse':'\ud83d\udc5b',
  'pushpin':'\ud83d\udccc',
  'put_litter_in_its_place':'\ud83d\udeae',
  'question':'\u2753',
  'rabbit':'\ud83d\udc30',
  'rabbit2':'\ud83d\udc07',
  'racehorse':'\ud83d\udc0e',
  'racing_car':'\ud83c\udfce',
  'radio':'\ud83d\udcfb',
  'radio_button':'\ud83d\udd18',
  'radioactive':'\u2622\ufe0f',
  'railway_car':'\ud83d\ude83',
  'railway_track':'\ud83d\udee4',
  'rainbow':'\ud83c\udf08',
  'rainbow_flag':'\ud83c\udff3\ufe0f&zwj;\ud83c\udf08',
  'raised_back_of_hand':'\ud83e\udd1a',
  'raised_hand_with_fingers_splayed':'\ud83d\udd90',
  'raised_hands':'\ud83d\ude4c',
  'raising_hand_woman':'\ud83d\ude4b',
  'raising_hand_man':'\ud83d\ude4b&zwj;\u2642\ufe0f',
  'ram':'\ud83d\udc0f',
  'ramen':'\ud83c\udf5c',
  'rat':'\ud83d\udc00',
  'record_button':'\u23fa',
  'recycle':'\u267b\ufe0f',
  'red_circle':'\ud83d\udd34',
  'registered':'\u00ae\ufe0f',
  'relaxed':'\u263a\ufe0f',
  'relieved':'\ud83d\ude0c',
  'reminder_ribbon':'\ud83c\udf97',
  'repeat':'\ud83d\udd01',
  'repeat_one':'\ud83d\udd02',
  'rescue_worker_helmet':'\u26d1',
  'restroom':'\ud83d\udebb',
  'revolving_hearts':'\ud83d\udc9e',
  'rewind':'\u23ea',
  'rhinoceros':'\ud83e\udd8f',
  'ribbon':'\ud83c\udf80',
  'rice':'\ud83c\udf5a',
  'rice_ball':'\ud83c\udf59',
  'rice_cracker':'\ud83c\udf58',
  'rice_scene':'\ud83c\udf91',
  'right_anger_bubble':'\ud83d\uddef',
  'ring':'\ud83d\udc8d',
  'robot':'\ud83e\udd16',
  'rocket':'\ud83d\ude80',
  'rofl':'\ud83e\udd23',
  'roll_eyes':'\ud83d\ude44',
  'roller_coaster':'\ud83c\udfa2',
  'rooster':'\ud83d\udc13',
  'rose':'\ud83c\udf39',
  'rosette':'\ud83c\udff5',
  'rotating_light':'\ud83d\udea8',
  'round_pushpin':'\ud83d\udccd',
  'rowing_man':'\ud83d\udea3',
  'rowing_woman':'\ud83d\udea3&zwj;\u2640\ufe0f',
  'rugby_football':'\ud83c\udfc9',
  'running_man':'\ud83c\udfc3',
  'running_shirt_with_sash':'\ud83c\udfbd',
  'running_woman':'\ud83c\udfc3&zwj;\u2640\ufe0f',
  'sa':'\ud83c\ude02\ufe0f',
  'sagittarius':'\u2650\ufe0f',
  'sake':'\ud83c\udf76',
  'sandal':'\ud83d\udc61',
  'santa':'\ud83c\udf85',
  'satellite':'\ud83d\udce1',
  'saxophone':'\ud83c\udfb7',
  'school':'\ud83c\udfeb',
  'school_satchel':'\ud83c\udf92',
  'scissors':'\u2702\ufe0f',
  'scorpion':'\ud83e\udd82',
  'scorpius':'\u264f\ufe0f',
  'scream':'\ud83d\ude31',
  'scream_cat':'\ud83d\ude40',
  'scroll':'\ud83d\udcdc',
  'seat':'\ud83d\udcba',
  'secret':'\u3299\ufe0f',
  'see_no_evil':'\ud83d\ude48',
  'seedling':'\ud83c\udf31',
  'selfie':'\ud83e\udd33',
  'shallow_pan_of_food':'\ud83e\udd58',
  'shamrock':'\u2618\ufe0f',
  'shark':'\ud83e\udd88',
  'shaved_ice':'\ud83c\udf67',
  'sheep':'\ud83d\udc11',
  'shell':'\ud83d\udc1a',
  'shield':'\ud83d\udee1',
  'shinto_shrine':'\u26e9',
  'ship':'\ud83d\udea2',
  'shirt':'\ud83d\udc55',
  'shopping':'\ud83d\udecd',
  'shopping_cart':'\ud83d\uded2',
  'shower':'\ud83d\udebf',
  'shrimp':'\ud83e\udd90',
  'signal_strength':'\ud83d\udcf6',
  'six_pointed_star':'\ud83d\udd2f',
  'ski':'\ud83c\udfbf',
  'skier':'\u26f7',
  'skull':'\ud83d\udc80',
  'skull_and_crossbones':'\u2620\ufe0f',
  'sleeping':'\ud83d\ude34',
  'sleeping_bed':'\ud83d\udecc',
  'sleepy':'\ud83d\ude2a',
  'slightly_frowning_face':'\ud83d\ude41',
  'slightly_smiling_face':'\ud83d\ude42',
  'slot_machine':'\ud83c\udfb0',
  'small_airplane':'\ud83d\udee9',
  'small_blue_diamond':'\ud83d\udd39',
  'small_orange_diamond':'\ud83d\udd38',
  'small_red_triangle':'\ud83d\udd3a',
  'small_red_triangle_down':'\ud83d\udd3b',
  'smile':'\ud83d\ude04',
  'smile_cat':'\ud83d\ude38',
  'smiley':'\ud83d\ude03',
  'smiley_cat':'\ud83d\ude3a',
  'smiling_imp':'\ud83d\ude08',
  'smirk':'\ud83d\ude0f',
  'smirk_cat':'\ud83d\ude3c',
  'smoking':'\ud83d\udeac',
  'snail':'\ud83d\udc0c',
  'snake':'\ud83d\udc0d',
  'sneezing_face':'\ud83e\udd27',
  'snowboarder':'\ud83c\udfc2',
  'snowflake':'\u2744\ufe0f',
  'snowman':'\u26c4\ufe0f',
  'snowman_with_snow':'\u2603\ufe0f',
  'sob':'\ud83d\ude2d',
  'soccer':'\u26bd\ufe0f',
  'soon':'\ud83d\udd1c',
  'sos':'\ud83c\udd98',
  'sound':'\ud83d\udd09',
  'space_invader':'\ud83d\udc7e',
  'spades':'\u2660\ufe0f',
  'spaghetti':'\ud83c\udf5d',
  'sparkle':'\u2747\ufe0f',
  'sparkler':'\ud83c\udf87',
  'sparkles':'\u2728',
  'sparkling_heart':'\ud83d\udc96',
  'speak_no_evil':'\ud83d\ude4a',
  'speaker':'\ud83d\udd08',
  'speaking_head':'\ud83d\udde3',
  'speech_balloon':'\ud83d\udcac',
  'speedboat':'\ud83d\udea4',
  'spider':'\ud83d\udd77',
  'spider_web':'\ud83d\udd78',
  'spiral_calendar':'\ud83d\uddd3',
  'spiral_notepad':'\ud83d\uddd2',
  'spoon':'\ud83e\udd44',
  'squid':'\ud83e\udd91',
  'stadium':'\ud83c\udfdf',
  'star':'\u2b50\ufe0f',
  'star2':'\ud83c\udf1f',
  'star_and_crescent':'\u262a\ufe0f',
  'star_of_david':'\u2721\ufe0f',
  'stars':'\ud83c\udf20',
  'station':'\ud83d\ude89',
  'statue_of_liberty':'\ud83d\uddfd',
  'steam_locomotive':'\ud83d\ude82',
  'stew':'\ud83c\udf72',
  'stop_button':'\u23f9',
  'stop_sign':'\ud83d\uded1',
  'stopwatch':'\u23f1',
  'straight_ruler':'\ud83d\udccf',
  'strawberry':'\ud83c\udf53',
  'stuck_out_tongue':'\ud83d\ude1b',
  'stuck_out_tongue_closed_eyes':'\ud83d\ude1d',
  'stuck_out_tongue_winking_eye':'\ud83d\ude1c',
  'studio_microphone':'\ud83c\udf99',
  'stuffed_flatbread':'\ud83e\udd59',
  'sun_behind_large_cloud':'\ud83c\udf25',
  'sun_behind_rain_cloud':'\ud83c\udf26',
  'sun_behind_small_cloud':'\ud83c\udf24',
  'sun_with_face':'\ud83c\udf1e',
  'sunflower':'\ud83c\udf3b',
  'sunglasses':'\ud83d\ude0e',
  'sunny':'\u2600\ufe0f',
  'sunrise':'\ud83c\udf05',
  'sunrise_over_mountains':'\ud83c\udf04',
  'surfing_man':'\ud83c\udfc4',
  'surfing_woman':'\ud83c\udfc4&zwj;\u2640\ufe0f',
  'sushi':'\ud83c\udf63',
  'suspension_railway':'\ud83d\ude9f',
  'sweat':'\ud83d\ude13',
  'sweat_drops':'\ud83d\udca6',
  'sweat_smile':'\ud83d\ude05',
  'sweet_potato':'\ud83c\udf60',
  'swimming_man':'\ud83c\udfca',
  'swimming_woman':'\ud83c\udfca&zwj;\u2640\ufe0f',
  'symbols':'\ud83d\udd23',
  'synagogue':'\ud83d\udd4d',
  'syringe':'\ud83d\udc89',
  'taco':'\ud83c\udf2e',
  'tada':'\ud83c\udf89',
  'tanabata_tree':'\ud83c\udf8b',
  'taurus':'\u2649\ufe0f',
  'taxi':'\ud83d\ude95',
  'tea':'\ud83c\udf75',
  'telephone_receiver':'\ud83d\udcde',
  'telescope':'\ud83d\udd2d',
  'tennis':'\ud83c\udfbe',
  'tent':'\u26fa\ufe0f',
  'thermometer':'\ud83c\udf21',
  'thinking':'\ud83e\udd14',
  'thought_balloon':'\ud83d\udcad',
  'ticket':'\ud83c\udfab',
  'tickets':'\ud83c\udf9f',
  'tiger':'\ud83d\udc2f',
  'tiger2':'\ud83d\udc05',
  'timer_clock':'\u23f2',
  'tipping_hand_man':'\ud83d\udc81&zwj;\u2642\ufe0f',
  'tired_face':'\ud83d\ude2b',
  'tm':'\u2122\ufe0f',
  'toilet':'\ud83d\udebd',
  'tokyo_tower':'\ud83d\uddfc',
  'tomato':'\ud83c\udf45',
  'tongue':'\ud83d\udc45',
  'top':'\ud83d\udd1d',
  'tophat':'\ud83c\udfa9',
  'tornado':'\ud83c\udf2a',
  'trackball':'\ud83d\uddb2',
  'tractor':'\ud83d\ude9c',
  'traffic_light':'\ud83d\udea5',
  'train':'\ud83d\ude8b',
  'train2':'\ud83d\ude86',
  'tram':'\ud83d\ude8a',
  'triangular_flag_on_post':'\ud83d\udea9',
  'triangular_ruler':'\ud83d\udcd0',
  'trident':'\ud83d\udd31',
  'triumph':'\ud83d\ude24',
  'trolleybus':'\ud83d\ude8e',
  'trophy':'\ud83c\udfc6',
  'tropical_drink':'\ud83c\udf79',
  'tropical_fish':'\ud83d\udc20',
  'truck':'\ud83d\ude9a',
  'trumpet':'\ud83c\udfba',
  'tulip':'\ud83c\udf37',
  'tumbler_glass':'\ud83e\udd43',
  'turkey':'\ud83e\udd83',
  'turtle':'\ud83d\udc22',
  'tv':'\ud83d\udcfa',
  'twisted_rightwards_arrows':'\ud83d\udd00',
  'two_hearts':'\ud83d\udc95',
  'two_men_holding_hands':'\ud83d\udc6c',
  'two_women_holding_hands':'\ud83d\udc6d',
  'u5272':'\ud83c\ude39',
  'u5408':'\ud83c\ude34',
  'u55b6':'\ud83c\ude3a',
  'u6307':'\ud83c\ude2f\ufe0f',
  'u6708':'\ud83c\ude37\ufe0f',
  'u6709':'\ud83c\ude36',
  'u6e80':'\ud83c\ude35',
  'u7121':'\ud83c\ude1a\ufe0f',
  'u7533':'\ud83c\ude38',
  'u7981':'\ud83c\ude32',
  'u7a7a':'\ud83c\ude33',
  'umbrella':'\u2614\ufe0f',
  'unamused':'\ud83d\ude12',
  'underage':'\ud83d\udd1e',
  'unicorn':'\ud83e\udd84',
  'unlock':'\ud83d\udd13',
  'up':'\ud83c\udd99',
  'upside_down_face':'\ud83d\ude43',
  'v':'\u270c\ufe0f',
  'vertical_traffic_light':'\ud83d\udea6',
  'vhs':'\ud83d\udcfc',
  'vibration_mode':'\ud83d\udcf3',
  'video_camera':'\ud83d\udcf9',
  'video_game':'\ud83c\udfae',
  'violin':'\ud83c\udfbb',
  'virgo':'\u264d\ufe0f',
  'volcano':'\ud83c\udf0b',
  'volleyball':'\ud83c\udfd0',
  'vs':'\ud83c\udd9a',
  'vulcan_salute':'\ud83d\udd96',
  'walking_man':'\ud83d\udeb6',
  'walking_woman':'\ud83d\udeb6&zwj;\u2640\ufe0f',
  'waning_crescent_moon':'\ud83c\udf18',
  'waning_gibbous_moon':'\ud83c\udf16',
  'warning':'\u26a0\ufe0f',
  'wastebasket':'\ud83d\uddd1',
  'watch':'\u231a\ufe0f',
  'water_buffalo':'\ud83d\udc03',
  'watermelon':'\ud83c\udf49',
  'wave':'\ud83d\udc4b',
  'wavy_dash':'\u3030\ufe0f',
  'waxing_crescent_moon':'\ud83c\udf12',
  'wc':'\ud83d\udebe',
  'weary':'\ud83d\ude29',
  'wedding':'\ud83d\udc92',
  'weight_lifting_man':'\ud83c\udfcb\ufe0f',
  'weight_lifting_woman':'\ud83c\udfcb\ufe0f&zwj;\u2640\ufe0f',
  'whale':'\ud83d\udc33',
  'whale2':'\ud83d\udc0b',
  'wheel_of_dharma':'\u2638\ufe0f',
  'wheelchair':'\u267f\ufe0f',
  'white_check_mark':'\u2705',
  'white_circle':'\u26aa\ufe0f',
  'white_flag':'\ud83c\udff3\ufe0f',
  'white_flower':'\ud83d\udcae',
  'white_large_square':'\u2b1c\ufe0f',
  'white_medium_small_square':'\u25fd\ufe0f',
  'white_medium_square':'\u25fb\ufe0f',
  'white_small_square':'\u25ab\ufe0f',
  'white_square_button':'\ud83d\udd33',
  'wilted_flower':'\ud83e\udd40',
  'wind_chime':'\ud83c\udf90',
  'wind_face':'\ud83c\udf2c',
  'wine_glass':'\ud83c\udf77',
  'wink':'\ud83d\ude09',
  'wolf':'\ud83d\udc3a',
  'woman':'\ud83d\udc69',
  'woman_artist':'\ud83d\udc69&zwj;\ud83c\udfa8',
  'woman_astronaut':'\ud83d\udc69&zwj;\ud83d\ude80',
  'woman_cartwheeling':'\ud83e\udd38&zwj;\u2640\ufe0f',
  'woman_cook':'\ud83d\udc69&zwj;\ud83c\udf73',
  'woman_facepalming':'\ud83e\udd26&zwj;\u2640\ufe0f',
  'woman_factory_worker':'\ud83d\udc69&zwj;\ud83c\udfed',
  'woman_farmer':'\ud83d\udc69&zwj;\ud83c\udf3e',
  'woman_firefighter':'\ud83d\udc69&zwj;\ud83d\ude92',
  'woman_health_worker':'\ud83d\udc69&zwj;\u2695\ufe0f',
  'woman_judge':'\ud83d\udc69&zwj;\u2696\ufe0f',
  'woman_juggling':'\ud83e\udd39&zwj;\u2640\ufe0f',
  'woman_mechanic':'\ud83d\udc69&zwj;\ud83d\udd27',
  'woman_office_worker':'\ud83d\udc69&zwj;\ud83d\udcbc',
  'woman_pilot':'\ud83d\udc69&zwj;\u2708\ufe0f',
  'woman_playing_handball':'\ud83e\udd3e&zwj;\u2640\ufe0f',
  'woman_playing_water_polo':'\ud83e\udd3d&zwj;\u2640\ufe0f',
  'woman_scientist':'\ud83d\udc69&zwj;\ud83d\udd2c',
  'woman_shrugging':'\ud83e\udd37&zwj;\u2640\ufe0f',
  'woman_singer':'\ud83d\udc69&zwj;\ud83c\udfa4',
  'woman_student':'\ud83d\udc69&zwj;\ud83c\udf93',
  'woman_teacher':'\ud83d\udc69&zwj;\ud83c\udfeb',
  'woman_technologist':'\ud83d\udc69&zwj;\ud83d\udcbb',
  'woman_with_turban':'\ud83d\udc73&zwj;\u2640\ufe0f',
  'womans_clothes':'\ud83d\udc5a',
  'womans_hat':'\ud83d\udc52',
  'women_wrestling':'\ud83e\udd3c&zwj;\u2640\ufe0f',
  'womens':'\ud83d\udeba',
  'world_map':'\ud83d\uddfa',
  'worried':'\ud83d\ude1f',
  'wrench':'\ud83d\udd27',
  'writing_hand':'\u270d\ufe0f',
  'x':'\u274c',
  'yellow_heart':'\ud83d\udc9b',
  'yen':'\ud83d\udcb4',
  'yin_yang':'\u262f\ufe0f',
  'yum':'\ud83d\ude0b',
  'zap':'\u26a1\ufe0f',
  'zipper_mouth_face':'\ud83e\udd10',
  'zzz':'\ud83d\udca4',

  /* special emojis :P */
  'octocat':  '<img alt=":octocat:" height="20" width="20" align="absmiddle" src="https://assets-cdn.github.com/images/icons/emoji/octocat.png">',
  'showdown': '<span style="font-family: \'Anonymous Pro\', monospace; text-decoration: underline; text-decoration-style: dashed; text-decoration-color: #3e8b8a;text-underline-position: under;">S</span>'
};

/**
 * Created by Estevao on 31-05-2015.
 */

/**
 * Showdown Converter class
 * @class
 * @param {object} [converterOptions]
 * @returns {Converter}
 */
showdown.Converter = function (converterOptions) {
  'use strict';

  var
      /**
       * Options used by this converter
       * @private
       * @type {{}}
       */
      options = {},

      /**
       * Language extensions used by this converter
       * @private
       * @type {Array}
       */
      langExtensions = [],

      /**
       * Output modifiers extensions used by this converter
       * @private
       * @type {Array}
       */
      outputModifiers = [],

      /**
       * Event listeners
       * @private
       * @type {{}}
       */
      listeners = {},

      /**
       * The flavor set in this converter
       */
      setConvFlavor = setFlavor,

      /**
       * Metadata of the document
       * @type {{parsed: {}, raw: string, format: string}}
       */
      metadata = {
        parsed: {},
        raw: '',
        format: ''
      };

  _constructor();

  /**
   * Converter constructor
   * @private
   */
  function _constructor () {
    converterOptions = converterOptions || {};

    for (var gOpt in globalOptions) {
      if (globalOptions.hasOwnProperty(gOpt)) {
        options[gOpt] = globalOptions[gOpt];
      }
    }

    // Merge options
    if (typeof converterOptions === 'object') {
      for (var opt in converterOptions) {
        if (converterOptions.hasOwnProperty(opt)) {
          options[opt] = converterOptions[opt];
        }
      }
    } else {
      throw Error('Converter expects the passed parameter to be an object, but ' + typeof converterOptions +
      ' was passed instead.');
    }

    if (options.extensions) {
      showdown.helper.forEach(options.extensions, _parseExtension);
    }
  }

  /**
   * Parse extension
   * @param {*} ext
   * @param {string} [name='']
   * @private
   */
  function _parseExtension (ext, name) {

    name = name || null;
    // If it's a string, the extension was previously loaded
    if (showdown.helper.isString(ext)) {
      ext = showdown.helper.stdExtName(ext);
      name = ext;

      // LEGACY_SUPPORT CODE
      if (showdown.extensions[ext]) {
        console.warn('DEPRECATION WARNING: ' + ext + ' is an old extension that uses a deprecated loading method.' +
          'Please inform the developer that the extension should be updated!');
        legacyExtensionLoading(showdown.extensions[ext], ext);
        return;
        // END LEGACY SUPPORT CODE

      } else if (!showdown.helper.isUndefined(extensions[ext])) {
        ext = extensions[ext];

      } else {
        throw Error('Extension "' + ext + '" could not be loaded. It was either not found or is not a valid extension.');
      }
    }

    if (typeof ext === 'function') {
      ext = ext();
    }

    if (!showdown.helper.isArray(ext)) {
      ext = [ext];
    }

    var validExt = validate(ext, name);
    if (!validExt.valid) {
      throw Error(validExt.error);
    }

    for (var i = 0; i < ext.length; ++i) {
      switch (ext[i].type) {

        case 'lang':
          langExtensions.push(ext[i]);
          break;

        case 'output':
          outputModifiers.push(ext[i]);
          break;
      }
      if (ext[i].hasOwnProperty('listeners')) {
        for (var ln in ext[i].listeners) {
          if (ext[i].listeners.hasOwnProperty(ln)) {
            listen(ln, ext[i].listeners[ln]);
          }
        }
      }
    }

  }

  /**
   * LEGACY_SUPPORT
   * @param {*} ext
   * @param {string} name
   */
  function legacyExtensionLoading (ext, name) {
    if (typeof ext === 'function') {
      ext = ext(new showdown.Converter());
    }
    if (!showdown.helper.isArray(ext)) {
      ext = [ext];
    }
    var valid = validate(ext, name);

    if (!valid.valid) {
      throw Error(valid.error);
    }

    for (var i = 0; i < ext.length; ++i) {
      switch (ext[i].type) {
        case 'lang':
          langExtensions.push(ext[i]);
          break;
        case 'output':
          outputModifiers.push(ext[i]);
          break;
        default:// should never reach here
          throw Error('Extension loader error: Type unrecognized!!!');
      }
    }
  }

  /**
   * Listen to an event
   * @param {string} name
   * @param {function} callback
   */
  function listen (name, callback) {
    if (!showdown.helper.isString(name)) {
      throw Error('Invalid argument in converter.listen() method: name must be a string, but ' + typeof name + ' given');
    }

    if (typeof callback !== 'function') {
      throw Error('Invalid argument in converter.listen() method: callback must be a function, but ' + typeof callback + ' given');
    }

    if (!listeners.hasOwnProperty(name)) {
      listeners[name] = [];
    }
    listeners[name].push(callback);
  }

  function rTrimInputText (text) {
    var rsp = text.match(/^\s*/)[0].length,
        rgx = new RegExp('^\\s{0,' + rsp + '}', 'gm');
    return text.replace(rgx, '');
  }

  /**
   * Dispatch an event
   * @private
   * @param {string} evtName Event name
   * @param {string} text Text
   * @param {{}} options Converter Options
   * @param {{}} globals
   * @returns {string}
   */
  this._dispatch = function dispatch (evtName, text, options, globals) {
    if (listeners.hasOwnProperty(evtName)) {
      for (var ei = 0; ei < listeners[evtName].length; ++ei) {
        var nText = listeners[evtName][ei](evtName, text, this, options, globals);
        if (nText && typeof nText !== 'undefined') {
          text = nText;
        }
      }
    }
    return text;
  };

  /**
   * Listen to an event
   * @param {string} name
   * @param {function} callback
   * @returns {showdown.Converter}
   */
  this.listen = function (name, callback) {
    listen(name, callback);
    return this;
  };

  /**
   * Converts a markdown string into HTML
   * @param {string} text
   * @returns {*}
   */
  this.makeHtml = function (text) {
    //check if text is not falsy
    if (!text) {
      return text;
    }

    var globals = {
      gHtmlBlocks:     [],
      gHtmlMdBlocks:   [],
      gHtmlSpans:      [],
      gUrls:           {},
      gTitles:         {},
      gDimensions:     {},
      gListLevel:      0,
      hashLinkCounts:  {},
      langExtensions:  langExtensions,
      outputModifiers: outputModifiers,
      converter:       this,
      ghCodeBlocks:    [],
      metadata: {
        parsed: {},
        raw: '',
        format: ''
      }
    };

    // This lets us use ¨ trema as an escape char to avoid md5 hashes
    // The choice of character is arbitrary; anything that isn't
    // magic in Markdown will work.
    text = text.replace(/¨/g, '¨T');

    // Replace $ with ¨D
    // RegExp interprets $ as a special character
    // when it's in a replacement string
    text = text.replace(/\$/g, '¨D');

    // Standardize line endings
    text = text.replace(/\r\n/g, '\n'); // DOS to Unix
    text = text.replace(/\r/g, '\n'); // Mac to Unix

    // Stardardize line spaces
    text = text.replace(/\u00A0/g, '&nbsp;');

    if (options.smartIndentationFix) {
      text = rTrimInputText(text);
    }

    // Make sure text begins and ends with a couple of newlines:
    text = '\n\n' + text + '\n\n';

    // detab
    text = showdown.subParser('detab')(text, options, globals);

    /**
     * Strip any lines consisting only of spaces and tabs.
     * This makes subsequent regexs easier to write, because we can
     * match consecutive blank lines with /\n+/ instead of something
     * contorted like /[ \t]*\n+/
     */
    text = text.replace(/^[ \t]+$/mg, '');

    //run languageExtensions
    showdown.helper.forEach(langExtensions, function (ext) {
      text = showdown.subParser('runExtension')(ext, text, options, globals);
    });

    // run the sub parsers
    text = showdown.subParser('metadata')(text, options, globals);
    text = showdown.subParser('hashPreCodeTags')(text, options, globals);
    text = showdown.subParser('githubCodeBlocks')(text, options, globals);
    text = showdown.subParser('hashHTMLBlocks')(text, options, globals);
    text = showdown.subParser('hashCodeTags')(text, options, globals);
    text = showdown.subParser('stripLinkDefinitions')(text, options, globals);
    text = showdown.subParser('blockGamut')(text, options, globals);
    text = showdown.subParser('unhashHTMLSpans')(text, options, globals);
    text = showdown.subParser('unescapeSpecialChars')(text, options, globals);

    // attacklab: Restore dollar signs
    text = text.replace(/¨D/g, '$$');

    // attacklab: Restore tremas
    text = text.replace(/¨T/g, '¨');

    // render a complete html document instead of a partial if the option is enabled
    text = showdown.subParser('completeHTMLDocument')(text, options, globals);

    // Run output modifiers
    showdown.helper.forEach(outputModifiers, function (ext) {
      text = showdown.subParser('runExtension')(ext, text, options, globals);
    });

    // update metadata
    metadata = globals.metadata;
    return text;
  };

  /**
   * Converts an HTML string into a markdown string
   * @param src
   * @param [HTMLParser] A WHATWG DOM and HTML parser, such as JSDOM. If none is supplied, window.document will be used.
   * @returns {string}
   */
  this.makeMarkdown = this.makeMd = function (src, HTMLParser) {

    // replace \r\n with \n
    src = src.replace(/\r\n/g, '\n');
    src = src.replace(/\r/g, '\n'); // old macs

    // due to an edge case, we need to find this: > <
    // to prevent removing of non silent white spaces
    // ex: <em>this is</em> <strong>sparta</strong>
    src = src.replace(/>[ \t]+</, '>¨NBSP;<');

    if (!HTMLParser) {
      if (window && window.document) {
        HTMLParser = window.document;
      } else {
        throw new Error('HTMLParser is undefined. If in a webworker or nodejs environment, you need to provide a WHATWG DOM and HTML such as JSDOM');
      }
    }

    var doc = HTMLParser.createElement('div');
    doc.innerHTML = src;

    var globals = {
      preList: substitutePreCodeTags(doc)
    };

    // remove all newlines and collapse spaces
    clean(doc);

    // some stuff, like accidental reference links must now be escaped
    // TODO
    // doc.innerHTML = doc.innerHTML.replace(/\[[\S\t ]]/);

    var nodes = doc.childNodes,
        mdDoc = '';

    for (var i = 0; i < nodes.length; i++) {
      mdDoc += showdown.subParser('makeMarkdown.node')(nodes[i], globals);
    }

    function clean (node) {
      for (var n = 0; n < node.childNodes.length; ++n) {
        var child = node.childNodes[n];
        if (child.nodeType === 3) {
          if (!/\S/.test(child.nodeValue)) {
            node.removeChild(child);
            --n;
          } else {
            child.nodeValue = child.nodeValue.split('\n').join(' ');
            child.nodeValue = child.nodeValue.replace(/(\s)+/g, '$1');
          }
        } else if (child.nodeType === 1) {
          clean(child);
        }
      }
    }

    // find all pre tags and replace contents with placeholder
    // we need this so that we can remove all indentation from html
    // to ease up parsing
    function substitutePreCodeTags (doc) {

      var pres = doc.querySelectorAll('pre'),
          presPH = [];

      for (var i = 0; i < pres.length; ++i) {

        if (pres[i].childElementCount === 1 && pres[i].firstChild.tagName.toLowerCase() === 'code') {
          var content = pres[i].firstChild.innerHTML.trim(),
              language = pres[i].firstChild.getAttribute('data-language') || '';

          // if data-language attribute is not defined, then we look for class language-*
          if (language === '') {
            var classes = pres[i].firstChild.className.split(' ');
            for (var c = 0; c < classes.length; ++c) {
              var matches = classes[c].match(/^language-(.+)$/);
              if (matches !== null) {
                language = matches[1];
                break;
              }
            }
          }

          // unescape html entities in content
          content = showdown.helper.unescapeHTMLEntities(content);

          presPH.push(content);
          pres[i].outerHTML = '<precode language="' + language + '" precodenum="' + i.toString() + '"></precode>';
        } else {
          presPH.push(pres[i].innerHTML);
          pres[i].innerHTML = '';
          pres[i].setAttribute('prenum', i.toString());
        }
      }
      return presPH;
    }

    return mdDoc;
  };

  /**
   * Set an option of this Converter instance
   * @param {string} key
   * @param {*} value
   */
  this.setOption = function (key, value) {
    options[key] = value;
  };

  /**
   * Get the option of this Converter instance
   * @param {string} key
   * @returns {*}
   */
  this.getOption = function (key) {
    return options[key];
  };

  /**
   * Get the options of this Converter instance
   * @returns {{}}
   */
  this.getOptions = function () {
    return options;
  };

  /**
   * Add extension to THIS converter
   * @param {{}} extension
   * @param {string} [name=null]
   */
  this.addExtension = function (extension, name) {
    name = name || null;
    _parseExtension(extension, name);
  };

  /**
   * Use a global registered extension with THIS converter
   * @param {string} extensionName Name of the previously registered extension
   */
  this.useExtension = function (extensionName) {
    _parseExtension(extensionName);
  };

  /**
   * Set the flavor THIS converter should use
   * @param {string} name
   */
  this.setFlavor = function (name) {
    if (!flavor.hasOwnProperty(name)) {
      throw Error(name + ' flavor was not found');
    }
    var preset = flavor[name];
    setConvFlavor = name;
    for (var option in preset) {
      if (preset.hasOwnProperty(option)) {
        options[option] = preset[option];
      }
    }
  };

  /**
   * Get the currently set flavor of this converter
   * @returns {string}
   */
  this.getFlavor = function () {
    return setConvFlavor;
  };

  /**
   * Remove an extension from THIS converter.
   * Note: This is a costly operation. It's better to initialize a new converter
   * and specify the extensions you wish to use
   * @param {Array} extension
   */
  this.removeExtension = function (extension) {
    if (!showdown.helper.isArray(extension)) {
      extension = [extension];
    }
    for (var a = 0; a < extension.length; ++a) {
      var ext = extension[a];
      for (var i = 0; i < langExtensions.length; ++i) {
        if (langExtensions[i] === ext) {
          langExtensions[i].splice(i, 1);
        }
      }
      for (var ii = 0; ii < outputModifiers.length; ++i) {
        if (outputModifiers[ii] === ext) {
          outputModifiers[ii].splice(i, 1);
        }
      }
    }
  };

  /**
   * Get all extension of THIS converter
   * @returns {{language: Array, output: Array}}
   */
  this.getAllExtensions = function () {
    return {
      language: langExtensions,
      output: outputModifiers
    };
  };

  /**
   * Get the metadata of the previously parsed document
   * @param raw
   * @returns {string|{}}
   */
  this.getMetadata = function (raw) {
    if (raw) {
      return metadata.raw;
    } else {
      return metadata.parsed;
    }
  };

  /**
   * Get the metadata format of the previously parsed document
   * @returns {string}
   */
  this.getMetadataFormat = function () {
    return metadata.format;
  };

  /**
   * Private: set a single key, value metadata pair
   * @param {string} key
   * @param {string} value
   */
  this._setMetadataPair = function (key, value) {
    metadata.parsed[key] = value;
  };

  /**
   * Private: set metadata format
   * @param {string} format
   */
  this._setMetadataFormat = function (format) {
    metadata.format = format;
  };

  /**
   * Private: set metadata raw text
   * @param {string} raw
   */
  this._setMetadataRaw = function (raw) {
    metadata.raw = raw;
  };
};

/**
 * Turn Markdown link shortcuts into XHTML <a> tags.
 */
showdown.subParser('anchors', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('anchors.before', text, options, globals);

  var writeAnchorTag = function (wholeMatch, linkText, linkId, url, m5, m6, title) {
    if (showdown.helper.isUndefined(title)) {
      title = '';
    }
    linkId = linkId.toLowerCase();

    // Special case for explicit empty url
    if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
      url = '';
    } else if (!url) {
      if (!linkId) {
        // lower-case and turn embedded newlines into spaces
        linkId = linkText.toLowerCase().replace(/ ?\n/g, ' ');
      }
      url = '#' + linkId;

      if (!showdown.helper.isUndefined(globals.gUrls[linkId])) {
        url = globals.gUrls[linkId];
        if (!showdown.helper.isUndefined(globals.gTitles[linkId])) {
          title = globals.gTitles[linkId];
        }
      } else {
        return wholeMatch;
      }
    }

    //url = showdown.helper.escapeCharacters(url, '*_', false); // replaced line to improve performance
    url = url.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);

    var result = '<a href="' + url + '"';

    if (title !== '' && title !== null) {
      title = title.replace(/"/g, '&quot;');
      //title = showdown.helper.escapeCharacters(title, '*_', false); // replaced line to improve performance
      title = title.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
      result += ' title="' + title + '"';
    }

    // optionLinksInNewWindow only applies
    // to external links. Hash links (#) open in same page
    if (options.openLinksInNewWindow && !/^#/.test(url)) {
      // escaped _
      result += ' rel="noopener noreferrer" target="¨E95Eblank"';
    }

    result += '>' + linkText + '</a>';

    return result;
  };

  // First, handle reference-style links: [link text] [id]
  text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)] ?(?:\n *)?\[(.*?)]()()()()/g, writeAnchorTag);

  // Next, inline-style links: [link text](url "optional title")
  // cases with crazy urls like ./image/cat1).png
  text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<([^>]*)>(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,
    writeAnchorTag);

  // normal cases
  text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,
    writeAnchorTag);

  // handle reference-style shortcuts: [link text]
  // These must come last in case you've also got [link test][1]
  // or [link test](/foo)
  text = text.replace(/\[([^\[\]]+)]()()()()()/g, writeAnchorTag);

  // Lastly handle GithubMentions if option is enabled
  if (options.ghMentions) {
    text = text.replace(/(^|\s)(\\)?(@([a-z\d]+(?:[a-z\d.-]+?[a-z\d]+)*))/gmi, function (wm, st, escape, mentions, username) {
      if (escape === '\\') {
        return st + mentions;
      }

      //check if options.ghMentionsLink is a string
      if (!showdown.helper.isString(options.ghMentionsLink)) {
        throw new Error('ghMentionsLink option must be a string');
      }
      var lnk = options.ghMentionsLink.replace(/\{u}/g, username),
          target = '';
      if (options.openLinksInNewWindow) {
        target = ' rel="noopener noreferrer" target="¨E95Eblank"';
      }
      return st + '<a href="' + lnk + '"' + target + '>' + mentions + '</a>';
    });
  }

  text = globals.converter._dispatch('anchors.after', text, options, globals);
  return text;
});

// url allowed chars [a-z\d_.~:/?#[]@!$&'()*+,;=-]

var simpleURLRegex  = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+?\.[^'">\s]+?)()(\1)?(?=\s|$)(?!["<>])/gi,
    simpleURLRegex2 = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?,()\[\]])?(\1)?(?=\s|$)(?!["<>])/gi,
    delimUrlRegex   = /()<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)()>()/gi,
    simpleMailRegex = /(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gmi,
    delimMailRegex  = /<()(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,

    replaceLink = function (options) {
      'use strict';
      return function (wm, leadingMagicChars, link, m2, m3, trailingPunctuation, trailingMagicChars) {
        link = link.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
        var lnkTxt = link,
            append = '',
            target = '',
            lmc    = leadingMagicChars || '',
            tmc    = trailingMagicChars || '';
        if (/^www\./i.test(link)) {
          link = link.replace(/^www\./i, 'http://www.');
        }
        if (options.excludeTrailingPunctuationFromURLs && trailingPunctuation) {
          append = trailingPunctuation;
        }
        if (options.openLinksInNewWindow) {
          target = ' rel="noopener noreferrer" target="¨E95Eblank"';
        }
        return lmc + '<a href="' + link + '"' + target + '>' + lnkTxt + '</a>' + append + tmc;
      };
    },

    replaceMail = function (options, globals) {
      'use strict';
      return function (wholeMatch, b, mail) {
        var href = 'mailto:';
        b = b || '';
        mail = showdown.subParser('unescapeSpecialChars')(mail, options, globals);
        if (options.encodeEmails) {
          href = showdown.helper.encodeEmailAddress(href + mail);
          mail = showdown.helper.encodeEmailAddress(mail);
        } else {
          href = href + mail;
        }
        return b + '<a href="' + href + '">' + mail + '</a>';
      };
    };

showdown.subParser('autoLinks', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('autoLinks.before', text, options, globals);

  text = text.replace(delimUrlRegex, replaceLink(options));
  text = text.replace(delimMailRegex, replaceMail(options, globals));

  text = globals.converter._dispatch('autoLinks.after', text, options, globals);

  return text;
});

showdown.subParser('simplifiedAutoLinks', function (text, options, globals) {
  'use strict';

  if (!options.simplifiedAutoLink) {
    return text;
  }

  text = globals.converter._dispatch('simplifiedAutoLinks.before', text, options, globals);

  if (options.excludeTrailingPunctuationFromURLs) {
    text = text.replace(simpleURLRegex2, replaceLink(options));
  } else {
    text = text.replace(simpleURLRegex, replaceLink(options));
  }
  text = text.replace(simpleMailRegex, replaceMail(options, globals));

  text = globals.converter._dispatch('simplifiedAutoLinks.after', text, options, globals);

  return text;
});

/**
 * These are all the transformations that form block-level
 * tags like paragraphs, headers, and list items.
 */
showdown.subParser('blockGamut', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('blockGamut.before', text, options, globals);

  // we parse blockquotes first so that we can have headings and hrs
  // inside blockquotes
  text = showdown.subParser('blockQuotes')(text, options, globals);
  text = showdown.subParser('headers')(text, options, globals);

  // Do Horizontal Rules:
  text = showdown.subParser('horizontalRule')(text, options, globals);

  text = showdown.subParser('lists')(text, options, globals);
  text = showdown.subParser('codeBlocks')(text, options, globals);
  text = showdown.subParser('tables')(text, options, globals);

  // We already ran _HashHTMLBlocks() before, in Markdown(), but that
  // was to escape raw HTML in the original Markdown source. This time,
  // we're escaping the markup we've just created, so that we don't wrap
  // <p> tags around block-level tags.
  text = showdown.subParser('hashHTMLBlocks')(text, options, globals);
  text = showdown.subParser('paragraphs')(text, options, globals);

  text = globals.converter._dispatch('blockGamut.after', text, options, globals);

  return text;
});

showdown.subParser('blockQuotes', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('blockQuotes.before', text, options, globals);

  // add a couple extra lines after the text and endtext mark
  text = text + '\n\n';

  var rgx = /(^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+/gm;

  if (options.splitAdjacentBlockquotes) {
    rgx = /^ {0,3}>[\s\S]*?(?:\n\n)/gm;
  }

  text = text.replace(rgx, function (bq) {
    // attacklab: hack around Konqueror 3.5.4 bug:
    // "----------bug".replace(/^-/g,"") == "bug"
    bq = bq.replace(/^[ \t]*>[ \t]?/gm, ''); // trim one level of quoting

    // attacklab: clean up hack
    bq = bq.replace(/¨0/g, '');

    bq = bq.replace(/^[ \t]+$/gm, ''); // trim whitespace-only lines
    bq = showdown.subParser('githubCodeBlocks')(bq, options, globals);
    bq = showdown.subParser('blockGamut')(bq, options, globals); // recurse

    bq = bq.replace(/(^|\n)/g, '$1  ');
    // These leading spaces screw with <pre> content, so we need to fix that:
    bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function (wholeMatch, m1) {
      var pre = m1;
      // attacklab: hack around Konqueror 3.5.4 bug:
      pre = pre.replace(/^  /mg, '¨0');
      pre = pre.replace(/¨0/g, '');
      return pre;
    });

    return showdown.subParser('hashBlock')('<blockquote>\n' + bq + '\n</blockquote>', options, globals);
  });

  text = globals.converter._dispatch('blockQuotes.after', text, options, globals);
  return text;
});

/**
 * Process Markdown `<pre><code>` blocks.
 */
showdown.subParser('codeBlocks', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('codeBlocks.before', text, options, globals);

  // sentinel workarounds for lack of \A and \Z, safari\khtml bug
  text += '¨0';

  var pattern = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g;
  text = text.replace(pattern, function (wholeMatch, m1, m2) {
    var codeblock = m1,
        nextChar = m2,
        end = '\n';

    codeblock = showdown.subParser('outdent')(codeblock, options, globals);
    codeblock = showdown.subParser('encodeCode')(codeblock, options, globals);
    codeblock = showdown.subParser('detab')(codeblock, options, globals);
    codeblock = codeblock.replace(/^\n+/g, ''); // trim leading newlines
    codeblock = codeblock.replace(/\n+$/g, ''); // trim trailing newlines

    if (options.omitExtraWLInCodeBlocks) {
      end = '';
    }

    codeblock = '<pre><code>' + codeblock + end + '</code></pre>';

    return showdown.subParser('hashBlock')(codeblock, options, globals) + nextChar;
  });

  // strip sentinel
  text = text.replace(/¨0/, '');

  text = globals.converter._dispatch('codeBlocks.after', text, options, globals);
  return text;
});

/**
 *
 *   *  Backtick quotes are used for <code></code> spans.
 *
 *   *  You can use multiple backticks as the delimiters if you want to
 *     include literal backticks in the code span. So, this input:
 *
 *         Just type ``foo `bar` baz`` at the prompt.
 *
 *       Will translate to:
 *
 *         <p>Just type <code>foo `bar` baz</code> at the prompt.</p>
 *
 *    There's no arbitrary limit to the number of backticks you
 *    can use as delimters. If you need three consecutive backticks
 *    in your code, use four for delimiters, etc.
 *
 *  *  You can use spaces to get literal backticks at the edges:
 *
 *         ... type `` `bar` `` ...
 *
 *       Turns to:
 *
 *         ... type <code>`bar`</code> ...
 */
showdown.subParser('codeSpans', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('codeSpans.before', text, options, globals);

  if (typeof text === 'undefined') {
    text = '';
  }
  text = text.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,
    function (wholeMatch, m1, m2, m3) {
      var c = m3;
      c = c.replace(/^([ \t]*)/g, '');	// leading whitespace
      c = c.replace(/[ \t]*$/g, '');	// trailing whitespace
      c = showdown.subParser('encodeCode')(c, options, globals);
      c = m1 + '<code>' + c + '</code>';
      c = showdown.subParser('hashHTMLSpans')(c, options, globals);
      return c;
    }
  );

  text = globals.converter._dispatch('codeSpans.after', text, options, globals);
  return text;
});

/**
 * Create a full HTML document from the processed markdown
 */
showdown.subParser('completeHTMLDocument', function (text, options, globals) {
  'use strict';

  if (!options.completeHTMLDocument) {
    return text;
  }

  text = globals.converter._dispatch('completeHTMLDocument.before', text, options, globals);

  var doctype = 'html',
      doctypeParsed = '<!DOCTYPE HTML>\n',
      title = '',
      charset = '<meta charset="utf-8">\n',
      lang = '',
      metadata = '';

  if (typeof globals.metadata.parsed.doctype !== 'undefined') {
    doctypeParsed = '<!DOCTYPE ' +  globals.metadata.parsed.doctype + '>\n';
    doctype = globals.metadata.parsed.doctype.toString().toLowerCase();
    if (doctype === 'html' || doctype === 'html5') {
      charset = '<meta charset="utf-8">';
    }
  }

  for (var meta in globals.metadata.parsed) {
    if (globals.metadata.parsed.hasOwnProperty(meta)) {
      switch (meta.toLowerCase()) {
        case 'doctype':
          break;

        case 'title':
          title = '<title>' +  globals.metadata.parsed.title + '</title>\n';
          break;

        case 'charset':
          if (doctype === 'html' || doctype === 'html5') {
            charset = '<meta charset="' + globals.metadata.parsed.charset + '">\n';
          } else {
            charset = '<meta name="charset" content="' + globals.metadata.parsed.charset + '">\n';
          }
          break;

        case 'language':
        case 'lang':
          lang = ' lang="' + globals.metadata.parsed[meta] + '"';
          metadata += '<meta name="' + meta + '" content="' + globals.metadata.parsed[meta] + '">\n';
          break;

        default:
          metadata += '<meta name="' + meta + '" content="' + globals.metadata.parsed[meta] + '">\n';
      }
    }
  }

  text = doctypeParsed + '<html' + lang + '>\n<head>\n' + title + charset + metadata + '</head>\n<body>\n' + text.trim() + '\n</body>\n</html>';

  text = globals.converter._dispatch('completeHTMLDocument.after', text, options, globals);
  return text;
});

/**
 * Convert all tabs to spaces
 */
showdown.subParser('detab', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('detab.before', text, options, globals);

  // expand first n-1 tabs
  text = text.replace(/\t(?=\t)/g, '    '); // g_tab_width

  // replace the nth with two sentinels
  text = text.replace(/\t/g, '¨A¨B');

  // use the sentinel to anchor our regex so it doesn't explode
  text = text.replace(/¨B(.+?)¨A/g, function (wholeMatch, m1) {
    var leadingText = m1,
        numSpaces = 4 - leadingText.length % 4;  // g_tab_width

    // there *must* be a better way to do this:
    for (var i = 0; i < numSpaces; i++) {
      leadingText += ' ';
    }

    return leadingText;
  });

  // clean up sentinels
  text = text.replace(/¨A/g, '    ');  // g_tab_width
  text = text.replace(/¨B/g, '');

  text = globals.converter._dispatch('detab.after', text, options, globals);
  return text;
});

showdown.subParser('ellipsis', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('ellipsis.before', text, options, globals);

  text = text.replace(/\.\.\./g, '…');

  text = globals.converter._dispatch('ellipsis.after', text, options, globals);

  return text;
});

/**
 * Turn emoji codes into emojis
 *
 * List of supported emojis: https://github.com/showdownjs/showdown/wiki/Emojis
 */
showdown.subParser('emoji', function (text, options, globals) {
  'use strict';

  if (!options.emoji) {
    return text;
  }

  text = globals.converter._dispatch('emoji.before', text, options, globals);

  var emojiRgx = /:([\S]+?):/g;

  text = text.replace(emojiRgx, function (wm, emojiCode) {
    if (showdown.helper.emojis.hasOwnProperty(emojiCode)) {
      return showdown.helper.emojis[emojiCode];
    }
    return wm;
  });

  text = globals.converter._dispatch('emoji.after', text, options, globals);

  return text;
});

/**
 * Smart processing for ampersands and angle brackets that need to be encoded.
 */
showdown.subParser('encodeAmpsAndAngles', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('encodeAmpsAndAngles.before', text, options, globals);

  // Ampersand-encoding based entirely on Nat Irons's Amputator MT plugin:
  // http://bumppo.net/projects/amputator/
  text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, '&amp;');

  // Encode naked <'s
  text = text.replace(/<(?![a-z\/?$!])/gi, '&lt;');

  // Encode <
  text = text.replace(/</g, '&lt;');

  // Encode >
  text = text.replace(/>/g, '&gt;');

  text = globals.converter._dispatch('encodeAmpsAndAngles.after', text, options, globals);
  return text;
});

/**
 * Returns the string, with after processing the following backslash escape sequences.
 *
 * attacklab: The polite way to do this is with the new escapeCharacters() function:
 *
 *    text = escapeCharacters(text,"\\",true);
 *    text = escapeCharacters(text,"`*_{}[]()>#+-.!",true);
 *
 * ...but we're sidestepping its use of the (slow) RegExp constructor
 * as an optimization for Firefox.  This function gets called a LOT.
 */
showdown.subParser('encodeBackslashEscapes', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('encodeBackslashEscapes.before', text, options, globals);

  text = text.replace(/\\(\\)/g, showdown.helper.escapeCharactersCallback);
  text = text.replace(/\\([`*_{}\[\]()>#+.!~=|-])/g, showdown.helper.escapeCharactersCallback);

  text = globals.converter._dispatch('encodeBackslashEscapes.after', text, options, globals);
  return text;
});

/**
 * Encode/escape certain characters inside Markdown code runs.
 * The point is that in code, these characters are literals,
 * and lose their special Markdown meanings.
 */
showdown.subParser('encodeCode', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('encodeCode.before', text, options, globals);

  // Encode all ampersands; HTML entities are not
  // entities within a Markdown code span.
  text = text
    .replace(/&/g, '&amp;')
  // Do the angle bracket song and dance:
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  // Now, escape characters that are magic in Markdown:
    .replace(/([*_{}\[\]\\=~-])/g, showdown.helper.escapeCharactersCallback);

  text = globals.converter._dispatch('encodeCode.after', text, options, globals);
  return text;
});

/**
 * Within tags -- meaning between < and > -- encode [\ ` * _ ~ =] so they
 * don't conflict with their use in Markdown for code, italics and strong.
 */
showdown.subParser('escapeSpecialCharsWithinTagAttributes', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('escapeSpecialCharsWithinTagAttributes.before', text, options, globals);

  // Build a regex to find HTML tags.
  var tags     = /<\/?[a-z\d_:-]+(?:[\s]+[\s\S]+?)?>/gi,
      comments = /<!(--(?:(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>/gi;

  text = text.replace(tags, function (wholeMatch) {
    return wholeMatch
      .replace(/(.)<\/?code>(?=.)/g, '$1`')
      .replace(/([\\`*_~=|])/g, showdown.helper.escapeCharactersCallback);
  });

  text = text.replace(comments, function (wholeMatch) {
    return wholeMatch
      .replace(/([\\`*_~=|])/g, showdown.helper.escapeCharactersCallback);
  });

  text = globals.converter._dispatch('escapeSpecialCharsWithinTagAttributes.after', text, options, globals);
  return text;
});

/**
 * Handle github codeblocks prior to running HashHTML so that
 * HTML contained within the codeblock gets escaped properly
 * Example:
 * ```ruby
 *     def hello_world(x)
 *       puts "Hello, #{x}"
 *     end
 * ```
 */
showdown.subParser('githubCodeBlocks', function (text, options, globals) {
  'use strict';

  // early exit if option is not enabled
  if (!options.ghCodeBlocks) {
    return text;
  }

  text = globals.converter._dispatch('githubCodeBlocks.before', text, options, globals);

  text += '¨0';

  text = text.replace(/(?:^|\n)(?: {0,3})(```+|~~~+)(?: *)([^\s`~]*)\n([\s\S]*?)\n(?: {0,3})\1/g, function (wholeMatch, delim, language, codeblock) {
    var end = (options.omitExtraWLInCodeBlocks) ? '' : '\n';

    // First parse the github code block
    codeblock = showdown.subParser('encodeCode')(codeblock, options, globals);
    codeblock = showdown.subParser('detab')(codeblock, options, globals);
    codeblock = codeblock.replace(/^\n+/g, ''); // trim leading newlines
    codeblock = codeblock.replace(/\n+$/g, ''); // trim trailing whitespace

    codeblock = '<pre><code' + (language ? ' class="' + language + ' language-' + language + '"' : '') + '>' + codeblock + end + '</code></pre>';

    codeblock = showdown.subParser('hashBlock')(codeblock, options, globals);

    // Since GHCodeblocks can be false positives, we need to
    // store the primitive text and the parsed text in a global var,
    // and then return a token
    return '\n\n¨G' + (globals.ghCodeBlocks.push({text: wholeMatch, codeblock: codeblock}) - 1) + 'G\n\n';
  });

  // attacklab: strip sentinel
  text = text.replace(/¨0/, '');

  return globals.converter._dispatch('githubCodeBlocks.after', text, options, globals);
});

showdown.subParser('hashBlock', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('hashBlock.before', text, options, globals);
  text = text.replace(/(^\n+|\n+$)/g, '');
  text = '\n\n¨K' + (globals.gHtmlBlocks.push(text) - 1) + 'K\n\n';
  text = globals.converter._dispatch('hashBlock.after', text, options, globals);
  return text;
});

/**
 * Hash and escape <code> elements that should not be parsed as markdown
 */
showdown.subParser('hashCodeTags', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('hashCodeTags.before', text, options, globals);

  var repFunc = function (wholeMatch, match, left, right) {
    var codeblock = left + showdown.subParser('encodeCode')(match, options, globals) + right;
    return '¨C' + (globals.gHtmlSpans.push(codeblock) - 1) + 'C';
  };

  // Hash naked <code>
  text = showdown.helper.replaceRecursiveRegExp(text, repFunc, '<code\\b[^>]*>', '</code>', 'gim');

  text = globals.converter._dispatch('hashCodeTags.after', text, options, globals);
  return text;
});

showdown.subParser('hashElement', function (text, options, globals) {
  'use strict';

  return function (wholeMatch, m1) {
    var blockText = m1;

    // Undo double lines
    blockText = blockText.replace(/\n\n/g, '\n');
    blockText = blockText.replace(/^\n/, '');

    // strip trailing blank lines
    blockText = blockText.replace(/\n+$/g, '');

    // Replace the element text with a marker ("¨KxK" where x is its key)
    blockText = '\n\n¨K' + (globals.gHtmlBlocks.push(blockText) - 1) + 'K\n\n';

    return blockText;
  };
});

showdown.subParser('hashHTMLBlocks', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('hashHTMLBlocks.before', text, options, globals);

  var blockTags = [
        'pre',
        'div',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'blockquote',
        'table',
        'dl',
        'ol',
        'ul',
        'script',
        'noscript',
        'form',
        'fieldset',
        'iframe',
        'math',
        'style',
        'section',
        'header',
        'footer',
        'nav',
        'article',
        'aside',
        'address',
        'audio',
        'canvas',
        'figure',
        'hgroup',
        'output',
        'video',
        'p'
      ],
      repFunc = function (wholeMatch, match, left, right) {
        var txt = wholeMatch;
        // check if this html element is marked as markdown
        // if so, it's contents should be parsed as markdown
        if (left.search(/\bmarkdown\b/) !== -1) {
          txt = left + globals.converter.makeHtml(match) + right;
        }
        return '\n\n¨K' + (globals.gHtmlBlocks.push(txt) - 1) + 'K\n\n';
      };

  if (options.backslashEscapesHTMLTags) {
    // encode backslash escaped HTML tags
    text = text.replace(/\\<(\/?[^>]+?)>/g, function (wm, inside) {
      return '&lt;' + inside + '&gt;';
    });
  }

  // hash HTML Blocks
  for (var i = 0; i < blockTags.length; ++i) {

    var opTagPos,
        rgx1     = new RegExp('^ {0,3}(<' + blockTags[i] + '\\b[^>]*>)', 'im'),
        patLeft  = '<' + blockTags[i] + '\\b[^>]*>',
        patRight = '</' + blockTags[i] + '>';
    // 1. Look for the first position of the first opening HTML tag in the text
    while ((opTagPos = showdown.helper.regexIndexOf(text, rgx1)) !== -1) {

      // if the HTML tag is \ escaped, we need to escape it and break


      //2. Split the text in that position
      var subTexts = showdown.helper.splitAtIndex(text, opTagPos),
          //3. Match recursively
          newSubText1 = showdown.helper.replaceRecursiveRegExp(subTexts[1], repFunc, patLeft, patRight, 'im');

      // prevent an infinite loop
      if (newSubText1 === subTexts[1]) {
        break;
      }
      text = subTexts[0].concat(newSubText1);
    }
  }
  // HR SPECIAL CASE
  text = text.replace(/(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,
    showdown.subParser('hashElement')(text, options, globals));

  // Special case for standalone HTML comments
  text = showdown.helper.replaceRecursiveRegExp(text, function (txt) {
    return '\n\n¨K' + (globals.gHtmlBlocks.push(txt) - 1) + 'K\n\n';
  }, '^ {0,3}<!--', '-->', 'gm');

  // PHP and ASP-style processor instructions (<?...?> and <%...%>)
  text = text.replace(/(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,
    showdown.subParser('hashElement')(text, options, globals));

  text = globals.converter._dispatch('hashHTMLBlocks.after', text, options, globals);
  return text;
});

/**
 * Hash span elements that should not be parsed as markdown
 */
showdown.subParser('hashHTMLSpans', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('hashHTMLSpans.before', text, options, globals);

  function hashHTMLSpan (html) {
    return '¨C' + (globals.gHtmlSpans.push(html) - 1) + 'C';
  }

  // Hash Self Closing tags
  text = text.replace(/<[^>]+?\/>/gi, function (wm) {
    return hashHTMLSpan(wm);
  });

  // Hash tags without properties
  text = text.replace(/<([^>]+?)>[\s\S]*?<\/\1>/g, function (wm) {
    return hashHTMLSpan(wm);
  });

  // Hash tags with properties
  text = text.replace(/<([^>]+?)\s[^>]+?>[\s\S]*?<\/\1>/g, function (wm) {
    return hashHTMLSpan(wm);
  });

  // Hash self closing tags without />
  text = text.replace(/<[^>]+?>/gi, function (wm) {
    return hashHTMLSpan(wm);
  });

  /*showdown.helper.matchRecursiveRegExp(text, '<code\\b[^>]*>', '</code>', 'gi');*/

  text = globals.converter._dispatch('hashHTMLSpans.after', text, options, globals);
  return text;
});

/**
 * Unhash HTML spans
 */
showdown.subParser('unhashHTMLSpans', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('unhashHTMLSpans.before', text, options, globals);

  for (var i = 0; i < globals.gHtmlSpans.length; ++i) {
    var repText = globals.gHtmlSpans[i],
        // limiter to prevent infinite loop (assume 10 as limit for recurse)
        limit = 0;

    while (/¨C(\d+)C/.test(repText)) {
      var num = RegExp.$1;
      repText = repText.replace('¨C' + num + 'C', globals.gHtmlSpans[num]);
      if (limit === 10) {
        console.error('maximum nesting of 10 spans reached!!!');
        break;
      }
      ++limit;
    }
    text = text.replace('¨C' + i + 'C', repText);
  }

  text = globals.converter._dispatch('unhashHTMLSpans.after', text, options, globals);
  return text;
});

/**
 * Hash and escape <pre><code> elements that should not be parsed as markdown
 */
showdown.subParser('hashPreCodeTags', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('hashPreCodeTags.before', text, options, globals);

  var repFunc = function (wholeMatch, match, left, right) {
    // encode html entities
    var codeblock = left + showdown.subParser('encodeCode')(match, options, globals) + right;
    return '\n\n¨G' + (globals.ghCodeBlocks.push({text: wholeMatch, codeblock: codeblock}) - 1) + 'G\n\n';
  };

  // Hash <pre><code>
  text = showdown.helper.replaceRecursiveRegExp(text, repFunc, '^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>', '^ {0,3}</code>\\s*</pre>', 'gim');

  text = globals.converter._dispatch('hashPreCodeTags.after', text, options, globals);
  return text;
});

showdown.subParser('headers', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('headers.before', text, options, globals);

  var headerLevelStart = (isNaN(parseInt(options.headerLevelStart))) ? 1 : parseInt(options.headerLevelStart),

      // Set text-style headers:
      //	Header 1
      //	========
      //
      //	Header 2
      //	--------
      //
      setextRegexH1 = (options.smoothLivePreview) ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm,
      setextRegexH2 = (options.smoothLivePreview) ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;

  text = text.replace(setextRegexH1, function (wholeMatch, m1) {

    var spanGamut = showdown.subParser('spanGamut')(m1, options, globals),
        hID = (options.noHeaderId) ? '' : ' id="' + headerId(m1) + '"',
        hLevel = headerLevelStart,
        hashBlock = '<h' + hLevel + hID + '>' + spanGamut + '</h' + hLevel + '>';
    return showdown.subParser('hashBlock')(hashBlock, options, globals);
  });

  text = text.replace(setextRegexH2, function (matchFound, m1) {
    var spanGamut = showdown.subParser('spanGamut')(m1, options, globals),
        hID = (options.noHeaderId) ? '' : ' id="' + headerId(m1) + '"',
        hLevel = headerLevelStart + 1,
        hashBlock = '<h' + hLevel + hID + '>' + spanGamut + '</h' + hLevel + '>';
    return showdown.subParser('hashBlock')(hashBlock, options, globals);
  });

  // atx-style headers:
  //  # Header 1
  //  ## Header 2
  //  ## Header 2 with closing hashes ##
  //  ...
  //  ###### Header 6
  //
  var atxStyle = (options.requireSpaceBeforeHeadingText) ? /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm : /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;

  text = text.replace(atxStyle, function (wholeMatch, m1, m2) {
    var hText = m2;
    if (options.customizedHeaderId) {
      hText = m2.replace(/\s?\{([^{]+?)}\s*$/, '');
    }

    var span = showdown.subParser('spanGamut')(hText, options, globals),
        hID = (options.noHeaderId) ? '' : ' id="' + headerId(m2) + '"',
        hLevel = headerLevelStart - 1 + m1.length,
        header = '<h' + hLevel + hID + '>' + span + '</h' + hLevel + '>';

    return showdown.subParser('hashBlock')(header, options, globals);
  });

  function headerId (m) {
    var title,
        prefix;

    // It is separate from other options to allow combining prefix and customized
    if (options.customizedHeaderId) {
      var match = m.match(/\{([^{]+?)}\s*$/);
      if (match && match[1]) {
        m = match[1];
      }
    }

    title = m;

    // Prefix id to prevent causing inadvertent pre-existing style matches.
    if (showdown.helper.isString(options.prefixHeaderId)) {
      prefix = options.prefixHeaderId;
    } else if (options.prefixHeaderId === true) {
      prefix = 'section-';
    } else {
      prefix = '';
    }

    if (!options.rawPrefixHeaderId) {
      title = prefix + title;
    }

    if (options.ghCompatibleHeaderId) {
      title = title
        .replace(/ /g, '-')
        // replace previously escaped chars (&, ¨ and $)
        .replace(/&amp;/g, '')
        .replace(/¨T/g, '')
        .replace(/¨D/g, '')
        // replace rest of the chars (&~$ are repeated as they might have been escaped)
        // borrowed from github's redcarpet (some they should produce similar results)
        .replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g, '')
        .toLowerCase();
    } else if (options.rawHeaderId) {
      title = title
        .replace(/ /g, '-')
        // replace previously escaped chars (&, ¨ and $)
        .replace(/&amp;/g, '&')
        .replace(/¨T/g, '¨')
        .replace(/¨D/g, '$')
        // replace " and '
        .replace(/["']/g, '-')
        .toLowerCase();
    } else {
      title = title
        .replace(/[^\w]/g, '')
        .toLowerCase();
    }

    if (options.rawPrefixHeaderId) {
      title = prefix + title;
    }

    if (globals.hashLinkCounts[title]) {
      title = title + '-' + (globals.hashLinkCounts[title]++);
    } else {
      globals.hashLinkCounts[title] = 1;
    }
    return title;
  }

  text = globals.converter._dispatch('headers.after', text, options, globals);
  return text;
});

/**
 * Turn Markdown link shortcuts into XHTML <a> tags.
 */
showdown.subParser('horizontalRule', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('horizontalRule.before', text, options, globals);

  var key = showdown.subParser('hashBlock')('<hr />', options, globals);
  text = text.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm, key);
  text = text.replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm, key);
  text = text.replace(/^ {0,2}( ?_){3,}[ \t]*$/gm, key);

  text = globals.converter._dispatch('horizontalRule.after', text, options, globals);
  return text;
});

/**
 * Turn Markdown image shortcuts into <img> tags.
 */
showdown.subParser('images', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('images.before', text, options, globals);

  var inlineRegExp      = /!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g,
      crazyRegExp       = /!\[([^\]]*?)][ \t]*()\([ \t]?<([^>]*)>(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(?:(["'])([^"]*?)\6))?[ \t]?\)/g,
      base64RegExp      = /!\[([^\]]*?)][ \t]*()\([ \t]?<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g,
      referenceRegExp   = /!\[([^\]]*?)] ?(?:\n *)?\[([\s\S]*?)]()()()()()/g,
      refShortcutRegExp = /!\[([^\[\]]+)]()()()()()/g;

  function writeImageTagBase64 (wholeMatch, altText, linkId, url, width, height, m5, title) {
    url = url.replace(/\s/g, '');
    return writeImageTag (wholeMatch, altText, linkId, url, width, height, m5, title);
  }

  function writeImageTag (wholeMatch, altText, linkId, url, width, height, m5, title) {

    var gUrls   = globals.gUrls,
        gTitles = globals.gTitles,
        gDims   = globals.gDimensions;

    linkId = linkId.toLowerCase();

    if (!title) {
      title = '';
    }
    // Special case for explicit empty url
    if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
      url = '';

    } else if (url === '' || url === null) {
      if (linkId === '' || linkId === null) {
        // lower-case and turn embedded newlines into spaces
        linkId = altText.toLowerCase().replace(/ ?\n/g, ' ');
      }
      url = '#' + linkId;

      if (!showdown.helper.isUndefined(gUrls[linkId])) {
        url = gUrls[linkId];
        if (!showdown.helper.isUndefined(gTitles[linkId])) {
          title = gTitles[linkId];
        }
        if (!showdown.helper.isUndefined(gDims[linkId])) {
          width = gDims[linkId].width;
          height = gDims[linkId].height;
        }
      } else {
        return wholeMatch;
      }
    }

    altText = altText
      .replace(/"/g, '&quot;')
    //altText = showdown.helper.escapeCharacters(altText, '*_', false);
      .replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
    //url = showdown.helper.escapeCharacters(url, '*_', false);
    url = url.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
    var result = '<img src="' + url + '" alt="' + altText + '"';

    if (title && showdown.helper.isString(title)) {
      title = title
        .replace(/"/g, '&quot;')
      //title = showdown.helper.escapeCharacters(title, '*_', false);
        .replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
      result += ' title="' + title + '"';
    }

    if (width && height) {
      width  = (width === '*') ? 'auto' : width;
      height = (height === '*') ? 'auto' : height;

      result += ' width="' + width + '"';
      result += ' height="' + height + '"';
    }

    result += ' />';

    return result;
  }

  // First, handle reference-style labeled images: ![alt text][id]
  text = text.replace(referenceRegExp, writeImageTag);

  // Next, handle inline images:  ![alt text](url =<width>x<height> "optional title")

  // base64 encoded images
  text = text.replace(base64RegExp, writeImageTagBase64);

  // cases with crazy urls like ./image/cat1).png
  text = text.replace(crazyRegExp, writeImageTag);

  // normal cases
  text = text.replace(inlineRegExp, writeImageTag);

  // handle reference-style shortcuts: ![img text]
  text = text.replace(refShortcutRegExp, writeImageTag);

  text = globals.converter._dispatch('images.after', text, options, globals);
  return text;
});

showdown.subParser('italicsAndBold', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('italicsAndBold.before', text, options, globals);

  // it's faster to have 3 separate regexes for each case than have just one
  // because of backtracing, in some cases, it could lead to an exponential effect
  // called "catastrophic backtrace". Ominous!

  function parseInside (txt, left, right) {
    /*
    if (options.simplifiedAutoLink) {
      txt = showdown.subParser('simplifiedAutoLinks')(txt, options, globals);
    }
    */
    return left + txt + right;
  }

  // Parse underscores
  if (options.literalMidWordUnderscores) {
    text = text.replace(/\b___(\S[\s\S]*?)___\b/g, function (wm, txt) {
      return parseInside (txt, '<strong><em>', '</em></strong>');
    });
    text = text.replace(/\b__(\S[\s\S]*?)__\b/g, function (wm, txt) {
      return parseInside (txt, '<strong>', '</strong>');
    });
    text = text.replace(/\b_(\S[\s\S]*?)_\b/g, function (wm, txt) {
      return parseInside (txt, '<em>', '</em>');
    });
  } else {
    text = text.replace(/___(\S[\s\S]*?)___/g, function (wm, m) {
      return (/\S$/.test(m)) ? parseInside (m, '<strong><em>', '</em></strong>') : wm;
    });
    text = text.replace(/__(\S[\s\S]*?)__/g, function (wm, m) {
      return (/\S$/.test(m)) ? parseInside (m, '<strong>', '</strong>') : wm;
    });
    text = text.replace(/_([^\s_][\s\S]*?)_/g, function (wm, m) {
      // !/^_[^_]/.test(m) - test if it doesn't start with __ (since it seems redundant, we removed it)
      return (/\S$/.test(m)) ? parseInside (m, '<em>', '</em>') : wm;
    });
  }

  // Now parse asterisks
  if (options.literalMidWordAsterisks) {
    text = text.replace(/([^*]|^)\B\*\*\*(\S[\s\S]*?)\*\*\*\B(?!\*)/g, function (wm, lead, txt) {
      return parseInside (txt, lead + '<strong><em>', '</em></strong>');
    });
    text = text.replace(/([^*]|^)\B\*\*(\S[\s\S]*?)\*\*\B(?!\*)/g, function (wm, lead, txt) {
      return parseInside (txt, lead + '<strong>', '</strong>');
    });
    text = text.replace(/([^*]|^)\B\*(\S[\s\S]*?)\*\B(?!\*)/g, function (wm, lead, txt) {
      return parseInside (txt, lead + '<em>', '</em>');
    });
  } else {
    text = text.replace(/\*\*\*(\S[\s\S]*?)\*\*\*/g, function (wm, m) {
      return (/\S$/.test(m)) ? parseInside (m, '<strong><em>', '</em></strong>') : wm;
    });
    text = text.replace(/\*\*(\S[\s\S]*?)\*\*/g, function (wm, m) {
      return (/\S$/.test(m)) ? parseInside (m, '<strong>', '</strong>') : wm;
    });
    text = text.replace(/\*([^\s*][\s\S]*?)\*/g, function (wm, m) {
      // !/^\*[^*]/.test(m) - test if it doesn't start with ** (since it seems redundant, we removed it)
      return (/\S$/.test(m)) ? parseInside (m, '<em>', '</em>') : wm;
    });
  }


  text = globals.converter._dispatch('italicsAndBold.after', text, options, globals);
  return text;
});

/**
 * Form HTML ordered (numbered) and unordered (bulleted) lists.
 */
showdown.subParser('lists', function (text, options, globals) {
  'use strict';

  /**
   * Process the contents of a single ordered or unordered list, splitting it
   * into individual list items.
   * @param {string} listStr
   * @param {boolean} trimTrailing
   * @returns {string}
   */
  function processListItems (listStr, trimTrailing) {
    // The $g_list_level global keeps track of when we're inside a list.
    // Each time we enter a list, we increment it; when we leave a list,
    // we decrement. If it's zero, we're not in a list anymore.
    //
    // We do this because when we're not inside a list, we want to treat
    // something like this:
    //
    //    I recommend upgrading to version
    //    8. Oops, now this line is treated
    //    as a sub-list.
    //
    // As a single paragraph, despite the fact that the second line starts
    // with a digit-period-space sequence.
    //
    // Whereas when we're inside a list (or sub-list), that line will be
    // treated as the start of a sub-list. What a kludge, huh? This is
    // an aspect of Markdown's syntax that's hard to parse perfectly
    // without resorting to mind-reading. Perhaps the solution is to
    // change the syntax rules such that sub-lists must start with a
    // starting cardinal number; e.g. "1." or "a.".
    globals.gListLevel++;

    // trim trailing blank lines:
    listStr = listStr.replace(/\n{2,}$/, '\n');

    // attacklab: add sentinel to emulate \z
    listStr += '¨0';

    var rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm,
        isParagraphed = (/\n[ \t]*\n(?!¨0)/.test(listStr));

    // Since version 1.5, nesting sublists requires 4 spaces (or 1 tab) indentation,
    // which is a syntax breaking change
    // activating this option reverts to old behavior
    if (options.disableForced4SpacesIndentedSublists) {
      rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0|\2([*+-]|\d+[.])[ \t]+))/gm;
    }

    listStr = listStr.replace(rgx, function (wholeMatch, m1, m2, m3, m4, taskbtn, checked) {
      checked = (checked && checked.trim() !== '');

      var item = showdown.subParser('outdent')(m4, options, globals),
          bulletStyle = '';

      // Support for github tasklists
      if (taskbtn && options.tasklists) {
        bulletStyle = ' class="task-list-item" style="list-style-type: none;"';
        item = item.replace(/^[ \t]*\[(x|X| )?]/m, function () {
          var otp = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
          if (checked) {
            otp += ' checked';
          }
          otp += '>';
          return otp;
        });
      }

      // ISSUE #312
      // This input: - - - a
      // causes trouble to the parser, since it interprets it as:
      // <ul><li><li><li>a</li></li></li></ul>
      // instead of:
      // <ul><li>- - a</li></ul>
      // So, to prevent it, we will put a marker (¨A)in the beginning of the line
      // Kind of hackish/monkey patching, but seems more effective than overcomplicating the list parser
      item = item.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g, function (wm2) {
        return '¨A' + wm2;
      });

      // m1 - Leading line or
      // Has a double return (multi paragraph) or
      // Has sublist
      if (m1 || (item.search(/\n{2,}/) > -1)) {
        item = showdown.subParser('githubCodeBlocks')(item, options, globals);
        item = showdown.subParser('blockGamut')(item, options, globals);
      } else {
        // Recursion for sub-lists:
        item = showdown.subParser('lists')(item, options, globals);
        item = item.replace(/\n$/, ''); // chomp(item)
        item = showdown.subParser('hashHTMLBlocks')(item, options, globals);

        // Colapse double linebreaks
        item = item.replace(/\n\n+/g, '\n\n');
        if (isParagraphed) {
          item = showdown.subParser('paragraphs')(item, options, globals);
        } else {
          item = showdown.subParser('spanGamut')(item, options, globals);
        }
      }

      // now we need to remove the marker (¨A)
      item = item.replace('¨A', '');
      // we can finally wrap the line in list item tags
      item =  '<li' + bulletStyle + '>' + item + '</li>\n';

      return item;
    });

    // attacklab: strip sentinel
    listStr = listStr.replace(/¨0/g, '');

    globals.gListLevel--;

    if (trimTrailing) {
      listStr = listStr.replace(/\s+$/, '');
    }

    return listStr;
  }

  function styleStartNumber (list, listType) {
    // check if ol and starts by a number different than 1
    if (listType === 'ol') {
      var res = list.match(/^ *(\d+)\./);
      if (res && res[1] !== '1') {
        return ' start="' + res[1] + '"';
      }
    }
    return '';
  }

  /**
   * Check and parse consecutive lists (better fix for issue #142)
   * @param {string} list
   * @param {string} listType
   * @param {boolean} trimTrailing
   * @returns {string}
   */
  function parseConsecutiveLists (list, listType, trimTrailing) {
    // check if we caught 2 or more consecutive lists by mistake
    // we use the counterRgx, meaning if listType is UL we look for OL and vice versa
    var olRgx = (options.disableForced4SpacesIndentedSublists) ? /^ ?\d+\.[ \t]/gm : /^ {0,3}\d+\.[ \t]/gm,
        ulRgx = (options.disableForced4SpacesIndentedSublists) ? /^ ?[*+-][ \t]/gm : /^ {0,3}[*+-][ \t]/gm,
        counterRxg = (listType === 'ul') ? olRgx : ulRgx,
        result = '';

    if (list.search(counterRxg) !== -1) {
      (function parseCL (txt) {
        var pos = txt.search(counterRxg),
            style = styleStartNumber(list, listType);
        if (pos !== -1) {
          // slice
          result += '\n\n<' + listType + style + '>\n' + processListItems(txt.slice(0, pos), !!trimTrailing) + '</' + listType + '>\n';

          // invert counterType and listType
          listType = (listType === 'ul') ? 'ol' : 'ul';
          counterRxg = (listType === 'ul') ? olRgx : ulRgx;

          //recurse
          parseCL(txt.slice(pos));
        } else {
          result += '\n\n<' + listType + style + '>\n' + processListItems(txt, !!trimTrailing) + '</' + listType + '>\n';
        }
      })(list);
    } else {
      var style = styleStartNumber(list, listType);
      result = '\n\n<' + listType + style + '>\n' + processListItems(list, !!trimTrailing) + '</' + listType + '>\n';
    }

    return result;
  }

  /** Start of list parsing **/
  text = globals.converter._dispatch('lists.before', text, options, globals);
  // add sentinel to hack around khtml/safari bug:
  // http://bugs.webkit.org/show_bug.cgi?id=11231
  text += '¨0';

  if (globals.gListLevel) {
    text = text.replace(/^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
      function (wholeMatch, list, m2) {
        var listType = (m2.search(/[*+-]/g) > -1) ? 'ul' : 'ol';
        return parseConsecutiveLists(list, listType, true);
      }
    );
  } else {
    text = text.replace(/(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
      function (wholeMatch, m1, list, m3) {
        var listType = (m3.search(/[*+-]/g) > -1) ? 'ul' : 'ol';
        return parseConsecutiveLists(list, listType, false);
      }
    );
  }

  // strip sentinel
  text = text.replace(/¨0/, '');
  text = globals.converter._dispatch('lists.after', text, options, globals);
  return text;
});

/**
 * Parse metadata at the top of the document
 */
showdown.subParser('metadata', function (text, options, globals) {
  'use strict';

  if (!options.metadata) {
    return text;
  }

  text = globals.converter._dispatch('metadata.before', text, options, globals);

  function parseMetadataContents (content) {
    // raw is raw so it's not changed in any way
    globals.metadata.raw = content;

    // escape chars forbidden in html attributes
    // double quotes
    content = content
      // ampersand first
      .replace(/&/g, '&amp;')
      // double quotes
      .replace(/"/g, '&quot;');

    content = content.replace(/\n {4}/g, ' ');
    content.replace(/^([\S ]+): +([\s\S]+?)$/gm, function (wm, key, value) {
      globals.metadata.parsed[key] = value;
      return '';
    });
  }

  text = text.replace(/^\s*«««+(\S*?)\n([\s\S]+?)\n»»»+\n/, function (wholematch, format, content) {
    parseMetadataContents(content);
    return '¨M';
  });

  text = text.replace(/^\s*---+(\S*?)\n([\s\S]+?)\n---+\n/, function (wholematch, format, content) {
    if (format) {
      globals.metadata.format = format;
    }
    parseMetadataContents(content);
    return '¨M';
  });

  text = text.replace(/¨M/g, '');

  text = globals.converter._dispatch('metadata.after', text, options, globals);
  return text;
});

/**
 * Remove one level of line-leading tabs or spaces
 */
showdown.subParser('outdent', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('outdent.before', text, options, globals);

  // attacklab: hack around Konqueror 3.5.4 bug:
  // "----------bug".replace(/^-/g,"") == "bug"
  text = text.replace(/^(\t|[ ]{1,4})/gm, '¨0'); // attacklab: g_tab_width

  // attacklab: clean up hack
  text = text.replace(/¨0/g, '');

  text = globals.converter._dispatch('outdent.after', text, options, globals);
  return text;
});

/**
 *
 */
showdown.subParser('paragraphs', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('paragraphs.before', text, options, globals);
  // Strip leading and trailing lines:
  text = text.replace(/^\n+/g, '');
  text = text.replace(/\n+$/g, '');

  var grafs = text.split(/\n{2,}/g),
      grafsOut = [],
      end = grafs.length; // Wrap <p> tags

  for (var i = 0; i < end; i++) {
    var str = grafs[i];
    // if this is an HTML marker, copy it
    if (str.search(/¨(K|G)(\d+)\1/g) >= 0) {
      grafsOut.push(str);

    // test for presence of characters to prevent empty lines being parsed
    // as paragraphs (resulting in undesired extra empty paragraphs)
    } else if (str.search(/\S/) >= 0) {
      str = showdown.subParser('spanGamut')(str, options, globals);
      str = str.replace(/^([ \t]*)/g, '<p>');
      str += '</p>';
      grafsOut.push(str);
    }
  }

  /** Unhashify HTML blocks */
  end = grafsOut.length;
  for (i = 0; i < end; i++) {
    var blockText = '',
        grafsOutIt = grafsOut[i],
        codeFlag = false;
    // if this is a marker for an html block...
    // use RegExp.test instead of string.search because of QML bug
    while (/¨(K|G)(\d+)\1/.test(grafsOutIt)) {
      var delim = RegExp.$1,
          num   = RegExp.$2;

      if (delim === 'K') {
        blockText = globals.gHtmlBlocks[num];
      } else {
        // we need to check if ghBlock is a false positive
        if (codeFlag) {
          // use encoded version of all text
          blockText = showdown.subParser('encodeCode')(globals.ghCodeBlocks[num].text, options, globals);
        } else {
          blockText = globals.ghCodeBlocks[num].codeblock;
        }
      }
      blockText = blockText.replace(/\$/g, '$$$$'); // Escape any dollar signs

      grafsOutIt = grafsOutIt.replace(/(\n\n)?¨(K|G)\d+\2(\n\n)?/, blockText);
      // Check if grafsOutIt is a pre->code
      if (/^<pre\b[^>]*>\s*<code\b[^>]*>/.test(grafsOutIt)) {
        codeFlag = true;
      }
    }
    grafsOut[i] = grafsOutIt;
  }
  text = grafsOut.join('\n');
  // Strip leading and trailing lines:
  text = text.replace(/^\n+/g, '');
  text = text.replace(/\n+$/g, '');
  return globals.converter._dispatch('paragraphs.after', text, options, globals);
});

/**
 * Run extension
 */
showdown.subParser('runExtension', function (ext, text, options, globals) {
  'use strict';

  if (ext.filter) {
    text = ext.filter(text, globals.converter, options);

  } else if (ext.regex) {
    // TODO remove this when old extension loading mechanism is deprecated
    var re = ext.regex;
    if (!(re instanceof RegExp)) {
      re = new RegExp(re, 'g');
    }
    text = text.replace(re, ext.replace);
  }

  return text;
});

/**
 * These are all the transformations that occur *within* block-level
 * tags like paragraphs, headers, and list items.
 */
showdown.subParser('spanGamut', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('spanGamut.before', text, options, globals);
  text = showdown.subParser('codeSpans')(text, options, globals);
  text = showdown.subParser('escapeSpecialCharsWithinTagAttributes')(text, options, globals);
  text = showdown.subParser('encodeBackslashEscapes')(text, options, globals);

  // Process anchor and image tags. Images must come first,
  // because ![foo][f] looks like an anchor.
  text = showdown.subParser('images')(text, options, globals);
  text = showdown.subParser('anchors')(text, options, globals);

  // Make links out of things like `<http://example.com/>`
  // Must come after anchors, because you can use < and >
  // delimiters in inline links like [this](<url>).
  text = showdown.subParser('autoLinks')(text, options, globals);
  text = showdown.subParser('simplifiedAutoLinks')(text, options, globals);
  text = showdown.subParser('emoji')(text, options, globals);
  text = showdown.subParser('underline')(text, options, globals);
  text = showdown.subParser('italicsAndBold')(text, options, globals);
  text = showdown.subParser('strikethrough')(text, options, globals);
  text = showdown.subParser('ellipsis')(text, options, globals);

  // we need to hash HTML tags inside spans
  text = showdown.subParser('hashHTMLSpans')(text, options, globals);

  // now we encode amps and angles
  text = showdown.subParser('encodeAmpsAndAngles')(text, options, globals);

  // Do hard breaks
  if (options.simpleLineBreaks) {
    // GFM style hard breaks
    // only add line breaks if the text does not contain a block (special case for lists)
    if (!/\n\n¨K/.test(text)) {
      text = text.replace(/\n+/g, '<br />\n');
    }
  } else {
    // Vanilla hard breaks
    text = text.replace(/  +\n/g, '<br />\n');
  }

  text = globals.converter._dispatch('spanGamut.after', text, options, globals);
  return text;
});

showdown.subParser('strikethrough', function (text, options, globals) {
  'use strict';

  function parseInside (txt) {
    if (options.simplifiedAutoLink) {
      txt = showdown.subParser('simplifiedAutoLinks')(txt, options, globals);
    }
    return '<del>' + txt + '</del>';
  }

  if (options.strikethrough) {
    text = globals.converter._dispatch('strikethrough.before', text, options, globals);
    text = text.replace(/(?:~){2}([\s\S]+?)(?:~){2}/g, function (wm, txt) { return parseInside(txt); });
    text = globals.converter._dispatch('strikethrough.after', text, options, globals);
  }

  return text;
});

/**
 * Strips link definitions from text, stores the URLs and titles in
 * hash references.
 * Link defs are in the form: ^[id]: url "optional title"
 */
showdown.subParser('stripLinkDefinitions', function (text, options, globals) {
  'use strict';

  var regex       = /^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm,
      base64Regex = /^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n\n|(?=¨0)|(?=\n\[))/gm;

  // attacklab: sentinel workarounds for lack of \A and \Z, safari\khtml bug
  text += '¨0';

  var replaceFunc = function (wholeMatch, linkId, url, width, height, blankLines, title) {
    linkId = linkId.toLowerCase();
    if (url.match(/^data:.+?\/.+?;base64,/)) {
      // remove newlines
      globals.gUrls[linkId] = url.replace(/\s/g, '');
    } else {
      globals.gUrls[linkId] = showdown.subParser('encodeAmpsAndAngles')(url, options, globals);  // Link IDs are case-insensitive
    }

    if (blankLines) {
      // Oops, found blank lines, so it's not a title.
      // Put back the parenthetical statement we stole.
      return blankLines + title;

    } else {
      if (title) {
        globals.gTitles[linkId] = title.replace(/"|'/g, '&quot;');
      }
      if (options.parseImgDimensions && width && height) {
        globals.gDimensions[linkId] = {
          width:  width,
          height: height
        };
      }
    }
    // Completely remove the definition from the text
    return '';
  };

  // first we try to find base64 link references
  text = text.replace(base64Regex, replaceFunc);

  text = text.replace(regex, replaceFunc);

  // attacklab: strip sentinel
  text = text.replace(/¨0/, '');

  return text;
});

showdown.subParser('tables', function (text, options, globals) {
  'use strict';

  if (!options.tables) {
    return text;
  }

  var tableRgx       = /^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:[-=]){2,}[\s\S]+?(?:\n\n|¨0)/gm,
      //singeColTblRgx = /^ {0,3}\|.+\|\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n(?: {0,3}\|.+\|\n)+(?:\n\n|¨0)/gm;
      singeColTblRgx = /^ {0,3}\|.+\|[ \t]*\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n( {0,3}\|.+\|[ \t]*\n)*(?:\n|¨0)/gm;

  function parseStyles (sLine) {
    if (/^:[ \t]*--*$/.test(sLine)) {
      return ' style="text-align:left;"';
    } else if (/^--*[ \t]*:[ \t]*$/.test(sLine)) {
      return ' style="text-align:right;"';
    } else if (/^:[ \t]*--*[ \t]*:$/.test(sLine)) {
      return ' style="text-align:center;"';
    } else {
      return '';
    }
  }

  function parseHeaders (header, style) {
    var id = '';
    header = header.trim();
    // support both tablesHeaderId and tableHeaderId due to error in documentation so we don't break backwards compatibility
    if (options.tablesHeaderId || options.tableHeaderId) {
      id = ' id="' + header.replace(/ /g, '_').toLowerCase() + '"';
    }
    header = showdown.subParser('spanGamut')(header, options, globals);

    return '<th' + id + style + '>' + header + '</th>\n';
  }

  function parseCells (cell, style) {
    var subText = showdown.subParser('spanGamut')(cell, options, globals);
    return '<td' + style + '>' + subText + '</td>\n';
  }

  function buildTable (headers, cells) {
    var tb = '<table>\n<thead>\n<tr>\n',
        tblLgn = headers.length;

    for (var i = 0; i < tblLgn; ++i) {
      tb += headers[i];
    }
    tb += '</tr>\n</thead>\n<tbody>\n';

    for (i = 0; i < cells.length; ++i) {
      tb += '<tr>\n';
      for (var ii = 0; ii < tblLgn; ++ii) {
        tb += cells[i][ii];
      }
      tb += '</tr>\n';
    }
    tb += '</tbody>\n</table>\n';
    return tb;
  }

  function parseTable (rawTable) {
    var i, tableLines = rawTable.split('\n');

    for (i = 0; i < tableLines.length; ++i) {
      // strip wrong first and last column if wrapped tables are used
      if (/^ {0,3}\|/.test(tableLines[i])) {
        tableLines[i] = tableLines[i].replace(/^ {0,3}\|/, '');
      }
      if (/\|[ \t]*$/.test(tableLines[i])) {
        tableLines[i] = tableLines[i].replace(/\|[ \t]*$/, '');
      }
      // parse code spans first, but we only support one line code spans
      tableLines[i] = showdown.subParser('codeSpans')(tableLines[i], options, globals);
    }

    var rawHeaders = tableLines[0].split('|').map(function (s) { return s.trim();}),
        rawStyles = tableLines[1].split('|').map(function (s) { return s.trim();}),
        rawCells = [],
        headers = [],
        styles = [],
        cells = [];

    tableLines.shift();
    tableLines.shift();

    for (i = 0; i < tableLines.length; ++i) {
      if (tableLines[i].trim() === '') {
        continue;
      }
      rawCells.push(
        tableLines[i]
          .split('|')
          .map(function (s) {
            return s.trim();
          })
      );
    }

    if (rawHeaders.length < rawStyles.length) {
      return rawTable;
    }

    for (i = 0; i < rawStyles.length; ++i) {
      styles.push(parseStyles(rawStyles[i]));
    }

    for (i = 0; i < rawHeaders.length; ++i) {
      if (showdown.helper.isUndefined(styles[i])) {
        styles[i] = '';
      }
      headers.push(parseHeaders(rawHeaders[i], styles[i]));
    }

    for (i = 0; i < rawCells.length; ++i) {
      var row = [];
      for (var ii = 0; ii < headers.length; ++ii) {
        if (showdown.helper.isUndefined(rawCells[i][ii])) {

        }
        row.push(parseCells(rawCells[i][ii], styles[ii]));
      }
      cells.push(row);
    }

    return buildTable(headers, cells);
  }

  text = globals.converter._dispatch('tables.before', text, options, globals);

  // find escaped pipe characters
  text = text.replace(/\\(\|)/g, showdown.helper.escapeCharactersCallback);

  // parse multi column tables
  text = text.replace(tableRgx, parseTable);

  // parse one column tables
  text = text.replace(singeColTblRgx, parseTable);

  text = globals.converter._dispatch('tables.after', text, options, globals);

  return text;
});

showdown.subParser('underline', function (text, options, globals) {
  'use strict';

  if (!options.underline) {
    return text;
  }

  text = globals.converter._dispatch('underline.before', text, options, globals);

  if (options.literalMidWordUnderscores) {
    text = text.replace(/\b___(\S[\s\S]*?)___\b/g, function (wm, txt) {
      return '<u>' + txt + '</u>';
    });
    text = text.replace(/\b__(\S[\s\S]*?)__\b/g, function (wm, txt) {
      return '<u>' + txt + '</u>';
    });
  } else {
    text = text.replace(/___(\S[\s\S]*?)___/g, function (wm, m) {
      return (/\S$/.test(m)) ? '<u>' + m + '</u>' : wm;
    });
    text = text.replace(/__(\S[\s\S]*?)__/g, function (wm, m) {
      return (/\S$/.test(m)) ? '<u>' + m + '</u>' : wm;
    });
  }

  // escape remaining underscores to prevent them being parsed by italic and bold
  text = text.replace(/(_)/g, showdown.helper.escapeCharactersCallback);

  text = globals.converter._dispatch('underline.after', text, options, globals);

  return text;
});

/**
 * Swap back in all the special characters we've hidden.
 */
showdown.subParser('unescapeSpecialChars', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('unescapeSpecialChars.before', text, options, globals);

  text = text.replace(/¨E(\d+)E/g, function (wholeMatch, m1) {
    var charCodeToReplace = parseInt(m1);
    return String.fromCharCode(charCodeToReplace);
  });

  text = globals.converter._dispatch('unescapeSpecialChars.after', text, options, globals);
  return text;
});

showdown.subParser('makeMarkdown.blockquote', function (node, globals) {
  'use strict';

  var txt = '';
  if (node.hasChildNodes()) {
    var children = node.childNodes,
        childrenLength = children.length;

    for (var i = 0; i < childrenLength; ++i) {
      var innerTxt = showdown.subParser('makeMarkdown.node')(children[i], globals);

      if (innerTxt === '') {
        continue;
      }
      txt += innerTxt;
    }
  }
  // cleanup
  txt = txt.trim();
  txt = '> ' + txt.split('\n').join('\n> ');
  return txt;
});

showdown.subParser('makeMarkdown.codeBlock', function (node, globals) {
  'use strict';

  var lang = node.getAttribute('language'),
      num  = node.getAttribute('precodenum');
  return '```' + lang + '\n' + globals.preList[num] + '\n```';
});

showdown.subParser('makeMarkdown.codeSpan', function (node) {
  'use strict';

  return '`' + node.innerHTML + '`';
});

showdown.subParser('makeMarkdown.emphasis', function (node, globals) {
  'use strict';

  var txt = '';
  if (node.hasChildNodes()) {
    txt += '*';
    var children = node.childNodes,
        childrenLength = children.length;
    for (var i = 0; i < childrenLength; ++i) {
      txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
    }
    txt += '*';
  }
  return txt;
});

showdown.subParser('makeMarkdown.header', function (node, globals, headerLevel) {
  'use strict';

  var headerMark = new Array(headerLevel + 1).join('#'),
      txt = '';

  if (node.hasChildNodes()) {
    txt = headerMark + ' ';
    var children = node.childNodes,
        childrenLength = children.length;

    for (var i = 0; i < childrenLength; ++i) {
      txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
    }
  }
  return txt;
});

showdown.subParser('makeMarkdown.hr', function () {
  'use strict';

  return '---';
});

showdown.subParser('makeMarkdown.image', function (node) {
  'use strict';

  var txt = '';
  if (node.hasAttribute('src')) {
    txt += '![' + node.getAttribute('alt') + '](';
    txt += '<' + node.getAttribute('src') + '>';
    if (node.hasAttribute('width') && node.hasAttribute('height')) {
      txt += ' =' + node.getAttribute('width') + 'x' + node.getAttribute('height');
    }

    if (node.hasAttribute('title')) {
      txt += ' "' + node.getAttribute('title') + '"';
    }
    txt += ')';
  }
  return txt;
});

showdown.subParser('makeMarkdown.links', function (node, globals) {
  'use strict';

  var txt = '';
  if (node.hasChildNodes() && node.hasAttribute('href')) {
    var children = node.childNodes,
        childrenLength = children.length;
    txt = '[';
    for (var i = 0; i < childrenLength; ++i) {
      txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
    }
    txt += '](';
    txt += '<' + node.getAttribute('href') + '>';
    if (node.hasAttribute('title')) {
      txt += ' "' + node.getAttribute('title') + '"';
    }
    txt += ')';
  }
  return txt;
});

showdown.subParser('makeMarkdown.list', function (node, globals, type) {
  'use strict';

  var txt = '';
  if (!node.hasChildNodes()) {
    return '';
  }
  var listItems       = node.childNodes,
      listItemsLenght = listItems.length,
      listNum = node.getAttribute('start') || 1;

  for (var i = 0; i < listItemsLenght; ++i) {
    if (typeof listItems[i].tagName === 'undefined' || listItems[i].tagName.toLowerCase() !== 'li') {
      continue;
    }

    // define the bullet to use in list
    var bullet = '';
    if (type === 'ol') {
      bullet = listNum.toString() + '. ';
    } else {
      bullet = '- ';
    }

    // parse list item
    txt += bullet + showdown.subParser('makeMarkdown.listItem')(listItems[i], globals);
    ++listNum;
  }

  // add comment at the end to prevent consecutive lists to be parsed as one
  txt += '\n<!-- -->\n';
  return txt.trim();
});

showdown.subParser('makeMarkdown.listItem', function (node, globals) {
  'use strict';

  var listItemTxt = '';

  var children = node.childNodes,
      childrenLenght = children.length;

  for (var i = 0; i < childrenLenght; ++i) {
    listItemTxt += showdown.subParser('makeMarkdown.node')(children[i], globals);
  }
  // if it's only one liner, we need to add a newline at the end
  if (!/\n$/.test(listItemTxt)) {
    listItemTxt += '\n';
  } else {
    // it's multiparagraph, so we need to indent
    listItemTxt = listItemTxt
      .split('\n')
      .join('\n    ')
      .replace(/^ {4}$/gm, '')
      .replace(/\n\n+/g, '\n\n');
  }

  return listItemTxt;
});



showdown.subParser('makeMarkdown.node', function (node, globals, spansOnly) {
  'use strict';

  spansOnly = spansOnly || false;

  var txt = '';

  // edge case of text without wrapper paragraph
  if (node.nodeType === 3) {
    return showdown.subParser('makeMarkdown.txt')(node, globals);
  }

  // HTML comment
  if (node.nodeType === 8) {
    return '<!--' + node.data + '-->\n\n';
  }

  // process only node elements
  if (node.nodeType !== 1) {
    return '';
  }

  var tagName = node.tagName.toLowerCase();

  switch (tagName) {

    //
    // BLOCKS
    //
    case 'h1':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, globals, 1) + '\n\n'; }
      break;
    case 'h2':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, globals, 2) + '\n\n'; }
      break;
    case 'h3':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, globals, 3) + '\n\n'; }
      break;
    case 'h4':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, globals, 4) + '\n\n'; }
      break;
    case 'h5':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, globals, 5) + '\n\n'; }
      break;
    case 'h6':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, globals, 6) + '\n\n'; }
      break;

    case 'p':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.paragraph')(node, globals) + '\n\n'; }
      break;

    case 'blockquote':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.blockquote')(node, globals) + '\n\n'; }
      break;

    case 'hr':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.hr')(node, globals) + '\n\n'; }
      break;

    case 'ol':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.list')(node, globals, 'ol') + '\n\n'; }
      break;

    case 'ul':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.list')(node, globals, 'ul') + '\n\n'; }
      break;

    case 'precode':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.codeBlock')(node, globals) + '\n\n'; }
      break;

    case 'pre':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.pre')(node, globals) + '\n\n'; }
      break;

    case 'table':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.table')(node, globals) + '\n\n'; }
      break;

    //
    // SPANS
    //
    case 'code':
      txt = showdown.subParser('makeMarkdown.codeSpan')(node, globals);
      break;

    case 'em':
    case 'i':
      txt = showdown.subParser('makeMarkdown.emphasis')(node, globals);
      break;

    case 'strong':
    case 'b':
      txt = showdown.subParser('makeMarkdown.strong')(node, globals);
      break;

    case 'del':
      txt = showdown.subParser('makeMarkdown.strikethrough')(node, globals);
      break;

    case 'a':
      txt = showdown.subParser('makeMarkdown.links')(node, globals);
      break;

    case 'img':
      txt = showdown.subParser('makeMarkdown.image')(node, globals);
      break;

    default:
      txt = node.outerHTML + '\n\n';
  }

  // common normalization
  // TODO eventually

  return txt;
});

showdown.subParser('makeMarkdown.paragraph', function (node, globals) {
  'use strict';

  var txt = '';
  if (node.hasChildNodes()) {
    var children = node.childNodes,
        childrenLength = children.length;
    for (var i = 0; i < childrenLength; ++i) {
      txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
    }
  }

  // some text normalization
  txt = txt.trim();

  return txt;
});

showdown.subParser('makeMarkdown.pre', function (node, globals) {
  'use strict';

  var num  = node.getAttribute('prenum');
  return '<pre>' + globals.preList[num] + '</pre>';
});

showdown.subParser('makeMarkdown.strikethrough', function (node, globals) {
  'use strict';

  var txt = '';
  if (node.hasChildNodes()) {
    txt += '~~';
    var children = node.childNodes,
        childrenLength = children.length;
    for (var i = 0; i < childrenLength; ++i) {
      txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
    }
    txt += '~~';
  }
  return txt;
});

showdown.subParser('makeMarkdown.strong', function (node, globals) {
  'use strict';

  var txt = '';
  if (node.hasChildNodes()) {
    txt += '**';
    var children = node.childNodes,
        childrenLength = children.length;
    for (var i = 0; i < childrenLength; ++i) {
      txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
    }
    txt += '**';
  }
  return txt;
});

showdown.subParser('makeMarkdown.table', function (node, globals) {
  'use strict';

  var txt = '',
      tableArray = [[], []],
      headings   = node.querySelectorAll('thead>tr>th'),
      rows       = node.querySelectorAll('tbody>tr'),
      i, ii;
  for (i = 0; i < headings.length; ++i) {
    var headContent = showdown.subParser('makeMarkdown.tableCell')(headings[i], globals),
        allign = '---';

    if (headings[i].hasAttribute('style')) {
      var style = headings[i].getAttribute('style').toLowerCase().replace(/\s/g, '');
      switch (style) {
        case 'text-align:left;':
          allign = ':---';
          break;
        case 'text-align:right;':
          allign = '---:';
          break;
        case 'text-align:center;':
          allign = ':---:';
          break;
      }
    }
    tableArray[0][i] = headContent.trim();
    tableArray[1][i] = allign;
  }

  for (i = 0; i < rows.length; ++i) {
    var r = tableArray.push([]) - 1,
        cols = rows[i].getElementsByTagName('td');

    for (ii = 0; ii < headings.length; ++ii) {
      var cellContent = ' ';
      if (typeof cols[ii] !== 'undefined') {
        cellContent = showdown.subParser('makeMarkdown.tableCell')(cols[ii], globals);
      }
      tableArray[r].push(cellContent);
    }
  }

  var cellSpacesCount = 3;
  for (i = 0; i < tableArray.length; ++i) {
    for (ii = 0; ii < tableArray[i].length; ++ii) {
      var strLen = tableArray[i][ii].length;
      if (strLen > cellSpacesCount) {
        cellSpacesCount = strLen;
      }
    }
  }

  for (i = 0; i < tableArray.length; ++i) {
    for (ii = 0; ii < tableArray[i].length; ++ii) {
      if (i === 1) {
        if (tableArray[i][ii].slice(-1) === ':') {
          tableArray[i][ii] = showdown.helper.padEnd(tableArray[i][ii].slice(-1), cellSpacesCount - 1, '-') + ':';
        } else {
          tableArray[i][ii] = showdown.helper.padEnd(tableArray[i][ii], cellSpacesCount, '-');
        }
      } else {
        tableArray[i][ii] = showdown.helper.padEnd(tableArray[i][ii], cellSpacesCount);
      }
    }
    txt += '| ' + tableArray[i].join(' | ') + ' |\n';
  }

  return txt.trim();
});

showdown.subParser('makeMarkdown.tableCell', function (node, globals) {
  'use strict';

  var txt = '';
  if (!node.hasChildNodes()) {
    return '';
  }
  var children = node.childNodes,
      childrenLength = children.length;

  for (var i = 0; i < childrenLength; ++i) {
    txt += showdown.subParser('makeMarkdown.node')(children[i], globals, true);
  }
  return txt.trim();
});

showdown.subParser('makeMarkdown.txt', function (node) {
  'use strict';

  var txt = node.nodeValue;

  // multiple spaces are collapsed
  txt = txt.replace(/ +/g, ' ');

  // replace the custom ¨NBSP; with a space
  txt = txt.replace(/¨NBSP;/g, ' ');

  // ", <, > and & should replace escaped html entities
  txt = showdown.helper.unescapeHTMLEntities(txt);

  // escape markdown magic characters
  // emphasis, strong and strikethrough - can appear everywhere
  // we also escape pipe (|) because of tables
  // and escape ` because of code blocks and spans
  txt = txt.replace(/([*_~|`])/g, '\\$1');

  // escape > because of blockquotes
  txt = txt.replace(/^(\s*)>/g, '\\$1>');

  // hash character, only troublesome at the beginning of a line because of headers
  txt = txt.replace(/^#/gm, '\\#');

  // horizontal rules
  txt = txt.replace(/^(\s*)([-=]{3,})(\s*)$/, '$1\\$2$3');

  // dot, because of ordered lists, only troublesome at the beginning of a line when preceded by an integer
  txt = txt.replace(/^( {0,3}\d+)\./gm, '$1\\.');

  // +, * and -, at the beginning of a line becomes a list, so we need to escape them also (asterisk was already escaped)
  txt = txt.replace(/^( {0,3})([+-])/gm, '$1\\$2');

  // images and links, ] followed by ( is problematic, so we escape it
  txt = txt.replace(/]([\s]*)\(/g, '\\]$1\\(');

  // reference URIs must also be escaped
  txt = txt.replace(/^ {0,3}\[([\S \t]*?)]:/gm, '\\[$1]:');

  return txt;
});

var root = this;

// AMD Loader
if (typeof define === 'function' && define.amd) {
  define(function () {
    'use strict';
    return showdown;
  });

// CommonJS/nodeJS Loader
} else if (typeof module !== 'undefined' && module.exports) {
  module.exports = showdown;

// Regular Browser loader
} else {
  root.showdown = showdown;
}
}).call(this);

//# sourceMappingURL=showdown.js.map

/*! showdown-twitter 26-11-2016 */(function (extension) {
  'use strict';

  if (typeof showdown !== 'undefined') {
    extension(showdown);
  } else if (typeof define === 'function' && define.amd) {
    define(['showdown'], extension);
  } else if (typeof exports === 'object') {
    module.exports = extension(require('showdown'));
  } else {
    throw Error('Could not find showdown library');
  }

}(function (showdown) {
  'use strict';

  showdown.extension('twitter', function () {
    return [
      {
        type:    'lang',
        regex:   '\\B(\\\\)?@([\\S]+)\\b',
        replace: function (match, leadingSlash, username) {
          if (leadingSlash === '\\') {
            return match;
          } else {
            return '<a href="http://twitter.com/' + username + '">@' + username + '</a>';
          }
        }
      },
      {
        type:    'lang',
        regex:   '\\B(\\\\)?#([\\S]+)\\b',
        replace: function (match, leadingSlash, tag) {
          if (leadingSlash === '\\') {
            return match;
          } else {
            return '<a href="http://twitter.com/search/%23' + tag + '">#' + tag + '</a>';
          }
        }
      },
      {
        type:    'lang',
        regex:   '\\\\@',
        replace: '@'
      }
    ];
  });
}));

//# sourceMappingURL=showdown-twitter.js.map
/*! showdown-prettify 06-01-2016 */
(function (extension) {
  'use strict';

  if (typeof showdown !== 'undefined') {
    extension(showdown);
  } else if (typeof define === 'function' && define.amd) {
    define(['showdown'], extension);
  } else if (typeof exports === 'object') {
    module.exports = extension(require('showdown'));
  } else {
    throw Error('Could not find showdown library');
  }

}(function (showdown) {
  'use strict';
  showdown.extension('prettify', function () {
    return [{
      type:   'output',
      filter: function (source) {
        return source.replace(/(<pre[^>]*>)?[\n\s]?<code([^>]*)>/gi, function (match, pre, codeClass) {
          if (pre) {
            return '<pre class="prettyprint linenums"><code' + codeClass + '>';
          } else {
            return ' <code class="prettyprint">';
          }
        });
      }
    }];
  });
}));

//# sourceMappingURL=showdown-prettify.js.map