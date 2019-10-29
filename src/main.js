const OPEN = 'js-popup-open';
const TARGET = 'js-popup';
const CLOSE = 'js-popup-close';
const IS_ACTIVE = 'is-active';
const NO_SCROLL = 'no-scroll';
const BTN_IN_POPUP_OPEN = 'js-btn-in-popup-open';

const defaultOptions = {
  toggleBodyClass: true,
  escapeHandler: true,
  closeOnOverlayClick: true,
};

export default class Popup {
  constructor(options) {
    this.popups = [...document.querySelectorAll(`.${TARGET}`)];
    this.options = { ...defaultOptions, ...options };

    this.open = this.openPopup.bind(this);
    this.close = this.closePopup.bind(this);

    this.btn = null;
    this.popup = null;
    this.openPopups = null;
    this.closeBtns = null;
    this.closeTrigger = null;
  }

  init() {
    this._addListeners();
  }

  destroy() {
    this._removeListeners();
    this._removeOpenClassNames();
  }

  handleEscClick(e) {
    if (e && e.type === 'keydown') {
      if (e.keyCode && e.keyCode === 27) {
        this.openPopups = this.popups.filter((popup) => popup.classList.contains(IS_ACTIVE));

        if (!this.openPopups.length) return;
        this.closeTrigger = 'Escape button';
        this.openPopups.forEach((popup) => {
          popup.classList.remove(IS_ACTIVE);
        });
        document.body.classList.remove(NO_SCROLL);

        if (this.onClose) {
          this.onClose();
        }
      }
    }
  }

  handleBtnClick(e) {
    if (e && e.type === 'click') {
      const closeBtn = e.target.closest(`.${CLOSE}`);
      if (this.options.closeOnOverlayClick) {
        const popup = e.target.classList && e.target.classList.contains(TARGET) ? e.target : null;
        this.closeTrigger = closeBtn || popup;
      } else {
        this.closeTrigger = closeBtn;
      }

      if (!this.closeTrigger) return;

      e.preventDefault();
      this.popup = this.closeTrigger.closest(`.${TARGET}`);
      this.name = this.popup.dataset.popup;
      this.btn = document.querySelector(`.${OPEN}[data-popup-target="${this.name}"]`);

      this.popup.classList.remove(IS_ACTIVE);
      document.body.classList.remove(NO_SCROLL);

      if (this.onClose) {
        this.onClose();
      }
    }
  }

  openPopup(e) {
    this.btn = e.target.closest(`.${OPEN}`);
    if (!this.btn) return;
    if (e.target.closest(`.${BTN_IN_POPUP_OPEN}`)) return;

    e.preventDefault();
    this.name = this.btn.dataset.popupTarget;
    this.popup = document.querySelector(`.${TARGET}[data-popup="${this.name}"]`);

    if (!this.popup) return;
    this.closeBtns = [...this.popup.querySelectorAll(`.${CLOSE}`)];

    const openedPopups = [...document.querySelectorAll(`.${TARGET}:not([data-popup="${this.name}"])`)];

    openedPopups.forEach((popup) => {
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

  closePopup(e) {
    if (this.options.escapeHandler) this.handleEscClick(e);
    this.handleBtnClick(e);
  }

  _addListeners() {
    document.addEventListener('click', this.open);
    document.addEventListener('click', this.close);
    document.addEventListener('keydown', this.close);
  }

  _removeListeners() {
    document.removeEventListener('click', this.open);
    document.removeEventListener('click', this.close);
    document.removeEventListener('keydown', this.close);
  }

  _removeOpenClassNames() {
    this.popups.forEach((popup) => {
      popup.classList.remove(IS_ACTIVE);
    });
    document.body.classList.remove(NO_SCROLL);
  }
}
