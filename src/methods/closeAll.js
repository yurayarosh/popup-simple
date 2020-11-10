import { IS_ACTIVE, POPUP } from '../constants'
import { allowScroll, BEMblock } from '../helpers'

export default function closeAll() {
  if (!this.openPopups.length) return

  const {
    resetElements,
    removeUrl,
    options: { toggleBtnClass, preventScroll },
  } = this

  this.openPopups.forEach(popup => {
    BEMblock(popup, POPUP).removeMod(IS_ACTIVE)
  })  
  
  if (this.btns.length > 0) {
    this.btns.forEach(btn => {
      const toggleBtnClassName = btn.dataset.toggleBtnClass || toggleBtnClass
      if (toggleBtnClassName) BEMblock(btn, toggleBtnClassName).removeMod(IS_ACTIVE)
    })
  }

  if (this.hashStart > 0) removeUrl()
  resetElements()

  if (preventScroll) allowScroll()
}
