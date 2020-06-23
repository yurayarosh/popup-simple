import { POPUP, IS_ACTIVE } from "../constants"

export default function handleMutation(mutationsList) {
  mutationsList.forEach(({ oldValue }) => {
    if (oldValue.indexOf(`${POPUP}--${IS_ACTIVE}`) > 0) {
      if (this.onClose) this.onClose()
    }
  })
}
