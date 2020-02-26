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
var constants = {
  POPUP: 'popup',
  OPEN: 'js-popup-open',
  TARGET: 'js-popup',
  CLOSE: 'js-popup-close',
  IS_ACTIVE: 'active',
  NO_SCROLL: 'no-scroll',
  BTN_IN_POPUP_OPEN: 'js-btn-in-popup-open'
};

var POPUP = constants.POPUP,
    OPEN = constants.OPEN,
    TARGET = constants.TARGET,
    CLOSE = constants.CLOSE,
    IS_ACTIVE = constants.IS_ACTIVE,
    NO_SCROLL = constants.NO_SCROLL,
    BTN_IN_POPUP_OPEN = constants.BTN_IN_POPUP_OPEN;
var defaultOptions = {
  toggleBodyClass: true,
  escapeHandler: true,
  closeOnOverlayClick: true,
  toggleBtnClass: false
};

var Popup =
/*#__PURE__*/
function () {
  function Popup(options) {
    _classCallCheck(this, Popup);

    this.options = _objectSpread2({}, defaultOptions, {}, options);
    this.open = this.handleOpen.bind(this);
    this.close = this.handleClose.bind(this);
    this.observer = new MutationObserver(this.handleMutation.bind(this));
    this.btn = null;
    this.popup = null;
    this.closeTrigger = null;
    this.observedPopups = [];
  }

  _createClass(Popup, [{
    key: "handleEscClick",
    value: function handleEscClick(e) {
      if (e && e.type === 'keydown' && e.code === 'Escape') {
        if (!this.openPopups.length) return;
        this.closeTrigger = this.openPopups[this.openPopups.length - 1];
        this.closePopup();
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
        this.closePopup();
      }
    }
  }, {
    key: "handleOpen",
    value: function handleOpen(e) {
      this.btn = e.target.closest(".".concat(OPEN));
      if (!this.btn) return;
      if (e.target.closest(".".concat(BTN_IN_POPUP_OPEN))) return;
      e.preventDefault();
      this.openPopup();
    }
  }, {
    key: "handleClose",
    value: function handleClose(e) {
      if (this.options.escapeHandler) this.handleEscClick(e);
      this.handleBtnClick(e);
    }
  }, {
    key: "closePopup",
    value: function closePopup() {
      this.popup = this.closeTrigger.closest(".".concat(TARGET));
      this.name = this.popup.dataset.popup;
      this.btn = document.querySelector(".".concat(OPEN, "[data-popup-target=\"").concat(this.name, "\"]"));
      BEMblock(this.popup, POPUP).removeMod(IS_ACTIVE);

      if (this.options.toggleBtnClass.toggle) {
        BEMblock(this.btn, this.options.toggleBtnClass.name).removeMod(IS_ACTIVE);
      }

      if (this.options.toggleBodyClass && !this.openPopups.length) {
        document.body.classList.remove(NO_SCROLL);
      }
    }
  }, {
    key: "openPopup",
    value: function openPopup() {
      var _this = this;

      this.name = this.btn.dataset.popupTarget;
      this.popup = document.querySelector(".".concat(TARGET, "[data-popup=\"").concat(this.name, "\"]"));
      if (!this.popup) return;
      BEMblock(this.popup, POPUP).addMod(IS_ACTIVE);

      if (this.options.toggleBtnClass.toggle) {
        BEMblock(this.btn, this.options.toggleBtnClass.name).addMod(IS_ACTIVE);
      }

      if (this.options.toggleBodyClass) document.body.classList.add(NO_SCROLL);
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
  }, {
    key: "openTarget",
    value: function openTarget(target) {
      this.name = target.dataset.popup;
      this.btn = document.querySelector(".".concat(OPEN, "[data-popup-target=\"").concat(this.name, "\"]"));
      this.openPopup();
    }
  }, {
    key: "closeAll",
    value: function closeAll() {
      var _this2 = this;

      if (!this.openPopups.length) return;
      this.openPopups.forEach(function (popup) {
        BEMblock(popup, POPUP).removeMod(IS_ACTIVE);
      });

      if (this.options.toggleBtnClass.toggle && this.btns.length > 0) {
        this.btns.forEach(function (btn) {
          BEMblock(btn, _this2.options.toggleBtnClass.name).removeMod(IS_ACTIVE);
        });
      }

      if (this.options.toggleBodyClass) document.body.classList.remove(NO_SCROLL);
    }
  }, {
    key: "handleMutation",
    value: function handleMutation(mutationsList) {
      var _this3 = this;

      mutationsList.forEach(function (mutation) {
        if (mutation.oldValue.indexOf("".concat(POPUP, "--").concat(IS_ACTIVE)) > 0) {
          if (_this3.onClose) _this3.onClose();
        }
      });
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
        BEMblock(popup, POPUP).removeMod(IS_ACTIVE);
      });
      if (this.options.toggleBodyClass) document.body.classList.remove(NO_SCROLL);
    }
  }, {
    key: "init",
    value: function init() {
      this._addListeners();
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
        return BEMblock(popup, POPUP).containsMod(IS_ACTIVE);
      });
    }
  }, {
    key: "closeBtns",
    get: function get() {
      if (!this.popup) return null;
      return _toConsumableArray(this.popup.querySelectorAll(".".concat(CLOSE)));
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
// const target = document.querySelector('.js-popup')
// setTimeout(() => {
//   popup.openTarget(target);
//   console.log('open target');
// }, 1000)
