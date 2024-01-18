import {
  Message,
  MessageTypeEnum,
  TranscriptMessage,
  TranscriptMessageTypeEnum,
} from '@/types/conversation.type'

export enum MessageActionTypeEnum {
  UPDATE_LAST_MESSAGE = 'UPDATE_LAST_MESSAGE',
}

export function useMessages(messages: Message[], action: any) {
  const { payload: message } = action

  const hasLastTransMsg =
    messages.length > 0 &&
    messages[messages.length - 1].type === MessageTypeEnum.TRANSCRIPT

  const lastMessage: TranscriptMessage | null =
    messages.length > 0
      ? (messages[messages.length - 1] as TranscriptMessage)
      : null

  const transcriptMatchFlag =
    hasLastTransMsg &&
    message.type === MessageTypeEnum.TRANSCRIPT &&
    lastMessage?.role === message.role

  const needsAppend =
    message.type !== MessageTypeEnum.TRANSCRIPT ||
    ((messages.length === 0 ||
      (lastMessage && lastMessage?.role !== message.role)) &&
      message.transcriptType === TranscriptMessageTypeEnum.FINAL)

  const needsModifyLastMsg =
    transcriptMatchFlag &&
    message.transcriptType === TranscriptMessageTypeEnum.FINAL

  console.log('needsAppend', needsAppend, lastMessage, message, messages)

  if (needsAppend) {
    return [...messages, message]
  } else if (needsModifyLastMsg) {
    return [
      ...messages.slice(0, -1),
      {
        ...message,
        transcript:
          (lastMessage as TranscriptMessage)?.transcript + message.transcript,
      } as TranscriptMessage,
    ]
  }

  return messages
}
