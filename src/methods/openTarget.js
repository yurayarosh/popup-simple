import { OPEN } from '../constants'

export default function openTarget({ id, dataset: { popup: name } }) {
  const { openPopup } = this
  this.href = id ? `#${id}` : null
  this.btn = this.href
    ? document.querySelector(`.${OPEN}[href="${this.href}"]`)
    : document.querySelector(`.${OPEN}[data-popup-target="${name}"]`)

  openPopup()
}
