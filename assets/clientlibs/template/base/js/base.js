/* Tue May 22 2018 10:41:54 GMT+0800 (CST) */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('../../../../clientlibs/utilities/utils');

var libs = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var calculator = function () {
	function calculator(el) {
		_classCallCheck(this, calculator);

		this.props(el);
		this.events();
		this.initData();
	}

	_createClass(calculator, [{
		key: 'props',
		value: function props(el) {
			this.el = $(el);
			this.options = $.extend({}, this.el.data());
			this.carsImage = $('[cars-image]', this.el);
			this.carsSeries = $('[cars-series]', this.el);
			this.carsType = $('[cars-type]', this.el);
			this.carsModel = $('[cars-model]', this.el);
			this.carsPrice = $('[cars-price]', this.el);
		}
	}, {
		key: 'events',
		value: function events() {}
	}, {
		key: 'initData',
		value: function initData() {
			var _this = this;

			var onError = function onError(res) {
				console.log("error");
			};

			$.ajax({
				url: this.el.data('url'),
				data: {},
				method: 'GET',
				dataType: 'JSON',
				success: function success(res) {
					_this.successFn(res);
				},
				error: onError
			});
		}
	}, {
		key: 'successFn',
		value: function successFn(res) {
			var $data = res && res.data && res.data.series ? res.data.series : "";
			var $series = $data.length ? $data[0].name : '';
			var $type = $data[0].subseries.length ? $data[0].subseries[0].name : '';
			var $image = $data[0].subseries.length ? $data[0].subseries[0].image : '';
			var $model = $data[0].subseries[0].model[0] ? $data[0].subseries[0].model[0].name : '';
			var $price = $data[0].subseries[0].model[0] ? $data[0].subseries[0].model[0].value : '';
			$price = new Number($price);
			if (this.carsImage.length && $image) {
				this.carsImage.html('<img src="' + $image + '"></img>');
			}
			if (this.carsSeries.length && $series) {
				this.carsSeries.html($series.replace(/<[^>]+>/g, ''));
			}
			if (this.carsType.length && $type) {
				this.carsType.html($type.replace(/<[^>]+>/g, ''));
			}
			if (this.carsModel.length && $model) {
				this.carsModel.html($model.replace(/<[^>]+>/g, ''));
			}
			if (this.carsPrice.length && $price) {
				this.carsPrice.html(libs.formatPriceWithCurrency(this.options.currency, $price.toLocaleString()));
			}
		}
	}]);

	return calculator;
}();

exports.default = calculator;

},{"../../../../clientlibs/utilities/utils":6}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
				value: true
});

exports.default = function (props, option, isInit) {
				return '\n\t\t<div tabindex="0" class="dropdown-menu list-cars">\n\t    <ul class=" ">\n\t      ' + (props && props.length && isInit ? props.map(function (item, index) {
								return '\n\t        <li\n\t          class="list-cars-item" data-index="' + index + '" data-img="' + (item.image ? item.image : '') + '" type="' + (item.type ? item.type : '') + '" data-note="' + (item.note ? item.note : '') + '" \n\t          data-value="' + (item.value ? item.value : '') + '" \n\t          data-name="' + item.name + '">\n\t          <a href="javascript:void(0);" data-index="' + index + '" data-img="' + (item.image ? item.image : '') + '" data-note="' + (item.note ? item.note : '') + '" \n\t          data-value="' + (item.value ? item.value : '') + '" data-name="' + item.name + '" >' + item.name + '</a>\n\t        </li>\n\t      ';
				}).join("") : '') + '\n\t    </ul>\n\t  </div>\n\t  <button\n\t    class="dropdown-toggle btn-select" \n\t    type="button" \n\t    data-toggle="dropdown"\n\t    model-select-btn\n\t  >\n\t    ' + option.select + '\n\t  </button>\n';
};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _device = require('../../../../clientlibs/utilities/device');

var _utils = require('../../../../clientlibs/utilities/utils');

var libs = _interopRequireWildcard(_utils);

var _renderOptions = require('./render-options');

