(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}

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
      promise = Promise.then(wrapperHook(hook));
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
/^\$|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name);
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
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


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


var protocols = {
  previewImage: previewImage };

var todos = [
'vibrate'];

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
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
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
      var returnValue = wx[options.name || methodName].apply(wx, args);
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
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
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
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({});



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
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
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
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
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
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
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
        var value = opts['default'];
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

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

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

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
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
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
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
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

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
'onPageNotFound'];


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

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属
  var parentVm = $children.find(function (childVm) {return childVm.$scope._$vueId === vuePid;});
  if (parentVm) {
    return parentVm;
  }
  // 反向递归查找
  for (var i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
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

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
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

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var componentOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

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
        this.$vm.$destroy();
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

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
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
      if (target[name]) {
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

/***/ 106:
/*!****************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/git/zubao/pages/login/components sync ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 106;

/***/ }),

/***/ 114:
/*!********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/git/zubao/static/login/part5_picture2.png ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/part5_picture2.2a99dc26.png";

/***/ }),

/***/ 115:
/*!**************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/git/zubao/static/order/order-evaluate/false.png ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACj0lEQVRYR8VX3ZHTMBDelfJOqACogEsF3L1mxh5fBYQKLlQAVwFJB9cBPjmTV3IVYCogJSTvlpdZj+RxnEiWfHDoxS/Wft/+fbtCiDhJkmQA8AEArhBxyl9zvSSiAwCUALAriuIx1CwO/Zhl2VRr/Q0RGZxBQ86BiHIp5ec8z5mY83gJpGn6FQDuIoD7QAy+UkrduxhcJMBe13X9oxPiEK99/5RCiJtL0TgjMJ/PryaTCYOHhjuU3L6qqtvtdst10p4TAsbz3/8A3ALuhRCzbiROCCRJUiLi+1CXRv5XKqVm9m5LwBTcl5FGY6/dK6W4wKEh8AKhP+sOIcQ7TkVDIE3TBwD46HFjLYRYaa3zoRQR0S8iWgohFkM2lVJLS4D79ZWLQF3XN5vNZmdEaeciweBSymv2zHTTT49TB6XUa2R5RcTvA0ls+9hFogseqiNEdIsB4bfcnCTGgBuja44Ah5QHTMg5I8GXbNhDPbdARPTEBGJ7/4QEG+Ocx4LzvYZAmqYU4nrvnxNtHwPeCtEYAt2cWx3RWju7w+dgdAr6BddNQSwJWwPBReiodrCjdkgn+pGwNbAyS4e3FAZabVAnHMabNhwUosA+jybBChskxVVVzXiRCKj2lkSAFB+VUlNLwJsGIuJhxYOIR6jdhF0pK6uq+iSlvENEHkius26HkfFs7xtII7TCd+UohHjbjmMzktm7/7OQWKojZDk6MNx6RVFct0rYtWD6mGfDm2jLARf6CspXLq7lUkouuL9KgsG11gvvWm6dMJFgEqFjekjEnqSUWdDDpGvJbMrLZ3TH0TzNmg340gl6nNZ1zSRiiDTAvMg+63HaZ2zUbUFEjRghYvMloua5hYgsQg/9PPvy8wdzBMrtXY3lCAAAAABJRU5ErkJggg=="

/***/ }),

/***/ 116:
/*!************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/git/zubao/static/order/order-evaluate/img.png ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACM0lEQVRYR+2W0XEaMRCGd4G71+AKjCuAdOB04FRgXEHgAd3wZPuJkXgAV2C7griD0IFxBbYryOUZjj+zNzrPBYOQDs+QzOQeb6TdT79W/y7TgT8+cH76+wG01mfMfEtEzUC1UgAXSZI8uPY5FRiNRq16vf4M4ImInIE2JBHwdpZlJ8Ph8GUbhBNAa33FzJdRFB31+/00RIHJZNJcLBY/AVwnSXK1E0A2LJfLb6vVqsPMudwAWszcIqJZSPLS2lMAL8ycKwAgrdVq80ajcVMcKFfA0j7LPYvczBx0Wl84AE25FiJKoyg6EYgcoJCaiD4rpea+AausM8Z0iOixuJocwBiTS6yUOvUNagv0WNZnWfbqKrT1mOV8wQDj8Vju9ZKI1mFnzHw9GAx21ktlAK11j5knRPQKYCoFJaezhdsjomMA/SRJpi4lKwFYQ/oO4D6O496mZ6m1vmPmcwBfXQZUFSBl5vmuOrHB20qpo20qBAOUTu88mX1R4oCi1Na1VQByR1RKeTUvYwxcDvjvAvj0BJ8eEKzAunu5npiPqwYDlNxSfPzLNru2oD+I6Mn1WioBiPWK8TCzFNi7QaMYXACwGJPLmisBWBU6AMRs2mttNm/btpN2dzW0ygDF3RtjukR0JvOC/LP9/kEpdefTzPYG8EkS1At8KnffpCX13s8DpQL7tMf45cso7fxXUahv1mohuszsPZT4ZiyvAzCL43j6x0xYJdBH7fFqLh+VbFOc/wAHV+A3pfq0MDNF0ooAAAAASUVORK5CYII="

/***/ }),

/***/ 117:
/*!**************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/git/zubao/static/order/order-evaluate/video.png ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABv0lEQVRYR+2WzXEaQRCFX1MMV6MIDBnIEYgMJEcgFIG8B2aKk+FEzXAARSAUgVEEggwcAiHIZ9h5rpZZ1RZ/okCYy/Zta6f7ffNmdrsFZw45sz4KgMKBNwe89x0AtyJSO+ZSkpyJyNBa+7BvHVFxEfkJ4IHkpFQqve6bnF8XY6wCuBGRW5KJc264qU4IoambBTAzxiQSQpgBGFtrfxwivJrjvR8BuHLO1bN3g8Ggulgs7mOMzaXLU5KXIjJRAJLsOuf0GI4O77268MtaK5kwSd1cleRTjLHTbrdnmfNrACGECYAv1tpvh9D0+/0GyRcR6WwSzmruAhgrrbW2cQwAyT8AhpVKZZgkydq92gpwiGg+J3PAGHOxSfhDBz4LQO/Arlond6AAKBw4uwNpmtb1j7ftSzj5V7AUHqVp2t0E8j8A7gBof/kKYA3kZADLdvuY3YHl8zuIiDy1Wq1JHuBT23EIYUyy5py7zJ//CshvADWSzzqQjETkWicZAFOlyxJ7vV6tXC7r8LBXxBi1x9+Q/O6c06a2FgpCsiEir8aYzlvPns/nuvhqdS7IGste6v8WTbUN5zfxUW4xFRcOFA78BbfIpcmm+qUaAAAAAElFTkSuQmCC"

/***/ }),

/***/ 118:
/*!***********************************************************************!*\
  !*** C:/Users/Administrator/Desktop/git/zubao/static/login/cirle.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAC/klEQVRoge2ZMUgcQRSGr7jCIoWFhSFCQiIiVhZXWFhYKKQwlQYsLCwsg4idYBG0S3MQiQmksLCwEGwsRNyd73FbBEktIVwhYqHdFRYpLC7FTsL5nD3d3VkvhPvhNcvu///z5s3s7NtSqYsuuujivwEwAMyHYfge+Aoc2Phsr80DA532eQtAP7AGREDzgRHZZ/o7ZjwIghERWQfqKYzrqIvIehAEI49qHpgDGjmM62gAs49lfuMeMzfAN1v72zYO7LWbe57dKNJ4GdhrIw7xIu1rw9Fn76ENzx5QLmIA1QTBOjCdgW+a5PVT9WpeRJYSpv9LGIavsvJGUfRSRD65ylBElryYBwYTzHvLEvGWqvl/AYO5yY0xW5rcGPMR6PHgvVXng0NnKxcpMOrI/vciFhnxJnGsSwkYzUO645jaikffWm/YkbCdrGRl7r6stj17duluK81Gphk3xszo7AdBMFWA51sIgmDKsRZmUhMBm4roogC/SdoXSnszC8lhbpKMcCTvMDWJiJyoaVwtwGuS9mqrtoicZCE5V1lYLMCrE8CiGsB5FhK9nS34t5qovaDfB6lJRORUlZCfs8nDtJfUDJxmIQlVFoo7qyugvjlEJMxCsqsGcFyA1yRtfaTYTU1ijFlRJFdRFA0V4PcWoigaAq5U+a6kJiJukTRVFL4T6R3IRrZWjIgcKaJaGIbPPXv+i1qt9pQYrfV/lJkQWHZkY82jZ633zqG3nIdwAKipjJyLyFuPvkulUqkUhuEbY8xPx4w/y0XM3ZdKE7jMXJdujX7gzKGz4IO8jLtteAYMe+AfBn44+MHXl5/NkD7iNoFrcnTUgFnLoXkv8N03Jf4+don9ydZECq4J+4yL65o838H3CI/Z+ncJN4kbVVXgNVABXtio2GtV2jeDL4GxQsy3DGJcRPbbmMga+8B4oeZbBvHE/rDw0aFuWC6vfaaHDqTXlkXS2mgX1/bZ3kc37hhIDzBJ/FupXY3X7T2THcl4GhC/xSs2OvcrqYsuuvi38RtBeltdOntIeAAAAABJRU5ErkJggg=="

/***/ }),

/***/ 119:
/*!********************************************************************!*\
  !*** C:/Users/Administrator/Desktop/git/zubao/static/login/ok.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEB0lEQVRoge1ZPYhbRxDeQmBDDhuCL3GRwo2DIUkVQ1K6TRFwcaXtCPvABGxzLkIMaZbTzlg+vZ31yYgjOQfbhRs3JpUDChypQjDE5RUqrjD4nXZWF8KF2PEVSvFWundPdye9H51x0Adq9LTffDOamZ3dJ8QEE0wwwf8CVjam2qDPMZhlRlphoBYDbfrPavSdWW6DPmdlY+pN6+2jjcFZh9RkoJcM1B3x89IhNdsYnH1jwrlSO+MjnRT3zIG555AqVtEVq+iKQ6o4MPcY6NnA75FWuFI7c2DCu1KWHNKdhJAWKz0X3jQnhq0Pb5oTrPScT7GYI8Z0pSyNVTyj/tAquhsz/JSBrrfh9vtpuUKsT1ulr1mg33p8Dun+OtQ+Hod2YWVjyu001iyiGCNe8zgWlNXCi/wvonc5Hnmla5u1pfeK4t+oVo9a0MoCvWKgrgXzYF3WCuMX8Zx3QEuFEQ/aqcRrohBSi2bGAb3uRWazVmBkEujI+hEG+t4H6rVFM5ObtN8qkcKD2ICsbEz1OxTSSi6yNugLseK6XpDGoWDUl7ebhTmfmcjvsF0Gao2jR7Oi06z03JqUhwee+U3PITUzkdvK4klGCr0D3+RWm+RHM8NAW1Ft6XLyuUP9ddTxKLSVxZOpDXTAXPR5+Mrh7c+KEN1DXDwjhZ1b9Q8G7M/TR6yo45vHxdRGGMxyb7YpRLWHBV12QGs97v0Guu0UNsupDTHSEx+hu7kUx5BGvBBCMBB5DU9SG4sVEez2fE3KwxZ0mRWdHkl8Im0cBqeGrgH9beYsYBUVsFP62j6Cugy0NWzDySLeO1D2o0uY2QG7lwNy4XisS+3pRFbxQgjhkL7qrUvvwJAUEkIIC+YLBvrdzy7PLdKlnc/T5fwgf54U8kVsQf+43+8cBqd2+yfyRL6vwRexBf1zegdStNGkE4zG5BUf8eZoo/2NDPS/o2xkrOhLq/QfyfNx1oN7p5pzI7ML6UeJxD/xPGvkI66co0REYh55kmaI9elR1nSlLK0r/Xme4W+9VnuHwfzkp9FHWXmEi43Te7XTcaCDdKlntw36Qi6ygz7QdKUsFXagEWLnkZIV/bBRrR4tQOeuaF2tH3JIi4UeKYUQwqG51U8l0KoQ0l1gQX8Xv/kojHgT69MO6b4n/4dBz3dk/UhR/K2r9UNe/J/exsO/FxrHi+IXQvQP26vb1yvmcRE10ZWy5O9N+xdbL2RwrAjNA9io0icWzINtY/pXRn05iyNRqwxmHdAvMfEPeT74dBza+4giRkuJHfcpQzA7SuReyOAYQzDLiZtqh3Rn7Je7cexxvb7lkJqMxlhFNyzosgVdtopuMBrjZ5utHWsO+no9ibf2BUcSb+0rpgkmmGCCXPgPBybGJY2UXg4AAAAASUVORK5CYII="

/***/ }),

/***/ 14:
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
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
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

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

