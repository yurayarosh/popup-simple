import { HASH, TARGET, IS_ACTIVE, POPUP } from '../constants'
import { BEMblock, preventScroll } from '../helpers'

export default function openPopup() {
  this.name = this.btn
    ? this.btn.dataset.popupTarget || this.href || this.btn.getAttribute('href')
    : this.href

  if (window.location.href.indexOf(HASH) > -1) {
    this.options.shouldChangeUrl = false
  } else if (this.name.indexOf(HASH) === 0) {
    this.options.shouldChangeUrl = true
    this.href = this.name
  } else {
    this.options.shouldChangeUrl = false
    if (this.href) this.removeUrl()
  }

  this.popup =
    this.name.indexOf(HASH) === 0
      ? document.getElementById(this.name.slice(1))
      : document.querySelector(`.${TARGET}[data-popup="${this.name}"]`)

  if (!this.popup) return

  if (this.name && this.options.shouldChangeUrl) this.pushUrl()

  BEMblock(this.popup, POPUP).addMod(IS_ACTIVE)
  if (this.options.toggleBtnClass.toggle) {
    BEMblock(this.btn, this.options.toggleBtnClass.name).addMod(IS_ACTIVE)
  }
  if (this.options.preventScroll) preventScroll()

  if (this.onOpen) this.onOpen()

  const isObserving = !!this.observedPopups.filter(p => p === this.popup)[0]

  if (isObserving) return
  this.observer.observe(this.popup, {
    attributes: true,
    attributeFilter: ['class'],
    attributeOldValue: true,
  })
  this.observedPopups.push(this.popup)
}
