import { TARGET, IS_ACTIVE, OPEN, POPUP } from '../constants'
import { BEMblock, allowScroll } from '../helpers'

export default function closePopup() {
  const {
    closeTrigger,
    href,
    hashStart,
    removeUrl,
    resetElements,
    options: { toggleBtnClass, preventScroll },
  } = this

  this.popup = closeTrigger.closest(`.${TARGET}`)
  this.name = this.popup.dataset.popup || `#${this.popup.id}`
  this.btn =
    document.querySelector(`.${OPEN}[data-popup-target="${this.name}"]`) ||
    document.querySelector(`.${OPEN}[href="${this.name}"]`)

  if (href && href === this.name && hashStart > 0) removeUrl()

  BEMblock(this.popup, POPUP).removeMod(IS_ACTIVE)
  const toggleBtnClassName = this.btn.dataset.toggleBtnClass || toggleBtnClass

  if (toggleBtnClassName) BEMblock(this.btn, toggleBtnClassName).removeMod(IS_ACTIVE)

  if (preventScroll && !this.openPopups.length) allowScroll()

  resetElements()
}
