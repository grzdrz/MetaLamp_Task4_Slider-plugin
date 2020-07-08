/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pages/TestPage.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/RangeSlider/RangeSlider.scss":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/RangeSlider/RangeSlider.scss ***!
  \****************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/pages/TestPage.scss":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/pages/TestPage.scss ***!
  \********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./src/components/RangeSlider/Events/Event.ts":
/*!****************************************************!*\
  !*** ./src/components/RangeSlider/Events/Event.ts ***!
  \****************************************************/
/*! exports provided: Event */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Event", function() { return Event; });
/* harmony import */ var _EventArgs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventArgs */ "./src/components/RangeSlider/Events/EventArgs.ts");

class Event {
    /* public publisher: Object; */
    constructor( /* public publisher: Object */) {
        this.handlers = new Array();
    }
    invoke(args) {
        this.handlers.forEach(eh => {
            if (args) {
                eh(args);
            }
            else {
                eh(new _EventArgs__WEBPACK_IMPORTED_MODULE_0__["EventArgs"]()); //можно издавать ивенты не требовательные к входным данным
            }
        });
    }
    subscribe(handler) {
        this.handlers.push(handler);
    }
}



/***/ }),

/***/ "./src/components/RangeSlider/Events/EventArgs.ts":
/*!********************************************************!*\
  !*** ./src/components/RangeSlider/Events/EventArgs.ts ***!
  \********************************************************/
/*! exports provided: OptionsEventArgs, OptionsToUpdateEventArgs, EventArgs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptionsEventArgs", function() { return OptionsEventArgs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptionsToUpdateEventArgs", function() { return OptionsToUpdateEventArgs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventArgs", function() { return EventArgs; });
class EventArgs {
}
class OptionsEventArgs extends EventArgs {
    constructor() {
        super(...arguments);
        this.options = undefined;
    }
}
class OptionsToUpdateEventArgs extends EventArgs {
    constructor(options) {
        super();
        this.options = options;
    }
}



/***/ }),

/***/ "./src/components/RangeSlider/Helpers/MathFunctions.ts":
/*!*************************************************************!*\
  !*** ./src/components/RangeSlider/Helpers/MathFunctions.ts ***!
  \*************************************************************/
/*! exports provided: MathFunctions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MathFunctions", function() { return MathFunctions; });
class MathFunctions {
    /* constructor(){

    } */
    // доп. обработка значения, на случай если шаг дробный для того чтобы убрать лишние дробные значения
    static cutOffJunkValuesFromFraction(value, stepSize) {
        // переводим значение шага в строку(попутно проверяя на наличие формата с экспонентой если дробь длинная)
        let stringOfNumber = "";
        if (this.hasEInNumber(stepSize)) {
            stringOfNumber = this.getStringOfNumberWithoutE(stepSize);
        }
        else
            stringOfNumber = stepSize.toString();
        // выделяем дробную часть
        let fractionalPart = stringOfNumber.split(".")[1];
        // если дробная часть существует, то округляем значение до длины дробной части шага,
        // тем самым отрезая мусорные значения дроби, которые переодически появляются из-за неточностей при работе js с десятичными числами
        if (fractionalPart) {
            let countOfNumbers = fractionalPart.length;
            return Number.parseFloat(value.toFixed(countOfNumbers));
        }
        else
            return value;
    }
    // заменяет строку с числом в формате с экспонентой на строку с числом в обычном формате
    // например "1e-9" -> на выходе получаем "0.000000001"
    // p.s. код стырен со стаковерфлове
    static getStringOfNumberWithoutE(number) {
        let numberParts = number.toString().split(/[eE]/);
        if (numberParts.length === 1)
            return numberParts[0];
        let z = "";
        let sign = number < 0 ? '-' : '';
        let str = numberParts[0].replace('.', '');
        let mag = Number(numberParts[1]) + 1;
        if (mag < 0) {
            z = sign + '0.';
            while (mag++)
                z += '0';
            return z + str.replace(/^\-/, '');
        }
        mag -= str.length;
        while (mag--)
            z += '0';
        return str + z;
    }
    // проверка на запись очень большого(или маленького) числа через e(например 1e-10)
    static hasEInNumber(number) {
        let splitByE = number.toString().split("e");
        return splitByE.length === 2;
    }
}



/***/ }),

/***/ "./src/components/RangeSlider/Helpers/Vector.js":
/*!******************************************************!*\
  !*** ./src/components/RangeSlider/Helpers/Vector.js ***!
  \******************************************************/
/*! exports provided: Vector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector", function() { return Vector; });
class Vector {
    constructor(x, y) {
        if (!x && x !== 0)
            throw new Error("wrong x value in constructor");
        if (!y && y !== 0)
            throw new Error("wrong y value in constructor");
        this._x = (x !== undefined ? x : 0);
        this._y = (y !== undefined ? y : 0);
    }

    get width() {
        return this._x;
    }
    set width(value) {
        this._x = (!value && value !== 0 ? this._x : value);
    }

    get height() {
        return this._y;
    }
    set height(value) {
        this._y = (!value && value !== 0 ? this._y : value);
    }

    get x() {
        return this._x;
    }
    set x(value) {
        this._x = (!value && value !== 0 ? this._x : value);
    }

    get y() {
        return this._y;
    }
    set y(value) {
        this._y = (!value && value !== 0 ? this._y : value);
    }

    static sumWith(vector) {
        if (vector instanceof Vector) {
            this._x += (vector.x !== undefined ? vector.x : this._x);
            this._y += (vector.y !== undefined ? vector.y : this._y);
        }
        else throw new Error("not a vector");
    }

    static sum(vector1, vector2) {
        if ((!vector1.x && vector1.x !== 0) || (!vector1.y && vector1.y !== 0))
            throw new Error("wrong vector1");
        else if ((!vector2.x && vector2.x !== 0) || (!vector2.y && vector2.y !== 0))
            throw new Error("wrong vector2");

        return new Vector(
            vector1.x + vector2.x,
            vector1.y + vector2.y
        );
    }

    subtract(vector) {//из текущего вычитает вектор аргумент
        if ((!vector.x && vector.x !== 0) || (!vector.y && vector.y !== 0))
            throw new Error("wrong vector");

        return new Vector(
            this._x - vector.x,
            this._y - vector.y
        );
    }

    multiplyByNumber(number) {
        return new Vector(
            this._x * number,
            this._y * number
        );
    }

    get length() {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }
}

/***/ }),

/***/ "./src/components/RangeSlider/Helpers/Vector.ts":
/*!******************************************************!*\
  !*** ./src/components/RangeSlider/Helpers/Vector.ts ***!
  \******************************************************/
/*! exports provided: Vector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector", function() { return Vector; });
class Vector {
    constructor(x, y) {
        this._x = 0;
        this._y = 0;
        this._x = x;
        this._y = y;
    }
    get width() {
        return this._x;
    }
    set width(value) {
        this._x = (!value && value !== 0 ? this._x : value);
    }
    get height() {
        return this._y;
    }
    set height(value) {
        this._y = (!value && value !== 0 ? this._y : value);
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = (!value && value !== 0 ? this._x : value);
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = (!value && value !== 0 ? this._y : value);
    }
    sum(vector) {
        return new Vector(this._x + vector.x, this._y + vector.y);
    }
    subtract(vector) {
        return new Vector(this._x - vector.x, this._y - vector.y);
    }
    multiplyByNumber(number) {
        return new Vector(this._x * number, this._y * number);
    }
    get length() {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }
    static calculateVector(length, angle) {
        return new Vector(length * Math.cos(angle), length * Math.sin(angle));
    }
}



/***/ }),

/***/ "./src/components/RangeSlider/MVP/Model/Model.ts":
/*!*******************************************************!*\
  !*** ./src/components/RangeSlider/MVP/Model/Model.ts ***!
  \*******************************************************/
/*! exports provided: Model */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Model", function() { return Model; });
/* harmony import */ var _Options_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Options.js */ "./src/components/RangeSlider/MVP/Model/Options.js");

class Model {
    constructor(options) {
        this._options = options;
    }
    /* getOptions(): Options {
        return new Options(this._options);
    } */
    getOptions(args) {
        args.options = new _Options_js__WEBPACK_IMPORTED_MODULE_0__["Options"](this._options);
    }
    updateOptions(options) {
        this._options.update(options);
    }
}



/***/ }),

/***/ "./src/components/RangeSlider/MVP/Model/Options.js":
/*!*********************************************************!*\
  !*** ./src/components/RangeSlider/MVP/Model/Options.js ***!
  \*********************************************************/
/*! exports provided: Options */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Options", function() { return Options; });
class Options {
    constructor(options) {
        this.id = 0;

        this.sliderStripLength = (options.sliderStripLength !== undefined ? options.sliderStripLength : 500);
        this.sliderStripThickness = (options.sliderStripThickness !== undefined ? options.sliderStripThickness : 10);
        this.handleWidth = (options.handleWidth !== undefined ? options.handleWidth : 15);
        this.handleHeight = (options.handleHeight !== undefined ? options.handleHeight : 15);
        this.minValue = (options.minValue !== undefined ? options.minValue : -100);
        this.maxValue = (options.maxValue !== undefined ? options.maxValue : 100);
        this.borderThickness = (options.borderThickness !== undefined ? options.borderThickness : 5);
        this.firstValue = (options.firstValue !== undefined ? options.firstValue : 0);
        this.lastValue = (options.lastValue !== undefined ? options.lastValue : 50);
        this.stepSize = (options.stepSize !== undefined ? options.stepSize : 10);
        this.hasTwoSlider = (options.hasTwoSlider !== undefined ? options.hasTwoSlider : false);
        this.isInterval = (options.isInterval !== undefined ? options.isInterval : true);
        this.maxSegmentsCount = (options.maxSegmentsCount !== undefined ? options.maxSegmentsCount : 10);
        this.scaleFontSize = (options.scaleFontSize !== undefined ? options.scaleFontSize : 20);
        this.angle = (options.angle !== undefined ? options.angle : 0);
    }

