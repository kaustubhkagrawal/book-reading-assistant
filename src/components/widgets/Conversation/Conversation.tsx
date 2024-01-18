import React, { memo, useCallback } from 'react'
import { VapiButton } from './VapiButton'
import { useVapi } from '@/lib/hooks/useVapi'
import Vapi from '@vapi-ai/web'
import { ScrollArea } from '@/components/ui/ScrollArea'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'
import { MessageRoleEnum, MessageTypeEnum } from '@/types/conversation.type'
import ConversationMessage from './Message'

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

  const { isCallActive, messages, audioLevel, activeTranscript, toggleCall } =
    useVapi({
      onCallStart,
    })

  console.log('messages', messages)
  return (
    <Card className="border-0 rounded-none shadow-none w-full relative">
      <CardHeader>
        <CardTitle>PDF Explorer</CardTitle>
        <CardDescription>Ask any questions about the Document.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] flex flex-1 p-4">
          <div className="flex-1 flex-col">
            {messages.map((message, index) =>
              message.type === MessageTypeEnum.TRANSCRIPT ? (
                <ConversationMessage
                  message={
                    activeTranscript && activeTranscript.role === message.role
                      ? {
                          ...message,
                          transcript:
                            message.transcript + activeTranscript.transcript,
                        }
                      : message
                  }
                  key={message.type + message?.role + index}
                />
              ) : null,
            )}
            {activeTranscript &&
            activeTranscript.role !== messages[messages.length - 1]?.role ? (
              <ConversationMessage message={activeTranscript} />
            ) : null}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex justify-center absolute bottom-0 left-0 right-0 p-0">
        <VapiButton className="self-end" {...{ isCallActive, toggleCall }} />
      </CardFooter>
    </Card>
  )
})

Conversation.displayName = 'Conversation'
