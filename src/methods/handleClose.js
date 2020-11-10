export default function handleClose(e) {
  const { code, type } = e
  const { handleEscClick, handleBtnClick } = this

  if (code === 'Escape') handleEscClick(e)
  if (type === 'click') handleBtnClick(e)
}
