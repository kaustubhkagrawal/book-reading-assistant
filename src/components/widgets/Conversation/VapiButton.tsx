import { Button } from '@/components/ui/Button'
import { CALL_STATUS } from '@/lib/constants'
import { useVapi } from '@/lib/hooks/useVapi'
import Lottie from 'lottie-react'
import { useState } from 'react'

import ActiveIcon from '../../../lottie-icons/active_icon.json'
import InactiveIcon from '../../../lottie-icons/inactive_icon.json'
import LoadingIcon from '../../../lottie-icons/loading_icon.json'

const ICONS_DATA = {
  [CALL_STATUS.ACTIVE]: ActiveIcon,
  [CALL_STATUS.INACTIVE]: InactiveIcon,
  [CALL_STATUS.LOADING]: LoadingIcon,
}

const buttonTextConfig = {
  [CALL_STATUS.ACTIVE]: 'Stop',
  [CALL_STATUS.LOADING]: 'Loading...',
  [CALL_STATUS.INACTIVE]: 'Start',
}

export function VapiButton() {
  const { isCallActive, audioLevel, activeTranscript, toggleCall } = useVapi()
  const [buttonState, setButtonState] = useState<CALL_STATUS>(
    CALL_STATUS.INACTIVE,
  )

  const onClick = () => {
    const preState = buttonState
    const timeOut = setTimeout(() => {
      setButtonState(
        preState === CALL_STATUS.ACTIVE
          ? CALL_STATUS.INACTIVE
          : CALL_STATUS.ACTIVE,
      )
    }, 2000)

    if (CALL_STATUS.LOADING !== buttonState) {
      setButtonState(CALL_STATUS.LOADING)
    } else {
      clearTimeout(timeOut)
      setButtonState(CALL_STATUS.INACTIVE)
    }
  }
  return (
    <Button
      asChild
      className="rounded-full cursor-pointer group p-10 transition-all bg-transparent hover:bg-transparent"
      disabled={isCallActive === CALL_STATUS.LOADING}
      onClick={onClick}
    >
      <Lottie
        animationData={ICONS_DATA[buttonState]}
        style={{
          width: buttonState === CALL_STATUS.LOADING ? 150 : 250,
          height: buttonState === CALL_STATUS.LOADING ? 150 : 250,
          margin: buttonState === CALL_STATUS.LOADING ? 50 : 0,
        }}
      />
    </Button>
  )
}
