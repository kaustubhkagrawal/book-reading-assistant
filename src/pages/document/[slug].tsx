import { ViewPdf } from '@/components/pdfViewer/ViewPdf'
import { Conversation } from '@/components/widgets/Conversation/Conversation'
import { VapiButton } from '@/components/widgets/Conversation/VapiButton'
import { envConfig } from '@/config/env.config'
import { PdfFocusProvider } from '@/lib/context/pdf'
import { DocumentColorEnum } from '@/utils/colors'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// const PdfViewerComp = dynamic(() => import('../components/pdfViewer/index'), {
//   ssr: false,
// })

const DocumentConversation = () => {
  const [document, setDocument] = useState<any>(null)

  const router = useRouter()
  const docId =
    (typeof router.query.slug === 'string'
      ? router.query.slug
      : (router.query.slug ?? [])[0]) ?? ''

  console.log({ docId })

  useEffect(() => {
    if (docId) {
      axios
        .get(`${envConfig.ragUrl}/documents/${docId}`)
        .then((response) => setDocument(response.data))
    }
  }, [docId])
  // return <PdfViewerComp />

  if (!document) {
    return <span>Loading...</span>
  }

  return (
    <PdfFocusProvider>
      <div className="flex">
        <ViewPdf
          file={{
            url: document.url,
            id: document.id,
            color: DocumentColorEnum.blue,
            fullName: 'Document',
          }}
        />
        <Conversation docId={docId} />
      </div>
    </PdfFocusProvider>
  )
}

export default DocumentConversation
