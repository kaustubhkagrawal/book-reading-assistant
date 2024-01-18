import React from 'react'
import { VapiButton } from './VapiButton'
import { useVapi } from '@/lib/hooks/useVapi'
import Vapi from '@vapi-ai/web'

interface ConversationProps {
  docId: string
}

export function Conversation({ docId, ...props }: ConversationProps) {
  const onCallStart = (vapi: Vapi) => {
    vapi.send({
      type: 'add-message',
      message: {
        role: 'system',
        content: `Document Selected with Id: ${docId} and alias Document. Ask what user needs help for. NEVER READ DOCUMENT_ID to the USER`,
      },
    })
  }
  const { isCallActive, audioLevel, activeTranscript, toggleCall } = useVapi({
    onCallStart,
  })
  return (
    <VapiButton
      {...{ isCallActive, audioLevel, activeTranscript, toggleCall }}
    />
  )
}
