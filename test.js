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
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var OPEN = 'js-popup-open';
var TARGET = 'js-popup';
var CLOSE = 'js-popup-close';
var IS_ACTIVE = 'is-active';
var NO_SCROLL = 'no-scroll';
var BTN_IN_POPUP_OPEN = 'js-btn-in-popup-open';
var defaultOptions = {
  toggleBodyClass: true,
  escapeHandler: true,
  closeOnOverlayClick: true
};

var Popup =
/*#__PURE__*/
function () {
  function Popup(options) {
    _classCallCheck(this, Popup);

    this.popups = _toConsumableArray(document.querySelectorAll(".".concat(TARGET)));
    this.options = _objectSpread2({}, defaultOptions, {}, options);
    this.open = this.openPopup.bind(this);
    this.close = this.closePopup.bind(this);
    this.btn = null;
    this.popup = null;
    this.openPopups = null;
    this.closeBtns = null;
    this.closeTrigger = null;
  }

  _createClass(Popup, [{
    key: "init",
    value: function init() {
      this._addListeners();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._removeListeners();

      this._removeOpenClassNames();
    }
  }, {
    key: "handleEscClick",
    value: function handleEscClick(e) {
      if (e && e.type === 'keydown') {
        if (e.keyCode && e.keyCode === 27) {
          this.openPopups = this.popups.filter(function (popup) {
            return popup.classList.contains(IS_ACTIVE);
          });
          if (!this.openPopups.length) return;
          this.closeTrigger = 'Escape button';
          this.openPopups.forEach(function (popup) {
            popup.classList.remove(IS_ACTIVE);
          });
          document.body.classList.remove(NO_SCROLL);

          if (this.onClose) {
            this.onClose();
          }
        }
      }
    }
  }, {
    key: "handleBtnClick",
    value: function handleBtnClick(e) {
      if (e && e.type === 'click') {
        var closeBtn = e.target.closest(".".concat(CLOSE));

        if (this.options.closeOnOverlayClick) {
          var popup = e.target.classList && e.target.classList.contains(TARGET) ? e.target : null;
          this.closeTrigger = closeBtn || popup;
        } else {
          this.closeTrigger = closeBtn;
        }

        if (!this.closeTrigger) return;
        e.preventDefault();
        this.popup = this.closeTrigger.closest(".".concat(TARGET));
        this.name = this.popup.dataset.popup;
        this.btn = document.querySelector(".".concat(OPEN, "[data-popup-target=\"").concat(this.name, "\"]"));
        this.popup.classList.remove(IS_ACTIVE);
        document.body.classList.remove(NO_SCROLL);

        if (this.onClose) {
          this.onClose();
        }
      }
    }
  }, {
    key: "openPopup",
    value: function openPopup(e) {
      this.btn = e.target.closest(".".concat(OPEN));
      if (!this.btn) return;
      if (e.target.closest(".".concat(BTN_IN_POPUP_OPEN))) return;
      e.preventDefault();
      this.name = this.btn.dataset.popupTarget;
      this.popup = document.querySelector(".".concat(TARGET, "[data-popup=\"").concat(this.name, "\"]"));
      if (!this.popup) return;
      this.closeBtns = _toConsumableArray(this.popup.querySelectorAll(".".concat(CLOSE)));

      var openedPopups = _toConsumableArray(document.querySelectorAll(".".concat(TARGET, ":not([data-popup=\"").concat(this.name, "\"])")));

      openedPopups.forEach(function (popup) {
        popup.classList.remove(IS_ACTIVE);
      });
      this.popup.classList.add(IS_ACTIVE);

      if (this.options.toggleBodyClass) {
        document.body.classList.add(NO_SCROLL);
      }

      if (this.onOpen) {
        this.onOpen();
      }
    }
  }, {
    key: "closePopup",
    value: function closePopup(e) {
      if (this.options.escapeHandler) this.handleEscClick(e);
      this.handleBtnClick(e);
    }
  }, {
    key: "_addListeners",
    value: function _addListeners() {
      document.addEventListener('click', this.open);
      document.addEventListener('click', this.close);
      document.addEventListener('keydown', this.close);
    }
  }, {
    key: "_removeListeners",
    value: function _removeListeners() {
      document.removeEventListener('click', this.open);
      document.removeEventListener('click', this.close);
      document.removeEventListener('keydown', this.close);
    }
  }, {
    key: "_removeOpenClassNames",
    value: function _removeOpenClassNames() {
      this.popups.forEach(function (popup) {
        popup.classList.remove(IS_ACTIVE);
      });
      document.body.classList.remove(NO_SCROLL);
    }
  }]);

  return Popup;
}();

var popup = new Popup();
popup.init();
console.log(popup);
