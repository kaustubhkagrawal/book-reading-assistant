import { envConfig } from '@/config/env.config'
import Vapi from '@vapi-ai/web'
import { useEffect, useRef } from 'react'

export function useVapi() {
  const vapi = useRef(new Vapi(envConfig.vapi.token))

  const registerListeners = () => {
    vapi.current.on('speech-start', () => {
      console.log('Speech has started')
    })

    vapi.current.on('speech-end', () => {
      console.log('Speech has ended')
    })

    vapi.current.on('call-start', () => {
      console.log('Call has started')
    })

    vapi.current.on('call-end', () => {
      console.log('Call has stopped')
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
    vapi.current.start({
      name: 'Testing',
      model: {
        provider: 'openai',
        model: 'gpt-3.5-turbo',
        systemPrompt: "You're an assistant...",
      },
      voice: {
        provider: '11labs',
        voiceId: 'paula',
      },
    })
  }

  const stop = () => {
    vapi.current.stop()
  }

  return {
    start,
    stop,
  }
}