    get angleInRad() {
        return this.angle * (Math.PI / 180);
    }
}

/***/ }),

/***/ "./src/components/RangeSlider/MVP/Model/Options.ts":
/*!*********************************************************!*\
  !*** ./src/components/RangeSlider/MVP/Model/Options.ts ***!
  \*********************************************************/
/*! exports provided: Options */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Options", function() { return Options; });
;
class Options {
    constructor(options) {
        this.sliderStripLength = 500;
        this.sliderStripThickness = 10;
        this.handleWidth = 15;
        this.handleHeight = 15;
        this.minValue = -100;
        this.maxValue = 100;
        this.borderThickness = 5;
        this.firstValue = 0;
        this.lastValue = 50;
        this.stepSize = 10;
        this.hasTwoSlider = false;
        this.isInterval = true;
        this.maxSegmentsCount = 10;
        this.scaleFontSize = 20;
        this.angle = 0;
        this.id = 0;
        this.update(options);
    }
    update(options) {
        this.sliderStripLength = (options.sliderStripLength !== undefined ? options.sliderStripLength : this.sliderStripLength);
        this.sliderStripThickness = (options.sliderStripThickness !== undefined ? options.sliderStripThickness : this.sliderStripThickness);
        this.handleWidth = (options.handleWidth !== undefined ? options.handleWidth : this.handleWidth);
        this.handleHeight = (options.handleHeight !== undefined ? options.handleHeight : this.handleHeight);
        this.minValue = (options.minValue !== undefined ? options.minValue : this.minValue);
        this.maxValue = (options.maxValue !== undefined ? options.maxValue : this.maxValue);
        this.borderThickness = (options.borderThickness !== undefined ? options.borderThickness : this.borderThickness);
        this.firstValue = (options.firstValue !== undefined ? options.firstValue : this.firstValue);
        this.lastValue = (options.lastValue !== undefined ? options.lastValue : this.lastValue);
        this.stepSize = (options.stepSize !== undefined ? options.stepSize : this.stepSize);
        this.hasTwoSlider = (options.hasTwoSlider !== undefined ? options.hasTwoSlider : this.hasTwoSlider);
        this.isInterval = (options.isInterval !== undefined ? options.isInterval : this.isInterval);
        this.maxSegmentsCount = (options.maxSegmentsCount !== undefined ? options.maxSegmentsCount : this.maxSegmentsCount);
        this.scaleFontSize = (options.scaleFontSize !== undefined ? options.scaleFontSize : this.scaleFontSize);
        this.angle = (options.angle !== undefined ? options.angle : this.angle);
    }
    get angleInRad() {
        return this.angle * (Math.PI / 180);
    }
}



/***/ }),

/***/ "./src/components/RangeSlider/MVP/Presenter.ts":
/*!*****************************************************!*\
  !*** ./src/components/RangeSlider/MVP/Presenter.ts ***!
  \*****************************************************/
/*! exports provided: Presenter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Presenter", function() { return Presenter; });
class Presenter {
    constructor(model, sliderView, inputsView, scaleView, optionsPanelView) {
        this.model = model;
        this.sliderView = sliderView;
        this.inputsView = inputsView;
        this.scaleView = scaleView;
        this.optionsPanelView = optionsPanelView;
        this.handlerGetModelData = this.handlerGetModelData.bind(this);
        this.sliderView.onGetModelData.subscribe(this.handlerGetModelData);
        this.inputsView.onGetModelData.subscribe(this.handlerGetModelData);
        this.scaleView.onGetModelData.subscribe(this.handlerGetModelData);
        this.optionsPanelView.onGetModelData.subscribe(this.handlerGetModelData);
        this.handlerHandleMove = this.handlerHandleMove.bind(this);
        this.sliderView.onHandleMove.subscribe(this.handlerHandleMove);
        //this.onModelOptionUpdate = this.onModelOptionUpdate.bind(this);
        //(<SliderView>this.sliderView).onModelOptionUpdate = this.onModelOptionUpdate;
        this.handlerInputChange = this.handlerInputChange.bind(this);
        this.inputsView.onInputsChange.subscribe(this.handlerInputChange);
        this.handlerScaleSegmentClick = this.handlerScaleSegmentClick.bind(this);
        this.scaleView.onScaleSegmentClick.subscribe(this.handlerScaleSegmentClick);
        this.handlerModelStateUpdate = this.handlerModelStateUpdate.bind(this);
        this.optionsPanelView.onModelStateUpdate.subscribe(this.handlerModelStateUpdate);
        this.initialize();
    }
    initialize() {
        this.sliderView.initialize();
        this.inputsView.initialize();
        this.scaleView.initialize();
        this.optionsPanelView.initialize();
    }
    handlerGetModelData(args) {
        this.model.getOptions(args);
    }
    /* public onModelOptionUpdate(data: IOptions) {
        this.model.updateOptions(data);
    } */
    handlerHandleMove(args) {
        this.model.updateOptions(args.options);
        this.inputsView.update();
    }
    handlerInputChange(args) {
        this.model.updateOptions(args.options);
        this.sliderView.update(false);
    }
    handlerScaleSegmentClick(args) {
        this.model.updateOptions(args.options);
        this.sliderView.update(false);
        this.inputsView.update();
    }
    handlerModelStateUpdate(args) {
        this.model.updateOptions(args.options);
        this.sliderView.update(true);
        this.scaleView.update(true);
        this.inputsView.update();
        this.optionsPanelView.update();
    }
}



/***/ }),

/***/ "./src/components/RangeSlider/MVP/Views/InputsView.ts":
/*!************************************************************!*\
  !*** ./src/components/RangeSlider/MVP/Views/InputsView.ts ***!
  \************************************************************/
/*! exports provided: InputsView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputsView", function() { return InputsView; });
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View */ "./src/components/RangeSlider/MVP/Views/View.ts");
/* harmony import */ var _Events_Event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Events/Event */ "./src/components/RangeSlider/Events/Event.ts");
/* harmony import */ var _Events_EventArgs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Events/EventArgs */ "./src/components/RangeSlider/Events/EventArgs.ts");



class InputsView extends _View__WEBPACK_IMPORTED_MODULE_0__["View"] {
    constructor(inputsContainer) {
        super();
        this.containerElement = inputsContainer;
        this.handlerFirstInputChange = this.handlerFirstInputChange.bind(this);
        this.handlerLastInputChange = this.handlerLastInputChange.bind(this);
        /* this.onInputChange = () => { }; */
        this.onInputsChange = new _Events_Event__WEBPACK_IMPORTED_MODULE_1__["Event"]();
    }
    initialize() {
        this._render();
    }
    update() {
        let modelData = this.getModelData();
        if (!this.firstInputDOMElement)
            throw new Error("this.firstInputDOMElement not exist");
        modelData.firstValue !== undefined ? this.firstInputDOMElement.value = (modelData.firstValue).toString() : this.firstInputDOMElement.value;
        if (this.lastInputDOMElement)
            modelData.lastValue !== undefined ? this.lastInputDOMElement.value = (modelData.lastValue).toString() : this.lastInputDOMElement.value;
    }
    _render() {
        let modelData = this.getModelData();
        this.firstInputDOMElement = document.createElement("input");
        this.firstInputDOMElement.className = "range-slider__first-input";
        this.containerElement.append(this.firstInputDOMElement);
        if (modelData.hasTwoSlider) {
            this.lastInputDOMElement = document.createElement("input");
            this.lastInputDOMElement.className = "range-slider__last-input";
            this.containerElement.append(this.lastInputDOMElement);
        }
        this.firstInputDOMElement.addEventListener("change", this.handlerFirstInputChange);
        if (this.lastInputDOMElement)
            this.lastInputDOMElement.addEventListener("change", this.handlerLastInputChange);
        this.update();
    }
    handlerFirstInputChange(event) {
        let modelData = this.getModelData();
        let targetElement = event.currentTarget;
        if (!targetElement)
            throw new Error();
        let value = Number.parseFloat(targetElement.value);
        if (!value && value !== 0) {
            value = modelData.minValue;
        }
        if (modelData.hasTwoSlider) {
            if (value > modelData.maxValue || value > modelData.lastValue)
                value = modelData.lastValue;
            else if (value < modelData.minValue)
                value = modelData.minValue;
        }
        else {
            if (value > modelData.maxValue)
                value = modelData.maxValue;
            else if (value < modelData.minValue)
                value = modelData.minValue;
        }
        targetElement.value = value.toString();
        this.onInputsChange.invoke(new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_2__["OptionsToUpdateEventArgs"]({ firstValue: value }));
        /* this.onInputChange({
            firstValue: value
        }); */
    }
    handlerLastInputChange(event) {
        let modelData = this.getModelData(); //this.getModelData();
        let targetElement = event.currentTarget;
        if (!targetElement)
            throw new Error();
        let value = Number.parseFloat(targetElement.value);
        if (!value && value !== 0) {
            value = modelData.maxValue;
        }
        if (value > modelData.maxValue)
            value = modelData.maxValue;
        else if (value < modelData.minValue || value < modelData.firstValue)
            value = modelData.firstValue;
        targetElement.value = value.toString();
        this.onInputsChange.invoke(new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_2__["OptionsToUpdateEventArgs"]({ lastValue: value }));
        /* this.onInputChange({
            lastValue: value
        }); */
    }
}



/***/ }),

/***/ "./src/components/RangeSlider/MVP/Views/OptionsPanelView.ts":
/*!******************************************************************!*\
  !*** ./src/components/RangeSlider/MVP/Views/OptionsPanelView.ts ***!
  \******************************************************************/
