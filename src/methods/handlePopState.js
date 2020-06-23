export default function handlePopState() {
  if (this.hashStart === -1) {
    this.closeTrigger = this.openPopups[this.openPopups.length - 1]
    this.closePopup()
  }

  if (this.hashStart > 0) {
    if (!this.href && !this.btn) this.href = window.location.href.slice(this.hashStart)
    this.openPopup()
  }
}
