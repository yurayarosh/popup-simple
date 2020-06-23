import { CLOSE, TARGET } from "../constants"

export default function handleBtnClick(e) {
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
