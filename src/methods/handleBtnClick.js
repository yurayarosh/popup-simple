import { CLOSE, TARGET } from '../constants'

export default function handleBtnClick(e) {
  const { target } = e
  const {
    closePopup,
    options: { closeOnOverlayClick },
  } = this
  const closeBtn = target.closest(`.${CLOSE}`)

  if (closeOnOverlayClick) {
    const popup = target.classList && target.classList.contains(TARGET) ? target : null
    this.closeTrigger = closeBtn || popup
  } else {
    this.closeTrigger = closeBtn
  }

  if (!this.closeTrigger) return

  e.preventDefault()
  closePopup()
}
