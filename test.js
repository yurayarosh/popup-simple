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

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
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

var POPUP$1 = 'popup';
var OPEN = 'js-popup-open';
var TARGET = 'js-popup';
var CLOSE = 'js-popup-close';
var IS_ACTIVE = 'active';
var BTN_IN_POPUP_OPEN = 'js-btn-in-popup-open';
var HASH = '#';

var BEMblock$1 = function BEMblock(block, name) {
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
  var _this = this;

  if (!this.openPopups.length) return;
  this.openPopups.forEach(function (popup) {
    BEMblock(popup, POPUP).removeMod(IS_ACTIVE);
  });

  if (this.options.toggleBtnClass.toggle && this.btns.length > 0) {
    this.btns.forEach(function (btn) {
      BEMblock(btn, _this.options.preventScroll.name).removeMod(IS_ACTIVE);
    });
  }

  if (this.hashStart > 0) this.removeUrl();
  this.resetElements();
  if (this.options.preventScroll) allowScroll();
}

function resetElements() {
  this.btn = null;
  this.popup = null;
  this.closeTrigger = null;
  this.observedPopups = [];
  this.options.shouldChangeUrl = false;
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
  if (this.hashStart === -1) {
    this.closeTrigger = this.openPopups[this.openPopups.length - 1];
    this.closePopup();
  }

  if (this.hashStart > 0) {
    if (!this.href && !this.btn) this.href = window.location.href.slice(this.hashStart);
    this.openPopup();
  }
}

function handleEscClick() {
  if (!this.openPopups.length) return;
  this.closeTrigger = this.openPopups[this.openPopups.length - 1];
  this.closePopup();
}

function handleBtnClick(e) {
  var closeBtn = e.target.closest(".".concat(CLOSE));

  if (this.options.closeOnOverlayClick) {
    var popup = e.target.classList && e.target.classList.contains(TARGET) ? e.target : null;
    this.closeTrigger = closeBtn || popup;
  } else {
    this.closeTrigger = closeBtn;
  }

  if (!this.closeTrigger) return;
  e.preventDefault();
  this.closePopup();
}

function handleOpen(e) {
  this.btn = e.target.closest(".".concat(OPEN));
  if (!this.btn) return;
  if (e.target.closest(".".concat(BTN_IN_POPUP_OPEN))) return;
  this.openPopup();
  e.preventDefault();
}

function handleClose(e) {
  if (this.options.escapeHandler && e.code === 'Escape') this.handleEscClick(e);
  if (e.type === 'click') this.handleBtnClick(e);
}

function openPopup() {
  var _this = this;

  this.name = this.btn ? this.btn.dataset.popupTarget || this.href || this.btn.getAttribute('href') : this.href;

  if (window.location.href.indexOf(HASH) > -1) {
    this.options.shouldChangeUrl = false;
  } else if (this.name.indexOf(HASH) === 0) {
    this.options.shouldChangeUrl = true;
    this.href = this.name;
  } else {
    this.options.shouldChangeUrl = false;
    if (this.href) this.removeUrl();
  }

  this.popup = this.name.indexOf(HASH) === 0 ? document.getElementById(this.name.slice(1)) : document.querySelector(".".concat(TARGET, "[data-popup=\"").concat(this.name, "\"]"));
  if (!this.popup) return;
  if (this.name && this.options.shouldChangeUrl) this.pushUrl();
  BEMblock$1(this.popup, POPUP$1).addMod(IS_ACTIVE);

  if (this.options.toggleBtnClass.toggle) {
    BEMblock$1(this.btn, this.options.toggleBtnClass.name).addMod(IS_ACTIVE);
  }

  if (this.options.preventScroll) preventScroll();
  if (this.onOpen) this.onOpen();
  var isObserving = !!this.observedPopups.filter(function (p) {
    return p === _this.popup;
  })[0];
  if (isObserving) return;
  this.observer.observe(this.popup, {
    attributes: true,
    attributeFilter: ['class'],
    attributeOldValue: true
  });
  this.observedPopups.push(this.popup);
}

function closePopup() {
  if (this.href && this.hashStart > 0) this.removeUrl();
  this.popup = this.closeTrigger.closest(".".concat(TARGET));
  this.name = this.popup.dataset.popup;
  this.btn = document.querySelector(".".concat(OPEN, "[data-popup-target=\"").concat(this.name, "\"]"));
  BEMblock$1(this.popup, POPUP$1).removeMod(IS_ACTIVE);

  if (this.options.toggleBtnClass.toggle) {
    BEMblock$1(this.btn, this.options.preventScroll.name).removeMod(IS_ACTIVE);
  }

  if (this.options.preventScroll && !this.openPopups.length) allowScroll();
  this.resetElements();
}

function openTarget(target) {
  this.href = target.id ? "#".concat(target.id) : null;
  this.btn = this.href ? document.querySelector(".".concat(OPEN, "[href=\"").concat(this.href, "\"]")) : document.querySelector(".".concat(OPEN, "[data-popup-target=\"").concat(target.dataset.popup, "\"]"));
  this.openPopup();
}

function closeTarget(target) {
  this.closeTrigger = target;
  this.closePopup();
}

function handleMutation(mutationsList) {
  var _this = this;

  mutationsList.forEach(function (_ref) {
    var oldValue = _ref.oldValue;

    if (oldValue.indexOf("".concat(POPUP$1, "--").concat(IS_ACTIVE)) > 0) {
      if (_this.onClose) _this.onClose();
    }
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
    this.open = this.handleOpen.bind(this);
    this.close = this.handleClose.bind(this);
    this.observer = new MutationObserver(this.handleMutation.bind(this));
    this.onPopstate = this.handlePopState.bind(this);
    this.btn = null;
    this.popup = null;
    this.closeTrigger = null;
    this.observedPopups = [];
  }

  _createClass(Popup, [{
    key: "_addListeners",
    value: function _addListeners() {
      document.addEventListener('click', this.open);
      document.addEventListener('click', this.close);
      document.addEventListener('keydown', this.close);
      window.addEventListener('popstate', this.onPopstate);
    }
  }, {
    key: "_removeListeners",
    value: function _removeListeners() {
      document.removeEventListener('click', this.open);
      document.removeEventListener('click', this.close);
      document.removeEventListener('keydown', this.close);
      window.removeEventListener('popstate', this.onPopstate);
    }
  }, {
    key: "_removeOpenClassNames",
    value: function _removeOpenClassNames() {
      this.popups.forEach(function (popup) {
        BEMblock$1(popup, POPUP$1).removeMod(IS_ACTIVE);
      });
      if (this.options.preventScroll) preventScroll();
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
      this._removeListeners();

      this._removeOpenClassNames();

      this.observer.disconnect();
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
        return BEMblock$1(popup, POPUP$1).containsMod(IS_ACTIVE);
      });
    }
  }, {
    key: "closeBtns",
    get: function get() {
      if (!this.popup) return null;
      return _toConsumableArray(this.popup.querySelectorAll(".".concat(CLOSE)));
    }
  }, {
    key: "hashStart",
    get: function get() {
      return window.location.href.indexOf(HASH);
    }
  }]);

  return Popup;
}();

var popup = new Popup();

popup.onOpen = function () {
  console.log(popup);
};

popup.onClose = function () {
  console.log('close', popup);
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
//   popup.closeTarget(target)
//   console.log('close target')  
// }, 2000)
