import { OPEN, BTN_IN_POPUP_OPEN } from "../constants"

export default function handleOpen(e) {
  const { target } = e
  const { openPopup } = this  
  this.btn = target.closest(`.${OPEN}`)
  
  if (!this.btn) return
  if (target.closest(`.${BTN_IN_POPUP_OPEN}`)) return

  openPopup()
  e.preventDefault()
}
