import { HASH, TARGET, IS_ACTIVE, POPUP } from '../constants'
import { BEMblock, preventScroll } from '../helpers'

export default function openPopup() {
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
  } = this
  let shouldChangeUrl

  this.name = btn ? btn.dataset.popupTarget || href || btn.getAttribute('href') : href

  if (window.location.href.indexOf(HASH) > -1) {
    shouldChangeUrl = false
  } else if (this.name.indexOf(HASH) === 0) {
    shouldChangeUrl = true
    this.href = this.name
  } else {
    shouldChangeUrl = false
    if (href) removeUrl()
  }

  this.popup =
    this.name.indexOf(HASH) === 0
      ? document.getElementById(this.name.slice(1))
      : document.querySelector(`.${TARGET}[data-popup="${this.name}"]`)

  if (!this.popup) return

  if (this.name && shouldChangeUrl) pushUrl()

  BEMblock(this.popup, POPUP).addMod(IS_ACTIVE)
  if (toggleBtnClass.toggle) {
    BEMblock(btn, toggleBtnClass.name).addMod(IS_ACTIVE)
  }
  if (shouldPreventScroll) preventScroll()

  if (onClose) {
    const isObserving = !!observedPopups.filter(p => p === this.popup)[0]
    if (!isObserving) {
      observer.observe(this.popup, {
        attributes: true,
        attributeFilter: ['class'],
        attributeOldValue: true,
      })
      observedPopups.push(this.popup)
    }
  }

  if (onOpen) onOpen()
}
