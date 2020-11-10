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

<!-- by anchor -->
<a href="#popup-name" class="btn js-popup-open">open popup</a>

<div id="popup-name" class="popup js-popup">
  <div class="popup__inner">
    <button class="popup__close js-popup-close"></button>
      <!-- popup content -->
  </div>
</div>

<!-- options added to html elements -->
<a
  href="#popup-name"
  class="btn js-popup-open"
  data-toggle-btn-class="btn"
>open popup</a>

<div
  id="popup-name"
  class="popup js-popup"
  data-close-on-overlay-click="false"
  data-escape-handler="false"
>
  <div class="popup__inner">
    <button class="popup__close js-popup-close"></button>
      <!-- popup content -->
  </div>
</div>
```

```js
import Popup from 'popup-simple'

const popup = new Popup()
popup.init()
```

### Options

Standart options
```js
{
  preventScroll: true, // add body overflow hidden
  escapeHandler: true, // handle Esc button click
  closeOnOverlayClick: true, // close on overlay click
  toggleBtnClass: false, // type: String, if provided - button '--active' BEM modificator would be toggling.
}
```

### Methods

```js
popup.onOpen = () => {
  // some callback
};
popup.onCLose = () => {
  // some callback
};
popup.openTarget(target) // open specific popup
popup.closeAll() // close all popups
popup.destroy() // close all popups and remomove listeners
```
