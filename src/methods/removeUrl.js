export default function removeUrl() {
  const url = window.location.href.slice(0, this.hashStart)
  window.history.pushState({}, '', url)
  this.href = ''
}
