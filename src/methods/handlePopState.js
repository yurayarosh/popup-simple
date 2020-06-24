export default function handlePopState() {
  const { href, btn, closePopup, openPopup } = this

  if (this.hashStart === -1) {
    this.closeTrigger = this.openPopups[this.openPopups.length - 1]
    closePopup()
  }

  if (this.hashStart > 0) {
    if (!href && !btn) this.href = window.location.href.slice(this.hashStart)
    openPopup()
  }
}
