import { Avatar } from '@/components/ui/Avatar'
import {
  Message,
  MessageRoleEnum,
  TranscriptMessage,
} from '@/types/conversation.type'
import React from 'react'

interface ConversationMessageProps {
  message: TranscriptMessage
}

export default function ConversationMessage({
  message,
}: ConversationMessageProps) {
  return (
    <div
      className={`flex w-4/5 text-sm mb-4 justify-end text-[#1a0400] font-medium ${
        message.role == MessageRoleEnum.USER ? 'ml-auto' : 'mr-auto'
      }`}
    >
      <div
        className={`p-3 ${
          message.role !== MessageRoleEnum.USER
            ? 'rounded-r-xl bg-blue-200 mr-auto'
            : 'rounded-l-xl bg-orange-100 ml-auto'
        } rounded-t-xl`}
      >
        <p className="leading-relaxed">{message.transcript}</p>
      </div>
    </div>
  )
}
