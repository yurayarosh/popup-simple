import Popup from './main'

const popup = new Popup()

popup.onOpen = () => {
  console.log('onOpen', popup)
}
popup.onClose = () => {
  console.log('onClose', popup)
}

popup.init()

// class MyPopup extends Popup {
//   constructor(props) {
//     super(props)
//   }

//   onOpen() {
//     console.log(this, 'open');

//   }

//   onClose() {
//     console.log(this, 'close');

//   }
// }

// const popup = new MyPopup()
// popup.init()

// console.log(popup);

// const target = document.querySelector('.js-popup[data-popup="popup-2"]')
// const target = document.getElementById('popup-name')

// setTimeout(() => {
//   popup.openTarget(target)
//   console.log('open target')

// }, 1000)

// setTimeout(() => {
//   // popup.closeTarget(target)
//   // console.log('close target')

//   // popup.closeAll()
//   popup.destroy()
// }, 5000)

// document.addEventListener('keyup', ({ code }) => {

//   if (code === 'Space') popup.closeAll()
// })
