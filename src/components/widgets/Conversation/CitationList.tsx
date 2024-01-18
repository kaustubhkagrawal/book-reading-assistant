import { Button } from '@/components/ui/Button'
import { usePdfFocus } from '@/lib/context/pdf'
import { FunctionCallResultMessage } from '@/types/conversation.type'

interface ConversationMessageProps {
  options: FunctionCallResultMessage
}

export function CitationList({ options }: ConversationMessageProps) {
  const { functionCallResult: { sources = [] } = {} as any } = options

  const { setPdfFocusState } = usePdfFocus()

  if (!sources) return null

  const citations = sources.sort(
    (a: any, b: any) => a.page_number - b.page_number,
  )

  return (
    <div
      className={`flex w-4/5 text-sm mb-2 mt-6 justify-end text-[#1a0400] font-medium mr-auto`}
    >
      <div className={`mr-auto`}>
        {citations.map((citation: any) => (
          <Button
            key={citation.page_number + citation.document_id}
            variant={'outline'}
            onClick={() => {
              console.log('citation', citation)
              setPdfFocusState({
                documentId: citation.document_id,
                pageNumber: citation.page_number,
                citation,
              })
            }}
            className="leading-relaxed min-w-8 px-2 mx-0.5 text-sm transition-all hover:-translate-y-1"
          >
            {citation.page_number}
          </Button>
        ))}
      </div>
    </div>
  )
}
