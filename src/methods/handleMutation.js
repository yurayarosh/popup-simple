import { POPUP, IS_ACTIVE } from '../constants'

export default function handleMutation(mutationsList) {
  const { onClose } = this
  if (!onClose) return
  
  mutationsList.forEach(({ oldValue }) => {
    if (oldValue.indexOf(`${POPUP}--${IS_ACTIVE}`) > 0) onClose()
  })
}
