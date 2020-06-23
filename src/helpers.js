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
    containsMod,
  }
}

export function preventScroll() {
  const getScrollbarWidth = (() => window.innerWidth - document.documentElement.clientWidth)()
  document.body.style.overflow = 'hidden'
  if (getScrollbarWidth > 0) document.body.style.marginRight = `${getScrollbarWidth}px`
}

export function allowScroll() {
  document.body.style.overflow = ''
  document.body.style.marginRight = ''
}
