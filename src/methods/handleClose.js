export default function handleClose(e) {
  const { code, type } = e
  const {
    handleEscClick,
    handleBtnClick,
    options: { escapeHandler },
  } = this

  if (escapeHandler && code === 'Escape') handleEscClick(e)
  if (type === 'click') handleBtnClick(e)
}
