'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var POPUP = 'popup';
var OPEN = 'js-popup-open';
var TARGET = 'js-popup';
var CLOSE = 'js-popup-close';
var IS_ACTIVE = 'active';
var BTN_IN_POPUP_OPEN = 'js-btn-in-popup-open';
var HASH = '#';

var BEMblock = function BEMblock(block, name) {
  var addMod = function addMod(mod) {
    block.classList.add("".concat(name, "--").concat(mod));
  };

  var removeMod = function removeMod(mod) {
    block.classList.remove("".concat(name, "--").concat(mod));
  };

  var toggleMod = function toggleMod(mod) {
    block.classList.toggle("".concat(name, "--").concat(mod));
  };

  var containsMod = function containsMod(mod) {
    return block.classList.contains("".concat(name, "--").concat(mod));
  };

  return {
    name: name,
    block: block,
    addMod: addMod,
    toggleMod: toggleMod,
    removeMod: removeMod,
    containsMod: containsMod
  };
};
function preventScroll() {
  var getScrollbarWidth = function () {
    return window.innerWidth - document.documentElement.clientWidth;
  }();

  document.body.style.overflow = 'hidden';
  if (getScrollbarWidth > 0) document.body.style.marginRight = "".concat(getScrollbarWidth, "px");
}
function allowScroll() {
  document.body.style.overflow = '';
  document.body.style.marginRight = '';
}

function closeAll() {
  if (!this.openPopups.length) return;
  var resetElements = this.resetElements,
      removeUrl = this.removeUrl,
      _this$options = this.options,
      toggleBtnClass = _this$options.toggleBtnClass,
      preventScroll = _this$options.preventScroll;
  this.openPopups.forEach(function (popup) {
    BEMblock(popup, POPUP).removeMod(IS_ACTIVE);
  });

  if (this.btns.length > 0) {
    this.btns.forEach(function (btn) {
      var toggleBtnClassName = btn.dataset.toggleBtnClass || toggleBtnClass;
      if (toggleBtnClassName) BEMblock(btn, toggleBtnClassName).removeMod(IS_ACTIVE);
    });
  }

  if (this.hashStart > 0) removeUrl();
  resetElements();
  if (preventScroll) allowScroll();
}

function resetElements() {
  this.btn = null;
  this.popup = null;
  this.closeTrigger = null;
  this.href = '';
}

function pushUrl() {
  var url = "".concat(window.location.href).concat(this.name);
  window.history.pushState({}, '', url);
}

function removeUrl() {
  var url = window.location.href.slice(0, this.hashStart);
  window.history.pushState({}, '', url);
  this.href = '';
}

function handlePopState() {
  var href = this.href,
      btn = this.btn,
      closePopup = this.closePopup,
      openPopup = this.openPopup;

  if (this.hashStart === -1 && this.popup) {
    this.closeTrigger = this.openPopups[this.openPopups.length - 1];
    closePopup();
  }

  if (this.hashStart > 0) {
    var urlToArr = window.location.href.split(HASH);

    var _urlToArr = _slicedToArray(urlToArr[urlToArr.length - 1], 1),
        name = _urlToArr[0];

    if (this.popup && !name) {
      this.closeTrigger = this.openPopups[this.openPopups.length - 1];
      this.closePopup();
    }

    if (name) {
      if (!href && !btn) this.href = window.location.href.slice(this.hashStart);
      openPopup();
    }
  }
}

function handleEscClick() {
  if (!this.openPopups.length) return;
  var closePopup = this.closePopup,
      escapeHandler = this.options.escapeHandler;
  var closeTrigger = this.openPopups[this.openPopups.length - 1];
  var shouldHandleEscapeClick = closeTrigger.dataset.escapeHandler ? JSON.parse(closeTrigger.dataset.escapeHandler) : escapeHandler;

  if (shouldHandleEscapeClick) {
    this.closeTrigger = closeTrigger;
    closePopup();
  }
}

function handleBtnClick(e) {
  var target = e.target;
  var closePopup = this.closePopup,
      closeOnOverlayClick = this.options.closeOnOverlayClick,
      targetPopup = this.popup;
  var closeBtn = target.closest(".".concat(CLOSE));
  if (closeBtn && closeBtn.classList.contains(OPEN)) return;
  var shouldCloseOnOverlayClick = targetPopup && targetPopup.dataset.closeOnOverlayClick ? JSON.parse(targetPopup.dataset.closeOnOverlayClick) : closeOnOverlayClick;

  if (shouldCloseOnOverlayClick) {
    var popup = target.classList && target.classList.contains(TARGET) ? target : null;
    this.closeTrigger = closeBtn || popup;
  } else {
    this.closeTrigger = closeBtn;
  }

  if (!this.closeTrigger) return;
  e.preventDefault();
  closePopup();
}

