import { bookAssistant } from '@/assistants/book.assistant'
import { envConfig } from '@/config/env.config'
import Vapi from '@vapi-ai/web'
import { useEffect, useRef, useState } from 'react'
import { CALL_STATUS } from '../constants'

export function useVapi() {
  const vapi = useRef(new Vapi(envConfig.vapi.token))

  const [isSpeechActive, setIsSpeechActive] = useState(false)
  const [isCallActive, setIsCallActive] = useState<CALL_STATUS>(
    CALL_STATUS.INACTIVE,
  )

  const [activeTranscript, setActiveTranscript] = useState('')

  const [audioLevel, setAudioLevel] = useState(0)

  const registerListeners = () => {
    vapi.current.on('speech-start', () => {
      console.log('Speech has started')
      setIsSpeechActive(true)
    })

    vapi.current.on('speech-end', () => {
      console.log('Speech has ended')
      setIsSpeechActive(false)
    })

    vapi.current.on('call-start', () => {
      console.log('Call has started')
      setIsCallActive(CALL_STATUS.ACTIVE)
    })

    vapi.current.on('call-end', () => {
      console.log('Call has stopped')
      setIsCallActive(CALL_STATUS.INACTIVE)
    })

    vapi.current.on('volume-level', (volume: number) => {
      console.log(`Assistant volume level: ${volume}`)
      setAudioLevel(volume)
    })

    // Function calls and transcripts will be sent via messages
    vapi.current.on('message', (message) => {
      console.log(message)
    })

    vapi.current.on('error', (e) => {
      setIsCallActive(CALL_STATUS.INACTIVE)
      console.error(e)
    })
  }

  useEffect(() => {
    registerListeners()
  }, [])

  const start = () => {
    setIsCallActive(CALL_STATUS.LOADING)
    const response = vapi.current.start(bookAssistant)

    // const response = vapi.current.start('cdf809b4-693f-4b8c-a9df-a793e5858739')
    response.then((res) => {
      console.log({ res })
    })
  }

  const stop = () => {
    setIsCallActive(CALL_STATUS.LOADING)
    vapi.current.stop()
  }

  const toggleCall = () => {
    if (isCallActive == CALL_STATUS.ACTIVE) {
      stop()
    } else {
      start()
    }
  }

  return {
    isSpeechActive,
    isCallActive,
    audioLevel,
    start,
    stop,
    toggleCall,
  }
}