/***/ 162:
/*!**************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/git/zubao/static/order/subscription-order/1.jpg ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAMgAyADASIAAhEBAxEB/8QAHAABAAICAwEAAAAAAAAAAAAAAAIDAQQFBgcI/8QAVBAAAgECBAMGAgYHBAcECAYDAAECAxEEEiExBUFRBhMiYXGBkaEHFDJCscEII1Ji0eHwFTNy0hYXGIKUwvEkQ5KiRVNVc4OEk7IlJjQ1ZXREY6P/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQMCBAX/xAAhEQEAAgMBAQEBAQEBAQAAAAAAAQIREjEhAyJBUTIEE//aAAwDAQACEQMRAD8A+qQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApxeKw+DoyrYqtCjTW8pysjrnabtfheFueHwjhiMatHFS8MPNv8jzPH43GcVrSrY7ESrT3Tm7Qh6LZfiZ3+kVd1pMvQeJdv8ABUm48OoTxTWudvJD47v4HX8R254xW0o/V6Ot/BTzP01Z0PiHG8FgMyv301z0cb+Z1nHdtq7lahJU0k4pRjsuj8zLe1ncVrD15dqu0crZazfph4luG7XdoaMmqsaVdvVKVHl6xaPBq/azG1JZnWqXStdzu18yFHtVjabzU61RNPNdTdr+gjf/AFfy+neG9u8NUkqfE8NUwk/214oeXmjtOBx+Ex9NTweIpVo73hK58mYPt3j4NKrWdSL/APWLMvgdk4Z2zw1WUc8ZUqyX97Rlka6tL0Z1H0mOudInj6YB5Z2d7cYyEUqlWHEsOlda2qpfn7noPBeN4HjFFVMFWvK3ipyVpR9UaxaJ44msw5IAHTkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6L257XRwkanD+G1E8S1adSL+wvLz/ibvb/ALRvg+CWGwkl9exEXle/dx5y/geP43F08HRdbESzym21mlq5vW769TL6Xx5Dutc+rsTiKWEpSq4ud227Juzk/N8jpPH+0tTEOUado0k7qOay/q34GlxnitbG4iVpTlOdlZNvN52X5Hq/0ZfREo93xbtdRjVk1mpcPmrxjf8A9b1/w7dehxWmetLWw877L9gO0va+cK1DDrD4OW+LxKcIW8la8vZe/M9Y7PfQZwLCxjLjeLxXEqttYp9zT+C8X/mPXKdOFOnGEIxjCKsoxVkl0RNWNYrEMdpdXwn0e9kMLSjTp9muEzUVZOthYVZe8ppt/Esn2D7JTi4y7McDs+mBpJ/FR0OyA6wmXnXGvod7IcRi+4wE8BVemfCVHG/rGV4/I8m7Z/Q5xvs/TqY7g9dcUwdPxOKjkrQXVx1Ul5rXytqfTxGWkWJrErE4fFuA4zicDWySlOEouz11v5Hf+zvah1atKqq0qOLh/wB9F2u/3tjs/wBMH0XSxff8d7NYeLr2dTGYCGiq9alJcp83H71r/avn8KwmK7uanSqPLGzaf2l6oxtTDuLZfW3ZHtbT4p/2THuNPGrSMl9mr5rzO2nyv2b48vBTqzUHFrJJO2R+SPdew3ar+0ksBxCaWMjG8JPTvF/H+up3S/8AJS1cew7mADRwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABqcXx9LhfDcRjcQ7U6MHJ+fRe7Ns8u+lXjSr4ynwehK8aNqla37T1ivhr7o5tbWMrWMzh0vi3FKmPxmJ4ljXJzm23G+y2UU+SSOgce4nPEV6snJXas2nuvVbr2OZ7RYxxXdU5tQju4yesuaa/M5n6FuyEO0XG5cSx8VLh2AmpKP3atbdL0Ss3bfTkzGsbTmW0ziHb/ob+jmOAp0O0HG6efHzjnw1CS0oJ/fa5ytt0T6nsUVZamIxs3qSN4jDAABQAAAAARmm7JX9VyPnr6fvo8+pOp2q4BTVGCk542nDSMJP/vcu2WX3/PxftSPocqxNCniaM6VeEKlKpFxnCcVKMk900+TJMD4f4Vj88O8p3hODyVaW7py5p+XRnofZrjU2qSjNU6tJ3p1FZWf9c2dP+lvsriPo+7bVauHpufCsQs1JJv9ZRv9mX70Hpf/AAPeTI8JxUV3VWhNSpVIqVOVt1yft+N+hjaGtJfW/ZDj1LjvDI1LpYqmlGtDo+q8nyOdPnzsN2hnwnG0MbHPKivBXSVlOGu3u+dj6AoVYV6NOrSkp05xUoyTumnqmaUttDi0YlMAHbkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGtxPGU+H8OxOMrf3dCnKpLzsr2PnniGMr4qricfWk3iK83O6jzfJeiPU/pd4j3HAqOAg/HjKniS3yR1enm8vzPFOO1stN0Vpa6kmndv8zH6T7hr84/rg6lPEcT4jSwuGvUxFeoqVNR5tu1j6p7H8CodnOz2C4Xh0rUYeOaVs839qT9X+R439BPZ98R7QV+OYqEZYfAru6Ka3qu2vtG//iXQ9+sr3O6VxDi0gAO3IAAAAAAAAAAOi/TD2Op9sux+JwtOClxDD3r4R9ZpNOHpJXXk8r3ij487OYiphMZU4TiG082ahmVrO13HyutbdUz79suaPkL9Jbsk+A9sVxnh8FSw+Pf1mLjGyhVTXeW/3ss+t5yJMZWJY4DjMlSC0V3o5PR35W+J779FPHfreFqcMrzvUpLvKF1vT6ez/E+Y+DY9YrC0MXTtFzXjivuzW8dtufo0eldjuNT4fjcNjaV70ZKT842tKO99Vt+BjH5lpP6h9JgqwtenicNSr0ZZqVSKnF9U1ctN2QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPG/pWxqr9qO5i3JYWjGLg3o5PxWXnZrdHkvFa7k5JSTbf2Yx59Ejuna3FuvxfiteWjq4iezu1FOytr0scN2I4auPduOGYSpGU6Kqd9UemkILNq1um0l6tGE+y2jyr376O+CPgHY/huCqRUcR3aq1/wD3kvFJe17LySOygG0MQAFAAAAAAAAAAADof0zdlV2r7C47Dxp5sZhU8Vhn+/FO8dP2ouUfe/JHfDEtgPgDsnWlheK1uHVXaNW7pO201f4Xjf3SPRuDV5Qqx8UdNk0np19eh1j6a+z8ux/0h4tYRKNLvliMLa/hhJucY+zzw9Ejl+F4iFWNKvTcXQqxjVj5pq6Mbw0rL6R+inizxnBqmBqybqYWXhutXB6r11ud5PBfo04o+HdosHOUmqWIfcVL81LbdXsnbR2Pejuk5hzaMSAA7cgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaHHsX9Q4JjsUt6NGc16paG+dQ+lTEvD9jsRGMW3XqU6WnK8k38kyTxY68K4nLwKM5RatpKMklfkn5+5336AeEp4ji3GJ02pWjhaUnta+advdQ+B5vxOpmlJydpW0ytO697ab+h759EOC+p9guGynCMKmIUq8srvdSk8rv/hUTOnWt+O52ABqxAAAAAAAAAAAAAAPYAD5/wD0ruA9/wAJ4ZxelBuUc2Dm92m13kH/AOWa/wB5Hi/YPGOpwzuFJ5sNUcEtV4ZarXyeZex9dfSxwn+2vo+4zhYwzVI0XXpr9+m86/8AtPi/shJYTtHisDK6p1oSirdY+OP/AJbnFoytfJet8MxFSnkqQllqReaLSs01s3bZ9Gz6Y4TjIY/hmFxdNpxrUoz0d7XW1z5c4bK9vDru5Wul6s99+irGvFdlYUZt5sLUlS1ilZbpab7nHz88afT13EAGzIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADzT6a66WE4TQcpLNVnVstvCkv+f8AE9LPI/pmrZuM4GjG6lSw7m2vOVv+U5tx1XryjicnCFSTilaLkrN39fQ+o+zuDXD+AcNwUb5cPhqVJX38MEtfgfMUKcKuLw1KUVKEq0E4y1TTklrdbM+q6cVGCirJJcjmjq6QANGYAAAAAAAAAAAAAAACNWEatOVOolKE04yT2aZ8G9pMA+zv0kvDttKhjXQlJ81Gbhf3i18T7zl8z47/AEluHSwXbziGIhGSjKVLFrktYKD+cUyTxY65PBztBLZ353t/I9g+hPF5pcVwsp8qdZQTTSbupP5I8dweWpao1TeZKV2+TV/zPSvoexCo9qZUrNqvhZRi7t2s0zKv/TS3/L2oAGzIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADxP6XKyn2slTWsqeHppJuybbk/4Hth4N9KtRvttjVFO8adNaNL7v8zi/HdOuo4Zp8VwEvtRWJpu9t/Er6r8z6mjsfJvEq8qNF1oPLUppzjK97NK6fp6n1hRbdKDe7SZPmv0TABozAAAAAAAAAAAAAAAAD5w/Sz4cu84bi1/3+Eq0nZfsSUr/wDn+R9Hnjv6TmGhW7H8MqOP6xY7uVJbpTo1L6+sV8CSQ8m7Oz73gnDq17KWGpNOyd3lSt8md9+jStKj204a1GVpOcJOL0d4Pz2vb4HnHYmpm7OcKims6oJWWr0bR3jsrOVDtJwmpDMlHFQTaVt5WaMeS27D6NABuxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaOL4vw7B4l4fFY/C0cRkVTup1YqeVuyllve101c4LFdtcC6jo8OjLE1UruUvBCCs9W3r7Wuc2tFfZlYiZ47WDzWl244vHFQr1MFh54LOo1FOf1dQhfWalK92ltF2v5HYKPb/s5Kbp1uJ4ajWUHPu5VYyk1a90ot8kzmPtSf6TWYdqPn/6UXbtvxKyvbu3a9n9hH0BfS/I+dvpMrKr254ulo4VIR1e7VOOvz2LfjqnXUOJJVcFWhFayhJb7XXqfVPAcZDiHA+HYyk26eIw1OtFtWupRTX4nypjZPuJZvDo9NOm59B/Q5xNcQ7AcOTlmqYa+Hn5ZXov/C0Si3d3FyOdcg5JGjNK4uVutBJttaea9CFXF0aMJzrVIwjD7Tk7JEzAvBxj49wlWvxLBK7tfv4/xKY9p+CShGceK4JxlHMn30duozBhzIOBxHa/gGHinX4vgoXcoq9Vbxdmv63M0+13AKii4cXwTUpZVast7X/BDaFxLnRc4V9qeCKVpcUwcXdRadVJpu2j+JeuP8KauuIYTLa93WivzGYMOTBof2zw21/r+Et/76P8TahiKVRrJUhJvpJPlf8AAZRbcXIKpF7NNb38jLl/ViiVzzj6fsPGv9HGKk0s1LEUJRfRuaj+EmeiuSR599O1WMfo6xkXpnr0I6+VSL/BMkrD52+j6r3nAcJF2ck6icb5Wn3ktkufM7zweqqXGeH1UoXp4qm3G0k0sy3udc4TwZcDweBhKrFyxdN4xwbdqaqSbjF2/dyv3RykarjGTUZLK1OKso3fzfueebf1tHH1EDy/6GOP8QxMMZwfimLqcQhQvWwWNqfbqUc1nGau2pRbVr62e7seoG9LxeMwxmMeAAOkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGtjcfhMCqX13FUMP3sslPvaihnl0V935I8+7R/SBxyDxtLsp2O4jxOVLLCjiK6lQp1Jt28MXG7S0bbypq+qObXrXsrETL0mTUU3JpJatsyfJ2I7XdruI8WrQ7R0+MR4lKTWFweGn9XhGOqnaGRyk1JWT19Wdq7D9teK9lKSr9pOJ1sVgJ2hLBzwlqtObbyxjNuKbd7vR3szCP/AERNsY8dTTEPocHj2M+m2lOVuD8AqVlZPNjMbToJ31ulBVHb1SODxf0q9psQ4unPheCpTnGMFRw1StPxbLNOSTd0/u6m29U1lP6aqkeB9q8Nx/jOEcYVaTwWGnQx/dOrFOUrSWRvnfRPlY4rhXanB4nA4OosTgsLSxNJ1VTT7ypSd7WUrpOzvrJXdtkcVx/HcU7Y4GlT45i8ZxLCKcMRGjOEKNJSTcc1owvbxPndJu62OuYrslhFRnTwkZ4ZyUlNwryTk1/dyaTeur15p20PJ9vlH05MtKeNrtl2d4pja0cTW4v/AGvQf91GTUHG/JU21H/wlXZvsFx7Hcc4dianD8RQw+FUqjq0MM41JtPMkpvSM20kpNNJX6a8RhcbxXsxjI1qWLqWhdwqqDjK1rbXXxRqcf7S1uI4Ss6OJxtfESV5uvi8RNWbSbSlUa3srW5mMfH6R40m0O99r+1PbTB8RrfWOOPBQwk4qrQwWLV6MJu0ZuE1mqrr4rrfKloaWLxLrXxEq9TEuq87r1Y5ZVb7TcU9L725HS8Twq3ZPGY2VKtSr15RwtJ16maWWU1GUrck+Xld8ztGIajJQSacLJtO3l7I9VKzEeuM/wCI8Qr9xw+rXUac40oSlaW0rK9r2fnucl9H3bPieDweJqdnK8aOHrVEq1KtFNwvG6la/orr4M4zE03VwleEkrzpyXiau7po6D2Jq1IYydPuZ1L03GdLW91Z8ny/N+RrFUs9xxHbntTVjBVuM0qE7wlJ01C8ZWamrWelmvLbbd8JiO1PE5Tc6/ajFZ8v3K0oq6fh0WVWSv011TOHw+EnVm8mCw7TjeEpyum7vR3vb1/A2aGHxcVFrDYahHZrJHNGXJ2a19UzkxCON4zhMROX1viuMxVnJxdWrOo4prT7UuTu/O5VLi/Dk7QpYmpaUZtLVSyq1nfWz8/RaG5DC8SbX63Dpx1ag/DJdYu10/WxGWFx95QhjYxg3mi23oucXHe/mtCLhqriWEdPLHh2NcbKOZ0trO6f2dHyb6Gz9fpJ2XCsXG/eWUYSikpWukraJW8P7PKxNYGtK7eKsrWdtXB9Vykr9WjC4bJ5b4t3tlcYp6+cX+W3mUZXFGpRnHhOIs5KUUk97ZVZXtty9zMcbFJRXBazjHLFJyvpF5knd66kf7LkoxccZPNF8oK0vXozL4VTaywxdWyldPKrp/s+a8+mu5MDLxydKX/4LXaySi1m+7J5mvtddf6sZljajqZnwaqryzpq29rddNP4j+zISvGOKq+Ja6LwPmlyfV9DH9l0bX+sTUno1m3XXyfyBCH1mKyqXDK8VHLlTad8vXre+t9/YtjjIKEY/VuIRSi0pRTWW7veyVrLZLYR4bCOvf1/ClltDWXW+tvg0Qnw5rw08XNNyTblFTyy5K97PT1A2sNxCpTqTeDxPFMPKablGDnF5bbfHXXnc249oeKJ3fHeK2llbX1mcW195b6KXXlbmcRHA1rSksY/GtPBZQVvN3kvZerJzwVWE3/2q+RN2ta7/bb3j5LXdBMOxR7Z9pVStR7TV41EnbvKdN630bvFv7OlutnY43tLxjtD2gwNPCcU4pSxWEozlONOUYwbag1CTcYptvM09dFqcI8HilGnGWLi43UptQdmn663f9JHHYmjioRk81KdWT8EZPZdX0ZcmHN4OlOhUmqsnUqOKcpZk7vKk1r02W10bMKi8aVknrZS3XTXVexx3CoypYKOdpPonZ/BPp5GzQqWcldJbJWs/e+hzj/HTtfZTtpjuD4ujLi1F4vC0O87utRwypVqUIW8OZaTWV7S+1bR3R6jgfpR7PYiNNV54jDVpOEXCdGTtKUcyjdLdrX48z51xnE8VhMXVpw7zLGClTyrNmVnsrXdvI2cNx2rOtTTk8zXeRiqbbsnusu/ryZ1T88c2rl9N4Ltn2extvq3FsLO9rWnuns/fVLq1pc5bDcQweKipYbF4etF21hUUt1dbHyrS4vha9JKUMLWpTSitMqaUrqy10Ule3XU26GLwVWMlKk6U558zp1cjUpO8mrv7Sbumvst6W1O/wD6OdH1Qmns0zJ84YbjFWnOm6HEOI4fLKEoqFSVmkrKPo9/X1ZyeF7X8do5XDj/AHsssU1XpxSbus7srNXjZLezu76l3hNJe+A8Xwv0idpaFNqpDheNmoya0lTzyT8Mb7K8d97SXR6c1hPpOxN1HF8DlLxKLqYeupRfhvKVnsr+G127tLzLvCay9OB0PC/SjwCrGj3yxmGnOMJSjVou8HNvJF+bs9Oqtvoc5ge2nZzHNLDcZwbbV7SnkaWm6la2rtrz03LmExLsAK6NalXpxqUasKkJJOMoSTTTV000WFQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABiUowi5TajFK7bdkkeEfTH2nxXGOJUOF8C4u8JgKcf19Sgm6rq3dllttonf4Hdfpq4zhqPYniHDY1o/W8dTdOnG9ozSnFVIuV9NG015vzPA1UxDxeIdGu6FXEPvLUIutUmm9IqcrKyd7JddjO8+Yd1rl23sH2Z+rVa3abjnFONV5YKpCnReKxU4KVWUl4pPTwKN009LNnesH2sqU+N4jEV+1PBpYSjOSnhpzySUbJpXTtez0fPpyNLgdGrgOwnD6OHnL6ziKVXE1KeMhGd1J28UdNbKy9TddDHfVpTlxCMq8YqVGlW4coRglK0HeL3a3S+1sfH+n1nf8y0xDzn6ReGYjFdpKVfgnEsfw7hXFMHGviKWGqSqtVFOeeOfNpG9tE7PodTwXZbhHD67r1J4+tWy2cqsoU/fwptdVqegds6KnW4XDiNen9YquvmWDtTjGOWk00tUndPk/te74ajhMFSanCmpVXZSnJt5ktrx/kez4TtXMktWeLwMasIqnBTlJzi8zs245NNbXcXbpqyNLHVMuXBYOrFxSg+7p93kjHRX0vZLbdI5GmqNCMo0KNKlTnpKCgrP26+gniKmy0tst36Jfkz0YGhUXE66llhTjmfgk55o+d+aXsUSwOMnmUsTSjGXhdNScve6SVvJo3as3KF5eLSzer+L/I16laTTvJJJeTSA4fifBIypPvMXUrSaslZRzO2+7+VkdWlwHERrxlhknGLyScn4ZZrpp2tyZ3mu5SvBpv91rLfyfl1bNWSWS+ZKnFPx2yrzf4JMqLu1tO/Z/G04JN0qScc2jeSzWvXw7HBzxcK8Y1YO0ZpNKz0v6HZ8ZLPDVqVOokndXvdfZcXtdc01c8+wmHqQ73D0k6lOnOUI1bZYtX0d3ys7W3OoSXNS4jChh5ylOLUVqoXd/K38zjuBYR4fEfWKkVDEVZ5oxb+zFO7X4XI1VTwdONfGTdSd0oQSvd9Ix/M3eGwqRcq+Jv39ZKKhe6pw3UV13bb6+hZHO4evJU0k5pbeLWzXK++nI26FW9sjaTW8Va/lo/h8TUcKkO6qVHSc5O36qbfOyu9LS1j10e5sq97u6e2qcZX0buuT9GcOlneJq6u+d9r9X/IjKUl4ZXaWmkbae5GV45nJxirpyV/DdaXduWr18ncqmrNpxtPVPm0116eT6BVud5Vq5abxu0/Lck6mizSVndWvpuVSlmvJtJPm5ae76eepJZop3vFPeLnp8ALU5NtOEbLXL0+NjOeKs3J7c73S6fyVyneKtdxXNvMovz+RO+WVm2pLV2d3Z80/wAgi9tr7X4NJ/4V/C3qIyknFxcrtJxSVpW6q+3TVlStF6tQfnr6vyRlRjaXghbd57tW82tvTQipXg7JtOKVlFp287LeXrt8hVai/HlaW7knHT2WnwIxzZVFKd5WSWVJy+fwt01IubilJShG+ml9X0WmvnYCzPKKe0EtZNSjHXz5/wBbEJzaSzOnHm1ms35vd29bXIKy0WVPZLJdx9tk+r3IVPAl4rLV7NRfw1l7tJcwirE1fCnJzlBu134E3bVrm3y0NqjwuajKWOTTSzdyvsx5eL9pva1/Ulw2NPD1KOLqWnUqvJRtFZlveV7W5WS9XqzexdRLDwoxlKSitbu7dvxfMDicXNqKXiStdpX/ACVjXpSamnm165XdIlicrm7T87K+nmU0lqno/wDebCuYpQp4mnKM5KNk3GSVsvzv5mq5Sot0MRCN4SUlta9tG/VdCzBVHTqxeze39dC/HxjUhOTrRVaOtJODbUFrJPrzemqKivucPVzZqNLe8tLWf7UWrNe3XmSlw/B1lKDp1Fn1lFTesls7NXv53RrUZpKM04xlo1ms76eemtnbVexs57+GTkoeaVn77PyXMikOGQzd5SrThKayyyKyh6PW76rXbkZeBxVKUXTxaqqGlpQSu9LSXJc73euli3O07ScM97KzzO/py9NUWwrNRSUZpJ6XW68k9Pi7gaUaGPUbSo0KlRPXJNJWvyW8ntpe/mQeKq0lKU414JPwd3K+Zc3Z3duRyfeylHXxdVlTj6W5+5ZDEOMm1Npxdr95ZL1sla3kBqU+MVYydP6144+K0o6x+D+ensQqYqnXpuE8Hg60JUnTyxtG0JPM1dJZbtJ7763NucaNRNTjDKnduKjHbZPfXnrf0NapwzAzt+rVKytDJF+GO32W7fJegE/7Tw9LE/WalPG4er388Q50KjyyqSjlvZXVo7pJ6PV7nN8K7bcTwvdRwPaaq6cHTUoYymql4/fbbvq3Zq21muat1+pwqFOTVDE1KKfibktU+mmy35aGni8Dib5q6p1E0srfjcXzWq222LlNYewcC+k7H06f/wCYOHUK0MqffcNk5eOU7KHdu72ad7/memcL4lg+K4Z4jh2Ip4iipypudN3SlF2a9Uz49xVGpw+ou7+tYHEbd7QcpRT84tu603Tsd0+i3tpj8LxSpDFOPe4aSpVcl1GrB+L7N7KWvrd+p3W/+uLVj+PpkFeGr08Th6dehLNSqRUovqmWGjMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADaSbey1Br8RbXD8U1uqUmvgwPkzC4qhisfLEV6UnxCtTjWrupJyjUU9b2el7trnpY5uGOdOjanFQhHxOMY2StzscLh++qYbDKWKvQVGOWhZPJKyu3ys1b4Gas26VSCs5uLUddduR5rZ9b1VfS5i+NVeMcL4dwfE16dLD4Cg6kaNTJ48kXvvbVs6ZWw3bGS7yrxbiDcE7S+vScl6anqvafD8K4x2hXFMBxSn3dTD04yp1KWV0pRWW275R5HEcYp0MDwupUhjaVZ3jBRXJSkot28lJv2MfnEa+wsxls9psZVqcQ4FRxMnLFUMGnip6Rz1pQpuTstFzV/IQq23l63laSRw+Nx8OIcdxGKpK0JStHTTyT9ElfzW5vUq3hagrKOummX1sro7+VcVG456Jvpp1t62/IjKSUXe+q2tbTzKXJZU25ZHzvp8WYcmpaPLbX09upoJ1J5nrZ2vrpp8jTrylC8nZK176aL9p/xZc52/adtr6a+fK+xTWhGeaKve2ystPy/q4SXEPi+HWbu81Wy0cNIvzcnv6mtieL95NOdOjf7UVVvNprZ3Vl+RZVwNOrVy27u80rw1XnvsrGl/ZXfxn9UxClShJ05KtHK0/a6+B3DmWMVxijOhbG8SjOnbKqTqJuyezit9XzTsa1TjMpd3LDYSWRvKqtfk+Vlbp6Hbvo/wABg4UsfgsbRw2JqxtiaWejBpJ2U14k7q+V33V7rmX9s8LSr8BxMacVDu7VFeV01Fp3u1yjdabjJh0ihUUq0q826mIfNLVenRHMYCEnNVJ222XI4/A0EorMjmaSTSd9V7CfSIbWSclKpSw8JqEXKpVclFwgltq/Etb2SubOCk50mtW42ik1Zaafa3XUpjGj3aeLdWNGDvLJa+Xd77ra6Knic+MdSnQhh4OnFqNOioLRuL/ne5HTkZ2sn48rV1m3a2fr7a6kJyy3zOMlHm01ZLf10s2Yp1Lq8W3d6ZfvNdG/L8w9EkpJpaRastNbJLbTYioZMl7tN3y3TcWvW3kTjvmirp6bNLfm+QyrOowazPTw3Wn+Ffl66iKT08Tk2tUvF06rUCVNNqLThmSsm2tPKz09y2yST5faT3dvW9/yK4NOKTcMrX7Xh89vj5FkG03KzbvdzjKzb8ktGwg1JN5Xlknpdp2f7Xnp1MyUWrZI6X3m9OrV9NHzCeWMVtH9y1reT08jOtk4uLdlZ7qXS3JIiozjG0oykknurJN+1szv62I6OTulLk3F5Pa++vTUsu4pxs1FWllvpbq/Lzb16Mw4NeJ3aStmcU4x8orZetrBEZRclNZvFbLZuMLR53a2T87FVSkpOMFOMYz0bi0m4rd5unS2nRcy9OWS/wB1aZVGEV7addiunVlPHU1J0/q8IOeZLNOclZRyuWjWvS1yi6liJOVVfWacqCjGPcwv+qkr6Sb0ba5rqzWxFW97t3Xn0/q5OlR+q4ZUXQo4atmk5UqVTvEnfV5ru9997a2VkrGniG5LR7dFv/AiqKk207Suv8T+ZGF1LZvpdt29CuTeqdl5NP8ApiCWr190MI3qUnF6s5LDzxMo5cIqDm93WnGFkvF4ZPaXh0S32OKpLMtLtcraf0jcXdSoSVenKvCSvKlTqSjKaXJNap+a8rajAqwsaUZSUF3b1do3SlHdrKtU1e/5Gzu7q0pa/cSimudujXX2NbF4nPj5TjSdCnOEG41I5VGSbSUkrapcuu5am3bOmla/iStpvbmmuutiqug81NSh4oPS6bkr/wCLSxZFq7WbW2q0zednqkva5XC0k5u7vzcnr6t6r1SXuShLTw+KC3UFFx9db/HcgsU1GTjKUVLnmeq8un5k4zccsVeMmrRunv0ST0Xlp6lLaUVGc9Ok5q/yV/66BvdTko30ld7+yu/Z2QF+ZtRUc2a2iiryt5b2XxIqo0pJOSa/Zd7P0e7K94ybUXBO0nFaJ+qdr9N7IOSVtbSWiktY+m1lcgvjUcFrnilq7PKlyW+t+X5GJVpRkmpTUuq1t5eS8/ma8Zu/6vLeLa8MW7fFrX1KpzvdWt6zd7e/K/UCvH4itllTp4r6rJ6zqXcssXvtyaurbXa9DgOATlhe1OPqTpTpYepKEacpJqMrQV0pbXXrc5fFwhKCpzwrxMMyUcPCLuntfR6O+vsUdsOJfV/ohx2ClUT7zj8VBLXagpyf4anVYy5t5D6Y+i3iMcf2VpRi7vDzlS0SSturW9Tt58y/oodqMTU4rjeCYuq6tOtQ72m5JuSlB7X84ye/Q+mjaOMQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANfiSb4dilFXbpTS+DNgPUD424dUg6VNwpThN4em51ZPwTjbwpJ3WZO97dVfZFuMqSUZK0trZenqtfyKsDFQweCk6lZzlRjandKK8KefNq7crWXvoTqpZGskbLfey+Gy82YS2hx9KnWqXqKpFQz5XpK6S57efsSxPD58RoTws51Fh6kf1k4Qc8nR2XPRvXobmB8MqUbReerfSKbWl+ui0Oe4his9WliKsWpPw5o7p20vfVrSyfK9tmRXQODV1KKVCrUqYePhp94srtry1XK2p2ilUzWvfw31/Zfrf8Dr+CapcY4nSjkUaeLqWWW0Um7r2u2c9h2mk1JdU8zdl66IpDdUqilfxZ+tsrfwuIvM1otOa1SfS25Wop2yx3d1eN/w1+ZmVpJXs0lpbV26enpciozk1dt3y63zaPzWn4lUqiuk/tb3eqXm/5/BE59W7W6a/P+RRVTelnfzV/wA9X6lJa1eT7yi05LxpJOyUW+fwJQrVvq8IVcRCo0rQSk3ljbRPT5cjXxTy03KLvGDUpP7Wl9bvrYxKdKlVq06UKinbvKkpTzK/K2mity1K5WcNxiwfHsDNvKpylTbvaylHzXXL8DtOIcK8a9OSzQmpRlFSTazK12r2POsXVnGtGvC0XSnGor62tJM70pSjWUdXlle/O+9r8utvmMEOo4HSklrdaPTn5nLYZ6a/DkcfOGXGV4NR0m9tVubtCTumuvKxVchSeilGbpyTzRqJ/Zd9GvdGhX7z+2Ks8ZkeInGc6k6T8MZZ903y10frc2pSUYp1IVatO6zwp6uSX2rW126bGnTSjxGoqUe7VKCywlK91d3V+bV15sDk4JLN3lkrJyS0Uk+d97aG0sLjZYZ4qOBxEsM453N09JRW8kt8q+HO5p5Z1MPUp0c3eOEstn5bb+XM63hXi/7Qo4ynWUHRcXCp3lu6ktFfo1rpZvW1jO8zHFdrg1UhFRvOL2i46W6O3L0MRadOKveOW6bqXjPk9EYw9NOlTc5QUppTnGWiu9dle3orW2LJYapUneTypSd5KovDfrb8NyiMWrtZtWt81s3t+Cdtn5E1Qr54TzN0+bhK+n+KxW8JKVLvFKN4tOV6t0lrq+uxY8NCo3NYlPmozm7xXO9/Cnz/AACJZryeVtt75N5NaadF53JLxPleerzTer62a26IxHCU7xl3qk1JJNSlpa+17eRKGFjbRwUuSg5S19fNdNgrFWVknBSlKX2VFZc0uTXN+iRGWBxtPv5TeEl3KzVaKxMJ1aC2vKmrtNPTW7XOzuZx1OrPBV/qk5QrxWZSpy8Sa3d+u9l/S6RgMFL+0NK0ZVZRlGhTi71ZzaaXhW1le7dl+fFptE+DukNUqn31pns736JW19WrmrmUeISUnL+4d1K6ctVvzfw57GzSjktHKpTcVGUoyzSk+e3L+rmniZOnxGhPM1nvC0brWV3pfW17K7sdwmUoOnCnGGHqVqlGHhjOtpOSXW2l+qRRXks1tNfI2qqqR1qYenh4ytKEIxVpRtpJW66u3VmpVSbel+dn+ZRrTavZW8kpE6T11j8CM4t3aWj31f421FNPNok/a4G1Teq0Xra/vd6G3Tn0rKjmtHvVfwvlJ+mrsuhrQi7J5Vm5O3L4mxRVOdenGvhKmNotrPShJrMud2vsrbXbkBVUlKtxSc6tdVJum81Z3UZvNfN18/4l9NqUbwtbdpRz5X1aey/BmtQk62OxGIja91GMlmV2tXZLW5u5ZWTkk4rVKpTul0WV6X/rUKJqO+WPnmd0/NrRv4vcmryvpFy/dhon6P8A5gk0k4qSy/ecM2XrfRJctvyEssba25JTly63W/vcgkpyf2HKV+a0t6q136/gZjJq0YW32h/L87EbpRSjkly0i2vZRdlprswpRaabikvtap5f8Vl8rgTvepfwua2yys16K79+VyM3ZON43emXVO/S2z9DErOD8Ly23qfZ/K3pzMwjKStFZoy0TyWz+SSazX8rJIDVm4v+8s7aWcW2uiatp6dTOivmbTjrLRXv5WTUfPds2VFuN41JeHdxqq0b+a587L5kYwclHKmucYxeludr6+bYGliYVKsP1MlBrTPe6j6tfieffSDxFzjh+E0oZaNOo8WrvVuUIxX/ANh6bWoRlTfexniI20pU2rye/JbddTzH6SKMn2uu5KcpYenqtm7u+l3b0Oqdc347j+jTVlQ+k/hairqpGrGXvTkfZ58h/ox4DvPpHw9RJtYfDVau37uX8Zo+vDZiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD434VXao4enTw0c0MPBTrZPE46K21rX1sWYlpxu9GtUv4f1Yj9XWG4xxfhTqSdTh+IqYaNOM2rzjNqMlGWji46XvdMziZyoOSm5Qkru3K3VNPX1WhhLaOJYRNVKSlpaLk4tWb2t/18zk5ynGlmpyjmv41mu5RfL5L4HG4RKLSjlhFRW+qV3qrfM5KDf1WpFZJPWyUbxS6y/q/Q5dOnTlKl2n4tq7upCd07p5oR8vLQ7DRk1FOTk01ZJz+16dTgeKJ0u2VVyjZ1cLTmkndu02mvN7bbnPYa+SKUlsk1ql8jpIbCjm11ld/ba1T/AHuS+RNuyUpZtdnff31+Qs5pSbclK1m5aS93z9Q6bTlydtdMnu77kVW4bK+vLKmn5X/ia9XJGLlJOELatwWvor/mbNShJppNpdIJv2SXx8jVq4aSSlTv6v8ArT5lSWli5QnCV0rarXWL08rb/wBM4l1cVUpql3rVOjJ5ouT000dtbv16M5Wvhpazk1lf3nff8WcTV/7BW77EQVXDSWStCTSvHq15X/HmdxxCvRjLCVor71OSXLkdowl69KhKUXlnBSySTas1rotN9m9jhsVSq0qveVIU40ak/wBWoTTVt7Jbpa6Xun1ZucKjGfC8Iody2oJXyOW2mvT8/IitbGZlxCspXbur59HeyvdbGxRldpt3b2uU8UTjxJ3i43pwSUnbqv6XJ3RLDQlKSjCm5uTtlir5npYDfpqclKUMRCkoqzum3JO6snysvkaXCs1V169lkq1Lq26SVlb2sR4lKNDC06Ko9xjcV+rnK/jcFLVvXTe1vNdDkMBQ7nD06UW4Wsk1GyWr005eRJF8cyiru6eitZKS3XlfTnc2I06cq/e/VqdSu3/ewppTfW0vtPTmiMIyhJwTytXvD7NusbPy6LWxbCCya3y7Zu7smuVur0tbYioubcvFVeujs767+q9fmSUE4xfgVtE7ycbdL7fG7J6qLaStbVKMWkny081ezJZI5nNxkpPVTjv6p38XsiCqdFYimozdSLvdOUtLc7NbvTzZj+zI6zlWemv6xyTvbru1b/obDjdtS8K3d25W82uWnq/Ik4Tg3amlJaaw+099LtWXO7t+QGvHDRpOSi4yUr+KHPzcnZv05eZNpStJpNSt1lf0XNfC3mWaXWaUr73cua6X0Xk9+hhNt5c129XGLkm/d3fX13YEFmSUm5+Fp62uujVtvRE5VZyhNRlLx/acWpZuW7V3+CGkFmeXw7ODcbX6aL4/loVOKdReKMo8mrvRrzXzvbyAhkzSk3KrJNWbi73iuflE43jdKcsM50FlqQlnik7pPkrLS/qctFJ2vGKb1yqVn5X6kK1LwSjKOn2ZOScUnu7bZdOet7gcVGtSq0KOMjV1rpU40bPwtXcsr2fNW30vrdkJvN4ufN5tPxKcFUqYPFVsBKNNQxN3QlWjaMZ2eiuvDpez3VvMtnCdOpOlVlCdSnZVHTakk7cmlqvP8CoqqPd6SS+07pCEM0rtOy+foMt3ZOLlzVrW9W9i2EI5G4uLW+tPR/ECyDto0n1b/gWOv9WwVfFRxijb9W6CveezV2n10y76XIQo4itelhIxqV8rcVOagtPN6W209Ea+NqUuKcRp4TBUKUMJhbuqqUXFVKiSTu99Fu+rA3eDYacMNDNnU5PNmhu5N6pW/D42N7u0kpxyxinZSpRyrXdKWvwXuy2nSUY6uD0+y0lG3JtK3l9u3oSkvG2pKM1a6ck6lv3m/spbb/MiqO7WilCnB3snOSk79NHZvXrzQS01n41o8taKV77vKrrz+BNtcrTWyUM1pLplS2V9XfmjKV4qWaDW0bRTTfSP7VvZAVSg3e+VR0V5PNJ9EunK1yWST1zVHZ20s3fok0v/AApE4p3cYSc8y3pvxP8AxPVfJ6bF0aeXLNX1VlkTirc0pNWUeea0b7AUKnknrGUL/dXinbq93Hz2b2tqSqRineStJ7qpVak31bST9r25F+Rxi6etNLdQSstrXWvxbRVdJO3dqy1tOLil000v6sghKDusr8f3U0pW+GkffXzMyipPaLu762lJ+y5fC3mZnUSTX6yUHum21632/Ep71zVSGGUa1aCu4wyr43AziKkoYaUoVo0GldVpSclHq1l39lzPN+3FOMu0VGcYtR+rw0lLM7KT0b6neOKcaocNqTp4WNbGcRqU1F4WEVKy1v6XulvrayWp0btXhMRhsXga+LqqrWxNFztGyUEpPLFJbWXU7rHrm05h7f8Aon8LUp8e4tNS8Cp4Om7aa+Oav/8ATPog80/R34T/AGX9F/D5ySVTHTni5eak7R/8sYnpZsxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8i/SVgo4vt7xqSqRoVKONqRhLvXGSbatZLfVt2v1OuVMXPCqWF4hSp0+8ahTxipa76ZumvR2O3/SNCT+kXj6jSU2sS220vDdLX8jrdacalVUZxjNZkvGm1o9F5amM9bV45OhdynmusrUb3XQ3aLXdzUpRkrapRV18TQineV73zfeRuUHo0sumt7v8Amcy6dV7SNR7QcLqxlBxq4OazQj4XllF3S6a3sctg5+GySS6evTr6M4rtir4/glbNGznVoycH1Sd7+qNzBSbhd721au7rmX+I52Et7NdL3bf81t/SJ052taT62cnKz8uvTyNSlNyaSd79G38bP+GxDv6vfZHSqqO/eNLKva9/fYiuRTb8Ks2nst7+iS/iRqx20be8XFZW/jzKIV1Ldt20cUr2+D39yWd20hK17WWrfonsBCS0c7p2ds0b6+jv+N/Y4zHYWM4Sai5RtZuSSbv7fjqclUq30cnJ9W7XXrp5bfEpk4ydlaUtrJZvly+ZUdd4bOlQxFPAcQp56al/2bO5R15QlZ6b6fA5vhkJ0cG6FSUpyo5oSyTloszsrelvzNDi2BpV6LglePR2dr+afz+Bb2dnV+pZa1WdWtTqyUJXTb0WrT30569dWdIzxSCjj6DjDWVNxik82ZqS+z5eV273Izq0sBhHi8dHFUHCeWMLZHN6pJJ+Jtu+1tiXHsThcDLD4rF06lSKzqmoRac5tKystHHwvXbnY4LDwr8VxkcZxF2pwuqVFSvClfT3fJ/kCXJ8JhWxVeWOxbip1FljFOyhHlFPysjs9Cna7d7tckk7XWlm3bR7bnHYRKjL7WTLFN5Uotebb0TOQp1aajFOKUWs0YpJpqz5tklYXqk3ZOLyx5OF9Ned/LZMsgnvZOXOzbvrzS0T99Lbms8TSvlvS0TslFSaXkle3LmZeLjKqqTyOa1WaauvT+bOVbEPE7xzXvli008r32Wrfm7mVFRu3GCV2rxahf8A6eZrxxcKlO7qKUZtQ8LWVvpeys79d9fQy8ZRSqTjOzglKcsjTXOzzO/wSXmBsQhF+HwJrTJBtZXfeUlpr1/Elli08iilHWUI0r5V55np8/yKPrlF1FBVKrko54xypK3VJJ7a8nz1EMfhXCg13dRSlak5RlaPPwOzbe+wGypJyThUu5OzmvE2+Wr0v6L0ITi0vEqWRu2VycW/JLROS83YrePoJSlKSik+7nNLNJ8rN3Tu726vqiyGJp3krRTpwzSzLXLye7lb5PqBGSi7uNWMKid3ZqKivS2vTV31e25iUVKV815Ja3TvH1s1p0vd+2ph4ynen46sIzTyZYeGS3tFK+vVx1tuZhj4ODvVlkjNQb71KN+jurrprrutAMxWZWi73b+1bW37V3ded9fUz3au3CnKSit4uKdvXZpX6XZirjqVPvPG490lKUoStFc1o9bW5yXvYr+s0o1I08uWor1IRlCDlZfs2WvzswOF7QcPjiaE2vDU3U7eO/Jq22+i/Ajwus+LqWHy4PD8WpWWIlUfdqpBL7V9tNXtfXV2OXq1aU4RtiIRU3pfRbX1Wl5ejVtfO3WuLYNOaxODqKjiqUrQnCycZb2y3/lYqOSoSzOXJRdrJPLBryWnxLKdOeIxCo0ZU3Wkm4qpNwurX1b/AIGjguN4HH03h+ISwfBuKJ3lWlT/AFWI01af5O1vM1uK9poTgsF2a7iriGnCXEXQist3dqDau+t3oXCZbXGOILDZeG4Ghh3xeUctWvTvOVJN3+03a/TTz2tfkuBcJXD6EaTg4yfJw1k/TWXvovc43s5wvDcPpznKWas5XqSU7Scus5ct+drnZFUhCTpRtGSgmoUqbUprb7K1e29/S7JMrCyzglH9ZrrHWKuuqu+X7TvYza8f1dRShF2zR1XmtWlZdcrVyEMVDKpRqXjN6TltJ8k3tZfsvxfgRli6MrynXzVFpNSSUl5NrSFvUirVmnKUm5yb+3kattpdtb+rXoIq8nJXzOKvNxlZX2+3pb1tzISr07+Os5NK+aUo3XO6+7bneV276Ee7qVbyp1cLTjC2anOpmqzzPXKmvdt+xBc5ZoJVM2WauoTacprqno7ebt7IxKMs8rqDmlmdp5bfvShpp5318yynndKSpWyvVy7zRrbWTjbV/e1vyRiNPPFJSUkndKnlk4SXOyTu/XRAQt4VfJtpGNPT/El4uXLS6dyrEydNLwNzlrGLaqTf/hSs/wB3kbSpayipZVHWXi73J/icnZavoTVHDOMqboyxFOTSq0M6cZLzSS6t+zA46eHqRp4mrxjNw2hTUXGtLLKElo3rfxO3hsra6Npqz65jOOVeN1pYPgVCNChK0KmPqRVOc0tFlWiVru19V05m32h4TW432mlGvWX1KlGEaMITtTTsrtK3hbve712toczRwn1OgqOAoJxt9prT3/e8zpPXF4Lg2G4Vg506a8c45qlR2zvTXXm+a8zi+JcBxXafj/Z/hnDIyjUxdTuE14u7g2nKo1yyxvJ36HZoxqwm44ruIKT8MrtJPz038ztn0JqcO3cHUVKop4OslNXk1LNB3V1ponr6osdS0ePeuHYKhw7h+FwOEhkw2GpQo0o3vlhFJJfBI2ADZiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD5V+lV06X0g8ayVpQk8Qrq3NwjzvpudeoQpzqUk5TVTlFxu37nZfpTjN/SNxpQpRk3Vis8vuLJHVc/hfc6lXlkqqVKTTj95p3fsYz1rHHJRqKTlrK6k1mlo5eZKniIRllk/tHHQruvBTppuatFpP7Nr6EKEJ1pZ5TdPmpWTXz5EdZU9uFlwnDa/hSp4uFmvNSTT87I2MDFZEm2rPndW/HXc69xTikOLY6nTw7/7BQlmUl/301zX7q+Z2HhGqivEpbLLHV+Ss0n6FniRLk4KFRN2p1F97w6e71SX+JXH1GliMRGUnilWyaU6dH9VKF9W21e6bS6Wl6G/hozm1JeOULrNKaTXs07el1tucpFy7vu5Sbj+ylqny02+HzOXTjKXCcFJSSnie7km0o1nLu/NS0v8AgSjwnh+SNNwqSck8yc8ykutlZp+at6m7UvmzSk5LlKTafvK9r/MrqRnZ21i3dqV1G/nbVv2QGlU4dgpZoxw0m9oyjpZbPfdadH5PcqXD8HJ5VhP1Sd4xcJNp9b9Pc2q0ftKokreJ3kn73bVvh8SqUYtPwNX1u29vO38wK6nD8FKMlKkvErybWWMuVudvaxpPC4fD4mrToKHctQmotWSe3K9tlt7m7e1m4LV6KTclL/Cn087GrXkvrqTyxXd6tO7+1tL+V9y5RqcXwVPiCw1GveKjWu25Xs8svJc99lc5LC4DBU/HKDl4XGdlFZo25rlby1NXEKX6q+Z5asF4n4km7WVtVp7aX5m9rKV3FuT1zVNbdPNv5DI2aFHAKEYQpRU6b/Vu3ipp7peT6u75m3HDYCEZqWEo922puFktb3zeTvzbOOp1nKEVneTleSik+srJRt6MupS0ioqGZbNRWj8+i9mRW8oYV2SoU0mnnebWqrW1/aSW19DFKnhEkoUI5I2cbZmoa28F3p6RVvU1ZVXJSypNPXSLs/Xn7GY1vFLxXck29U2l0b0s/TQDkYKhGU3HDwhJq0ouLlHzdtFfrbXzLIPDQcG6dJNKzc3mb9Wt/L8TjadVK0c1nJ6J830S0u/PbyLVUsrJu+7lmyy92uflqBycJU14e6oaPVPLdP0tfp5/Mug6DlOTpUG5/sxTc/LZO3ucfCq0ms9RpOzd0km9LP5X9izvX+1JZldp/eS5uS572XlcmRvxjQTV6FDayu0o+jv/AD5EZxpNxvQpycHZZoJyi/3rr52NeFZ5lJRlld3d6p9V5LzsicZ5owX20lZXtFf9N9WBmUcPlqWoUFTk/G5U3Lbk9L89ET/Vycs2FpTyxyu0YtRv10tG/o36EO+vLNGbstc0ZNSS62Sskrb89yuck4/rFTvBWzWlJQb5av3dr36AXwlSiouFCHhWqVPvV5qV9br29yt1sJKlKP6mUL5ratr0Stp/TKXKad595HWybacF5apK/lv0JTqytKU3UnG2rqScdv3mlJr4ehMix1MLPNNYdVFtejS+y+TWXSOt+dk7+9UqeBqrJKhFxi7uL8bT5ylGKab82KlbNKNpSuud05K/K70Wn3dW/Ii6sFHM1FxTtd1HkXzfi/d5jI4jiHZTg+OqVJYiOKhObTmsy7yVuSi1r1u7/iS4X2f4HwylGGFw1SootS7yrmko8k43SSvvde5y983hhni5N2pyhGLfWyesfWQU1K2SVSvOL0qN5nFdHFx067XtzLkwnGWBhU/WUaUHFWySqQV/OUW9W99dPTmlLDRpeOnGFJyTbqpvNz0clb8fRlDqTjF5M8HGzsu7y67eFWu3rYxCcKddtRk5pXbnUedf4uaS8lZ9OYG0p4V1HOpRipfd0Ta53ypPq9WtL8iTjhVKN8NRbS0hlXi6O3X1a9jTg1KWWg5x3aVJRul1V34f95u/kIVFJPupxyWbaozta/Nyuvd/Ag21DBKnUl9WpQi7Ocm3ll6zbaa1ay3lzNbEYDDvu50+Hwt/3M5PJ3EdLtRTTcWrq3K2iMxqQzReWeZ+GOVylJv91WbT8+Vi14iUEpRlZr/cjfq5Xu/Xn0GRqywiSSqxryS5qcWs3llXhdv3Xo+RVNRcc0adRRg9XOnJuPq56L0SvrsW1ElUy93TzPWylJPK/wBrLrZ+iXoQd+8jmneotfHUSn7NbL0v5FBUpuOXJVjCOse8lKKj53el/ZaGb/q06lZUIJpuUYObjrbedlq/zK1GL8UFDyuktPxfq2n8yyMakpUnSUKl228827x0TfO+nJW1A4OvUUeNYq9JQhKzcFdpLIk14r3/AIo5PDYyrSTyTzR5xesWuvk/I4XG1nPtBi3nqVJRcUqma92ord2st3/E3lJTgm/H+zaSk/Z8/wASmWzi66xdPJOjCMHvZO79+nmjsP0R4rue2PDqTpU6cZ97BftfZb382rnWKbyy1dSTtrezn56Xv+RyvYDEdz2/4Q5Tcm8S45Yu0YqUJJJ33foWvUtx9KAA3YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+VvpaVN/SRxhVbv/tELJWV33dP47+R0/FWzWa8XNdPW+x3X6VHUf0jccyVI0k68Iyk205LuqekerOo1qcVeMpJK+icNPhz9jKetY44ujip4TEKrFZorSUb7q+/qafaXijxUfqHDFJUZq9eq19q/3F+fw5s5DE4aMm3KVR6ttSSV37bM1MPKnRx1GtOkqlKDyzgna6/iWISWvwThtWai4xbiktdUt+vQ73wjhlajTXeRtda5m7W13t+Bs4Khh1hYYzhdq1KeXLTows1fR2tzT3taxuxrU87i0ozi7apq39exnMu4ht4bDxjlzyzpLw2cY2XRWu/a68y9wSp3jKUYJbu9or5JfBmhLE3fil4WuX9fJkoYjxpykm1zb1Xm+vsRVlRpxUrKOnK7t5X/AJXNeay3tGGis20m0ujSTty5/iZlNyd7yTXN7x9NHdlXeJWeampRVlZaR9Nbt+ZQ1jJJQcLPwxUU9Vu1bn8Xvsa00ksrit9LtWXny/E2FZxklK7fKSUZP4bv+ZRXVqd5TlltreWjXS19v3V8QKJKUVJJJXdpSyuDT+d/T4mtWd61CU8yg1OMX9qK26vTbaxfUUFF3Wq8LvFSa8l09Pma8otVqU5JxqZrOfibkrbBGMZFRwjeVJU8stFltaSd11XvcueVVMmRau1pKza6pXt6XsUY5Opw6uneWWnNpyjbK8ra52toX2TjN5WoSWZ2+7zTdufkVV0XLw2Sk5apzTs7eul/REnOzTn43t+seVNrmlr73WpTGLzOy1v4lZNP1vv7FkZrVKVRp6NqS16aXsvy8yCxScpJNqcrXUlGS1122/IlCTmrLXK0tNLPrfa/n/AoqzpytntJKN1mzTut1p633EqscniS1Vk276dfx211A26VZwd1J03bVqUreSdtUt1qudyyMl3rWZ5rtyTntHkv619DThO91B3k5aKP2b630+9LntoTVSkoSTaUE9IqWz6WXP8AiyDkaVRxabclFWScU7ZdNI8kvT+JbGfJ3bte0ZqWWz+1Z6e/tscdGtQu/HBS1cmo3a0s7vbZ+Vvc2YYijnjmm7PxWz2enO9uj9LLmBtppTTlKMZ2T+zo5J7pp6+Wumli1yeTxp2vr3jV7dLK/O2tt99zRji6eXSvG2mzWWfTw21fnboZeIo6ZZRbvqr6p25v5N68iDedZyfinOclv96z1v0101tordCqpNNtxitVpaVm/R/afoa31mkpKmnmu8sVe7ivJc+mr6Mx9eoLNJyi80t9r7XTdr+dwNjO4y8Flzcc2Zv9+S+Tur+Qptpr9XJLdVO6bTXWz1T87L1ZrPE0M6jOUU+dnZpv7zastvTbqZjUoTaUctNyeiyufvr+IF7neLcm09tPsxV9PDdr2enUl30X+sjKMUtJNzcn6KVmk/8ACtOVzW+sUVpKpBOLb+ypPo019leX4k3VvN2tZLM8zcV/ik7dNEl73AvlaVSUY04VJNWlGbd3brLLdt8knz9yDlGpduU5WvfNUcnt96yt/u8utih1KSprNNJWtHxZW/Vq915XtprcmqsbRzVXU0Wru9NtL63+CtyQE5ySSkskFNtxlNqDd7Xa5wWn5mdE8uSTum1ZeBKz+1d+LfZtGvncYNxdpWtom9bbJNtyX57u2gzUk7Pu3JvVKUZNy5O61Tu+WnXYDZ0mn4ZS6xhFuDvzy6ptWtZbbJMKvGKzTkmls+9SzPpfWVukdkyhzp6U1sl4Y1ZKrl66/e8+S3JrEQazurNXVrrwXXVP7vrbVAbEZJN7xlJWzZnNt77p8tr6Lz1RGNaOrhKn+9lssvrl8N/Xkane0nfK4tJPM4LSNl57rre6/OMsZSUYSdVWWsXu7c3G2i+AG5dyVqcNG8yioZoy6yy6/G1uvUjeOV3fhTu3G2VO3N3fwvbyNaOKptNZM0k9VKDm7/HxPy1sYeMTVGdKMnGfhp1IwSjJ9FLXTzWi2EDad14ptRTd3Zu8n1v19NdfM1cRi6VDDYjG4ulUjCmmoyrKSjO8Vqot3m7NWb5shja9DDYepX4xW+r4dK0JU68YSbtqub8rW1v5HR+L8blx/Gd3CE6ODptOEW9ZO+jfS3L1udRGTLbwtPFwqzxk6E5RqTc52TWV+T+RzeFxMamXLKNmrJrd+VtLP0OP4RDG06qpUZuPJyz6JdfJHMdzgouTjkxNdrNKtmyQ9kvzKkJO0llaUlL7uiTX4teexvdkJ912u4O1GFGkuIUVmvZTbkk2r6PdLQ0E24yteon0UYr2fNediuFTuOJ0Ks6ic6VSlUjFXSgoTUnvpbQR0nj6zABuwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8tfSPBVfpE41JUKlaaxX3c+WKUI6yavpZM63VpuMU24K/NpQXwb/AA9zsvbaEsR2v41JYpU1LG1Y93Fybm8ztztpZaI4uhgZUpWdPLF65oRs0+rvdtmM9bV44GtBOKcUmtk1Zr/ytnFYunKLzpNtcv6SO418CpLPOMpStpK3y6L426HGYnBJXioZrftRcZf7y1+TLErMOu4PG4vAV6mIwGIdGL1cGsyl6r81qcrHtxa64hwunKclllOk1+sVud7PTkzTxeElSvBQcbO/ieuvPQ4XEUfD6eVvYuIlxMy7PHtxwtSpKPDcRmh4abuulrS18XuVPtzwlRqU3w/FpSbzZWk078mnovI6jhcDUxfEMNhqElTq1qihCTbSi+T0OyR7D4/vKv6/BvJrfvJSz7PS0dfP1JrBFpb8O3nC5VJ1I8Oxl4R8SVTwqN0tY33u9GVrtzwfKoywnEMsXeLzrMvJtOzXkjrfaTs/W4TQoV6uJg1OTpd3TUrSa11dktN9enU4SFNP/oWKxJNpd9j234POU74XG5ZrxK+iX7ut0/NshPtnwRTg6dHHwlD7LdpX0+9rrp0sdHeHzJXirehmOGVrJaeY1hNrO4f6X8I7txdLH5L35XX+HXT3Nnh/aDh/EeJYfD4ejWjXk3l7xWhZK+ut72R0mOGb28XPQ5Ts/h3S4xg5uLhaortq26sJrCxM5eiVYSq0qikpN5ZQad5KN1yu7+vyOp4ftfwdQpZ8PjU1BRqKKWWTStda6Pz1O3pJ1EnC8oPw3bXPXKns9d+Z59hOyuLxDcoulCM5O2eVnu91+RzGP66mZ/jmaXbLgsYQVTDcTnKDbhJtaro9fwsSl2w4G4OLwfEIpt6qzaflrt5EcH2DVWKdTFZ29skbL4v35M5Sj2B4XCUpVa1eorK0ZVYxt5LS7frYv5SMuMfbDg0pZvqGNm5LxxaspPrvdPz9BDtjwiOVrh2MlUvpOU0210lZ2f4nZH2N4FG98JSev3sW7pedrr53XOxiXY3hEovJglFbSedpRfk76r+rMn5X9OtrtnwuEWocIxDyvwJ1tY6335x8nyIy7dYC88vA04SjllF1tH5r9l+mhy9bsbw+NSpN0JxoZlHLq9Ouuu/kWy+j/BTV41IttKyUpa9bXX9eY8T9ODX0h0YOnJ8EjKSWWUpVtJLo1a3va/mYh29p92lDgdBZHmg3Vk3T0to+at1v8Tk5fR7BuMo1pQV//Vyel+nxNGt9HNeOXu6sVJ/tXit9rtWvYv5T9IVPpCowlJR4Fg1GavKMakkr9Uls7pPpp63jT+kOldVHwGhntklLvZPOr3tLS3w11KZdgsdFvJkcbtfa3fl5lH+hfE9LUYSd1opp7q5YismbOQl9IdB5YrgWGUYf3eWpLwLpFNadNSH+n2Gck1wPD5Zfah3srOW93po/SyOKxHZXiWHgp1sLLK+UdWzOH7K8UxWtLBVLKyalp8mMVTNnKrt9h86nPgcJSW7VZ+NXvZ6Wtf387aEF26wMYRi+BRUV/drv28ntbxe9zRj2N4s1f6rGS8pJ69PNmZ9jOLU9Z4eCataLmtdOXX2GtVzZyS7fYSCeTgMHSdnkliJSu1Z3Ukrx1W0bJa9SqXbuhOUZPgVJzv4n3uklva1rJ+e5orsbxaEnegpWf3Zax9iE+ynE4XU8LlsrtuStEa1M2cjHtzRivBwdpRayqNdpq192141rsyX+nNN2/wDwmUlNXqp4h+K6tdX1h8ziJdncdFX+ru3k7r08yv8AsqvCbpyoSUk9VbYa1M2cvHtvBJtcMqZ4vwy+svTS2uni+SMvtxCzj/ZF6c/FKLxDd3a107eFb6LqcX/YWLf2aLa3tH+BmPAMW46U3b1/Ma1TNnLUu3EcqceFUu9jeKar28Lto1az23d2Qq9t1FqMuD4ZK7eSFaWjbve9r38r28ji/wDR7Et3nSSa6u1ycezuJitKPqxrVc2ciu3tfvO8XCaPe2SzzqPM7O65aa9LdNtA+3mKzJx4PgVFbQebLHmmkuafM47+wcTf+6S8lLUg+CYhXbpyGtUzZyT7e8SSi48PwcZKyzKMs8le+st2vJkKvbrtBiY1I0ZUMLGossnRpWuuhof2fWnOMY0peStub+H4Fi5P/wDTyXm0MVhfZceliMXWhVxFSpVqx1zTlmd/Ly52OwYHAtSjXoRi4vwzUbNJ+hs4DglSMVKWVK977te3/Q57D4SNKm41FdNaJWu/NWT+DZzM446iFWFhak1e+2ZZlFe/M3M0rWead3dJQsvdX/gRyuLtaUWtcuZafDX+tiqco2tlXoldL1uculspxtJ5lJrbwX06LovgcfWnHLWjSprO6TvU+11sly31suuuli2U5VI5U09el7FbvGcVOrlgnbJd5pPy8uXXbkWEl9d4OqsRhKFaP2akIzXurlxxXZOr33Zbg9VffwdGXxgjlTdgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB7A1eKYj6pwzF4lK7o0Z1LekWwPmbilBYjjmNxqoVJyq16tXvJStpn+ze9tbrbkit4CHEKcXUwtSnGOy77N8+RsYKiq9W1XFOtVVNN0cmVQlzlZX3v5bFsm6Mlq4uSssz0fkeeZeiI8cY+HLDyyqTtqlT0lOK63dtPK3Iqq4XvFGEowrO2lo6pe97+1kbOIxPdSVOrSmrbJRlZryetn1WxihWjXUklUcb+Jzg4peyTT9dPQDhsTwyTgpUo1ZRs5XVPIknztr8E/Y4HHcIr1M7pUKkkk27Rb067bHfalKVTxQoQqTTumoybT8pW+en5nEYnE0I1XCo5xlCTu3FyUZerd4v0uWJTDqvZXheIw/aTC1sXQ7uNNTqR7yNk3ay199lqel0oz7mrOeJp5cO/1cbumoppScFe7vdvW6uzr2CxEFXqV4XyqKk3C+aSbu1rq3aL5HJYbu4cO7uEXSp5XGMHK7SfJt6XJacrEOrdvIf2hwmjKjXhiqn1qKVW2Sc3aV3KO2jbWnNHDcN7MKVONTE1LJq+6UXy+1y1O09rZTqcJTxEqdSpGrQeemsscuZJJpWV1rd9dTHDLOMGnBSf3squvJq97Po1bmjqJ8c6tLDdmsCrXpZ09PE5a6+17eVzehwnBU1eFGi0nrJwl+bvf8OaN9uF7OpFSvbWUpyvyW10/V2NlRqrVd/BJXUpXco9dU2l7smVw42pwyclH6thKDur53JSTXXZN+qKanD6tChUlOs2opSUHRSV91bXQ5ui6dKUrRjGTacnCSV785SVrX90W4qUsVg6kL5IKDajm+1pfW2gyuHCfq0nKdox/ale1/J62fp7lfCI4mGCpyqL9Tmkozi1KyU2tVo17FtGbj4opKSV3lSk3pu29FuZ4fXhToSpyq2lTq1I2aScbzb5267II5GEFUlJVcrk9W5wSduqbe34nI0O8iklKUZpXlFzlHw+aWlvRP1WxoYOtGbXd5Er3srS10trtH1s+hyFPJGKUY0lFNuPhclF/urdbdSKk6cpJOnKLk3lpyjZRb/Zs9JejV3fdFCwOPnNVKs44aX3W4qrUtzUtlb1uWwxMZtyb7yWzzKE3LyaW63s09bHJYTGKUN1NabyjaXur/ANcgNKEac6VTDSxiji1p3dOOVvzsuXua0+HcSpqWSVHE05WzU5QUPda2v6nL1ozhNVI1X3+kotu3PmunInUxEpXUINLWKhk8Sfr8wNBUnu4Tg39ttOLUno1Jq65LXRjI4Zrx7tu14xtK/rFXu+abuYlUaanTdm9Yyp7200dr6X+8r3vqYdaEHGLs2/DaLyNPo09r9UyKsdOzc05JapuKa9sr0t5pKxTVwuKml3FCdWSu5SnNpJ83m39bLXyLozilpKMZXSWWWX/dcle3W+t3tY2qFZULyhKaa3co2053trp5gcdh8FXpVFUxWKouitZRhFq3mm3/AF5EsRg++afD8Vh3St4pKn3mf3bv7/M5h1niLxywS+9lea66enMhCqsNT0sqVrRWWy9rc/UDiIUMVB5cZShKDVliL2j7a3i/Lnb3L6dNQadOlkza+DwX8ssnv8vbUuxGNjKplnOD0vlWn5O780a0Z55StJVG/vRnFyn56rkBXKCu4qNWdtMtOeZr0k/s/wCFfPQ150Y5XKKjGy0lRs4vXezuk+snb8zck3WgnUl3sNlnqJxk+iyrV89NupXOcXKGaXjbum3Ft+astPNO6frqUcdVwWMlUU5KGGhNeF2u5rqtb280zNLC4SjBxxOIh3zd4NQu5eupzGFxlSNPJC0oJ28STj/hbWlvnyMTpTruFSUZNSdouKSS8tkMo4FYLEyl+qxEJyv/AHTorLfp1XzLnhalK6xdNUqslbI2sy9GvDL/AHtfI5t4yrGLhKok4qzlGyl6aLT1NGpllfwLLLV2lpL3b1frZXA4+VH7Li53fONl7arT02K+5jJKXhs95U9U3+zdt5X8+htVnZ2kst1ducX81rG37zuVtuT0blUavrJSTv0tpl8tfYDXlhp1n3VGEHWeii7xS8m5cvU1qnD61KbjWl3c7/ZUUk/LzN9OMFv4baKMssZJeXP31NmHEsSsO4rESlTatmzLRe/IGHHTjhZwdKi5RxC/vG4WSI0sDXmpSoTU4rWXfaQ+O3sbNpU6meFRxlDxKpHX4Pn6DE4+pXg3iKrko6rMrr3WhTGFcm4tXk11edXXpZWIZmk0ox87N3/n6oqlX1zXWnPNovVciuU/CksrS2vG/wAG0QWTlFK9nbyjlu/MrjRqYiTjTlTjLezlZvy1/kQlNrxN29XYrjXWyafS2gGx9Rq0H3lWnXahrLMmlbp0K6sY4urGVGhUVtm25ZFZ67W+JNValfLCU5OC2Tbtf0YxUXFQSrKmk7v95e223PoUl9Q9iWn2P4Lblg6Ud77RSOaOrfRdW7/sDwWdrWoZLXv9ltfkdpN4ecAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOu/SHVdHsVxdrTPQdL/wAbUP8AmOxHR/pixCodjKkXJJ1a9OC8Vr2eb/lJPFjrxSi6kXN1MN9XTktrRc7bSf4IvTls023u4rf4aWNDDNOCy1pV8zbdRQabfRdLLlz5lkLJuPhst4uNrP03R53ocnCcXSlTSUFH7Cy2d/L+JpVpSqzdKdWULq8Jq7cV7av8CdCdl+za2i0/H3GJpxdeEm9tcqd7+RRVDhampVKuOqxUec4RfuWUJZKU6jnN06SyU80LOVubty8jONrTmoUaTtObtdRT06+RRjHCnThTgnGytFWe3lbkEaE6kq0a1VTjRzVMsKtPxZWrNZZLnfTb8Ddz5VGOeMVlsrzd7dLPf5nH4eMnGlJQV5Xk5NJStrbK7LM9LX5J/HkqfeU4pRd4ydrpySa6NWa+fsBwPaCFN8Ex2WKhlh3sbya7xxabajyasovbZDhsoxoxTcUlymtV5Oyv6NM3OJUlPBYylNVJOph6l4qKnBKKdsqa+1rrbWzi+SOM7OReKw1FSrd3TjCOa07y2121sIHPYTDf2lnhKo4RUXlb/a5ac7ftLqQwzUleslGrDSbcZPVb6yvbk03uX1av1GrBUJqrRnFLNTTSh6l+N4Y5S+s4TE0Xi0tYuTjn/rkwKlUlFxam+sVFXu3u42fifsRpVJJuMFB3f2ddXbXMrX9zTjVk6zoTg6dZu0o5XZvm9rP2tzMtuUcsYNwa0i1otfu25+tgNDDuPcQc5wyL7V1by32b8je4Pg8LWwuNjPDU3iaeIm9eUcsGl1drmpRUlGE80knfxNu+l9NN2WcHq/VuI4uM4SyKrTktE7Jwjf8AAYG/gqMZValPBYahGsle7kkpabu+y1+WhdQw/FJKWT6vePitmaemzukl8TXxNCX1qk7wcVfzvB66G9PEZEnTVpPbW2vMC+GHwmIefE4DDyqx8NaVnJSlzfXpruXRcKElDDZYUV4oLPbKm/uyt66GrCcacYZbWW0rOSUvbb30Iyrp+JN2u7vMnFdY3+7cDlamKzUVC17JpO2rfR33b8jWq1IpZVGMktuTXom7JfM0u8yv7SWqzfrMzl5p225aIhUxEaUHNziqcfRqL9fu+TsRW53vgc3dtt+PvbJvze38evWqnQlj41FTypUo+BLw3e+Xy8raFGGpYniLUsNGUaX2Z16itouWZ6M2MVOfCalKlOcHGWse6mnbrm/iwM0cS6lKLdVxkvDNTcE1ycXfePmWxreOMoxaaXglGKbXLRuza9n6leO4Zi7/AFnCzpTqtZp0qc07+cUuf47GhQxcKlR0pxnTne8qLTUlLfSN7P0QHOUcV3coyTulLVqba9+jfnYlVxEas3KEo+Sg3ez5a6J77dDjs08y+3OpbRp+J8+er+GnUnGrLw61JXjfR5orybA2Z4XCYinevRzVHpGcqjcX0tza6M0e6wuEqWp4VwryV41E7prmlvbqbFKpKMotXU5bPvLya8nrdfhzK+I03Vy1KEbrSUe7lo+tntv1A18vE5VtMLF1W7NOpeb6Jvr5rqbMcBTqTjT4hgVHFS1laV0oedt2XUqssNQdSU5KrsmvtN8/J/8AUqw1R/Vq2InJRlUllV45lb0Wy9Si2WHweGqP6nRUFbxSlLLm66PdeVi6niYwi1KNBtq6m7y9/D+XuaMqjVpa2va2dqCl5tWfutOQlVcvDmnfmp2eVdVLRL3fqTAzUr56iUas5NK6j3tpry1STXn+BrVK0f2qcpXspRneS89lbpewrVJShdTk6adm2m7Nfs31zdb+2hpKtVxNRU8M6les9lBttfFbFROcpVasaNLLKU3rZr3b6+r0fTmQcfqlSph5K9tYSTupR8k9Plc2p4KrgqNSrVqUJ1UrzUaqnKK5+FcjWjQ/tPC966tCCi3GDqVlGUX72dvZAQlN7O9t/He/u9X7p/wMRm5yUvtvfNCadvSyv7s1arr4OeTGwlSnyl9mMly1Wj+JbCamoyTbW6tK/wArXSCtupVcqSg7Rtu3K85LouZQrQku/pucOcW1G682nbTzuYzTSdo1Irm1Jb/L5FV1GXKD3e3zf5hGK8KUWpxp05QtdRyr5lMu9lHPSkoU27ZVL8uhtPxwyv7uq1NXD0ss2pJJp73voUThh68aPfTVF0tsrlq/929ya7unTadKlKc9U3G7ivyZXVaq1tXFKOvisrIxO8pN39bAEltZ+ay3/ElXqtyg+77yrmtFtXt7LbS+91qV+iT6Xd0Kjk4uKqKEXvJ31XtugPov6GqnefR7w/8AdqV4b9Ks0d2PP/oNqqp2BpJfcxWIj/8A9G/zPQDaOMJ6AAqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAebfTnVy9nsBTabjPFXdnbaMv4npJ5H9Pk23wOnGpkbdZ3fLSKvprz3RLcWvXlFLxQinRVFWt3aTVk9bNMuUlpFNacmkm15efkabnONONpurKycptPVrd6/yLoZpx0aSlya0v7v5owehf3mRNpctrLbqtPkThVrTpXUpa9FbL5FUMDjJSu3QyXu8tRN/ib0KeMpJwjTw9SElqnXUWwNbCNqFStUspSWVctOZxXFMXGnHKsrzN/ZW7XNHK4rD8Qm/1VCgoLRWr5re/U42eDrYarCeJmliqsskFB3yrd2S8kEbOFo+O2WTyr7dvA1zS2Td0rvez8zbSspSULXVv7tJ77N7N+xpUqkKdWrBy/WqXig7Zabtslz5Nt63fkbOeMdctNtaN6y+Lt+AEqlOM6bglGbqSajTTsrJatO61Wib8+ZwfBMDhuI8Ow6lHucVCKjCvFtOWmibRzcHTr1oubim1l76cbqNtcvK17fJHB8CbVOSjeShVnG0VdfafLp/XqHMYKu8FSxGGm5ySdv1srzi30utC6hw/DwSeJnVmmsyoyqXT83tdeTZmph4YidPEtN5fDO1vF09fXQzKspt+KGr0jfS/Vr+T9ALcVXc6ToKGSlb+7hlydNdU7+RxGIficpRbcvtXk07+bSab+fmbdd3TSpp6NKLpZpR03bv8zi8bW7hRqZmnskrp29P+bX2AnhYtUISUbOOjVm3ZSe/9WfM1It0eLYtp/bjSaTeZWtJWaenLbkze4ZHNgqclHnJWSktcz0TS0OPxkpUuNTULzcqMNl0lPR+ZUczLEzqUlmWaaVrvd+tvyMYGtKvaU1aKbTVr6mvhcTSpSyYinUUJxs6ipuWR9XZdSNXG0aM5U6LrTi1dyjTnBfPW4lXIzqxi25d0+WZqy163f4WYU3J+G+2sk7KHmvbmt77GpQtipfro/q0m2nG1/bmX2yw0jG0LWirWiuXPSXxINuNWKjF08yvqu7TlG37t9V5rRl+Gr9zVjKcVPItYzpqo8r9NGvizjPrCdeUG6kqmW7cryuuT+1tfoX082VuEKiivElFKCXveyv/AEkFb+OwlPHtLDVJ4PFPRUoybpT9IvS/oaeAq/U416eMjCvUf7cXFwf9cmItxklGTiuUYRlC69LO+/LbmyeMpfXZ0a0Kjp1VaFR5Wrx9+elrkFeD4fVrSc54yUcMneU4wSk1/XM3sRiKU4ONGgmkku8qKU5/+N6/D3NSrWg3GEJLKtIrM4K3s9b/AMSEm5fdeZptuUHqvLW3rpqBPNBSacYRir3lfNlXNtXbv1ymHUTis/d5tH4oSt66X183qa06iWrdsurbgrw/xW/mQo1M8f1eqlraM2k/R783pYI5B1d0+8X7UW2rN+XN+1upL62ptwcU7a8tPLTT4HFzxMKWVOyk1dZb6eje/wA15G3hq1KlT73ESapc4vW/oVVlbESrVY4eEWn9myd733Zt4mpllGFNySpKySXL12+RqPFYLDSdd4jDzqWapxhJyd/NGlTxixdqdGWZvbdJeem1+gG6qqle00tMrUddPO6+NjOdNNynpFX1vamvV6t+exF0KeG/VYeDVrZ9bNvm3J7FdSrGLjebXXJdNeai92BZOV5eKU5VbfYy2eXl5fPU2JSoVqfdzUqErK1XCWi2/OK0a6/iakr6RzSsvFllBNN/BWfqU1aiVmnTavvKOZX6XSQRh4atg68FXqQq007qORZanvfS79CFaE8biV9TVOnfTJHW3ndu/wAS28a1CWGnaMZ3dNZdpc7fwIQTw+HSc81Se8lH7vRdANiMKOCpuEVLFVV9+rrTi+ig9H6s0qzzyk7U0ueWUbR+G3pYgpJySjFSu7JZWv69SLavplfRRu/h1fVgJJ3uorTnlVl6Jvf0+BhSV/DdPe2ZRt8NiDnF1LXUp28op+Sum/mYq+HV7cs1r39uZRaqmVfq7Pm3a6f8SupOUI35PfSxGEnVndRbS6otbpyv3qnC2itTvcCEFlpOW2YrlOKau0teTRmpUqVZ3hSqZE7Lw7GVTdJKUtJPl0AJp7eL2uVV3GMW508zb+6mrvp5/gWSavZr8blanJpyhNU/3pSskud/K34oI99+gObl2MxUZXvDH1Vr5xg/zPSTy/8AR8lfsrxWF21HiLsnyXcUfzueoG0cY26AAqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeJfpCYiMeK8Go1YudL6tWlKC85QW61Wl9j208N+nWrL/AEs4fCnlVSOCzKUrpK85c/8AdObcdV684w0J175Kai1qk2krFPfTpzs4TSS+1vqTrRU3FQWVLnd3kzZVTD93/cSVSNszdTT2Ri2KVW9OLUVy1slFrl7lyqyi8uZp9Frp1VjUlUUpylGKXnFWVuluRiMla11ZatLT5BWxUnndnGM775Yv4W/O5xHGcTOiu8oyyThJSUoyslJf1+RyEvGvst+X8PP4GpjMMq0bzSeXTWO3v0CFLFrjWB+tYTvKeIwUJOvhbp2b1vrq4vk078uQniMVVVSlRoVZYinG8oNpSS062110OvSVfhGPoY3CO1ajK8VON4yT5Py/Dc5jjHa2hHBwlwjB048SrwUZ1JRbVBX2lf7TV5WS08TfkXCHG+LQ7OU5YXBz77imIUamWp4lh9Eu8enPVqPn03o7PZo0Y55VJzi3nlu8z1zb9flodd4Zw+rVnOriJynObz1JTlmlN83J9bHccJhVRSbSslaMm7JLe38tizGCHL06zdPKmm34tJJLzastdSNSrKTaVScuTb8Sfk9dX539EVwnpGKvZcmlJL0e0fcTbcW23kVm03GVujXKxyqmtXhShaUoqO9oN3Xt082cbUlDEVM8ZQdnyt+RzVLC4PEa4ic4Vb3jUn46fr5eprY/NgJp4XEYedZrVwjmSXNNtWAq4csuBip04yUZyipN2Vr6a8nv6lNfFV8NxV93OcYuglKKd1ZTlprqt/iSwEpdy6meKtOUXO2Va9dHprtY1OJLLxDD2TWWlLRx0jZrlts+W9yo5rD8Qxabar1IS03Wd9NeTNynxXGRWleor67xcb+T5p8kcDRdlFwvGK1ulZw81zt6G3TkoyzSdpWu8izekmkrW+fqFcrieIYivSjGvWzR38MU16q2zXnc46VeNOo05QhJOyTUVbXa9rPUmpRcoqesHqrRSbXNq9kmvO7/AC3aXBMNWpurhatGtBrX6w1CcfW+nwIOLrUsko1dHKMru8bt33LqFanJp08uu1t7dUtm/W5sQhOcvqNWlg+4zJRqefrbZ7dCVXgtHD5qtWtRw8lrehJSbfmlpYBTsk8kaeS9ruT0flLl7fEvhVnFShTdotWlFSbWvO62a66mrTs8rnGMpO8c007tf4tPkYjK9lbO1q1lvdc0k38r6a6AWzlL77q6aSi6rt/08nZmvKpFu8lTy7ZnTeWX53LLq0bZbbRdnsuqad9P5GaeDhiJuDxLw85P9iy9JNOy9kRWvOWe0PHlX2Y7KPoRjGNCbzaRezf8VqvY3qvCKmBpqt9WpSUX9rvE1Lyvm59CP1KfFJupDAxpuPhdOMrJemvMqLsLxBUoK9KhJc5VKOab93qzbfE5OOWVHDXtywqk/h/M4yfDpcPs5YmOduyoK08vu3ZejMaZdkoXabk9F5KSsl73A5H6+4px7jBOz+y6CSj6vl8zK4nNt5KOGV1ZvuYxt/PzRxak72i2orTKo6e6erfmiWqV9b7+KUmny9/j7ASq1E7KolK7s27N38n5ehTJKtFSm86a5JK/noXw4VLEeKFdYibWtJyUZJfHVEJQnw15J4OnNT3U5ZnFddHowNfvO6Spuya6eH+TZnO7q82mvvKVn7rYsjwuVaHfKnBU3r3rmrfEoq04YZ5KVXvIJfatZ36X5oCcZKF8qsr6q6SbWvL8iFap3s5SeXM1yWvpZ6Iqcmkmtuv/AFZG+uq9c2/xASabSfi5tWv+LsYlUjFWbS0Wmlvfr6GcidRRlKSTV3peXrYtWBhJuVKpRlbWTqTUWvVP8iima1bk9ubLKGIdOalTkoS2WVIwpSlF0ZOl3WbwtrRed+hN4OjBN161NW2VKSlJ/DT4gbCx+ISyqtUS2SutCM8biLf/AKird8szXyNW927aL+upj028gLpYuvZXrVNOeZlFWpKUnKcpN9W7sNK/QRjBv9ZBtPndpr8gNdNTeWN23slzMV8kIyVSEnfRx1j+GqNmrTpxpqVKc3O+nhtp6kE3Peq4T/blqve2v9II9r/R3lm4BxvS1sel5f3FI9YPI/0eai/s/tBRhdU4YunJJ760YL/lPXDavGM9AAVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPnr6enQ/wBOod/KeRcPoppO3ic61rP4eZ9Cnzz9N0qn+sKapKLl9RorxW/aq7X0Ob8dV66ZTqRUcslKy1Ste3ty/AplPfVLXrdr3ZC/Ll5u34htJr85WX4GTZJbrb2Zmc2l15JX09uZW5qN8zSturk6DvUU532vCNtX53YE4y/V+K9ue6t/XUO9nyVrexCvKEarkvDf7Sbs0+pKOtkrZuTjy/P3INXF4WNWm9nF6aK6+GxpS4RKLWeL6q+lvfY52D5v7W2zv6O/P+tTN0k1Gz6NR392XI0MNhFRim8q130vH+KNq0af3IKSSuqdry829LfiTlPRPLJSWl86k/ja5VSw/fJzqQXdxV8qi2kubf8AMZIgeLoZkrpy/Zuko9WTdSMlmi4p7q3iXsbixNBUVSlhKLoW+xkTuuubkcTOCheWHU1Sk7rXR/z80QbKrKCcs9rq7k9Pe3P1ZBp4hyjmtOyvnlrr5kaKqNtUYzzJZmqcG5W5vbqamKjUpX72lUp+eVtrra+z8yo3MC1J1slk1Vdm43drLb+Zx/GGo4zC3cFK043Wl3eGtnsX8IqWw9WL8MXUuvFlSeVXzW+GlzT7Q1ZxxOC3UX3isrJKyi7beWwF+HqLRxSzJp2zfysmbmGrKo5J5k4yaUpydovrm3j6O5xWHrxlKKU9+ktF7G/io06LpYzDWjTkslVNfYa0zejT6AhyNN5L5bRcnqlUs79X19lZ35m1QlBpSvZLTM0nkvybb0T6K/tsaFKWa6UXdJNRsnlXk+hdCq7qUZOVrWk3mdvYiuUxmGg6ffNRdCaWVtNK/Rp/gzUnNw1vZpXvJRjb2WvtsRjWnGnFqbir3jaTVn+D/Eh3ml86SWvildpdJW2XR7oCMmlJtKFtpKSbd/NWbXlqYVRy+3KUnqkptv3XJFVZTleEZZVzk73t0539S/C0OGRp5cRQqV5v7zqSVvJJbgZUpOUmssVJbqVm/XyX9XJ05rJZZLJaKM/CnfquXua1fDwpTvgm5Um83dzd/bTmZhVlLxRfilo5ZmpW89CSN+klOfjks37T8LXTd6+pGtDuWm3lm1dq/wArvRMrpTlFq2Z23s5JW62a387CdapUm5ZqtSTd87S16666FEJT1bWVS0zXV5P1S19jE27SlazyrWSurdWra+i1Iyk76vR7Z9vnrf8AEjOVna0k3qk4rfqBhTi6iiszb5Jae13uWqbjdpKNRPXaFn5+fyI1KLjhlVi3KrHWUb3vErjVThdShfmr2VumwF145sto2vdN3XvmSt7Fjg6lO6s3fV2Wnw/E1s6vdtu7srVLp+Sa2JKvKE8ymrtatxtmXm0BGpHLKUdUnrZ8/YqnfNdprpdfl/AlN3eloro9r/n7lcm0tPtbf10ArnLK9bXe+v5dCOeL2kvS+pOlCjmk6sXVla+Rysn625CpDDzXgpKhLl3cnr8SjEWkrx2tfRaexJLNunKz9ihNptSs/Ncy+D0v87AXSjFJz8VuSsVOysvlYOTtZ7brUg3vf5gT56JacyE9Fe2txf3dvUspc1KO+gEPMyyD/Vzyy16NdCT03uESg0m1JLXdvkU13CMJtpyS/Zk7/LcsafW/mQlnWsJJT5ObypPTW65Aeyfo7zzYbj6cMklWot7a+B/wPYDxz9HaTdPj8XBqKeHal1up/wAD2M2jjG3QAFQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD51+nN0/9P6zq5owWCoJtO1/FV2/A+ij51+mh1P9YWLdHKpLC0NZOyX2tXfQ5vx1XrpGy2y8t7W8rMlZ2dr2/wALtf0/MhmSteST2vbf8rmbPrbz5/HYybL6eGjKOfDyTqx/7us7xb/dfJ+uhh18RXUsPiZSpwf200lk9l+RiDyu92ml5l1bNXgmlerBWa5yXp5AVrH1MJHuKLdWmubgnn/l6mJYXNF1JRhhVJX7tLNf2b8PxJ4e8EpyTVSX2VNPTzIzbcnf7V9Vo389SCKVloopK33X8ycpOz1kkt07te62fyKpK7ulCS9P6uYWiTUXZbclH0/kUW5bxsrpS0dkkn6PoXUcfOnTjGlUcLcoyaT6/wBM14uN20la127XuvPyIY7Cw/vY3canNXjZrkwLngsS5PEpfq3q7RikvJ67kcXxaq6MoTrSqUkrODfhj7LRP0NOviIqi45v1e9uRTh8LCtTjVq3VKGrctUnyVupMDluEcSqcOnPuLKNRRbvG6lpfn6nZMH2mcv76jBrT7Omx0+jTVem6uaUZTk7NR5bW9japw7uzWZZdnvp+ZURrU6GB4lxSXgpYfHYmeIji+9lGUc8VeOb7KlGSdk9LNOz5bOFwOCxnEsHicZSw8uH4V94oKnGTrSt4E57OKeraS2sYVRXTi0pJW3t7E3UvpmfUGHOVsV2eTafCqEru/8Acwjd/A6vxnimD/0kwVGjhIUsFLDVs9KEsqlUUk1LRfst/ExiITako2d9bJr+v5HX+M0XQ4pwqrioRcZqrBQv+6rMo5tYSnOpbgjlUitXhqto5POM/s29S6nmvlqQtUvrdrwvn5fD1NXC499z3VP9XSWrp0/RatW1uWqupZb2kpLeVO6l5J6EmFy2lPLa/hk9L31+Nr+5KDc21mu97ZtfW+vzNenJ6JqaXK3ha91dP3LIzUpScskla8m3qn1vv8VYg2cNjKeElNRpQnVve8450vRPmamM7yrLvcPSjThKV8sbqObol8S3HYWVSKxNNuzilN20XqivBY2tg4VI0as4Nu0rNLX8gN7DY6FOkoVMNh5Res3UTc37vZehTaCnPJH9W3pdP52NTupVaicJTzSdmnq7+RsSj3NqcftR0bW9+aT5AZk7KC8LXJOL92nu0jDs3JtJ9brMvj08ytNXaipcnprf4fgySk730b6xeX8OfsTAzUhUlFypUasldZp5Wor1ZZQhgqUe8xWKz1XyoWko+7dr+hGjiKlB5qM5x0+6rJvo0iVTD0cZGVSMI0q/Pu5WjN+Wu/sUV0px+uyjUlU+rtf3ijdyX+F/mMVQwzfeYHGWlzo1o5G/TlchGrKrQWFnKboXtGnd6P8AiXRhRwd3CCq1ucvtKL8r6Jga8JVLJ1Izhdfbl4U/4pepJtPaaTT0s7L2JVa1StK9Wbm97OT1/IhqnZtr4KwGHfXSS57WuYc405RlJX10T/gYas9muhJU41qbg3Zt3RRjEVa2NtDLBtfZUIKL9P5FdN18PK004TezaalbrbkQnF0ZpNy101dmjFo1Hq5OX7Sd2BZVm60s0rOfNpb+pFJrkvWxZKk6KScZRk+W9vXqyH9f10Ajuv4IlGDnbLlv5tJGN5Wvr6kk9fXyBlJRjQlmxNKU5PWN/sfHmZf69t0o06TitVFvVddSdOVouLvKD3hqV1KeSolD7Mtn+QE3iI14913EJp2SioWfxIyw6p/943L9m10vJssUnTjl0UnpJtkH56Lo3YCDjZtPTpdav+upXVS7maallS1ySs/ii5JJPLZX1eVf1/Ag5b5Wovl5Prb+AR65+j1K9XtBFrK3HDSt/wDVPZDxP9Hqa/tPjkE270KDu/KVT+J7YbV4xt0ABUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+cPpucF9IGL76TUVhqLVmr7S26H0efOv0vqpV+kLiKpygnGlSh43lX93d6+kvyOb8d066JOKkrJ7bpPQnFtRTv6F7wywzjUiqdR8k3v7XEcHPEJ1Ywik+k0lH2uZNUYOy0un1LKc0ms2aS5J2v7dCDpSpPLKcZP91/xM5XbZv3QE6s027KyfKTfzKnyvay0/kuhNRtqrpPTTR/17GHTnO8aUbz2St8tdAK6knl3u7aMopZlNuSu3qtbW+RNxqxm1UkqbTs4zTuvYnVVJwi6OITqNO6lBpL0d9QM3b5yfNJ308/Ito1Z0qmak2m91msn5vqa9OnWUnGUVJJXk4pvL5+RNu92lfzVn8ALalTDNubwuHlJfecPx1/I0cdip1IPNKOX7sILJFL0tqWVZN2ad+rfit6pI0sZmyPdPm5afL+mEcjhNMNRTmobLRXcua9uZtzslbVWK6FJRhG6SyxSva5Y1e719gqtLZt6c3sZvZ6b/AJDLrd/F8ySTu7LXyAzPxOKzb3V27HBdrlanw6UFZwxSjLp4oPl56fE5mrmirp2uraHC9rpP+wqM3NSlSxVJ3XLXX28RYSVWGdoR10S0/kblJtt6+J7vk/h+Bp0k9b2unporf1zL4SaalCDnHk1Z39+olIXzqZKqzxjael3tflf+JtQlJtJym5Wsmldr+Poyuvh5VsO6kISyppWbV789L3K1WdNrvlKC2vJb+rIrksLXlQl4Uv3ouCkmnvfM3b0t6E5Q4dWnmlh61Gf7NOureyadvZmrBXsllyvZNq7fumyxNpJSk7bW00tyXIitrvKGHio4SlCm2rd5UblJ+S5J+1zWneS3lfq01b4vYNPe9udoyyv010XsYm4pNtL30fvzAjf9W9VK3SyT9uvzK4yeVRlmWuqbdl8yynJVKjTUpX0u1uzOLpTw1bLVpThKWtsn8AMPlonfW+Xl1Vn+JlSf2oNuemua1iFOcZ6aed7r3si5RtGzbb3TyrT46gTcoRviILLKXPNJ689Sl76qN+qtf26+plLndJv95Zvj+Qt/NZfyAjre275pNXZmpmhB2zZl5ojPZJ3fktfkXYenKrFKNO0lutk/iBRdatPfzVx/hautVsYcKkG13U8t+i0MxlGorrVp2d1qBbKtmjlrQpVf8a1XuiKrKK/UU6VK++RfnyDS15c9Lojlv1lb3YFco63cZdfEt/dmH7P8iahZXjGUvJRzNGFCo/2YvfxMorvJS1d4vZEl5vQtnCMo/q6tOTvZpX0KoQqylaEHU/8Adpu3qDC2G1klbzTsXwfgadrb7FCjb9m/oW2tpffknv8AwAjL7P420IJ26r0LXFvk/wAUQeGqTj4Nn03XsBVV8Ud1bq7aFerg4tOV1a19/I2FR7jWtGvOD06Fbw1SS7yPeKm9pON1/P5BHpv6Pt12g4wnHLfCUtP96X8T3I8H+gCah2q4jSclJ1MEpK21lNfxPeDWvGNugAOkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+aPpTqwxH0g8Z+sSmlGtTpwjCycrUqdou+6bzPz5bH0ufM/bypUfbjjjpuGV4pqUnKzSWVae6RxfjunXBUoZ75emmVq3wuJQyS0WvwuM1ndWT3va3xsQk05PTfyuZtVLqxUnGV0+d1+RbBqSTTV+Vru5OpLNSyyyNw26/HmVNycUo5Vb2AsailKXgiualHV+dzEGr7WvppLRiFKtlckoKEdXml+Cf5FtKjRm3OWHUYPTKnb5gXwxGI7vIvErW8TvZeTeqfq7FNOLoSnXjGEVqpOdKMovyfn5kIxjF5Y5b7Lk1/EuqTbfhSU0tZQ0btzdtLEVDEVp1YKGVQitVGEcsfgadRRkm242XNr5evmy9tNXajq763t6kHLdqd2uaf8So1Zx2vlvyd/wA/5GrOGfEUo5cniVldN/1/VzaSlNVK15OmnkTa0vz0KsJFSx9NKKik3J3stlblvuEcqotNtXSfXT+kZto+hmnG2mZy1dnbceel/mRVcrqSaWpKCVtjEnrql8ia8/myiNVXV7rRW52t/M4PtXT/APy3jFGKeTLUSS6SRztXWGu97b8vyON41TVbg/EKbipOdCd31sr6+6RYSXG4GeVRqxvaNpK3iSj/AAXU52OIoV03iMOpVXo5wl3bltq+TuuiR1nhqU8Fgq0K8oqdOPKzi7anL4SEqcWnUjNK6byeFre9rXXmJ6kNqtSp4XFVaipeHMs1PO9uepuOphk08Ph494na9aef3tp80Rq1I1aUJ+FTSytRirNcncrg7Wd20uu6fk+ZHTCWmjjbnlad/XRN+hJXV2mltqnGK9+a6Ele+aeZc9E2/bWxiteS0+0ldq6lp6dCDMVdeFPR2atb5bF1B0oNOrTpVItW8UX8U3qiim1lT8NvKNorz129SacnJpVJfDVeWu782Bt1o4WpRaoyrqq1ovDlXnm5lGFjRV4YurVcrXUoRjL8WZozcZ3mk431td/Fa/IlWyrwRnmV+TT9r/xAjiVh1HLh6TTbT7yWsr9NNEih814Ulq1fRfD8iTp1JxzU5QaWjTbv6kFGpFuWaNlyvZ+yAk738Wa9tW0n8+pGUr+emljDqxi7WWmqvpb2MpOpBzjOCaeqbbb9ALqFSjvXotr9uErSM4ijRqRjKnGtBR1vOV38CnuZxl+sdN36br+Zs0nGNO09EtdmwMRqUY005YbNU/alNuPqo2v8yiq3Np1JJva0v4bWLZ3c23a75eXoytxstb9NNf8AoBW4eSVvOxjIk038Wiy13Zavay0sRSyVJQkleL26rqBiKkmm82Zba2+BfTrySSUKMm9Lyppv4sqUfC0k3zbUbX9OhKFrWbV97a29QFOM6dSU4xjm5twVmulidXETqxyycYw/ZhFRXutjMpxcUkvWV9/YwoU53VVSy22i3HXrsUa6elk/axZF8t/68t/czKjQpvxU3Jclms/5kakakVFqPga0u3ZgZk7K7t8jFOrlmkpWfky3uakIRdenTyzXhW7+FyUlCNNR7uF1rmT1ATzVlepKUmtk2ylxdO6jfLvZu6+BKM3F3jJL33Iyk5zvdO++n8wO7fQamu3dSU4wjJ4CrHKmtEp07LT1Pfz50+hapGl9IOFhCWkqFend7vSMuX+E+izWvGNugAOnIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHyx2vqQqdruMVbyvLH4hQjGX2mqko6/C/I+pz5M4rVnLiuPd0lUxVVzTf/APsk1brr6HF+O6dU3ea+n8/4hO+7vbzIRfNaks2pm1WRla2unToVSg3UtotTOZWbMRnJ62WnkBZWbbhTXPpoSlZRUeS02v8AIqpK8p1JW0VlfqLu+oEpSu7crWt0RHdJW8Pk9PwMX06fh7mVf/efPW/syDDdk5SSi762X58zEYVsSv1KnkW8r6e3IsjkV1UhCaXJp2+ZCvGq4t0aspU4/ck/selt0BTjpOjlw+R95GKSjo3qRwNGpSr1J1oShlhdvyvrb4MhVUKdKc5xTqcnm8P8SfCoSp0as1lUnKNr/j82VHJQV43la/7qJSslZN+nkEsrdlZ83zIys297/EiqpfazO3w/MsjZJfmrX8yD0e6v62ZLKuqv+JQm7QT06+iNWslUjKm8zunDy10Np6JPRpFH2G7StbXXmEl0/gVRzwWFjJf3MMjXVptHYaT1Vksys9fL7yOE4dSVDE8QoJaUsVUSVurzL5M5ujazfvez99noWfUhtU27XV+S+0rr2JRbvmvFN/eu38GQi034NdN7fxLqWTP423B7tNZv5nLpFySWigpPy1v+ZfRq9w/Elm5ryM5KmHi54FRqwt4pOHjiv8P8CHfPGNLF13HKvDKa3/dulf8ALzArqZaFVyj/AHLd1fVxRJST0Tbt1k9C2OMxbfcSvUp2/u5Qjl+GxCdCinmz5Jb91TSkvS7AipbNt3S5SJZmle+nlpf+JBStZ3t+RmWsW9U+asrf9ALKdSSa3bT1u3L8BiqccynG1nqUqW2ifrrYupzi6WXRZeSVrgYjkm1OUIKPNJblrnGTUo0KVJJfZpxsvfcplUWkYaX3Rm6SVt/wAy/tX59UZWutlfrb+ZFaq0WvMnl9X837IDObTpr6EZNXVtW3bTcnl6P1/mWwVK77typVP2k739FyAi8PiKVPv5UpRinq9LpdWjEMPVxNJVIJeFtKbmld++5XKNSlWTq5JpvW7u5L1M1KarVV9WpqMXtBvNL4gVtypzcK0cklorq1yUb+eu1mzZfdwjao3iKnPO7wX8TXklmbtHXkkl8P4BWG77v5/j0Mr5roxfVWb8tdvYi1ztb1W5RdKOenq7fwIU4OP958dzMHbXQjOTT/AHXoBJO7u38SMtb/AJktUtivNHPkv4krvyCJXerV/jqRSlLWMHJemhNR01TvystX6LmSSW8lo+dk169fhYDsX0U95H6Q+EOcUk3VSd07ruZ66een8z6OPmLsTUhh+2vBZxqSdsbTUm2t5eBJabeLn5+p9OmteMr9AAdOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPkfiUs/E8S507TlXqSSvovE+ezPreTUYuT2SufIdWU6lWpVTvnk3LTfmcXd0Rd7OyV+ROMfD5kYRcpWbivNk3orJXXkZtUo4avON7U1HzmkXLD1aa1ozlDnkabKaUrK8HtppoWZ7NPW68/w6AQrZ4xjFUqsYWveUf4FdOKs5Svfkn/AAL41pR+zOS9GyFSpKbWebk11YFadtQpb6u3MxmvpewAlpa+nvqgnleZciN+ZiT02uTAqqQ7yV/u7tvkir+0IUJ5asbUeTj931LKkvDJb335HG4qm5N9DrCZdjpuE6cZxkpweqkndEtX1Op4SticFVcsNK0X9qG8J+3J+Zz+D4hRxay/3ddf93LZ+j5jBltt8r+5K/K/8itxyu2z6GKteFGN60u7t+0/yIuVt+u3PQ1aijns03f25mji+ORScMJTdSX7dTSPstzip18TiailWqOV+VrL4FiMpMrYUlHifEqzd6dWcHB8pNQSfzRvUr2V7p+RqU4uVr8jdpRsioug7WaX5lt7Xu1ZfulU04KOuvUlHW1rHKr6dRxkpJvNylsZrpTaqQjZN2kuj/mUrctoycb77W9AZSdRxjaLd3vpqVqydnpoOe2vxF9bf9CYGfZr01Ik0r/yIqNhgY9mWxWmr9bszTVLXvFK/KzsWLuXBp052/x2/IYVXKnlaqa5OuXdFbnfTky5rDyjZ05tdM7Chh46xpS95tlFcW+b87dCcZZXd2fW39XIylq2Sis0fICxzV1az6WfyMOTX3n+ZVtKzLE0+lvgQTT7ynKnJtpLR3vYQvTitVm6pu9jCsr75k9zM5XbskgMXV7c/LqYk9W1o/jcxdpaXSI5tb21AypWfP0tuYb9EhNWWj1TuZpzamnfXzVyhTknd6acyanTmvE2mn+y3f5E416mrzK/kkTWIqv77XpYCi9So/DSqNcnlsTjDIldNTvroTdapJ6zlbzZVUnrdv4gSnPLt72/iRz312IRanprd6JdSE24SfXmgN7g9SVLjuAqySUYYijJNWvJqab89Lbv0Pqo+Q3JKfeZndLpt533/LofXGHn3mHpz/ain8jSjK6wAHbgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa/EJ93gMTO6WWlKV35JnyPRfijJRSkvv+XRM+qe17lHsrxhwbUlhKtmt/sM+UqDTWknfKnbkl1/I4u7o2pSzbpfAnBqMUnGMvIpUtdUScrmbSFkpXSukrco6Ig5EbkQJX1Ds3zt5EbW1uGwM5ILZpPz3M6z0dkkV3d+ZJNW13Ay4pLV+xCV0tB6De6LCTKqV7FM4M28jf8AMrlB9Co42peD+zp1K5RWJi45sslqpW5nJSpX5s16lNxd0nYuBV9fxGHp90682lbVq5rzm67vLN5Nvc3e6bSuHR1CNJU7LSPyLKdO3I2o0m76Oxb9XcN1uuoyvFdGC0TenU24x6O6K4wttqWwVmm0yCa8d4zXi5Mxkae/yLKmttLkU3yJhci213Ja2snoYtfVGUnJ6X+BFZsrEoQctItX8zDTtsZt7+wEu7nB3d9PISSkllTv56iG7u3qHta9gIuEo2vsZvyD1dzD1AxclEjbqmicVoBJU86uny25hRdJq8bp9SL6FkVePmAlQclmSaT5vRfMrist0pKXmjMordEL6gTV/Izm9COtr2MXBll6tXvYl3cZfYafXkVtmY9QJqV1kko26jKou7sm+juYk77aEFoBYn00DZC4uBapWRluP3lcoUrrczKQFksrjo7MgpRt4r35EYza8yuUtS4FeLf6uraG8JXlpd+XxbZ9Ydm6zxPZ7hdeWkquFpTfvBM+TMTJOElms8rtD9rq/a6Pq3semuyXBU9/qVG//gR3Rndy4AO3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArxVGGJw1WhU+xVg4S9GrM+UOJcJxHCOKYjh+KTU6EnT2tF20zLnqtUfWZ1ztZ2O4T2mw9SOMpzoYqSSji8O1GtC2zTaafumjm0ZWJw+Zu6mn18zPdy6HpuK+gzGTrN4XtrjKVK+kKmBpzaXqmvwIx+gnG38fbbGtfu4Gmv+Y50dxd5sqLt0MOnLMkk2z0yP0D1H/eds+KN/u0IR/MjL9H6jUX63tfxuXtFF0N3mrpyjJeG9+SZl0bvRuL6SR6T/s+YJwyT7V8dcP2c0bGYfo88MhG0e0/Hor92cP4DRN3mfcO18xn6u07u9j0t/o78If2u0vH3/wDEh/lMf7OfAm9e0PH3/wDFh/lGhu827h81oSjFK6hbNbVXPRv9nDs/b/8AfuPf/Vp/5CMv0bezk7Z+N8clbbNOm7f+QamzzmWHzpNp3+JmNOUIZXF1I+m3zPSI/o4dnIpW41x1Nc1Wgv8AlMy/Rx7OSd5cZ44/WtB/8o1NnmihTk3l+F9TEqK56o9Lh+jf2ZhKUo8V4wm98s4K/wAIlsf0dezK34nxp+teP+Uamzy5UI21XzMOjCzsrJcz1dfo8dlra4/jDf8A/YX8DP8As8dk2nmxnF2+rxC/gNTZ5VSjCL0afuFGNnnkr32PVf8AZ37HWWatxSVutdP/AJSf+zz2NcVF1OKZVy79W+GUapNnlCjSW84p+qMpUHKyqxfuj1dfo8diklZ8TXpXj/lM/wCzz2J//lP+Ij/lGq7PK8tP9uNvUKFH9uPxR6p/s89if/5T/iI/5R/s9dief9p/8RH/ACjU2eWQq4WNTJGpTdT9nMripJTkr18iWyTSPUv9njsRfbiX/wBeP+Ukv0e+xSen9pr0rx/yjQ3eXRlTUPFVU49borVfBucoKvRc0ruOdNr1PWH+j72Id70+I3fP6wv8pH/Z77D2t3fEP/rr/KNDd5V/2e399TT/AMRj/s/OvS95I9Xf6PnYh7Q4gv8A48f8plfo/dh7WlRx8n1ddf5RobvJs+GjviqKfnNIzCWGbdsRSkvKSPW4/QB2FX/+LjH64j+RNfQH2FvrgsU10+sMaG7yTLScrqtTa6ZlsZaoR+1Wgn5yR63/AKhOwdtcBin/APMyM/6hewW/9nYn/ip/xGhu8jUaFrxrwfuSUIbqpH4nri+gbsElb+zMR/xdT+JJfQT2CT//AGvEP/5yr/mGhu8hVFSV1JW9URVOk55VOLklfKnd26nsS+gzsGtuGYn/AI2t/mH+ovsDmzf2TXzbX+u1r/8A3DQ3ePVKWiScYRXJsiqcVrng0vPQ9mf0H9gn/wCicR/x+I/zj/Uf2Ctb+yK//H4j/ONDd4y4U8yTlGMn925HuY6+NL3PZ/8AUZ9H97vg1Zvr9exH+cf6jPo//wDYtX/jsR/nGhu8W7tf+sj8TDhFb1aa9ZJHtS+gz6P1/wChav8Ax2I/zj/UZ9H3/sSr/wAdiP8AONTd4tGnCW1WD9JJhwjm0qRt6ntL+gz6Pn/6Fq/8diP85mP0HdgI7cFqe+Nrv/nGhu8WlCFlecU2uu5Du4yWlSLPbH9Bv0f7/wBhyv8A/wByt/nJR+hHsElpwaov/nK/+caG7xLuUlrUjf1Rh0orecfie3/6kuwf/sir/wAbW/zllD6Gew1CrGpDg8m4tNKeKqyT9U5ajU3eNcK4HjeK4qnQwWGrV1Ullk4U3KK11bltGyb9bn1LhqUcPh6VGCShTioJLZJKxXgMFhuH4WnhsDh6WHw9NWjTpxUUvY2DqIw5mcgAKgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9k="

/***/ }),

