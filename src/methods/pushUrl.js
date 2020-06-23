export default function pushUrl() {
  const url = `${window.location.href}${this.name}`
  window.history.pushState({}, '', url)
}
