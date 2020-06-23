import { OPEN } from "../constants"

export default function openTarget(target) {
  this.href = target.id ? `#${target.id}` : null
  this.btn = this.href
    ? document.querySelector(`.${OPEN}[href="${this.href}"]`)
    : document.querySelector(`.${OPEN}[data-popup-target="${target.dataset.popup}"]`)

  this.openPopup()
}