/*! exports provided: OptionsPanelView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptionsPanelView", function() { return OptionsPanelView; });
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View */ "./src/components/RangeSlider/MVP/Views/View.ts");
/* harmony import */ var _Events_Event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Events/Event */ "./src/components/RangeSlider/Events/Event.ts");
/* harmony import */ var _Events_EventArgs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Events/EventArgs */ "./src/components/RangeSlider/Events/EventArgs.ts");



class OptionsPanelView extends _View__WEBPACK_IMPORTED_MODULE_0__["View"] {
    constructor(containerElement) {
        super();
        this.containerElement = containerElement;
        /* public containerElement: HTMLElement; */
        this.onModelStateUpdate = new _Events_Event__WEBPACK_IMPORTED_MODULE_1__["Event"]();
        /* this.containerElement = containerElement; */
        this._handlerStepSizeChange = this._handlerStepSizeChange.bind(this);
        this._handlerMaxValueChange = this._handlerMaxValueChange.bind(this);
        this._handlerMinValueChange = this._handlerMinValueChange.bind(this);
        this._handlerHandlsCountChange = this._handlerHandlsCountChange.bind(this);
        this._handlerMaxSegmentsCountChange = this._handlerMaxSegmentsCountChange.bind(this);
        this._handlerAngleSizeChange = this._handlerAngleSizeChange.bind(this);
        this.update = this.update.bind(this);
        //this.onModelStateUpdate = () => { };
    }
    initialize() {
        this._render();
    }
    update() {
    }
    _render() {
        let modelData = this.getModelData();
        //размер шага
        let stepSizeLabel = document.createElement("label");
        {
            stepSizeLabel.className = "range-slider__inputs-label";
            let stepSizeInput = document.createElement("input");
            stepSizeInput.type = "number";
            stepSizeInput.step = "0.5";
            stepSizeInput.value = modelData.stepSize.toString();
            stepSizeInput.className = "range-slider__step-size-input";
            let stepSizeText = document.createElement("p");
            stepSizeText.className = "range-slider__step-size-text";
            stepSizeText.textContent = "step size";
            stepSizeLabel.append(stepSizeInput);
            stepSizeLabel.append(stepSizeText);
            stepSizeLabel.addEventListener("change", this._handlerStepSizeChange);
        }
        //1 ползунок/2 ползунка
        let handlesCountContainer = document.createElement("div");
        let oneHandleLabel = document.createElement("label");
        let twoHandlesLabel = document.createElement("label");
        {
            handlesCountContainer.className = "range-slider__handles-count-container";
            //1 ползунок
            oneHandleLabel.className = "range-slider__inputs-label";
            oneHandleLabel.dataset.handlesCount = "1";
            let oneHandleInput = document.createElement("input");
            oneHandleInput.name = "handlesCount_" + modelData.id;
            oneHandleInput.type = "radio";
            oneHandleInput.checked = !modelData.hasTwoSlider;
            oneHandleInput.className = "range-slider__handles-count-input";
            let oneHandleText = document.createElement("p");
            oneHandleText.className = "range-slider__handles-count-text";
            oneHandleText.textContent = "one handle";
            oneHandleLabel.append(oneHandleInput);
            oneHandleLabel.append(oneHandleText);
            oneHandleLabel.addEventListener("change", this._handlerHandlsCountChange);
            //2 ползунка
            twoHandlesLabel.className = "range-slider__inputs-label";
            twoHandlesLabel.dataset.handlesCount = "2";
            let twoHandlesInput = document.createElement("input");
            twoHandlesInput.name = "handlesCount_" + modelData.id;
            twoHandlesInput.type = "radio";
            twoHandlesInput.checked = modelData.hasTwoSlider;
            twoHandlesInput.className = "range-slider__handles-count-input";
            let twoHandlesText = document.createElement("p");
            twoHandlesText.className = "range-slider__handles-count-text";
            twoHandlesText.textContent = "two handles";
            twoHandlesLabel.append(twoHandlesInput);
            twoHandlesLabel.append(twoHandlesText);
            twoHandlesLabel.addEventListener("change", this._handlerHandlsCountChange);
            handlesCountContainer.append(oneHandleLabel);
            handlesCountContainer.append(twoHandlesLabel);
        }
        //максимальное значение
        let maxValueLabel = document.createElement("label");
        {
            maxValueLabel.className = "range-slider__inputs-label";
            let maxValueInput = document.createElement("input");
            maxValueInput.type = "number";
            maxValueInput.step = "1";
            maxValueInput.value = modelData.maxValue.toString();
            maxValueInput.className = "range-slider__max-value-input";
            let maxValueText = document.createElement("p");
            maxValueText.className = "range-slider__max-value-text";
            maxValueText.textContent = "max value";
            maxValueLabel.append(maxValueInput);
            maxValueLabel.append(maxValueText);
            maxValueLabel.addEventListener("change", this._handlerMaxValueChange);
        }
        //минимальное значение
        let minValueLabel = document.createElement("label");
        {
            minValueLabel.className = "range-slider__inputs-label";
            let minValueInput = document.createElement("input");
            minValueInput.type = "number";
            minValueInput.step = "1";
            minValueInput.value = modelData.minValue.toString();
            minValueInput.className = "range-slider__min-value-input";
            let minValueText = document.createElement("p");
            minValueText.className = "range-slider__min-value-text";
            minValueText.textContent = "min value";
            minValueLabel.append(minValueInput);
            minValueLabel.append(minValueText);
            minValueLabel.addEventListener("change", this._handlerMinValueChange);
        }
        let maxSegmentsCountLabel = document.createElement("label");
        {
            maxSegmentsCountLabel.className = "range-slider__inputs-label";
            let maxSegmentsCountInput = document.createElement("input");
            maxSegmentsCountInput.type = "number";
            maxSegmentsCountInput.step = "1";
            maxSegmentsCountInput.value = modelData.maxSegmentsCount.toString();
            maxSegmentsCountInput.className = "range-slider__max-value-input";
            let maxSegmentsCountText = document.createElement("p");
            maxSegmentsCountText.className = "range-slider__max-value-text";
            maxSegmentsCountText.textContent = "maximum segments count";
            maxSegmentsCountLabel.append(maxSegmentsCountInput);
            maxSegmentsCountLabel.append(maxSegmentsCountText);
            maxSegmentsCountLabel.addEventListener("change", this._handlerMaxSegmentsCountChange);
        }
        let angleSizeLabel = document.createElement("label");
        {
            angleSizeLabel.className = "range-slider__inputs-label";
            let angleSizeCountInput = document.createElement("input");
            angleSizeCountInput.type = "number";
            angleSizeCountInput.step = "1";
            angleSizeCountInput.value = modelData.angle.toString();
            angleSizeCountInput.className = "range-slider__angle-size-input";
            let angleSizeCountText = document.createElement("p");
            angleSizeCountText.className = "range-slider__angle-size-text";
            angleSizeCountText.textContent = "angle size";
            angleSizeLabel.append(angleSizeCountInput);
            angleSizeLabel.append(angleSizeCountText);
            angleSizeLabel.addEventListener("change", this._handlerAngleSizeChange);
        }
        this.containerElement.append(stepSizeLabel);
        this.containerElement.append(maxValueLabel);
        this.containerElement.append(minValueLabel);
        this.containerElement.append(handlesCountContainer);
        this.containerElement.append(maxSegmentsCountLabel);
        this.containerElement.append(angleSizeLabel);
    }
    _handlerStepSizeChange(event) {
        event.preventDefault();
        let currentLabel = event.currentTarget;
        if (!currentLabel)
            throw new Error("some shit with step size change event");
        let input = currentLabel.querySelector("input");
        if (!input)
            throw new Error("input not exist");
        let inputValue = Number.parseFloat(input.value);
        if (inputValue <= 0) {
            inputValue = 0.1;
            input.value = inputValue.toString();
        }
        let optionsToUpdate = {
            stepSize: inputValue,
        };
        //this.onModelStateUpdate(optionsToUpdate);
        this.onModelStateUpdate.invoke(new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_2__["OptionsToUpdateEventArgs"](optionsToUpdate));
    }
    _handlerMaxValueChange(event) {
        event.preventDefault();
        let currentLabel = event.currentTarget;
        if (!currentLabel)
            throw new Error("some shit with max value change event");
        let input = currentLabel.querySelector("input");
        if (!input)
            throw new Error("input not exist");
        let inputValue = Number.parseFloat(input.value);
        let optionsToUpdate = {
            maxValue: inputValue,
        };
        //this.onModelStateUpdate(optionsToUpdate);
        this.onModelStateUpdate.invoke(new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_2__["OptionsToUpdateEventArgs"](optionsToUpdate));
    }
    _handlerMinValueChange(event) {
        event.preventDefault();
        let currentLabel = event.currentTarget;
        if (!currentLabel)
            throw new Error("some shit with min value change event");
        let input = currentLabel.querySelector("input");
        if (!input)
            throw new Error("input not exist");
        let inputValue = Number.parseFloat(input.value);
        let optionsToUpdate = {
            minValue: inputValue,
        };
        //this.onModelStateUpdate(optionsToUpdate);
        this.onModelStateUpdate.invoke(new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_2__["OptionsToUpdateEventArgs"](optionsToUpdate));
    }
    _handlerHandlsCountChange(event) {
        event.preventDefault();
        let currentLabel = event.currentTarget;
        if (!currentLabel)
            throw new Error("some shit with handls count change event");
        let handlesCount = currentLabel.dataset.handlesCount;
        if (!handlesCount)
            throw new Error("some shit with handls count change event");
        let optionsToUpdate;
        if (Number.parseInt(handlesCount) === 1) {
            optionsToUpdate = {
                hasTwoSlider: false,
            };
        }
        else {
            optionsToUpdate = {
                hasTwoSlider: true,
            };
        }
        //this.onModelStateUpdate(optionsToUpdate);
        this.onModelStateUpdate.invoke(new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_2__["OptionsToUpdateEventArgs"](optionsToUpdate));
    }
    _handlerMaxSegmentsCountChange(event) {
        event.preventDefault();
        let currentLabel = event.currentTarget;
        if (!currentLabel)
            throw new Error("some shit with max segments count change event");
        let input = currentLabel.querySelector("input");
        if (!input)
            throw new Error("input not exist");
        let inputValue = Number.parseInt(input.value);
        let optionsToUpdate = {
            maxSegmentsCount: inputValue,
        };
        //this.onModelStateUpdate(optionsToUpdate);
        this.onModelStateUpdate.invoke(new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_2__["OptionsToUpdateEventArgs"](optionsToUpdate));
    }
    _handlerAngleSizeChange(event) {
        event.preventDefault();
        let currentLabel = event.currentTarget;
        if (!currentLabel)
            throw new Error("some shit with angle size change event");
        let input = currentLabel.querySelector("input");
        if (!input)
            throw new Error("input not exist");
        let inputValue = Number.parseInt(input.value);
        let optionsToUpdate = {
            angle: inputValue,
        };
        //this.onModelStateUpdate(optionsToUpdate);
        this.onModelStateUpdate.invoke(new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_2__["OptionsToUpdateEventArgs"](optionsToUpdate));
    }
}


