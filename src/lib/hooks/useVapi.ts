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

    vapi.current.on('volume-level', (volume) => {
      console.log(`Assistant volume level: ${volume}`)
    })

    // Function calls and transcripts will be sent via messages
    vapi.current.on('message', (message) => {
      console.log(message)
    })

    vapi.current.on('error', (e) => {
      console.error(e)
    })
  }

  useEffect(() => {
    registerListeners()
  }, [])

  const start = () => {
    setIsCallActive(CALL_STATUS.LOADING)
    console.log('starter')
    vapi.current.start({
      name: 'Testing',
      model: {
        provider: 'openai',
        model: 'gpt-3.5-turbo',
        systemPrompt:
          'You are an AI Assistant who can help user with their order placement and delivery tracking.',
        temperature: 0.7,
      },
      voice: {
        provider: '11labs',
        voiceId: 'paula',
      },
    })
  }

  const stop = () => {
    setIsCallActive(CALL_STATUS.LOADING)
    vapi.current.stop()
  }

  return {
    isSpeechActive,
    isCallActive,
    start,
    stop,
  }
}
