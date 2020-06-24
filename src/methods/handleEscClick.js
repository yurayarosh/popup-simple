export default function handleEscClick() {
  if (!this.openPopups.length) return
  const { closePopup } = this
  
  this.closeTrigger = this.openPopups[this.openPopups.length - 1]
  closePopup()
}