/***/ }),

/***/ "./src/components/RangeSlider/MVP/Views/ScaleView.ts":
/*!***********************************************************!*\
  !*** ./src/components/RangeSlider/MVP/Views/ScaleView.ts ***!
  \***********************************************************/
/*! exports provided: ScaleView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScaleView", function() { return ScaleView; });
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View */ "./src/components/RangeSlider/MVP/Views/View.ts");
/* harmony import */ var _Helpers_Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Helpers/Vector */ "./src/components/RangeSlider/Helpers/Vector.ts");
/* harmony import */ var _Events_Event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Events/Event */ "./src/components/RangeSlider/Events/Event.ts");
/* harmony import */ var _Events_EventArgs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Events/EventArgs */ "./src/components/RangeSlider/Events/EventArgs.ts");




class ScaleView extends _View__WEBPACK_IMPORTED_MODULE_0__["View"] {
    constructor(scaleContainer) {
        super();
        this.maxSegmentsCount = 0;
        this.onScaleSegmentClick = new _Events_Event__WEBPACK_IMPORTED_MODULE_2__["Event"];
        this.containerElement = scaleContainer;
        //this.onScaleSegmentClick = () => { };
        this._handlerSelectSegment = this._handlerSelectSegment.bind(this);
    }
    initialize() {
        this._render();
    }
    update(neededRerender) {
        if (neededRerender) {
            this._render();
        }
    }
    _render() {
        let modelData = this.getModelData();
        this.containerElement.innerHTML = "";
        this.maxSegmentsCount = modelData.maxSegmentsCount;
        let segmentDensityLimit = this._calculateSegmentDensityLimit();
        let maxSegmentsCount = this.maxSegmentsCount;
        if (maxSegmentsCount >= segmentDensityLimit)
            maxSegmentsCount = segmentDensityLimit; //для относительно больших сегментов
        let stepsInOneSegment = Math.round(segmentDensityLimit / maxSegmentsCount);
        for (let i = 0; i < maxSegmentsCount; i++) {
            let segment = document.createElement("div");
            segment.className = "range-slider__scale-segment";
            let segmentValue = i * modelData.stepSize * stepsInOneSegment + modelData.minValue;
            if (segmentValue >= modelData.maxValue)
                break;
            segment.textContent = segmentValue.toFixed(4);
            segment.dataset.segmentValue = segmentValue.toString();
            segment.addEventListener("click", this._handlerSelectSegment);
            segment.style.fontSize = `${modelData.scaleFontSize}px`;
            segment.style.lineHeight = `${modelData.scaleFontSize}px`;
            this.containerElement.append(segment);
            this._calculateSegmentPosition(segment, segmentValue);
        }
        //ластецкий сегмент
        let lastSegment = document.createElement("div");
        lastSegment.className = "range-slider__scale-segment";
        let lastSegmentValue = modelData.maxValue;
        lastSegment.textContent = lastSegmentValue.toFixed(4);
        lastSegment.dataset.segmentValue = lastSegmentValue.toString();
        lastSegment.addEventListener("click", this._handlerSelectSegment);
        lastSegment.style.fontSize = `${modelData.scaleFontSize}px`;
        lastSegment.style.lineHeight = `${modelData.scaleFontSize}px`;
        this.containerElement.append(lastSegment);
        this._calculateSegmentPosition(lastSegment, lastSegmentValue);
    }
    _calculateSegmentDensityLimit() {
        /* let maxValue: number = this.getModelData("maxValue");
        let minValue: number = this.getModelData("minValue");
        let stepSize = this.getModelData("stepSize"); */
        let modelData = this.getModelData();
        let dMaxMinValue = modelData.maxValue - modelData.minValue;
        let temp = dMaxMinValue / modelData.stepSize;
        return temp;
    }
    _calculateSegmentPosition(segment, value) {
        let modelData = this.getModelData();
        let sliderContainerLength = modelData.sliderStripLength;
        let handleSize = modelData.handleWidth;
        let dMaxMinValue = modelData.maxValue - modelData.minValue;
        let usedLength;
        if (modelData.hasTwoSlider) {
            usedLength = sliderContainerLength - handleSize * 2;
        }
        else {
            usedLength = sliderContainerLength - handleSize;
        }
        let segmentBR = segment.getBoundingClientRect();
        let segmentWidth = segmentBR.width;
        let segmentSizeVector = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_1__["Vector"](segmentWidth, modelData.scaleFontSize);
        segmentSizeVector.x = segmentSizeVector.x * Math.cos(modelData.angleInRad);
        segmentSizeVector.y = segmentSizeVector.y * Math.sin(modelData.angleInRad);
        let segmentSizeVectorLength = segmentSizeVector.length;
        let handlePositionInContainer = ((value - modelData.minValue) * usedLength) / dMaxMinValue;
        if (modelData.hasTwoSlider) {
            handlePositionInContainer = handlePositionInContainer + handleSize - segmentSizeVectorLength / 2;
        }
        else {
            handlePositionInContainer = handlePositionInContainer - segmentSizeVectorLength / 2 + handleSize / 2;
        }
        let testMargin = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_1__["Vector"](30, 30);
        testMargin.x = testMargin.x * Math.cos(modelData.angleInRad);
        testMargin.y = testMargin.y * Math.sin(modelData.angleInRad);
        /* let position = {
            x: handlePositionInContainer * Math.cos(modelData.angleInRad) + testMargin.y,
            y: handlePositionInContainer * Math.sin(modelData.angleInRad) - testMargin.x,
        }; */
        let x = handlePositionInContainer * Math.cos(modelData.angleInRad) + testMargin.y;
        let y = handlePositionInContainer * Math.sin(modelData.angleInRad) - testMargin.x;
        let position = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_1__["Vector"](x, y);
        this.setPosition(segment, position);
    }
    _handlerSelectSegment(event) {
        event.preventDefault();
        let modelData = this.getModelData();
        let optionsToUpdate = {};
        if (!event.currentTarget)
            throw new Error("some shit");
        let currentSegment = (event.currentTarget);
        if (!currentSegment.dataset.segmentValue)
            throw new Error("some shit2");
        let segmentValueString = currentSegment.dataset.segmentValue;
        let value = Number.parseFloat(segmentValueString);
        //определяет к какому ползунку ближе выбранный сегмент
        if (modelData.hasTwoSlider) {
            let dSegmentValueFirstValue = Math.abs(modelData.firstValue - value);
            let dSegmentValueLastValue = Math.abs(modelData.lastValue - value);
            if (dSegmentValueFirstValue < dSegmentValueLastValue)
                optionsToUpdate.firstValue = value;
            else if (dSegmentValueFirstValue > dSegmentValueLastValue)
                optionsToUpdate.lastValue = value;
            else {
                if (value < modelData.firstValue)
                    optionsToUpdate.firstValue = value;
                else
                    optionsToUpdate.lastValue = value;
            }
        }
        else
            optionsToUpdate.firstValue = value;
        //this.onScaleSegmentClick(optionsToUpdate);
        this.onScaleSegmentClick.invoke(new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_3__["OptionsToUpdateEventArgs"](optionsToUpdate));
    }
}


/***/ }),

/***/ "./src/components/RangeSlider/MVP/Views/SliderParts/EmptyStrip.ts":
/*!************************************************************************!*\
  !*** ./src/components/RangeSlider/MVP/Views/SliderParts/EmptyStrip.ts ***!
  \************************************************************************/
/*! exports provided: EmptyStrip */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmptyStrip", function() { return EmptyStrip; });
/* harmony import */ var _SliderPart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SliderPart.js */ "./src/components/RangeSlider/MVP/Views/SliderParts/SliderPart.js");
/* harmony import */ var _Helpers_Vector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Helpers/Vector.js */ "./src/components/RangeSlider/Helpers/Vector.js");


class EmptyStrip extends _SliderPart_js__WEBPACK_IMPORTED_MODULE_0__["SliderPart"] {
    constructor(view, DOMElement) {
        super(view, DOMElement);
        this.calculatePosition = this.calculatePosition.bind(this);
    }
    initialize() {
        this.calculatePosition();
    }
    calculatePosition() {
        let modelData = this.view.getModelData();
        let handle = this.view.firstSliderInstance;
        if (!handle)
            throw new Error("handle not exist");
        let handleSize = handle.size;
        this.setSize(new _Helpers_Vector_js__WEBPACK_IMPORTED_MODULE_1__["Vector"](modelData.sliderStripLength, modelData.sliderStripThickness));
        this.setPosition(new _Helpers_Vector_js__WEBPACK_IMPORTED_MODULE_1__["Vector"](0, handleSize.height / 2 - (modelData.sliderStripThickness) / 2));
        let transformOrigin = {
            x: handle.size.width / 2,
            y: (modelData.sliderStripThickness) / 2,
        };
        this.DOMElement.style.transformOrigin = `${transformOrigin.x}px ${transformOrigin.y}px`;
        this.DOMElement.style.transform = `rotate(${-modelData.angle}deg)`;
    }
}


