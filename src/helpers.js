export const BEMblock = (block, name) => {
  const addMod = mod => {
    block.classList.add(`${name}--${mod}`)
  }
  const removeMod = mod => {
    block.classList.remove(`${name}--${mod}`)
  }
  const toggleMod = mod => {
    block.classList.toggle(`${name}--${mod}`)
  }
  const containsMod = mod => block.classList.contains(`${name}--${mod}`)

  return {
    name,
    block,
    addMod,
    toggleMod,
    removeMod,
    containsMod
  }
}

export const constants = {
  POPUP: 'popup',
  OPEN: 'js-popup-open',
  TARGET: 'js-popup',
  CLOSE: 'js-popup-close',
  IS_ACTIVE: 'active',
  NO_SCROLL: 'no-scroll',
  BTN_IN_POPUP_OPEN: 'js-btn-in-popup-open',
}