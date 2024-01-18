import { createAssistant } from '@/apis/vapi.api'
import { bookAssistant } from '@/assistants/book.assistant'
import { envConfig } from '@/config/env.config'
import {
  Message,
  MessageTypeEnum,
  TranscriptMessage,
  TranscriptMessageTypeEnum,
} from '@/types/conversation.type'
import Vapi from '@vapi-ai/web'
import { useEffect, useReducer, useState } from 'react'
import { CALL_STATUS } from '../constants'
import { MessageActionTypeEnum, useMessages } from './useMessages'

interface useVapiProps {
  onCallStart: (vapi: Vapi) => void
}

const vapi = new Vapi(envConfig.vapi.token)

export function useVapi({ onCallStart }: useVapiProps) {
  const [isSpeechActive, setIsSpeechActive] = useState(false)
  const [isCallActive, setIsCallActive] = useState<CALL_STATUS>(
    CALL_STATUS.INACTIVE,
  )

  const [assistantId, setAssistantId] = useState('')
  const [messages, dispatch] = useReducer(useMessages, [])

  const [activeTranscript, setActiveTranscript] =
    useState<TranscriptMessage | null>(null)

  const [audioLevel, setAudioLevel] = useState(0)

  useEffect(() => {
    const onSpeechStart = () => setIsSpeechActive(true)
    const onSpeechEnd = () => {
      console.log('Speech has ended')
      setIsSpeechActive(false)
    }

    const onCallStartHandler = () => {
      console.log('Call has started')
      setIsCallActive(CALL_STATUS.ACTIVE)
      onCallStart(vapi)
    }

    const onCallEnd = () => {
      console.log('Call has stopped')
      setIsCallActive(CALL_STATUS.INACTIVE)
    }

    const onVolumeLevel = (volume: number) => {
      console.log(`Assistant volume level: ${volume}`)
      setAudioLevel(volume)
    }

    const onMessageUpdate = (message: Message) => {
      console.log('message', message)
      if (
        message.type === MessageTypeEnum.TRANSCRIPT &&
        message.transcriptType === TranscriptMessageTypeEnum.PARTIAL
      ) {
        setActiveTranscript(message)
      } else {
        setActiveTranscript(null)
        dispatch({
          type: MessageActionTypeEnum.UPDATE_LAST_MESSAGE,
          payload: message,
        })
      }
    }

    const onError = (e: any) => {
      setIsCallActive(CALL_STATUS.INACTIVE)
      console.error(e)
    }

    vapi.on('speech-start', onSpeechStart)
    vapi.on('speech-end', onSpeechEnd)
    vapi.on('call-start', onCallStartHandler)
    vapi.on('call-end', onCallEnd)
    vapi.on('volume-level', onVolumeLevel)
    vapi.on('message', onMessageUpdate)
    vapi.on('error', onError)

    return () => {
      vapi.off('speech-start', onSpeechStart)
      vapi.off('speech-end', onSpeechEnd)
      vapi.off('call-start', onCallStartHandler)
      vapi.off('call-end', onCallEnd)
      vapi.off('volume-level', onVolumeLevel)
      vapi.off('message', onMessageUpdate)
      vapi.off('error', onError)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onCallStart])

  const start = async (docId?: string) => {
    const document = docId ? await createAssistant(docId) : null

    console.log('document', document)
    setIsCallActive(CALL_STATUS.LOADING)
    const response = vapi.start(
      document ? document.assistant_id : bookAssistant,
    )

    response.then((res) => {
      console.log({ res })
      if (res?.id) {
      }
    })
  }

  const stop = () => {
    setIsCallActive(CALL_STATUS.LOADING)
    vapi.stop()
  }

  const toggleCall = (docId: string) => {
    if (isCallActive == CALL_STATUS.ACTIVE) {
      stop()
    } else {
      start(docId)
    }
  }

  return {
    isSpeechActive,
    isCallActive,
    audioLevel,
    activeTranscript,
    messages,
    start,
    stop,
    toggleCall,
  }
}
