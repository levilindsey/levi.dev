(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _src = require('./src');

Object.keys(_src).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _src[key];
    }
  });
});

},{"./src":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lslAnimatex = require('lsl-animatex');

Object.keys(_lslAnimatex).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _lslAnimatex[key];
    }
  });
});

var _grafx = require('grafx');

Object.keys(_grafx).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _grafx[key];
    }
  });
});

var _lslPhysx = require('lsl-physx');

Object.keys(_lslPhysx).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _lslPhysx[key];
    }
  });
});

var _collidablePhysicsModelController = require('./src/collidable-physics-model-controller');

Object.keys(_collidablePhysicsModelController).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _collidablePhysicsModelController[key];
    }
  });
});

var _configController = require('./src/config-controller');

Object.keys(_configController).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _configController[key];
    }
  });
});

var _gameController = require('./src/game-controller');

Object.keys(_gameController).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _gameController[key];
    }
  });
});

var _gameScene = require('./src/game-scene');

Object.keys(_gameScene).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _gameScene[key];
    }
  });
});

var _inputController = require('./src/input-controller');

Object.keys(_inputController).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _inputController[key];
    }
  });
});

var _physicsModelController = require('./src/physics-model-controller');

Object.keys(_physicsModelController).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _physicsModelController[key];
    }
  });
});

var _springFollowCamera = require('./src/spring-follow-camera');

Object.keys(_springFollowCamera).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _springFollowCamera[key];
    }
  });
});

var _wall = require('./wall');

Object.keys(_wall).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _wall[key];
    }
  });
});

},{"./src/collidable-physics-model-controller":3,"./src/config-controller":4,"./src/game-controller":5,"./src/game-scene":6,"./src/input-controller":7,"./src/physics-model-controller":8,"./src/spring-follow-camera":9,"./wall":10,"grafx":13,"lsl-animatex":53,"lsl-physx":61}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollidablePhysicsModelController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _physicsModelController = require('./physics-model-controller');

var _lslPhysx = require('lsl-physx');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This class represents a collidable physics-based model-controller.
 *
 * @abstract
 */
var CollidablePhysicsModelController = function (_PhysicsModelControll) {
  _inherits(CollidablePhysicsModelController, _PhysicsModelControll);

  /**
   * @param {ModelController|ModelControllerConfig} modelControllerOrParams
   * @param {CollidablePhysicsJob|DynamicsConfig} physicsJobOrDynamicsParams
   * @param {RenderableShapeConfig} [shapeParams]
   * @param {Array.<ForceApplier>} forceAppliers
   */
  function CollidablePhysicsModelController(modelControllerOrParams, physicsJobOrDynamicsParams, shapeParams, forceAppliers) {
    _classCallCheck(this, CollidablePhysicsModelController);

    var _this = _possibleConstructorReturn(this, (CollidablePhysicsModelController.__proto__ || Object.getPrototypeOf(CollidablePhysicsModelController)).call(this, modelControllerOrParams, physicsJobOrDynamicsParams, shapeParams, forceAppliers));

    if (physicsJobOrDynamicsParams instanceof _lslPhysx.CollidablePhysicsJob) {
      _this.physicsJob = physicsJobOrDynamicsParams;
    } else {
      var state = new _lslPhysx.PhysicsState(physicsJobOrDynamicsParams);
      _this.physicsJob = new _lslPhysx.CollidablePhysicsJob(shapeParams, state, forceAppliers, _this, function (collision) {
        return _this.handleCollision(collision);
      });
    }

    // CollidablePhysicsModelController is an abstract class. It should not be instantiated directly.
    if (new.target === CollidablePhysicsModelController) {
      throw new TypeError('Cannot construct CollidablePhysicsModelController instances directly');
    }
    return _this;
  }

  /**
   * This callback is triggered in response to a collision.
   *
   * @param {Collision} collision
   * @returns {boolean} True if this needs the standard collision restitution to proceed.
   * @abstract
   */


  _createClass(CollidablePhysicsModelController, [{
    key: 'handleCollision',
    value: function handleCollision(collision) {
      // Extending classes should implement this method.
      throw new TypeError('Method not implemented');
    }
  }]);

  return CollidablePhysicsModelController;
}(_physicsModelController.PhysicsModelController);

exports.CollidablePhysicsModelController = CollidablePhysicsModelController;

/**
 * @typedef {RenderableShapeConfig&CollidableShapeConfig} RenderableAndCollidableShapeConfig
 */

},{"./physics-model-controller":8,"lsl-physx":61}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configController = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _grafx = require('grafx');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _SMALL_SCREEN_WIDTH_THRESHOLD = 800;

/**
 * This top-level ConfigController class wraps the dat.GUI library and provides higher-level
 * configuration functionality.
 *
 * ## Configuring Parameters
 *
 * Consumers of this module will need to specify configuration parameters with a certain form. For
 * each property on a config object, an item will be created in the corresponding dat.GUI folder.
 * The type and specifics of the menu item depends on the value assigned to the config property:
 *
 * - Toggle item:
 *   - Created if the config property is a boolean.
 * - Trigger item:
 *   - Created if the config property is a function.
 * - Slider item:
 *   - Created if the config property is an object with 'min', 'max', and 'start' properties.
 *   - When the config object is parsed, this initial config object will be removed and replaced
 *     with only the current actual value.
 *   - The intervals of the slider are automatically determined by the dat.GUI library and depend on
 *     the type of the 'min'/'max'/'value' properties (int vs float). See the dat.GUI documentation
 *     for more info.
 * - Color item:
 *   - Created if the config property is an object with 'h'/'s'/'l' properties.
 *   - When the config object is parsed, this initial config object will be replaced with a new
 *     object that has 'h'/'s'/'v' properties and an 'hsl' property, which is an object containing
 *     'h'/'s'/'l' properties and a 'colorString' property that contains a valid color string to
 *     assign to a CSS property.
 *   - All 'h'/'s'/'l' and 'h'/'s'/'v' values should be in the range of [0,1].
 * - Text item:
 *   - Created if the config property is a String.
 */

var ConfigController = function () {
  function ConfigController() {
    _classCallCheck(this, ConfigController);

    this._datGuiWidth = 300;
    this._gui = null;
  }

  /**
   * Sets up the dat.GUI controller.
   */


  _createClass(ConfigController, [{
    key: 'initialize',
    value: function initialize() {
      var _this = this;

      // Create the dat.GUI menu.
      this._createGuiIfNotCreated(true);
      this._gui.width = this._datGuiWidth;

      // Automatically close the menu on smaller screens.
      // TODO: Check that the menu is closed initially (with no resize event) if the page loads at too small a width.
      var debouncedResize = (0, _grafx.debounce)(function () {
        return _this._onResize();
      }, 300);
      window.addEventListener('resize', debouncedResize, false);
    }

    /**
     * Clears the dat.GUI menu.
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this._gui.destroy();
    }

    /**
     * @param {boolean} isGuiVisible
     * @private
     */

  }, {
    key: '_createGuiIfNotCreated',
    value: function _createGuiIfNotCreated(isGuiVisible) {
      if (this._gui) {
        if (isGuiVisible) {
          this._gui.domElement.style.display = 'block';
        }
      } else {
        this._gui = new dat.GUI();
        if (!isGuiVisible) {
          this._gui.domElement.style.display = 'none';
        }
      }
    }

    /**
     * Creates a folder with the given configuration underneath the given parent folder.
     *
     * @param {MenuFolderConfig} folderConfig
     * @param {dat.gui.GUI} [parentFolder] If not given, the folder is created at the top level.
     * @param {Object} [onChangeListeners] A map from labels to on-change handlers.
     */

  }, {
    key: 'createFolder',
    value: function createFolder(folderConfig, parentFolder, onChangeListeners) {
      this._createGuiIfNotCreated(false);

      parentFolder = parentFolder || this._gui;

      // TODO: Copy the original config and store it somehow on the dat.GUI menu item? This is important for resetting configs later (from the other controller).
      var folder = parentFolder.addFolder(folderConfig.label);

      folderConfig.folder = folder;

      this._createItems(folderConfig);

      // Add listeners from the config file.
      this._addOnChangeListeners(folderConfig, folderConfig.onChangeListeners, true);

      // Add listeners from the caller of this method.
      this._addOnChangeListeners(folderConfig, onChangeListeners, false);

      if (folderConfig.isOpen) {
        folder.open();
      }

      // Recursively create descendant folders.
      if (folderConfig.childFolders) {
        this.createFolders(folderConfig.childFolders, folder);
      }
    }

    /**
     * @param {Array.<MenuFolderConfig>} folderConfigs
     * @param {dat.gui.GUI} parentFolder
     */

  }, {
    key: 'createFolders',
    value: function createFolders(folderConfigs, parentFolder) {
      var _this2 = this;

      folderConfigs.forEach(function (folderConfig) {
        return _this2.createFolder(folderConfig, parentFolder);
      });
    }

    /**
     * @param {MenuFolderConfig} folderConfig
     * @param {string} label
     * @param {Function} callback
     */

  }, {
    key: 'addOnChangeListener',
    value: function addOnChangeListener(folderConfig, label, callback) {
      if (folderConfig.items[label]) {
        folderConfig.items[label].onChangeListeners.push(callback);
      } else {
        console.warn('Attempting to add on-change listener for a non-existent config', label, folderConfig);
      }
    }
  }, {
    key: 'hideMenu',
    value: function hideMenu() {
      console.info('Hide Menu clicked');
      document.querySelector('body > .dg').style.display = 'none';
    }

    /**
     * NOTE: This is not idempotent. This modifies the original folderConfig.config object.
     *
     * @param {MenuFolderConfig} folderConfig
     * @private
     */

  }, {
    key: '_createItems',
    value: function _createItems(folderConfig) {
      var _this3 = this;

      folderConfig.items = {};

      Object.keys(folderConfig.config).forEach(function (itemConfigKey) {
        // Do not expose internal configurations to the user.
        if (itemConfigKey.substr(0, 1) === '_') return;

        var itemConfig = folderConfig.config[itemConfigKey];

        // Determine which method to use to create the menu item.
        var pair = (0, _grafx.find)([[ConfigController.isToggleItem, ConfigController._createToggleItem], [ConfigController.isTriggerItem, ConfigController._createTriggerItem], [ConfigController.isSliderItem, ConfigController._createSliderItem], [ConfigController.isNumberItem, ConfigController._createNumberItem], [ConfigController.isHslColorItem, ConfigController._createHslColorItem], [ConfigController.isTextItem, ConfigController._createTextItem], [ConfigController.isStringSelectorItem, ConfigController._createStringSelectorItem], [ConfigController.isVec3NumberItem, ConfigController._createVec3NumberItems], [ConfigController.isVec3SliderItem, ConfigController._createVec3SliderItems]], function (pair) {
          return pair[0](itemConfig);
        });
        if (!pair) {
          console.warn('Unrecognized config type', itemConfig);
          return;
        }
        var menuItemCreator = pair[1];

        // Create the actual dat.GUI menu item and save a reference to it.
        var menuItemData = menuItemCreator.call(_this3, folderConfig.config, itemConfigKey, itemConfig, folderConfig.folder);
        if (menuItemData instanceof Array) {
          var parentMenuItemData = { onChangeListeners: [] };

          // Record the individual sub-items.
          menuItemData.forEach(function (data) {
            folderConfig.items[data.label] = data;

            // Hook up the (parent item's) onChange listeners.
            data.menuItem.onChange(function () {
              data.onChangeListeners.forEach(function (callback) {
                return callback();
              });
              parentMenuItemData.onChangeListeners.forEach(function (callback) {
                return callback();
              });
            });
          });

          // Record the parent item.
          folderConfig.items[itemConfigKey] = parentMenuItemData;
        } else {
          folderConfig.items[itemConfigKey] = menuItemData;

          // Hook up the onChange listeners.
          menuItemData.menuItem.onChange(function () {
            return menuItemData.onChangeListeners.forEach(function (callback) {
              return callback();
            });
          });
        }
      });
    }

    /**
     * @param {MenuFolderConfig} folderConfig
     * @param {Object} onChangeListeners A map from labels to on-change event handlers.
     * @param {boolean} makeInitialCallToListeners
     * @private
     */

  }, {
    key: '_addOnChangeListeners',
    value: function _addOnChangeListeners(folderConfig, onChangeListeners, makeInitialCallToListeners) {
      if (onChangeListeners) {
        Object.keys(onChangeListeners).forEach(function (key) {
          var onChangeHandler = onChangeListeners[key];
          configController.addOnChangeListener(folderConfig, key, onChangeHandler);
          if (makeInitialCallToListeners) {
            onChangeHandler();
          }
        });
      }
    }

    /**
     * Close the menu on smaller screens.
     */

  }, {
    key: '_onResize',
    value: function _onResize() {
      var _this4 = this;

      setTimeout(function () {
        if ((0, _grafx.getViewportSize)() < _SMALL_SCREEN_WIDTH_THRESHOLD) {
          _this4._gui.close();
        }
      }, 10);
    }

    /**
     * @param {Object} configObject
     * @param {string} label
     * @param {ToggleMenuItemConfig} itemConfig
     * @param {dat.gui.GUI} folder
     * @returns {MenuItemData}
     * @private
     */

  }], [{
    key: '_createToggleItem',
    value: function _createToggleItem(configObject, label, itemConfig, folder) {
      return {
        menuItem: folder.add(configObject, label),
        onChangeListeners: []
      };
    }

    /**
     * @param {Object} configObject
     * @param {string} label
     * @param {TriggerMenuItemConfig} itemConfig
     * @param {dat.gui.GUI} folder
     * @returns {MenuItemData}
     * @private
     */

  }, {
    key: '_createTriggerItem',
    value: function _createTriggerItem(configObject, label, itemConfig, folder) {
      return {
        menuItem: folder.add(configObject, label),
        onChangeListeners: []
      };
    }

    /**
     * @param {Object} configObject
     * @param {string} label
     * @param {SliderMenuItemConfig} itemConfig
     * @param {dat.gui.GUI} folder
     * @returns {MenuItemData}
     * @private
     */

  }, {
    key: '_createSliderItem',
    value: function _createSliderItem(configObject, label, itemConfig, folder) {
      // Replace the original itemConfig on the configObject with the actual starting value.
      configObject[label] = itemConfig.start;

      var listeners = (0, _grafx.isInt)(itemConfig.min) && (0, _grafx.isInt)(itemConfig.max) ? [ConfigController._truncateToInt.bind(null, configObject, label)] : [];

      // Create the menu item.
      return {
        menuItem: folder.add(configObject, label, itemConfig.min, itemConfig.max),
        onChangeListeners: listeners
      };
    }

    /**
     * @param {Object} configObject
     * @param {string} label
     * @param {NumberMenuItemConfig} itemConfig
     * @param {dat.gui.GUI} folder
     * @returns {MenuItemData}
     * @private
     */

  }, {
    key: '_createNumberItem',
    value: function _createNumberItem(configObject, label, itemConfig, folder) {
      // Create the menu item.
      return {
        menuItem: folder.add(configObject, label),
        onChangeListeners: []
      };
    }

    /**
     * This is used to force int sliders to only produce ints.
     *
     * This shouldn't be needed, but dat.GUI doesn't seem to be behaving consistently.
     *
     * @param configObject
     * @param label
     * @private
     */

  }, {
    key: '_truncateToInt',
    value: function _truncateToInt(configObject, label) {
      configObject[label] = parseInt(configObject[label]);
    }

    /**
     * @param {Object} configObject
     * @param {string} label
     * @param {HslColorMenuItemConfig} itemConfig
     * @param {dat.gui.GUI} folder
     * @returns {MenuItemData}
     * @private
     */

  }, {
    key: '_createHslColorItem',
    value: function _createHslColorItem(configObject, label, itemConfig, folder) {
      // Create the property that the menu item will use.
      itemConfig = (0, _grafx.hslToHsv)(itemConfig);
      configObject[label] = itemConfig;

      // Set up a listener that will keep derived HSL values in sync with the native HSV values used
      // by the dat.GUI menu item.
      var calculateHslValues = function calculateHslValues() {
        var hsl = (0, _grafx.hsvToHsl)(configObject[label]);
        var rgb = (0, _grafx.hslToRgb)(hsl);
        itemConfig.hsl = hsl;
        itemConfig.rgb = rgb;
        itemConfig.rgbVec = vec3.fromValues(rgb.r, rgb.g, rgb.b);
        itemConfig.hsl.colorString = (0, _grafx.createHslColorString)(hsl);
      };
      calculateHslValues();

      // Create the menu item.
      return {
        menuItem: folder.addColor(configObject, label),
        onChangeListeners: [calculateHslValues]
      };
    }

    /**
     * @param {Object} configObject
     * @param {string} label
     * @param {TextMenuItemConfig} itemConfig
     * @param {dat.gui.GUI} folder
     * @returns {MenuItemData}
     * @private
     */

  }, {
    key: '_createTextItem',
    value: function _createTextItem(configObject, label, itemConfig, folder) {
      return {
        menuItem: folder.add(configObject, label),
        onChangeListeners: []
      };
    }

    /**
     * @param {Object} configObject
     * @param {string} label
     * @param {Vec3NumberMenuItemConfig} itemConfig
     * @param {dat.gui.GUI} folder
     * @returns {Array.<MenuItemData>}
     * @private
     */

  }, {
    key: '_createVec3NumberItems',
    value: function _createVec3NumberItems(configObject, label, itemConfig, folder) {
      var xLabel = label + 'X';
      var yLabel = label + 'Y';
      var zLabel = label + 'Z';

      // Set up a listener that will keep the derived vec3 in sync with its individual coordinates.
      var _updateVec3 = function _updateVec3() {
        return vec3.set(itemConfig, configObject[xLabel], configObject[yLabel], configObject[zLabel]);
      };

      return [[0, xLabel], [1, yLabel], [2, zLabel]].map(function (indexAndLabel) {
        var index = indexAndLabel[0];
        var label = indexAndLabel[1];

        // Create the individual vec3 coordinate property and initial value.
        configObject[label] = itemConfig[index];

        // Create the individual vec3 coordinate menu item.
        return {
          menuItem: folder.add(configObject, label),
          onChangeListeners: [_updateVec3],
          label: label
        };
      });
    }

    /**
     * @param {Object} configObject
     * @param {string} label
     * @param {Vec3SliderMenuItemConfig} itemConfig
     * @param {dat.gui.GUI} folder
     * @returns {Array.<MenuItemData>}
     * @private
     */

  }, {
    key: '_createVec3SliderItems',
    value: function _createVec3SliderItems(configObject, label, itemConfig, folder) {
      // Replace the original itemConfig on the configObject with the actual starting value.
      configObject[label] = itemConfig.start;

      var xLabel = label + 'X';
      var yLabel = label + 'Y';
      var zLabel = label + 'Z';

      // Set up a listener that will keep the derived vec3 in sync with its individual coordinates.
      var _updateVec3 = function _updateVec3() {
        return vec3.set(configObject[label], configObject[xLabel], configObject[yLabel], configObject[zLabel]);
      };

      return [[0, xLabel], [1, yLabel], [2, zLabel]].map(function (indexAndLabel) {
        var index = indexAndLabel[0];
        var label = indexAndLabel[1];
        var start = itemConfig.start[index];
        var min = itemConfig.min[index];
        var max = itemConfig.max[index];

        // Create the individual vec3 coordinate property and initial value.
        configObject[label] = start;

        // Create the individual vec3 coordinate menu item.
        return {
          menuItem: folder.add(configObject, label, min, max),
          onChangeListeners: [_updateVec3],
          label: label
        };
      });
    }

    /**
     * @param {Object} configObject
     * @param {string} label
     * @param {StringSelectorMenuItemConfig} itemConfig
     * @param {dat.gui.GUI} folder
     * @returns {MenuItemData}
     * @private
     */

  }, {
    key: '_createStringSelectorItem',
    value: function _createStringSelectorItem(configObject, label, itemConfig, folder) {
      // Replace the original itemConfig on the configObject with the actual starting value.
      configObject[label] = itemConfig.start;

      return {
        menuItem: folder.add(configObject, label, itemConfig.options),
        onChangeListeners: []
      };
    }

    /**
     * @param {MenuItemConfig} itemConfig
     * @returns {boolean}
     */

  }, {
    key: 'isToggleItem',
    value: function isToggleItem(itemConfig) {
      return typeof itemConfig === 'boolean';
    }

    /**
     * @param {MenuItemConfig} itemConfig
     * @returns {boolean}
     */

  }, {
    key: 'isTriggerItem',
    value: function isTriggerItem(itemConfig) {
      return typeof itemConfig === 'function';
    }

    /**
     * @param {MenuItemConfig} itemConfig
     * @returns {boolean}
     */

  }, {
    key: 'isSliderItem',
    value: function isSliderItem(itemConfig) {
      return (typeof itemConfig === 'undefined' ? 'undefined' : _typeof(itemConfig)) === 'object' && typeof itemConfig.start === 'number' && typeof itemConfig.min === 'number' && typeof itemConfig.max === 'number';
    }

    /**
     * @param {MenuItemConfig} itemConfig
     * @returns {boolean}
     */

  }, {
    key: 'isNumberItem',
    value: function isNumberItem(itemConfig) {
      return typeof itemConfig === 'number';
    }

    /**
     * @param {MenuItemConfig} itemConfig
     * @returns {boolean}
     */

  }, {
    key: 'isHslColorItem',
    value: function isHslColorItem(itemConfig) {
      return (typeof itemConfig === 'undefined' ? 'undefined' : _typeof(itemConfig)) === 'object' && typeof itemConfig.h === 'number' && typeof itemConfig.s === 'number' && typeof itemConfig.l === 'number';
    }

    /**
     * @param {MenuItemConfig} itemConfig
     * @returns {boolean}
     */

  }, {
    key: 'isTextItem',
    value: function isTextItem(itemConfig) {
      return typeof itemConfig === 'string';
    }

    /**
     * @param {MenuItemConfig} itemConfig
     * @returns {boolean}
     */

  }, {
    key: 'isStringSelectorItem',
    value: function isStringSelectorItem(itemConfig) {
      return (typeof itemConfig === 'undefined' ? 'undefined' : _typeof(itemConfig)) === 'object' && typeof itemConfig.start === 'string' && itemConfig.options instanceof Array;
    }

    /**
     * @param {MenuItemConfig} itemConfig
     * @returns {boolean}
     */

  }, {
    key: 'isVec3NumberItem',
    value: function isVec3NumberItem(itemConfig) {
      return (itemConfig instanceof Float32Array || itemConfig instanceof Array) && itemConfig.length === 3;
    }

    /**
     * @param {MenuItemConfig} itemConfig
     * @returns {boolean}
     */

  }, {
    key: 'isVec3SliderItem',
    value: function isVec3SliderItem(itemConfig) {
      return (typeof itemConfig === 'undefined' ? 'undefined' : _typeof(itemConfig)) === 'object' && ConfigController.isVec3NumberItem(itemConfig.start) && ConfigController.isVec3NumberItem(itemConfig.min) && ConfigController.isVec3NumberItem(itemConfig.max);
    }
  }]);

  return ConfigController;
}();

var configController = new ConfigController();

exports.configController = configController;

/**
 * @typedef {Object} MenuItemData
 * @property {dat.gui.controller} menuItem The actual dat.GUI menu item.
 * @property {Array.<Function>} onChangeListeners onChange listeners for the menu item.
 * @property {string} [label] The label used for the menu item.
 */

/**
 * @typedef {Object} MenuFolderConfig
 * @property {string} label
 * @property {Object} config A map from labels to MenuItemConfigs. Any config item whose label
 * starts with '_' will be treated as internal and will not be exposed to the user.
 * @property {boolean} [isOpen=false]
 * @property {Object} [onChangeListeners] A map from labels to on-change event handlers.
 * @property {Array.<MenuFolderConfig>} [childFolders]
 * @property {Object} [items] A map from labels to MenuItemDatas.
 * @property {dat.gui.GUI} [folder] Created and added by the ConfigController after registering the
 * folder.
 */

/**
 * @typedef {ToggleMenuItemConfig|TriggerMenuItemConfig|SliderMenuItemConfig|NumberMenuItemConfig|HslColorMenuItemConfig|TextMenuItemConfig|StringSelectorMenuItemConfig|Vec3NumberMenuItemConfig|Vec3SliderMenuItemConfig} MenuItemConfig
 */

/**
 * @typedef {boolean} ToggleMenuItemConfig
 */

/**
 * @typedef {Function} TriggerMenuItemConfig
 */

/**
 * @typedef {Object} SliderMenuItemConfig
 * @property {number} start
 * @property {number} min
 * @property {number} max
 */

/**
 * @typedef {number} NumberMenuItemConfig
 */

/**
 * @typedef {Object} HslColorMenuItemConfig
 * @property {number} h A value from 0 to 1.
 * @property {number} s A value from 0 to 1.
 * @property {number} l A value from 0 to 1.
 */

/**
 * @typedef {string} TextMenuItemConfig
 */

/**
 * @typedef {Object} StringSelectorMenuItemConfig
 * @property {string} start
 * @property {Array.<String>} options
 */

/**
 * @typedef {vec3} Vec3NumberMenuItemConfig
 */

/**
 * @typedef {Object} Vec3SliderMenuItemConfig
 * @property {vec3} start
 * @property {vec3} min
 * @property {vec3} max
 */

},{"grafx":13}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lslAnimatex = require('lsl-animatex');

var _grafx = require('grafx');

var _configController = require('./config-controller');

var _inputController = require('./input-controller');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This top-level Controller class initializes and runs the rest of the app.
 */
var GameController = function (_GrafxController) {
  _inherits(GameController, _GrafxController);

  function GameController() {
    _classCallCheck(this, GameController);

    var _this = _possibleConstructorReturn(this, (GameController.__proto__ || Object.getPrototypeOf(GameController)).call(this));

    _this.isGameOver = true;
    _this._inputCtrl = null;
    return _this;
  }

  /**
   * Initializes the app. After this completes successfully, call run to actually start the app.
   *
   * @param {HTMLCanvasElement} canvas
   * @param {Array.<ProgramWrapperConfig>} programConfigs Configurations for program wrappers that
   * should be pre-cached before starting the rest of the app.
   * @param {Array.<String>} texturePaths Texture images that should be pre-cached before
   * starting the rest of the app.
   * @param {Function.<Scene>} SceneImpl A class that extends GameScene.
   * @returns {Promise}
   */


  _createClass(GameController, [{
    key: 'initialize',
    value: function initialize(canvas, programConfigs, texturePaths, SceneImpl) {
      this._canvas = canvas;

      _configController.configController.initialize();
      this._setUpInput();

      return _get(GameController.prototype.__proto__ || Object.getPrototypeOf(GameController.prototype), 'initialize', this).call(this, canvas, programConfigs, texturePaths, SceneImpl);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._inputCtrl.destroy();
    }

    /**
     * Runs the app. This should be called after initialize.
     *
     * A few things happen if this is run in dev mode:
     * - The draw and update steps of each frame are wrapped in a try/catch block.
     * - This method returns a Promise that rejects if an error is throw during any update or draw
     *   step and resolves when this controller has finished (currently never)
     */

  }, {
    key: 'run',
    value: function run() {
      var _this2 = this;

      (0, _grafx.handlePageFocusChange)(function (hasFocus) {
        return _this2._onPageFocusChange(hasFocus);
      });
      _get(GameController.prototype.__proto__ || Object.getPrototypeOf(GameController.prototype), 'run', this).call(this);
    }
  }, {
    key: 'pause',
    value: function pause() {
      _lslAnimatex.animator.pause();
    }
  }, {
    key: 'unpause',
    value: function unpause() {
      _lslAnimatex.animator.unpause();
    }

    /**
     * @returns {boolean}
     */

  }, {
    key: '_onPageFocusChange',


    /**
     * @param {boolean} hasFocus
     * @private
     */
    value: function _onPageFocusChange(hasFocus) {
      if (!hasFocus) {
        this.pause();
      }
    }

    /**
     * @private
     */

  }, {
    key: '_setUpInput',
    value: function _setUpInput() {
      this._inputCtrl = new _inputController.InputController();
      this._inputCtrl.preventDefaultBrowserBehaviorForKey('SPACE');
    }

    /**
     * Initializes the scene.
     *
     * @param {Function.<Scene>} SceneImpl A class that extends GameScene.
     * @returns {Promise}
     * @protected
     */

  }, {
    key: '_setUpScene',
    value: function _setUpScene(SceneImpl) {
      var _this3 = this;

      this._scene = new SceneImpl({
        gl: this._gl,
        getViewMatrix: function getViewMatrix() {
          return _this3._getViewMatrix();
        },
        getProjectionMatrix: function getProjectionMatrix() {
          return _this3._getProjectionMatrix();
        }
      }, this, this._inputCtrl);
      return this._scene.getIsReady().then(function () {
        _this3._scene.reset();
        _this3._updateAspectRatio(); // TODO: This should NOT happen here or using the glUtil globals.
      });
    }
  }, {
    key: 'isPaused',
    get: function get() {
      return _lslAnimatex.animator.isPaused;
    }
  }]);

  return GameController;
}(_grafx.GrafxController);

exports.GameController = GameController;

},{"./config-controller":4,"./input-controller":7,"grafx":13,"lsl-animatex":53}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameScene = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _grafx = require('grafx');

var _lslPhysx = require('lsl-physx');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This class handles the overall scene.
 *
 * @abstract
 */
var GameScene = function (_Scene) {
  _inherits(GameScene, _Scene);

  /**
   * @param {ModelGroupControllerConfig} modelControllerParams
   * @param {GameController} gameCtrl
   * @param {InputController} inputCtrl
   * @param {number} renderDistance
   */
  function GameScene(modelControllerParams, gameCtrl, inputCtrl, renderDistance) {
    _classCallCheck(this, GameScene);

    // GameScene is an abstract class. It should not be instantiated directly.
    var _this = _possibleConstructorReturn(this, (GameScene.__proto__ || Object.getPrototypeOf(GameScene)).call(this, modelControllerParams));

    if (new.target === GameScene) {
      throw new TypeError('Cannot construct GameScene instances directly');
    }

    _this._gameCtrl = gameCtrl;
    _this._inputCtrl = inputCtrl;
    _this._renderDistance = renderDistance;
    _this._bounds = _lslPhysx.Aabb.createAsUniformAroundCenter(vec3.fromValues(0, 0, 0), _this._renderDistance);
    return _this;
  }

  _createClass(GameScene, [{
    key: 'reset',
    value: function reset() {
      this.centerOfVolume = vec3.fromValues(0, 0, 0);
      _get(GameScene.prototype.__proto__ || Object.getPrototypeOf(GameScene.prototype), 'reset', this).call(this);
    }

    /** @returns {Aabb} */

  }, {
    key: 'bounds',
    get: function get() {
      return this._bounds;
    }
    /** @returns {vec3} */

  }, {
    key: 'centerOfVolume',
    get: function get() {
      return this._bounds.centerOfVolume;
    }
    /** @param {vec3} value */
    ,
    set: function set(value) {
      this._bounds.setAsUniformAroundCenter(value, this._renderDistance);
    }
  }]);

  return GameScene;
}(_grafx.Scene);

exports.GameScene = GameScene;

},{"grafx":13,"lsl-physx":61}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _grafx = require('grafx');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO: Figure out how to capture: tab, space, escape, enter; prevent their default behaviors when
// listeners have been registered for them.

/**
 * This class handles user input.
 */
var InputController = function () {
  function InputController() {
    var _this = this;

    _classCallCheck(this, InputController);

    this._keyDownListeners = {};
    this._keyUpListeners = {};
    this._currentlyPressedKeys = {};
    this._keysToPreventDefaultBrowserBehaviorFor = {};

    this._mainKeyDownListener = function (event) {
      return _this._handleKeyDown(event);
    };
    this._mainKeyUpListener = function (event) {
      return _this._handleKeyUp(event);
    };
    this._mainKeyPressListener = function (event) {
      return _this._handleKeyPress(event);
    };

    window.addEventListener('keydown', this._mainKeyDownListener, false);
    window.addEventListener('keyup', this._mainKeyUpListener, false);
    window.addEventListener('keypress', this._mainKeyPressListener, false);
  }

  _createClass(InputController, [{
    key: 'destroy',
    value: function destroy() {
      window.removeEventListener('keydown', this._mainKeyDownListener);
      window.removeEventListener('keyup', this._mainKeyUpListener);
      window.removeEventListener('keypress', this._mainKeyPressListener);
    }

    /**
     * Registers a callback to be called whenever the given key is pressed.
     *
     * @param {string} key
     * @param {Function} callback
     */

  }, {
    key: 'addKeyDownListener',
    value: function addKeyDownListener(key, callback) {
      var listenersForKey = this._keyDownListeners[_grafx.keyCodes[key]];

      // Make sure the listener list is initialized for this key.
      if (!listenersForKey) {
        listenersForKey = new Set();
        this._keyDownListeners[_grafx.keyCodes[key]] = listenersForKey;
      }

      listenersForKey.add(callback);
    }

    /**
     * Registers a callback to be called whenever the given key is lifted.
     *
     * @param {string} key
     * @param {Function} callback
     */

  }, {
    key: 'addKeyUpListener',
    value: function addKeyUpListener(key, callback) {
      var listenersForKey = this._keyUpListeners[_grafx.keyCodes[key]];

      // Make sure the listener list is initialized for this key.
      if (!listenersForKey) {
        listenersForKey = new Set();
        this._keyUpListeners[_grafx.keyCodes[key]] = listenersForKey;
      }

      listenersForKey.add(callback);
    }

    /**
     * Un-registers a callback to be called whenever the given key is pressed.
     *
     * @param {string} key
     * @param {Function} callback
     */

  }, {
    key: 'removeKeyDownListener',
    value: function removeKeyDownListener(key, callback) {
      this._keyDownListeners[_grafx.keyCodes[key]].delete(callback);
    }

    /**
     * Un-registers a callback to be called whenever the given key is lifted.
     *
     * @param {string} key
     * @param {Function} callback
     */

  }, {
    key: 'removeKeyUpListener',
    value: function removeKeyUpListener(key, callback) {
      this._keyUpListeners[_grafx.keyCodes[key]].delete(callback);
    }

    /**
     * Registers the given key to prevent the default browser behavior when it is pressed.
     *
     * @param {string} key
     */

  }, {
    key: 'preventDefaultBrowserBehaviorForKey',
    value: function preventDefaultBrowserBehaviorForKey(key) {
      this._keysToPreventDefaultBrowserBehaviorFor[_grafx.keyCodes[key]] = true;
    }

    /**
     * Un-registers the given key to prevent the default browser behavior when it is pressed.
     *
     * @param {string} key
     */

  }, {
    key: 'allowDefaultBrowserBehaviorForKey',
    value: function allowDefaultBrowserBehaviorForKey(key) {
      delete this._keysToPreventDefaultBrowserBehaviorFor[_grafx.keyCodes[key]];
    }

    /**
     * Determines whether the given key is currently pressed down.
     *
     * @param {string} key
     * @returns {boolean}
     */

  }, {
    key: 'isKeyCurrentlyPressed',
    value: function isKeyCurrentlyPressed(key) {
      return !!this._currentlyPressedKeys[_grafx.keyCodes[key]];
    }

    /**
     * Saves the given key as being pressed.
     *
     * @param {KeyboardEvent} event
     * @private
     */

  }, {
    key: '_handleKeyDown',
    value: function _handleKeyDown(event) {
      // If this key was already being pressed down, then do nothing (when a key is held down, many
      // keydown events are actually triggered).
      if (this._currentlyPressedKeys[event.keyCode]) {
        return;
      }

      // Mark this key as being pressed down.
      this._currentlyPressedKeys[event.keyCode] = true;

      // Call any registered key-down listeners for this key.
      var listeners = this._keyDownListeners[event.keyCode];
      if (listeners) {
        listeners.forEach(function (listener) {
          return listener();
        });
      }
    }

    /**
     * Calls all key-up listeners that have been registered for the given key.
     *
     * @param {KeyboardEvent} event
     * @private
     */

  }, {
    key: '_handleKeyUp',
    value: function _handleKeyUp(event) {
      // Mark this key as no longer being pressed down.
      delete this._currentlyPressedKeys[event.keyCode];

      // Call any registered key-up listeners for this key.
      var listeners = this._keyUpListeners[event.keyCode];
      if (listeners) {
        listeners.forEach(function (listener) {
          return listener();
        });
      }
    }

    /**
     * Prevents the default browser behavior for keys that have been registered to prevent.
     *
     * @param {KeyboardEvent} event
     * @private
     */

  }, {
    key: '_handleKeyPress',
    value: function _handleKeyPress(event) {
      if (this._keysToPreventDefaultBrowserBehaviorFor[event.keyCode]) {
        event.preventDefault();
      }
    }
  }]);

  return InputController;
}();

exports.InputController = InputController;

},{"grafx":13}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysicsModelController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _grafx = require('grafx');

var _lslPhysx = require('lsl-physx');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class represents a non-collidable physics-based model-controller.
 *
 * It uses composition to control an instance of a ModelController along with a corresponding
 * instance of a PhysicsJob.
 *
 * @implements {ModelControllerInterface}
 * @abstract
 */
var PhysicsModelController = function () {
  /**
   * @param {ModelController|ModelControllerConfig} modelControllerOrParams
   * @param {PhysicsJob|DynamicsConfig} physicsJobOrDynamicsParams
   * @param {RenderableShapeConfig} [shapeParams]
   * @param {Array.<ForceApplier>} [forceAppliers]
   */
  function PhysicsModelController(modelControllerOrParams, physicsJobOrDynamicsParams, shapeParams, forceAppliers) {
    var _this = this;

    _classCallCheck(this, PhysicsModelController);

    // PhysicsModelController is an abstract class. It should not be instantiated directly.
    if (new.target === PhysicsModelController) {
      throw new TypeError('Cannot construct PhysicsModelController instances directly');
    }

    this.modelCtrl = modelControllerOrParams instanceof _grafx.ModelController ? modelControllerOrParams : new _grafx.StandardModelController(modelControllerOrParams, shapeParams);

    if (physicsJobOrDynamicsParams instanceof _lslPhysx.PhysicsJob) {
      this.physicsJob = physicsJobOrDynamicsParams;
    } else {
      var state = new _lslPhysx.PhysicsState(physicsJobOrDynamicsParams);
      this.physicsJob = new _lslPhysx.PhysicsJob(forceAppliers, state);
    }

    this._originalPosition = vec3.clone(this.physicsJob.currentState.position);

    this._patchModelController({
      /**
       * Patches the ModelController's updateTransforms method in order to keep it's local-transform
       * matrix in-sync with the PhysicsJob's position and orientation.
       */
      updateTransforms: function updateTransforms(superVersion) {
        // Update the ModelController's local-transform matrix according to the PhysicsJob's
        // current position and orientation.
        mat4.fromRotationTranslationScale(_this.modelCtrl._localTransform, _this.renderOrientation, _this.renderPosition, _this.modelCtrl.scale);
        superVersion();
      }
    });

    if (_grafx.isInDevMode) {
      var controllerName = this.constructor.name.replace('Controller', '');
      console.debug(controllerName + ' created @ ' + (0, _grafx.vec3ToString)(this.position));
    }
  }

  /**
   * Patches the given methods on the underlying ModelController.
   *
   * The patched methods are passed the original or "super" version of the method as the first
   * argument; the normal method arguments are provided after.
   *
   * @protected
   */


  _createClass(PhysicsModelController, [{
    key: '_patchModelController',
    value: function _patchModelController(patches) {
      var _this2 = this;

      Object.keys(patches).forEach(function (methodName) {
        var newMethod = patches[methodName];
        var superVersion = _this2.modelCtrl[methodName].bind(_this2.modelCtrl);
        _this2.modelCtrl[methodName] = newMethod.bind(_this2.modelCtrl, superVersion);
      });
    }

    /**
     * Registers this controller's PhysicsJob(s) with the physics engine.
     */

  }, {
    key: 'reset',
    value: function reset() {
      this.modelCtrl.reset();
      this.physicsJob.position = this._originalPosition;
      this.physicsJob.finish();
      this.physicsJob.start();
    }

    /**
     * Unregisters this controller's PhysicsJob(s) with the physics engine.
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this.modelCtrl.destroy();
      this.physicsJob.finish();
      if (_grafx.isInDevMode) {
        var controllerName = this.constructor.name.replace('Controller', '');
        console.debug(controllerName + ' destroyed @ ' + (0, _grafx.vec3ToString)(this.position));
      }
    }

    /** @param {vec3} value */

  }, {
    key: 'getIsReady',

    /**
     * Returns a promise that resolves when this model controller is ready for the app to run.
     *
     * @returns {Promise}
     */
    value: function getIsReady() {
      return this.modelCtrl.getIsReady();
    }
    /**
     * Gets the model transform matrix, in local coordinates.
     *
     * @returns {mat4}
     */

  }, {
    key: 'updateSelfAndChildren',

    /**
     * Calls update, updateTransforms, and updateChildren.
     *
     * @param {DOMHighResTimeStamp} currentTime
     * @param {DOMHighResTimeStamp} deltaTime
     */
    value: function updateSelfAndChildren(currentTime, deltaTime) {
      this.modelCtrl.updateSelfAndChildren(currentTime, deltaTime);
    }
  }, {
    key: 'position',
    set: function set(value) {
      this.physicsJob.position = value;
    }
    /** @returns {vec3} */
    ,
    get: function get() {
      return this.physicsJob.currentState.position;
    }
    /** @returns {quat} */

  }, {
    key: 'orientation',
    get: function get() {
      return this.physicsJob.currentState.orientation;
    }
    // FIXME: Can I remove this?
    /** @returns {vec3} */

  }, {
    key: 'velocity',
    get: function get() {
      return this.physicsJob.currentState.velocity;
    }

    /** @returns {vec3} */

  }, {
    key: 'renderPosition',
    get: function get() {
      return this.physicsJob.renderState.position;
    }
    /** @returns {quat} */

  }, {
    key: 'renderOrientation',
    get: function get() {
      return this.physicsJob.renderState.orientation;
    }
    // FIXME: Can I remove this?
    /** @returns {vec3} */

  }, {
    key: 'renderVelocity',
    get: function get() {
      return this.physicsJob.renderState.velocity;
    }

    /**
     * @returns {DefaultModel}
     * @protected
     */

  }, {
    key: '_model',
    get: function get() {
      return this.modelCtrl._model;
    }
    /**
     * @returns {vec3}
     */

  }, {
    key: 'scale',
    get: function get() {
      return this.modelCtrl.scale;
    }
  }, {
    key: 'localTransform',
    get: function get() {
      return this.modelCtrl.localTransform;
    }
    /**
     * Gets the model transform matrix, in world coordinates.
     *
     * @returns {mat4}
     */

  }, {
    key: 'worldTransform',
    get: function get() {
      return this.modelCtrl.worldTransform;
    }
  }]);

  return PhysicsModelController;
}();

exports.PhysicsModelController = PhysicsModelController;

},{"grafx":13,"lsl-physx":61}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringFollowCamera = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _grafx = require('grafx');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: Ideally, this would use the built-in physics engine; however, we I tried integrating it
// before, I noticed some instability when moving at high speeds. This probably had something to do
// with accessing different versions of the target position (previousState vs currentState vs
// renderState)for force/position calculations

/**
 * This class defines a spring-based follow camera.
 *
 * This camera is positioned at a relative, flexible distance and rotation from the observed target
 * and follows the target's position and orientation with a spring force tying the camera to the
 * desired position.
 *
 * A follow camera rotates in all three dimensions; it does not have a fixed roll.
 */
var SpringFollowCamera = function (_FollowCamera) {
  _inherits(SpringFollowCamera, _FollowCamera);

  /**
   * If oldCamera is given, then the state of the new camera will be initialized to match that of
   * the old camera. This enables a smooth transition when changing cameras.
   *
   * @param {CameraTarget} cameraTarget
   * @param {FollowCameraConfig} followCameraParams
   * @param {CameraConfig} cameraParams
   * @param {Camera} [oldCamera]
   */
  function SpringFollowCamera(cameraTarget, followCameraParams, cameraParams, oldCamera) {
    _classCallCheck(this, SpringFollowCamera);

    // These could have been set in _matchOldCamera.
    var _this = _possibleConstructorReturn(this, (SpringFollowCamera.__proto__ || Object.getPrototypeOf(SpringFollowCamera)).call(this, cameraTarget, followCameraParams, cameraParams, oldCamera));

    _this._velocity = _this._velocity || vec3.create();
    _this._acceleration = _this._acceleration || vec3.create();
    return _this;
  }

  _createClass(SpringFollowCamera, [{
    key: 'reset',
    value: function reset() {
      _get(SpringFollowCamera.prototype.__proto__ || Object.getPrototypeOf(SpringFollowCamera.prototype), 'reset', this).call(this);
      vec3.copy(this._position, this._followCameraParams._intendedTranslationFromTarget);
    }

    /**
     * @param {DOMHighResTimeStamp} currentTime
     * @param {DOMHighResTimeStamp} deltaTime
     */

  }, {
    key: 'update',
    value: function update(currentTime, deltaTime) {
      this._updateAccelerationVelocityAndPosition(deltaTime);
      this._updateOrientation();
    }

    /**
     * @param {DOMHighResTimeStamp} deltaTime
     * @private
     */

  }, {
    key: '_updateAccelerationVelocityAndPosition',
    value: function _updateAccelerationVelocityAndPosition(deltaTime) {
      this._updateAcceleration();
      this._updatePosition(deltaTime);
      this._updateVelocity(deltaTime);
    }

    /**
     * Update the camera's acceleration using Hooke's law and drag.
     *
     * @private
     */

  }, {
    key: '_updateAcceleration',
    value: function _updateAcceleration() {
      this._applySpringAcceleration();
      this._applySpringDamping();
    }

    /**
     * Update the camera's acceleration using Hooke's law.
     *
     * acceleration = displacement * coefficient
     *
     * @private
     */

  }, {
    key: '_applySpringAcceleration',
    value: function _applySpringAcceleration() {
      var displacement = vec3.create();
      vec3.subtract(displacement, this._getIntendedPosition(), this._position);
      vec3.scale(this._acceleration, displacement, this._followCameraParams.springCoefficient);
    }

    /**
     * @private
     */

  }, {
    key: '_applySpringDamping',
    value: function _applySpringDamping() {
      var damping = vec3.create();
      vec3.scale(damping, this._velocity, -this._followCameraParams.dampingCoefficient);
      vec3.add(this._acceleration, this._acceleration, damping);
    }

    /**
     * Update the camera's velocity according to its current acceleration.
     *
     * @param {DOMHighResTimeStamp} deltaTime
     * @private
     */

  }, {
    key: '_updateVelocity',
    value: function _updateVelocity(deltaTime) {
      vec3.scaleAndAdd(this._velocity, this._velocity, this._acceleration, deltaTime);
    }

    /**
     * Update the camera's position according to its current velocity.
     *
     * @param {DOMHighResTimeStamp} deltaTime
     * @private
     */

  }, {
    key: '_updatePosition',
    value: function _updatePosition(deltaTime) {
      vec3.scaleAndAdd(this._position, this._position, this._velocity, deltaTime);
    }

    /**
     * @param {Camera} oldCamera
     * @protected
     */

  }, {
    key: '_matchOldCamera',
    value: function _matchOldCamera(oldCamera) {
      _get(SpringFollowCamera.prototype.__proto__ || Object.getPrototypeOf(SpringFollowCamera.prototype), '_matchOldCamera', this).call(this, oldCamera);
      if (oldCamera instanceof SpringFollowCamera) {
        this._velocity = this._velocity || vec3.create();
        this._acceleration = this._acceleration || vec3.create();
        vec3.copy(this._velocity, oldCamera._velocity);
        vec3.copy(this._acceleration, oldCamera._acceleration);
      }
    }
  }]);

  return SpringFollowCamera;
}(_grafx.FollowCamera);

exports.SpringFollowCamera = SpringFollowCamera;

},{"grafx":13}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wallCollidable = require('./src/wall-collidable');

Object.keys(_wallCollidable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _wallCollidable[key];
    }
  });
});

var _wallController = require('./src/wall-controller');

Object.keys(_wallController).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _wallController[key];
    }
  });
});

},{"./src/wall-collidable":11,"./src/wall-controller":12}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wall = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lslPhysx = require('lsl-physx');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This class represents a wall or floor.
 *
 * This is just a convenience class that extends Aabb.
 */
var Wall = function (_Aabb) {
  _inherits(Wall, _Aabb);

  /**
   * - If the x parameter is given, then a wall will be constructed along the y-z plane with its
   * surface at the x coordinate. The y and z parameters are handled similarly.
   * - Only one of the x/y/z parameters should be specified.
   * - If isOpenOnPositiveSide is true, then the wall will be open toward the positive direction.
   *
   * @param {WallParams} wallParams
   */
  function Wall(wallParams) {
    _classCallCheck(this, Wall);

    var minX = void 0;
    var minY = void 0;
    var minZ = void 0;
    var maxX = void 0;
    var maxY = void 0;
    var maxZ = void 0;

    var x = wallParams.x,
        y = wallParams.y,
        z = wallParams.z,
        isOpenOnPositiveSide = wallParams.isOpenOnPositiveSide,
        thickness = wallParams.thickness,
        halfSideLength = wallParams.halfSideLength;

    thickness = thickness || 80000;
    halfSideLength = halfSideLength || 80000;

    if (typeof x === 'number') {
      if (isOpenOnPositiveSide) {
        minX = x - thickness;
        maxX = x;
      } else {
        minX = x;
        maxX = x + thickness;
      }
      minY = -halfSideLength;
      minZ = -halfSideLength;
      maxY = halfSideLength;
      maxZ = halfSideLength;
    } else if (typeof y === 'number') {
      if (isOpenOnPositiveSide) {
        minY = y - thickness;
        maxY = y;
      } else {
        minY = y;
        maxY = y + thickness;
      }
      minX = -halfSideLength;
      minZ = -halfSideLength;
      maxX = halfSideLength;
      maxZ = halfSideLength;
    } else {
      if (isOpenOnPositiveSide) {
        minZ = z - thickness;
        maxZ = z;
      } else {
        minZ = z;
        maxZ = z + thickness;
      }
      minX = -halfSideLength;
      minY = -halfSideLength;
      maxX = halfSideLength;
      maxY = halfSideLength;
    }

    return _possibleConstructorReturn(this, (Wall.__proto__ || Object.getPrototypeOf(Wall)).call(this, minX, minY, minZ, maxX, maxY, maxZ, true));
  }

  /**
   * @returns {vec3}
   * @override
   */


  _createClass(Wall, [{
    key: 'scale',
    get: function get() {
      // Reuse the same object when this is called multiple times.
      this._scale = this._scale || vec3.create();
      vec3.set(this._scale, this.rangeX, this.rangeY, this.rangeZ);
      return this._scale;
    }
  }]);

  return Wall;
}(_lslPhysx.Aabb);

exports.Wall = Wall;

},{"lsl-physx":61}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WallController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _grafx = require('grafx');

var _lslPhysx = require('lsl-physx');

var _wallCollidable = require('./wall-collidable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This class defines a wall-controller.
 */
var WallController = function (_StandardModelControl) {
  _inherits(WallController, _StandardModelControl);

  /**
   * @param {ModelControllerConfig} modelControllerParams
   * @param {WallParams} wallParams
   */
  function WallController(modelControllerParams, wallParams) {
    _classCallCheck(this, WallController);

    var shapeParams = {
      shapeId: 'CUBE',
      isUsingSphericalNormals: wallParams.useSmoothShading,
      textureSpan: wallParams.textureSpan
    };

    var _this = _possibleConstructorReturn(this, (WallController.__proto__ || Object.getPrototypeOf(WallController)).call(this, modelControllerParams, shapeParams));

    _this._collidable = new _wallCollidable.Wall(wallParams);
    _lslPhysx.collidableStore.registerCollidable(_this._collidable);
    return _this;
  }

  _createClass(WallController, [{
    key: 'reset',
    value: function reset() {
      // Re-size and re-position the wall.
      mat4.fromTranslation(this._localTransform, this._collidable.centerOfVolume);
      mat4.scale(this._localTransform, this._localTransform, this._collidable.scale);

      _get(WallController.prototype.__proto__ || Object.getPrototypeOf(WallController.prototype), 'reset', this).call(this);
    }

    /**
     * Called when this is done being used, and is being destroyed from memory.
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      _get(WallController.prototype.__proto__ || Object.getPrototypeOf(WallController.prototype), 'destroy', this).call(this);
      _lslPhysx.collidableStore.unregisterCollidable(this._collidable);
    }

    /**
     * @param {DOMHighResTimeStamp} currentTime
     * @param {DOMHighResTimeStamp} deltaTime
     * @protected
     */

  }, {
    key: 'update',
    value: function update(currentTime, deltaTime) {}
  }]);

  return WallController;
}(_grafx.StandardModelController);

exports.WallController = WallController;

/**
 * @typedef {Object} WallParams
 * @property {number} x
 * @property {number} y
 * @property {number} z
 * @property {boolean} isOpenOnPositiveSide
 * @property {number} thickness
 * @property {number} halfSideLength
 * @property {boolean} useSmoothShading
 * @property {TextureSpan} textureSpan
 */

},{"./wall-collidable":11,"grafx":13,"lsl-physx":61}],13:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"./src":22,"dup":1}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _camera = require('./src/camera');

Object.keys(_camera).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _camera[key];
    }
  });
});

var _firstPersonCamera = require('./src/first-person-camera');

Object.keys(_firstPersonCamera).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _firstPersonCamera[key];
    }
  });
});

var _fixedCamera = require('./src/fixed-camera');

Object.keys(_fixedCamera).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _fixedCamera[key];
    }
  });
});

var _fixedFollowCamera = require('./src/fixed-follow-camera');

Object.keys(_fixedFollowCamera).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _fixedFollowCamera[key];
    }
  });
});

var _followCamera = require('./src/follow-camera');

Object.keys(_followCamera).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _followCamera[key];
    }
  });
});

var _thirdPersonCamera = require('./src/third-person-camera');

Object.keys(_thirdPersonCamera).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _thirdPersonCamera[key];
    }
  });
});

var _overheadCamera = require('./src/overhead-camera');

Object.keys(_overheadCamera).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _overheadCamera[key];
    }
  });
});

},{"./src/camera":15,"./src/first-person-camera":16,"./src/fixed-camera":17,"./src/fixed-follow-camera":18,"./src/follow-camera":19,"./src/overhead-camera":20,"./src/third-person-camera":21}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Camera = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lslAnimatex = require('lsl-animatex');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: Make the rotation quaternion based with 6DoF.

// TODO: Add support for scripting the camera to follow a curve:
// (https://msdn.microsoft.com/en-us/library/bb203908(v=xnagamestudio.31).aspx)

/**
 * This class defines common camera logic.
 *
 * @abstract
 */
var Camera = function (_PersistentAnimationJ) {
  _inherits(Camera, _PersistentAnimationJ);

  /**
   * If oldCamera is given, then the state of the new camera will be initialized to match that of
   * the old camera. This enables a smooth transition when changing cameras.
   *
   * @param {CameraConfig} cameraParams
   * @param {Camera} [oldCamera]
   */
  function Camera(cameraParams, oldCamera) {
    _classCallCheck(this, Camera);

    // Camera is an abstract class. It should not be instantiated directly.
    var _this = _possibleConstructorReturn(this, (Camera.__proto__ || Object.getPrototypeOf(Camera)).call(this));

    if (new.target === Camera) {
      throw new TypeError('Cannot construct Camera instances directly');
    }

    _this._cameraParams = cameraParams;
    _this._fovY = null;
    _this._aspectRatio = null;
    _this._zNear = null;
    _this._zFar = null;
    _this._position = vec3.create();
    _this._orientation = quat.create(); // TODO: Use this.
    _this._viewMatrix = mat4.create();
    _this._projectionMatrix = mat4.create();
    _this._viewProjectionMatrix = mat4.create();

    _this._matchOldCamera(oldCamera);
    return _this;
  }

  _createClass(Camera, [{
    key: 'reset',
    value: function reset() {
      this._setPerspective(this._cameraParams.fovY, this._cameraParams.defaultAspectRatio, this._cameraParams._zNear, this._cameraParams._zFar);
    }

    // TODO: Call this after adding support for dynamically switching cameras.

  }, {
    key: 'destroy',
    value: function destroy() {}

    /**
     * Set this camera's orientation and position.
     *
     * @param {vec3} eye The camera position.
     * @param {vec3} target The focal point.
     * @param {vec3} up The local up direction.
     * @param {vec3} viewDirection The (normalized) direction the camera is looking.
     * @protected
     */

  }, {
    key: '_setPositionAndLookAt',
    value: function _setPositionAndLookAt(eye, target, up, viewDirection) {
      vec3.copy(this._position, eye);
      this._setLookAtFromCurrentPosition(target, up, viewDirection);
    }

    /**
     * Set this camera's orientation, but do not change its position.
     *
     * @param {vec3} target The focal point.
     * @param {vec3} up The local up direction.
     * @param {vec3} viewDirection The (normalized) direction the camera is looking.
     * @protected
     */

  }, {
    key: '_setLookAtFromCurrentPosition',
    value: function _setLookAtFromCurrentPosition(target, up, viewDirection) {
      mat4.lookAt(this._viewMatrix, this._position, target, up);
      quat.rotationTo(this._orientation, this._cameraParams._defaultLookAtDirection, viewDirection); // TODO: Check this; might need to swap arguments.
      this._updateViewProjectionMatrix();
    }

    /**
     * Translate this camera by the given amount from its current position.
     *
     * @param {vec3} translation
     * @protected
     */

  }, {
    key: '_translate',
    value: function _translate(translation) {
      vec3.add(this._position, this._position, translation);
    }

    /**
     * Rotate this camera by the given amount from its current orientation.
     *
     * @param {quat} rotation
     * @protected
     */

  }, {
    key: '_rotate',
    value: function _rotate(rotation) {}
    // TODO


    /**
     * @param {number} fovY In radians.
     * @param {number} aspectRatio Width / height.
     * @param {number} zNear
     * @param {number} zFar
     * @protected
     */

  }, {
    key: '_setPerspective',
    value: function _setPerspective(fovY, aspectRatio, zNear, zFar) {
      this._fovY = fovY;
      this._aspectRatio = aspectRatio;
      this._zNear = zNear;
      this._zFar = zFar;
      this._updateProjectionMatrix();
    }

    /**
     * Re-calculates the view-projection matrix. This should be called any time either the view or
     * projection matrices is updated.
     *
     * @protected
     */

  }, {
    key: '_updateProjectionMatrix',
    value: function _updateProjectionMatrix() {
      mat4.perspective(this._projectionMatrix, this._fovY, this._aspectRatio, this._zNear, this._zFar);
      this._updateViewProjectionMatrix();
    }

    /**
     * Re-calculates the view-projection matrix. This should be called any time either the view or
     * projection matrices is updated.
     *
     * @protected
     */

  }, {
    key: '_updateViewProjectionMatrix',
    value: function _updateViewProjectionMatrix() {
      mat4.multiply(this._viewProjectionMatrix, this._projectionMatrix, this._viewMatrix);
    }

    /**
     * @param {DOMHighResTimeStamp} currentTime
     * @param {DOMHighResTimeStamp} deltaTime
     * @abstract
     */

  }, {
    key: 'update',
    value: function update(currentTime, deltaTime) {
      // Extending classes should implement this method.
      throw new TypeError('Method not implemented');
    }
  }, {
    key: 'draw',
    value: function draw() {}

    /**
     * @param {number} fovY The vertical field of view, in radians.
     * @protected
     */

  }, {
    key: '_matchOldCamera',


    /**
     * Update this camera's state to match the given old camera.
     *
     * @param {Camera} oldCamera
     * @protected
     */
    value: function _matchOldCamera(oldCamera) {
      if (!oldCamera) {
        return;
      }
      this._fovY = oldCamera._fovY;
      this._aspectRatio = oldCamera._aspectRatio;
      this._zNear = oldCamera._zNear;
      this._zFar = oldCamera._zFar;
      vec3.copy(this._position, oldCamera._position);
      vec3.copy(this._orientation, oldCamera._orientation);
      mat4.copy(this._viewMatrix, oldCamera._viewMatrix);
      mat4.copy(this._projectionMatrix, oldCamera._projectionMatrix);
      mat4.copy(this._viewProjectionMatrix, oldCamera._viewProjectionMatrix);
    }
  }, {
    key: 'fov',
    set: function set(fovY) {
      this._fovY = fovY;
      this._updateProjectionMatrix();
    }

    /**
     * @param {number} aspectRatio Width / height.
     */

  }, {
    key: 'aspectRatio',
    set: function set(aspectRatio) {
      this._setPerspective(this._cameraParams.fovY, aspectRatio, this._cameraParams._zNear, this._cameraParams._zFar);
    }

    /** @returns {vec3} */

  }, {
    key: 'position',
    get: function get() {
      return this._position;
    }
    /** @returns {quat} */

  }, {
    key: 'orientation',
    get: function get() {
      return this._orientation;
    }
    /** @returns {mat4} */

  }, {
    key: 'viewMatrix',
    get: function get() {
      return this._viewMatrix;
    }
    /** @returns {mat4} */

  }, {
    key: 'projectionMatrix',
    get: function get() {
      return this._projectionMatrix;
    }
    /** @returns {mat4} */

  }, {
    key: 'viewProjectionMatrix',
    get: function get() {
      // TODO: Stop using the above two getters and use this instead?
      return this._viewProjectionMatrix;
    }
  }]);

  return Camera;
}(_lslAnimatex.PersistentAnimationJob);

exports.Camera = Camera;

/**
 * @typedef {Function} CameraConfig
 * @property {number} fovY
 * @property {number} defaultAspectRatio
 * @property {number} _zNear
 * @property {number} _zFar
 * @property {vec3} _defaultLookAtDirection
 */

/**
 * @typedef {Object} FollowCameraConfig
 * @property {number} springCoefficient
 * @property {number} dampingCoefficient
 * @property {number} intendedDistanceFromTarget
 * @property {number} intendedRotationAngleFromTarget
 * @property {vec3} intendedRotationAxisFromTarget
 * @property {vec3} _intendedTranslationFromTarget
 */

/**
 * @typedef {Object} FirstPersonCameraConfig
 * @property {vec3} intendedDisplacementFromTarget
 * @property {vec3} viewDirection
 * @property {number} targetDistance
 */

/**
 * @typedef {Object} FixedCameraConfig
 * @property {vec3} position
 * @property {vec3} viewDirection
 * @property {vec3} _up
 */

},{"lsl-animatex":53}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FirstPersonCamera = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _camera = require('./camera');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This class defines a first-person camera.
 *
 * A first-person camera is positioned at a character and moves and rotates with the character.
 */
var FirstPersonCamera = function (_Camera) {
  _inherits(FirstPersonCamera, _Camera);

  /**
   * @param {CameraTarget} cameraTarget
   * @param {FirstPersonCameraConfig} firstPersonCameraParams
   * @param {CameraConfig} cameraParams
   * @param {Camera} [oldCamera]
   */
  function FirstPersonCamera(cameraTarget, firstPersonCameraParams, cameraParams, oldCamera) {
    _classCallCheck(this, FirstPersonCamera);

    var _this = _possibleConstructorReturn(this, (FirstPersonCamera.__proto__ || Object.getPrototypeOf(FirstPersonCamera)).call(this, cameraParams, oldCamera));

    _this._cameraTarget = cameraTarget;
    _this._firstPersonCameraParams = firstPersonCameraParams;
    _this._cameraTarget = cameraTarget;
    return _this;
  }

  /**
   * @param {DOMHighResTimeStamp} currentTime
   * @param {DOMHighResTimeStamp} deltaTime
   */


  _createClass(FirstPersonCamera, [{
    key: 'update',
    value: function update(currentTime, deltaTime) {
      this._updatePosition();
      this._updateOrientation();
    }

    /**
     * @private
     */

  }, {
    key: '_updatePosition',
    value: function _updatePosition() {
      var intendedPosition = this._getIntendedPosition();
      vec3.copy(this._position, intendedPosition);
    }

    /**
     * Update the camera's orientation using the "look at" method according to its position and the
     * position of its target.
     *
     * @protected
     */

  }, {
    key: '_updateOrientation',
    value: function _updateOrientation() {
      // Get the view direction, and transform it to align with the target's orientation.
      var viewDirection = vec3.create();
      vec3.copy(viewDirection, this._firstPersonCameraParams.viewDirection);
      vec3.transformQuat(viewDirection, viewDirection, this._cameraTarget.orientation);

      var target = vec3.create();
      vec3.scaleAndAdd(target, this._position, viewDirection, this._firstPersonCameraParams.targetDistance);

      // Initialize "up" as the world z-axis.
      var up = vec3.fromValues(0, 1, 0);

      // Transform "up" to align with the camera target's local z-axis.
      vec3.transformQuat(up, up, this._cameraTarget.orientation);

      var right = vec3.create();
      vec3.cross(right, viewDirection, up);

      // Transform "up" to align with the camera's local z-axis.
      vec3.cross(up, right, viewDirection);

      this._setPositionAndLookAt(this._position, target, up, viewDirection);
    }

    /**
     * The intended position for this camera to be in according to the position and orientation of the
     * camera target.
     *
     * @returns {vec3}
     * @protected
     * @abstract
     */

  }, {
    key: '_getIntendedPosition',
    value: function _getIntendedPosition() {
      var intendedPosition = vec3.create();
      vec3.transformMat4(intendedPosition, this._firstPersonCameraParams.intendedDisplacementFromTarget, this._cameraTarget.worldTransform);
      return intendedPosition;
    }
  }]);

  return FirstPersonCamera;
}(_camera.Camera);

exports.FirstPersonCamera = FirstPersonCamera;

},{"./camera":15}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FixedCamera = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _camera = require('./camera');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This class defines a fixed camera.
 *
 * A fixed camera's position and orientation are updated manually and remain fixed until a later
 * update.
 */
var FixedCamera = function (_Camera) {
  _inherits(FixedCamera, _Camera);

  /**
   * If oldCamera is given, then the state of the new camera will be initialized to match that of
   * the old camera. This enables a smooth transition when changing cameras.
   *
   * @param {FixedCameraConfig} fixedCameraParams
   * @param {CameraConfig} cameraParams
   * @param {Camera} [oldCamera]
   */
  function FixedCamera(fixedCameraParams, cameraParams, oldCamera) {
    _classCallCheck(this, FixedCamera);

    var _this = _possibleConstructorReturn(this, (FixedCamera.__proto__ || Object.getPrototypeOf(FixedCamera)).call(this, cameraParams, oldCamera));

    _this._position = fixedCameraParams.position;
    _this._viewDirection = fixedCameraParams.viewDirection;
    _this._up = fixedCameraParams._up;
    _this.__target = vec3.create();
    return _this;
  }

  _createClass(FixedCamera, [{
    key: 'reset',
    value: function reset() {
      _get(FixedCamera.prototype.__proto__ || Object.getPrototypeOf(FixedCamera.prototype), 'reset', this).call(this);
      this._update();
    }

    /**
     * @param {DOMHighResTimeStamp} currentTime
     * @param {DOMHighResTimeStamp} deltaTime
     */

  }, {
    key: 'update',
    value: function update(currentTime, deltaTime) {}
  }, {
    key: '_update',
    value: function _update() {
      vec3.normalize(this._viewDirection, this._viewDirection);
      vec3.normalize(this._up, this._up);

      // Transform "up" to align with the camera's local z-axis.
      var right = vec3.create();
      vec3.cross(right, this._viewDirection, this._up);
      vec3.cross(this._up, right, this._viewDirection);

      this._setPositionAndLookAt(this._position, this._target, this._up, this._viewDirection);
    }

    /** @param {vec3} newDirection */

  }, {
    key: '_matchOldCamera',


    /**
     * @param {Camera} oldCamera
     * @protected
     */
    value: function _matchOldCamera(oldCamera) {
      _get(FixedCamera.prototype.__proto__ || Object.getPrototypeOf(FixedCamera.prototype), '_matchOldCamera', this).call(this, oldCamera);
      if (oldCamera instanceof FixedCamera) {
        vec3.copy(this._viewDirection, oldCamera._viewDirection);
        vec3.copy(this._up, oldCamera._up);
      }
    }
  }, {
    key: 'viewDirection',
    set: function set(newDirection) {
      vec3.copy(this._viewDirection, newDirection);
      this._update();
    }

    /** @param {vec3} newUp */
    ,


    /** @returns {vec3} */
    get: function get() {
      return this._viewDirection;
    }
    /** @returns {vec3} */

  }, {
    key: 'up',
    set: function set(newUp) {
      vec3.copy(this._up, newUp);
      this._update();
    }

    /** @param {vec3} newPosition */
    ,
    get: function get() {
      return this._up;
    }
    /**
     * @returns {vec3}
     * @private
     */

  }, {
    key: 'position',
    set: function set(newPosition) {
      vec3.copy(this._position, newPosition);
      this._update();
    }

    /** @returns {vec3} */
    // TODO: Look into whatever bug prevents the parent-class getter from working.
    ,
    get: function get() {
      return this._position;
    }
  }, {
    key: '_target',
    get: function get() {
      return vec3.add(this.__target, this._position, this._viewDirection);
    }
  }]);

  return FixedCamera;
}(_camera.Camera);

exports.FixedCamera = FixedCamera;

},{"./camera":15}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FixedFollowCamera = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _followCamera = require('./follow-camera');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This class defines a fixed-offset follow camera.
 *
 * This camera is positioned at a relative, fixed distance and rotation from the observed target
 * and follows the target's position and orientation at this fixed distance.
 *
 * A follow camera rotates in all three dimensions; it does not have a fixed roll.
 */
var FixedFollowCamera = function (_FollowCamera) {
  _inherits(FixedFollowCamera, _FollowCamera);

  function FixedFollowCamera() {
    _classCallCheck(this, FixedFollowCamera);

    return _possibleConstructorReturn(this, (FixedFollowCamera.__proto__ || Object.getPrototypeOf(FixedFollowCamera)).apply(this, arguments));
  }

  _createClass(FixedFollowCamera, [{
    key: 'update',

    /**
     * @param {DOMHighResTimeStamp} currentTime
     * @param {DOMHighResTimeStamp} deltaTime
     */
    value: function update(currentTime, deltaTime) {
      this._updatePosition();
      this._updateOrientation();
    }

    /**
     * @private
     */

  }, {
    key: '_updatePosition',
    value: function _updatePosition() {
      var intendedPosition = this._getIntendedPosition();
      vec3.copy(this._position, intendedPosition);
    }
  }]);

  return FixedFollowCamera;
}(_followCamera.FollowCamera);

exports.FixedFollowCamera = FixedFollowCamera;

},{"./follow-camera":19}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FollowCamera = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _thirdPersonCamera = require('./third-person-camera');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This class defines an abstract follow camera.
 *
 * This is a third-person type of camera whose roll always matches that of the target.
 */
var FollowCamera = function (_ThirdPersonCamera) {
  _inherits(FollowCamera, _ThirdPersonCamera);

  function FollowCamera() {
    _classCallCheck(this, FollowCamera);

    return _possibleConstructorReturn(this, (FollowCamera.__proto__ || Object.getPrototypeOf(FollowCamera)).apply(this, arguments));
  }

  _createClass(FollowCamera, [{
    key: '_updateOrientation',

    /**
     * Update the camera's orientation using the "look at" method according to its position and the
     * position of its target.
     *
     * @protected
     */
    value: function _updateOrientation() {
      var target = this._cameraTarget.position;

      var viewDirection = vec3.create();
      vec3.subtract(viewDirection, target, this._position);
      vec3.normalize(viewDirection, viewDirection);

      // Initialize "up" as the world z-axis.
      var up = vec3.fromValues(0, 1, 0);

      // Transform "up" to align with the camera target's local z-axis.
      vec3.transformQuat(up, up, this._cameraTarget.orientation);

      var right = vec3.create();
      vec3.cross(right, viewDirection, up);

      // Transform "up" to align with the camera's local z-axis.
      vec3.cross(up, right, viewDirection);

      this._setPositionAndLookAt(this._position, target, up, viewDirection);
    }
  }]);

  return FollowCamera;
}(_thirdPersonCamera.ThirdPersonCamera);

exports.FollowCamera = FollowCamera;

},{"./third-person-camera":21}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverheadCamera = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _thirdPersonCamera = require('./third-person-camera');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This class defines an overhead camera.
 *
 * An overhead camera sits above the observed character and moves relative to the character without
 * rotating.
 *
 * An overhead camera's rotation with the character includes only yaw; it has a fixed pitch and
 * roll.
 */
var OverheadCamera = function (_ThirdPersonCamera) {
  _inherits(OverheadCamera, _ThirdPersonCamera);

  /**
   * If oldCamera is given, then the state of the new camera will be initialized to match that of
   * the old camera. This enables a smooth transition when changing cameras.
   *
   * @param {CameraTarget} cameraTarget
   * @param {FollowCameraConfig} followCameraParams
   * @param {CameraConfig} cameraParams
   * @param {Camera} [oldCamera]
   */
  function OverheadCamera(cameraTarget, followCameraParams, cameraParams, oldCamera) {
    _classCallCheck(this, OverheadCamera);

    var _this = _possibleConstructorReturn(this, (OverheadCamera.__proto__ || Object.getPrototypeOf(OverheadCamera)).call(this, cameraTarget, followCameraParams, cameraParams, oldCamera));

    _this.reset();
    return _this;
  }

  _createClass(OverheadCamera, [{
    key: 'reset',
    value: function reset() {
      _get(OverheadCamera.prototype.__proto__ || Object.getPrototypeOf(OverheadCamera.prototype), 'reset', this).call(this);
    }

    // TODO: Implement this!

  }]);

  return OverheadCamera;
}(_thirdPersonCamera.ThirdPersonCamera);

exports.OverheadCamera = OverheadCamera;

},{"./third-person-camera":21}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThirdPersonCamera = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _camera = require('./camera');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This class defines an abstract third-person camera.
 *
 * A third-person camera follows a target from a distance.
 *
 * @abstract
 */
var ThirdPersonCamera = function (_Camera) {
  _inherits(ThirdPersonCamera, _Camera);

  /**
   * If oldCamera is given, then the state of the new camera will be initialized to match that of
   * the old camera. This enables a smooth transition when changing cameras.
   *
   * @param {CameraTarget} cameraTarget
   * @param {FollowCameraConfig} followCameraParams
   * @param {CameraConfig} cameraParams
   * @param {Camera} [oldCamera]
   */
  function ThirdPersonCamera(cameraTarget, followCameraParams, cameraParams, oldCamera) {
    _classCallCheck(this, ThirdPersonCamera);

    // ThirdPersonCamera is an abstract class. It should not be instantiated directly.
    var _this = _possibleConstructorReturn(this, (ThirdPersonCamera.__proto__ || Object.getPrototypeOf(ThirdPersonCamera)).call(this, cameraParams, oldCamera));

    if (new.target === ThirdPersonCamera) {
      throw new TypeError('Cannot construct ThirdPersonCamera instances directly');
    }

    _this._followCameraParams = followCameraParams;
    _this._cameraTarget = cameraTarget;
    return _this;
  }

  /**
   * The intended position for this camera to be in according to the position and orientation of the
   * camera target.
   *
   * @returns {vec3}
   * @protected
   * @abstract
   */


  _createClass(ThirdPersonCamera, [{
    key: '_getIntendedPosition',
    value: function _getIntendedPosition() {
      var intendedPosition = vec3.create();
      vec3.transformMat4(intendedPosition, this._followCameraParams._intendedTranslationFromTarget, this._cameraTarget.worldTransform);
      return intendedPosition;
    }

    /** @param {CameraTarget} cameraTarget */

  }, {
    key: 'cameraTarget',
    set: function set(cameraTarget) {
      this._cameraTarget = cameraTarget;
    }
  }]);

  return ThirdPersonCamera;
}(_camera.Camera);

exports.ThirdPersonCamera = ThirdPersonCamera;

/**
 * @typedef {Object} CameraTarget
 * @property {vec3} position In world coordinates.
 * @property {quat} orientation Relative to the world axes.
 * @property {mat4} worldTransform The model transform matrix, in world coordinates.
 */

},{"./camera":15}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cameras = require('./cameras');

Object.keys(_cameras).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _cameras[key];
    }
  });
});

var _models = require('./models');

Object.keys(_models).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _models[key];
    }
  });
});

var _programWrapper = require('./program-wrapper');

Object.keys(_programWrapper).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _programWrapper[key];
    }
  });
});

var _renderableShapes = require('./renderable-shapes');

Object.keys(_renderableShapes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _renderableShapes[key];
    }
  });
});

var _util = require('./util');

Object.keys(_util).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _util[key];
    }
  });
});

var _grafxController = require('./src/grafx-controller');

Object.keys(_grafxController).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _grafxController[key];
    }
  });
});

var _light = require('./src/light');

Object.keys(_light).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _light[key];
    }
  });
});

var _scene = require('./src/scene');

Object.keys(_scene).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _scene[key];
    }
  });
});

},{"./cameras":14,"./models":23,"./program-wrapper":30,"./renderable-shapes":36,"./src/grafx-controller":45,"./src/light":46,"./src/scene":47,"./util":48}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defaultModel = require('./src/default-model');

Object.keys(_defaultModel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _defaultModel[key];
    }
  });
});

var _invisibleModelController = require('./src/invisible-model-controller');

Object.keys(_invisibleModelController).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _invisibleModelController[key];
    }
  });
});

var _model = require('./src/model');

Object.keys(_model).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _model[key];
    }
  });
});

var _modelController = require('./src/model-controller');

Object.keys(_modelController).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _modelController[key];
    }
  });
});

var _modelGroupController = require('./src/model-group-controller');

Object.keys(_modelGroupController).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _modelGroupController[key];
    }
  });
});

var _standardModelController = require('./src/standard-model-controller');

Object.keys(_standardModelController).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _standardModelController[key];
    }
  });
});

},{"./src/default-model":24,"./src/invisible-model-controller":25,"./src/model":28,"./src/model-controller":26,"./src/model-group-controller":27,"./src/standard-model-controller":29}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('../../util');

var _model = require('./model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This class defines a default implementation of the rigid model.
 *
 * This implementation accepts a RenderableShape and applies standard OpenGL binding logic on top
 * of it.
 */
var DefaultModel = function (_Model) {
  _inherits(DefaultModel, _Model);

  /**
   * @param {WebGLRenderingContext} gl
   * @param {RenderableShape} shapeConfig
   */
  function DefaultModel(gl, shapeConfig) {
    _classCallCheck(this, DefaultModel);

    var _this = _possibleConstructorReturn(this, (DefaultModel.__proto__ || Object.getPrototypeOf(DefaultModel)).call(this, gl));

    _this._shapeConfig = shapeConfig;
    _this._initializeBuffers();
    _this._initializeConfigs();
    return _this;
  }

  _createClass(DefaultModel, [{
    key: '_initializeBuffers',
    value: function _initializeBuffers() {
      // Create, bind, and move data into buffers for the vertex positions, normals, texture
      // coordinates, and element array.
      this._vertexPositionsBuffer = (0, _util.createBufferFromData)(this._gl, this._shapeConfig.vertexPositions);
      this._vertexNormalsBuffer = (0, _util.createBufferFromData)(this._gl, this._shapeConfig.vertexNormals);
      this._textureCoordinatesBuffer = (0, _util.createBufferFromData)(this._gl, this._shapeConfig.textureCoordinates);
      if (this._shapeConfig.vertexIndices) {
        this._vertexIndicesBuffer = (0, _util.createBufferFromData)(this._gl, this._shapeConfig.vertexIndices, this._gl.ELEMENT_ARRAY_BUFFER);
      }
    }
  }, {
    key: '_initializeConfigs',
    value: function _initializeConfigs() {
      this._vertexPositionsConfig = {
        buffer: this._vertexPositionsBuffer,
        size: 3,
        type: this._gl.FLOAT,
        normalized: false,
        stride: 0,
        offset: 0
      };
      this._textureCoordinatesConfig = {
        buffer: this._textureCoordinatesBuffer,
        size: 2,
        type: this._gl.FLOAT,
        normalized: false,
        stride: 0,
        offset: 0
      };
      this._vertexNormalsConfig = {
        buffer: this._vertexNormalsBuffer,
        size: 3,
        type: this._gl.FLOAT,
        normalized: false,
        stride: 0,
        offset: 0
      };
    }

    /** @returns {number} */

  }, {
    key: 'elementCount',
    get: function get() {
      return this._shapeConfig.elementCount;
    }

    /** @returns {number} */

  }, {
    key: 'mode',
    get: function get() {
      return this._gl.TRIANGLES;
      //return this._gl.LINE_STRIP;// TODO: REMOVE ME
    }
  }]);

  return DefaultModel;
}(_model.Model);

exports.DefaultModel = DefaultModel;

},{"../../util":48,"./model":28}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvisibleModelController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _modelController = require('./model-controller');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This class defines an extension of the model-controller class that will maintain state but will
 * never render anything.
 */
var InvisibleModelController = function (_ModelController) {
  _inherits(InvisibleModelController, _ModelController);

  /**
   * @param {ModelControllerConfig} params
   */
  function InvisibleModelController(params) {
    _classCallCheck(this, InvisibleModelController);

    return _possibleConstructorReturn(this, (InvisibleModelController.__proto__ || Object.getPrototypeOf(InvisibleModelController)).call(this, params));
  }

  _createClass(InvisibleModelController, [{
    key: 'destroy',
    value: function destroy() {}
  }, {
    key: 'update',
    value: function update(currentTime, deltaTime) {}
  }, {
    key: 'draw',
    value: function draw() {}

    /**
     * Initializes the program variables configuration.
     *
     * @protected
     */

  }, {
    key: '_setUpProgramVariablesConfig',
    value: function _setUpProgramVariablesConfig() {
      this._programVariablesConfig = {};
    }

    /**
     * Overrides the default method to instead do nothing.
     *
     * @param {string} id
     * @returns {Promise}
     */

  }, {
    key: '_setUpProgramWrapper',
    value: function _setUpProgramWrapper(id) {
      this._programWrapperId = id;
      this._programWrapperPromise = Promise.resolve(null);
      return this._programWrapperPromise;
    }
  }]);

  return InvisibleModelController;
}(_modelController.ModelController);

exports.InvisibleModelController = InvisibleModelController;

},{"./model-controller":26}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModelController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lslAnimatex = require('lsl-animatex');

var _programWrapper = require('../../program-wrapper');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This class defines a model-controller class.
 *
 * This should be extended by all components that handle models--i.e., anything that will be
 * rendering shapes.
 *
 * @implements {ModelControllerInterface}
 * @abstract
 */
var ModelController = function (_PersistentAnimationJ) {
  _inherits(ModelController, _PersistentAnimationJ);

  /**
   * PRECONDITION: The ProgramWrapper referenced by the given params must have already been
   * registered.
   *
   * @param {ModelControllerConfig} params
   */
  function ModelController(params) {
    _classCallCheck(this, ModelController);

    // ModelController is an abstract class. It should not be instantiated directly.
    var _this = _possibleConstructorReturn(this, (ModelController.__proto__ || Object.getPrototypeOf(ModelController)).call(this));

    if (new.target === ModelController) {
      throw new TypeError('Cannot construct ModelController instances directly');
    }

    _this._gl = params.gl;
    _this._getViewMatrix = params.getViewMatrix;
    _this._getProjectionMatrix = params.getProjectionMatrix;
    _this._getParentWorldTransform = params.getParentWorldTransform;
    _this._localTransform = mat4.create();
    _this._worldTransform = mat4.create();
    _this._texture = null;
    _this._programWrapper = null;
    _this._programWrapperId = null;
    _this._drawFrameHandler = function () {
      return _this.draw();
    };
    _this._programVariablesConfig = null;

    _this.position = vec3.create();
    _this.scale = vec3.fromValues(1, 1, 1);

    _this._setUpTexture(params.texturePath);
    _this._setUpProgramWrapper(params.programWrapperId);

    _this._isReadyPromise = Promise.all([_this._texturePromise, _this._programWrapperPromise]);
    return _this;
  }

  _createClass(ModelController, [{
    key: 'reset',
    value: function reset() {}

    /**
     * Called when this is done being used, and is being destroyed from memory.
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      _programWrapper.programWrapperStore.unregisterDrawFrameHandler(this._programWrapperId, this._drawFrameHandler);
    }

    /**
     * Calls update, updateTransforms, and updateChildren.
     *
     * @param {DOMHighResTimeStamp} currentTime
     * @param {DOMHighResTimeStamp} deltaTime
     */

  }, {
    key: 'updateSelfAndChildren',
    value: function updateSelfAndChildren(currentTime, deltaTime) {
      this.update(currentTime, deltaTime);
      this.updateTransforms();
      this.updateChildren(currentTime, deltaTime);
    }

    /**
     * Updates relevant state for the sub-class.
     *
     * - This does not recursively update descendant model controllers; that's handled by
     *   updateChildren.
     * - This does not update the local or world-coordinate transforms; that's handled by
     *   updateTransforms.
     * - This is called before updateLocalTransform and updateChildren.
     *
     * @param {DOMHighResTimeStamp} currentTime
     * @param {DOMHighResTimeStamp} deltaTime
     */

  }, {
    key: 'update',
    value: function update(currentTime, deltaTime) {
      // Extending classes should implement this method.
      throw new TypeError('Method not implemented');
    }

    /**
     * Updates the world-coordinate and local-coordinate model matrices.
     *
     * This is called after update and before updateChildren.
     *
     * NOTE: All overrides of this method should update [this._localTransform].
     */

  }, {
    key: 'updateTransforms',
    value: function updateTransforms() {
      mat4.multiply(this._worldTransform, this._getParentWorldTransform(), this._localTransform);
    }

    /**
     * Updates relevant state for any children model controllers.
     *
     * This is called after update and updateLocalTransform.
     *
     * @param {DOMHighResTimeStamp} currentTime
     * @param {DOMHighResTimeStamp} deltaTime
     */

  }, {
    key: 'updateChildren',
    value: function updateChildren(currentTime, deltaTime) {}

    /**
     * @abstract
     */

  }, {
    key: 'draw',
    value: function draw() {
      // Extending classes should implement this method.
      throw new TypeError('Method not implemented');
    }

    /**
     * Gets the model transform matrix, in local coordinates.
     *
     * @returns {mat4}
     */

  }, {
    key: 'getIsReady',


    /**
     * Returns a promise that resolves when this model controller is ready for the app to run.
     *
     * @returns {Promise}
     */
    value: function getIsReady() {
      return this._isReadyPromise;
    }

    /** @param {string} id */

  }, {
    key: '_setUpProgramVariablesConfig',


    /**
     * Initializes the program variables configuration.
     *
     * @protected
     * @abstract
     */
    value: function _setUpProgramVariablesConfig() {
      // Extending classes should implement this method.
      throw new TypeError('Method not implemented');
    }

    /**
     * @param {string} [texturePath]
     * @returns {Promise}
     * @private
     */

  }, {
    key: '_setUpTexture',
    value: function _setUpTexture(texturePath) {
      var _this2 = this;

      this._texturePromise = texturePath ? _programWrapper.textureStore.loadTexture(this._gl, texturePath) : Promise.resolve(null);

      // Assign the actual texture.
      this._texturePromise = this._texturePromise.then(function (texture) {
        return _this2._texture = texture;
      }).then(function () {
        return _this2._setUpProgramVariablesConfig();
      });

      return this._texturePromise;
    }

    /**
     * @param {string} id
     * @returns {Promise}
     * @private
     */

  }, {
    key: '_setUpProgramWrapper',
    value: function _setUpProgramWrapper(id) {
      var _this3 = this;

      this._programWrapperId = id;
      this._programWrapperPromise = _programWrapper.programWrapperStore.getProgramWrapperPromise(id).then(function (programWrapper) {
        return _this3._programWrapper = programWrapper;
      });
      Promise.all([this._programWrapperPromise, this._texturePromise]).then(function () {
        return _programWrapper.programWrapperStore.registerDrawFrameHandler(id, _this3._drawFrameHandler);
      });
      return this._programWrapperPromise;
    }
  }, {
    key: 'localTransform',
    get: function get() {
      return this._localTransform;
    }

    /**
     * Gets the model transform matrix, in world coordinates.
     *
     * @returns {mat4}
     */

  }, {
    key: 'worldTransform',
    get: function get() {
      return this._worldTransform;
    }
  }, {
    key: 'programWrapperId',
    set: function set(id) {
      _programWrapper.programWrapperStore.unregisterDrawFrameHandler(this._programWrapperId, this._drawFrameHandler);
      this._setUpProgramWrapper(id);
    }

    /** @param {string} value */

  }, {
    key: 'texturePath',
    set: function set(value) {
      this._setUpTexture(value);
    }
  }]);

  return ModelController;
}(_lslAnimatex.PersistentAnimationJob);

exports.ModelController = ModelController;

/**
 * @typedef {Object} ModelControllerInterface
 * @property {Function.<Promise>} getIsReady
 * @property {Function} reset
 * @property {Function} destroy
 * @property {mat4} localTransform
 * @property {mat4} worldTransform
 * @property {vec3} position
 */

/**
 * @typedef {Object} ModelControllerConfig
 * @property {WebGLRenderingContext} gl
 * @property {Function.<mat4>} getViewMatrix
 * @property {Function.<mat4>} getProjectionMatrix
 * @property {Function.<mat4>} getParentWorldTransform
 * @property {string} programWrapperId
 * @property {string} [texturePath]
 */

/**
 * @typedef {Object} ModelGroupControllerConfig
 * @property {WebGLRenderingContext} gl
 * @property {Function.<mat4>} getViewMatrix
 * @property {Function.<mat4>} getProjectionMatrix
 * @property {Function.<mat4>} getParentWorldTransform
 */

},{"../../program-wrapper":30,"lsl-animatex":53}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModelGroupController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lslAnimatex = require('lsl-animatex');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This class controls groups of models.
 *
 * This is useful for higher-level controllers that control other models and also transform them.
 *
 * @implements {ModelControllerInterface}
 * @abstract
 */
var ModelGroupController = function (_PersistentAnimationJ) {
  _inherits(ModelGroupController, _PersistentAnimationJ);

  /**
   * If either of the shader paths are omitted, then this model controller will not create a
   * rendering program configuration.
   *
   * @param {ModelGroupControllerConfig} params
   */
  function ModelGroupController(params) {
    _classCallCheck(this, ModelGroupController);

    // ModelGroupController is an abstract class. It should not be instantiated directly.
    var _this = _possibleConstructorReturn(this, (ModelGroupController.__proto__ || Object.getPrototypeOf(ModelGroupController)).call(this));

    if (new.target === ModelGroupController) {
      throw new TypeError('Cannot construct ModelGroupController instances directly');
    }

    _this._gl = params.gl;
    _this._getViewMatrix = params.getViewMatrix;
    _this._getProjectionMatrix = params.getProjectionMatrix;
    _this._getParentWorldTransform = params.getParentWorldTransform || function () {
      return mat4.create();
    };
    _this._localTransform = mat4.create();
    _this._worldTransform = mat4.create();
    _this._modelCtrls = [];
    return _this;
  }

  _createClass(ModelGroupController, [{
    key: 'destroy',
    value: function destroy() {
      this.clearModelControllers();
    }
  }, {
    key: 'reset',
    value: function reset() {
      this._triggerOnAllModelControllers('reset');
    }
  }, {
    key: 'clearModelControllers',
    value: function clearModelControllers() {
      this._triggerOnAllModelControllers('destroy');
      this._modelCtrls = [];
    }

    /**
     * Calls update, updateTransforms, and updateChildren.
     *
     * @param {DOMHighResTimeStamp} currentTime
     * @param {DOMHighResTimeStamp} deltaTime
     */

  }, {
    key: 'updateSelfAndChildren',
    value: function updateSelfAndChildren(currentTime, deltaTime) {
      this.update(currentTime, deltaTime);
      this.updateTransforms();
      this.updateChildren(currentTime, deltaTime);
    }

    /**
     * Updates relevant state for the sub-class.
     *
     * - This does not recursively update descendant model controllers; that's handled by
     *   updateChildren.
     * - This does not update the local or world-coordinate transforms; that's handled by
     *   updateTransforms.
     * - This is called before updateLocalTransform and updateChildren.
     *
     * @param {DOMHighResTimeStamp} currentTime
     * @param {DOMHighResTimeStamp} deltaTime
     */

  }, {
    key: 'update',
    value: function update(currentTime, deltaTime) {}

    /**
     * Updates the world-coordinate and local-coordinate model matrices.
     *
     * This is called after update and before updateChildren.
     *
     * NOTE: All implementations of this method should update [this._localTransform].
     */

  }, {
    key: 'updateTransforms',
    value: function updateTransforms() {
      mat4.multiply(this._worldTransform, this._getParentWorldTransform(), this._localTransform);
    }

    /**
     * Updates relevant state for any children model controllers.
     *
     * This is called after update and updateLocalTransform.
     *
     * @param {DOMHighResTimeStamp} currentTime
     * @param {DOMHighResTimeStamp} deltaTime
     */

  }, {
    key: 'updateChildren',
    value: function updateChildren(currentTime, deltaTime) {
      this._triggerOnAllModelControllers('updateSelfAndChildren', [currentTime, deltaTime]);
    }
  }, {
    key: 'draw',
    value: function draw() {}
    // We don't call draw on the children model controllers, because they register themselves to be
    // drawn with their given shader program.


    /**
     * @param {ModelControllerInterface} modelCtrl
     * @returns {Promise.<ModelControllerInterface>}
     * @protected
     */

  }, {
    key: '_startModelController',
    value: function _startModelController(modelCtrl) {
      var _this2 = this;

      return modelCtrl.getIsReady().then(function () {
        modelCtrl.reset();
        _this2._modelCtrls.push(modelCtrl);
        return modelCtrl;
      });
    }

    /**
     * @param {ModelControllerInterface} modelCtrl
     * @protected
     */

  }, {
    key: '_onModelControllerDestroyed',
    value: function _onModelControllerDestroyed(modelCtrl) {
      var index = this._modelCtrls.indexOf(modelCtrl);
      this._modelCtrls.splice(index, 1);
      modelCtrl.destroy();
    }

    /**
     * @param {vec3} targetPosition
     * @param {number} maxSquaredDistance
     * @protected
     */

  }, {
    key: '_removeDistantModelControllers',
    value: function _removeDistantModelControllers(targetPosition, maxSquaredDistance) {
      var _this3 = this;

      this._modelCtrls
      // Get the ModelControllers that are too far away.
      .filter(function (modelCtrl) {
        return vec3.squaredDistance(modelCtrl.position, targetPosition) > maxSquaredDistance;
      })
      // Remove the far-away ModelControllers.
      .forEach(function (modelCtrl) {
        return _this3._onModelControllerDestroyed(modelCtrl);
      });
    }

    /**
     * Gets the model transform matrix, in local coordinates.
     *
     * @returns {mat4}
     */

  }, {
    key: 'getIsReady',


    /**
     * Returns a promise that resolves when this model controller is ready for the app to run.
     *
     * @returns {Promise}
     */
    value: function getIsReady() {
      return Promise.all(this._modelCtrls.map(function (controller) {
        return controller.getIsReady();
      }));
    }

    /**
     * @param {string} methodName
     * @param {Array.<*>} [args]
     * @protected
     */

  }, {
    key: '_triggerOnAllModelControllers',
    value: function _triggerOnAllModelControllers(methodName) {
      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      //this._demoObject[methodName](...args);
      this._modelCtrls.forEach(function (object) {
        return object[methodName].apply(object, _toConsumableArray(args));
      });
    }
  }, {
    key: 'localTransform',
    get: function get() {
      return this._localTransform;
    }

    /**
     * Gets the model transform matrix, in world coordinates.
     *
     * @returns {mat4}
     */

  }, {
    key: 'worldTransform',
    get: function get() {
      return this._worldTransform;
    }
  }]);

  return ModelGroupController;
}(_lslAnimatex.PersistentAnimationJob);

exports.ModelGroupController = ModelGroupController;

},{"lsl-animatex":53}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class defines a top-level model.
 *
 * @abstract
 */
var Model = function () {
  /**
   * @param {WebGLRenderingContext} gl
   */
  function Model(gl) {
    _classCallCheck(this, Model);

    // Model is an abstract class. It should not be instantiated directly.
    if (new.target === Model) {
      throw new TypeError('Cannot construct Model instances directly');
    }

    this._gl = gl;
    this.bounds = null;

    this._vertexPositionsBuffer = null;
    this._vertexNormalsBuffer = null;
    this._textureCoordinatesBuffer = null;

    this._vertexPositionsConfig = null;
    this._textureCoordinatesConfig = null;
    this._vertexNormalsConfig = null;

    // If this is kept null, then gl.drawArrays will be used (with gl.ARRAY_BUFFER) instead of
    // gl.drawElements (with gl.ELEMENT_ARRAY_BUFFER).
    this._vertexIndicesBuffer = null;
  }

  /**
   * Updates the normals on this shape to either be spherical (point outwards from the center) or
   * orthogonal to the faces of their triangles.
   *
   * @param {boolean} isUsingSphericalNormals
   * @protected
   * @abstract
   */


  _createClass(Model, [{
    key: '_setNormals',
    value: function _setNormals(isUsingSphericalNormals) {
      // Extending classes should implement this method.
      throw new TypeError('Method not implemented');
    }

    /** @returns {?AttributeConfig} */

  }, {
    key: 'vertexPositionsConfig',
    get: function get() {
      return this._vertexPositionsConfig;
    }

    /** @returns {?AttributeConfig} */

  }, {
    key: 'textureCoordinatesConfig',
    get: function get() {
      return this._textureCoordinatesConfig;
    }

    /** @returns {?AttributeConfig} */

  }, {
    key: 'vertexNormalsConfig',
    get: function get() {
      return this._vertexNormalsConfig;
    }

    /** @returns {?WebGLBuffer} */

  }, {
    key: 'vertexIndicesBuffer',
    get: function get() {
      return this._vertexIndicesBuffer;
    }

    /**
     * @returns {number}
     * @abstract
     */

  }, {
    key: 'elementCount',
    get: function get() {
      // Extending classes should implement this method.
      throw new TypeError('Method not implemented');
    }

    /**
     * @returns {number}
     * @abstract
     */

  }, {
    key: 'mode',
    get: function get() {
      // Extending classes should implement this method.
      throw new TypeError('Method not implemented');
    }
  }]);

  return Model;
}();

exports.Model = Model;

},{}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StandardModelController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _renderableShapes = require('../../renderable-shapes');

var _modelController = require('./model-controller');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This class defines an extension of the model-controller class that uses a common set of program
 * variables and transformation matrices.
 */
var StandardModelController = function (_ModelController) {
  _inherits(StandardModelController, _ModelController);

  /**
   * @param {ModelControllerConfig} params
   * @param {RenderableShapeConfig} shapeParams
   */
  function StandardModelController(params, shapeParams) {
    _classCallCheck(this, StandardModelController);

    var _this = _possibleConstructorReturn(this, (StandardModelController.__proto__ || Object.getPrototypeOf(StandardModelController)).call(this, params));

    _this.scale = shapeParams.scale || vec3.fromValues(1, 1, 1);
    _this._mvMatrix = mat4.create();
    _this._normalMatrix = mat4.create();
    _this._model = _renderableShapes.renderableShapeFactory.createModel(_this._gl, shapeParams);
    return _this;
  }

  _createClass(StandardModelController, [{
    key: 'update',
    value: function update(currentTime, deltaTime) {}
  }, {
    key: 'draw',
    value: function draw() {
      // Update the model-view matrix.
      mat4.multiply(this._mvMatrix, this._getViewMatrix(), this._worldTransform);

      // Update the normal matrix.
      mat4.invert(this._normalMatrix, this._mvMatrix);
      mat4.transpose(this._normalMatrix, this._normalMatrix);

      // Update the uniform variables.
      this._programVariablesConfig.uniforms['uPMatrix'] = this._getProjectionMatrix();
      this._programVariablesConfig.uniforms['uMVMatrix'] = this._mvMatrix;
      this._programVariablesConfig.uniforms['uNormalMatrix'] = this._normalMatrix;

      // Draw shapes using the current variables configuration.
      this._programWrapper.draw(this._gl, this._programVariablesConfig, 0, this._model.elementCount);
    }

    /**
     * Initializes the program variables configuration.
     *
     * @protected
     */

  }, {
    key: '_setUpProgramVariablesConfig',
    value: function _setUpProgramVariablesConfig() {
      this._programVariablesConfig = {
        attributes: {
          aVertexPosition: this._model.vertexPositionsConfig,
          aTextureCoord: this._model.textureCoordinatesConfig,
          aVertexNormal: this._model.vertexNormalsConfig
        },
        uniforms: {
          uPMatrix: this._getProjectionMatrix(),
          uMVMatrix: this._mvMatrix,
          uNormalMatrix: this._normalMatrix,
          uSampler: this._texture
        },
        mode: this._model.mode,
        vertexIndices: this._model.vertexIndicesBuffer,
        elementCount: this._model.elementCount
      };
    }
  }]);

  return StandardModelController;
}(_modelController.ModelController);

exports.StandardModelController = StandardModelController;

},{"../../renderable-shapes":36,"./model-controller":26}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _programWrapper = require('./src/program-wrapper');

Object.keys(_programWrapper).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _programWrapper[key];
    }
  });
});

var _programWrapperStore = require('./src/program-wrapper-store');

Object.keys(_programWrapperStore).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _programWrapperStore[key];
    }
  });
});

var _textureStore = require('./src/texture-store');

Object.keys(_textureStore).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _textureStore[key];
    }
  });
});

var _uniformSetter = require('./src/uniform-setter');

Object.keys(_uniformSetter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _uniformSetter[key];
    }
  });
});

},{"./src/program-wrapper":33,"./src/program-wrapper-store":32,"./src/texture-store":34,"./src/uniform-setter":35}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupProgramWrapper = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('../../util');

var _programWrapperStore = require('./program-wrapper-store');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class wraps a collection of ProgramWrappers and supports drawing them as a group.
 */
var GroupProgramWrapper = function () {
  /**
   * @param {WebGLRenderingContext} gl
   * @param {ProgramWrapperConfig} config
   */
  function GroupProgramWrapper(gl, config) {
    _classCallCheck(this, GroupProgramWrapper);

    this.config = config;
    this._childrenProgramWrappers = [];
    this._isReady = null;

    this._loadChildren(gl, config).then(function () {
      if (config.initialize) config.initialize(gl);
      if (config.isAPostProcessor) {
        _createChildrenFramebuffersAndTextures(gl, config);
      }
    });
  }

  /** @returns {string} */


  _createClass(GroupProgramWrapper, [{
    key: 'getIsReady',


    /** @returns {Promise} */
    value: function getIsReady() {
      return this._isReady;
    }

    /**
     * Renders shapes using this program.
     *
     * @param {WebGLRenderingContext} gl
     */

  }, {
    key: 'draw',
    value: function draw(gl) {
      if (this.config.webGLStateSetter) this.config.webGLStateSetter(gl);
      this.config.childrenFramebufferIds.forEach(_clearFramebuffer.bind(this, gl));
      this.config.childrenProgramsToDraw.forEach(_drawChildProgramWrapper.bind(this, gl));
    }

    /**
     * @param {WebGLRenderingContext} gl
     * @param {ProgramWrapperConfig} config
     * @private
     */

  }, {
    key: '_loadChildren',
    value: function _loadChildren(gl, config) {
      var _this = this;

      this._isReady = Promise.all(config.childrenProgramConfigs.map(function (config) {
        return _programWrapperStore.programWrapperStore.loadProgramWrapper(gl, config).then(function (programWrapper) {
          return _this._childrenProgramWrappers.push(programWrapper);
        });
      }));
      return this._isReady;
    }
  }, {
    key: 'programId',
    get: function get() {
      return this.config.id;
    }
  }]);

  return GroupProgramWrapper;
}();

/**
 * @param {WebGLRenderingContext} gl
 * @param {string} id
 * @private
 */


function _clearFramebuffer(gl, id) {
  var framebuffer = _programWrapperStore.programWrapperStore.getFramebuffer(id);
  (0, _util.bindFramebuffer)(gl, framebuffer);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

/**
 * @param {WebGLRenderingContext} gl
 * @param {ProgramWrapperConfig} config
 * @private
 */
function _createChildrenFramebuffersAndTextures(gl, config) {
  config.childrenFramebufferIds.forEach(function (id) {
    return _programWrapperStore.programWrapperStore.createNewFramebufferAndTexture(gl, id, false);
  });
}

/**
 * @param {WebGLRenderingContext} gl
 * @param {ChildProgramAndFramebufferIds} childProgramAndFramebufferIds
 * @private
 */
function _drawChildProgramWrapper(gl, childProgramAndFramebufferIds) {
  var programId = childProgramAndFramebufferIds.programId,
      inputFramebufferIds = childProgramAndFramebufferIds.inputFramebufferIds,
      outputFramebufferId = childProgramAndFramebufferIds.outputFramebufferId;


  var framebuffer = outputFramebufferId ? _programWrapperStore.programWrapperStore.getFramebuffer(outputFramebufferId) : null;
  var programWrapper = _programWrapperStore.programWrapperStore.getProgramWrapper(programId);
  var programVariablesConfig = programWrapper.config.getProgramVariablesConfig(gl, inputFramebufferIds);

  (0, _util.bindFramebuffer)(gl, framebuffer);
  programWrapper.setProgram(gl);
  programWrapper.draw(gl, programVariablesConfig);
}

exports.GroupProgramWrapper = GroupProgramWrapper;

},{"../../util":48,"./program-wrapper-store":32}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.programWrapperStore = exports.MODELS_FRAMEBUFFER_ID = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('../../util');

var _groupProgramWrapper = require('./group-program-wrapper');

var _programWrapper = require('./program-wrapper');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class loads, compiles, and stores WebGL rendering programs.
 *
 * Also, this stores draw-frame handlers for a given program. This makes it easy for a top-level
 * controller to group together draw calls for a given program and therefore minimize program
 * switches.
 *
 * Also, this distinguishes between rendering programs that are used for rendering individual models
 * and post-processing programs that are used for manipulating the entire frame after all the models
 * have rendered.
 *
 * This also allows for grouping programs, which consist of multiple child programs that are all
 * rendered in sequence for a related purpose.
 */
var ProgramWrapperStore = function () {
  function ProgramWrapperStore() {
    _classCallCheck(this, ProgramWrapperStore);

    this._modelProgramCache = {};
    this._sortedModelPrograms = [];
    this._postProcessingProgramCache = {};
    this._sortedPostProcessingPrograms = [];
    this._frambuffers = {};
    this._textures = {};
    this._renderBuffers = {};
  }

  /**
   * Loads and caches a program wrapper using the given configuration.
   *
   * This method is idempotent; a given program will only be cached once.
   *
   * @param {WebGLRenderingContext} gl
   * @param {ProgramWrapperConfig} params
   * @returns {Promise.<ProgramWrapper|GroupProgramWrapper, Error>}
   * @private
   */


  _createClass(ProgramWrapperStore, [{
    key: 'loadProgramWrapper',
    value: function loadProgramWrapper(gl, params) {
      var cache = void 0;
      var sortedList = void 0;
      if (params.isAPostProcessor) {
        cache = this._postProcessingProgramCache;
        sortedList = this._sortedPostProcessingPrograms;
      } else {
        cache = this._modelProgramCache;
        sortedList = this._sortedModelPrograms;
      }
      var cacheInfo = cache[params.id];

      // Cache the program if it has not been previously registered.
      if (!cacheInfo) {
        cacheInfo = {};

        cacheInfo.params = params;
        cacheInfo.renderPriority = params.renderPriority;

        var programWrapper = params.childrenProgramConfigs ? new _groupProgramWrapper.GroupProgramWrapper(gl, params) : new _programWrapper.ProgramWrapper(gl, params);

        cacheInfo.programWrapper = programWrapper;
        cacheInfo.promise = programWrapper.getIsReady().then(function () {
          return cacheInfo.programWrapper;
        });

        if (params.isAPostProcessor) {
          // As soon as we know we'll use a post-processing program, make sure we create the default
          // framebuffer/texture for rendering models into.
          if (!this.modelsFramebuffer) {
            this.createNewFramebufferAndTexture(gl, MODELS_FRAMEBUFFER_ID, true);
          }
        } else {
          // Post-processing programs are not used for rendering individual models.
          cacheInfo.drawFrameHandlers = new Set();
        }

        // Store the program cache info in both a map and a list that is sorted by render priority.
        cache[params.id] = cacheInfo;
        sortedList.push(cacheInfo);
        sortedList.sort(_compareProgramCacheInfo);
      }

      return cacheInfo.promise;
    }

    /**
     * Registers the given draw-frame event handler for the given program.
     *
     * This method is idempotent; draw-frame handlers are stored in a set, so duplicate additions will
     * overwrite previous additions.
     *
     * @param {string} id
     * @param {Function} drawFrameHandler
     */

  }, {
    key: 'registerDrawFrameHandler',
    value: function registerDrawFrameHandler(id, drawFrameHandler) {
      var programCacheInfo = this._modelProgramCache[id];

      if (!programCacheInfo) {
        if (this._postProcessingProgramCache[id]) {
          // The program is not set up for rendering individual models.
          throw new Error('Cannot register a draw-frame handler for a program that is not set up for \n                         rendering individual models registered: ' + id);
        } else {
          // The program has not been registered.
          throw new Error('Cannot register a draw-frame handler for a program that has not yet been \n                         registered: ' + id);
        }
      }

      // Store the draw-frame handler.
      programCacheInfo.drawFrameHandlers.add(drawFrameHandler);
    }

    /**
     * WARNING: This will remove the program from the store even if there are still other components
     * depending on this program or its draw-frame handlers.
     *
     * @param {string} id
     */

  }, {
    key: 'deleteProgramWrapper',
    value: function deleteProgramWrapper(id) {
      // Determine which collections we're removing the program from.
      var sortedPrograms = void 0;
      var programCache = void 0;
      if (this._modelProgramCache[id]) {
        sortedPrograms = this._sortedModelPrograms;
        programCache = this._modelProgramCache;
      } else {
        sortedPrograms = this._sortedPostProcessingPrograms;
        programCache = this._postProcessingProgramCache;
      }
      var programCacheInfo = programCache[id];

      // Remove the program.
      sortedPrograms.splice(sortedPrograms.indexOf(programCacheInfo), 1);
      delete programCache[id];
    }

    // TODO: Don't forget to unregister draw-frame handlers when destroying models (asteroids, UFOs,
    // etc.)
    /**
     * @param {string} id
     * @param {Function} drawFrameHandler
     */

  }, {
    key: 'unregisterDrawFrameHandler',
    value: function unregisterDrawFrameHandler(id, drawFrameHandler) {
      this._modelProgramCache[id].drawFrameHandlers.delete(drawFrameHandler);
    }

    /**
     * @param {string} id
     * @returns {Promise}
     * @throws If there is no program registered with the given ID.
     */

  }, {
    key: 'getProgramWrapperPromise',
    value: function getProgramWrapperPromise(id) {
      var cacheInfo = this._modelProgramCache[id] || this._postProcessingProgramCache[id];
      return cacheInfo.promise;
    }

    /**
     * @param {string} id
     * @returns {ProgramWrapper}
     * @throws If there is no program registered with the given ID.
     */

  }, {
    key: 'getProgramWrapper',
    value: function getProgramWrapper(id) {
      var cacheInfo = this._modelProgramCache[id] || this._postProcessingProgramCache[id];
      return cacheInfo.programWrapper;
    }

    /**
     * Calls the given callback once for each registered per-model program wrapper.
     *
     * The callback is passed two arguments: the program wrapper and the registered draw-frame
     * handlers.
     *
     * @param {Function} callback
     */

  }, {
    key: 'forEachModelProgram',
    value: function forEachModelProgram(callback) {
      this._sortedModelPrograms.forEach(function (programCacheInfo) {
        return callback(programCacheInfo.programWrapper, programCacheInfo.drawFrameHandlers);
      });
    }

    /**
     * Calls the given callback once for each registered post-processing program wrapper.
     *
     * @param {Function} callback
     */

  }, {
    key: 'forEachPostProcessingProgram',
    value: function forEachPostProcessingProgram(callback) {
      this._sortedPostProcessingPrograms.forEach(function (programCacheInfo) {
        return callback(programCacheInfo.programWrapper);
      });
    }

    /** @returns {boolean} */

  }, {
    key: 'createNewFramebufferAndTexture',


    /**
     * Creates and stores a framebuffer with a texture.
     *
     * Both the framebuffer and texture can be accessed later using the given ID.
     *
     * @param {WebGLRenderingContext} gl
     * @param {string} id
     * @param {boolean} [shouldStoreDepthInfo=false]
     */
    value: function createNewFramebufferAndTexture(gl, id) {
      var shouldStoreDepthInfo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var renderBuffer = void 0;
      if (shouldStoreDepthInfo) {
        renderBuffer = (0, _util.createRenderBuffer)(gl);
        this._renderBuffers[id] = renderBuffer;
      }

      var texture = (0, _util.createTextureForRendering)(gl);
      this._textures[id] = texture;

      var framebuffer = (0, _util.createFramebuffer)(gl, texture, renderBuffer);
      this._frambuffers[id] = framebuffer;
    }

    /**
     * @param {string} id
     * @returns {?WebGLFramebuffer}
     */

  }, {
    key: 'getFramebuffer',
    value: function getFramebuffer(id) {
      return this._frambuffers[id];
    }

    /**
     * @param {string} id
     * @returns {?WebGLTexture}
     */

  }, {
    key: 'getTexture',
    value: function getTexture(id) {
      return this._textures[id];
    }

    /**
     * If we are using a post-processing program, then this is the default framebuffer for rendering
     * models into.
     *
     * @returns {?WebGLFramebuffer}
     */

  }, {
    key: 'isUsingPostProcessingPrograms',
    get: function get() {
      return this._sortedPostProcessingPrograms.length > 0;
    }
  }, {
    key: 'modelsFramebuffer',
    get: function get() {
      return this._frambuffers[MODELS_FRAMEBUFFER_ID];
    }

    /**
     * If we are using a post-processing program, then this is the default texture for rendering
     * models into.
     *
     * @returns {?WebGLTexture}
     */

  }, {
    key: 'modelsTexture',
    get: function get() {
      return this._textures[MODELS_FRAMEBUFFER_ID];
    }

    /**
     * If we are using a post-processing program, then this is the default depth render buffer for
     * rendering models.
     *
     * @returns {?WebGLRenderBuffer}
     */

  }, {
    key: 'modelsRenderBuffer',
    get: function get() {
      return this._renderBuffers[MODELS_FRAMEBUFFER_ID];
    }
  }]);

  return ProgramWrapperStore;
}();

function _compareProgramCacheInfo(a, b) {
  return a.renderPriority - b.renderPriority;
}

var MODELS_FRAMEBUFFER_ID = exports.MODELS_FRAMEBUFFER_ID = 'models';

var programWrapperStore = exports.programWrapperStore = new ProgramWrapperStore();

/**
 * @typedef {Object} ProgramCacheInfo
 * @property {ProgramWrapperConfig} params
 * @property {ProgramWrapper|GroupProgramWrapper} [programWrapper]
 * @property {Set.<Function>} [drawFrameHandlers]
 * @property {Array.<ProgramWrapper>} [childrenProgramWrappers]
 */

},{"../../util":48,"./group-program-wrapper":31,"./program-wrapper":33}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgramWrapper = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('../../util');

var _uniformSetter = require('./uniform-setter');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class wraps a native WebGLProgram object and provides convenience methods for:
 * - setting the wrapped program for use on the WebGL rendering context,
 * - enabling the attribute variables for the program,
 * - setting the attribute and uniform variables for the program,
 * - drawing shapes with the program and its current configuration.
 */
var ProgramWrapper = function () {
  /**
   * @param {WebGLRenderingContext} gl
   * @param {ProgramWrapperConfig} config
   */
  function ProgramWrapper(gl, config) {
    _classCallCheck(this, ProgramWrapper);

    this.config = config;
    this._program = null;
    this._uniformSetters = null;
    this._attributeEnablers = null;
    this._attributeSetters = null;

    // This is used for assigning different textures to different texture units.
    this.baseTextureUnitIndex = 0;

    this._buildWebGLProgramPromise = this._buildWebGLProgram(gl, config);

    // TODO: Freeze this object after initializing
  }

  /** @returns {string} */


  _createClass(ProgramWrapper, [{
    key: 'getIsReady',


    /** @returns {Promise} */
    value: function getIsReady() {
      return this._buildWebGLProgramPromise;
    }

    /**
     * Sets this program to use for rendering on the given WebGL context.
     *
     * This also enables all relevant attribute variables for this program.
     *
     * @param {WebGLRenderingContext} gl
     */

  }, {
    key: 'setProgram',
    value: function setProgram(gl) {
      gl.useProgram(this._program);
      this._enableAttributes();
      if (this.config.webGLStateSetter) this.config.webGLStateSetter(gl);
    }

    /**
     * Renders shapes using this program with the given variables configuration.
     *
     * @param {WebGLRenderingContext} gl
     * @param {ProgramVariablesConfig} [programVariablesConfig]
     * @param {number} [offset=0] Offset into the element array buffer to render from.
     * @param {number} [count=programVariablesConfig.elementCount] The number of elements to render.
     */

  }, {
    key: 'draw',
    value: function draw(gl, programVariablesConfig, offset, count) {
      programVariablesConfig = programVariablesConfig || this.config.getProgramVariablesConfig(gl);
      this._setVariables(gl, programVariablesConfig);
      this._draw(gl, programVariablesConfig, offset, count);
    }

    /**
     * Sets up this WebGL rendering program to draw shapes with the given program variables
     * configuration and the attribute/uniform setters that have been set up for this program.
     *
     * @param {WebGLRenderingContext} gl
     * @param {ProgramVariablesConfig} programVariablesConfig
     * @private
     */

  }, {
    key: '_setVariables',
    value: function _setVariables(gl, programVariablesConfig) {
      this._setAttributes(programVariablesConfig.attributes);
      this._setUniforms(programVariablesConfig.uniforms);

      // Check whether we are set up to draw using gl.drawElements rather than gl.drawArrays.
      if (programVariablesConfig.vertexIndices) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, programVariablesConfig.vertexIndices);
      }
    }

    /**
     * Renders shapes according to this program's current configuration.
     *
     * @param {WebGLRenderingContext} gl
     * @param {ProgramVariablesConfig} programVariablesConfig
     * @param {number} [offset=0] Offset into the element array buffer to render from.
     * @param {number} [count=programVariablesConfig.elementCount] The number of elements to render.
     * @private
     */

  }, {
    key: '_draw',
    value: function _draw(gl, programVariablesConfig, offset, count) {
      offset = typeof offset === 'number' ? offset : 0;
      count = typeof count === 'number' ? count : programVariablesConfig.elementCount;

      if (_util.isInDevMode) {
        this._checkThatGivenVariablesMatchProgram(programVariablesConfig);
      }

      // Check whether we are set up to draw using gl.drawElements or gl.drawArrays.
      if (programVariablesConfig.vertexIndices) {
        gl.drawElements(programVariablesConfig.mode, count, gl.UNSIGNED_SHORT, offset);
      } else {
        gl.drawArrays(programVariablesConfig.mode, offset, count);
      }
    }

    /**
     * Checks whether the attribute and uniform variables specified in the given config match those
     * defined in this program.
     *
     * @param {ProgramVariablesConfig} programVariablesConfig
     * @private
     */

  }, {
    key: '_checkThatGivenVariablesMatchProgram',
    value: function _checkThatGivenVariablesMatchProgram(programVariablesConfig) {
      if (Object.keys(programVariablesConfig.attributes).length !== Object.keys(this._attributeSetters).length || Object.keys(programVariablesConfig.uniforms).length !== Object.keys(this._uniformSetters).length) {
        console.warn('The attribute/uniform variables in the ProgramVariablesConfig do not match ' + 'those specified in the shaders.', programVariablesConfig, this);
      }
    }

    /**
     * Sets the uniform values for this program.
     *
     * Specifically, this calls `gl.uniform<...>(location, value)` for each
     * variable-name/variable-value key-value pair in the given map. As part of the setup process, the
     * uniform variable locations are stored in a map from their corresponding variable names. So only
     * the variable names are needed in order to call this function at render time.
     *
     * @param {Object.<String, UniformData>} uniformValues
     */

  }, {
    key: '_setUniforms',
    value: function _setUniforms(uniformValues) {
      var _this = this;

      Object.keys(uniformValues).forEach(function (uniformName) {
        var uniformSetter = _this._uniformSetters[uniformName];
        var uniformValue = uniformValues[uniformName];
        uniformSetter.setUniform(uniformValue);
      });
    }

    /**
     * Sets the attribute buffers for this program.
     *
     * Specifically, this calls `gl.bindBuffer(...)` and `gl.vertexAttribPointer(...)` for each
     * variable-name/variable-value pair in the given attribute-info map. As part of the setup
     * process, the uniform variable locations are stored in a map from their corresponding variable
     * names. So only the variable names are needed in order to call this function at render time.
     *
     * @param {Object.<String, AttributeConfig>} attributeConfigs
     */

  }, {
    key: '_setAttributes',
    value: function _setAttributes(attributeConfigs) {
      var _this2 = this;

      Object.keys(attributeConfigs).forEach(function (attributeName) {
        var attributeSetter = _this2._attributeSetters[attributeName];
        var attributeConfig = attributeConfigs[attributeName];
        attributeSetter(attributeConfig);
      });
    }

    /**
     * @private
     */

  }, {
    key: '_enableAttributes',
    value: function _enableAttributes() {
      this._attributeEnablers.forEach(function (attributeEnabler) {
        return attributeEnabler();
      });
    }

    /**
     * Creates uniform setters for this program and saves them in the _uniformSetters property.
     *
     * @param {WebGLRenderingContext} gl
     * @private
     */

  }, {
    key: '_createUniformSetters',
    value: function _createUniformSetters(gl) {
      var uniformCount = gl.getProgramParameter(this._program, gl.ACTIVE_UNIFORMS);

      this._uniformSetters = {};

      for (var index = 0; index < uniformCount; index++) {
        var uniformInfo = gl.getActiveUniform(this._program, index);
        var uniformName = uniformInfo.name;

        // Remove any array suffix.
        // TODO: Is this removal redundant with the isArray check below??
        if (uniformName.substr(-3) === '[0]') {
          uniformName = uniformName.substr(0, uniformName.length - 3);
        }

        this._uniformSetters[uniformName] = new _uniformSetter.UniformSetter(gl, this._program, uniformInfo, this);
      }
    }

    /**
     * Creates attribute enablers and setters for this program and saves them in the
     * _attributeEnablers and _attributeSetters properties, respectively.
     *
     * @param {WebGLRenderingContext} gl
     * @private
     */

  }, {
    key: '_createAttributeEnablersAndSetters',
    value: function _createAttributeEnablersAndSetters(gl) {
      this._attributeEnablers = [];
      this._attributeSetters = {};

      var attributeCount = gl.getProgramParameter(this._program, gl.ACTIVE_ATTRIBUTES);

      for (var index = 0; index < attributeCount; index++) {
        var attributeName = gl.getActiveAttrib(this._program, index).name;
        var location = gl.getAttribLocation(this._program, attributeName);

        this._attributeEnablers.push(ProgramWrapper._createAttributeEnabler(gl, location));
        this._attributeSetters[attributeName] = ProgramWrapper._createAttributeSetter(gl, location);
      }
    }

    /**
     * Loads the shader source code from the given URLs, compiles the shader source code, and creates
     * a program from the resulting shaders.
     *
     * @param {WebGLRenderingContext} gl
     * @param {ProgramWrapperConfig} config
     * @returns {Promise}
     * @private
     */

  }, {
    key: '_buildWebGLProgram',
    value: function _buildWebGLProgram(gl, config) {
      var _this3 = this;

      return (0, _util.loadProgram)(gl, config.vertexShaderPath, config.fragmentShaderPath).then(function (webGLProgram) {
        _this3._program = webGLProgram;
        _this3._createUniformSetters(gl);
        _this3._createAttributeEnablersAndSetters(gl);
        if (config.initialize) config.initialize(gl);
      }).then(function () {
        return console.info('Program loaded: ' + config.id);
      });
    }

    /**
     * @param {WebGLRenderingContext} gl
     * @param {number} location
     * @returns {Function}
     * @private
     */

  }, {
    key: 'programId',
    get: function get() {
      return this.config.id;
    }
  }], [{
    key: '_createAttributeEnabler',
    value: function _createAttributeEnabler(gl, location) {
      return function () {
        return gl.enableVertexAttribArray(location);
      };
    }

    /**
     * @param {WebGLRenderingContext} gl
     * @param {number} location
     * @returns {Function.<AttributeConfig>}
     * @private
     */

  }, {
    key: '_createAttributeSetter',
    value: function _createAttributeSetter(gl, location) {
      return function (attributeConfig) {
        gl.bindBuffer(gl.ARRAY_BUFFER, attributeConfig.buffer);
        gl.vertexAttribPointer(location, attributeConfig.size, typeof attributeConfig.type !== 'undefined' ? attributeConfig.type : gl.FLOAT, typeof attributeConfig.normalized !== 'undefined' ? attributeConfig.normalized : false, typeof attributeConfig.stride !== 'undefined' ? attributeConfig.stride : 0, typeof attributeConfig.offset !== 'undefined' ? attributeConfig.offset : 0);
      };
    }
  }]);

  return ProgramWrapper;
}();

exports.ProgramWrapper = ProgramWrapper;

/**
 * @typedef {Object} ProgramWrapperConfig
 * @property {string} id
 * @property {Function} [initialize] A method for one-time initialization of the GL state for this
 * program.
 * @property {Function} [webGLStateSetter] A method for setting up the GL state for this program
 * wrapper in preparation for the current draw call.
 * @property {number} [renderPriority] Programs with lower priority will render first. This does not
 * need to be present for ProgramWrappers that are children of a GroupProgramWrapper.
 * @property {string} [vertexShaderPath] This will be present on configs for non-group
 * ProgramWrappers.
 * @property {string} [fragmentShaderPath] This will be present on configs for non-group
 * ProgramWrappers.
 * @property {boolean} [isAPostProcessor=false] A post-processing program is used for manipulating
 * the entire frame after all the models have rendered.
 * @property {boolean} [childrenProgramConfigs] A grouping program consists of multiple child
 * programs that are all rendered in sequence for a related purpose.
 * @property {Array.<ChildProgramAndFramebufferIds>} [childrenProgramsToDraw] The IDs for the
 * sequence of children ProgramWrappers to draw, as well as the IDs for the input and output
 * framebuffers/textures to use. This will be present on configs for GroupProgramWrappers.
 * @property {Array.<string>} [childrenFramebufferIds] The IDs of all the framebuffers/textures that
 * will need to be created for this program. This will be present on configs for
 * GroupProgramWrappers.
 * @property {Function} [getProgramVariablesConfig] A method for getting the variables needed for
 * drawing this program. This will be present on configs of programs that are children of a
 * GroupProgramWrapper.
 */

/**
 * @typedef {Object} ChildProgramAndFramebufferIds
 * @property {string} programId The ID of the program to draw with.
 * @property {Array.<string>} inputFramebufferIds The IDs of framebuffers whose textures will be
 * used as inputs for this program's shaders.
 * @property {string} outputFramebufferId Provide null in order to render to the canvas.
 */

/**
 * @typedef {Object} ProgramVariablesConfig
 * @property {Object.<String, AttributeConfig>} attributes A mapping from attribute names to
 * attribute info.
 * @property {Object.<String, UniformData>} uniforms A mapping from uniform names to uniform info.
 * @property {number} mode Specifies the type of primitives to render; one of:
 *   - gl.POINTS,
 *   - gl.LINES,
 *   - gl.LINE_STRIP,
 *   - gl.LINE_LOOP,
 *   - gl.TRIANGLES,
 *   - gl.TRIANGLE_STRIP,
 *   - gl.TRIANGLE_FAN.
 * @property {WebGLBuffer} [vertexIndices] The indices to use for retrieving the vertex info from
 * each of the other attribute variable buffers. If this property is present, then the rendering
 * pipeline will be set up to use gl.drawElements (with gl.ELEMENT_ARRAY_BUFFER) instead of
 * gl.drawArrays.
 * @property {number} elementCount The number of elements/vertices to render for this variables
 * configuration.
 */

/**
 * @typedef {Object} AttributeConfig
 * @property {WebGLBuffer} buffer The buffer containing this attribute's data.
 * @property {number} index Index of target attribute in the buffer bound to gl.ARRAY_BUFFER.
 * @property {number} size The number of components per attribute. Must be 1,2,3,or 4.
 * @property {number} type Specifies the data type of each component in the array. Use either
 * gl.FLOAT or gl.FIXED.
 * @property {boolean} normalized If true, then values will be normalized to a range of -1 or 0 to
 * 1.
 * @property {number} stride Specifies the offset in bytes between the beginning of consecutive
 * vertex attributes. Default value is 0, maximum is 255. Must be a multiple of type.
 * @property {number} offset Specifies an offset in bytes of the first component of the first
 * vertex attribute in the array. Default is 0 which means that vertex attributes are tightly
 * packed. Must be a multiple of type.
 */

/** @typedef {*} UniformData */

},{"../../util":48,"./uniform-setter":35}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.textureStore = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('../../util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class loads, sets up, and stores WebGL texture objects.
 *
 * NOTE: Only textures whose side lengths are powers of two are supported.
 */
var TextureStore = function () {
  function TextureStore() {
    _classCallCheck(this, TextureStore);

    this.textureCache = {};
  }

  /**
   * @param {string} texturePath
   * @returns {WebGLTexture}
   */


  _createClass(TextureStore, [{
    key: 'getTexture',
    value: function getTexture(texturePath) {
      return this.textureCache[texturePath].texture;
    }

    /**
     * Loads the texture image at the given path, creates a texture object from it, caches the
     * texture, and returns a promise for the texture.
     *
     * This method is idempotent; a given texture will only be loaded once.
     *
     * @param {WebGLRenderingContext} gl
     * @param {string} texturePath
     * @returns {Promise.<WebGLTexture, Error>}
     */

  }, {
    key: 'loadTexture',
    value: function loadTexture(gl, texturePath) {
      var _this = this;

      var textureCacheInfo = this.textureCache[texturePath];

      // Load, create, and cache the texture if it has not been previously registered.
      if (!textureCacheInfo) {
        textureCacheInfo = {
          texturePromise: null,
          texture: null,
          image: new Image()
        };
        this.textureCache[texturePath] = textureCacheInfo;
        textureCacheInfo.texturePromise = (0, _util.loadImageSrc)(textureCacheInfo.image, texturePath).then(function (_) {
          return _this._createTexture(gl, textureCacheInfo);
        });
      }

      return textureCacheInfo.texturePromise;
    }

    // TODO: Make this more general/configurable by creating a new TextureConfig typedef with most of
    // the gl.xxx params included below (like the AttributeConfig typedef}, passing a textureConfig in
    // the register method, and saving it on the textureCacheInfo object.
    /**
     * @param {WebGLRenderingContext} gl
     * @param {TextureCacheInfo} textureCacheInfo
     * @returns {WebGLTexture}
     * @private
     */

  }, {
    key: '_createTexture',
    value: function _createTexture(gl, textureCacheInfo) {
      console.info('Texture loaded: ' + textureCacheInfo.image.src);

      textureCacheInfo.texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, textureCacheInfo.texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureCacheInfo.image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.bindTexture(gl.TEXTURE_2D, null);

      return textureCacheInfo.texture;
    }

    /**
     * WARNING: This will remove the texture from the store even if there are still other components
     * depending on this texture.
     *
     * @param {string} texturePath
     */

  }, {
    key: 'deleteTexture',
    value: function deleteTexture(texturePath) {
      delete this.textureCache[texturePath];
    }
  }]);

  return TextureStore;
}();

var textureStore = exports.textureStore = new TextureStore();

/**
 * @typedef {Object} TextureCacheInfo
 * @property {Promise.<WebGLTexture, Error>} texturePromise
 * @property {WebGLTexture} [texture]
 * @property {HTMLImageElement} [image]
 */

},{"../../util":48}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class stores a function for setting a value to a WebGL uniform variable.
 *
 * This is intended for use as a helper for the ProgramWrapper class.
 */
// TODO: Write tests for this class.
var UniformSetter = function () {
  /**
   * @param {WebGLRenderingContext} gl
   * @param {WebGLProgram} program
   * @param {WebGLActiveInfo} uniformInfo
   * @param {ProgramWrapper} programWrapper
   * @throws If the given uniformInfo specifies an unexpected uniform-value type.
   */
  function UniformSetter(gl, program, uniformInfo, programWrapper) {
    _classCallCheck(this, UniformSetter);

    this._location = gl.getUniformLocation(program, uniformInfo.name);
    this._setter = this._getSetter(gl, uniformInfo, programWrapper);

    // TODO: Freeze this object after initializing
  }

  /**
   * @param {UniformData} uniformValue
   */


  _createClass(UniformSetter, [{
    key: 'setUniform',
    value: function setUniform(uniformValue) {
      uniformValue = uniformValue instanceof Array ? new Float32Array(uniformValue) : uniformValue;
      this._setter(uniformValue);
    }

    /** @returns {WebGLUniformLocation} */

  }, {
    key: '_getSetter',


    /**
     * @param {WebGLRenderingContext} gl
     * @param {WebGLActiveInfo} uniformInfo
     * @param {ProgramWrapper} programWrapper
     * @returns {Function.<*>}
     * @throws If the given uniformInfo specifies an unexpected uniform-value type.
     * @private
     */
    value: function _getSetter(gl, uniformInfo, programWrapper) {
      var _this = this,
          _ref,
          _ref2;

      var isArray = uniformInfo.size > 1 && uniformInfo.name.substr(-3) === '[0]';
      var setterMap = isArray ? (_ref = {}, _defineProperty(_ref, gl.FLOAT, function (value) {
        return gl.uniform1fv(_this._location, value);
      }), _defineProperty(_ref, gl.INT, function (value) {
        return gl.uniform1iv(_this._location, value);
      }), _defineProperty(_ref, gl.SAMPLER_2D, this._getUniformTextureArraySetter(gl, gl.TEXTURE_2D, uniformInfo.size, programWrapper)), _defineProperty(_ref, gl.SAMPLER_CUBE, this._getUniformTextureArraySetter(gl, gl.TEXTURE_CUBE_MAP, uniformInfo.size, programWrapper)), _ref) : (_ref2 = {}, _defineProperty(_ref2, gl.FLOAT, function (value) {
        return gl.uniform1f(_this._location, value);
      }), _defineProperty(_ref2, gl.FLOAT_VEC2, function (value) {
        return gl.uniform2fv(_this._location, value);
      }), _defineProperty(_ref2, gl.FLOAT_VEC3, function (value) {
        return gl.uniform3fv(_this._location, value);
      }), _defineProperty(_ref2, gl.FLOAT_VEC4, function (value) {
        return gl.uniform4fv(_this._location, value);
      }), _defineProperty(_ref2, gl.INT, function (value) {
        return gl.uniform1i(_this._location, value);
      }), _defineProperty(_ref2, gl.INT_VEC2, function (value) {
        return gl.uniform2iv(_this._location, value);
      }), _defineProperty(_ref2, gl.INT_VEC3, function (value) {
        return gl.uniform3iv(_this._location, value);
      }), _defineProperty(_ref2, gl.INT_VEC4, function (value) {
        return gl.uniform4iv(_this._location, value);
      }), _defineProperty(_ref2, gl.BOOL, function (value) {
        return gl.uniform1i(_this._location, value);
      }), _defineProperty(_ref2, gl.BOOL_VEC2, function (value) {
        return gl.uniform2iv(_this._location, value);
      }), _defineProperty(_ref2, gl.BOOL_VEC3, function (value) {
        return gl.uniform3iv(_this._location, value);
      }), _defineProperty(_ref2, gl.BOOL_VEC4, function (value) {
        return gl.uniform4iv(_this._location, value);
      }), _defineProperty(_ref2, gl.FLOAT_MAT2, function (value) {
        return gl.uniformMatrix2fv(_this._location, false, value);
      }), _defineProperty(_ref2, gl.FLOAT_MAT3, function (value) {
        return gl.uniformMatrix3fv(_this._location, false, value);
      }), _defineProperty(_ref2, gl.FLOAT_MAT4, function (value) {
        return gl.uniformMatrix4fv(_this._location, false, value);
      }), _defineProperty(_ref2, gl.SAMPLER_2D, this._getUniformTextureSetter(gl, gl.TEXTURE_2D, programWrapper.baseTextureUnitIndex++)), _defineProperty(_ref2, gl.SAMPLER_CUBE, this._getUniformTextureSetter(gl, gl.TEXTURE_CUBE_MAP, programWrapper.baseTextureUnitIndex++)), _ref2);
      return setterMap[uniformInfo.type];
    }

    /**
     * @param {WebGLRenderingContext} gl
     * @param {number} target An enum describing the type of this buffer; one of:
     *   - gl.TEXTURE_2D,
     *   - gl.TEXTURE_CUBE_MAP.
     * @param {number} uniformSize
     * @param {ProgramWrapper} programWrapper
     * @returns {Function.<*>}
     * @private
     */

  }, {
    key: '_getUniformTextureArraySetter',
    value: function _getUniformTextureArraySetter(gl, target, uniformSize, programWrapper) {
      var _this2 = this;

      var textureUnitIndices = Array.from({ length: uniformSize }, function (_) {
        return programWrapper.baseTextureUnitIndex++;
      });

      return function (textures) {
        textures.forEach(function (texture, index) {
          gl.activeTexture(gl.TEXTURE0 + textureUnitIndices[index]);
          gl.bindTexture(target, texture);
        });
        gl.uniform1iv(_this2._location, textureUnitIndices);
      };
    }

    /**
     * @param {WebGLRenderingContext} gl
     * @param {number} target An enum describing the type of this buffer; one of:
     *   - gl.TEXTURE_2D,
     *   - gl.TEXTURE_CUBE_MAP.
     * @param {number} textureUnitIndex
     * @returns {Function.<*>}
     * @private
     */

  }, {
    key: '_getUniformTextureSetter',
    value: function _getUniformTextureSetter(gl, target, textureUnitIndex) {
      var _this3 = this;

      return function (texture) {
        gl.activeTexture(gl.TEXTURE0 + textureUnitIndex);
        gl.bindTexture(target, texture);
        gl.uniform1i(_this3._location, textureUnitIndex);
      };
    }
  }, {
    key: 'location',
    get: function get() {
      return this._location;
    }
  }]);

  return UniformSetter;
}();

exports.UniformSetter = UniformSetter;

},{}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _capsuleRenderableShape = require('./src/shape-configs/capsule-renderable-shape');

Object.keys(_capsuleRenderableShape).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _capsuleRenderableShape[key];
    }
  });
});

var _cubeRenderableShape = require('./src/shape-configs/cube-renderable-shape');

Object.keys(_cubeRenderableShape).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _cubeRenderableShape[key];
    }
  });
});

var _icosahedronRenderableShape = require('./src/shape-configs/icosahedron-renderable-shape');

Object.keys(_icosahedronRenderableShape).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _icosahedronRenderableShape[key];
    }
  });
});

var _icosphereRenderableShape = require('./src/shape-configs/icosphere-renderable-shape');

Object.keys(_icosphereRenderableShape).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _icosphereRenderableShape[key];
    }
  });
});

var _latLongSphereRenderableShape = require('./src/shape-configs/lat-long-sphere-renderable-shape');

Object.keys(_latLongSphereRenderableShape).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _latLongSphereRenderableShape[key];
    }
  });
});

var _tetrahedronRenderableShape = require('./src/shape-configs/tetrahedron-renderable-shape');

Object.keys(_tetrahedronRenderableShape).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _tetrahedronRenderableShape[key];
    }
  });
});

var _renderableShapeFactory = require('./src/renderable-shape-factory');

Object.keys(_renderableShapeFactory).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _renderableShapeFactory[key];
    }
  });
});

var _renderableShapeStore = require('./src/renderable-shape-store');

Object.keys(_renderableShapeStore).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _renderableShapeStore[key];
    }
  });
});


[_capsuleRenderableShape.capsuleRenderableShapeFactory, _cubeRenderableShape.cubeRenderableShapeFactory, _icosahedronRenderableShape.icosahedronRenderableShapeFactory, _icosphereRenderableShape.icosphereRenderableShapeFactory, _latLongSphereRenderableShape.latLongSphereRenderableShapeFactory, _tetrahedronRenderableShape.tetrahedronRenderableShapeFactory].forEach(_renderableShapeFactory.renderableShapeFactory.registerRenderableShapeFactory);

},{"./src/renderable-shape-factory":37,"./src/renderable-shape-store":38,"./src/shape-configs/capsule-renderable-shape":39,"./src/shape-configs/cube-renderable-shape":40,"./src/shape-configs/icosahedron-renderable-shape":41,"./src/shape-configs/icosphere-renderable-shape":42,"./src/shape-configs/lat-long-sphere-renderable-shape":43,"./src/shape-configs/tetrahedron-renderable-shape":44}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderableShapeFactory = undefined;

var _models = require('../../models');

var _renderableShapeStore = require('./renderable-shape-store');

/**
 * This module defines a factory for DefaultRigidModal instances that are based on the various
 * pre-defined renderable shapes in this directory.
 */

var renderableShapeFactory = {
  /**
   * @param {WebGLRenderingContext} gl
   * @param {RenderableShapeConfig} params
   * @returns {DefaultModel}
   */
  createModel: function createModel(gl, params) {
    var shapeConfig = renderableShapeFactory.getRenderableShape(params);
    return new _models.DefaultModel(gl, shapeConfig);
  },

  /**
   * @param {RenderableShapeConfig} params
   * @returns {RenderableShape}
   */
  getRenderableShape: function getRenderableShape(params) {
    params.isUsingSphericalNormals = params.isUsingSphericalNormals || false;
    params.divisionsCount = typeof params.divisionsCount === 'number' ? params.divisionsCount : 0;

    var shapeConfig = _renderableShapeStore.renderableShapeStore.getShape(params);
    if (!shapeConfig) {
      shapeConfig = _shapeIdsToRenderableShapeFactories[params.shapeId].getRenderableShape(params);
      _updateTextureCoordinatesSpan(shapeConfig, params.textureSpan);
      _renderableShapeStore.renderableShapeStore.registerShape(shapeConfig, params);
    }
    return shapeConfig;
  },

  /**
   * @param {RenderableShapeFactory} shapeConfigFactory
   */
  registerRenderableShapeFactory: function registerRenderableShapeFactory(shapeConfigFactory) {
    _shapeIdsToRenderableShapeFactories[shapeConfigFactory.shapeId] = shapeConfigFactory;
    _renderableShapeStore.renderableShapeStore.registerRenderableShapeFactory(shapeConfigFactory);
  }
};

var _shapeIdsToRenderableShapeFactories = {};

/**
 * @param {RenderableShape} shapeConfig
 * @param {TextureSpan} textureSpan
 * @private
 */
function _updateTextureCoordinatesSpan(shapeConfig, textureSpan) {
  if (!textureSpan) return;

  var minX = textureSpan.minX;
  var minY = textureSpan.minY;
  var rangeX = textureSpan.maxX - textureSpan.minX;
  var rangeY = textureSpan.maxY - textureSpan.minY;

  var textureCoordinates = shapeConfig.textureCoordinates.slice();
  shapeConfig.textureCoordinates = textureCoordinates;

  for (var i = 0, count = textureCoordinates.length; i < count; i += 2) {
    textureCoordinates[i] = minX + rangeX * textureCoordinates[i];
    textureCoordinates[i + 1] = minY + rangeY * textureCoordinates[i + 1];
  }
}

exports.renderableShapeFactory = renderableShapeFactory;

/**
 * @typedef {Object} RenderableShapeFactory
 * @property {string} shapeId
 * @property {Function.<RenderableShape>} getRenderableShape
 * @property {Function.<String>} getCacheId
 */

/**
 * @typedef {Object} RenderableShape
 * @property {Array.<Number>} vertexPositions
 * @property {Array.<Number>} vertexNormals
 * @property {Array.<Number>} textureCoordinates
 * @property {Array.<Number>} [vertexIndices]
 * @property {number} elementCount
 */

/**
 * @typedef {Object} TextureSpan
 * @property {number} minX
 * @property {number} minY
 * @property {number} maxX
 * @property {number} maxY
 */

/**
 * @typedef {Object} RenderableShapeConfig
 * @property {string} shapeId The ID of the type of renderable shape.
 * @property {boolean} [isUsingSphericalNormals=false] Whether light reflections should show sharp
 * edges.
 * @property {TextureSpan} [textureSpan] For indicating how much a texture should repeat in both axes.
 * A range of 0-0.5 should show half the texture. A range of 0-2 would show the texture twice. The
 * default is 0-1 in both directions.
 * @property {vec3} [scale]
 */

/**
 * @typedef {RenderableShapeConfig} SphericalRenderableShapeParams
 * @property {number} divisionsCount How many times to sub-divide the sphere.
 */

},{"../../models":23,"./renderable-shape-store":38}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class caches renderable shape data.
 */
var RenderableShapeStore = function () {
  function RenderableShapeStore() {
    _classCallCheck(this, RenderableShapeStore);

    this._shapeCache = new Map();
  }

  /**
   * @param {RenderableShapeConfig} params
   * @returns {RenderableShape}
   */


  _createClass(RenderableShapeStore, [{
    key: 'getShape',
    value: function getShape(params) {
      var key = _shapeIdsToCacheKeyCalculators[params.shapeId](params);
      return this._shapeCache.get(key);
    }

    /**
     * Caches the given shape info.
     *
     * @param {RenderableShape} shapeConfig
     * @param {RenderableShapeConfig} params
     */

  }, {
    key: 'registerShape',
    value: function registerShape(shapeConfig, params) {
      var key = _shapeIdsToCacheKeyCalculators[params.shapeId](params);
      this._shapeCache.set(key, shapeConfig);
    }

    /**
     * @param {RenderableShapeFactory} shapeConfigFactory
     */

  }, {
    key: 'registerRenderableShapeFactory',
    value: function registerRenderableShapeFactory(shapeConfigFactory) {
      _shapeIdsToCacheKeyCalculators[shapeConfigFactory.shapeId] = shapeConfigFactory.getCacheId;
    }

    // TODO: Add support for un-registering shapes.

  }]);

  return RenderableShapeStore;
}();

/**
 * @param {RenderableShapeConfig} params
 * @returns {string}
 */


function getCacheKey(params) {
  var textureSpanStr = params.textureSpan ? ':' + params.textureSpan.minX + ',' + params.textureSpan.minY + ',' + params.textureSpan.maxX + ',' + ('' + params.textureSpan.maxY) : '';

  return params.shapeId + ':' + params.isUsingSphericalNormals + textureSpanStr;
}

var _shapeIdsToCacheKeyCalculators = {};

var renderableShapeStore = new RenderableShapeStore();
exports.renderableShapeStore = renderableShapeStore;
exports.getCacheKey = getCacheKey;

},{}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capsuleRenderableShapeFactory = undefined;

var _util = require('../../../util');

var _renderableShapeStore = require('../renderable-shape-store');

// TODO: Once I have a better camera in place, test that these texture coordinate calculations are
// correct.

/**
 * @param {CapsuleRenderableShapeParams} params
 * @returns {RenderableShape}
 */
/**
 * This module defines a configuration factory for a capsule shape.
 *
 * The shape is centered around the origin with the poles aligned with the z-axis.
 */

function _calculateCapsuleTopShape(params) {
  // Calculate the positions.
  // TODO: This uses lat-long spheres for the ends of the capsule. Use icospheres instead.
  var individualVertexPositions = (0, _util.calculateSphericalSection)(0, params.divisionsCount / 2, Math.PI / params.divisionsCount, 0, params.divisionsCount, _util.TWO_PI / params.divisionsCount);

  // Calculate the indices and normals.
  var vertexPositions = void 0;
  var vertexIndices = void 0;
  var vertexNormals = void 0;
  if (!params.isUsingSphericalNormals) {
    // If we use orthogonal normals, then we cannot use vertexIndices.
    vertexPositions = individualVertexPositions;
    vertexIndices = null;
    vertexNormals = (0, _util.calculateOrthogonalVertexNormals)(vertexPositions);
  } else {
    var _dedupVertexArrayWith = (0, _util.dedupVertexArrayWithPositionsAndIndicesArrays)(individualVertexPositions);

    vertexPositions = _dedupVertexArrayWith.vertexPositions;
    vertexIndices = _dedupVertexArrayWith.vertexIndices;

    vertexNormals = vertexPositions;
  }

  var textureCoordinates = (0, _util.calculateLatLongTextureCoordinates)(vertexPositions);

  var scale = void 0;
  var translation = void 0;

  // Scale and translate the positions.
  scale = params.radius;
  translation = params.capsuleEndPointsDistance / 2;
  for (var i = 0, count = vertexPositions.length; i < count; i += 3) {
    vertexPositions[i] *= scale;
    vertexPositions[i + 1] *= scale;
    vertexPositions[i + 2] = vertexPositions[i + 2] * scale + translation;
  }

  // Scale and translate the texture coordinates.
  scale = params.radius / (params.radius + params.capsuleEndPointsDistance);
  translation = 1 - scale;
  for (var _i = 1, _count = textureCoordinates.length; _i < _count; _i += 2) {
    textureCoordinates[_i] = textureCoordinates[_i] * scale + translation;
  }

  var elementCount = vertexIndices ? vertexIndices.length : vertexPositions.length / 3;

  return {
    vertexPositions: vertexPositions,
    vertexNormals: vertexNormals,
    textureCoordinates: textureCoordinates,
    vertexIndices: vertexIndices,
    elementCount: elementCount
  };
}

/**
 * @param {CapsuleRenderableShapeParams} params
 * @returns {RenderableShape}
 */
function _calculateCapsuleBottomShape(params) {
  // Calculate the positions.
  // TODO: This uses lat-long spheres for the ends of the capsule. Use icospheres instead.
  var individualVertexPositions = (0, _util.calculateSphericalSection)(params.divisionsCount / 2, params.divisionsCount, Math.PI / params.divisionsCount, 0, params.divisionsCount, _util.TWO_PI / params.divisionsCount);

  // Calculate the indices and normals.
  var vertexPositions = void 0;
  var vertexIndices = void 0;
  var vertexNormals = void 0;
  if (!params.isUsingSphericalNormals) {
    // If we use orthogonal normals, then we cannot use vertexIndices.
    vertexPositions = individualVertexPositions;
    vertexIndices = null;
    vertexNormals = (0, _util.calculateOrthogonalVertexNormals)(vertexPositions);
  } else {
    var positionsAndIndices = (0, _util.dedupVertexArrayWithPositionsAndIndicesArrays)(individualVertexPositions);
    vertexPositions = positionsAndIndices.vertexPositions;
    vertexIndices = positionsAndIndices.vertexIndices;
    vertexNormals = vertexPositions;
  }

  var textureCoordinates = (0, _util.calculateLatLongTextureCoordinates)(vertexPositions);

  var scale = void 0;
  var translation = void 0;

  // Scale and translate the positions.
  scale = params.radius;
  translation = -params.capsuleEndPointsDistance / 2;
  for (var i = 0, count = vertexPositions.length; i < count; i += 3) {
    vertexPositions[i] *= scale;
    vertexPositions[i + 1] *= scale;
    vertexPositions[i + 2] = vertexPositions[i + 2] * scale + translation;
  }

  // Scale and translate the texture coordinates.
  scale = params.radius / (params.radius + params.capsuleEndPointsDistance);
  translation = 0;
  for (var _i2 = 1, _count2 = textureCoordinates.length; _i2 < _count2; _i2 += 2) {
    textureCoordinates[_i2] = textureCoordinates[_i2] * scale + translation;
  }

  var elementCount = vertexIndices ? vertexIndices.length : vertexPositions.length / 3;

  return {
    vertexPositions: vertexPositions,
    vertexNormals: vertexNormals,
    textureCoordinates: textureCoordinates,
    vertexIndices: vertexIndices,
    elementCount: elementCount
  };
}

/**
 * @param {CapsuleRenderableShapeParams} params
 * @returns {RenderableShape}
 */
function _calculateCapsuleMiddleShape(params) {
  var scale = void 0;
  var translation = void 0;

  // Calculate the positions.
  translation = params.capsuleEndPointsDistance / 2;
  var individualVertexPositions = (0, _util.calculateCylindricalSection)(-translation, translation, 0, params.divisionsCount, _util.TWO_PI / params.divisionsCount);

  var vertexPositions = void 0;
  var vertexIndices = void 0;
  var vertexNormals = void 0;

  // Calculate the vertex indices and normals.
  if (!params.isUsingSphericalNormals) {
    // If we use orthogonal normals, then we cannot use vertexIndices.
    vertexPositions = individualVertexPositions;
    vertexIndices = null;
    vertexNormals = (0, _util.calculateOrthogonalVertexNormals)(vertexPositions);
  } else {
    var positionsAndIndices = (0, _util.dedupVertexArrayWithPositionsAndIndicesArrays)(individualVertexPositions);
    vertexPositions = positionsAndIndices.vertexPositions;
    vertexIndices = positionsAndIndices.vertexIndices;

    // Calculate the vertex normals.
    vertexNormals = vertexPositions.map(function (coord, index) {
      return index % 3 === 2 ? 0 : coord;
    });
  }

  // Calculate the texture coordinates.
  var textureCoordinates = (0, _util.calculateCylindricalTextureCoordinates)(vertexPositions);

  // Scale the x and y position coordinates.
  scale = params.radius;
  for (var i = 0, count = vertexPositions.length; i < count; i += 3) {
    vertexPositions[i] *= scale;
    vertexPositions[i + 1] *= scale;
  }

  // Scale and translate the texture coordinates.
  scale = params.capsuleEndPointsDistance / (params.radius + params.capsuleEndPointsDistance);
  translation = (1 - scale) / 2;
  for (var _i3 = 1, _count3 = textureCoordinates.length; _i3 < _count3; _i3 += 2) {
    textureCoordinates[_i3] = textureCoordinates[_i3] * scale + translation;
  }

  var elementCount = vertexIndices ? vertexIndices.length : vertexPositions.length / 3;

  return {
    vertexPositions: vertexPositions,
    vertexNormals: vertexNormals,
    textureCoordinates: textureCoordinates,
    vertexIndices: vertexIndices,
    elementCount: elementCount
  };
}

var capsuleRenderableShapeFactory = {
  shapeId: 'CAPSULE',

  /**
   * @param {CapsuleRenderableShapeParams} params
   * @returns {RenderableShape}
   */
  getRenderableShape: function getRenderableShape(params) {
    // Ensure the divisions count is even.
    if (params.divisionsCount % 2 === 1) {
      params.divisionsCount++;
    }

    // The capsule's sub-shapes.
    var topShape = _calculateCapsuleTopShape(params);
    var bottomShape = _calculateCapsuleBottomShape(params);
    var middleShape = _calculateCapsuleMiddleShape(params);

    // Concatenate positions, normals, texture coordinates, and indices.
    var vertexPositions = topShape.vertexPositions.concat(middleShape.vertexPositions, bottomShape.vertexPositions);
    var vertexNormals = topShape.vertexNormals.concat(middleShape.vertexNormals, bottomShape.vertexNormals);
    var textureCoordinates = topShape.textureCoordinates.concat(middleShape.textureCoordinates, bottomShape.textureCoordinates);
    var vertexIndices = topShape.vertexIndices ? topShape.vertexIndices.concat(middleShape.vertexIndices, bottomShape.vertexIndices) : null;
    var elementCount = topShape.elementCount + middleShape.elementCount + bottomShape.elementCount;

    return {
      vertexPositions: vertexPositions,
      vertexNormals: vertexNormals,
      textureCoordinates: textureCoordinates,
      vertexIndices: vertexIndices,
      elementCount: elementCount
    };
  },

  /**
   * @param {CapsuleRenderableShapeParams} params
   * @returns {string}
   */
  getCacheId: function getCacheId(params) {
    return (0, _renderableShapeStore.getCacheKey)(params) + ':' + params.divisionsCount;
  }
};

exports.capsuleRenderableShapeFactory = capsuleRenderableShapeFactory;

/**
 * @typedef {SphericalRenderableShapeParams} CapsuleRenderableShapeParams
 * @property {number} radius
 * @property {number} capsuleEndPointsDistance The distance between the centers of the spheres on
 * either end of the capsule.
 */

},{"../../../util":48,"../renderable-shape-store":38}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cubeRenderableShapeFactory = undefined;

var _renderableShapeStore = require('../renderable-shape-store');

var VERTEX_COORDINATE = 0.5; /**
                              * This model defines a shape configuration factory for a cube.
                              *
                              * This cube is one unit long on each side.
                              */

var vertexPositions = [
// Front face
-VERTEX_COORDINATE, -VERTEX_COORDINATE, VERTEX_COORDINATE, VERTEX_COORDINATE, -VERTEX_COORDINATE, VERTEX_COORDINATE, VERTEX_COORDINATE, VERTEX_COORDINATE, VERTEX_COORDINATE, -VERTEX_COORDINATE, VERTEX_COORDINATE, VERTEX_COORDINATE,
// Back face
-VERTEX_COORDINATE, -VERTEX_COORDINATE, -VERTEX_COORDINATE, -VERTEX_COORDINATE, VERTEX_COORDINATE, -VERTEX_COORDINATE, VERTEX_COORDINATE, VERTEX_COORDINATE, -VERTEX_COORDINATE, VERTEX_COORDINATE, -VERTEX_COORDINATE, -VERTEX_COORDINATE,
// Top face
-VERTEX_COORDINATE, VERTEX_COORDINATE, -VERTEX_COORDINATE, -VERTEX_COORDINATE, VERTEX_COORDINATE, VERTEX_COORDINATE, VERTEX_COORDINATE, VERTEX_COORDINATE, VERTEX_COORDINATE, VERTEX_COORDINATE, VERTEX_COORDINATE, -VERTEX_COORDINATE,
// Bottom face
-VERTEX_COORDINATE, -VERTEX_COORDINATE, -VERTEX_COORDINATE, VERTEX_COORDINATE, -VERTEX_COORDINATE, -VERTEX_COORDINATE, VERTEX_COORDINATE, -VERTEX_COORDINATE, VERTEX_COORDINATE, -VERTEX_COORDINATE, -VERTEX_COORDINATE, VERTEX_COORDINATE,
// Right face
VERTEX_COORDINATE, -VERTEX_COORDINATE, -VERTEX_COORDINATE, VERTEX_COORDINATE, VERTEX_COORDINATE, -VERTEX_COORDINATE, VERTEX_COORDINATE, VERTEX_COORDINATE, VERTEX_COORDINATE, VERTEX_COORDINATE, -VERTEX_COORDINATE, VERTEX_COORDINATE,
// Left face
-VERTEX_COORDINATE, -VERTEX_COORDINATE, -VERTEX_COORDINATE, -VERTEX_COORDINATE, -VERTEX_COORDINATE, VERTEX_COORDINATE, -VERTEX_COORDINATE, VERTEX_COORDINATE, VERTEX_COORDINATE, -VERTEX_COORDINATE, VERTEX_COORDINATE, -VERTEX_COORDINATE];

var orthogonalVertexNormals = [
// Front face
0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
// Back face
0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
// Top face
0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
// Bottom face
0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
// Right face
1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
// Left face
-1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0];

var textureCoordinates = [
// Front face
1, 0, 0, 0, 0, 1, 1, 1,
// Back face
1, 0, 0, 0, 0, 1, 1, 1,
// Top face
1, 0, 0, 0, 0, 1, 1, 1,
// Bottom face
1, 0, 0, 0, 0, 1, 1, 1,
// Right face
1, 0, 0, 0, 0, 1, 1, 1,
// Left face
1, 0, 0, 0, 0, 1, 1, 1];

// This array defines each face as two triangles, using the indices into the vertex array
// to specify each triangle's position.
var vertexIndices = [
// Front face
0, 1, 2, 0, 2, 3,
// Back face
4, 5, 6, 4, 6, 7,
// Top face
8, 9, 10, 8, 10, 11,
// Bottom face
12, 13, 14, 12, 14, 15,
// Right face
16, 17, 18, 16, 18, 19,
// Left face
20, 21, 22, 20, 22, 23];

var cubeRenderableShapeFactory = {
  shapeId: 'CUBE',

  /**
   * @param {RenderableShapeConfig} params
   * @returns {RenderableShape}
   */
  getRenderableShape: function getRenderableShape(params) {
    var vertexNormals = params.isUsingSphericalNormals ? vertexPositions : orthogonalVertexNormals;

    return {
      vertexPositions: vertexPositions,
      vertexNormals: vertexNormals,
      textureCoordinates: textureCoordinates,
      vertexIndices: vertexIndices,
      elementCount: vertexIndices.length
    };
  },

  /**
   * @param {RenderableShapeConfig} params
   * @returns {string}
   */
  getCacheId: function getCacheId(params) {
    return (0, _renderableShapeStore.getCacheKey)(params);
  }
};

exports.cubeRenderableShapeFactory = cubeRenderableShapeFactory;

},{"../renderable-shape-store":38}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.icosahedronRenderableShapeFactory = undefined;

var _util = require('../../../util');

var _renderableShapeStore = require('../renderable-shape-store');

// The corners of a unit icosahedron with vertices aligned with the y-axis.
/**
 * This model defines a shape configuration factory for a regular icosahedron.
 *
 * The shape is centered around the origin.
 */

var individualVertexPositions = [-0.525731086730957, -0.7236068248748779, 0.4472135901451111, 0.525731086730957, -0.7236068248748779, 0.4472135901451111, -0.525731086730957, 0.7236068248748779, -0.4472135901451111, 0.525731086730957, 0.7236068248748779, -0.4472135901451111, 0, 0, 1, 0, 0.8944271802902222, 0.44721361994743347, 0, -0.8944271802902222, -0.44721361994743347, 0, 0, -1, 0.8506508469581604, 0.27639320492744446, 0.4472135901451111, -0.8506508469581604, 0.27639320492744446, 0.4472135901451111, 0.8506508469581604, -0.27639320492744446, -0.4472135901451111, -0.8506508469581604, -0.27639320492744446, -0.4472135901451111];

var individualVertexIndices = [1, 4, 0, 4, 9, 0, 4, 5, 9, 8, 5, 4, 1, 8, 4, 1, 10, 8, 10, 3, 8, 8, 3, 5, 3, 2, 5, 3, 7, 2, 3, 10, 7, 10, 6, 7, 6, 11, 7, 6, 0, 11, 6, 1, 0, 10, 1, 6, 11, 0, 9, 2, 11, 9, 5, 2, 9, 11, 2, 7];

var vertexPositionsExpandedAroundSeam = null;
var vertexIndicesExpandedAroundSeam = null;
var textureCoordinates = null;

var icosahedronRenderableShapeFactory = {
  shapeId: 'ICOSAHEDRON',

  /**
   * @param {RenderableShapeConfig} params
   * @returns {RenderableShape}
   */
  getRenderableShape: function getRenderableShape(params) {
    var vertexPositions = void 0;
    var vertexIndices = void 0;

    if (!vertexPositionsExpandedAroundSeam) {
      // Calculate the modified positions and indices.
      var positionsAndIndices = (0, _util.expandVertexIndicesAroundLongitudeSeam)(individualVertexPositions, individualVertexIndices);
      vertexPositionsExpandedAroundSeam = positionsAndIndices.vertexPositions;
      vertexIndicesExpandedAroundSeam = positionsAndIndices.vertexIndices;
    }

    vertexPositions = vertexPositionsExpandedAroundSeam;
    vertexIndices = vertexIndicesExpandedAroundSeam;

    var vertexNormals = void 0;
    // If we use orthogonal normals, then we cannot use vertexIndices.
    if (!params.isUsingSphericalNormals) {
      vertexPositions = (0, _util.expandVertexIndicesToDuplicatePositions)(vertexPositions, vertexIndices);
      vertexIndices = null;
      vertexNormals = (0, _util.calculateOrthogonalVertexNormals)(vertexPositions);
    } else {
      vertexNormals = vertexPositions;
    }

    textureCoordinates = textureCoordinates ? textureCoordinates : (0, _util.calculateLatLongTextureCoordinates)(vertexPositions);

    var elementCount = vertexIndices ? vertexIndices.length : vertexPositions.length / 3;

    return {
      vertexPositions: vertexPositions,
      vertexNormals: vertexNormals,
      textureCoordinates: textureCoordinates,
      vertexIndices: vertexIndices,
      elementCount: elementCount
    };
  },

  /**
   * @param {RenderableShapeConfig} params
   * @returns {string}
   */
  getCacheId: function getCacheId(params) {
    return (0, _renderableShapeStore.getCacheKey)(params);
  }
};

exports.icosahedronRenderableShapeFactory = icosahedronRenderableShapeFactory;

},{"../../../util":48,"../renderable-shape-store":38}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.icosphereRenderableShapeFactory = undefined;

var _util = require('../../../util');

var _renderableShapeStore = require('../renderable-shape-store');

var _renderableShapeFactory = require('../renderable-shape-factory');

var icosphereRenderableShapeFactory = {
  shapeId: 'ICOSPHERE',

  /**
   * @param {IcosphereRenderableShapeParams} params
   * @returns {RenderableShape}
   */
  getRenderableShape: function getRenderableShape(params) {
    params.divisionsCount = Math.max(params.divisionsCount, 1);

    var copyParams = (0, _util.deepCopy)(params);
    copyParams.shapeId = params.baseShapeId || 'ICOSAHEDRON';
    var baseRenderableShape = _renderableShapeFactory.renderableShapeFactory.getRenderableShape(copyParams);

    // Calculate the positions and indices.

    var _tesselateSphere = (0, _util.tesselateSphere)(params.divisionsCount, baseRenderableShape.vertexPositions, baseRenderableShape.vertexIndices),
        vertexPositions = _tesselateSphere.vertexPositions,
        vertexIndices = _tesselateSphere.vertexIndices;

    var _expandVertexIndicesA = (0, _util.expandVertexIndicesAroundLongitudeSeam)(vertexPositions, vertexIndices);

    vertexPositions = _expandVertexIndicesA.vertexPositions;
    vertexIndices = _expandVertexIndicesA.vertexIndices;


    var vertexNormals = void 0;
    // If we use orthogonal normals, then we cannot use vertexIndices.
    if (!params.isUsingSphericalNormals) {
      vertexPositions = (0, _util.expandVertexIndicesToDuplicatePositions)(vertexPositions, vertexIndices);
      vertexIndices = null;
      vertexNormals = (0, _util.calculateOrthogonalVertexNormals)(vertexPositions);
    } else {
      vertexNormals = vertexPositions;
    }

    var textureCoordinates = (0, _util.calculateLatLongTextureCoordinates)(vertexPositions);

    var elementCount = vertexIndices ? vertexIndices.length : vertexPositions.length / 3;

    return {
      vertexPositions: vertexPositions,
      vertexNormals: vertexNormals,
      textureCoordinates: textureCoordinates,
      vertexIndices: vertexIndices,
      elementCount: elementCount
    };
  },

  /**
   * @param {IcosphereRenderableShapeParams} params
   * @returns {string}
   */
  getCacheId: function getCacheId(params) {
    return (0, _renderableShapeStore.getCacheKey)(params) + ':' + params.divisionsCount;
  }
}; /**
    * This module defines logic that creates a spherical shape configuration by taking a shape,
    * sub-dividing each of its triangles, and projecting each new vertex onto the edge of a sphere.
    *
    * This is technically only an "icosphere" if the starting shape is an icosahedron.
    *
    * This shape also is known as a "geosphere".
    *
    * The shape is centered around the origin.
    */

exports.icosphereRenderableShapeFactory = icosphereRenderableShapeFactory;

/**
 * @typedef {SphericalRenderableShapeParams} IcosphereRenderableShapeParams
 * @property {string} baseShapeId The ID of the base renderable shape that will be sub-divided to
 * create this icosphere shape.
 */

},{"../../../util":48,"../renderable-shape-factory":37,"../renderable-shape-store":38}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.latLongSphereRenderableShapeFactory = undefined;

var _util = require('../../../util');

var _renderableShapeStore = require('../renderable-shape-store');

/**
 * This module defines a configuration factory for a spherical shape whose vertices lie along
 * latitude and longitude lines.
 *
 * This shape also is known as a "UV sphere".
 *
 * The shape is centered around the origin with the poles aligned with the z-axis.
 */

/**
 * @param {number} divisionsCount
 * @returns {Array.<Number>}
 * @private
 */
function _calculateLatLongSpherePositions(divisionsCount) {
  var deltaPitch = Math.PI / divisionsCount;
  var deltaAzimuth = _util.TWO_PI / divisionsCount;

  return (0, _util.calculateSphericalSection)(0, divisionsCount, deltaPitch, 0, divisionsCount, deltaAzimuth);
}

var latLongSphereRenderableShapeFactory = {
  shapeId: 'LAT_LONG_SPHERE',

  /**
   * @param {SphericalRenderableShapeParams} params
   * @returns {RenderableShape}
   */
  getRenderableShape: function getRenderableShape(params) {
    // Calculate the positions.
    var individualVertexPositions = _calculateLatLongSpherePositions(params.divisionsCount);

    // Calculate the indices and normals.
    var vertexPositions = void 0;
    var vertexIndices = void 0;
    var vertexNormals = void 0;
    if (!params.isUsingSphericalNormals) {
      // If we use orthogonal normals, then we cannot use vertexIndices.
      vertexPositions = individualVertexPositions;
      vertexIndices = null;
      vertexNormals = (0, _util.calculateOrthogonalVertexNormals)(vertexPositions);
    } else {
      var _dedupVertexArrayWith = (0, _util.dedupVertexArrayWithPositionsAndIndicesArrays)(individualVertexPositions);

      vertexPositions = _dedupVertexArrayWith.vertexPositions;
      vertexIndices = _dedupVertexArrayWith.vertexIndices;

      vertexNormals = vertexPositions;
    }

    var textureCoordinates = (0, _util.calculateLatLongTextureCoordinates)(vertexPositions);

    var elementCount = vertexIndices ? vertexIndices.length : vertexPositions.length / 3;

    return {
      vertexPositions: vertexPositions,
      vertexNormals: vertexNormals,
      textureCoordinates: textureCoordinates,
      vertexIndices: vertexIndices,
      elementCount: elementCount
    };
  },

  /**
   * @param {SphericalRenderableShapeParams} params
   * @returns {string}
   */
  getCacheId: function getCacheId(params) {
    return (0, _renderableShapeStore.getCacheKey)(params) + ':' + params.divisionsCount;
  }
};

exports.latLongSphereRenderableShapeFactory = latLongSphereRenderableShapeFactory;

},{"../../../util":48,"../renderable-shape-store":38}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tetrahedronRenderableShapeFactory = undefined;

var _util = require('../../../util');

var _renderableShapeStore = require('../renderable-shape-store');

/**
 * This model defines a shape configuration factory for a regular tetrahedron.
 *
 * The shape is centered around the origin.
 */

// ||(VERTEX_COORDINATE, VERTEX_COORDINATE, VERTEX_COORDINATE)|| = 1
var VERTEX_COORDINATE = 0.5773502588272095;

var vertexPositions = [
// Left-top-near face
VERTEX_COORDINATE, VERTEX_COORDINATE, VERTEX_COORDINATE, -VERTEX_COORDINATE, -VERTEX_COORDINATE, VERTEX_COORDINATE, -VERTEX_COORDINATE, VERTEX_COORDINATE, -VERTEX_COORDINATE,

// Right-top-far face
VERTEX_COORDINATE, VERTEX_COORDINATE, VERTEX_COORDINATE, -VERTEX_COORDINATE, VERTEX_COORDINATE, -VERTEX_COORDINATE, VERTEX_COORDINATE, -VERTEX_COORDINATE, -VERTEX_COORDINATE,

// Right-bottom-near face
VERTEX_COORDINATE, VERTEX_COORDINATE, VERTEX_COORDINATE, VERTEX_COORDINATE, -VERTEX_COORDINATE, -VERTEX_COORDINATE, -VERTEX_COORDINATE, -VERTEX_COORDINATE, VERTEX_COORDINATE,

// Left-bottom-far face
-VERTEX_COORDINATE, -VERTEX_COORDINATE, VERTEX_COORDINATE, VERTEX_COORDINATE, -VERTEX_COORDINATE, -VERTEX_COORDINATE, -VERTEX_COORDINATE, VERTEX_COORDINATE, -VERTEX_COORDINATE];

// 1 - Math.sqrt(3) / 2
var TEXTURE_BASE_COORDINATE = 0.13397459621;

var textureCoordinates = [
// Left-top-near face
0, TEXTURE_BASE_COORDINATE, 0.5, 1, 1, TEXTURE_BASE_COORDINATE,

// Right-top-far face
0, TEXTURE_BASE_COORDINATE, 0.5, 1, 1, TEXTURE_BASE_COORDINATE,

// Right-bottom-near face
0, TEXTURE_BASE_COORDINATE, 0.5, 1, 1, TEXTURE_BASE_COORDINATE,

// Left-bottom-far face
0, TEXTURE_BASE_COORDINATE, 0.5, 1, 1, TEXTURE_BASE_COORDINATE];

var tetrahedronRenderableShapeFactory = {
  shapeId: 'TETRAHEDRON',

  /**
   * @param {RenderableShapeConfig} params
   * @returns {RenderableShape}
   */
  getRenderableShape: function getRenderableShape(params) {
    var vertexNormals = params.isUsingSphericalNormals ? vertexPositions : (0, _util.calculateOrthogonalVertexNormals)(vertexPositions);

    return {
      vertexPositions: vertexPositions,
      vertexNormals: vertexNormals,
      textureCoordinates: textureCoordinates,
      vertexIndices: null,
      elementCount: vertexPositions.length / 3
    };
  },

  /**
   * @param {RenderableShapeConfig} params
   * @returns {string}
   */
  getCacheId: function getCacheId(params) {
    return (0, _renderableShapeStore.getCacheKey)(params);
  }
};

exports.tetrahedronRenderableShapeFactory = tetrahedronRenderableShapeFactory;

},{"../../../util":48,"../renderable-shape-store":38}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GrafxController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lslAnimatex = require('lsl-animatex');

var _lslPhysx = require('lsl-physx');

var _programWrapper = require('../program-wrapper');

var _util = require('../util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This top-level Controller class initializes and runs the rest of the app.
 */
var GrafxController = function (_PersistentAnimationJ) {
  _inherits(GrafxController, _PersistentAnimationJ);

  function GrafxController() {
    _classCallCheck(this, GrafxController);

    var _this = _possibleConstructorReturn(this, (GrafxController.__proto__ || Object.getPrototypeOf(GrafxController)).call(this));

    _this._canvas = null;
    _this._gl = null;
    _this._scene = null;
    _this._currentProgramWrapper = null;
    return _this;
  }

  /**
   * Initializes the app. After this completes successfully, call run to actually start the app.
   *
   * @param {HTMLCanvasElement} canvas
   * @param {Array.<ProgramWrapperConfig>} programConfigs Configurations for program wrappers that
   * should be pre-cached before starting the rest of the app.
   * @param {Array.<String>} texturePaths Texture images that should be pre-cached before
   * starting the rest of the app.
   * @param {Function.<Scene>} sceneFactory
   * @returns {Promise}
   */


  _createClass(GrafxController, [{
    key: 'initialize',
    value: function initialize(canvas, programConfigs, texturePaths, sceneFactory) {
      var _this2 = this;

      this._canvas = canvas;

      return Promise.resolve().then(function () {
        return _this2._setUpWebGLContext();
      }).then(function () {
        return Promise.all([_this2._preCachePrograms(programConfigs), _this2._preCacheTextures(texturePaths)]);
      }).then(function () {
        return _this2._setUpScene(sceneFactory);
      });
    }
  }, {
    key: 'destroy',
    value: function destroy() {}
  }, {
    key: 'reset',
    value: function reset() {
      // FIXME: Will it be easier to replace this with initialize?
      this._scene.reset();
    }

    /**
     * Runs the app. This should be called after initialize.
     *
     * A few things happen if this is run in dev mode:
     * - The draw and update steps of each frame are wrapped in a try/catch block.
     * - This method returns a Promise that rejects if an error is throw during any update or draw
     *   step and resolves when this controller has finished (currently never)
     */

  }, {
    key: 'run',
    value: function run() {
      this._startAnimator();
    }
  }, {
    key: '_startAnimator',
    value: function _startAnimator() {
      // FIXME: Decouple physx
      _lslAnimatex.animator.startJob(_lslPhysx.PhysicsEngine.instance);
      _lslAnimatex.animator.startJob(this);
    }

    /**
     * Updates the scene.
     *
     * This updates all of the current parameters for each component in the scene for the current
     * frame. However, this does not render anything. Rendering is done by a following call to the
     * draw function.
     *
     * @param {DOMHighResTimeStamp} currentTime
     * @param {DOMHighResTimeStamp} deltaTime
     */

  }, {
    key: 'update',
    value: function update(currentTime, deltaTime) {
      this._scene.updateSelfAndChildren(currentTime, deltaTime);
    }

    /**
     * Draws the scene.
     *
     * This renders the current frame for all components in the scene. This assumes that all relevant
     * parameter updates for this frame have already been computed by a previous call to _updateScene.
     */

  }, {
    key: 'draw',
    value: function draw() {
      var _this3 = this;

      // Clear the canvas before we start drawing on it.
      this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);

      // If we are using a post-processing program, then we need to render models to a framebuffer
      // rather than directly to the canvas.
      if (_programWrapper.programWrapperStore.isUsingPostProcessingPrograms) {
        (0, _util.bindFramebuffer)(this._gl, _programWrapper.programWrapperStore.modelsFramebuffer);
        this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
      }

      // Draw each program separately. This minimizes how many times we need to switch programs by
      // grouping all of the draw calls for models that use the same program/shaders.
      _programWrapper.programWrapperStore.forEachModelProgram(function (programWrapper, drawFrameHandlers) {
        return _this3._drawModelProgram(programWrapper, drawFrameHandlers);
      });
      _programWrapper.programWrapperStore.forEachPostProcessingProgram(function (programWrapper) {
        return _this3._drawPostProcessingProgram(programWrapper);
      });
    }

    /**
     * For the given program key, this binds the registered shader program to the GL rendering context
     * and calls each of the registered draw-frame handlers.
     *
     * @param {ProgramWrapper|GroupProgramWrapper} programWrapper
     * @param {Set.<Function>} [drawFrameHandlers]
     * @private
     */

  }, {
    key: '_drawModelProgram',
    value: function _drawModelProgram(programWrapper, drawFrameHandlers) {
      // Check whether we need to switch programs (always true if there is more than one program
      // registered).
      if (this._currentProgramWrapper !== programWrapper) {
        programWrapper.setProgram(this._gl);
        this._currentProgramWrapper = programWrapper;
      }

      // Call each of the draw-frame handlers that use the current rendering program.
      drawFrameHandlers.forEach(function (drawFrameHandler) {
        return drawFrameHandler();
      });
    }

    /**
     * For the given program key, this binds the registered shader program to the GL rendering context
     * and calls each of the registered draw-frame handlers.
     *
     * @param {ProgramWrapper|GroupProgramWrapper} programWrapper
     * @private
     */

  }, {
    key: '_drawPostProcessingProgram',
    value: function _drawPostProcessingProgram(programWrapper) {
      this._currentProgramWrapper = programWrapper;
      programWrapper.draw(this._gl);
    }

    /**
     * Initializes the WebGL rendering context.
     *
     * @private
     */

  }, {
    key: '_setUpWebGLContext',
    value: function _setUpWebGLContext() {
      var _this4 = this;

      // Get the WebGL rendering context.
      try {
        this._gl = (0, _util.getWebGLContext)(this._canvas);
      } catch (e) {
        alert('WebGL is not supported by your browser! :(');
        throw e;
      }

      // Have the canvas context match the resolution of the window's viewport.
      (0, _util.bindGLContextToViewportDimensions)(this._canvas, this._gl, function () {
        return _this4._updateAspectRatio();
      });

      // Clear everything to black.
      this._gl.clearColor(0, 0, 0, 1);
      this._gl.clearDepth(1);

      // Enable depth testing.
      this._gl.enable(this._gl.DEPTH_TEST);
      this._gl.depthFunc(this._gl.LEQUAL);
    }

    /**
     * Loads, compiles, caches, and initializes some rendering programs.
     *
     * @param {Array.<ProgramWrapperConfig>} programConfigs
     * @returns {Promise}
     * @private
     */

  }, {
    key: '_preCachePrograms',
    value: function _preCachePrograms(programConfigs) {
      var _this5 = this;

      var promises = programConfigs.map(function (config) {
        return _programWrapper.programWrapperStore.loadProgramWrapper(_this5._gl, config);
      });
      return Promise.all(promises);
    }

    /**
     * Loads, compiles, and caches some textures.
     *
     * @param {Array.<String>} texturePaths
     * @returns {Promise}
     * @private
     */

  }, {
    key: '_preCacheTextures',
    value: function _preCacheTextures(texturePaths) {
      var _this6 = this;

      return Promise.all(texturePaths.map(function (texturePath) {
        return _programWrapper.textureStore.loadTexture(_this6._gl, texturePath);
      }));
    }

    /**
     * Initializes the scene.
     *
     * @param {Function.<Scene>} sceneFactory
     * @returns {Promise}
     * @abstract
     * @protected
     */

  }, {
    key: '_setUpScene',
    value: function _setUpScene(sceneFactory) {
      // Extending classes should implement this method.
      throw new TypeError('Method not implemented');
    }

    /**
     * @protected
     */

  }, {
    key: '_updateAspectRatio',
    value: function _updateAspectRatio() {
      this._scene.camera.aspectRatio = (0, _util.getViewportWidth)() / (0, _util.getViewportHeight)();
      _resizeFramebuffersToMatchViewportSize(this._gl);
    }

    /**
     * @returns {mat4}
     * @protected
     */

  }, {
    key: '_getViewMatrix',
    value: function _getViewMatrix() {
      return this._scene.camera.viewMatrix;
    }

    /**
     * @returns {mat4}
     * @protected
     */

  }, {
    key: '_getProjectionMatrix',
    value: function _getProjectionMatrix() {
      return this._scene.camera.projectionMatrix;
    }
  }]);

  return GrafxController;
}(_lslAnimatex.PersistentAnimationJob);

/**
 * @param {WebGLRenderingContext} gl
 * @private
 */


function _resizeFramebuffersToMatchViewportSize(gl) {
  if (_programWrapper.programWrapperStore.isUsingPostProcessingPrograms) {
    var width = (0, _util.getViewportWidth)();
    var height = (0, _util.getViewportHeight)();

    // Update the per-model framebuffer texture.
    var texture = _programWrapper.programWrapperStore.modelsTexture;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

    // Update the per-model framebuffer depth render buffer.
    var renderBuffer = _programWrapper.programWrapperStore.modelsRenderBuffer;
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);

    // Update the post-processing framebuffer textures.
    _programWrapper.programWrapperStore.forEachPostProcessingProgram(function (programWrapper) {
      programWrapper.config.childrenFramebufferIds.forEach(function (id) {
        var texture = _programWrapper.programWrapperStore.getTexture(id);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      });
    });
  }
}

exports.GrafxController = GrafxController;

},{"../program-wrapper":30,"../util":48,"lsl-animatex":53,"lsl-physx":61}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class defines a light source.
 */
var Light = function Light() {
  _classCallCheck(this, Light);
}
// TODO


// TODO: Implement this.
;

exports.Light = Light;

},{}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scene = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _models = require('../models');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This class handles the overall scene.
 */
var Scene = function (_ModelGroupController) {
  _inherits(Scene, _ModelGroupController);

  /**
   * @param {ModelGroupControllerConfig} modelControllerParams
   */
  function Scene(modelControllerParams) {
    _classCallCheck(this, Scene);

    // Scene is an abstract class. It should not be instantiated directly.
    var _this = _possibleConstructorReturn(this, (Scene.__proto__ || Object.getPrototypeOf(Scene)).call(this, modelControllerParams));

    if (new.target === Scene) {
      throw new TypeError('Cannot construct Scene instances directly');
    }

    _this._getWorldTransform = function () {
      return _this.worldTransform;
    };
    _this._lights = [];
    _this._camera = null;
    return _this;
  }

  _createClass(Scene, [{
    key: 'reset',
    value: function reset() {
      _get(Scene.prototype.__proto__ || Object.getPrototypeOf(Scene.prototype), 'reset', this).call(this);
      this._lights.forEach(function (light) {
        return light.reset();
      });
      this._camera.reset();
    }

    /**
     * @param {DOMHighResTimeStamp} currentTime
     * @param {DOMHighResTimeStamp} deltaTime
     */

  }, {
    key: 'updateChildren',
    value: function updateChildren(currentTime, deltaTime) {
      _get(Scene.prototype.__proto__ || Object.getPrototypeOf(Scene.prototype), 'updateChildren', this).call(this, currentTime, deltaTime);
      this._camera.update(currentTime, deltaTime);
    }

    /** @returns {Camera} */

  }, {
    key: 'camera',
    get: function get() {
      return this._camera;
    }
  }]);

  return Scene;
}(_models.ModelGroupController);

exports.Scene = Scene;

},{"../models":23}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _geometry = require('./src/geometry');

Object.keys(_geometry).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _geometry[key];
    }
  });
});

var _glUtil = require('./src/gl-util');

Object.keys(_glUtil).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _glUtil[key];
    }
  });
});

var _hashMap = require('./src/hash-map');

Object.keys(_hashMap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _hashMap[key];
    }
  });
});

var _util = require('./src/util');

Object.keys(_util).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _util[key];
    }
  });
});

},{"./src/geometry":49,"./src/gl-util":50,"./src/hash-map":51,"./src/util":52}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMaxVec3Dimension = exports.scaleAndAddQuat = exports.addRandomRotationToVector = exports.randomVec3InRange = exports.setRandomOrthogonalVec3 = exports.createRandomOrthogonalVec3 = exports.setRandomVec3 = exports.createRandomVec3 = exports.vec3ToString = exports.areVec3sEqual = exports.areClose = exports.radToDeg = exports.degToRad = exports.TWO_PI = exports.HALF_PI = exports.EPSILON = undefined;

var _util = require('./util');

var EPSILON = 0.0000001; /**
                          * This module defines a collection of static geometry utility functions.
                          */

var DEG_TO_RAD_RATIO = Math.PI / 180;
var RAD_TO_DEG_RATIO = 180 / Math.PI;
var HALF_PI = Math.PI / 2;
var TWO_PI = Math.PI * 2;

/**
 * @param {number} deg
 * @returns {number}
 */
function degToRad(deg) {
  return deg * DEG_TO_RAD_RATIO;
}

/**
 * @param {number} rad
 * @returns {number}
 */
function radToDeg(rad) {
  return rad * RAD_TO_DEG_RATIO;
}

/**
 * This checks whether two floating-point numbers are close enough that they could be equal if not
 * for round-off errors.
 *
 * @param {number} a
 * @param {number} b
 * @returns {boolean}
 */
function areClose(a, b) {
  var diff = a - b;
  return (diff > 0 ? diff : -diff) < EPSILON;
}

/**
 * @param {vec3} a
 * @param {vec3} b
 * @returns {boolean}
 */
function areVec3sEqual(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}

/**
 * @param {vec3} v
 * @returns {string}
 */
function vec3ToString(v) {
  return '(' + v[0] + ',' + v[1] + ',' + v[2] + ')';
}

/**
 * TODO: This finds a random point with uniform probability within a cubic area, which biases the resulting vector toward the corners of this cubic area. Re-write this to produce an unbiased vector.
 *
 * @param {number} [scale=1]
 * @returns {vec3}
 */
function createRandomVec3() {
  var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

  var v = vec3.create();
  return setRandomVec3(v, scale);
}

/**
 * TODO: This finds a random point with uniform probability within a cubic area, which biases the resulting vector toward the corners of this cubic area. Re-write this to produce an unbiased vector.
 *
 * @param {vec3} v
 * @param {number} [scale=1]
 * @returns {vec3}
 */
function setRandomVec3(v) {
  var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  vec3.set(v, Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
  vec3.normalize(v, v);
  vec3.scale(v, v, scale);
  return v;
}

/**
 * Calculates a vector that is orthogonal to the given vector.
 *
 * TODO: This finds a random point with uniform probability within a cubic area, which biases the resulting vector toward the corners of this cubic area. Re-write this to produce an unbiased vector.
 *
 * @param {vec3} basis
 * @param {number} [scale=1]
 * @returns {vec3}
 */
function createRandomOrthogonalVec3(basis) {
  var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var result = vec3.create();
  return setRandomOrthogonalVec3(result, basis, scale);
}

/**
 * Calculates a vector that is orthogonal to the given vector.
 *
 * TODO: This finds a random point with uniform probability within a cubic area, which biases the resulting vector toward the corners of this cubic area. Re-write this to produce an unbiased vector.
 *
 * @param {vec3} result
 * @param {vec3} basis
 * @param {number} [scale=1]
 * @returns {vec3}
 */
function setRandomOrthogonalVec3(result, basis) {
  var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  setRandomVec3(result);
  // This is based on the dot and cross products and the fact that the dot product for two
  // orthogonal vectors is zero.
  result[2] = -(basis[0] * result[0] + basis[1] * result[1]) / basis[2];
  vec3.normalize(result, result);
  vec3.scale(result, result, scale);
  return result;
}

/**
 * @param {vec3} avg
 * @param {vec3} range
 * @returns {vec3}
 * @private
 */
function randomVec3InRange(avg, range) {
  var position = vec3.create();
  for (var i = 0; i < 3; i++) {
    var min = avg[i] - range[i] / 2;
    var max = avg[i] + range[i] / 2;
    position[i] = (0, _util.randomFloatInRange)(min, max);
  }
  return position;
}

/**
 * Rotates the given vector around a random orthogonal axis by a random angle within the given angle
 * bounds.
 *
 * @param {vec3} v
 * @param {number} minRotationAngle
 * @param {number} maxRotationAngle
 */
function addRandomRotationToVector(v, minRotationAngle, maxRotationAngle) {
  // Create a random orthogonal axis.
  var rotationAxis = createRandomVec3();
  vec3.cross(rotationAxis, rotationAxis, v);
  vec3.normalize(rotationAxis, rotationAxis);

  // Create a random angle.
  var rotationAngle = (0, _util.randomFloatInRange)(minRotationAngle, maxRotationAngle);

  // Create a rotation quaternion.
  var rotation = quat.create();
  quat.setAxisAngle(rotation, rotationAxis, rotationAngle);

  // Apply the rotation to the vector.
  vec3.transformQuat(v, v, rotation);
}

/**
 * @param {quat} out
 * @param {quat} a
 * @param {quat} b
 * @param {number} scale
 * @returns {quat}
 */
function scaleAndAddQuat(out, a, b, scale) {
  return quat.set(out, a[0] + b[0] * scale, a[1] + b[1] * scale, a[2] + b[2] * scale, a[3] + b[3] * scale);
}

/**
 * @param {vec3} v
 * @returns {number}
 */
function getMaxVec3Dimension(v) {
  var max = v[0] > v[1] ? v[0] : v[1];
  max = max > v[2] ? max : v[2];
  return max;
}

exports.EPSILON = EPSILON;
exports.HALF_PI = HALF_PI;
exports.TWO_PI = TWO_PI;
exports.degToRad = degToRad;
exports.radToDeg = radToDeg;
exports.areClose = areClose;
exports.areVec3sEqual = areVec3sEqual;
exports.vec3ToString = vec3ToString;
exports.createRandomVec3 = createRandomVec3;
exports.setRandomVec3 = setRandomVec3;
exports.createRandomOrthogonalVec3 = createRandomOrthogonalVec3;
exports.setRandomOrthogonalVec3 = setRandomOrthogonalVec3;
exports.randomVec3InRange = randomVec3InRange;
exports.addRandomRotationToVector = addRandomRotationToVector;
exports.scaleAndAddQuat = scaleAndAddQuat;
exports.getMaxVec3Dimension = getMaxVec3Dimension;

},{"./util":52}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scaleThenTranslatePositions = exports.calculateCylindricalSection = exports.calculateSphericalSection = exports.dedupVertexArrayWithPositionsAndIndicesArrays = exports.tesselateSphere = exports.expandVertexIndicesAroundLongitudeSeam = exports.calculateCylindricalTextureCoordinates = exports.calculateLatLongTextureCoordinates = exports.calculateOrthogonalVertexNormals = exports.expandVertexIndicesToDuplicatePositions = exports.create2DSquarePositionsConfig = exports.createRenderBuffer = exports.createTextureForRendering = exports.createFramebuffer = exports.bindFramebuffer = exports.bindGLContextToViewportDimensions = exports.createBufferFromData = exports.loadProgram = exports.loadShader = exports.buildShader = exports.buildProgram = exports.getAttribLocation = exports.createBuffer = exports.getWebGLContext = exports.getViewportHeight = exports.getViewportWidth = undefined;

var _hashMap = require('./hash-map');

var _geometry = require('./geometry');

var _util = require('./util');

var _programWrapperStore = require('../../program-wrapper/src/program-wrapper-store');

/**
 * This module defines a collection of static general utility functions for WebGL.
 */

var viewportWidth = 10;
var viewportHeight = 10;

/**
 * @param {HTMLCanvasElement} canvas
 * @returns {?WebGLRenderingContext}
 * @throws If unable to get a WebGL context.
 */
function getWebGLContext(canvas) {
  var params = { alpha: false };
  // Try to grab the standard context. If it fails, fallback to the experimental context.
  return canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params);
}

/**
 * @param {WebGLRenderingContext} gl
 * @returns {?WebGLBuffer}
 * @throws If unable to create a buffer object.
 */
function createBuffer(gl) {
  var buffer = gl.createBuffer();
  if (!buffer) {
    throw new Error('An error occurred creating the buffer object');
  }
  return buffer;
}
// TODO: use all this helper stuff in the programWrapper logic?
/**
 * @param {WebGLRenderingContext} gl
 * @param {WebGLProgram} program
 * @param {string} locationName
 * @returns {number}
 * @throws If unable to get an attribute location for the given name.
 */
function getAttribLocation(gl, program, locationName) {
  var attribLocation = gl.getAttribLocation(program, locationName);
  if (attribLocation < 0) {
    throw new Error('An error occurred getting the attribute location: ' + locationName);
  }
  return attribLocation;
}

/**
 * @param {WebGLRenderingContext} gl
 * @param {WebGLShader} vertexShader
 * @param {WebGLShader} fragmentShader
 * @returns {WebGLProgram}
 * @throws If unable to link the program.
 */
function buildProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    var infoLog = gl.getProgramInfoLog(program);
    console.error('An error occurred linking the shader program', infoLog);
    throw new Error('An error occurred linking the shader program');
  }

  return program;
}

/**
 * @param {WebGLRenderingContext} gl
 * @param {string} shaderSource
 * @param {boolean} isFragmentShader
 * @returns {WebGLShader}
 * @throws If unable to compile the shader.
 */
function buildShader(gl, shaderSource, isFragmentShader) {
  var shaderType = isFragmentShader ? gl.FRAGMENT_SHADER : gl.VERTEX_SHADER;
  var shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    var infoLog = gl.getShaderInfoLog(shader);
    console.error('An error occurred compiling the shader', infoLog);
    throw new Error('An error occurred compiling the shader');
  }

  return shader;
}

/**
 * Loads a shader program by scouring the current document, looking for a script with the specified
 * ID.
 *
 * @param {WebGLRenderingContext} gl
 * @param {string} url
 * @returns {Promise.<WebGLShader, Error>}
 */
function loadShader(gl, url) {
  return (0, _util.loadText)(url).then(function (shaderSource) {
    return buildShader(gl, shaderSource, url.endsWith('.frag'));
  });
}

/**
 * Loads the shader source code from the given URLs, compiles the shader source code, and creates
 * a program from the resulting shaders.
 *
 * @param {WebGLRenderingContext} gl
 * @param {string} vertexShaderUrl
 * @param {string} fragmentShaderUrl
 * @returns {Promise.<WebGLProgram, Error>}
 * @throws If any error occurs while loading and building the shaders and program.
 */
function loadProgram(gl, vertexShaderUrl, fragmentShaderUrl) {
  return Promise.all([vertexShaderUrl, fragmentShaderUrl].map(function (url) {
    return loadShader(gl, url);
  })).then(function (shaders) {
    var vertexShader = shaders[0];
    var fragmentShader = shaders[1];

    return buildProgram(gl, vertexShader, fragmentShader);
  });
}

/**
 * Create, bind, and move the given raw data into a WebGL buffer.
 *
 * @param {WebGLRenderingContext} gl
 * @param {Array.<Number>} rawData A plain, flat array containing the data to bind to a buffer.
 * @param {number} [target=gl.ARRAY_BUFFER] An enum describing the type of this buffer; one of:
 *   - gl.ARRAY_BUFFER,
 *   - gl.ELEMENT_ARRAY_BUFFER.
 * @param {number} [usage=gl.STATIC_DRAW] An enum describing how this buffer is going to be used;
 * one of:
 *   - gl.STATIC_DRAW,
 *   - gl.DYNAMIC_DRAW,
 *   - gl.STREAM_DRAW.
 * @returns {WebGLBuffer}
 */
function createBufferFromData(gl, rawData, target, usage) {
  target = target || gl.ARRAY_BUFFER;
  usage = usage || gl.STATIC_DRAW;
  var typedArray = target === gl.ARRAY_BUFFER ? new Float32Array(rawData) : new Uint16Array(rawData);

  var buffer = gl.createBuffer();
  gl.bindBuffer(target, buffer);
  gl.bufferData(target, typedArray, usage);

  // Making the original data visible on the buffer object is helpful for debugging.
  if (_util.isInDevMode) {
    buffer.rawData = typedArray;
  }

  return buffer;
}

/**
 * Adjusts the dimensions of the given element to match those of the viewport. Also, when the
 * viewport is resized, the given element will also be resized to match.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {WebGLRenderingContext} gl
 * @param {Function} onGLResized
 * @param {?Number} [updateInterval=150]
 */
function bindGLContextToViewportDimensions(canvas, gl, onGLResized) {
  var updateInterval = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 150;

  _resizeGLContextToMatchViewportDimensions(canvas, gl);
  var debouncedResize = (0, _util.debounce)(function (_) {
    _resizeGLContextToMatchViewportDimensions(canvas, gl);
    onGLResized();
  }, updateInterval);
  window.addEventListener('resize', debouncedResize);
}

/**
 * Resizes the given element to match the dimensions of the viewport components.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {WebGLRenderingContext} gl
 * @private
 */
function _resizeGLContextToMatchViewportDimensions(canvas, gl) {
  // Account for high-definition DPI displays.
  var devicePixelToCssPixelRatio = window.devicePixelRatio || 1;
  viewportWidth = Math.floor(canvas.clientWidth * devicePixelToCssPixelRatio);
  viewportHeight = Math.floor(canvas.clientHeight * devicePixelToCssPixelRatio);
  canvas.width = viewportWidth;
  canvas.height = viewportHeight;
  gl.viewport(0, 0, viewportWidth, viewportHeight);
}

/**
 * @returns {number}
 */
function getViewportWidth() {
  return viewportWidth;
}

/**
 * @returns {number}
 */
function getViewportHeight() {
  return viewportHeight;
}

/**
 * Binds a framebuffer to the GL context.
 *
 * @param {WebGLRenderingContext} gl
 * @param {WebGLFramebuffer} framebuffer
 */
function bindFramebuffer(gl, framebuffer, width, height) {
  // FIXME: Remove or add back in?
  // width = width || getViewportWidth();
  // height = height || getViewportHeight();

  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  // FIXME: Remove or add back in?
  // gl.viewport(0, 0, width, height);
}

/**
 * Creates a framebuffer and attaches a texture to the framebuffer.
 *
 * This means that when we bind to the framebuffer, draw calls will render to the given texture.
 *
 * @param {WebGLRenderingContext} gl
 * @param {WebGLTexture} texture
 * @param {WebGLRenderBuffer} [renderBuffer]
 * @returns {WebGLFramebuffer}
 */
function createFramebuffer(gl, texture, renderBuffer) {
  var framebuffer = gl.createFramebuffer();

  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

  if (renderBuffer) {
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderBuffer);
  }

  return framebuffer;
}

/**
 * Creates a texture for rendering to.
 *
 * @param {WebGLRenderingContext} gl
 * @param {number} [width] Defaults to the viewport width stored in gl-util.
 * @param {number} [height] Defaults to the viewport height stored in gl-util.
 * @returns {WebGLTexture}
 */
function createTextureForRendering(gl, width, height) {
  width = width || getViewportWidth();
  height = height || getViewportHeight();

  // TODO: Double-check these params
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

  return texture;
}

/**
 * Creates a render buffer.
 *
 * @param {WebGLRenderingContext} gl
 * @param {number} [width] Defaults to the viewport width stored in gl-util.
 * @param {number} [height] Defaults to the viewport height stored in gl-util.
 * @returns {WebGLRenderBuffer}
 */
function createRenderBuffer(gl, width, height) {
  width = width || getViewportWidth();
  height = height || getViewportHeight();

  var renderBuffer = gl.createRenderbuffer();
  gl.bindRenderbuffer(gl.RENDERBUFFER, renderBuffer);
  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);

  return renderBuffer;
}

var _SQUARE_COORDINATES_2D = [0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1];

/**
 * @param {WebGLRenderingContext} gl
 * @returns {AttributeConfig}
 */
function create2DSquarePositionsConfig(gl) {
  var positionsBuffer = createBufferFromData(gl, _SQUARE_COORDINATES_2D);
  return {
    buffer: positionsBuffer,
    size: 2,
    type: gl.FLOAT,
    normalized: false,
    stride: 0,
    offset: 0
  };
}

//
// Geometrical calculations.
//

/**
 * Given an array of individual vertex positions and an array of vertex indices, creates an expanded
 * array of the positions grouped by the triangles they form.
 *
 * @param {Array.<Number>} individualVertexPositions
 * @param {Array.<Number>} vertexIndices
 * @returns {Array.<Number>}
 */
function expandVertexIndicesToDuplicatePositions(individualVertexPositions, vertexIndices) {
  var expandedVertexPositions = [];

  for (var i = 0, j = 0, k = 0, count = vertexIndices.length; i < count; i++, k += 3) {
    j = vertexIndices[i] * 3;

    expandedVertexPositions[k] = individualVertexPositions[j];
    expandedVertexPositions[k + 1] = individualVertexPositions[j + 1];
    expandedVertexPositions[k + 2] = individualVertexPositions[j + 2];
  }

  return expandedVertexPositions;
}

/**
 * Computes normal vectors that are each orthogonal to the triangles they are a part of.
 *
 * The given vertices should represent individual triangles whose vertices are defined in clockwise
 * order (as seen when looking at the exterior side).
 *
 * @param {Array.<Number>} vertices
 * @returns {Array.<Number>}
 */
function calculateOrthogonalVertexNormals(vertices) {
  var vertex1 = vec3.create();
  var vertex2 = vec3.create();
  var vertex3 = vec3.create();
  var vectorA = vec3.create();
  var vectorB = vec3.create();
  var normal1 = vec3.create();
  var normal2 = vec3.create();
  var normal3 = vec3.create();

  var normals = [];

  // Loop over each triangle in the flattened vertex array.
  for (var i = 0, count = vertices.length; i < count; i += 9) {
    // Get the vertices of the current triangle from the flattened array.
    vec3.set(vertex1, vertices[i + 0], vertices[i + 1], vertices[i + 2]);
    vec3.set(vertex2, vertices[i + 3], vertices[i + 4], vertices[i + 5]);
    vec3.set(vertex3, vertices[i + 6], vertices[i + 7], vertices[i + 8]);

    // Compute the normals.
    vec3.subtract(vectorA, vertex3, vertex1);
    vec3.subtract(vectorB, vertex2, vertex1);
    vec3.cross(normal1, vectorA, vectorB);
    vec3.normalize(normal1, normal1);

    vec3.subtract(vectorA, vertex1, vertex2);
    vec3.subtract(vectorB, vertex3, vertex2);
    vec3.cross(normal2, vectorA, vectorB);
    vec3.normalize(normal2, normal2);

    vec3.subtract(vectorA, vertex2, vertex3);
    vec3.subtract(vectorB, vertex1, vertex3);
    vec3.cross(normal3, vectorA, vectorB);
    vec3.normalize(normal3, normal3);

    // Save the normal vectors in a flattened array.
    normals[i + 0] = normal1[0];
    normals[i + 1] = normal1[1];
    normals[i + 2] = normal1[2];
    normals[i + 3] = normal2[0];
    normals[i + 4] = normal2[1];
    normals[i + 5] = normal2[2];
    normals[i + 6] = normal3[0];
    normals[i + 7] = normal3[1];
    normals[i + 8] = normal3[2];
  }

  return normals;
}

var MAX_TEXTURE_V_COORDINATE_DELTA = 0.5;

/**
 * Calculates lat-long texture coordinates for the given vertex positions.
 *
 * @param {Array.<Number>} vertexPositions
 * @returns {Array.<Number>}
 * @private
 */
function calculateLatLongTextureCoordinates(vertexPositions) {
  var currentVertexPosition = vec3.create();
  var currentTextureCoordinates = vec2.create();
  var textureCoordinates = [];

  // Calculate the texture coordinates of each vertex.
  for (var i = 0, j = 0, count = vertexPositions.length; i < count; i += 3, j += 2) {
    vec3.set(currentVertexPosition, vertexPositions[i], vertexPositions[i + 1], vertexPositions[i + 2]);
    _getTextureCoordinatesOfLatLongPosition(currentTextureCoordinates, currentVertexPosition);
    textureCoordinates[j] = currentTextureCoordinates[0];
    textureCoordinates[j + 1] = currentTextureCoordinates[1];
  }

  _correctTextureForTrianglesAroundSeam(textureCoordinates);

  return textureCoordinates;
}

/**
 * Calculates cylindrical texture coordinates for the given vertex positions.
 *
 * This assumes the cylinder is aligned with the z-axis and centered at the origin.
 *
 * @param {Array.<Number>} vertexPositions
 * @returns {Array.<Number>}
 * @private
 */
function calculateCylindricalTextureCoordinates(vertexPositions) {
  var currentVertexPosition = vec3.create();
  var currentTextureCoordinates = vec2.create();
  var textureCoordinates = [];

  // Calculate the texture coordinates of each vertex.
  for (var i = 0, j = 0, count = vertexPositions.length; i < count; i += 3, j += 2) {
    vec3.set(currentVertexPosition, vertexPositions[i], vertexPositions[i + 1], vertexPositions[i + 2]);
    _getTextureCoordinatesOfCylindricalPosition(currentTextureCoordinates, currentVertexPosition);
    textureCoordinates[j] = currentTextureCoordinates[0];
    textureCoordinates[j + 1] = currentTextureCoordinates[1];
  }

  _correctTextureForTrianglesAroundSeam(textureCoordinates);

  return textureCoordinates;
}

/**
 * @param {Array.<Number>} textureCoordinates
 */
function _correctTextureForTrianglesAroundSeam(textureCoordinates) {
  var v1 = void 0;
  var v2 = void 0;
  var v3 = void 0;

  // Determine which triangles span the seam across 0/2PI, and correct their textures.
  for (var i = 0, count = textureCoordinates.length; i < count; i += 6) {
    v1 = textureCoordinates[i];
    v2 = textureCoordinates[i + 2];
    v3 = textureCoordinates[i + 4];

    if (v3 - v1 > MAX_TEXTURE_V_COORDINATE_DELTA || v2 - v1 > MAX_TEXTURE_V_COORDINATE_DELTA) {
      textureCoordinates[i]++;
    }
    if (v3 - v2 > MAX_TEXTURE_V_COORDINATE_DELTA || v1 - v2 > MAX_TEXTURE_V_COORDINATE_DELTA) {
      textureCoordinates[i + 2]++;
    }
    if (v2 - v3 > MAX_TEXTURE_V_COORDINATE_DELTA || v1 - v3 > MAX_TEXTURE_V_COORDINATE_DELTA) {
      textureCoordinates[i + 4]++;
    }
  }
}

/**
 * Calculate the texture coordinates for a normalized point on a globe.
 *
 * @param {vec2} textureCoordinates Output parameter.
 * @param {vec3} vertexPosition Input parameter.
 * @private
 */
function _getTextureCoordinatesOfLatLongPosition(textureCoordinates, vertexPosition) {
  var x = vertexPosition[0];
  var y = vertexPosition[1];
  var z = vertexPosition[2];

  var longitude = void 0;
  if (y !== 0) {
    longitude = Math.atan2(x, y);
  } else if (x > 0) {
    longitude = _geometry.HALF_PI;
  } else {
    longitude = -_geometry.HALF_PI;
  }

  var u = (longitude + Math.PI) / _geometry.TWO_PI;

  // TODO: Should I instead be calculating the v value from wrapping the texture around the globe
  // curvature rather than simply projecting it directly?

  // This assumes that the texture has been vertically distorted so that it can be directly
  // projected onto the curvature of the globe.
  var v = (z + 1) * 0.5;

  textureCoordinates[0] = u;
  textureCoordinates[1] = v;
}

/**
 * Calculate the texture coordinates for a normalized point on a cylinder.
 *
 * This assumes the cylinder is aligned with the z-axis and centered at the origin.
 *
 * @param {vec2} textureCoordinates Output parameter.
 * @param {vec3} vertexPosition Input parameter.
 * @private
 */
function _getTextureCoordinatesOfCylindricalPosition(textureCoordinates, vertexPosition) {
  var x = vertexPosition[0];
  var y = vertexPosition[1];
  var z = vertexPosition[2];

  var longitude = void 0;
  if (y !== 0) {
    longitude = Math.atan2(x, y);
  } else if (x > 0) {
    longitude = _geometry.HALF_PI;
  } else {
    longitude = -_geometry.HALF_PI;
  }

  var u = (longitude + Math.PI) / _geometry.TWO_PI;

  var v = z > 0 ? 1 : 0;

  textureCoordinates[0] = u;
  textureCoordinates[1] = v;
}

/**
 * Expands the given vertices around the seam where longitude switches from 0 to 2PI.
 *
 * This is useful because, when applying a spherical texture using lat-long coordinates, any
 * triangle that spans the seam (from longitude 2PI to 0) would otherwise show the wrong result.
 *
 * @param {Array.<Number>} oldVertexPositions
 * @param {Array.<Number>} oldVertexIndices
 * @returns {{vertexPositions: Array.<Number>, vertexIndices: Array.<Number>}}
 */
function expandVertexIndicesAroundLongitudeSeam(oldVertexPositions, oldVertexIndices) {
  // const newVertexPositions = [];
  // const newVertexIndices = [];
  //
  // ****
  // // TODO: loop over triangles, use _getTextureCoordinatesOfLatLongPosition on each vertex,
  // // check if two vertices in a triangle span the seam; to check the span, just check if both are
  // // within a distance from the seam, but on opposite ends;
  //
  // return {
  //   vertexPositions: newVertexPositions,
  //   vertexIndices: newVertexIndices
  // };

  return {
    vertexPositions: oldVertexPositions,
    vertexIndices: oldVertexIndices
  };
}

/**
 * Subdivides the triangles of a shape and projects all resulting vertices to a radius of one.
 *
 * @param {number} divisionFactor
 * @param {Array.<Number>} oldPositions
 * @param {Array.<Number>} [oldIndices]
 * @returns {{vertexPositions: Array.<Number>, vertexIndices: Array.<Number>}}
 */
function tesselateSphere(divisionFactor, oldPositions, oldIndices) {
  var newPositions = _expandAndTesselateTriangles(divisionFactor, oldPositions, oldIndices);

  // Convert the expanded positions array into a unique positions array with a corresponding indices
  // array.
  var positionsAndIndices = dedupVertexArrayWithPositionsAndIndicesArrays(newPositions);

  // Project the given positions to a distance of one.
  _normalizePositions(positionsAndIndices.vertexPositions, positionsAndIndices.vertexPositions);

  return positionsAndIndices;
}

/**
 * Subdivides triangles.
 *
 * This has the side-effect of flattening the given vertices into an expanded list that can contain
 * duplicate positions.
 *
 * @param {number} divisionFactor
 * @param {Array.<Number>} oldPositions
 * @param {Array.<Number>} [oldIndices]
 * @returns {Array.<Number>}
 * @private
 */
function _expandAndTesselateTriangles(divisionFactor, oldPositions, oldIndices) {
  var expandedOldPositions = oldIndices ? expandVertexIndicesToDuplicatePositions(oldPositions, oldIndices) : oldPositions;

  var newPositions = [];
  var a = vec3.create();
  var b = vec3.create();
  var c = vec3.create();
  var aToB = vec3.create();
  var aToC = vec3.create();
  var bToC = vec3.create();
  var rowDelta = vec3.create();
  var columnDelta = vec3.create();
  var backwardsDelta = vec3.create();
  var rowStartPoint = vec3.create();
  var rowColumnStartPoint = vec3.create();
  var tempVec = vec3.create();

  var oldIndex = void 0;
  var count = void 0;
  var newIndex = void 0;
  var rowIndex = void 0;
  var columnIndex = void 0;

  //
  // The basic tesselation algorithm:
  // - Iterate across the original triangles that we are sub-dividing.
  // - A, B, and C are the vertices of the current, original triangle.
  // - Consider "rows" to iterate across the a-to-b direction and "columns" to iterate across the
  //   a-to-c direction.
  // - First calculate the distance between one row and one column.
  // - Then loop over the rows and columns and create a the new triangle for each "cell".
  //
  //                   /\
  //                 B   \--- A "column"
  //                 o    \
  //                / \   /
  //               /   \             rowDelta:      columnDelta:     backwardsDelta:
  //              o-----o                 o             o
  //             / \   / \               /               \              o-----o
  //            /   \ /   \             /                 \
  //           o-----o-----o           o                   o
  //          / \   / \   / \
  //         /   \ /   \ /   \
  //        o-----o-----o-----o
  //       / \   / \   / \   / \
  //      /   \ /   \ /   \ /   \
  //  A  o-----o-----o-----o-----o  C
  //
  //       \_____\
  //           \
  //         A "row"
  //

  // Loop over the old triangles.
  for (oldIndex = 0, newIndex = 0, count = expandedOldPositions.length; oldIndex < count; oldIndex += 9) {
    // Pull out the three vertices of the current triangle.
    vec3.set(a, expandedOldPositions[oldIndex], expandedOldPositions[oldIndex + 1], expandedOldPositions[oldIndex + 2]);
    vec3.set(b, expandedOldPositions[oldIndex + 3], expandedOldPositions[oldIndex + 4], expandedOldPositions[oldIndex + 5]);
    vec3.set(c, expandedOldPositions[oldIndex + 6], expandedOldPositions[oldIndex + 7], expandedOldPositions[oldIndex + 8]);

    vec3.subtract(aToB, b, a);
    vec3.subtract(bToC, c, b);
    vec3.subtract(aToC, c, a);

    vec3.scale(rowDelta, aToB, 1 / divisionFactor);
    vec3.scale(columnDelta, bToC, 1 / divisionFactor);
    vec3.scale(backwardsDelta, aToC, 1 / divisionFactor);

    // Loop over each new division (row) for the current triangle.
    for (rowIndex = 0; rowIndex < divisionFactor; rowIndex++) {
      vec3.scaleAndAdd(rowStartPoint, a, rowDelta, rowIndex);

      // Create the first triangle in the row (address the fence-post problem).
      newPositions[newIndex++] = rowStartPoint[0];
      newPositions[newIndex++] = rowStartPoint[1];
      newPositions[newIndex++] = rowStartPoint[2];
      vec3.add(tempVec, rowStartPoint, rowDelta);
      newPositions[newIndex++] = tempVec[0];
      newPositions[newIndex++] = tempVec[1];
      newPositions[newIndex++] = tempVec[2];
      vec3.add(tempVec, rowStartPoint, backwardsDelta);
      newPositions[newIndex++] = tempVec[0];
      newPositions[newIndex++] = tempVec[1];
      newPositions[newIndex++] = tempVec[2];

      // Loop over the new triangles in the current division.
      for (columnIndex = 1; columnIndex <= rowIndex; columnIndex++) {
        vec3.scaleAndAdd(rowColumnStartPoint, rowStartPoint, columnDelta, columnIndex);

        newPositions[newIndex++] = rowColumnStartPoint[0];
        newPositions[newIndex++] = rowColumnStartPoint[1];
        newPositions[newIndex++] = rowColumnStartPoint[2];
        vec3.subtract(tempVec, rowColumnStartPoint, columnDelta);
        newPositions[newIndex++] = tempVec[0];
        newPositions[newIndex++] = tempVec[1];
        newPositions[newIndex++] = tempVec[2];
        vec3.add(tempVec, rowColumnStartPoint, rowDelta);
        newPositions[newIndex++] = tempVec[0];
        newPositions[newIndex++] = tempVec[1];
        newPositions[newIndex++] = tempVec[2];

        newPositions[newIndex++] = rowColumnStartPoint[0];
        newPositions[newIndex++] = rowColumnStartPoint[1];
        newPositions[newIndex++] = rowColumnStartPoint[2];
        vec3.add(tempVec, rowColumnStartPoint, rowDelta);
        newPositions[newIndex++] = tempVec[0];
        newPositions[newIndex++] = tempVec[1];
        newPositions[newIndex++] = tempVec[2];
        vec3.add(tempVec, rowColumnStartPoint, backwardsDelta);
        newPositions[newIndex++] = tempVec[0];
        newPositions[newIndex++] = tempVec[1];
        newPositions[newIndex++] = tempVec[2];
      }
    }
  }

  return newPositions;
}

/**
 * Projects the given positions to a distance of one.
 *
 * @param {Array.<Number>} out
 * @param {Array.<Number>} positions
 * @private
 */
function _normalizePositions(out, positions) {
  var tempVec = vec3.create();

  for (var i = 0, count = positions.length; i < count; i += 3) {
    vec3.set(tempVec, positions[i], positions[i + 1], positions[i + 2]);

    vec3.normalize(tempVec, tempVec);

    out[i] = tempVec[0];
    out[i + 1] = tempVec[1];
    out[i + 2] = tempVec[2];
  }
}

/**
 * Given a collection of vertices that possibly contains duplicates, creates an array of the unique
 * vertex positions and an array of the indices of the original, duplicated vertices in the unique
 * array.
 *
 * This is useful for rendering using gl.drawElements (with gl.ELEMENT_ARRAY_BUFFER) instead of
 * gl.drawArrays.
 *
 * NOTE: Although this function does partially address floating-point round-off errors within the
 * given positions, it does not guarantee correctness.
 *
 * @param {Array.<Number>} oldVertexPositions
 * @returns {{vertexPositions: Array.<Number>, vertexIndices: Array.<Number>}}
 */
function dedupVertexArrayWithPositionsAndIndicesArrays(oldVertexPositions) {
  var vertexPositions = [];
  var vertexIndices = [];

  var vertexToIndexMap = new _hashMap.HashMap(_vertexHashFunction);
  var vertex = vec3.create();
  var oldCoordinateIndex = void 0;
  var oldCoordinateCount = void 0;
  var newVertexIndex = void 0;

  // Loop over the original, duplicated vertex positions.
  for (oldCoordinateIndex = 0, oldCoordinateCount = oldVertexPositions.length; oldCoordinateIndex < oldCoordinateCount; oldCoordinateIndex += 3) {
    vec3.set(vertex, oldVertexPositions[oldCoordinateIndex], oldVertexPositions[oldCoordinateIndex + 1], oldVertexPositions[oldCoordinateIndex + 2]);

    // Has this position already been recorded?
    if (!vertexToIndexMap.has(vertex)) {
      // Record the index of the unique vertex position.
      newVertexIndex = vertexPositions.length / 3;
      vertexToIndexMap.set(vertex, newVertexIndex);

      // Record the unique vertex position.
      vertexPositions.push(vertex[0]);
      vertexPositions.push(vertex[1]);
      vertexPositions.push(vertex[2]);
    }

    newVertexIndex = vertexToIndexMap.get(vertex);

    // Record the index of the unique position.
    vertexIndices.push(newVertexIndex);
  }

  return {
    vertexPositions: vertexPositions,
    vertexIndices: vertexIndices
  };
}

var _VERTEX_COORDINATE_BUCKET_SIZE_DIGITS = 4;

// This offset is important for preventing bucket-aligned numbers from being placed in inconsistent
// buckets. For example, whole integer values could easily be placed in lower or higher buckets
// depending on round-off error.
var _OFFSET = Math.random();

/**
 * Calculates a hash code for the given vertex.
 *
 * NOTE: This does not guarantee correct results. Due to round-off error, "equal" coordinates could
 * be calculated is being in different buckets. Larger bucket sizes might reduce the rate of false
 * negatives, but with the trade-off of potentially introducing false positives.
 *
 * @param {vec3} vertex
 * @returns {string}
 * @private
 */
function _vertexHashFunction(vertex) {
  return (vertex[0] + _OFFSET).toFixed(_VERTEX_COORDINATE_BUCKET_SIZE_DIGITS) + ',' + ((vertex[1] + _OFFSET).toFixed(_VERTEX_COORDINATE_BUCKET_SIZE_DIGITS) + ',') + ('' + (vertex[2] + _OFFSET).toFixed(_VERTEX_COORDINATE_BUCKET_SIZE_DIGITS));
}

/**
 * Calculate the vertex positions for a section of a sphere.
 *
 * - These points will lie along latitude-longitude lines.
 * - The shape is centered around the origin with the poles aligned with the z-axis.
 * - The radius of the circle will be one.
 *
 * @param {number} startPitchIndex
 * @param {number} endPitchIndex
 * @param {number} deltaPitch
 * @param {number} startAzimuthIndex
 * @param {number} endAzimuthIndex
 * @param {number} deltaAzimuth
 * @return {Array.<Number>}
 * @private
 */
function calculateSphericalSection(startPitchIndex, endPitchIndex, deltaPitch, startAzimuthIndex, endAzimuthIndex, deltaAzimuth) {
  var vertexPositions = [];
  var vertexPositionsIndex = 0;

  var pitchIndex = void 0;
  var azimuthIndex = void 0;
  var lowerPitch = void 0;
  var upperPitch = void 0;
  var lowerAzimuth = void 0;
  var upperAzimuth = void 0;
  var x1 = void 0;
  var y1 = void 0;
  var z1 = void 0;
  var x2 = void 0;
  var y2 = void 0;
  var z2 = void 0;
  var x3 = void 0;
  var y3 = void 0;
  var z3 = void 0;
  var x4 = void 0;
  var y4 = void 0;
  var z4 = void 0;

  // TODO: This implementation calculates all coordinates multiple times. Refactor it to be more
  // efficient.

  // Loop over each latitudinal strip.
  for (pitchIndex = startPitchIndex; pitchIndex < endPitchIndex; pitchIndex++) {
    lowerPitch = deltaPitch * pitchIndex;
    upperPitch = deltaPitch + lowerPitch;

    // Create the triangles for the strip at the current pitch.
    for (azimuthIndex = startAzimuthIndex; azimuthIndex < endAzimuthIndex; azimuthIndex++) {
      lowerAzimuth = deltaAzimuth * azimuthIndex;
      upperAzimuth = deltaAzimuth + lowerAzimuth;

      // The corners of the current square.

      x1 = Math.sin(lowerPitch) * Math.cos(lowerAzimuth);
      y1 = Math.sin(lowerPitch) * Math.sin(lowerAzimuth);
      z1 = Math.cos(lowerPitch);

      x2 = Math.sin(upperPitch) * Math.cos(lowerAzimuth);
      y2 = Math.sin(upperPitch) * Math.sin(lowerAzimuth);
      z2 = Math.cos(upperPitch);

      x3 = Math.sin(lowerPitch) * Math.cos(upperAzimuth);
      y3 = Math.sin(lowerPitch) * Math.sin(upperAzimuth);
      z3 = Math.cos(lowerPitch);

      x4 = Math.sin(upperPitch) * Math.cos(upperAzimuth);
      y4 = Math.sin(upperPitch) * Math.sin(upperAzimuth);
      z4 = Math.cos(upperPitch);

      // The first triangle.

      vertexPositions[vertexPositionsIndex] = x1;
      vertexPositions[vertexPositionsIndex + 1] = y1;
      vertexPositions[vertexPositionsIndex + 2] = z1;
      vertexPositions[vertexPositionsIndex + 3] = x2;
      vertexPositions[vertexPositionsIndex + 4] = y2;
      vertexPositions[vertexPositionsIndex + 5] = z2;
      vertexPositions[vertexPositionsIndex + 6] = x3;
      vertexPositions[vertexPositionsIndex + 7] = y3;
      vertexPositions[vertexPositionsIndex + 8] = z3;

      // The second triangle.

      vertexPositions[vertexPositionsIndex + 9] = x4;
      vertexPositions[vertexPositionsIndex + 10] = y4;
      vertexPositions[vertexPositionsIndex + 11] = z4;
      vertexPositions[vertexPositionsIndex + 12] = x3;
      vertexPositions[vertexPositionsIndex + 13] = y3;
      vertexPositions[vertexPositionsIndex + 14] = z3;
      vertexPositions[vertexPositionsIndex + 15] = x2;
      vertexPositions[vertexPositionsIndex + 16] = y2;
      vertexPositions[vertexPositionsIndex + 17] = z2;

      vertexPositionsIndex += 18;
    }
  }

  return vertexPositions;
}

/**
 * Calculate the vertex positions for a section of a cylinder.
 *
 * The shape is centered around the origin with the poles aligned with the z-axis.
 *
 * @param {number} cylinderBottom
 * @param {number} cylinderTop
 * @param {number} startIndex
 * @param {number} endIndex
 * @param {number} delta
 * @returns {Array.<Number>}
 * @private
 */
function calculateCylindricalSection(cylinderBottom, cylinderTop, startIndex, endIndex, delta) {
  var vertexPositions = [];
  var vertexPositionsIndex = 0;

  var index = void 0;
  var lowerAzimuth = void 0;
  var upperAzimuth = void 0;
  var x1 = void 0;
  var y1 = void 0;
  var z1 = void 0;
  var x2 = void 0;
  var y2 = void 0;
  var z2 = void 0;
  var x3 = void 0;
  var y3 = void 0;
  var z3 = void 0;
  var x4 = void 0;
  var y4 = void 0;
  var z4 = void 0;

  // Create the triangles for the cylindrical strip.
  for (index = startIndex; index < endIndex; index++) {
    lowerAzimuth = delta * index;
    upperAzimuth = delta + lowerAzimuth;

    // The corners of the current square.

    x1 = Math.cos(lowerAzimuth);
    y1 = Math.sin(lowerAzimuth);
    z1 = cylinderBottom;

    x2 = Math.cos(lowerAzimuth);
    y2 = Math.sin(lowerAzimuth);
    z2 = cylinderTop;

    x3 = Math.cos(upperAzimuth);
    y3 = Math.sin(upperAzimuth);
    z3 = cylinderBottom;

    x4 = Math.cos(upperAzimuth);
    y4 = Math.sin(upperAzimuth);
    z4 = cylinderTop;

    // The first triangle.

    vertexPositions[vertexPositionsIndex] = x1;
    vertexPositions[vertexPositionsIndex + 1] = y1;
    vertexPositions[vertexPositionsIndex + 2] = z1;
    vertexPositions[vertexPositionsIndex + 3] = x2;
    vertexPositions[vertexPositionsIndex + 4] = y2;
    vertexPositions[vertexPositionsIndex + 5] = z2;
    vertexPositions[vertexPositionsIndex + 6] = x3;
    vertexPositions[vertexPositionsIndex + 7] = y3;
    vertexPositions[vertexPositionsIndex + 8] = z3;

    // The second triangle.

    vertexPositions[vertexPositionsIndex + 9] = x4;
    vertexPositions[vertexPositionsIndex + 10] = y4;
    vertexPositions[vertexPositionsIndex + 11] = z4;
    vertexPositions[vertexPositionsIndex + 12] = x3;
    vertexPositions[vertexPositionsIndex + 13] = y3;
    vertexPositions[vertexPositionsIndex + 14] = z3;
    vertexPositions[vertexPositionsIndex + 15] = x2;
    vertexPositions[vertexPositionsIndex + 16] = y2;
    vertexPositions[vertexPositionsIndex + 17] = z2;

    vertexPositionsIndex += 18;
  }

  return vertexPositions;
}

/**
 * Scale and then translate the 3-dimensional positions in the given flattened array.
 *
 * The shape is centered around the origin with the poles aligned with the z-axis.
 *
 * @param {Array.<Number>} vertexPositions Output.
 * @param {number} startIndex
 * @param {number} endIndex
 * @param {vec3} scale
 * @param {vec3} translate
 * @private
 */
function scaleThenTranslatePositions(vertexPositions, startIndex, endIndex, scale, translate) {
  var scaleX = scale[0];
  var scaleY = scale[1];
  var scaleZ = scale[2];
  var translateX = translate[0];
  var translateY = translate[1];
  var translateZ = translate[2];

  for (var i = startIndex; i < endIndex; i += 3) {
    vertexPositions[i] = vertexPositions[i] * scaleX + translateX;
    vertexPositions[i + 1] = vertexPositions[i + 1] * scaleY + translateY;
    vertexPositions[i + 2] = vertexPositions[i + 2] * scaleZ + translateZ;
  }
}

// Export this module's logic

exports.getViewportWidth = getViewportWidth;
exports.getViewportHeight = getViewportHeight;
exports.getWebGLContext = getWebGLContext;
exports.createBuffer = createBuffer;
exports.getAttribLocation = getAttribLocation;
exports.buildProgram = buildProgram;
exports.buildShader = buildShader;
exports.loadShader = loadShader;
exports.loadProgram = loadProgram;
exports.createBufferFromData = createBufferFromData;
exports.bindGLContextToViewportDimensions = bindGLContextToViewportDimensions;
exports.bindFramebuffer = bindFramebuffer;
exports.createFramebuffer = createFramebuffer;
exports.createTextureForRendering = createTextureForRendering;
exports.createRenderBuffer = createRenderBuffer;
exports.create2DSquarePositionsConfig = create2DSquarePositionsConfig;
exports.expandVertexIndicesToDuplicatePositions = expandVertexIndicesToDuplicatePositions;
exports.calculateOrthogonalVertexNormals = calculateOrthogonalVertexNormals;
exports.calculateLatLongTextureCoordinates = calculateLatLongTextureCoordinates;
exports.calculateCylindricalTextureCoordinates = calculateCylindricalTextureCoordinates;
exports.expandVertexIndicesAroundLongitudeSeam = expandVertexIndicesAroundLongitudeSeam;
exports.tesselateSphere = tesselateSphere;
exports.dedupVertexArrayWithPositionsAndIndicesArrays = dedupVertexArrayWithPositionsAndIndicesArrays;
exports.calculateSphericalSection = calculateSphericalSection;
exports.calculateCylindricalSection = calculateCylindricalSection;
exports.scaleThenTranslatePositions = scaleThenTranslatePositions;

// Some type defs to make my editor's auto-complete happy.

/** @typedef {Object} WebGLProgram */
/** @typedef {Object} WebGLShader */
/** @typedef {Object} WebGLBuffer */
/** @typedef {Object} WebGLTexture */
/** @typedef {Float32Array|Array.<Number>} mat3 */
/** @typedef {Float32Array|Array.<Number>} mat4 */
/** @typedef {Float32Array|Array.<Number>} quat */
/** @typedef {Float32Array|Array.<Number>} vec2 */
/** @typedef {Float32Array|Array.<Number>} vec3 */
/** @typedef {Float32Array|Array.<Number>} vec4 */

},{"../../program-wrapper/src/program-wrapper-store":32,"./geometry":49,"./hash-map":51,"./util":52}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A hash map that uses a custom hash function.
 */
var HashMap = function () {
  /**
   * @param {Function} hashFunction
   */
  function HashMap(hashFunction) {
    _classCallCheck(this, HashMap);

    this._hashFunction = hashFunction;
    this._map = new Map();
  }

  /**
   * @param {Object} key
   * @param {Object} value
   */


  _createClass(HashMap, [{
    key: "set",
    value: function set(key, value) {
      var hashCode = this._hashFunction(key);
      this._map.set(hashCode, value);
    }

    /**
     * @param {Object} key
     * @returns {Object}
     */

  }, {
    key: "get",
    value: function get(key) {
      var hashCode = this._hashFunction(key);
      return this._map.get(hashCode);
    }

    /**
     * @param {Object} key
     * @returns {boolean}
     */

  }, {
    key: "has",
    value: function has(key) {
      var hashCode = this._hashFunction(key);
      return this._map.has(hashCode);
    }

    /**
     * @param {Object} item
     * @returns {boolean}
     */

  }, {
    key: "remove",
    value: function remove(item) {
      return this._map.delete(item);
    }

    /**
     * @param {Function} callback
     */

  }, {
    key: "forEach",
    value: function forEach(callback) {
      this._map.forEach(callback);
    }
  }, {
    key: "clear",
    value: function clear() {
      this._map.clear();
    }

    /**
     * @returns {number}
     */

  }, {
    key: "size",
    get: function get() {
      return this._map.size;
    }
  }]);

  return HashMap;
}();

exports.HashMap = HashMap;

},{}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * This module defines a collection of static general utility functions.
 */

// TODO: This should be set from somewhere else (probably as a param to controller like before; but then I need to make this updatable)
var isInDevMode = true;

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
      element.addEventListener(event, callback, false);
    });
  });
}

/**
 * Creates a DOM element with the given tag name, appends it to the given parent element, and
 * gives it the given id and classes.
 *
 * @param {string} tagName The tag name to give the new element.
 * @param {HTMLElement} [parent] The parent element to append the new element to.
 * @param {string} [id] The id to give the new element.
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
      return addClass(element, className);
    });
  }
  return element;
}

/**
 * Determines whether the given element contains the given class.
 *
 * @param {HTMLElement} element The element to check.
 * @param {string} className The class to check for.
 * @returns {boolean} True if the element does contain the class.
 */
function containsClass(element, className) {
  var startIndex = void 0;
  var indexAfterEnd = void 0;
  startIndex = element.className.indexOf(className);
  if (startIndex >= 0) {
    if (startIndex === 0 || element.className[startIndex - 1] === ' ') {
      indexAfterEnd = startIndex + className.length;
      if (indexAfterEnd === element.className.length || element.className[indexAfterEnd] === ' ') {
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
 * @param {string} className The class to add or remove.
 * @param {boolean} [enabled] If given, then the inclusion of the class will be forced.
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
  var x = 0;
  var y = 0;
  while (element) {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  }
  x -= document.documentElement.scrollLeft;
  y -= document.documentElement.scrollTop;
  return { x: x, y: y };
}

/**
 * Gets the dimensions of the viewport.
 *
 * @returns {{w: Number, h: Number}} The dimensions of the viewport.
 */
function getViewportSize() {
  var w = void 0;
  var h = void 0;
  if (typeof window.innerWidth !== 'undefined') {
    // Good browsers
    w = window.innerWidth;
    h = window.innerHeight;
  } else if (typeof document.documentElement !== 'undefined' && typeof document.documentElement.clientWidth !== 'undefined' && document.documentElement.clientWidth !== 0) {
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
 * @returns {boolean} True if the child did indeed belong to the parent.
 */
function removeChildIfPresent(parent, child) {
  if (child && child.parentNode === parent) {
    parent.removeChild(child);
    return true;
  }
  return false;
}

/**
 * Adds the given class to the given element.
 *
 * @param {HTMLElement} element The element to add the class to.
 * @param {string} className The class to add.
 */
function addClass(element, className) {
  element.setAttribute('class', element.className + ' ' + className);
}

/**
 * Removes the given class from the given element.
 *
 * @param {HTMLElement} element The element to remove the class from.
 * @param {string} className The class to remove.
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
 * @param {string} text The text to determine the width of.
 * @param {string} tagName The tag name this text would supposedly have.
 * @param {HTMLElement} [parent] The parent this text would supposedly be a child of; defaults
 * to the document body.
 * @param {string} [id] The id this text would supposedly have.
 * @param {Array.<String>} [classes] The classes this text would supposedly have.
 * @returns {number} The width of the text under these conditions.
 */
function getTextWidth(text, tagName, parent, id, classes) {
  var tmpElement = void 0;
  var width = void 0;
  parent = parent || document.getElementsByTagName('body')[0];
  tmpElement = createElement(tagName, null, id, classes);
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
 * @returns {string} The query string.
 */
function encodeQueryString(rawParams) {
  var parameter = void 0;
  var encodedParams = void 0;
  encodedParams = [];
  for (parameter in rawParams) {
    if (rawParams.hasOwnProperty(parameter)) {
      encodedParams.push(encodeURIComponent(parameter) + '=' + encodeURIComponent(rawParams[parameter]));
    }
  }
  return '?' + encodedParams.join('&');
}

/**
 * Retrieves the value corresponding to the given name from the given query string.
 *
 * (borrowed from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript)
 *
 * @param {string} queryString The query string containing the parameter.
 * @param {string} name The (non-encoded) name of the parameter value to retrieve.
 * @returns {string} The query string parameter value, or null if the parameter was not found.
 */
function getQueryStringParameterValue(queryString, name) {
  var regex = void 0;
  var results = void 0;
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
 * @param {number} value The transition string.
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
 * @param {number} value The duration.
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
 * @param {number} value The delay.
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
 * @param {string} className The class to match.
 */
function removeChildrenWithClass(parent, className) {
  var matchingChildren = parent.querySelectorAll('.' + className);

  for (var i = 0, count = matchingChildren.length; i < count; i++) {
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
  var value = 'cubic-bezier(' + bezierPts.p1x + ',' + bezierPts.p1y + ',' + bezierPts.p2x + ',' + bezierPts.p2y + ')';
  element.style.transitionTimingFunction = value;
  element.style.WebkitTransitionTimingFunction = value;
  element.style.MozTransitionTimingFunction = value;
  element.style.msTransitionTimingFunction = value;
  element.style.OTransitionTimingFunction = value;
}

// A collection of different types of easing functions.
var easingFunctions = {
  linear: function linear(t) {
    return t;
  },
  easeInQuad: function easeInQuad(t) {
    return t * t;
  },
  easeOutQuad: function easeOutQuad(t) {
    return t * (2 - t);
  },
  easeInOutQuad: function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },
  easeInCubic: function easeInCubic(t) {
    return t * t * t;
  },
  easeOutCubic: function easeOutCubic(t) {
    return 1 + --t * t * t;
  },
  easeInOutCubic: function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  },
  easeInQuart: function easeInQuart(t) {
    return t * t * t * t;
  },
  easeOutQuart: function easeOutQuart(t) {
    return 1 - --t * t * t * t;
  },
  easeInOutQuart: function easeInOutQuart(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
  },
  easeInQuint: function easeInQuint(t) {
    return t * t * t * t * t;
  },
  easeOutQuint: function easeOutQuint(t) {
    return 1 + --t * t * t * t * t;
  },
  easeInOutQuint: function easeInOutQuint(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
  }
};

// A collection of the inverses of different types of easing functions.
var inverseEasingFunctions = {
  linear: function linear(t) {
    return t;
  },
  easeInQuad: function easeInQuad(t) {
    return Math.sqrt(t);
  },
  easeOutQuad: function easeOutQuad(t) {
    return 1 - Math.sqrt(1 - t);
  },
  easeInOutQuad: function easeInOutQuad(t) {
    return t < 0.5 ? Math.sqrt(t * 0.5) : 1 - 0.70710678 * Math.sqrt(1 - t);
  }
};

/**
 * Calculates the x and y coordinates represented by the given Bezier curve at the given
 * percentage.
 *
 * @param {number} percent Expressed as a number between 0 and 1.
 * @param {Array.<{x:Number,y:Number}>} controlPoints
 * @returns {{x:Number,y:Number}}
 */
function getXYFromPercentWithBezier(percent, controlPoints) {
  var x = void 0;
  var y = void 0;
  var oneMinusPercent = void 0;
  var tmp1 = void 0;
  var tmp2 = void 0;
  var tmp3 = void 0;
  var tmp4 = void 0;

  oneMinusPercent = 1 - percent;
  tmp1 = oneMinusPercent * oneMinusPercent * oneMinusPercent;
  tmp2 = 3 * percent * oneMinusPercent * oneMinusPercent;
  tmp3 = 3 * percent * percent * oneMinusPercent;
  tmp4 = percent * percent * percent;

  x = controlPoints[0].x * tmp1 + controlPoints[1].x * tmp2 + controlPoints[2].x * tmp3 + controlPoints[3].x * tmp4;
  y = controlPoints[0].y * tmp1 + controlPoints[1].y * tmp2 + controlPoints[2].y * tmp3 + controlPoints[3].y * tmp4;

  return { x: x, y: y };
}

/**
 * Applies the given transform to the given element as a CSS style in a cross-browser compatible
 * manner.
 *
 * @param {HTMLElement} element
 * @param {string} transform
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
  var i = void 0;
  var j = void 0;
  var count = void 0;
  var temp = void 0;

  for (i = 0, count = array.length; i < count; i++) {
    j = parseInt(Math.random() * count);
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }

  return array;
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
  if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object') {
    var cloneObject = {};

    Object.keys(object).forEach(function (key) {
      return cloneObject[key] = object[key];
    });

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
  if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object') {
    // Hack: Not a robust copy policy
    var cloneObject = void 0;
    if (object instanceof Array) {
      cloneObject = [];
    } else {
      cloneObject = {};
    }

    Object.keys(object).forEach(function (key) {
      return cloneObject[key] = deepCopy(object[key]);
    });

    return cloneObject;
  } else {
    return object;
  }
}

/**
 * Converts the given HSL color values to HSV color values.
 *
 * Given and returned values will be in the range of [0, 1].
 *
 * @param {HslColor} hsl
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
 * Given and returned values will be in the range of [0, 1].
 *
 * @param {{h:Number,s:Number,v:Number}} hsv
 * @returns {HslColor}
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
 * Converts the given HSL color values to RGB color values.
 *
 * Given and returned values will be in the range of [0, 1].
 *
 * Originally adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 *
 * @param {HslColor} hsl
 * @returns {RgbColor} rgb
 */
function hslToRgb(hsl) {
  var r = void 0;
  var g = void 0;
  var b = void 0;

  if (hsl.s === 0) {
    // Achromatic.
    r = hsl.l;
    g = hsl.l;
    b = hsl.l;
  } else {
    var q = hsl.l < 0.5 ? hsl.l * (1 + hsl.s) : hsl.l + hsl.s - hsl.l * hsl.s;
    var p = 2 * hsl.l - q;

    r = _hue2Rgb(p, q, hsl.h + 1 / 3);
    g = _hue2Rgb(p, q, hsl.h);
    b = _hue2Rgb(p, q, hsl.h - 1 / 3);
  }

  return {
    r: r,
    g: g,
    b: b
  };
}

function _hue2Rgb(p, q, t) {
  if (t < 0) {
    t++;
  } else if (t > 1) {
    t--;
  }

  if (t < 1 / 6) {
    return p + (q - p) * 6 * t;
  } else if (t < 1 / 2) {
    return q;
  } else if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  } else {
    return p;
  }
}

/**
 * Converts the given RGB color values to HSL color values.
 *
 * Given and returned values will be in the range of [0, 1].
 *
 * Originally adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 *
 * @param {{r:Number,g:Number,b:Number}} rgb
 * @returns {HslColor} hsl
 */
function rgbToHsl(rgb) {
  var max = Math.max(rgb.r, rgb.g, rgb.b);
  var min = Math.min(rgb.r, rgb.g, rgb.b);
  var h = void 0;
  var s = void 0;
  var l = (max + min) / 2;

  if (max === min) {
    // Achromatic.
    h = 0;
    s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case rgb.r:
        h = (rgb.g - rgb.b) / d + (rgb.g < rgb.b ? 6 : 0);
        break;
      case rgb.g:
        h = (rgb.b - rgb.r) / d + 2;
        break;
      case rgb.b:
        h = (rgb.r - rgb.g) / d + 4;
        break;
    }

    h /= 6;
  }

  return {
    h: h,
    s: s,
    l: l
  };
}

/**
 * Creates a valid color string to assign to a CSS property from the given h/s/l color values.
 *
 * Given values should be in the range of [0,1].
 *
 * @param {HslColor} hsl
 * @returns {string}
 */
function createHslColorString(hsl) {
  return typeof hsl.a !== 'undefined' ? 'hsla(' + hsl.h * 360 + ',' + hsl.s * 100 + '%,' + hsl.l * 100 + '%,' + hsl.a + ')' : 'hsl(' + hsl.h * 360 + ',' + hsl.s * 100 + '%,' + hsl.l * 100 + '%)';
}

/**
 * Checks the given element and all of its ancestors, and returns the first that contains the
 * given class.
 *
 * @param {?HTMLElement} element
 * @param {string} className
 * @returns {?HTMLElement}
 */
function findClassInSelfOrAncestors(element, className) {
  while (element) {
    if (containsClass(element, className)) {
      return element;
    }
  }

  return null;
}

var utilStyleSheet = void 0;

/**
 * Adds the given style rule to a style sheet for the current document.
 *
 * @param {string} styleRule
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
  return (/Safari/i.test(window.navigator.userAgent) && !/Chrome/i.test(window.navigator.userAgent)
  );
}

function checkForIos() {
  return (/iPhone|iPod|iPad/i.test(window.navigator.userAgent)
  );
}

/**
 * Returns a debounced version of the given function.
 *
 * Even if the debounced function is invoked many times, the wrapped function will only be invoked
 * after the given delay has ellapsed since the last invocation.
 *
 * If isInvokedImmediately is true, then the wrapped function will be triggered at the start of the
 * invocation group rather than at the end.
 *
 * @param {Function} wrappedFunction
 * @param {number} delay In milliseconds.
 * @param {boolean} [isInvokedImmediately=false]
 * @returns {Function}
 */
function debounce(wrappedFunction, delay) {
  var _this = this,
      _arguments = arguments;

  var isInvokedImmediately = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var timeoutId = void 0;

  return function () {
    // Save the context and arguments passed from the client (this will use the values from the
    // first invocation of the invocation group.
    var context = _this;
    var args = _arguments;

    // Invoke immediately only if this is the first invocation of a group.
    if (isInvokedImmediately && !timeoutId) {
      wrappedFunction.apply(context, args);
    }

    // Reset the delay.
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      // The invocation group has ended.
      timeoutId = null;
      if (!isInvokedImmediately) {
        wrappedFunction.apply(context, args);
      }
    }, delay);
  };
}

/**
 * Returns a throttled version of the given function.
 *
 * Even if the throttled function is invoked many times, the wrapped function will only be invoked
 * at each interval of the given delay. After the throttled function stops being invoked, then
 * wrapped function will also stop being invoked.
 *
 * If isInvokedImmediately is true, then the wrapped function will be triggered at the start of the
 * invocation delay rather than at the end.
 *
 * @param {Function} wrappedFunction
 * @param {number} delay In milliseconds.
 * @param {boolean} [isInvokedImmediately=false]
 * @returns {Function}
 */
function throttle(wrappedFunction, delay) {
  var _this2 = this,
      _arguments2 = arguments;

  var isInvokedImmediately = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var timeoutId = void 0;

  return function () {
    // Save the context and arguments passed from the client (this will use the values from the
    // first invocation of the invocation group.
    var context = _this2;
    var args = _arguments2;

    // Only trigger a new invocation group if we are not already/still waiting on the delay from a
    // previous invocation.
    if (!timeoutId) {
      if (isInvokedImmediately) {
        wrappedFunction.apply(context, args);
      }

      // Start the delay.
      timeoutId = setTimeout(function () {
        // The invocation group has ended.
        timeoutId = null;
        if (!isInvokedImmediately) {
          wrappedFunction.apply(context, args);
        }
      }, delay);
    }
  };
}

/**
 * @param {Array.<*>|String} array
 * @param {*} delimiter
 * @returns {Array.<*>}
 * @private
 */
function _interleave(array, delimiter) {
  var result = new Array(array.length * 2 - 1);
  if (array.length) {
    result.push(array[0]);
  }
  for (var i = 1, count = array.length; i < count; i++) {
    result.push(delimiter);
    result.push(array[i]);
  }
  return result;
}

/**
 * Loads the given src for the given image.
 *
 * @param {HTMLImageElement} image
 * @param {string} src
 * @returns {Promise.<HTMLImageElement, Error>}
 */
function loadImageSrc(image, src) {
  return new Promise(function (resolve, reject) {
    console.debug('Loading image: ' + src);

    image.addEventListener('load', function (_) {
      return resolve(image);
    });
    image.addEventListener('error', reject);
    image.addEventListener('abort', reject);

    image.src = src;
  });
}

/**
 * Loads text from the given URL.
 *
 * @param {string} url
 * @returns {Promise.<String, Error>}
 */
function loadText(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function (_) {
      return resolve(xhr.response);
    });
    xhr.addEventListener('error', reject);
    xhr.addEventListener('abort', reject);

    console.debug('Loading text: ' + url);

    xhr.open('GET', url);
    xhr.send();
  });
}

/**
 * Loads a JSON object from the given URL.
 *
 * @param {string} url
 * @returns {Promise.<Object, Error>}
 */
function loadJson(url) {
  return loadText(url).then(function (jsonText) {
    return JSON.parse(jsonText);
  });
}

/**
 * Gets the current stack trace.
 *
 * @returns {string}
 */
function getStackTrace() {
  return new Error().stack;
}

/**
 * Freezes the given object and recursively freezes all of its properties.
 *
 * @param {Object} object
 */
function deepFreeze(object) {
  if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object') {
    Object.freeze(object);
    Object.keys(object).forEach(function (key) {
      return deepFreeze(object[key]);
    });
  }
}

/**
 * Creates a GUID.
 *
 * GUID specification: http://www.ietf.org/rfc/rfc4122.txt
 *
 * Logic adopted from http://stackoverflow.com/a/2117523/489568.
 *
 * @returns {string}
 */
function createGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

/**
 * -11 % 3 === -2
 * mod(-11, 3) === 1
 *
 * @param {number} n
 * @param {number} m
 * @returns {number}
 */
function mod(n, m) {
  return (n % m + m) % m;
}

/**
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randomFloatInRange(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * @param {number} min Inclusive
 * @param {number} max Exclusive
 * @returns {number}
 */
function randomIntInRange(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

/**
 * @param {Array} list
 * @returns {*}
 */
function pickRandom(list) {
  return list[randomIntInRange(0, list.length)];
}

/**
 * Triggers the given callback when either the current tab or the browser window loses/gains focus.
 *
 * @param {Function} focusChangeHandler
 */
function handlePageFocusChange(focusChangeHandler) {
  // Pause/unpause the app when the tab loses/gains focus.
  document.addEventListener('visibilitychange', function () {
    return focusChangeHandler(!document.hidden);
  });
  // Pause/unpause the app when the browser window loses/gains focus.
  window.addEventListener('blur', function () {
    return focusChangeHandler(false);
  });
  window.addEventListener('focus', function () {
    return focusChangeHandler(true);
  });
}

/**
 * Creates an array with all the consecutive numbers from start (inclusive) to end (exclusive).
 *
 * @param {number} start
 * @param {number} end
 * @returns {Array.<Number>}
 */
function range(start, end) {
  var r = [];
  for (var i = 0, j = start; j < end; i++, j++) {
    r[i] = j;
  }
  return r;
}

/**
 * @param {*} value
 * @returns {boolean}
 */
function isInt(value) {
  return typeof value === 'number' && isFinite(value) && parseInt(value) === value;
}

/**
 * Find the first value in a list that satisfies a predicate.
 *
 * @param {Array} list
 * @param {Function} predicate
 * @returns {*}
 */
function find(list, predicate) {
  for (var i = 0, count = list.length; i < count; i++) {
    var value = list[i];
    if (predicate.call(null, value, i, list)) {
      return value;
    }
  }
  return null;
}

var keyCodes = {
  'a': 65,
  'b': 66,
  'c': 67,
  'd': 68,
  'e': 69,
  'f': 70,
  'g': 71,
  'h': 72,
  'i': 73,
  'j': 74,
  'k': 75,
  'l': 76,
  'm': 77,
  'n': 78,
  'o': 79,
  'p': 80,
  'q': 81,
  'r': 82,
  's': 83,
  't': 84,
  'u': 85,
  'v': 86,
  'w': 87,
  'x': 88,
  'y': 89,
  'z': 90,
  '0': 48,
  '1': 49,
  '2': 50,
  '3': 51,
  '4': 52,
  '5': 53,
  '6': 54,
  '7': 55,
  '8': 56,
  '9': 57,
  'SPACE': 32,
  'ENTER': 13,
  'ESCAPE': 27,
  'LEFT': 37,
  'UP': 38,
  'RIGHT': 39,
  'DOWN': 40
};

var svgNamespace = 'http://www.w3.org/2000/svg';
var xlinkNamespace = 'http://www.w3.org/1999/xlink';

exports.isInDevMode = isInDevMode;
exports.listenToMultipleForMultiple = listenToMultipleForMultiple;
exports.createElement = createElement;
exports.containsClass = containsClass;
exports.toggleClass = toggleClass;
exports.getPageOffset = getPageOffset;
exports.getViewportSize = getViewportSize;
exports.removeChildIfPresent = removeChildIfPresent;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.clearClasses = clearClasses;
exports.getTextWidth = getTextWidth;
exports.encodeQueryString = encodeQueryString;
exports.getQueryStringParameterValue = getQueryStringParameterValue;
exports.setTransition = setTransition;
exports.setTransitionDurationSeconds = setTransitionDurationSeconds;
exports.setTransitionDelaySeconds = setTransitionDelaySeconds;
exports.setUserSelectNone = setUserSelectNone;
exports.removeChildrenWithClass = removeChildrenWithClass;
exports.setTransitionCubicBezierTimingFunction = setTransitionCubicBezierTimingFunction;
exports.easingFunctions = easingFunctions;
exports.inverseEasingFunctions = inverseEasingFunctions;
exports.getXYFromPercentWithBezier = getXYFromPercentWithBezier;
exports.setTransform = setTransform;
exports.shuffle = shuffle;
exports.shallowCopy = shallowCopy;
exports.deepCopy = deepCopy;
exports.hsvToHsl = hsvToHsl;
exports.hslToHsv = hslToHsv;
exports.hslToRgb = hslToRgb;
exports.rgbToHsl = rgbToHsl;
exports.createHslColorString = createHslColorString;
exports.findClassInSelfOrAncestors = findClassInSelfOrAncestors;
exports.addRuleToStyleSheet = addRuleToStyleSheet;
exports.checkForSafari = checkForSafari;
exports.checkForIos = checkForIos;
exports.debounce = debounce;
exports.throttle = throttle;
exports.loadImageSrc = loadImageSrc;
exports.loadText = loadText;
exports.loadJson = loadJson;
exports.getStackTrace = getStackTrace;
exports.deepFreeze = deepFreeze;
exports.createGuid = createGuid;
exports.mod = mod;
exports.randomFloatInRange = randomFloatInRange;
exports.randomIntInRange = randomIntInRange;
exports.pickRandom = pickRandom;
exports.handlePageFocusChange = handlePageFocusChange;
exports.range = range;
exports.isInt = isInt;
exports.find = find;
exports.keyCodes = keyCodes;
exports.svgNamespace = svgNamespace;
exports.xlinkNamespace = xlinkNamespace;

/**
 * @typedef {Object} HslColor
 * @property {Number} h In the range of [0, 1].
 * @property {Number} s In the range of [0, 1].
 * @property {Number} l In the range of [0, 1].
 * @property {Number} [a] In the range of [0, 1].
 */

/**
 * @typedef {Object} RgbColor
 * @property {Number} r In the range of [0, 1].
 * @property {Number} g In the range of [0, 1].
 * @property {Number} b In the range of [0, 1].
 * @property {Number} [a] In the range of [0, 1].
 */

},{}],53:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"./src":57,"dup":1}],54:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * An AnimationJob is used with the animator controller to update and re-draw something each frame.
 *
 * @abstract
 */
var AnimationJob = function () {
  /**
   * @param {Function} [onComplete] A callback to be called when this AnimationJob is finished.
   */
  function AnimationJob(onComplete) {
    _classCallCheck(this, AnimationJob);

    // AnimationJob is an abstract class. It should not be instantiated directly.
    if (new.target === AnimationJob) {
      throw new TypeError('Cannot construct AnimationJob instances directly');
    }

    this._startTime = 0;
    this._isComplete = true;
    this._onComplete = onComplete;
  }

  /**
   * Indicates whether this AnimationJob is complete.
   *
   * @return {boolean}
   */


  _createClass(AnimationJob, [{
    key: 'start',


    /**
     * Sets this AnimationJob as started.
     *
     * @param {DOMHighResTimeStamp} startTime
     */
    value: function start(startTime) {
      this._startTime = startTime;
      this._isComplete = false;
    }

    /**
     * Updates the animation progress of this AnimationJob to match the given time.
     *
     * This is called from the overall animation loop.
     *
     * @param {DOMHighResTimeStamp} currentTime
     * @param {DOMHighResTimeStamp} deltaTime
     * @abstract
     */

  }, {
    key: 'update',
    value: function update(currentTime, deltaTime) {
      // Extending classes should implement this method.
      throw new TypeError('Method not implemented');
    }

    /**
     * Draws the current state of this AnimationJob.
     *
     * This is called from the overall animation loop.
     *
     * @abstract
     */

  }, {
    key: 'draw',
    value: function draw() {
      // Extending classes should implement this method.
      throw new TypeError('Method not implemented');
    }

    /**
     * Handles any necessary state for this AnimationJob being finished.
     *
     * @param {boolean} isCancelled
     */

  }, {
    key: 'finish',
    value: function finish(isCancelled) {
      console.log(this.constructor.name + ' ' + (isCancelled ? 'cancelled' : 'completed'));

      this._isComplete = true;

      if (this._onComplete) {
        this._onComplete();
      }
    }
  }, {
    key: 'isComplete',
    get: function get() {
      return this._isComplete;
    }
  }]);

  return AnimationJob;
}();

exports.AnimationJob = AnimationJob;

},{}],55:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _frameLatencyProfiler = require('./frame-latency-profiler');

var _persistentAnimationJob = require('./persistent-animation-job');

var _transientAnimationJob = require('./transient-animation-job');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _DELTA_TIME_UPPER_THRESHOLD = 200;
var _FRAME_DURATION_WARNING_THRESHOLD = 1000 / 30;
var _FRAME_LATENCY_LOG_PERIOD = 5000;
var _LATENCY_LOG_LABEL = 'Animation frame period';

/**
 * This class handles the animation loop.
 *
 * This class's responsibilities include:
 * - updating modules for the current frame,
 * - drawing renderables for the current frame,
 * - starting and stopping transient animation jobs,
 * - capping time step durations at a max threshold.
 */

var Animator = function () {
  function Animator() {
    _classCallCheck(this, Animator);

    this._jobs = [];
    this._previousTime = null;
    this._isPaused = true;
    this._requestAnimationFrameId = null;
    this._totalUnpausedRunTime = 0;
    this._lastUnpauseTime = null;
    this._latencyProfiler = new _frameLatencyProfiler.FrameLatencyProfiler(_FRAME_LATENCY_LOG_PERIOD, _FRAME_DURATION_WARNING_THRESHOLD, _LATENCY_LOG_LABEL);
  }

  /**
   * Starts the given AnimationJob.
   *
   * @param {AnimationJob} job
   */


  _createClass(Animator, [{
    key: 'startJob',
    value: function startJob(job) {
      // Is this a restart?
      if (!job.isComplete) {
        console.debug('Restarting AnimationJob: ' + job.constructor.name);

        if (job instanceof _persistentAnimationJob.PersistentAnimationJob) {
          job.reset();
        } else {
          job.finish(true);
          job.start(window.performance.now());
        }
      } else {
        console.debug('Starting AnimationJob: ' + job.constructor.name);

        job.start(this._previousTime);
        this._jobs.push(job);
      }

      this._startAnimationLoop();
    }

    /**
     * Cancels the given AnimationJob.
     *
     * @param {AnimationJob} job
     */

  }, {
    key: 'cancelJob',
    value: function cancelJob(job) {
      console.debug('Cancelling AnimationJob: ' + job.constructor.name);
      job.finish(true);
    }

    /**
     * Cancels all running AnimationJobs.
     */

  }, {
    key: 'cancelAll',
    value: function cancelAll() {
      while (this._jobs.length) {
        this.cancelJob(this._jobs[0]);
      }
    }

    /** @returns {DOMHighResTimeStamp} */

  }, {
    key: 'pause',
    value: function pause() {
      this._stopAnimationLoop();
      console.debug('Animator paused');
    }
  }, {
    key: 'unpause',
    value: function unpause() {
      this._startAnimationLoop();
      console.debug('Animator unpaused');
    }

    /**
     * This is the animation loop that drives all of the animation.
     *
     * @param {DOMHighResTimeStamp} currentTime
     * @private
     */

  }, {
    key: '_animationLoop',
    value: function _animationLoop(currentTime) {
      var _this = this;

      // When pausing and restarting, it's possible for the previous time to be slightly inconsistent
      // with the animationFrame time.
      if (currentTime < this._previousTime) {
        this._previousTime = currentTime - 1;
      }

      var deltaTime = currentTime - this._previousTime;
      this._previousTime = currentTime;

      this._latencyProfiler.recordFrameLatency(deltaTime);

      // Large delays between frames can cause lead to instability in the system, so this caps them to
      // a max threshold.
      deltaTime = deltaTime > _DELTA_TIME_UPPER_THRESHOLD ? _DELTA_TIME_UPPER_THRESHOLD : deltaTime;

      if (!this._isPaused) {
        this._requestAnimationFrameId = window.requestAnimationFrame(function (currentTime) {
          return _this._animationLoop(currentTime);
        });
        this._updateJobs(currentTime, deltaTime);
        this._drawJobs();
      }
    }

    /**
     * Updates all of the active AnimationJobs.
     *
     * @param {DOMHighResTimeStamp} currentTime
     * @param {DOMHighResTimeStamp} deltaTime
     * @private
     */

  }, {
    key: '_updateJobs',
    value: function _updateJobs(currentTime, deltaTime) {
      for (var i = 0, count = this._jobs.length; i < count; i++) {
        var job = this._jobs[i];

        // Remove jobs from the list after they are complete.
        if (job.isComplete) {
          this._removeJob(job, i);
          i--;
          count--;
          continue;
        }

        // Check whether the job is transient and has reached its end.
        if (job instanceof _transientAnimationJob.TransientAnimationJob && job.endTime < currentTime) {
          job.finish(false);
        } else {
          job.update(currentTime, deltaTime);
        }
      }
    }

    /**
     * Removes the given job from the collection of active, animating jobs.
     *
     * @param {AnimationJob} job
     * @param {number} [index=-1]
     * @private
     */

  }, {
    key: '_removeJob',
    value: function _removeJob(job) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

      console.debug('Removing AnimationJob: ' + job.constructor.name);

      if (index >= 0) {
        this._jobs.splice(index, 1);
      } else {
        var count = this._jobs.length;
        for (index = 0; index < count; index++) {
          if (this._jobs[index] === job) {
            this._jobs.splice(index, 1);
            break;
          }
        }
      }

      // Stop the animation loop when there are no more jobs to animate.
      if (this._jobs.length === 0) {
        this._stopAnimationLoop();
      }
    }

    /**
     * Draws all of the active AnimationJobs.
     *
     * @private
     */

  }, {
    key: '_drawJobs',
    value: function _drawJobs() {
      for (var i = 0, count = this._jobs.length; i < count; i++) {
        this._jobs[i].draw();
      }
    }

    /**
     * Starts the animation loop if it is not already running.
     *
     * This method is idempotent.
     *
     * @private
     */

  }, {
    key: '_startAnimationLoop',
    value: function _startAnimationLoop() {
      var _this2 = this;

      if (this._isPaused) {
        this._lastUnpauseTime = window.performance.now();
      }
      this._isPaused = false;

      // Only actually start the loop if it isn't already running and the page has focus.
      if (!this._requestAnimationFrameId && !document.hidden) {
        this._latencyProfiler.start();
        this._previousTime = window.performance.now();
        this._requestAnimationFrameId = window.requestAnimationFrame(function (time) {
          return _this2._animationLoop(time);
        });
      }
    }

    /**
     * Stops the animation loop.
     *
     * @private
     */

  }, {
    key: '_stopAnimationLoop',
    value: function _stopAnimationLoop() {
      if (!this._isPaused) {
        this._totalUnpausedRunTime += this._timeSinceLastPaused;
      }
      this._isPaused = true;
      window.cancelAnimationFrame(this._requestAnimationFrameId);
      this._requestAnimationFrameId = null;
      this._latencyProfiler.stop();
    }

    /**
     * Creates a promise that will resolve on the next animation loop.
     *
     * @returns {Promise}
     */

  }, {
    key: 'resolveOnNextFrame',
    value: function resolveOnNextFrame() {
      return new Promise(window.requestAnimationFrame);
    }

    /**
     * Gets the total amount of time the animator has been running while not paused.
     *
     * @returns {DOMHighResTimeStamp}
     */

  }, {
    key: 'currentTime',
    get: function get() {
      return this._previousTime;
    }

    /** @returns {boolean} */

  }, {
    key: 'isPaused',
    get: function get() {
      return this._isPaused;
    }
  }, {
    key: 'totalRunTime',
    get: function get() {
      return this._isPaused ? this._totalUnpausedRunTime : this._totalUnpausedRunTime + this._timeSinceLastPaused;
    }

    /**
     * @returns {DOMHighResTimeStamp}
     */

  }, {
    key: '_timeSinceLastPaused',
    get: function get() {
      return window.performance.now() - this._lastUnpauseTime;
    }
  }]);

  return Animator;
}();

var animator = new Animator();

exports.animator = animator;

/**
 * @typedef {number} DOMHighResTimeStamp A number of milliseconds, accurate to one thousandth of a
 * millisecond.
 */

},{"./frame-latency-profiler":56,"./persistent-animation-job":58,"./transient-animation-job":59}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class keeps track of avg/min/max frame latencies over the last logging time period and
 * periodically logs these values.
 */
var FrameLatencyProfiler = function () {
  /**
   * @param {number} logPeriod The period at which to print latency log messages. In milliseconds.
   * @param {number} latencyWarningThreshold If the average latency exceeds this threshold, then the
   * log message is shown as a warning. In milliseconds.
   * @param {string} logLabel A label to show for each latency log message.
   */
  function FrameLatencyProfiler(logPeriod, latencyWarningThreshold, logLabel) {
    _classCallCheck(this, FrameLatencyProfiler);

    this._logPeriod = logPeriod;
    this._latencyWarningThreshold = latencyWarningThreshold;
    this._logLabel = logLabel;

    this._frameCount = null;
    this._maxFrameLatency = null;
    this._minFrameLatency = null;
    this._avgFrameLatency = null;

    this._intervalId = null;
  }

  _createClass(FrameLatencyProfiler, [{
    key: "start",
    value: function start() {
      var _this = this;

      this.stop();
      this.reset();

      this._intervalId = setInterval(function () {
        _this.logFrameLatency();
        _this.reset();
      }, this._logPeriod);
    }
  }, {
    key: "stop",
    value: function stop() {
      clearInterval(this._intervalId);
    }
  }, {
    key: "reset",
    value: function reset() {
      this._frameCount = 0;
      this._maxFrameLatency = Number.MIN_VALUE;
      this._minFrameLatency = Number.MAX_VALUE;
      this._avgFrameLatency = 0;
    }

    /**
     * Keeps track of a running average, min value, and max value for the frame latencies.
     *
     * @param {DOMHighResTimeStamp} frameLatency
     */

  }, {
    key: "recordFrameLatency",
    value: function recordFrameLatency(frameLatency) {
      this._frameCount++;
      this._maxFrameLatency = this._maxFrameLatency < frameLatency ? frameLatency : this._maxFrameLatency;
      this._minFrameLatency = this._minFrameLatency > frameLatency ? frameLatency : this._minFrameLatency;
      this._avgFrameLatency = this._avgFrameLatency + (frameLatency - this._avgFrameLatency) / this._frameCount;
    }
  }, {
    key: "logFrameLatency",
    value: function logFrameLatency() {
      if (this._frameCount > 0) {
        var message = this._logLabel + ":  AVG=" + this._avgFrameLatency.toFixed(3) + "  " + ("(MAX=" + this._maxFrameLatency.toFixed(3) + "; MIN=" + this._minFrameLatency.toFixed(3) + ")");
        if (this._maxFrameLatency >= this._latencyWarningThreshold) {
          console.warn(message);
        } else {
          console.debug(message);
        }
      }
    }
  }]);

  return FrameLatencyProfiler;
}();

exports.FrameLatencyProfiler = FrameLatencyProfiler;

},{}],57:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _animationJob = require('./animation-job');

Object.keys(_animationJob).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _animationJob[key];
    }
  });
});

var _animator = require('./animator');

Object.keys(_animator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _animator[key];
    }
  });
});

var _frameLatencyProfiler = require('./frame-latency-profiler');

Object.keys(_frameLatencyProfiler).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _frameLatencyProfiler[key];
    }
  });
});

var _persistentAnimationJob = require('./persistent-animation-job');

Object.keys(_persistentAnimationJob).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _persistentAnimationJob[key];
    }
  });
});

var _transientAnimationJob = require('./transient-animation-job');

Object.keys(_transientAnimationJob).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _transientAnimationJob[key];
    }
  });
});

},{"./animation-job":54,"./animator":55,"./frame-latency-profiler":56,"./persistent-animation-job":58,"./transient-animation-job":59}],58:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersistentAnimationJob = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _animationJob = require('./animation-job');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A PersistentAnimationJob recurs or has an indefinite duration.
 *
 * @abstract
 */
var PersistentAnimationJob = function (_AnimationJob) {
  _inherits(PersistentAnimationJob, _AnimationJob);

  /**
   * @param {Function} [onComplete] A callback to be called when this AnimationJob is finished.
   */
  function PersistentAnimationJob(onComplete) {
    _classCallCheck(this, PersistentAnimationJob);

    // PersistentAnimationJob is an abstract class. It should not be instantiated directly.
    var _this = _possibleConstructorReturn(this, (PersistentAnimationJob.__proto__ || Object.getPrototypeOf(PersistentAnimationJob)).call(this, onComplete));

    if (new.target === PersistentAnimationJob) {
      throw new TypeError('Cannot construct PersistentAnimationJob instances directly');
    }
    return _this;
  }

  /**
   * @abstract
   */


  _createClass(PersistentAnimationJob, [{
    key: 'reset',
    value: function reset() {
      // Extending classes should implement this method.
      throw new TypeError('Method not implemented');
    }
  }]);

  return PersistentAnimationJob;
}(_animationJob.AnimationJob);

exports.PersistentAnimationJob = PersistentAnimationJob;

},{"./animation-job":54}],59:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransientAnimationJob = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util2 = require('./util');

var _animationJob = require('./animation-job');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A TransientAnimationJob is temporary and has a definite beginning and end.
 *
 * @abstract
 */
var TransientAnimationJob = function (_AnimationJob) {
  _inherits(TransientAnimationJob, _AnimationJob);

  /**
   * @param {number} duration
   * @param {number} delay
   * @param {Function|String} easingFunction
   * @param {Function} [onComplete] A callback to be called when this AnimationJob is finished.
   */
  function TransientAnimationJob(duration, delay, easingFunction, onComplete) {
    _classCallCheck(this, TransientAnimationJob);

    // TransientAnimationJob is an abstract class. It should not be instantiated directly.
    var _this = _possibleConstructorReturn(this, (TransientAnimationJob.__proto__ || Object.getPrototypeOf(TransientAnimationJob)).call(this, onComplete));

    if (new.target === TransientAnimationJob) {
      throw new TypeError('Cannot construct TransientAnimationJob instances directly');
    }

    _this._duration = duration;
    _this._delay = delay;
    _this._easingFunction = typeof easingFunction === 'function' ? easingFunction : _util2._util.easingFunctions[easingFunction];
    return _this;
  }

  /**
   * @returns {number}
   */


  _createClass(TransientAnimationJob, [{
    key: 'endTime',
    get: function get() {
      return this._startTime + this._duration + this._delay;
    }
  }]);

  return TransientAnimationJob;
}(_animationJob.AnimationJob);

exports.TransientAnimationJob = TransientAnimationJob;

},{"./animation-job":54,"./util":60}],60:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * This module defines a collection of static utility functions.
 */

// A collection of different types of easing functions.
var easingFunctions = {
  linear: function linear(t) {
    return t;
  },
  easeInQuad: function easeInQuad(t) {
    return t * t;
  },
  easeOutQuad: function easeOutQuad(t) {
    return t * (2 - t);
  },
  easeInOutQuad: function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },
  easeInCubic: function easeInCubic(t) {
    return t * t * t;
  },
  easeOutCubic: function easeOutCubic(t) {
    return 1 + --t * t * t;
  },
  easeInOutCubic: function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  },
  easeInQuart: function easeInQuart(t) {
    return t * t * t * t;
  },
  easeOutQuart: function easeOutQuart(t) {
    return 1 - --t * t * t * t;
  },
  easeInOutQuart: function easeInOutQuart(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
  },
  easeInQuint: function easeInQuint(t) {
    return t * t * t * t * t;
  },
  easeOutQuint: function easeOutQuint(t) {
    return 1 + --t * t * t * t * t;
  },
  easeInOutQuint: function easeInOutQuint(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
  }
};

var _util = {
  easingFunctions: easingFunctions
};

exports._util = _util;

},{}],61:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"./src":85,"dup":1}],62:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _aabbCollidable = require('./src/aabb-collidable');

Object.keys(_aabbCollidable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aabbCollidable[key];
    }
  });
});

var _capsuleCollidable = require('./src/capsule-collidable');

Object.keys(_capsuleCollidable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _capsuleCollidable[key];
    }
  });
});

var _collidable = require('./src/collidable');

Object.keys(_collidable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _collidable[key];
    }
  });
});

var _lineSegment = require('./src/line-segment');

Object.keys(_lineSegment).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _lineSegment[key];
    }
  });
});

var _obbCollidable = require('./src/obb-collidable');

Object.keys(_obbCollidable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _obbCollidable[key];
    }
  });
});

var _sphereCollidable = require('./src/sphere-collidable');

Object.keys(_sphereCollidable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _sphereCollidable[key];
    }
  });
});

},{"./src/aabb-collidable":63,"./src/capsule-collidable":64,"./src/collidable":65,"./src/line-segment":66,"./src/obb-collidable":67,"./src/sphere-collidable":68}],63:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Aabb = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _collidable = require('./collidable');

var _lineSegment = require('./line-segment');

var _util = require('../../../util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This class represents an axially-aligned bounding box (AABB).
 *
 * This is primarily useful for collision detection. An AABB is only appropriate for some
 * geometries. For other geometries, an oriented bounding box (OBB) or a bounding sphere may be more
 * appropriate.
 */
var Aabb = function (_Collidable) {
  _inherits(Aabb, _Collidable);

  /**
   * @param {number} minX
   * @param {number} minY
   * @param {number} minZ
   * @param {number} maxX
   * @param {number} maxY
   * @param {number} maxZ
   * @param {boolean} [isStationary=false]
   * @param {CollidablePhysicsJob} [physicsJob]
   */
  function Aabb(minX, minY, minZ, maxX, maxY, maxZ) {
    var isStationary = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
    var physicsJob = arguments[7];

    _classCallCheck(this, Aabb);

    var _this = _possibleConstructorReturn(this, (Aabb.__proto__ || Object.getPrototypeOf(Aabb)).call(this, isStationary, physicsJob));

    _this.minX = minX;
    _this.minY = minY;
    _this.minZ = minZ;
    _this.maxX = maxX;
    _this.maxY = maxY;
    _this.maxZ = maxZ;
    return _this;
  }

  /**
   * Creates a new bounding box with the dimensions of an axially-aligned cube centered around the 
   * given center and with the given half-side length.
   *
   * @param {vec3} center
   * @param {number} halfSideLength
   */


  _createClass(Aabb, [{
    key: 'setAsUniformAroundCenter',


    /**
     * Updates the dimensions of this bounding box to represent an axially-aligned cube centered
     * around the given center and with the given half-side length.
     *
     * @param {vec3} center
     * @param {number} halfSideLength
     */
    value: function setAsUniformAroundCenter(center, halfSideLength) {
      this.minX = center[0] - halfSideLength;
      this.minY = center[1] - halfSideLength;
      this.minZ = center[2] - halfSideLength;
      this.maxX = center[0] + halfSideLength;
      this.maxY = center[1] + halfSideLength;
      this.maxZ = center[2] + halfSideLength;
    }

    /** @returns {number} */

  }, {
    key: 'someVertex',


    /**
     * Calls the given callback once for each vertex.
     *
     * Stops as soon as the callback returns true for a vertex.
     *
     * @param {VertexCallback} callback
     * @param {vec3} [vertex] Output param.
     * @returns {boolean} True if one of the callbacks returned true.
     */
    value: function someVertex(callback, vertex) {
      vertex = vertex || _util.tmpVec1;

      vec3.set(vertex, this.minX, this.minY, this.minZ);
      if (callback(vertex)) return true;

      vec3.set(vertex, this.maxX, this.minY, this.minZ);
      if (callback(vertex)) return true;

      vec3.set(vertex, this.minX, this.maxY, this.minZ);
      if (callback(vertex)) return true;

      vec3.set(vertex, this.maxX, this.maxY, this.minZ);
      if (callback(vertex)) return true;

      vec3.set(vertex, this.minX, this.minY, this.maxZ);
      if (callback(vertex)) return true;

      vec3.set(vertex, this.maxX, this.minY, this.maxZ);
      if (callback(vertex)) return true;

      vec3.set(vertex, this.minX, this.maxY, this.maxZ);
      if (callback(vertex)) return true;

      vec3.set(vertex, this.maxX, this.maxY, this.maxZ);
      if (callback(vertex)) return true;

      return false;
    }

    /**
     * Calls the given callback once for each edge.
     *
     * @param {EdgeCallback} callback
     * @param {LineSegment} [edge] Output param.
     * @returns {boolean} True if one of the callbacks returned true.
     */

  }, {
    key: 'someEdge',
    value: function someEdge(callback, edge) {
      edge = edge || _segment;

      //
      // Edges along front face.
      //

      vec3.set(_util.tmpVec1, this.minX, this.minY, this.minZ);
      vec3.set(_util.tmpVec2, this.maxX, this.minY, this.minZ);
      edge.reset(_util.tmpVec1, _util.tmpVec2);
      if (callback(edge)) return true;

      vec3.set(_util.tmpVec1, this.minX, this.maxY, this.minZ);
      vec3.set(_util.tmpVec2, this.maxX, this.maxY, this.minZ);
      edge.reset(_util.tmpVec1, _util.tmpVec2);
      if (callback(edge)) return true;

      vec3.set(_util.tmpVec1, this.minX, this.minY, this.minZ);
      vec3.set(_util.tmpVec2, this.minX, this.maxY, this.minZ);
      edge.reset(_util.tmpVec1, _util.tmpVec2);
      if (callback(edge)) return true;

      vec3.set(_util.tmpVec1, this.maxX, this.minY, this.minZ);
      vec3.set(_util.tmpVec2, this.maxX, this.maxY, this.minZ);
      edge.reset(_util.tmpVec1, _util.tmpVec2);
      if (callback(edge)) return true;

      //
      // Edges along back face.
      //

      vec3.set(_util.tmpVec1, this.minX, this.minY, this.maxZ);
      vec3.set(_util.tmpVec2, this.maxX, this.minY, this.maxZ);
      edge.reset(_util.tmpVec1, _util.tmpVec2);
      if (callback(edge)) return true;

      vec3.set(_util.tmpVec1, this.minX, this.maxY, this.maxZ);
      vec3.set(_util.tmpVec2, this.maxX, this.maxY, this.maxZ);
      edge.reset(_util.tmpVec1, _util.tmpVec2);
      if (callback(edge)) return true;

      vec3.set(_util.tmpVec1, this.minX, this.minY, this.maxZ);
      vec3.set(_util.tmpVec2, this.minX, this.maxY, this.maxZ);
      edge.reset(_util.tmpVec1, _util.tmpVec2);
      if (callback(edge)) return true;

      vec3.set(_util.tmpVec1, this.maxX, this.minY, this.maxZ);
      vec3.set(_util.tmpVec2, this.maxX, this.maxY, this.maxZ);
      edge.reset(_util.tmpVec1, _util.tmpVec2);
      if (callback(edge)) return true;

      //
      // Edges between front and back faces.
      //

      vec3.set(_util.tmpVec1, this.minX, this.minY, this.minZ);
      vec3.set(_util.tmpVec2, this.minX, this.minY, this.maxZ);
      edge.reset(_util.tmpVec1, _util.tmpVec2);
      if (callback(edge)) return true;

      vec3.set(_util.tmpVec1, this.maxX, this.minY, this.minZ);
      vec3.set(_util.tmpVec2, this.maxX, this.minY, this.maxZ);
      edge.reset(_util.tmpVec1, _util.tmpVec2);
      if (callback(edge)) return true;

      vec3.set(_util.tmpVec1, this.minX, this.maxY, this.minZ);
      vec3.set(_util.tmpVec2, this.minX, this.maxY, this.maxZ);
      edge.reset(_util.tmpVec1, _util.tmpVec2);
      if (callback(edge)) return true;

      vec3.set(_util.tmpVec1, this.maxX, this.maxY, this.minZ);
      vec3.set(_util.tmpVec2, this.maxX, this.maxY, this.maxZ);
      edge.reset(_util.tmpVec1, _util.tmpVec2);
      if (callback(edge)) return true;

      return false;
    }
  }, {
    key: 'rangeX',
    get: function get() {
      return this.maxX - this.minX;
    }
    /** @returns {number} */

  }, {
    key: 'rangeY',
    get: function get() {
      return this.maxY - this.minY;
    }
    /** @returns {number} */

  }, {
    key: 'rangeZ',
    get: function get() {
      return this.maxZ - this.minZ;
    }

    /** @returns {number} */

  }, {
    key: 'centerX',
    get: function get() {
      return this.minX + this.rangeX / 2;
    }
    /** @returns {number} */

  }, {
    key: 'centerY',
    get: function get() {
      return this.minY + this.rangeY / 2;
    }
    /** @returns {number} */

  }, {
    key: 'centerZ',
    get: function get() {
      return this.minZ + this.rangeZ / 2;
    }

    /** @returns {number} */

  }, {
    key: 'surfaceArea',
    get: function get() {
      var rangeX = this.rangeX;
      var rangeY = this.rangeY;
      var rangeZ = this.rangeZ;
      return 2 * (rangeX * rangeY + rangeX * rangeZ + rangeY * rangeZ);
    }

    /**
     * @returns {vec3}
     * @override
     */

  }, {
    key: 'centerOfVolume',
    get: function get() {
      // Reuse the same object when this is called multiple times.
      this._centerOfVolume = this._centerOfVolume || vec3.create();
      vec3.set(this._centerOfVolume, this.centerX, this.centerY, this.centerZ);
      return this._centerOfVolume;
    }

    /**
     * @returns {Collidable}
     * @override
     */

  }, {
    key: 'boundingVolume',
    get: function get() {
      return this;
    }

    /**
     * @param {vec3} value
     * @override
     */

  }, {
    key: 'position',
    set: function set(value) {
      var rangeX = this.rangeX;
      var rangeY = this.rangeY;
      var rangeZ = this.rangeZ;
      this.minX = value[0] - rangeX / 2;
      this.minY = value[1] - rangeY / 2;
      this.minZ = value[2] - rangeZ / 2;
      this.maxX = value[0] + rangeX / 2;
      this.maxY = value[1] + rangeY / 2;
      this.maxZ = value[2] + rangeZ / 2;
    }

    /**
     * @param {quat} value
     * @override
     */

  }, {
    key: 'orientation',
    set: function set(value) {}
    // Do nothing.

  }], [{
    key: 'createAsUniformAroundCenter',
    value: function createAsUniformAroundCenter(center, halfSideLength) {
      var bounds = new Aabb(0, 0, 0, 0, 0, 0);
      bounds.setAsUniformAroundCenter(center, halfSideLength);
      return bounds;
    }
  }]);

  return Aabb;
}(_collidable.Collidable);

var _segment = new _lineSegment.LineSegment(vec3.create(), vec3.create());

exports.Aabb = Aabb;

},{"../../../util":92,"./collidable":65,"./line-segment":66}],64:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Capsule = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _collidable = require('./collidable');

var _lineSegment = require('./line-segment');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This class represents a capsule.
 *
 * - A capsule is a cylinder with semi-spheres on either end.
 * - A capsule can represent a rough approximation of many useful shapes.
 * - A capsule can be used for relatively efficient collision detection.
 */
var Capsule = function (_Collidable) {
  _inherits(Capsule, _Collidable);

  /**
   * The default orientation of the capsule is along the z-axis.
   *
   * @param {number} halfDistance Half the distance from the centers of the capsule end spheres.
   * @param {number} radius
   * @param {boolean} [isStationary=false]
   * @param {CollidablePhysicsJob} [physicsJob]
   */
  function Capsule(halfDistance, radius) {
    var isStationary = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var physicsJob = arguments[3];

    _classCallCheck(this, Capsule);

    var _this = _possibleConstructorReturn(this, (Capsule.__proto__ || Object.getPrototypeOf(Capsule)).call(this, isStationary, physicsJob));

    _this.halfDistance = halfDistance;
    _this.segment = new _lineSegment.LineSegment(vec3.fromValues(0, 0, -halfDistance), vec3.fromValues(0, 0, halfDistance));
    _this.radius = radius;
    return _this;
  }

  /**
   * @returns {vec3}
   * @override
   */


  _createClass(Capsule, [{
    key: 'centerOfVolume',
    get: function get() {
      return this.segment.center;
    }

    /**
     * @returns {Collidable}
     * @override
     */

  }, {
    key: 'boundingVolume',
    get: function get() {
      return this;
    }

    /**
     * @param {vec3} value
     * @override
     */

  }, {
    key: 'position',
    set: function set(value) {
      this.segment.center = value;
    }

    /**
     * @param {quat} value
     * @override
     */

  }, {
    key: 'orientation',
    set: function set(value) {
      this.segment.orientation = value;
    }
  }]);

  return Capsule;
}(_collidable.Collidable);

exports.Capsule = Capsule;

},{"./collidable":65,"./line-segment":66}],65:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class represents a 3D collidable rigid object.
 *
 * This is useful for collision detection and response.
 *
 * @abstract
 */
var Collidable = function () {
  /**
   * @param {boolean} isStationary
   * @param {CollidablePhysicsJob} [physicsJob]
   */
  function Collidable(isStationary, physicsJob) {
    _classCallCheck(this, Collidable);

    // Collidable is an abstract class. It should not be instantiated directly.
    if (new.target === Collidable) {
      throw new TypeError('Cannot construct Collidable instances directly');
    }

    this.isStationary = isStationary;
    this.physicsJob = physicsJob;
    this.collisions = [];
    this.previousCollisions = [];
  }

  /**
   * Implementing classes can override this to provide a center of mass that is different than the
   * center of volume.
   *
   * @returns {vec3}
   */


  _createClass(Collidable, [{
    key: 'centerOfMass',
    get: function get() {
      return this.centerOfVolume;
    }

    /**
     * @returns {vec3}
     * @abstract
     */

  }, {
    key: 'centerOfVolume',
    get: function get() {
      // Extending classes should implement this method.
      throw new TypeError('Method not implemented');
    }

    /**
     * @returns {Collidable}
     * @abstract
     */

  }, {
    key: 'boundingVolume',
    get: function get() {
      // Extending classes should implement this method.
      throw new TypeError('Method not implemented');
    }

    /**
     * @param {vec3} value
     * @abstract
     */

  }, {
    key: 'position',
    set: function set(value) {
      // Extending classes should implement this method.
      throw new TypeError('Method not implemented');
    }

    /**
     * @param {quat} value
     * @abstract
     */

  }, {
    key: 'orientation',
    set: function set(value) {
      // Extending classes should implement this method.
      throw new TypeError('Method not implemented');
    }
  }]);

  return Collidable;
}();

exports.Collidable = Collidable;

},{}],66:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineSegment = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('../../../util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class represents a line segment.
 */
var LineSegment = function () {
  /**
   * @param {vec3} start
   * @param {vec3} end
   */
  function LineSegment(start, end) {
    _classCallCheck(this, LineSegment);

    this.start = vec3.create();
    this.end = vec3.create();
    this._center = vec3.create();
    this._originalOrientationStart = vec3.create();
    this._originalOrientationEnd = vec3.create();
    this.reset(start, end);
  }

  /**
   * @param {vec3} start
   * @param {vec3} end
   */


  _createClass(LineSegment, [{
    key: 'reset',
    value: function reset(start, end) {
      vec3.copy(this.start, start);
      vec3.copy(this.end, end);
      vec3.subtract(this._originalOrientationStart, this.start, this.center);
      vec3.subtract(this._originalOrientationEnd, this.end, this.center);
    }

    /** @returns {LineSegment} */

  }, {
    key: 'clone',
    value: function clone() {
      var segment = new LineSegment(this.start, this.end);
      segment._originalOrientationStart = this._originalOrientationStart;
      segment._originalOrientationEnd = this._originalOrientationEnd;
      return segment;
    }

    /**
     * The UN-NORMALIZED direction of this segment.
     *
     * @returns {vec3}
     */

  }, {
    key: 'dir',
    get: function get() {
      // Reuse the same object when this is called multiple times.
      this._dir = this._dir || vec3.create();
      return vec3.subtract(this._dir, this.end, this.start);
    }

    /** @returns {vec3} */

  }, {
    key: 'center',
    get: function get() {
      vec3.lerp(this._center, this.start, this.end, 0.5);
      return this._center;
    }

    /** @param {vec3} value */
    ,
    set: function set(value) {
      // Reuse the same object when this is called multiple times.
      this._displacement = this._displacement || vec3.create();
      vec3.subtract(this._displacement, value, this.center);

      vec3.add(this.start, this.start, this._displacement);
      vec3.add(this.end, this.end, this._displacement);
    }

    /** @param {quat} value */

  }, {
    key: 'orientation',
    set: function set(value) {
      vec3.transformQuat(_util.tmpVec1, this._originalOrientationStart, value);
      vec3.transformQuat(_util.tmpVec2, this._originalOrientationEnd, value);

      // We don't want this to be re-calculated between start/end updates.
      var center = this.center;

      vec3.add(this.start, center, _util.tmpVec1);
      vec3.add(this.end, center, _util.tmpVec2);
    }
  }]);

  return LineSegment;
}();

exports.LineSegment = LineSegment;

},{"../../../util":92}],67:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Obb = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _collidable = require('./collidable');

var _sphereCollidable = require('./sphere-collidable');

var _lineSegment = require('./line-segment');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This class represents an oriented bounding box (OBB).
 *
 * This is useful both for collision detection and for representing any rotated rectangular cuboid.
 * An OBB is only appropriate for some geometries. For other geometries, an axially-aligned bounding
 * box (AABB) or a bounding sphere may be more appropriate.
 */
var Obb = function (_Collidable) {
  _inherits(Obb, _Collidable);

  /**
   * Defaults to being centered at the origin with its local axes aligned with the world axes.
   *
   * @param {number} halfSideLengthX
   * @param {number} halfSideLengthY
   * @param {number} halfSideLengthZ
   * @param {boolean} [isStationary=false]
   * @param {CollidablePhysicsJob} [physicsJob]
   */
  function Obb(halfSideLengthX, halfSideLengthY, halfSideLengthZ) {
    var isStationary = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var physicsJob = arguments[4];

    _classCallCheck(this, Obb);

    var _this = _possibleConstructorReturn(this, (Obb.__proto__ || Object.getPrototypeOf(Obb)).call(this, isStationary, physicsJob));

    _this.extents = [vec3.fromValues(halfSideLengthX, 0, 0), vec3.fromValues(0, halfSideLengthY, 0), vec3.fromValues(0, 0, halfSideLengthZ)];
    _this.axes = [vec3.fromValues(1, 0, 0), vec3.fromValues(0, 1, 0), vec3.fromValues(0, 0, 1)];
    _this.halfSideLengths = [halfSideLengthX, halfSideLengthY, halfSideLengthZ];
    _this._center = vec3.create();
    _this._orientation = quat.create();
    return _this;
  }

  /**
   * @returns {vec3}
   * @override
   */


  _createClass(Obb, [{
    key: 'someVertex',


    /**
     * Calls the given callback once for each vertex.
     *
     * Stops as soon as the callback returns true for a vertex.
     *
     * @param {VertexCallback} callback
     * @param {vec3} [vertex] Output param.
     * @returns {boolean} True if one of the callbacks returned true.
     */
    value: function someVertex(callback, vertex) {
      vertex = vertex || _vertex1;

      for (var xScale = -1; xScale <= 1; xScale += 2) {
        for (var yScale = -1; yScale <= 1; yScale += 2) {
          for (var zScale = -1; zScale <= 1; zScale += 2) {
            vec3.copy(vertex, this._center);
            vec3.scaleAndAdd(vertex, vertex, this.extents[0], xScale);
            vec3.scaleAndAdd(vertex, vertex, this.extents[1], yScale);
            vec3.scaleAndAdd(vertex, vertex, this.extents[2], zScale);
            if (callback(vertex)) {
              return true;
            }
          }
        }
      }
      return false;
    }

    /**
     * Calls the given callback once for each edge.
     *
     * @param {EdgeCallback} callback
     * @param {LineSegment} [edge] Output param.
     * @returns {boolean} True if one of the callbacks returned true.
     */

  }, {
    key: 'someEdge',
    value: function someEdge(callback, edge) {
      var _this2 = this;

      edge = edge || _segment;

      return _edgeExtentScales.some(function (edgeExtentScalePair) {
        var vertex1ExtentScales = edgeExtentScalePair[0];
        var vertex2ExtentScales = edgeExtentScalePair[1];

        // Calculate the edge's first and second vertex.
        vec3.copy(_vertex1, _this2._center);
        vec3.copy(_vertex2, _this2._center);
        for (var i = 0; i < 3; i++) {
          vec3.scaleAndAdd(_vertex1, _vertex1, _this2.extents[i], vertex1ExtentScales[i]);
          vec3.scaleAndAdd(_vertex2, _vertex2, _this2.extents[i], vertex2ExtentScales[i]);
        }

        // Call back with the edge.
        edge.reset(_vertex1, _vertex2);
        return callback(edge);
      });
    }

    /**
     * Calls the given callback once for each face.
     *
     * @param {FaceCallback} callback
     * @param {Array.<vec3>} [face] Output param.
     * @returns {boolean} True if one of the callbacks returned true.
     */

  }, {
    key: 'someFace',
    value: function someFace(callback, face) {
      var _this3 = this;

      face = face || [];

      return _faceExtentScales.some(function (faceExtentScales) {
        var vertex1ExtentScales = faceExtentScales[0];
        var vertex2ExtentScales = faceExtentScales[1];
        var vertex3ExtentScales = faceExtentScales[2];
        var vertex4ExtentScales = faceExtentScales[3];

        // Calculate the face's vertices.
        vec3.copy(_vertex1, _this3._center);
        vec3.copy(_vertex2, _this3._center);
        vec3.copy(_vertex3, _this3._center);
        vec3.copy(_vertex4, _this3._center);
        for (var i = 0; i < 3; i++) {
          vec3.scaleAndAdd(_vertex1, _vertex1, _this3.extents[i], vertex1ExtentScales[i]);
          vec3.scaleAndAdd(_vertex2, _vertex2, _this3.extents[i], vertex2ExtentScales[i]);
          vec3.scaleAndAdd(_vertex3, _vertex3, _this3.extents[i], vertex3ExtentScales[i]);
          vec3.scaleAndAdd(_vertex4, _vertex4, _this3.extents[i], vertex4ExtentScales[i]);
        }

        // Call back with the face.
        face.splice(0, 4, _vertex1, _vertex2, _vertex3, _vertex4);
        return callback(face);
      });
    }

    /**
     * Calls the given callback once for each face with a given additional offset from the center
     * applied to each face.
     *
     * @param {FaceCallback} callback
     * @param {number} radiusOffset
     * @param {Array.<vec3>} [face] Output param.
     * @returns {boolean} True if one of the callbacks returned true.
     */

  }, {
    key: 'somePushedOutFace',
    value: function somePushedOutFace(callback, radiusOffset, face) {
      var _this4 = this;

      face = face || [];

      return _faceExtentScales.some(function (faceExtentScales, index) {
        var vertex1ExtentScales = faceExtentScales[0];
        var vertex2ExtentScales = faceExtentScales[1];
        var vertex3ExtentScales = faceExtentScales[2];
        var vertex4ExtentScales = faceExtentScales[3];
        var directionOffsets = _pushedOutFaceOffsetDirections[index];

        // Calculate the face's vertices.
        vec3.copy(_vertex1, _this4._center);
        vec3.copy(_vertex2, _this4._center);
        vec3.copy(_vertex3, _this4._center);
        vec3.copy(_vertex4, _this4._center);
        for (var i = 0; i < 3; i++) {
          // Add the offset for the normal vertex position.
          vec3.scaleAndAdd(_vertex1, _vertex1, _this4.extents[i], vertex1ExtentScales[i]);
          vec3.scaleAndAdd(_vertex2, _vertex2, _this4.extents[i], vertex2ExtentScales[i]);
          vec3.scaleAndAdd(_vertex3, _vertex3, _this4.extents[i], vertex3ExtentScales[i]);
          vec3.scaleAndAdd(_vertex4, _vertex4, _this4.extents[i], vertex4ExtentScales[i]);
          // Add the pushed-out offset.
          vec3.scaleAndAdd(_vertex1, _vertex1, _this4.extents[i], radiusOffset / _this4.halfSideLengths[i] * directionOffsets[i]);
          vec3.scaleAndAdd(_vertex2, _vertex2, _this4.extents[i], radiusOffset / _this4.halfSideLengths[i] * directionOffsets[i]);
          vec3.scaleAndAdd(_vertex3, _vertex3, _this4.extents[i], radiusOffset / _this4.halfSideLengths[i] * directionOffsets[i]);
          vec3.scaleAndAdd(_vertex4, _vertex4, _this4.extents[i], radiusOffset / _this4.halfSideLengths[i] * directionOffsets[i]);
        }

        // Call back with the face.
        face.splice(0, 4, _vertex1, _vertex2, _vertex3, _vertex4);
        return callback(face);
      });
    }
  }, {
    key: '_updateExtents',
    value: function _updateExtents() {
      vec3.set(_vertex1, this.halfSideLengths[0], 0, 0);
      vec3.transformQuat(this.extents[0], _vertex1, this._orientation);
      vec3.set(_vertex1, 0, this.halfSideLengths[1], 0);
      vec3.transformQuat(this.extents[1], _vertex1, this._orientation);
      vec3.set(_vertex1, 0, 0, this.halfSideLengths[2]);
      vec3.transformQuat(this.extents[2], _vertex1, this._orientation);

      vec3.set(_vertex1, 1, 0, 0);
      vec3.transformQuat(this.axes[0], _vertex1, this._orientation);
      vec3.set(_vertex1, 0, 1, 0);
      vec3.transformQuat(this.axes[1], _vertex1, this._orientation);
      vec3.set(_vertex1, 0, 0, 1);
      vec3.transformQuat(this.axes[2], _vertex1, this._orientation);
    }
  }, {
    key: 'centerOfVolume',
    get: function get() {
      return this._center;
    }

    /**
     * @returns {Collidable}
     * @override
     */

  }, {
    key: 'boundingVolume',
    get: function get() {
      // Reuse the same value when this is called multiple times.
      if (!this._boundingSphere) {
        var radius = Math.sqrt(this.halfSideLengthX * this.halfSideLengthX + this.halfSideLengthY * this.halfSideLengthY + this.halfSideLengthZ * this.halfSideLengthZ);
        this._boundingSphere = new _sphereCollidable.Sphere(0, 0, 0, radius, this.isStationary);
      }
      this._boundingSphere.position = this._center;
      return this._boundingSphere;
    }

    /**
     * @param {vec3} value
     * @override
     */

  }, {
    key: 'position',
    set: function set(value) {
      vec3.copy(this._center, value);
    }

    /**
     * @param {quat} value
     * @override
     */

  }, {
    key: 'orientation',
    set: function set(value) {
      quat.copy(this._orientation, value);
      this._updateExtents();
    }
    /** @returns {quat} */
    ,
    get: function get() {
      return this._orientation;
    }

    /** @returns {number} */

  }, {
    key: 'halfSideLengthX',
    get: function get() {
      return this.halfSideLengths[0];
    }
    /** @param {number} value */
    ,
    set: function set(value) {
      this.halfSideLengths[0] = value;
      this._updateExtents();
    }

    /** @returns {number} */

  }, {
    key: 'halfSideLengthY',
    get: function get() {
      return this.halfSideLengths[1];
    }
    /** @param {number} value */
    ,
    set: function set(value) {
      this.halfSideLengths[1] = value;
      this._updateExtents();
    }

    /** @returns {number} */

  }, {
    key: 'halfSideLengthZ',
    get: function get() {
      return this.halfSideLengths[2];
    }
    /** @param {number} value */
    ,
    set: function set(value) {
      this.halfSideLengths[2] = value;
      this._updateExtents();
    }
  }]);

  return Obb;
}(_collidable.Collidable);

var _vertex1 = vec3.create();
var _vertex2 = vec3.create();
var _vertex3 = vec3.create();
var _vertex4 = vec3.create();
var _segment = new _lineSegment.LineSegment(vec3.create(), vec3.create());

var _edgeExtentScales = [
// Front-face edges.
[[1, -1, -1], [1, -1, 1]], [[1, -1, -1], [1, 1, -1]], [[1, 1, 1], [1, -1, 1]], [[1, 1, 1], [1, 1, -1]],
// Back-face edges.
[[-1, -1, -1], [-1, -1, 1]], [[-1, -1, -1], [-1, 1, -1]], [[-1, 1, 1], [-1, -1, 1]], [[-1, 1, 1], [-1, 1, -1]],
// Front-to-back edges.
[[1, -1, 1], [-1, -1, 1]], [[1, 1, -1], [-1, 1, -1]], [[1, 1, 1], [-1, 1, 1]], [[1, -1, -1], [-1, -1, -1]]];

var _faceExtentScales = [[[1, -1, -1], [1, -1, 1], [1, 1, 1], [1, 1, -1]], [[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]], [[-1, 1, -1], [1, 1, -1], [1, 1, 1], [-1, 1, 1]], [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]], [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]], [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1]]];

var _pushedOutFaceOffsetDirections = [vec3.fromValues(1, 0, 0), vec3.fromValues(-1, 0, 0), vec3.fromValues(0, 1, 0), vec3.fromValues(0, -1, 0), vec3.fromValues(0, 0, 1), vec3.fromValues(0, 0, -1)];

exports.Obb = Obb;

/**
 * @callback VertexCallback
 * @param {vec3}
 * @returns {boolean} If true, iteration will stop.
 */

/**
 * @callback EdgeCallback
 * @param {LineSegment}
 * @returns {boolean} If true, iteration will stop.
 */

/**
 * @callback FaceCallback
 * @param {Array.<vec3>}
 * @returns {boolean} If true, iteration will stop.
 */

},{"./collidable":65,"./line-segment":66,"./sphere-collidable":68}],68:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sphere = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _collidable = require('./collidable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This class represents a bounding sphere.
 *
 * This is primarily useful for collision detection. A bounding sphere is only appropriate for some
 * geometries. For other geometries, an axially-aligned bounding box may be more appropriate. For
 * others still, an oriented bounding box or a more complicated hierarchical model may be more
 * appropriate.
 */
var Sphere = function (_Collidable) {
  _inherits(Sphere, _Collidable);

  /**
   * @param {number} centerX
   * @param {number} centerY
   * @param {number} centerZ
   * @param {number} radius
   * @param {boolean} [isStationary=false]
   * @param {CollidablePhysicsJob} [physicsJob]
   */
  function Sphere(centerX, centerY, centerZ, radius) {
    var isStationary = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var physicsJob = arguments[5];

    _classCallCheck(this, Sphere);

    var _this = _possibleConstructorReturn(this, (Sphere.__proto__ || Object.getPrototypeOf(Sphere)).call(this, isStationary, physicsJob));

    _this.centerX = centerX;
    _this.centerY = centerY;
    _this.centerZ = centerZ;
    _this.radius = radius;
    return _this;
  }

  /**
   * @returns {vec3}
   * @override
   */


  _createClass(Sphere, [{
    key: 'centerOfVolume',
    get: function get() {
      // Reuse the same object when this is called multiple times.
      this._center = this._center || vec3.create();
      vec3.set(this._center, this.centerX, this.centerY, this.centerZ);
      return this._center;
    }

    /**
     * @returns {Collidable}
     * @override
     */

  }, {
    key: 'boundingVolume',
    get: function get() {
      return this;
    }

    /**
     * @param {vec3} value
     * @override
     */

  }, {
    key: 'position',
    set: function set(value) {
      this.centerX = value[0];
      this.centerY = value[1];
      this.centerZ = value[2];
    }

    /**
     * @param {quat} value
     * @override
     */

  }, {
    key: 'orientation',
    set: function set(value) {
      // Do nothing.
    }
  }]);

  return Sphere;
}(_collidable.Collidable);

exports.Sphere = Sphere;

},{"./collidable":65}],69:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sphereCollisionDetection = exports.obbCollisionDetection = exports.capsuleCollisionDetection = exports.aabbCollisionDetection = undefined;

var _aabbCollisionDetection = require('./src/aabb-collision-detection');

var aabbCollisionDetection = _interopRequireWildcard(_aabbCollisionDetection);

var _capsuleCollisionDetection = require('./src/capsule-collision-detection');

var capsuleCollisionDetection = _interopRequireWildcard(_capsuleCollisionDetection);

var _obbCollisionDetection = require('./src/obb-collision-detection');

var obbCollisionDetection = _interopRequireWildcard(_obbCollisionDetection);

var _sphereCollisionDetection = require('./src/sphere-collision-detection');

var sphereCollisionDetection = _interopRequireWildcard(_sphereCollisionDetection);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.aabbCollisionDetection = aabbCollisionDetection;
exports.capsuleCollisionDetection = capsuleCollisionDetection;
exports.obbCollisionDetection = obbCollisionDetection;
exports.sphereCollisionDetection = sphereCollisionDetection;

},{"./src/aabb-collision-detection":70,"./src/capsule-collision-detection":71,"./src/obb-collision-detection":72,"./src/sphere-collision-detection":73}],70:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aabbVsCapsule = exports.aabbVsObb = exports.aabbVsAabb = exports.aabbVsSphere = exports.aabbVsPoint = undefined;

var _sphereCollisionDetection = require('./sphere-collision-detection');

var sphereCollisionDetection = _interopRequireWildcard(_sphereCollisionDetection);

var _obbCollisionDetection = require('./obb-collision-detection');

var obbCollisionDetection = _interopRequireWildcard(_obbCollisionDetection);

var _capsuleCollisionDetection = require('./capsule-collision-detection');

var capsuleCollisionDetection = _interopRequireWildcard(_capsuleCollisionDetection);

var _util = require('../../../util');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * This module defines utility methods for detecting whether intersection has occurred between
 * axially-aligned bounding boxes and other shapes.
 */

/**
 * @param {Aabb} aabb
 * @param {vec3} point
 * @returns {boolean}
 */
function aabbVsPoint(aabb, point) {
  return (0, _util.aabbVsPoint)(aabb, point);
}

/**
 * @param {Aabb} aabb
 * @param {Sphere} sphere
 * @returns {boolean}
 */
function aabbVsSphere(aabb, sphere) {
  return sphereCollisionDetection.sphereVsAabb(sphere, aabb);
}

/**
 * @param {Aabb} aabbA
 * @param {Aabb} aabbB
 * @returns {boolean}
 */
function aabbVsAabb(aabbA, aabbB) {
  return aabbA.maxX >= aabbB.minX && aabbA.minX <= aabbB.maxX && aabbA.maxY >= aabbB.minY && aabbA.minY <= aabbB.maxY && aabbA.maxZ >= aabbB.minZ && aabbA.minZ <= aabbB.maxZ;
}

/**
 * @param {Aabb} aabb
 * @param {Obb} obb
 * @returns {boolean}
 */
function aabbVsObb(aabb, obb) {
  return obbCollisionDetection.obbVsAabb(obb, aabb);
}

/**
 * @param {Aabb} aabb
 * @param {Capsule} capsule
 * @returns {boolean}
 */
function aabbVsCapsule(aabb, capsule) {
  return capsuleCollisionDetection.capsuleVsAabb(capsule, aabb);
}

exports.aabbVsPoint = aabbVsPoint;
exports.aabbVsSphere = aabbVsSphere;
exports.aabbVsAabb = aabbVsAabb;
exports.aabbVsObb = aabbVsObb;
exports.aabbVsCapsule = aabbVsCapsule;

},{"../../../util":92,"./capsule-collision-detection":71,"./obb-collision-detection":72,"./sphere-collision-detection":73}],71:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capsuleVsCapsule = exports.capsuleVsObb = exports.capsuleVsAabb = exports.capsuleVsSphere = exports.capsuleVsPoint = undefined;

var _util = require('../../../util');

var _obbCollisionDetection = require('./obb-collision-detection');

var obbCollisionDetection = _interopRequireWildcard(_obbCollisionDetection);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * @param {Capsule} capsule
 * @param {vec3} point
 * @returns {boolean}
 */
/**
 * This module defines utility methods for detecting whether intersection has occurred between
 * capsules and other shapes.
 */

function capsuleVsPoint(capsule, point) {
  return (0, _util.findSquaredDistanceFromSegmentToPoint)(capsule.segment, point) <= capsule.radius * capsule.radius;
}

/**
 * @param {Capsule} capsule
 * @param {Sphere} sphere
 * @returns {boolean}
 */
function capsuleVsSphere(capsule, sphere) {
  var sumOfRadii = capsule.radius + sphere.radius;
  return (0, _util.findSquaredDistanceFromSegmentToPoint)(capsule.segment, sphere.centerOfVolume) <= sumOfRadii * sumOfRadii;
}

/**
 * NOTE: This implementation cheats by checking whether vertices from one shape lie within the
 * other. Due to the tunnelling problem, it is possible that intersection occurs without any
 * vertices lying within the other shape. However, (A) this is unlikely, and (B) we are ignoring the
 * tunnelling problem for the rest of this collision system anyway.
 *
 * @param {Capsule} capsule
 * @param {Aabb} aabb
 * @returns {boolean}
 */
function capsuleVsAabb(capsule, aabb) {
  var squaredRadius = capsule.radius * capsule.radius;

  // Check whether the two capsule ends intersect the AABB (sphere vs AABB) (addresses the
  // capsule-vs-AABB-face case).
  (0, _util.findClosestPointFromAabbToPoint)(_util.tmpVec1, aabb, capsule.segment.start);
  if (vec3.squaredDistance(_util.tmpVec1, capsule.segment.start) <= squaredRadius) {
    return true;
  }
  (0, _util.findClosestPointFromAabbToPoint)(_util.tmpVec1, aabb, capsule.segment.end);
  if (vec3.squaredDistance(_util.tmpVec1, capsule.segment.end) <= squaredRadius) {
    return true;
  }

  // Check whether the capsule intersects with any AABB edge (addresses the capsule-vs-AABB-edge
  // case).
  return aabb.someEdge(function (edge) {
    return (0, _util.findSquaredDistanceBetweenSegments)(capsule.segment, edge) <= squaredRadius;
  });

  // (The capsule-vs-AABB-vertex case is covered by the capsule-vs-AABB-edge case).
}

/**
 * @param {Capsule} capsule
 * @param {Obb} obb
 * @returns {boolean}
 */
function capsuleVsObb(capsule, obb) {
  return obbCollisionDetection.obbVsCapsule(obb, capsule);
}

/**
 * @param {Capsule} capsuleA
 * @param {Capsule} capsuleB
 * @returns {boolean}
 */
function capsuleVsCapsule(capsuleA, capsuleB) {
  var sumOfRadii = capsuleA.radius + capsuleB.radius;
  return (0, _util.findSquaredDistanceBetweenSegments)(capsuleA.segment, capsuleB.segment) <= sumOfRadii * sumOfRadii;
}

exports.capsuleVsPoint = capsuleVsPoint;
exports.capsuleVsSphere = capsuleVsSphere;
exports.capsuleVsAabb = capsuleVsAabb;
exports.capsuleVsObb = capsuleVsObb;
exports.capsuleVsCapsule = capsuleVsCapsule;

},{"../../../util":92,"./obb-collision-detection":72}],72:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.obbVsCapsule = exports.obbVsObb = exports.obbVsAabb = exports.obbVsSphere = exports.obbVsPoint = undefined;

var _util = require('../../../util');

var _aabbCollisionDetection = require('./aabb-collision-detection');

var aabbCollisionDetection = _interopRequireWildcard(_aabbCollisionDetection);

var _capsuleCollisionDetection = require('./capsule-collision-detection');

var capsuleCollisionDetection = _interopRequireWildcard(_capsuleCollisionDetection);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * This module defines utility methods for detecting whether intersection has occurred between
                                                                                                                                                                                                     * oriented bounding boxes and other shapes.
                                                                                                                                                                                                     */

// TODO: Refactor these to not actually calculate the point of intersection. These checks can
// instead be done more efficiently using SAT.

/**
 * @param {Obb} obb
 * @param {vec3} point
 * @returns {boolean}
 */
function obbVsPoint(obb, point) {
  vec3.subtract(_util.tmpVec4, point, obb.centerOfVolume);

  vec3.set(_util.tmpVec1, 1, 0, 0);
  vec3.transformQuat(_util.tmpVec1, _util.tmpVec1, obb.orientation);
  var axis1Distance = vec3.dot(_util.tmpVec4, _util.tmpVec1);

  if (axis1Distance >= -obb.halfSideLengthX && axis1Distance <= obb.halfSideLengthX) {
    vec3.set(_util.tmpVec2, 0, 1, 0);
    vec3.transformQuat(_util.tmpVec2, _util.tmpVec2, obb.orientation);
    var axis2Distance = vec3.dot(_util.tmpVec4, _util.tmpVec2);

    if (axis2Distance >= -obb.halfSideLengthY && axis2Distance <= obb.halfSideLengthY) {
      vec3.set(_util.tmpVec3, 0, 0, 1);
      vec3.transformQuat(_util.tmpVec3, _util.tmpVec3, obb.orientation);
      var axis3Distance = vec3.dot(_util.tmpVec4, _util.tmpVec3);

      return axis3Distance >= -obb.halfSideLengthZ && axis3Distance <= obb.halfSideLengthZ;
    }
  }

  return false;
}

/**
 * @param {Obb} obb
 * @param {Sphere} sphere
 * @returns {boolean}
 */
function obbVsSphere(obb, sphere) {
  (0, _util.findClosestPointFromObbToPoint)(_util.tmpVec1, obb, sphere.centerOfVolume);
  return vec3.squaredDistance(_util.tmpVec1, sphere.centerOfVolume) <= sphere.radius * sphere.radius;
}

/**
 * NOTE: This implementation cheats by checking whether vertices from one shape lie within the
 * other. Due to the tunnelling problem, it is possible that intersection occurs without any
 * vertices lying within the other shape. However, (A) this is unlikely, and (B) we are ignoring the
 * tunnelling problem for the rest of this collision system anyway.
 *
 * @param {Obb} obb
 * @param {Aabb} aabb
 * @returns {boolean}
 */
function obbVsAabb(obb, aabb) {
  return _obbVsBoxHelper(obb, aabb, aabbCollisionDetection.aabbVsPoint);
}

/**
 * NOTE: This implementation cheats by checking whether vertices from one shape lie within the
 * other. Due to the tunnelling problem, it is possible that intersection occurs without any
 * vertices lying within the other shape. However, (A) this is unlikely, and (B) we are ignoring the
 * tunnelling problem for the rest of this collision system anyway.
 *
 * @param {Obb} obbA
 * @param {Obb} obbB
 * @returns {boolean}
 */
function obbVsObb(obbA, obbB) {
  return _obbVsBoxHelper(obbA, obbB, obbVsPoint);
}

/**
 * @param {Obb} obb
 * @param {Obb|Aabb} other
 * @param {Function} otherVsPointCallback
 * @returns {boolean}
 * @private
 */
function _obbVsBoxHelper(obb, other, otherVsPointCallback) {
  // Check whether any vertices from A lie within B's bounds.
  if (obb.someVertex(function (vertex) {
    return otherVsPointCallback(other, vertex);
  })) return true;

  // Check whether any vertices from B lie within A's bounds.
  if (other.someVertex(function (vertex) {
    return obbVsPoint(obb, vertex);
  })) return true;

  // We assume that a vertex-to-face collision would have been detected by one of the two above
  // checks. Any edge-to-edge collision must involve both an edge from A through a face of B and
  // vice versa. So it is sufficient to only check the edges of one and the faces of the other.
  if (other.someEdge(function (edge) {
    return obb.someFace(function (face) {
      return _util.findPoiBetweenSegmentAndPlaneRegion.apply(undefined, [_util.tmpVec1, edge].concat(_toConsumableArray(face)));
    });
  })) return true;

  return false;
}

/**
 * @param {Obb} obb
 * @param {Capsule} capsule
 * @returns {boolean}
 */
function obbVsCapsule(obb, capsule) {
  // Check the edges.
  var squaredRadius = capsule.radius * capsule.radius;
  var areIntersecting = obb.someEdge(function (edge) {
    return (0, _util.findSquaredDistanceBetweenSegments)(capsule.segment, edge) < squaredRadius;
  });

  if (areIntersecting) return true;

  // Check the faces.
  areIntersecting = obb.somePushedOutFace(function (face) {
    return _util.findPoiBetweenSegmentAndPlaneRegion.apply(undefined, [_util.tmpVec1, capsule.segment].concat(_toConsumableArray(face)));
  }, capsule.radius);

  // Check for inclusion of one shape inside the other.
  areIntersecting = areIntersecting || obbVsPoint(obb, capsule.centerOfVolume);
  areIntersecting = areIntersecting || capsuleCollisionDetection.capsuleVsPoint(capsule, obb.centerOfVolume);

  return areIntersecting;
}

exports.obbVsPoint = obbVsPoint;
exports.obbVsSphere = obbVsSphere;
exports.obbVsAabb = obbVsAabb;
exports.obbVsObb = obbVsObb;
exports.obbVsCapsule = obbVsCapsule;

},{"../../../util":92,"./aabb-collision-detection":70,"./capsule-collision-detection":71}],73:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sphereVsCapsule = exports.sphereVsObb = exports.sphereVsAabb = exports.sphereVsSphere = exports.sphereVsPoint = undefined;

var _util = require('../../../util');

var _obbCollisionDetection = require('./obb-collision-detection');

var obbCollisionDetection = _interopRequireWildcard(_obbCollisionDetection);

var _capsuleCollisionDetection = require('./capsule-collision-detection');

var capsuleCollisionDetection = _interopRequireWildcard(_capsuleCollisionDetection);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * This module defines utility methods for detecting whether intersection has occurred between
 * spheres and other shapes.
 */

/**
 * @param {Sphere} sphere
 * @param {vec3} point
 * @returns {boolean}
 */
function sphereVsPoint(sphere, point) {
  return vec3.squaredDistance(point, sphere.centerOfVolume) <= sphere.radius * sphere.radius;
}

/**
 * @param {Sphere} sphereA
 * @param {Sphere} sphereB
 * @returns {boolean}
 */
function sphereVsSphere(sphereA, sphereB) {
  var sumOfRadii = sphereA.radius + sphereB.radius;
  return vec3.squaredDistance(sphereA.centerOfVolume, sphereB.centerOfVolume) <= sumOfRadii * sumOfRadii;
}

/**
 * @param {Sphere} sphere
 * @param {Aabb} aabb
 * @returns {boolean}
 */
function sphereVsAabb(sphere, aabb) {
  (0, _util.findClosestPointFromAabbToPoint)(_util.tmpVec1, aabb, sphere.centerOfVolume);
  return vec3.squaredDistance(_util.tmpVec1, sphere.centerOfVolume) <= sphere.radius * sphere.radius;
}

/**
 * @param {Sphere} sphere
 * @param {Obb} obb
 * @returns {boolean}
 */
function sphereVsObb(sphere, obb) {
  return obbCollisionDetection.obbVsSphere(obb, sphere);
}

/**
 * @param {Sphere} sphere
 * @param {Capsule} capsule
 * @returns {boolean}
 */
function sphereVsCapsule(sphere, capsule) {
  return capsuleCollisionDetection.capsuleVsSphere(capsule, sphere);
}

exports.sphereVsPoint = sphereVsPoint;
exports.sphereVsSphere = sphereVsSphere;
exports.sphereVsAabb = sphereVsAabb;
exports.sphereVsObb = sphereVsObb;
exports.sphereVsCapsule = sphereVsCapsule;

},{"../../../util":92,"./capsule-collision-detection":71,"./obb-collision-detection":72}],74:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sphereContactCalculation = exports.obbContactCalculation = exports.capsuleContactCalculation = exports.aabbContactCalculation = undefined;

var _aabbContactCalculation = require('./src/aabb-contact-calculation');

var aabbContactCalculation = _interopRequireWildcard(_aabbContactCalculation);

var _capsuleContactCalculation = require('./src/capsule-contact-calculation');

var capsuleContactCalculation = _interopRequireWildcard(_capsuleContactCalculation);

var _obbContactCalculation = require('./src/obb-contact-calculation');

var obbContactCalculation = _interopRequireWildcard(_obbContactCalculation);

var _sphereContactCalculation = require('./src/sphere-contact-calculation');

var sphereContactCalculation = _interopRequireWildcard(_sphereContactCalculation);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.aabbContactCalculation = aabbContactCalculation;
exports.capsuleContactCalculation = capsuleContactCalculation;
exports.obbContactCalculation = obbContactCalculation;
exports.sphereContactCalculation = sphereContactCalculation;

},{"./src/aabb-contact-calculation":75,"./src/capsule-contact-calculation":76,"./src/obb-contact-calculation":77,"./src/sphere-contact-calculation":78}],75:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findAabbNormalFromContactPoint = exports.aabbVsCapsule = exports.aabbVsObb = exports.aabbVsAabb = exports.aabbVsSphere = exports.aabbVsPoint = undefined;

var _sphereContactCalculation = require('./sphere-contact-calculation');

var sphereContactCalculation = _interopRequireWildcard(_sphereContactCalculation);

var _obbContactCalculation = require('./obb-contact-calculation');

var obbContactCalculation = _interopRequireWildcard(_obbContactCalculation);

var _capsuleContactCalculation = require('./capsule-contact-calculation');

var capsuleContactCalculation = _interopRequireWildcard(_capsuleContactCalculation);

var _util = require('../../../util');

var _collisionDetection = require('../../collision-detection');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * @param {vec3} contactPoint Output param.
 * @param {vec3} contactNormal Output param.
 * @param {Aabb} aabb
 * @param {vec3} point
 */
function aabbVsPoint(contactPoint, contactNormal, aabb, point) {
  vec3.copy(contactPoint, point);
  findAabbNormalFromContactPoint(contactNormal, contactPoint, aabb);
}

/**
 * @param {vec3} contactPoint Output param.
 * @param {vec3} contactNormal Output param.
 * @param {Aabb} aabb
 * @param {Sphere} sphere
 */
/**
 * This module defines utility methods for calculating a contact point between axially-aligned 
 * bounding boxes and other shapes.
 *
 * - Each of these functions assumes that the objects are actually colliding.
 * - The resulting contact point may be anywhere within the intersection of the two objects.
 */

function aabbVsSphere(contactPoint, contactNormal, aabb, sphere) {
  sphereContactCalculation.sphereVsAabb(contactPoint, contactNormal, sphere, aabb);
  vec3.negate(contactNormal, contactNormal);
}

/**
 * @param {vec3} contactPoint Output param.
 * @param {vec3} contactNormal Output param.
 * @param {Aabb} aabbA
 * @param {Aabb} aabbB
 */
function aabbVsAabb(contactPoint, contactNormal, aabbA, aabbB) {
  // Compute the contact normal.
  vec3.set(contactNormal, 0, 0, 0);
  var xIntersectionDepth = Math.min(aabbA.maxX - aabbB.minX, aabbB.maxX - aabbA.minX);
  var yIntersectionDepth = Math.min(aabbA.maxY - aabbB.minY, aabbB.maxY - aabbA.minY);
  var zIntersectionDepth = Math.min(aabbA.maxZ - aabbB.minZ, aabbB.maxZ - aabbA.minZ);
  // Assume that the direction of intersection corresponds to whichever axis has the shallowest
  // intersection.
  if (xIntersectionDepth <= yIntersectionDepth) {
    if (xIntersectionDepth <= zIntersectionDepth) {
      contactNormal[0] = aabbA.maxX - aabbB.minX <= aabbB.maxX - aabbA.minX ? 1 : -1;
    } else {
      contactNormal[2] = aabbA.maxZ - aabbB.minZ <= aabbB.maxZ - aabbA.minZ ? 1 : -1;
    }
  } else {
    if (yIntersectionDepth <= zIntersectionDepth) {
      contactNormal[1] = aabbA.maxY - aabbB.minY <= aabbB.maxY - aabbA.minY ? 1 : -1;
    } else {
      contactNormal[2] = aabbA.maxZ - aabbB.minZ <= aabbB.maxZ - aabbA.minZ ? 1 : -1;
    }
  }

  // TODO: The two AABBs form a square intersection cross-section region along the direction of the
  // normal. Calculate the center of that square to use as the point of contact.
  if (!aabbA.someVertex(function (vertex) {
    return _collisionDetection.aabbCollisionDetection.aabbVsPoint(aabbB, vertex);
  }, contactPoint)) {
    aabbB.someVertex(function (vertex) {
      return _collisionDetection.aabbCollisionDetection.aabbVsPoint(aabbA, vertex);
    }, contactPoint);
  }
}

/**
 * @param {vec3} contactPoint Output param.
 * @param {vec3} contactNormal Output param.
 * @param {Aabb} aabb
 * @param {Obb} obb
 */
function aabbVsObb(contactPoint, contactNormal, aabb, obb) {
  obbContactCalculation.obbVsAabb(contactPoint, contactNormal, obb, aabb);
  vec3.negate(contactNormal, contactNormal);
}

/**
 * @param {vec3} contactPoint Output param.
 * @param {vec3} contactNormal Output param.
 * @param {Aabb} aabb
 * @param {Capsule} capsule
 */
function aabbVsCapsule(contactPoint, contactNormal, aabb, capsule) {
  capsuleContactCalculation.capsuleVsAabb(contactPoint, contactNormal, capsule, aabb);
  vec3.negate(contactNormal, contactNormal);
}

/**
 * @param {vec3} contactNormal Output param.
 * @param {vec3} contactPoint
 * @param {Aabb} aabb
 * @private
 */
function findAabbNormalFromContactPoint(contactNormal, contactPoint, aabb) {
  vec3.set(contactNormal, 0, 0, 0);
  vec3.subtract(_util.tmpVec1, contactPoint, aabb.centerOfVolume);
  var xDistanceFromFace = aabb.rangeX / 2 - Math.abs(_util.tmpVec1[0]);
  var yDistanceFromFace = aabb.rangeY / 2 - Math.abs(_util.tmpVec1[1]);
  var zDistanceFromFace = aabb.rangeZ / 2 - Math.abs(_util.tmpVec1[2]);
  // Assume that the point is contacting whichever face it's closest to.
  if (xDistanceFromFace <= yDistanceFromFace) {
    if (xDistanceFromFace <= zDistanceFromFace) {
      contactNormal[0] = _util.tmpVec1[0] > 0 ? 1 : -1;
    } else {
      contactNormal[2] = _util.tmpVec1[2] > 0 ? 1 : -1;
    }
  } else {
    if (yDistanceFromFace <= zDistanceFromFace) {
      contactNormal[1] = _util.tmpVec1[1] > 0 ? 1 : -1;
    } else {
      contactNormal[2] = _util.tmpVec1[2] > 0 ? 1 : -1;
    }
  }
}

exports.aabbVsPoint = aabbVsPoint;
exports.aabbVsSphere = aabbVsSphere;
exports.aabbVsAabb = aabbVsAabb;
exports.aabbVsObb = aabbVsObb;
exports.aabbVsCapsule = aabbVsCapsule;
exports.findAabbNormalFromContactPoint = findAabbNormalFromContactPoint;

},{"../../../util":92,"../../collision-detection":69,"./capsule-contact-calculation":76,"./obb-contact-calculation":77,"./sphere-contact-calculation":78}],76:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capsuleVsCapsule = exports.capsuleVsObb = exports.capsuleVsAabb = exports.capsuleVsSphere = exports.capsuleVsPoint = undefined;

var _util = require('../../../util');

var _obbContactCalculation = require('./obb-contact-calculation');

var obbContactCalculation = _interopRequireWildcard(_obbContactCalculation);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * @param {vec3} contactPoint Output param.
 * @param {vec3} contactNormal Output param.
 * @param {Capsule} capsule
 * @param {vec3} point
 */
/**
 * This module defines utility methods for calculating a contact point between capsules and other 
 * shapes.
 *
 * - Each of these functions assumes that the objects are actually colliding.
 * - The resulting contact point may be anywhere within the intersection of the two objects.
 */

function capsuleVsPoint(contactPoint, contactNormal, capsule, point) {
  vec3.copy(contactPoint, point);
  (0, _util.findClosestPointOnSegmentToPoint)(contactNormal, capsule.segment, point);
  vec3.subtract(contactNormal, contactPoint, contactNormal);
  vec3.normalize(contactNormal, contactNormal);
}

/**
 * Finds the closest point on the surface of the capsule to the sphere center.
 *
 * @param {vec3} contactPoint Output param.
 * @param {vec3} contactNormal Output param.
 * @param {Capsule} capsule
 * @param {Sphere} sphere
 */
function capsuleVsSphere(contactPoint, contactNormal, capsule, sphere) {
  var sphereCenter = sphere.centerOfVolume;
  (0, _util.findClosestPointOnSegmentToPoint)(contactPoint, capsule.segment, sphereCenter);
  vec3.subtract(contactNormal, sphereCenter, contactPoint);
  vec3.normalize(contactNormal, contactNormal);
  vec3.scaleAndAdd(contactPoint, contactPoint, contactNormal, capsule.radius);
}

/**
 * Finds the closest point on the surface of the capsule to the AABB.
 *
 * NOTE: This implementation cheats by checking whether vertices from one shape lie within the
 * other. Due to the tunnelling problem, it is possible that intersection occurs without any
 * vertices lying within the other shape. However, (A) this is unlikely, and (B) we are ignoring the
 * tunnelling problem for the rest of this collision system anyway.
 *
 * @param {vec3} contactPoint Output param.
 * @param {vec3} contactNormal Output param.
 * @param {Capsule} capsule
 * @param {Aabb} aabb
 */
function capsuleVsAabb(contactPoint, contactNormal, capsule, aabb) {
  // tmpVec1 represents the closest point on the capsule to the AABB. tmpVec2
  // represents the closest point on the AABB to the capsule.

  //
  // Check whether the two capsule ends intersect the AABB (sphere vs AABB) (addresses the
  // capsule-vs-AABB-face case).
  //

  var squaredRadius = capsule.radius * capsule.radius;
  var doesAabbIntersectAnEndPoint = false;

  var endPoint = capsule.segment.start;
  (0, _util.findClosestPointFromAabbToPoint)(_util.tmpVec2, aabb, endPoint);
  if (vec3.squaredDistance(_util.tmpVec2, endPoint) <= squaredRadius) {
    doesAabbIntersectAnEndPoint = true;
  } else {
    endPoint = capsule.segment.end;
    (0, _util.findClosestPointFromAabbToPoint)(_util.tmpVec2, aabb, endPoint);
    if (vec3.squaredDistance(_util.tmpVec2, endPoint) <= squaredRadius) {
      doesAabbIntersectAnEndPoint = true;
    }
  }

  if (!doesAabbIntersectAnEndPoint) {
    //
    // Check whether the capsule intersects with any AABB edge (addresses the capsule-vs-AABB-edge
    // case).
    //
    aabb.someEdge(function (edge) {
      (0, _util.findClosestPointsFromSegmentToSegment)(_util.tmpVec1, _util.tmpVec2, capsule.segment, edge);
      var distance = vec3.squaredDistance(_util.tmpVec1, _util.tmpVec2);
      return distance <= squaredRadius;
    });
  }

  // (The capsule-vs-AABB-vertex case is covered by the capsule-vs-AABB-edge case).

  (0, _util.findClosestPointOnSegmentToPoint)(_util.tmpVec1, capsule.segment, _util.tmpVec2);
  vec3.subtract(contactNormal, _util.tmpVec2, _util.tmpVec1);
  vec3.normalize(contactNormal, contactNormal);
  vec3.scaleAndAdd(contactPoint, _util.tmpVec1, contactNormal, capsule.radius);
}

/**
 * @param {vec3} contactPoint Output param.
 * @param {vec3} contactNormal Output param.
 * @param {Capsule} capsule
 * @param {Obb} obb
 */
function capsuleVsObb(contactPoint, contactNormal, capsule, obb) {
  obbContactCalculation.obbVsCapsule(contactPoint, contactNormal, obb, capsule);
  vec3.negate(contactNormal, contactNormal);
}

/**
 * Finds the closest point on the surface of capsule A to capsule B.
 *
 * @param {vec3} contactPoint Output param.
 * @param {vec3} contactNormal Output param.
 * @param {Capsule} capsuleA
 * @param {Capsule} capsuleB
 */
function capsuleVsCapsule(contactPoint, contactNormal, capsuleA, capsuleB) {
  (0, _util.findClosestPointsFromSegmentToSegment)(_util.tmpVec1, _util.tmpVec2, capsuleA.segment, capsuleB.segment);
  vec3.subtract(contactNormal, _util.tmpVec2, _util.tmpVec1);
  vec3.normalize(contactNormal, contactNormal);
  vec3.scaleAndAdd(contactPoint, _util.tmpVec1, contactNormal, capsuleA.radius);
}

exports.capsuleVsPoint = capsuleVsPoint;
exports.capsuleVsSphere = capsuleVsSphere;
exports.capsuleVsAabb = capsuleVsAabb;
exports.capsuleVsObb = capsuleVsObb;
exports.capsuleVsCapsule = capsuleVsCapsule;

},{"../../../util":92,"./obb-contact-calculation":77}],77:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findObbNormalFromContactPoint = exports.obbVsCapsule = exports.obbVsObb = exports.obbVsAabb = exports.obbVsSphere = exports.obbVsPoint = undefined;

var _util = require('../../../util');

var _collisionDetection = require('../../collision-detection');

var _collidables = require('../../collidables');

var _aabbContactCalculation = require('./aabb-contact-calculation');

var aabbContactCalculation = _interopRequireWildcard(_aabbContactCalculation);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * This module defines utility methods for calculating a contact point between oriented bounding
                                                                                                                                                                                                     * boxes and other shapes.
                                                                                                                                                                                                     *
                                                                                                                                                                                                     * - Each of these functions assumes that the objects are actually colliding.
                                                                                                                                                                                                     * - The resulting contact point may be anywhere within the intersection of the two objects.
                                                                                                                                                                                                     */

// TODO: There are more efficient (but far more complicated) algorithms for finding the point of
// intersection with OBBs. Port over some other pre-existing solutions for these.

/**
 * @param {vec3} contactPoint Output param.
 * @param {vec3} contactNormal Output param.
 * @param {Obb} obb
 * @param {vec3} point
 */
function obbVsPoint(contactPoint, contactNormal, obb, point) {
  vec3.copy(contactPoint, point);
  findObbNormalFromContactPoint(contactNormal, contactPoint, obb);
}

/**
 * Finds the closest point anywhere inside the OBB to the center of the sphere.
 *
 * @param {vec3} contactPoint Output param.
 * @param {vec3} contactNormal Output param.
 * @param {Obb} obb
 * @param {Sphere} sphere
 */
function obbVsSphere(contactPoint, contactNormal, obb, sphere) {
  (0, _util.findClosestPointFromObbToPoint)(contactPoint, obb, sphere.centerOfVolume);
  vec3.subtract(contactNormal, sphere.centerOfVolume, contactPoint);
  vec3.normalize(contactNormal, contactNormal);
}

/**
 * NOTE: This implementation cheats by checking whether vertices from one shape lie within the
 * other. Due to the tunnelling problem, it is possible that intersection occurs without any
 * vertices lying within the other shape. However, (A) this is unlikely, and (B) we are ignoring the
 * tunnelling problem for the rest of this collision system anyway.
 *
 * @param {vec3} contactPoint Output param.
 * @param {vec3} contactNormal Output param.
 * @param {Obb} obb
 * @param {Aabb} aabb
 */
function obbVsAabb(contactPoint, contactNormal, obb, aabb) {
  return _obbVsBoxHelper(contactPoint, contactNormal, obb, aabb, _collisionDetection.aabbCollisionDetection.aabbVsPoint, aabbContactCalculation.findAabbNormalFromContactPoint);
}

/**
 * NOTE: This implementation cheats by checking whether vertices from one shape lie within the
 * other. Due to the tunnelling problem, it is possible that intersection occurs without any
 * vertices lying within the other shape. However, (A) this is unlikely, and (B) we are ignoring the
 * tunnelling problem for the rest of this collision system anyway.
 *
 * @param {vec3} contactPoint Output param.
 * @param {vec3} contactNormal Output param.
 * @param {Obb} obbA
 * @param {Obb} obbB
 */
function obbVsObb(contactPoint, contactNormal, obbA, obbB) {
  return _obbVsBoxHelper(contactPoint, contactNormal, obbA, obbB, _collisionDetection.obbCollisionDetection.obbVsPoint, findObbNormalFromContactPoint);
}

/**
 * @param {vec3} contactPoint Output param.
 * @param {vec3} contactNormal Output param.
 * @param {Obb} obb
 * @param {Obb|Aabb} other
 * @param {Function} otherVsPointCollisionDetectionCallback
 * @param {Function} findOtherNormalFromContactPoint
 * @private
 */
function _obbVsBoxHelper(contactPoint, contactNormal, obb, other, otherVsPointCollisionDetectionCallback, findOtherNormalFromContactPoint) {
  // Check whether any vertices from A lie within B's bounds.
  if (obb.someVertex(function (vertex) {
    return otherVsPointCollisionDetectionCallback(other, vertex);
  }, contactPoint)) {
    findOtherNormalFromContactPoint(contactNormal, contactPoint, other);
    vec3.negate(contactNormal, contactNormal);
    return;
  }

  // Check whether any vertices from B lie within A's bounds.
  if (other.someVertex(function (vertex) {
    return _collisionDetection.obbCollisionDetection.obbVsPoint(obb, vertex);
  }, contactPoint)) {
    findObbNormalFromContactPoint(contactNormal, contactPoint, obb);
    return;
  }

  // We assume that a vertex-to-face collision would have been detected by one of the two above
  // checks. Any edge-to-edge collision must involve both an edge from A through a face of B and
  // vice versa. So it is sufficient to only check the edges of one and the faces of the other.
  other.someEdge(function (edge) {
    return obb.someFace(function (face) {
      return _util.findPoiBetweenSegmentAndPlaneRegion.apply(undefined, [contactPoint, edge].concat(_toConsumableArray(face)));
    });
  });
  findObbNormalFromContactPoint(contactNormal, contactPoint, obb);
}

/**
 * @param {vec3} contactPoint Output param.
 * @param {vec3} contactNormal Output param.
 * @param {Obb} obb
 * @param {Capsule} capsule
 */
function obbVsCapsule(contactPoint, contactNormal, obb, capsule) {
  // tmpVec1 is the point on the capsule segment that is closest to the OBB.

  //
  // Check the edges.
  //

  var segment = new _collidables.LineSegment(vec3.create(), vec3.create());
  var squaredRadius = capsule.radius * capsule.radius;
  var areIntersecting = obb.someEdge(function (edge) {
    return (0, _util.findSquaredDistanceBetweenSegments)(capsule.segment, edge) < squaredRadius;
  }, segment);

  if (areIntersecting) {
    (0, _util.findClosestPointsFromSegmentToSegment)(_util.tmpVec1, contactPoint, capsule.segment, segment);
    vec3.subtract(contactNormal, _util.tmpVec1, contactPoint);
    vec3.normalize(contactNormal, contactNormal);
    return;
  }

  //
  // Check the faces.
  //

  obb.somePushedOutFace(function (face) {
    return _util.findPoiBetweenSegmentAndPlaneRegion.apply(undefined, [_util.tmpVec1, capsule.segment].concat(_toConsumableArray(face)));
  }, capsule.radius);

  findObbNormalFromContactPoint(contactNormal, _util.tmpVec1, obb);

  // NOTE: This assumes that the angle between the capsule segment and the face plane is not oblique
  // and that the depth of penetration is shallow. When both of these conditions are not true, the
  // contact point will be offset from the intersection point on the pushed-out face.
  vec3.scaleAndAdd(contactPoint, _util.tmpVec1, contactNormal, -capsule.radius);
}

/**
 * @param {vec3} contactNormal Output param.
 * @param {vec3} contactPoint
 * @param {Obb} obb
 * @private
 */
function findObbNormalFromContactPoint(contactNormal, contactPoint, obb) {
  // Calculate the displacement along each axis.
  var projections = [];
  vec3.subtract(_util.tmpVec1, contactPoint, obb.centerOfVolume);
  for (var i = 0; i < 3; i++) {
    projections[i] = vec3.dot(obb.axes[i], _util.tmpVec1);
  }

  // Determine which face the normal is pointing away from.
  vec3.set(contactNormal, 0, 0, 0);
  var xDistanceFromFace = obb.halfSideLengths[0] - Math.abs(projections[0]);
  var yDistanceFromFace = obb.halfSideLengths[1] - Math.abs(projections[1]);
  var zDistanceFromFace = obb.halfSideLengths[2] - Math.abs(projections[2]);
  // Assume that the point is contacting whichever face it's closest to.
  if (xDistanceFromFace <= yDistanceFromFace) {
    if (xDistanceFromFace <= zDistanceFromFace) {
      contactNormal[0] = projections[0] > 0 ? 1 : -1;
    } else {
      contactNormal[2] = projections[2] > 0 ? 1 : -1;
    }
  } else {
    if (yDistanceFromFace <= zDistanceFromFace) {
      contactNormal[1] = projections[1] > 0 ? 1 : -1;
    } else {
      contactNormal[2] = projections[2] > 0 ? 1 : -1;
    }
  }

  // Apply the OBB's orientation to the normal.
  vec3.transformQuat(contactNormal, contactNormal, obb.orientation);
}

exports.obbVsPoint = obbVsPoint;
exports.obbVsSphere = obbVsSphere;
exports.obbVsAabb = obbVsAabb;
exports.obbVsObb = obbVsObb;
exports.obbVsCapsule = obbVsCapsule;
exports.findObbNormalFromContactPoint = findObbNormalFromContactPoint;

},{"../../../util":92,"../../collidables":62,"../../collision-detection":69,"./aabb-contact-calculation":75}],78:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sphereVsCapsule = exports.sphereVsObb = exports.sphereVsAabb = exports.sphereVsSphere = exports.sphereVsPoint = undefined;

var _util = require('../../../util');

var _aabbContactCalculation = require('./aabb-contact-calculation');

var _obbContactCalculation = require('./obb-contact-calculation');

var obbContactCalculation = _interopRequireWildcard(_obbContactCalculation);

var _capsuleContactCalculation = require('./capsule-contact-calculation');

var capsuleContactCalculation = _interopRequireWildcard(_capsuleContactCalculation);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * @param {vec3} contactPoint Output param.
 * @param {vec3} contactNormal Output param.
 * @param {Sphere} sphere
 * @param {vec3} point
 */
/**
 * This module defines utility methods for calculating a contact point between spheres and other
 * shapes.
 *
 * - Each of these functions assumes that the objects are actually colliding.
 * - The resulting contact point may be anywhere within the intersection of the two objects.
 */

function sphereVsPoint(contactPoint, contactNormal, sphere, point) {
  vec3.copy(contactPoint, point);
  // Assume that the point is contacting the closest point on the surface of the sphere.
  vec3.subtract(contactNormal, point, sphere.centerOfVolume);
  vec3.normalize(contactNormal, contactNormal);
}

/**
 * @param {vec3} contactPoint Output param.
 * @param {vec3} contactNormal Output param.
 * @param {Sphere} sphereA
 * @param {Sphere} sphereB
 */
function sphereVsSphere(contactPoint, contactNormal, sphereA, sphereB) {
  vec3.subtract(contactNormal, sphereB.centerOfVolume, sphereA.centerOfVolume);
  vec3.normalize(contactNormal, contactNormal);
  // The point on the surface of sphere A that is closest to the center of sphere B.
  vec3.scaleAndAdd(contactPoint, sphereA.centerOfVolume, contactNormal, sphereA.radius);
}

/**
 * Finds the closest point on the surface of the AABB to the sphere center.
 *
 * @param {vec3} contactPoint Output param.
 * @param {vec3} contactNormal Output param.
 * @param {Sphere} sphere
 * @param {Aabb} aabb
 */
function sphereVsAabb(contactPoint, contactNormal, sphere, aabb) {
  (0, _util.findClosestPointFromAabbSurfaceToPoint)(contactPoint, aabb, sphere.centerOfVolume);
  (0, _aabbContactCalculation.findAabbNormalFromContactPoint)(contactNormal, contactPoint, aabb);
  vec3.negate(contactNormal, contactNormal);
}

/**
 * @param {vec3} contactPoint Output param.
 * @param {vec3} contactNormal Output param.
 * @param {Sphere} sphere
 * @param {Obb} obb
 */
function sphereVsObb(contactPoint, contactNormal, sphere, obb) {
  obbContactCalculation.obbVsSphere(contactPoint, contactNormal, obb, sphere);
  vec3.negate(contactNormal, contactNormal);
}

/**
 * @param {vec3} contactPoint Output param.
 * @param {vec3} contactNormal Output param.
 * @param {Sphere} sphere
 * @param {Capsule} capsule
 */
function sphereVsCapsule(contactPoint, contactNormal, sphere, capsule) {
  capsuleContactCalculation.capsuleVsSphere(contactPoint, contactNormal, capsule, sphere);
  vec3.negate(contactNormal, contactNormal);
}

exports.sphereVsPoint = sphereVsPoint;
exports.sphereVsSphere = sphereVsSphere;
exports.sphereVsAabb = sphereVsAabb;
exports.sphereVsObb = sphereVsObb;
exports.sphereVsCapsule = sphereVsCapsule;

},{"../../../util":92,"./aabb-contact-calculation":75,"./capsule-contact-calculation":76,"./obb-contact-calculation":77}],79:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _collidables = require('./collidables');

Object.keys(_collidables).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _collidables[key];
    }
  });
});

var _collisionDetection = require('./collision-detection');

Object.keys(_collisionDetection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _collisionDetection[key];
    }
  });
});

var _contactCalculation = require('./contact-calculation');

Object.keys(_contactCalculation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _contactCalculation[key];
    }
  });
});

var _collidableFactories = require('./src/collidable-factories');

Object.keys(_collidableFactories).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _collidableFactories[key];
    }
  });
});

var _collidablePhysicsJob = require('./src/collidable-physics-job');

Object.keys(_collidablePhysicsJob).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _collidablePhysicsJob[key];
    }
  });
});

var _collidableStore = require('./src/collidable-store');

Object.keys(_collidableStore).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _collidableStore[key];
    }
  });
});

var _collisionHandler = require('./src/collision-handler');

Object.keys(_collisionHandler).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _collisionHandler[key];
    }
  });
});

var _collisionUtils = require('./src/collision-utils');

Object.keys(_collisionUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _collisionUtils[key];
    }
  });
});

},{"./collidables":62,"./collision-detection":69,"./contact-calculation":74,"./src/collidable-factories":80,"./src/collidable-physics-job":81,"./src/collidable-store":82,"./src/collision-handler":83,"./src/collision-utils":84}],80:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSphereOrCapsuleFromRenderableShape = exports.createSphereFromRenderableShape = exports.createObbFromRenderableShape = exports.createCollidableFromRenderableShape = exports.createCapsuleFromRenderableShape = undefined;

var _collidables = require('../collidables');

var _util = require('../../util');

/**
 * @param {CollidableShapeConfig} params
 * @param {CollidablePhysicsJob} [physicsJob]
 * @returns {Collidable}
 */
/**
 * This module defines a set of factory functions for creating Collidable instances.
 */

function createCollidableFromRenderableShape(params, physicsJob) {
  return _collidableCreators[params.collidableShapeId](params, physicsJob);
}

/**
 * This assumes the base RenderableShape has a side length of one unit.
 *
 * @param {CollidableShapeConfig} params
 * @param {CollidablePhysicsJob} [physicsJob]
 * @returns {Collidable}
 */
function createObbFromRenderableShape(params, physicsJob) {
  var halfRangeX = params.scale[0] / 2;
  var halfRangeY = params.scale[1] / 2;
  var halfRangeZ = params.scale[2] / 2;
  return new _collidables.Obb(halfRangeX, halfRangeY, halfRangeZ, params.isStationary, physicsJob);
}

/**
 * This assumes the base RenderableShape has a "radius" of one unit.
 *
 * @param {CollidableShapeConfig} params
 * @param {CollidablePhysicsJob} [physicsJob]
 * @returns {Collidable}
 */
function createSphereFromRenderableShape(params, physicsJob) {
  var radius = params.radius || vec3.length(params.scale) / Math.sqrt(3);
  return new _collidables.Sphere(0, 0, 0, radius, params.isStationary, physicsJob);
}

/**
 * The radius of the created capsule will be an average from the two shortest sides.
 *
 * There are two modes: either we use scale, or we use radius and capsuleEndPointsDistance.
 *
 * @param {CollidableShapeConfig} params
 * @param {CollidablePhysicsJob} [physicsJob]
 * @returns {Collidable}
 */
function createCapsuleFromRenderableShape(params, physicsJob) {
  var scale = params.scale;
  var capsuleEndPointsDistance = params.capsuleEndPointsDistance;
  var isStationary = params.isStationary;
  var radius = params.radius;

  var halfDistance = void 0;

  // There are two modes: either we use scale, or we use radius and capsuleEndPointsDistance.
  if (typeof radius === 'number' && typeof capsuleEndPointsDistance === 'number') {
    halfDistance = capsuleEndPointsDistance / 2;
  } else {
    var copy = vec3.clone(scale);
    copy.sort();

    var length = copy[2];
    radius = (copy[0] + copy[1]) / 2;
    halfDistance = length / 2 - radius;
  }

  var orientation = quat.create();
  if (scale[0] > scale[1]) {
    if (scale[0] > scale[2]) {
      vec3.rotateY(orientation, orientation, _util._geometry.HALF_PI);
    } else {
      // Do nothing; the capsule defaults to being aligned with the z-axis.
    }
  } else {
    if (scale[1] > scale[2]) {
      vec3.rotateX(orientation, orientation, -_util._geometry.HALF_PI);
    } else {
      // Do nothing; the capsule defaults to being aligned with the z-axis.
    }
  }

  var capsule = new _collidables.Capsule(halfDistance, radius, isStationary, physicsJob);
  capsule.orientation = orientation;

  return capsule;
}

/**
 * @param {CollidableShapeConfig} params
 * @param {CollidablePhysicsJob} [physicsJob]
 * @returns {Collidable}
 */
function createSphereOrCapsuleFromRenderableShape(params, physicsJob) {
  var scale = params.scale;
  var radius = params.radius;
  var capsuleEndPointsDistance = params.capsuleEndPointsDistance;

  var halfLengthX = scale[0] * radius;
  var halfLengthY = scale[1] * radius;
  var halfLengthZ = scale[2] * (radius + capsuleEndPointsDistance) / 2;

  var minLength = Math.min(Math.min(halfLengthX, halfLengthY), halfLengthZ);
  var maxLength = Math.max(Math.max(halfLengthX, halfLengthY), halfLengthZ);

  if (maxLength / minLength >= _SPHERE_VS_CAPSULE_ASPECT_RATIO_THRESHOLD) {
    return createCapsuleFromRenderableShape(params, physicsJob);
  } else {
    return createSphereFromRenderableShape(params, physicsJob);
  }
}

var _SPHERE_VS_CAPSULE_ASPECT_RATIO_THRESHOLD = 2;

var _collidableCreators = {
  'CUBE': createObbFromRenderableShape,
  'SPHERE_OR_CAPSULE': createSphereOrCapsuleFromRenderableShape,
  'SPHERE': createSphereFromRenderableShape,
  'CAPSULE': createCapsuleFromRenderableShape
};

exports.createCapsuleFromRenderableShape = createCapsuleFromRenderableShape;
exports.createCollidableFromRenderableShape = createCollidableFromRenderableShape;
exports.createObbFromRenderableShape = createObbFromRenderableShape;
exports.createSphereFromRenderableShape = createSphereFromRenderableShape;
exports.createSphereOrCapsuleFromRenderableShape = createSphereOrCapsuleFromRenderableShape;

/**
 * @typedef {Object} CollidableShapeConfig
 * @property {string} collidableShapeId The ID of the type of collidable shape.
 * @property {vec3} [scale]
 * @property {boolean} [isStationary=false] Whether the collidable is fixed in place.
 */

/**
 * @typedef {CollidableShapeConfig} SphericalCollidableShapeParams
 * @property {number} radius
 */

/**
 * @typedef {SphericalCollidableShapeParams} CapsuleCollidableShapeParams
 * @property {number} capsuleEndPointsDistance The distance between the centers of the spheres on either end
 * of the capsule.
 */

},{"../../util":92,"../collidables":62}],81:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollidablePhysicsJob = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _collidableFactories = require('./collidable-factories');

var _collidableStore = require('./collidable-store');

var _physicsJob = require('../../src/physics-job');

var _util = require('../../util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A CollidablePhysicsJob extends the standard PhysicsJob with a collidable geometry.
 */
var CollidablePhysicsJob = function (_PhysicsJob) {
  _inherits(CollidablePhysicsJob, _PhysicsJob);

  /**
   * @param {CollidableShapeConfig} collidableParams
   * @param {PhysicsState} state
   * @param {Array.<ForceApplier>} forceAppliers
   * @param {Object} controller
   * @param {CollisionHandler} collisionHandler
   */
  function CollidablePhysicsJob(collidableParams, state, forceAppliers, controller, collisionHandler) {
    _classCallCheck(this, CollidablePhysicsJob);

    var _this = _possibleConstructorReturn(this, (CollidablePhysicsJob.__proto__ || Object.getPrototypeOf(CollidablePhysicsJob)).call(this, forceAppliers, state));

    collidableParams.scale = collidableParams.scale || vec3.fromValues(1, 1, 1);
    _this.collidable = (0, _collidableFactories.createCollidableFromRenderableShape)(collidableParams, _this);
    _this.currentState.unrotatedInertiaTensor = (0, _util.createForCollidable)(_this.collidable, _this.currentState.mass);
    _this.currentState.updateDependentFields();
    _this.isAtRest = false;
    _this.controller = controller;
    _this._collisionHandler = collisionHandler;
    return _this;
  }

  /**
   * @param {ForceApplier} forceApplier
   */


  _createClass(CollidablePhysicsJob, [{
    key: 'addForceApplier',
    value: function addForceApplier(forceApplier) {
      _get(CollidablePhysicsJob.prototype.__proto__ || Object.getPrototypeOf(CollidablePhysicsJob.prototype), 'addForceApplier', this).call(this, forceApplier);
      this.isAtRest = false;
    }

    /**
     * @param {ForceApplier} forceApplier
     */

  }, {
    key: 'removeForceApplier',
    value: function removeForceApplier(forceApplier) {
      _get(CollidablePhysicsJob.prototype.__proto__ || Object.getPrototypeOf(CollidablePhysicsJob.prototype), 'removeForceApplier', this).call(this, forceApplier);
      this.isAtRest = false;
    }

    /**
     * This callback is triggered in response to a collision.
     *
     * @param {Collision} collision
     * @returns {boolean} True if this needs the standard collision restitution to proceed.
     */

  }, {
    key: 'handleCollision',
    value: function handleCollision(collision) {
      return this._collisionHandler(collision);
    }

    /**
     * @param {number} [startTime]
     * @override
     */

  }, {
    key: 'start',
    value: function start(startTime) {
      _get(CollidablePhysicsJob.prototype.__proto__ || Object.getPrototypeOf(CollidablePhysicsJob.prototype), 'start', this).call(this, startTime);
      _collidableStore.collidableStore.registerCollidable(this.collidable);
    }

    /**
     * @override
     */

  }, {
    key: 'finish',
    value: function finish() {
      _get(CollidablePhysicsJob.prototype.__proto__ || Object.getPrototypeOf(CollidablePhysicsJob.prototype), 'finish', this).call(this);
      _collidableStore.collidableStore.unregisterCollidable(this.collidable);
    }

    /** @returns {vec3} */

  }, {
    key: 'position',
    get: function get() {
      return this.currentState.position;
    }

    /** @param {vec3} value */
    ,
    set: function set(value) {
      this.currentState.position = vec3.clone(value);
      this.collidable.position = vec3.clone(value);
    }
  }]);

  return CollidablePhysicsJob;
}(_physicsJob.PhysicsJob);

exports.CollidablePhysicsJob = CollidablePhysicsJob;

/**
 * @typedef {Function} CollisionHandler
 * @param {Collision} collision
 * @returns {boolean} True if this needs the standard collision restitution to proceed.
 */

},{"../../src/physics-job":90,"../../util":92,"./collidable-factories":80,"./collidable-store":82}],82:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collidableStore = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _collisionUtils = require('./collision-utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO: Implement some form of bounding volume hierarchy to make searching for potential collisions
// more efficient.

/**
 * This class registers and retrieves all Collidables within a scene.
 */
var CollidableStore = function () {
  function CollidableStore() {
    _classCallCheck(this, CollidableStore);

    this._collidables = [];
  }

  /**
   * Caches the given program wrapper.
   *
   * This method is idempotent; a given program will only be cached once.
   *
   * @param {Collidable} collidable
   */


  _createClass(CollidableStore, [{
    key: 'registerCollidable',
    value: function registerCollidable(collidable) {
      this._collidables.push(collidable);
    }

    /**
     * @param {Collidable} collidable
     */

  }, {
    key: 'unregisterCollidable',
    value: function unregisterCollidable(collidable) {
      var index = this._collidables.indexOf(collidable);
      if (index >= 0) {
        this._collidables.splice(index, 1);
      }
    }

    /**
     * @param {Collidable} collidable
     * @returns {Array.<Collidable>}
     */

  }, {
    key: 'getPossibleCollisionsForCollidable',
    value: function getPossibleCollisionsForCollidable(collidable) {
      return this._collidables.filter(function (other) {
        return collidable !== other && (0, _collisionUtils.detectBoundingVolumeIntersection)(collidable, other);
      });
    }

    /**
     * @returns {Array.<Collision>}
     */

  }, {
    key: 'getPossibleCollisionsForAllCollidables',
    value: function getPossibleCollisionsForAllCollidables() {
      var result = [];
      for (var i = 0, count = this._collidables.length; i < count; i++) {
        var collidableA = this._collidables[i];
        for (var j = i + 1; j < count; j++) {
          var collidableB = this._collidables[j];
          if ((0, _collisionUtils.detectBoundingVolumeIntersection)(collidableA, collidableB)) {
            result.push({ collidableA: collidableA, collidableB: collidableB });
          }
        }
      }
      return result;
    }

    /**
     * @param {Function} callback
     */

  }, {
    key: 'forEach',
    value: function forEach(callback) {
      this._collidables.forEach(callback);
    }
  }]);

  return CollidableStore;
}();

var collidableStore = new CollidableStore();
exports.collidableStore = collidableStore;

/**
 * @typedef {Object} Collision
 * @property {Collidable} collidableA
 * @property {Collidable} collidableB
 * @property {vec3} [contactPoint] In world coordinates.
 * @property {vec3} [contactNormal] Points away from body A and toward body B.
 * @property {number} [time]
 */

},{"./collision-utils":84}],83:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOtherControllerFromCollision = exports.checkThatNoObjectsCollide = exports.recordOldCollisionsForDevModeForAllCollidables = exports.determineJobsAtRest = exports.findIntersectingCollidablesForCollidable = exports.handleCollisionsForJob = undefined;

var _util = require('../../util');

var _collidableStore = require('./collidable-store');

var _collisionUtils = require('./collision-utils');

/**
 * This module defines a collision pipeline.
 *
 * These functions will detect collisions between collidable bodies and update their momenta in
 * response to the collisions.
 *
 * - Consists of an efficient broad-phase collision detection step followed by a precise
 *   narrow-phase step.
 * - Calculates the position, surface normal, and time of each contact.
 * - Calculates the impulse of a collision and updates the bodies' linear and angular momenta in
 *   response.
 * - Applies Coulomb friction to colliding bodies.
 * - Sub-divides the time step to more precisely determine when and where a collision occurs.
 * - Supports multiple collisions with a single body in a single time step.
 * - Efficiently supports bodies coming to rest against each other.
 * - Bodies will never penetrate one another.
 * - This does not address the tunnelling problem. That is, it is possible for two fast-moving
 *   bodies to pass through each other as long as they did not intersect each other during any time
 *   step.
 * - This only supports collisions between certain types of shapes. Fortunately, this set provides
 *   reasonable approximations for most other shapes. The supported types of shapes are: spheres,
 *   capsules, AABBs, and OBBs.
 *
 * ## Objects that come to rest
 *
 * An important efficiency improvement is to not process objects through the physics engine pipeline
 * after they have come to rest. The isAtRest field indicates when a body has come to rest.
 *
 * isAtRest is set to true after a physics frame is finished if the collisions, forces, position,
 * and orientation of a job have not changed from the previous to the current state.
 *
 * isAtRest is set to false from two possible events: after a physics frame is finished if the
 * collisions have changed from the previous to the current state, or when a force is added to
 * removed from the job.
 *
 * ## Collision calculations do not consider velocity
 *
 * Collision detection works by waiting until two bodies intersect. However, because time frames are
 * not infinitely small, when an intersection is detected, it's already past the exact instance of
 * collision. To alleviate problems from this, the velocity of each body can be considered when
 * calculating the collision time, position, and contact normal. However, taking velocity into
 * account makes the contact calculations much more complex, so we do not consider velocity in our
 * calculations.
 *
 * A notable consequence of this is that the calculated contact normals can be incorrect. Consider
 * the following moving squares. At time t2 they are found to have collided. The calculated contact
 * point will be somewhere within the intersection of the corners. But the calculated contact normal
 * will point upwards, while the true contact normal should point to the right. This is because the
 * contact calculations do not consider velocity and instead only consider the shallowest direction
 * of overlap.
 *
 * // Time t1
 *                    +------------+
 *                    |            |
 *                    |            |
 *                <-- |      B     |
 *                    |            |
 *  +------------+    |            |
 *  |            |    +------------+
 *  |            |
 *  |      A     | -->
 *  |            |
 *  |            |
 *  +------------+
 *
 * // Time t2
 *         +------------+
 *         |            |
 *         |            |
 *         |      B     |
 *         |            |
 *  +------------+      |
 *  |      +-----|------+
 *  |            |
 *  |      A     |
 *  |            |
 *  |            |
 *  +------------+
 */

/**
 * Detect and handle any collisions between a given job and all other collidable bodies.
 *
 * @param {CollidablePhysicsJob} job
 * @param {DOMHighResTimeStamp} elapsedTime
 * @param {PhysicsConfig} physicsParams
 */
function handleCollisionsForJob(job, elapsedTime, physicsParams) {
  var collidable = job.collidable;

  // Clear any previous collision info.
  collidable.previousCollisions = collidable.collisions;
  collidable.collisions = [];

  // Find all colliding collidables.
  var collidingCollidables = findIntersectingCollidablesForCollidable(collidable);

  // Store the time of collision for each collision.
  var collisions = _recordCollisions(collidable, collidingCollidables, elapsedTime);

  // Calculate the points of contact for each collision.
  _calculatePointsOfContact(collisions);

  // Collision resolution.
  _resolveCollisions(collisions, physicsParams);
}

/**
 * Finds all other collidables that intersect with the given collidable.
 *
 * @param {Collidable} collidable
 * @returns {Array.<Collidable>}
 */
function findIntersectingCollidablesForCollidable(collidable) {
  // Broad-phase collision detection (pairs whose bounding volumes intersect).
  var collidingCollidables = _collidableStore.collidableStore.getPossibleCollisionsForCollidable(collidable);

  // Narrow-phase collision detection (pairs that actually intersect).
  return _detectPreciseCollisionsFromCollidingCollidables(collidable, collidingCollidables);
}

/**
 * @param {Array.<CollidablePhysicsJob>} jobs
 */
function determineJobsAtRest(jobs) {
  jobs.forEach(function (job) {
    return job.isAtRest = _isJobAtRest(job);
  });
}

function recordOldCollisionsForDevModeForAllCollidables() {
  _collidableStore.collidableStore.forEach(_recordOldCollisionsForDevModeForCollidable);
}

/**
 * Logs a warning message for any pair of objects that intersect.
 */
function checkThatNoObjectsCollide() {
  // Broad-phase collision detection (pairs whose bounding volumes intersect).
  var collisions = _collidableStore.collidableStore.getPossibleCollisionsForAllCollidables();

  // Narrow-phase collision detection (pairs that actually intersect).
  collisions = _detectPreciseCollisionsFromCollisions(collisions);

  collisions.forEach(function (collision) {
    console.warn('Objects still intersect after collision resolution', collision);
  });
}

/**
 * Create collision objects that record the time of collision and the collidables in the collision.
 *
 * Also record references to these collisions on the collidables.
 *
 * @param {Collidable} collidable
 * @param {Array.<Collidable>} collidingCollidables
 * @param {DOMHighResTimeStamp} elapsedTime
 * @returns {Array.<Collision>}
 * @private
 */
function _recordCollisions(collidable, collidingCollidables, elapsedTime) {
  return collidingCollidables.map(function (other) {
    var collision = {
      collidableA: collidable,
      collidableB: other,
      time: elapsedTime
    };

    // Record the fact that these objects collided (the ModelController may want to handle this).
    collision.collidableA.collisions.push(collision);
    collision.collidableB.collisions.push(collision);

    return collision;
  });
}

/**
 * Narrow-phase collision detection.
 *
 * Given a list of possible collision pairs, filter out which pairs are actually colliding.
 *
 * @param {Array.<Collision>} collisions
 * @returns {Array.<Collision>}
 * @private
 */
function _detectPreciseCollisionsFromCollisions(collisions) {
  return collisions.filter(function (collision) {
    // TODO:
    // - Use temporal bisection with discrete sub-time steps to find time of collision (use
    //       x-vs-y-specific intersection detection methods).
    // - Make sure the collision object is set up with the "previousState" from the sub-step
    //   before collision and the time from the sub-step after collision (determined from the
    //   previous temporal bisection search...)

    return (0, _collisionUtils.detectIntersection)(collision.collidableA, collision.collidableB);
  });
}

/**
 * Narrow-phase collision detection.
 *
 * Given a list of possible collision pairs, filter out which pairs are actually colliding.
 *
 * @param {Collidable} collidable
 * @param {Array.<Collidable>} collidingCollidables
 * @returns {Array.<Collidable>}
 * @private
 */
function _detectPreciseCollisionsFromCollidingCollidables(collidable, collidingCollidables) {
  return collidingCollidables.filter(function (other) {
    // TODO:
    // - Use temporal bisection with discrete sub-time steps to find time of collision (use
    //       x-vs-y-specific intersection detection methods).
    // - Make sure the collision object is set up with the "previousState" from the sub-step
    //   before collision and the time from the sub-step after collision (determined from the
    //   previous temporal bisection search...)

    return (0, _collisionUtils.detectIntersection)(collidable, other);
  });
}

/**
 * Calculate the intersection position and contact normal of each collision.
 *
 * @param {Array.<Collision>} collisions
 * @private
 */
function _calculatePointsOfContact(collisions) {
  collisions.forEach(_collisionUtils.calculateContact);
}

/**
 * Updates the linear and angular momenta of each body in response to its collision.
 *
 * @param {Array.<Collision>} collisions
 * @param {PhysicsConfig} physicsParams
 * @private
 */
function _resolveCollisions(collisions, physicsParams) {
  collisions.forEach(function (collision) {
    // If neither physics job needs the standard collision restitution, then don't do it.
    if (_notifyPhysicsJobsOfCollision(collision)) {
      if (collision.collidableA.physicsJob && collision.collidableB.physicsJob) {
        // Neither of the collidables is stationary.
        _resolveCollision(collision, physicsParams);
      } else {
        // One of the two collidables is stationary.
        _resolveCollisionWithStationaryObject(collision, physicsParams);
      }
    }
  });
}

/**
 * @param {Collision} collision
 * @returns {boolean} True if one of the PhysicsJobs need the standard collision restitution to
 * proceed.
 * @private
 */
function _notifyPhysicsJobsOfCollision(collision) {
  return collision.collidableA.physicsJob.handleCollision(collision) || collision.collidableB.physicsJob.handleCollision(collision);
}

/**
 * Resolve a collision between two moving, physics-based objects.
 *
 * This is based on collision-response algorithms from Wikipedia
 * (https://en.wikipedia.org/wiki/Collision_response#Impulse-based_reaction_model).
 *
 * @param {Collision} collision
 * @param {PhysicsConfig} physicsParams
 * @private
 */
function _resolveCollision(collision, physicsParams) {
  var collidableA = collision.collidableA;
  var collidableB = collision.collidableB;
  var previousStateA = collidableA.physicsJob.previousState;
  var previousStateB = collidableB.physicsJob.previousState;
  var nextStateA = collidableA.physicsJob.currentState;
  var nextStateB = collidableB.physicsJob.currentState;
  var centerA = collidableA.centerOfMass;
  var centerB = collidableB.centerOfMass;
  var contactPoint = collision.contactPoint;

  var contactPointOffsetA = _util.tmpVec3;
  vec3.subtract(contactPointOffsetA, contactPoint, centerA);
  var contactPointOffsetB = _util.tmpVec4;
  vec3.subtract(contactPointOffsetB, contactPoint, centerB);

  //
  // Calculate the relative velocity of the bodies at the point of contact.
  //
  // We use the velocity from the previous state, since it is the velocity that led to the
  // collision.
  //

  var velocityA = _util.tmpVec1;
  vec3.cross(_util.tmpVec1, previousStateA.angularVelocity, contactPointOffsetA);
  vec3.add(velocityA, previousStateA.velocity, _util.tmpVec1);

  var velocityB = _util.tmpVec2;
  vec3.cross(_util.tmpVec2, previousStateB.angularVelocity, contactPointOffsetB);
  vec3.add(velocityB, previousStateB.velocity, _util.tmpVec2);

  var relativeVelocity = vec3.create();
  vec3.subtract(relativeVelocity, velocityB, velocityA);

  if (vec3.dot(relativeVelocity, collision.contactNormal) >= 0) {
    // If the relative velocity is not pointing against the normal, then the normal was calculated
    // incorrectly (this is likely due to the time step being too large and the fact that our
    // contact calculations don't consider velocity). So update the contact normal to be in the
    // direction of the relative velocity.

    // TODO: Check that this works as expected.

    // console.warn('Non-collision because objects are moving away from each other.');

    vec3.copy(collision.contactNormal, relativeVelocity);
    vec3.normalize(collision.contactNormal, collision.contactNormal);
    vec3.negate(collision.contactNormal, collision.contactNormal);
  }

  _applyImpulseFromCollision(collision, relativeVelocity, contactPointOffsetA, contactPointOffsetB, physicsParams);

  // NOTE: This state reversion is only applied to collidableA. This assumes that only A is moving
  // during this iteration of the collision pipeline.

  // Revert to the position and orientation from immediately before the collision.
  vec3.copy(nextStateA.position, previousStateA.position);
  quat.copy(nextStateA.orientation, previousStateA.orientation);

  // Also revert the collidables' position and orientation.
  collidableA.position = previousStateA.position;
  collidableA.orientation = previousStateA.orientation;

  nextStateA.updateDependentFields();
  nextStateB.updateDependentFields();
}

/**
 * Resolve a collision between one moving, physics-based object and one stationary object.
 *
 * @param {Collision} collision
 * @param {PhysicsConfig} physicsParams
 * @private
 */
function _resolveCollisionWithStationaryObject(collision, physicsParams) {
  var contactNormal = collision.contactNormal;

  var physicsCollidable = void 0;
  if (collision.collidableA.physicsJob) {
    physicsCollidable = collision.collidableA;
  } else {
    physicsCollidable = collision.collidableB;
    vec3.negate(contactNormal, contactNormal);
  }

  var previousState = physicsCollidable.physicsJob.previousState;
  var nextState = physicsCollidable.physicsJob.currentState;
  var center = physicsCollidable.centerOfMass;
  var contactPoint = collision.contactPoint;

  var contactPointOffset = _util.tmpVec3;
  vec3.subtract(contactPointOffset, contactPoint, center);

  // Calculate the relative velocity of the bodies at the point of contact. We use the velocity from
  // the previous state, since it is the velocity that led to the collision.
  var velocity = vec3.create();
  vec3.cross(_util.tmpVec1, previousState.angularVelocity, contactPointOffset);
  vec3.add(velocity, previousState.velocity, _util.tmpVec1);

  if (vec3.dot(velocity, contactNormal) <= 0) {
    // If the relative velocity is not pointing against the normal, then the normal was calculated
    // incorrectly (this is likely due to the time step being too large and the fact that our
    // contact calculations don't consider velocity). So update the contact normal to be in the
    // direction of the relative velocity.

    // TODO: Check that this works as expected.

    console.warn('Non-collision because object is moving away from stationary object.');

    vec3.copy(collision.contactNormal, velocity);
    vec3.normalize(collision.contactNormal, collision.contactNormal);
    vec3.negate(collision.contactNormal, collision.contactNormal);
  }

  _applyImpulseFromCollisionWithStationaryObject(physicsCollidable, collision, velocity, contactPointOffset, physicsParams);

  // Revert to the position and orientation from immediately before the collision.
  vec3.copy(nextState.position, previousState.position);
  quat.copy(nextState.orientation, previousState.orientation);

  // Also revert the collidable's position and orientation.
  physicsCollidable.position = previousState.position;
  physicsCollidable.orientation = previousState.orientation;

  nextState.updateDependentFields();
}

/**
 * This is based on collision-response algorithms from Wikipedia
 * (https://en.wikipedia.org/wiki/Collision_response#Impulse-based_reaction_model). This algorithm
 * has been simplified by assuming the stationary body has infinite mass and zero velocity.
 *
 * @param {Collision} collision
 * @param {vec3} relativeVelocity
 * @param {vec3} contactPointOffsetA
 * @param {vec3} contactPointOffsetB
 * @param {PhysicsConfig} physicsParams
 * @private
 */
function _applyImpulseFromCollision(collision, relativeVelocity, contactPointOffsetA, contactPointOffsetB, physicsParams) {
  var collidableA = collision.collidableA;
  var collidableB = collision.collidableB;

  var stateA = collidableA.physicsJob.currentState;
  var stateB = collidableB.physicsJob.currentState;

  var contactNormal = collision.contactNormal;

  //
  // Calculate and apply the main collision impulse.
  //

  vec3.scale(_util.tmpVec1, relativeVelocity, -(1 + physicsParams.coefficientOfRestitution));
  var numerator = vec3.dot(_util.tmpVec1, contactNormal);

  vec3.cross(_util.tmpVec1, contactPointOffsetA, contactNormal);
  vec3.transformMat3(_util.tmpVec1, _util.tmpVec1, stateA.inverseInertiaTensor);
  vec3.cross(_util.tmpVec1, _util.tmpVec1, contactPointOffsetA);

  vec3.cross(_util.tmpVec2, contactPointOffsetB, contactNormal);
  vec3.transformMat3(_util.tmpVec2, _util.tmpVec2, stateB.inverseInertiaTensor);
  vec3.cross(_util.tmpVec2, _util.tmpVec2, contactPointOffsetB);

  vec3.add(_util.tmpVec1, _util.tmpVec1, _util.tmpVec2);
  var denominator = vec3.dot(_util.tmpVec1, contactNormal) + stateA.inverseMass + stateB.inverseMass;

  var impulseMagnitude = numerator / denominator;

  _applyImpulse(stateA, -impulseMagnitude, contactNormal, contactPointOffsetA);
  _applyImpulse(stateB, impulseMagnitude, contactNormal, contactPointOffsetB);

  //
  // Calculate and apply a dynamic friction impulse.
  //

  var frictionImpulseMagnitude = impulseMagnitude * physicsParams.coefficientOfFriction;

  var tangent = _util.tmpVec2;
  vec3.scale(_util.tmpVec1, contactNormal, vec3.dot(relativeVelocity, contactNormal));
  vec3.subtract(tangent, relativeVelocity, _util.tmpVec1);
  vec3.normalize(tangent, tangent);

  _applyImpulse(stateA, frictionImpulseMagnitude, tangent, contactPointOffsetA);
  _applyImpulse(stateB, -frictionImpulseMagnitude, tangent, contactPointOffsetB);
}

/**
 * This is based on collision-response algorithms from Wikipedia
 * (https://en.wikipedia.org/wiki/Collision_response#Impulse-based_reaction_model). This algorithm
 * has been simplified by assuming the stationary body has infinite mass and zero velocity.
 *
 * @param {Collidable} physicsCollidable
 * @param {Collision} collision
 * @param {vec3} velocity
 * @param {vec3} contactPointOffset
 * @param {PhysicsConfig} physicsParams
 * @private
 */
function _applyImpulseFromCollisionWithStationaryObject(physicsCollidable, collision, velocity, contactPointOffset, physicsParams) {
  var state = physicsCollidable.physicsJob.currentState;
  var contactNormal = collision.contactNormal;

  //
  // Calculate and apply the main collision impulse.
  //

  vec3.scale(_util.tmpVec1, velocity, -(1 + physicsParams.coefficientOfRestitution));
  var numerator = vec3.dot(_util.tmpVec1, contactNormal);

  vec3.cross(_util.tmpVec1, contactPointOffset, contactNormal);
  vec3.transformMat3(_util.tmpVec1, _util.tmpVec1, state.inverseInertiaTensor);
  vec3.cross(_util.tmpVec1, _util.tmpVec1, contactPointOffset);
  var denominator = vec3.dot(_util.tmpVec1, contactNormal) + state.inverseMass;

  var impulseMagnitude = numerator / denominator;

  _applyImpulse(state, impulseMagnitude, contactNormal, contactPointOffset);

  //
  // Calculate and apply a dynamic friction impulse.
  //

  var frictionImpulseMagnitude = impulseMagnitude * physicsParams.coefficientOfFriction;

  var tangent = _util.tmpVec2;
  vec3.scale(_util.tmpVec1, contactNormal, vec3.dot(velocity, contactNormal));
  vec3.subtract(tangent, velocity, _util.tmpVec1);
  vec3.normalize(tangent, tangent);

  _applyImpulse(state, frictionImpulseMagnitude, tangent, contactPointOffset);
}

/**
 * @param {PhysicsState} state
 * @param {number} impulseMagnitude
 * @param {vec3} impulseDirection
 * @param {vec3} contactPointOffset
 * @private
 */
function _applyImpulse(state, impulseMagnitude, impulseDirection, contactPointOffset) {
  // Calculate the updated linear momenta.
  var finalLinearMomentum = vec3.create();
  vec3.scaleAndAdd(finalLinearMomentum, state.momentum, impulseDirection, impulseMagnitude);

  // Calculate the updated angular momenta.
  var finalAngularMomentum = vec3.create();
  vec3.cross(_util.tmpVec1, contactPointOffset, impulseDirection);
  vec3.scaleAndAdd(finalAngularMomentum, state.angularMomentum, _util.tmpVec1, impulseMagnitude);

  // Apply the updated momenta.
  vec3.copy(state.momentum, finalLinearMomentum);
  vec3.copy(state.angularMomentum, finalAngularMomentum);
}

/**
 * @param {CollidablePhysicsJob} job
 * @returns {boolean}
 * @private
 */
function _isJobAtRest(job) {
  return (0, _util.areVec3sClose)(job.currentState.position, job.previousState.position) && (0, _util.areVec3sClose)(job.currentState.velocity, job.previousState.velocity) && (0, _util.areVec3sClose)(job.currentState.orientation, job.previousState.orientation) && _doCollisionsMatch(job.collidable.collisions, job.collidable.previousCollisions);
}

/**
 * @param {Array.<Collision>} collisionsA
 * @param {Array.<Collision>} collisionsB
 * @returns {boolean}
 * @private
 */
function _doCollisionsMatch(collisionsA, collisionsB) {
  var count = collisionsA.length;

  if (count !== collisionsB.length) return false;

  for (var i = 0; i < count; i++) {
    var collisionA = collisionsA[i];
    var collisionB = collisionsB[i];
    if (collisionA.collidableA !== collisionB.collidableA || collisionA.collidableB !== collisionB.collidableB || !(0, _util.areVec3sClose)(collisionA.contactPoint, collisionB.contactPoint) || !(0, _util.areVec3sClose)(collisionA.contactNormal, collisionB.contactNormal)) {
      return false;
    }
  }

  return true;
}

/**
 * @param {Collidable} collidable
 * @private
 */
function _recordOldCollisionsForDevModeForCollidable(collidable) {
  if (!collidable.extraPreviousCollisions) {
    collidable.extraPreviousCollisions = [];
  }

  for (var i = 3; i > 0; i--) {
    collidable.extraPreviousCollisions[i] = collidable.extraPreviousCollisions[i - 1];
  }
  collidable.extraPreviousCollisions[0] = collidable.previousCollisions;
}

/**
 * @param {Collision} collision
 * @param {Object} thisController
 * @returns {Object}
 */
function getOtherControllerFromCollision(collision, thisController) {
  var controllerA = collision.collidableA.physicsJob.controller;
  var controllerB = collision.collidableB.physicsJob.controller;
  if (controllerA === thisController) {
    return controllerB;
  } else if (controllerB === thisController) {
    return controllerA;
  } else {
    throw new Error('Neither collidable corresponds to the given controller');
  }
}

exports.handleCollisionsForJob = handleCollisionsForJob;
exports.findIntersectingCollidablesForCollidable = findIntersectingCollidablesForCollidable;
exports.determineJobsAtRest = determineJobsAtRest;
exports.recordOldCollisionsForDevModeForAllCollidables = recordOldCollisionsForDevModeForAllCollidables;
exports.checkThatNoObjectsCollide = checkThatNoObjectsCollide;
exports.getOtherControllerFromCollision = getOtherControllerFromCollision;

},{"../../util":92,"./collidable-store":82,"./collision-utils":84}],84:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detectBoundingVolumeIntersection = exports.calculateContact = exports.detectIntersection = undefined;

var _collidables = require('../collidables');

var _collisionDetection = require('../collision-detection');

var _contactCalculation = require('../contact-calculation');

/**
 * This module defines a collection of static utility functions for detecting and responding to
 * collisions.
 */

/**
 * @param {Collidable} a
 * @param {Collidable} b
 * @returns {boolean}
 */
function detectIntersection(a, b) {
  if (a instanceof _collidables.Sphere) {
    if (b instanceof _collidables.Sphere) {
      return _collisionDetection.sphereCollisionDetection.sphereVsSphere(a, b);
    } else if (b instanceof _collidables.Aabb) {
      return _collisionDetection.sphereCollisionDetection.sphereVsAabb(a, b);
    } else if (b instanceof _collidables.Capsule) {
      return _collisionDetection.sphereCollisionDetection.sphereVsCapsule(a, b);
    } else if (b instanceof _collidables.Obb) {
      return _collisionDetection.sphereCollisionDetection.sphereVsObb(a, b);
    } else {
      return _collisionDetection.sphereCollisionDetection.sphereVsPoint(a, b);
    }
  } else if (a instanceof _collidables.Aabb) {
    if (b instanceof _collidables.Sphere) {
      return _collisionDetection.aabbCollisionDetection.aabbVsSphere(a, b);
    } else if (b instanceof _collidables.Aabb) {
      return _collisionDetection.aabbCollisionDetection.aabbVsAabb(a, b);
    } else if (b instanceof _collidables.Capsule) {
      return _collisionDetection.aabbCollisionDetection.aabbVsCapsule(a, b);
    } else if (b instanceof _collidables.Obb) {
      return _collisionDetection.aabbCollisionDetection.aabbVsObb(a, b);
    } else {
      return _collisionDetection.aabbCollisionDetection.aabbVsPoint(a, b);
    }
  } else if (a instanceof _collidables.Capsule) {
    if (b instanceof _collidables.Sphere) {
      return _collisionDetection.capsuleCollisionDetection.capsuleVsSphere(a, b);
    } else if (b instanceof _collidables.Aabb) {
      return _collisionDetection.capsuleCollisionDetection.capsuleVsAabb(a, b);
    } else if (b instanceof _collidables.Capsule) {
      return _collisionDetection.capsuleCollisionDetection.capsuleVsCapsule(a, b);
    } else if (b instanceof _collidables.Obb) {
      return _collisionDetection.capsuleCollisionDetection.capsuleVsObb(a, b);
    } else {
      return _collisionDetection.capsuleCollisionDetection.capsuleVsPoint(a, b);
    }
  } else if (a instanceof _collidables.Obb) {
    if (b instanceof _collidables.Sphere) {
      return _collisionDetection.obbCollisionDetection.obbVsSphere(a, b);
    } else if (b instanceof _collidables.Aabb) {
      return _collisionDetection.obbCollisionDetection.obbVsAabb(a, b);
    } else if (b instanceof _collidables.Capsule) {
      return _collisionDetection.obbCollisionDetection.obbVsCapsule(a, b);
    } else if (b instanceof _collidables.Obb) {
      return _collisionDetection.obbCollisionDetection.obbVsObb(a, b);
    } else {
      return _collisionDetection.obbCollisionDetection.obbVsPoint(a, b);
    }
  } else {
    if (b instanceof _collidables.Sphere) {
      return _collisionDetection.sphereCollisionDetection.sphereVsPoint(b, a);
    } else if (b instanceof _collidables.Aabb) {
      return _collisionDetection.aabbCollisionDetection.aabbVsPoint(b, a);
    } else if (b instanceof _collidables.Capsule) {
      return _collisionDetection.capsuleCollisionDetection.capsuleVsPoint(b, a);
    } else if (b instanceof _collidables.Obb) {
      return _collisionDetection.obbCollisionDetection.obbVsPoint(b, a);
    } else {
      return false;
    }
  }
}

/**
 * @param {Collision} collision
 */
function calculateContact(collision) {
  var a = collision.collidableA;
  var b = collision.collidableB;
  var contactPoint = vec3.create();
  var contactNormal = vec3.create();

  if (a instanceof _collidables.Sphere) {
    if (b instanceof _collidables.Sphere) {
      _contactCalculation.sphereContactCalculation.sphereVsSphere(contactPoint, contactNormal, a, b);
    } else if (b instanceof _collidables.Aabb) {
      _contactCalculation.sphereContactCalculation.sphereVsAabb(contactPoint, contactNormal, a, b);
    } else if (b instanceof _collidables.Capsule) {
      _contactCalculation.sphereContactCalculation.sphereVsCapsule(contactPoint, contactNormal, a, b);
    } else if (b instanceof _collidables.Obb) {
      _contactCalculation.sphereContactCalculation.sphereVsObb(contactPoint, contactNormal, a, b);
    } else {
      _contactCalculation.sphereContactCalculation.sphereVsPoint(contactPoint, contactNormal, a, b);
    }
  } else if (a instanceof _collidables.Aabb) {
    if (b instanceof _collidables.Sphere) {
      _contactCalculation.aabbContactCalculation.aabbVsSphere(contactPoint, contactNormal, a, b);
    } else if (b instanceof _collidables.Aabb) {
      _contactCalculation.aabbContactCalculation.aabbVsAabb(contactPoint, contactNormal, a, b);
    } else if (b instanceof _collidables.Capsule) {
      _contactCalculation.aabbContactCalculation.aabbVsCapsule(contactPoint, contactNormal, a, b);
    } else if (b instanceof _collidables.Obb) {
      _contactCalculation.aabbContactCalculation.aabbVsObb(contactPoint, contactNormal, a, b);
    } else {
      _contactCalculation.aabbContactCalculation.aabbVsPoint(contactPoint, contactNormal, a, b);
    }
  } else if (a instanceof _collidables.Capsule) {
    if (b instanceof _collidables.Sphere) {
      _contactCalculation.capsuleContactCalculation.capsuleVsSphere(contactPoint, contactNormal, a, b);
    } else if (b instanceof _collidables.Aabb) {
      _contactCalculation.capsuleContactCalculation.capsuleVsAabb(contactPoint, contactNormal, a, b);
    } else if (b instanceof _collidables.Capsule) {
      _contactCalculation.capsuleContactCalculation.capsuleVsCapsule(contactPoint, contactNormal, a, b);
    } else if (b instanceof _collidables.Obb) {
      _contactCalculation.capsuleContactCalculation.capsuleVsObb(contactPoint, contactNormal, a, b);
    } else {
      _contactCalculation.capsuleContactCalculation.capsuleVsPoint(contactPoint, contactNormal, a, b);
    }
  } else if (a instanceof _collidables.Obb) {
    if (b instanceof _collidables.Sphere) {
      _contactCalculation.obbContactCalculation.obbVsSphere(contactPoint, contactNormal, a, b);
    } else if (b instanceof _collidables.Aabb) {
      _contactCalculation.obbContactCalculation.obbVsAabb(contactPoint, contactNormal, a, b);
    } else if (b instanceof _collidables.Capsule) {
      _contactCalculation.obbContactCalculation.obbVsCapsule(contactPoint, contactNormal, a, b);
    } else if (b instanceof _collidables.Obb) {
      _contactCalculation.obbContactCalculation.obbVsObb(contactPoint, contactNormal, a, b);
    } else {
      _contactCalculation.obbContactCalculation.obbVsPoint(contactPoint, contactNormal, a, b);
    }
  } else {
    if (b instanceof _collidables.Sphere) {
      _contactCalculation.sphereContactCalculation.sphereVsPoint(contactPoint, contactNormal, b, a);
    } else if (b instanceof _collidables.Aabb) {
      _contactCalculation.aabbContactCalculation.aabbVsPoint(contactPoint, contactNormal, b, a);
    } else if (b instanceof _collidables.Capsule) {
      _contactCalculation.capsuleContactCalculation.capsuleVsPoint(contactPoint, contactNormal, b, a);
    } else if (b instanceof _collidables.Obb) {
      _contactCalculation.obbContactCalculation.obbVsPoint(contactPoint, contactNormal, b, a);
    } else {}
    vec3.negate(contactNormal, contactNormal);
  }

  collision.contactPoint = contactPoint;
  collision.contactNormal = contactNormal;
}

/**
 * @param {Collidable} a
 * @param {Collidable} b
 * @returns {boolean}
 */
function detectBoundingVolumeIntersection(a, b) {
  return detectIntersection(a.boundingVolume, b.boundingVolume);
}

exports.detectIntersection = detectIntersection;
exports.calculateContact = calculateContact;
exports.detectBoundingVolumeIntersection = detectBoundingVolumeIntersection;

},{"../collidables":62,"../collision-detection":69,"../contact-calculation":74}],85:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _collisions = require('./collisions');

Object.keys(_collisions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _collisions[key];
    }
  });
});

var _integrator = require('./integrator');

Object.keys(_integrator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _integrator[key];
    }
  });
});

var _util = require('./util');

Object.keys(_util).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _util[key];
    }
  });
});

var _physicsEngine = require('./src/physics-engine');

Object.keys(_physicsEngine).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _physicsEngine[key];
    }
  });
});

var _physicsJob = require('./src/physics-job');

Object.keys(_physicsJob).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _physicsJob[key];
    }
  });
});

var _physicsState = require('./src/physics-state');

Object.keys(_physicsState).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _physicsState[key];
    }
  });
});

},{"./collisions":79,"./integrator":86,"./src/physics-engine":89,"./src/physics-job":90,"./src/physics-state":91,"./util":92}],86:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _integrator = require('./src/integrator');

Object.keys(_integrator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _integrator[key];
    }
  });
});

var _rk4Integrator = require('./src/rk4-integrator');

Object.keys(_rk4Integrator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _rk4Integrator[key];
    }
  });
});

},{"./src/integrator":87,"./src/rk4-integrator":88}],87:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class numerically integrates the equations of motion. That is, an integrator implements
 * physics simulations by updating position and velocity values for each time step.
 *
 * @abstract
 */
var Integrator = function () {
  function Integrator() {
    _classCallCheck(this, Integrator);

    // Integrator is an abstract class. It should not be instantiated directly.
    if (new.target === Integrator) {
      throw new TypeError('Cannot construct Integrator instances directly');
    }
  }

  /**
   * Integrate the state from t to t + dt.
   *
   * @param {PhysicsJob} job
   * @param {number} t Total elapsed time.
   * @param {number} dt Duration of the current time step.
   * @abstract
   */


  _createClass(Integrator, [{
    key: 'integrate',
    value: function integrate(job, t, dt) {
      // Extending classes should implement this method.
      throw new TypeError('Method not implemented');
    }

    /**
     * @returns {PhysicsDerivative}
     */

  }], [{
    key: 'createDerivative',
    value: function createDerivative() {
      return {
        velocity: vec3.create(),
        force: vec3.create(),
        spin: quat.create(),
        torque: vec3.create()
      };
    }
  }]);

  return Integrator;
}();

exports.Integrator = Integrator;

/**
 * @typedef {Object} PhysicsDerivative
 * @property {vec3} velocity Derivative of position.
 * @property {vec3} force Derivative of momentum.
 * @property {quat} spin Derivative of orientation.
 * @property {vec3} torque Derivative of angular momentum.
 */

/**
 * @typedef {Object} ForceApplierOutput
 * @property {vec3} force
 * @property {vec3} torque
 */

/**
 * @typedef {Object} ForceApplierInput
 * @property {PhysicsState} state
 * @property {number} t
 * @property {number} dt
 */

},{}],88:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rk4Integrator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util2 = require('../../util');

var _integrator = require('./integrator');

var _physicsState = require('../../src/physics-state');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: Account for the fact that collisions take place between time steps; integration should
// really consider the previous state as being the time and state at the moment of collision.

/**
 * This class numerically integrates the equations of motion. That is, this implements physics
 * simulations by updating position and velocity values for each time step.
 *
 * This integrator is an implementation of the classical Runge-Kutta method (RK4)
 * (https://en.wikipedia.org/wiki/Runge_kutta).
 *
 * This integrator causes energy to be lost at a small rate. This is a common problem for numerical
 * integrators, and is usually negligible.
 */
var RK4Integrator = function (_Integrator) {
  _inherits(RK4Integrator, _Integrator);

  function RK4Integrator() {
    _classCallCheck(this, RK4Integrator);

    var _this = _possibleConstructorReturn(this, (RK4Integrator.__proto__ || Object.getPrototypeOf(RK4Integrator)).call(this));

    if (_util2._util.isInDevMode) {
      _this._wrapForDevMode();
    }
    return _this;
  }

  /**
   * Integrate the state from t to t + dt.
   *
   * @param {PhysicsJob} job
   * @param {number} t Total elapsed time.
   * @param {number} dt Duration of the current time step.
   */


  _createClass(RK4Integrator, [{
    key: 'integrate',
    value: function integrate(job, t, dt) {
      var state = job.currentState;
      _tempState.copy(state);

      _calculateDerivative(_a, _tempState, job, t, 0, _EMPTY_DERIVATIVE);
      _calculateDerivative(_b, _tempState, job, t, dt * 0.5, _a);
      _calculateDerivative(_c, _tempState, job, t, dt * 0.5, _b);
      _calculateDerivative(_d, _tempState, job, t, dt, _c);

      _calculateVec3DerivativeWeightedSum(_positionDerivative, _a.velocity, _b.velocity, _c.velocity, _d.velocity);
      _calculateVec3DerivativeWeightedSum(_momentumDerivative, _a.force, _b.force, _c.force, _d.force);
      _calculateQuatDerivativeWeightedSum(_orientationDerivative, _a.spin, _b.spin, _c.spin, _d.spin);
      _calculateVec3DerivativeWeightedSum(_angularMomentumDerivative, _a.torque, _b.torque, _c.torque, _d.torque);

      vec3.scaleAndAdd(state.position, state.position, _positionDerivative, dt);
      vec3.scaleAndAdd(state.momentum, state.momentum, _momentumDerivative, dt);
      _util2._geometry.scaleAndAddQuat(state.orientation, state.orientation, _orientationDerivative, dt);
      vec3.scaleAndAdd(state.angularMomentum, state.angularMomentum, _angularMomentumDerivative, dt);

      state.updateDependentFields();
    }

    /**
     * Wraps the integrate method and check for NaN values after each integration.
     *
     * @private
     */

  }, {
    key: '_wrapForDevMode',
    value: function _wrapForDevMode() {
      var unguardedIntegrate = this.integrate.bind(this);
      this.integrate = function (job, t, dt) {
        unguardedIntegrate(job, t, dt);
        _checkForStateError(job.currentState);
      };
    }
  }]);

  return RK4Integrator;
}(_integrator.Integrator);

/**
 * Calculate the derivative from the given state with the given time step.
 *
 * @param {PhysicsDerivative} out
 * @param {PhysicsState} state
 * @param {PhysicsJob} job
 * @param {number} t
 * @param {number} dt
 * @param {PhysicsDerivative} d
 * @private
 */


function _calculateDerivative(out, state, job, t, dt, d) {
  vec3.scaleAndAdd(state.position, state.position, d.velocity, dt);
  vec3.scaleAndAdd(state.momentum, state.momentum, d.force, dt);
  _util2._geometry.scaleAndAddQuat(state.orientation, state.orientation, d.spin, dt);
  vec3.scaleAndAdd(state.angularMomentum, state.angularMomentum, d.torque, dt);

  state.updateDependentFields();

  out.velocity = state.velocity;
  out.spin = state.spin;
  vec3.set(out.force, 0, 0, 0);
  vec3.set(out.torque, 0, 0, 0);

  _forceApplierOutput.force = out.force;
  _forceApplierOutput.torque = out.torque;
  _forceApplierInput.state = state;
  _forceApplierInput.t = t + dt;
  _forceApplierInput.dt = dt;

  job.applyForces(_forceApplierOutput, _forceApplierInput);
}

var _EMPTY_DERIVATIVE = _integrator.Integrator.createDerivative();

var _tempState = new _physicsState.PhysicsState();
var _a = _integrator.Integrator.createDerivative();
var _b = _integrator.Integrator.createDerivative();
var _c = _integrator.Integrator.createDerivative();
var _d = _integrator.Integrator.createDerivative();

var _positionDerivative = vec3.create();
var _momentumDerivative = vec3.create();
var _orientationDerivative = quat.create();
var _angularMomentumDerivative = vec3.create();

var _forceApplierOutput = {};
var _forceApplierInput = {};

/**
 * @param {vec3} out
 * @param {vec3} a
 * @param {vec3} b
 * @param {vec3} c
 * @param {vec3} d
 * @private
 */
function _calculateVec3DerivativeWeightedSum(out, a, b, c, d) {
  out[0] = 1 / 6 * (a[0] + 2 * (b[0] + c[0]) + d[0]);
  out[1] = 1 / 6 * (a[1] + 2 * (b[1] + c[1]) + d[1]);
  out[2] = 1 / 6 * (a[2] + 2 * (b[2] + c[2]) + d[2]);
}

/**
 * @param {quat} out
 * @param {quat} a
 * @param {quat} b
 * @param {quat} c
 * @param {quat} d
 * @private
 */
function _calculateQuatDerivativeWeightedSum(out, a, b, c, d) {
  out[0] = 1 / 6 * (a[0] + 2 * (b[0] + c[0]) + d[0]);
  out[1] = 1 / 6 * (a[1] + 2 * (b[1] + c[1]) + d[1]);
  out[2] = 1 / 6 * (a[2] + 2 * (b[2] + c[2]) + d[2]);
  out[3] = 1 / 6 * (a[3] + 2 * (b[3] + c[3]) + d[3]);
}

/**
 * @param {PhysicsState} state
 * @private
 */
function _checkForStateError(state) {
  var errorProperties = ['position', 'momentum', 'orientation', 'angularMomentum'].filter(function (property) {
    return _containsNaN(state[property]);
  });
  var property = errorProperties[0];
  if (property) {
    throw new Error(property + ' contains a NaN value after integrating: ' + state[property]);
  }
}

/**
 * Determines whether the given vector contains a NaN value.
 *
 * @param {vec3} v
 * @private
 */
function _containsNaN(v) {
  return isNaN(v[0]) || isNaN(v[1]) || isNaN(v[2]);
}

var rk4Integrator = new RK4Integrator();

exports.rk4Integrator = rk4Integrator;

},{"../../src/physics-state":91,"../../util":92,"./integrator":87}],89:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysicsEngine = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lslAnimatex = require('lsl-animatex');

var _util2 = require('../util');

var _collisions = require('../collisions');

var _physicsState = require('./physics-state');

var _integrator = require('../integrator');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _FRAME_LATENCY_LOG_PERIOD = 5000;
var _LATENCY_LOG_LABEL = 'Physics frame duration';

/**
 * This physics engine simulates high-performance, three-dimensional rigid-body dynamics.
 *
 * Notable features:
 * - Includes collision detection with impulse-based resolution.
 * - Decouples the physics simulation and animation rendering time steps, and uses a fixed timestep
 * for the physics loop. This gives us numerical stability and precise reproducibility.
 * - Suppresses linear and angular momenta below a certain threshold.
 *
 * The engine consists primarily of a collection of individual physics jobs and an update loop. This
 * update loop is in turn controlled by the animation loop. However, whereas the animation loop
 * renders each job once per frame loop--regardless of how much time actually elapsed since the
 * previous frame--the physics loop updates its jobs at a constant rate. To reconcile these frame
 * rates, the physics loop runs as many times as is needed in order to catch up to the time of the
 * current animation frame. The physics frame rate should be much higher than the animation frame
 * rate.
 *
 * It is VERY IMPORTANT for a PhysicsJob to minimize the runtime of its update step.
 *
 * ## A note on job order
 *
 * The integration+collision pipeline handle one job at a time. A consequence of this design
 * is that half of the collisions technically represent a false interaction between the state of the
 * first object at time t and the state of the second object at time t - 1.
 *
 * This implementation prevents a more problematic issue. If all objects were first integrated, then
 * all objects were checked for collisions, then all collisions were resolved, then the following
 * scenario could arise:
 * - The next position of object A collides with the previous position of object B, but not with the
 *   next position of object B, so object A moves successfully to its new position.
 * - The next position of object B collides with the next position of object C, so objects B and C
 *   are reset to their previous positions.
 * - Object B and C now intersect.
 */

var PhysicsEngine = function (_PersistentAnimationJ) {
  _inherits(PhysicsEngine, _PersistentAnimationJ);

  /**
   * Clients should call PhysicsEngine.create instead of instantiating a PhysicsEngine directly.
   *
   * @param {PhysicsConfig} physicsParams
   */
  function PhysicsEngine(physicsParams) {
    _classCallCheck(this, PhysicsEngine);

    var _this = _possibleConstructorReturn(this, (PhysicsEngine.__proto__ || Object.getPrototypeOf(PhysicsEngine)).call(this));

    if (_physicsEngine) {
      throw new Error('Can\'t instantiate multiple instances of PhysicsEngine.');
    }

    _physicsEngine = _this;

    _this._physicsParams = physicsParams;
    _this.integrator = _integrator.rk4Integrator;
    _this._elapsedTime = 0.0;
    _this._remainingTime = 0.0;
    _this._nonCollidableJobs = [];
    _this._collidableJobs = [];

    if (_util2._util.isInDevMode) {
      _this._setUpForInDevMode();
    }
    return _this;
  }

  /**
   * @param {PhysicsConfig} physicsParams
   */


  _createClass(PhysicsEngine, [{
    key: 'reset',
    value: function reset() {
      this._elapsedTime = 0.0;
      this._remainingTime = 0.0;
      this._nonCollidableJobs = [];
      this._collidableJobs = [];
    }

    /**
     * Adds the given PhysicsJob.
     *
     * @param {PhysicsJob} job
     */

  }, {
    key: 'addJob',
    value: function addJob(job) {
      // console.debug(`Starting PhysicsJob`);

      if (job instanceof _collisions.CollidablePhysicsJob) {
        this._collidableJobs.push(job);
      } else {
        this._nonCollidableJobs.push(job);
      }
    }

    /**
     * Removes the given PhysicsJob.
     *
     * Throws no error if the job is not registered.
     *
     * @param {PhysicsJob} job
     */

  }, {
    key: 'removeJob',
    value: function removeJob(job) {
      // console.debug(`Cancelling PhysicsJob`);
      this._removeJob(job);
    }

    /**
     * Wraps the draw and update methods in a profiler function that will track the frame latencies.
     *
     * @private
     */

  }, {
    key: '_setUpForInDevMode',
    value: function _setUpForInDevMode() {
      var unwrappedUpdate = this.update.bind(this);
      var latencyProfiler = new _lslAnimatex.FrameLatencyProfiler(_FRAME_LATENCY_LOG_PERIOD, this._physicsParams.timeStepDuration, _LATENCY_LOG_LABEL);
      latencyProfiler.start();

      this.update = function () {
        var beforeTime = performance.now();
        unwrappedUpdate.apply(undefined, arguments);
        var deltaTime = performance.now() - beforeTime;
        latencyProfiler.recordFrameLatency(deltaTime);
      };
    }

    /**
     * Update the physics state for the current animation update frame.
     *
     * @param {DOMHighResTimeStamp} currentTime
     * @param {DOMHighResTimeStamp} deltaTime
     */

  }, {
    key: 'update',
    value: function update(currentTime, deltaTime) {
      this._remainingTime += deltaTime;

      // Run as many constant-interval physics updates as are needed for the given animation frame
      // interval.
      while (this._remainingTime >= this._physicsParams.timeStepDuration) {
        this._updateToNextPhysicsFrame();
        this._elapsedTime += this._physicsParams.timeStepDuration;
        this._remainingTime -= this._physicsParams.timeStepDuration;
      }

      // Calculate the intermediate physics state to use for rendering the current animation frame.
      var partialRatio = this._remainingTime / this._physicsParams.timeStepDuration;
      this._setPartialStateForRenderTimeStepForAllJobs(partialRatio);
    }
  }, {
    key: '_updateToNextPhysicsFrame',
    value: function _updateToNextPhysicsFrame() {
      var _this2 = this;

      if (_util2._util.isInDevMode) {
        this._recordOldStatesForAllJobsForDevMode();
        (0, _collisions.recordOldCollisionsForDevModeForAllCollidables)();
      }

      this._nonCollidableJobs.forEach(this._integratePhysicsStateForJob.bind(this));
      this._collidableJobs.forEach(function (job) {
        if (!job.isAtRest) {
          _this2._integratePhysicsStateForCollidableJob(job);
          (0, _collisions.handleCollisionsForJob)(job, _this2._elapsedTime, _this2._physicsParams);
        }
      });

      if (_util2._util.isInDevMode) {
        (0, _collisions.checkThatNoObjectsCollide)();
      }

      this._suppressLowMomentaForAllJobs();

      (0, _collisions.determineJobsAtRest)(this._collidableJobs);
    }

    /**
     * Removes the given job from the collection of active jobs if it exists.
     *
     * @param {PhysicsJob} job
     * @param {number} [index=-1]
     * @private
     */

  }, {
    key: '_removeJob',
    value: function _removeJob(job) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

      if (job instanceof _collisions.CollidablePhysicsJob) {
        _removeJobFromCollection(job, index, this._collidableJobs);
      } else {
        _removeJobFromCollection(job, index, this._nonCollidableJobs);
      }
    }

    /**
     * Update the current physics state for a job for the current physics update frame.
     *
     * This includes applying all forces that have been registered with the physics job.
     *
     * @param {CollidablePhysicsJob} job
     * @private
     */

  }, {
    key: '_integratePhysicsStateForCollidableJob',
    value: function _integratePhysicsStateForCollidableJob(job) {
      this._integratePhysicsStateForJob(job);

      // Update the collidable's position and orientation.
      job.collidable.position = job.currentState.position;
      job.collidable.orientation = job.currentState.orientation;
    }

    /**
     * Update the current physics state for a job for the current physics update frame.
     *
     * This includes applying all forces that have been registered with the physics job.
     *
     * @param {PhysicsJob} job
     * @private
     */

  }, {
    key: '_integratePhysicsStateForJob',
    value: function _integratePhysicsStateForJob(job) {
      job.previousState.copy(job.currentState);
      this.integrator.integrate(job, this._elapsedTime, this._physicsParams.timeStepDuration);
    }
  }, {
    key: '_suppressLowMomentaForAllJobs',
    value: function _suppressLowMomentaForAllJobs() {
      var _this3 = this;

      this._collidableJobs.forEach(function (job) {
        return _suppressLowMomentaForJob(job, _this3._physicsParams.lowMomentumSuppressionThreshold, _this3._physicsParams.lowAngularMomentumSuppressionThreshold);
      });
      this._nonCollidableJobs.forEach(function (job) {
        return _suppressLowMomentaForJob(job, _this3._physicsParams.lowMomentumSuppressionThreshold, _this3._physicsParams.lowAngularMomentumSuppressionThreshold);
      });
    }

    /**
     * Calculate the intermediate physics state to use for rendering the current animation frame. The
     * given ratio specifies how far the current render frame is between the previous and current
     * physics update frames.
     *
     * @param {number} partialRatio
     * @private
     */

  }, {
    key: '_setPartialStateForRenderTimeStepForAllJobs',
    value: function _setPartialStateForRenderTimeStepForAllJobs(partialRatio) {
      this._collidableJobs.forEach(_setPartialStateForRenderTimeStepForJob.bind(null, partialRatio));
      this._nonCollidableJobs.forEach(_setPartialStateForRenderTimeStepForJob.bind(null, partialRatio));
    }
  }, {
    key: '_recordOldStatesForAllJobsForDevMode',
    value: function _recordOldStatesForAllJobsForDevMode() {
      this._collidableJobs.forEach(_recordOldStatesForJob);
      this._nonCollidableJobs.forEach(_recordOldStatesForJob);
    }
  }, {
    key: 'draw',
    value: function draw() {}

    /**
     * @returns {PhysicsEngine}
     */

  }], [{
    key: 'create',
    value: function create(physicsParams) {
      new PhysicsEngine(physicsParams);
    }
  }, {
    key: 'instance',
    get: function get() {
      if (!_physicsEngine) {
        throw new Error('Can\'t access PhysicsEngine.instance before it has been instantiated.');
      }
      return _physicsEngine;
    }
  }]);

  return PhysicsEngine;
}(_lslAnimatex.PersistentAnimationJob);

/**
 * @param {PhysicsJob} job
 * @param {number} lowMomentumSuppressionThreshold
 * @param {number} lowAngularMomentumSuppressionThreshold
 * @private
 */


function _suppressLowMomentaForJob(job, lowMomentumSuppressionThreshold, lowAngularMomentumSuppressionThreshold) {
  var currentState = job.currentState;

  if (vec3.squaredLength(currentState.momentum) < lowMomentumSuppressionThreshold) {
    vec3.set(currentState.momentum, 0, 0, 0);
  }

  if (vec3.squaredLength(currentState.angularMomentum) < lowAngularMomentumSuppressionThreshold) {
    vec3.set(currentState.angularMomentum, 0, 0, 0);
  }
}

/**
 * @param {PhysicsJob} job
 * @param {number} index
 * @param {Array.<PhysicsJob>} jobs
 * @private
 */
function _removeJobFromCollection(job, index, jobs) {
  if (index >= 0) {
    jobs.splice(index, 1);
  } else {
    var count = jobs.length;
    for (index = 0; index < count; index++) {
      if (jobs[index] === job) {
        jobs.splice(index, 1);
        break;
      }
    }
  }
}

/**
 * @param {number} partialRatio
 * @param {PhysicsJob} job
 * @private
 */
function _setPartialStateForRenderTimeStepForJob(partialRatio, job) {
  job.renderState.lerp(job.previousState, job.currentState, partialRatio);
}

/**
 * @param {PhysicsJob} job
 * @private
 */
function _recordOldStatesForJob(job) {
  if (!job.extraPreviousStates) {
    job.extraPreviousStates = [];
    for (var i = 0; i < 4; i++) {
      job.extraPreviousStates[i] = new _physicsState.PhysicsState();
    }
  }

  for (var _i = 3; _i > 0; _i--) {
    job.extraPreviousStates[_i].copy(job.extraPreviousStates[_i - 1]);
  }
  job.extraPreviousStates[0].copy(job.previousState);
}

var _physicsEngine = null;

exports.PhysicsEngine = PhysicsEngine;

},{"../collisions":79,"../integrator":86,"../util":92,"./physics-state":91,"lsl-animatex":53}],90:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysicsJob = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lslAnimatex = require('lsl-animatex');

var _physicsEngine = require('./physics-engine');

var _physicsState = require('./physics-state');

var _util2 = require('../util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A PhysicsJob maintains a current force/momentum state and defines a method for applying forces at
 * a given physics time step.
 */
var PhysicsJob = function () {
  /**
   * @param {Array.<ForceApplier>} [forceAppliers]
   * @param {PhysicsState} [state]
   */
  function PhysicsJob(forceAppliers, state) {
    _classCallCheck(this, PhysicsJob);

    forceAppliers = forceAppliers || [];
    state = state || new _physicsState.PhysicsState();

    this.startTime = null;
    this.currentState = state;
    this.previousState = null;
    this.renderState = null;
    this._forceAppliers = forceAppliers;
  }

  /**
   * @param {ForceApplierOutput} outputParams
   * @param {ForceApplierInput} inputParams
   */


  _createClass(PhysicsJob, [{
    key: 'applyForces',
    value: function applyForces(outputParams, inputParams) {
      this._forceAppliers.forEach(function (forceApplier) {
        return forceApplier(outputParams, inputParams);
      });
    }

    /**
     * @param {ForceApplier} forceApplier
     * @param {number} [index=0] The index to add the given force applier in the current list of
     * appliers.
     */

  }, {
    key: 'addForceApplier',
    value: function addForceApplier(forceApplier) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      this._forceAppliers.splice(index, 0, forceApplier);
    }

    /**
     * @param {ForceApplier} forceApplier
     */

  }, {
    key: 'removeForceApplier',
    value: function removeForceApplier(forceApplier) {
      this._forceAppliers.splice(this._forceAppliers.indexOf(forceApplier), 1);
    }

    /**
     * Registers this PhysicsJob and all of its descendant child jobs with the physics engine.
     *
     * @param {number} [startTime]
     */

  }, {
    key: 'start',
    value: function start(startTime) {
      this.startTime = startTime || _lslAnimatex.animator.currentTime;

      var previousState = new _physicsState.PhysicsState();
      previousState.copy(this.currentState);
      var renderState = new _physicsState.PhysicsState();
      renderState.copy(this.currentState);

      this.previousState = previousState;
      this.renderState = renderState;

      if (_util2._util.isInDevMode) {
        // It is useful for debugging to be able to trace the states back to their jobs.
        this.currentState.job = this;
        this.previousState.job = this;
        this.renderState.job = this;
      }

      _physicsEngine.PhysicsEngine.instance.addJob(this);
    }

    /**
     * Unregisters this PhysicsJob and all of its descendant child jobs with the physics engine.
     *
     * Throws no error if the job is not registered.
     */

  }, {
    key: 'finish',
    value: function finish() {
      _physicsEngine.PhysicsEngine.instance.removeJob(this);
    }

    /**
     * @param {number} [startTime]
     */

  }, {
    key: 'restart',
    value: function restart(startTime) {
      this.finish();
      this.start(startTime);
    }
  }]);

  return PhysicsJob;
}();

exports.PhysicsJob = PhysicsJob;

/**
 * @typedef {Function} ForceApplier
 * @property {vec3} force Output.
 * @property {vec3} torque Output.
 * @property {PhysicsState} state Input.
 * @property {number} t Input.
 * @property {number} dt Input.
 */

/**
 * @typedef {Object} PhysicsConfig
 * @property {number} timeStepDuration
 * @property {number} gravity
 * @property {vec3} _gravityVec
 * @property {number} linearDragCoefficient
 * @property {number} angularDragCoefficient
 * @property {number} coefficientOfRestitution
 * @property {number} coefficientOfFriction
 * @property {number} lowMomentumSuppressionThreshold
 * @property {number} lowAngularMomentumSuppressionThreshold
 */

},{"../util":92,"./physics-engine":89,"./physics-state":91,"lsl-animatex":53}],91:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysicsState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('../util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class represents the state of an object that is needed for a physics simulation (such as
 * position, momentum, and mass).
 */
var PhysicsState = function () {
  /**
   * @param {DynamicsConfig} [dynamicsParams={}]
   */
  function PhysicsState() {
    var dynamicsParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, PhysicsState);

    var position = dynamicsParams.position || vec3.create();
    var momentum = dynamicsParams.momentum || vec3.create();
    var orientation = dynamicsParams.orientation || quat.create();
    var angularMomentum = dynamicsParams.angularMomentum || vec3.create();
    var mass = dynamicsParams.mass || 1;
    var unrotatedInertiaTensor = dynamicsParams.unrotatedInertiaTensor || (0, _util.createBoxInertiaTensor)(1, 1, 1, mass);

    // Constant fields.

    this.mass = mass;
    this.inverseMass = 1 / mass;
    this.unrotatedInertiaTensor = unrotatedInertiaTensor;

    // Independent fields.

    this.position = position;
    this.momentum = momentum;
    this.orientation = orientation;
    this.angularMomentum = angularMomentum;

    // Dependent fields.

    // Linear velocity.
    this.velocity = vec3.create();
    // Quaternion-based representation of the rate of change in orientation.
    this.spin = quat.create();
    // Vector-based representation of the angular velocity.
    this.angularVelocity = vec3.create();
    // The inverse inertia tensor rotated to the world coordinate frame.
    this.inverseInertiaTensor = mat3.create();

    this.updateDependentFields();
  }

  _createClass(PhysicsState, [{
    key: 'updateDependentFields',
    value: function updateDependentFields() {
      // TODO: Test this somehow...
      // Update linear velocity.
      vec3.scale(this.velocity, this.momentum, this.inverseMass);

      // Update angular velocity.
      quat.normalize(this.orientation, this.orientation);
      (0, _util.rotateTensor)(this.inverseInertiaTensor, this.unrotatedInertiaTensor, this.orientation);
      mat3.invert(this.inverseInertiaTensor, this.unrotatedInertiaTensor);
      vec3.transformMat3(this.angularVelocity, this.angularMomentum, this.inverseInertiaTensor);
      quat.set(this.spin, this.angularVelocity[0], this.angularVelocity[1], this.angularVelocity[2], 0);
      quat.scale(this.spin, this.spin, 0.5);
      quat.multiply(this.spin, this.spin, this.orientation);
    }

    /**
     * Perform a deep copy.
     *
     * @param {PhysicsState} other
     */

  }, {
    key: 'copy',
    value: function copy(other) {
      this.mass = other.mass;
      this.inverseMass = other.inverseMass;
      mat3.copy(this.unrotatedInertiaTensor, other.unrotatedInertiaTensor);
      mat3.copy(this.inverseInertiaTensor, other.inverseInertiaTensor);
      vec3.copy(this.position, other.position);
      vec3.copy(this.momentum, other.momentum);
      quat.copy(this.orientation, other.orientation);
      vec3.copy(this.angularMomentum, other.angularMomentum);
      vec3.copy(this.velocity, other.velocity);
      quat.copy(this.spin, other.spin);
      vec3.copy(this.angularVelocity, other.angularVelocity);
    }

    /**
     * @param {PhysicsState} a
     * @param {PhysicsState} b
     * @param {number} partialRatio
     */

  }, {
    key: 'lerp',
    value: function lerp(a, b, partialRatio) {
      vec3.lerp(this.position, a.position, b.position, partialRatio);
      vec3.lerp(this.momentum, a.momentum, b.momentum, partialRatio);
      quat.slerp(this.orientation, a.orientation, b.orientation, partialRatio);
      quat.normalize(this.orientation, this.orientation);
      vec3.lerp(this.angularMomentum, a.angularMomentum, b.angularMomentum, partialRatio);
      this.updateDependentFields();
    }
  }]);

  return PhysicsState;
}();

exports.PhysicsState = PhysicsState;

/**
 * @typedef {Object} DynamicsConfig
 * @property {vec3} [position]
 * @property {vec3} [momentum]
 * @property {quat} [orientation]
 * @property {vec3} [angularMomentum]
 * @property {number} [mass]
 * @property {mat3} [unrotatedInertiaTensor]
 */

},{"../util":92}],92:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _forceUtils = require('./src/force-utils');

Object.keys(_forceUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _forceUtils[key];
    }
  });
});

var _geometry = require('./src/geometry');

Object.keys(_geometry).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _geometry[key];
    }
  });
});

var _inertiaTensorUtils = require('./src/inertia-tensor-utils');

Object.keys(_inertiaTensorUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _inertiaTensorUtils[key];
    }
  });
});

var _util = require('./src/util');

Object.keys(_util).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _util[key];
    }
  });
});

},{"./src/force-utils":93,"./src/geometry":94,"./src/inertia-tensor-utils":95,"./src/util":96}],93:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * This module defines a collection of static general utility functions for calculating forces.
 */

/**
 * @param {GravityApplierConfig} config
 * @param {ForceApplierOutput} output
 * @param {ForceApplierInput} input
 */
function applyGravity(config, output, input) {
  vec3.scaleAndAdd(output.force, output.force, config._gravityVec, input.state.mass);
}

/**
 * @param {LinearDragApplierConfig} config
 * @param {ForceApplierOutput} output
 * @param {ForceApplierInput} input
 */
function applyLinearDrag(config, output, input) {
  var dragMagnitude = -vec3.squaredLength(input.state.velocity) * config.linearDragCoefficient;
  vec3.normalize(_vec3, input.state.velocity);
  vec3.scaleAndAdd(output.force, output.force, _vec3, dragMagnitude);
}

/**
 * @param {AngularDragApplierConfig} config
 * @param {ForceApplierOutput} output
 * @param {ForceApplierInput} input
 */
function applyAngularDrag(config, output, input) {
  vec3.scaleAndAdd(output.torque, output.torque, input.state.angularVelocity, config.angularDragCoefficient);
}

/**
 * Applies a simple linear spring force (using Hooke's law).
 *
 * force = displacement * coefficient
 *
 * @param {LinearSpringForceApplierConfig} config
 * @param {ForceApplierOutput} output
 * @param {ForceApplierInput} input
 */
function applyLinearSpringForce(config, output, input) {
  vec3.subtract(_vec3, config.getIntendedPosition(), input.state.position);
  vec3.scaleAndAdd(output.force, output.force, _vec3, config.springCoefficient);
}

/**
 * @param {SpringDampingApplierConfig} config
 * @param {ForceApplierOutput} output
 * @param {ForceApplierInput} input
 */
function applySpringDamping(config, output, input) {
  vec3.scale(_vec3, input.state.velocity, -config.dampingCoefficient);
  vec3.add(output.force, output.force, _vec3);
}

var _vec3 = vec3.create();

exports.applyAngularDrag = applyAngularDrag;
exports.applyGravity = applyGravity;
exports.applyLinearDrag = applyLinearDrag;
exports.applyLinearSpringForce = applyLinearSpringForce;
exports.applySpringDamping = applySpringDamping;

/**
 * @typedef {Object} GravityApplierConfig
 * @property {vec3} _gravityVec
 */

/**
 * @typedef {Object} LinearDragApplierConfig
 * @property {number} linearDragCoefficient
 */

/**
 * @typedef {Object} AngularDragApplierConfig
 * @property {number} angularDragCoefficient
 */

/**
 * @typedef {Object} LinearSpringForceApplierConfig
 * @property {number} springCoefficient
 * @property {Function.<vec3>} getIntendedPosition
 */

/**
 * @typedef {Object} SpringDampingApplierConfig
 * @property {number} dampingCoefficient
 */

},{}],94:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * This module defines a collection of static geometry utility functions.
 */

var EPSILON = 0.0000001;
var HALF_PI = Math.PI / 2;
var TWO_PI = Math.PI * 2;

/**
 * Finds the minimum squared distance between two line segments.
 *
 * @param {LineSegment} segmentA
 * @param {LineSegment} segmentB
 * @returns {number}
 */
function findSquaredDistanceBetweenSegments(segmentA, segmentB) {
  findClosestPointsFromSegmentToSegment(_segmentDistance_tmpVecA, _segmentDistance_tmpVecB, segmentA, segmentB);
  return vec3.squaredDistance(_segmentDistance_tmpVecA, _segmentDistance_tmpVecB);
}

/**
 * Finds the minimum squared distance between a line segment and a point.
 *
 * @param {LineSegment} segment
 * @param {vec3} point
 * @returns {number}
 */
function findSquaredDistanceFromSegmentToPoint(segment, point) {
  findClosestPointOnSegmentToPoint(_segmentDistance_tmpVecA, segment, point);
  return vec3.squaredDistance(_segmentDistance_tmpVecA, point);
}

var _segmentDistance_tmpVecA = vec3.create();
var _segmentDistance_tmpVecB = vec3.create();

/**
 * @param {vec3} outputPoint Output parameter.
 * @param {Aabb} aabb
 * @param {vec3} targetPoint
 */
function findClosestPointFromAabbToPoint(outputPoint, aabb, targetPoint) {
  outputPoint[0] = aabb.minX > targetPoint[0] ? aabb.minX : aabb.maxX < targetPoint[0] ? aabb.maxX : targetPoint[0];
  outputPoint[1] = aabb.minY > targetPoint[1] ? aabb.minY : aabb.maxY < targetPoint[1] ? aabb.maxY : targetPoint[1];
  outputPoint[2] = aabb.minZ > targetPoint[2] ? aabb.minZ : aabb.maxZ < targetPoint[2] ? aabb.maxZ : targetPoint[2];
}

/**
 * @param {vec3} outputPoint Output parameter.
 * @param {Aabb} aabb
 * @param {vec3} targetPoint
 */
function findClosestPointFromAabbSurfaceToPoint(outputPoint, aabb, targetPoint) {
  findClosestPointFromAabbToPoint(outputPoint, aabb, targetPoint);

  // If the calculated point lies within the AABB, then we need to adjust one coordinate to lie
  // along the edge of the AABB.
  if (aabbVsPoint(aabb, outputPoint)) {
    // Calculate the closest vertex.
    _tmpVec1[0] = targetPoint[0] - aabb.minX < aabb.maxX - targetPoint[0] ? aabb.minX : aabb.maxX;
    _tmpVec1[1] = targetPoint[1] - aabb.minY < aabb.maxY - targetPoint[1] ? aabb.minY : aabb.maxY;
    _tmpVec1[2] = targetPoint[2] - aabb.minZ < aabb.maxZ - targetPoint[2] ? aabb.minZ : aabb.maxZ;

    // Calculate the distance to the vertex along each dimension.
    _tmpVec2[0] = _tmpVec1[0] - outputPoint[0];
    _tmpVec2[0] = _tmpVec2[0] < 0 ? -_tmpVec2[0] : _tmpVec2[0];
    _tmpVec2[1] = _tmpVec1[1] - outputPoint[1];
    _tmpVec2[1] = _tmpVec2[1] < 1 ? -_tmpVec2[1] : _tmpVec2[1];
    _tmpVec2[2] = _tmpVec1[2] - outputPoint[2];
    _tmpVec2[2] = _tmpVec2[2] < 2 ? -_tmpVec2[2] : _tmpVec2[2];

    // Determine along which dimension the point is closest to the AABB.
    var index = _tmpVec2[0] < _tmpVec2[1] ? _tmpVec2[0] < _tmpVec2[2] ? 0 : 2 : _tmpVec2[1] < _tmpVec2[2] ? 1 : 2;

    outputPoint[index] = _tmpVec1[index];
  }
}

/**
 * Finds the point of intersection between a line segment and a coplanar quadrilateral.
 *
 * This assumes the region is not degenerate (has non-zero side lengths).
 *
 * @param {vec3} poi Output param. Null if there is no intersection.
 * @param {LineSegment} segment
 * @param {vec3} planeVertex1
 * @param {vec3} planeVertex2
 * @param {vec3} planeVertex3
 * @param {vec3} planeVertex4
 * @returns {boolean} True if there is an intersection.
 */
function findPoiBetweenSegmentAndPlaneRegion(poi, segment, planeVertex1, planeVertex2, planeVertex3, planeVertex4) {
  return findPoiBetweenSegmentAndTriangle(poi, segment, planeVertex1, planeVertex2, planeVertex3) || findPoiBetweenSegmentAndTriangle(poi, segment, planeVertex1, planeVertex3, planeVertex4);
}

/**
 * Finds the point of intersection between a line segment and a triangle.
 *
 * This assumes the triangle is not degenerate (has non-zero side lengths).
 *
 * ----------------------------------------------------------------------------
 * Originally based on Dan Sunday's algorithms at http://geomalgorithms.com/a06-_intersect-2.html.
 *
 * Copyright 2001 softSurfer, 2012 Dan Sunday
 * This code may be freely used and modified for any purpose
 * providing that this copyright notice is included with it.
 * SoftSurfer makes no warranty for this code, and cannot be held
 * liable for any real or imagined damage resulting from its use.
 * Users of this code must verify correctness for their application.
 * ----------------------------------------------------------------------------
 *
 * @param {vec3} poi Output param. Null if there is no intersection.
 * @param {LineSegment} segment
 * @param {vec3} triangleVertex1
 * @param {vec3} triangleVertex2
 * @param {vec3} triangleVertex3
 * @returns {boolean} True if there is an intersection.
 */
function findPoiBetweenSegmentAndTriangle(poi, segment, triangleVertex1, triangleVertex2, triangleVertex3) {
  //
  // Find the point of intersection between the segment and the triangle's plane.
  //

  // First triangle edge.
  vec3.subtract(_tmpVec1, triangleVertex2, triangleVertex1);
  // Second triangle edge.
  vec3.subtract(_tmpVec2, triangleVertex3, triangleVertex1);
  // Triangle normal.
  vec3.cross(_tmpVec3, _tmpVec1, _tmpVec2);
  // Triangle to segment.
  vec3.subtract(_tmpVec4, segment.start, triangleVertex1);

  var normalToSegmentProj = vec3.dot(_tmpVec3, segment.dir);

  if (normalToSegmentProj < EPSILON && normalToSegmentProj > -EPSILON) {
    // The line segment is parallel to the triangle.
    return false;
  }

  var normalToDiffProj = -vec3.dot(_tmpVec3, _tmpVec4);
  var segmentNormalizedDistance = normalToDiffProj / normalToSegmentProj;

  if (segmentNormalizedDistance < 0 || segmentNormalizedDistance > 1) {
    // The line segment ends before intersecting the plane.
    return false;
  }

  vec3.scaleAndAdd(poi, segment.start, segment.dir, segmentNormalizedDistance);

  //
  // Determine whether the point of intersection lies within the triangle.
  //

  var edge1DotEdge1 = vec3.dot(_tmpVec1, _tmpVec1);
  var edge1DotEdge2 = vec3.dot(_tmpVec1, _tmpVec2);
  var edge2DotEdge2 = vec3.dot(_tmpVec2, _tmpVec2);
  // Triangle to point of intersection.
  vec3.subtract(_tmpVec3, poi, triangleVertex1);
  var diffDotEdge1 = vec3.dot(_tmpVec3, _tmpVec1);
  var diffDotEdge2 = vec3.dot(_tmpVec3, _tmpVec2);
  var denominator = edge1DotEdge2 * edge1DotEdge2 - edge1DotEdge1 * edge2DotEdge2;

  // Check the triangle's parametric coordinates.
  var s = (edge1DotEdge2 * diffDotEdge2 - edge2DotEdge2 * diffDotEdge1) / denominator;
  if (s < 0 || s > 1) {
    return false;
  }
  var t = (edge1DotEdge2 * diffDotEdge1 - edge1DotEdge1 * diffDotEdge2) / denominator;
  if (t < 0 || s + t > 1) {
    return false;
  }

  return true;
}

/**
 * ----------------------------------------------------------------------------
 * Originally based on Jukka Jylänki's algorithm at
 * https://github.com/juj/MathGeoLib/blob/1093e39d91def7ff6905fb7489893190d7d81353/src/Geometry/OBB.cpp.
 *
 * Copyright 2011 Jukka Jylänki
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ----------------------------------------------------------------------------
 *
 * @param {vec3} outputPoint Output parameter.
 * @param {Obb} obb
 * @param {vec3} targetPoint
 */
function findClosestPointFromObbToPoint(outputPoint, obb, targetPoint) {
  vec3.subtract(_tmpVec1, targetPoint, obb.centerOfVolume);
  vec3.copy(outputPoint, obb.centerOfVolume);
  for (var i = 0; i < 3; i++) {
    // Compute the displacement along this axis.
    var projection = vec3.dot(obb.axes[i], _tmpVec1);
    projection = projection > obb.halfSideLengths[i] ? obb.halfSideLengths[i] : projection < -obb.halfSideLengths[i] ? -obb.halfSideLengths[i] : projection;
    vec3.scaleAndAdd(outputPoint, outputPoint, obb.axes[i], projection);
  }
}

/**
 * Finds the closest position on one line segment to the other line segment, and vice versa.
 *
 * ----------------------------------------------------------------------------
 * Originally based on Jukka Jylänki's algorithm at
 * https://github.com/juj/MathGeoLib/blob/ff2d348a167008c831ae304483b824647f71fbf6/src/Geometry/LineSegment.cpp.
 *
 * Copyright 2011 Jukka Jylänki
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ----------------------------------------------------------------------------
 *
 * @param {vec3} closestA Output param.
 * @param {vec3} closestB Output param.
 * @param {LineSegment} segmentA
 * @param {LineSegment} segmentB
 */
function findClosestPointsFromSegmentToSegment(closestA, closestB, segmentA, segmentB) {
  var _findClosestPointsFro = findClosestPointsFromLineToLine(segmentA.start, segmentA.dir, segmentB.start, segmentB.dir),
      distA = _findClosestPointsFro.distA,
      distB = _findClosestPointsFro.distB;

  var isDistAInBounds = distA >= 0 && distA <= 1;
  var isDistBInBounds = distB >= 0 && distB <= 1;

  if (isDistAInBounds) {
    if (isDistBInBounds) {
      // The distances along both line segments are within bounds.
      vec3.scaleAndAdd(closestA, segmentA.start, segmentA.dir, distA);
      vec3.scaleAndAdd(closestB, segmentB.start, segmentB.dir, distB);
    } else {
      // Only the distance along the first line segment is within bounds.
      if (distB < 0) {
        vec3.copy(closestB, segmentB.start);
      } else {
        vec3.copy(closestB, segmentB.end);
      }
      findClosestPointOnSegmentToPoint(closestA, segmentA, closestB);
    }
  } else {
    if (isDistBInBounds) {
      // Only the distance along the second line segment is within bounds.
      if (distA < 0) {
        vec3.copy(closestA, segmentA.start);
      } else {
        vec3.copy(closestA, segmentA.end);
      }
      findClosestPointOnSegmentToPoint(closestB, segmentB, closestA);
    } else {
      // Neither of the distances along either line segment are within bounds.
      if (distA < 0) {
        vec3.copy(closestA, segmentA.start);
      } else {
        vec3.copy(closestA, segmentA.end);
      }

      if (distB < 0) {
        vec3.copy(closestB, segmentB.start);
      } else {
        vec3.copy(closestB, segmentB.end);
      }

      var altClosestA = vec3.create();
      var altClosestB = vec3.create();

      findClosestPointOnSegmentToPoint(altClosestA, segmentA, closestB);
      findClosestPointOnSegmentToPoint(altClosestB, segmentB, closestA);

      if (vec3.squaredDistance(altClosestA, closestB) < vec3.squaredDistance(altClosestB, closestA)) {
        vec3.copy(closestA, altClosestA);
      } else {
        vec3.copy(closestB, altClosestB);
      }
    }
  }
}

/**
 * Finds the closest position on a line segment to a point.
 *
 * ----------------------------------------------------------------------------
 * Originally based on Jukka Jylänki's algorithm at
 * https://github.com/juj/MathGeoLib/blob/ff2d348a167008c831ae304483b824647f71fbf6/src/Geometry/LineSegment.cpp.
 *
 * Copyright 2011 Jukka Jylänki
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ----------------------------------------------------------------------------
 *
 * @param {vec3} closestPoint Output param.
 * @param {LineSegment} segment
 * @param {vec3} point
 * @private
 */
function findClosestPointOnSegmentToPoint(closestPoint, segment, point) {
  var dirSquaredLength = vec3.squaredLength(segment.dir);

  if (!dirSquaredLength) {
    // The point is at the segment start.
    vec3.copy(closestPoint, segment.start);
  } else {
    // Calculate the projection of the point onto the line extending through the segment.
    vec3.subtract(_tmpVec1, point, segment.start);
    var t = vec3.dot(_tmpVec1, segment.dir) / dirSquaredLength;

    if (t < 0) {
      // The point projects beyond the segment start.
      vec3.copy(closestPoint, segment.start);
    } else if (t > 1) {
      // The point projects beyond the segment end.
      vec3.copy(closestPoint, segment.end);
    } else {
      // The point projects between the start and end of the segment.
      vec3.scaleAndAdd(closestPoint, segment.start, segment.dir, t);
    }
  }
}

/**
 * Finds the closest position on one line to the other line, and vice versa.
 *
 * The positions are represented as scalar-value distances from the "start" positions of each line.
 * These are scaled according to the given direction vectors.
 *
 * ----------------------------------------------------------------------------
 * Originally based on Jukka Jylänki's algorithm at
 * https://github.com/juj/MathGeoLib/blob/ff2d348a167008c831ae304483b824647f71fbf6/src/Geometry/Line.cpp.
 *
 * Copyright 2011 Jukka Jylänki
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ----------------------------------------------------------------------------
 *
 * @param {vec3} startA The start position of line A.
 * @param {vec3} dirA The (unnormalized) direction of line A. Cannot be zero.
 * @param {vec3} startB The start position of line B.
 * @param {vec3} dirB The (unnormalized) direction of line B. Cannot be zero.
 * @returns {{distA: Number, distB: Number}}
 */
function findClosestPointsFromLineToLine(startA, dirA, startB, dirB) {
  vec3.subtract(_tmpVec1, startA, startB);
  var dirBDotDirAToB = vec3.dot(dirB, _tmpVec1);
  var dirADotDirAToB = vec3.dot(dirA, _tmpVec1);

  var sqrLenDirB = vec3.squaredLength(dirB);
  var sqrLenDirA = vec3.squaredLength(dirA);

  var dirADotDirB = vec3.dot(dirA, dirB);

  var denominator = sqrLenDirA * sqrLenDirB - dirADotDirB * dirADotDirB;

  var distA = denominator < EPSILON ? 0 : (dirADotDirB * dirBDotDirAToB - sqrLenDirB * dirADotDirAToB) / denominator;
  var distB = (dirBDotDirAToB + dirADotDirB * distA) / sqrLenDirB;

  return {
    distA: distA,
    distB: distB
  };
}

/**
 * A good description of why we need these special operations for rotating tensors can be found
 * here: http://www.randygaul.net/2014/04/09/transformations-change-of-basis-matrix/.
 *
 * @param {mat3} output Output param.
 * @param {mat3} tensor
 * @param {quat} rotation
 */
function rotateTensor(output, tensor, rotation) {
  // TODO: Test this somehow...
  mat3.fromQuat(_tmpMat, rotation);
  mat3.multiply(output, _tmpMat, tensor);
  mat3.invert(_tmpMat, _tmpMat);
  mat3.multiply(output, output, _tmpMat);
}

/**
 * @param {Aabb} aabb
 * @param {vec3} point
 * @returns {boolean}
 */
function aabbVsPoint(aabb, point) {
  return point[0] >= aabb.minX && point[0] <= aabb.maxX && point[1] >= aabb.minY && point[1] <= aabb.maxY && point[2] >= aabb.minZ && point[2] <= aabb.maxZ;
}

/**
 * @param {quat} out
 * @param {quat} a
 * @param {quat} b
 * @param {number} scale
 * @returns {quat}
 */
function scaleAndAddQuat(out, a, b, scale) {
  return quat.set(out, a[0] + b[0] * scale, a[1] + b[1] * scale, a[2] + b[2] * scale, a[3] + b[3] * scale);
}

/**
 * @param {vec3} a
 * @param {vec3} b
 * @returns {boolean}
 */
function areVec3sClose(a, b) {
  for (var i = 0; i < 3; i++) {
    if (a[i] - b[i] > EPSILON || b[i] - a[i] > EPSILON) {
      return false;
    }
  }
  return true;
}

// Re-used across the geometry utility functions, so we don't instantiate as many vec3 objects.
var _tmpVec1 = vec3.create();
var _tmpVec2 = vec3.create();
var _tmpVec3 = vec3.create();
var _tmpVec4 = vec3.create();
var _tmpMat = mat3.create();

// Exposed to consumers, so they don't have to instantiate as many vec3 objects.
var tmpVec1 = vec3.create();
var tmpVec2 = vec3.create();
var tmpVec3 = vec3.create();
var tmpVec4 = vec3.create();

var _geometry = {
  EPSILON: EPSILON,
  HALF_PI: HALF_PI,
  TWO_PI: TWO_PI,
  scaleAndAddQuat: scaleAndAddQuat
};

exports._geometry = _geometry;
exports.tmpVec1 = tmpVec1;
exports.tmpVec2 = tmpVec2;
exports.tmpVec3 = tmpVec3;
exports.tmpVec4 = tmpVec4;
exports.findSquaredDistanceBetweenSegments = findSquaredDistanceBetweenSegments;
exports.findSquaredDistanceFromSegmentToPoint = findSquaredDistanceFromSegmentToPoint;
exports.findClosestPointFromAabbToPoint = findClosestPointFromAabbToPoint;
exports.findClosestPointFromAabbSurfaceToPoint = findClosestPointFromAabbSurfaceToPoint;
exports.findPoiBetweenSegmentAndTriangle = findPoiBetweenSegmentAndTriangle;
exports.findPoiBetweenSegmentAndPlaneRegion = findPoiBetweenSegmentAndPlaneRegion;
exports.findClosestPointFromObbToPoint = findClosestPointFromObbToPoint;
exports.findClosestPointsFromSegmentToSegment = findClosestPointsFromSegmentToSegment;
exports.findClosestPointOnSegmentToPoint = findClosestPointOnSegmentToPoint;
exports.findClosestPointsFromLineToLine = findClosestPointsFromLineToLine;
exports.rotateTensor = rotateTensor;
exports.aabbVsPoint = aabbVsPoint;
exports.areVec3sClose = areVec3sClose;

},{}],95:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createForCollidable = exports.createCapsuleInertiaTensor = exports.createBoxInertiaTensor = exports.createSphereInertiaTensor = undefined;

var _geometry2 = require('./geometry');

/**
 * @param {number} radius
 * @param {number} mass
 * @returns {mat3}
 */
function createSphereInertiaTensor(radius, mass) {
  // TODO: Test this somehow...
  var tensor = mat3.create();
  var moment = 2 / 5 * mass * radius * radius;
  tensor[0] = moment;
  tensor[4] = moment;
  tensor[8] = moment;
  return tensor;
}

/**
 * @param {number} rangeX
 * @param {number} rangeY
 * @param {number} rangeZ
 * @param {number} mass
 * @returns {mat3}
 */
/**
 * This module defines a collection of static utility functions for calculating inertia tensors.
 */

function createBoxInertiaTensor(rangeX, rangeY, rangeZ, mass) {
  // TODO: Test this somehow...
  var tensor = mat3.create();
  var tmp = mass / 12;
  var xRangeSquared = rangeX * rangeX;
  var yRangeSquared = rangeY * rangeY;
  var zRangeSquared = rangeZ * rangeZ;
  tensor[0] = tmp * (yRangeSquared + zRangeSquared);
  tensor[4] = tmp * (xRangeSquared + yRangeSquared);
  tensor[8] = tmp * (xRangeSquared + zRangeSquared);
  return tensor;
}

/**
 * ----------------------------------------------------------------------------
 * Originally based on Bojan Lovrovic's algorithm at
 * http://www.gamedev.net/page/resources/_/technical/math-and-physics/capsule-inertia-tensor-r3856.
 *
 * Copyright 2014 Bojan Lovrovic
 *
 * GameDev.net Open License
 * (http://www.gamedev.net/page/resources/_/gdnethelp/gamedevnet-open-license-r2956)
 *
 * TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION
 *
 * 1. Definitions.
 *
 * "Article" shall refer to any body of text written by Author which describes and documents the use
 * and/or operation of Source. It specifically does not refer to any accompanying Source either
 * embedded within the body of text or attached to the article as a file.
 *
 * "Author" means the individual or entity that offers the Work under the terms of this License.
 *
 * "License" shall mean the terms and conditions for use, reproduction, and distribution as defined
 * by Sections 1 through 9 of this document.
 *
 * "Licensor" shall mean the copyright owner or entity authorized by the copyright owner that is
 * granting the License.
 *
 * "You" (or "Your") shall mean an individual or entity exercising permissions granted by this
 * License.
 *
 * "Source" shall include all software text source code and configuration files used to create
 * executable software
 *
 * "Object" shall mean any Source which has been converted into a machine executable software
 *
 * "Work" consists of both the Article and Source
 *
 * "Publisher" refers to GameDev.net LLC
 *
 * This agreement is between You and Author, the owner and creator of the Work located at
 * Gamedev.net.
 *
 * 2. Fair Dealing Rights.
 *
 * Nothing in this License is intended to reduce, limit, or restrict any uses free from copyright or
 * rights arising from limitations or exceptions that are provided for in connection with the
 * copyright protection under copyright law or other applicable laws.
 *
 * 3. Grant of Copyright License.
 *
 * Subject to the terms and conditions of this License, the Author hereby grants to You a perpetual,
 * worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to the Work
 * under the following stated terms:
 * You may not reproduce the Article on any other website outside of Gamedev.net without express
 * written permission from the Author
 * You may use, copy, link, modify and distribute under Your own terms, binary Object code versions
 * based on the Work in your own software
 * You may reproduce, prepare derivative Works of, publicly display, publicly perform, sublicense,
 * and distribute the Source and such derivative Source in Source form only as part of a larger
 * software distribution and provided that attribution to the original Author is granted.
 * The origin of this Work must not be misrepresented; you must not claim that you wrote the
 * original Source. If you use this Source in a product, an acknowledgment of the Author name would
 * be appreciated but is not required.
 *
 * 4. Restrictions.
 *
 * The license granted in Section 3 above is expressly made subject to and limited by the following
 * restrictions:
 * Altered Source versions must be plainly marked as such, and must not be misrepresented as being
 * the original software.
 * This License must be visibly linked to from any online distribution of the Article by URI and
 * using the descriptive text "Licensed under the GameDev.net Open License"
 * Neither the name of the Author of this Work, nor any of their trademarks or service marks, may be
 * used to endorse or promote products derived from this Work without express prior permission of
 * the Author
 * Except as expressly stated herein, nothing in this License grants any license to Author's
 * trademarks, copyrights, patents, trade secrets or any other intellectual property. No license is
 * granted to the trademarks of Author even if such marks are included in the Work. Nothing in this
 * License shall be interpreted to prohibit Author from licensing under terms different from this
 * License any Work that Author otherwise would have a right to license.
 *
 * 5. Grant of Patent License.
 *
 * Subject to the terms and conditions of this License, each Contributor hereby grants to You a
 * perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable (except as stated in
 * this section) patent license to make, have made, use, offer to sell, sell, import, and otherwise
 * transfer the Work, where such license applies only to those patent claims licensable by such
 * Contributor that are necessarily infringed by their Contribution(s) alone or by combination of
 * their Contribution(s) with the Work to which such Contribution(s) was submitted. If You institute
 * patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit)
 * alleging that the Work or Source incorporated within the Work constitutes direct or contributory
 * patent infringement, then any patent licenses granted to You under this License for that Work
 * shall terminate as of the date such litigation is filed.
 *
 * 6. Limitation of Liability.
 *
 * In no event and under no legal theory, whether in tort (including negligence), contract, or
 * otherwise, unless required by applicable law (such as deliberate and grossly negligent acts) or
 * agreed to in writing, shall any Author or Publisher be liable to You for damages, including any
 * direct, indirect, special, incidental, or consequential damages of any character arising as a
 * result of this License or out of the use or inability to use the Work (including but not limited
 * to damages for loss of goodwill, work stoppage, computer failure or malfunction, or any and all
 * other commercial damages or losses), even if such Author has been advised of the possibility of
 * such damages.
 *
 * 7. DISCLAIMER OF WARRANTY
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
 * NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * 8. Publisher.
 *
 * The parties hereby confirm that the Publisher shall not, under any circumstances, be responsible
 * for and shall not have any liability in respect of the subject matter of this License. The
 * Publisher makes no warranty whatsoever in connection with the Work and shall not be liable to You
 * or any party on any legal theory for any damages whatsoever, including without limitation any
 * general, special, incidental or consequential damages arising in connection to this license. The
 * Publisher reserves the right to cease making the Work available to You at any time without notice
 *
 * 9. Termination
 *
 * This License and the rights granted hereunder will terminate automatically upon any breach by You
 * of the terms of this License. Individuals or entities who have received Deriviative Works from
 * You under this License, however, will not have their licenses terminated provided such
 * individuals or entities remain in full compliance with those licenses. Sections 1, 2, 6, 7, 8 and
 * 9 will survive any termination of this License.
 * Subject to the above terms and conditions, the license granted here is perpetual (for the
 * duration of the applicable copyright in the Work). Notwithstanding the above, Licensor reserves
 * the right to release the Work under different license terms or to stop distributing the Work at
 * any time; provided, however that any such election will not serve to withdraw this License (or
 * any other license that has been, or is required to be, granted under the terms of this License),
 * and this License will continue in full force and effect unless terminated as stated above.
 * ----------------------------------------------------------------------------
 *
 * @param {number} halfDistance
 * @param {number} radius
 * @param {number} mass
 * @returns {mat3}
 */
function createCapsuleInertiaTensor(halfDistance, radius, mass) {
  // TODO: Test this somehow...
  var tensor = mat3.create();

  var cylinderHeight = halfDistance * 2;
  var radiusSquared = radius * radius;
  var cylinderVolume = Math.PI * radiusSquared * cylinderHeight;
  var hemisphereCombinedVolume = 4 / 3 * Math.PI * radiusSquared;
  var cylinderMass = cylinderVolume / (cylinderVolume * hemisphereCombinedVolume) * mass;
  var hemisphereMass = (mass - cylinderMass) / 2;

  // Contribution from the cylinder.
  tensor[4] = radiusSquared * cylinderMass / 2;
  tensor[0] = tensor[4] / 2 + cylinderMass * cylinderHeight * cylinderHeight / 12;
  tensor[8] = tensor[0];

  // Contributions from the hemispheres.
  var tmp1 = hemisphereMass * 2 * radiusSquared / 5;
  tensor[4] += tmp1 * 2;
  var tmp2 = (tmp1 + hemisphereMass * (halfDistance * halfDistance + 3 / 8 * cylinderHeight * radius)) * 2;
  tensor[0] += tmp2;
  tensor[8] += tmp2;

  // The above calculations assume the capsule is aligned along the y-axis. However, our default
  // capsule orientation is aligned along the z-axis.
  var rotation = quat.create();
  quat.rotateX(rotation, rotation, _geometry2._geometry.HALF_PI);
  (0, _geometry2.rotateTensor)(tensor, tensor, rotation);

  return tensor;
}

/**
 * @param {Collidable} collidable
 * @param {number} mass
 * @returns {mat3}
 */
function createForCollidable(collidable, mass) {
  switch (collidable.constructor.name) {
    case 'Sphere':
      return createSphereInertiaTensor(collidable.radius, mass);
    case 'Aabb':
      return createBoxInertiaTensor(collidable.rangeX, collidable.rangeY, collidable.rangeZ, mass);
    case 'Capsule':
      return createCapsuleInertiaTensor(collidable.halfDistance, collidable.radius, mass);
    case 'Obb':
      return createBoxInertiaTensor(collidable.halfSideLengths[0] * 2, collidable.halfSideLengths[1] * 2, collidable.halfSideLengths[2] * 2, mass);
  }
}

exports.createSphereInertiaTensor = createSphereInertiaTensor;
exports.createBoxInertiaTensor = createBoxInertiaTensor;
exports.createCapsuleInertiaTensor = createCapsuleInertiaTensor;
exports.createForCollidable = createForCollidable;

},{"./geometry":94}],96:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * This module defines a collection of static general utility functions.
 */

// TODO: This should be set from somewhere else (probably as a param to controller like before; but then I need to make this updatable)
var isInDevMode = true;

var _util = {
  isInDevMode: isInDevMode
};

exports._util = _util;

},{}],97:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _boxConfig = require('./src/box-config');

Object.keys(_boxConfig).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _boxConfig[key];
    }
  });
});

var _cameraConfig = require('./src/camera-config');

Object.keys(_cameraConfig).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _cameraConfig[key];
    }
  });
});

var _cameraFolderConfig = require('./src/camera-folder-config');

Object.keys(_cameraFolderConfig).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _cameraFolderConfig[key];
    }
  });
});

var _capsuleConfig = require('./src/capsule-config');

Object.keys(_capsuleConfig).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _capsuleConfig[key];
    }
  });
});

var _generalConfig = require('./src/general-config');

Object.keys(_generalConfig).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _generalConfig[key];
    }
  });
});

var _physicsConfig = require('./src/physics-config');

Object.keys(_physicsConfig).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _physicsConfig[key];
    }
  });
});

var _physicsFolderConfig = require('./src/physics-folder-config');

Object.keys(_physicsFolderConfig).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _physicsFolderConfig[key];
    }
  });
});

var _sphereConfig = require('./src/sphere-config');

Object.keys(_sphereConfig).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _sphereConfig[key];
    }
  });
});

var _wallConfig = require('./src/wall-config');

Object.keys(_wallConfig).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _wallConfig[key];
    }
  });
});

},{"./src/box-config":98,"./src/camera-config":99,"./src/camera-folder-config":100,"./src/capsule-config":101,"./src/general-config":102,"./src/physics-config":103,"./src/physics-folder-config":104,"./src/sphere-config":105,"./src/wall-config":106}],98:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * This module handles configuration parameters relating to an OBB/ABB object.
 */

var boxConfig = {};

boxConfig.scale = {
  start: vec3.fromValues(1, 1, 1),
  min: vec3.fromValues(0.01, 0.01, 0.01),
  max: vec3.fromValues(100, 100, 100)
};

var boxFolderConfig = {
  label: 'Box',
  config: boxConfig,
  isOpen: true
};

exports.boxConfig = boxConfig;
exports.boxFolderConfig = boxFolderConfig;

},{}],99:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cameraConfigUpdaters = exports.followCameraConfig = exports.fixedCameraConfig = exports.cameraConfig = undefined;

var _gamex = require('gamex');

var cameraConfig = {}; /**
                        * This module handles configuration parameters relating to the camera. This uses the dat.GUI
                        * package.
                        */

// TODO: Tie this into the folder-config system.

cameraConfig.fovY = {
  start: (0, _gamex.degToRad)(70.0),
  min: 0.0,
  max: 3.1415
};
cameraConfig.defaultAspectRatio = {
  start: 16 / 9,
  min: 0.01,
  max: 8.0
};
cameraConfig._zNear = 0.1;
cameraConfig._zFar = 4000;
cameraConfig._defaultLookAtDirection = vec3.fromValues(0, 0, -1);

var fixedCameraConfig = {};

fixedCameraConfig.position = {
  start: vec3.fromValues(0, -40, 5),
  min: vec3.fromValues(-200, -200, -200),
  max: vec3.fromValues(200, 200, 200)
};
fixedCameraConfig.viewDirection = {
  start: vec3.fromValues(0, 1, -.5),
  min: vec3.fromValues(-1, -1, -1),
  max: vec3.fromValues(1, 1, 1)
};
fixedCameraConfig._up = vec3.fromValues(0, 0, 1);

var followCameraConfig = {};

followCameraConfig.springCoefficient = 0.003;
followCameraConfig.dampingCoefficient = 0.09;

followCameraConfig.intendedDistanceFromTarget = {
  start: 6,
  min: 0,
  max: 100
};
followCameraConfig.intendedRotationAngleFromTarget = {
  start: -Math.PI * .15,
  min: 0,
  max: 2 * Math.PI
};
followCameraConfig.intendedRotationAxisFromTarget = vec3.fromValues(1, 0, 0);
followCameraConfig._intendedTranslationFromTarget = vec3.create();

function updateIntendedTranslationFromTarget() {
  var transformation = mat4.create();
  mat4.rotate(transformation, transformation, followCameraConfig.intendedRotationAngleFromTarget, followCameraConfig.intendedRotationAxisFromTarget);
  mat4.translate(transformation, transformation, vec3.fromValues(0, 0, followCameraConfig.intendedDistanceFromTarget));
  vec3.transformMat4(followCameraConfig._intendedTranslationFromTarget, followCameraConfig._intendedTranslationFromTarget, transformation);
}

var normalizeFixedViewDirection = function normalizeFixedViewDirection() {
  return vec3.normalize(fixedCameraConfig.viewDirection, fixedCameraConfig.viewDirection);
};
var normalizeDefaultLookAtDirection = function normalizeDefaultLookAtDirection() {
  return vec3.normalize(cameraConfig._defaultLookAtDirection, cameraConfig._defaultLookAtDirection);
};

var cameraConfigUpdaters = {
  updateIntendedTranslationFromTarget: updateIntendedTranslationFromTarget,
  normalizeFixedViewDirection: normalizeFixedViewDirection,
  normalizeDefaultLookAtDirection: normalizeDefaultLookAtDirection
};

normalizeDefaultLookAtDirection();

exports.cameraConfig = cameraConfig;
exports.fixedCameraConfig = fixedCameraConfig;
exports.followCameraConfig = followCameraConfig;
exports.cameraConfigUpdaters = cameraConfigUpdaters;

},{"gamex":1}],100:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.followCameraFolderConfig = exports.fixedCameraFolderConfig = exports.cameraFolderConfig = undefined;

var _cameraConfig = require('./camera-config');

var _cameraFolderConfig = require('../../../../space-debris/src/config/src/camera-folder-config');

/**
 * This module configures the camera dat.GUI menu folder.
 */

var fixedCameraFolderConfig = {
  label: 'Fixed Camera',
  config: _cameraConfig.fixedCameraConfig,
  isOpen: true,
  onChangeListeners: {
    'viewDirection': _cameraConfig.cameraConfigUpdaters.normalizeFixedViewDirection
  }
};

var followCameraFolderConfig = {
  label: 'Follow Camera',
  config: _cameraConfig.followCameraConfig,
  isOpen: false,
  onChangeListeners: {
    'intendedDistanceFromTarget': _cameraConfig.cameraConfigUpdaters.updateIntendedTranslationFromTarget,
    'intendedRotationAngleFromTarget': _cameraConfig.cameraConfigUpdaters.updateIntendedTranslationFromTarget,
    'intendedRotationAxisFromTarget': _cameraConfig.cameraConfigUpdaters.updateIntendedTranslationFromTarget
  }
};

var cameraFolderConfig = {
  label: 'Camera',
  config: _cameraConfig.cameraConfig,
  isOpen: true
};

exports.cameraFolderConfig = cameraFolderConfig;
exports.fixedCameraFolderConfig = fixedCameraFolderConfig;
exports.followCameraFolderConfig = followCameraFolderConfig;

},{"../../../../space-debris/src/config/src/camera-folder-config":215,"./camera-config":99}],101:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * This module handles configuration parameters relating to a capsule object.
 */

var capsuleConfig = {};

capsuleConfig.sphericalTesselationCount = {
  start: 8,
  min: 0,
  max: 20
};
capsuleConfig.radius = {
  start: 1,
  min: 0,
  max: 16
};
capsuleConfig.capsuleEndPointsDistance = {
  start: 3,
  min: 0,
  max: 16
};

var capsuleFolderConfig = {
  label: 'Capsule',
  config: capsuleConfig,
  isOpen: true
};

exports.capsuleConfig = capsuleConfig;
exports.capsuleFolderConfig = capsuleFolderConfig;

},{}],102:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * This module handles general configuration parameters.
 */

var generalConfig = {};

generalConfig.useSmoothShading = false;
generalConfig.texturePath = {
  start: 'images/textures/test-image.png',
  options: ['images/textures/test-image.png', 'images/textures/metal/metal1.png', 'images/textures/metal/metal2.png', 'images/textures/metal/metal3.png', 'images/textures/metal/metal4.png', 'images/textures/metal/metal5.png', 'images/textures/metal/metal6.png', 'images/textures/metal/metal7.png', 'images/textures/metal/metal8.png']
};
generalConfig.shaderProgram = {
  start: 'general-model-program',
  options: ['general-model-program']
};
// TODO: Use these
//generalConfig.color = {
//   h: ,
//   s: ,
//   l:
// };
//generalConfig.shader = ;
//generalConfig.lights = [
//    {
//        color: ,
//        x: ,
//        y: ,
//        z:
//    },
//    {
//        color: ,
//        x: ,
//        y: ,
//        z:
//    },
//    {
//        color: ,
//        x: ,
//        y: ,
//        z:
//    }
//];
//generalConfig.cameraType = ;
// TODO: Add other camera param configs

generalConfig.clearObjects = function () {};

var generalFolderConfig = {
  label: 'General',
  config: generalConfig,
  isOpen: true
};

exports.generalConfig = generalConfig;
exports.generalFolderConfig = generalFolderConfig;

},{}],103:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * This module handles configuration parameters relating to the physics engine.
 */

var physicsConfig = {};

physicsConfig.timeStepDuration = {
  start: 10,
  min: 1,
  max: 1000
};
physicsConfig.gravity = {
  start: 0.0001,
  min: -0.001,
  max: 0.001
};
physicsConfig._gravityVec = vec3.create();

physicsConfig.linearDragCoefficient = {
  start: 0.0001,
  min: 0.0,
  max: 1.0
};
physicsConfig.angularDragCoefficient = {
  start: 0.000005,
  min: 0.0,
  max: 1.0
};
physicsConfig.coefficientOfRestitution = {
  start: 0.8,
  min: 0.0001,
  max: 1.0
};
physicsConfig.coefficientOfFriction = {
  start: 0.03,
  min: 0.0001,
  max: 1.0
};
physicsConfig.lowMomentumSuppressionThreshold = {
  start: 0.000000002,
  min: 0.0,
  max: 2.0
};
physicsConfig.lowAngularMomentumSuppressionThreshold = {
  start: 0.000000001,
  min: 0.0,
  max: 2.0
};

var physicsConfigUpdaters = {
  updateGravity: function updateGravity() {
    return vec3.set(physicsConfig._gravityVec, 0, 0, -physicsConfig.gravity);
  }
};

exports.physicsConfig = physicsConfig;
exports.physicsConfigUpdaters = physicsConfigUpdaters;

},{}],104:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.physicsFolderConfig = undefined;

var _physicsConfig = require('./physics-config');

/**
 * This module configures the physics dat.GUI menu folder.
 */

var physicsFolderConfig = {
  label: 'Physics Engine',
  config: _physicsConfig.physicsConfig,
  isOpen: false,
  onChangeListeners: {
    'gravity': _physicsConfig.physicsConfigUpdaters.updateGravity
  }
};

exports.physicsFolderConfig = physicsFolderConfig;

},{"./physics-config":103}],105:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * This module handles configuration parameters relating to a sphere object.
 */

var sphereConfig = {};

sphereConfig.sphericalTesselationCount = {
  start: 8,
  min: 0,
  max: 20
};
sphereConfig.radius = {
  start: 1,
  min: 0,
  max: 16
};

var sphereFolderConfig = {
  label: 'Sphere',
  config: sphereConfig,
  isOpen: true
};

exports.sphereConfig = sphereConfig;
exports.sphereFolderConfig = sphereFolderConfig;

},{}],106:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * This module handles configuration parameters relating to the floor.
 */

var wallConfig = {};

wallConfig.halfSideLength = 8000;
wallConfig.thickness = 8000;
wallConfig.zPosition = 8000;
wallConfig.useSmoothShading = false;
wallConfig.texturePath = 'images/textures/metal/metal8.png';
wallConfig.shaderProgram = 'general-model-program';
wallConfig.textureSpan = {
  minX: 0,
  minY: 0,
  maxX: 700,
  maxY: 700
};

var wallFolderConfig = {
  label: 'Wall',
  config: wallConfig
};

exports.wallConfig = wallConfig;
exports.wallFolderConfig = wallFolderConfig;

},{}],107:[function(require,module,exports){
'use strict';

var _gamex = require('gamex');

var _config = require('./config');

var _sceneImpl = require('./model-controllers/scene/scene-impl');

var _programs = require('./programs');

/**
 * This script defines the top-level logic that bootstraps the application.
 */

window.addEventListener('load', _initApp, false);

/**
 * Initializes the app. This is the event handler for the completion of the DOM loading.
 *
 * @private
 */
function _initApp() {
  console.debug('onDocumentLoad');

  window.removeEventListener('load', _initApp);

  var canvas = document.getElementById('game-area');
  var controller = new _gamex.GameController();
  var programConfigs = [_programs.generalModelProgramWrapperConfig];
  var textures = ['images/textures/test-image.png', 'images/textures/metal/metal1.png', 'images/textures/metal/metal2.png', 'images/textures/metal/metal3.png', 'images/textures/metal/metal4.png', 'images/textures/metal/metal5.png', 'images/textures/metal/metal6.png', 'images/textures/metal/metal7.png', 'images/textures/metal/metal8.png'];
  _gamex.PhysicsEngine.create(_config.physicsConfig);

  controller.initialize(canvas, programConfigs, textures, _sceneImpl.SceneImpl).then(function () {
    return controller.run();
  });
}

},{"./config":97,"./model-controllers/scene/scene-impl":111,"./programs":117,"gamex":1}],108:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropObjectConfigController = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _gamex = require('gamex');

var _simulationConfigController = require('../simulation-config-controller');

var _config = require('../../config');

var _singleObjectController = require('../single-object/single-object-controller');

var _dropObjectConfig = require('./drop-object-config');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * This class updates a drop-object simulation according to configuration-change events triggered
 * through the dat.GUI menu.
 */
var DropObjectConfigController = function (_SimulationConfigCont) {
  _inherits(DropObjectConfigController, _SimulationConfigCont);

  /**
   * @param {ModelGroupControllerConfig} params
   */
  function DropObjectConfigController(params) {
    _classCallCheck(this, DropObjectConfigController);

    var _this = _possibleConstructorReturn(this, (DropObjectConfigController.__proto__ || Object.getPrototypeOf(DropObjectConfigController)).call(this, params));

    _gamex.configController.createFolder(_dropObjectConfig.dropObjectFolderConfig, null, {
      'triggerDrop': function triggerDrop() {
        return _this._triggerObjectDrop();
      }
    });
    return _this;
  }

  _createClass(DropObjectConfigController, [{
    key: '_triggerObjectDrop',
    value: function _triggerObjectDrop() {
      // Turn gravity back on (in case it was off from the collision simulator).
      vec3.set(_config.physicsConfig._gravityVec, 0, 0, -_config.physicsConfig.gravity);

      for (var i = 0; i < _dropObjectConfig.dropObjectConfig.count; i++) {
        this._createNewObject();
      }
    }

    /**
     * @private
     */

  }, {
    key: '_createNewObject',
    value: function _createNewObject() {
      var modelControllerParams = {
        gl: this._gl,
        getViewMatrix: this._getViewMatrix,
        getProjectionMatrix: this._getProjectionMatrix,
        getParentWorldTransform: this._getParentWorldTransform,
        programWrapperId: _config.generalConfig.shaderProgram,
        texturePath: _config.generalConfig.texturePath
      };

      var dynamicsParams = {
        position: (0, _gamex.randomVec3InRange)(_dropObjectConfig.dropObjectConfig.startPositionAvg, _dropObjectConfig.dropObjectConfig.startPositionRange),
        mass: 1
      };

      var object = new _singleObjectController.SingleObjectController(modelControllerParams, dynamicsParams, _dropObjectConfig.dropObjectConfig.shape);
      this._startModelController(object).then(_ensureObjectIsNotColliding);
    }
  }]);

  return DropObjectConfigController;
}(_simulationConfigController.SimulationConfigController);

/**
 * Adds a z offset to the new object so that it does not collide with any pre-existing objects.
 *
 * @param {SingleObjectController} object
 * @private
 */

function _ensureObjectIsNotColliding(object) {
  var collidable = object.physicsJob.collidable;
  var startPosition = object.position;
  var collidingCollidables = (0, _gamex.findIntersectingCollidablesForCollidable)(collidable);
  while (collidingCollidables.length) {
    startPosition[2] += Math.random() * 200 + 4;
    object.position = startPosition;
    collidingCollidables = (0, _gamex.findIntersectingCollidablesForCollidable)(collidable);
  }
}

exports.DropObjectConfigController = DropObjectConfigController;

},{"../../config":97,"../simulation-config-controller":112,"../single-object/single-object-controller":113,"./drop-object-config":109,"gamex":1}],109:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * This module handles configuration parameters relating to simulations that drop objects.
 */

var dropObjectConfig = {};

dropObjectConfig.shape = {
  start: 'RANDOM',
  options: ['CUBE', 'ICOSAHEDRON', 'ICOSPHERE', 'LAT_LONG_SPHERE', 'CAPSULE', 'TETRAHEDRON', 'RANDOM']
};
dropObjectConfig.startPositionAvg = {
  start: vec3.fromValues(0, 10, 0),
  min: vec3.fromValues(-100, 0, -100),
  max: vec3.fromValues(100, 300, 100)
};
dropObjectConfig.startPositionRange = {
  start: vec3.fromValues(30, 30, 30),
  min: vec3.fromValues(0, 0, 0),
  max: vec3.fromValues(100, 100, 100)
};
dropObjectConfig.count = {
  start: 30,
  min: 1,
  max: 100
};
dropObjectConfig.triggerDrop = function () {};

var dropObjectFolderConfig = {
  label: 'Drop Simulation',
  config: dropObjectConfig,
  isOpen: true
};

exports.dropObjectConfig = dropObjectConfig;
exports.dropObjectFolderConfig = dropObjectFolderConfig;

},{}],110:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sceneFolderConfig = exports.sceneConfig = undefined;

var _config = require('../../config');

/**
 * This module handles configuration parameters relating to the overall scene.
 */

var sceneConfig = {};

// Keep this value correlated with cameraConfig._zFar.
sceneConfig.renderDistance = 4000;
_config.cameraConfig._zFar = sceneConfig.renderDistance;

var sceneFolderConfig = {
  label: 'Scene',
  config: sceneConfig
};

exports.sceneConfig = sceneConfig;
exports.sceneFolderConfig = sceneFolderConfig;

},{"../../config":97}],111:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneImpl = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _gamex = require('gamex');

var _sceneConfig = require('./scene-config');

var _config = require('../../config');

var _triggerCollisionConfigController = require('../trigger-collision/trigger-collision-config-controller');

var _dropObjectConfigController = require('../drop-object/drop-object-config-controller');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * This class handles the overall scene.
 *
 * This includes:
 * - the background
 * - all objects in the foreground
 * - all light sources
 * - the camera
 */
var SceneImpl = function (_GameScene) {
  _inherits(SceneImpl, _GameScene);

  /**
   * @param {ModelGroupControllerConfig} modelControllerParams
   * @param {GameController} gameCtrl
   * @param {InputController} inputCtrl
   */
  function SceneImpl(modelControllerParams, gameCtrl, inputCtrl) {
    _classCallCheck(this, SceneImpl);

    var _this = _possibleConstructorReturn(this, (SceneImpl.__proto__ || Object.getPrototypeOf(SceneImpl)).call(this, modelControllerParams, gameCtrl, inputCtrl, _sceneConfig.sceneConfig.renderDistance));

    _this._wallCtrl = null;
    _this._dropBallCtrl = null;
    _this._triggerCollisionCtrl = null;

    _this._createModelControllers();
    _this._createConfigController();

    _this._camera = new _gamex.FixedCamera(_config.fixedCameraConfig, _config.cameraConfig);
    return _this;
  }

  _createClass(SceneImpl, [{
    key: '_createModelControllers',
    value: function _createModelControllers() {
      this._wallCtrl = new _gamex.WallController({
        gl: this._gl,
        getViewMatrix: this._getViewMatrix,
        getProjectionMatrix: this._getProjectionMatrix,
        getParentWorldTransform: this._getWorldTransform,
        programWrapperId: _config.wallConfig.shaderProgram,
        texturePath: _config.wallConfig.texturePath
      }, {
        x: null,
        y: null,
        z: -50,
        isOpenOnPositiveSide: true,
        thickness: _config.wallConfig.thickness,
        halfSideLength: _config.wallConfig.halfSideLength,
        useSmoothShading: _config.wallConfig.useSmoothShading,
        textureSpan: _config.wallConfig.textureSpan
      });
      this._dropBallCtrl = new _dropObjectConfigController.DropObjectConfigController({
        gl: this._gl,
        getViewMatrix: this._getViewMatrix,
        getProjectionMatrix: this._getProjectionMatrix,
        getParentWorldTransform: this._getWorldTransform
      });
      this._triggerCollisionCtrl = new _triggerCollisionConfigController.TriggerCollisionConfigController({
        gl: this._gl,
        getViewMatrix: this._getViewMatrix,
        getProjectionMatrix: this._getProjectionMatrix,
        getParentWorldTransform: this._getWorldTransform
      });
      this._modelCtrls = [this._wallCtrl, this._dropBallCtrl, this._triggerCollisionCtrl];
    }
  }, {
    key: '_createConfigController',
    value: function _createConfigController() {
      var _this2 = this;

      _gamex.configController.createFolder(_config.physicsFolderConfig);
      _gamex.configController.createFolder(_config.generalFolderConfig, null, {
        'texturePath': function texturePath() {
          return _this2._updateTexture();
        },
        'shaderProgram': function shaderProgram() {
          return _this2._updateProgramWrapper();
        },
        'clearObjects': function clearObjects() {
          return _this2._clearObjects();
        }
      });
      _gamex.configController.createFolder(_config.boxFolderConfig);
      _gamex.configController.createFolder(_config.capsuleFolderConfig);
      _gamex.configController.createFolder(_config.sphereFolderConfig);

      var setCameraPerspective = function setCameraPerspective() {
        return _this2._camera._setPerspective(_config.cameraConfig.fovY, _config.cameraConfig.defaultAspectRatio, _config.cameraConfig._zNear, _config.cameraConfig._zFar);
      };
      _gamex.configController.createFolder(_config.cameraFolderConfig, null, {
        'fovY': setCameraPerspective,
        'defaultAspectRatio': setCameraPerspective
      });

      // TODO: Update this to support other types of cameras being selected.
      _gamex.configController.createFolder(_config.fixedCameraFolderConfig, null, {
        // These trigger an update within the camera.
        'viewDirection': function viewDirection() {
          return _this2._camera.viewDirection = _this2._camera.viewDirection;
        },
        'position': function position() {
          return _this2._camera.position = _this2._camera.position;
        }
      });
    }
  }, {
    key: '_updateTexture',
    value: function _updateTexture() {
      if (this._dropBallCtrl) {
        this._dropBallCtrl.updateTexture(_config.generalConfig.texturePath);
      }
      if (this._triggerCollisionCtrl) {
        this._triggerCollisionCtrl.updateTexture(_config.generalConfig.texturePath);
      }
    }
  }, {
    key: '_updateProgramWrapper',
    value: function _updateProgramWrapper() {
      if (this._dropBallCtrl) {
        this._dropBallCtrl.updateProgramWrapper(_config.generalConfig.shaderProgram);
      }
      if (this._triggerCollisionCtrl) {
        this._triggerCollisionCtrl.updateProgramWrapper(_config.generalConfig.shaderProgram);
      }
    }
  }, {
    key: '_clearObjects',
    value: function _clearObjects() {
      if (this._dropBallCtrl) {
        this._dropBallCtrl.clearModelControllers();
      }
      if (this._triggerCollisionCtrl) {
        this._triggerCollisionCtrl.clearModelControllers();
      }
    }
  }]);

  return SceneImpl;
}(_gamex.GameScene);

exports.SceneImpl = SceneImpl;

},{"../../config":97,"../drop-object/drop-object-config-controller":108,"../trigger-collision/trigger-collision-config-controller":114,"./scene-config":110,"gamex":1}],112:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimulationConfigController = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _gamex = require('gamex');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * This class defines some shared simulation behavior.
 */
var SimulationConfigController = function (_ModelGroupController) {
  _inherits(SimulationConfigController, _ModelGroupController);

  /**
   * @param {ModelGroupControllerConfig} modelGroupControllerParams
   */
  function SimulationConfigController(modelGroupControllerParams) {
    _classCallCheck(this, SimulationConfigController);

    // A stationary object to demo the parameters before running a simulation.
    //this._demoObject = this._createNewObject(true);// TODO: Add the demo object back in.

    // TODO: Remove these after changing the camera type from Follow.
    var _this = _possibleConstructorReturn(this, (SimulationConfigController.__proto__ || Object.getPrototypeOf(SimulationConfigController)).call(this, modelGroupControllerParams));

    _this.position = vec3.create();
    _this.orientation = quat.create();
    return _this;
  }

  _createClass(SimulationConfigController, [{
    key: 'reset',
    value: function reset() {
      this.clearModelControllers();
      //this._demoObject.reset();
    }

    /**
     * @param {string} texturePath
     */

  }, {
    key: 'updateTexture',
    value: function updateTexture(texturePath) {
      //this._demoObject.texturePath = texturePath;
      this._modelCtrls.forEach(function (object) {
        return object.texturePath = texturePath;
      });
    }

    /**
     * @param {string} id
     */

  }, {
    key: 'updateProgramWrapper',
    value: function updateProgramWrapper(id) {
      //this._demoObject.id = id;
      this._modelCtrls.forEach(function (object) {
        return object.programWrapperId = id;
      });
    }
  }]);

  return SimulationConfigController;
}(_gamex.ModelGroupController);

exports.SimulationConfigController = SimulationConfigController;

},{"gamex":1}],113:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingleObjectController = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _gamex = require('gamex');

var _config = require('../../config');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _shapeConfigs = {
  'CUBE': _config.boxConfig,
  'ICOSAHEDRON': _config.sphereConfig,
  'ICOSPHERE': _config.sphereConfig,
  'LAT_LONG_SPHERE': _config.sphereConfig,
  'CAPSULE': _config.capsuleConfig,
  'TETRAHEDRON': _config.sphereConfig
};

var _renderableShapesToCollidaleShapes = {
  'CUBE': 'CUBE',
  'ICOSAHEDRON': 'SPHERE_OR_CAPSULE',
  'ICOSPHERE': 'SPHERE_OR_CAPSULE',
  'LAT_LONG_SPHERE': 'SPHERE_OR_CAPSULE',
  'CAPSULE': 'SPHERE_OR_CAPSULE',
  'TETRAHEDRON': 'SPHERE_OR_CAPSULE'
};

/**
 * This class that controls a single object.
 */

var SingleObjectController = function (_CollidablePhysicsMod) {
  _inherits(SingleObjectController, _CollidablePhysicsMod);

  /**
   * @param {ModelControllerConfig} modelControllerParams
   * @param {DynamicsConfig} dynamicsParams
   * @param {string} shapeId
   */
  function SingleObjectController(modelControllerParams, dynamicsParams, shapeId) {
    _classCallCheck(this, SingleObjectController);

    shapeId = shapeId === 'RANDOM' ? (0, _gamex.pickRandom)(Object.keys(_shapeConfigs)) : shapeId;
    var collidableShapeId = _renderableShapesToCollidaleShapes[shapeId];
    var scale = shapeId === 'CUBE' ? _config.boxConfig.scale : vec3.fromValues(1, 1, 1);
    var config = _shapeConfigs[shapeId];
    var shapeParams = {
      shapeId: shapeId,
      collidableShapeId: collidableShapeId,
      isUsingSphericalNormals: _config.generalConfig.useSmoothShading,
      divisionsCount: config.sphericalTesselationCount,
      capsuleEndPointsDistance: config.capsuleEndPointsDistance,
      radius: config.radius,
      scale: scale,
      isStationary: false
    };
    var forceAppliers = [_gamex.applyGravity.bind(null, _config.physicsConfig), _gamex.applyLinearDrag.bind(null, _config.physicsConfig), _gamex.applyAngularDrag.bind(null, _config.physicsConfig)];

    return _possibleConstructorReturn(this, (SingleObjectController.__proto__ || Object.getPrototypeOf(SingleObjectController)).call(this, modelControllerParams, dynamicsParams, shapeParams, forceAppliers));
  }

  /**
   * This callback is triggered in response to a collision.
   *
   * @param {Collision} collision
   * @returns {boolean} True if this needs the standard collision restitution to proceed.
   */

  _createClass(SingleObjectController, [{
    key: 'handleCollision',
    value: function handleCollision(collision) {
      return true;
    }
  }]);

  return SingleObjectController;
}(_gamex.CollidablePhysicsModelController);

exports.SingleObjectController = SingleObjectController;

},{"../../config":97,"gamex":1}],114:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerCollisionConfigController = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _gamex = require('gamex');

var _simulationConfigController = require('../simulation-config-controller');

var _config = require('../../config');

var _singleObjectController = require('../single-object/single-object-controller');

var _triggerCollisionConfig = require('./trigger-collision-config');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * This class updates a drop-object simulation according to configuration-change events triggered
 * through the dat.GUI menu.
 */
var TriggerCollisionConfigController = function (_SimulationConfigCont) {
  _inherits(TriggerCollisionConfigController, _SimulationConfigCont);

  /**
   * @param {ModelGroupControllerConfig} params
   */
  function TriggerCollisionConfigController(params) {
    _classCallCheck(this, TriggerCollisionConfigController);

    var _this = _possibleConstructorReturn(this, (TriggerCollisionConfigController.__proto__ || Object.getPrototypeOf(TriggerCollisionConfigController)).call(this, params));

    _gamex.configController.createFolder(_triggerCollisionConfig.triggerCollisionFolderConfig, null, {
      'triggerCollision': function triggerCollision() {
        return _this._triggerCollision();
      }
    });
    return _this;
  }

  _createClass(TriggerCollisionConfigController, [{
    key: '_triggerCollision',
    value: function _triggerCollision() {
      // Turn off gravity.
      vec3.set(_config.physicsConfig._gravityVec, 0, 0, 0);

      this._createNewObject(true, _triggerCollisionConfig.object1Config);
      this._createNewObject(false, _triggerCollisionConfig.object2Config);
    }

    /**
     * @param {boolean} isFirstObject
     * @param {Object} objectConfig
     * @returns {SingleObjectController}
     * @private
     */

  }, {
    key: '_createNewObject',
    value: function _createNewObject(isFirstObject, objectConfig) {
      var modelControllerParams = {
        gl: this._gl,
        getViewMatrix: this._getViewMatrix,
        getProjectionMatrix: this._getProjectionMatrix,
        getParentWorldTransform: this._getParentWorldTransform,
        programWrapperId: _config.generalConfig.shaderProgram,
        texturePath: _config.generalConfig.texturePath
      };

      // Set the initial offset.
      var xOffset = isFirstObject ? -_triggerCollisionConfig.triggerCollisionConfig.distance / 2 : _triggerCollisionConfig.triggerCollisionConfig.distance / 2;
      var startPosition = vec3.fromValues(xOffset, 0, 0);
      vec3.add(startPosition, startPosition, objectConfig.displacement);

      var dynamicsParams = {
        position: startPosition,
        mass: objectConfig.mass
      };

      var object = new _singleObjectController.SingleObjectController(modelControllerParams, dynamicsParams, objectConfig.shape);
      this._startModelController(object).then(function () {
        // Set the initial orientation.
        var orientation = quat.create();
        quat.rotateX(orientation, orientation, objectConfig.rotationX);
        quat.rotateX(orientation, orientation, objectConfig.rotationY);
        quat.rotateX(orientation, orientation, objectConfig.rotationZ);
        object.physicsJob.previousState.orientation = orientation;
        object.physicsJob.currentState.orientation = quat.clone(orientation);

        // Set the initial velocity.
        var xVelocity = isFirstObject ? _triggerCollisionConfig.triggerCollisionConfig.speed : -_triggerCollisionConfig.triggerCollisionConfig.speed;
        var xMomentum = xVelocity * object.physicsJob.currentState.mass;
        object.physicsJob.previousState.momentum = vec3.fromValues(xMomentum, 0, 0);
        object.physicsJob.currentState.momentum = vec3.fromValues(xMomentum, 0, 0);

        _ensureObjectIsNotColliding(object);
      });
    }
  }]);

  return TriggerCollisionConfigController;
}(_simulationConfigController.SimulationConfigController);

/**
 * Adds an x offset to the new object so that it does not collide with any pre-existing objects.
 *
 * @param {SingleObjectController} object
 * @private
 */

function _ensureObjectIsNotColliding(object) {
  var collidable = object.physicsJob.collidable;
  var startPosition = object.position;
  var collidingCollidables = (0, _gamex.findIntersectingCollidablesForCollidable)(collidable);
  while (collidingCollidables.length) {
    startPosition[0] *= Math.random() + 1;
    object.position = startPosition;
    collidingCollidables = (0, _gamex.findIntersectingCollidablesForCollidable)(collidable);
  }
}

exports.TriggerCollisionConfigController = TriggerCollisionConfigController;

},{"../../config":97,"../simulation-config-controller":112,"../single-object/single-object-controller":113,"./trigger-collision-config":115,"gamex":1}],115:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * This module handles configuration parameters relating to simulations that collide two objects.
 */

var triggerCollisionConfig = {};

triggerCollisionConfig.distance = {
  start: 50,
  min: 0,
  max: 200
};
triggerCollisionConfig.speed = {
  start: 0.02,
  min: 0,
  max: 1
};
triggerCollisionConfig.triggerCollision = function () {};

var object1Config = {};

object1Config.shape = {
  start: 'CAPSULE',
  options: ['CUBE', 'ICOSAHEDRON', 'ICOSPHERE', 'LAT_LONG_SPHERE', 'CAPSULE', 'TETRAHEDRON', 'RANDOM']
};
object1Config.rotation = {
  start: vec3.fromValues(0, 0, 0),
  min: vec3.fromValues(-Math.PI, -Math.PI, -Math.PI),
  max: vec3.fromValues(Math.PI, Math.PI, Math.PI)
};
object1Config.displacement = {
  start: vec3.fromValues(0, 0, 0),
  min: vec3.fromValues(-50, -50, -50),
  max: vec3.fromValues(50, 50, 50)
};
object1Config.mass = {
  start: 1,
  min: 0.1,
  max: 50
};

var object2Config = {};

object2Config.shape = {
  start: 'CAPSULE',
  options: ['CUBE', 'ICOSAHEDRON', 'ICOSPHERE', 'LAT_LONG_SPHERE', 'CAPSULE', 'TETRAHEDRON', 'RANDOM']
};
object2Config.rotation = {
  start: vec3.fromValues(0, 0, 0),
  min: vec3.fromValues(-Math.PI, -Math.PI, -Math.PI),
  max: vec3.fromValues(Math.PI, Math.PI, Math.PI)
};
object2Config.displacement = {
  start: vec3.fromValues(0, 0, 0.9),
  min: vec3.fromValues(-50, -50, -50),
  max: vec3.fromValues(50, 50, 50)
};
object2Config.mass = {
  start: 2,
  min: 0.1,
  max: 50
};

var object1FolderConfig = {
  label: 'Object 1',
  config: object1Config,
  isOpen: true
};

var object2FolderConfig = {
  label: 'Object 2',
  config: object2Config,
  isOpen: true
};

var triggerCollisionFolderConfig = {
  label: 'Collision Simulation',
  config: triggerCollisionConfig,
  isOpen: true,
  childFolders: [object1FolderConfig, object2FolderConfig]
};

exports.triggerCollisionConfig = triggerCollisionConfig;
exports.object1Config = object1Config;
exports.object2Config = object2Config;
exports.triggerCollisionFolderConfig = triggerCollisionFolderConfig;

},{}],116:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * This module defines the configuration for a WebGL program that renders a general model--that is,
 * this program renders everything but the stars.
 *
 * This program renders three-dimensional shapes with textures and Blinn-Phong shading.
 */

var generalModelProgramWrapperConfig = {};

generalModelProgramWrapperConfig.id = 'general-model-program';

// The build system moves shader files to dist/shaders/.
generalModelProgramWrapperConfig.vertexShaderPath = 'shaders/general-model-shader.vert';
generalModelProgramWrapperConfig.fragmentShaderPath = 'shaders/general-model-shader.frag';

generalModelProgramWrapperConfig.renderPriority = 1;

/**
 * @param {WebGLRenderingContext} gl
 */
generalModelProgramWrapperConfig.webGLStateSetter = function (gl) {
  // Turn on depth testing.
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
};

exports.generalModelProgramWrapperConfig = generalModelProgramWrapperConfig;

},{}],117:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _generalModelProgramConfig = require('./general-model-program/general-model-program-config');

Object.keys(_generalModelProgramConfig).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _generalModelProgramConfig[key];
    }
  });
});

},{"./general-model-program/general-model-program-config":116}],118:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"./src":119,"dup":1}],119:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"./src/collidable-physics-model-controller":120,"./src/config-controller":121,"./src/game-controller":122,"./src/game-scene":123,"./src/input-controller":124,"./src/physics-model-controller":125,"./src/spring-follow-camera":126,"./wall":127,"dup":2,"grafx":130,"lsl-animatex":170,"lsl-physx":178}],120:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"./physics-model-controller":125,"dup":3,"lsl-physx":178}],121:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4,"grafx":130}],122:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"./config-controller":121,"./input-controller":124,"dup":5,"grafx":130,"lsl-animatex":170}],123:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6,"grafx":130,"lsl-physx":178}],124:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7,"grafx":130}],125:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8,"grafx":130,"lsl-physx":178}],126:[function(require,module,exports){
arguments[4][9][0].apply(exports,arguments)
},{"dup":9,"grafx":130}],127:[function(require,module,exports){
arguments[4][10][0].apply(exports,arguments)
},{"./src/wall-collidable":128,"./src/wall-controller":129,"dup":10}],128:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"dup":11,"lsl-physx":178}],129:[function(require,module,exports){
arguments[4][12][0].apply(exports,arguments)
},{"./wall-collidable":128,"dup":12,"grafx":130,"lsl-physx":178}],130:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"./src":139,"dup":1}],131:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"./src/camera":132,"./src/first-person-camera":133,"./src/fixed-camera":134,"./src/fixed-follow-camera":135,"./src/follow-camera":136,"./src/overhead-camera":137,"./src/third-person-camera":138,"dup":14}],132:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"dup":15,"lsl-animatex":170}],133:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"./camera":132,"dup":16}],134:[function(require,module,exports){
arguments[4][17][0].apply(exports,arguments)
},{"./camera":132,"dup":17}],135:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"./follow-camera":136,"dup":18}],136:[function(require,module,exports){
arguments[4][19][0].apply(exports,arguments)
},{"./third-person-camera":138,"dup":19}],137:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"./third-person-camera":138,"dup":20}],138:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"./camera":132,"dup":21}],139:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"./cameras":131,"./models":140,"./program-wrapper":147,"./renderable-shapes":153,"./src/grafx-controller":162,"./src/light":163,"./src/scene":164,"./util":165,"dup":22}],140:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"./src/default-model":141,"./src/invisible-model-controller":142,"./src/model":145,"./src/model-controller":143,"./src/model-group-controller":144,"./src/standard-model-controller":146,"dup":23}],141:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"../../util":165,"./model":145,"dup":24}],142:[function(require,module,exports){
arguments[4][25][0].apply(exports,arguments)
},{"./model-controller":143,"dup":25}],143:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"../../program-wrapper":147,"dup":26,"lsl-animatex":170}],144:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"dup":27,"lsl-animatex":170}],145:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"dup":28}],146:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"../../renderable-shapes":153,"./model-controller":143,"dup":29}],147:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"./src/program-wrapper":150,"./src/program-wrapper-store":149,"./src/texture-store":151,"./src/uniform-setter":152,"dup":30}],148:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"../../util":165,"./program-wrapper-store":149,"dup":31}],149:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"../../util":165,"./group-program-wrapper":148,"./program-wrapper":150,"dup":32}],150:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"../../util":165,"./uniform-setter":152,"dup":33}],151:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"../../util":165,"dup":34}],152:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"dup":35}],153:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"./src/renderable-shape-factory":154,"./src/renderable-shape-store":155,"./src/shape-configs/capsule-renderable-shape":156,"./src/shape-configs/cube-renderable-shape":157,"./src/shape-configs/icosahedron-renderable-shape":158,"./src/shape-configs/icosphere-renderable-shape":159,"./src/shape-configs/lat-long-sphere-renderable-shape":160,"./src/shape-configs/tetrahedron-renderable-shape":161,"dup":36}],154:[function(require,module,exports){
arguments[4][37][0].apply(exports,arguments)
},{"../../models":140,"./renderable-shape-store":155,"dup":37}],155:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"dup":38}],156:[function(require,module,exports){
arguments[4][39][0].apply(exports,arguments)
},{"../../../util":165,"../renderable-shape-store":155,"dup":39}],157:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"../renderable-shape-store":155,"dup":40}],158:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"../../../util":165,"../renderable-shape-store":155,"dup":41}],159:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"../../../util":165,"../renderable-shape-factory":154,"../renderable-shape-store":155,"dup":42}],160:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"../../../util":165,"../renderable-shape-store":155,"dup":43}],161:[function(require,module,exports){
arguments[4][44][0].apply(exports,arguments)
},{"../../../util":165,"../renderable-shape-store":155,"dup":44}],162:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"../program-wrapper":147,"../util":165,"dup":45,"lsl-animatex":170,"lsl-physx":178}],163:[function(require,module,exports){
arguments[4][46][0].apply(exports,arguments)
},{"dup":46}],164:[function(require,module,exports){
arguments[4][47][0].apply(exports,arguments)
},{"../models":140,"dup":47}],165:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"./src/geometry":166,"./src/gl-util":167,"./src/hash-map":168,"./src/util":169,"dup":48}],166:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"./util":169,"dup":49}],167:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"../../program-wrapper/src/program-wrapper-store":149,"./geometry":166,"./hash-map":168,"./util":169,"dup":50}],168:[function(require,module,exports){
arguments[4][51][0].apply(exports,arguments)
},{"dup":51}],169:[function(require,module,exports){
arguments[4][52][0].apply(exports,arguments)
},{"dup":52}],170:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"./src":174,"dup":1}],171:[function(require,module,exports){
arguments[4][54][0].apply(exports,arguments)
},{"dup":54}],172:[function(require,module,exports){
arguments[4][55][0].apply(exports,arguments)
},{"./frame-latency-profiler":173,"./persistent-animation-job":175,"./transient-animation-job":176,"dup":55}],173:[function(require,module,exports){
arguments[4][56][0].apply(exports,arguments)
},{"dup":56}],174:[function(require,module,exports){
arguments[4][57][0].apply(exports,arguments)
},{"./animation-job":171,"./animator":172,"./frame-latency-profiler":173,"./persistent-animation-job":175,"./transient-animation-job":176,"dup":57}],175:[function(require,module,exports){
arguments[4][58][0].apply(exports,arguments)
},{"./animation-job":171,"dup":58}],176:[function(require,module,exports){
arguments[4][59][0].apply(exports,arguments)
},{"./animation-job":171,"./util":177,"dup":59}],177:[function(require,module,exports){
arguments[4][60][0].apply(exports,arguments)
},{"dup":60}],178:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"./src":202,"dup":1}],179:[function(require,module,exports){
arguments[4][62][0].apply(exports,arguments)
},{"./src/aabb-collidable":180,"./src/capsule-collidable":181,"./src/collidable":182,"./src/line-segment":183,"./src/obb-collidable":184,"./src/sphere-collidable":185,"dup":62}],180:[function(require,module,exports){
arguments[4][63][0].apply(exports,arguments)
},{"../../../util":209,"./collidable":182,"./line-segment":183,"dup":63}],181:[function(require,module,exports){
arguments[4][64][0].apply(exports,arguments)
},{"./collidable":182,"./line-segment":183,"dup":64}],182:[function(require,module,exports){
arguments[4][65][0].apply(exports,arguments)
},{"dup":65}],183:[function(require,module,exports){
arguments[4][66][0].apply(exports,arguments)
},{"../../../util":209,"dup":66}],184:[function(require,module,exports){
arguments[4][67][0].apply(exports,arguments)
},{"./collidable":182,"./line-segment":183,"./sphere-collidable":185,"dup":67}],185:[function(require,module,exports){
arguments[4][68][0].apply(exports,arguments)
},{"./collidable":182,"dup":68}],186:[function(require,module,exports){
arguments[4][69][0].apply(exports,arguments)
},{"./src/aabb-collision-detection":187,"./src/capsule-collision-detection":188,"./src/obb-collision-detection":189,"./src/sphere-collision-detection":190,"dup":69}],187:[function(require,module,exports){
arguments[4][70][0].apply(exports,arguments)
},{"../../../util":209,"./capsule-collision-detection":188,"./obb-collision-detection":189,"./sphere-collision-detection":190,"dup":70}],188:[function(require,module,exports){
arguments[4][71][0].apply(exports,arguments)
},{"../../../util":209,"./obb-collision-detection":189,"dup":71}],189:[function(require,module,exports){
arguments[4][72][0].apply(exports,arguments)
},{"../../../util":209,"./aabb-collision-detection":187,"./capsule-collision-detection":188,"dup":72}],190:[function(require,module,exports){
arguments[4][73][0].apply(exports,arguments)
},{"../../../util":209,"./capsule-collision-detection":188,"./obb-collision-detection":189,"dup":73}],191:[function(require,module,exports){
arguments[4][74][0].apply(exports,arguments)
},{"./src/aabb-contact-calculation":192,"./src/capsule-contact-calculation":193,"./src/obb-contact-calculation":194,"./src/sphere-contact-calculation":195,"dup":74}],192:[function(require,module,exports){
arguments[4][75][0].apply(exports,arguments)
},{"../../../util":209,"../../collision-detection":186,"./capsule-contact-calculation":193,"./obb-contact-calculation":194,"./sphere-contact-calculation":195,"dup":75}],193:[function(require,module,exports){
arguments[4][76][0].apply(exports,arguments)
},{"../../../util":209,"./obb-contact-calculation":194,"dup":76}],194:[function(require,module,exports){
arguments[4][77][0].apply(exports,arguments)
},{"../../../util":209,"../../collidables":179,"../../collision-detection":186,"./aabb-contact-calculation":192,"dup":77}],195:[function(require,module,exports){
arguments[4][78][0].apply(exports,arguments)
},{"../../../util":209,"./aabb-contact-calculation":192,"./capsule-contact-calculation":193,"./obb-contact-calculation":194,"dup":78}],196:[function(require,module,exports){
arguments[4][79][0].apply(exports,arguments)
},{"./collidables":179,"./collision-detection":186,"./contact-calculation":191,"./src/collidable-factories":197,"./src/collidable-physics-job":198,"./src/collidable-store":199,"./src/collision-handler":200,"./src/collision-utils":201,"dup":79}],197:[function(require,module,exports){
arguments[4][80][0].apply(exports,arguments)
},{"../../util":209,"../collidables":179,"dup":80}],198:[function(require,module,exports){
arguments[4][81][0].apply(exports,arguments)
},{"../../src/physics-job":207,"../../util":209,"./collidable-factories":197,"./collidable-store":199,"dup":81}],199:[function(require,module,exports){
arguments[4][82][0].apply(exports,arguments)
},{"./collision-utils":201,"dup":82}],200:[function(require,module,exports){
arguments[4][83][0].apply(exports,arguments)
},{"../../util":209,"./collidable-store":199,"./collision-utils":201,"dup":83}],201:[function(require,module,exports){
arguments[4][84][0].apply(exports,arguments)
},{"../collidables":179,"../collision-detection":186,"../contact-calculation":191,"dup":84}],202:[function(require,module,exports){
arguments[4][85][0].apply(exports,arguments)
},{"./collisions":196,"./integrator":203,"./src/physics-engine":206,"./src/physics-job":207,"./src/physics-state":208,"./util":209,"dup":85}],203:[function(require,module,exports){
arguments[4][86][0].apply(exports,arguments)
},{"./src/integrator":204,"./src/rk4-integrator":205,"dup":86}],204:[function(require,module,exports){
arguments[4][87][0].apply(exports,arguments)
},{"dup":87}],205:[function(require,module,exports){
arguments[4][88][0].apply(exports,arguments)
},{"../../src/physics-state":208,"../../util":209,"./integrator":204,"dup":88}],206:[function(require,module,exports){
arguments[4][89][0].apply(exports,arguments)
},{"../collisions":196,"../integrator":203,"../util":209,"./physics-state":208,"dup":89,"lsl-animatex":170}],207:[function(require,module,exports){
arguments[4][90][0].apply(exports,arguments)
},{"../util":209,"./physics-engine":206,"./physics-state":208,"dup":90,"lsl-animatex":170}],208:[function(require,module,exports){
arguments[4][91][0].apply(exports,arguments)
},{"../util":209,"dup":91}],209:[function(require,module,exports){
arguments[4][92][0].apply(exports,arguments)
},{"./src/force-utils":210,"./src/geometry":211,"./src/inertia-tensor-utils":212,"./src/util":213,"dup":92}],210:[function(require,module,exports){
arguments[4][93][0].apply(exports,arguments)
},{"dup":93}],211:[function(require,module,exports){
arguments[4][94][0].apply(exports,arguments)
},{"dup":94}],212:[function(require,module,exports){
arguments[4][95][0].apply(exports,arguments)
},{"./geometry":211,"dup":95}],213:[function(require,module,exports){
arguments[4][96][0].apply(exports,arguments)
},{"dup":96}],214:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cameraTypeMap = exports.cameraConfigUpdaters = exports.followCameraConfig = exports.firstPersonCameraConfig = exports.fixedCameraConfig = exports.cameraConfig = undefined;

var _gamex = require('gamex');

var cameraConfig = {}; /**
                        * This module handles configuration parameters relating to the camera. This uses the dat.GUI
                        * package.
                        */

// TODO: Tie this into the folder-config system.

cameraConfig.fovY = {
  start: (0, _gamex.degToRad)(70.0),
  min: 0.0,
  max: 3.1415
};
cameraConfig.defaultAspectRatio = {
  start: 16 / 9,
  min: 0.01,
  max: 8.0
};
cameraConfig._zNear = 0.1;
cameraConfig._zFar = 4000;
cameraConfig._defaultLookAtDirection = vec3.fromValues(0, 0, -1);
cameraConfig.cameraType = {
  start: 'thirdPersonSpring',
  options: ['firstPerson', 'thirdPersonSpring', 'thirdPersonFixed', 'fixed']
};

var cameraTypeMap = {
  'firstPerson': _gamex.FirstPersonCamera,
  'thirdPersonFixed': _gamex.FixedFollowCamera,
  'thirdPersonSpring': _gamex.SpringFollowCamera,
  'fixed': _gamex.FixedCamera
};

var fixedCameraConfig = {};

fixedCameraConfig.position = {
  start: vec3.fromValues(0, -40, 5),
  min: vec3.fromValues(-200, -200, -200),
  max: vec3.fromValues(200, 200, 200)
};
fixedCameraConfig.viewDirection = {
  start: vec3.fromValues(0, 1, -.5),
  min: vec3.fromValues(-1, -1, -1),
  max: vec3.fromValues(1, 1, 1)
};
fixedCameraConfig._up = vec3.fromValues(0, 0, 1);

var firstPersonCameraConfig = {};

firstPersonCameraConfig.intendedDisplacementFromTarget = vec3.fromValues(0, 0.3, -0.8);
firstPersonCameraConfig.viewDirection = vec3.fromValues(0, 0, -1);
firstPersonCameraConfig.targetDistance = 10;

var followCameraConfig = {};

followCameraConfig.springCoefficient = 0.0004;
followCameraConfig.dampingCoefficient = 0.04;

followCameraConfig.intendedDistanceFromTarget = {
  start: 5,
  min: 0,
  max: 100
};
followCameraConfig.intendedRotationAngleFromTarget = {
  start: -Math.PI * .075,
  min: 0,
  max: 2 * Math.PI
};
followCameraConfig.intendedRotationAxisFromTarget = vec3.fromValues(1, 0, 0);
followCameraConfig._intendedTranslationFromTarget = vec3.create();

function updateIntendedTranslationFromTarget() {
  var transformation = mat4.create();
  mat4.rotate(transformation, transformation, followCameraConfig.intendedRotationAngleFromTarget, followCameraConfig.intendedRotationAxisFromTarget);
  mat4.translate(transformation, transformation, vec3.fromValues(0, 0, followCameraConfig.intendedDistanceFromTarget));
  vec3.transformMat4(followCameraConfig._intendedTranslationFromTarget, followCameraConfig._intendedTranslationFromTarget, transformation);
}

var normalizeFirstPersonViewDirection = function normalizeFirstPersonViewDirection() {
  return vec3.normalize(firstPersonCameraConfig.viewDirection, firstPersonCameraConfig.viewDirection);
};
var normalizeFixedViewDirection = function normalizeFixedViewDirection() {
  return vec3.normalize(fixedCameraConfig.viewDirection, fixedCameraConfig.viewDirection);
};
var normalizeDefaultLookAtDirection = function normalizeDefaultLookAtDirection() {
  return vec3.normalize(cameraConfig._defaultLookAtDirection, cameraConfig._defaultLookAtDirection);
};

var cameraConfigUpdaters = {
  updateIntendedTranslationFromTarget: updateIntendedTranslationFromTarget,
  normalizeFirstPersonViewDirection: normalizeFirstPersonViewDirection,
  normalizeFixedViewDirection: normalizeFixedViewDirection,
  normalizeDefaultLookAtDirection: normalizeDefaultLookAtDirection
};

normalizeDefaultLookAtDirection();

exports.cameraConfig = cameraConfig;
exports.fixedCameraConfig = fixedCameraConfig;
exports.firstPersonCameraConfig = firstPersonCameraConfig;
exports.followCameraConfig = followCameraConfig;
exports.cameraConfigUpdaters = cameraConfigUpdaters;
exports.cameraTypeMap = cameraTypeMap;

},{"gamex":118}],215:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.followCameraFolderConfig = exports.fixedCameraFolderConfig = exports.firstPersonCameraFolderConfig = exports.cameraFolderConfig = undefined;

var _cameraConfig = require('./camera-config');

/**
 * This module configures the camera dat.GUI menu folder.
 */

var firstPersonCameraFolderConfig = {
  label: 'First-person camera',
  config: _cameraConfig.firstPersonCameraConfig,
  isOpen: false,
  onChangeListeners: {
    'viewDirection': _cameraConfig.cameraConfigUpdaters.normalizeFirstPersonViewDirection
  }
};

var fixedCameraFolderConfig = {
  label: 'Fixed camera',
  config: _cameraConfig.fixedCameraConfig,
  isOpen: false,
  onChangeListeners: {
    'viewDirection': _cameraConfig.cameraConfigUpdaters.normalizeFixedViewDirection
  }
};

var followCameraFolderConfig = {
  label: 'Follow camera',
  config: _cameraConfig.followCameraConfig,
  isOpen: false,
  onChangeListeners: {
    'intendedDistanceFromTarget': _cameraConfig.cameraConfigUpdaters.updateIntendedTranslationFromTarget,
    'intendedRotationAngleFromTarget': _cameraConfig.cameraConfigUpdaters.updateIntendedTranslationFromTarget,
    'intendedRotationAxisFromTarget': _cameraConfig.cameraConfigUpdaters.updateIntendedTranslationFromTarget
  }
};

var cameraFolderConfig = {
  label: 'Camera',
  config: _cameraConfig.cameraConfig,
  isOpen: false,
  childFolders: [followCameraFolderConfig, firstPersonCameraFolderConfig, fixedCameraFolderConfig]
};

exports.cameraFolderConfig = cameraFolderConfig;
exports.firstPersonCameraFolderConfig = firstPersonCameraFolderConfig;
exports.fixedCameraFolderConfig = fixedCameraFolderConfig;
exports.followCameraFolderConfig = followCameraFolderConfig;

},{"./camera-config":214}]},{},[107])

//# sourceMappingURL=dynamics.js.map
