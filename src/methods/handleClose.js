export default function handleClose(e) {
  if (this.options.escapeHandler && e.code === 'Escape') this.handleEscClick(e)
  if (e.type === 'click') this.handleBtnClick(e)
}
