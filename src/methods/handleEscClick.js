export default function handleEscClick() {
  if (!this.openPopups.length) return
  const {
    closePopup,
    options: { escapeHandler },
  } = this

  const closeTrigger = this.openPopups[this.openPopups.length - 1]

  const shouldHandleEscapeClick = closeTrigger.dataset.escapeHandler
    ? JSON.parse(closeTrigger.dataset.escapeHandler)
    : escapeHandler

  if (shouldHandleEscapeClick) {
    this.closeTrigger = closeTrigger
    closePopup()
  }
}
