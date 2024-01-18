import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'
import { ScrollArea } from '@/components/ui/ScrollArea'
import { useVapi } from '@/lib/hooks/useVapi'
import Vapi from '@vapi-ai/web'
import { memo, useCallback } from 'react'
import { MessageList } from './MessageList'
import { VapiButton } from './VapiButton'

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
      <CardHeader className="shadow pb-4">
        <CardTitle>PDF Explorer</CardTitle>
        <CardDescription>Ask any questions about the Document.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] flex flex-1 p-4">
          <div className="flex-1 flex-col">
            <MessageList
              messages={messages}
              activeTranscript={activeTranscript}
            />
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
