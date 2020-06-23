import { IS_ACTIVE } from '../constants'
import { allowScroll } from '../helpers'

export default function closeAll() {
  if (!this.openPopups.length) return

  this.openPopups.forEach(popup => {
    BEMblock(popup, POPUP).removeMod(IS_ACTIVE)
  })
  if (this.options.toggleBtnClass.toggle && this.btns.length > 0) {
    this.btns.forEach(btn => {
      BEMblock(btn, this.options.preventScroll.name).removeMod(IS_ACTIVE)
    })
  }

  if (this.hashStart > 0) this.removeUrl()
  this.resetElements()

  if (this.options.preventScroll) allowScroll()
}