/***/ 171:
/*!**********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/git/zubao/static/order/subscription-order/questions.png ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEK0lEQVRYR8VXTWhcVRT+zmTiI8YmXShFkYLVNouqCxXBCjZjJ75zJ2oM2LgQBEUruBKNSN1YNxappaAgWBUEceG4CGnLvHOT1KSIFn+6USo0amtdqEUppnEWQzLvyJU38WXy3rwZa+ndzbzz852fe853CZf50GX2j7YBVCqVPiK6K5fLbVfV7QA2ENEGF4CqngNwjoiOhWF4TFWPl0qlC+0E1xaAIAieIaIXAWxsxyiAn1X1NWPMW1nyLQHMzs7ma7XaIQAminSeiA6r6pHu7u5fqtXqr+7/3t7ea5eWlq4jovtV9QEi2hI5DjzPe7BQKCynAUkFICJjAD6KFE8Q0UHf9w9mReS+W2t3qeouALdH8o8wczlJNxGAtdZFcjhS+JiZHZiOj4g4pzsjxXuY+dNmI2sAiMidAL6IUv6KMWZPx55jCkEQ7CGilwGc9zxvoFAo/BG3twpAuVy+oq+v7ziA24hor+/7L6U5n5qaGg3DcLOqXgmgCuAbY4xNkrfWvqqquwG8y8xPpQKw1o6r6j4AJ5j5jiRjQRDsjG5Eo74rYqr6uDHm/SQ9Efna9YSqFo0xRxsyKxmYmJhY39PT8y2A64no6aSGi5w3mukkgK9U9SwRPQxga6uyRY35NoBDzDyyBkClUnkol8tNADjDzJtSopgFMAjgZD6fHysWi9815ETkewA3ud9dXV3rh4aGFpptiMhpADfk8/mtDd2VDIjIAQDPJtUpuloufS6CTar6RnNzish7AJ5wsvV6/dbh4WGXzVVHRN4B8KSqrjR3HMBnALapasEYM9dJ509PT28Mw/CIqt4CYDEMw2tKpVKt2UYQBINE5LL4OTPf7b7HAfwA4MZ8Pj9QLBbnOwEgIr8DuDrr6s7MzGxZXl4+BeBHZv6nXCsArLWLqnpVrVbrGxkZWWwXgIj85hZTJD/HzIU03cnJyXWe510gor9831930QCstVZV74siP2CMea4V8JYARKSjEri61+v1s5HDD5j5saystSyBiHTUhLGGcnxgmzHGTdCWp2UTxsblfmYeb8eYIydR+t9k5vNZOiLyOoDnAYwz8/5VPRAEgU9EoqrzxpiBLGNRNG7JuAy4e515dYMgOBVxhc3M7Er+7y1wlCuXy7nxmjqK46CaSpA5OzJHcTTtMpdRA0SnADKXkTMcX8cA/jMRaS5fjJi0XsdOMbaUGrX9vwhJVVVvNsb8FAeYSMlExC0lt5yQRUxaNWvsZrlgErlCKim11t6rqg3icFGklIh2+L7/SRLYlrS8XC539ff371XVFyLlMwCOquqHKbT8UQA73M6PsrdvYWFh99jYWD0tU209TBxFd6VQ1USi0myciE47DphGxTN7IAmto2ye5w1G088x5zVPMwBfuqdZrVabGx0d/TNrmK0aRO0IXwqZtkpwKRw3bP4NSjI7P3mKxi0AAAAASUVORK5CYII="

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
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
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
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
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
      while (vm) {
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
        tree.push(vm);
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
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
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
  // Techinically it leverages the (macro) task queue,
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
      'prevent conflicts with Vue internals' +
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

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
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
  return res
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
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
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
    nodes = scopedSlotFn(props) || fallback;
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
      // null is a speical value for explicitly removing a binding
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
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

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
      // There's no need to maintain a stack becaues all render fns are called
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
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

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

Vue.version = '2.6.10';

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
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
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
    var diffData = diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

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

  Vue.config.errorHandler = function(err) {
    console.error(err);
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
      if (this.$scope) {
        return this.$scope[method](args)
      }
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
      vm.$emit('hook:' + hook);
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
    //TODO 暂不考虑 string,number
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
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
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

/***/ 4:
/*!***********************************************************!*\
  !*** C:/Users/Administrator/Desktop/git/zubao/pages.json ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

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
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    packName = uni.getAccountInfoSync().miniProgram.appId || '';
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

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

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
      ak: statConfig.appid,
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


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

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



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
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
      if (statConfig.getLocation) {
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

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
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



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Stat).call(this));
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function') {
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

module.exports = {"_from":"@dcloudio/uni-stat@next","_id":"@dcloudio/uni-stat@2.0.0-23220190921001","_inBundle":false,"_integrity":"sha512-xlHjc5YqMrdr4rIKE/aMXlfzLDVxbCY31e/jH+n2NtFA14KDtNIHzsgNM0h0Mq8IUfDFtMMPmmlay59RTmHonQ==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@next","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"next","saveSpec":null,"fetchSpec":"next"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-23220190921001.tgz","_shasum":"63200bbfbdcc4c696ed0be335fa14613757c4026","_spec":"@dcloudio/uni-stat@next","_where":"/Users/fxy/Documents/DCloud/HbuilderX-plugins/release/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"d26b206188ff9e5de659870e5f4e8b2d24d8f02f","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-23220190921001"};

/***/ }),

