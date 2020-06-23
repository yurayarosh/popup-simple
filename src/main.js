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

import { BEMblock, preventScroll } from './helpers'
import { TARGET, OPEN, POPUP, IS_ACTIVE, CLOSE, HASH } from './constants'

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
    return this.popups.filter(popup => BEMblock(popup, POPUP).containsMod(IS_ACTIVE))
  }

  get closeBtns() {
    if (!this.popup) return null
    return [...this.popup.querySelectorAll(`.${CLOSE}`)]
  }

  get hashStart() {
    return window.location.href.indexOf(HASH)
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
    this.popups.forEach(popup => {
      BEMblock(popup, POPUP).removeMod(IS_ACTIVE)
    })
    if (this.options.preventScroll) preventScroll()
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