/***/ }),

/***/ "./src/components/RangeSlider/MVP/Views/SliderParts/FilledStrip.ts":
/*!*************************************************************************!*\
  !*** ./src/components/RangeSlider/MVP/Views/SliderParts/FilledStrip.ts ***!
  \*************************************************************************/
/*! exports provided: FilledStrip */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilledStrip", function() { return FilledStrip; });
/* harmony import */ var _SliderPart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SliderPart */ "./src/components/RangeSlider/MVP/Views/SliderParts/SliderPart.ts");
/* harmony import */ var _Helpers_Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Helpers/Vector */ "./src/components/RangeSlider/Helpers/Vector.ts");


class FilledStrip extends _SliderPart__WEBPACK_IMPORTED_MODULE_0__["SliderPart"] {
    constructor(view, DOMElement) {
        super(view, DOMElement);
        this.calculatePosition = this.calculatePosition.bind(this);
    }
    initialize() {
        this.calculatePosition();
    }
    calculatePosition() {
        let modelData = this.view.getModelData();
        let firstSlider = this.view.firstSliderInstance;
        if (!firstSlider)
            throw new Error("handle not exist");
        let lastSlider = this.view.lastSliderInstance;
        if (!lastSlider)
            throw new Error("handle not exist");
        let handle = this.view.firstSliderInstance;
        if (!handle)
            throw new Error("handle not exist");
        let handleSize = handle.size;
        if (modelData.hasTwoSlider) {
            let width = lastSlider.position.sum(firstSlider.position.multiplyByNumber(-1)).length;
            this.setSize(new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_1__["Vector"](width, modelData.sliderStripThickness));
            width;
            //превращаем ширину ползунка в вектор, чтобы повернуть его и прибавить его половину к вектору позиции полосы
            let testVector = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_1__["Vector"](firstSlider.size.width * Math.cos(modelData.angleInRad), firstSlider.size.width * Math.sin(modelData.angleInRad));
            this.setPosition(new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_1__["Vector"](firstSlider.position.x + testVector.x / 2, firstSlider.position.y + testVector.y / 2 + (handleSize.height / 2 - (modelData.sliderStripThickness) / 2)));
        }
        else {
            let width = firstSlider.position.length + firstSlider.size.width / 2;
            this.setSize(new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_1__["Vector"](width, modelData.sliderStripThickness));
            this.setPosition(new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_1__["Vector"](0, handleSize.height / 2 - (modelData.sliderStripThickness) / 2));
        }
        let transformOrigin = {
            x: handle.size.width / 2,
            y: (modelData.sliderStripThickness) / 2,
        };
        this.DOMElement.style.transformOrigin = `${transformOrigin.x}px ${transformOrigin.y}px`;
        this.DOMElement.style.transform = `rotate(${-modelData.angle}deg)`; //минус из-за нестандартного направления обхода функции rotate
        super.calculatePosition();
    }
}


/***/ }),

/***/ "./src/components/RangeSlider/MVP/Views/SliderParts/Handle.ts":
/*!********************************************************************!*\
  !*** ./src/components/RangeSlider/MVP/Views/SliderParts/Handle.ts ***!
  \********************************************************************/
/*! exports provided: Handle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Handle", function() { return Handle; });
/* harmony import */ var _SliderPart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SliderPart */ "./src/components/RangeSlider/MVP/Views/SliderParts/SliderPart.ts");
/* harmony import */ var _Helpers_Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Helpers/Vector */ "./src/components/RangeSlider/Helpers/Vector.ts");


class Handle extends _SliderPart__WEBPACK_IMPORTED_MODULE_0__["SliderPart"] {
    constructor(view, mainDOMElement, outsideDOMElement, countNumber) {
        super(view, mainDOMElement);
        this.countNumber = countNumber;
        this.outsideDOMElement = outsideDOMElement;
        this.outsidePosition = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_1__["Vector"](0, 0);
        this.outsideSize = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_1__["Vector"](0, 0);
        this.calculatePosition = this.calculatePosition.bind(this);
    }
    initialize() {
        this.calculatePosition();
    }
    calculatePosition() {
        let modelData = this.view.getModelData();
        let sliderContainerLength = modelData.sliderStripLength;
        let handleSize = this.size.width;
        let dMaxMinValue = modelData.maxValue - modelData.minValue;
        let usedLength;
        if (modelData.hasTwoSlider) {
            usedLength = sliderContainerLength - handleSize * 2;
        }
        else {
            usedLength = sliderContainerLength - handleSize;
        }
        let handlePositionInContainer;
        let firstValue;
        if (modelData.firstValue > modelData.maxValue)
            firstValue = firstValue = modelData.maxValue;
        else if (modelData.firstValue < modelData.minValue)
            firstValue = modelData.minValue;
        else
            firstValue = modelData.firstValue;
        let lastValue = modelData.lastValue;
        if (modelData.lastValue > modelData.maxValue)
            lastValue = lastValue = modelData.maxValue;
        else if (modelData.lastValue < modelData.minValue)
            lastValue = modelData.minValue;
        else
            lastValue = modelData.lastValue;
        if (this.countNumber === 1) {
            handlePositionInContainer = ((firstValue - modelData.minValue) * usedLength) / dMaxMinValue;
        }
        else {
            handlePositionInContainer = ((lastValue - modelData.minValue) * usedLength) / dMaxMinValue;
        }
        let newX = handlePositionInContainer * Math.cos(modelData.angleInRad);
        let newY = handlePositionInContainer * Math.sin(modelData.angleInRad);
        if (this.countNumber === 2) {
            newX += handleSize * Math.cos(modelData.angleInRad);
            newY += handleSize * Math.sin(modelData.angleInRad);
        }
        this.setPosition(new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_1__["Vector"](newX, newY));
        this.calculateBorder();
    }
    calculateBorder() {
        let modelData = this.view.getModelData();
        this.outsidePosition.x = this.position.x - modelData.borderThickness;
        this.outsidePosition.y = this.position.y - modelData.borderThickness;
        this.outsideSize.x = modelData.borderThickness * 2 + this.size.width;
        this.outsideSize.y = modelData.borderThickness * 2 + this.size.height;
        this.view.setPosition(this.outsideDOMElement, this.outsidePosition);
        this.view.setSize(this.outsideDOMElement, this.outsideSize);
    }
}


/***/ }),

/***/ "./src/components/RangeSlider/MVP/Views/SliderParts/SliderContainer.ts":
/*!*****************************************************************************!*\
  !*** ./src/components/RangeSlider/MVP/Views/SliderParts/SliderContainer.ts ***!
  \*****************************************************************************/
/*! exports provided: SlidersContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlidersContainer", function() { return SlidersContainer; });
/* harmony import */ var _SliderPart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SliderPart */ "./src/components/RangeSlider/MVP/Views/SliderParts/SliderPart.ts");
/* harmony import */ var _Helpers_Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Helpers/Vector */ "./src/components/RangeSlider/Helpers/Vector.ts");


class SlidersContainer extends _SliderPart__WEBPACK_IMPORTED_MODULE_0__["SliderPart"] {
    constructor(view, DOMElement) {
        super(view, DOMElement);
    }
    initialize() {
        this.calculatePosition();
    }
    calculatePosition() {
        let modelData = this.view.getModelData();
        let width = modelData.sliderStripLength * Math.cos(modelData.angleInRad);
        let height = modelData.sliderStripLength * Math.sin(modelData.angleInRad);
        this.setSize(new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_1__["Vector"](width, height));
    }
}


/***/ }),

/***/ "./src/components/RangeSlider/MVP/Views/SliderParts/SliderPart.js":
/*!************************************************************************!*\
  !*** ./src/components/RangeSlider/MVP/Views/SliderParts/SliderPart.js ***!
  \************************************************************************/
/*! exports provided: SliderPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SliderPart", function() { return SliderPart; });
/* harmony import */ var _Helpers_Vector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Helpers/Vector.js */ "./src/components/RangeSlider/Helpers/Vector.js");


class SliderPart {
    constructor(view, DOMElement) {
        this.DOMElement = DOMElement;
        this.view = view;

        this.position = new _Helpers_Vector_js__WEBPACK_IMPORTED_MODULE_0__["Vector"](0, 0);
        let partBoundingRect = this.DOMElement.getBoundingClientRect();
        this.size = new _Helpers_Vector_js__WEBPACK_IMPORTED_MODULE_0__["Vector"](partBoundingRect.width, partBoundingRect.height);
        //позиция и размер в пикселях
    }

    initialize() {
        this.calculatePosition();
    }

    calculatePosition() {
        this.renderPosition();
    }

    setPosition(position) {
        this.position.x = position.x;
        this.position.y = position.y;

        this.renderPosition();
    }

    setSize(size) {
        this.size.width = size.width;
        this.size.height = size.height;

        this.renderSize();
    }

    renderPosition() {
        this.view.setPosition(this.DOMElement, this.position);
    }

    renderSize() {
        this.view.setSize(this.DOMElement, this.size);
    }
}

/***/ }),

/***/ "./src/components/RangeSlider/MVP/Views/SliderParts/SliderPart.ts":
/*!************************************************************************!*\
  !*** ./src/components/RangeSlider/MVP/Views/SliderParts/SliderPart.ts ***!
  \************************************************************************/
/*! exports provided: SliderPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SliderPart", function() { return SliderPart; });
/* harmony import */ var _Helpers_Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Helpers/Vector */ "./src/components/RangeSlider/Helpers/Vector.ts");