function handleOpen(e) {
  var target = e.target;
  var openPopup = this.openPopup;
  this.btn = target.closest(".".concat(OPEN));
  if (!this.btn) return;
  if (target.closest(".".concat(BTN_IN_POPUP_OPEN))) return;
  openPopup();
  e.preventDefault();
}

function handleClose(e) {
  var code = e.code,
      type = e.type;
  var handleEscClick = this.handleEscClick,
      handleBtnClick = this.handleBtnClick;
  if (code === 'Escape') handleEscClick(e);
  if (type === 'click') handleBtnClick(e);
}

function openPopup() {
  var _this = this;

  var btn = this.btn,
      href = this.href,
      observer = this.observer,
      observedPopups = this.observedPopups,
      removeUrl = this.removeUrl,
      pushUrl = this.pushUrl,
      onOpen = this.onOpen,
      onClose = this.onClose,
      _this$options = this.options,
      toggleBtnClass = _this$options.toggleBtnClass,
      shouldPreventScroll = _this$options.preventScroll;
  var shouldChangeUrl;

  var openHandler = function openHandler() {
    _this.name = btn ? btn.dataset.popupTarget || btn.getAttribute('href') || href : href;

    if (window.location.href.indexOf(HASH) > -1) {
      shouldChangeUrl = false;
    } else if (_this.name.indexOf(HASH) === 0) {
      shouldChangeUrl = true;
      _this.href = _this.name;
    } else {
      shouldChangeUrl = false;
      if (href) removeUrl();
    }

    _this.popup = _this.name.indexOf(HASH) === 0 ? document.getElementById(_this.name.slice(1)) : document.querySelector(".".concat(TARGET, "[data-popup=\"").concat(_this.name, "\"]"));
    if (!_this.popup) return;
    if (_this.name && shouldChangeUrl) pushUrl();
    BEMblock(_this.popup, POPUP).addMod(IS_ACTIVE);
    var toggleBtnClassName = btn.dataset.toggleBtnClass || toggleBtnClass;

    if (toggleBtnClassName) {
      BEMblock(btn, toggleBtnClassName).addMod(IS_ACTIVE);
    }

    if (shouldPreventScroll) preventScroll();

    if (onClose) {
      var isObserving = !!observedPopups.filter(function (p) {
        return p === _this.popup;
      })[0];

      if (!isObserving) {
        observer.observe(_this.popup, {
          attributes: true,
          attributeFilter: ['class'],
          attributeOldValue: true
        });
        observedPopups.push(_this.popup);
      }
    }

    if (onOpen) onOpen();
  };

  if (btn && btn.classList.contains(CLOSE)) {
    this.closeTrigger = btn;
    this.closePopup();
    setTimeout(openHandler);
  } else {
    openHandler();
  }
}

function closePopup() {
  var closeTrigger = this.closeTrigger,
      href = this.href,
      hashStart = this.hashStart,
      removeUrl = this.removeUrl,
      resetElements = this.resetElements,
      _this$options = this.options,
      toggleBtnClass = _this$options.toggleBtnClass,
      preventScroll = _this$options.preventScroll;
  this.popup = closeTrigger.closest(".".concat(TARGET));
  this.name = this.popup.dataset.popup || "#".concat(this.popup.id);
  this.btn = document.querySelector(".".concat(OPEN, "[data-popup-target=\"").concat(this.name, "\"]")) || document.querySelector(".".concat(OPEN, "[href=\"").concat(this.name, "\"]"));
  if (href && href === this.name && hashStart > 0) removeUrl();
  BEMblock(this.popup, POPUP).removeMod(IS_ACTIVE);
  var toggleBtnClassName = this.btn.dataset.toggleBtnClass || toggleBtnClass;
  if (toggleBtnClassName) BEMblock(this.btn, toggleBtnClassName).removeMod(IS_ACTIVE);
  if (preventScroll && !this.openPopups.length) allowScroll();
  resetElements();
}

function openTarget(_ref) {
  var id = _ref.id,
      name = _ref.dataset.popup;
  var openPopup = this.openPopup;
  this.href = id ? "#".concat(id) : null;
  this.btn = this.href ? document.querySelector(".".concat(OPEN, "[href=\"").concat(this.href, "\"]")) : document.querySelector(".".concat(OPEN, "[data-popup-target=\"").concat(name, "\"]"));
  openPopup();
}

function closeTarget(target) {
  this.closeTrigger = target;
  this.closePopup();
}

function handleMutation(mutationsList) {
  var onClose = this.onClose;
  if (!onClose) return;
  mutationsList.forEach(function (_ref) {
    var oldValue = _ref.oldValue;
    if (oldValue.indexOf("".concat(POPUP, "--").concat(IS_ACTIVE)) > 0) onClose();
  });
}