var _renderOptions2 = _interopRequireDefault(_renderOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var seriesSelector = function () {
	function seriesSelector(el) {
		_classCallCheck(this, seriesSelector);

		this.props(el);
		this.events();
		this.loadData();
	}

	_createClass(seriesSelector, [{
		key: 'props',
		value: function props(el) {
			this.el = $(el);
			this.options = this.el.data();
			this.$modelselectWrap = $('[model-select-wrap]', this.el);
			this.$modelSelectorBtn = $('[model-select-btn]', this.el);
			this.$note = $('[calcultor-note]', this.el);
			this.currency = '¥';
			this.classNames = {
				selected: 'modelselect--selected'
			};
			this.data = null;
			this.$carsType = this.el.closest('.calculator__wrapper').find("[cars-type]");
			this.$carsSereis = this.el.closest('.calculator__wrapper').find("[cars-series]");
			this.$carsPrice = this.el.closest('.calculator__wrapper').find("[cars-price]");
			this.$carsImage = this.el.closest('.calculator__wrapper').find("[cars-image]");
			this.$carsMode = this.el.closest('.calculator__wrapper').find("[cars-model]");
			this.$clearBtn = this.el.closest('.calculator__wrapper').find("[btn-clear]");
		}
		// init isScroll

	}, {
		key: 'init',
		value: function init(isInit) {
			if (isInit) {
				var $listCars = $('.list-cars', this.el);
				$listCars.data('iscroll', (0, _device.isMobile)() ? {
					refresh: $.noop,
					scrollTo: function scrollTo() {
						var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
						var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
						var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;

						$listCars.animate({
							scrollTop: y
						}, time);
					}
				} : new IScroll($listCars.get(0), {
					mouseWheel: true,
					interactiveScrollbars: (0, _device.isDesktop)() || (0, _device.isBrowser)('ie'),
					scrollbars: 'custom',
					keyBindings: true,
					HWCompositing: false,
					tap: true
				}));

				$('.dropdown-toggle', this.el).dropdown();
			}
		}
	}, {
		key: 'events',
		value: function events() {
			var _this = this;

			var namespace = 'modelselect';
			var clickEvent = 'click.' + namespace;
			var tapEvent = 'tap.' + namespace;
			var clickItemEvent = (0, _device.isIOS)() && (0, _device.isTablet)() ? tapEvent : clickEvent;

			$('.dropdown-cars', this.el).on('shown.bs.dropdown', function () {
				var $listCars = _this.el.find('.list-cars');

				var iScrollInstance = $listCars.data('iscroll');
				if (iScrollInstance) {
					iScrollInstance.refresh();
					iScrollInstance.scrollTo(0, 0, 200);
				}

				$('.dropdown-bikes', _this.el).off(clickEvent).on(clickEvent, function (ev) {
					_this.handlerClickDropdown(ev);
				});
				$('li', $listCars).off(clickItemEvent).on(clickItemEvent, function (ev) {
					_this.handlerClickDropdownItem(ev);
				});
			}).on('hidden.bs.dropdown', function () {
				if (!(0, _device.isMobile)()) {
					return false;
				}
			});

			this.$clearBtn.off("click").on("click", function (ev) {
				console.log(ev.target);
			});
		}
	}, {
		key: 'loadData',
		value: function loadData() {
			var _this2 = this;

			var onError = function onError(res) {
				console.log("error");
			};

			$.ajax({
				url: this.el.data('url'),
				data: {},
				method: 'GET',
				dataType: 'JSON',
				success: function success(res) {
					_this2.successFn(res, _this2.options.from);
				},
				error: onError
			});
		}
		// init data

	}, {
		key: 'populateSelect',
		value: function populateSelect(item, data, options) {
			var isInit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

			item.html((0, _renderOptions2.default)(data, options, isInit));
			this.init(isInit);
		}
		// ajax success callback

	}, {
		key: 'successFn',
		value: function successFn(res) {
			this.data = res.data;
			var data = res.data[this.options.type];
			this.populateSelect(this.$modelselectWrap, data, this.options.texts, !this.options.from);
		}

		// handler button click events

	}, {
		key: 'handlerClickDropdown',
		value: function handlerClickDropdown(ev) {
			ev.preventDefault();
			ev.stopPropagation();
			var $target = $(ev.currentTarget);
			this.$modelSelectorBtn = $('[model-select-btn]', this.el);
			this.$modelSelectorBtn.html($target.html());
			this.$modelSelectorBtn.addClass(this.classNames.selected);
			this.$modelSelectorBtn.dropdown('toggle');
			this.$modelSelectorBtn.blur();
		}

		// handler options click events

	}, {
		key: 'handlerClickDropdownItem',
		value: function handlerClickDropdownItem(ev) {
			var $target = $(ev.currentTarget);
			var $index = $target.data('index');
			var $name = $target.data('name');
			var $value = $target.data('value');
			var $image = $target.data('img');

			this.handlerClickDropdown(ev);
			if (this.options.type === 'series') {
				this.populatesubseries($index, this.options.to);
				this.$carsSereis.html($name);
				this.$carsType.html('');
				this.$carsPrice.html('');
				this.$carsMode.html('');
			}
			if (this.options.type === 'subSeries') {
				var $parentIndex = $('[data-to=\'' + this.options.from + '\']').find('button a').data('index');
				this.populateModel($index, $parentIndex, this.options.to);
				if ($image.length) {
					this.$carsImage.html('<img src="' + $image + '"></img>');
				}
				this.$carsType.html($name);
			}
			if (this.options.type === 'model') {
				this.$carsMode.html($name);
				this.$carsPrice.html(libs.formatPriceWithCurrency(this.currency, $value.toLocaleString()));
			}
			if (this.options.type === 'loans' && this.$note.length) {
				var $note = $target.data('note');
				this.$note.html($note);
			}
		}
		// set the second level data

	}, {
		key: 'populatesubseries',
		value: function populatesubseries(index, dataTo) {
			var $subSeriesData = this.data.series[index].subseries;
			var item = $('[data-from=\'' + dataTo + '\']').find('[model-select-wrap]');
			if (item.length) {
				this.populateSelect(item, $subSeriesData, this.options.texts, true);
			}
		}

		// set the third level data

	}, {
		key: 'populateModel',
		value: function populateModel(index, parentIndex, dataTo) {
			var $modelData = this.data.series[parentIndex].subseries[index].model;
			var item = $('[data-from=\'' + dataTo + '\']').find('[model-select-wrap]');
			if (item.length) {
				this.populateSelect(item, $modelData, this.options.texts, true);
			}
		}
	}]);

	return seriesSelector;
}();

exports.default = seriesSelector;

},{"../../../../clientlibs/utilities/device":5,"../../../../clientlibs/utilities/utils":6,"./render-options":2}],4:[function(require,module,exports){
'use strict';

var _promisePolyfill = require('promise-polyfill');

var _promisePolyfill2 = _interopRequireDefault(_promisePolyfill);

var _calculator = require('../../../component/calculator/es6/calculator');

var _calculator2 = _interopRequireDefault(_calculator);

var _seriesSelector = require('../../../component/series-selector/es6/series-selector');

var _seriesSelector2 = _interopRequireDefault(_seriesSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!window.Promise) {
  window.Promise = _promisePolyfill2.default;
}

var components = {
  'calculator': _calculator2.default,
  'series-selector': _seriesSelector2.default
};

$(function () {
  $('[data-component]').each(function (index, el) {
    var $el = $(el);
    var name = $el.data('component');

    if (components[name]) {
      new components[name]($el);
    }
  });
});

},{"../../../component/calculator/es6/calculator":1,"../../../component/series-selector/es6/series-selector":3,"promise-polyfill":7}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRetinaScreen = isRetinaScreen;
exports.isIOS = isIOS;
exports.isWebkit = isWebkit;
exports.isIE = isIE;
exports.isSafari = isSafari;
exports.isMobile = isMobile;
exports.isTablet = isTablet;
exports.isDesktop = isDesktop;
exports.isBrowser = isBrowser;
exports.isLandscape = isLandscape;
exports.isAndroid = isAndroid;
exports.deviceType = deviceType;
exports.getBody = getBody;
var htmlEl = $('html');

var dpr = window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI || // fallback for IE
1 // default value
;

function isRetinaScreen(params) {
  return !!(dpr > 1);
}

function isIOS() {
  return htmlEl.hasClass('ios');
}

function isWebkit() {
  return htmlEl.hasClass('webkit');
}

function isIE() {
  return htmlEl.hasClass('ie');
}

function isSafari() {
  return htmlEl.hasClass('safari');
}

function isMobile() {
  return htmlEl.hasClass('mobile');
}

function isTablet() {
  return htmlEl.hasClass('tablet');
}

function isDesktop() {
  return htmlEl.hasClass('desktop');
}

function isBrowser(name) {
  return htmlEl.hasClass(name);
}

function isLandscape() {
  return htmlEl.hasClass('landscape');
}

function isAndroid() {
  return htmlEl.hasClass('android');
}

function deviceType() {
  if (isMobile()) {
    return 'mobile';
  }

  if (isTablet()) {
    return 'tablet';
  }

  if (isDesktop()) {
    return 'desktop';
  }
}

function getBody() {
  return $(isWebkit() ? 'html, body' : 'html');
}

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.formatPriceWithCurrency = formatPriceWithCurrency;

// Format Price with Currency

function formatPriceWithCurrency(currency, price) {
	var finalPrice = price || 0;
	var finalCurrency = currency || '$';
	return finalCurrency + finalPrice;
}

},{}],7:[function(require,module,exports){
(function (root) {

  // Store setTimeout reference so promise-polyfill will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var setTimeoutFunc = setTimeout;

  function noop() {}
  
  // Polyfill for Function.prototype.bind
  function bind(fn, thisArg) {
    return function () {
      fn.apply(thisArg, arguments);
    };
  }

  function Promise(fn) {
    if (!(this instanceof Promise)) throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    this._state = 0;
    this._handled = false;
    this._value = undefined;
    this._deferreds = [];

    doResolve(fn, this);
  }

  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }
    if (self._state === 0) {
      self._deferreds.push(deferred);
      return;
    }
    self._handled = true;
    Promise._immediateFn(function () {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }
      var ret;
      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }
      resolve(deferred.promise, ret);
    });
  }

  function resolve(self, newValue) {
    try {
      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        var then = newValue.then;
        if (newValue instanceof Promise) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === 'function') {
          doResolve(bind(then, newValue), self);
          return;
        }
      }
      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }

  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }

  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      Promise._immediateFn(function() {
        if (!self._handled) {
          Promise._unhandledRejectionFn(self._value);
        }
      });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
  }

  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }

  /**
   * Take a potentially misbehaving resolver function and make sure
   * onFulfilled and onRejected are only called once.
   *
   * Makes no guarantees about asynchrony.
   */
  function doResolve(fn, self) {
    var done = false;
    try {
      fn(function (value) {
        if (done) return;
        done = true;
        resolve(self, value);
      }, function (reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      });
    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }

  Promise.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
  };

  Promise.prototype.then = function (onFulfilled, onRejected) {
    var prom = new (this.constructor)(noop);

    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };

  Promise.all = function (arr) {
    return new Promise(function (resolve, reject) {
      if (!arr || typeof arr.length === 'undefined') throw new TypeError('Promise.all accepts an array');
      var args = Array.prototype.slice.call(arr);
      if (args.length === 0) return resolve([]);
      var remaining = args.length;

      function res(i, val) {
        try {
          if (val && (typeof val === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(val, function (val) {
                res(i, val);
              }, reject);
              return;
            }
          }
          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };

  Promise.resolve = function (value) {
    if (value && typeof value === 'object' && value.constructor === Promise) {
      return value;
    }

    return new Promise(function (resolve) {
      resolve(value);
    });
  };

  Promise.reject = function (value) {
    return new Promise(function (resolve, reject) {
      reject(value);
    });
  };

  Promise.race = function (values) {
    return new Promise(function (resolve, reject) {
      for (var i = 0, len = values.length; i < len; i++) {
        values[i].then(resolve, reject);
      }
    });
  };

  // Use polyfill for setImmediate for performance gains
  Promise._immediateFn = (typeof setImmediate === 'function' && function (fn) { setImmediate(fn); }) ||
    function (fn) {
      setTimeoutFunc(fn, 0);
    };

  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };

  /**
   * Set the immediate function to execute callbacks
   * @param fn {function} Function to execute
   * @deprecated
   */
  Promise._setImmediateFn = function _setImmediateFn(fn) {
    Promise._immediateFn = fn;
  };

  /**
   * Change the function to execute on unhandled rejection
   * @param {function} fn Function to execute on unhandled rejection
   * @deprecated
   */
  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
    Promise._unhandledRejectionFn = fn;
  };
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Promise;
  } else if (!root.Promise) {
    root.Promise = Promise;
  }

})(this);

},{}]},{},[4]);
