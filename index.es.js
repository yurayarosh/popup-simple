const POPUP = 'popup';
const OPEN = 'js-popup-open';
const TARGET = 'js-popup';
const CLOSE = 'js-popup-close';
const IS_ACTIVE = 'active';
const BTN_IN_POPUP_OPEN = 'js-btn-in-popup-open';
const HASH = '#';

const BEMblock = (block, name) => {
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

  const {
    resetElements,
    removeUrl,
    options: { toggleBtnClass, preventScroll },
  } = this;

  this.openPopups.forEach(popup => {
    BEMblock(popup, POPUP).removeMod(IS_ACTIVE);
  });
  if (toggleBtnClass.toggle && this.btns.length > 0) {
    this.btns.forEach(btn => {
      BEMblock(btn, toggleBtnClass.name).removeMod(IS_ACTIVE);
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
  const url = `${window.location.href}${this.name}`;
  window.history.pushState({}, '', url);
}

function removeUrl() {
  const url = window.location.href.slice(0, this.hashStart);
  window.history.pushState({}, '', url);
  this.href = '';
}

function handlePopState() {
  const { href, btn, closePopup, openPopup } = this;

  if (this.hashStart === -1 && this.popup) {
    this.closeTrigger = this.openPopups[this.openPopups.length - 1];
    closePopup();
  }

  if (this.hashStart > 0) {
    const urlToArr = window.location.href.split(HASH);
    const [name] = urlToArr[urlToArr.length - 1];

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
  if (!this.openPopups.length) return
  const { closePopup } = this;
  
  this.closeTrigger = this.openPopups[this.openPopups.length - 1];
  closePopup();
}

function handleBtnClick(e) {
  const { target } = e;
  const {
    closePopup,
    options: { closeOnOverlayClick },
  } = this;

  const closeBtn = target.closest(`.${CLOSE}`);

  if (closeBtn && closeBtn.classList.contains(OPEN)) return

  if (closeOnOverlayClick) {
    const popup = target.classList && target.classList.contains(TARGET) ? target : null;
    this.closeTrigger = closeBtn || popup;
  } else {
    this.closeTrigger = closeBtn;
  }

  if (!this.closeTrigger) return

  e.preventDefault();
  closePopup();
}

function handleOpen(e) {
  const { target } = e;
  const { openPopup } = this;  
  this.btn = target.closest(`.${OPEN}`);
  
  if (!this.btn) return
  if (target.closest(`.${BTN_IN_POPUP_OPEN}`)) return

  openPopup();
  e.preventDefault();
}

function handleClose(e) {
  const { code, type } = e;
  const {
    handleEscClick,
    handleBtnClick,
    options: { escapeHandler },
  } = this;

  if (escapeHandler && code === 'Escape') handleEscClick(e);
  if (type === 'click') handleBtnClick(e);
}

function openPopup() {
  const {
    btn,
    href,
    observer,
    observedPopups,
    removeUrl,
    pushUrl,
    onOpen,
    onClose,
    options: { toggleBtnClass, preventScroll: shouldPreventScroll },
  } = this;
  let shouldChangeUrl;  

  const openHandler = () => {
    this.name = btn ? btn.dataset.popupTarget || btn.getAttribute('href') || href : href;

    if (window.location.href.indexOf(HASH) > -1) {
      shouldChangeUrl = false;
    } else if (this.name.indexOf(HASH) === 0) {
      shouldChangeUrl = true;
      this.href = this.name;
    } else {
      shouldChangeUrl = false;
      if (href) removeUrl();
    }

    this.popup =
      this.name.indexOf(HASH) === 0
        ? document.getElementById(this.name.slice(1))
        : document.querySelector(`.${TARGET}[data-popup="${this.name}"]`);

    if (!this.popup) return

    if (this.name && shouldChangeUrl) pushUrl();

    BEMblock(this.popup, POPUP).addMod(IS_ACTIVE);
    if (toggleBtnClass.toggle) {
      BEMblock(btn, toggleBtnClass.name).addMod(IS_ACTIVE);
    }
    if (shouldPreventScroll) preventScroll();

    if (onClose) {
      const isObserving = !!observedPopups.filter(p => p === this.popup)[0];
      if (!isObserving) {
        observer.observe(this.popup, {
          attributes: true,
          attributeFilter: ['class'],
          attributeOldValue: true,
        });
        observedPopups.push(this.popup);
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
  const {
    closeTrigger,
    href,
    hashStart,
    removeUrl,
    resetElements,
    options: { toggleBtnClass, preventScroll },
  } = this;

  this.popup = closeTrigger.closest(`.${TARGET}`);
  this.name = this.popup.dataset.popup || `#${this.popup.id}`;
  this.btn =
    document.querySelector(`.${OPEN}[data-popup-target="${this.name}"]`) ||
    document.querySelector(`.${OPEN}[href="${this.name}"]`);

  if (href && href === this.name && hashStart > 0) removeUrl();

  BEMblock(this.popup, POPUP).removeMod(IS_ACTIVE);
  if (toggleBtnClass.toggle) BEMblock(this.btn, toggleBtnClass.name).removeMod(IS_ACTIVE);

  if (preventScroll && !this.openPopups.length) allowScroll();

  resetElements();
}

function openTarget({ id, dataset: { popup: name } }) {
  const { openPopup } = this;
  this.href = id ? `#${id}` : null;
  this.btn = this.href
    ? document.querySelector(`.${OPEN}[href="${this.href}"]`)
    : document.querySelector(`.${OPEN}[data-popup-target="${name}"]`);

  openPopup();
}

function closeTarget(target) {
  this.closeTrigger = target;
  this.closePopup();
}

function handleMutation(mutationsList) {
  const { onClose } = this;
  if (!onClose) return
  
  mutationsList.forEach(({ oldValue }) => {
    if (oldValue.indexOf(`${POPUP}--${IS_ACTIVE}`) > 0) onClose();
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
    return this.popups.filter(popup => BEMblock(popup, POPUP).containsMod(IS_ACTIVE))
  }

  get hashStart() {
    return window.location.href.indexOf(HASH)
  }

  get shouldAddPopstate() {
    return (
      this.btns.filter(btn => btn.getAttribute('href') && btn.getAttribute('href').length > 2)
        .length > 0
    )
  }

  _addListeners() {
    this.openHandler = this.handleOpen.bind(this);
    this.closeHandler = this.handleClose.bind(this);
    this.popstateHandler = this.handlePopState.bind(this);
    if (this.onClose) this.observer = new MutationObserver(this.handleMutation.bind(this));

    document.addEventListener('click', this.openHandler);
    document.addEventListener('click', this.closeHandler);
    if (this.options.escapeHandler) document.addEventListener('keydown', this.closeHandler);
    if (this.shouldAddPopstate) window.addEventListener('popstate', this.popstateHandler);
  }

  _removeListeners() {
    document.removeEventListener('click', this.openHandler);
    document.removeEventListener('click', this.closeHandler);
    if (this.options.escapeHandler) document.removeEventListener('keydown', this.closeHandler);
    if (this.shouldAddPopstate) window.removeEventListener('popstate', this.popstateHandler);
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
    this.closeAll();
    this._removeListeners();
    if (this.observer) this.observer.disconnect();
  }
}

export default Popup;
