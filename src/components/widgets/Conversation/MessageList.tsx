import {
  Message,
  MessageTypeEnum,
  TranscriptMessage,
} from '@/lib/types/conversation.type'
import React from 'react'
import { ConversationMessage } from './ConversationMessage'
import { CitationList } from './CitationList'

interface MessageListProps {
  messages: Message[]
  activeTranscript?: TranscriptMessage | null
}

export function MessageList({ messages, activeTranscript }: MessageListProps) {
  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null
  return (
    <>
      {messages.map((message, index) =>
        message.type === MessageTypeEnum.TRANSCRIPT ? (
          <ConversationMessage
            message={
              activeTranscript &&
              activeTranscript.role === message.role &&
              index === messages.length - 1
                ? {
                    ...message,
                    transcript:
                      message.transcript + activeTranscript.transcript,
                  }
                : message
            }
            key={message.type + message?.role + index}
          />
        ) : message.type === MessageTypeEnum.FUNCTION_CALL_RESULT ? (
          <CitationList options={message} key={message.type + index} />
        ) : null,
      )}
      {activeTranscript &&
      (!lastMessage ||
        lastMessage.type !== MessageTypeEnum.TRANSCRIPT ||
        activeTranscript.role !== lastMessage?.role) ? (
        <ConversationMessage message={activeTranscript} />
      ) : null}
    </>
  )
}
