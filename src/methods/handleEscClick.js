export default function handleEscClick() {
  if (!this.openPopups.length) return
  this.closeTrigger = this.openPopups[this.openPopups.length - 1]
  this.closePopup()
}
