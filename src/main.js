import closeAll from './methods/closeAll'
import resetElements from './methods/resetElements'
import pushUrl from './methods/pushUrl'
import removeUrl from './methods/removeUrl'
import handlePopState from './methods/handlePopState'
import handleEscClick from './methods/handleEscClick'
import handleBtnClick from './methods/handleBtnClick'
import handleOpen from './methods/handleOpen'
import handleClose from './methods/handleClose'
import openPopup from './methods/openPopup'
import closePopup from './methods/closePopup'
import openTarget from './methods/openTarget'
import closeTarget from './methods/closeTarget'
import handleMutation from './methods/handleMutation'

import defaultOptions from './defaultOptions'

import { BEMblock } from './helpers'
import { TARGET, OPEN, POPUP, IS_ACTIVE, HASH } from './constants'

export default class Popup {
  constructor(options) {
    this.options = { ...defaultOptions, ...options }

    this.closeAll = closeAll.bind(this)
    this.resetElements = resetElements.bind(this)
    this.pushUrl = pushUrl.bind(this)
    this.removeUrl = removeUrl.bind(this)
    this.handlePopState = handlePopState.bind(this)
    this.handleEscClick = handleEscClick.bind(this)
    this.handleBtnClick = handleBtnClick.bind(this)
    this.handleOpen = handleOpen.bind(this)
    this.handleClose = handleClose.bind(this)
    this.openPopup = openPopup.bind(this)
    this.closePopup = closePopup.bind(this)
    this.openTarget = openTarget.bind(this)
    this.closeTarget = closeTarget.bind(this)
    this.handleMutation = handleMutation.bind(this)

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
    this.openHandler = this.handleOpen.bind(this)
    this.closeHandler = this.handleClose.bind(this)
    this.popstateHandler = this.handlePopState.bind(this)
    if (this.onClose) this.observer = new MutationObserver(this.handleMutation.bind(this))

    document.addEventListener('click', this.openHandler)
    document.addEventListener('click', this.closeHandler)
    if (this.options.escapeHandler) document.addEventListener('keydown', this.closeHandler)
    if (this.shouldAddPopstate) window.addEventListener('popstate', this.popstateHandler)
  }

  _removeListeners() {
    document.removeEventListener('click', this.openHandler)
    document.removeEventListener('click', this.closeHandler)
    if (this.options.escapeHandler) document.removeEventListener('keydown', this.closeHandler)
    if (this.shouldAddPopstate) window.removeEventListener('popstate', this.popstateHandler)
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
    this.closeAll()
    this._removeListeners()
    if (this.observer) this.observer.disconnect()
  }
}