/***/ 7:
/*!****************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/git/zubao/pages.json?{"type":"style"} ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/order/subscription-order/subscription-order-confirm/subscription-order-confirm": { "navigationBarTitleText": "确认订单", "navigationStyle": "custom" }, "pages/order/subscription-order/subscription-order-confirm/lease": { "navigationBarTitleText": "出租条例", "navigationStyle": "custom" }, "pages/login/index": { "navigationBarTitleText": "uni-app", "navigationStyle": "custom" }, "pages/order/order-evaluate/order-evaluate": { "navigationBarTitleText": "评论", "navigationStyle": "custom" }, "pages/user/user-set/user-set": { "navigationBarTitleText": "uni-app", "navigationStyle": "custom" }, "pages/user/user-set/check-number": { "navigationBarTitleText": "uni-app", "navigationStyle": "custom" }, "pages/login/login": { "navigationBarTitleText": "uni-app" }, "pages/user/user-help/user-help": { "navigationBarTitleText": "uni-app", "navigationStyle": "custom" }, "pages/user/user-authentication/user-authentication": { "navigationBarTitleText": "uni-app", "navigationStyle": "custom" }, "pages/login/phone-check": { "navigationBarTitleText": "uni-app", "navigationStyle": "custom" }, "pages/user/user-help/help-content": { "navigationBarTitleText": "uni-app", "navigationStyle": "custom" } }, "globalStyle": { "navigationBarTextStyle": "black", "navigationBarTitleText": "uni-app", "navigationBarBackgroundColor": "#F8F8F8", "backgroundColor": "#F8F8F8" } };exports.default = _default;

/***/ }),

/***/ 8:
/*!***************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/git/zubao/pages.json?{"type":"stat"} ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "" };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map