class SliderPart {
    constructor(view, DOMElement) {
        this.DOMElement = DOMElement;
        this.view = view;
        this.position = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_0__["Vector"](0, 0);
        let partBoundingRect = this.DOMElement.getBoundingClientRect();
        this.size = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_0__["Vector"](partBoundingRect.width, partBoundingRect.height);
        //позиция и размер в пикселях
    }
    initialize() {
        this.calculatePosition();
    }
    calculatePosition() {
        this.renderPosition();
    }
    setPosition(position) {
        this.position.x = position.x;
        this.position.y = position.y;
        this.renderPosition();
    }
    setSize(size) {
        this.size.width = size.width;
        this.size.height = size.height;
        this.renderSize();
    }
    renderPosition() {
        this.view.setPosition(this.DOMElement, this.position);
    }
    renderSize() {
        this.view.setSize(this.DOMElement, this.size);
    }
}


/***/ }),

/***/ "./src/components/RangeSlider/MVP/Views/SliderView.ts":
/*!************************************************************!*\
  !*** ./src/components/RangeSlider/MVP/Views/SliderView.ts ***!
  \************************************************************/
/*! exports provided: SliderView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SliderView", function() { return SliderView; });
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View */ "./src/components/RangeSlider/MVP/Views/View.ts");
/* harmony import */ var _SliderParts_SliderContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SliderParts/SliderContainer */ "./src/components/RangeSlider/MVP/Views/SliderParts/SliderContainer.ts");
/* harmony import */ var _SliderParts_Handle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SliderParts/Handle */ "./src/components/RangeSlider/MVP/Views/SliderParts/Handle.ts");
/* harmony import */ var _SliderParts_FilledStrip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SliderParts/FilledStrip */ "./src/components/RangeSlider/MVP/Views/SliderParts/FilledStrip.ts");
/* harmony import */ var _SliderParts_EmptyStrip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SliderParts/EmptyStrip */ "./src/components/RangeSlider/MVP/Views/SliderParts/EmptyStrip.ts");
/* harmony import */ var _Helpers_MathFunctions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Helpers/MathFunctions */ "./src/components/RangeSlider/Helpers/MathFunctions.ts");
/* harmony import */ var _Helpers_Vector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Helpers/Vector */ "./src/components/RangeSlider/Helpers/Vector.ts");
/* harmony import */ var _Events_Event__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Events/Event */ "./src/components/RangeSlider/Events/Event.ts");
/* harmony import */ var _Events_EventArgs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../Events/EventArgs */ "./src/components/RangeSlider/Events/EventArgs.ts");









