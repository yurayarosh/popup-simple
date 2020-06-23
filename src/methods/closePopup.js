import { TARGET, IS_ACTIVE, OPEN, POPUP } from '../constants'
import { BEMblock, allowScroll } from '../helpers'

export default function closePopup() {
  if (this.href && this.hashStart > 0) this.removeUrl()

  this.popup = this.closeTrigger.closest(`.${TARGET}`)
  this.name = this.popup.dataset.popup
  this.btn = document.querySelector(`.${OPEN}[data-popup-target="${this.name}"]`)

  BEMblock(this.popup, POPUP).removeMod(IS_ACTIVE)
  if (this.options.toggleBtnClass.toggle) {
    BEMblock(this.btn, this.options.preventScroll.name).removeMod(IS_ACTIVE)
  }
  if (this.options.preventScroll && !this.openPopups.length) allowScroll()

  this.resetElements()
}
