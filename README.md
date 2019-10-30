# popup-js

### Install

```html
npm i popup-simple
```

```html
<button class="btn js-popup-open" data-popup-target="popup-name">open popup</button>

<div class="popup js-popup" data-popup="popup-name">
  <div class="popup__inner">
    <button class="popup__close js-popup-close"></button>

      <!-- popup content -->
    
  </div>
</div>
```

```js
import Popup from './main'

const popup = new Popup()
popup.init()
```

### Options

Standart options
```js
{
  toggleBodyClass: true, // toggle body overflow hidden class
  escapeHandler: true, // handle Esc button click
  closeOnOverlayClick: true, // close on overlay click
}
```

### Events

```js
popup.onOpen = () => {
  // some callback
};
popup.onCLose = () => {
  // some callback
};
```