class SliderView extends _View__WEBPACK_IMPORTED_MODULE_0__["View"] {
    constructor(mainContentContainer) {
        super();
        this.onHandleMove = new _Events_Event__WEBPACK_IMPORTED_MODULE_7__["Event"]();
        this.containerElement = mainContentContainer;
        this._handlerMouseDown = this._handlerMouseDown.bind(this);
        this._sliderParts = [];
    }
    initialize() {
        this._render();
    }
    update(neededRerender) {
        if (neededRerender) { //полный перерендер всех элементов слайдера
            this._render();
        }
        else { //или просто обновление их состояний
            for (let part of this._sliderParts) { /////
                if (part.calculatePosition)
                    part.calculatePosition();
            }
        }
    }
    _render() {
        let modelData = this.getModelData();
        this._sliderParts = [];
        this.containerElement.innerHTML = "";
        /* if (modelData.orientation === "horizontal") {
            this.containerElement.style.width = `${modelData.sliderStripLength}px`;
            this.containerElement.style.height = "auto";
        }
        else if (modelData.orientation === "vertical") {
            this.containerElement.style.height = `${modelData.sliderStripLength}px`;
            this.containerElement.style.width = "auto";
        } */
        this.emptyStrip = document.createElement("div");
        this.emptyStrip.className = "range-slider__slider-body-empty";
        this.containerElement.append(this.emptyStrip);
        this.filledStrip = document.createElement("div");
        this.filledStrip.className = "range-slider__slider-body-filled";
        this.containerElement.append(this.filledStrip);
        this.firstSliderBorder = document.createElement("div");
        this.firstSliderBorder.className = "range-slider__first-slider-outside";
        this.firstSliderBorder.dataset.sliderCountNumber = "1";
        this.containerElement.append(this.firstSliderBorder);
        if (modelData.hasTwoSlider) {
            this.lastSliderBorder = document.createElement("div");
            this.lastSliderBorder.className = "range-slider__last-slider-outside";
            this.lastSliderBorder.dataset.sliderCountNumber = "2";
            this.containerElement.append(this.lastSliderBorder);
        }
        this.firstSlider = document.createElement("div");
        this.firstSlider.className = "range-slider__first-slider";
        this.firstSlider.dataset.sliderCountNumber = "1";
        this.firstSlider.style.width = `${modelData.handleWidth}px`;
        this.firstSlider.style.height = `${modelData.handleHeight}px`;
        this.containerElement.append(this.firstSlider);
        if (modelData.hasTwoSlider) {
            this.lastSlider = document.createElement("div");
            this.lastSlider.className = "range-slider__last-slider";
            this.lastSlider.dataset.sliderCountNumber = "2";
            this.lastSlider.style.width = `${modelData.handleWidth}px`;
            this.lastSlider.style.height = `${modelData.handleHeight}px`;
            this.containerElement.append(this.lastSlider);
            if (!modelData.lastValue)
                throw new Error("values not exist");
            if (modelData.lastValue < modelData.firstValue) {
                /* this.onModelOptionUpdate({
                    lastValue: modelData.firstValue,
                }); */
                //this.onModelOptionUpdate. ;
            }
        }
        this.containerElementInstance = new _SliderParts_SliderContainer__WEBPACK_IMPORTED_MODULE_1__["SlidersContainer"](this, this.containerElement);
        this._sliderParts.push(this.containerElementInstance);
        this.firstSliderInstance = new _SliderParts_Handle__WEBPACK_IMPORTED_MODULE_2__["Handle"](this, this.firstSlider, this.firstSliderBorder, 1);
        this._sliderParts.push(this.firstSliderInstance);
        if (modelData.hasTwoSlider && this.lastSlider && this.lastSliderBorder) {
            this.lastSliderInstance = new _SliderParts_Handle__WEBPACK_IMPORTED_MODULE_2__["Handle"](this, this.lastSlider, this.lastSliderBorder, 2);
            this._sliderParts.push(this.lastSliderInstance);
        }
        this.emptyStripInstance = new _SliderParts_EmptyStrip__WEBPACK_IMPORTED_MODULE_4__["EmptyStrip"](this, this.emptyStrip);
        this._sliderParts.push(this.emptyStripInstance);
        this.filledStripInstance = new _SliderParts_FilledStrip__WEBPACK_IMPORTED_MODULE_3__["FilledStrip"](this, this.filledStrip);
        this._sliderParts.push(this.filledStripInstance);
        for (let part of this._sliderParts) { /////
            if (part.initialize)
                part.initialize();
        }
        this.firstSliderInstance.DOMElement.ondragstart = function () {
            return false;
        };
        this.firstSliderInstance.DOMElement.addEventListener("mousedown", this._handlerMouseDown);
        //this.firstSliderInstance.DOMElement.addEventListener("touchstart", this._handlerMouseDown);
        this.firstSliderInstance.outsideDOMElement.addEventListener("mousedown", (event) => {
            this._handlerMouseDown(event);
        });
        /* this.firstSliderInstance.outsideDOMElement.addEventListener("touchstart", (event: MouseEvent) => {
            this._handlerMouseDown(event);
        }); */
        if (modelData.hasTwoSlider && this.lastSliderInstance) {
            this.lastSliderInstance.DOMElement.ondragstart = function () {
                return false;
            };
            this.lastSliderInstance.DOMElement.addEventListener("mousedown", this._handlerMouseDown);
            //this.lastSliderInstance.DOMElement.addEventListener("touchstart", this._handlerMouseDown);
            this.lastSliderInstance.outsideDOMElement.addEventListener("mousedown", (event) => {
                this._handlerMouseDown(event);
            });
            /* this.lastSliderInstance.outsideDOMElement.addEventListener("touchstart", (event: MouseEvent) => {
                this._handlerMouseDown(event);///////////////////////////////////////////////////
            }); */
        }
        /* this._setEventHandlers(modelData); */
    }
    //d&d
    _handlerMouseDown(event) {
        event.preventDefault();
        let modelData = this.getModelData();
        let cursorMouseDownPositionX;
        let cursorMouseDownPositionY;
        if (event instanceof TouchEvent) {
            cursorMouseDownPositionX = event.changedTouches[0].pageX;
            cursorMouseDownPositionY = event.changedTouches[0].pageY;
        }
        else {
            cursorMouseDownPositionX = event.clientX;
            cursorMouseDownPositionY = event.clientY;
        }
        cursorMouseDownPositionY = (document.documentElement.clientHeight + pageYOffset) - cursorMouseDownPositionY;
        //cursorMouseDownPositionX =;
        let cursorMouseDownPosition = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_6__["Vector"](cursorMouseDownPositionX, cursorMouseDownPositionY); //место нажатия левой кнопки мыши 
        let sliderCountNumber = 0;
        if (event.currentTarget !== null) { ////////////////////
            let sliderCountNumberString = event.currentTarget.dataset.sliderCountNumber;
            if (sliderCountNumberString !== undefined)
                sliderCountNumber = Number.parseInt(sliderCountNumberString);
        }
        let targetSliderInstance;
        let targetHandleCountNumber;
        if (sliderCountNumber === 1) {
            targetSliderInstance = this.firstSliderInstance;
            targetHandleCountNumber = 1;
        }
        else if (modelData.hasTwoSlider) {
            targetSliderInstance = this.lastSliderInstance;
            targetHandleCountNumber = 2;
        }
        if (!targetSliderInstance || targetHandleCountNumber === undefined)
            throw new Error("handle not exist");
        let targetSliderBoundingCoords = targetSliderInstance. /* outsideDOMElement */DOMElement.getBoundingClientRect();
        let mousePositionInsideTargetSliderX = cursorMouseDownPosition.x - targetSliderBoundingCoords.x;
        let mousePositionInsideTargetSliderY = cursorMouseDownPosition.y - (document.documentElement.clientHeight + pageYOffset - targetSliderBoundingCoords.y - targetSliderInstance.size.height /* targetSliderBoundingCoords.height */);
        let mousePositionInsideTargetSlider = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_6__["Vector"](mousePositionInsideTargetSliderX, mousePositionInsideTargetSliderY);
        let optionsForMouseEvents = {
            handlerMouseMove: (/* optionsFromMouseDown: IMouseEventArgs,  */ event) => { },
            handlerMouseUp: (/* optionsFromMouseDown: IMouseEventArgs,  */ event) => { },
            mousePositionInsideTargetSlider: mousePositionInsideTargetSlider,
            targetSliderInstance: targetSliderInstance,
            targetHandleCountNumber: targetHandleCountNumber,
        };
        let handlerMouseMove = this._handlerMouseMove.bind(this, optionsForMouseEvents);
        optionsForMouseEvents.handlerMouseMove = handlerMouseMove; // чтобы обработчик mouseMove можно было отписать в mouseUp
        let handlerMouseUp = this._handlerMouseUp.bind(this, optionsForMouseEvents);
        optionsForMouseEvents.handlerMouseUp = handlerMouseUp; // -//-
        document.addEventListener("mousemove", handlerMouseMove);
        document.addEventListener("mouseup", handlerMouseUp);
        /* document.addEventListener("touchmove", handlerMouseMove);
        document.addEventListener("touchend", handlerMouseUp); */
    }
    _handlerMouseMove(optionsFromMouseDown, event) {
        let modelData = this.getModelData();
        let { mousePositionInsideTargetSlider, targetSliderInstance, targetHandleCountNumber, } = optionsFromMouseDown;
        let mouseGlobalPositionX;
        let mouseGlobalPositionY;
        if (event instanceof TouchEvent) {
            mouseGlobalPositionX = event.changedTouches[0].pageX;
            mouseGlobalPositionY = event.changedTouches[0].pageY;
        }
        else {
            mouseGlobalPositionX = event.clientX;
            mouseGlobalPositionY = event.clientY;
        }
        mouseGlobalPositionY = (document.documentElement.clientHeight + pageYOffset) - mouseGlobalPositionY;
        //mouseGlobalPositionX =;
        let mouseGlobalPosition = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_6__["Vector"](mouseGlobalPositionX, mouseGlobalPositionY); //место нажатия левой кнопки мыши 
        //значение в заданных единицах пропорциональное пиксельным координатам курсора в контейнере
        let newTargetInputValueVector = this._calculateValueProportionalToPixelValue({
            modelData,
            mouseGlobalPosition,
            mousePositionInsideTargetSlider,
            targetHandleCountNumber
        });
        let newTargetInputValue = newTargetInputValueVector;
        if (!this.filledStripInstance)
            throw new Error("filledStripInstance not exist");
        if (targetHandleCountNumber === 1 && newTargetInputValue !== modelData.firstValue) {
            if (newTargetInputValue < modelData.minValue)
                //this.onHandleMove({ firstValue: modelData.minValue });
                this.onHandleMove.invoke(new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_8__["OptionsToUpdateEventArgs"]({ firstValue: modelData.minValue }));
            else if (newTargetInputValue > modelData.lastValue && modelData.hasTwoSlider)
                //this.onHandleMove({ firstValue: modelData.lastValue });
                this.onHandleMove.invoke(new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_8__["OptionsToUpdateEventArgs"]({ firstValue: modelData.lastValue }));
            else if (newTargetInputValue > modelData.maxValue)
                //this.onHandleMove({ firstValue: modelData.maxValue });
                this.onHandleMove.invoke(new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_8__["OptionsToUpdateEventArgs"]({ firstValue: modelData.maxValue }));
            else
                //this.onHandleMove({ firstValue: newTargetInputValue });
                this.onHandleMove.invoke(new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_8__["OptionsToUpdateEventArgs"]({ firstValue: newTargetInputValue }));
            // перезапись значения позиции ползунка
            targetSliderInstance.calculatePosition();
            this.filledStripInstance.calculatePosition();
        }
        else if (targetHandleCountNumber === 2 && newTargetInputValue !== modelData.lastValue && modelData.hasTwoSlider) {
            if (newTargetInputValue > modelData.maxValue)
                //this.onHandleMove({ lastValue: modelData.maxValue });
                this.onHandleMove.invoke(new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_8__["OptionsToUpdateEventArgs"]({ lastValue: modelData.maxValue }));
            else if (newTargetInputValue < modelData.firstValue)
                //this.onHandleMove({ lastValue: modelData.firstValue });
                this.onHandleMove.invoke(new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_8__["OptionsToUpdateEventArgs"]({ lastValue: modelData.firstValue }));
            else
                //this.onHandleMove({ lastValue: newTargetInputValue });
                this.onHandleMove.invoke(new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_8__["OptionsToUpdateEventArgs"]({ lastValue: newTargetInputValue }));
            // перезапись значения позиции ползунка
            targetSliderInstance.calculatePosition();
            this.filledStripInstance.calculatePosition();
        }
    }
    _handlerMouseUp(optionsFromMouseDown, event) {
        document.removeEventListener("mousemove", optionsFromMouseDown.handlerMouseMove);
        document.removeEventListener("mouseup", optionsFromMouseDown.handlerMouseUp);
        /*         document.removeEventListener("touchmove", optionsFromMouseDown.handlerMouseMove);
                document.removeEventListener("touchend", optionsFromMouseDown.handlerMouseUp); */
    }
    _calculateValueProportionalToPixelValue(args) {
        let { modelData, mouseGlobalPosition, mousePositionInsideTargetSlider, targetHandleCountNumber } = args;
        if (!this.firstSliderInstance)
            throw new Error("firstSliderInstance not exist");
        if (!this.containerElementInstance)
            throw new Error("containerElementInstance not exist");
        let maxDistanceBetweenSliders = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_6__["Vector"](0, 0);
        let containerBoundingRect = this.containerElementInstance.DOMElement.getBoundingClientRect();
        containerBoundingRect.x = containerBoundingRect.x;
        containerBoundingRect.y = (document.documentElement.clientHeight + pageYOffset) - (containerBoundingRect.y + containerBoundingRect.height);
        let cursorPositionInContainer = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_6__["Vector"](0, 0);
        cursorPositionInContainer.x = mouseGlobalPosition.x - containerBoundingRect.x - mousePositionInsideTargetSlider.x;
        cursorPositionInContainer.y = mouseGlobalPosition.y - containerBoundingRect.y - mousePositionInsideTargetSlider.y;
        if (modelData.hasTwoSlider) {
            if (targetHandleCountNumber === 2) {
                cursorPositionInContainer.x = cursorPositionInContainer.x - this.firstSliderInstance.size.width * Math.cos(modelData.angleInRad);
                cursorPositionInContainer.y = cursorPositionInContainer.y - this.firstSliderInstance.size.width * Math.sin(modelData.angleInRad);
            }
            maxDistanceBetweenSliders.x = modelData.sliderStripLength - this.firstSliderInstance.size.width * 2;
            maxDistanceBetweenSliders.y = modelData.sliderStripLength - this.firstSliderInstance.size.width * 2;
        }
        else {
            maxDistanceBetweenSliders.x = modelData.sliderStripLength - this.firstSliderInstance.size.width;
            maxDistanceBetweenSliders.y = modelData.sliderStripLength - this.firstSliderInstance.size.height;
        }
        let deltaMaxMinValues = modelData.maxValue - modelData.minValue;
        let cursorPositionInContainerLength;
        if (modelData.angle === 0) {
            cursorPositionInContainerLength = cursorPositionInContainer.x;
        }
        else if (modelData.angle === 90) {
            cursorPositionInContainerLength = cursorPositionInContainer.y;
        }
        else if (cursorPositionInContainer.x <= 0 && cursorPositionInContainer.y <= 0) {
            cursorPositionInContainerLength = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_6__["Vector"](cursorPositionInContainer.x, cursorPositionInContainer.y).length * (-1);
        }
        else {
            cursorPositionInContainerLength = new _Helpers_Vector__WEBPACK_IMPORTED_MODULE_6__["Vector"](cursorPositionInContainer.x, cursorPositionInContainer.y).length;
        }
        let proportionalValue = (deltaMaxMinValues * cursorPositionInContainerLength) / (maxDistanceBetweenSliders.x) + modelData.minValue;
        return this._calculateNearestPositionForHandle(proportionalValue, modelData.stepSize, modelData.minValue);
    }
    // подменяем текущее значение инпута на число к которому ближе всего текущее значение курсора
    // т.е. например шаг 10, значение 78 -> на выходе получаем 80, 
    // или например  шаг 10, значение 73 -> на выходе получаем 70
    _calculateNearestPositionForHandle(value, stepSize, minValue) {
        let temp1;
        let temp3;
        if (minValue < 0) {
            temp1 = (value + Math.abs(minValue)) / stepSize;
            let temp2 = Math.round(temp1);
            temp3 = temp2 * stepSize - Math.abs(minValue);
        }
        else {
            temp1 = (value - Math.abs(minValue)) / stepSize;
            let temp2 = Math.round(temp1);
            temp3 = temp2 * stepSize + Math.abs(minValue);
        }
        return _Helpers_MathFunctions__WEBPACK_IMPORTED_MODULE_5__["MathFunctions"].cutOffJunkValuesFromFraction(temp3, stepSize);
    }
}


/***/ }),

/***/ "./src/components/RangeSlider/MVP/Views/View.ts":
/*!******************************************************!*\
  !*** ./src/components/RangeSlider/MVP/Views/View.ts ***!
  \******************************************************/
/*! exports provided: View */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View", function() { return View; });
/* harmony import */ var _Events_Event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Events/Event */ "./src/components/RangeSlider/Events/Event.ts");
/* harmony import */ var _Events_EventArgs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Events/EventArgs */ "./src/components/RangeSlider/Events/EventArgs.ts");


