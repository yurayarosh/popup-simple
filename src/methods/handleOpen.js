import { OPEN, BTN_IN_POPUP_OPEN } from "../constants"

export default function handleOpen(e) {
  this.btn = e.target.closest(`.${OPEN}`)
  if (!this.btn) return
  if (e.target.closest(`.${BTN_IN_POPUP_OPEN}`)) return

  this.openPopup()
  e.preventDefault()
}
