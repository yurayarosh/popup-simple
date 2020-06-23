const POPUP$1 = 'popup';
const OPEN = 'js-popup-open';
const TARGET = 'js-popup';
const CLOSE = 'js-popup-close';
const IS_ACTIVE = 'active';
const BTN_IN_POPUP_OPEN = 'js-btn-in-popup-open';
const HASH = '#';

const BEMblock$1 = (block, name) => {
  const addMod = mod => {
    block.classList.add(`${name}--${mod}`);
  };
  const removeMod = mod => {
    block.classList.remove(`${name}--${mod}`);
  };
  const toggleMod = mod => {
    block.classList.toggle(`${name}--${mod}`);
  };
  const containsMod = mod => block.classList.contains(`${name}--${mod}`);

  return {
    name,
    block,
    addMod,
    toggleMod,
    removeMod,
    containsMod,
  }
};

function preventScroll() {
  const getScrollbarWidth = (() => window.innerWidth - document.documentElement.clientWidth)();
  document.body.style.overflow = 'hidden';
  if (getScrollbarWidth > 0) document.body.style.marginRight = `${getScrollbarWidth}px`;
}

function allowScroll() {
  document.body.style.overflow = '';
  document.body.style.marginRight = '';
}

function closeAll() {
  if (!this.openPopups.length) return

  this.openPopups.forEach(popup => {
    BEMblock(popup, POPUP).removeMod(IS_ACTIVE);
  });
  if (this.options.toggleBtnClass.toggle && this.btns.length > 0) {
    this.btns.forEach(btn => {
      BEMblock(btn, this.options.toggleBtnClass.name).removeMod(IS_ACTIVE);
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
  const url = `${window.location.href}${this.name}`;
  window.history.pushState({}, '', url);
}

function removeUrl() {
  const url = window.location.href.slice(0, this.hashStart);
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
  if (!this.openPopups.length) return
  this.closeTrigger = this.openPopups[this.openPopups.length - 1];
  this.closePopup();
}

function handleBtnClick(e) {
  const closeBtn = e.target.closest(`.${CLOSE}`);
  if (this.options.closeOnOverlayClick) {
    const popup = e.target.classList && e.target.classList.contains(TARGET) ? e.target : null;
    this.closeTrigger = closeBtn || popup;
  } else {
    this.closeTrigger = closeBtn;
  }

  if (!this.closeTrigger) return

  e.preventDefault();
  this.closePopup();
}

function handleOpen(e) {
  this.btn = e.target.closest(`.${OPEN}`);
  if (!this.btn) return
  if (e.target.closest(`.${BTN_IN_POPUP_OPEN}`)) return

  this.openPopup();
  e.preventDefault();
}

function handleClose(e) {
  if (this.options.escapeHandler && e.code === 'Escape') this.handleEscClick(e);
  if (e.type === 'click') this.handleBtnClick(e);
}

function openPopup() {
  this.name = this.btn
    ? this.btn.dataset.popupTarget || this.href || this.btn.getAttribute('href')
    : this.href;

  if (window.location.href.indexOf(HASH) > -1) {
    this.options.shouldChangeUrl = false;
  } else if (this.name.indexOf(HASH) === 0) {
    this.options.shouldChangeUrl = true;
    this.href = this.name;
  } else {
    this.options.shouldChangeUrl = false;
    if (this.href) this.removeUrl();
  }

  this.popup =
    this.name.indexOf(HASH) === 0
      ? document.getElementById(this.name.slice(1))
      : document.querySelector(`.${TARGET}[data-popup="${this.name}"]`);

  if (!this.popup) return

  if (this.name && this.options.shouldChangeUrl) this.pushUrl();

  BEMblock$1(this.popup, POPUP$1).addMod(IS_ACTIVE);
  if (this.options.toggleBtnClass.toggle) {
    BEMblock$1(this.btn, this.options.toggleBtnClass.name).addMod(IS_ACTIVE);
  }
  if (this.options.preventScroll) preventScroll();

  if (this.onOpen) this.onOpen();

  const isObserving = !!this.observedPopups.filter(p => p === this.popup)[0];

  if (isObserving) return
  this.observer.observe(this.popup, {
    attributes: true,
    attributeFilter: ['class'],
    attributeOldValue: true,
  });
  this.observedPopups.push(this.popup);
}

function closePopup() {
  if (this.href && this.hashStart > 0) this.removeUrl();

  this.popup = this.closeTrigger.closest(`.${TARGET}`);
  this.name = this.popup.dataset.popup;
  this.btn = document.querySelector(`.${OPEN}[data-popup-target="${this.name}"]`);

  BEMblock$1(this.popup, POPUP$1).removeMod(IS_ACTIVE);
  if (this.options.toggleBtnClass.toggle) {
    BEMblock$1(this.btn, this.options.preventScroll.name).removeMod(IS_ACTIVE);
  }
  if (this.options.preventScroll && !this.openPopups.length) allowScroll();

  this.resetElements();
}

function openTarget(target) {
  this.href = target.id ? `#${target.id}` : null;
  this.btn = this.href
    ? document.querySelector(`.${OPEN}[href="${this.href}"]`)
    : document.querySelector(`.${OPEN}[data-popup-target="${target.dataset.popup}"]`);

  this.openPopup();
}

function closeTarget(target) {
  this.closeTrigger = target;
  this.closePopup();
}

function handleMutation(mutationsList) {
  mutationsList.forEach(({ oldValue }) => {
    if (oldValue.indexOf(`${POPUP$1}--${IS_ACTIVE}`) > 0) {
      if (this.onClose) this.onClose();
    }
  });
}

var defaultOptions = {
  preventScroll: true,
  escapeHandler: true,
  closeOnOverlayClick: true,
  toggleBtnClass: false,
};

class Popup {
  constructor(options) {
    this.options = { ...defaultOptions, ...options };

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

  get popups() {
    return [...document.querySelectorAll(`.${TARGET}`)]
  }

  get btns() {
    return [...document.querySelectorAll(`.${OPEN}`)]
  }

  get openPopups() {
    return this.popups.filter(popup => BEMblock$1(popup, POPUP$1).containsMod(IS_ACTIVE))
  }

  get closeBtns() {
    if (!this.popup) return null
    return [...this.popup.querySelectorAll(`.${CLOSE}`)]
  }

  get hashStart() {
    return window.location.href.indexOf(HASH)
  }

  _addListeners() {
    document.addEventListener('click', this.open);
    document.addEventListener('click', this.close);
    document.addEventListener('keydown', this.close);
    window.addEventListener('popstate', this.onPopstate);
  }

  _removeListeners() {
    document.removeEventListener('click', this.open);
    document.removeEventListener('click', this.close);
    document.removeEventListener('keydown', this.close);
    window.removeEventListener('popstate', this.onPopstate);
  }

  _removeOpenClassNames() {
    this.popups.forEach(popup => {
      BEMblock$1(popup, POPUP$1).removeMod(IS_ACTIVE);
    });
    if (this.options.preventScroll) preventScroll();
  }

  _onLoad() {
    if (this.hashStart > 0) {
      this.href = window.location.href.slice(this.hashStart);
      this.openPopup();
    }
  }

  init() {
    this._addListeners();
    this._onLoad();
  }

  destroy() {
    this._removeListeners();
    this._removeOpenClassNames();
    this.observer.disconnect();
  }
}

export default Popup;