class View {
    constructor() {
        this.modelData = {};
        this.onGetModelData = new _Events_Event__WEBPACK_IMPORTED_MODULE_0__["Event"]();
    }
    getModelData() {
        let optionsEventArgs = new _Events_EventArgs__WEBPACK_IMPORTED_MODULE_1__["OptionsEventArgs"]();
        this.onGetModelData.invoke(optionsEventArgs);
        if (!optionsEventArgs.options)
            throw new Error("broken get model data");
        return optionsEventArgs.options;
    }
    initialize() {
    }
    setPosition(element, position) {
        let left = `${position.x}px`;
        element.style.left = left;
        let bottom = `${position.y}px`;
        element.style.bottom = bottom;
    }
    setSize(element, size) {
        let elementStyles = getComputedStyle(element);
        let borderWidthLeft = Number.parseInt(elementStyles.borderLeftWidth);
        let borderWidthRight = Number.parseInt(elementStyles.borderRightWidth);
        let borderWidthTop = Number.parseInt(elementStyles.borderTopWidth);
        let borderWidthBottom = Number.parseInt(elementStyles.borderBottomWidth);
        let width = `${size.width - (borderWidthLeft + borderWidthRight)}px`;
        element.style.width = width;
        let height = `${size.height - (borderWidthTop + borderWidthBottom)}px`;
        element.style.height = height;
    }
}



/***/ }),

/***/ "./src/components/RangeSlider/RangeSlider.scss":
/*!*****************************************************!*\
  !*** ./src/components/RangeSlider/RangeSlider.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./RangeSlider.scss */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/RangeSlider/RangeSlider.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./src/components/RangeSlider/RangeSlider.ts":
/*!***************************************************!*\
  !*** ./src/components/RangeSlider/RangeSlider.ts ***!
  \***************************************************/
/*! exports provided: RangeSlider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RangeSlider", function() { return RangeSlider; });
/* harmony import */ var _MVP_Views_SliderView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MVP/Views/SliderView */ "./src/components/RangeSlider/MVP/Views/SliderView.ts");
/* harmony import */ var _MVP_Views_InputsView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MVP/Views/InputsView */ "./src/components/RangeSlider/MVP/Views/InputsView.ts");
/* harmony import */ var _MVP_Views_ScaleView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MVP/Views/ScaleView */ "./src/components/RangeSlider/MVP/Views/ScaleView.ts");
/* harmony import */ var _MVP_Views_OptionsPanelView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MVP/Views/OptionsPanelView */ "./src/components/RangeSlider/MVP/Views/OptionsPanelView.ts");
/* harmony import */ var _MVP_Model_Model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MVP/Model/Model */ "./src/components/RangeSlider/MVP/Model/Model.ts");
/* harmony import */ var _MVP_Presenter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MVP/Presenter */ "./src/components/RangeSlider/MVP/Presenter.ts");
/* harmony import */ var _MVP_Model_Options__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MVP/Model/Options */ "./src/components/RangeSlider/MVP/Model/Options.ts");
/* harmony import */ var _RangeSlider_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./RangeSlider.scss */ "./src/components/RangeSlider/RangeSlider.scss");
/* harmony import */ var _RangeSlider_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_RangeSlider_scss__WEBPACK_IMPORTED_MODULE_7__);








{
    /* let sliderInstanceCount: number = 0;
    
    function createRangeSlider(containerSelector: string, options: IOptions): void {
        let defaultOptions: Options = new Options(options);
    
        defaultOptions.id = sliderInstanceCount;
        sliderInstanceCount++;
    
        let model = new Model(defaultOptions);
    
        let rangeSlidersContainer: HTMLElement = <HTMLElement>document.querySelector(containerSelector);
        let sliderContainer: HTMLElement = document.createElement("div");
        let inputsContainer: HTMLElement = document.createElement("div");
        let scaleContainer: HTMLElement = document.createElement("div");
        let optionsPanelContainer: HTMLElement = document.createElement("div");
    
        let elements = [
            rangeSlidersContainer,
            sliderContainer,
            inputsContainer,
            scaleContainer,
            optionsPanelContainer,
        ];
        render(elements);
    
        let sliderView: SliderView = new SliderView(sliderContainer);
        let inputsView: InputsView = new InputsView(inputsContainer);
        let scaleView: ScaleView = new ScaleView(scaleContainer);
        let optionsPanelView: OptionsPanelView = new OptionsPanelView(optionsPanelContainer);
    
        let presenter: Presenter = new Presenter(model, sliderView, inputsView, scaleView, optionsPanelView);
    };
    
    function render(elements: HTMLElement[]): void {
        let [
            rangeSlidersContainer,
            sliderContainer,
            inputsContainer,
            scaleContainer,
            optionsPanelContainer,
        ] = elements;
    
        //плагин
        let rangeSlider: HTMLElement = document.createElement("div");
        rangeSlider.className = "range-slider";
    
        //слайдер
        sliderContainer.className = "range-slider__slider-container";
    
        //шкала
        scaleContainer.className = "range-slider__scale-container";
    
        //контейнер слайдер + шкала
        let mainContentContainer: HTMLElement = document.createElement("div");
        mainContentContainer.className = "range-slider__main-content-container";
        mainContentContainer.append(sliderContainer);
        mainContentContainer.append(scaleContainer);
        rangeSlider.append(mainContentContainer);
    
    
        //инпуты
        inputsContainer.className = "range-slider__inputs-container";
    
        //контейнер инпуты + опции
        optionsPanelContainer.className = "range-slider__options-panel-container";
        optionsPanelContainer.append(inputsContainer);
        rangeSlider.append(optionsPanelContainer);
    
        rangeSlidersContainer.append(rangeSlider);
    } */
}
class RangeSlider {
    static createRangeSlider(containerSelector, options) {
        let defaultOptions = new _MVP_Model_Options__WEBPACK_IMPORTED_MODULE_6__["Options"](options);
        defaultOptions.id = this.sliderInstanceCount;
        this.sliderInstanceCount++;
        let model = new _MVP_Model_Model__WEBPACK_IMPORTED_MODULE_4__["Model"](defaultOptions);
        let rangeSlidersContainer = document.querySelector(containerSelector);
        let sliderContainer = document.createElement("div");
        let inputsContainer = document.createElement("div");
        let scaleContainer = document.createElement("div");
        let optionsPanelContainer = document.createElement("div");
        let elements = [
            rangeSlidersContainer,
            sliderContainer,
            inputsContainer,
            scaleContainer,
            optionsPanelContainer,
        ];
        this.render(elements);
        let sliderView = new _MVP_Views_SliderView__WEBPACK_IMPORTED_MODULE_0__["SliderView"](sliderContainer);
        let inputsView = new _MVP_Views_InputsView__WEBPACK_IMPORTED_MODULE_1__["InputsView"](inputsContainer);
        let scaleView = new _MVP_Views_ScaleView__WEBPACK_IMPORTED_MODULE_2__["ScaleView"](scaleContainer);
        let optionsPanelView = new _MVP_Views_OptionsPanelView__WEBPACK_IMPORTED_MODULE_3__["OptionsPanelView"](optionsPanelContainer);
        let presenter = new _MVP_Presenter__WEBPACK_IMPORTED_MODULE_5__["Presenter"](model, sliderView, inputsView, scaleView, optionsPanelView);
    }
    ;
    static render(elements) {
        let [rangeSlidersContainer, sliderContainer, inputsContainer, scaleContainer, optionsPanelContainer,] = elements;
        //плагин
        let rangeSlider = document.createElement("div");
        rangeSlider.className = "range-slider";
        //слайдер
        sliderContainer.className = "range-slider__slider-container";
        //шкала
        scaleContainer.className = "range-slider__scale-container";
        //контейнер слайдер + шкала
        let mainContentContainer = document.createElement("div");
        mainContentContainer.className = "range-slider__main-content-container";
        mainContentContainer.append(sliderContainer);
        mainContentContainer.append(scaleContainer);
        rangeSlider.append(mainContentContainer);
        //инпуты
        inputsContainer.className = "range-slider__inputs-container";
        //контейнер инпуты + опции
        optionsPanelContainer.className = "range-slider__options-panel-container";
        optionsPanelContainer.append(inputsContainer);
        rangeSlider.append(optionsPanelContainer);
        rangeSlidersContainer.append(rangeSlider);
    }
}
RangeSlider.sliderInstanceCount = 0;



/***/ }),

/***/ "./src/pages/TestPage.scss":
/*!*********************************!*\
  !*** ./src/pages/TestPage.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./TestPage.scss */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/pages/TestPage.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./src/pages/TestPage.ts":
/*!*******************************!*\
  !*** ./src/pages/TestPage.ts ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_RangeSlider_RangeSlider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/RangeSlider/RangeSlider */ "./src/components/RangeSlider/RangeSlider.ts");
/* harmony import */ var _TestPage_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TestPage.scss */ "./src/pages/TestPage.scss");
/* harmony import */ var _TestPage_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_TestPage_scss__WEBPACK_IMPORTED_MODULE_1__);

let options = {
    sliderStripLength: 500,
    sliderStripThickness: 10,
    handleWidth: 20,
    handleHeight: 20,
    minValue: -23,
    maxValue: 123,
    borderThickness: 10,
    firstValue: 0,
    lastValue: 50,
    stepSize: 0.00001,
    hasTwoSlider: true,
    isInterval: true,
    maxSegmentsCount: 5,
    scaleFontSize: 15,
    angle: 0,
};
_components_RangeSlider_RangeSlider__WEBPACK_IMPORTED_MODULE_0__["RangeSlider"].createRangeSlider(".test-page__tested-range-slider-container2", options);



/***/ })

/******/ });
//# sourceMappingURL=TestPage.js.map?v=ab2c2b5e3ee4fded9e08