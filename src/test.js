import Popup from './main'

class MyPopup extends Popup {
  constructor(props) {
    super(props)
  }

  onOpen() {
    console.log(this, 'open');
    
  }

  onClose() {
    console.log(this, 'close');
    
  }  
}

const popup = new MyPopup()
popup.init()

console.log(popup);

const target = document.querySelector('.js-popup')

// setTimeout(() => {
//   popup.openTarget(target);
//   console.log('open target');
  
// }, 1000)