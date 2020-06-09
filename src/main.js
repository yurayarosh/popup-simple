import { BEMblock, constants } from './helpers'

const { POPUP, OPEN, TARGET, CLOSE, IS_ACTIVE, NO_SCROLL, BTN_IN_POPUP_OPEN, HASH } = constants

const defaultOptions = {
  toggleBodyClass: true,
  escapeHandler: true,
  closeOnOverlayClick: true,
  toggleBtnClass: false,
}

export default class Popup {
  constructor(options) {
    this.options = { ...defaultOptions, ...options }

    this.open = this.handleOpen.bind(this)
    this.close = this.handleClose.bind(this)
    this.observer = new MutationObserver(this.handleMutation.bind(this))
    this.onPopstate = this.handlePopState.bind(this)

    this.btn = null
    this.popup = null
    this.closeTrigger = null

    this.observedPopups = []
  }

  get popups() {
    return [...document.querySelectorAll(`.${TARGET}`)]
  }

  get btns() {
    return [...document.querySelectorAll(`.${OPEN}`)]
  }

  get openPopups() {
    return this.popups.filter((popup) => BEMblock(popup, POPUP).containsMod(IS_ACTIVE))
  }

  get closeBtns() {
    if (!this.popup) return null
    return [...this.popup.querySelectorAll(`.${CLOSE}`)]
  }

  get hashStart() {
    return window.location.href.indexOf(HASH)
  }

  resetElements() {
    this.btn = null
    this.popup = null
    this.closeTrigger = null
    this.observedPopups = []
    this.options.shouldChangeUrl = false
  }

  pushUrl() {
    const url = `${window.location.href}${this.name}`
    window.history.pushState({}, '', url)
  }

  removeUrl() {
    const url = window.location.href.slice(0, this.hashStart)
    window.history.pushState({}, '', url)
    this.href = ''
  }

  handlePopState() {
    if (this.hashStart === -1) {
      this.closeTrigger = this.openPopups[this.openPopups.length - 1]
      this.closePopup()
    }

    if (this.hashStart > 0) {
      if (!this.href && !this.btn) this.href = window.location.href.slice(this.hashStart)
      this.openPopup()
    }
  }

  handleEscClick() {
    if (!this.openPopups.length) return
    this.closeTrigger = this.openPopups[this.openPopups.length - 1]
    this.closePopup()
  }

  handleBtnClick(e) {
    const closeBtn = e.target.closest(`.${CLOSE}`)
    if (this.options.closeOnOverlayClick) {
      const popup = e.target.classList && e.target.classList.contains(TARGET) ? e.target : null
      this.closeTrigger = closeBtn || popup
    } else {
      this.closeTrigger = closeBtn
    }

    if (!this.closeTrigger) return

    e.preventDefault()
    this.closePopup()
  }

  handleOpen(e) {
    this.btn = e.target.closest(`.${OPEN}`)
    if (!this.btn) return
    if (e.target.closest(`.${BTN_IN_POPUP_OPEN}`)) return

    this.openPopup()
    e.preventDefault()
  }

  handleClose(e) {
    if (this.options.escapeHandler && e.code === 'Escape') this.handleEscClick(e)
    if (e.type === 'click') this.handleBtnClick(e)
  }

  closePopup() {
    if (this.href && this.hashStart > 0) this.removeUrl()

    this.popup = this.closeTrigger.closest(`.${TARGET}`)
    this.name = this.popup.dataset.popup
    this.btn = document.querySelector(`.${OPEN}[data-popup-target="${this.name}"]`)

    BEMblock(this.popup, POPUP).removeMod(IS_ACTIVE)
    if (this.options.toggleBtnClass.toggle) {
      BEMblock(this.btn, this.options.toggleBtnClass.name).removeMod(IS_ACTIVE)
    }
    if (this.options.toggleBodyClass && !this.openPopups.length) {
      document.body.classList.remove(NO_SCROLL)
    }

    this.resetElements()
  }

  openPopup() {
    this.name = this.btn
      ? this.btn.dataset.popupTarget || this.href || this.btn.getAttribute('href')
      : this.href

    if (this.name.indexOf(HASH) === 0) {
      this.options.shouldChangeUrl = true
      this.href = this.name
    } else {
      this.options.shouldChangeUrl = false
      if (this.href) this.removeUrl()
    }

    this.popup = this.options.shouldChangeUrl
      ? document.getElementById(this.name.slice(1))
      : document.querySelector(`.${TARGET}[data-popup="${this.name}"]`)

    if (!this.popup) return

    if (this.name && this.options.shouldChangeUrl) this.pushUrl()

    BEMblock(this.popup, POPUP).addMod(IS_ACTIVE)
    if (this.options.toggleBtnClass.toggle) {
      BEMblock(this.btn, this.options.toggleBtnClass.name).addMod(IS_ACTIVE)
    }
    if (this.options.toggleBodyClass) document.body.classList.add(NO_SCROLL)

    if (this.onOpen) this.onOpen()

    const isObserving = !!this.observedPopups.filter((p) => p === this.popup)[0]

    if (isObserving) return
    this.observer.observe(this.popup, {
      attributes: true,
      attributeFilter: ['class'],
      attributeOldValue: true,
    })
    this.observedPopups.push(this.popup)
  }

  openTarget(target) {
    this.href = target.id ? `#${target.id}` : null
    this.btn = this.href
      ? document.querySelector(`.${OPEN}[href="${this.href}"]`)
      : document.querySelector(`.${OPEN}[data-popup-target="${target.dataset.popup}"]`)

    this.openPopup()
  }

  closeAll() {
    if (!this.openPopups.length) return

    this.openPopups.forEach((popup) => {
      BEMblock(popup, POPUP).removeMod(IS_ACTIVE)
    })
    if (this.options.toggleBtnClass.toggle && this.btns.length > 0) {
      this.btns.forEach((btn) => {
        BEMblock(btn, this.options.toggleBtnClass.name).removeMod(IS_ACTIVE)
      })
    }

    if (this.hashStart > 0) this.removeUrl()
    this.resetElements()

    if (this.options.toggleBodyClass) document.body.classList.remove(NO_SCROLL)
  }

  handleMutation(mutationsList) {
    mutationsList.forEach((mutation) => {
      if (mutation.oldValue.indexOf(`${POPUP}--${IS_ACTIVE}`) > 0) {
        if (this.onClose) this.onClose()
      }
    })
  }

  _addListeners() {
    document.addEventListener('click', this.open)
    document.addEventListener('click', this.close)
    document.addEventListener('keydown', this.close)
    window.addEventListener('popstate', this.onPopstate)
  }

  _removeListeners() {
    document.removeEventListener('click', this.open)
    document.removeEventListener('click', this.close)
    document.removeEventListener('keydown', this.close)
    window.removeEventListener('popstate', this.onPopstate)
  }

  _removeOpenClassNames() {
    this.popups.forEach((popup) => {
      BEMblock(popup, POPUP).removeMod(IS_ACTIVE)
    })
    if (this.options.toggleBodyClass) document.body.classList.remove(NO_SCROLL)
  }

  _onLoad() {
    if (this.hashStart > 0) {
      this.href = window.location.href.slice(this.hashStart)
      this.openPopup()
    }
  }

  init() {
    this._addListeners()
    this._onLoad()
  }

  destroy() {
    this._removeListeners()
    this._removeOpenClassNames()
    this.observer.disconnect()
  }
}