var defaultOptions = {
  preventScroll: true,
  escapeHandler: true,
  closeOnOverlayClick: true,
  toggleBtnClass: false
};

var Popup = /*#__PURE__*/function () {
  function Popup(options) {
    _classCallCheck(this, Popup);

    this.options = _objectSpread2(_objectSpread2({}, defaultOptions), options);
    this.closeAll = closeAll.bind(this);
    this.resetElements = resetElements.bind(this);
    this.pushUrl = pushUrl.bind(this);
    this.removeUrl = removeUrl.bind(this);
    this.handlePopState = handlePopState.bind(this);
    this.handleEscClick = handleEscClick.bind(this);
    this.handleBtnClick = handleBtnClick.bind(this);
    this.handleOpen = handleOpen.bind(this);
    this.handleClose = handleClose.bind(this);
    this.openPopup = openPopup.bind(this);
    this.closePopup = closePopup.bind(this);
    this.openTarget = openTarget.bind(this);
    this.closeTarget = closeTarget.bind(this);
    this.handleMutation = handleMutation.bind(this);
    this.btn = null;
    this.popup = null;
    this.closeTrigger = null;
    this.observedPopups = [];
  }

  _createClass(Popup, [{
    key: "_addListeners",
    value: function _addListeners() {
      this.openHandler = this.handleOpen.bind(this);
      this.closeHandler = this.handleClose.bind(this);
      this.popstateHandler = this.handlePopState.bind(this);
      if (this.onClose) this.observer = new MutationObserver(this.handleMutation.bind(this));
      document.addEventListener('click', this.openHandler);
      document.addEventListener('click', this.closeHandler);
      if (this.shouldAddEscapeHandler) document.addEventListener('keydown', this.closeHandler);
      if (this.shouldAddPopstate) window.addEventListener('popstate', this.popstateHandler);
    }
  }, {
    key: "_removeListeners",
    value: function _removeListeners() {
      document.removeEventListener('click', this.openHandler);
      document.removeEventListener('click', this.closeHandler);
      if (this.shouldAddEscapeHandler) document.removeEventListener('keydown', this.closeHandler);
      if (this.shouldAddPopstate) window.removeEventListener('popstate', this.popstateHandler);
    }
  }, {
    key: "_onLoad",
    value: function _onLoad() {
      if (this.hashStart > 0) {
        this.href = window.location.href.slice(this.hashStart);
        this.openPopup();
      }
    }
  }, {
    key: "init",
    value: function init() {
      this._addListeners();

      this._onLoad();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.closeAll();

      this._removeListeners();

      if (this.observer) this.observer.disconnect();
    }
  }, {
    key: "popups",
    get: function get() {
      return _toConsumableArray(document.querySelectorAll(".".concat(TARGET)));
    }
  }, {
    key: "btns",
    get: function get() {
      return _toConsumableArray(document.querySelectorAll(".".concat(OPEN)));
    }
  }, {
    key: "openPopups",
    get: function get() {
      return this.popups.filter(function (popup) {
        return BEMblock(popup, POPUP).containsMod(IS_ACTIVE);
      });
    }
  }, {
    key: "hashStart",
    get: function get() {
      return window.location.href.indexOf(HASH);
    }
  }, {
    key: "shouldAddPopstate",
    get: function get() {
      return this.btns.filter(function (btn) {
        return btn.getAttribute('href') && btn.getAttribute('href').length > 2;
      }).length > 0;
    }
  }, {
    key: "shouldAddEscapeHandler",
    get: function get() {
      return this.options.escapeHandler || this.popups.filter(function (_ref) {
        var dataset = _ref.dataset;
        return dataset.escapeHandler === 'true';
      }).length > 0;
    }
  }]);

  return Popup;
}();

var popup = new Popup({// targets: {
  //   'popup-name': {
  //     escapeHandler: false
  //   }
  // }
});

popup.onOpen = function () {
  console.log('onOpen', popup);
};

popup.onClose = function () {
  console.log('onClose', popup);
};

popup.init(); // class MyPopup extends Popup {
//   constructor(props) {
//     super(props)
//   }
//   onOpen() {
//     console.log(this, 'open');
//   }
//   onClose() {
//     console.log(this, 'close');
//   }
// }
// const popup = new MyPopup()
// popup.init()
// console.log(popup);
// const target = document.querySelector('.js-popup[data-popup="popup-2"]')
// const target = document.getElementById('popup-name')
// setTimeout(() => {
//   popup.openTarget(target)
//   console.log('open target')
// }, 1000)
// setTimeout(() => {
//   // popup.closeTarget(target)
//   // console.log('close target')
//   // popup.closeAll()
//   popup.destroy()
// }, 5000)
// document.addEventListener('keyup', ({ code }) => {
//   if (code === 'Space') popup.closeAll()
// })
