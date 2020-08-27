import { HASH } from '../constants'

export default function handlePopState() {
  const { href, btn, closePopup, openPopup } = this

  if (this.hashStart === -1 && this.popup) {
    this.closeTrigger = this.openPopups[this.openPopups.length - 1]
    closePopup()
  }

  if (this.hashStart > 0) {
    const urlToArr = window.location.href.split(HASH)
    const [name] = urlToArr[urlToArr.length - 1]

    if (this.popup && !name) {
      this.closeTrigger = this.openPopups[this.openPopups.length - 1]
      this.closePopup()
    }

    if (name) {
      if (!href && !btn) this.href = window.location.href.slice(this.hashStart)

      openPopup()
    }
  }
}
