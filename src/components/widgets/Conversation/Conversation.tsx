import React, { memo, useCallback } from 'react'
import { VapiButton } from './VapiButton'
import { useVapi } from '@/lib/hooks/useVapi'
import Vapi from '@vapi-ai/web'

interface ConversationProps {
  docId: string
}

export const Conversation = memo(({ docId, ...props }: ConversationProps) => {
  const onCallStart = useCallback(
    (vapi: Vapi) => {
      vapi.send({
        type: 'add-message',
        message: {
          role: 'system',
          content: `Document Selected with Id: ${docId} and alias Document. Ask what user needs help for. NEVER READ DOCUMENT_ID to the USER`,
        },
      })
    },
    [docId],
  )

  const { isCallActive, audioLevel, activeTranscript, toggleCall } = useVapi({
    onCallStart,
  })
  return (
    <VapiButton
      {...{ isCallActive, audioLevel, activeTranscript, toggleCall }}
    />
  )
})

Conversation.displayName = 'Conversation'
