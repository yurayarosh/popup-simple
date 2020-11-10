import { HASH, TARGET, IS_ACTIVE, POPUP, CLOSE } from '../constants'
import { BEMblock, preventScroll } from '../helpers'

export default function openPopup() {
  const {
    btn,
    href,
    observer,
    observedPopups,
    removeUrl,
    pushUrl,
    onOpen,
    onClose,
    options: { toggleBtnClass, preventScroll: shouldPreventScroll },
  } = this
  let shouldChangeUrl  

  const openHandler = () => {
    this.name = btn ? btn.dataset.popupTarget || btn.getAttribute('href') || href : href

    if (window.location.href.indexOf(HASH) > -1) {
      shouldChangeUrl = false
    } else if (this.name.indexOf(HASH) === 0) {
      shouldChangeUrl = true
      this.href = this.name
    } else {
      shouldChangeUrl = false
      if (href) removeUrl()
    }

    this.popup =
      this.name.indexOf(HASH) === 0
        ? document.getElementById(this.name.slice(1))
        : document.querySelector(`.${TARGET}[data-popup="${this.name}"]`)

    if (!this.popup) return

    if (this.name && shouldChangeUrl) pushUrl()

    BEMblock(this.popup, POPUP).addMod(IS_ACTIVE)

    const toggleBtnClassName = btn.dataset.toggleBtnClass || toggleBtnClass
    if (toggleBtnClassName) {
      BEMblock(btn, toggleBtnClassName).addMod(IS_ACTIVE)
    }
    if (shouldPreventScroll) preventScroll()

    if (onClose) {
      const isObserving = !!observedPopups.filter(p => p === this.popup)[0]
      if (!isObserving) {
        observer.observe(this.popup, {
          attributes: true,
          attributeFilter: ['class'],
          attributeOldValue: true,
        })
        observedPopups.push(this.popup)
      }
    }

    if (onOpen) onOpen()
  }

  if (btn && btn.classList.contains(CLOSE)) {
    this.closeTrigger = btn
    this.closePopup()
    setTimeout(openHandler)
  } else {
    openHandler()
  }
}
