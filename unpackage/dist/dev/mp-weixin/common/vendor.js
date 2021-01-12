(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


// import navigateTo from 'uni-helpers/navigate-to'

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"gmt_member","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

function createApp(vm) {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 12:
/*!**************************************!*\
  !*** E:/uniapp/ykt/common/common.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.timeFormat = timeFormat;exports.timeFormat1 = timeFormat1;exports.dateDifference = dateDifference;exports.myRequest = myRequest;exports.myRequest2 = myRequest2;exports.loginUser = loginUser;exports.getToken = getToken;exports.userToken = userToken;exports.myLogin = myLogin;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 13));var _global = _interopRequireDefault(__webpack_require__(/*! @/common/global */ 16));
var _index = _interopRequireDefault(__webpack_require__(/*! @/store/index.js */ 20));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}
// 时间戳转
function timeFormat(nS) {
  var date = new Date(parseInt(nS)); // 时间戳为10位需乘1000，为13位则不用
  console.log(date);
  var Y = date.getFullYear(); // 年
  var M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1; // 月
  var D = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate() + ''; // 日
  // return 125896455;
  return "".concat(Y, "/").concat(M, "/").concat(D); // yyyy-mm-dd
}
// 格林尼治时间转
function timeFormat1(nS, type) {
  var date = new Date(nS); // 
  var Y = date.getFullYear(); // 年
  var M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1; // 月
  var D = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate(); // 日
  var H = date.getHours() < 10 ? '0' + date.getHours() + '' : date.getHours(); //时
  var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() + '' : date.getMinutes(); //分
  var Z = date.getDay();
  if (type === 0)
  return {
    month: "".concat(M, "\u6708").concat(Y),
    day: "".concat(D),
    week: "".concat(Z) };else

  if (type === 3) {
    return "".concat(Y, "/").concat(M, "/").concat(D); // yyyy-mm-dd
  } else

  return "".concat(M, "/").concat(D, " ").concat(H, ":").concat(minute); // mm-dd hh:minute
}
//两个时间相差天数 兼容firefox chrome
function dateDifference(sDate1, sDate2) {//sDate1和sDate2是2006-12-18格式 
  var dateSpan,
  tempDate,
  iDays;
  sDate1 = Date.parse(sDate1);
  sDate2 = Date.parse(sDate2);
  dateSpan = sDate2 - sDate1;
  dateSpan = Math.abs(dateSpan);
  iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
  return iDays;
};
// -----------------------封装uni.request请求--------------------
function myRequest(url, config) {
  return new Promise(function (resolve, reject) {var _config = _objectSpread({},





    config),_config$data = _config.data,data = _config$data === void 0 ? {} : _config$data,_config$contentType = _config.contentType,contentType = _config$contentType === void 0 ? 'application/x-www-form-urlencoded' : _config$contentType,_config$method = _config.method,method = _config$method === void 0 ? 'POST' : _config$method,other = _objectWithoutProperties(_config, ["data", "contentType", "method"]); //解构赋值

    uni.getStorageSync("gtoken") ? url = url + "?token=" + uni.getStorageSync("gtoken") : url = url; //把token绑定在后面

    uni.request({
      url: _global.default.ip + url,
      data: _objectSpread({}, data),
      method: method,
      header: {
        'content-type': contentType },

      success: function success(res) {
        resolve(res);
      } });

  });
}
// -----------------------封装uni.request请求多种参数模式--------------------
function myRequest2(url, config) {
  return new Promise(function (resolve, reject) {var _config2 = _objectSpread({},





    config),_config2$data = _config2.data,data = _config2$data === void 0 ? {} : _config2$data,_config2$contentType = _config2.contentType,contentType = _config2$contentType === void 0 ? 'application/x-www-form-urlencoded' : _config2$contentType,_config2$method = _config2.method,method = _config2$method === void 0 ? 'POST' : _config2$method,other = _objectWithoutProperties(_config2, ["data", "contentType", "method"]); //解构赋值

    uni.getStorageSync("gtoken") ? url = url + "?token=" + uni.getStorageSync("gtoken") : url = url; //把token绑定在后面
    other.otherParams ? url += other.otherParams : url = url; //有其他需要拼接在后面的参数时

    uni.request({
      url: _global.default.ip + url,
      data: data,
      method: method,
      header: {
        'content-type': contentType },

      success: function success(res) {
        resolve(res);
      } });

  });
}
// -----------------------------------
function loginUser() {
  return new Promise(function (resolve, reject) {
    uni.login({
      success: function success(loginRes) {
        if (loginRes.code) {
          uni.getUserInfo({
            success: function success(user) {
              getApp().globalData.login = 1;
              uni.request({
                url: _global.default.ip + "wx/wxLogin",
                method: "POST",
                data: {
                  code: loginRes.code,
                  encryptedData: user.encryptedData,
                  iv: user.iv },

                success: function success(reqRes) {
                  resolve(reqRes);
                  if (reqRes.data.code === 200) {
                    _index.default.commit("changeLogin", true);
                    uni.setStorageSync('openId', reqRes.data.data.openId);
                  } else {
                    _index.default.commit("changeLogin", false);
                  }
                } });

            }, fail: function fail(err) {//用户未授权
              getApp().globalData.login = 0;
              getApp().globalData.hasAgree = false;
            } });

        } else {
          console.log('登录失败！' + user.errMsg);
        }
      } });

  });
  // ----------------------------------------------
}
//async await方式实现异步 获取token
function getToken(_x, _x2) {return _getToken.apply(this, arguments);}



































// 
function _getToken() {_getToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(encryptedData, iv) {var result;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:result = "";_context.next = 3;return new Promise(function (resolve, reject) {uni.login({ success: function success(res) {if (res.code) {uni.request({ url: _global.default.ip + 'miniProgram/api/get/gmt/crm/token', //仅为示例，并非真实的接口地址
                      data: { encryptedData: encryptedData, iv: iv, code: res.code }, header: { 'content-type': 'application/json' // 默认值
                      }, success: function success(res) {if (res.data.status === 0) {_index.default.commit("changeLogin", true);uni.setStorageSync('gtoken', res.data.token);} else {_index.default.commit("changeLogin", false);console.log(9869, res.data);}resolve(res);} });}} });});case 3:result = _context.sent;return _context.abrupt("return", result);case 5:case "end":return _context.stop();}}}, _callee);}));return _getToken.apply(this, arguments);}function userToken() {uni.getUserInfo({ success: function success(e) {//用户已授权
      getApp().globalData.login = 1;
      // -----------------判断是否绑定手机号------------------
      getToken(e.encryptedData, e.iv).then(function (res) {
        if (res.data.status === 0) {
          getApp().globalData.phone = 1;
          console.log('已绑定手机号');
        } else {
          getApp().globalData.phone = 0;
        }

      });
      // ------------------------------
    },
    fail: function fail(err) {//用户未授权
      getApp().globalData.login = 0;
      getApp().globalData.hasAgree = false;
    } });

}
//----------登录----------------
function myLogin() {
  uni.login({
    success: function success(res) {
      if (res.code) {
        userToken();
      } else {
        console.log('登录失败！' + res.errMsg);
      }
    } });

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 124:
/*!****************************************************!*\
  !*** E:/uniapp/ykt/static/images/tasks/task_1.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlDQ0VDQzA2RUQwQTExRUE5RDM0RTI1Q0Y0REI2Njk2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlDQ0VDQzA3RUQwQTExRUE5RDM0RTI1Q0Y0REI2Njk2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUNDRUNDMDRFRDBBMTFFQTlEMzRFMjVDRjREQjY2OTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUNDRUNDMDVFRDBBMTFFQTlEMzRFMjVDRjREQjY2OTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5XdayIAAAGSklEQVR42uyd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"

/***/ }),

/***/ 125:
/*!****************************************************!*\
  !*** E:/uniapp/ykt/static/images/tasks/task_2.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg0OUFBOTE2RUQwQTExRUFBMzAzRjc1REE2NDdBN0E2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjg0OUFBOTE3RUQwQTExRUFBMzAzRjc1REE2NDdBN0E2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODQ5QUE5MTRFRDBBMTFFQUEzMDNGNzVEQTY0N0E3QTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODQ5QUE5MTVFRDBBMTFFQUEzMDNGNzVEQTY0N0E3QTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4+2v5SAAALzElEQVR42uxd649dVRVfa+68GTuvdqbFqYlQoIgfTA0NMYoPAo0kQjBB5AsmJoYUSeWD+gf42QcSLZ80MTFpq4ZPRmNrUhSCYAUFTQhiKoFOmbbTdh5lpvO4d7n2Ofux1j7nTqftvcfO6VnNntt75pxz5/z22r/9W2uvcw++v9KAdVgXtz3c7uV2J7ebuA1x64Hry5a4zXA7zu0YtyPc/sBt5VIH4iWANmA+xe0Jblugsjyb5vZTbk/bTrhsoL9qDx6vsFyXnbJOeTDvlx0522rc9nM7UIF8WTZuMdtvMVwTaLPDr7jtrXC7YttrMaytBbShii9XWF21GQx/3AzoR7g9WWHUMvumxVRNhkZdvMVtrMKnpXaa221GjTiPfqoCuS02ZrFNPLqbX09UOrltdobbhPHo+yqQ22oG2/sc0JW11/YYoHdVOLTddhmgb61waLvdYoAerHBouw0aoLsrHNpu3R0VBsVYBXRB1nkt/lF/Zol/9BTC1EWAOq3vmBoCbO0F+Pw4wWdYueI1dk0mMqRr6Q/69XsIR6au7hz3bgV4eDtV1NHMJhcB/jh19ecx5zDnuq6pY4kd7fRq+hrbK2cBWuGH5hzPTwPs3qI3mu097FrjXQC9HSUFeroOcPgCwJvLlncpC+riQus+7+V5gL83EIhSlA1nE6H5AR388vF+gPtHALZ0lQjo4wzuL2cBLpL2utjbai1U9LWuBFl1/uQdg1xvALx+AeGtBYKvM5/v6CsBR8/zRR2YY5Ab4kpBvFoQzLtuVg1dvS3wHu6wTu+pCM6n0QDPfwfZj16sI/yC+fxCvQRAv8B08EHDXm8ycilxtOSircMhWefjNjBC0N1/5Z9nOqpvkx46jjLIAo/Je+sIPF8cPV8C6njzor1e8linw9heK1LYmPyXu35gmKA+yM63EkY/iP2cp5I9qQGS30FHLXUddH2YvJIaPekL+c82v/kXzx1f2rzBgT7XiHhZAIZyG1j0MX1jJqyObguW7x03KsB7aDiH9Vo3OvyOkrLIfx66KZL3mV5FaI3e+T9SB0n3Be298bVZ/CQu9lXEecm5UJzfAkokzumoAiH4sNju6MTuvloGjk6uDYRnkcLbbyMCrflIdFTOqz2xOAY1yBhO4nZrkBseGHl6CTiaKMuvlCPzEDQfU8bXxU+KnNyBbCfb0KmouCdwN4XRkCfoN3RkKEFG4cUYeWxMKSSpg8TxmD2IUgnnONuNJAO+5OTkTQOjCWCjU4cdnn4SQk0fybZkEhQqRFFD5NGImvPlKPBSTtMSCq5Ofjac8nCfiyXwaHQexWAjKc+WU5WTaCS2xXSi9xAU28iQSybqlB2OXvSR75iND3SejIskMakJTBxDmCH4jBwkih3f00VCJR7sMHl6aiHZpSUAmlDoNhQTpPJNTDxTxeTO78i9Ci90kCH6c1NEOW5fUhGPoBY7wrAMHk2RrAPKwKsitoQg+Mob3qtT2tnRQ/DRXoRBjmSWTaqVf/yTw/u5eqwuwowrqUXSNIGQeQWtDxSjOigEfSSGMuYNeyI1KX5hE8ADwwCbOzFD/ga/Vzl8PnSGYHLJkoCKClFLxhwdTbHe3MhAq7iCIj3nozVSYfJADWHfOMDH+taWTHcOAHziBoSfTRH8aQYU1Ug0KZ4cok5vt2t3FoOyDEgoE4YQ6FyEuafuO1sBbl5nyrSLD318G8IqH/ziDAXgyCWcdI+T6Gxy1FIWjnYXnxv9+Uky9e5HNmMG5L8yRTw/R/D+EkJfDWAn//5+QyldoSO/wZ3znwXkfXImWj8RaE2NxQSGBa8Z5kyEHnirOMzS0j2b9H77mRZemkehVgj+u8jAM1V8dwJhp81fm/XAh7cAPHOCovyI8HIBuOdnKkH2TrqtdibUCSJrnx7ApEbD2e/PgwU56iVuC3WEH04CzIvs227upP4appThokUb6oT5AVUyqgiP7igCZ0ouJoTOPkARuVEnuXaKyc84+W/PJ2k3H2AQaU6fY2I+OqP5ekev9WhElR10KVuywRAVIziKmgxt4ExNJkgISsHsNypk3JkVgJkVN0lSkhMhiIMTgneiGo7RzvgzrD7P0/VQEqAdyNm0JyoVgsG51XDTQo2U3pbRoqQfimVdTnpWh62loQ7Bw37Ikvc1OazPrYZjjaIY7hTKhcKKts9n8P9v7ddgTa+g7WK0nxcHLk2D1Y09GbrL1tEZeHnlk8xkwmpSiacHRrL5aKcizD/TGXcPhY9bYmL/9wckRovtFsxkVVMqomL0XQEenXpwgyCTXw4Tf1jje3EOYEVc+B7Wyl8cTvnZoYVWUYx2EXx7O0CfuIqXZm0NiZ/w0I8Ykgkkv/BQkqUs561IUUTYALHSEq7eUMfvzgE8OBq8+rFxhE9+yNRfEJxcRhhgYHfz+3tGUCU4F/mch6Z0mtTVM6BNJjXs/1HmwcuR64g1sF9UitKl6PvlN9NpmdYdopDG/P+O/ubeZ0bMM+8afnYeHySjL0wQ+W0Sq72EZQhYlB7AnAlI5Ijt+F7l9n2O7o7Nr/8zTnDY/bdZEHV2GOhB1oH4iBCt9MRCxHQBdR2ktauf8tPojYiUaztFYerifvAewNMnAN69eMmIHj7SC3DXUCzh5QoN6jQtyj8Jy0EdfgVE1ISRnhO97EPSS0sv8+T4l1mCbd0AN/chDPFfvMxcfHqJYIgVx96JsO/XtgG8NpsqD7/YTdHSLOWrohJMhj5s0Tlom/tACmtbKMJzneFDOMnUcHJJc67Z/3OsSm6/wepu7oyHxgAOTEG2FocyqRcQ5SAlCVhEFEeei10VqaASd8kokmoq+hPkYlMgP5+00tHag2Omoj89uYwkKY9zSFSybviAJcpqyPpoHzFi8Hi13CSKZHQiKIBv0qVHzoqkEl/RQ1tR1+iRCJbcXIDFRYUFRYYEijVIaGenBnIknpdeguMlQuFWCYCDU5TUOTvrwTj3LdKj7ngqtPSuuMhQSjiK8h4KfNU/KM6BfgU7jprnVhB+9A7B8QWAN1gSHpgMC2RhoTeEhUR5BZYliQxlxX0o3Qh5DxJFeCRXPSjS4BSvYKdv/zGH8PqcViy+QkocRyHiL1eaVGbZnLrQJbhSZ6Ou/oc4GxTCahJRZkw5uflnsZXEuUqjOuJy0Tg4UEPYvDTQg+SpJcodp/kJl63A6FaCkHTS9ZIYlI8/NxU2IRZWbgAxIAS6lgNRSTEfuMT3oQApxaLSrE1knC8lc1IRs+VjGx5oktVIchiLYY6yziLi9+CJIjEULYvJhQAUJcIhXiI1kigTyWA5qAN9KpLEchXasjBdVeopg8LvfZgcpVrJ318V8y+Im4ICF+cRRVFzYjEFNGsVr1COSKFQR0fy3pTMbRCo58moWIRk0bq/EwyjnEdJ1gxrMReKmg55AxsJrvUr45m0KkYqJcctfZGjphjMqdN2BTQ9WAKgt3eTvVs2VAaRmsAkf4Zb2XLLfImiG40oky2Ka6/VvUPZ3RMPv7G/BEDv2qTHtkr4U1S2pYpjQnTX8Ot9qMJ4x+UaVMrLhEI8CGTQs3ukBIn/Tw0CfLgn54qBovJaMeRB3AgK+fSQJ+NQJaty6AWzx0ywN989VgKPNoVHj08A3Ngj8xUigPA6V/yOcsY+RHfWRlWpElOk6A7c6ARuPwPyvlsIOgvg6MK+U8l8GcoL5wGOzSKcWkpXQXwYTGIZK2/SyrulWVb0x8XlCLllX+4baMyXXN01SvDZMSgE5EKBvt6t+t67CujyAb1cwdB2WzZAz1Y4tN1mDdBvVzi03d42QL9a4dB2e80AfbjCoe122D0e5CS30QqPtph/PIhRHT+p8GibmafBLVePcGq/N5uHVfhHOJk79fZVuLTc9llsVWR4CNJHelbWGjNYHmwWgn+L23MVRldtz1ksoRnQ5q7qr3B7tsLqiu1Zi2F9LaAd2OapyY9C+jy+ytZnpy1mT8QgNwPameEX89DD73E7W+HY1M5ajG6DJk9QNoaX+QB286Q49wD2Ybv9ejLzoHXzbdPuAeyHbbtkBvR/AgwAj6hDkesmdS8AAAAASUVORK5CYII="

/***/ }),

/***/ 126:
/*!****************************************************!*\
  !*** E:/uniapp/ykt/static/images/tasks/task_3.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg5QzVFNzE2RUQwQTExRUFBOTI0QTJFMUIxOEFDNzg0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjg5QzVFNzE3RUQwQTExRUFBOTI0QTJFMUIxOEFDNzg0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODlDNUU3MTRFRDBBMTFFQUE5MjRBMkUxQjE4QUM3ODQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODlDNUU3MTVFRDBBMTFFQUE5MjRBMkUxQjE4QUM3ODQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz46+pqDAAALBUlEQVR42uxd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"

/***/ }),

/***/ 127:
/*!****************************************************!*\
  !*** E:/uniapp/ykt/static/images/tasks/task_4.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhDNzAxRjg2RUQwQTExRUE5NTJBQThEMzUwMkMyMEFGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhDNzAxRjg3RUQwQTExRUE5NTJBQThEMzUwMkMyMEFGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEM3MDFGODRFRDBBMTFFQTk1MkFBOEQzNTAyQzIwQUYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEM3MDFGODVFRDBBMTFFQTk1MkFBOEQzNTAyQzIwQUYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7sujumAAAIyUlEQVR42uyd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"

/***/ }),

/***/ 13:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 14);

/***/ }),

/***/ 14:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 15);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 142:
/*!*******************************************!*\
  !*** E:/uniapp/ykt/static/images/add.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAvCAYAAABzJ5OsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdDQzdDREZBNTg0MzExRUFBMDdBRENCQ0MyMUM1QUM5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdDQzdDREZCNTg0MzExRUFBMDdBRENCQ0MyMUM1QUM5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0NDN0NERjg1ODQzMTFFQUEwN0FEQ0JDQzIxQzVBQzkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0NDN0NERjk1ODQzMTFFQUEwN0FEQ0JDQzIxQzVBQzkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4RqCqwAAABDklEQVR42uyaMQrCQBBFE1EQBLERBEEt1EJBsLUKHsEz2Fh7GSttbC3srNwcQrAW1EoJ2FjqD25giwiiO8XiH/jwA8PMIxkWdoivlPIEYwSVoPm7hCAIvi6eFQSvQSvtr9DadoOMIHzHfMESDSTh74a/uQZvxsNleI/whCc84QlPeMITnvCE/z/4s+EjiQbJHbYMtSzX7hu+Bw3SksIw/KZ2hIv73ldKDfGwgXKOTc0kHpu6g+BxtOOxWeiZ7Fou3oDG2m+1bMUFWvqCS6cqdEw+MTRLS/pl6SR52jQNX+E5T3jCE57whCc84QlPeMITnvAfRN7wBdfgT4Y/SDSQ/HFiB02hovfaUFiPpwADAJhuI8i+oRpZAAAAAElFTkSuQmCC"

/***/ }),

/***/ 143:
/*!*********************************************!*\
  !*** E:/uniapp/ykt/static/images/error.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ5QUE4N0I1NUMzRTExRUFCQkUxRkFDNzE3NzczRDNEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ5QUE4N0I2NUMzRTExRUFCQkUxRkFDNzE3NzczRDNEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDlBQTg3QjM1QzNFMTFFQUJCRTFGQUM3MTc3NzNEM0QiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBQTg3QjQ1QzNFMTFFQUJCRTFGQUM3MTc3NzNEM0QiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4fGMTNAAACoElEQVR42ryYW4hNURjH1zmmiVwKKR6UgxBJLg1KIjVnDoVcEmWaQU1TPMk0MRliHsbtSZMHD04pk0ZqHuaQclcuJWkkxriPcRklt9AY/l/9dy272bO/tc3Z//p19jlnre/897fX5Vsn8bukxDhqPJkOUmAk+ARegnvgGXisDZbM5UyBsu0gsAmsBosV7W+D0yALukKNKALuAO3gqNKAqAgcAk9BHRgQ1cQUcAccAGNMNA0FO8ETGnMysQg8AHNM/2gcuAXWak1Iyi8pH5WrZJysCzMxFlw0+VWjP8N+E+dMPDoPCnszsQ1MjcnECHDYb2IIqDfxaisYbZvYyAWpL30BLYrgHeAU6Fa0rbZNVCg6bAHLSJDegBlgA2hQxCz3TKTYMUwz+SrZWNrL951gNvjI99MUMYf1ZDKzxMRk5TOU1O3idQ5kfBkQk2+t0b9EGXdlUpkFT/tBjTWdy0Ar5/07K1PFDjFTYmKC46jeB/byOsstvZOPtsWXIY0GF3B6umo3+MUdUpQA18H8CLEKxf3PCB0/gKvW+z/gZMT1oltMvHDs9JqP4BoYCEr5eUPI9A3SNzFx16HDK84CbxBe5rjYYw3KFa43JSYeKhs/4jrQZc2OubyutYw0g1Vyh8q4zWKiTVmYVnIseAbSvu9tI2fBCUXM7yh0b3jL9nGliYVciNIBbWo5feeBBcoixyRY8o8C7038mohMtCetKVcXs4EmVvH/FDU11tqfb8k2vzmovEvHZGI5+Bxk4j5Yk2cDVdyF+yz5z4D1eTIg5cBB7eGnkQegjn768a88+NS7HgOv8Ch45D8NZBmnKeqBWO5gO5jEu3iu/GGptI6xYCoLy6j2r4E2Ps9q7h/FrE2Hs0r/wdEuO/IFcBP0aFP1V4ABADqoiMAfFNe3AAAAAElFTkSuQmCC"

/***/ }),

/***/ 15:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 19:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"gmt_member","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"gmt_member","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"gmt_member","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"gmt_member","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!************************************!*\
  !*** E:/uniapp/ykt/store/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 21));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  state: {
    isGmtInviteUser: 0,
    hasAgree: true,
    person: {},
    login: false //获取toekn有没有成功
  },
  getters: {},


  mutations: {
    changeIntegral: function changeIntegral(state, num) {
      state.person.gmtIntegralNum = num;
    },
    changePerson: function changePerson(state, person) {
      state.person = person;
    },
    changeLogin: function changeLogin(state, isLogin) {
      state.login = isLogin;
    },
    changeInvite: function changeInvite(state, num) {
      state.isGmtInviteUser = num;
    } },

  // 异步时才要用actiton
  actions: {
    changeIntegralAction: function changeIntegralAction(context, num) {
      context.commit('changeIntegral', num);
    },
    changePersonAction: function changePersonAction(context, person) {
      context.commit('changePerson', person);
    } } });var _default =



store;exports.default = _default;

/***/ }),

/***/ 208:
/*!*********************************************************!*\
  !*** E:/uniapp/ykt/static/images/after_lottery_btn.png ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 209:
/*!***************************************************!*\
  !*** E:/uniapp/ykt/static/images/lottery_btn.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 21:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 257:
/*!**********************************************!*\
  !*** E:/uniapp/ykt/static/images/bg_img.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 258:
/*!************************************************!*\
  !*** E:/uniapp/ykt/static/images/bg_img_s.png ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 268:
/*!***************************************************!*\
  !*** E:/uniapp/ykt/components/uni-icons/icons.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 276:
/*!****************************************************!*\
  !*** E:/uniapp/ykt/components/QuShe-picker/app.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function dateObj(props) {
  this.startYear = props.startYear || new Date().getFullYear() - 5;
  this.endYear = props.endYear || new Date().getFullYear() + 5;
  this.defaultValue = props.defaultValue ? new Date(props.defaultValue) : new Date();
  this.dateMode = props.dateMode || 3;
  this.dateFormatArray = props.dateFormatArray || ['-', '-', ' ', ':', ':'];
}
function customObj(props) {
  this.itemArray = props.itemArray || [];
  this.linkage = props.linkage || false;
  this.linkageNum = props.linkageNum || 2;
  this.defaultValue = props.defaultValue || null;
  this.steps = props.steps || {};
}
function custom2Obj(props) {
  this.itemArray = props.itemArray || [];
  this.itemObject = props.itemObject || {};
  this.linkage = props.linkage || false;
  this.linkageNum = props.linkageNum || 2;
  this.defaultValue = props.defaultValue || null;
  this.steps = props.steps || {};
}
function cityObj(props) {
  this.defaultValue = props.defaultValue || [0, 0, 0];
}
var _app = {
  showToast: function showToast(msg) {
    uni.showToast({
      title: msg,
      icon: 'none' });

  },
  showLoading: function showLoading(msg, ifmask) {
    uni.showLoading({
      title: msg,
      mask: ifmask || false });

  },
  hideLoading: function hideLoading() {
    uni.hideLoading();
  },
  //date
  countDays: function countDays(Y, val) {
    var days = new Date(Y, val[1] + 1, 0).getDate();
    if (val) {
      val[2] = val[2] < days - 1 ? val[2] : days - 1;
    }
    return {
      days: days,
      val: val };

  },
  countYears: function countYears(sy, ey) {
    var _this = this;
    var y = [];
    var c = ey - sy;
    for (var i = 0; i <= c; i++) {
      y.push(sy + i);
    }
    return y;
  },
  creatDateObj: function creatDateObj(props) {
    return new dateObj(props || {});
  },
  creatCustomObj: function creatCustomObj(props) {
    return new customObj(props || {});
  },
  creatCustom2Obj: function creatCustom2Obj(props) {
    return new custom2Obj(props || {});
  } };var _default =

_app;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 277:
/*!*******************************************************************!*\
  !*** E:/uniapp/ykt/components/QuShe-picker/city-data/province.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var provinceData = [{
  "label": "北京市",
  "value": "11" },

{
  "label": "天津市",
  "value": "12" },

{
  "label": "河北省",
  "value": "13" },

{
  "label": "山西省",
  "value": "14" },

{
  "label": "内蒙古自治区",
  "value": "15" },

{
  "label": "辽宁省",
  "value": "21" },

{
  "label": "吉林省",
  "value": "22" },

{
  "label": "黑龙江省",
  "value": "23" },

{
  "label": "上海市",
  "value": "31" },

{
  "label": "江苏省",
  "value": "32" },

{
  "label": "浙江省",
  "value": "33" },

{
  "label": "安徽省",
  "value": "34" },

{
  "label": "福建省",
  "value": "35" },

{
  "label": "江西省",
  "value": "36" },

{
  "label": "山东省",
  "value": "37" },

{
  "label": "河南省",
  "value": "41" },

{
  "label": "湖北省",
  "value": "42" },

{
  "label": "湖南省",
  "value": "43" },

{
  "label": "广东省",
  "value": "44" },

{
  "label": "广西壮族自治区",
  "value": "45" },

{
  "label": "海南省",
  "value": "46" },

{
  "label": "重庆市",
  "value": "50" },

{
  "label": "四川省",
  "value": "51" },

{
  "label": "贵州省",
  "value": "52" },

{
  "label": "云南省",
  "value": "53" },

{
  "label": "西藏自治区",
  "value": "54" },

{
  "label": "陕西省",
  "value": "61" },

{
  "label": "甘肃省",
  "value": "62" },

{
  "label": "青海省",
  "value": "63" },

{
  "label": "宁夏回族自治区",
  "value": "64" },

{
  "label": "新疆维吾尔自治区",
  "value": "65" },

{
  "label": "台湾",
  "value": "66" },

{
  "label": "香港",
  "value": "67" },

{
  "label": "澳门",
  "value": "68" }];var _default =


provinceData;exports.default = _default;

/***/ }),

/***/ 278:
/*!***************************************************************!*\
  !*** E:/uniapp/ykt/components/QuShe-picker/city-data/city.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var cityData = [
[{
  "label": "市辖区",
  "value": "1101" }],

[{
  "label": "市辖区",
  "value": "1201" }],

[{
  "label": "石家庄市",
  "value": "1301" },

{
  "label": "唐山市",
  "value": "1302" },

{
  "label": "秦皇岛市",
  "value": "1303" },

{
  "label": "邯郸市",
  "value": "1304" },

{
  "label": "邢台市",
  "value": "1305" },

{
  "label": "保定市",
  "value": "1306" },

{
  "label": "张家口市",
  "value": "1307" },

{
  "label": "承德市",
  "value": "1308" },

{
  "label": "沧州市",
  "value": "1309" },

{
  "label": "廊坊市",
  "value": "1310" },

{
  "label": "衡水市",
  "value": "1311" }],


[{
  "label": "太原市",
  "value": "1401" },

{
  "label": "大同市",
  "value": "1402" },

{
  "label": "阳泉市",
  "value": "1403" },

{
  "label": "长治市",
  "value": "1404" },

{
  "label": "晋城市",
  "value": "1405" },

{
  "label": "朔州市",
  "value": "1406" },

{
  "label": "晋中市",
  "value": "1407" },

{
  "label": "运城市",
  "value": "1408" },

{
  "label": "忻州市",
  "value": "1409" },

{
  "label": "临汾市",
  "value": "1410" },

{
  "label": "吕梁市",
  "value": "1411" }],


[{
  "label": "呼和浩特市",
  "value": "1501" },

{
  "label": "包头市",
  "value": "1502" },

{
  "label": "乌海市",
  "value": "1503" },

{
  "label": "赤峰市",
  "value": "1504" },

{
  "label": "通辽市",
  "value": "1505" },

{
  "label": "鄂尔多斯市",
  "value": "1506" },

{
  "label": "呼伦贝尔市",
  "value": "1507" },

{
  "label": "巴彦淖尔市",
  "value": "1508" },

{
  "label": "乌兰察布市",
  "value": "1509" },

{
  "label": "兴安盟",
  "value": "1522" },

{
  "label": "锡林郭勒盟",
  "value": "1525" },

{
  "label": "阿拉善盟",
  "value": "1529" }],


[{
  "label": "沈阳市",
  "value": "2101" },

{
  "label": "大连市",
  "value": "2102" },

{
  "label": "鞍山市",
  "value": "2103" },

{
  "label": "抚顺市",
  "value": "2104" },

{
  "label": "本溪市",
  "value": "2105" },

{
  "label": "丹东市",
  "value": "2106" },

{
  "label": "锦州市",
  "value": "2107" },

{
  "label": "营口市",
  "value": "2108" },

{
  "label": "阜新市",
  "value": "2109" },

{
  "label": "辽阳市",
  "value": "2110" },

{
  "label": "盘锦市",
  "value": "2111" },

{
  "label": "铁岭市",
  "value": "2112" },

{
  "label": "朝阳市",
  "value": "2113" },

{
  "label": "葫芦岛市",
  "value": "2114" }],


[{
  "label": "长春市",
  "value": "2201" },

{
  "label": "吉林市",
  "value": "2202" },

{
  "label": "四平市",
  "value": "2203" },

{
  "label": "辽源市",
  "value": "2204" },

{
  "label": "通化市",
  "value": "2205" },

{
  "label": "白山市",
  "value": "2206" },

{
  "label": "松原市",
  "value": "2207" },

{
  "label": "白城市",
  "value": "2208" },

{
  "label": "延边朝鲜族自治州",
  "value": "2224" }],


[{
  "label": "哈尔滨市",
  "value": "2301" },

{
  "label": "齐齐哈尔市",
  "value": "2302" },

{
  "label": "鸡西市",
  "value": "2303" },

{
  "label": "鹤岗市",
  "value": "2304" },

{
  "label": "双鸭山市",
  "value": "2305" },

{
  "label": "大庆市",
  "value": "2306" },

{
  "label": "伊春市",
  "value": "2307" },

{
  "label": "佳木斯市",
  "value": "2308" },

{
  "label": "七台河市",
  "value": "2309" },

{
  "label": "牡丹江市",
  "value": "2310" },

{
  "label": "黑河市",
  "value": "2311" },

{
  "label": "绥化市",
  "value": "2312" },

{
  "label": "大兴安岭地区",
  "value": "2327" }],


[{
  "label": "市辖区",
  "value": "3101" }],

[{
  "label": "南京市",
  "value": "3201" },

{
  "label": "无锡市",
  "value": "3202" },

{
  "label": "徐州市",
  "value": "3203" },

{
  "label": "常州市",
  "value": "3204" },

{
  "label": "苏州市",
  "value": "3205" },

{
  "label": "南通市",
  "value": "3206" },

{
  "label": "连云港市",
  "value": "3207" },

{
  "label": "淮安市",
  "value": "3208" },

{
  "label": "盐城市",
  "value": "3209" },

{
  "label": "扬州市",
  "value": "3210" },

{
  "label": "镇江市",
  "value": "3211" },

{
  "label": "泰州市",
  "value": "3212" },

{
  "label": "宿迁市",
  "value": "3213" }],


[{
  "label": "杭州市",
  "value": "3301" },

{
  "label": "宁波市",
  "value": "3302" },

{
  "label": "温州市",
  "value": "3303" },

{
  "label": "嘉兴市",
  "value": "3304" },

{
  "label": "湖州市",
  "value": "3305" },

{
  "label": "绍兴市",
  "value": "3306" },

{
  "label": "金华市",
  "value": "3307" },

{
  "label": "衢州市",
  "value": "3308" },

{
  "label": "舟山市",
  "value": "3309" },

{
  "label": "台州市",
  "value": "3310" },

{
  "label": "丽水市",
  "value": "3311" }],


[{
  "label": "合肥市",
  "value": "3401" },

{
  "label": "芜湖市",
  "value": "3402" },

{
  "label": "蚌埠市",
  "value": "3403" },

{
  "label": "淮南市",
  "value": "3404" },

{
  "label": "马鞍山市",
  "value": "3405" },

{
  "label": "淮北市",
  "value": "3406" },

{
  "label": "铜陵市",
  "value": "3407" },

{
  "label": "安庆市",
  "value": "3408" },

{
  "label": "黄山市",
  "value": "3410" },

{
  "label": "滁州市",
  "value": "3411" },

{
  "label": "阜阳市",
  "value": "3412" },

{
  "label": "宿州市",
  "value": "3413" },

{
  "label": "六安市",
  "value": "3415" },

{
  "label": "亳州市",
  "value": "3416" },

{
  "label": "池州市",
  "value": "3417" },

{
  "label": "宣城市",
  "value": "3418" }],


[{
  "label": "福州市",
  "value": "3501" },

{
  "label": "厦门市",
  "value": "3502" },

{
  "label": "莆田市",
  "value": "3503" },

{
  "label": "三明市",
  "value": "3504" },

{
  "label": "泉州市",
  "value": "3505" },

{
  "label": "漳州市",
  "value": "3506" },

{
  "label": "南平市",
  "value": "3507" },

{
  "label": "龙岩市",
  "value": "3508" },

{
  "label": "宁德市",
  "value": "3509" }],


[{
  "label": "南昌市",
  "value": "3601" },

{
  "label": "景德镇市",
  "value": "3602" },

{
  "label": "萍乡市",
  "value": "3603" },

{
  "label": "九江市",
  "value": "3604" },

{
  "label": "新余市",
  "value": "3605" },

{
  "label": "鹰潭市",
  "value": "3606" },

{
  "label": "赣州市",
  "value": "3607" },

{
  "label": "吉安市",
  "value": "3608" },

{
  "label": "宜春市",
  "value": "3609" },

{
  "label": "抚州市",
  "value": "3610" },

{
  "label": "上饶市",
  "value": "3611" }],


[{
  "label": "济南市",
  "value": "3701" },

{
  "label": "青岛市",
  "value": "3702" },

{
  "label": "淄博市",
  "value": "3703" },

{
  "label": "枣庄市",
  "value": "3704" },

{
  "label": "东营市",
  "value": "3705" },

{
  "label": "烟台市",
  "value": "3706" },

{
  "label": "潍坊市",
  "value": "3707" },

{
  "label": "济宁市",
  "value": "3708" },

{
  "label": "泰安市",
  "value": "3709" },

{
  "label": "威海市",
  "value": "3710" },

{
  "label": "日照市",
  "value": "3711" },

{
  "label": "莱芜市",
  "value": "3712" },

{
  "label": "临沂市",
  "value": "3713" },

{
  "label": "德州市",
  "value": "3714" },

{
  "label": "聊城市",
  "value": "3715" },

{
  "label": "滨州市",
  "value": "3716" },

{
  "label": "菏泽市",
  "value": "3717" }],


[{
  "label": "郑州市",
  "value": "4101" },

{
  "label": "开封市",
  "value": "4102" },

{
  "label": "洛阳市",
  "value": "4103" },

{
  "label": "平顶山市",
  "value": "4104" },

{
  "label": "安阳市",
  "value": "4105" },

{
  "label": "鹤壁市",
  "value": "4106" },

{
  "label": "新乡市",
  "value": "4107" },

{
  "label": "焦作市",
  "value": "4108" },

{
  "label": "濮阳市",
  "value": "4109" },

{
  "label": "许昌市",
  "value": "4110" },

{
  "label": "漯河市",
  "value": "4111" },

{
  "label": "三门峡市",
  "value": "4112" },

{
  "label": "南阳市",
  "value": "4113" },

{
  "label": "商丘市",
  "value": "4114" },

{
  "label": "信阳市",
  "value": "4115" },

{
  "label": "周口市",
  "value": "4116" },

{
  "label": "驻马店市",
  "value": "4117" },

{
  "label": "省直辖县级行政区划",
  "value": "4190" }],


[{
  "label": "武汉市",
  "value": "4201" },

{
  "label": "黄石市",
  "value": "4202" },

{
  "label": "十堰市",
  "value": "4203" },

{
  "label": "宜昌市",
  "value": "4205" },

{
  "label": "襄阳市",
  "value": "4206" },

{
  "label": "鄂州市",
  "value": "4207" },

{
  "label": "荆门市",
  "value": "4208" },

{
  "label": "孝感市",
  "value": "4209" },

{
  "label": "荆州市",
  "value": "4210" },

{
  "label": "黄冈市",
  "value": "4211" },

{
  "label": "咸宁市",
  "value": "4212" },

{
  "label": "随州市",
  "value": "4213" },

{
  "label": "恩施土家族苗族自治州",
  "value": "4228" },

{
  "label": "省直辖县级行政区划",
  "value": "4290" }],


[{
  "label": "长沙市",
  "value": "4301" },

{
  "label": "株洲市",
  "value": "4302" },

{
  "label": "湘潭市",
  "value": "4303" },

{
  "label": "衡阳市",
  "value": "4304" },

{
  "label": "邵阳市",
  "value": "4305" },

{
  "label": "岳阳市",
  "value": "4306" },

{
  "label": "常德市",
  "value": "4307" },

{
  "label": "张家界市",
  "value": "4308" },

{
  "label": "益阳市",
  "value": "4309" },

{
  "label": "郴州市",
  "value": "4310" },

{
  "label": "永州市",
  "value": "4311" },

{
  "label": "怀化市",
  "value": "4312" },

{
  "label": "娄底市",
  "value": "4313" },

{
  "label": "湘西土家族苗族自治州",
  "value": "4331" }],


[{
  "label": "广州市",
  "value": "4401" },

{
  "label": "韶关市",
  "value": "4402" },

{
  "label": "深圳市",
  "value": "4403" },

{
  "label": "珠海市",
  "value": "4404" },

{
  "label": "汕头市",
  "value": "4405" },

{
  "label": "佛山市",
  "value": "4406" },

{
  "label": "江门市",
  "value": "4407" },

{
  "label": "湛江市",
  "value": "4408" },

{
  "label": "茂名市",
  "value": "4409" },

{
  "label": "肇庆市",
  "value": "4412" },

{
  "label": "惠州市",
  "value": "4413" },

{
  "label": "梅州市",
  "value": "4414" },

{
  "label": "汕尾市",
  "value": "4415" },

{
  "label": "河源市",
  "value": "4416" },

{
  "label": "阳江市",
  "value": "4417" },

{
  "label": "清远市",
  "value": "4418" },

{
  "label": "东莞市",
  "value": "4419" },

{
  "label": "中山市",
  "value": "4420" },

{
  "label": "潮州市",
  "value": "4451" },

{
  "label": "揭阳市",
  "value": "4452" },

{
  "label": "云浮市",
  "value": "4453" }],


[{
  "label": "南宁市",
  "value": "4501" },

{
  "label": "柳州市",
  "value": "4502" },

{
  "label": "桂林市",
  "value": "4503" },

{
  "label": "梧州市",
  "value": "4504" },

{
  "label": "北海市",
  "value": "4505" },

{
  "label": "防城港市",
  "value": "4506" },

{
  "label": "钦州市",
  "value": "4507" },

{
  "label": "贵港市",
  "value": "4508" },

{
  "label": "玉林市",
  "value": "4509" },

{
  "label": "百色市",
  "value": "4510" },

{
  "label": "贺州市",
  "value": "4511" },

{
  "label": "河池市",
  "value": "4512" },

{
  "label": "来宾市",
  "value": "4513" },

{
  "label": "崇左市",
  "value": "4514" }],


[{
  "label": "海口市",
  "value": "4601" },

{
  "label": "三亚市",
  "value": "4602" },

{
  "label": "三沙市",
  "value": "4603" },

{
  "label": "儋州市",
  "value": "4604" },

{
  "label": "省直辖县级行政区划",
  "value": "4690" }],


[{
  "label": "市辖区",
  "value": "5001" },

{
  "label": "县",
  "value": "5002" }],


[{
  "label": "成都市",
  "value": "5101" },

{
  "label": "自贡市",
  "value": "5103" },

{
  "label": "攀枝花市",
  "value": "5104" },

{
  "label": "泸州市",
  "value": "5105" },

{
  "label": "德阳市",
  "value": "5106" },

{
  "label": "绵阳市",
  "value": "5107" },

{
  "label": "广元市",
  "value": "5108" },

{
  "label": "遂宁市",
  "value": "5109" },

{
  "label": "内江市",
  "value": "5110" },

{
  "label": "乐山市",
  "value": "5111" },

{
  "label": "南充市",
  "value": "5113" },

{
  "label": "眉山市",
  "value": "5114" },

{
  "label": "宜宾市",
  "value": "5115" },

{
  "label": "广安市",
  "value": "5116" },

{
  "label": "达州市",
  "value": "5117" },

{
  "label": "雅安市",
  "value": "5118" },

{
  "label": "巴中市",
  "value": "5119" },

{
  "label": "资阳市",
  "value": "5120" },

{
  "label": "阿坝藏族羌族自治州",
  "value": "5132" },

{
  "label": "甘孜藏族自治州",
  "value": "5133" },

{
  "label": "凉山彝族自治州",
  "value": "5134" }],


[{
  "label": "贵阳市",
  "value": "5201" },

{
  "label": "六盘水市",
  "value": "5202" },

{
  "label": "遵义市",
  "value": "5203" },

{
  "label": "安顺市",
  "value": "5204" },

{
  "label": "毕节市",
  "value": "5205" },

{
  "label": "铜仁市",
  "value": "5206" },

{
  "label": "黔西南布依族苗族自治州",
  "value": "5223" },

{
  "label": "黔东南苗族侗族自治州",
  "value": "5226" },

{
  "label": "黔南布依族苗族自治州",
  "value": "5227" }],


[{
  "label": "昆明市",
  "value": "5301" },

{
  "label": "曲靖市",
  "value": "5303" },

{
  "label": "玉溪市",
  "value": "5304" },

{
  "label": "保山市",
  "value": "5305" },

{
  "label": "昭通市",
  "value": "5306" },

{
  "label": "丽江市",
  "value": "5307" },

{
  "label": "普洱市",
  "value": "5308" },

{
  "label": "临沧市",
  "value": "5309" },

{
  "label": "楚雄彝族自治州",
  "value": "5323" },

{
  "label": "红河哈尼族彝族自治州",
  "value": "5325" },

{
  "label": "文山壮族苗族自治州",
  "value": "5326" },

{
  "label": "西双版纳傣族自治州",
  "value": "5328" },

{
  "label": "大理白族自治州",
  "value": "5329" },

{
  "label": "德宏傣族景颇族自治州",
  "value": "5331" },

{
  "label": "怒江傈僳族自治州",
  "value": "5333" },

{
  "label": "迪庆藏族自治州",
  "value": "5334" }],


[{
  "label": "拉萨市",
  "value": "5401" },

{
  "label": "日喀则市",
  "value": "5402" },

{
  "label": "昌都市",
  "value": "5403" },

{
  "label": "林芝市",
  "value": "5404" },

{
  "label": "山南市",
  "value": "5405" },

{
  "label": "那曲地区",
  "value": "5424" },

{
  "label": "阿里地区",
  "value": "5425" }],


[{
  "label": "西安市",
  "value": "6101" },

{
  "label": "铜川市",
  "value": "6102" },

{
  "label": "宝鸡市",
  "value": "6103" },

{
  "label": "咸阳市",
  "value": "6104" },

{
  "label": "渭南市",
  "value": "6105" },

{
  "label": "延安市",
  "value": "6106" },

{
  "label": "汉中市",
  "value": "6107" },

{
  "label": "榆林市",
  "value": "6108" },

{
  "label": "安康市",
  "value": "6109" },

{
  "label": "商洛市",
  "value": "6110" }],


[{
  "label": "兰州市",
  "value": "6201" },

{
  "label": "嘉峪关市",
  "value": "6202" },

{
  "label": "金昌市",
  "value": "6203" },

{
  "label": "白银市",
  "value": "6204" },

{
  "label": "天水市",
  "value": "6205" },

{
  "label": "武威市",
  "value": "6206" },

{
  "label": "张掖市",
  "value": "6207" },

{
  "label": "平凉市",
  "value": "6208" },

{
  "label": "酒泉市",
  "value": "6209" },

{
  "label": "庆阳市",
  "value": "6210" },

{
  "label": "定西市",
  "value": "6211" },

{
  "label": "陇南市",
  "value": "6212" },

{
  "label": "临夏回族自治州",
  "value": "6229" },

{
  "label": "甘南藏族自治州",
  "value": "6230" }],


[{
  "label": "西宁市",
  "value": "6301" },

{
  "label": "海东市",
  "value": "6302" },

{
  "label": "海北藏族自治州",
  "value": "6322" },

{
  "label": "黄南藏族自治州",
  "value": "6323" },

{
  "label": "海南藏族自治州",
  "value": "6325" },

{
  "label": "果洛藏族自治州",
  "value": "6326" },

{
  "label": "玉树藏族自治州",
  "value": "6327" },

{
  "label": "海西蒙古族藏族自治州",
  "value": "6328" }],


[{
  "label": "银川市",
  "value": "6401" },

{
  "label": "石嘴山市",
  "value": "6402" },

{
  "label": "吴忠市",
  "value": "6403" },

{
  "label": "固原市",
  "value": "6404" },

{
  "label": "中卫市",
  "value": "6405" }],


[{
  "label": "乌鲁木齐市",
  "value": "6501" },

{
  "label": "克拉玛依市",
  "value": "6502" },

{
  "label": "吐鲁番市",
  "value": "6504" },

{
  "label": "哈密市",
  "value": "6505" },

{
  "label": "昌吉回族自治州",
  "value": "6523" },

{
  "label": "博尔塔拉蒙古自治州",
  "value": "6527" },

{
  "label": "巴音郭楞蒙古自治州",
  "value": "6528" },

{
  "label": "阿克苏地区",
  "value": "6529" },

{
  "label": "克孜勒苏柯尔克孜自治州",
  "value": "6530" },

{
  "label": "喀什地区",
  "value": "6531" },

{
  "label": "和田地区",
  "value": "6532" },

{
  "label": "伊犁哈萨克自治州",
  "value": "6540" },

{
  "label": "塔城地区",
  "value": "6542" },

{
  "label": "阿勒泰地区",
  "value": "6543" },

{
  "label": "自治区直辖县级行政区划",
  "value": "6590" }],


[{
  "label": "台北",
  "value": "6601" },

{
  "label": "高雄",
  "value": "6602" },

{
  "label": "基隆",
  "value": "6603" },

{
  "label": "台中",
  "value": "6604" },

{
  "label": "台南",
  "value": "6605" },

{
  "label": "新竹",
  "value": "6606" },

{
  "label": "嘉义",
  "value": "6607" },

{
  "label": "宜兰",
  "value": "6608" },

{
  "label": "桃园",
  "value": "6609" },

{
  "label": "苗栗",
  "value": "6610" },

{
  "label": "彰化",
  "value": "6611" },

{
  "label": "南投",
  "value": "6612" },

{
  "label": "云林",
  "value": "6613" },

{
  "label": "屏东",
  "value": "6614" },

{
  "label": "台东",
  "value": "6615" },

{
  "label": "花莲",
  "value": "6616" },

{
  "label": "澎湖",
  "value": "6617" }],


[{
  "label": "香港岛",
  "value": "6701" },

{
  "label": "九龙",
  "value": "6702" },

{
  "label": "新界",
  "value": "6703" }],


[{
  "label": "澳门半岛",
  "value": "6801" },

{
  "label": "氹仔岛",
  "value": "6802" },

{
  "label": "路环岛",
  "value": "6803" },

{
  "label": "路氹城",
  "value": "6804" }]];var _default =



cityData;exports.default = _default;

/***/ }),

/***/ 279:
/*!***************************************************************!*\
  !*** E:/uniapp/ykt/components/QuShe-picker/city-data/area.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var areaData = [
[
[{
  "label": "东城区",
  "value": "110101" },

{
  "label": "西城区",
  "value": "110102" },

{
  "label": "朝阳区",
  "value": "110105" },

{
  "label": "丰台区",
  "value": "110106" },

{
  "label": "石景山区",
  "value": "110107" },

{
  "label": "海淀区",
  "value": "110108" },

{
  "label": "门头沟区",
  "value": "110109" },

{
  "label": "房山区",
  "value": "110111" },

{
  "label": "通州区",
  "value": "110112" },

{
  "label": "顺义区",
  "value": "110113" },

{
  "label": "昌平区",
  "value": "110114" },

{
  "label": "大兴区",
  "value": "110115" },

{
  "label": "怀柔区",
  "value": "110116" },

{
  "label": "平谷区",
  "value": "110117" },

{
  "label": "密云区",
  "value": "110118" },

{
  "label": "延庆区",
  "value": "110119" }]],



[
[{
  "label": "和平区",
  "value": "120101" },

{
  "label": "河东区",
  "value": "120102" },

{
  "label": "河西区",
  "value": "120103" },

{
  "label": "南开区",
  "value": "120104" },

{
  "label": "河北区",
  "value": "120105" },

{
  "label": "红桥区",
  "value": "120106" },

{
  "label": "东丽区",
  "value": "120110" },

{
  "label": "西青区",
  "value": "120111" },

{
  "label": "津南区",
  "value": "120112" },

{
  "label": "北辰区",
  "value": "120113" },

{
  "label": "武清区",
  "value": "120114" },

{
  "label": "宝坻区",
  "value": "120115" },

{
  "label": "滨海新区",
  "value": "120116" },

{
  "label": "宁河区",
  "value": "120117" },

{
  "label": "静海区",
  "value": "120118" },

{
  "label": "蓟州区",
  "value": "120119" }]],



[
[{
  "label": "长安区",
  "value": "130102" },

{
  "label": "桥西区",
  "value": "130104" },

{
  "label": "新华区",
  "value": "130105" },

{
  "label": "井陉矿区",
  "value": "130107" },

{
  "label": "裕华区",
  "value": "130108" },

{
  "label": "藁城区",
  "value": "130109" },

{
  "label": "鹿泉区",
  "value": "130110" },

{
  "label": "栾城区",
  "value": "130111" },

{
  "label": "井陉县",
  "value": "130121" },

{
  "label": "正定县",
  "value": "130123" },

{
  "label": "行唐县",
  "value": "130125" },

{
  "label": "灵寿县",
  "value": "130126" },

{
  "label": "高邑县",
  "value": "130127" },

{
  "label": "深泽县",
  "value": "130128" },

{
  "label": "赞皇县",
  "value": "130129" },

{
  "label": "无极县",
  "value": "130130" },

{
  "label": "平山县",
  "value": "130131" },

{
  "label": "元氏县",
  "value": "130132" },

{
  "label": "赵县",
  "value": "130133" },

{
  "label": "石家庄高新技术产业开发区",
  "value": "130171" },

{
  "label": "石家庄循环化工园区",
  "value": "130172" },

{
  "label": "辛集市",
  "value": "130181" },

{
  "label": "晋州市",
  "value": "130183" },

{
  "label": "新乐市",
  "value": "130184" }],


[{
  "label": "路南区",
  "value": "130202" },

{
  "label": "路北区",
  "value": "130203" },

{
  "label": "古冶区",
  "value": "130204" },

{
  "label": "开平区",
  "value": "130205" },

{
  "label": "丰南区",
  "value": "130207" },

{
  "label": "丰润区",
  "value": "130208" },

{
  "label": "曹妃甸区",
  "value": "130209" },

{
  "label": "滦县",
  "value": "130223" },

{
  "label": "滦南县",
  "value": "130224" },

{
  "label": "乐亭县",
  "value": "130225" },

{
  "label": "迁西县",
  "value": "130227" },

{
  "label": "玉田县",
  "value": "130229" },

{
  "label": "唐山市芦台经济技术开发区",
  "value": "130271" },

{
  "label": "唐山市汉沽管理区",
  "value": "130272" },

{
  "label": "唐山高新技术产业开发区",
  "value": "130273" },

{
  "label": "河北唐山海港经济开发区",
  "value": "130274" },

{
  "label": "遵化市",
  "value": "130281" },

{
  "label": "迁安市",
  "value": "130283" }],


[{
  "label": "海港区",
  "value": "130302" },

{
  "label": "山海关区",
  "value": "130303" },

{
  "label": "北戴河区",
  "value": "130304" },

{
  "label": "抚宁区",
  "value": "130306" },

{
  "label": "青龙满族自治县",
  "value": "130321" },

{
  "label": "昌黎县",
  "value": "130322" },

{
  "label": "卢龙县",
  "value": "130324" },

{
  "label": "秦皇岛市经济技术开发区",
  "value": "130371" },

{
  "label": "北戴河新区",
  "value": "130372" }],


[{
  "label": "邯山区",
  "value": "130402" },

{
  "label": "丛台区",
  "value": "130403" },

{
  "label": "复兴区",
  "value": "130404" },

{
  "label": "峰峰矿区",
  "value": "130406" },

{
  "label": "肥乡区",
  "value": "130407" },

{
  "label": "永年区",
  "value": "130408" },

{
  "label": "临漳县",
  "value": "130423" },

{
  "label": "成安县",
  "value": "130424" },

{
  "label": "大名县",
  "value": "130425" },

{
  "label": "涉县",
  "value": "130426" },

{
  "label": "磁县",
  "value": "130427" },

{
  "label": "邱县",
  "value": "130430" },

{
  "label": "鸡泽县",
  "value": "130431" },

{
  "label": "广平县",
  "value": "130432" },

{
  "label": "馆陶县",
  "value": "130433" },

{
  "label": "魏县",
  "value": "130434" },

{
  "label": "曲周县",
  "value": "130435" },

{
  "label": "邯郸经济技术开发区",
  "value": "130471" },

{
  "label": "邯郸冀南新区",
  "value": "130473" },

{
  "label": "武安市",
  "value": "130481" }],


[{
  "label": "桥东区",
  "value": "130502" },

{
  "label": "桥西区",
  "value": "130503" },

{
  "label": "邢台县",
  "value": "130521" },

{
  "label": "临城县",
  "value": "130522" },

{
  "label": "内丘县",
  "value": "130523" },

{
  "label": "柏乡县",
  "value": "130524" },

{
  "label": "隆尧县",
  "value": "130525" },

{
  "label": "任县",
  "value": "130526" },

{
  "label": "南和县",
  "value": "130527" },

{
  "label": "宁晋县",
  "value": "130528" },

{
  "label": "巨鹿县",
  "value": "130529" },

{
  "label": "新河县",
  "value": "130530" },

{
  "label": "广宗县",
  "value": "130531" },

{
  "label": "平乡县",
  "value": "130532" },

{
  "label": "威县",
  "value": "130533" },

{
  "label": "清河县",
  "value": "130534" },

{
  "label": "临西县",
  "value": "130535" },

{
  "label": "河北邢台经济开发区",
  "value": "130571" },

{
  "label": "南宫市",
  "value": "130581" },

{
  "label": "沙河市",
  "value": "130582" }],


[{
  "label": "竞秀区",
  "value": "130602" },

{
  "label": "莲池区",
  "value": "130606" },

{
  "label": "满城区",
  "value": "130607" },

{
  "label": "清苑区",
  "value": "130608" },

{
  "label": "徐水区",
  "value": "130609" },

{
  "label": "涞水县",
  "value": "130623" },

{
  "label": "阜平县",
  "value": "130624" },

{
  "label": "定兴县",
  "value": "130626" },

{
  "label": "唐县",
  "value": "130627" },

{
  "label": "高阳县",
  "value": "130628" },

{
  "label": "容城县",
  "value": "130629" },

{
  "label": "涞源县",
  "value": "130630" },

{
  "label": "望都县",
  "value": "130631" },

{
  "label": "安新县",
  "value": "130632" },

{
  "label": "易县",
  "value": "130633" },

{
  "label": "曲阳县",
  "value": "130634" },

{
  "label": "蠡县",
  "value": "130635" },

{
  "label": "顺平县",
  "value": "130636" },

{
  "label": "博野县",
  "value": "130637" },

{
  "label": "雄县",
  "value": "130638" },

{
  "label": "保定高新技术产业开发区",
  "value": "130671" },

{
  "label": "保定白沟新城",
  "value": "130672" },

{
  "label": "涿州市",
  "value": "130681" },

{
  "label": "定州市",
  "value": "130682" },

{
  "label": "安国市",
  "value": "130683" },

{
  "label": "高碑店市",
  "value": "130684" }],


[{
  "label": "桥东区",
  "value": "130702" },

{
  "label": "桥西区",
  "value": "130703" },

{
  "label": "宣化区",
  "value": "130705" },

{
  "label": "下花园区",
  "value": "130706" },

{
  "label": "万全区",
  "value": "130708" },

{
  "label": "崇礼区",
  "value": "130709" },

{
  "label": "张北县",
  "value": "130722" },

{
  "label": "康保县",
  "value": "130723" },

{
  "label": "沽源县",
  "value": "130724" },

{
  "label": "尚义县",
  "value": "130725" },

{
  "label": "蔚县",
  "value": "130726" },

{
  "label": "阳原县",
  "value": "130727" },

{
  "label": "怀安县",
  "value": "130728" },

{
  "label": "怀来县",
  "value": "130730" },

{
  "label": "涿鹿县",
  "value": "130731" },

{
  "label": "赤城县",
  "value": "130732" },

{
  "label": "张家口市高新技术产业开发区",
  "value": "130771" },

{
  "label": "张家口市察北管理区",
  "value": "130772" },

{
  "label": "张家口市塞北管理区",
  "value": "130773" }],


[{
  "label": "双桥区",
  "value": "130802" },

{
  "label": "双滦区",
  "value": "130803" },

{
  "label": "鹰手营子矿区",
  "value": "130804" },

{
  "label": "承德县",
  "value": "130821" },

{
  "label": "兴隆县",
  "value": "130822" },

{
  "label": "滦平县",
  "value": "130824" },

{
  "label": "隆化县",
  "value": "130825" },

{
  "label": "丰宁满族自治县",
  "value": "130826" },

{
  "label": "宽城满族自治县",
  "value": "130827" },

{
  "label": "围场满族蒙古族自治县",
  "value": "130828" },

{
  "label": "承德高新技术产业开发区",
  "value": "130871" },

{
  "label": "平泉市",
  "value": "130881" }],


[{
  "label": "新华区",
  "value": "130902" },

{
  "label": "运河区",
  "value": "130903" },

{
  "label": "沧县",
  "value": "130921" },

{
  "label": "青县",
  "value": "130922" },

{
  "label": "东光县",
  "value": "130923" },

{
  "label": "海兴县",
  "value": "130924" },

{
  "label": "盐山县",
  "value": "130925" },

{
  "label": "肃宁县",
  "value": "130926" },

{
  "label": "南皮县",
  "value": "130927" },

{
  "label": "吴桥县",
  "value": "130928" },

{
  "label": "献县",
  "value": "130929" },

{
  "label": "孟村回族自治县",
  "value": "130930" },

{
  "label": "河北沧州经济开发区",
  "value": "130971" },

{
  "label": "沧州高新技术产业开发区",
  "value": "130972" },

{
  "label": "沧州渤海新区",
  "value": "130973" },

{
  "label": "泊头市",
  "value": "130981" },

{
  "label": "任丘市",
  "value": "130982" },

{
  "label": "黄骅市",
  "value": "130983" },

{
  "label": "河间市",
  "value": "130984" }],


[{
  "label": "安次区",
  "value": "131002" },

{
  "label": "广阳区",
  "value": "131003" },

{
  "label": "固安县",
  "value": "131022" },

{
  "label": "永清县",
  "value": "131023" },

{
  "label": "香河县",
  "value": "131024" },

{
  "label": "大城县",
  "value": "131025" },

{
  "label": "文安县",
  "value": "131026" },

{
  "label": "大厂回族自治县",
  "value": "131028" },

{
  "label": "廊坊经济技术开发区",
  "value": "131071" },

{
  "label": "霸州市",
  "value": "131081" },

{
  "label": "三河市",
  "value": "131082" }],


[{
  "label": "桃城区",
  "value": "131102" },

{
  "label": "冀州区",
  "value": "131103" },

{
  "label": "枣强县",
  "value": "131121" },

{
  "label": "武邑县",
  "value": "131122" },

{
  "label": "武强县",
  "value": "131123" },

{
  "label": "饶阳县",
  "value": "131124" },

{
  "label": "安平县",
  "value": "131125" },

{
  "label": "故城县",
  "value": "131126" },

{
  "label": "景县",
  "value": "131127" },

{
  "label": "阜城县",
  "value": "131128" },

{
  "label": "河北衡水经济开发区",
  "value": "131171" },

{
  "label": "衡水滨湖新区",
  "value": "131172" },

{
  "label": "深州市",
  "value": "131182" }]],



[
[{
  "label": "小店区",
  "value": "140105" },

{
  "label": "迎泽区",
  "value": "140106" },

{
  "label": "杏花岭区",
  "value": "140107" },

{
  "label": "尖草坪区",
  "value": "140108" },

{
  "label": "万柏林区",
  "value": "140109" },

{
  "label": "晋源区",
  "value": "140110" },

{
  "label": "清徐县",
  "value": "140121" },

{
  "label": "阳曲县",
  "value": "140122" },

{
  "label": "娄烦县",
  "value": "140123" },

{
  "label": "山西转型综合改革示范区",
  "value": "140171" },

{
  "label": "古交市",
  "value": "140181" }],


[{
  "label": "城区",
  "value": "140202" },

{
  "label": "矿区",
  "value": "140203" },

{
  "label": "南郊区",
  "value": "140211" },

{
  "label": "新荣区",
  "value": "140212" },

{
  "label": "阳高县",
  "value": "140221" },

{
  "label": "天镇县",
  "value": "140222" },

{
  "label": "广灵县",
  "value": "140223" },

{
  "label": "灵丘县",
  "value": "140224" },

{
  "label": "浑源县",
  "value": "140225" },

{
  "label": "左云县",
  "value": "140226" },

{
  "label": "大同县",
  "value": "140227" },

{
  "label": "山西大同经济开发区",
  "value": "140271" }],


[{
  "label": "城区",
  "value": "140302" },

{
  "label": "矿区",
  "value": "140303" },

{
  "label": "郊区",
  "value": "140311" },

{
  "label": "平定县",
  "value": "140321" },

{
  "label": "盂县",
  "value": "140322" },

{
  "label": "山西阳泉经济开发区",
  "value": "140371" }],


[{
  "label": "城区",
  "value": "140402" },

{
  "label": "郊区",
  "value": "140411" },

{
  "label": "长治县",
  "value": "140421" },

{
  "label": "襄垣县",
  "value": "140423" },

{
  "label": "屯留县",
  "value": "140424" },

{
  "label": "平顺县",
  "value": "140425" },

{
  "label": "黎城县",
  "value": "140426" },

{
  "label": "壶关县",
  "value": "140427" },

{
  "label": "长子县",
  "value": "140428" },

{
  "label": "武乡县",
  "value": "140429" },

{
  "label": "沁县",
  "value": "140430" },

{
  "label": "沁源县",
  "value": "140431" },

{
  "label": "山西长治高新技术产业园区",
  "value": "140471" },

{
  "label": "潞城市",
  "value": "140481" }],


[{
  "label": "城区",
  "value": "140502" },

{
  "label": "沁水县",
  "value": "140521" },

{
  "label": "阳城县",
  "value": "140522" },

{
  "label": "陵川县",
  "value": "140524" },

{
  "label": "泽州县",
  "value": "140525" },

{
  "label": "高平市",
  "value": "140581" }],


[{
  "label": "朔城区",
  "value": "140602" },

{
  "label": "平鲁区",
  "value": "140603" },

{
  "label": "山阴县",
  "value": "140621" },

{
  "label": "应县",
  "value": "140622" },

{
  "label": "右玉县",
  "value": "140623" },

{
  "label": "怀仁县",
  "value": "140624" },

{
  "label": "山西朔州经济开发区",
  "value": "140671" }],


[{
  "label": "榆次区",
  "value": "140702" },

{
  "label": "榆社县",
  "value": "140721" },

{
  "label": "左权县",
  "value": "140722" },

{
  "label": "和顺县",
  "value": "140723" },

{
  "label": "昔阳县",
  "value": "140724" },

{
  "label": "寿阳县",
  "value": "140725" },

{
  "label": "太谷县",
  "value": "140726" },

{
  "label": "祁县",
  "value": "140727" },

{
  "label": "平遥县",
  "value": "140728" },

{
  "label": "灵石县",
  "value": "140729" },

{
  "label": "介休市",
  "value": "140781" }],


[{
  "label": "盐湖区",
  "value": "140802" },

{
  "label": "临猗县",
  "value": "140821" },

{
  "label": "万荣县",
  "value": "140822" },

{
  "label": "闻喜县",
  "value": "140823" },

{
  "label": "稷山县",
  "value": "140824" },

{
  "label": "新绛县",
  "value": "140825" },

{
  "label": "绛县",
  "value": "140826" },

{
  "label": "垣曲县",
  "value": "140827" },

{
  "label": "夏县",
  "value": "140828" },

{
  "label": "平陆县",
  "value": "140829" },

{
  "label": "芮城县",
  "value": "140830" },

{
  "label": "永济市",
  "value": "140881" },

{
  "label": "河津市",
  "value": "140882" }],


[{
  "label": "忻府区",
  "value": "140902" },

{
  "label": "定襄县",
  "value": "140921" },

{
  "label": "五台县",
  "value": "140922" },

{
  "label": "代县",
  "value": "140923" },

{
  "label": "繁峙县",
  "value": "140924" },

{
  "label": "宁武县",
  "value": "140925" },

{
  "label": "静乐县",
  "value": "140926" },

{
  "label": "神池县",
  "value": "140927" },

{
  "label": "五寨县",
  "value": "140928" },

{
  "label": "岢岚县",
  "value": "140929" },

{
  "label": "河曲县",
  "value": "140930" },

{
  "label": "保德县",
  "value": "140931" },

{
  "label": "偏关县",
  "value": "140932" },

{
  "label": "五台山风景名胜区",
  "value": "140971" },

{
  "label": "原平市",
  "value": "140981" }],


[{
  "label": "尧都区",
  "value": "141002" },

{
  "label": "曲沃县",
  "value": "141021" },

{
  "label": "翼城县",
  "value": "141022" },

{
  "label": "襄汾县",
  "value": "141023" },

{
  "label": "洪洞县",
  "value": "141024" },

{
  "label": "古县",
  "value": "141025" },

{
  "label": "安泽县",
  "value": "141026" },

{
  "label": "浮山县",
  "value": "141027" },

{
  "label": "吉县",
  "value": "141028" },

{
  "label": "乡宁县",
  "value": "141029" },

{
  "label": "大宁县",
  "value": "141030" },

{
  "label": "隰县",
  "value": "141031" },

{
  "label": "永和县",
  "value": "141032" },

{
  "label": "蒲县",
  "value": "141033" },

{
  "label": "汾西县",
  "value": "141034" },

{
  "label": "侯马市",
  "value": "141081" },

{
  "label": "霍州市",
  "value": "141082" }],


[{
  "label": "离石区",
  "value": "141102" },

{
  "label": "文水县",
  "value": "141121" },

{
  "label": "交城县",
  "value": "141122" },

{
  "label": "兴县",
  "value": "141123" },

{
  "label": "临县",
  "value": "141124" },

{
  "label": "柳林县",
  "value": "141125" },

{
  "label": "石楼县",
  "value": "141126" },

{
  "label": "岚县",
  "value": "141127" },

{
  "label": "方山县",
  "value": "141128" },

{
  "label": "中阳县",
  "value": "141129" },

{
  "label": "交口县",
  "value": "141130" },

{
  "label": "孝义市",
  "value": "141181" },

{
  "label": "汾阳市",
  "value": "141182" }]],



[
[{
  "label": "新城区",
  "value": "150102" },

{
  "label": "回民区",
  "value": "150103" },

{
  "label": "玉泉区",
  "value": "150104" },

{
  "label": "赛罕区",
  "value": "150105" },

{
  "label": "土默特左旗",
  "value": "150121" },

{
  "label": "托克托县",
  "value": "150122" },

{
  "label": "和林格尔县",
  "value": "150123" },

{
  "label": "清水河县",
  "value": "150124" },

{
  "label": "武川县",
  "value": "150125" },

{
  "label": "呼和浩特金海工业园区",
  "value": "150171" },

{
  "label": "呼和浩特经济技术开发区",
  "value": "150172" }],


[{
  "label": "东河区",
  "value": "150202" },

{
  "label": "昆都仑区",
  "value": "150203" },

{
  "label": "青山区",
  "value": "150204" },

{
  "label": "石拐区",
  "value": "150205" },

{
  "label": "白云鄂博矿区",
  "value": "150206" },

{
  "label": "九原区",
  "value": "150207" },

{
  "label": "土默特右旗",
  "value": "150221" },

{
  "label": "固阳县",
  "value": "150222" },

{
  "label": "达尔罕茂明安联合旗",
  "value": "150223" },

{
  "label": "包头稀土高新技术产业开发区",
  "value": "150271" }],


[{
  "label": "海勃湾区",
  "value": "150302" },

{
  "label": "海南区",
  "value": "150303" },

{
  "label": "乌达区",
  "value": "150304" }],


[{
  "label": "红山区",
  "value": "150402" },

{
  "label": "元宝山区",
  "value": "150403" },

{
  "label": "松山区",
  "value": "150404" },

{
  "label": "阿鲁科尔沁旗",
  "value": "150421" },

{
  "label": "巴林左旗",
  "value": "150422" },

{
  "label": "巴林右旗",
  "value": "150423" },

{
  "label": "林西县",
  "value": "150424" },

{
  "label": "克什克腾旗",
  "value": "150425" },

{
  "label": "翁牛特旗",
  "value": "150426" },

{
  "label": "喀喇沁旗",
  "value": "150428" },

{
  "label": "宁城县",
  "value": "150429" },

{
  "label": "敖汉旗",
  "value": "150430" }],


[{
  "label": "科尔沁区",
  "value": "150502" },

{
  "label": "科尔沁左翼中旗",
  "value": "150521" },

{
  "label": "科尔沁左翼后旗",
  "value": "150522" },

{
  "label": "开鲁县",
  "value": "150523" },

{
  "label": "库伦旗",
  "value": "150524" },

{
  "label": "奈曼旗",
  "value": "150525" },

{
  "label": "扎鲁特旗",
  "value": "150526" },

{
  "label": "通辽经济技术开发区",
  "value": "150571" },

{
  "label": "霍林郭勒市",
  "value": "150581" }],


[{
  "label": "东胜区",
  "value": "150602" },

{
  "label": "康巴什区",
  "value": "150603" },

{
  "label": "达拉特旗",
  "value": "150621" },

{
  "label": "准格尔旗",
  "value": "150622" },

{
  "label": "鄂托克前旗",
  "value": "150623" },

{
  "label": "鄂托克旗",
  "value": "150624" },

{
  "label": "杭锦旗",
  "value": "150625" },

{
  "label": "乌审旗",
  "value": "150626" },

{
  "label": "伊金霍洛旗",
  "value": "150627" }],


[{
  "label": "海拉尔区",
  "value": "150702" },

{
  "label": "扎赉诺尔区",
  "value": "150703" },

{
  "label": "阿荣旗",
  "value": "150721" },

{
  "label": "莫力达瓦达斡尔族自治旗",
  "value": "150722" },

{
  "label": "鄂伦春自治旗",
  "value": "150723" },

{
  "label": "鄂温克族自治旗",
  "value": "150724" },

{
  "label": "陈巴尔虎旗",
  "value": "150725" },

{
  "label": "新巴尔虎左旗",
  "value": "150726" },

{
  "label": "新巴尔虎右旗",
  "value": "150727" },

{
  "label": "满洲里市",
  "value": "150781" },

{
  "label": "牙克石市",
  "value": "150782" },

{
  "label": "扎兰屯市",
  "value": "150783" },

{
  "label": "额尔古纳市",
  "value": "150784" },

{
  "label": "根河市",
  "value": "150785" }],


[{
  "label": "临河区",
  "value": "150802" },

{
  "label": "五原县",
  "value": "150821" },

{
  "label": "磴口县",
  "value": "150822" },

{
  "label": "乌拉特前旗",
  "value": "150823" },

{
  "label": "乌拉特中旗",
  "value": "150824" },

{
  "label": "乌拉特后旗",
  "value": "150825" },

{
  "label": "杭锦后旗",
  "value": "150826" }],


[{
  "label": "集宁区",
  "value": "150902" },

{
  "label": "卓资县",
  "value": "150921" },

{
  "label": "化德县",
  "value": "150922" },

{
  "label": "商都县",
  "value": "150923" },

{
  "label": "兴和县",
  "value": "150924" },

{
  "label": "凉城县",
  "value": "150925" },

{
  "label": "察哈尔右翼前旗",
  "value": "150926" },

{
  "label": "察哈尔右翼中旗",
  "value": "150927" },

{
  "label": "察哈尔右翼后旗",
  "value": "150928" },

{
  "label": "四子王旗",
  "value": "150929" },

{
  "label": "丰镇市",
  "value": "150981" }],


[{
  "label": "乌兰浩特市",
  "value": "152201" },

{
  "label": "阿尔山市",
  "value": "152202" },

{
  "label": "科尔沁右翼前旗",
  "value": "152221" },

{
  "label": "科尔沁右翼中旗",
  "value": "152222" },

{
  "label": "扎赉特旗",
  "value": "152223" },

{
  "label": "突泉县",
  "value": "152224" }],


[{
  "label": "二连浩特市",
  "value": "152501" },

{
  "label": "锡林浩特市",
  "value": "152502" },

{
  "label": "阿巴嘎旗",
  "value": "152522" },

{
  "label": "苏尼特左旗",
  "value": "152523" },

{
  "label": "苏尼特右旗",
  "value": "152524" },

{
  "label": "东乌珠穆沁旗",
  "value": "152525" },

{
  "label": "西乌珠穆沁旗",
  "value": "152526" },

{
  "label": "太仆寺旗",
  "value": "152527" },

{
  "label": "镶黄旗",
  "value": "152528" },

{
  "label": "正镶白旗",
  "value": "152529" },

{
  "label": "正蓝旗",
  "value": "152530" },

{
  "label": "多伦县",
  "value": "152531" },

{
  "label": "乌拉盖管委会",
  "value": "152571" }],


[{
  "label": "阿拉善左旗",
  "value": "152921" },

{
  "label": "阿拉善右旗",
  "value": "152922" },

{
  "label": "额济纳旗",
  "value": "152923" },

{
  "label": "内蒙古阿拉善经济开发区",
  "value": "152971" }]],



[
[{
  "label": "和平区",
  "value": "210102" },

{
  "label": "沈河区",
  "value": "210103" },

{
  "label": "大东区",
  "value": "210104" },

{
  "label": "皇姑区",
  "value": "210105" },

{
  "label": "铁西区",
  "value": "210106" },

{
  "label": "苏家屯区",
  "value": "210111" },

{
  "label": "浑南区",
  "value": "210112" },

{
  "label": "沈北新区",
  "value": "210113" },

{
  "label": "于洪区",
  "value": "210114" },

{
  "label": "辽中区",
  "value": "210115" },

{
  "label": "康平县",
  "value": "210123" },

{
  "label": "法库县",
  "value": "210124" },

{
  "label": "新民市",
  "value": "210181" }],


[{
  "label": "中山区",
  "value": "210202" },

{
  "label": "西岗区",
  "value": "210203" },

{
  "label": "沙河口区",
  "value": "210204" },

{
  "label": "甘井子区",
  "value": "210211" },

{
  "label": "旅顺口区",
  "value": "210212" },

{
  "label": "金州区",
  "value": "210213" },

{
  "label": "普兰店区",
  "value": "210214" },

{
  "label": "长海县",
  "value": "210224" },

{
  "label": "瓦房店市",
  "value": "210281" },

{
  "label": "庄河市",
  "value": "210283" }],


[{
  "label": "铁东区",
  "value": "210302" },

{
  "label": "铁西区",
  "value": "210303" },

{
  "label": "立山区",
  "value": "210304" },

{
  "label": "千山区",
  "value": "210311" },

{
  "label": "台安县",
  "value": "210321" },

{
  "label": "岫岩满族自治县",
  "value": "210323" },

{
  "label": "海城市",
  "value": "210381" }],


[{
  "label": "新抚区",
  "value": "210402" },

{
  "label": "东洲区",
  "value": "210403" },

{
  "label": "望花区",
  "value": "210404" },

{
  "label": "顺城区",
  "value": "210411" },

{
  "label": "抚顺县",
  "value": "210421" },

{
  "label": "新宾满族自治县",
  "value": "210422" },

{
  "label": "清原满族自治县",
  "value": "210423" }],


[{
  "label": "平山区",
  "value": "210502" },

{
  "label": "溪湖区",
  "value": "210503" },

{
  "label": "明山区",
  "value": "210504" },

{
  "label": "南芬区",
  "value": "210505" },

{
  "label": "本溪满族自治县",
  "value": "210521" },

{
  "label": "桓仁满族自治县",
  "value": "210522" }],


[{
  "label": "元宝区",
  "value": "210602" },

{
  "label": "振兴区",
  "value": "210603" },

{
  "label": "振安区",
  "value": "210604" },

{
  "label": "宽甸满族自治县",
  "value": "210624" },

{
  "label": "东港市",
  "value": "210681" },

{
  "label": "凤城市",
  "value": "210682" }],


[{
  "label": "古塔区",
  "value": "210702" },

{
  "label": "凌河区",
  "value": "210703" },

{
  "label": "太和区",
  "value": "210711" },

{
  "label": "黑山县",
  "value": "210726" },

{
  "label": "义县",
  "value": "210727" },

{
  "label": "凌海市",
  "value": "210781" },

{
  "label": "北镇市",
  "value": "210782" }],


[{
  "label": "站前区",
  "value": "210802" },

{
  "label": "西市区",
  "value": "210803" },

{
  "label": "鲅鱼圈区",
  "value": "210804" },

{
  "label": "老边区",
  "value": "210811" },

{
  "label": "盖州市",
  "value": "210881" },

{
  "label": "大石桥市",
  "value": "210882" }],


[{
  "label": "海州区",
  "value": "210902" },

{
  "label": "新邱区",
  "value": "210903" },

{
  "label": "太平区",
  "value": "210904" },

{
  "label": "清河门区",
  "value": "210905" },

{
  "label": "细河区",
  "value": "210911" },

{
  "label": "阜新蒙古族自治县",
  "value": "210921" },

{
  "label": "彰武县",
  "value": "210922" }],


[{
  "label": "白塔区",
  "value": "211002" },

{
  "label": "文圣区",
  "value": "211003" },

{
  "label": "宏伟区",
  "value": "211004" },

{
  "label": "弓长岭区",
  "value": "211005" },

{
  "label": "太子河区",
  "value": "211011" },

{
  "label": "辽阳县",
  "value": "211021" },

{
  "label": "灯塔市",
  "value": "211081" }],


[{
  "label": "双台子区",
  "value": "211102" },

{
  "label": "兴隆台区",
  "value": "211103" },

{
  "label": "大洼区",
  "value": "211104" },

{
  "label": "盘山县",
  "value": "211122" }],


[{
  "label": "银州区",
  "value": "211202" },

{
  "label": "清河区",
  "value": "211204" },

{
  "label": "铁岭县",
  "value": "211221" },

{
  "label": "西丰县",
  "value": "211223" },

{
  "label": "昌图县",
  "value": "211224" },

{
  "label": "调兵山市",
  "value": "211281" },

{
  "label": "开原市",
  "value": "211282" }],


[{
  "label": "双塔区",
  "value": "211302" },

{
  "label": "龙城区",
  "value": "211303" },

{
  "label": "朝阳县",
  "value": "211321" },

{
  "label": "建平县",
  "value": "211322" },

{
  "label": "喀喇沁左翼蒙古族自治县",
  "value": "211324" },

{
  "label": "北票市",
  "value": "211381" },

{
  "label": "凌源市",
  "value": "211382" }],


[{
  "label": "连山区",
  "value": "211402" },

{
  "label": "龙港区",
  "value": "211403" },

{
  "label": "南票区",
  "value": "211404" },

{
  "label": "绥中县",
  "value": "211421" },

{
  "label": "建昌县",
  "value": "211422" },

{
  "label": "兴城市",
  "value": "211481" }]],



[
[{
  "label": "南关区",
  "value": "220102" },

{
  "label": "宽城区",
  "value": "220103" },

{
  "label": "朝阳区",
  "value": "220104" },

{
  "label": "二道区",
  "value": "220105" },

{
  "label": "绿园区",
  "value": "220106" },

{
  "label": "双阳区",
  "value": "220112" },

{
  "label": "九台区",
  "value": "220113" },

{
  "label": "农安县",
  "value": "220122" },

{
  "label": "长春经济技术开发区",
  "value": "220171" },

{
  "label": "长春净月高新技术产业开发区",
  "value": "220172" },

{
  "label": "长春高新技术产业开发区",
  "value": "220173" },

{
  "label": "长春汽车经济技术开发区",
  "value": "220174" },

{
  "label": "榆树市",
  "value": "220182" },

{
  "label": "德惠市",
  "value": "220183" }],


[{
  "label": "昌邑区",
  "value": "220202" },

{
  "label": "龙潭区",
  "value": "220203" },

{
  "label": "船营区",
  "value": "220204" },

{
  "label": "丰满区",
  "value": "220211" },

{
  "label": "永吉县",
  "value": "220221" },

{
  "label": "吉林经济开发区",
  "value": "220271" },

{
  "label": "吉林高新技术产业开发区",
  "value": "220272" },

{
  "label": "吉林中国新加坡食品区",
  "value": "220273" },

{
  "label": "蛟河市",
  "value": "220281" },

{
  "label": "桦甸市",
  "value": "220282" },

{
  "label": "舒兰市",
  "value": "220283" },

{
  "label": "磐石市",
  "value": "220284" }],


[{
  "label": "铁西区",
  "value": "220302" },

{
  "label": "铁东区",
  "value": "220303" },

{
  "label": "梨树县",
  "value": "220322" },

{
  "label": "伊通满族自治县",
  "value": "220323" },

{
  "label": "公主岭市",
  "value": "220381" },

{
  "label": "双辽市",
  "value": "220382" }],


[{
  "label": "龙山区",
  "value": "220402" },

{
  "label": "西安区",
  "value": "220403" },

{
  "label": "东丰县",
  "value": "220421" },

{
  "label": "东辽县",
  "value": "220422" }],


[{
  "label": "东昌区",
  "value": "220502" },

{
  "label": "二道江区",
  "value": "220503" },

{
  "label": "通化县",
  "value": "220521" },

{
  "label": "辉南县",
  "value": "220523" },

{
  "label": "柳河县",
  "value": "220524" },

{
  "label": "梅河口市",
  "value": "220581" },

{
  "label": "集安市",
  "value": "220582" }],


[{
  "label": "浑江区",
  "value": "220602" },

{
  "label": "江源区",
  "value": "220605" },

{
  "label": "抚松县",
  "value": "220621" },

{
  "label": "靖宇县",
  "value": "220622" },

{
  "label": "长白朝鲜族自治县",
  "value": "220623" },

{
  "label": "临江市",
  "value": "220681" }],


[{
  "label": "宁江区",
  "value": "220702" },

{
  "label": "前郭尔罗斯蒙古族自治县",
  "value": "220721" },

{
  "label": "长岭县",
  "value": "220722" },

{
  "label": "乾安县",
  "value": "220723" },

{
  "label": "吉林松原经济开发区",
  "value": "220771" },

{
  "label": "扶余市",
  "value": "220781" }],


[{
  "label": "洮北区",
  "value": "220802" },

{
  "label": "镇赉县",
  "value": "220821" },

{
  "label": "通榆县",
  "value": "220822" },

{
  "label": "吉林白城经济开发区",
  "value": "220871" },

{
  "label": "洮南市",
  "value": "220881" },

{
  "label": "大安市",
  "value": "220882" }],


[{
  "label": "延吉市",
  "value": "222401" },

{
  "label": "图们市",
  "value": "222402" },

{
  "label": "敦化市",
  "value": "222403" },

{
  "label": "珲春市",
  "value": "222404" },

{
  "label": "龙井市",
  "value": "222405" },

{
  "label": "和龙市",
  "value": "222406" },

{
  "label": "汪清县",
  "value": "222424" },

{
  "label": "安图县",
  "value": "222426" }]],



[
[{
  "label": "道里区",
  "value": "230102" },

{
  "label": "南岗区",
  "value": "230103" },

{
  "label": "道外区",
  "value": "230104" },

{
  "label": "平房区",
  "value": "230108" },

{
  "label": "松北区",
  "value": "230109" },

{
  "label": "香坊区",
  "value": "230110" },

{
  "label": "呼兰区",
  "value": "230111" },

{
  "label": "阿城区",
  "value": "230112" },

{
  "label": "双城区",
  "value": "230113" },

{
  "label": "依兰县",
  "value": "230123" },

{
  "label": "方正县",
  "value": "230124" },

{
  "label": "宾县",
  "value": "230125" },

{
  "label": "巴彦县",
  "value": "230126" },

{
  "label": "木兰县",
  "value": "230127" },

{
  "label": "通河县",
  "value": "230128" },

{
  "label": "延寿县",
  "value": "230129" },

{
  "label": "尚志市",
  "value": "230183" },

{
  "label": "五常市",
  "value": "230184" }],


[{
  "label": "龙沙区",
  "value": "230202" },

{
  "label": "建华区",
  "value": "230203" },

{
  "label": "铁锋区",
  "value": "230204" },

{
  "label": "昂昂溪区",
  "value": "230205" },

{
  "label": "富拉尔基区",
  "value": "230206" },

{
  "label": "碾子山区",
  "value": "230207" },

{
  "label": "梅里斯达斡尔族区",
  "value": "230208" },

{
  "label": "龙江县",
  "value": "230221" },

{
  "label": "依安县",
  "value": "230223" },

{
  "label": "泰来县",
  "value": "230224" },

{
  "label": "甘南县",
  "value": "230225" },

{
  "label": "富裕县",
  "value": "230227" },

{
  "label": "克山县",
  "value": "230229" },

{
  "label": "克东县",
  "value": "230230" },

{
  "label": "拜泉县",
  "value": "230231" },

{
  "label": "讷河市",
  "value": "230281" }],


[{
  "label": "鸡冠区",
  "value": "230302" },

{
  "label": "恒山区",
  "value": "230303" },

{
  "label": "滴道区",
  "value": "230304" },

{
  "label": "梨树区",
  "value": "230305" },

{
  "label": "城子河区",
  "value": "230306" },

{
  "label": "麻山区",
  "value": "230307" },

{
  "label": "鸡东县",
  "value": "230321" },

{
  "label": "虎林市",
  "value": "230381" },

{
  "label": "密山市",
  "value": "230382" }],


[{
  "label": "向阳区",
  "value": "230402" },

{
  "label": "工农区",
  "value": "230403" },

{
  "label": "南山区",
  "value": "230404" },

{
  "label": "兴安区",
  "value": "230405" },

{
  "label": "东山区",
  "value": "230406" },

{
  "label": "兴山区",
  "value": "230407" },

{
  "label": "萝北县",
  "value": "230421" },

{
  "label": "绥滨县",
  "value": "230422" }],


[{
  "label": "尖山区",
  "value": "230502" },

{
  "label": "岭东区",
  "value": "230503" },

{
  "label": "四方台区",
  "value": "230505" },

{
  "label": "宝山区",
  "value": "230506" },

{
  "label": "集贤县",
  "value": "230521" },

{
  "label": "友谊县",
  "value": "230522" },

{
  "label": "宝清县",
  "value": "230523" },

{
  "label": "饶河县",
  "value": "230524" }],


[{
  "label": "萨尔图区",
  "value": "230602" },

{
  "label": "龙凤区",
  "value": "230603" },

{
  "label": "让胡路区",
  "value": "230604" },

{
  "label": "红岗区",
  "value": "230605" },

{
  "label": "大同区",
  "value": "230606" },

{
  "label": "肇州县",
  "value": "230621" },

{
  "label": "肇源县",
  "value": "230622" },

{
  "label": "林甸县",
  "value": "230623" },

{
  "label": "杜尔伯特蒙古族自治县",
  "value": "230624" },

{
  "label": "大庆高新技术产业开发区",
  "value": "230671" }],


[{
  "label": "伊春区",
  "value": "230702" },

{
  "label": "南岔区",
  "value": "230703" },

{
  "label": "友好区",
  "value": "230704" },

{
  "label": "西林区",
  "value": "230705" },

{
  "label": "翠峦区",
  "value": "230706" },

{
  "label": "新青区",
  "value": "230707" },

{
  "label": "美溪区",
  "value": "230708" },

{
  "label": "金山屯区",
  "value": "230709" },

{
  "label": "五营区",
  "value": "230710" },

{
  "label": "乌马河区",
  "value": "230711" },

{
  "label": "汤旺河区",
  "value": "230712" },

{
  "label": "带岭区",
  "value": "230713" },

{
  "label": "乌伊岭区",
  "value": "230714" },

{
  "label": "红星区",
  "value": "230715" },

{
  "label": "上甘岭区",
  "value": "230716" },

{
  "label": "嘉荫县",
  "value": "230722" },

{
  "label": "铁力市",
  "value": "230781" }],


[{
  "label": "向阳区",
  "value": "230803" },

{
  "label": "前进区",
  "value": "230804" },

{
  "label": "东风区",
  "value": "230805" },

{
  "label": "郊区",
  "value": "230811" },

{
  "label": "桦南县",
  "value": "230822" },

{
  "label": "桦川县",
  "value": "230826" },

{
  "label": "汤原县",
  "value": "230828" },

{
  "label": "同江市",
  "value": "230881" },

{
  "label": "富锦市",
  "value": "230882" },

{
  "label": "抚远市",
  "value": "230883" }],


[{
  "label": "新兴区",
  "value": "230902" },

{
  "label": "桃山区",
  "value": "230903" },

{
  "label": "茄子河区",
  "value": "230904" },

{
  "label": "勃利县",
  "value": "230921" }],


[{
  "label": "东安区",
  "value": "231002" },

{
  "label": "阳明区",
  "value": "231003" },

{
  "label": "爱民区",
  "value": "231004" },

{
  "label": "西安区",
  "value": "231005" },

{
  "label": "林口县",
  "value": "231025" },

{
  "label": "牡丹江经济技术开发区",
  "value": "231071" },

{
  "label": "绥芬河市",
  "value": "231081" },

{
  "label": "海林市",
  "value": "231083" },

{
  "label": "宁安市",
  "value": "231084" },

{
  "label": "穆棱市",
  "value": "231085" },

{
  "label": "东宁市",
  "value": "231086" }],


[{
  "label": "爱辉区",
  "value": "231102" },

{
  "label": "嫩江县",
  "value": "231121" },

{
  "label": "逊克县",
  "value": "231123" },

{
  "label": "孙吴县",
  "value": "231124" },

{
  "label": "北安市",
  "value": "231181" },

{
  "label": "五大连池市",
  "value": "231182" }],


[{
  "label": "北林区",
  "value": "231202" },

{
  "label": "望奎县",
  "value": "231221" },

{
  "label": "兰西县",
  "value": "231222" },

{
  "label": "青冈县",
  "value": "231223" },

{
  "label": "庆安县",
  "value": "231224" },

{
  "label": "明水县",
  "value": "231225" },

{
  "label": "绥棱县",
  "value": "231226" },

{
  "label": "安达市",
  "value": "231281" },

{
  "label": "肇东市",
  "value": "231282" },

{
  "label": "海伦市",
  "value": "231283" }],


[{
  "label": "加格达奇区",
  "value": "232701" },

{
  "label": "松岭区",
  "value": "232702" },

{
  "label": "新林区",
  "value": "232703" },

{
  "label": "呼中区",
  "value": "232704" },

{
  "label": "呼玛县",
  "value": "232721" },

{
  "label": "塔河县",
  "value": "232722" },

{
  "label": "漠河县",
  "value": "232723" }]],



[
[{
  "label": "黄浦区",
  "value": "310101" },

{
  "label": "徐汇区",
  "value": "310104" },

{
  "label": "长宁区",
  "value": "310105" },

{
  "label": "静安区",
  "value": "310106" },

{
  "label": "普陀区",
  "value": "310107" },

{
  "label": "虹口区",
  "value": "310109" },

{
  "label": "杨浦区",
  "value": "310110" },

{
  "label": "闵行区",
  "value": "310112" },

{
  "label": "宝山区",
  "value": "310113" },

{
  "label": "嘉定区",
  "value": "310114" },

{
  "label": "浦东新区",
  "value": "310115" },

{
  "label": "金山区",
  "value": "310116" },

{
  "label": "松江区",
  "value": "310117" },

{
  "label": "青浦区",
  "value": "310118" },

{
  "label": "奉贤区",
  "value": "310120" },

{
  "label": "崇明区",
  "value": "310151" }]],



[
[{
  "label": "玄武区",
  "value": "320102" },

{
  "label": "秦淮区",
  "value": "320104" },

{
  "label": "建邺区",
  "value": "320105" },

{
  "label": "鼓楼区",
  "value": "320106" },

{
  "label": "浦口区",
  "value": "320111" },

{
  "label": "栖霞区",
  "value": "320113" },

{
  "label": "雨花台区",
  "value": "320114" },

{
  "label": "江宁区",
  "value": "320115" },

{
  "label": "六合区",
  "value": "320116" },

{
  "label": "溧水区",
  "value": "320117" },

{
  "label": "高淳区",
  "value": "320118" }],


[{
  "label": "锡山区",
  "value": "320205" },

{
  "label": "惠山区",
  "value": "320206" },

{
  "label": "滨湖区",
  "value": "320211" },

{
  "label": "梁溪区",
  "value": "320213" },

{
  "label": "新吴区",
  "value": "320214" },

{
  "label": "江阴市",
  "value": "320281" },

{
  "label": "宜兴市",
  "value": "320282" }],


[{
  "label": "鼓楼区",
  "value": "320302" },

{
  "label": "云龙区",
  "value": "320303" },

{
  "label": "贾汪区",
  "value": "320305" },

{
  "label": "泉山区",
  "value": "320311" },

{
  "label": "铜山区",
  "value": "320312" },

{
  "label": "丰县",
  "value": "320321" },

{
  "label": "沛县",
  "value": "320322" },

{
  "label": "睢宁县",
  "value": "320324" },

{
  "label": "徐州经济技术开发区",
  "value": "320371" },

{
  "label": "新沂市",
  "value": "320381" },

{
  "label": "邳州市",
  "value": "320382" }],


[{
  "label": "天宁区",
  "value": "320402" },

{
  "label": "钟楼区",
  "value": "320404" },

{
  "label": "新北区",
  "value": "320411" },

{
  "label": "武进区",
  "value": "320412" },

{
  "label": "金坛区",
  "value": "320413" },

{
  "label": "溧阳市",
  "value": "320481" }],


[{
  "label": "虎丘区",
  "value": "320505" },

{
  "label": "吴中区",
  "value": "320506" },

{
  "label": "相城区",
  "value": "320507" },

{
  "label": "姑苏区",
  "value": "320508" },

{
  "label": "吴江区",
  "value": "320509" },

{
  "label": "苏州工业园区",
  "value": "320571" },

{
  "label": "常熟市",
  "value": "320581" },

{
  "label": "张家港市",
  "value": "320582" },

{
  "label": "昆山市",
  "value": "320583" },

{
  "label": "太仓市",
  "value": "320585" }],


[{
  "label": "崇川区",
  "value": "320602" },

{
  "label": "港闸区",
  "value": "320611" },

{
  "label": "通州区",
  "value": "320612" },

{
  "label": "海安县",
  "value": "320621" },

{
  "label": "如东县",
  "value": "320623" },

{
  "label": "南通经济技术开发区",
  "value": "320671" },

{
  "label": "启东市",
  "value": "320681" },

{
  "label": "如皋市",
  "value": "320682" },

{
  "label": "海门市",
  "value": "320684" }],


[{
  "label": "连云区",
  "value": "320703" },

{
  "label": "海州区",
  "value": "320706" },

{
  "label": "赣榆区",
  "value": "320707" },

{
  "label": "东海县",
  "value": "320722" },

{
  "label": "灌云县",
  "value": "320723" },

{
  "label": "灌南县",
  "value": "320724" },

{
  "label": "连云港经济技术开发区",
  "value": "320771" },

{
  "label": "连云港高新技术产业开发区",
  "value": "320772" }],


[{
  "label": "淮安区",
  "value": "320803" },

{
  "label": "淮阴区",
  "value": "320804" },

{
  "label": "清江浦区",
  "value": "320812" },

{
  "label": "洪泽区",
  "value": "320813" },

{
  "label": "涟水县",
  "value": "320826" },

{
  "label": "盱眙县",
  "value": "320830" },

{
  "label": "金湖县",
  "value": "320831" },

{
  "label": "淮安经济技术开发区",
  "value": "320871" }],


[{
  "label": "亭湖区",
  "value": "320902" },

{
  "label": "盐都区",
  "value": "320903" },

{
  "label": "大丰区",
  "value": "320904" },

{
  "label": "响水县",
  "value": "320921" },

{
  "label": "滨海县",
  "value": "320922" },

{
  "label": "阜宁县",
  "value": "320923" },

{
  "label": "射阳县",
  "value": "320924" },

{
  "label": "建湖县",
  "value": "320925" },

{
  "label": "盐城经济技术开发区",
  "value": "320971" },

{
  "label": "东台市",
  "value": "320981" }],


[{
  "label": "广陵区",
  "value": "321002" },

{
  "label": "邗江区",
  "value": "321003" },

{
  "label": "江都区",
  "value": "321012" },

{
  "label": "宝应县",
  "value": "321023" },

{
  "label": "扬州经济技术开发区",
  "value": "321071" },

{
  "label": "仪征市",
  "value": "321081" },

{
  "label": "高邮市",
  "value": "321084" }],


[{
  "label": "京口区",
  "value": "321102" },

{
  "label": "润州区",
  "value": "321111" },

{
  "label": "丹徒区",
  "value": "321112" },

{
  "label": "镇江新区",
  "value": "321171" },

{
  "label": "丹阳市",
  "value": "321181" },

{
  "label": "扬中市",
  "value": "321182" },

{
  "label": "句容市",
  "value": "321183" }],


[{
  "label": "海陵区",
  "value": "321202" },

{
  "label": "高港区",
  "value": "321203" },

{
  "label": "姜堰区",
  "value": "321204" },

{
  "label": "泰州医药高新技术产业开发区",
  "value": "321271" },

{
  "label": "兴化市",
  "value": "321281" },

{
  "label": "靖江市",
  "value": "321282" },

{
  "label": "泰兴市",
  "value": "321283" }],


[{
  "label": "宿城区",
  "value": "321302" },

{
  "label": "宿豫区",
  "value": "321311" },

{
  "label": "沭阳县",
  "value": "321322" },

{
  "label": "泗阳县",
  "value": "321323" },

{
  "label": "泗洪县",
  "value": "321324" },

{
  "label": "宿迁经济技术开发区",
  "value": "321371" }]],



[
[{
  "label": "上城区",
  "value": "330102" },

{
  "label": "下城区",
  "value": "330103" },

{
  "label": "江干区",
  "value": "330104" },

{
  "label": "拱墅区",
  "value": "330105" },

{
  "label": "西湖区",
  "value": "330106" },

{
  "label": "滨江区",
  "value": "330108" },

{
  "label": "萧山区",
  "value": "330109" },

{
  "label": "余杭区",
  "value": "330110" },

{
  "label": "富阳区",
  "value": "330111" },

{
  "label": "临安区",
  "value": "330112" },

{
  "label": "桐庐县",
  "value": "330122" },

{
  "label": "淳安县",
  "value": "330127" },

{
  "label": "建德市",
  "value": "330182" }],


[{
  "label": "海曙区",
  "value": "330203" },

{
  "label": "江北区",
  "value": "330205" },

{
  "label": "北仑区",
  "value": "330206" },

{
  "label": "镇海区",
  "value": "330211" },

{
  "label": "鄞州区",
  "value": "330212" },

{
  "label": "奉化区",
  "value": "330213" },

{
  "label": "象山县",
  "value": "330225" },

{
  "label": "宁海县",
  "value": "330226" },

{
  "label": "余姚市",
  "value": "330281" },

{
  "label": "慈溪市",
  "value": "330282" }],


[{
  "label": "鹿城区",
  "value": "330302" },

{
  "label": "龙湾区",
  "value": "330303" },

{
  "label": "瓯海区",
  "value": "330304" },

{
  "label": "洞头区",
  "value": "330305" },

{
  "label": "永嘉县",
  "value": "330324" },

{
  "label": "平阳县",
  "value": "330326" },

{
  "label": "苍南县",
  "value": "330327" },

{
  "label": "文成县",
  "value": "330328" },

{
  "label": "泰顺县",
  "value": "330329" },

{
  "label": "温州经济技术开发区",
  "value": "330371" },

{
  "label": "瑞安市",
  "value": "330381" },

{
  "label": "乐清市",
  "value": "330382" }],


[{
  "label": "南湖区",
  "value": "330402" },

{
  "label": "秀洲区",
  "value": "330411" },

{
  "label": "嘉善县",
  "value": "330421" },

{
  "label": "海盐县",
  "value": "330424" },

{
  "label": "海宁市",
  "value": "330481" },

{
  "label": "平湖市",
  "value": "330482" },

{
  "label": "桐乡市",
  "value": "330483" }],


[{
  "label": "吴兴区",
  "value": "330502" },

{
  "label": "南浔区",
  "value": "330503" },

{
  "label": "德清县",
  "value": "330521" },

{
  "label": "长兴县",
  "value": "330522" },

{
  "label": "安吉县",
  "value": "330523" }],


[{
  "label": "越城区",
  "value": "330602" },

{
  "label": "柯桥区",
  "value": "330603" },

{
  "label": "上虞区",
  "value": "330604" },

{
  "label": "新昌县",
  "value": "330624" },

{
  "label": "诸暨市",
  "value": "330681" },

{
  "label": "嵊州市",
  "value": "330683" }],


[{
  "label": "婺城区",
  "value": "330702" },

{
  "label": "金东区",
  "value": "330703" },

{
  "label": "武义县",
  "value": "330723" },

{
  "label": "浦江县",
  "value": "330726" },

{
  "label": "磐安县",
  "value": "330727" },

{
  "label": "兰溪市",
  "value": "330781" },

{
  "label": "义乌市",
  "value": "330782" },

{
  "label": "东阳市",
  "value": "330783" },

{
  "label": "永康市",
  "value": "330784" }],


[{
  "label": "柯城区",
  "value": "330802" },

{
  "label": "衢江区",
  "value": "330803" },

{
  "label": "常山县",
  "value": "330822" },

{
  "label": "开化县",
  "value": "330824" },

{
  "label": "龙游县",
  "value": "330825" },

{
  "label": "江山市",
  "value": "330881" }],


[{
  "label": "定海区",
  "value": "330902" },

{
  "label": "普陀区",
  "value": "330903" },

{
  "label": "岱山县",
  "value": "330921" },

{
  "label": "嵊泗县",
  "value": "330922" }],


[{
  "label": "椒江区",
  "value": "331002" },

{
  "label": "黄岩区",
  "value": "331003" },

{
  "label": "路桥区",
  "value": "331004" },

{
  "label": "三门县",
  "value": "331022" },

{
  "label": "天台县",
  "value": "331023" },

{
  "label": "仙居县",
  "value": "331024" },

{
  "label": "温岭市",
  "value": "331081" },

{
  "label": "临海市",
  "value": "331082" },

{
  "label": "玉环市",
  "value": "331083" }],


[{
  "label": "莲都区",
  "value": "331102" },

{
  "label": "青田县",
  "value": "331121" },

{
  "label": "缙云县",
  "value": "331122" },

{
  "label": "遂昌县",
  "value": "331123" },

{
  "label": "松阳县",
  "value": "331124" },

{
  "label": "云和县",
  "value": "331125" },

{
  "label": "庆元县",
  "value": "331126" },

{
  "label": "景宁畲族自治县",
  "value": "331127" },

{
  "label": "龙泉市",
  "value": "331181" }]],



[
[{
  "label": "瑶海区",
  "value": "340102" },

{
  "label": "庐阳区",
  "value": "340103" },

{
  "label": "蜀山区",
  "value": "340104" },

{
  "label": "包河区",
  "value": "340111" },

{
  "label": "长丰县",
  "value": "340121" },

{
  "label": "肥东县",
  "value": "340122" },

{
  "label": "肥西县",
  "value": "340123" },

{
  "label": "庐江县",
  "value": "340124" },

{
  "label": "合肥高新技术产业开发区",
  "value": "340171" },

{
  "label": "合肥经济技术开发区",
  "value": "340172" },

{
  "label": "合肥新站高新技术产业开发区",
  "value": "340173" },

{
  "label": "巢湖市",
  "value": "340181" }],


[{
  "label": "镜湖区",
  "value": "340202" },

{
  "label": "弋江区",
  "value": "340203" },

{
  "label": "鸠江区",
  "value": "340207" },

{
  "label": "三山区",
  "value": "340208" },

{
  "label": "芜湖县",
  "value": "340221" },

{
  "label": "繁昌县",
  "value": "340222" },

{
  "label": "南陵县",
  "value": "340223" },

{
  "label": "无为县",
  "value": "340225" },

{
  "label": "芜湖经济技术开发区",
  "value": "340271" },

{
  "label": "安徽芜湖长江大桥经济开发区",
  "value": "340272" }],


[{
  "label": "龙子湖区",
  "value": "340302" },

{
  "label": "蚌山区",
  "value": "340303" },

{
  "label": "禹会区",
  "value": "340304" },

{
  "label": "淮上区",
  "value": "340311" },

{
  "label": "怀远县",
  "value": "340321" },

{
  "label": "五河县",
  "value": "340322" },

{
  "label": "固镇县",
  "value": "340323" },

{
  "label": "蚌埠市高新技术开发区",
  "value": "340371" },

{
  "label": "蚌埠市经济开发区",
  "value": "340372" }],


[{
  "label": "大通区",
  "value": "340402" },

{
  "label": "田家庵区",
  "value": "340403" },

{
  "label": "谢家集区",
  "value": "340404" },

{
  "label": "八公山区",
  "value": "340405" },

{
  "label": "潘集区",
  "value": "340406" },

{
  "label": "凤台县",
  "value": "340421" },

{
  "label": "寿县",
  "value": "340422" }],


[{
  "label": "花山区",
  "value": "340503" },

{
  "label": "雨山区",
  "value": "340504" },

{
  "label": "博望区",
  "value": "340506" },

{
  "label": "当涂县",
  "value": "340521" },

{
  "label": "含山县",
  "value": "340522" },

{
  "label": "和县",
  "value": "340523" }],


[{
  "label": "杜集区",
  "value": "340602" },

{
  "label": "相山区",
  "value": "340603" },

{
  "label": "烈山区",
  "value": "340604" },

{
  "label": "濉溪县",
  "value": "340621" }],


[{
  "label": "铜官区",
  "value": "340705" },

{
  "label": "义安区",
  "value": "340706" },

{
  "label": "郊区",
  "value": "340711" },

{
  "label": "枞阳县",
  "value": "340722" }],


[{
  "label": "迎江区",
  "value": "340802" },

{
  "label": "大观区",
  "value": "340803" },

{
  "label": "宜秀区",
  "value": "340811" },

{
  "label": "怀宁县",
  "value": "340822" },

{
  "label": "潜山县",
  "value": "340824" },

{
  "label": "太湖县",
  "value": "340825" },

{
  "label": "宿松县",
  "value": "340826" },

{
  "label": "望江县",
  "value": "340827" },

{
  "label": "岳西县",
  "value": "340828" },

{
  "label": "安徽安庆经济开发区",
  "value": "340871" },

{
  "label": "桐城市",
  "value": "340881" }],


[{
  "label": "屯溪区",
  "value": "341002" },

{
  "label": "黄山区",
  "value": "341003" },

{
  "label": "徽州区",
  "value": "341004" },

{
  "label": "歙县",
  "value": "341021" },

{
  "label": "休宁县",
  "value": "341022" },

{
  "label": "黟县",
  "value": "341023" },

{
  "label": "祁门县",
  "value": "341024" }],


[{
  "label": "琅琊区",
  "value": "341102" },

{
  "label": "南谯区",
  "value": "341103" },

{
  "label": "来安县",
  "value": "341122" },

{
  "label": "全椒县",
  "value": "341124" },

{
  "label": "定远县",
  "value": "341125" },

{
  "label": "凤阳县",
  "value": "341126" },

{
  "label": "苏滁现代产业园",
  "value": "341171" },

{
  "label": "滁州经济技术开发区",
  "value": "341172" },

{
  "label": "天长市",
  "value": "341181" },

{
  "label": "明光市",
  "value": "341182" }],


[{
  "label": "颍州区",
  "value": "341202" },

{
  "label": "颍东区",
  "value": "341203" },

{
  "label": "颍泉区",
  "value": "341204" },

{
  "label": "临泉县",
  "value": "341221" },

{
  "label": "太和县",
  "value": "341222" },

{
  "label": "阜南县",
  "value": "341225" },

{
  "label": "颍上县",
  "value": "341226" },

{
  "label": "阜阳合肥现代产业园区",
  "value": "341271" },

{
  "label": "阜阳经济技术开发区",
  "value": "341272" },

{
  "label": "界首市",
  "value": "341282" }],


[{
  "label": "埇桥区",
  "value": "341302" },

{
  "label": "砀山县",
  "value": "341321" },

{
  "label": "萧县",
  "value": "341322" },

{
  "label": "灵璧县",
  "value": "341323" },

{
  "label": "泗县",
  "value": "341324" },

{
  "label": "宿州马鞍山现代产业园区",
  "value": "341371" },

{
  "label": "宿州经济技术开发区",
  "value": "341372" }],


[{
  "label": "金安区",
  "value": "341502" },

{
  "label": "裕安区",
  "value": "341503" },

{
  "label": "叶集区",
  "value": "341504" },

{
  "label": "霍邱县",
  "value": "341522" },

{
  "label": "舒城县",
  "value": "341523" },

{
  "label": "金寨县",
  "value": "341524" },

{
  "label": "霍山县",
  "value": "341525" }],


[{
  "label": "谯城区",
  "value": "341602" },

{
  "label": "涡阳县",
  "value": "341621" },

{
  "label": "蒙城县",
  "value": "341622" },

{
  "label": "利辛县",
  "value": "341623" }],


[{
  "label": "贵池区",
  "value": "341702" },

{
  "label": "东至县",
  "value": "341721" },

{
  "label": "石台县",
  "value": "341722" },

{
  "label": "青阳县",
  "value": "341723" }],


[{
  "label": "宣州区",
  "value": "341802" },

{
  "label": "郎溪县",
  "value": "341821" },

{
  "label": "广德县",
  "value": "341822" },

{
  "label": "泾县",
  "value": "341823" },

{
  "label": "绩溪县",
  "value": "341824" },

{
  "label": "旌德县",
  "value": "341825" },

{
  "label": "宣城市经济开发区",
  "value": "341871" },

{
  "label": "宁国市",
  "value": "341881" }]],



[
[{
  "label": "鼓楼区",
  "value": "350102" },

{
  "label": "台江区",
  "value": "350103" },

{
  "label": "仓山区",
  "value": "350104" },

{
  "label": "马尾区",
  "value": "350105" },

{
  "label": "晋安区",
  "value": "350111" },

{
  "label": "闽侯县",
  "value": "350121" },

{
  "label": "连江县",
  "value": "350122" },

{
  "label": "罗源县",
  "value": "350123" },

{
  "label": "闽清县",
  "value": "350124" },

{
  "label": "永泰县",
  "value": "350125" },

{
  "label": "平潭县",
  "value": "350128" },

{
  "label": "福清市",
  "value": "350181" },

{
  "label": "长乐市",
  "value": "350182" }],


[{
  "label": "思明区",
  "value": "350203" },

{
  "label": "海沧区",
  "value": "350205" },

{
  "label": "湖里区",
  "value": "350206" },

{
  "label": "集美区",
  "value": "350211" },

{
  "label": "同安区",
  "value": "350212" },

{
  "label": "翔安区",
  "value": "350213" }],


[{
  "label": "城厢区",
  "value": "350302" },

{
  "label": "涵江区",
  "value": "350303" },

{
  "label": "荔城区",
  "value": "350304" },

{
  "label": "秀屿区",
  "value": "350305" },

{
  "label": "仙游县",
  "value": "350322" }],


[{
  "label": "梅列区",
  "value": "350402" },

{
  "label": "三元区",
  "value": "350403" },

{
  "label": "明溪县",
  "value": "350421" },

{
  "label": "清流县",
  "value": "350423" },

{
  "label": "宁化县",
  "value": "350424" },

{
  "label": "大田县",
  "value": "350425" },

{
  "label": "尤溪县",
  "value": "350426" },

{
  "label": "沙县",
  "value": "350427" },

{
  "label": "将乐县",
  "value": "350428" },

{
  "label": "泰宁县",
  "value": "350429" },

{
  "label": "建宁县",
  "value": "350430" },

{
  "label": "永安市",
  "value": "350481" }],


[{
  "label": "鲤城区",
  "value": "350502" },

{
  "label": "丰泽区",
  "value": "350503" },

{
  "label": "洛江区",
  "value": "350504" },

{
  "label": "泉港区",
  "value": "350505" },

{
  "label": "惠安县",
  "value": "350521" },

{
  "label": "安溪县",
  "value": "350524" },

{
  "label": "永春县",
  "value": "350525" },

{
  "label": "德化县",
  "value": "350526" },

{
  "label": "金门县",
  "value": "350527" },

{
  "label": "石狮市",
  "value": "350581" },

{
  "label": "晋江市",
  "value": "350582" },

{
  "label": "南安市",
  "value": "350583" }],


[{
  "label": "芗城区",
  "value": "350602" },

{
  "label": "龙文区",
  "value": "350603" },

{
  "label": "云霄县",
  "value": "350622" },

{
  "label": "漳浦县",
  "value": "350623" },

{
  "label": "诏安县",
  "value": "350624" },

{
  "label": "长泰县",
  "value": "350625" },

{
  "label": "东山县",
  "value": "350626" },

{
  "label": "南靖县",
  "value": "350627" },

{
  "label": "平和县",
  "value": "350628" },

{
  "label": "华安县",
  "value": "350629" },

{
  "label": "龙海市",
  "value": "350681" }],


[{
  "label": "延平区",
  "value": "350702" },

{
  "label": "建阳区",
  "value": "350703" },

{
  "label": "顺昌县",
  "value": "350721" },

{
  "label": "浦城县",
  "value": "350722" },

{
  "label": "光泽县",
  "value": "350723" },

{
  "label": "松溪县",
  "value": "350724" },

{
  "label": "政和县",
  "value": "350725" },

{
  "label": "邵武市",
  "value": "350781" },

{
  "label": "武夷山市",
  "value": "350782" },

{
  "label": "建瓯市",
  "value": "350783" }],


[{
  "label": "新罗区",
  "value": "350802" },

{
  "label": "永定区",
  "value": "350803" },

{
  "label": "长汀县",
  "value": "350821" },

{
  "label": "上杭县",
  "value": "350823" },

{
  "label": "武平县",
  "value": "350824" },

{
  "label": "连城县",
  "value": "350825" },

{
  "label": "漳平市",
  "value": "350881" }],


[{
  "label": "蕉城区",
  "value": "350902" },

{
  "label": "霞浦县",
  "value": "350921" },

{
  "label": "古田县",
  "value": "350922" },

{
  "label": "屏南县",
  "value": "350923" },

{
  "label": "寿宁县",
  "value": "350924" },

{
  "label": "周宁县",
  "value": "350925" },

{
  "label": "柘荣县",
  "value": "350926" },

{
  "label": "福安市",
  "value": "350981" },

{
  "label": "福鼎市",
  "value": "350982" }]],



[
[{
  "label": "东湖区",
  "value": "360102" },

{
  "label": "西湖区",
  "value": "360103" },

{
  "label": "青云谱区",
  "value": "360104" },

{
  "label": "湾里区",
  "value": "360105" },

{
  "label": "青山湖区",
  "value": "360111" },

{
  "label": "新建区",
  "value": "360112" },

{
  "label": "南昌县",
  "value": "360121" },

{
  "label": "安义县",
  "value": "360123" },

{
  "label": "进贤县",
  "value": "360124" }],


[{
  "label": "昌江区",
  "value": "360202" },

{
  "label": "珠山区",
  "value": "360203" },

{
  "label": "浮梁县",
  "value": "360222" },

{
  "label": "乐平市",
  "value": "360281" }],


[{
  "label": "安源区",
  "value": "360302" },

{
  "label": "湘东区",
  "value": "360313" },

{
  "label": "莲花县",
  "value": "360321" },

{
  "label": "上栗县",
  "value": "360322" },

{
  "label": "芦溪县",
  "value": "360323" }],


[{
  "label": "濂溪区",
  "value": "360402" },

{
  "label": "浔阳区",
  "value": "360403" },

{
  "label": "柴桑区",
  "value": "360404" },

{
  "label": "武宁县",
  "value": "360423" },

{
  "label": "修水县",
  "value": "360424" },

{
  "label": "永修县",
  "value": "360425" },

{
  "label": "德安县",
  "value": "360426" },

{
  "label": "都昌县",
  "value": "360428" },

{
  "label": "湖口县",
  "value": "360429" },

{
  "label": "彭泽县",
  "value": "360430" },

{
  "label": "瑞昌市",
  "value": "360481" },

{
  "label": "共青城市",
  "value": "360482" },

{
  "label": "庐山市",
  "value": "360483" }],


[{
  "label": "渝水区",
  "value": "360502" },

{
  "label": "分宜县",
  "value": "360521" }],


[{
  "label": "月湖区",
  "value": "360602" },

{
  "label": "余江县",
  "value": "360622" },

{
  "label": "贵溪市",
  "value": "360681" }],


[{
  "label": "章贡区",
  "value": "360702" },

{
  "label": "南康区",
  "value": "360703" },

{
  "label": "赣县区",
  "value": "360704" },

{
  "label": "信丰县",
  "value": "360722" },

{
  "label": "大余县",
  "value": "360723" },

{
  "label": "上犹县",
  "value": "360724" },

{
  "label": "崇义县",
  "value": "360725" },

{
  "label": "安远县",
  "value": "360726" },

{
  "label": "龙南县",
  "value": "360727" },

{
  "label": "定南县",
  "value": "360728" },

{
  "label": "全南县",
  "value": "360729" },

{
  "label": "宁都县",
  "value": "360730" },

{
  "label": "于都县",
  "value": "360731" },

{
  "label": "兴国县",
  "value": "360732" },

{
  "label": "会昌县",
  "value": "360733" },

{
  "label": "寻乌县",
  "value": "360734" },

{
  "label": "石城县",
  "value": "360735" },

{
  "label": "瑞金市",
  "value": "360781" }],


[{
  "label": "吉州区",
  "value": "360802" },

{
  "label": "青原区",
  "value": "360803" },

{
  "label": "吉安县",
  "value": "360821" },

{
  "label": "吉水县",
  "value": "360822" },

{
  "label": "峡江县",
  "value": "360823" },

{
  "label": "新干县",
  "value": "360824" },

{
  "label": "永丰县",
  "value": "360825" },

{
  "label": "泰和县",
  "value": "360826" },

{
  "label": "遂川县",
  "value": "360827" },

{
  "label": "万安县",
  "value": "360828" },

{
  "label": "安福县",
  "value": "360829" },

{
  "label": "永新县",
  "value": "360830" },

{
  "label": "井冈山市",
  "value": "360881" }],


[{
  "label": "袁州区",
  "value": "360902" },

{
  "label": "奉新县",
  "value": "360921" },

{
  "label": "万载县",
  "value": "360922" },

{
  "label": "上高县",
  "value": "360923" },

{
  "label": "宜丰县",
  "value": "360924" },

{
  "label": "靖安县",
  "value": "360925" },

{
  "label": "铜鼓县",
  "value": "360926" },

{
  "label": "丰城市",
  "value": "360981" },

{
  "label": "樟树市",
  "value": "360982" },

{
  "label": "高安市",
  "value": "360983" }],


[{
  "label": "临川区",
  "value": "361002" },

{
  "label": "东乡区",
  "value": "361003" },

{
  "label": "南城县",
  "value": "361021" },

{
  "label": "黎川县",
  "value": "361022" },

{
  "label": "南丰县",
  "value": "361023" },

{
  "label": "崇仁县",
  "value": "361024" },

{
  "label": "乐安县",
  "value": "361025" },

{
  "label": "宜黄县",
  "value": "361026" },

{
  "label": "金溪县",
  "value": "361027" },

{
  "label": "资溪县",
  "value": "361028" },

{
  "label": "广昌县",
  "value": "361030" }],


[{
  "label": "信州区",
  "value": "361102" },

{
  "label": "广丰区",
  "value": "361103" },

{
  "label": "上饶县",
  "value": "361121" },

{
  "label": "玉山县",
  "value": "361123" },

{
  "label": "铅山县",
  "value": "361124" },

{
  "label": "横峰县",
  "value": "361125" },

{
  "label": "弋阳县",
  "value": "361126" },

{
  "label": "余干县",
  "value": "361127" },

{
  "label": "鄱阳县",
  "value": "361128" },

{
  "label": "万年县",
  "value": "361129" },

{
  "label": "婺源县",
  "value": "361130" },

{
  "label": "德兴市",
  "value": "361181" }]],



[
[{
  "label": "历下区",
  "value": "370102" },

{
  "label": "市中区",
  "value": "370103" },

{
  "label": "槐荫区",
  "value": "370104" },

{
  "label": "天桥区",
  "value": "370105" },

{
  "label": "历城区",
  "value": "370112" },

{
  "label": "长清区",
  "value": "370113" },

{
  "label": "章丘区",
  "value": "370114" },

{
  "label": "平阴县",
  "value": "370124" },

{
  "label": "济阳县",
  "value": "370125" },

{
  "label": "商河县",
  "value": "370126" },

{
  "label": "济南高新技术产业开发区",
  "value": "370171" }],


[{
  "label": "市南区",
  "value": "370202" },

{
  "label": "市北区",
  "value": "370203" },

{
  "label": "黄岛区",
  "value": "370211" },

{
  "label": "崂山区",
  "value": "370212" },

{
  "label": "李沧区",
  "value": "370213" },

{
  "label": "城阳区",
  "value": "370214" },

{
  "label": "即墨区",
  "value": "370215" },

{
  "label": "青岛高新技术产业开发区",
  "value": "370271" },

{
  "label": "胶州市",
  "value": "370281" },

{
  "label": "平度市",
  "value": "370283" },

{
  "label": "莱西市",
  "value": "370285" }],


[{
  "label": "淄川区",
  "value": "370302" },

{
  "label": "张店区",
  "value": "370303" },

{
  "label": "博山区",
  "value": "370304" },

{
  "label": "临淄区",
  "value": "370305" },

{
  "label": "周村区",
  "value": "370306" },

{
  "label": "桓台县",
  "value": "370321" },

{
  "label": "高青县",
  "value": "370322" },

{
  "label": "沂源县",
  "value": "370323" }],


[{
  "label": "市中区",
  "value": "370402" },

{
  "label": "薛城区",
  "value": "370403" },

{
  "label": "峄城区",
  "value": "370404" },

{
  "label": "台儿庄区",
  "value": "370405" },

{
  "label": "山亭区",
  "value": "370406" },

{
  "label": "滕州市",
  "value": "370481" }],


[{
  "label": "东营区",
  "value": "370502" },

{
  "label": "河口区",
  "value": "370503" },

{
  "label": "垦利区",
  "value": "370505" },

{
  "label": "利津县",
  "value": "370522" },

{
  "label": "广饶县",
  "value": "370523" },

{
  "label": "东营经济技术开发区",
  "value": "370571" },

{
  "label": "东营港经济开发区",
  "value": "370572" }],


[{
  "label": "芝罘区",
  "value": "370602" },

{
  "label": "福山区",
  "value": "370611" },

{
  "label": "牟平区",
  "value": "370612" },

{
  "label": "莱山区",
  "value": "370613" },

{
  "label": "长岛县",
  "value": "370634" },

{
  "label": "烟台高新技术产业开发区",
  "value": "370671" },

{
  "label": "烟台经济技术开发区",
  "value": "370672" },

{
  "label": "龙口市",
  "value": "370681" },

{
  "label": "莱阳市",
  "value": "370682" },

{
  "label": "莱州市",
  "value": "370683" },

{
  "label": "蓬莱市",
  "value": "370684" },

{
  "label": "招远市",
  "value": "370685" },

{
  "label": "栖霞市",
  "value": "370686" },

{
  "label": "海阳市",
  "value": "370687" }],


[{
  "label": "潍城区",
  "value": "370702" },

{
  "label": "寒亭区",
  "value": "370703" },

{
  "label": "坊子区",
  "value": "370704" },

{
  "label": "奎文区",
  "value": "370705" },

{
  "label": "临朐县",
  "value": "370724" },

{
  "label": "昌乐县",
  "value": "370725" },

{
  "label": "潍坊滨海经济技术开发区",
  "value": "370772" },

{
  "label": "青州市",
  "value": "370781" },

{
  "label": "诸城市",
  "value": "370782" },

{
  "label": "寿光市",
  "value": "370783" },

{
  "label": "安丘市",
  "value": "370784" },

{
  "label": "高密市",
  "value": "370785" },

{
  "label": "昌邑市",
  "value": "370786" }],


[{
  "label": "任城区",
  "value": "370811" },

{
  "label": "兖州区",
  "value": "370812" },

{
  "label": "微山县",
  "value": "370826" },

{
  "label": "鱼台县",
  "value": "370827" },

{
  "label": "金乡县",
  "value": "370828" },

{
  "label": "嘉祥县",
  "value": "370829" },

{
  "label": "汶上县",
  "value": "370830" },

{
  "label": "泗水县",
  "value": "370831" },

{
  "label": "梁山县",
  "value": "370832" },

{
  "label": "济宁高新技术产业开发区",
  "value": "370871" },

{
  "label": "曲阜市",
  "value": "370881" },

{
  "label": "邹城市",
  "value": "370883" }],


[{
  "label": "泰山区",
  "value": "370902" },

{
  "label": "岱岳区",
  "value": "370911" },

{
  "label": "宁阳县",
  "value": "370921" },

{
  "label": "东平县",
  "value": "370923" },

{
  "label": "新泰市",
  "value": "370982" },

{
  "label": "肥城市",
  "value": "370983" }],


[{
  "label": "环翠区",
  "value": "371002" },

{
  "label": "文登区",
  "value": "371003" },

{
  "label": "威海火炬高技术产业开发区",
  "value": "371071" },

{
  "label": "威海经济技术开发区",
  "value": "371072" },

{
  "label": "威海临港经济技术开发区",
  "value": "371073" },

{
  "label": "荣成市",
  "value": "371082" },

{
  "label": "乳山市",
  "value": "371083" }],


[{
  "label": "东港区",
  "value": "371102" },

{
  "label": "岚山区",
  "value": "371103" },

{
  "label": "五莲县",
  "value": "371121" },

{
  "label": "莒县",
  "value": "371122" },

{
  "label": "日照经济技术开发区",
  "value": "371171" },

{
  "label": "日照国际海洋城",
  "value": "371172" }],


[{
  "label": "莱城区",
  "value": "371202" },

{
  "label": "钢城区",
  "value": "371203" }],


[{
  "label": "兰山区",
  "value": "371302" },

{
  "label": "罗庄区",
  "value": "371311" },

{
  "label": "河东区",
  "value": "371312" },

{
  "label": "沂南县",
  "value": "371321" },

{
  "label": "郯城县",
  "value": "371322" },

{
  "label": "沂水县",
  "value": "371323" },

{
  "label": "兰陵县",
  "value": "371324" },

{
  "label": "费县",
  "value": "371325" },

{
  "label": "平邑县",
  "value": "371326" },

{
  "label": "莒南县",
  "value": "371327" },

{
  "label": "蒙阴县",
  "value": "371328" },

{
  "label": "临沭县",
  "value": "371329" },

{
  "label": "临沂高新技术产业开发区",
  "value": "371371" },

{
  "label": "临沂经济技术开发区",
  "value": "371372" },

{
  "label": "临沂临港经济开发区",
  "value": "371373" }],


[{
  "label": "德城区",
  "value": "371402" },

{
  "label": "陵城区",
  "value": "371403" },

{
  "label": "宁津县",
  "value": "371422" },

{
  "label": "庆云县",
  "value": "371423" },

{
  "label": "临邑县",
  "value": "371424" },

{
  "label": "齐河县",
  "value": "371425" },

{
  "label": "平原县",
  "value": "371426" },

{
  "label": "夏津县",
  "value": "371427" },

{
  "label": "武城县",
  "value": "371428" },

{
  "label": "德州经济技术开发区",
  "value": "371471" },

{
  "label": "德州运河经济开发区",
  "value": "371472" },

{
  "label": "乐陵市",
  "value": "371481" },

{
  "label": "禹城市",
  "value": "371482" }],


[{
  "label": "东昌府区",
  "value": "371502" },

{
  "label": "阳谷县",
  "value": "371521" },

{
  "label": "莘县",
  "value": "371522" },

{
  "label": "茌平县",
  "value": "371523" },

{
  "label": "东阿县",
  "value": "371524" },

{
  "label": "冠县",
  "value": "371525" },

{
  "label": "高唐县",
  "value": "371526" },

{
  "label": "临清市",
  "value": "371581" }],


[{
  "label": "滨城区",
  "value": "371602" },

{
  "label": "沾化区",
  "value": "371603" },

{
  "label": "惠民县",
  "value": "371621" },

{
  "label": "阳信县",
  "value": "371622" },

{
  "label": "无棣县",
  "value": "371623" },

{
  "label": "博兴县",
  "value": "371625" },

{
  "label": "邹平县",
  "value": "371626" }],


[{
  "label": "牡丹区",
  "value": "371702" },

{
  "label": "定陶区",
  "value": "371703" },

{
  "label": "曹县",
  "value": "371721" },

{
  "label": "单县",
  "value": "371722" },

{
  "label": "成武县",
  "value": "371723" },

{
  "label": "巨野县",
  "value": "371724" },

{
  "label": "郓城县",
  "value": "371725" },

{
  "label": "鄄城县",
  "value": "371726" },

{
  "label": "东明县",
  "value": "371728" },

{
  "label": "菏泽经济技术开发区",
  "value": "371771" },

{
  "label": "菏泽高新技术开发区",
  "value": "371772" }]],



[
[{
  "label": "中原区",
  "value": "410102" },

{
  "label": "二七区",
  "value": "410103" },

{
  "label": "管城回族区",
  "value": "410104" },

{
  "label": "金水区",
  "value": "410105" },

{
  "label": "上街区",
  "value": "410106" },

{
  "label": "惠济区",
  "value": "410108" },

{
  "label": "中牟县",
  "value": "410122" },

{
  "label": "郑州经济技术开发区",
  "value": "410171" },

{
  "label": "郑州高新技术产业开发区",
  "value": "410172" },

{
  "label": "郑州航空港经济综合实验区",
  "value": "410173" },

{
  "label": "巩义市",
  "value": "410181" },

{
  "label": "荥阳市",
  "value": "410182" },

{
  "label": "新密市",
  "value": "410183" },

{
  "label": "新郑市",
  "value": "410184" },

{
  "label": "登封市",
  "value": "410185" }],


[{
  "label": "龙亭区",
  "value": "410202" },

{
  "label": "顺河回族区",
  "value": "410203" },

{
  "label": "鼓楼区",
  "value": "410204" },

{
  "label": "禹王台区",
  "value": "410205" },

{
  "label": "祥符区",
  "value": "410212" },

{
  "label": "杞县",
  "value": "410221" },

{
  "label": "通许县",
  "value": "410222" },

{
  "label": "尉氏县",
  "value": "410223" },

{
  "label": "兰考县",
  "value": "410225" }],


[{
  "label": "老城区",
  "value": "410302" },

{
  "label": "西工区",
  "value": "410303" },

{
  "label": "瀍河回族区",
  "value": "410304" },

{
  "label": "涧西区",
  "value": "410305" },

{
  "label": "吉利区",
  "value": "410306" },

{
  "label": "洛龙区",
  "value": "410311" },

{
  "label": "孟津县",
  "value": "410322" },

{
  "label": "新安县",
  "value": "410323" },

{
  "label": "栾川县",
  "value": "410324" },

{
  "label": "嵩县",
  "value": "410325" },

{
  "label": "汝阳县",
  "value": "410326" },

{
  "label": "宜阳县",
  "value": "410327" },

{
  "label": "洛宁县",
  "value": "410328" },

{
  "label": "伊川县",
  "value": "410329" },

{
  "label": "洛阳高新技术产业开发区",
  "value": "410371" },

{
  "label": "偃师市",
  "value": "410381" }],


[{
  "label": "新华区",
  "value": "410402" },

{
  "label": "卫东区",
  "value": "410403" },

{
  "label": "石龙区",
  "value": "410404" },

{
  "label": "湛河区",
  "value": "410411" },

{
  "label": "宝丰县",
  "value": "410421" },

{
  "label": "叶县",
  "value": "410422" },

{
  "label": "鲁山县",
  "value": "410423" },

{
  "label": "郏县",
  "value": "410425" },

{
  "label": "平顶山高新技术产业开发区",
  "value": "410471" },

{
  "label": "平顶山市新城区",
  "value": "410472" },

{
  "label": "舞钢市",
  "value": "410481" },

{
  "label": "汝州市",
  "value": "410482" }],


[{
  "label": "文峰区",
  "value": "410502" },

{
  "label": "北关区",
  "value": "410503" },

{
  "label": "殷都区",
  "value": "410505" },

{
  "label": "龙安区",
  "value": "410506" },

{
  "label": "安阳县",
  "value": "410522" },

{
  "label": "汤阴县",
  "value": "410523" },

{
  "label": "滑县",
  "value": "410526" },

{
  "label": "内黄县",
  "value": "410527" },

{
  "label": "安阳高新技术产业开发区",
  "value": "410571" },

{
  "label": "林州市",
  "value": "410581" }],


[{
  "label": "鹤山区",
  "value": "410602" },

{
  "label": "山城区",
  "value": "410603" },

{
  "label": "淇滨区",
  "value": "410611" },

{
  "label": "浚县",
  "value": "410621" },

{
  "label": "淇县",
  "value": "410622" },

{
  "label": "鹤壁经济技术开发区",
  "value": "410671" }],


[{
  "label": "红旗区",
  "value": "410702" },

{
  "label": "卫滨区",
  "value": "410703" },

{
  "label": "凤泉区",
  "value": "410704" },

{
  "label": "牧野区",
  "value": "410711" },

{
  "label": "新乡县",
  "value": "410721" },

{
  "label": "获嘉县",
  "value": "410724" },

{
  "label": "原阳县",
  "value": "410725" },

{
  "label": "延津县",
  "value": "410726" },

{
  "label": "封丘县",
  "value": "410727" },

{
  "label": "长垣县",
  "value": "410728" },

{
  "label": "新乡高新技术产业开发区",
  "value": "410771" },

{
  "label": "新乡经济技术开发区",
  "value": "410772" },

{
  "label": "新乡市平原城乡一体化示范区",
  "value": "410773" },

{
  "label": "卫辉市",
  "value": "410781" },

{
  "label": "辉县市",
  "value": "410782" }],


[{
  "label": "解放区",
  "value": "410802" },

{
  "label": "中站区",
  "value": "410803" },

{
  "label": "马村区",
  "value": "410804" },

{
  "label": "山阳区",
  "value": "410811" },

{
  "label": "修武县",
  "value": "410821" },

{
  "label": "博爱县",
  "value": "410822" },

{
  "label": "武陟县",
  "value": "410823" },

{
  "label": "温县",
  "value": "410825" },

{
  "label": "焦作城乡一体化示范区",
  "value": "410871" },

{
  "label": "沁阳市",
  "value": "410882" },

{
  "label": "孟州市",
  "value": "410883" }],


[{
  "label": "华龙区",
  "value": "410902" },

{
  "label": "清丰县",
  "value": "410922" },

{
  "label": "南乐县",
  "value": "410923" },

{
  "label": "范县",
  "value": "410926" },

{
  "label": "台前县",
  "value": "410927" },

{
  "label": "濮阳县",
  "value": "410928" },

{
  "label": "河南濮阳工业园区",
  "value": "410971" },

{
  "label": "濮阳经济技术开发区",
  "value": "410972" }],


[{
  "label": "魏都区",
  "value": "411002" },

{
  "label": "建安区",
  "value": "411003" },

{
  "label": "鄢陵县",
  "value": "411024" },

{
  "label": "襄城县",
  "value": "411025" },

{
  "label": "许昌经济技术开发区",
  "value": "411071" },

{
  "label": "禹州市",
  "value": "411081" },

{
  "label": "长葛市",
  "value": "411082" }],


[{
  "label": "源汇区",
  "value": "411102" },

{
  "label": "郾城区",
  "value": "411103" },

{
  "label": "召陵区",
  "value": "411104" },

{
  "label": "舞阳县",
  "value": "411121" },

{
  "label": "临颍县",
  "value": "411122" },

{
  "label": "漯河经济技术开发区",
  "value": "411171" }],


[{
  "label": "湖滨区",
  "value": "411202" },

{
  "label": "陕州区",
  "value": "411203" },

{
  "label": "渑池县",
  "value": "411221" },

{
  "label": "卢氏县",
  "value": "411224" },

{
  "label": "河南三门峡经济开发区",
  "value": "411271" },

{
  "label": "义马市",
  "value": "411281" },

{
  "label": "灵宝市",
  "value": "411282" }],


[{
  "label": "宛城区",
  "value": "411302" },

{
  "label": "卧龙区",
  "value": "411303" },

{
  "label": "南召县",
  "value": "411321" },

{
  "label": "方城县",
  "value": "411322" },

{
  "label": "西峡县",
  "value": "411323" },

{
  "label": "镇平县",
  "value": "411324" },

{
  "label": "内乡县",
  "value": "411325" },

{
  "label": "淅川县",
  "value": "411326" },

{
  "label": "社旗县",
  "value": "411327" },

{
  "label": "唐河县",
  "value": "411328" },

{
  "label": "新野县",
  "value": "411329" },

{
  "label": "桐柏县",
  "value": "411330" },

{
  "label": "南阳高新技术产业开发区",
  "value": "411371" },

{
  "label": "南阳市城乡一体化示范区",
  "value": "411372" },

{
  "label": "邓州市",
  "value": "411381" }],


[{
  "label": "梁园区",
  "value": "411402" },

{
  "label": "睢阳区",
  "value": "411403" },

{
  "label": "民权县",
  "value": "411421" },

{
  "label": "睢县",
  "value": "411422" },

{
  "label": "宁陵县",
  "value": "411423" },

{
  "label": "柘城县",
  "value": "411424" },

{
  "label": "虞城县",
  "value": "411425" },

{
  "label": "夏邑县",
  "value": "411426" },

{
  "label": "豫东综合物流产业聚集区",
  "value": "411471" },

{
  "label": "河南商丘经济开发区",
  "value": "411472" },

{
  "label": "永城市",
  "value": "411481" }],


[{
  "label": "浉河区",
  "value": "411502" },

{
  "label": "平桥区",
  "value": "411503" },

{
  "label": "罗山县",
  "value": "411521" },

{
  "label": "光山县",
  "value": "411522" },

{
  "label": "新县",
  "value": "411523" },

{
  "label": "商城县",
  "value": "411524" },

{
  "label": "固始县",
  "value": "411525" },

{
  "label": "潢川县",
  "value": "411526" },

{
  "label": "淮滨县",
  "value": "411527" },

{
  "label": "息县",
  "value": "411528" },

{
  "label": "信阳高新技术产业开发区",
  "value": "411571" }],


[{
  "label": "川汇区",
  "value": "411602" },

{
  "label": "扶沟县",
  "value": "411621" },

{
  "label": "西华县",
  "value": "411622" },

{
  "label": "商水县",
  "value": "411623" },

{
  "label": "沈丘县",
  "value": "411624" },

{
  "label": "郸城县",
  "value": "411625" },

{
  "label": "淮阳县",
  "value": "411626" },

{
  "label": "太康县",
  "value": "411627" },

{
  "label": "鹿邑县",
  "value": "411628" },

{
  "label": "河南周口经济开发区",
  "value": "411671" },

{
  "label": "项城市",
  "value": "411681" }],


[{
  "label": "驿城区",
  "value": "411702" },

{
  "label": "西平县",
  "value": "411721" },

{
  "label": "上蔡县",
  "value": "411722" },

{
  "label": "平舆县",
  "value": "411723" },

{
  "label": "正阳县",
  "value": "411724" },

{
  "label": "确山县",
  "value": "411725" },

{
  "label": "泌阳县",
  "value": "411726" },

{
  "label": "汝南县",
  "value": "411727" },

{
  "label": "遂平县",
  "value": "411728" },

{
  "label": "新蔡县",
  "value": "411729" },

{
  "label": "河南驻马店经济开发区",
  "value": "411771" }],


[{
  "label": "济源市",
  "value": "419001" }]],


[
[{
  "label": "江岸区",
  "value": "420102" },

{
  "label": "江汉区",
  "value": "420103" },

{
  "label": "硚口区",
  "value": "420104" },

{
  "label": "汉阳区",
  "value": "420105" },

{
  "label": "武昌区",
  "value": "420106" },

{
  "label": "青山区",
  "value": "420107" },

{
  "label": "洪山区",
  "value": "420111" },

{
  "label": "东西湖区",
  "value": "420112" },

{
  "label": "汉南区",
  "value": "420113" },

{
  "label": "蔡甸区",
  "value": "420114" },

{
  "label": "江夏区",
  "value": "420115" },

{
  "label": "黄陂区",
  "value": "420116" },

{
  "label": "新洲区",
  "value": "420117" }],


[{
  "label": "黄石港区",
  "value": "420202" },

{
  "label": "西塞山区",
  "value": "420203" },

{
  "label": "下陆区",
  "value": "420204" },

{
  "label": "铁山区",
  "value": "420205" },

{
  "label": "阳新县",
  "value": "420222" },

{
  "label": "大冶市",
  "value": "420281" }],


[{
  "label": "茅箭区",
  "value": "420302" },

{
  "label": "张湾区",
  "value": "420303" },

{
  "label": "郧阳区",
  "value": "420304" },

{
  "label": "郧西县",
  "value": "420322" },

{
  "label": "竹山县",
  "value": "420323" },

{
  "label": "竹溪县",
  "value": "420324" },

{
  "label": "房县",
  "value": "420325" },

{
  "label": "丹江口市",
  "value": "420381" }],


[{
  "label": "西陵区",
  "value": "420502" },

{
  "label": "伍家岗区",
  "value": "420503" },

{
  "label": "点军区",
  "value": "420504" },

{
  "label": "猇亭区",
  "value": "420505" },

{
  "label": "夷陵区",
  "value": "420506" },

{
  "label": "远安县",
  "value": "420525" },

{
  "label": "兴山县",
  "value": "420526" },

{
  "label": "秭归县",
  "value": "420527" },

{
  "label": "长阳土家族自治县",
  "value": "420528" },

{
  "label": "五峰土家族自治县",
  "value": "420529" },

{
  "label": "宜都市",
  "value": "420581" },

{
  "label": "当阳市",
  "value": "420582" },

{
  "label": "枝江市",
  "value": "420583" }],


[{
  "label": "襄城区",
  "value": "420602" },

{
  "label": "樊城区",
  "value": "420606" },

{
  "label": "襄州区",
  "value": "420607" },

{
  "label": "南漳县",
  "value": "420624" },

{
  "label": "谷城县",
  "value": "420625" },

{
  "label": "保康县",
  "value": "420626" },

{
  "label": "老河口市",
  "value": "420682" },

{
  "label": "枣阳市",
  "value": "420683" },

{
  "label": "宜城市",
  "value": "420684" }],


[{
  "label": "梁子湖区",
  "value": "420702" },

{
  "label": "华容区",
  "value": "420703" },

{
  "label": "鄂城区",
  "value": "420704" }],


[{
  "label": "东宝区",
  "value": "420802" },

{
  "label": "掇刀区",
  "value": "420804" },

{
  "label": "京山县",
  "value": "420821" },

{
  "label": "沙洋县",
  "value": "420822" },

{
  "label": "钟祥市",
  "value": "420881" }],


[{
  "label": "孝南区",
  "value": "420902" },

{
  "label": "孝昌县",
  "value": "420921" },

{
  "label": "大悟县",
  "value": "420922" },

{
  "label": "云梦县",
  "value": "420923" },

{
  "label": "应城市",
  "value": "420981" },

{
  "label": "安陆市",
  "value": "420982" },

{
  "label": "汉川市",
  "value": "420984" }],


[{
  "label": "沙市区",
  "value": "421002" },

{
  "label": "荆州区",
  "value": "421003" },

{
  "label": "公安县",
  "value": "421022" },

{
  "label": "监利县",
  "value": "421023" },

{
  "label": "江陵县",
  "value": "421024" },

{
  "label": "荆州经济技术开发区",
  "value": "421071" },

{
  "label": "石首市",
  "value": "421081" },

{
  "label": "洪湖市",
  "value": "421083" },

{
  "label": "松滋市",
  "value": "421087" }],


[{
  "label": "黄州区",
  "value": "421102" },

{
  "label": "团风县",
  "value": "421121" },

{
  "label": "红安县",
  "value": "421122" },

{
  "label": "罗田县",
  "value": "421123" },

{
  "label": "英山县",
  "value": "421124" },

{
  "label": "浠水县",
  "value": "421125" },

{
  "label": "蕲春县",
  "value": "421126" },

{
  "label": "黄梅县",
  "value": "421127" },

{
  "label": "龙感湖管理区",
  "value": "421171" },

{
  "label": "麻城市",
  "value": "421181" },

{
  "label": "武穴市",
  "value": "421182" }],


[{
  "label": "咸安区",
  "value": "421202" },

{
  "label": "嘉鱼县",
  "value": "421221" },

{
  "label": "通城县",
  "value": "421222" },

{
  "label": "崇阳县",
  "value": "421223" },

{
  "label": "通山县",
  "value": "421224" },

{
  "label": "赤壁市",
  "value": "421281" }],


[{
  "label": "曾都区",
  "value": "421303" },

{
  "label": "随县",
  "value": "421321" },

{
  "label": "广水市",
  "value": "421381" }],


[{
  "label": "恩施市",
  "value": "422801" },

{
  "label": "利川市",
  "value": "422802" },

{
  "label": "建始县",
  "value": "422822" },

{
  "label": "巴东县",
  "value": "422823" },

{
  "label": "宣恩县",
  "value": "422825" },

{
  "label": "咸丰县",
  "value": "422826" },

{
  "label": "来凤县",
  "value": "422827" },

{
  "label": "鹤峰县",
  "value": "422828" }],


[{
  "label": "仙桃市",
  "value": "429004" },

{
  "label": "潜江市",
  "value": "429005" },

{
  "label": "天门市",
  "value": "429006" },

{
  "label": "神农架林区",
  "value": "429021" }]],



[
[{
  "label": "芙蓉区",
  "value": "430102" },

{
  "label": "天心区",
  "value": "430103" },

{
  "label": "岳麓区",
  "value": "430104" },

{
  "label": "开福区",
  "value": "430105" },

{
  "label": "雨花区",
  "value": "430111" },

{
  "label": "望城区",
  "value": "430112" },

{
  "label": "长沙县",
  "value": "430121" },

{
  "label": "浏阳市",
  "value": "430181" },

{
  "label": "宁乡市",
  "value": "430182" }],


[{
  "label": "荷塘区",
  "value": "430202" },

{
  "label": "芦淞区",
  "value": "430203" },

{
  "label": "石峰区",
  "value": "430204" },

{
  "label": "天元区",
  "value": "430211" },

{
  "label": "株洲县",
  "value": "430221" },

{
  "label": "攸县",
  "value": "430223" },

{
  "label": "茶陵县",
  "value": "430224" },

{
  "label": "炎陵县",
  "value": "430225" },

{
  "label": "云龙示范区",
  "value": "430271" },

{
  "label": "醴陵市",
  "value": "430281" }],


[{
  "label": "雨湖区",
  "value": "430302" },

{
  "label": "岳塘区",
  "value": "430304" },

{
  "label": "湘潭县",
  "value": "430321" },

{
  "label": "湖南湘潭高新技术产业园区",
  "value": "430371" },

{
  "label": "湘潭昭山示范区",
  "value": "430372" },

{
  "label": "湘潭九华示范区",
  "value": "430373" },

{
  "label": "湘乡市",
  "value": "430381" },

{
  "label": "韶山市",
  "value": "430382" }],


[{
  "label": "珠晖区",
  "value": "430405" },

{
  "label": "雁峰区",
  "value": "430406" },

{
  "label": "石鼓区",
  "value": "430407" },

{
  "label": "蒸湘区",
  "value": "430408" },

{
  "label": "南岳区",
  "value": "430412" },

{
  "label": "衡阳县",
  "value": "430421" },

{
  "label": "衡南县",
  "value": "430422" },

{
  "label": "衡山县",
  "value": "430423" },

{
  "label": "衡东县",
  "value": "430424" },

{
  "label": "祁东县",
  "value": "430426" },

{
  "label": "衡阳综合保税区",
  "value": "430471" },

{
  "label": "湖南衡阳高新技术产业园区",
  "value": "430472" },

{
  "label": "湖南衡阳松木经济开发区",
  "value": "430473" },

{
  "label": "耒阳市",
  "value": "430481" },

{
  "label": "常宁市",
  "value": "430482" }],


[{
  "label": "双清区",
  "value": "430502" },

{
  "label": "大祥区",
  "value": "430503" },

{
  "label": "北塔区",
  "value": "430511" },

{
  "label": "邵东县",
  "value": "430521" },

{
  "label": "新邵县",
  "value": "430522" },

{
  "label": "邵阳县",
  "value": "430523" },

{
  "label": "隆回县",
  "value": "430524" },

{
  "label": "洞口县",
  "value": "430525" },

{
  "label": "绥宁县",
  "value": "430527" },

{
  "label": "新宁县",
  "value": "430528" },

{
  "label": "城步苗族自治县",
  "value": "430529" },

{
  "label": "武冈市",
  "value": "430581" }],


[{
  "label": "岳阳楼区",
  "value": "430602" },

{
  "label": "云溪区",
  "value": "430603" },

{
  "label": "君山区",
  "value": "430611" },

{
  "label": "岳阳县",
  "value": "430621" },

{
  "label": "华容县",
  "value": "430623" },

{
  "label": "湘阴县",
  "value": "430624" },

{
  "label": "平江县",
  "value": "430626" },

{
  "label": "岳阳市屈原管理区",
  "value": "430671" },

{
  "label": "汨罗市",
  "value": "430681" },

{
  "label": "临湘市",
  "value": "430682" }],


[{
  "label": "武陵区",
  "value": "430702" },

{
  "label": "鼎城区",
  "value": "430703" },

{
  "label": "安乡县",
  "value": "430721" },

{
  "label": "汉寿县",
  "value": "430722" },

{
  "label": "澧县",
  "value": "430723" },

{
  "label": "临澧县",
  "value": "430724" },

{
  "label": "桃源县",
  "value": "430725" },

{
  "label": "石门县",
  "value": "430726" },

{
  "label": "常德市西洞庭管理区",
  "value": "430771" },

{
  "label": "津市市",
  "value": "430781" }],


[{
  "label": "永定区",
  "value": "430802" },

{
  "label": "武陵源区",
  "value": "430811" },

{
  "label": "慈利县",
  "value": "430821" },

{
  "label": "桑植县",
  "value": "430822" }],


[{
  "label": "资阳区",
  "value": "430902" },

{
  "label": "赫山区",
  "value": "430903" },

{
  "label": "南县",
  "value": "430921" },

{
  "label": "桃江县",
  "value": "430922" },

{
  "label": "安化县",
  "value": "430923" },

{
  "label": "益阳市大通湖管理区",
  "value": "430971" },

{
  "label": "湖南益阳高新技术产业园区",
  "value": "430972" },

{
  "label": "沅江市",
  "value": "430981" }],


[{
  "label": "北湖区",
  "value": "431002" },

{
  "label": "苏仙区",
  "value": "431003" },

{
  "label": "桂阳县",
  "value": "431021" },

{
  "label": "宜章县",
  "value": "431022" },

{
  "label": "永兴县",
  "value": "431023" },

{
  "label": "嘉禾县",
  "value": "431024" },

{
  "label": "临武县",
  "value": "431025" },

{
  "label": "汝城县",
  "value": "431026" },

{
  "label": "桂东县",
  "value": "431027" },

{
  "label": "安仁县",
  "value": "431028" },

{
  "label": "资兴市",
  "value": "431081" }],


[{
  "label": "零陵区",
  "value": "431102" },

{
  "label": "冷水滩区",
  "value": "431103" },

{
  "label": "祁阳县",
  "value": "431121" },

{
  "label": "东安县",
  "value": "431122" },

{
  "label": "双牌县",
  "value": "431123" },

{
  "label": "道县",
  "value": "431124" },

{
  "label": "江永县",
  "value": "431125" },

{
  "label": "宁远县",
  "value": "431126" },

{
  "label": "蓝山县",
  "value": "431127" },

{
  "label": "新田县",
  "value": "431128" },

{
  "label": "江华瑶族自治县",
  "value": "431129" },

{
  "label": "永州经济技术开发区",
  "value": "431171" },

{
  "label": "永州市金洞管理区",
  "value": "431172" },

{
  "label": "永州市回龙圩管理区",
  "value": "431173" }],


[{
  "label": "鹤城区",
  "value": "431202" },

{
  "label": "中方县",
  "value": "431221" },

{
  "label": "沅陵县",
  "value": "431222" },

{
  "label": "辰溪县",
  "value": "431223" },

{
  "label": "溆浦县",
  "value": "431224" },

{
  "label": "会同县",
  "value": "431225" },

{
  "label": "麻阳苗族自治县",
  "value": "431226" },

{
  "label": "新晃侗族自治县",
  "value": "431227" },

{
  "label": "芷江侗族自治县",
  "value": "431228" },

{
  "label": "靖州苗族侗族自治县",
  "value": "431229" },

{
  "label": "通道侗族自治县",
  "value": "431230" },

{
  "label": "怀化市洪江管理区",
  "value": "431271" },

{
  "label": "洪江市",
  "value": "431281" }],


[{
  "label": "娄星区",
  "value": "431302" },

{
  "label": "双峰县",
  "value": "431321" },

{
  "label": "新化县",
  "value": "431322" },

{
  "label": "冷水江市",
  "value": "431381" },

{
  "label": "涟源市",
  "value": "431382" }],


[{
  "label": "吉首市",
  "value": "433101" },

{
  "label": "泸溪县",
  "value": "433122" },

{
  "label": "凤凰县",
  "value": "433123" },

{
  "label": "花垣县",
  "value": "433124" },

{
  "label": "保靖县",
  "value": "433125" },

{
  "label": "古丈县",
  "value": "433126" },

{
  "label": "永顺县",
  "value": "433127" },

{
  "label": "龙山县",
  "value": "433130" },

{
  "label": "湖南吉首经济开发区",
  "value": "433172" },

{
  "label": "湖南永顺经济开发区",
  "value": "433173" }]],



[
[{
  "label": "荔湾区",
  "value": "440103" },

{
  "label": "越秀区",
  "value": "440104" },

{
  "label": "海珠区",
  "value": "440105" },

{
  "label": "天河区",
  "value": "440106" },

{
  "label": "白云区",
  "value": "440111" },

{
  "label": "黄埔区",
  "value": "440112" },

{
  "label": "番禺区",
  "value": "440113" },

{
  "label": "花都区",
  "value": "440114" },

{
  "label": "南沙区",
  "value": "440115" },

{
  "label": "从化区",
  "value": "440117" },

{
  "label": "增城区",
  "value": "440118" }],


[{
  "label": "武江区",
  "value": "440203" },

{
  "label": "浈江区",
  "value": "440204" },

{
  "label": "曲江区",
  "value": "440205" },

{
  "label": "始兴县",
  "value": "440222" },

{
  "label": "仁化县",
  "value": "440224" },

{
  "label": "翁源县",
  "value": "440229" },

{
  "label": "乳源瑶族自治县",
  "value": "440232" },

{
  "label": "新丰县",
  "value": "440233" },

{
  "label": "乐昌市",
  "value": "440281" },

{
  "label": "南雄市",
  "value": "440282" }],


[{
  "label": "罗湖区",
  "value": "440303" },

{
  "label": "福田区",
  "value": "440304" },

{
  "label": "南山区",
  "value": "440305" },

{
  "label": "宝安区",
  "value": "440306" },

{
  "label": "龙岗区",
  "value": "440307" },

{
  "label": "盐田区",
  "value": "440308" },

{
  "label": "龙华区",
  "value": "440309" },

{
  "label": "坪山区",
  "value": "440310" }],


[{
  "label": "香洲区",
  "value": "440402" },

{
  "label": "斗门区",
  "value": "440403" },

{
  "label": "金湾区",
  "value": "440404" }],


[{
  "label": "龙湖区",
  "value": "440507" },

{
  "label": "金平区",
  "value": "440511" },

{
  "label": "濠江区",
  "value": "440512" },

{
  "label": "潮阳区",
  "value": "440513" },

{
  "label": "潮南区",
  "value": "440514" },

{
  "label": "澄海区",
  "value": "440515" },

{
  "label": "南澳县",
  "value": "440523" }],


[{
  "label": "禅城区",
  "value": "440604" },

{
  "label": "南海区",
  "value": "440605" },

{
  "label": "顺德区",
  "value": "440606" },

{
  "label": "三水区",
  "value": "440607" },

{
  "label": "高明区",
  "value": "440608" }],


[{
  "label": "蓬江区",
  "value": "440703" },

{
  "label": "江海区",
  "value": "440704" },

{
  "label": "新会区",
  "value": "440705" },

{
  "label": "台山市",
  "value": "440781" },

{
  "label": "开平市",
  "value": "440783" },

{
  "label": "鹤山市",
  "value": "440784" },

{
  "label": "恩平市",
  "value": "440785" }],


[{
  "label": "赤坎区",
  "value": "440802" },

{
  "label": "霞山区",
  "value": "440803" },

{
  "label": "坡头区",
  "value": "440804" },

{
  "label": "麻章区",
  "value": "440811" },

{
  "label": "遂溪县",
  "value": "440823" },

{
  "label": "徐闻县",
  "value": "440825" },

{
  "label": "廉江市",
  "value": "440881" },

{
  "label": "雷州市",
  "value": "440882" },

{
  "label": "吴川市",
  "value": "440883" }],


[{
  "label": "茂南区",
  "value": "440902" },

{
  "label": "电白区",
  "value": "440904" },

{
  "label": "高州市",
  "value": "440981" },

{
  "label": "化州市",
  "value": "440982" },

{
  "label": "信宜市",
  "value": "440983" }],


[{
  "label": "端州区",
  "value": "441202" },

{
  "label": "鼎湖区",
  "value": "441203" },

{
  "label": "高要区",
  "value": "441204" },

{
  "label": "广宁县",
  "value": "441223" },

{
  "label": "怀集县",
  "value": "441224" },

{
  "label": "封开县",
  "value": "441225" },

{
  "label": "德庆县",
  "value": "441226" },

{
  "label": "四会市",
  "value": "441284" }],


[{
  "label": "惠城区",
  "value": "441302" },

{
  "label": "惠阳区",
  "value": "441303" },

{
  "label": "博罗县",
  "value": "441322" },

{
  "label": "惠东县",
  "value": "441323" },

{
  "label": "龙门县",
  "value": "441324" }],


[{
  "label": "梅江区",
  "value": "441402" },

{
  "label": "梅县区",
  "value": "441403" },

{
  "label": "大埔县",
  "value": "441422" },

{
  "label": "丰顺县",
  "value": "441423" },

{
  "label": "五华县",
  "value": "441424" },

{
  "label": "平远县",
  "value": "441426" },

{
  "label": "蕉岭县",
  "value": "441427" },

{
  "label": "兴宁市",
  "value": "441481" }],


[{
  "label": "城区",
  "value": "441502" },

{
  "label": "海丰县",
  "value": "441521" },

{
  "label": "陆河县",
  "value": "441523" },

{
  "label": "陆丰市",
  "value": "441581" }],


[{
  "label": "源城区",
  "value": "441602" },

{
  "label": "紫金县",
  "value": "441621" },

{
  "label": "龙川县",
  "value": "441622" },

{
  "label": "连平县",
  "value": "441623" },

{
  "label": "和平县",
  "value": "441624" },

{
  "label": "东源县",
  "value": "441625" }],


[{
  "label": "江城区",
  "value": "441702" },

{
  "label": "阳东区",
  "value": "441704" },

{
  "label": "阳西县",
  "value": "441721" },

{
  "label": "阳春市",
  "value": "441781" }],


[{
  "label": "清城区",
  "value": "441802" },

{
  "label": "清新区",
  "value": "441803" },

{
  "label": "佛冈县",
  "value": "441821" },

{
  "label": "阳山县",
  "value": "441823" },

{
  "label": "连山壮族瑶族自治县",
  "value": "441825" },

{
  "label": "连南瑶族自治县",
  "value": "441826" },

{
  "label": "英德市",
  "value": "441881" },

{
  "label": "连州市",
  "value": "441882" }],


[{
  "label": "东莞市",
  "value": "441900" }],

[{
  "label": "中山市",
  "value": "442000" }],

[{
  "label": "湘桥区",
  "value": "445102" },

{
  "label": "潮安区",
  "value": "445103" },

{
  "label": "饶平县",
  "value": "445122" }],


[{
  "label": "榕城区",
  "value": "445202" },

{
  "label": "揭东区",
  "value": "445203" },

{
  "label": "揭西县",
  "value": "445222" },

{
  "label": "惠来县",
  "value": "445224" },

{
  "label": "普宁市",
  "value": "445281" }],


[{
  "label": "云城区",
  "value": "445302" },

{
  "label": "云安区",
  "value": "445303" },

{
  "label": "新兴县",
  "value": "445321" },

{
  "label": "郁南县",
  "value": "445322" },

{
  "label": "罗定市",
  "value": "445381" }]],



[
[{
  "label": "兴宁区",
  "value": "450102" },

{
  "label": "青秀区",
  "value": "450103" },

{
  "label": "江南区",
  "value": "450105" },

{
  "label": "西乡塘区",
  "value": "450107" },

{
  "label": "良庆区",
  "value": "450108" },

{
  "label": "邕宁区",
  "value": "450109" },

{
  "label": "武鸣区",
  "value": "450110" },

{
  "label": "隆安县",
  "value": "450123" },

{
  "label": "马山县",
  "value": "450124" },

{
  "label": "上林县",
  "value": "450125" },

{
  "label": "宾阳县",
  "value": "450126" },

{
  "label": "横县",
  "value": "450127" }],


[{
  "label": "城中区",
  "value": "450202" },

{
  "label": "鱼峰区",
  "value": "450203" },

{
  "label": "柳南区",
  "value": "450204" },

{
  "label": "柳北区",
  "value": "450205" },

{
  "label": "柳江区",
  "value": "450206" },

{
  "label": "柳城县",
  "value": "450222" },

{
  "label": "鹿寨县",
  "value": "450223" },

{
  "label": "融安县",
  "value": "450224" },

{
  "label": "融水苗族自治县",
  "value": "450225" },

{
  "label": "三江侗族自治县",
  "value": "450226" }],


[{
  "label": "秀峰区",
  "value": "450302" },

{
  "label": "叠彩区",
  "value": "450303" },

{
  "label": "象山区",
  "value": "450304" },

{
  "label": "七星区",
  "value": "450305" },

{
  "label": "雁山区",
  "value": "450311" },

{
  "label": "临桂区",
  "value": "450312" },

{
  "label": "阳朔县",
  "value": "450321" },

{
  "label": "灵川县",
  "value": "450323" },

{
  "label": "全州县",
  "value": "450324" },

{
  "label": "兴安县",
  "value": "450325" },

{
  "label": "永福县",
  "value": "450326" },

{
  "label": "灌阳县",
  "value": "450327" },

{
  "label": "龙胜各族自治县",
  "value": "450328" },

{
  "label": "资源县",
  "value": "450329" },

{
  "label": "平乐县",
  "value": "450330" },

{
  "label": "荔浦县",
  "value": "450331" },

{
  "label": "恭城瑶族自治县",
  "value": "450332" }],


[{
  "label": "万秀区",
  "value": "450403" },

{
  "label": "长洲区",
  "value": "450405" },

{
  "label": "龙圩区",
  "value": "450406" },

{
  "label": "苍梧县",
  "value": "450421" },

{
  "label": "藤县",
  "value": "450422" },

{
  "label": "蒙山县",
  "value": "450423" },

{
  "label": "岑溪市",
  "value": "450481" }],


[{
  "label": "海城区",
  "value": "450502" },

{
  "label": "银海区",
  "value": "450503" },

{
  "label": "铁山港区",
  "value": "450512" },

{
  "label": "合浦县",
  "value": "450521" }],


[{
  "label": "港口区",
  "value": "450602" },

{
  "label": "防城区",
  "value": "450603" },

{
  "label": "上思县",
  "value": "450621" },

{
  "label": "东兴市",
  "value": "450681" }],


[{
  "label": "钦南区",
  "value": "450702" },

{
  "label": "钦北区",
  "value": "450703" },

{
  "label": "灵山县",
  "value": "450721" },

{
  "label": "浦北县",
  "value": "450722" }],


[{
  "label": "港北区",
  "value": "450802" },

{
  "label": "港南区",
  "value": "450803" },

{
  "label": "覃塘区",
  "value": "450804" },

{
  "label": "平南县",
  "value": "450821" },

{
  "label": "桂平市",
  "value": "450881" }],


[{
  "label": "玉州区",
  "value": "450902" },

{
  "label": "福绵区",
  "value": "450903" },

{
  "label": "容县",
  "value": "450921" },

{
  "label": "陆川县",
  "value": "450922" },

{
  "label": "博白县",
  "value": "450923" },

{
  "label": "兴业县",
  "value": "450924" },

{
  "label": "北流市",
  "value": "450981" }],


[{
  "label": "右江区",
  "value": "451002" },

{
  "label": "田阳县",
  "value": "451021" },

{
  "label": "田东县",
  "value": "451022" },

{
  "label": "平果县",
  "value": "451023" },

{
  "label": "德保县",
  "value": "451024" },

{
  "label": "那坡县",
  "value": "451026" },

{
  "label": "凌云县",
  "value": "451027" },

{
  "label": "乐业县",
  "value": "451028" },

{
  "label": "田林县",
  "value": "451029" },

{
  "label": "西林县",
  "value": "451030" },

{
  "label": "隆林各族自治县",
  "value": "451031" },

{
  "label": "靖西市",
  "value": "451081" }],


[{
  "label": "八步区",
  "value": "451102" },

{
  "label": "平桂区",
  "value": "451103" },

{
  "label": "昭平县",
  "value": "451121" },

{
  "label": "钟山县",
  "value": "451122" },

{
  "label": "富川瑶族自治县",
  "value": "451123" }],


[{
  "label": "金城江区",
  "value": "451202" },

{
  "label": "宜州区",
  "value": "451203" },

{
  "label": "南丹县",
  "value": "451221" },

{
  "label": "天峨县",
  "value": "451222" },

{
  "label": "凤山县",
  "value": "451223" },

{
  "label": "东兰县",
  "value": "451224" },

{
  "label": "罗城仫佬族自治县",
  "value": "451225" },

{
  "label": "环江毛南族自治县",
  "value": "451226" },

{
  "label": "巴马瑶族自治县",
  "value": "451227" },

{
  "label": "都安瑶族自治县",
  "value": "451228" },

{
  "label": "大化瑶族自治县",
  "value": "451229" }],


[{
  "label": "兴宾区",
  "value": "451302" },

{
  "label": "忻城县",
  "value": "451321" },

{
  "label": "象州县",
  "value": "451322" },

{
  "label": "武宣县",
  "value": "451323" },

{
  "label": "金秀瑶族自治县",
  "value": "451324" },

{
  "label": "合山市",
  "value": "451381" }],


[{
  "label": "江州区",
  "value": "451402" },

{
  "label": "扶绥县",
  "value": "451421" },

{
  "label": "宁明县",
  "value": "451422" },

{
  "label": "龙州县",
  "value": "451423" },

{
  "label": "大新县",
  "value": "451424" },

{
  "label": "天等县",
  "value": "451425" },

{
  "label": "凭祥市",
  "value": "451481" }]],



[
[{
  "label": "秀英区",
  "value": "460105" },

{
  "label": "龙华区",
  "value": "460106" },

{
  "label": "琼山区",
  "value": "460107" },

{
  "label": "美兰区",
  "value": "460108" }],


[{
  "label": "海棠区",
  "value": "460202" },

{
  "label": "吉阳区",
  "value": "460203" },

{
  "label": "天涯区",
  "value": "460204" },

{
  "label": "崖州区",
  "value": "460205" }],


[{
  "label": "西沙群岛",
  "value": "460321" },

{
  "label": "南沙群岛",
  "value": "460322" },

{
  "label": "中沙群岛的岛礁及其海域",
  "value": "460323" }],


[{
  "label": "儋州市",
  "value": "460400" }],

[{
  "label": "五指山市",
  "value": "469001" },

{
  "label": "琼海市",
  "value": "469002" },

{
  "label": "文昌市",
  "value": "469005" },

{
  "label": "万宁市",
  "value": "469006" },

{
  "label": "东方市",
  "value": "469007" },

{
  "label": "定安县",
  "value": "469021" },

{
  "label": "屯昌县",
  "value": "469022" },

{
  "label": "澄迈县",
  "value": "469023" },

{
  "label": "临高县",
  "value": "469024" },

{
  "label": "白沙黎族自治县",
  "value": "469025" },

{
  "label": "昌江黎族自治县",
  "value": "469026" },

{
  "label": "乐东黎族自治县",
  "value": "469027" },

{
  "label": "陵水黎族自治县",
  "value": "469028" },

{
  "label": "保亭黎族苗族自治县",
  "value": "469029" },

{
  "label": "琼中黎族苗族自治县",
  "value": "469030" }]],



[
[{
  "label": "万州区",
  "value": "500101" },

{
  "label": "涪陵区",
  "value": "500102" },

{
  "label": "渝中区",
  "value": "500103" },

{
  "label": "大渡口区",
  "value": "500104" },

{
  "label": "江北区",
  "value": "500105" },

{
  "label": "沙坪坝区",
  "value": "500106" },

{
  "label": "九龙坡区",
  "value": "500107" },

{
  "label": "南岸区",
  "value": "500108" },

{
  "label": "北碚区",
  "value": "500109" },

{
  "label": "綦江区",
  "value": "500110" },

{
  "label": "大足区",
  "value": "500111" },

{
  "label": "渝北区",
  "value": "500112" },

{
  "label": "巴南区",
  "value": "500113" },

{
  "label": "黔江区",
  "value": "500114" },

{
  "label": "长寿区",
  "value": "500115" },

{
  "label": "江津区",
  "value": "500116" },

{
  "label": "合川区",
  "value": "500117" },

{
  "label": "永川区",
  "value": "500118" },

{
  "label": "南川区",
  "value": "500119" },

{
  "label": "璧山区",
  "value": "500120" },

{
  "label": "铜梁区",
  "value": "500151" },

{
  "label": "潼南区",
  "value": "500152" },

{
  "label": "荣昌区",
  "value": "500153" },

{
  "label": "开州区",
  "value": "500154" },

{
  "label": "梁平区",
  "value": "500155" },

{
  "label": "武隆区",
  "value": "500156" }],


[{
  "label": "梁平县",
  "value": "500228" },
{
  "label": "城口县",
  "value": "500229" },

{
  "label": "丰都县",
  "value": "500230" },

{
  "label": "垫江县",
  "value": "500231" },

{
  "label": "忠县",
  "value": "500233" },

{
  "label": "云阳县",
  "value": "500235" },

{
  "label": "奉节县",
  "value": "500236" },

{
  "label": "巫山县",
  "value": "500237" },

{
  "label": "巫溪县",
  "value": "500238" },

{
  "label": "石柱土家族自治县",
  "value": "500240" },

{
  "label": "秀山土家族苗族自治县",
  "value": "500241" },

{
  "label": "酉阳土家族苗族自治县",
  "value": "500242" },

{
  "label": "彭水苗族土家族自治县",
  "value": "500243" }]],



[
[{
  "label": "锦江区",
  "value": "510104" },

{
  "label": "青羊区",
  "value": "510105" },

{
  "label": "金牛区",
  "value": "510106" },

{
  "label": "武侯区",
  "value": "510107" },

{
  "label": "成华区",
  "value": "510108" },

{
  "label": "龙泉驿区",
  "value": "510112" },

{
  "label": "青白江区",
  "value": "510113" },

{
  "label": "新都区",
  "value": "510114" },

{
  "label": "温江区",
  "value": "510115" },

{
  "label": "双流区",
  "value": "510116" },

{
  "label": "郫都区",
  "value": "510117" },

{
  "label": "金堂县",
  "value": "510121" },

{
  "label": "大邑县",
  "value": "510129" },

{
  "label": "蒲江县",
  "value": "510131" },

{
  "label": "新津县",
  "value": "510132" },

{
  "label": "都江堰市",
  "value": "510181" },

{
  "label": "彭州市",
  "value": "510182" },

{
  "label": "邛崃市",
  "value": "510183" },

{
  "label": "崇州市",
  "value": "510184" },

{
  "label": "简阳市",
  "value": "510185" }],


[{
  "label": "自流井区",
  "value": "510302" },

{
  "label": "贡井区",
  "value": "510303" },

{
  "label": "大安区",
  "value": "510304" },

{
  "label": "沿滩区",
  "value": "510311" },

{
  "label": "荣县",
  "value": "510321" },

{
  "label": "富顺县",
  "value": "510322" }],


[{
  "label": "东区",
  "value": "510402" },

{
  "label": "西区",
  "value": "510403" },

{
  "label": "仁和区",
  "value": "510411" },

{
  "label": "米易县",
  "value": "510421" },

{
  "label": "盐边县",
  "value": "510422" }],


[{
  "label": "江阳区",
  "value": "510502" },

{
  "label": "纳溪区",
  "value": "510503" },

{
  "label": "龙马潭区",
  "value": "510504" },

{
  "label": "泸县",
  "value": "510521" },

{
  "label": "合江县",
  "value": "510522" },

{
  "label": "叙永县",
  "value": "510524" },

{
  "label": "古蔺县",
  "value": "510525" }],


[{
  "label": "旌阳区",
  "value": "510603" },

{
  "label": "罗江区",
  "value": "510604" },

{
  "label": "中江县",
  "value": "510623" },

{
  "label": "广汉市",
  "value": "510681" },

{
  "label": "什邡市",
  "value": "510682" },

{
  "label": "绵竹市",
  "value": "510683" }],


[{
  "label": "涪城区",
  "value": "510703" },

{
  "label": "游仙区",
  "value": "510704" },

{
  "label": "安州区",
  "value": "510705" },

{
  "label": "三台县",
  "value": "510722" },

{
  "label": "盐亭县",
  "value": "510723" },

{
  "label": "梓潼县",
  "value": "510725" },

{
  "label": "北川羌族自治县",
  "value": "510726" },

{
  "label": "平武县",
  "value": "510727" },

{
  "label": "江油市",
  "value": "510781" }],


[{
  "label": "利州区",
  "value": "510802" },

{
  "label": "昭化区",
  "value": "510811" },

{
  "label": "朝天区",
  "value": "510812" },

{
  "label": "旺苍县",
  "value": "510821" },

{
  "label": "青川县",
  "value": "510822" },

{
  "label": "剑阁县",
  "value": "510823" },

{
  "label": "苍溪县",
  "value": "510824" }],


[{
  "label": "船山区",
  "value": "510903" },

{
  "label": "安居区",
  "value": "510904" },

{
  "label": "蓬溪县",
  "value": "510921" },

{
  "label": "射洪县",
  "value": "510922" },

{
  "label": "大英县",
  "value": "510923" }],


[{
  "label": "市中区",
  "value": "511002" },

{
  "label": "东兴区",
  "value": "511011" },

{
  "label": "威远县",
  "value": "511024" },

{
  "label": "资中县",
  "value": "511025" },

{
  "label": "内江经济开发区",
  "value": "511071" },

{
  "label": "隆昌市",
  "value": "511083" }],


[{
  "label": "市中区",
  "value": "511102" },

{
  "label": "沙湾区",
  "value": "511111" },

{
  "label": "五通桥区",
  "value": "511112" },

{
  "label": "金口河区",
  "value": "511113" },

{
  "label": "犍为县",
  "value": "511123" },

{
  "label": "井研县",
  "value": "511124" },

{
  "label": "夹江县",
  "value": "511126" },

{
  "label": "沐川县",
  "value": "511129" },

{
  "label": "峨边彝族自治县",
  "value": "511132" },

{
  "label": "马边彝族自治县",
  "value": "511133" },

{
  "label": "峨眉山市",
  "value": "511181" }],


[{
  "label": "顺庆区",
  "value": "511302" },

{
  "label": "高坪区",
  "value": "511303" },

{
  "label": "嘉陵区",
  "value": "511304" },

{
  "label": "南部县",
  "value": "511321" },

{
  "label": "营山县",
  "value": "511322" },

{
  "label": "蓬安县",
  "value": "511323" },

{
  "label": "仪陇县",
  "value": "511324" },

{
  "label": "西充县",
  "value": "511325" },

{
  "label": "阆中市",
  "value": "511381" }],


[{
  "label": "东坡区",
  "value": "511402" },

{
  "label": "彭山区",
  "value": "511403" },

{
  "label": "仁寿县",
  "value": "511421" },

{
  "label": "洪雅县",
  "value": "511423" },

{
  "label": "丹棱县",
  "value": "511424" },

{
  "label": "青神县",
  "value": "511425" }],


[{
  "label": "翠屏区",
  "value": "511502" },

{
  "label": "南溪区",
  "value": "511503" },

{
  "label": "宜宾县",
  "value": "511521" },

{
  "label": "江安县",
  "value": "511523" },

{
  "label": "长宁县",
  "value": "511524" },

{
  "label": "高县",
  "value": "511525" },

{
  "label": "珙县",
  "value": "511526" },

{
  "label": "筠连县",
  "value": "511527" },

{
  "label": "兴文县",
  "value": "511528" },

{
  "label": "屏山县",
  "value": "511529" }],


[{
  "label": "广安区",
  "value": "511602" },

{
  "label": "前锋区",
  "value": "511603" },

{
  "label": "岳池县",
  "value": "511621" },

{
  "label": "武胜县",
  "value": "511622" },

{
  "label": "邻水县",
  "value": "511623" },

{
  "label": "华蓥市",
  "value": "511681" }],


[{
  "label": "通川区",
  "value": "511702" },

{
  "label": "达川区",
  "value": "511703" },

{
  "label": "宣汉县",
  "value": "511722" },

{
  "label": "开江县",
  "value": "511723" },

{
  "label": "大竹县",
  "value": "511724" },

{
  "label": "渠县",
  "value": "511725" },

{
  "label": "达州经济开发区",
  "value": "511771" },

{
  "label": "万源市",
  "value": "511781" }],


[{
  "label": "雨城区",
  "value": "511802" },

{
  "label": "名山区",
  "value": "511803" },

{
  "label": "荥经县",
  "value": "511822" },

{
  "label": "汉源县",
  "value": "511823" },

{
  "label": "石棉县",
  "value": "511824" },

{
  "label": "天全县",
  "value": "511825" },

{
  "label": "芦山县",
  "value": "511826" },

{
  "label": "宝兴县",
  "value": "511827" }],


[{
  "label": "巴州区",
  "value": "511902" },

{
  "label": "恩阳区",
  "value": "511903" },

{
  "label": "通江县",
  "value": "511921" },

{
  "label": "南江县",
  "value": "511922" },

{
  "label": "平昌县",
  "value": "511923" },

{
  "label": "巴中经济开发区",
  "value": "511971" }],


[{
  "label": "雁江区",
  "value": "512002" },

{
  "label": "安岳县",
  "value": "512021" },

{
  "label": "乐至县",
  "value": "512022" }],


[{
  "label": "马尔康市",
  "value": "513201" },

{
  "label": "汶川县",
  "value": "513221" },

{
  "label": "理县",
  "value": "513222" },

{
  "label": "茂县",
  "value": "513223" },

{
  "label": "松潘县",
  "value": "513224" },

{
  "label": "九寨沟县",
  "value": "513225" },

{
  "label": "金川县",
  "value": "513226" },

{
  "label": "小金县",
  "value": "513227" },

{
  "label": "黑水县",
  "value": "513228" },

{
  "label": "壤塘县",
  "value": "513230" },

{
  "label": "阿坝县",
  "value": "513231" },

{
  "label": "若尔盖县",
  "value": "513232" },

{
  "label": "红原县",
  "value": "513233" }],


[{
  "label": "康定市",
  "value": "513301" },

{
  "label": "泸定县",
  "value": "513322" },

{
  "label": "丹巴县",
  "value": "513323" },

{
  "label": "九龙县",
  "value": "513324" },

{
  "label": "雅江县",
  "value": "513325" },

{
  "label": "道孚县",
  "value": "513326" },

{
  "label": "炉霍县",
  "value": "513327" },

{
  "label": "甘孜县",
  "value": "513328" },

{
  "label": "新龙县",
  "value": "513329" },

{
  "label": "德格县",
  "value": "513330" },

{
  "label": "白玉县",
  "value": "513331" },

{
  "label": "石渠县",
  "value": "513332" },

{
  "label": "色达县",
  "value": "513333" },

{
  "label": "理塘县",
  "value": "513334" },

{
  "label": "巴塘县",
  "value": "513335" },

{
  "label": "乡城县",
  "value": "513336" },

{
  "label": "稻城县",
  "value": "513337" },

{
  "label": "得荣县",
  "value": "513338" }],


[{
  "label": "西昌市",
  "value": "513401" },

{
  "label": "木里藏族自治县",
  "value": "513422" },

{
  "label": "盐源县",
  "value": "513423" },

{
  "label": "德昌县",
  "value": "513424" },

{
  "label": "会理县",
  "value": "513425" },

{
  "label": "会东县",
  "value": "513426" },

{
  "label": "宁南县",
  "value": "513427" },

{
  "label": "普格县",
  "value": "513428" },

{
  "label": "布拖县",
  "value": "513429" },

{
  "label": "金阳县",
  "value": "513430" },

{
  "label": "昭觉县",
  "value": "513431" },

{
  "label": "喜德县",
  "value": "513432" },

{
  "label": "冕宁县",
  "value": "513433" },

{
  "label": "越西县",
  "value": "513434" },

{
  "label": "甘洛县",
  "value": "513435" },

{
  "label": "美姑县",
  "value": "513436" },

{
  "label": "雷波县",
  "value": "513437" }]],



[
[{
  "label": "南明区",
  "value": "520102" },

{
  "label": "云岩区",
  "value": "520103" },

{
  "label": "花溪区",
  "value": "520111" },

{
  "label": "乌当区",
  "value": "520112" },

{
  "label": "白云区",
  "value": "520113" },

{
  "label": "观山湖区",
  "value": "520115" },

{
  "label": "开阳县",
  "value": "520121" },

{
  "label": "息烽县",
  "value": "520122" },

{
  "label": "修文县",
  "value": "520123" },

{
  "label": "清镇市",
  "value": "520181" }],


[{
  "label": "钟山区",
  "value": "520201" },

{
  "label": "六枝特区",
  "value": "520203" },

{
  "label": "水城县",
  "value": "520221" },

{
  "label": "盘州市",
  "value": "520281" }],


[{
  "label": "红花岗区",
  "value": "520302" },

{
  "label": "汇川区",
  "value": "520303" },

{
  "label": "播州区",
  "value": "520304" },

{
  "label": "桐梓县",
  "value": "520322" },

{
  "label": "绥阳县",
  "value": "520323" },

{
  "label": "正安县",
  "value": "520324" },

{
  "label": "道真仡佬族苗族自治县",
  "value": "520325" },

{
  "label": "务川仡佬族苗族自治县",
  "value": "520326" },

{
  "label": "凤冈县",
  "value": "520327" },

{
  "label": "湄潭县",
  "value": "520328" },

{
  "label": "余庆县",
  "value": "520329" },

{
  "label": "习水县",
  "value": "520330" },

{
  "label": "赤水市",
  "value": "520381" },

{
  "label": "仁怀市",
  "value": "520382" }],


[{
  "label": "西秀区",
  "value": "520402" },

{
  "label": "平坝区",
  "value": "520403" },

{
  "label": "普定县",
  "value": "520422" },

{
  "label": "镇宁布依族苗族自治县",
  "value": "520423" },

{
  "label": "关岭布依族苗族自治县",
  "value": "520424" },

{
  "label": "紫云苗族布依族自治县",
  "value": "520425" }],


[{
  "label": "七星关区",
  "value": "520502" },

{
  "label": "大方县",
  "value": "520521" },

{
  "label": "黔西县",
  "value": "520522" },

{
  "label": "金沙县",
  "value": "520523" },

{
  "label": "织金县",
  "value": "520524" },

{
  "label": "纳雍县",
  "value": "520525" },

{
  "label": "威宁彝族回族苗族自治县",
  "value": "520526" },

{
  "label": "赫章县",
  "value": "520527" }],


[{
  "label": "碧江区",
  "value": "520602" },

{
  "label": "万山区",
  "value": "520603" },

{
  "label": "江口县",
  "value": "520621" },

{
  "label": "玉屏侗族自治县",
  "value": "520622" },

{
  "label": "石阡县",
  "value": "520623" },

{
  "label": "思南县",
  "value": "520624" },

{
  "label": "印江土家族苗族自治县",
  "value": "520625" },

{
  "label": "德江县",
  "value": "520626" },

{
  "label": "沿河土家族自治县",
  "value": "520627" },

{
  "label": "松桃苗族自治县",
  "value": "520628" }],


[{
  "label": "兴义市",
  "value": "522301" },

{
  "label": "兴仁县",
  "value": "522322" },

{
  "label": "普安县",
  "value": "522323" },

{
  "label": "晴隆县",
  "value": "522324" },

{
  "label": "贞丰县",
  "value": "522325" },

{
  "label": "望谟县",
  "value": "522326" },

{
  "label": "册亨县",
  "value": "522327" },

{
  "label": "安龙县",
  "value": "522328" }],


[{
  "label": "凯里市",
  "value": "522601" },

{
  "label": "黄平县",
  "value": "522622" },

{
  "label": "施秉县",
  "value": "522623" },

{
  "label": "三穗县",
  "value": "522624" },

{
  "label": "镇远县",
  "value": "522625" },

{
  "label": "岑巩县",
  "value": "522626" },

{
  "label": "天柱县",
  "value": "522627" },

{
  "label": "锦屏县",
  "value": "522628" },

{
  "label": "剑河县",
  "value": "522629" },

{
  "label": "台江县",
  "value": "522630" },

{
  "label": "黎平县",
  "value": "522631" },

{
  "label": "榕江县",
  "value": "522632" },

{
  "label": "从江县",
  "value": "522633" },

{
  "label": "雷山县",
  "value": "522634" },

{
  "label": "麻江县",
  "value": "522635" },

{
  "label": "丹寨县",
  "value": "522636" }],


[{
  "label": "都匀市",
  "value": "522701" },

{
  "label": "福泉市",
  "value": "522702" },

{
  "label": "荔波县",
  "value": "522722" },

{
  "label": "贵定县",
  "value": "522723" },

{
  "label": "瓮安县",
  "value": "522725" },

{
  "label": "独山县",
  "value": "522726" },

{
  "label": "平塘县",
  "value": "522727" },

{
  "label": "罗甸县",
  "value": "522728" },

{
  "label": "长顺县",
  "value": "522729" },

{
  "label": "龙里县",
  "value": "522730" },

{
  "label": "惠水县",
  "value": "522731" },

{
  "label": "三都水族自治县",
  "value": "522732" }]],



[
[{
  "label": "五华区",
  "value": "530102" },

{
  "label": "盘龙区",
  "value": "530103" },

{
  "label": "官渡区",
  "value": "530111" },

{
  "label": "西山区",
  "value": "530112" },

{
  "label": "东川区",
  "value": "530113" },

{
  "label": "呈贡区",
  "value": "530114" },

{
  "label": "晋宁区",
  "value": "530115" },

{
  "label": "富民县",
  "value": "530124" },

{
  "label": "宜良县",
  "value": "530125" },

{
  "label": "石林彝族自治县",
  "value": "530126" },

{
  "label": "嵩明县",
  "value": "530127" },

{
  "label": "禄劝彝族苗族自治县",
  "value": "530128" },

{
  "label": "寻甸回族彝族自治县",
  "value": "530129" },

{
  "label": "安宁市",
  "value": "530181" }],


[{
  "label": "麒麟区",
  "value": "530302" },

{
  "label": "沾益区",
  "value": "530303" },

{
  "label": "马龙县",
  "value": "530321" },

{
  "label": "陆良县",
  "value": "530322" },

{
  "label": "师宗县",
  "value": "530323" },

{
  "label": "罗平县",
  "value": "530324" },

{
  "label": "富源县",
  "value": "530325" },

{
  "label": "会泽县",
  "value": "530326" },

{
  "label": "宣威市",
  "value": "530381" }],


[{
  "label": "红塔区",
  "value": "530402" },

{
  "label": "江川区",
  "value": "530403" },

{
  "label": "澄江县",
  "value": "530422" },

{
  "label": "通海县",
  "value": "530423" },

{
  "label": "华宁县",
  "value": "530424" },

{
  "label": "易门县",
  "value": "530425" },

{
  "label": "峨山彝族自治县",
  "value": "530426" },

{
  "label": "新平彝族傣族自治县",
  "value": "530427" },

{
  "label": "元江哈尼族彝族傣族自治县",
  "value": "530428" }],


[{
  "label": "隆阳区",
  "value": "530502" },

{
  "label": "施甸县",
  "value": "530521" },

{
  "label": "龙陵县",
  "value": "530523" },

{
  "label": "昌宁县",
  "value": "530524" },

{
  "label": "腾冲市",
  "value": "530581" }],


[{
  "label": "昭阳区",
  "value": "530602" },

{
  "label": "鲁甸县",
  "value": "530621" },

{
  "label": "巧家县",
  "value": "530622" },

{
  "label": "盐津县",
  "value": "530623" },

{
  "label": "大关县",
  "value": "530624" },

{
  "label": "永善县",
  "value": "530625" },

{
  "label": "绥江县",
  "value": "530626" },

{
  "label": "镇雄县",
  "value": "530627" },

{
  "label": "彝良县",
  "value": "530628" },

{
  "label": "威信县",
  "value": "530629" },

{
  "label": "水富县",
  "value": "530630" }],


[{
  "label": "古城区",
  "value": "530702" },

{
  "label": "玉龙纳西族自治县",
  "value": "530721" },

{
  "label": "永胜县",
  "value": "530722" },

{
  "label": "华坪县",
  "value": "530723" },

{
  "label": "宁蒗彝族自治县",
  "value": "530724" }],


[{
  "label": "思茅区",
  "value": "530802" },

{
  "label": "宁洱哈尼族彝族自治县",
  "value": "530821" },

{
  "label": "墨江哈尼族自治县",
  "value": "530822" },

{
  "label": "景东彝族自治县",
  "value": "530823" },

{
  "label": "景谷傣族彝族自治县",
  "value": "530824" },

{
  "label": "镇沅彝族哈尼族拉祜族自治县",
  "value": "530825" },

{
  "label": "江城哈尼族彝族自治县",
  "value": "530826" },

{
  "label": "孟连傣族拉祜族佤族自治县",
  "value": "530827" },

{
  "label": "澜沧拉祜族自治县",
  "value": "530828" },

{
  "label": "西盟佤族自治县",
  "value": "530829" }],


[{
  "label": "临翔区",
  "value": "530902" },

{
  "label": "凤庆县",
  "value": "530921" },

{
  "label": "云县",
  "value": "530922" },

{
  "label": "永德县",
  "value": "530923" },

{
  "label": "镇康县",
  "value": "530924" },

{
  "label": "双江拉祜族佤族布朗族傣族自治县",
  "value": "530925" },

{
  "label": "耿马傣族佤族自治县",
  "value": "530926" },

{
  "label": "沧源佤族自治县",
  "value": "530927" }],


[{
  "label": "楚雄市",
  "value": "532301" },

{
  "label": "双柏县",
  "value": "532322" },

{
  "label": "牟定县",
  "value": "532323" },

{
  "label": "南华县",
  "value": "532324" },

{
  "label": "姚安县",
  "value": "532325" },

{
  "label": "大姚县",
  "value": "532326" },

{
  "label": "永仁县",
  "value": "532327" },

{
  "label": "元谋县",
  "value": "532328" },

{
  "label": "武定县",
  "value": "532329" },

{
  "label": "禄丰县",
  "value": "532331" }],


[{
  "label": "个旧市",
  "value": "532501" },

{
  "label": "开远市",
  "value": "532502" },

{
  "label": "蒙自市",
  "value": "532503" },

{
  "label": "弥勒市",
  "value": "532504" },

{
  "label": "屏边苗族自治县",
  "value": "532523" },

{
  "label": "建水县",
  "value": "532524" },

{
  "label": "石屏县",
  "value": "532525" },

{
  "label": "泸西县",
  "value": "532527" },

{
  "label": "元阳县",
  "value": "532528" },

{
  "label": "红河县",
  "value": "532529" },

{
  "label": "金平苗族瑶族傣族自治县",
  "value": "532530" },

{
  "label": "绿春县",
  "value": "532531" },

{
  "label": "河口瑶族自治县",
  "value": "532532" }],


[{
  "label": "文山市",
  "value": "532601" },

{
  "label": "砚山县",
  "value": "532622" },

{
  "label": "西畴县",
  "value": "532623" },

{
  "label": "麻栗坡县",
  "value": "532624" },

{
  "label": "马关县",
  "value": "532625" },

{
  "label": "丘北县",
  "value": "532626" },

{
  "label": "广南县",
  "value": "532627" },

{
  "label": "富宁县",
  "value": "532628" }],


[{
  "label": "景洪市",
  "value": "532801" },

{
  "label": "勐海县",
  "value": "532822" },

{
  "label": "勐腊县",
  "value": "532823" }],


[{
  "label": "大理市",
  "value": "532901" },

{
  "label": "漾濞彝族自治县",
  "value": "532922" },

{
  "label": "祥云县",
  "value": "532923" },

{
  "label": "宾川县",
  "value": "532924" },

{
  "label": "弥渡县",
  "value": "532925" },

{
  "label": "南涧彝族自治县",
  "value": "532926" },

{
  "label": "巍山彝族回族自治县",
  "value": "532927" },

{
  "label": "永平县",
  "value": "532928" },

{
  "label": "云龙县",
  "value": "532929" },

{
  "label": "洱源县",
  "value": "532930" },

{
  "label": "剑川县",
  "value": "532931" },

{
  "label": "鹤庆县",
  "value": "532932" }],


[{
  "label": "瑞丽市",
  "value": "533102" },

{
  "label": "芒市",
  "value": "533103" },

{
  "label": "梁河县",
  "value": "533122" },

{
  "label": "盈江县",
  "value": "533123" },

{
  "label": "陇川县",
  "value": "533124" }],


[{
  "label": "泸水市",
  "value": "533301" },

{
  "label": "福贡县",
  "value": "533323" },

{
  "label": "贡山独龙族怒族自治县",
  "value": "533324" },

{
  "label": "兰坪白族普米族自治县",
  "value": "533325" }],


[{
  "label": "香格里拉市",
  "value": "533401" },

{
  "label": "德钦县",
  "value": "533422" },

{
  "label": "维西傈僳族自治县",
  "value": "533423" }]],



[
[{
  "label": "城关区",
  "value": "540102" },

{
  "label": "堆龙德庆区",
  "value": "540103" },

{
  "label": "林周县",
  "value": "540121" },

{
  "label": "当雄县",
  "value": "540122" },

{
  "label": "尼木县",
  "value": "540123" },

{
  "label": "曲水县",
  "value": "540124" },

{
  "label": "达孜县",
  "value": "540126" },

{
  "label": "墨竹工卡县",
  "value": "540127" },

{
  "label": "格尔木藏青工业园区",
  "value": "540171" },

{
  "label": "拉萨经济技术开发区",
  "value": "540172" },

{
  "label": "西藏文化旅游创意园区",
  "value": "540173" },

{
  "label": "达孜工业园区",
  "value": "540174" }],


[{
  "label": "桑珠孜区",
  "value": "540202" },

{
  "label": "南木林县",
  "value": "540221" },

{
  "label": "江孜县",
  "value": "540222" },

{
  "label": "定日县",
  "value": "540223" },

{
  "label": "萨迦县",
  "value": "540224" },

{
  "label": "拉孜县",
  "value": "540225" },

{
  "label": "昂仁县",
  "value": "540226" },

{
  "label": "谢通门县",
  "value": "540227" },

{
  "label": "白朗县",
  "value": "540228" },

{
  "label": "仁布县",
  "value": "540229" },

{
  "label": "康马县",
  "value": "540230" },

{
  "label": "定结县",
  "value": "540231" },

{
  "label": "仲巴县",
  "value": "540232" },

{
  "label": "亚东县",
  "value": "540233" },

{
  "label": "吉隆县",
  "value": "540234" },

{
  "label": "聂拉木县",
  "value": "540235" },

{
  "label": "萨嘎县",
  "value": "540236" },

{
  "label": "岗巴县",
  "value": "540237" }],


[{
  "label": "卡若区",
  "value": "540302" },

{
  "label": "江达县",
  "value": "540321" },

{
  "label": "贡觉县",
  "value": "540322" },

{
  "label": "类乌齐县",
  "value": "540323" },

{
  "label": "丁青县",
  "value": "540324" },

{
  "label": "察雅县",
  "value": "540325" },

{
  "label": "八宿县",
  "value": "540326" },

{
  "label": "左贡县",
  "value": "540327" },

{
  "label": "芒康县",
  "value": "540328" },

{
  "label": "洛隆县",
  "value": "540329" },

{
  "label": "边坝县",
  "value": "540330" }],


[{
  "label": "巴宜区",
  "value": "540402" },

{
  "label": "工布江达县",
  "value": "540421" },

{
  "label": "米林县",
  "value": "540422" },

{
  "label": "墨脱县",
  "value": "540423" },

{
  "label": "波密县",
  "value": "540424" },

{
  "label": "察隅县",
  "value": "540425" },

{
  "label": "朗县",
  "value": "540426" }],


[{
  "label": "乃东区",
  "value": "540502" },

{
  "label": "扎囊县",
  "value": "540521" },

{
  "label": "贡嘎县",
  "value": "540522" },

{
  "label": "桑日县",
  "value": "540523" },

{
  "label": "琼结县",
  "value": "540524" },

{
  "label": "曲松县",
  "value": "540525" },

{
  "label": "措美县",
  "value": "540526" },

{
  "label": "洛扎县",
  "value": "540527" },

{
  "label": "加查县",
  "value": "540528" },

{
  "label": "隆子县",
  "value": "540529" },

{
  "label": "错那县",
  "value": "540530" },

{
  "label": "浪卡子县",
  "value": "540531" }],


[{
  "label": "那曲县",
  "value": "542421" },

{
  "label": "嘉黎县",
  "value": "542422" },

{
  "label": "比如县",
  "value": "542423" },

{
  "label": "聂荣县",
  "value": "542424" },

{
  "label": "安多县",
  "value": "542425" },

{
  "label": "申扎县",
  "value": "542426" },

{
  "label": "索县",
  "value": "542427" },

{
  "label": "班戈县",
  "value": "542428" },

{
  "label": "巴青县",
  "value": "542429" },

{
  "label": "尼玛县",
  "value": "542430" },

{
  "label": "双湖县",
  "value": "542431" }],


[{
  "label": "普兰县",
  "value": "542521" },

{
  "label": "札达县",
  "value": "542522" },

{
  "label": "噶尔县",
  "value": "542523" },

{
  "label": "日土县",
  "value": "542524" },

{
  "label": "革吉县",
  "value": "542525" },

{
  "label": "改则县",
  "value": "542526" },

{
  "label": "措勤县",
  "value": "542527" }]],



[
[{
  "label": "新城区",
  "value": "610102" },

{
  "label": "碑林区",
  "value": "610103" },

{
  "label": "莲湖区",
  "value": "610104" },

{
  "label": "灞桥区",
  "value": "610111" },

{
  "label": "未央区",
  "value": "610112" },

{
  "label": "雁塔区",
  "value": "610113" },

{
  "label": "阎良区",
  "value": "610114" },

{
  "label": "临潼区",
  "value": "610115" },

{
  "label": "长安区",
  "value": "610116" },

{
  "label": "高陵区",
  "value": "610117" },

{
  "label": "鄠邑区",
  "value": "610118" },

{
  "label": "蓝田县",
  "value": "610122" },

{
  "label": "周至县",
  "value": "610124" }],


[{
  "label": "王益区",
  "value": "610202" },

{
  "label": "印台区",
  "value": "610203" },

{
  "label": "耀州区",
  "value": "610204" },

{
  "label": "宜君县",
  "value": "610222" }],


[{
  "label": "渭滨区",
  "value": "610302" },

{
  "label": "金台区",
  "value": "610303" },

{
  "label": "陈仓区",
  "value": "610304" },

{
  "label": "凤翔县",
  "value": "610322" },

{
  "label": "岐山县",
  "value": "610323" },

{
  "label": "扶风县",
  "value": "610324" },

{
  "label": "眉县",
  "value": "610326" },

{
  "label": "陇县",
  "value": "610327" },

{
  "label": "千阳县",
  "value": "610328" },

{
  "label": "麟游县",
  "value": "610329" },

{
  "label": "凤县",
  "value": "610330" },

{
  "label": "太白县",
  "value": "610331" }],


[{
  "label": "秦都区",
  "value": "610402" },

{
  "label": "杨陵区",
  "value": "610403" },

{
  "label": "渭城区",
  "value": "610404" },

{
  "label": "三原县",
  "value": "610422" },

{
  "label": "泾阳县",
  "value": "610423" },

{
  "label": "乾县",
  "value": "610424" },

{
  "label": "礼泉县",
  "value": "610425" },

{
  "label": "永寿县",
  "value": "610426" },

{
  "label": "彬县",
  "value": "610427" },

{
  "label": "长武县",
  "value": "610428" },

{
  "label": "旬邑县",
  "value": "610429" },

{
  "label": "淳化县",
  "value": "610430" },

{
  "label": "武功县",
  "value": "610431" },

{
  "label": "兴平市",
  "value": "610481" }],


[{
  "label": "临渭区",
  "value": "610502" },

{
  "label": "华州区",
  "value": "610503" },

{
  "label": "潼关县",
  "value": "610522" },

{
  "label": "大荔县",
  "value": "610523" },

{
  "label": "合阳县",
  "value": "610524" },

{
  "label": "澄城县",
  "value": "610525" },

{
  "label": "蒲城县",
  "value": "610526" },

{
  "label": "白水县",
  "value": "610527" },

{
  "label": "富平县",
  "value": "610528" },

{
  "label": "韩城市",
  "value": "610581" },

{
  "label": "华阴市",
  "value": "610582" }],


[{
  "label": "宝塔区",
  "value": "610602" },

{
  "label": "安塞区",
  "value": "610603" },

{
  "label": "延长县",
  "value": "610621" },

{
  "label": "延川县",
  "value": "610622" },

{
  "label": "子长县",
  "value": "610623" },

{
  "label": "志丹县",
  "value": "610625" },

{
  "label": "吴起县",
  "value": "610626" },

{
  "label": "甘泉县",
  "value": "610627" },

{
  "label": "富县",
  "value": "610628" },

{
  "label": "洛川县",
  "value": "610629" },

{
  "label": "宜川县",
  "value": "610630" },

{
  "label": "黄龙县",
  "value": "610631" },

{
  "label": "黄陵县",
  "value": "610632" }],


[{
  "label": "汉台区",
  "value": "610702" },

{
  "label": "南郑区",
  "value": "610703" },

{
  "label": "城固县",
  "value": "610722" },

{
  "label": "洋县",
  "value": "610723" },

{
  "label": "西乡县",
  "value": "610724" },

{
  "label": "勉县",
  "value": "610725" },

{
  "label": "宁强县",
  "value": "610726" },

{
  "label": "略阳县",
  "value": "610727" },

{
  "label": "镇巴县",
  "value": "610728" },

{
  "label": "留坝县",
  "value": "610729" },

{
  "label": "佛坪县",
  "value": "610730" }],


[{
  "label": "榆阳区",
  "value": "610802" },

{
  "label": "横山区",
  "value": "610803" },

{
  "label": "府谷县",
  "value": "610822" },

{
  "label": "靖边县",
  "value": "610824" },

{
  "label": "定边县",
  "value": "610825" },

{
  "label": "绥德县",
  "value": "610826" },

{
  "label": "米脂县",
  "value": "610827" },

{
  "label": "佳县",
  "value": "610828" },

{
  "label": "吴堡县",
  "value": "610829" },

{
  "label": "清涧县",
  "value": "610830" },

{
  "label": "子洲县",
  "value": "610831" },

{
  "label": "神木市",
  "value": "610881" }],


[{
  "label": "汉滨区",
  "value": "610902" },

{
  "label": "汉阴县",
  "value": "610921" },

{
  "label": "石泉县",
  "value": "610922" },

{
  "label": "宁陕县",
  "value": "610923" },

{
  "label": "紫阳县",
  "value": "610924" },

{
  "label": "岚皋县",
  "value": "610925" },

{
  "label": "平利县",
  "value": "610926" },

{
  "label": "镇坪县",
  "value": "610927" },

{
  "label": "旬阳县",
  "value": "610928" },

{
  "label": "白河县",
  "value": "610929" }],


[{
  "label": "商州区",
  "value": "611002" },

{
  "label": "洛南县",
  "value": "611021" },

{
  "label": "丹凤县",
  "value": "611022" },

{
  "label": "商南县",
  "value": "611023" },

{
  "label": "山阳县",
  "value": "611024" },

{
  "label": "镇安县",
  "value": "611025" },

{
  "label": "柞水县",
  "value": "611026" }]],



[
[{
  "label": "城关区",
  "value": "620102" },

{
  "label": "七里河区",
  "value": "620103" },

{
  "label": "西固区",
  "value": "620104" },

{
  "label": "安宁区",
  "value": "620105" },

{
  "label": "红古区",
  "value": "620111" },

{
  "label": "永登县",
  "value": "620121" },

{
  "label": "皋兰县",
  "value": "620122" },

{
  "label": "榆中县",
  "value": "620123" },

{
  "label": "兰州新区",
  "value": "620171" }],


[{
  "label": "嘉峪关市",
  "value": "620201" }],

[{
  "label": "金川区",
  "value": "620302" },

{
  "label": "永昌县",
  "value": "620321" }],


[{
  "label": "白银区",
  "value": "620402" },

{
  "label": "平川区",
  "value": "620403" },

{
  "label": "靖远县",
  "value": "620421" },

{
  "label": "会宁县",
  "value": "620422" },

{
  "label": "景泰县",
  "value": "620423" }],


[{
  "label": "秦州区",
  "value": "620502" },

{
  "label": "麦积区",
  "value": "620503" },

{
  "label": "清水县",
  "value": "620521" },

{
  "label": "秦安县",
  "value": "620522" },

{
  "label": "甘谷县",
  "value": "620523" },

{
  "label": "武山县",
  "value": "620524" },

{
  "label": "张家川回族自治县",
  "value": "620525" }],


[{
  "label": "凉州区",
  "value": "620602" },

{
  "label": "民勤县",
  "value": "620621" },

{
  "label": "古浪县",
  "value": "620622" },

{
  "label": "天祝藏族自治县",
  "value": "620623" }],


[{
  "label": "甘州区",
  "value": "620702" },

{
  "label": "肃南裕固族自治县",
  "value": "620721" },

{
  "label": "民乐县",
  "value": "620722" },

{
  "label": "临泽县",
  "value": "620723" },

{
  "label": "高台县",
  "value": "620724" },

{
  "label": "山丹县",
  "value": "620725" }],


[{
  "label": "崆峒区",
  "value": "620802" },

{
  "label": "泾川县",
  "value": "620821" },

{
  "label": "灵台县",
  "value": "620822" },

{
  "label": "崇信县",
  "value": "620823" },

{
  "label": "华亭县",
  "value": "620824" },

{
  "label": "庄浪县",
  "value": "620825" },

{
  "label": "静宁县",
  "value": "620826" },

{
  "label": "平凉工业园区",
  "value": "620871" }],


[{
  "label": "肃州区",
  "value": "620902" },

{
  "label": "金塔县",
  "value": "620921" },

{
  "label": "瓜州县",
  "value": "620922" },

{
  "label": "肃北蒙古族自治县",
  "value": "620923" },

{
  "label": "阿克塞哈萨克族自治县",
  "value": "620924" },

{
  "label": "玉门市",
  "value": "620981" },

{
  "label": "敦煌市",
  "value": "620982" }],


[{
  "label": "西峰区",
  "value": "621002" },

{
  "label": "庆城县",
  "value": "621021" },

{
  "label": "环县",
  "value": "621022" },

{
  "label": "华池县",
  "value": "621023" },

{
  "label": "合水县",
  "value": "621024" },

{
  "label": "正宁县",
  "value": "621025" },

{
  "label": "宁县",
  "value": "621026" },

{
  "label": "镇原县",
  "value": "621027" }],


[{
  "label": "安定区",
  "value": "621102" },

{
  "label": "通渭县",
  "value": "621121" },

{
  "label": "陇西县",
  "value": "621122" },

{
  "label": "渭源县",
  "value": "621123" },

{
  "label": "临洮县",
  "value": "621124" },

{
  "label": "漳县",
  "value": "621125" },

{
  "label": "岷县",
  "value": "621126" }],


[{
  "label": "武都区",
  "value": "621202" },

{
  "label": "成县",
  "value": "621221" },

{
  "label": "文县",
  "value": "621222" },

{
  "label": "宕昌县",
  "value": "621223" },

{
  "label": "康县",
  "value": "621224" },

{
  "label": "西和县",
  "value": "621225" },

{
  "label": "礼县",
  "value": "621226" },

{
  "label": "徽县",
  "value": "621227" },

{
  "label": "两当县",
  "value": "621228" }],


[{
  "label": "临夏市",
  "value": "622901" },

{
  "label": "临夏县",
  "value": "622921" },

{
  "label": "康乐县",
  "value": "622922" },

{
  "label": "永靖县",
  "value": "622923" },

{
  "label": "广河县",
  "value": "622924" },

{
  "label": "和政县",
  "value": "622925" },

{
  "label": "东乡族自治县",
  "value": "622926" },

{
  "label": "积石山保安族东乡族撒拉族自治县",
  "value": "622927" }],


[{
  "label": "合作市",
  "value": "623001" },

{
  "label": "临潭县",
  "value": "623021" },

{
  "label": "卓尼县",
  "value": "623022" },

{
  "label": "舟曲县",
  "value": "623023" },

{
  "label": "迭部县",
  "value": "623024" },

{
  "label": "玛曲县",
  "value": "623025" },

{
  "label": "碌曲县",
  "value": "623026" },

{
  "label": "夏河县",
  "value": "623027" }]],



[
[{
  "label": "城东区",
  "value": "630102" },

{
  "label": "城中区",
  "value": "630103" },

{
  "label": "城西区",
  "value": "630104" },

{
  "label": "城北区",
  "value": "630105" },

{
  "label": "大通回族土族自治县",
  "value": "630121" },

{
  "label": "湟中县",
  "value": "630122" },

{
  "label": "湟源县",
  "value": "630123" }],


[{
  "label": "乐都区",
  "value": "630202" },

{
  "label": "平安区",
  "value": "630203" },

{
  "label": "民和回族土族自治县",
  "value": "630222" },

{
  "label": "互助土族自治县",
  "value": "630223" },

{
  "label": "化隆回族自治县",
  "value": "630224" },

{
  "label": "循化撒拉族自治县",
  "value": "630225" }],


[{
  "label": "门源回族自治县",
  "value": "632221" },

{
  "label": "祁连县",
  "value": "632222" },

{
  "label": "海晏县",
  "value": "632223" },

{
  "label": "刚察县",
  "value": "632224" }],


[{
  "label": "同仁县",
  "value": "632321" },

{
  "label": "尖扎县",
  "value": "632322" },

{
  "label": "泽库县",
  "value": "632323" },

{
  "label": "河南蒙古族自治县",
  "value": "632324" }],


[{
  "label": "共和县",
  "value": "632521" },

{
  "label": "同德县",
  "value": "632522" },

{
  "label": "贵德县",
  "value": "632523" },

{
  "label": "兴海县",
  "value": "632524" },

{
  "label": "贵南县",
  "value": "632525" }],


[{
  "label": "玛沁县",
  "value": "632621" },

{
  "label": "班玛县",
  "value": "632622" },

{
  "label": "甘德县",
  "value": "632623" },

{
  "label": "达日县",
  "value": "632624" },

{
  "label": "久治县",
  "value": "632625" },

{
  "label": "玛多县",
  "value": "632626" }],


[{
  "label": "玉树市",
  "value": "632701" },

{
  "label": "杂多县",
  "value": "632722" },

{
  "label": "称多县",
  "value": "632723" },

{
  "label": "治多县",
  "value": "632724" },

{
  "label": "囊谦县",
  "value": "632725" },

{
  "label": "曲麻莱县",
  "value": "632726" }],


[{
  "label": "格尔木市",
  "value": "632801" },

{
  "label": "德令哈市",
  "value": "632802" },

{
  "label": "乌兰县",
  "value": "632821" },

{
  "label": "都兰县",
  "value": "632822" },

{
  "label": "天峻县",
  "value": "632823" },

{
  "label": "大柴旦行政委员会",
  "value": "632857" },

{
  "label": "冷湖行政委员会",
  "value": "632858" },

{
  "label": "茫崖行政委员会",
  "value": "632859" }]],



[
[{
  "label": "兴庆区",
  "value": "640104" },

{
  "label": "西夏区",
  "value": "640105" },

{
  "label": "金凤区",
  "value": "640106" },

{
  "label": "永宁县",
  "value": "640121" },

{
  "label": "贺兰县",
  "value": "640122" },

{
  "label": "灵武市",
  "value": "640181" }],


[{
  "label": "大武口区",
  "value": "640202" },

{
  "label": "惠农区",
  "value": "640205" },

{
  "label": "平罗县",
  "value": "640221" }],


[{
  "label": "利通区",
  "value": "640302" },

{
  "label": "红寺堡区",
  "value": "640303" },

{
  "label": "盐池县",
  "value": "640323" },

{
  "label": "同心县",
  "value": "640324" },

{
  "label": "青铜峡市",
  "value": "640381" }],


[{
  "label": "原州区",
  "value": "640402" },

{
  "label": "西吉县",
  "value": "640422" },

{
  "label": "隆德县",
  "value": "640423" },

{
  "label": "泾源县",
  "value": "640424" },

{
  "label": "彭阳县",
  "value": "640425" }],


[{
  "label": "沙坡头区",
  "value": "640502" },

{
  "label": "中宁县",
  "value": "640521" },

{
  "label": "海原县",
  "value": "640522" }]],



[
[{
  "label": "天山区",
  "value": "650102" },

{
  "label": "沙依巴克区",
  "value": "650103" },

{
  "label": "新市区",
  "value": "650104" },

{
  "label": "水磨沟区",
  "value": "650105" },

{
  "label": "头屯河区",
  "value": "650106" },

{
  "label": "达坂城区",
  "value": "650107" },

{
  "label": "米东区",
  "value": "650109" },

{
  "label": "乌鲁木齐县",
  "value": "650121" },

{
  "label": "乌鲁木齐经济技术开发区",
  "value": "650171" },

{
  "label": "乌鲁木齐高新技术产业开发区",
  "value": "650172" }],


[{
  "label": "独山子区",
  "value": "650202" },

{
  "label": "克拉玛依区",
  "value": "650203" },

{
  "label": "白碱滩区",
  "value": "650204" },

{
  "label": "乌尔禾区",
  "value": "650205" }],


[{
  "label": "高昌区",
  "value": "650402" },

{
  "label": "鄯善县",
  "value": "650421" },

{
  "label": "托克逊县",
  "value": "650422" }],


[{
  "label": "伊州区",
  "value": "650502" },

{
  "label": "巴里坤哈萨克自治县",
  "value": "650521" },

{
  "label": "伊吾县",
  "value": "650522" }],


[{
  "label": "昌吉市",
  "value": "652301" },

{
  "label": "阜康市",
  "value": "652302" },

{
  "label": "呼图壁县",
  "value": "652323" },

{
  "label": "玛纳斯县",
  "value": "652324" },

{
  "label": "奇台县",
  "value": "652325" },

{
  "label": "吉木萨尔县",
  "value": "652327" },

{
  "label": "木垒哈萨克自治县",
  "value": "652328" }],


[{
  "label": "博乐市",
  "value": "652701" },

{
  "label": "阿拉山口市",
  "value": "652702" },

{
  "label": "精河县",
  "value": "652722" },

{
  "label": "温泉县",
  "value": "652723" }],


[{
  "label": "库尔勒市",
  "value": "652801" },

{
  "label": "轮台县",
  "value": "652822" },

{
  "label": "尉犁县",
  "value": "652823" },

{
  "label": "若羌县",
  "value": "652824" },

{
  "label": "且末县",
  "value": "652825" },

{
  "label": "焉耆回族自治县",
  "value": "652826" },

{
  "label": "和静县",
  "value": "652827" },

{
  "label": "和硕县",
  "value": "652828" },

{
  "label": "博湖县",
  "value": "652829" },

{
  "label": "库尔勒经济技术开发区",
  "value": "652871" }],


[{
  "label": "阿克苏市",
  "value": "652901" },

{
  "label": "温宿县",
  "value": "652922" },

{
  "label": "库车县",
  "value": "652923" },

{
  "label": "沙雅县",
  "value": "652924" },

{
  "label": "新和县",
  "value": "652925" },

{
  "label": "拜城县",
  "value": "652926" },

{
  "label": "乌什县",
  "value": "652927" },

{
  "label": "阿瓦提县",
  "value": "652928" },

{
  "label": "柯坪县",
  "value": "652929" }],


[{
  "label": "阿图什市",
  "value": "653001" },

{
  "label": "阿克陶县",
  "value": "653022" },

{
  "label": "阿合奇县",
  "value": "653023" },

{
  "label": "乌恰县",
  "value": "653024" }],


[{
  "label": "喀什市",
  "value": "653101" },

{
  "label": "疏附县",
  "value": "653121" },

{
  "label": "疏勒县",
  "value": "653122" },

{
  "label": "英吉沙县",
  "value": "653123" },

{
  "label": "泽普县",
  "value": "653124" },

{
  "label": "莎车县",
  "value": "653125" },

{
  "label": "叶城县",
  "value": "653126" },

{
  "label": "麦盖提县",
  "value": "653127" },

{
  "label": "岳普湖县",
  "value": "653128" },

{
  "label": "伽师县",
  "value": "653129" },

{
  "label": "巴楚县",
  "value": "653130" },

{
  "label": "塔什库尔干塔吉克自治县",
  "value": "653131" }],


[{
  "label": "和田市",
  "value": "653201" },

{
  "label": "和田县",
  "value": "653221" },

{
  "label": "墨玉县",
  "value": "653222" },

{
  "label": "皮山县",
  "value": "653223" },

{
  "label": "洛浦县",
  "value": "653224" },

{
  "label": "策勒县",
  "value": "653225" },

{
  "label": "于田县",
  "value": "653226" },

{
  "label": "民丰县",
  "value": "653227" }],


[{
  "label": "伊宁市",
  "value": "654002" },

{
  "label": "奎屯市",
  "value": "654003" },

{
  "label": "霍尔果斯市",
  "value": "654004" },

{
  "label": "伊宁县",
  "value": "654021" },

{
  "label": "察布查尔锡伯自治县",
  "value": "654022" },

{
  "label": "霍城县",
  "value": "654023" },

{
  "label": "巩留县",
  "value": "654024" },

{
  "label": "新源县",
  "value": "654025" },

{
  "label": "昭苏县",
  "value": "654026" },

{
  "label": "特克斯县",
  "value": "654027" },

{
  "label": "尼勒克县",
  "value": "654028" }],


[{
  "label": "塔城市",
  "value": "654201" },

{
  "label": "乌苏市",
  "value": "654202" },

{
  "label": "额敏县",
  "value": "654221" },

{
  "label": "沙湾县",
  "value": "654223" },

{
  "label": "托里县",
  "value": "654224" },

{
  "label": "裕民县",
  "value": "654225" },

{
  "label": "和布克赛尔蒙古自治县",
  "value": "654226" }],


[{
  "label": "阿勒泰市",
  "value": "654301" },

{
  "label": "布尔津县",
  "value": "654321" },

{
  "label": "富蕴县",
  "value": "654322" },

{
  "label": "福海县",
  "value": "654323" },

{
  "label": "哈巴河县",
  "value": "654324" },

{
  "label": "青河县",
  "value": "654325" },

{
  "label": "吉木乃县",
  "value": "654326" }],


[{
  "label": "石河子市",
  "value": "659001" },

{
  "label": "阿拉尔市",
  "value": "659002" },

{
  "label": "图木舒克市",
  "value": "659003" },

{
  "label": "五家渠市",
  "value": "659004" },

{
  "label": "铁门关市",
  "value": "659006" }]],



[
[{
  "label": "台北",
  "value": "660101" }],

[{
  "label": "高雄",
  "value": "660201" }],

[{
  "label": "基隆",
  "value": "660301" }],

[{
  "label": "台中",
  "value": "660401" }],

[{
  "label": "台南",
  "value": "660501" }],

[{
  "label": "新竹",
  "value": "660601" }],

[{
  "label": "嘉义",
  "value": "660701" }],

[{
  "label": "宜兰",
  "value": "660801" }],

[{
  "label": "桃园",
  "value": "660901" }],

[{
  "label": "苗栗",
  "value": "661001" }],

[{
  "label": "彰化",
  "value": "661101" }],

[{
  "label": "南投",
  "value": "661201" }],

[{
  "label": "云林",
  "value": "661301" }],

[{
  "label": "屏东",
  "value": "661401" }],

[{
  "label": "台东",
  "value": "661501" }],

[{
  "label": "花莲",
  "value": "661601" }],

[{
  "label": "澎湖",
  "value": "661701" }]],


[
[{
  "label": "香港岛",
  "value": "670101" }],

[{
  "label": "九龙",
  "value": "670201" }],

[{
  "label": "新界",
  "value": "670301" }]],


[
[{
  "label": "澳门半岛",
  "value": "680101" }],

[{
  "label": "氹仔岛",
  "value": "680201" }],

[{
  "label": "路环岛",
  "value": "680301" }],

[{
  "label": "路氹城",
  "value": "680401" }]]];var _default =



areaData;exports.default = _default;

/***/ }),

/***/ 28:
/*!***************************************!*\
  !*** E:/uniapp/ykt/common/amap-wx.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function AMapWX(a) {this.key = a.key, this.requestConfig = { key: a.key, s: "rsx", platform: "WXJS", appname: a.key, sdkversion: "1.2.0", logversion: "2.0" };}AMapWX.prototype.getWxLocation = function (a, b) {wx.getLocation({ type: "gcj02", success: function success(a) {var c = a.longitude + "," + a.latitude;wx.setStorage({ key: "userLocation", data: c }), b(c);}, fail: function fail(c) {wx.getStorage({ key: "userLocation", success: function success(a) {a.data && b(a.data);} }), a.fail({ errCode: "0", errMsg: c.errMsg || "" });} });}, AMapWX.prototype.getRegeo = function (a) {function c(c) {var d = b.requestConfig;wx.request({ url: "https://restapi.amap.com/v3/geocode/regeo", data: { key: b.key, location: c, extensions: "all", s: d.s, platform: d.platform, appname: b.key, sdkversion: d.sdkversion, logversion: d.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var d, e, f, g, h, i, j, k, l;b.data.status && "1" == b.data.status ? (d = b.data.regeocode, e = d.addressComponent, f = [], g = "", d && d.roads[0] && d.roads[0].name && (g = d.roads[0].name + "附近"), h = c.split(",")[0], i = c.split(",")[1], d.pois && d.pois[0] && (g = d.pois[0].name + "附近", j = d.pois[0].location, j && (h = parseFloat(j.split(",")[0]), i = parseFloat(j.split(",")[1]))), e.provice && f.push(e.provice), e.city && f.push(e.city), e.district && f.push(e.district), e.streetNumber && e.streetNumber.street && e.streetNumber.number ? (f.push(e.streetNumber.street), f.push(e.streetNumber.number)) : (k = "", d && d.roads[0] && d.roads[0].name && (k = d.roads[0].name), f.push(k)), f = f.join(""), l = [{ iconPath: a.iconPath, width: a.iconWidth, height: a.iconHeight, name: f, desc: g, longitude: h, latitude: i, id: 0, regeocodeData: d }], a.success(l)) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this;a.location ? c(a.location) : b.getWxLocation(a, function (a) {c(a);});}, AMapWX.prototype.getWeather = function (a) {function d(d) {var e = "base";a.type && "forecast" == a.type && (e = "all"), wx.request({ url: "https://restapi.amap.com/v3/weather/weatherInfo", data: { key: b.key, city: d, extensions: e, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {function c(a) {var b = { city: { text: "城市", data: a.city }, weather: { text: "天气", data: a.weather }, temperature: { text: "温度", data: a.temperature }, winddirection: { text: "风向", data: a.winddirection + "风" }, windpower: { text: "风力", data: a.windpower + "级" }, humidity: { text: "湿度", data: a.humidity + "%" } };return b;}var d, e;b.data.status && "1" == b.data.status ? b.data.lives ? (d = b.data.lives, d && d.length > 0 && (d = d[0], e = c(d), e["liveData"] = d, a.success(e))) : b.data.forecasts && b.data.forecasts[0] && a.success({ forecast: b.data.forecasts[0] }) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}function e(e) {wx.request({ url: "https://restapi.amap.com/v3/geocode/regeo", data: { key: b.key, location: e, extensions: "all", s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var c, e;b.data.status && "1" == b.data.status ? (e = b.data.regeocode, e.addressComponent ? c = e.addressComponent.adcode : e.aois && e.aois.length > 0 && (c = e.aois[0].adcode), d(c)) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this,c = b.requestConfig;a.city ? d(a.city) : b.getWxLocation(a, function (a) {e(a);});}, AMapWX.prototype.getPoiAround = function (a) {function d(d) {var e = { key: b.key, location: d, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.querytypes && (e["types"] = a.querytypes), a.querykeywords && (e["keywords"] = a.querykeywords), wx.request({ url: "https://restapi.amap.com/v3/place/around", data: e, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var c, d, e, f;if (b.data.status && "1" == b.data.status) {if (b = b.data, b && b.pois) {for (c = [], d = 0; d < b.pois.length; d++) {e = 0 == d ? a.iconPathSelected : a.iconPath, c.push({ latitude: parseFloat(b.pois[d].location.split(",")[1]), longitude: parseFloat(b.pois[d].location.split(",")[0]), iconPath: e, width: 22, height: 32, id: d, name: b.pois[d].name, address: b.pois[d].address });}f = { markers: c, poisData: b.pois }, a.success(f);}} else a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this,c = b.requestConfig;a.location ? d(a.location) : b.getWxLocation(a, function (a) {d(a);});}, AMapWX.prototype.getStaticmap = function (a) {function f(b) {c.push("location=" + b), a.zoom && c.push("zoom=" + a.zoom), a.size && c.push("size=" + a.size), a.scale && c.push("scale=" + a.scale), a.markers && c.push("markers=" + a.markers), a.labels && c.push("labels=" + a.labels), a.paths && c.push("paths=" + a.paths), a.traffic && c.push("traffic=" + a.traffic);var e = d + c.join("&");a.success({ url: e });}var e,b = this,c = [],d = "https://restapi.amap.com/v3/staticmap?";c.push("key=" + b.key), e = b.requestConfig, c.push("s=" + e.s), c.push("platform=" + e.platform), c.push("appname=" + e.appname), c.push("sdkversion=" + e.sdkversion), c.push("logversion=" + e.logversion), a.location ? f(a.location) : b.getWxLocation(a, function (a) {f(a);});}, AMapWX.prototype.getInputtips = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.location && (d["location"] = a.location), a.keywords && (d["keywords"] = a.keywords), a.type && (d["type"] = a.type), a.city && (d["city"] = a.city), a.citylimit && (d["citylimit"] = a.citylimit), wx.request({ url: "https://restapi.amap.com/v3/assistant/inputtips", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.tips && a.success({ tips: b.data.tips });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getDrivingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), a.strategy && (d["strategy"] = a.strategy), a.waypoints && (d["waypoints"] = a.waypoints), a.avoidpolygons && (d["avoidpolygons"] = a.avoidpolygons), a.avoidroad && (d["avoidroad"] = a.avoidroad), wx.request({ url: "https://restapi.amap.com/v3/direction/driving", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.route && a.success({ paths: b.data.route.paths, taxi_cost: b.data.route.taxi_cost || "" });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getWalkingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), wx.request({ url: "https://restapi.amap.com/v3/direction/walking", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.route && a.success({ paths: b.data.route.paths });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getTransitRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), a.strategy && (d["strategy"] = a.strategy), a.city && (d["city"] = a.city), a.cityd && (d["cityd"] = a.cityd), wx.request({ url: "https://restapi.amap.com/v3/direction/transit/integrated", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {if (b && b.data && b.data.route) {var c = b.data.route;a.success({ distance: c.distance || "", taxi_cost: c.taxi_cost || "", transits: c.transits });}}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getRidingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), wx.request({ url: "https://restapi.amap.com/v4/direction/bicycling", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.data && a.success({ paths: b.data.data.paths });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, module.exports.AMapWX = AMapWX;

/***/ }),

/***/ 29:
/*!*****************************************************!*\
  !*** E:/uniapp/ykt/components/u-charts/u-charts.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {/*
 * uCharts v1.8.5.20190815
 * uni-app平台高性能跨全端图表，支持H5、APP、小程序（微信/支付宝/百度/头条/QQ/360）
 * Copyright (c) 2019 QIUN秋云 https://www.ucharts.cn All rights reserved.
 * Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
 *
 * uCharts官方网站
 * https://www.uCharts.cn
 *
 * 开源地址:
 * https://gitee.com/uCharts/uCharts
 *
 * uni-app插件市场地址：
 * http://ext.dcloud.net.cn/plugin?id=271
 *
 */



var config = {
  yAxisWidth: 15,
  yAxisSplit: 5,
  xAxisHeight: 15,
  xAxisLineHeight: 15,
  legendHeight: 15,
  yAxisTitleWidth: 15,
  padding: [10, 10, 10, 10],
  pixelRatio: 1,
  rotate: false,
  columePadding: 3,
  fontSize: 13,
  //dataPointShape: ['diamond', 'circle', 'triangle', 'rect'],
  dataPointShape: ['circle', 'circle', 'circle', 'circle'],
  colors: ['#1890ff', '#2fc25b', '#facc14', '#f04864', '#8543e0', '#90ed7d'],
  pieChartLinePadding: 15,
  pieChartTextPadding: 5,
  xAxisTextPadding: 3,
  titleColor: '#333333',
  titleFontSize: 20,
  subtitleColor: '#999999',
  subtitleFontSize: 15,
  toolTipPadding: 3,
  toolTipBackground: '#000000',
  toolTipOpacity: 0.7,
  toolTipLineHeight: 20,
  radarGridCount: 3,
  radarLabelTextMargin: 15,
  gaugeLabelTextMargin: 15 };


var assign;
if (Object.assign) {
  assign = Object.assign;
} else {
  // 使用polyfill
  assign = function assign(target, varArgs) {
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }
    var to = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];
      if (nextSource != null) {
        for (var nextKey in nextSource) {
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };
}

var util = {
  toFixed: function toFixed(num, limit) {
    limit = limit || 2;
    if (this.isFloat(num)) {
      num = num.toFixed(limit);
    }
    return num;
  },
  isFloat: function isFloat(num) {
    return num % 1 !== 0;
  },
  approximatelyEqual: function approximatelyEqual(num1, num2) {
    return Math.abs(num1 - num2) < 1e-10;
  },
  isSameSign: function isSameSign(num1, num2) {
    return Math.abs(num1) === num1 && Math.abs(num2) === num2 || Math.abs(num1) !== num1 && Math.abs(num2) !== num2;
  },
  isSameXCoordinateArea: function isSameXCoordinateArea(p1, p2) {
    return this.isSameSign(p1.x, p2.x);
  },
  isCollision: function isCollision(obj1, obj2) {
    obj1.end = {};
    obj1.end.x = obj1.start.x + obj1.width;
    obj1.end.y = obj1.start.y - obj1.height;
    obj2.end = {};
    obj2.end.x = obj2.start.x + obj2.width;
    obj2.end.y = obj2.start.y - obj2.height;
    var flag = obj2.start.x > obj1.end.x || obj2.end.x < obj1.start.x || obj2.end.y > obj1.start.y || obj2.start.y < obj1.end.y;
    return !flag;
  } };


//兼容H5点击事件
function getH5Offset(e) {
  e.mp = {
    changedTouches: [] };

  e.mp.changedTouches.push({
    x: e.offsetX,
    y: e.offsetY });

  return e;
}

// hex 转 rgba
function hexToRgb(hexValue, opc) {
  var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var hex = hexValue.replace(rgx, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(rgb[1], 16);
  var g = parseInt(rgb[2], 16);
  var b = parseInt(rgb[3], 16);
  return 'rgba(' + r + ',' + g + ',' + b + ',' + opc + ')';
}

function findRange(num, type, limit) {
  if (isNaN(num)) {
    throw new Error('[uCharts] unvalid series data!');
  }
  limit = limit || 10;
  type = type ? type : 'upper';
  var multiple = 1;
  while (limit < 1) {
    limit *= 10;
    multiple *= 10;
  }
  if (type === 'upper') {
    num = Math.ceil(num * multiple);
  } else {
    num = Math.floor(num * multiple);
  }
  while (num % limit !== 0) {
    if (type === 'upper') {
      num++;
    } else {
      num--;
    }
  }
  return num / multiple;
}

function calCandleMA(dayArr, nameArr, colorArr, kdata) {
  var seriesTemp = [];
  for (var k = 0; k < dayArr.length; k++) {
    var seriesItem = {
      data: [],
      name: nameArr[k],
      color: colorArr[k] };

    for (var i = 0, len = kdata.length; i < len; i++) {
      if (i < dayArr[k]) {
        seriesItem.data.push(null);
        continue;
      }
      var sum = 0;
      for (var j = 0; j < dayArr[k]; j++) {
        sum += kdata[i - j][1];
      }
      seriesItem.data.push(+(sum / dayArr[k]).toFixed(3));
    }
    seriesTemp.push(seriesItem);
  }
  return seriesTemp;
}

function calValidDistance(distance, chartData, config, opts) {
  var dataChartAreaWidth = opts.width - opts.area[1] - opts.area[3];
  var dataChartWidth = chartData.eachSpacing * (opts.chartData.xAxisData.xAxisPoints.length - 1);
  var validDistance = distance;
  if (distance >= 0) {
    validDistance = 0;
  } else if (Math.abs(distance) >= dataChartWidth - dataChartAreaWidth) {
    validDistance = dataChartAreaWidth - dataChartWidth;
  }
  return validDistance;
}

function isInAngleRange(angle, startAngle, endAngle) {
  function adjust(angle) {
    while (angle < 0) {
      angle += 2 * Math.PI;
    }
    while (angle > 2 * Math.PI) {
      angle -= 2 * Math.PI;
    }
    return angle;
  }
  angle = adjust(angle);
  startAngle = adjust(startAngle);
  endAngle = adjust(endAngle);
  if (startAngle > endAngle) {
    endAngle += 2 * Math.PI;
    if (angle < startAngle) {
      angle += 2 * Math.PI;
    }
  }
  return angle >= startAngle && angle <= endAngle;
}

function calRotateTranslate(x, y, h) {
  var xv = x;
  var yv = h - y;
  var transX = xv + (h - yv - xv) / Math.sqrt(2);
  transX *= -1;
  var transY = (h - yv) * (Math.sqrt(2) - 1) - (h - yv - xv) / Math.sqrt(2);
  return {
    transX: transX,
    transY: transY };

}

function createCurveControlPoints(points, i) {

  function isNotMiddlePoint(points, i) {
    if (points[i - 1] && points[i + 1]) {
      return points[i].y >= Math.max(points[i - 1].y, points[i + 1].y) || points[i].y <= Math.min(points[i - 1].y,
      points[
      i + 1].y);
    } else {
      return false;
    }
  }
  var a = 0.2;
  var b = 0.2;
  var pAx = null;
  var pAy = null;
  var pBx = null;
  var pBy = null;
  if (i < 1) {
    pAx = points[0].x + (points[1].x - points[0].x) * a;
    pAy = points[0].y + (points[1].y - points[0].y) * a;
  } else {
    pAx = points[i].x + (points[i + 1].x - points[i - 1].x) * a;
    pAy = points[i].y + (points[i + 1].y - points[i - 1].y) * a;
  }

  if (i > points.length - 3) {
    var last = points.length - 1;
    pBx = points[last].x - (points[last].x - points[last - 1].x) * b;
    pBy = points[last].y - (points[last].y - points[last - 1].y) * b;
  } else {
    pBx = points[i + 1].x - (points[i + 2].x - points[i].x) * b;
    pBy = points[i + 1].y - (points[i + 2].y - points[i].y) * b;
  }
  if (isNotMiddlePoint(points, i + 1)) {
    pBy = points[i + 1].y;
  }
  if (isNotMiddlePoint(points, i)) {
    pAy = points[i].y;
  }
  return {
    ctrA: {
      x: pAx,
      y: pAy },

    ctrB: {
      x: pBx,
      y: pBy } };


}

function convertCoordinateOrigin(x, y, center) {
  return {
    x: center.x + x,
    y: center.y - y };

}

function avoidCollision(obj, target) {
  if (target) {
    // is collision test
    while (util.isCollision(obj, target)) {
      if (obj.start.x > 0) {
        obj.start.y--;
      } else if (obj.start.x < 0) {
        obj.start.y++;
      } else {
        if (obj.start.y > 0) {
          obj.start.y++;
        } else {
          obj.start.y--;
        }
      }
    }
  }
  return obj;
}

function fillSeries(series, opts, config) {
  var index = 0;
  return series.map(function (item) {
    if (!item.color) {
      item.color = config.colors[index];
      index = (index + 1) % config.colors.length;
    }
    if (!item.type) {
      item.type = opts.type;
    }
    if (typeof item.show == "undefined") {
      item.show = true;
    }
    if (!item.type) {
      item.type = opts.type;
    }
    if (!item.pointShape) {
      item.pointShape = "circle";
    }
    if (!item.legendShape) {
      switch (item.type) {
        case 'line':
          item.legendShape = "line";
          break;
        case 'column':
          item.legendShape = "rect";
          break;
        case 'area':
          item.legendShape = "triangle";
          break;
        default:
          item.legendShape = "circle";}

    }
    return item;
  });
}

function getDataRange(minData, maxData) {
  var limit = 0;
  var range = maxData - minData;
  if (range >= 10000) {
    limit = 1000;
  } else if (range >= 1000) {
    limit = 100;
  } else if (range >= 100) {
    limit = 10;
  } else if (range >= 10) {
    limit = 5;
  } else if (range >= 1) {
    limit = 1;
  } else if (range >= 0.1) {
    limit = 0.1;
  } else if (range >= 0.01) {
    limit = 0.01;
  } else if (range >= 0.001) {
    limit = 0.001;
  } else if (range >= 0.0001) {
    limit = 0.0001;
  } else if (range >= 0.00001) {
    limit = 0.00001;
  } else {
    limit = 0.000001;
  }
  return {
    minRange: findRange(minData, 'lower', limit),
    maxRange: findRange(maxData, 'upper', limit) };

}

function measureText(text) {
  var fontSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : config.fontSize;
  text = String(text);
  var text = text.split('');
  var width = 0;
  for (var i = 0; i < text.length; i++) {
    var item = text[i];
    if (/[a-zA-Z]/.test(item)) {
      width += 7;
    } else if (/[0-9]/.test(item)) {
      width += 5.5;
    } else if (/\./.test(item)) {
      width += 2.7;
    } else if (/-/.test(item)) {
      width += 3.25;
    } else if (/[\u4e00-\u9fa5]/.test(item)) {
      width += 10;
    } else if (/\(|\)/.test(item)) {
      width += 3.73;
    } else if (/\s/.test(item)) {
      width += 2.5;
    } else if (/%/.test(item)) {
      width += 8;
    } else {
      width += 10;
    }
  }
  return width * fontSize / 10;
}

function dataCombine(series) {
  return series.reduce(function (a, b) {
    return (a.data ? a.data : a).concat(b.data);
  }, []);
}

function dataCombineStack(series, len) {
  var sum = new Array(len);
  for (var j = 0; j < sum.length; j++) {
    sum[j] = 0;
  }
  for (var i = 0; i < series.length; i++) {
    for (var j = 0; j < sum.length; j++) {
      sum[j] += series[i].data[j];
    }
  }
  return series.reduce(function (a, b) {
    return (a.data ? a.data : a).concat(b.data).concat(sum);
  }, []);
}

function getTouches(touches, opts, e) {
  var x, y;
  if (touches.clientX) {
    if (opts.rotate) {
      y = opts.height - touches.clientX * opts.pixelRatio;
      x = (touches.pageY - e.currentTarget.offsetTop - opts.height / opts.pixelRatio / 2 * (opts.pixelRatio - 1)) *
      opts.pixelRatio;
    } else {
      x = touches.clientX * opts.pixelRatio;
      y = (touches.pageY - e.currentTarget.offsetTop - opts.height / opts.pixelRatio / 2 * (opts.pixelRatio - 1)) *
      opts.pixelRatio;
    }
  } else {
    if (opts.rotate) {
      y = opts.height - touches.x * opts.pixelRatio;
      x = touches.y * opts.pixelRatio;
    } else {
      x = touches.x * opts.pixelRatio;
      y = touches.y * opts.pixelRatio;
    }
  }
  return {
    x: x,
    y: y };

}

function getSeriesDataItem(series, index) {
  var data = [];
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    if (item.data[index] !== null && typeof item.data[index] !== 'undefined' && item.show) {
      var seriesItem = {};
      seriesItem.color = item.color;
      seriesItem.type = item.type;
      seriesItem.style = item.style;
      seriesItem.pointShape = item.pointShape;
      seriesItem.disableLegend = item.disableLegend;
      seriesItem.name = item.name;
      seriesItem.show = item.show;
      seriesItem.data = item.format ? item.format(item.data[index]) : item.data[index];
      data.push(seriesItem);
    }
  }
  return data;
}

function getMaxTextListLength(list) {
  var lengthList = list.map(function (item) {
    return measureText(item);
  });
  return Math.max.apply(null, lengthList);
}

function getRadarCoordinateSeries(length) {
  var eachAngle = 2 * Math.PI / length;
  var CoordinateSeries = [];
  for (var i = 0; i < length; i++) {
    CoordinateSeries.push(eachAngle * i);
  }

  return CoordinateSeries.map(function (item) {
    return -1 * item + Math.PI / 2;
  });
}

function getToolTipData(seriesData, calPoints, index, categories) {
  var option = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  var textList = seriesData.map(function (item) {
    return {
      text: option.format ? option.format(item, categories[index]) : item.name + ': ' + item.data,
      color: item.color };

  });
  var validCalPoints = [];
  var offset = {
    x: 0,
    y: 0 };

  for (var i = 0; i < calPoints.length; i++) {
    var points = calPoints[i];
    if (typeof points[index] !== 'undefined' && points[index] !== null) {
      validCalPoints.push(points[index]);
    }
  }
  for (var _i = 0; _i < validCalPoints.length; _i++) {
    var item = validCalPoints[_i];
    offset.x = Math.round(item.x);
    offset.y += item.y;
  }
  offset.y /= validCalPoints.length;
  return {
    textList: textList,
    offset: offset };

}

function getMixToolTipData(seriesData, calPoints, index, categories) {
  var option = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var textList = seriesData.map(function (item) {
    return {
      text: option.format ? option.format(item, categories[index]) : item.name + ': ' + item.data,
      color: item.color,
      disableLegend: item.disableLegend ? true : false };

  });
  textList = textList.filter(function (item) {
    if (item.disableLegend !== true) {
      return item;
    }
  });
  var validCalPoints = [];
  var offset = {
    x: 0,
    y: 0 };

  for (var i = 0; i < calPoints.length; i++) {
    var points = calPoints[i];
    if (typeof points[index] !== 'undefined' && points[index] !== null) {
      validCalPoints.push(points[index]);
    }
  }
  for (var _i2 = 0; _i2 < validCalPoints.length; _i2++) {
    var item = validCalPoints[_i2];
    offset.x = Math.round(item.x);
    offset.y += item.y;
  }
  offset.y /= validCalPoints.length;
  return {
    textList: textList,
    offset: offset };

}

function getCandleToolTipData(series, seriesData, calPoints, index, categories, extra) {
  var option = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
  var upColor = extra.color.upFill;
  var downColor = extra.color.downFill;
  //颜色顺序为开盘，收盘，最低，最高
  var color = [upColor, upColor, downColor, upColor];
  var textList = [];
  var text0 = {
    text: categories[index],
    color: null };

  textList.push(text0);
  seriesData.map(function (item) {
    if (index == 0 && item.data[1] - item.data[0] < 0) {
      color[1] = downColor;
    } else {
      if (item.data[0] < series[index - 1][1]) {
        color[0] = downColor;
      }
      if (item.data[1] < item.data[0]) {
        color[1] = downColor;
      }
      if (item.data[2] > series[index - 1][1]) {
        color[2] = upColor;
      }
      if (item.data[3] < series[index - 1][1]) {
        color[3] = downColor;
      }
    }
    var text1 = {
      text: '开盘：' + item.data[0],
      color: color[0] };

    var text2 = {
      text: '收盘：' + item.data[1],
      color: color[1] };

    var text3 = {
      text: '最低：' + item.data[2],
      color: color[2] };

    var text4 = {
      text: '最高：' + item.data[3],
      color: color[3] };

    textList.push(text1, text2, text3, text4);
  });
  var validCalPoints = [];
  var offset = {
    x: 0,
    y: 0 };

  for (var i = 0; i < calPoints.length; i++) {
    var points = calPoints[i];
    if (typeof points[index] !== 'undefined' && points[index] !== null) {
      validCalPoints.push(points[index]);
    }
  }
  offset.x = Math.round(validCalPoints[0][0].x);
  return {
    textList: textList,
    offset: offset };

}

function filterSeries(series) {
  var tempSeries = [];
  for (var i = 0; i < series.length; i++) {
    if (series[i].show == true) {
      tempSeries.push(series[i]);
    }
  }
  return tempSeries;
}

function findCurrentIndex(currentPoints, xAxisPoints, opts, config) {
  var offset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var currentIndex = -1;
  var spacing = 0;
  if ((opts.type == 'line' || opts.type == 'area') && opts.xAxis.boundaryGap == 'justify') {
    spacing = opts.chartData.eachSpacing / 2;
  }
  if (isInExactChartArea(currentPoints, opts, config)) {
    xAxisPoints.forEach(function (item, index) {
      if (currentPoints.x + offset + spacing > item) {
        currentIndex = index;
      }
    });
  }
  return currentIndex;
}

function findLegendIndex(currentPoints, legendData, opts) {
  var currentIndex = -1;
  if (isInExactLegendArea(currentPoints, legendData.area)) {
    var points = legendData.points;
    var index = -1;
    for (var i = 0, len = points.length; i < len; i++) {
      var item = points[i];
      for (var j = 0; j < item.length; j++) {
        index += 1;
        var area = item[j]['area'];
        if (currentPoints.x > area[0] && currentPoints.x < area[2] && currentPoints.y > area[1] && currentPoints.y < area[3]) {
          currentIndex = index;
          break;
        }
      }
    }
    return currentIndex;
  }
  return currentIndex;
}

function isInExactLegendArea(currentPoints, area) {
  return currentPoints.x > area.start.x && currentPoints.x < area.end.x && currentPoints.y > area.start.y &&
  currentPoints.y < area.end.y;
}

function isInExactChartArea(currentPoints, opts, config) {
  return currentPoints.x < opts.width - opts.area[1] + 10 && currentPoints.x > opts.area[3] - 10 && currentPoints.y > opts.area[0] && currentPoints.y < opts.height - opts.area[2];
}

function findRadarChartCurrentIndex(currentPoints, radarData, count) {
  var eachAngleArea = 2 * Math.PI / count;
  var currentIndex = -1;
  if (isInExactPieChartArea(currentPoints, radarData.center, radarData.radius)) {
    var fixAngle = function fixAngle(angle) {
      if (angle < 0) {
        angle += 2 * Math.PI;
      }
      if (angle > 2 * Math.PI) {
        angle -= 2 * Math.PI;
      }
      return angle;
    };

    var angle = Math.atan2(radarData.center.y - currentPoints.y, currentPoints.x - radarData.center.x);
    angle = -1 * angle;
    if (angle < 0) {
      angle += 2 * Math.PI;
    }

    var angleList = radarData.angleList.map(function (item) {
      item = fixAngle(-1 * item);

      return item;
    });

    angleList.forEach(function (item, index) {
      var rangeStart = fixAngle(item - eachAngleArea / 2);
      var rangeEnd = fixAngle(item + eachAngleArea / 2);
      if (rangeEnd < rangeStart) {
        rangeEnd += 2 * Math.PI;
      }
      if (angle >= rangeStart && angle <= rangeEnd || angle + 2 * Math.PI >= rangeStart && angle + 2 * Math.PI <=
      rangeEnd) {
        currentIndex = index;
      }
    });
  }

  return currentIndex;
}

function findFunnelChartCurrentIndex(currentPoints, funnelData) {
  var currentIndex = -1;
  for (var i = 0, len = funnelData.series.length; i < len; i++) {
    var item = funnelData.series[i];
    if (currentPoints.x > item.funnelArea[0] && currentPoints.x < item.funnelArea[2] && currentPoints.y > item.funnelArea[1] && currentPoints.y < item.funnelArea[3]) {
      currentIndex = i;
      break;
    }
  }
  return currentIndex;
}

function findWordChartCurrentIndex(currentPoints, wordData) {
  var currentIndex = -1;
  for (var i = 0, len = wordData.length; i < len; i++) {
    var item = wordData[i];
    if (currentPoints.x > item.area[0] && currentPoints.x < item.area[2] && currentPoints.y > item.area[1] && currentPoints.y < item.area[3]) {
      currentIndex = i;
      break;
    }
  }
  return currentIndex;
}

function findMapChartCurrentIndex(currentPoints, opts) {
  var currentIndex = -1;
  var cData = opts.chartData.mapData;
  var data = opts.series;
  var tmp = pointToCoordinate(currentPoints.y, currentPoints.x, cData.bounds, cData.scale, cData.xoffset, cData.yoffset);
  var poi = [tmp.x, tmp.y];
  for (var i = 0, len = data.length; i < len; i++) {
    var item = data[i].geometry.coordinates;
    if (isPoiWithinPoly(poi, item)) {
      currentIndex = i;
      break;
    }
  }
  return currentIndex;
}

function findPieChartCurrentIndex(currentPoints, pieData) {
  var currentIndex = -1;
  if (isInExactPieChartArea(currentPoints, pieData.center, pieData.radius)) {
    var angle = Math.atan2(pieData.center.y - currentPoints.y, currentPoints.x - pieData.center.x);
    angle = -angle;
    for (var i = 0, len = pieData.series.length; i < len; i++) {
      var item = pieData.series[i];
      if (isInAngleRange(angle, item._start_, item._start_ + item._proportion_ * 2 * Math.PI)) {
        currentIndex = i;
        break;
      }
    }
  }

  return currentIndex;
}

function isInExactPieChartArea(currentPoints, center, radius) {
  return Math.pow(currentPoints.x - center.x, 2) + Math.pow(currentPoints.y - center.y, 2) <= Math.pow(radius, 2);
}

function splitPoints(points) {
  var newPoints = [];
  var items = [];
  points.forEach(function (item, index) {
    if (item !== null) {
      items.push(item);
    } else {
      if (items.length) {
        newPoints.push(items);
      }
      items = [];
    }
  });
  if (items.length) {
    newPoints.push(items);
  }

  return newPoints;
}

function calLegendData(series, opts, config, chartData) {
  var legendData = {
    area: {
      start: {
        x: 0,
        y: 0 },

      end: {
        x: 0,
        y: 0 },

      width: 0,
      height: 0,
      wholeWidth: 0,
      wholeHeight: 0 },

    points: [],
    widthArr: [],
    heightArr: [] };

  if (opts.legend.show === false) {
    chartData.legendData = legendData;
    return legendData;
  }

  var padding = opts.legend.padding;
  var margin = opts.legend.margin;
  var fontSize = opts.legend.fontSize;
  var shapeWidth = 15 * opts.pixelRatio;
  var shapeRight = 5 * opts.pixelRatio;
  var lineHeight = Math.max(opts.legend.lineHeight * opts.pixelRatio, fontSize);
  if (opts.legend.position == 'top' || opts.legend.position == 'bottom') {
    var legendList = [];
    var widthCount = 0;
    var widthCountArr = [];
    var currentRow = [];
    for (var i = 0; i < series.length; i++) {
      var item = series[i];
      var itemWidth = shapeWidth + shapeRight + measureText(item.name || 'undefined', fontSize) + opts.legend.itemGap;
      if (widthCount + itemWidth > opts.width - opts.padding[1] - opts.padding[3]) {
        legendList.push(currentRow);
        widthCountArr.push(widthCount - opts.legend.itemGap);
        widthCount = itemWidth;
        currentRow = [item];
      } else {
        widthCount += itemWidth;
        currentRow.push(item);
      }
    }
    if (currentRow.length) {
      legendList.push(currentRow);
      widthCountArr.push(widthCount - opts.legend.itemGap);
      legendData.widthArr = widthCountArr;
      var legendWidth = Math.max.apply(null, widthCountArr);
      switch (opts.legend.float) {
        case 'left':
          legendData.area.start.x = opts.padding[3];
          legendData.area.end.x = opts.padding[3] + 2 * padding;
          break;
        case 'right':
          legendData.area.start.x = opts.width - opts.padding[1] - legendWidth - 2 * padding;
          legendData.area.end.x = opts.width - opts.padding[1];
          break;
        default:
          legendData.area.start.x = (opts.width - legendWidth) / 2 - padding;
          legendData.area.end.x = (opts.width + legendWidth) / 2 + padding;}

      legendData.area.width = legendWidth + 2 * padding;
      legendData.area.wholeWidth = legendWidth + 2 * padding;
      legendData.area.height = legendList.length * lineHeight + 2 * padding;
      legendData.area.wholeHeight = legendList.length * lineHeight + 2 * padding + 2 * margin;
      legendData.points = legendList;
    }
  } else {
    var len = series.length;
    var maxHeight = opts.height - opts.padding[0] - opts.padding[2] - 2 * margin - 2 * padding;
    var maxLength = Math.min(Math.floor(maxHeight / lineHeight), len);
    legendData.area.height = maxLength * lineHeight + padding * 2;
    legendData.area.wholeHeight = maxLength * lineHeight + padding * 2;
    switch (opts.legend.float) {
      case 'top':
        legendData.area.start.y = opts.padding[0] + margin;
        legendData.area.end.y = opts.padding[0] + margin + legendData.area.height;
        break;
      case 'bottom':
        legendData.area.start.y = opts.height - opts.padding[2] - margin - legendData.area.height;
        legendData.area.end.y = opts.height - opts.padding[2] - margin;
        break;
      default:
        legendData.area.start.y = (opts.height - legendData.area.height) / 2;
        legendData.area.end.y = (opts.height + legendData.area.height) / 2;}

    var lineNum = len % maxLength === 0 ? len / maxLength : Math.floor(len / maxLength + 1);
    var _currentRow = [];
    for (var _i3 = 0; _i3 < lineNum; _i3++) {
      var temp = series.slice(_i3 * maxLength, _i3 * maxLength + maxLength);
      _currentRow.push(temp);
    }

    legendData.points = _currentRow;

    if (_currentRow.length) {
      for (var _i4 = 0; _i4 < _currentRow.length; _i4++) {
        var _item = _currentRow[_i4];
        var maxWidth = 0;
        for (var j = 0; j < _item.length; j++) {
          var _itemWidth = shapeWidth + shapeRight + measureText(_item[j].name || 'undefined', fontSize) + opts.legend.itemGap;
          if (_itemWidth > maxWidth) {
            maxWidth = _itemWidth;
          }
        }
        legendData.widthArr.push(maxWidth);
        legendData.heightArr.push(_item.length * lineHeight + padding * 2);
      }
      var _legendWidth = 0;
      for (var _i5 = 0; _i5 < legendData.widthArr.length; _i5++) {
        _legendWidth += legendData.widthArr[_i5];
      }
      legendData.area.width = _legendWidth - opts.legend.itemGap + 2 * padding;
      legendData.area.wholeWidth = legendData.area.width + padding;
    }
  }

  switch (opts.legend.position) {
    case 'top':
      legendData.area.start.y = opts.padding[0] + margin;
      legendData.area.end.y = opts.padding[0] + margin + legendData.area.height;
      break;
    case 'bottom':
      legendData.area.start.y = opts.height - opts.padding[2] - legendData.area.height - margin;
      legendData.area.end.y = opts.height - opts.padding[2] - margin;
      break;
    case 'left':
      legendData.area.start.x = opts.padding[3];
      legendData.area.end.x = opts.padding[3] + legendData.area.width;
      break;
    case 'right':
      legendData.area.start.x = opts.width - opts.padding[1] - legendData.area.width;
      legendData.area.end.x = opts.width - opts.padding[1];
      break;}

  chartData.legendData = legendData;
  return legendData;
}

function calCategoriesData(categories, opts, config, eachSpacing) {
  var result = {
    angle: 0,
    xAxisHeight: config.xAxisHeight };

  var categoriesTextLenth = categories.map(function (item) {
    return measureText(item);
  });
  var maxTextLength = Math.max.apply(this, categoriesTextLenth);

  if (opts.xAxis.rotateLabel == true && maxTextLength + 2 * config.xAxisTextPadding > eachSpacing) {
    result.angle = 45 * Math.PI / 180;
    result.xAxisHeight = 2 * config.xAxisTextPadding + maxTextLength * Math.sin(result.angle);
  }
  return result;
}

function getRadarDataPoints(angleList, center, radius, series, opts) {
  var process = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;

  var radarOption = opts.extra.radar || {};
  radarOption.max = radarOption.max || 0;
  var maxData = Math.max(radarOption.max, Math.max.apply(null, dataCombine(series)));

  var data = [];var _loop2 = function _loop2(
  i) {
    var each = series[i];
    var listItem = {};
    listItem.color = each.color;
    listItem.data = [];
    each.data.forEach(function (item, index) {
      var tmp = {};
      tmp.angle = angleList[index];

      tmp.proportion = item / maxData;
      tmp.position = convertCoordinateOrigin(radius * tmp.proportion * process * Math.cos(tmp.angle), radius * tmp.proportion *
      process * Math.sin(tmp.angle), center);
      listItem.data.push(tmp);
    });

    data.push(listItem);};for (var i = 0; i < series.length; i++) {_loop2(i);
  }

  return data;
}

function getPieDataPoints(series, radius) {
  var process = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  var count = 0;
  var _start_ = 0;
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    item.data = item.data === null ? 0 : item.data;
    count += item.data;
  }
  for (var _i6 = 0; _i6 < series.length; _i6++) {
    var _item2 = series[_i6];
    _item2.data = _item2.data === null ? 0 : _item2.data;
    if (count === 0) {
      _item2._proportion_ = 1 / series.length * process;
    } else {
      _item2._proportion_ = _item2.data / count * process;
    }
    _item2._radius_ = radius;
  }
  for (var _i7 = 0; _i7 < series.length; _i7++) {
    var _item3 = series[_i7];
    _item3._start_ = _start_;
    _start_ += 2 * _item3._proportion_ * Math.PI;
  }

  return series;
}

function getFunnelDataPoints(series, radius) {
  var process = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  series = series.sort(function (a, b) {return parseInt(b.data) - parseInt(a.data);});
  for (var i = 0; i < series.length; i++) {
    series[i].radius = series[i].data / series[0].data * radius * process;
    series[i]._proportion_ = series[i].data / series[0].data;
  }
  return series.reverse();
}

function getRoseDataPoints(series, type, minRadius, radius) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var count = 0;
  var _start_ = 0;

  var dataArr = [];
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    item.data = item.data === null ? 0 : item.data;
    count += item.data;
    dataArr.push(item.data);
  }

  var minData = Math.min.apply(null, dataArr);
  var maxData = Math.max.apply(null, dataArr);
  var radiusLength = radius - minRadius;

  for (var _i8 = 0; _i8 < series.length; _i8++) {
    var _item4 = series[_i8];
    _item4.data = _item4.data === null ? 0 : _item4.data;
    if (count === 0 || type == 'area') {
      _item4._proportion_ = _item4.data / count * process;
      _item4._rose_proportion_ = 1 / series.length * process;
    } else {
      _item4._proportion_ = _item4.data / count * process;
      _item4._rose_proportion_ = _item4.data / count * process;
    }
    _item4._radius_ = minRadius + radiusLength * ((_item4.data - minData) / (maxData - minData));
  }
  for (var _i9 = 0; _i9 < series.length; _i9++) {
    var _item5 = series[_i9];
    _item5._start_ = _start_;
    _start_ += 2 * _item5._rose_proportion_ * Math.PI;
  }

  return series;
}

function getArcbarDataPoints(series, arcbarOption) {
  var process = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  if (process == 1) {
    process = 0.999999;
  }
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    item.data = item.data === null ? 0 : item.data;
    var totalAngle = void 0;
    if (arcbarOption.type == 'default') {
      if (arcbarOption.endAngle < arcbarOption.startAngle) {
        totalAngle = 2 + arcbarOption.endAngle - arcbarOption.startAngle;
      } else {
        totalAngle = arcbarOption.startAngle - arcbarOption.endAngle;
      }
    } else {
      totalAngle = 2;
    }
    item._proportion_ = totalAngle * item.data * process + arcbarOption.startAngle;
    if (item._proportion_ >= 2) {
      item._proportion_ = item._proportion_ % 2;
    }
  }
  return series;
}

function getGaugeAxisPoints(categories, startAngle, endAngle) {
  var totalAngle = startAngle - endAngle + 1;
  var tempStartAngle = startAngle;
  for (var i = 0; i < categories.length; i++) {
    categories[i].value = categories[i].value === null ? 0 : categories[i].value;
    categories[i]._startAngle_ = tempStartAngle;
    categories[i]._endAngle_ = totalAngle * categories[i].value + startAngle;
    if (categories[i]._endAngle_ >= 2) {
      categories[i]._endAngle_ = categories[i]._endAngle_ % 2;
    }
    tempStartAngle = categories[i]._endAngle_;
  }
  return categories;
}

function getGaugeDataPoints(series, categories, gaugeOption) {
  var process = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    item.data = item.data === null ? 0 : item.data;
    if (gaugeOption.pointer.color == 'auto') {
      for (var _i10 = 0; _i10 < categories.length; _i10++) {
        if (item.data <= categories[_i10].value) {
          item.color = categories[_i10].color;
          break;
        }
      }
    } else {
      item.color = gaugeOption.pointer.color;
    }
    var totalAngle = gaugeOption.startAngle - gaugeOption.endAngle + 1;
    item._endAngle_ = totalAngle * item.data + gaugeOption.startAngle;
    item._oldAngle_ = gaugeOption.oldAngle;
    if (gaugeOption.oldAngle < gaugeOption.endAngle) {
      item._oldAngle_ += 2;
    }
    if (item.data >= gaugeOption.oldData) {
      item._proportion_ = (item._endAngle_ - item._oldAngle_) * process + gaugeOption.oldAngle;
    } else {
      item._proportion_ = item._oldAngle_ - (item._oldAngle_ - item._endAngle_) * process;
    }
    if (item._proportion_ >= 2) {
      item._proportion_ = item._proportion_ % 2;
    }
  }
  return series;
}

function getPieTextMaxLength(series) {
  series = getPieDataPoints(series);
  var maxLength = 0;
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    var text = item.format ? item.format(+item._proportion_.toFixed(2)) : util.toFixed(item._proportion_ * 100) + '%';
    maxLength = Math.max(maxLength, measureText(text));
  }

  return maxLength;
}

function fixColumeData(points, eachSpacing, columnLen, index, config, opts) {
  return points.map(function (item) {
    if (item === null) {
      return null;
    }
    item.width = Math.ceil((eachSpacing - 2 * config.columePadding) / columnLen);

    if (opts.extra.column && opts.extra.column.width && +opts.extra.column.width > 0) {
      item.width = Math.min(item.width, +opts.extra.column.width);
    }
    if (item.width <= 0) {
      item.width = 1;
    }
    item.x += (index + 0.5 - columnLen / 2) * item.width;
    return item;
  });
}

function fixColumeMeterData(points, eachSpacing, columnLen, index, config, opts, border) {
  return points.map(function (item) {
    if (item === null) {
      return null;
    }
    item.width = Math.ceil((eachSpacing - 2 * config.columePadding) / 2);

    if (opts.extra.column && opts.extra.column.width && +opts.extra.column.width > 0) {
      item.width = Math.min(item.width, +opts.extra.column.width);
    }

    if (index > 0) {
      item.width -= 2 * border;
    }
    return item;
  });
}

function fixColumeStackData(points, eachSpacing, columnLen, index, config, opts, series) {

  return points.map(function (item, indexn) {

    if (item === null) {
      return null;
    }
    item.width = Math.ceil((eachSpacing - 2 * config.columePadding) / 2);

    if (opts.extra.column && opts.extra.column.width && +opts.extra.column.width > 0) {
      item.width = Math.min(item.width, +opts.extra.column.width);
    }
    return item;
  });
}

function getXAxisPoints(categories, opts, config) {
  var yAxisTotalWidth = config.yAxisWidth + config.yAxisTitleWidth;
  var spacingValid = opts.width - opts.area[1] - opts.area[3];
  var dataCount = opts.enableScroll ? Math.min(opts.xAxis.itemCount, categories.length) : categories.length;
  if ((opts.type == 'line' || opts.type == 'area') && dataCount > 1 && opts.xAxis.boundaryGap == 'justify') {
    dataCount -= 1;
  }
  var eachSpacing = spacingValid / dataCount;

  var xAxisPoints = [];
  var startX = opts.area[3];
  var endX = opts.width - opts.area[1];
  categories.forEach(function (item, index) {
    xAxisPoints.push(startX + index * eachSpacing);
  });
  if (opts.xAxis.boundaryGap !== 'justify') {
    if (opts.enableScroll === true) {
      xAxisPoints.push(startX + categories.length * eachSpacing);
    } else {
      xAxisPoints.push(endX);
    }
  }
  return {
    xAxisPoints: xAxisPoints,
    startX: startX,
    endX: endX,
    eachSpacing: eachSpacing };

}

function getCandleDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config) {
  var process = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;
  var points = [];
  var validHeight = opts.height - opts.area[0] - opts.area[2];
  data.forEach(function (item, index) {
    if (item === null) {
      points.push(null);
    } else {
      var cPoints = [];
      item.forEach(function (items, indexs) {
        var point = {};
        point.x = xAxisPoints[index] + Math.round(eachSpacing / 2);
        var value = items.value || items;
        var height = validHeight * (value - minRange) / (maxRange - minRange);
        height *= process;
        point.y = opts.height - Math.round(height) - opts.area[2];
        cPoints.push(point);
      });
      points.push(cPoints);
    }
  });

  return points;
}

function getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config) {
  var process = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;
  var boundaryGap = 'center';
  if (opts.type == 'line' || opts.type == 'area') {
    boundaryGap = opts.xAxis.boundaryGap;
  }
  var points = [];
  var validHeight = opts.height - opts.area[0] - opts.area[2];
  data.forEach(function (item, index) {
    if (item === null) {
      points.push(null);
    } else {
      var point = {};
      point.color = item.color;
      point.x = xAxisPoints[index];
      if (boundaryGap == 'center') {
        point.x += Math.round(eachSpacing / 2);
      }
      var value = item;
      if (typeof item === 'object' && item !== null) {
        value = item.value;
      }
      var height = validHeight * (value - minRange) / (maxRange - minRange);
      height *= process;
      point.y = opts.height - Math.round(height) - opts.area[2];
      points.push(point);
    }
  });

  return points;
}

function getStackDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, seriesIndex, stackSeries) {
  var process = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 1;
  var points = [];
  var validHeight = opts.height - opts.area[0] - opts.area[2];

  data.forEach(function (item, index) {
    if (item === null) {
      points.push(null);
    } else {
      var point = {};
      point.color = item.color;
      point.x = xAxisPoints[index] + Math.round(eachSpacing / 2);

      if (seriesIndex > 0) {
        var value = 0;
        for (var i = 0; i <= seriesIndex; i++) {
          value += stackSeries[i].data[index];
        }
        var value0 = value - item;
        var height = validHeight * (value - minRange) / (maxRange - minRange);
        var height0 = validHeight * (value0 - minRange) / (maxRange - minRange);
      } else {
        var value = item;
        var height = validHeight * (value - minRange) / (maxRange - minRange);
        var height0 = 0;
      }
      var heightc = height0;
      height *= process;
      heightc *= process;
      point.y = opts.height - Math.round(height) - opts.area[2];
      point.y0 = opts.height - Math.round(heightc) - opts.area[2];
      points.push(point);
    }
  });

  return points;
}

function getYAxisTextList(series, opts, config, stack) {
  var data;
  if (stack == 'stack') {
    data = dataCombineStack(series, opts.categories.length);
  } else {
    data = dataCombine(series);
  }
  var sorted = [];
  // remove null from data
  data = data.filter(function (item) {
    //return item !== null;
    if (typeof item === 'object' && item !== null) {
      if (Array.isArray(item)) {
        return item !== null;
      } else {
        return item.value !== null;
      }
    } else {
      return item !== null;
    }
  });
  data.map(function (item) {
    if (typeof item === 'object') {
      if (Array.isArray(item)) {
        item.map(function (subitem) {
          sorted.push(subitem);
        });
      } else {
        sorted.push(item.value);
      }
    } else {
      sorted.push(item);
    }
  });
  var minData = 0;
  var maxData = 0;
  if (sorted.length > 0) {
    minData = Math.min.apply(this, sorted);
    maxData = Math.max.apply(this, sorted);
  }
  if (typeof opts.yAxis.min === 'number') {
    minData = Math.min(opts.yAxis.min, minData);
  }
  if (typeof opts.yAxis.max === 'number') {
    maxData = Math.max(opts.yAxis.max, maxData);
  }

  if (minData === maxData) {
    var rangeSpan = maxData || 10;
    maxData += rangeSpan;
  }

  var dataRange = getDataRange(minData, maxData);
  var minRange = dataRange.minRange;
  var maxRange = dataRange.maxRange;

  var range = [];
  var eachRange = (maxRange - minRange) / config.yAxisSplit;

  for (var i = 0; i <= config.yAxisSplit; i++) {
    range.push(minRange + eachRange * i);
  }
  return range.reverse();
}

function calYAxisData(series, opts, config) {
  //堆叠图重算Y轴
  var columnstyle = assign({}, {
    type: "" },
  opts.extra.column);
  var ranges = getYAxisTextList(series, opts, config, columnstyle.type);
  var yAxisWidth = config.yAxisWidth;
  var yAxisFontSize = opts.yAxis.fontSize || config.fontSize;
  var rangesFormat = ranges.map(function (item) {
    item = util.toFixed(item, 6);
    item = opts.yAxis.format ? opts.yAxis.format(Number(item)) : item;
    yAxisWidth = Math.max(yAxisWidth, measureText(item, yAxisFontSize) + 5);
    return item;
  });
  if (opts.yAxis.disabled === true) {
    yAxisWidth = 0;
  }

  return {
    rangesFormat: rangesFormat,
    ranges: ranges,
    yAxisWidth: yAxisWidth };

}

function calTooltipYAxisData(point, series, opts, config, eachSpacing) {
  var ranges = getYAxisTextList(series, opts, config);
  var spacingValid = opts.height - opts.area[0] - opts.area[2];
  var maxVal = ranges[0];
  var minVal = ranges[ranges.length - 1];
  var minAxis = opts.padding[3];
  var maxAxis = opts.padding[1] + spacingValid;
  var item = maxVal - (maxVal - minVal) * (point - minAxis) / (maxAxis - minAxis);
  item = opts.yAxis.format ? opts.yAxis.format(Number(item)) : item;
  return item;
}

function calMarkLineData(minRange, maxRange, points, opts) {
  var spacingValid = opts.height - opts.area[0] - opts.area[2];
  for (var i = 0; i < points.length; i++) {
    var height = spacingValid * (points[i].value - minRange) / (maxRange - minRange);
    points[i].y = opts.height - Math.round(height) - opts.area[2];
  }
  return points;
}

function contextRotate(context, opts) {
  if (opts.rotateLock !== true) {
    context.translate(opts.height, 0);
    context.rotate(90 * Math.PI / 180);
  } else if (opts._rotate_ !== true) {
    context.translate(opts.height, 0);
    context.rotate(90 * Math.PI / 180);
    opts._rotate_ = true;
  }
}

function drawPointShape(points, color, shape, context, opts) {
  context.beginPath();
  context.setStrokeStyle("#ffffff");
  context.setLineWidth(1 * opts.pixelRatio);
  context.setFillStyle(color);
  if (shape === 'diamond') {
    points.forEach(function (item, index) {
      if (item !== null) {
        context.moveTo(item.x, item.y - 4.5);
        context.lineTo(item.x - 4.5, item.y);
        context.lineTo(item.x, item.y + 4.5);
        context.lineTo(item.x + 4.5, item.y);
        context.lineTo(item.x, item.y - 4.5);
      }
    });
  } else if (shape === 'circle') {
    points.forEach(function (item, index) {
      if (item !== null) {
        context.moveTo(item.x + 3.5 * opts.pixelRatio, item.y);
        context.arc(item.x, item.y, 4 * opts.pixelRatio, 0, 2 * Math.PI, false);
      }
    });
  } else if (shape === 'rect') {
    points.forEach(function (item, index) {
      if (item !== null) {
        context.moveTo(item.x - 3.5, item.y - 3.5);
        context.rect(item.x - 3.5, item.y - 3.5, 7, 7);
      }
    });
  } else if (shape === 'triangle') {
    points.forEach(function (item, index) {
      if (item !== null) {
        context.moveTo(item.x, item.y - 4.5);
        context.lineTo(item.x - 4.5, item.y + 4.5);
        context.lineTo(item.x + 4.5, item.y + 4.5);
        context.lineTo(item.x, item.y - 4.5);
      }
    });
  }
  context.closePath();
  context.fill();
  context.stroke();
}

function drawRingTitle(opts, config, context, center) {
  var titlefontSize = opts.title.fontSize || config.titleFontSize;
  var subtitlefontSize = opts.subtitle.fontSize || config.subtitleFontSize;
  var title = opts.title.name || '';
  var subtitle = opts.subtitle.name || '';
  var titleFontColor = opts.title.color || config.titleColor;
  var subtitleFontColor = opts.subtitle.color || config.subtitleColor;
  var titleHeight = title ? titlefontSize : 0;
  var subtitleHeight = subtitle ? subtitlefontSize : 0;
  var margin = 5;

  if (subtitle) {
    var textWidth = measureText(subtitle, subtitlefontSize);
    var startX = center.x - textWidth / 2 + (opts.subtitle.offsetX || 0);
    var startY = center.y + subtitlefontSize / 2 + (opts.subtitle.offsetY || 0);
    if (title) {
      startY += (titleHeight + margin) / 2;
    }
    context.beginPath();
    context.setFontSize(subtitlefontSize);
    context.setFillStyle(subtitleFontColor);
    context.fillText(subtitle, startX, startY);
    context.closePath();
    context.stroke();
  }
  if (title) {
    var _textWidth = measureText(title, titlefontSize);
    var _startX = center.x - _textWidth / 2 + (opts.title.offsetX || 0);
    var _startY = center.y + titlefontSize / 2 + (opts.title.offsetY || 0);
    if (subtitle) {
      _startY -= (subtitleHeight + margin) / 2;
    }
    context.beginPath();
    context.setFontSize(titlefontSize);
    context.setFillStyle(titleFontColor);
    context.fillText(title, _startX, _startY);
    context.closePath();
    context.stroke();
  }
}

function drawPointText(points, series, config, context) {
  // 绘制数据文案
  var data = series.data;
  points.forEach(function (item, index) {
    if (item !== null) {
      //var formatVal = series.format ? series.format(data[index]) : data[index];
      context.beginPath();
      context.setFontSize(series.textSize || config.fontSize);
      context.setFillStyle(series.textColor || '#666666');
      var value = data[index];
      if (typeof data[index] === 'object' && data[index] !== null) {
        value = data[index].value;
      }
      var formatVal = series.format ? series.format(value) : value;
      context.fillText(String(formatVal), item.x - measureText(formatVal, series.textSize || config.fontSize) / 2, item.y -
      2);
      context.closePath();
      context.stroke();
    }
  });

}

function drawGaugeLabel(gaugeOption, radius, centerPosition, opts, config, context) {
  radius -= gaugeOption.width / 2 + config.gaugeLabelTextMargin;

  var totalAngle = gaugeOption.startAngle - gaugeOption.endAngle + 1;
  var splitAngle = totalAngle / gaugeOption.splitLine.splitNumber;
  var totalNumber = gaugeOption.endNumber - gaugeOption.startNumber;
  var splitNumber = totalNumber / gaugeOption.splitLine.splitNumber;
  var nowAngle = gaugeOption.startAngle;
  var nowNumber = gaugeOption.startNumber;
  for (var i = 0; i < gaugeOption.splitLine.splitNumber + 1; i++) {
    var pos = {
      x: radius * Math.cos(nowAngle * Math.PI),
      y: radius * Math.sin(nowAngle * Math.PI) };

    var labelText = gaugeOption.labelFormat ? gaugeOption.labelFormat(nowNumber) : nowNumber;
    pos.x += centerPosition.x - measureText(labelText) / 2;
    pos.y += centerPosition.y;
    var startX = pos.x;
    var startY = pos.y;
    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(gaugeOption.labelColor || '#666666');
    context.fillText(labelText, startX, startY + config.fontSize / 2);
    context.closePath();
    context.stroke();

    nowAngle += splitAngle;
    if (nowAngle >= 2) {
      nowAngle = nowAngle % 2;
    }
    nowNumber += splitNumber;
  }

}

function drawRadarLabel(angleList, radius, centerPosition, opts, config, context) {
  var radarOption = opts.extra.radar || {};
  radius += config.radarLabelTextMargin;

  angleList.forEach(function (angle, index) {
    var pos = {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle) };

    var posRelativeCanvas = convertCoordinateOrigin(pos.x, pos.y, centerPosition);
    var startX = posRelativeCanvas.x;
    var startY = posRelativeCanvas.y;
    if (util.approximatelyEqual(pos.x, 0)) {
      startX -= measureText(opts.categories[index] || '') / 2;
    } else if (pos.x < 0) {
      startX -= measureText(opts.categories[index] || '');
    }
    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(radarOption.labelColor || '#666666');
    context.fillText(opts.categories[index] || '', startX, startY + config.fontSize / 2);
    context.closePath();
    context.stroke();
  });

}

function drawPieText(series, opts, config, context, radius, center) {
  var lineRadius = config.pieChartLinePadding;
  var textObjectCollection = [];
  var lastTextObject = null;

  var seriesConvert = series.map(function (item) {
    var text = item.format ? item.format(+item._proportion_.toFixed(2)) : util.toFixed(item._proportion_.toFixed(4) * 100) + '%';
    if (item._rose_proportion_) item._proportion_ = item._rose_proportion_;
    var arc = 2 * Math.PI - (item._start_ + 2 * Math.PI * item._proportion_ / 2);
    var color = item.color;
    var radius = item._radius_;
    return {
      arc: arc,
      text: text,
      color: color,
      radius: radius,
      textColor: item.textColor,
      textSize: item.textSize };

  });
  for (var i = 0; i < seriesConvert.length; i++) {
    var item = seriesConvert[i];
    // line end
    var orginX1 = Math.cos(item.arc) * (item.radius + lineRadius);
    var orginY1 = Math.sin(item.arc) * (item.radius + lineRadius);

    // line start
    var orginX2 = Math.cos(item.arc) * item.radius;
    var orginY2 = Math.sin(item.arc) * item.radius;

    // text start
    var orginX3 = orginX1 >= 0 ? orginX1 + config.pieChartTextPadding : orginX1 - config.pieChartTextPadding;
    var orginY3 = orginY1;
    var textWidth = measureText(item.text);
    var startY = orginY3;

    if (lastTextObject && util.isSameXCoordinateArea(lastTextObject.start, {
      x: orginX3 }))
    {
      if (orginX3 > 0) {
        startY = Math.min(orginY3, lastTextObject.start.y);
      } else if (orginX1 < 0) {
        startY = Math.max(orginY3, lastTextObject.start.y);
      } else {
        if (orginY3 > 0) {
          startY = Math.max(orginY3, lastTextObject.start.y);
        } else {
          startY = Math.min(orginY3, lastTextObject.start.y);
        }
      }
    }
    if (orginX3 < 0) {
      orginX3 -= textWidth;
    }

    var textObject = {
      lineStart: {
        x: orginX2,
        y: orginY2 },

      lineEnd: {
        x: orginX1,
        y: orginY1 },

      start: {
        x: orginX3,
        y: startY },

      width: textWidth,
      height: config.fontSize,
      text: item.text,
      color: item.color,
      textColor: item.textColor,
      textSize: item.textSize };

    lastTextObject = avoidCollision(textObject, lastTextObject);
    textObjectCollection.push(lastTextObject);
  }

  for (var _i11 = 0; _i11 < textObjectCollection.length; _i11++) {
    var _item6 = textObjectCollection[_i11];
    var lineStartPoistion = convertCoordinateOrigin(_item6.lineStart.x, _item6.lineStart.y, center);
    var lineEndPoistion = convertCoordinateOrigin(_item6.lineEnd.x, _item6.lineEnd.y, center);
    var textPosition = convertCoordinateOrigin(_item6.start.x, _item6.start.y, center);
    context.setLineWidth(1 * opts.pixelRatio);
    context.setFontSize(config.fontSize);
    context.beginPath();
    context.setStrokeStyle(_item6.color);
    context.setFillStyle(_item6.color);
    context.moveTo(lineStartPoistion.x, lineStartPoistion.y);
    var curveStartX = _item6.start.x < 0 ? textPosition.x + _item6.width : textPosition.x;
    var textStartX = _item6.start.x < 0 ? textPosition.x - 5 : textPosition.x + 5;
    context.quadraticCurveTo(lineEndPoistion.x, lineEndPoistion.y, curveStartX, textPosition.y);
    context.moveTo(lineStartPoistion.x, lineStartPoistion.y);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.moveTo(textPosition.x + _item6.width, textPosition.y);
    context.arc(curveStartX, textPosition.y, 2, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.beginPath();
    context.setFontSize(_item6.textSize || config.fontSize);
    context.setFillStyle(_item6.textColor || '#666666');
    context.fillText(_item6.text, textStartX, textPosition.y + 3);
    context.closePath();
    context.stroke();
    context.closePath();
  }
}

function drawToolTipSplitLine(offsetX, opts, config, context) {
  var toolTipOption = opts.extra.tooltip || {};
  toolTipOption.gridType = toolTipOption.gridType == undefined ? 'solid' : toolTipOption.gridType;
  toolTipOption.dashLength = toolTipOption.dashLength == undefined ? 4 : toolTipOption.dashLength;
  var startY = opts.area[0];
  var endY = opts.height - opts.area[2];

  if (toolTipOption.gridType == 'dash') {
    context.setLineDash([toolTipOption.dashLength, toolTipOption.dashLength]);
  }
  context.setStrokeStyle(toolTipOption.gridColor || '#cccccc');
  context.setLineWidth(1 * opts.pixelRatio);
  context.beginPath();
  context.moveTo(offsetX, startY);
  context.lineTo(offsetX, endY);
  context.stroke();
  context.setLineDash([]);

  if (toolTipOption.xAxisLabel) {
    var labelText = opts.categories[opts.tooltip.index];
    context.setFontSize(config.fontSize);
    var textWidth = measureText(labelText, config.fontSize);

    var textX = offsetX - 0.5 * textWidth;
    var textY = endY;
    context.beginPath();
    context.setFillStyle(hexToRgb(toolTipOption.labelBgColor || config.toolTipBackground, toolTipOption.labelBgOpacity || config.toolTipOpacity));
    context.setStrokeStyle(toolTipOption.labelBgColor || config.toolTipBackground);
    context.setLineWidth(1 * opts.pixelRatio);
    context.rect(textX - config.toolTipPadding, textY, textWidth + 2 * config.toolTipPadding, config.fontSize + 2 * config.toolTipPadding);
    context.closePath();
    context.stroke();
    context.fill();

    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(toolTipOption.labelFontColor || config.fontColor);
    context.fillText(String(labelText), textX, textY + config.toolTipPadding + config.fontSize);
    context.closePath();
    context.stroke();
  }
}

function drawMarkLine(minRange, maxRange, opts, config, context) {
  var markLineOption = assign({}, {
    type: 'solid',
    dashLength: 4,
    data: [] },
  opts.extra.markLine);
  var startX = opts.area[3];
  var endX = opts.width - opts.padding[1];
  var points = calMarkLineData(minRange, maxRange, markLineOption.data, opts);

  for (var i = 0; i < points.length; i++) {
    var item = assign({}, {
      lineColor: '#DE4A42',
      showLabel: false,
      labelFontColor: '#666666',
      labelBgColor: '#DFE8FF',
      labelBgOpacity: 0.8,
      yAxisIndex: 0 },
    points[i]);

    if (markLineOption.type == 'dash') {
      context.setLineDash([markLineOption.dashLength, markLineOption.dashLength]);
    }
    context.setStrokeStyle(item.lineColor);
    context.setLineWidth(1 * opts.pixelRatio);
    context.beginPath();
    context.moveTo(startX, item.y);
    context.lineTo(endX, item.y);
    context.stroke();
    context.setLineDash([]);
    if (item.showLabel) {
      var labelText = opts.yAxis.format ? opts.yAxis.format(Number(item.value)) : item.value;
      context.setFontSize(config.fontSize);
      var textWidth = measureText(labelText, config.fontSize);
      var bgStartX = opts.padding[3] + config.yAxisTitleWidth - config.toolTipPadding;
      var bgEndX = Math.max(opts.area[3], textWidth + config.toolTipPadding * 2);
      var bgWidth = bgEndX - bgStartX;

      var textX = bgStartX + (bgWidth - textWidth) / 2;
      var textY = item.y;
      context.setFillStyle(hexToRgb(item.labelBgColor, item.labelBgOpacity));
      context.setStrokeStyle(item.labelBgColor);
      context.setLineWidth(1 * opts.pixelRatio);
      context.beginPath();
      context.rect(bgStartX, textY - 0.5 * config.fontSize - config.toolTipPadding, bgWidth, config.fontSize + 2 * config.toolTipPadding);
      context.closePath();
      context.stroke();
      context.fill();

      context.beginPath();
      context.setFontSize(config.fontSize);
      context.setFillStyle(item.labelFontColor);
      context.fillText(String(labelText), textX, textY + 0.5 * config.fontSize);
      context.stroke();
    }
  }
}

function drawToolTipHorizentalLine(opts, config, context, eachSpacing, xAxisPoints) {
  var toolTipOption = assign({}, {
    gridType: 'solid',
    dashLength: 4 },
  opts.extra.tooltip);

  var startX = opts.area[3];
  var endX = opts.width - opts.padding[1];

  if (toolTipOption.gridType == 'dash') {
    context.setLineDash([toolTipOption.dashLength, toolTipOption.dashLength]);
  }
  context.setStrokeStyle(toolTipOption.gridColor || '#cccccc');
  context.setLineWidth(1 * opts.pixelRatio);
  context.beginPath();
  context.moveTo(startX, opts.tooltip.offset.y);
  context.lineTo(endX, opts.tooltip.offset.y);
  context.stroke();
  context.setLineDash([]);

  if (toolTipOption.yAxisLabel) {
    var labelText = calTooltipYAxisData(opts.tooltip.offset.y, opts.series, opts, config, eachSpacing);
    context.setFontSize(config.fontSize);
    var textWidth = measureText(labelText, config.fontSize);
    var bgStartX = opts.padding[3] + config.yAxisTitleWidth - config.toolTipPadding;
    var bgEndX = Math.max(opts.area[3], textWidth + config.toolTipPadding * 2);
    var bgWidth = bgEndX - bgStartX;

    var textX = bgStartX + (bgWidth - textWidth) / 2;
    var textY = opts.tooltip.offset.y;
    context.beginPath();
    context.setFillStyle(hexToRgb(toolTipOption.labelBgColor || config.toolTipBackground, toolTipOption.labelBgOpacity || config.toolTipOpacity));
    context.setStrokeStyle(toolTipOption.labelBgColor || config.toolTipBackground);
    context.setLineWidth(1 * opts.pixelRatio);
    context.rect(bgStartX, textY - 0.5 * config.fontSize - config.toolTipPadding, bgWidth, config.fontSize + 2 * config.toolTipPadding);
    context.closePath();
    context.stroke();
    context.fill();

    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(toolTipOption.labelFontColor || config.fontColor);
    context.fillText(labelText, textX, textY + 0.5 * config.fontSize);
    context.closePath();
    context.stroke();
  }
}

function drawToolTipSplitArea(offsetX, opts, config, context, eachSpacing) {
  var toolTipOption = assign({}, {
    activeBgColor: '#000000',
    activeBgOpacity: 0.08 },
  opts.extra.tooltip);
  var startY = opts.area[0];
  var endY = opts.height - opts.area[2];
  context.beginPath();
  context.setFillStyle(hexToRgb(toolTipOption.activeBgColor, toolTipOption.activeBgOpacity));
  context.rect(offsetX - eachSpacing / 2, startY, eachSpacing, endY - startY);
  context.closePath();
  context.fill();
}

function drawToolTip(textList, offset, opts, config, context, eachSpacing, xAxisPoints) {
  var toolTipOption = assign({}, {
    bgColor: '#000000',
    bgOpacity: 0.7,
    fontColor: '#FFFFFF' },
  opts.extra.tooltip);
  var legendWidth = 4 * opts.pixelRatio;
  var legendMarginRight = 5 * opts.pixelRatio;
  var arrowWidth = 8 * opts.pixelRatio;
  var isOverRightBorder = false;
  if (opts.type == 'line' || opts.type == 'area' || opts.type == 'candle' || opts.type == 'mix') {
    drawToolTipSplitLine(opts.tooltip.offset.x, opts, config, context);
  }

  offset = assign({
    x: 0,
    y: 0 },
  offset);
  offset.y -= 8 * opts.pixelRatio;
  var textWidth = textList.map(function (item) {
    return measureText(item.text, config.fontSize);
  });
  var toolTipWidth = legendWidth + legendMarginRight + 4 * config.toolTipPadding + Math.max.apply(null, textWidth);
  var toolTipHeight = 2 * config.toolTipPadding + textList.length * config.toolTipLineHeight;

  // if beyond the right border
  if (offset.x - Math.abs(opts._scrollDistance_) + arrowWidth + toolTipWidth > opts.width) {
    isOverRightBorder = true;
  }
  if (toolTipHeight + offset.y > opts.height) {
    offset.y = opts.height - toolTipHeight;
  }
  // draw background rect
  context.beginPath();
  context.setFillStyle(hexToRgb(toolTipOption.bgColor || config.toolTipBackground, toolTipOption.bgOpacity || config.toolTipOpacity));
  if (isOverRightBorder) {
    context.moveTo(offset.x, offset.y + 10 * opts.pixelRatio);
    context.lineTo(offset.x - arrowWidth, offset.y + 10 * opts.pixelRatio - 5 * opts.pixelRatio);
    context.lineTo(offset.x - arrowWidth, offset.y);
    context.lineTo(offset.x - arrowWidth - Math.round(toolTipWidth), offset.y);
    context.lineTo(offset.x - arrowWidth - Math.round(toolTipWidth), offset.y + toolTipHeight);
    context.lineTo(offset.x - arrowWidth, offset.y + toolTipHeight);
    context.lineTo(offset.x - arrowWidth, offset.y + 10 * opts.pixelRatio + 5 * opts.pixelRatio);
    context.lineTo(offset.x, offset.y + 10 * opts.pixelRatio);
  } else {
    context.moveTo(offset.x, offset.y + 10 * opts.pixelRatio);
    context.lineTo(offset.x + arrowWidth, offset.y + 10 * opts.pixelRatio - 5 * opts.pixelRatio);
    context.lineTo(offset.x + arrowWidth, offset.y);
    context.lineTo(offset.x + arrowWidth + Math.round(toolTipWidth), offset.y);
    context.lineTo(offset.x + arrowWidth + Math.round(toolTipWidth), offset.y + toolTipHeight);
    context.lineTo(offset.x + arrowWidth, offset.y + toolTipHeight);
    context.lineTo(offset.x + arrowWidth, offset.y + 10 * opts.pixelRatio + 5 * opts.pixelRatio);
    context.lineTo(offset.x, offset.y + 10 * opts.pixelRatio);
  }

  context.closePath();
  context.fill();

  // draw legend
  textList.forEach(function (item, index) {
    if (item.color !== null) {
      context.beginPath();
      context.setFillStyle(item.color);
      var startX = offset.x + arrowWidth + 2 * config.toolTipPadding;
      var startY = offset.y + (config.toolTipLineHeight - config.fontSize) / 2 + config.toolTipLineHeight * index +
      config.toolTipPadding + 1;
      if (isOverRightBorder) {
        startX = offset.x - toolTipWidth - arrowWidth + 2 * config.toolTipPadding;
      }
      context.fillRect(startX, startY, legendWidth, config.fontSize);
      context.closePath();
    }
  });

  // draw text list

  textList.forEach(function (item, index) {
    var startX = offset.x + arrowWidth + 2 * config.toolTipPadding + legendWidth + legendMarginRight;
    if (isOverRightBorder) {
      startX = offset.x - toolTipWidth - arrowWidth + 2 * config.toolTipPadding + +legendWidth + legendMarginRight;
    }
    var startY = offset.y + (config.toolTipLineHeight - config.fontSize) / 2 + config.toolTipLineHeight * index +
    config.toolTipPadding;
    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(toolTipOption.fontColor);
    context.fillText(item.text, startX, startY + config.fontSize);
    context.closePath();
    context.stroke();
  });
}

function drawYAxisTitle(title, opts, config, context) {
  var startX = config.xAxisHeight + (opts.height - config.xAxisHeight - measureText(title)) / 2;
  context.save();
  context.beginPath();
  context.setFontSize(config.fontSize);
  context.setFillStyle(opts.yAxis.titleFontColor || '#333333');
  context.translate(0, opts.height);
  context.rotate(-90 * Math.PI / 180);
  context.fillText(title, startX, opts.padding[3] + 0.5 * config.fontSize);
  context.closePath();
  context.stroke();
  context.restore();
}

function drawColumnDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var ranges = [].concat(opts.chartData.yAxisData.ranges);
  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  eachSpacing = xAxisData.eachSpacing;
  var columnOption = assign({}, {
    type: 'group',
    width: eachSpacing / 2,
    meter: {
      border: 4,
      fillColor: '#FFFFFF' } },

  opts.extra.column);
  var minRange = ranges.pop();
  var maxRange = ranges.shift();
  var calPoints = [];

  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
  }
  if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
    drawToolTipSplitArea(opts.tooltip.offset.x, opts, config, context, eachSpacing);
  }

  series.forEach(function (eachSeries, seriesIndex) {
    var data = eachSeries.data;
    switch (columnOption.type) {
      case 'group':
        var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
        var tooltipPoints = getStackDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, seriesIndex, series, process);
        calPoints.push(tooltipPoints);
        points = fixColumeData(points, eachSpacing, series.length, seriesIndex, config, opts);
        points.forEach(function (item, index) {
          if (item !== null) {
            context.beginPath();
            context.setStrokeStyle(item.color || eachSeries.color);
            context.setLineWidth(1);
            context.setFillStyle(item.color || eachSeries.color);
            var startX = item.x - item.width / 2;
            var height = opts.height - item.y - opts.area[2];
            context.moveTo(startX - 1, item.y);
            context.lineTo(startX + item.width - 2, item.y);
            context.lineTo(startX + item.width - 2, opts.height - opts.area[2]);
            context.lineTo(startX, opts.height - opts.area[2]);
            context.lineTo(startX, item.y);
            //context.rect(startX, item.y, item.width, height);
            context.closePath();
            context.stroke();
            context.fill();
          }
        });
        break;
      case 'stack':
        // 绘制堆叠数据图
        var points = getStackDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config,
        seriesIndex,
        series, process);
        calPoints.push(points);
        points = fixColumeStackData(points, eachSpacing, series.length, seriesIndex, config, opts, series);

        points.forEach(function (item, index) {
          if (item !== null) {
            context.beginPath();
            context.setFillStyle(item.color || eachSeries.color);
            var startX = item.x - item.width / 2 + 1;
            var height = opts.height - item.y - opts.area[2];
            var height0 = opts.height - item.y0 - opts.area[2];
            if (seriesIndex > 0) {
              height -= height0;
            }
            context.moveTo(startX, item.y);
            context.fillRect(startX, item.y, item.width - 2, height);
            context.closePath();
            context.fill();
          }
        });
        break;
      case 'meter':
        // 绘制温度计数据图
        var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
        calPoints.push(points);
        points = fixColumeMeterData(points, eachSpacing, series.length, seriesIndex, config, opts, columnOption.meter.
        border);
        if (seriesIndex == 0) {
          points.forEach(function (item, index) {
            if (item !== null) {
              //画背景颜色
              context.beginPath();
              context.setFillStyle(columnOption.meter.fillColor);
              var startX = item.x - item.width / 2;
              var height = opts.height - item.y - opts.area[2];
              context.moveTo(startX, item.y);
              context.fillRect(startX, item.y, item.width, height);
              context.closePath();
              context.fill();
              //画边框线
              if (columnOption.meter.border > 0) {
                context.beginPath();
                context.setStrokeStyle(eachSeries.color);
                context.setLineWidth(columnOption.meter.border * opts.pixelRatio);
                context.moveTo(startX + columnOption.meter.border * 0.5, item.y + height);
                context.lineTo(startX + columnOption.meter.border * 0.5, item.y + columnOption.meter.border * 0.5);
                context.lineTo(startX + item.width - columnOption.meter.border * 0.5, item.y + columnOption.meter.border * 0.5);
                context.lineTo(startX + item.width - columnOption.meter.border * 0.5, item.y + height);
                context.stroke();
              }
            }
          });
        } else {
          points.forEach(function (item, index) {
            if (item !== null) {
              context.beginPath();
              context.setFillStyle(item.color || eachSeries.color);
              var startX = item.x - item.width / 2;
              var height = opts.height - item.y - opts.area[2];
              context.moveTo(startX, item.y);
              context.fillRect(startX, item.y, item.width, height);
              context.closePath();
              context.fill();
            }
          });
        }
        break;}

  });

  if (opts.dataLabel !== false && process === 1) {
    series.forEach(function (eachSeries, seriesIndex) {
      var data = eachSeries.data;
      switch (columnOption.type) {
        case 'group':
          var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
          points = fixColumeData(points, eachSpacing, series.length, seriesIndex, config, opts);

          drawPointText(points, eachSeries, config, context);
          break;
        case 'stack':
          var points = getStackDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config,
          seriesIndex,
          series, process);
          drawPointText(points, eachSeries, config, context);
          break;
        case 'meter':
          var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
          drawPointText(points, eachSeries, config, context);
          break;}

    });
  }

  context.restore();

  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing,
    minRange: minRange,
    maxRange: maxRange };

}

function drawCandleDataPoints(series, seriesMA, opts, config, context) {
  var process = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
  var candleOption = assign({}, {
    color: {},
    average: {} },
  opts.extra.candle);
  candleOption.color = assign({}, {
    upLine: '#f04864',
    upFill: '#f04864',
    downLine: '#2fc25b',
    downFill: '#2fc25b' },
  candleOption.color);
  candleOption.average = assign({}, {
    show: false,
    name: [],
    day: [],
    color: config.colors },
  candleOption.average);
  opts.extra.candle = candleOption;

  var ranges = [].concat(opts.chartData.yAxisData.ranges);
  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  eachSpacing = xAxisData.eachSpacing;

  var minRange = ranges.pop();
  var maxRange = ranges.shift();
  var calPoints = [];

  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
  }
  //画均线
  if (candleOption.average.show) {
    seriesMA.forEach(function (eachSeries, seriesIndex) {
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
      //calPoints.push(points);
      var splitPointList = splitPoints(points);

      splitPointList.forEach(function (points, index) {
        context.beginPath();
        context.setStrokeStyle(eachSeries.color);
        context.setLineWidth(1);
        if (points.length === 1) {
          context.moveTo(points[0].x, points[0].y);
          context.arc(points[0].x, points[0].y, 1, 0, 2 * Math.PI);
        } else {
          context.moveTo(points[0].x, points[0].y);
          points.forEach(function (item, index) {
            if (index > 0) {
              var ctrlPoint = createCurveControlPoints(points, index - 1);
              context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y,
              item.x, item.
              y);
            }
          });
          context.moveTo(points[0].x, points[0].y);
        }
        context.closePath();
        context.stroke();
      });
    });
  }
  //画K线
  series.forEach(function (eachSeries, seriesIndex) {
    var data = eachSeries.data;
    var points = getCandleDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    calPoints.push(points);
    var splitPointList = splitPoints(points);
    splitPointList = splitPointList[0];

    splitPointList.forEach(function (points, index) {
      context.beginPath();
      //如果上涨
      if (data[index][1] - data[index][0] > 0) {
        context.setStrokeStyle(candleOption.color.upLine);
        context.setFillStyle(candleOption.color.upFill);
        context.setLineWidth(1 * opts.pixelRatio);
        context.moveTo(points[3].x, points[3].y); //顶点
        context.lineTo(points[1].x, points[1].y); //收盘中间点
        context.lineTo(points[1].x - eachSpacing / 4, points[1].y); //收盘左侧点
        context.lineTo(points[0].x - eachSpacing / 4, points[0].y); //开盘左侧点
        context.lineTo(points[0].x, points[0].y); //开盘中间点
        context.lineTo(points[2].x, points[2].y); //底点
        context.lineTo(points[0].x, points[0].y); //开盘中间点
        context.lineTo(points[0].x + eachSpacing / 4, points[0].y); //开盘右侧点
        context.lineTo(points[1].x + eachSpacing / 4, points[1].y); //收盘右侧点
        context.lineTo(points[1].x, points[1].y); //收盘中间点
        context.moveTo(points[3].x, points[3].y); //顶点
      } else {
        context.setStrokeStyle(candleOption.color.downLine);
        context.setFillStyle(candleOption.color.downFill);
        context.setLineWidth(1 * opts.pixelRatio);
        context.moveTo(points[3].x, points[3].y); //顶点
        context.lineTo(points[0].x, points[0].y); //开盘中间点
        context.lineTo(points[0].x - eachSpacing / 4, points[0].y); //开盘左侧点
        context.lineTo(points[1].x - eachSpacing / 4, points[1].y); //收盘左侧点
        context.lineTo(points[1].x, points[1].y); //收盘中间点
        context.lineTo(points[2].x, points[2].y); //底点
        context.lineTo(points[1].x, points[1].y); //收盘中间点
        context.lineTo(points[1].x + eachSpacing / 4, points[1].y); //收盘右侧点
        context.lineTo(points[0].x + eachSpacing / 4, points[0].y); //开盘右侧点
        context.lineTo(points[0].x, points[0].y); //开盘中间点
        context.moveTo(points[3].x, points[3].y); //顶点
      }
      context.closePath();
      context.fill();
      context.stroke();
    });
  });

  context.restore();

  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing,
    minRange: minRange,
    maxRange: maxRange };

}

function drawAreaDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var areaOption = assign({}, {
    type: 'straight',
    opacity: 0.2,
    addLine: false,
    width: 2 },
  opts.extra.area);

  var ranges = [].concat(opts.chartData.yAxisData.ranges);
  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  eachSpacing = xAxisData.eachSpacing;

  var minRange = ranges.pop();
  var maxRange = ranges.shift();
  var endY = opts.height - opts.area[2];
  var calPoints = [];

  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
  }

  series.forEach(function (eachSeries, seriesIndex) {
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    calPoints.push(points);

    var splitPointList = splitPoints(points);var _loop3 = function _loop3(

    i) {
      var points = splitPointList[i];
      // 绘制区域数
      context.beginPath();
      context.setStrokeStyle(hexToRgb(eachSeries.color, areaOption.opacity));
      context.setFillStyle(hexToRgb(eachSeries.color, areaOption.opacity));
      context.setLineWidth(areaOption.width * opts.pixelRatio);
      if (points.length > 1) {
        var firstPoint = points[0];
        var lastPoint = points[points.length - 1];

        context.moveTo(firstPoint.x, firstPoint.y);
        if (areaOption.type === 'curve') {
          points.forEach(function (item, index) {
            if (index > 0) {
              var ctrlPoint = createCurveControlPoints(points, index - 1);
              context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x, item.y);
            }
          });
        } else {
          points.forEach(function (item, index) {
            if (index > 0) {
              context.lineTo(item.x, item.y);
            }
          });
        }

        context.lineTo(lastPoint.x, endY);
        context.lineTo(firstPoint.x, endY);
        context.lineTo(firstPoint.x, firstPoint.y);
      } else {
        var item = points[0];
        context.moveTo(item.x - eachSpacing / 2, item.y);
        context.lineTo(item.x + eachSpacing / 2, item.y);
        context.lineTo(item.x + eachSpacing / 2, endY);
        context.lineTo(item.x - eachSpacing / 2, endY);
        context.moveTo(item.x - eachSpacing / 2, item.y);
      }
      context.closePath();
      context.fill();

      //画连线
      if (areaOption.addLine) {
        context.beginPath();
        context.setStrokeStyle(eachSeries.color);
        context.setLineWidth(areaOption.width * opts.pixelRatio);
        if (points.length === 1) {
          context.moveTo(points[0].x, points[0].y);
          context.arc(points[0].x, points[0].y, 1, 0, 2 * Math.PI);
        } else {
          context.moveTo(points[0].x, points[0].y);
          if (areaOption.type === 'curve') {
            points.forEach(function (item, index) {
              if (index > 0) {
                var ctrlPoint = createCurveControlPoints(points, index - 1);
                context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x, item.y);
              }
            });
          } else {
            points.forEach(function (item, index) {
              if (index > 0) {
                context.lineTo(item.x, item.y);
              }
            });
          }
          context.moveTo(points[0].x, points[0].y);
        }
        context.closePath();
        context.stroke();
      }};for (var i = 0; i < splitPointList.length; i++) {_loop3(i);
    }

    //画点
    if (opts.dataPointShape !== false) {
      var shape = config.dataPointShape[seriesIndex % config.dataPointShape.length];
      drawPointShape(points, eachSeries.color, shape, context, opts);
    }

  });

  if (opts.dataLabel !== false && process === 1) {
    series.forEach(function (eachSeries, seriesIndex) {
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
      drawPointText(points, eachSeries, config, context);
    });
  }

  context.restore();

  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing,
    minRange: minRange,
    maxRange: maxRange };

}

function drawLineDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var lineOption = opts.extra.line || {
    type: 'straight',
    width: 2 };

  lineOption.type = lineOption.type ? lineOption.type : 'straight';
  lineOption.width = lineOption.width ? lineOption.width : 2;

  var ranges = [].concat(opts.chartData.yAxisData.ranges);
  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  eachSpacing = xAxisData.eachSpacing;

  var minRange = ranges.pop();
  var maxRange = ranges.shift();
  var calPoints = [];

  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
  }

  series.forEach(function (eachSeries, seriesIndex) {
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    calPoints.push(points);
    var splitPointList = splitPoints(points);

    splitPointList.forEach(function (points, index) {
      context.beginPath();
      context.setStrokeStyle(eachSeries.color);
      context.setLineWidth(lineOption.width * opts.pixelRatio);
      if (points.length === 1) {
        context.moveTo(points[0].x, points[0].y);
        context.arc(points[0].x, points[0].y, 1, 0, 2 * Math.PI);
      } else {
        context.moveTo(points[0].x, points[0].y);
        if (lineOption.type === 'curve') {
          points.forEach(function (item, index) {
            if (index > 0) {
              var ctrlPoint = createCurveControlPoints(points, index - 1);
              context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y,
              item.x, item.
              y);
            }
          });
        } else {
          points.forEach(function (item, index) {
            if (index > 0) {
              context.lineTo(item.x, item.y);
            }
          });
        }
        context.moveTo(points[0].x, points[0].y);
      }
      context.closePath();
      context.stroke();
    });

    if (opts.dataPointShape !== false) {
      var shape = config.dataPointShape[seriesIndex % config.dataPointShape.length];
      drawPointShape(points, eachSeries.color, shape, context, opts);
    }
  });

  if (opts.dataLabel !== false && process === 1) {
    series.forEach(function (eachSeries, seriesIndex) {
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
      drawPointText(points, eachSeries, config, context);
    });
  }

  context.restore();

  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing,
    minRange: minRange,
    maxRange: maxRange };

}

function drawMixDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var ranges = [].concat(opts.chartData.yAxisData.ranges);
  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  eachSpacing = xAxisData.eachSpacing;

  var minRange = ranges.pop();
  var maxRange = ranges.shift();
  var endY = opts.height - opts.area[2];
  var calPoints = [];

  var columnIndex = 0;
  var columnLength = 0;
  series.forEach(function (eachSeries, seriesIndex) {
    if (eachSeries.type == 'column') {
      columnLength += 1;
    }
  });
  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
  }

  series.forEach(function (eachSeries, seriesIndex) {
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    calPoints.push(points);

    // 绘制柱状数据图
    if (eachSeries.type == 'column') {
      points = fixColumeData(points, eachSpacing, columnLength, columnIndex, config, opts);
      points.forEach(function (item, index) {
        if (item !== null) {
          context.beginPath();
          context.setStrokeStyle(item.color || eachSeries.color);
          context.setLineWidth(1);
          context.setFillStyle(item.color || eachSeries.color);
          var startX = item.x - item.width / 2;
          var height = opts.height - item.y - opts.area[2];
          context.moveTo(startX, item.y);
          context.moveTo(startX - 1, item.y);
          context.lineTo(startX + item.width - 2, item.y);
          context.lineTo(startX + item.width - 2, opts.height - opts.area[2]);
          context.lineTo(startX, opts.height - opts.area[2]);
          context.lineTo(startX, item.y);
          //context.rect(startX, item.y, item.width, height);
          context.closePath();
          context.stroke();
          context.fill();
          context.closePath();
          context.fill();
        }
      });
      columnIndex += 1;
    }

    //绘制区域图数据

    if (eachSeries.type == 'area') {
      var _splitPointList = splitPoints(points);var _loop4 = function _loop4(
      i) {
        var points = _splitPointList[i];
        // 绘制区域数据
        context.beginPath();
        context.setStrokeStyle(eachSeries.color);
        context.setFillStyle(hexToRgb(eachSeries.color, 0.2));
        context.setLineWidth(2 * opts.pixelRatio);
        if (points.length > 1) {
          firstPoint = points[0];
          var lastPoint = points[points.length - 1];
          context.moveTo(firstPoint.x, firstPoint.y);
          if (eachSeries.style === 'curve') {
            points.forEach(function (item, index) {
              if (index > 0) {
                var ctrlPoint = createCurveControlPoints(points, index - 1);
                context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x, item.y);
              }
            });
          } else {
            points.forEach(function (item, index) {
              if (index > 0) {
                context.lineTo(item.x, item.y);
              }
            });
          }
          context.lineTo(lastPoint.x, endY);
          context.lineTo(firstPoint.x, endY);
          context.lineTo(firstPoint.x, firstPoint.y);
        } else {
          var item = points[0];
          context.moveTo(item.x - eachSpacing / 2, item.y);
          context.lineTo(item.x + eachSpacing / 2, item.y);
          context.lineTo(item.x + eachSpacing / 2, endY);
          context.lineTo(item.x - eachSpacing / 2, endY);
          context.moveTo(item.x - eachSpacing / 2, item.y);
        }
        context.closePath();
        context.fill();};for (var i = 0; i < _splitPointList.length; i++) {var firstPoint;_loop4(i);
      }
    }

    // 绘制折线数据图
    if (eachSeries.type == 'line') {
      var splitPointList = splitPoints(points);
      splitPointList.forEach(function (points, index) {
        context.beginPath();
        context.setStrokeStyle(eachSeries.color);
        context.setLineWidth(2 * opts.pixelRatio);
        if (points.length === 1) {
          context.moveTo(points[0].x, points[0].y);
          context.arc(points[0].x, points[0].y, 1, 0, 2 * Math.PI);
        } else {
          context.moveTo(points[0].x, points[0].y);
          if (eachSeries.style == 'curve') {
            points.forEach(function (item, index) {
              if (index > 0) {
                var ctrlPoint = createCurveControlPoints(points, index - 1);
                context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y,
                item.x,
                item.y);
              }
            });
          } else {
            points.forEach(function (item, index) {
              if (index > 0) {
                context.lineTo(item.x, item.y);
              }
            });
          }
          context.moveTo(points[0].x, points[0].y);
        }
        context.closePath();
        context.stroke();
      });
    }

    // 绘制点数据图
    if (eachSeries.type == 'point') {
      points.forEach(function (pointsa, index) {
        if (pointsa) {
          context.beginPath();
          context.setFillStyle(eachSeries.color);
          context.setStrokeStyle('#FFFFFF');
          context.setLineWidth(1 * opts.pixelRatio);
          context.moveTo(pointsa.x + 3.5 * opts.pixelRatio, pointsa.y);
          context.arc(pointsa.x, pointsa.y, 4 * opts.pixelRatio, 0, 2 * Math.PI);
          context.closePath();
          context.fill();
          context.stroke();
        }
      });
    }

    if (eachSeries.addPoint == true && eachSeries.type !== 'column') {
      var shape = config.dataPointShape[seriesIndex % config.dataPointShape.length];
      drawPointShape(points, eachSeries.color, shape, context, opts);
    }
  });
  if (opts.dataLabel !== false && process === 1) {
    var columnIndex = 0;
    series.forEach(function (eachSeries, seriesIndex) {
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
      if (eachSeries.type !== 'column') {
        drawPointText(points, eachSeries, config, context);
      } else {
        points = fixColumeData(points, eachSpacing, columnLength, columnIndex, config, opts);
        drawPointText(points, eachSeries, config, context);
        columnIndex += 1;
      }

    });
  }

  context.restore();

  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing,
    minRange: minRange,
    maxRange: maxRange };

}

function drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints) {
  var toolTipOption = opts.extra.tooltip || {};
  if (toolTipOption.horizentalLine && opts.tooltip && process === 1 && (opts.type == 'line' || opts.type == 'area' || opts.type == 'column' || opts.type == 'candle' || opts.type == 'mix')) {
    drawToolTipHorizentalLine(opts, config, context, eachSpacing, xAxisPoints);
  }
  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
  }
  if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
    drawToolTip(opts.tooltip.textList, opts.tooltip.offset, opts, config, context, eachSpacing, xAxisPoints);
  }
  context.restore();

}

function drawXAxis(categories, opts, config, context) {

  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  startX = xAxisData.startX,
  endX = xAxisData.endX,
  eachSpacing = xAxisData.eachSpacing;
  var boundaryGap = 'center';
  if (opts.type == 'line' || opts.type == 'area') {
    boundaryGap = opts.xAxis.boundaryGap;
  }
  var startY = opts.height - opts.area[2];
  var endY = opts.area[0];

  //绘制滚动条
  if (opts.enableScroll && opts.xAxis.scrollShow) {
    var scrollY = opts.height - opts.area[2] + config.xAxisHeight;
    var scrollScreenWidth = endX - startX;
    var scrollTotalWidth = eachSpacing * (xAxisPoints.length - 1);
    var scrollWidth = scrollScreenWidth * scrollScreenWidth / scrollTotalWidth;
    var scrollLeft = 0;
    if (opts._scrollDistance_) {
      scrollLeft = -opts._scrollDistance_ * scrollScreenWidth / scrollTotalWidth;
    }
    context.beginPath();
    context.setLineCap('round');
    context.setLineWidth(6 * opts.pixelRatio);
    context.setStrokeStyle(opts.xAxis.scrollBackgroundColor || "#EFEBEF");
    context.moveTo(startX, scrollY);
    context.lineTo(endX, scrollY);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.setLineCap('round');
    context.setLineWidth(6 * opts.pixelRatio);
    context.setStrokeStyle(opts.xAxis.scrollColor || "#A6A6A6");
    context.moveTo(startX + scrollLeft, scrollY);
    context.lineTo(startX + scrollLeft + scrollWidth, scrollY);
    context.stroke();
    context.closePath();
    context.setLineCap('butt');
  }

  context.save();

  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0) {
    context.translate(opts._scrollDistance_, 0);
  }


  if (opts.xAxis.disableGrid !== true) {
    context.setStrokeStyle(opts.xAxis.gridColor || "#cccccc");
    context.setLineCap('butt');
    context.setLineWidth(1 * opts.pixelRatio);
    if (opts.xAxis.gridType == 'dash') {
      context.setLineDash([opts.xAxis.dashLength, opts.xAxis.dashLength]);
    }
    if (opts.xAxis.type === 'calibration') {
      xAxisPoints.forEach(function (item, index) {
        if (index > 0) {
          context.beginPath();
          context.moveTo(item - eachSpacing / 2, startY);
          context.lineTo(item - eachSpacing / 2, startY + 4 * opts.pixelRatio);
          context.closePath();
          context.stroke();
        }
      });
    } else {
      opts.xAxis.gridEval = opts.xAxis.gridEval || 1;
      xAxisPoints.forEach(function (item, index) {
        if (index % opts.xAxis.gridEval == 0) {
          context.beginPath();
          context.moveTo(item, startY);
          context.lineTo(item, endY);
          context.stroke();
        }
      });
    }
    context.setLineDash([]);
  }


  //不绘制X轴
  if (opts.xAxis.disabled !== true) {
    // 对X轴列表做抽稀处理
    var validWidth = opts.width - opts.padding[1] - opts.padding[3] - config.yAxisWidth - config.yAxisTitleWidth;
    //默认全部显示X轴标签
    var maxXAxisListLength = categories.length;
    //如果设置了X轴单屏数量
    if (opts.xAxis.labelCount) {
      //如果设置X轴密度
      if (opts.xAxis.itemCount) {
        maxXAxisListLength = Math.ceil(categories.length / opts.xAxis.itemCount * opts.xAxis.labelCount);
      } else {
        maxXAxisListLength = opts.xAxis.labelCount;
      }
      maxXAxisListLength -= 1;
    }

    var ratio = Math.ceil(categories.length / maxXAxisListLength);

    var newCategories = [];
    var cgLength = categories.length;
    for (var i = 0; i < cgLength; i++) {
      if (i % ratio !== 0) {
        newCategories.push("");
      } else {
        newCategories.push(categories[i]);
      }
    }
    newCategories[cgLength - 1] = categories[cgLength - 1];

    var xAxisFontSize = opts.xAxis.fontSize || config.fontSize;
    if (config._xAxisTextAngle_ === 0) {
      newCategories.forEach(function (item, index) {
        var offset = -measureText(item, xAxisFontSize) / 2;
        if (boundaryGap == 'center') {
          offset += eachSpacing / 2;
        }
        context.beginPath();
        context.setFontSize(xAxisFontSize);
        context.setFillStyle(opts.xAxis.fontColor || '#666666');
        context.fillText(item, xAxisPoints[index] + offset, startY + xAxisFontSize + (config.xAxisHeight - xAxisFontSize) / 2);
        context.closePath();
        context.stroke();
      });

    } else {
      newCategories.forEach(function (item, index) {
        context.save();
        context.beginPath();
        context.setFontSize(xAxisFontSize);
        context.setFillStyle(opts.xAxis.fontColor || '#666666');
        var textWidth = measureText(item);
        var offset = -textWidth;
        if (boundaryGap == 'center') {
          offset += eachSpacing / 2;
        }
        var _calRotateTranslate = calRotateTranslate(xAxisPoints[index] + eachSpacing / 2, startY + xAxisFontSize / 2 + 5, opts.height),
        transX = _calRotateTranslate.transX,
        transY = _calRotateTranslate.transY;

        context.rotate(-1 * config._xAxisTextAngle_);
        context.translate(transX, transY);
        context.fillText(item, xAxisPoints[index] + offset, startY + xAxisFontSize + 5);
        context.closePath();
        context.stroke();
        context.restore();
      });
    }
  }
  context.restore();

}

function drawYAxisGrid(categories, opts, config, context) {
  if (opts.yAxis.disableGrid === true) {
    return;
  }
  var spacingValid = opts.height - opts.area[0] - opts.area[2];
  var eachSpacing = spacingValid / config.yAxisSplit;
  var startX = opts.area[3];
  var xAxisPoints = opts.chartData.xAxisData.xAxisPoints,
  xAxiseachSpacing = opts.chartData.xAxisData.eachSpacing;
  var TotalWidth = xAxiseachSpacing * (xAxisPoints.length - 1);
  var endX = startX + TotalWidth;

  var points = [];
  for (var i = 0; i < config.yAxisSplit + 1; i++) {
    points.push(opts.height - opts.area[2] - eachSpacing * i);
  }

  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0) {
    context.translate(opts._scrollDistance_, 0);
  }

  if (opts.yAxis.gridType == 'dash') {
    context.setLineDash([opts.yAxis.dashLength, opts.yAxis.dashLength]);
  }
  context.setStrokeStyle(opts.yAxis.gridColor || "#cccccc");
  context.setLineWidth(1 * opts.pixelRatio);
  points.forEach(function (item, index) {
    context.beginPath();
    context.moveTo(startX, item);
    context.lineTo(endX, item);
    context.stroke();
  });
  context.setLineDash([]);

  context.restore();
}

function drawYAxis(series, opts, config, context) {
  if (opts.yAxis.disabled === true) {
    return;
  }
  var rangesFormat = opts.chartData.yAxisData.rangesFormat;
  var spacingValid = opts.height - opts.area[0] - opts.area[2];
  var eachSpacing = Math.floor(spacingValid / config.yAxisSplit);
  var startX = opts.area[3];
  var endX = opts.width - opts.area[1];
  var endY = opts.height - opts.area[2];
  var fillEndY = endY + config.xAxisHeight;
  if (opts.xAxis.scrollShow) {
    fillEndY -= 3 * opts.pixelRatio;
  }
  // set YAxis background
  context.beginPath();
  context.setFillStyle(opts.background || '#ffffff');
  if (opts._scrollDistance_ < 0) {
    context.fillRect(0, 0, startX, fillEndY);
  }
  if (opts.enableScroll == true) {
    context.fillRect(endX, 0, opts.width, fillEndY);
  }
  context.closePath();
  context.stroke();

  var points = [];
  for (var i = 0; i <= config.yAxisSplit; i++) {
    points.push(opts.area[0] + eachSpacing * i);
  }

  var yAxisFontSize = opts.yAxis.fontSize || config.fontSize;
  rangesFormat.forEach(function (item, index) {
    var pos = points[index] ? points[index] : endY;
    context.beginPath();
    context.setFontSize(yAxisFontSize);
    context.setFillStyle(opts.yAxis.fontColor || '#666666');
    context.fillText(String(item), opts.area[3] - config.yAxisWidth, pos + yAxisFontSize / 2);
    context.closePath();
    context.stroke();
  });

  if (opts.yAxis.title) {
    drawYAxisTitle(opts.yAxis.title, opts, config, context);
  }
}

function drawLegend(series, opts, config, context, chartData) {
  if (opts.legend.show === false) {
    return;
  }
  var legendData = chartData.legendData;
  var legendList = legendData.points;
  var legendArea = legendData.area;
  var padding = opts.legend.padding;
  var fontSize = opts.legend.fontSize;
  var shapeWidth = 15 * opts.pixelRatio;
  var shapeRight = 5 * opts.pixelRatio;
  var itemGap = opts.legend.itemGap;
  var lineHeight = Math.max(opts.legend.lineHeight * opts.pixelRatio, fontSize);

  //画背景及边框
  context.beginPath();
  context.setLineWidth(opts.legend.borderWidth);
  context.setStrokeStyle(opts.legend.borderColor);
  context.setFillStyle(opts.legend.backgroundColor);
  context.moveTo(legendArea.start.x, legendArea.start.y);
  context.rect(legendArea.start.x, legendArea.start.y, legendArea.width, legendArea.height);
  context.closePath();
  context.fill();
  context.stroke();

  legendList.forEach(function (itemList, listIndex) {
    var width = 0;
    var height = 0;
    width = legendData.widthArr[listIndex];
    height = legendData.heightArr[listIndex];
    var startX = 0;
    var startY = 0;
    if (opts.legend.position == 'top' || opts.legend.position == 'bottom') {
      startX = legendArea.start.x + (legendArea.width - width) / 2;
      startY = legendArea.start.y + padding + listIndex * lineHeight;
    } else {
      if (listIndex == 0) {
        width = 0;
      } else {
        width = legendData.widthArr[listIndex - 1];
      }
      startX = legendArea.start.x + padding + width;
      startY = legendArea.start.y + padding + (legendArea.height - height) / 2;
    }

    context.setFontSize(config.fontSize);
    for (var i = 0; i < itemList.length; i++) {
      var item = itemList[i];
      item.area = [0, 0, 0, 0];
      item.area[0] = startX;
      item.area[1] = startY;
      item.area[3] = startY + lineHeight;
      context.beginPath();
      context.setLineWidth(1 * opts.pixelRatio);
      context.setStrokeStyle(item.show ? item.color : opts.legend.hiddenColor);
      context.setFillStyle(item.show ? item.color : opts.legend.hiddenColor);
      switch (item.legendShape) {
        case 'line':
          context.moveTo(startX, startY + 0.5 * lineHeight - 2 * opts.pixelRatio);
          context.fillRect(startX, startY + 0.5 * lineHeight - 2 * opts.pixelRatio, 15 * opts.pixelRatio, 4 * opts.pixelRatio);
          break;
        case 'triangle':
          context.moveTo(startX + 7.5 * opts.pixelRatio, startY + 0.5 * lineHeight - 5 * opts.pixelRatio);
          context.lineTo(startX + 2.5 * opts.pixelRatio, startY + 0.5 * lineHeight + 5 * opts.pixelRatio);
          context.lineTo(startX + 12.5 * opts.pixelRatio, startY + 0.5 * lineHeight + 5 * opts.pixelRatio);
          context.lineTo(startX + 7.5 * opts.pixelRatio, startY + 0.5 * lineHeight - 5 * opts.pixelRatio);
          break;
        case 'diamond':
          context.moveTo(startX + 7.5 * opts.pixelRatio, startY + 0.5 * lineHeight - 5 * opts.pixelRatio);
          context.lineTo(startX + 2.5 * opts.pixelRatio, startY + 0.5 * lineHeight);
          context.lineTo(startX + 7.5 * opts.pixelRatio, startY + 0.5 * lineHeight + 5 * opts.pixelRatio);
          context.lineTo(startX + 12.5 * opts.pixelRatio, startY + 0.5 * lineHeight);
          context.lineTo(startX + 7.5 * opts.pixelRatio, startY + 0.5 * lineHeight - 5 * opts.pixelRatio);
          break;
        case 'circle':
          context.moveTo(startX + 7.5 * opts.pixelRatio, startY + 0.5 * lineHeight);
          context.arc(startX + 7.5 * opts.pixelRatio, startY + 0.5 * lineHeight, 5 * opts.pixelRatio, 0, 2 * Math.PI);
          break;
        case 'rect':
          context.moveTo(startX, startY + 0.5 * lineHeight - 5 * opts.pixelRatio);
          context.fillRect(startX, startY + 0.5 * lineHeight - 5 * opts.pixelRatio, 15 * opts.pixelRatio, 10 * opts.pixelRatio);
          break;
        default:
          context.moveTo(startX, startY + 0.5 * lineHeight - 5 * opts.pixelRatio);
          context.fillRect(startX, startY + 0.5 * lineHeight - 5 * opts.pixelRatio, 15 * opts.pixelRatio, 10 * opts.pixelRatio);}

      context.closePath();
      context.fill();
      context.stroke();

      startX += shapeWidth + shapeRight;
      var fontTrans = 0.5 * lineHeight + 0.5 * fontSize - 2;
      context.beginPath();
      context.setFontSize(fontSize);
      context.setFillStyle(item.show ? opts.legend.fontColor : opts.legend.hiddenColor);
      context.fillText(item.name, startX, startY + fontTrans);
      context.closePath();
      context.stroke();
      if (opts.legend.position == 'top' || opts.legend.position == 'bottom') {
        startX += measureText(item.name, fontSize) + itemGap;
        item.area[2] = startX;
      } else {
        item.area[2] = startX + measureText(item.name, fontSize) + itemGap;;
        startX -= shapeWidth + shapeRight;
        startY += lineHeight;
      }
    }
  });
}

function drawPieDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var pieOption = assign({}, {
    activeOpacity: 0.5,
    activeRadius: 10 * opts.pixelRatio,
    offsetAngle: 0,
    labelWidth: 15 * opts.pixelRatio,
    ringWidth: 0,
    border: false,
    borderWidth: 2,
    borderColor: '#FFFFFF' },
  opts.extra.pie);
  var centerPosition = {
    x: opts.area[3] + (opts.width - opts.area[1] - opts.area[3]) / 2,
    y: opts.area[0] + (opts.height - opts.area[0] - opts.area[2]) / 2 };

  if (config.pieChartLinePadding == 0) {
    config.pieChartLinePadding = pieOption.activeRadius;
  }

  var radius = Math.min((opts.width - opts.area[1] - opts.area[3]) / 2 - config.pieChartLinePadding - config.pieChartTextPadding - config._pieTextMaxLength_, (opts.height - opts.area[0] - opts.area[2]) / 2 - config.pieChartLinePadding - config.pieChartTextPadding);

  series = getPieDataPoints(series, radius, process);

  var activeRadius = pieOption.activeRadius;

  series = series.map(function (eachSeries) {
    eachSeries._start_ += pieOption.offsetAngle * Math.PI / 180;
    return eachSeries;
  });
  series.forEach(function (eachSeries, seriesIndex) {
    if (opts.tooltip) {
      if (opts.tooltip.index == seriesIndex) {
        context.beginPath();
        context.setFillStyle(hexToRgb(eachSeries.color, opts.extra.pie.activeOpacity || 0.5));
        context.moveTo(centerPosition.x, centerPosition.y);
        context.arc(centerPosition.x, centerPosition.y, eachSeries._radius_ + activeRadius, eachSeries._start_,
        eachSeries._start_ + 2 *
        eachSeries._proportion_ * Math.PI);
        context.closePath();
        context.fill();
      }
    }
    context.beginPath();
    context.setLineWidth(pieOption.borderWidth * opts.pixelRatio);
    context.lineJoin = "round";
    context.setStrokeStyle(pieOption.borderColor);
    context.setFillStyle(eachSeries.color);
    context.moveTo(centerPosition.x, centerPosition.y);
    context.arc(centerPosition.x, centerPosition.y, eachSeries._radius_, eachSeries._start_, eachSeries._start_ + 2 * eachSeries._proportion_ * Math.PI);
    context.closePath();
    context.fill();
    if (pieOption.border == true) {
      context.stroke();
    }
  });

  if (opts.type === 'ring') {
    var innerPieWidth = radius * 0.6;
    if (typeof opts.extra.pie.ringWidth === 'number' && opts.extra.pie.ringWidth > 0) {
      innerPieWidth = Math.max(0, radius - opts.extra.pie.ringWidth);
    }
    context.beginPath();
    context.setFillStyle(opts.background || '#ffffff');
    context.moveTo(centerPosition.x, centerPosition.y);
    context.arc(centerPosition.x, centerPosition.y, innerPieWidth, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
  }

  if (opts.dataLabel !== false && process === 1) {
    var valid = false;
    for (var i = 0, len = series.length; i < len; i++) {
      if (series[i].data > 0) {
        valid = true;
        break;
      }
    }

    if (valid) {
      drawPieText(series, opts, config, context, radius, centerPosition);
    }
  }

  if (process === 1 && opts.type === 'ring') {
    drawRingTitle(opts, config, context, centerPosition);
  }

  return {
    center: centerPosition,
    radius: radius,
    series: series };

}

function drawRoseDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var roseOption = assign({}, {
    type: 'area',
    activeOpacity: 0.5,
    activeRadius: 10 * opts.pixelRatio,
    offsetAngle: 0,
    labelWidth: 15 * opts.pixelRatio,
    border: false,
    borderWidth: 2,
    borderColor: '#FFFFFF' },
  opts.extra.rose);
  if (config.pieChartLinePadding == 0) {
    config.pieChartLinePadding = roseOption.activeRadius;
  }
  var centerPosition = {
    x: opts.area[3] + (opts.width - opts.area[1] - opts.area[3]) / 2,
    y: opts.area[0] + (opts.height - opts.area[0] - opts.area[2]) / 2 };

  var radius = Math.min((opts.width - opts.area[1] - opts.area[3]) / 2 - config.pieChartLinePadding - config.pieChartTextPadding - config._pieTextMaxLength_, (opts.height - opts.area[0] - opts.area[2]) / 2 - config.pieChartLinePadding - config.pieChartTextPadding);
  var minRadius = roseOption.minRadius || radius * 0.5;

  series = getRoseDataPoints(series, roseOption.type, minRadius, radius, process);

  var activeRadius = roseOption.activeRadius;

  series = series.map(function (eachSeries) {
    eachSeries._start_ += (roseOption.offsetAngle || 0) * Math.PI / 180;
    return eachSeries;
  });

  series.forEach(function (eachSeries, seriesIndex) {
    if (opts.tooltip) {
      if (opts.tooltip.index == seriesIndex) {
        context.beginPath();
        context.setFillStyle(hexToRgb(eachSeries.color, roseOption.activeOpacity || 0.5));
        context.moveTo(centerPosition.x, centerPosition.y);
        context.arc(centerPosition.x, centerPosition.y, activeRadius + eachSeries._radius_, eachSeries._start_,
        eachSeries._start_ + 2 * eachSeries._rose_proportion_ * Math.PI);
        context.closePath();
        context.fill();
      }
    }
    context.beginPath();
    context.setLineWidth(roseOption.borderWidth * opts.pixelRatio);
    context.lineJoin = "round";
    context.setStrokeStyle(roseOption.borderColor);
    context.setFillStyle(eachSeries.color);
    context.moveTo(centerPosition.x, centerPosition.y);
    context.arc(centerPosition.x, centerPosition.y, eachSeries._radius_, eachSeries._start_, eachSeries._start_ + 2 *
    eachSeries._rose_proportion_ * Math.PI);
    context.closePath();
    context.fill();
    if (roseOption.border == true) {
      context.stroke();
    }
  });

  if (opts.dataLabel !== false && process === 1) {
    var valid = false;
    for (var i = 0, len = series.length; i < len; i++) {
      if (series[i].data > 0) {
        valid = true;
        break;
      }
    }

    if (valid) {
      drawPieText(series, opts, config, context, radius, centerPosition);
    }
  }

  return {
    center: centerPosition,
    radius: radius,
    series: series };

}

function drawArcbarDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var arcbarOption = assign({}, {
    startAngle: 0.75,
    endAngle: 0.25,
    type: 'default',
    width: 12 * opts.pixelRatio },
  opts.extra.arcbar);

  series = getArcbarDataPoints(series, arcbarOption, process);
  var centerPosition = {
    x: opts.width / 2,
    y: opts.height / 2 };

  var radius = Math.min(centerPosition.x, centerPosition.y);
  radius -= 5 * opts.pixelRatio;
  radius -= arcbarOption.width / 2;

  //背景颜色
  context.setLineWidth(arcbarOption.width * 0.5); //设置未完成的宽度
  context.setStrokeStyle(arcbarOption.backgroundColor || 'rgba(255,255,255,0.3)');
  context.setLineCap('round');
  context.beginPath();
  if (arcbarOption.type == 'default') {
    context.arc(centerPosition.x, centerPosition.y, radius, arcbarOption.startAngle * Math.PI, arcbarOption.endAngle *
    Math.PI, false);
  } else {
    context.arc(centerPosition.x, centerPosition.y, radius, 0, 2 * Math.PI, false);
  }
  context.stroke();

  // context.beginPath();
  // context.arc(10,50,10,0,360,false);
  // context.fillStyle="red";//填充颜色,默认是黑色
  // context.fill();//画实心圆
  // context.closePath();

  // 进度部分
  for (var i = 0; i < series.length; i++) {
    var eachSeries = series[i];
    context.setLineWidth(arcbarOption.width);
    context.setStrokeStyle(eachSeries.color);
    context.setLineCap('round');
    context.beginPath();
    context.arc(centerPosition.x, centerPosition.y, radius, arcbarOption.startAngle * Math.PI, eachSeries._proportion_ *
    Math.PI, false);
    context.stroke();
  }

  drawRingTitle(opts, config, context, centerPosition);

  return {
    center: centerPosition,
    radius: radius,
    series: series };

}

function drawGaugeDataPoints(categories, series, opts, config, context) {
  var process = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
  var gaugeOption = assign({}, {
    startAngle: 0.75,
    endAngle: 0.25,
    width: 15,
    splitLine: {
      fixRadius: 0,
      splitNumber: 10,
      width: 15,
      color: '#FFFFFF',
      childNumber: 5,
      childWidth: 5 },

    pointer: {
      width: 15,
      color: 'auto' } },

  opts.extra.gauge);

  if (gaugeOption.oldAngle == undefined) {
    gaugeOption.oldAngle = gaugeOption.startAngle;
  }
  if (gaugeOption.oldData == undefined) {
    gaugeOption.oldData = 0;
  }
  categories = getGaugeAxisPoints(categories, gaugeOption.startAngle, gaugeOption.endAngle);

  var centerPosition = {
    x: opts.width / 2,
    y: opts.height / 2 };

  var radius = Math.min(centerPosition.x, centerPosition.y);
  radius -= 5 * opts.pixelRatio;
  radius -= gaugeOption.width / 2;
  var innerRadius = radius - gaugeOption.width;

  //画背景
  context.setLineWidth(gaugeOption.width);
  context.setLineCap('butt');
  for (var i = 0; i < categories.length; i++) {
    var eachCategories = categories[i];
    context.beginPath();
    context.setStrokeStyle(eachCategories.color);
    context.arc(centerPosition.x, centerPosition.y, radius, eachCategories._startAngle_ * Math.PI, eachCategories._endAngle_ *
    Math.PI, false);
    context.stroke();
  }
  context.save();

  //画刻度线
  var totalAngle = gaugeOption.startAngle - gaugeOption.endAngle + 1;
  var splitAngle = totalAngle / gaugeOption.splitLine.splitNumber;
  var childAngle = totalAngle / gaugeOption.splitLine.splitNumber / gaugeOption.splitLine.childNumber;
  var startX = -radius - gaugeOption.width * 0.5 - gaugeOption.splitLine.fixRadius;
  var endX = -radius - gaugeOption.width * 0.5 - gaugeOption.splitLine.fixRadius + gaugeOption.splitLine.width;
  var childendX = -radius - gaugeOption.width * 0.5 - gaugeOption.splitLine.fixRadius + gaugeOption.splitLine.childWidth;

  context.translate(centerPosition.x, centerPosition.y);
  context.rotate((gaugeOption.startAngle - 1) * Math.PI);

  for (var _i12 = 0; _i12 < gaugeOption.splitLine.splitNumber + 1; _i12++) {
    context.beginPath();
    context.setStrokeStyle(gaugeOption.splitLine.color);
    context.setLineWidth(2 * opts.pixelRatio);
    context.moveTo(startX, 0);
    context.lineTo(endX, 0);
    context.stroke();
    context.rotate(splitAngle * Math.PI);
  }
  context.restore();

  context.save();
  context.translate(centerPosition.x, centerPosition.y);
  context.rotate((gaugeOption.startAngle - 1) * Math.PI);

  for (var _i13 = 0; _i13 < gaugeOption.splitLine.splitNumber * gaugeOption.splitLine.childNumber + 1; _i13++) {
    context.beginPath();
    context.setStrokeStyle(gaugeOption.splitLine.color);
    context.setLineWidth(1 * opts.pixelRatio);
    context.moveTo(startX, 0);
    context.lineTo(childendX, 0);
    context.stroke();
    context.rotate(childAngle * Math.PI);
  }
  context.restore();

  //画指针
  series = getGaugeDataPoints(series, categories, gaugeOption, process);

  for (var _i14 = 0; _i14 < series.length; _i14++) {
    var eachSeries = series[_i14];
    context.save();
    context.translate(centerPosition.x, centerPosition.y);
    context.rotate((eachSeries._proportion_ - 1) * Math.PI);
    context.beginPath();
    context.setFillStyle(eachSeries.color);
    context.moveTo(gaugeOption.pointer.width, 0);
    context.lineTo(0, -gaugeOption.pointer.width / 2);
    context.lineTo(-innerRadius, 0);
    context.lineTo(0, gaugeOption.pointer.width / 2);
    context.lineTo(gaugeOption.pointer.width, 0);
    context.closePath();
    context.fill();
    context.beginPath();
    context.setFillStyle('#FFFFFF');
    context.arc(0, 0, gaugeOption.pointer.width / 6, 0, 2 * Math.PI, false);
    context.fill();
    context.restore();
  }

  if (opts.dataLabel !== false) {
    drawGaugeLabel(gaugeOption, radius, centerPosition, opts, config, context);
  }

  drawRingTitle(opts, config, context, centerPosition);

  if (process === 1 && opts.type === 'gauge') {
    opts.extra.gauge.oldAngle = series[0]._proportion_;
    opts.extra.gauge.oldData = series[0].data;
  }
  return {
    center: centerPosition,
    radius: radius,
    innerRadius: innerRadius,
    categories: categories,
    totalAngle: totalAngle };

}

function drawRadarDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var radarOption = assign({}, {
    gridColor: '#cccccc',
    labelColor: '#666666',
    opacity: 0.2 },
  opts.extra.radar);

  var coordinateAngle = getRadarCoordinateSeries(opts.categories.length);

  var centerPosition = {
    x: opts.area[3] + (opts.width - opts.area[1] - opts.area[3]) / 2,
    y: opts.area[0] + (opts.height - opts.area[0] - opts.area[2]) / 2 };


  var radius = Math.min(centerPosition.x - (getMaxTextListLength(opts.categories) + config.radarLabelTextMargin),
  centerPosition.y - config.radarLabelTextMargin);
  //TODO逻辑不对
  radius -= opts.padding[1];

  // draw grid
  context.beginPath();
  context.setLineWidth(1 * opts.pixelRatio);
  context.setStrokeStyle(radarOption.gridColor);
  coordinateAngle.forEach(function (angle) {
    var pos = convertCoordinateOrigin(radius * Math.cos(angle), radius * Math.sin(angle), centerPosition);
    context.moveTo(centerPosition.x, centerPosition.y);
    context.lineTo(pos.x, pos.y);
  });
  context.stroke();
  context.closePath();
  // draw split line grid

  var _loop = function _loop(i) {
    var startPos = {};
    context.beginPath();
    context.setLineWidth(1 * opts.pixelRatio);
    context.setStrokeStyle(radarOption.gridColor);
    coordinateAngle.forEach(function (angle, index) {
      var pos = convertCoordinateOrigin(radius / config.radarGridCount * i * Math.cos(angle), radius / config.radarGridCount *
      i * Math.sin(angle), centerPosition);
      if (index === 0) {
        startPos = pos;
        context.moveTo(pos.x, pos.y);
      } else {
        context.lineTo(pos.x, pos.y);
      }
    });
    context.lineTo(startPos.x, startPos.y);
    context.stroke();
    context.closePath();
  };

  for (var i = 1; i <= config.radarGridCount; i++) {
    _loop(i);
  }

  var radarDataPoints = getRadarDataPoints(coordinateAngle, centerPosition, radius, series, opts, process);

  radarDataPoints.forEach(function (eachSeries, seriesIndex) {
    // 绘制区域数据
    context.beginPath();
    context.setFillStyle(hexToRgb(eachSeries.color, radarOption.opacity));
    eachSeries.data.forEach(function (item, index) {
      if (index === 0) {
        context.moveTo(item.position.x, item.position.y);
      } else {
        context.lineTo(item.position.x, item.position.y);
      }
    });
    context.closePath();
    context.fill();

    if (opts.dataPointShape !== false) {
      var shape = config.dataPointShape[seriesIndex % config.dataPointShape.length];
      var points = eachSeries.data.map(function (item) {
        return item.position;
      });
      drawPointShape(points, eachSeries.color, shape, context, opts);
    }
  });
  // draw label text
  drawRadarLabel(coordinateAngle, radius, centerPosition, opts, config, context);

  return {
    center: centerPosition,
    radius: radius,
    angleList: coordinateAngle };

}

function normalInt(min, max, iter) {
  iter = iter == 0 ? 1 : iter;
  var arr = [];
  for (var i = 0; i < iter; i++) {
    arr[i] = Math.random();
  };
  return Math.floor(arr.reduce(function (i, j) {return i + j;}) / iter * (max - min)) + min;
};

function collisionNew(area, points, width, height) {
  var isIn = false;
  for (var i = 0; i < points.length; i++) {
    if (points[i].area) {
      if (area[3] < points[i].area[1] || area[0] > points[i].area[2] || area[1] > points[i].area[3] || area[2] < points[i].area[0]) {
        if (area[0] < 0 || area[1] < 0 || area[2] > width || area[3] > height) {
          isIn = true;
          break;
        } else {
          isIn = false;
        }
      } else {
        isIn = true;
        break;
      }
    }
  }
  return isIn;
};

function getBoundingBox(data) {
  var bounds = {},coords;
  bounds.xMin = 180;
  bounds.xMax = 0;
  bounds.yMin = 90;
  bounds.yMax = 0;
  for (var i = 0; i < data.length; i++) {
    var coorda = data[i].geometry.coordinates;
    for (var k = 0; k < coorda.length; k++) {
      coords = coorda[k];
      if (coords.length == 1) {
        coords = coords[0];
      }
      for (var j = 0; j < coords.length; j++) {
        var longitude = coords[j][0];
        var latitude = coords[j][1];
        var point = {
          x: longitude,
          y: latitude };

        bounds.xMin = bounds.xMin < point.x ? bounds.xMin : point.x;
        bounds.xMax = bounds.xMax > point.x ? bounds.xMax : point.x;
        bounds.yMin = bounds.yMin < point.y ? bounds.yMin : point.y;
        bounds.yMax = bounds.yMax > point.y ? bounds.yMax : point.y;
      }
    }
  }
  return bounds;
}

function coordinateToPoint(latitude, longitude, bounds, scale, xoffset, yoffset) {
  return {
    x: (longitude - bounds.xMin) * scale + xoffset,
    y: (bounds.yMax - latitude) * scale + yoffset };

}

function pointToCoordinate(pointY, pointX, bounds, scale, xoffset, yoffset) {
  return {
    x: (pointX - xoffset) / scale + bounds.xMin,
    y: bounds.yMax - (pointY - yoffset) / scale };

}

function isRayIntersectsSegment(poi, s_poi, e_poi) {
  if (s_poi[1] == e_poi[1]) {return false;}
  if (s_poi[1] > poi[1] && e_poi[1] > poi[1]) {return false;}
  if (s_poi[1] < poi[1] && e_poi[1] < poi[1]) {return false;}
  if (s_poi[1] == poi[1] && e_poi[1] > poi[1]) {return false;}
  if (e_poi[1] == poi[1] && s_poi[1] > poi[1]) {return false;}
  if (s_poi[0] < poi[0] && e_poi[1] < poi[1]) {return false;}
  var xseg = e_poi[0] - (e_poi[0] - s_poi[0]) * (e_poi[1] - poi[1]) / (e_poi[1] - s_poi[1]);
  if (xseg < poi[0]) {
    return false;
  } else {
    return true;
  }
}

function isPoiWithinPoly(poi, poly) {
  var sinsc = 0;
  for (var i = 0; i < poly.length; i++) {
    var epoly = poly[i][0];
    if (poly.length == 1) {
      epoly = poly[i][0];
    }
    for (var j = 0; j < epoly.length - 1; j++) {
      var s_poi = epoly[j];
      var e_poi = epoly[j + 1];
      if (isRayIntersectsSegment(poi, s_poi, e_poi)) {
        sinsc += 1;
      }
    }
  }

  if (sinsc % 2 == 1) {
    return true;
  } else {
    return false;
  }
}


function drawMapDataPoints(series, opts, config, context) {
  var mapOption = assign({}, {
    border: true,
    borderWidth: 1,
    borderColor: '#666666',
    fillOpacity: 0.6,
    activeBorderColor: '#f04864',
    activeFillColor: '#facc14',
    activeFillOpacity: 1 },
  opts.extra.map);
  var coords, point;
  var data = series;
  var bounds = getBoundingBox(data);
  var xScale = opts.width / Math.abs(bounds.xMax - bounds.xMin);
  var yScale = opts.height / Math.abs(bounds.yMax - bounds.yMin);
  var scale = xScale < yScale ? xScale : yScale;
  var xoffset = opts.width / 2 - Math.abs(bounds.xMax - bounds.xMin) / 2 * scale;
  var yoffset = opts.height / 2 - Math.abs(bounds.yMax - bounds.yMin) / 2 * scale;
  context.beginPath();
  context.clearRect(0, 0, opts.width, opts.height);
  context.setFillStyle(opts.background || '#FFFFFF');
  context.rect(0, 0, opts.width, opts.height);
  context.fill();
  for (var i = 0; i < data.length; i++) {
    context.beginPath();
    context.setLineWidth(mapOption.borderWidth * opts.pixelRatio);
    context.setStrokeStyle(mapOption.borderColor);
    context.setFillStyle(hexToRgb(series[i].color, mapOption.fillOpacity));
    if (opts.tooltip) {
      if (opts.tooltip.index == i) {
        context.setStrokeStyle(mapOption.activeBorderColor);
        context.setFillStyle(hexToRgb(mapOption.activeFillColor, mapOption.activeFillOpacity));
      }
    }
    var coorda = data[i].geometry.coordinates;
    for (var k = 0; k < coorda.length; k++) {
      coords = coorda[k];
      if (coords.length == 1) {
        coords = coords[0];
      }
      for (var j = 0; j < coords.length; j++) {
        point = coordinateToPoint(coords[j][1], coords[j][0], bounds, scale, xoffset, yoffset);
        if (j === 0) {
          context.beginPath();
          context.moveTo(point.x, point.y);
        } else {
          context.lineTo(point.x, point.y);
        }
      }
      context.fill();
      if (mapOption.border == true) {
        context.stroke();
      }
    }
    if (opts.dataLabel == true) {
      var centerPoint = data[i].properties.centroid;
      if (centerPoint) {
        point = coordinateToPoint(centerPoint[1], centerPoint[0], bounds, scale, xoffset, yoffset);
        var fontSize = data[i].textSize || config.fontSize;
        var text = data[i].properties.name;
        context.beginPath();
        context.setFontSize(fontSize);
        context.setFillStyle(data[i].textColor || '#666666');
        context.fillText(text, point.x - measureText(text, fontSize) / 2, point.y + fontSize / 2);
        context.closePath();
        context.stroke();
      }
    }
  }
  opts.chartData.mapData = {
    bounds: bounds,
    scale: scale,
    xoffset: xoffset,
    yoffset: yoffset };

  drawToolTipBridge(opts, config, context, 1);
  context.draw();
}

function getWordCloudPoint(opts, type) {
  var points = opts.series.sort(function (a, b) {return parseInt(b.textSize) - parseInt(a.textSize);});
  switch (type) {
    case 'normal':
      for (var i = 0; i < points.length; i++) {
        var text = points[i].name;
        var tHeight = points[i].textSize;
        var tWidth = measureText(text, tHeight);
        var x = void 0,y = void 0;
        var area = void 0;
        var breaknum = 0;
        while (true) {
          breaknum++;
          x = normalInt(-opts.width / 2, opts.width / 2, 5) - tWidth / 2;
          y = normalInt(-opts.height / 2, opts.height / 2, 5) + tHeight / 2;
          area = [x - 5 + opts.width / 2, y - 5 - tHeight + opts.height / 2, x + tWidth + 5 + opts.width / 2, y + 5 + opts.height / 2];
          var isCollision = collisionNew(area, points, opts.width, opts.height);
          if (!isCollision) break;
          if (breaknum == 1000) {
            area = [-100, -100, -100, -100];
            break;
          }
        };
        points[i].area = area;
      }
      break;
    case 'vertical':var
      Spin = function Spin() {
        //获取均匀随机值，是否旋转，旋转的概率为（1-0.5）
        if (Math.random() > 0.7) {
          return true;
        } else {return false;};
      };;
      for (var _i15 = 0; _i15 < points.length; _i15++) {
        var _text = points[_i15].name;
        var _tHeight = points[_i15].textSize;
        var _tWidth = measureText(_text, _tHeight);
        var isSpin = Spin();
        var _x = void 0,_y = void 0,_area = void 0,areav = void 0;
        var _breaknum = 0;
        while (true) {
          _breaknum++;
          var _isCollision = void 0;
          if (isSpin) {
            _x = normalInt(-opts.width / 2, opts.width / 2, 5) - _tWidth / 2;
            _y = normalInt(-opts.height / 2, opts.height / 2, 5) + _tHeight / 2;
            _area = [_y - 5 - _tWidth + opts.width / 2, -_x - 5 + opts.height / 2, _y + 5 + opts.width / 2, -_x + _tHeight + 5 + opts.height / 2];
            areav = [opts.width - (opts.width / 2 - opts.height / 2) - (-_x + _tHeight + 5 + opts.height / 2) - 5, opts.height / 2 - opts.width / 2 + (_y - 5 - _tWidth + opts.width / 2) - 5, opts.width - (opts.width / 2 - opts.height / 2) - (-_x + _tHeight + 5 + opts.height / 2) + _tHeight, opts.height / 2 - opts.width / 2 + (_y - 5 - _tWidth + opts.width / 2) + _tWidth + 5];
            _isCollision = collisionNew(areav, points, opts.height, opts.width);
          } else {
            _x = normalInt(-opts.width / 2, opts.width / 2, 5) - _tWidth / 2;
            _y = normalInt(-opts.height / 2, opts.height / 2, 5) + _tHeight / 2;
            _area = [_x - 5 + opts.width / 2, _y - 5 - _tHeight + opts.height / 2, _x + _tWidth + 5 + opts.width / 2, _y + 5 + opts.height / 2];
            _isCollision = collisionNew(_area, points, opts.width, opts.height);
          }
          if (!_isCollision) break;
          if (_breaknum == 1000) {
            _area = [-1000, -1000, -1000, -1000];
            break;
          }
        };
        if (isSpin) {
          points[_i15].area = areav;
          points[_i15].areav = _area;
        } else {
          points[_i15].area = _area;
        }
        points[_i15].rotate = isSpin;
      };
      break;}

  return points;
}


function drawWordCloudDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var wordOption = assign({}, {
    type: 'normal',
    autoColors: true },
  opts.extra.word);

  context.beginPath();
  context.setFillStyle(opts.background || '#FFFFFF');
  context.rect(0, 0, opts.width, opts.height);
  context.fill();
  context.save();
  var points = opts.chartData.wordCloudData;
  context.translate(opts.width / 2, opts.height / 2);

  for (var i = 0; i < points.length; i++) {
    context.save();
    if (points[i].rotate) {
      context.rotate(90 * Math.PI / 180);
    }
    var text = points[i].name;
    var tHeight = points[i].textSize;
    var tWidth = measureText(text, tHeight);
    context.beginPath();
    context.setStrokeStyle(points[i].color);
    context.setFillStyle(points[i].color);
    context.setFontSize(tHeight);
    if (points[i].rotate) {
      if (points[i].areav[0] > 0) {
        if (opts.tooltip) {
          if (opts.tooltip.index == i) {
            context.strokeText(text, (points[i].areav[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].areav[1] + 5 + tHeight - opts.height / 2) * process);
          } else {
            context.fillText(text, (points[i].areav[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].areav[1] + 5 + tHeight - opts.height / 2) * process);
          }
        } else {
          context.fillText(text, (points[i].areav[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].areav[1] + 5 + tHeight - opts.height / 2) * process);
        }
      }
    } else {
      if (points[i].area[0] > 0) {
        if (opts.tooltip) {
          if (opts.tooltip.index == i) {
            context.strokeText(text, (points[i].area[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].area[1] + 5 + tHeight - opts.height / 2) * process);
          } else {
            context.fillText(text, (points[i].area[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].area[1] + 5 + tHeight - opts.height / 2) * process);
          }
        } else {
          context.fillText(text, (points[i].area[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].area[1] + 5 + tHeight - opts.height / 2) * process);
        }

      }
    }

    context.stroke();
    context.restore();
  }
  context.restore();
}

function drawFunnelDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var funnelOption = assign({}, {
    activeWidth: 10,
    activeOpacity: 0.3,
    border: false,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    fillOpacity: 1,
    labelAlign: 'right' },
  opts.extra.funnel);
  var eachSpacing = (opts.height - opts.area[0] - opts.area[2]) / series.length;
  var centerPosition = {
    x: opts.area[3] + (opts.width - opts.area[1] - opts.area[3]) / 2,
    y: opts.height - opts.area[2] };

  var activeWidth = funnelOption.activeWidth;
  var radius = Math.min((opts.width - opts.area[1] - opts.area[3]) / 2 - activeWidth, (opts.height - opts.area[0] - opts.area[2]) / 2 - activeWidth);
  series = getFunnelDataPoints(series, radius, process);
  context.save();
  context.translate(centerPosition.x, centerPosition.y);
  for (var i = 0; i < series.length; i++) {
    if (i == 0) {
      if (opts.tooltip) {
        if (opts.tooltip.index == i) {
          context.beginPath();
          context.setFillStyle(hexToRgb(series[i].color, funnelOption.activeOpacity));
          context.moveTo(-activeWidth, 0);
          context.lineTo(-series[i].radius - activeWidth, -eachSpacing);
          context.lineTo(series[i].radius + activeWidth, -eachSpacing);
          context.lineTo(activeWidth, 0);
          context.lineTo(-activeWidth, 0);
          context.closePath();
          context.fill();
        }
      }
      series[i].funnelArea = [centerPosition.x - series[i].radius, centerPosition.y - eachSpacing, centerPosition.x + series[i].radius, centerPosition.y];
      context.beginPath();
      context.setLineWidth(funnelOption.borderWidth * opts.pixelRatio);
      context.setStrokeStyle(funnelOption.borderColor);
      context.setFillStyle(hexToRgb(series[i].color, funnelOption.fillOpacity));
      context.moveTo(0, 0);
      context.lineTo(-series[i].radius, -eachSpacing);
      context.lineTo(series[i].radius, -eachSpacing);
      context.lineTo(0, 0);
      context.closePath();
      context.fill();
      if (funnelOption.border == true) {
        context.stroke();
      }
    } else {
      if (opts.tooltip) {
        if (opts.tooltip.index == i) {
          context.beginPath();
          context.setFillStyle(hexToRgb(series[i].color, funnelOption.activeOpacity));
          context.moveTo(0, 0);
          context.lineTo(-series[i - 1].radius - activeWidth, 0);
          context.lineTo(-series[i].radius - activeWidth, -eachSpacing);
          context.lineTo(series[i].radius + activeWidth, -eachSpacing);
          context.lineTo(series[i - 1].radius + activeWidth, 0);
          context.lineTo(0, 0);
          context.closePath();
          context.fill();
          context.closePath();
          context.fill();
        }
      }
      series[i].funnelArea = [centerPosition.x - series[i].radius, centerPosition.y - eachSpacing * (i + 1), centerPosition.x + series[i].radius, centerPosition.y - eachSpacing * i];
      context.beginPath();
      context.setLineWidth(funnelOption.borderWidth * opts.pixelRatio);
      context.setStrokeStyle(funnelOption.borderColor);
      context.setFillStyle(hexToRgb(series[i].color, funnelOption.fillOpacity));
      context.moveTo(0, 0);
      context.lineTo(-series[i - 1].radius, 0);
      context.lineTo(-series[i].radius, -eachSpacing);
      context.lineTo(series[i].radius, -eachSpacing);
      context.lineTo(series[i - 1].radius, 0);
      context.lineTo(0, 0);
      context.closePath();
      context.fill();
      if (funnelOption.border == true) {
        context.stroke();
      }
    }
    context.translate(0, -eachSpacing);
  }
  context.restore();

  if (opts.dataLabel !== false && process === 1) {
    drawFunnelText(series, opts, context, eachSpacing, funnelOption.labelAlign, activeWidth, centerPosition);
  }

  return {
    center: centerPosition,
    radius: radius,
    series: series };

}

function drawFunnelText(series, opts, context, eachSpacing, labelAlign, activeWidth, centerPosition) {
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    var startX = void 0,endX = void 0,startY = void 0,fontSize = void 0;
    var text = item.format ? item.format(+item._proportion_.toFixed(2)) : util.toFixed(item._proportion_ * 100) + '%';
    if (labelAlign == 'right') {
      if (i == 0) {
        startX = (item.funnelArea[2] + centerPosition.x) / 2;
      } else {
        startX = (item.funnelArea[2] + series[i - 1].funnelArea[2]) / 2;
      }
      endX = startX + activeWidth * 2;
      startY = item.funnelArea[1] + eachSpacing / 2;
      fontSize = item.textSize || opts.fontSize;
      context.setLineWidth(1 * opts.pixelRatio);
      context.setStrokeStyle(item.color);
      context.setFillStyle(item.color);
      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX, startY);
      context.stroke();
      context.closePath();
      context.beginPath();
      context.moveTo(endX, startY);
      context.arc(endX, startY, 2, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
      context.beginPath();
      context.setFontSize(fontSize);
      context.setFillStyle(item.textColor || '#666666');
      context.fillText(text, endX + 5, startY + fontSize / 2 - 2);
      context.closePath();
      context.stroke();
      context.closePath();
    } else {
      if (i == 0) {
        startX = (item.funnelArea[0] + centerPosition.x) / 2;
      } else {
        startX = (item.funnelArea[0] + series[i - 1].funnelArea[0]) / 2;
      }
      endX = startX - activeWidth * 2;
      startY = item.funnelArea[1] + eachSpacing / 2;
      fontSize = item.textSize || opts.fontSize;
      context.setLineWidth(1 * opts.pixelRatio);
      context.setStrokeStyle(item.color);
      context.setFillStyle(item.color);
      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX, startY);
      context.stroke();
      context.closePath();
      context.beginPath();
      context.moveTo(endX, startY);
      context.arc(endX, startY, 2, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
      context.beginPath();
      context.setFontSize(fontSize);
      context.setFillStyle(item.textColor || '#666666');
      context.fillText(text, endX - 5 - measureText(text), startY + fontSize / 2 - 2);
      context.closePath();
      context.stroke();
      context.closePath();
    }

  }
}


function drawCanvas(opts, context) {
  context.draw();
}

var Timing = {
  easeIn: function easeIn(pos) {
    return Math.pow(pos, 3);
  },
  easeOut: function easeOut(pos) {
    return Math.pow(pos - 1, 3) + 1;
  },
  easeInOut: function easeInOut(pos) {
    if ((pos /= 0.5) < 1) {
      return 0.5 * Math.pow(pos, 3);
    } else {
      return 0.5 * (Math.pow(pos - 2, 3) + 2);
    }
  },
  linear: function linear(pos) {
    return pos;
  } };


function Animation(opts) {
  this.isStop = false;
  opts.duration = typeof opts.duration === 'undefined' ? 1000 : opts.duration;
  opts.timing = opts.timing || 'linear';
  var delay = 17;

  function createAnimationFrame() {
    if (typeof setTimeout !== 'undefined') {
      return function (step, delay) {
        setTimeout(function () {
          var timeStamp = +new Date();
          step(timeStamp);
        }, delay);
      };
    } else if (typeof requestAnimationFrame !== 'undefined') {
      return requestAnimationFrame;
    } else {
      return function (step) {
        step(null);
      };
    }
  };
  var animationFrame = createAnimationFrame();
  var startTimeStamp = null;
  var _step = function step(timestamp) {
    if (timestamp === null || this.isStop === true) {
      opts.onProcess && opts.onProcess(1);
      opts.onAnimationFinish && opts.onAnimationFinish();
      return;
    }
    if (startTimeStamp === null) {
      startTimeStamp = timestamp;
    }
    if (timestamp - startTimeStamp < opts.duration) {
      var process = (timestamp - startTimeStamp) / opts.duration;
      var timingFunction = Timing[opts.timing];
      process = timingFunction(process);

      opts.onProcess && opts.onProcess(process);
      animationFrame(_step, delay);
    } else {
      opts.onProcess && opts.onProcess(1);
      opts.onAnimationFinish && opts.onAnimationFinish();
    }
  };
  _step = _step.bind(this);
  animationFrame(_step, delay);
}

// stop animation immediately
// and tigger onAnimationFinish
Animation.prototype.stop = function () {
  this.isStop = true;
};

function drawCharts(type, opts, config, context) {
  var _this = this;
  var series = opts.series;
  var categories = opts.categories;
  series = fillSeries(series, opts, config);
  var duration = opts.animation ? opts.duration : 0;
  this.animationInstance && this.animationInstance.stop();
  var seriesMA = null;
  if (type == 'candle') {
    var average = assign({}, opts.extra.candle.average);
    if (average.show) {
      seriesMA = calCandleMA(average.day, average.name, average.color, series[0].data);
      seriesMA = fillSeries(seriesMA, opts, config);
      opts.seriesMA = seriesMA;
    } else if (opts.seriesMA) {
      seriesMA = opts.seriesMA = fillSeries(opts.seriesMA, opts, config);
    } else {
      seriesMA = series;
    }
  } else {
    seriesMA = series;
  }

  /* 过滤掉show=false的series */
  opts._series_ = series = filterSeries(series);

  //重新计算图表区域

  opts.area = new Array(4);
  //复位绘图区域
  for (var j = 0; j < 4; j++) {
    opts.area[j] = opts.padding[j];
  }

  //通过计算三大区域：图例、X轴、Y轴的大小，确定绘图区域
  var _calLegendData = calLegendData(seriesMA, opts, config, opts.chartData),
  legendHeight = _calLegendData.area.wholeHeight,
  legendWidth = _calLegendData.area.wholeWidth;
  //TODO废弃config.legendHeight参数
  config.legendHeight = legendHeight;
  switch (opts.legend.position) {
    case 'top':
      opts.area[0] += legendHeight;
      break;
    case 'bottom':
      opts.area[2] += legendHeight;
      break;
    case 'left':
      opts.area[3] += legendWidth;
      break;
    case 'right':
      opts.area[1] += legendWidth;
      break;}


  var _calYAxisData = {},yAxisWidth = 0;
  if (opts.type === 'line' || opts.type === 'column' || opts.type === 'area' || opts.type === 'mix' || opts.type === 'candle') {
    _calYAxisData = calYAxisData(series, opts, config);
    yAxisWidth = _calYAxisData.yAxisWidth;
    config.yAxisWidth = yAxisWidth;
    opts.area[3] += yAxisWidth;
  } else {
    config.yAxisWidth = yAxisWidth;
  }
  opts.chartData.yAxisData = _calYAxisData;

  if (opts.categories && opts.categories.length) {
    opts.chartData.xAxisData = getXAxisPoints(opts.categories, opts, config);
    var _calCategoriesData = calCategoriesData(opts.categories, opts, config, opts.chartData.xAxisData.eachSpacing),
    xAxisHeight = _calCategoriesData.xAxisHeight,
    angle = _calCategoriesData.angle;
    config.xAxisHeight = xAxisHeight;
    config._xAxisTextAngle_ = angle;
    opts.area[2] += xAxisHeight;
    opts.chartData.categoriesData = _calCategoriesData;
  }

  //计算右对齐偏移距离
  if (opts.enableScroll && opts.xAxis.scrollAlign == 'right' && opts._scrollDistance_ === undefined) {
    var offsetLeft = 0,
    xAxisPoints = opts.chartData.xAxisData.xAxisPoints,
    startX = opts.chartData.xAxisData.startX,
    endX = opts.chartData.xAxisData.endX,
    eachSpacing = opts.chartData.xAxisData.eachSpacing;
    var totalWidth = eachSpacing * (xAxisPoints.length - 1);
    var screenWidth = endX - startX;
    offsetLeft = screenWidth - totalWidth;
    _this.scrollOption = {
      currentOffset: offsetLeft,
      startTouchX: offsetLeft,
      distance: 0,
      lastMoveTime: 0 };

    opts._scrollDistance_ = offsetLeft;
  }

  if (type === 'pie' || type === 'ring' || type === 'rose') {
    config._pieTextMaxLength_ = opts.dataLabel === false ? 0 : getPieTextMaxLength(seriesMA);
  }

  switch (type) {
    case 'word':
      var wordOption = assign({}, {
        type: 'normal',
        autoColors: true },
      opts.extra.word);
      if (opts.updateData == true || opts.updateData == undefined) {
        opts.chartData.wordCloudData = getWordCloudPoint(opts, wordOption.type);
      }
      this.animationInstance = new Animation({
        timing: 'easeInOut',
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawWordCloudDataPoints(series, opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'map':
      context.clearRect(0, 0, opts.width, opts.height);
      drawMapDataPoints(series, opts, config, context);
      break;
    case 'funnel':
      this.animationInstance = new Animation({
        timing: 'easeInOut',
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.funnelData = drawFunnelDataPoints(series, opts, config, context, process);
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'line':
      this.animationInstance = new Animation({
        timing: 'easeIn',
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawLineDataPoints = drawLineDataPoints(series, opts, config, context, process),
          xAxisPoints = _drawLineDataPoints.xAxisPoints,
          calPoints = _drawLineDataPoints.calPoints,
          eachSpacing = _drawLineDataPoints.eachSpacing,
          minRange = _drawLineDataPoints.minRange,
          maxRange = _drawLineDataPoints.maxRange;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(minRange, maxRange, opts, config, context);
          }
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);

        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'mix':
      this.animationInstance = new Animation({
        timing: 'easeIn',
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawMixDataPoints = drawMixDataPoints(series, opts, config, context, process),
          xAxisPoints = _drawMixDataPoints.xAxisPoints,
          calPoints = _drawMixDataPoints.calPoints,
          eachSpacing = _drawMixDataPoints.eachSpacing,
          minRange = _drawMixDataPoints.minRange,
          maxRange = _drawMixDataPoints.maxRange;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(minRange, maxRange, opts, config, context);
          }
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'column':
      this.animationInstance = new Animation({
        timing: 'easeIn',
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawColumnDataPoints = drawColumnDataPoints(series, opts, config, context, process),
          xAxisPoints = _drawColumnDataPoints.xAxisPoints,
          calPoints = _drawColumnDataPoints.calPoints,
          eachSpacing = _drawColumnDataPoints.eachSpacing,
          minRange = _drawColumnDataPoints.minRange,
          maxRange = _drawColumnDataPoints.maxRange;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(minRange, maxRange, opts, config, context);
          }
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'area':
      this.animationInstance = new Animation({
        timing: 'easeIn',
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawAreaDataPoints = drawAreaDataPoints(series, opts, config, context, process),
          xAxisPoints = _drawAreaDataPoints.xAxisPoints,
          calPoints = _drawAreaDataPoints.calPoints,
          eachSpacing = _drawAreaDataPoints.eachSpacing,
          minRange = _drawAreaDataPoints.minRange,
          maxRange = _drawAreaDataPoints.maxRange;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(minRange, maxRange, opts, config, context);
          }
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'ring':
    case 'pie':
      this.animationInstance = new Animation({
        timing: 'easeInOut',
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.pieData = drawPieDataPoints(series, opts, config, context, process);
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'rose':
      this.animationInstance = new Animation({
        timing: 'easeInOut',
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.pieData = drawRoseDataPoints(series, opts, config, context, process);
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'radar':
      this.animationInstance = new Animation({
        timing: 'easeInOut',
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.radarData = drawRadarDataPoints(series, opts, config, context, process);
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'arcbar':
      this.animationInstance = new Animation({
        timing: 'easeInOut',
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.arcbarData = drawArcbarDataPoints(series, opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'gauge':
      this.animationInstance = new Animation({
        timing: 'easeInOut',
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.gaugeData = drawGaugeDataPoints(categories, series, opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'candle':
      this.animationInstance = new Animation({
        timing: 'easeIn',
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawCandleDataPoints = drawCandleDataPoints(series, seriesMA, opts, config, context, process),
          xAxisPoints = _drawCandleDataPoints.xAxisPoints,
          calPoints = _drawCandleDataPoints.calPoints,
          eachSpacing = _drawCandleDataPoints.eachSpacing,
          minRange = _drawCandleDataPoints.minRange,
          maxRange = _drawCandleDataPoints.maxRange;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(minRange, maxRange, opts, config, context);
          }
          if (seriesMA) {
            drawLegend(seriesMA, opts, config, context, opts.chartData);
          } else {
            drawLegend(opts.series, opts, config, context, opts.chartData);
          }
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;}

}

// simple event implement

function Event() {
  this.events = {};
}

Event.prototype.addEventListener = function (type, listener) {
  this.events[type] = this.events[type] || [];
  this.events[type].push(listener);
};

Event.prototype.trigger = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var type = args[0];
  var params = args.slice(1);
  if (!!this.events[type]) {
    this.events[type].forEach(function (listener) {
      try {
        listener.apply(null, params);
      } catch (e) {
        console.error(e);
      }
    });
  }
};

var Charts = function Charts(opts) {
  opts.pixelRatio = opts.pixelRatio ? opts.pixelRatio : 1;
  opts.fontSize = opts.fontSize ? opts.fontSize * opts.pixelRatio : 13 * opts.pixelRatio;
  opts.title = assign({}, opts.title);
  opts.subtitle = assign({}, opts.subtitle);
  opts.duration = opts.duration ? opts.duration : 1000;
  opts.yAxis = assign({}, {
    gridType: 'solid',
    dashLength: 4 * opts.pixelRatio },
  opts.yAxis);
  opts.xAxis = assign({}, {
    rotateLabel: false,
    type: 'calibration',
    gridType: 'solid',
    dashLength: 4 * opts.pixelRatio,
    scrollAlign: 'left',
    boundaryGap: 'center' },
  opts.xAxis);
  opts.legend = assign({}, {
    show: true,
    position: 'bottom',
    float: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: 'rgba(0,0,0,0)',
    borderWidth: 0,
    padding: 5,
    margin: 5,
    itemGap: 10,
    fontSize: opts.fontSize,
    lineHeight: opts.fontSize,
    fontColor: '#333333',
    format: {},
    hiddenColor: '#CECECE' },
  opts.legend);
  opts.legend.borderWidth = opts.legend.borderWidth * opts.pixelRatio;
  opts.legend.itemGap = opts.legend.itemGap * opts.pixelRatio;
  opts.legend.padding = opts.legend.padding * opts.pixelRatio;
  opts.legend.margin = opts.legend.margin * opts.pixelRatio;
  opts.extra = assign({}, opts.extra);
  opts.rotate = opts.rotate ? true : false;
  opts.animation = opts.animation ? true : false;

  var config$$1 = JSON.parse(JSON.stringify(config));
  config$$1.colors = opts.colors ? opts.colors : config$$1.colors;
  config$$1.yAxisTitleWidth = opts.yAxis.disabled !== true && opts.yAxis.title ? config$$1.yAxisTitleWidth : 0;
  if (opts.type == 'pie' || opts.type == 'ring') {
    config$$1.pieChartLinePadding = opts.dataLabel === false ? 0 : opts.extra.pie.labelWidth * opts.pixelRatio || config$$1.pieChartLinePadding * opts.pixelRatio;
  }
  if (opts.type == 'rose') {
    config$$1.pieChartLinePadding = opts.dataLabel === false ? 0 : opts.extra.rose.labelWidth * opts.pixelRatio || config$$1.pieChartLinePadding * opts.pixelRatio;
  }
  config$$1.pieChartTextPadding = opts.dataLabel === false ? 0 : config$$1.pieChartTextPadding * opts.pixelRatio;
  config$$1.yAxisSplit = opts.yAxis.splitNumber ? opts.yAxis.splitNumber : config.yAxisSplit;

  //屏幕旋转
  config$$1.rotate = opts.rotate;
  if (opts.rotate) {
    var tempWidth = opts.width;
    var tempHeight = opts.height;
    opts.width = tempHeight;
    opts.height = tempWidth;
  }

  //适配高分屏
  opts.padding = opts.padding ? opts.padding : config$$1.padding;
  for (var i = 0; i < 4; i++) {
    opts.padding[i] *= opts.pixelRatio;
  }
  config$$1.yAxisWidth = config.yAxisWidth * opts.pixelRatio;
  config$$1.xAxisHeight = config.xAxisHeight * opts.pixelRatio;
  if (opts.enableScroll && opts.xAxis.scrollShow) {
    config$$1.xAxisHeight += 6 * opts.pixelRatio;
  }
  config$$1.xAxisLineHeight = config.xAxisLineHeight * opts.pixelRatio;
  config$$1.legendHeight = config.legendHeight * opts.pixelRatio;
  config$$1.fontSize = opts.fontSize;
  config$$1.titleFontSize = config.titleFontSize * opts.pixelRatio;
  config$$1.subtitleFontSize = config.subtitleFontSize * opts.pixelRatio;
  config$$1.toolTipPadding = config.toolTipPadding * opts.pixelRatio;
  config$$1.toolTipLineHeight = config.toolTipLineHeight * opts.pixelRatio;
  config$$1.columePadding = config.columePadding * opts.pixelRatio;
  opts.$this = opts.$this ? opts.$this : this;

  this.context = uni.createCanvasContext(opts.canvasId, opts.$this);
  /* 兼容原生H5
                                                                     this.context = document.getElementById(opts.canvasId).getContext("2d");
                                                                     this.context.setStrokeStyle = function(e){ return this.strokeStyle=e; }
                                                                     this.context.setLineWidth = function(e){ return this.lineWidth=e; }
                                                                     this.context.setLineCap = function(e){ return this.lineCap=e; }
                                                                     this.context.setFontSize = function(e){ return this.font=e+"px sans-serif"; }
                                                                     this.context.setFillStyle = function(e){ return this.fillStyle=e; }
                                                                     this.context.draw = function(){ }
                                                                     */

  opts.chartData = {};
  this.event = new Event();
  this.scrollOption = {
    currentOffset: 0,
    startTouchX: 0,
    distance: 0,
    lastMoveTime: 0 };


  this.opts = opts;
  this.config = config$$1;

  drawCharts.call(this, opts.type, opts, config$$1, this.context);
};

Charts.prototype.updateData = function () {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  this.opts = assign({}, this.opts, data);
  this.opts.updateData = true;
  var scrollPosition = data.scrollPosition || 'current';
  switch (scrollPosition) {
    case 'current':
      this.opts._scrollDistance_ = this.scrollOption.currentOffset;
      break;
    case 'left':
      this.opts._scrollDistance_ = 0;
      this.scrollOption = {
        currentOffset: 0,
        startTouchX: 0,
        distance: 0,
        lastMoveTime: 0 };

      break;
    case 'right':
      var _calYAxisData = calYAxisData(this.opts.series, this.opts, this.config),
      yAxisWidth = _calYAxisData.yAxisWidth;
      this.config.yAxisWidth = yAxisWidth;
      var offsetLeft = 0;
      var _getXAxisPoints0 = getXAxisPoints(this.opts.categories, this.opts, this.config),
      xAxisPoints = _getXAxisPoints0.xAxisPoints,
      startX = _getXAxisPoints0.startX,
      endX = _getXAxisPoints0.endX,
      eachSpacing = _getXAxisPoints0.eachSpacing;
      var totalWidth = eachSpacing * (xAxisPoints.length - 1);
      var screenWidth = endX - startX;
      offsetLeft = screenWidth - totalWidth;
      this.scrollOption = {
        currentOffset: offsetLeft,
        startTouchX: offsetLeft,
        distance: 0,
        lastMoveTime: 0 };

      this.opts._scrollDistance_ = offsetLeft;
      break;}

  drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);
};

Charts.prototype.zoom = function () {
  var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.opts.xAxis.itemCount;
  if (this.opts.enableScroll !== true) {
    console.log('请启用滚动条后使用！');
    return;
  }
  //当前屏幕中间点
  var centerPoint = Math.round(Math.abs(this.scrollOption.currentOffset) / this.opts.chartData.eachSpacing) + Math.round(
  this.opts.xAxis.itemCount / 2);
  this.opts.animation = false;
  this.opts.xAxis.itemCount = val.itemCount;
  //重新计算x轴偏移距离
  var _calYAxisData = calYAxisData(this.opts.series, this.opts, this.config),
  yAxisWidth = _calYAxisData.yAxisWidth;
  this.config.yAxisWidth = yAxisWidth;
  var offsetLeft = 0;
  var _getXAxisPoints0 = getXAxisPoints(this.opts.categories, this.opts, this.config),
  xAxisPoints = _getXAxisPoints0.xAxisPoints,
  startX = _getXAxisPoints0.startX,
  endX = _getXAxisPoints0.endX,
  eachSpacing = _getXAxisPoints0.eachSpacing;
  var centerLeft = eachSpacing * centerPoint;
  var screenWidth = endX - startX;
  var MaxLeft = screenWidth - eachSpacing * (xAxisPoints.length - 1);
  offsetLeft = screenWidth / 2 - centerLeft;
  if (offsetLeft > 0) {
    offsetLeft = 0;
  }
  if (offsetLeft < MaxLeft) {
    offsetLeft = MaxLeft;
  }
  this.scrollOption = {
    currentOffset: offsetLeft,
    startTouchX: offsetLeft,
    distance: 0,
    lastMoveTime: 0 };

  this.opts._scrollDistance_ = offsetLeft;
  drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);
};

Charts.prototype.stopAnimation = function () {
  this.animationInstance && this.animationInstance.stop();
};

Charts.prototype.addEventListener = function (type, listener) {
  this.event.addEventListener(type, listener);
};

Charts.prototype.getCurrentDataIndex = function (e) {
  var touches = null;
  if (e.changedTouches) {
    touches = e.changedTouches[0];
  } else {
    touches = e.mp.changedTouches[0];
  }
  if (touches) {
    var _touches$ = getTouches(touches, this.opts, e);
    if (this.opts.type === 'pie' || this.opts.type === 'ring' || this.opts.type === 'rose') {
      return findPieChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y },
      this.opts.chartData.pieData);
    } else if (this.opts.type === 'radar') {
      return findRadarChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y },
      this.opts.chartData.radarData, this.opts.categories.length);
    } else if (this.opts.type === 'funnel') {
      return findFunnelChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y },
      this.opts.chartData.funnelData);
    } else if (this.opts.type === 'map') {
      return findMapChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y },
      this.opts);
    } else if (this.opts.type === 'word') {
      return findWordChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y },
      this.opts.chartData.wordCloudData);
    } else {
      return findCurrentIndex({
        x: _touches$.x,
        y: _touches$.y },
      this.opts.chartData.xAxisPoints, this.opts, this.config, Math.abs(this.scrollOption.currentOffset));
    }
  }
  return -1;
};

Charts.prototype.getLegendDataIndex = function (e) {
  var touches = null;
  if (e.changedTouches) {
    touches = e.changedTouches[0];
  } else {
    touches = e.mp.changedTouches[0];
  }
  if (touches) {
    var _touches$ = getTouches(touches, this.opts, e);
    return findLegendIndex({
      x: _touches$.x,
      y: _touches$.y },
    this.opts.chartData.legendData);
  }
  return -1;
};

Charts.prototype.touchLegend = function (e) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var touches = null;
  if (e.changedTouches) {
    touches = e.changedTouches[0];
  } else {
    touches = e.mp.changedTouches[0];
  }
  if (touches) {
    var _touches$ = getTouches(touches, this.opts, e);
    var index = this.getLegendDataIndex(e);
    if (index >= 0) {
      this.opts.series[index].show = !this.opts.series[index].show;
      this.opts.animation = option.animation ? true : false;
      drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);
    }
  }

};

Charts.prototype.showToolTip = function (e) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var touches = null;
  if (e.changedTouches) {
    touches = e.changedTouches[0];
  } else {
    touches = e.mp.changedTouches[0];
  }
  if (!touches) {
    console.log("touchError");
  }
  var _touches$ = getTouches(touches, this.opts, e);
  var currentOffset = this.scrollOption.currentOffset;
  var opts = assign({}, this.opts, {
    _scrollDistance_: currentOffset,
    animation: false });

  if (this.opts.type === 'line' || this.opts.type === 'area' || this.opts.type === 'column') {
    var index = this.getCurrentDataIndex(e);
    if (index > -1) {
      var seriesData = getSeriesDataItem(this.opts.series, index);
      if (seriesData.length !== 0) {
        var _getToolTipData = getToolTipData(seriesData, this.opts.chartData.calPoints, index, this.opts.categories, option),
        textList = _getToolTipData.textList,
        offset = _getToolTipData.offset;
        offset.y = _touches$.y;
        opts.tooltip = {
          textList: textList,
          offset: offset,
          option: option,
          index: index };

      }
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === 'mix') {
    var index = this.getCurrentDataIndex(e);
    if (index > -1) {
      var currentOffset = this.scrollOption.currentOffset;
      var opts = assign({}, this.opts, {
        _scrollDistance_: currentOffset,
        animation: false });

      var seriesData = getSeriesDataItem(this.opts.series, index);
      if (seriesData.length !== 0) {
        var _getMixToolTipData = getMixToolTipData(seriesData, this.opts.chartData.calPoints, index, this.opts.categories, option),
        textList = _getMixToolTipData.textList,
        offset = _getMixToolTipData.offset;
        offset.y = _touches$.y;
        opts.tooltip = {
          textList: textList,
          offset: offset,
          option: option,
          index: index };

      }
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === 'candle') {
    var index = this.getCurrentDataIndex(e);
    if (index > -1) {
      var currentOffset = this.scrollOption.currentOffset;
      var opts = assign({}, this.opts, {
        _scrollDistance_: currentOffset,
        animation: false });

      var seriesData = getSeriesDataItem(this.opts.series, index);
      if (seriesData.length !== 0) {
        var _getToolTipData = getCandleToolTipData(this.opts.series[0].data, seriesData, this.opts.chartData.calPoints,
        index, this.opts.categories, this.opts.extra.candle, option),
        textList = _getToolTipData.textList,
        offset = _getToolTipData.offset;
        offset.y = _touches$.y;
        opts.tooltip = {
          textList: textList,
          offset: offset,
          option: option,
          index: index };

      }
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === 'pie' || this.opts.type === 'ring' || this.opts.type === 'rose' || this.opts.type === 'funnel') {
    var index = this.getCurrentDataIndex(e);
    if (index > -1) {
      var currentOffset = this.scrollOption.currentOffset;
      var opts = assign({}, this.opts, {
        _scrollDistance_: currentOffset,
        animation: false });

      var seriesData = this.opts._series_[index];
      var textList = [{
        text: option.format ? option.format(seriesData) : seriesData.name + ': ' + seriesData.data,
        color: seriesData.color }];

      var offset = {
        x: _touches$.x,
        y: _touches$.y };

      opts.tooltip = {
        textList: textList,
        offset: offset,
        option: option,
        index: index };

    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === 'map' || this.opts.type === 'word') {
    var index = this.getCurrentDataIndex(e);
    if (index > -1) {
      var currentOffset = this.scrollOption.currentOffset;
      var opts = assign({}, this.opts, {
        _scrollDistance_: currentOffset,
        animation: false });

      var seriesData = this.opts._series_[index];
      var textList = [{
        text: option.format ? option.format(seriesData) : seriesData.properties.name,
        color: seriesData.color }];

      var offset = {
        x: _touches$.x,
        y: _touches$.y };

      opts.tooltip = {
        textList: textList,
        offset: offset,
        option: option,
        index: index };

    }
    opts.updateData = false;
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === 'radar') {
    var index = this.getCurrentDataIndex(e);
    if (index > -1) {
      var currentOffset = this.scrollOption.currentOffset;
      var opts = assign({}, this.opts, {
        _scrollDistance_: currentOffset,
        animation: false });

      var seriesData = getSeriesDataItem(this.opts.series, index);
      if (seriesData.length !== 0) {
        var textList = seriesData.map(function (item) {
          return {
            text: option.format ? option.format(item) : item.name + ': ' + item.data,
            color: item.color };

        });
        var offset = {
          x: _touches$.x,
          y: _touches$.y };

        opts.tooltip = {
          textList: textList,
          offset: offset,
          option: option,
          index: index };

      }
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
};

Charts.prototype.translate = function (distance) {
  this.scrollOption = {
    currentOffset: distance,
    startTouchX: distance,
    distance: 0,
    lastMoveTime: 0 };

  var opts = assign({}, this.opts, {
    _scrollDistance_: distance,
    animation: false });

  drawCharts.call(this, this.opts.type, opts, this.config, this.context);
};

Charts.prototype.scrollStart = function (e) {
  var touches = null;
  if (e.changedTouches) {
    touches = e.changedTouches[0];
  } else {
    touches = e.mp.changedTouches[0];
  }
  var _touches$ = getTouches(touches, this.opts, e);
  if (touches && this.opts.enableScroll === true) {
    this.scrollOption.startTouchX = _touches$.x;
  }
};

Charts.prototype.scroll = function (e) {
  if (this.scrollOption.lastMoveTime === 0) {
    this.scrollOption.lastMoveTime = Date.now();
  }
  var Limit = this.opts.extra.touchMoveLimit || 20;
  var currMoveTime = Date.now();
  var duration = currMoveTime - this.scrollOption.lastMoveTime;
  if (duration < Math.floor(1000 / Limit)) return;
  this.scrollOption.lastMoveTime = currMoveTime;
  var touches = null;
  if (e.changedTouches) {
    touches = e.changedTouches[0];
  } else {
    touches = e.mp.changedTouches[0];
  }
  if (touches && this.opts.enableScroll === true) {
    var _touches$ = getTouches(touches, this.opts, e);
    var _distance;
    _distance = _touches$.x - this.scrollOption.startTouchX;
    var currentOffset = this.scrollOption.currentOffset;
    var validDistance = calValidDistance(currentOffset + _distance, this.opts.chartData, this.config, this.opts);
    this.scrollOption.distance = _distance = validDistance - currentOffset;
    var opts = assign({}, this.opts, {
      _scrollDistance_: currentOffset + _distance,
      animation: false });

    drawCharts.call(this, opts.type, opts, this.config, this.context);
    return currentOffset + _distance;
  }
};

Charts.prototype.scrollEnd = function (e) {
  if (this.opts.enableScroll === true) {
    var _scrollOption = this.scrollOption,
    currentOffset = _scrollOption.currentOffset,
    distance = _scrollOption.distance;
    this.scrollOption.currentOffset = currentOffset + distance;
    this.scrollOption.distance = 0;
  }
};
if ( true && typeof module.exports === "object") {
  module.exports = Charts;
  //export default Charts;//建议使用nodejs的module导出方式，如报错请使用export方式导出
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!***************************************************!*\
  !*** E:/uniapp/ykt/static/images/menus/menu1.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABuCAYAAADGWyb7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY3OTc5QkY3RTc2QTExRUE4OUFCQkM1M0JEQzc3QTgyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY3OTc5QkY4RTc2QTExRUE4OUFCQkM1M0JEQzc3QTgyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Njc5NzlCRjVFNzZBMTFFQTg5QUJCQzUzQkRDNzdBODIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Njc5NzlCRjZFNzZBMTFFQTg5QUJCQzUzQkRDNzdBODIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4aMPw2AAAqQklEQVR42sx9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"

/***/ }),

/***/ 31:
/*!***************************************************!*\
  !*** E:/uniapp/ykt/static/images/menus/menu2.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABuCAYAAADGWyb7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjRERDdBOEU3RTc2QTExRUE5NEFEQjM4MkNCMEYxQzBFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjRERDdBOEU4RTc2QTExRUE5NEFEQjM4MkNCMEYxQzBFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEREN0E4RTVFNzZBMTFFQTk0QURCMzgyQ0IwRjFDMEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEREN0E4RTZFNzZBMTFFQTk0QURCMzgyQ0IwRjFDMEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6oLJ36AAAnkUlEQVR42tR9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"

/***/ }),

/***/ 32:
/*!***************************************************!*\
  !*** E:/uniapp/ykt/static/images/menus/menu3.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABuCAYAAADGWyb7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdCMEQ5QTk3RTc2QTExRUFCNzRFQzkwRTE0QTIwRjNDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdCMEQ5QTk4RTc2QTExRUFCNzRFQzkwRTE0QTIwRjNDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0IwRDlBOTVFNzZBMTFFQUI3NEVDOTBFMTRBMjBGM0MiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0IwRDlBOTZFNzZBMTFFQUI3NEVDOTBFMTRBMjBGM0MiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6bGDgpAAAnQ0lEQVR42ux9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"

/***/ }),

/***/ 33:
/*!***************************************************!*\
  !*** E:/uniapp/ykt/static/images/menus/menu4.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABuCAYAAADGWyb7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkE5RjU4MjA3RTc2QTExRUFBMjhERDZDMDlCNTQyOUE5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkE5RjU4MjA4RTc2QTExRUFBMjhERDZDMDlCNTQyOUE5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTlGNTgyMDVFNzZBMTFFQUEyOERENkMwOUI1NDI5QTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTlGNTgyMDZFNzZBMTFFQUEyOERENkMwOUI1NDI5QTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5UL0GaAAAsJklEQVR42sx9CbRlVXnmv/e5wxvqVdWr92qkBhAMg4ABbaQTRVeCSla7EoydEDXGpRDL1ohCLwdcLbbpZUyCRjvavVaIExqWCW1E0hAQJWpMIiIGZVCgoQqKoqCghldVb7rv3rP/3vP+9z773PteVUHVhVvn3PPucM7+zv/94/43W/GJnaAfqP5HqD4w2qQvXrB2JQDLfIxFG7nDql/DIPPd9Fewem56H5ry3xfJnbPk/umAeKL8yxa5PyGPyye05d/G5LYjX8/I7ZR8HpLH1P7j8thjcvsL+bxPHntAnkdXnQqiP039I4xcA0Lfy4T4nXWP6lj+dOtqOJxHYyBoWPPjUHM1LN1l+n+su2LMfTsmP42FHNTz5M5FiPgquf0P8nyH9RuQnjn9nP63bUFcRb7tV/x560M4x5D9WH7L9+SL2wDZXXJbAgEyervdY8DCzcXCqzxeOBjTJQO3aNByI5w/k0VJWeYeMNfoDzK5f4HcvlFu3yC3k0jOSb+Pgub2MYI/fx1oR9FshhmTv4NwgTzdq+XRPfLg30so/lb+9fuIZtSD9BnQkAUY6XkwjXQqupCif+TAVUHrT43+DqpBjIK2JMDCAK+UY/WH8sVW+fJkfdiDQrZoRsJsE0lD8q1YIwGECxmiH1gJyqT8Z6s8tlX++RF59Fr5/Gv5limHhToLgxvT9wBzgNEbD7FKrUdV4pZKjblfZ3lq9DdYDZ0iRoCtlRf9Qbl7mfzDmBsEdINvQYskDQUBksgYZmkzDKY+MXWewv/JSQqzSNhTPEUe/3P5h4/I15+Xf/pzuX2a2ZvSS589L+YokznZzOnBow7c4VAjxqAlUoasvzBb0JbJ7Yfldb9X7o8YKUEPKjrpio4RafLSF9/tmGWP+CZkhMKifXvizAIsN2Ny/wopZVuRsb+U0vhxeXQaCCvmWNCBGDTiUQXucKkxAM0GUWOOFo0Oe4vc/VP59evrAPPHPHip5GEwrvznyflFoGEysNbQCACFG9HRqNZvZujlkRF5/EPywFvlL31I7n+VKZ5FS5nemjGfwYytydgizOnFGidLo8bILA+g1dnLGSmT75XmO14rd19NgciBhQIrQFYBVFsR0SRSXZZi56kQPXye5RXdkWvhdqD1cSuNcrte/nud3P6+PP4OuX1MHUcHsqdSFrsSdpxYdMcfDapcDDViYranoKVGCCO6zAy0krLPydfLPTgJYEKBpfQXlTYQZl8QACGRSAeZwMxNmL3/5X+lFBAWDAxPfURX+7+rJyf77NXyLz9jnP2RfKmkL2h6Z7xaLah/w52jO45HDNziqRFTjysHmgOM+Ii9bjlUNPhn5e5lHiT1n1DjHMDQ+0IkkicCYAQsbZx40JAIGEYOe46SvBdmac1pIkaokgGxGJ3Eyfdx91rtc7aclewr8uUFpRDvaTYa8/p7OPOuQnANiA5leERGZmOp1FgBOidpLGCvTk9K0Pqi4DfKAX5ZKmVC9AON/l1ExoijTEGBEmQf6wyuxL9SgyyCDeyoDghoFFAFmpBPbo+r09D7jF0msTqr7JWv55w/xb3Fo76EGxFkLHbgjwpVLpYa+0lmos+27djNtmxcfZo8v1vkYJ5E9ZbwYBlpigEir1PaVOhYKXVUSY2TcCmYtyZB5AM+1qzUOswqwwCak0YOpXQhjA4zeo9rw0RuFTbAXybf8q+iLP/TE0898+DmDetRS6e+oxxg3Pv/R+4OLIEaa0HOg3aOPMdb5eCu8RKFjh4FeS08UMJJXAJkbKhQY4QCFzvgVZcAq5dg6Q+JfjNbR6HgJY6xXiSBGmKuoGCacrkB/iTO+Pc2rFnzGzuefOqezRvWofkuK4Fc6JsDGRyRk9CogjaAGvuEuqwMwPYdzyjQzpKn9R05sOOCDLzw0iQ8NarX60Y5fOSVK2HvbAlX3b43BowAKYA44ILoNkj1XHoRmL0eRtwHbwFqg0uEgWWUMo3EOSr0EmfB4KgkCtdI3XfH+tWTr3x811P3bV6/zkieEksRrFo8InfgSKgxMxQGtMlNmh5zoCWAaQDl9p0vXQ6bVzRg/bJCvi4roAkaLfGRlFjK0lglIFSHJ7oGtP4X8/saJ2HBYxi5D05ymNVX6n2lpkkLnrE8pErjynRcKQ2UWzZMTr58x66ndmjJE6DfK/+FI3XLG4dNjQnIihrV/uaNk6vlCd0hB3pjLGXCGyCiFB4wR49nr23pQb1n13yFLoUHiUqUCAaQpc3+oGV0HlqR8zG4wJ8CMdgWwoDogXPv4sak1zRpqdAAiE4KN0ra/M76yYlfleA9qz605YQNqHC1DuJhP7j3Sg8bNPSgnbB+VUvedTfJwT4lgCY0EA48BdqL1zTgyvPH4PWnDUFZlvrYfbs7sGOqC5/74T4NqDqm3l86PScskBrU0upHoV+HQDR5X6JDKzqTGD3aQLLf5c4Z7XlrZgDLAEKda2mvR9gb0FC/Plf5utTb0p6/Pq7G4qY1q1a11Bg9/uSTTIhwnkccOVkSNZI7d5ukRnesURR/Jk/yfC9JVqoCNQp42QktuPScUX2nnj7ZgLt3zsMje+bhA7fuJu6AtRorcUpB4sU1UmYlFCqZAvo+5q3GimQyGh2jCTnn8wmnCI2Nikb3KRdBS2DpjBD721oq+fmSIlWw+n0avJ1PSnWiJI8fvsRhDjSsAa0S+3N+LMKWTZMXy+3ljtZyoBXy3W980Yg1CMz3Mfc+BXbpXAN79ztXwUqKsx6dlPlB15+1EqEBNZEW7xJY8LVhYKMwxpAR+jPeHYHYBfEZCi+xIqJ+L2lauksjacI+y7DV5yWd83UTExc7rn9sp5G8oSt+cJQiJwOoMSeVm09YfZI8/AV5kQyji0JPOWr/lFUcRpvMg3aoU8L2fZ2g0yzt+PBWEkiGNJEKBBggxgmVuNQdwExIDixIZUiwOssy68A7CbTRSOXACxtZEdzGulxC1UoVU+KK+IW1q1b97Ol9+7aDuwGPTMclCcY0KptPi+iwwchIW+nla50FKQSNKQoCYgnz3QCCeu9X7jkgj5VeIqMYpUhA88FkJ31OggTJ2ZnXniKdxOnvEvFr70pQ6RVB31vpCglZEY7r6zL7WpdZidPWcCmCfvbXZa+xFOPy/P9qqNVS9ovUd7v0XTB0xT8vGTg29j+2LULKKgFbFx9V/tpb5esv+kgIoZCwVZRh7rDfPmMUXrCqAd96eBrufmI2WI007pjoM5pziylbkFM37z9/yzI4e8MwnLpmGEZbBeyZ7sKDu2fhB48ehMf2dWIVUFf9QwOwxAknWVeSlDWRFu/nWbeBWwmUVqVUEVy7AcpNKORTbi/dvX/fl4mW0hc1/5lXLgG4P962VGr0oG1YO76i2Sh+Lgd1nSDWFZUybyFSK02EmGQEmiBhLAj6K69nCWjy8xedthK2/soaeO3pK7MXqmj5pp/thY9/6wnYvneOZAdoOZejuVzhFnrn3BX/uGCxT/ckGQT1rwKMW8OF88IB97T8ijP2HJw6kN6R85951WFQZX9qjEBTV9hsNj6sQENCYViJOQobjxSeEtG6B2VCjdqcp1lskegq4RzvGLTr3nwyfOPSX6oFTT3G2gX8/nlr4KdXnQNvfMnqQLNemoUPUhPeDZRKKRPCeUDkWojgNtjrLuW+Nl5KJEaLWCdxvEqbqcGJZEsJpPABViM5SSTpP4QT1k2sk8ffhRD0gaAWl+V6JFImRGyVgfe7BlAj5NI1CKPStPrmpafC7/zyROXCDsz14MmpDswuxAZAu8HhS285FT7+m1us7tMJQKsaCWiCGD0Yj48Hz456weiN626G0ug9dIxTet1ngC3fvXrF8vUpaO33fneJVmUfqzHO1+r3skbBPyBPcISGsrAS8bCONzGpvWkPGOXYqGmf9RsjQ0VAU96y/3bFmfDC1UPR6X7lzt3wNz/aDf++4xDMSHpcNdKA818wBlf9xonw0i1j/n3/9cJNOnhx1Y2PuiQZSXAyS8WONpU0un0re0L7MiBVhb6GMomZujw3V9etswnSHuFG8uw1jRRF8X75oStJZasm5vbl/wSdv/y1RVBlPTVGUmbvDLZ+7fi4fPX2ShAYqI4TIdJROl8njVzEVmOFGq0FiAloanvlq9ZXQHvbdQ/B1usfhh88vB9mpMSp39473YFbfrYHXv6nd8PH/mFb9P4rfn0TTIw0iMVppc9aqjaNQYyfqmtRcDs69txDLFa+Vj4cOv0upaxn/xb8vbevWjY2DiYq6nxitjiqHEyNwdk2hhSTd9ml8leXhfwa8dtIfJHqs0gHCqiClqNGWq2F6EFT3/MH501GF/KGv3oA/vbHu+VgJXqWhMr+5Jbt8KnbH48+99HXnWjAKYV5ihCt8VRaicSgr0cpHF1KAIdbDMaGmjAirdl2kwVPhOpBFyTQRlu5TH7HZejGloDWvvyORcYqq9QIEf/au6zZ1PfYH2Lq0wD6aAelzVjKiC4gvtZA0AQSP07AizeMwEkTQdquuf0J+Md795jIC4YnlEaCqER9+P88DE/sm/efvewVJ/j3eENFswSVcFMAy6NqSfRWZFsquWXDTRhuFjDUkPvSTVsx3IDRtrIrw/lwblNHpfPt9M1+WUPHvrA65n3dgY/9v/poOjk/G+BjmzaslvYqfttF98syUKN2OG2AtRSxReldAOfgChFHQOg5UBYQgTY3jze1IfKml0zC6etG/JkqfdbpCmjw9Hqryd7p+R6cuXEM1ixv+cO33bcHbvjx03Dzvc/CgfnS5Nm4CnpwE38kr9VIqOvqlgbI0eFCm/vcgljYqEuhtRqDfTMLOsjQlqCOj7RhSr7Wuk+6Bur7pJ5T7sOr984c+l5Q5CHI2vnshf0z4JgPJrMkLqmel4DLYoukQisxQChVhYgGJKGeOtBElGv70IUb4MOv2ajBSR/nbh47ohTJRWdN6qeyRK+5dTt88vbHtOPMbXm6y3aruKo6Kg0zaBYICz0ktSlIalTQ+4XDLWO4T461YHq2Cz15U+u6FRC2oFr5eHJMAb+fTHboW+DAxv77w1XQMKpF9s/hdqs1ObF8hwRiIg7phFQGPeYc79S3q4vwU9/MHV83VsA/bj0dTls7DM/X45v37IY3X3ufqfEpVOTDRv65cahNMptZXWOl0SZYOYb9wlqp6j0KsN0HO77gSN8YyiEvdDRl73R3YfNCr7dAAq9B6j736nx2oMb5Zklckq0aX/YyuZ1wjjKVNEFrSojVGHyhJKLvXxNDKAHNONenPK+gqcfF56yFD150opE2EWKf2vRzlCAMVXIW6lN8NRgPFcvcZkr2SOu29IaSjeW6GKYc05Fm+3wvKCGOV1t6yaF/jb21dPRreZOxC6Mq4yjtQgATwQDxoSxfFItE6tIMNZJgt4DXnLoSXnHycjgWj6t/6xRYPsTNuZRoZ/QIWwkGtvbEUSSScJelV1cIK9+791BH6rmedTXc2NjkbOnSVHihsfLRM50br9a7b+/jx0XOY8izkUpJdeyVabm4qFQiC1IDKXz0Pvq+FDQCpL9p5EevuXgLHMvH+y48ydZcWqljVvLAVGq583ZOGAuWnA9CT3d6MNPphlyi1/1gXYPSAldeQENgwVXKTgut8+O8I+gtymWjw20JzLkQ1UWCjy+iSItZhbfCgSZCReIjZpxadez0te2Kg/18Py4+d22IYQo0RURIJ4K4CjB0JengJpGYuR9MuwSbVo3A2uVtHW6DtJzCJ43x3Haj0UYXwwnW/CKoMp+T018igTtD/m0YicUaObieGhPdBiIfa0wmIEaSL4//8sZlcKwfG1cNwYg04zX1oZM2I4GuMJnRWkxPka7ISLoo0ghpSd9u+VBDft8wLB9pkhvc3vgmujTcLhpnyCM8seb1o/Wu2wYlUumHPPJcWkhnRjRplWyoC4G4RoQWq1oQBdVhmHcHbIgeVo0Uxxy44VZhz0PYxLhRAb7sxLkKjiqZs1bsIHJTe+LAVFIyuawlgeSBMsvAUPJ7zrTUyLxxiPkwGM/XmHjrRostmglfp1amOdHJGy5jTMvBvSuZocYKaMS3k991UPpUx8OjLc115mOVLmkKJHkqwsRIl1QlOi9UO5iDyg/Vvh3SyJF3mU6LXDAkACoj5V23Uh2HsRVJ0xfE8ZZfemKQIMhWGaOjRgz5KuHqOVDUUyMF0ILf6SEcPw9LjY7DkG4JNbrXLOg5RsNPaCaVNBnLlNfriMYWAlp6g0dhoUZd6R1WkIdNQAADatpDXE1Fp0gNpsaq4y8Ao5lJx/KhBlRRo/bNkEzH8taDzYIDnW9gs+EObAzlDShCeYRRRtZA4RrMTYEqvXGCOQOy4sd5aoz8OP0lE0gc+hDKSifZJ9RYl19LdSspsM3XdB6bh7ccHSUiMfmtgrOzVIGGmXx5A5k8YqbKoY+pIkAcqEAxEUBDx35Z65JnqBEyoKn9lVGlFRCrkaRAhP+OQI1I4pR1oFnzhYB9/ADn6lIcFfr6EyTS5AGmxUNx6JERtWGpMbK+JYjjFhPiFobSCfVsvvOWtJKZhrhoLYT+sJLMNiYgRDoPqslOzNU1Zqgxfp+AfNuOY8mXoB1xxsOM7iB1qIuDwHbfADubhzrjzF2X/XinWxJNjyHKx1QnJG/JkwiKj777wHO1QU2ddYm4rCJxtEuCx0YQI3UJoAk4/gCLoiGuygtJlMTN43ZhMBurZJkQopXGuU5Xp3aCUcisjagGoBxN0mikCUGsbngGNJaA5va7UVhKBDfAi51Iuh2IQdSY0CeGE925f/64AG77MzM+amiCzobyvLR5a5HMGUeIKdRek8oQ7No/q7chQQxEpbixxhBJq/jWkR+HVdDCgLq45bSXrDR3JtIoSJIFSCIlMTVWM/AXnroStr5iw3EB3GW/fhKMjzbIRP54WpafM25NfR9sduD6y0LYNTULcws90gmJprM0kDNePvtiUpmRGol4YpbCtDw+jpWSNQrDYqkRopp/Z8xsXNGCr771NDj/pOXHDVX+2ZvOgqvfcDr8729vh09/65FAiylV+t4mNCnGdGHQ9Jyixw4cklvPf0Yh+r4ndlwXMDUKazI3vN5UxwCemcwxDb4AlFAbfT8SXVVHjXXugPzcZ3/3lOMKNPcYbTfg/a97oadA6pD72arUQQ9RC713UAI2Pd8NAQagaiXSYfvrQcMaPy6mxuC9u8wFigOReCPGJQYVJ3Hx1OhennMcBJbrHjOdHomlMmKAhOCzcxQYSVOp0qoTVg3D+hXDZtaqKn9gAImKcuO0F5L6VeKQ+0fzHf9g+5zUlOgFe0i/Z6fjaqhLyQyixsp7CPiqbr4njlvgXK9QZuf0KQ+JBpeFLScwOpBH4TElHauWtTSIHanjRltN2HdwXhfs+uyb0XuPh36K9ZgQPy6JPlcKYfW0qEdqc3cDoyAZ0ETyfl3WONgXuPGuXfCFf3oMDsz2oFFA1IK3WvDEKjdSeq4L8mbZNDkCn3jz2XDSmtGB4IWosXPcCjfxNOg9ZxMKiIqglg+3gA01DeDL2zC/d9bGK20gG3V/TFaHCfGrsVEjZRVDRZRiuy6UyWbM48JRTGr8+/iJNNQ2ELQ9hxbgkv95V2aSoguHs2QaVY1fmNxIP96+HzZOjMAn/+DF/X06V1eCNgqCRYhd+mow99MMKnU8foxUgrUJa1cOwVP75uyNp/xfvi3fQybpFBEZJ32buigfpHyERO+A0VZ0cXAaalJFNTNFxaLDW0NNDi9cvywPGjDCZ4wEGStBRJ9AU2PbaDAYaTXg9I2LMIrcRBAmwlAQnd0tbb4OmS/biJkIiZ5ETZmtgvuvEgwfrbJXpAM9JJm6yjy9TU/PbpsYXz6vJlBGoSD6xW7gRL3Oy30/VibZ5x/Lhhpw/zUXwn07DsDsQil1xtJSCKp04I77n4EPXH+v/tUTxkfg76/8jzAx1hpIk07iKC+rDDeTfO302TMH5qErqXflSAvG5Lm2ChYMOYxHWH1VU55Pu1VAb16HwOa7DLeROHHkeGPiEjQW100V5Qn1upKP5RXjeZHE+L7vDjSMKQr7ZweiJtqLEDw1bmdvWXHYRsbUbNcmNFUVMYOXnjy+hPCXj/n6xCltB7x6bEjq3g7smZ6Hp6cErJDgjY8aqWowFrjBjtGsBGxuvgumDhruFSo6VUONKS6N/o5z/CXSQPmhPL/zmI92O2liPrhsGm4GvecnwWcpGUJm4Xl6rF3R1qCp8oEzNi7NZ8SkNSJtJqWj8JJ21y4fhpXDTSl9c3BgZgGmJIjDkuJXj7W1XnMfnZcW5e6peW2QqTkFcth+FNfek9hUBpdG3xxZIillr/xBoyjeG+g1bejJiLQxe0OKGimr0XnP8ePUDWPwi794DezcOwdnbV6a5MYZcGqokKpxZih508Qo7GvNw+79szAnfcAn5nrQlgAqui8lnSqqV3PldPsoXZIO/zxIyig2jUH+Ai3Pmjo4fc/k+Ir98vV46BRNG3KSjHGNO4B9dJ66sOfjceLqUf08rOyc7dXlaZOTZl+kMkD9fdUyU5K389lpabh0tZR1Ol0fkFZl6Nb43b9QsH8HUlo1CBdeMf9i0KIGIqUQPSHEbaH7DkbTjoxRwqBalUzTPjmfyvVyPH4fSlJ8y1/fOZ2UWJBxYy4JJFB3ftgs/cR2sxGuVZAWwMZj+5apl44ayWENaAgVdyCmLiSZcf8tvV55c4gYmKZjocejs7xI1sBZFLXuQGjq+b4bHjxugdspneVQZo6k4zm4PpXxnHERWuoPNQvYMD5sJoFgKIHwEUnObsZ4EkWsgxIG7H3+9SStk5cykoAwUjx16NCP5IvHvXvkyrA9OCFiHooN+4XVQnTjpp8+C+f+8b/B9Xfugn0z3eMCsG27p+Gam34OL7/6DtsV1kodNyzJnXHGMPRZ9kIQ4rijLTXRsQW+N7ofP/Z4p8HuzEQsMGo4XcnH9THXkTpoAUrJlvh3QH1aElyrTKUUtM99jSFE3IcHdk3D2754L1zxtZ8fF8Bd8N9uh6uu/yns3DMNew/OwUK3jPx7d2MaTmKhi1GS+tKL+NgZquBrV1SHWbghqmmMOqZCXcqNVnnFRUNYqb8LZzA9O3uD/OFZ6lvF/fuTTADGmeAog+CLRhlJ2DP4/kN7jzloKn/2tDTZHUBqxk2nJ8JER2qQkPJ5oAlmgV6bTUhjZVK6Czxou9leo/i7uLFKZcwhV2jFEykgfVYRkgYfjoOxs7BwQMrd1123WoaJoYGuf2fovJMNNAODTOBK/7NrqgN//f0dxxS493z+7kiqlO+nav8ZuObZEBlXpjbdUqaIb1Db6l76kSOwbKTlytW/XnI4EAGGtd1SMVO6kBjvSEu00hmS5vVsp3OtvID5sLyOLQ9FJByOJNpAehynsUaWhEZsof27v3o/fO/BYyN5f/KNB+Bv/mV71Mm1KY2Mhp4XHqq5nQqgFc5IujUwgoGrehjSbg+b7zX4tXkpq9oaVQccI3ePZQwVGkz0YM7Nd54dbjavl0bJpWExBbDdxAXEQuYsMJEkdjHrXxrH3Xzhaz55J7z/ohfAb56zTk9VWj7c0Hf+AG9raX9E1YmoCwdnu7Bjzwx8+uYH4dv3Ph0v9MCZieYVZAKjX86FTNREVk0sC+IGus4YHK4vC/5snTrKDQ41ONnwB++GKOMaNI0ymAqdcDL5i6YBGs1W3YCNYsXY8PCtpehNqmiA75Qn3PTiMMnRtd2F+KxiN8RNLxahbYUPiYnQ8gLJvk5UykFVAWfuqq0y03vDih3gOyS4cJwqlytLEYPL0mwDg/GxFqxePmJeupU8PI+IWM+5YiFv9TNf2bxzz+y+KWCvFUzTpDKfe2aLZot6xchSzXYMOYlgIJZf/M+0yqtivWCci3Az732vH7HQ6x0qy/IzmvMZi9akCQtZWFNZoHcZsDbtE7rY+SCuG0jbaRzdVCb75A1JX43CTKpXrSfU7JqCGcngZt/8zUy+L/Q+t+0qjJL2uTz/vRxCdlR3u4MJKe0Ty0aIzguuNlR6XgqfvWGRFc30tOKZrvgLCdohCKnW4D9Uxj0OwCvQ6tyBpCUrkI6fBrSQK5V+3czMjXJ7Z7irMVhNrmwbw93tG49ThzxdPZaxMHXJDqaupdZPXgHNAOUAY7p/CGcGGN2rRP1NAWXfp7cNNemPQ6+0he8ONGdJ2RiiXntsqAGrxqQDXYSiV6O7hZ/k0lkoQd7IdszJgkdWSyjS2HtwXgWf7+y0ihuTDLSwLQEjlWTnGGYDuf1a+1aUJoa7QpAMqJjvdj861Gh+XS+Q52vnSW8uDDYjs9QZ+liT5tSuTLuiE9CujmH/aK2DwrapACfxySR67krDnUCpWhCSW1WfmVMUWZD5apxFQQEF1LKhlm1PDxFo7l37pyUgU7P6PWPtpq4vaTcKrTIOzi7oDIBqoDM93zuIQ82PBklDEcYzBQ3jrlwDsgOYVBlBBFgQ5dCxGpHPdRZ2NnjxkYLzT6u+zGYlEjPFwasKmqhgxAJLpc+v4MtCETayMM0Jjf3UcJ1/GG0Qwz3jOSJzBauGzulkDICZhS4slGU1W47hd1XnnzFpELl5A24egPuOfYfmYPfUHIge6kZz+xd6cEgCqTpnqa5S3V5pOxNx1Wrv6rJR7CSgkVkzjmO1kOXXhKvMj6v6WJiARhumOBJ3d4oueTo0N/udFcPDX5Pj+Sa3YJDxa5xqTvtR9sn9IcYLB7HYJGxKqisYI3X8pqOIB4as26YmZDgGRHkzqbu/K8FSNfyq1IA5fUY7wXKwbQ5RN1NrNHiYOkVW6Dg4Mw9P758xJgQJNvTUU2C8jBlnX+u1m3dAxFqeuXy3zMQtiBYKKr/0O5UqL4jrD0LR2CJAc5LIDs3NfWpsaPhMzsTZgoX2SJwGxF1s056jr+9BjGctiERJuDyUMzactYhBNfl13jBQpZNATVVzC7oDUn41OdNlzZvzNjelenAxy9+M3DwL3a6WNAOasDYVXbPH3kTG77u3HG5/KqFGCpqZUY8ZwIKhGJ0xrytgxdi6FIEqs6CZnuCIndlu53J5pju5zQpzFpacdP0AGI2SqPwdWZwWXTU0Y3FoTJgF9wrOAjUy7ls16YUZrHRpu0IfR9PWyQLbs00/wyIQwdlHRkAj4zTkuy6An8vdkRS745lpWFgoI9AqBceGlp8UQ+3L5Vd3CDXGoEVjShtjBhYov/S7KXDxiUaAYeQOkObF5IfRNTgy4dWFbm+ftK7eIwd5v2kqHRKtHOJ1zX2wFUO3BRDkJ5xLKYxkqoos5ppTM+4n0gOjs2NstztrjHBruBRBLL105e0xQaMAuhOtMxHVVXbme7Bj9yHodEynIFdD4q1lN2NVnyfsx3bzj0TB95EJ8kTKLGhVtwDjCYfVB68pYMWMziPLZ4DraeRPwPp5+vVcd+HRBVFulQN20HUB55VpSMma3cIW0dCODa7XpGonyKsdDVwfLQOO7T7uFy4iC9IqqixLMi5h5cTUiPa0KUp9jqpHibvJepJuVZZgQbV3QgoaBtBcwzbGDmG79c6y1Xi0nhqDgw2knU8iupgHrkqNcbwmTOgWUHUHlOFUZnQezi10H5JGwFY5mPtCJMMujpeGl53VicJPlKDTbLmtwact4p1TbigTLS26Zp5o3TJTp6/mo83OdZMGAyIkPNMVPTBE/57cOwN7D8zB1HQHdjx7UNOkB9/ez441PGhq8kar9Q4J2oNB1UTUWNroSDRmEHryR75bSpO2yqu2TBzJlNZkyQtfYO2krAQ6LctOVJjrdX8x1Ghc1mTsf8mrWg928SCuP0AmR2Act2RuXRv702rBBbOmW1g1zy2N4sJYYcYMAVP+p0rMlZ/ly9sZiURE1xxPNHTG3cycgBk3gxSRlJe4KjYSMzCgPQVD7XeXzca21D7QN3mQstROqBol2bxcJjtQU8BKikZ8k3dHjSSmZgHE+O6Szvm2+bJ8ixzg+00nVW6yx0AsQzfwAuOVhtXMFjQ0aKTR0pHrZufvEiTdEMy5q6aeew/Na2np9UQIUHhtTFr+ulioSFpauV7NpCqZkS4JjIS9jPXIHsDhobdq0KrUWJKbnI4Z8Y0T80Z1V//yJXU6LlNOgLkiSG+0i7BaQnTH0BOjOg+7otwzU/YulQh8k3EbweBhZV9fAuFfB2ksWJiHBkAAs5Lp+mwF0NBMIpxdgHlpQAhBqLEkoAmMQEMa2LYghmx2aIERlkICbwQp0KSD/U0xMvx20SieCZ2/KWgQj00+oBGVifRLcjRid6C2JAwx9vOIyWdYL2mqUtLOAcqGkwPTmRbdj43wxt1SD10lB2dU06aNfuoAsgiGFFrQbGm9oUqOwZqEuFWFsyhVDWNnvku4Q4S6fxrFJ3SXLorrQfXLDmB15RZvpPIZ6Vx+ojfcviUKFjujLVAjjfiXqU2QhBiNbquRtqw7ANVJG5gUsGJ0RxlqLP2JBcVb2milIGEdnBW9W7ogLmGsuKtgrlUuD7qJ1Gk6S5IjAcr5fRhHK4whWMKsBC10Niot3TmaJG2GSyJZNIVkJ9br3yNpqGA1ci9l8nkXDrUuKfuDRqmRgIaiImlYVwGbk7hF1fZjmvUUyRwuKmWk5ViaujEO/4LAJ6W6/y9DnL2OI38P8HJShaPUPDHB0K9Wr8aygJD7ctai/iJrGLjVgOc7XT1rtNcTQdIq8xfiLgdRvQjNWgjinLvshv1hc5jvkXfVZ8vRoZvpTZlQY1mRsgBaaqBgPG23v7TVZAcytf1hNl+q81zNcknmOjncWdRtNgyQi9aIecT/K+nwuy3gl0ppu0RwHOLCBpesZHTldqhV+J79PpxlI/cLPTVxYkFbj85YETk3KJkxk5YV+ImAjEWX7V5bl2ZeAnaDGGp/ATk/lKRh+lFjL5McFX1KFgbXVA9d+S+LLxOHaDUKu36CDsnqTDmaTHmhZwGBmjTpM+gNMGm6AkJmjXYXUH+YbJX4NunkXIyiHA4rRIEOHqs6jbhxt57LoH006voIei1YAxq5Jj8BEavzH/z6cFJ1KsNKtFtfwkaxJ5n8kAOtR6RMgdaLpM4ZKUhv/nAS5Zd/b5HALbK2P6FG34RUgWGDSGpebWEl2W6xSEoguAExAIhhZQtWIC5vIL6eleK3JUgbjV8uopUakRgQyEgBGu1qELk2mM1AhDW+SX8umodgbKcE7BtiqHUjFvxgXLwTUaMgVmOZgFbakoQytrhBJFkAQ12LAC3ScYMbgSaUGT4gMA/swIkL6HIBRDeWDA6UjF0nlcpXWoK9RBoIr5Vv+DV5qSvRLnyOSBZbtyPgjBq3dqmvYQGIsgshg2uC0EAK6KylNiWNju9KoG4rh1o/icNQlQy1D/NlrMZeAiINWIhMFgCX0jCQqVVxcbA7kL5mpLDORUqcBBUZKbMUqumTW1rlQfr851nuBlDVEA0hzmQ98avyO14in2fIq2yDXTnKlf9h3TwITAILcQlaR0rVz6U78hOpt/5VtJr3+zZ3cb8PqtczoKGlSCgTfUYt7ixozvQT1/3eooFrDKDG2miKTz3GJqygmfNq0FQ/CoRK3aYrWorDmKG/l+hydi+0intNqkxqGiFOZoKdIv27k+SYbZBvWi8BVq0Z1aS3tgTCTnnGeQ2OgAPyDpiS+0/JX9klxW07cvZI2SwelVLYS27QZGGEyICg1OisQmo15qixzFAj0pT1UkBblDuQLWANGQSSNNMXwyMPN3Xd48Ij7tsWBOuKZMfiXh/kWxQr9noFf0h66A+ZY67xdtS6MTFFsL6Qs3/1MDVAkEgNlbQ6KUtBo64DvOjc8/H+n9y5ZND6ugN5ndQ3IO3CEtxbSohpsQJdramwrwtyMbYxv6dP0q8x7ZKKtOcY9JuWVDNREPtL2SDQiNlfBU1kqJGswmCO3P+THx52pXVjSVJWBRbjtc582ofTXhFYWcHPFxoVATBraToLJICWNCWr/Gb9TVfJt0FaopEDDdNJGBlqFBmHuoykECEHWkJAiiLfeLjALZoa694TU6avuYPQiTiVMoMlJxdF3ITIvXCgcUKFaQdVTI2mai64ViITwADpSu4ZahSEGmOqrIKWUiMi1t5hhwHc4VFjOhZ03gHlG1FZtQIjgwStlKGXuDBfkHtL0zX9h6gpGW34DdQK7TOHuo+UVUz9lBppRL9M6DI19aM6Sewr+nAEErd4auxngWKYHVdpuZ4L7yDRZ17qDGgkuuKMlUTvZaxQNoAa05PGPlYjJlKTgJaRwpgaA2h927rjkQK3GND6rF4cR13QdwCMpZEloQyRUKOAGLQQXQkOOod4LQQIZSwIuTVpBlAjZBzqKCrSr6QO4txkxWqsB+3Ie083DpMaB9Aq0XsILO5v6DvY8IRKBHHiOXHIeQRYtYOq7/kJaX/+KlskDTQr1IiJlOWKV0lVN2JWymIle9RBiyTuMKgRBhoCiKwinhhlGjjRJdRY4SQOypKAdgoaZJpxshpTP20cltbpi6g8PFdyH6dhRBprROzbpumo9eFpHAVq7Js5j6y/Kh2XxGp0A8Rd+DGhxgi0zBprLA9a7RIidSXfglCpqLS8i6kRDp8ajwzBBh4dahwUdYnyeUnkBawZTdr7eyoUiUuQo8bUWKmJBNWClvEvq1QKsf6DXKxx8VKGR0Hijh41DqLZ0P0EMzMaY3AzuszoR4wD0f1AYzV19xjHSpO5gBkHPJOhxsiUxj5WYz/Q8Ih13FGjxro7PYlPhwrHjNRijdWYShlAdcku1q99I1aD4n2tzKSKGxKQaTEOLFnKjtClazxH1AiJiZmPbwbDAjPhKFolBll9FoMLmXUTkp/PuAVV/YdJLDOvuGvr+p970EKs8rmhRqhnEczpHQaZCX0YuxTpwk01kpbNDPQJD2Wc83zL3FSfHSY1HhUd95xTY9/31YSjctEX6uOz5MtYDTXW1Zpghp5TY6ry9/rquedHyvLZgeeeGvu4N1iXOWOVtTjDT/RtmNIHNKgFrcZh7x9mfP5Bq80OPMfUuJQ0TDqoLKMjF0ONAwYR0xbRA27Co0GNeERQNo4hNfYZ7IGxxjqrkQ2QskVYgFgflz5qUoZHnNhpVA2rY0KNNaDVDGq9PsNFUGN/BnnOqRGPyvKv/1+AAQDm+IquP/pHZgAAAABJRU5ErkJggg=="

/***/ }),

/***/ 34:
/*!***************************************************!*\
  !*** E:/uniapp/ykt/static/images/menus/menu5.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABuCAYAAADGWyb7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJGRTUwQzI3RTc2QTExRUE4QTc5OUEyRkQ0QzVDMzkzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJGRTUwQzI4RTc2QTExRUE4QTc5OUEyRkQ0QzVDMzkzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkZFNTBDMjVFNzZBMTFFQThBNzk5QTJGRDRDNUMzOTMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkZFNTBDMjZFNzZBMTFFQThBNzk5QTJGRDRDNUMzOTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5oD5COAAArV0lEQVR42sx9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"

/***/ }),

/***/ 35:
/*!***************************************************!*\
  !*** E:/uniapp/ykt/static/images/menus/menu6.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABuCAYAAADGWyb7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQzQTY5MkI3RTc2QTExRUE5Nzk5OEZBQjFFRUFDRkNFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQzQTY5MkI4RTc2QTExRUE5Nzk5OEZBQjFFRUFDRkNFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDNBNjkyQjVFNzZBMTFFQTk3OTk4RkFCMUVFQUNGQ0UiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDNBNjkyQjZFNzZBMTFFQTk3OTk4RkFCMUVFQUNGQ0UiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz53WNR4AAAso0lEQVR42tx9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"

/***/ }),

/***/ 36:
/*!*********************************************!*\
  !*** E:/uniapp/ykt/static/images/l_boy.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABSCAYAAADHLIObAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3ODJBOTE5M0U4NDMxMUVBODUwNjhCMTZFRjBDM0VGRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3ODJBOTE5NEU4NDMxMUVBODUwNjhCMTZFRjBDM0VGRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc4MkE5MTkxRTg0MzExRUE4NTA2OEIxNkVGMEMzRUZEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc4MkE5MTkyRTg0MzExRUE4NTA2OEIxNkVGMEMzRUZEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+9Gf90gAAG+pJREFUeNrkXXmQHGd1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"

/***/ }),

/***/ 37:
/*!**********************************************!*\
  !*** E:/uniapp/ykt/static/images/l_gril.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABSCAYAAADHLIObAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3MUJBNTA3M0U4NDMxMUVBQjlGMzg1NUFEMjQ1Q0Q4NCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3MUJBNTA3NEU4NDMxMUVBQjlGMzg1NUFEMjQ1Q0Q4NCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjcxQkE1MDcxRTg0MzExRUFCOUYzODU1QUQyNDVDRDg0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjcxQkE1MDcyRTg0MzExRUFCOUYzODU1QUQyNDVDRDg0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+DxETxgAAFwRJREFUeNrkXVlsXNd5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"

/***/ }),

/***/ 4:
/*!********************************!*\
  !*** E:/uniapp/ykt/pages.json ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;
var DIFF_TIME = 60 * 1000 * 60 * 24;

var statConfig = __webpack_require__(/*! uni-stat-config */ 7).default || __webpack_require__(/*! uni-stat-config */ 7);
var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq',
    'mp-kuaishou': 'ks' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var Report_Data_Time = 'Report_Data_Time';
var Report_Status = 'Report_Status';
var isReportData = function isReportData() {
  return new Promise(function (resolve, reject) {
    var start_time = '';
    var end_time = new Date().getTime();
    var diff_time = DIFF_TIME;
    var report_status = 1;
    try {
      start_time = uni.getStorageSync(Report_Data_Time);
      report_status = uni.getStorageSync(Report_Status);
    } catch (e) {
      start_time = '';
      report_status = 1;
    }

    if (report_status === '') {
      requestData(function (_ref)

      {var enable = _ref.enable;
        uni.setStorageSync(Report_Data_Time, end_time);
        uni.setStorageSync(Report_Status, enable);
        if (enable === 1) {
          resolve();
        }
      });
      return;
    }

    if (report_status === 1) {
      resolve();
    }

    if (!start_time) {
      uni.setStorageSync(Report_Data_Time, end_time);
      start_time = end_time;
    }

    if (end_time - start_time > diff_time) {
      requestData(function (_ref2)

      {var enable = _ref2.enable;
        uni.setStorageSync(Report_Data_Time, end_time);
        uni.setStorageSync(Report_Status, enable);
      });
    }

  });
};

var requestData = function requestData(done) {
  var formData = {
    usv: STAT_VERSION,
    conf: JSON.stringify({
      ak: statConfig.appid }) };


  uni.request({
    url: STAT_URL,
    method: 'GET',
    data: formData,
    success: function success(res) {var

      data =
      res.data;
      if (data.ret === 0) {
        typeof done === 'function' && done({
          enable: data.enable });

      }
    },
    fail: function fail(e) {
      var report_status_code = 1;
      try {
        report_status_code = uni.getStorageSync(Report_Status);
      } catch (e) {
        report_status_code = 1;
      }
      if (report_status_code === '') {
        report_status_code = 1;
      }
      typeof done === 'function' && done({
        enable: report_status_code });

    } });

};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 8).default;
var statConfig$1 = __webpack_require__(/*! uni-stat-config */ 7).default || __webpack_require__(/*! uni-stat-config */ 7);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig$1.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "getIsReportData", value: function getIsReportData()

    {
      return isReportData();
    } }, { key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref3$key = _ref3.key,key = _ref3$key === void 0 ? '' : _ref3$key,_ref3$value = _ref3.value,value = _ref3$value === void 0 ? "" : _ref3$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig$1.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      this.getIsReportData().then(function () {
        uni.request({
          url: STAT_URL,
          method: 'POST',
          // header: {
          //   'content-type': 'application/json' // 默认值
          // },
          data: optionsData,
          success: function success() {
            // if (process.env.NODE_ENV === 'development') {
            //   console.log('stat request success');
            // }
          },
          fail: function fail(e) {
            if (++_this5._retry < 3) {
              setTimeout(function () {
                _this5._sendRequest(optionsData);
              }, 1000);
            }
          } });

      });
    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      this.getIsReportData().then(function () {
        var image = new Image();
        var options = getSgin(GetEncodeURIComponentOptions(data)).options;
        image.src = STAT_H5_URL + '?' + options;
      });
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);var _super = _createSuper(Stat);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _super.call(this);
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"_from\":\"@dcloudio/uni-stat@next\",\"_id\":\"@dcloudio/uni-stat@2.0.0-30420201231001\",\"_inBundle\":false,\"_integrity\":\"sha512-tfnMahY27Ms6VyqzGQBEXQoJTM9AH9K1BQG5xQOAIDJlpZ4aDJEpuA8TiNjMeO6Ct7eFU4HUDiGmH2RIL1JJHg==\",\"_location\":\"/@dcloudio/uni-stat\",\"_phantomChildren\":{},\"_requested\":{\"type\":\"tag\",\"registry\":true,\"raw\":\"@dcloudio/uni-stat@next\",\"name\":\"@dcloudio/uni-stat\",\"escapedName\":\"@dcloudio%2funi-stat\",\"scope\":\"@dcloudio\",\"rawSpec\":\"next\",\"saveSpec\":null,\"fetchSpec\":\"next\"},\"_requiredBy\":[\"#USER\",\"/\",\"/@dcloudio/vue-cli-plugin-uni\"],\"_resolved\":\"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-30420201231001.tgz\",\"_shasum\":\"5e7de462d64c104b3050187fcfdc126b58e0cf2f\",\"_spec\":\"@dcloudio/uni-stat@next\",\"_where\":\"/Users/guoshengqiang/Documents/dcloud-plugins/release/uniapp-cli\",\"author\":\"\",\"bugs\":{\"url\":\"https://github.com/dcloudio/uni-app/issues\"},\"bundleDependencies\":false,\"deprecated\":false,\"description\":\"\",\"devDependencies\":{\"@babel/core\":\"^7.5.5\",\"@babel/preset-env\":\"^7.5.5\",\"eslint\":\"^6.1.0\",\"rollup\":\"^1.19.3\",\"rollup-plugin-babel\":\"^4.3.3\",\"rollup-plugin-clear\":\"^2.0.7\",\"rollup-plugin-commonjs\":\"^10.0.2\",\"rollup-plugin-copy\":\"^3.1.0\",\"rollup-plugin-eslint\":\"^7.0.0\",\"rollup-plugin-json\":\"^4.0.0\",\"rollup-plugin-node-resolve\":\"^5.2.0\",\"rollup-plugin-replace\":\"^2.2.0\",\"rollup-plugin-uglify\":\"^6.0.2\"},\"files\":[\"dist\",\"package.json\",\"LICENSE\"],\"gitHead\":\"5c980c1c6b7753f08d96482772a9b6ae8b66c9f1\",\"homepage\":\"https://github.com/dcloudio/uni-app#readme\",\"license\":\"Apache-2.0\",\"main\":\"dist/index.js\",\"name\":\"@dcloudio/uni-stat\",\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/dcloudio/uni-app.git\",\"directory\":\"packages/uni-stat\"},\"scripts\":{\"build\":\"NODE_ENV=production rollup -c rollup.config.js\",\"dev\":\"NODE_ENV=development rollup -w -c rollup.config.js\"},\"version\":\"2.0.0-30420201231001\"}");

/***/ }),

/***/ 62:
/*!****************************************************!*\
  !*** E:/uniapp/ykt/static/images/users/user_1.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQzQzg4ODk2RUQwOTExRUE4MzFCRTQxNUZCNDZFNDc1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQzQzg4ODk3RUQwOTExRUE4MzFCRTQxNUZCNDZFNDc1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDNDODg4OTRFRDA5MTFFQTgzMUJFNDE1RkI0NkU0NzUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDNDODg4OTVFRDA5MTFFQTgzMUJFNDE1RkI0NkU0NzUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7X8/xCAAALT0lEQVR42uRc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"

/***/ }),

/***/ 63:
/*!****************************************************!*\
  !*** E:/uniapp/ykt/static/images/users/user_2.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjRBQjE3QzI2RUQwOTExRUE4MUVBRTI0QzJERDA2RjZGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjRBQjE3QzI3RUQwOTExRUE4MUVBRTI0QzJERDA2RjZGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEFCMTdDMjRFRDA5MTFFQTgxRUFFMjRDMkREMDZGNkYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEFCMTdDMjVFRDA5MTFFQTgxRUFFMjRDMkREMDZGNkYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6587OsAAAMOUlEQVR42txc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"

/***/ }),

/***/ 64:
/*!****************************************************!*\
  !*** E:/uniapp/ykt/static/images/users/user_3.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUwMDY4OTQ2RUQwOTExRUFBNDYzOTU1ODdDRTUwMjM4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUwMDY4OTQ3RUQwOTExRUFBNDYzOTU1ODdDRTUwMjM4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTAwNjg5NDRFRDA5MTFFQUE0NjM5NTU4N0NFNTAyMzgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTAwNjg5NDVFRDA5MTFFQUE0NjM5NTU4N0NFNTAyMzgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz79RWeqAAALbElEQVR42txc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"

/***/ }),

/***/ 65:
/*!****************************************************!*\
  !*** E:/uniapp/ykt/static/images/users/user_4.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU1N0FERTM2RUQwOTExRUE4OEY5QzU2ODNDNjdDM0E1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU1N0FERTM3RUQwOTExRUE4OEY5QzU2ODNDNjdDM0E1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTU3QURFMzRFRDA5MTFFQTg4RjlDNTY4M0M2N0MzQTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTU3QURFMzVFRDA5MTFFQTg4RjlDNTY4M0M2N0MzQTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6quvCaAAAKfElEQVR42txc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"

/***/ }),

/***/ 66:
/*!****************************************************!*\
  !*** E:/uniapp/ykt/static/images/users/user_5.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVBMDY1OUM2RUQwOTExRUE5Mjg0QzgxQkQwMjMxNTRGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVBMDY1OUM3RUQwOTExRUE5Mjg0QzgxQkQwMjMxNTRGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUEwNjU5QzRFRDA5MTFFQTkyODRDODFCRDAyMzE1NEYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUEwNjU5QzVFRDA5MTFFQTkyODRDODFCRDAyMzE1NEYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6TRgjIAAAKa0lEQVR42txc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"

/***/ }),

/***/ 67:
/*!****************************************************!*\
  !*** E:/uniapp/ykt/static/images/users/user_6.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZCODAzQTQ2RUQwOTExRUFCMUQxQzY5NjBFN0NDMTI0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZCODAzQTQ3RUQwOTExRUFCMUQxQzY5NjBFN0NDMTI0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkI4MDNBNDRFRDA5MTFFQUIxRDFDNjk2MEU3Q0MxMjQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkI4MDNBNDVFRDA5MTFFQUIxRDFDNjk2MEU3Q0MxMjQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz73cO63AAALTklEQVR42txc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"

/***/ }),

/***/ 7:
/*!************************************************!*\
  !*** E:/uniapp/ykt/pages.json?{"type":"stat"} ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__99B7F2E" };exports.default = _default;

/***/ }),

/***/ 8:
/*!*************************************************!*\
  !*** E:/uniapp/ykt/pages.json?{"type":"style"} ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/index/index": { "navigationBarTitleText": "GMTforkids会员中心", "navigationBarTextStyle": "white", "navigationBarBackgroundColor": "#F49D1A" }, "pages/welfare/welfare": { "navigationBarTitleText": "GMTforkids会员中心", "navigationBarTextStyle": "white", "navigationBarBackgroundColor": "#F49D1A" }, "pages/children/children": {}, "pages/mine/mine": { "navigationBarTitleText": "GMTforkids会员中心", "navigationBarTextStyle": "white", "navigationBarBackgroundColor": "#F49D1A" }, "pages/childDetail/childDetail": {}, "pages/childInfo/childInfo": { "navigationBarTitleText": "儿童基础信息管理" }, "pages/timeTable/timeTable": {}, "pages/editTable/editTable": { "navigationBarTitleText": "编辑课表" }, "pages/follow/follow": { "navigationBarTitleText": "添加关注", "navigationBarTextStyle": "white", "navigationBarBackgroundColor": "#F6991B" }, "pages/register/register": {}, "pages/integral/integral": { "navigationBarTitleText": "GMTforkids会员中心", "navigationBarTextStyle": "white", "navigationBarBackgroundColor": "#F49D1A" }, "pages/bags/bags": { "navigationBarTitleText": "我的书包", "navigationBarTextStyle": "white", "navigationBarBackgroundColor": "#F49D1A" }, "pages/repair/repair": {}, "pages/record/record": { "navigationBarTitleText": "积分记录", "navigationBarTextStyle": "white", "navigationBarBackgroundColor": "#F49D1A" }, "pages/myInfo/myInfo": { "navigationBarTitleText": "我的信息" }, "pages/message/message": { "navigationBarTitleText": "最新消息" }, "pages/articleDetail/articleDetail": {}, "pages/comingsoon/comingsoon": {}, "pages/classWeight/classWeight": {}, "pages/reportDetail/reportDetail": {}, "pages/lottery/lottery": { "navigationBarTitleText": "幸运抽奖", "navigationBarTextStyle": "white", "navigationBarBackgroundColor": "#DBCD60" }, "pages/rules/rules": {}, "pages/h5/h5": {} }, "globalStyle": { "navigationBarTextStyle": "black", "navigationBarTitleText": "GMTforkids会员中心", "navigationBarBackgroundColor": "#FFFFFF", "backgroundColor": "#FFFFFF" } };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map