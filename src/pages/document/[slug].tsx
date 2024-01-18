import { ViewPdf } from '@/components/pdfViewer/ViewPdf'
import { Conversation } from '@/components/widgets/Conversation/Conversation'
import { envConfig } from '@/config/env.config'
import { PdfFocusProvider } from '@/lib/context/PdfContext'
import { DocumentColorEnum } from '@/lib/utils/colors'
import { getFilenameFromUrl } from '@/lib/utils/utils'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils/utils'
import { Inter } from 'next/font/google'
import { fetchDocument } from '@/apis'

const inter = Inter({ subsets: ['latin'] })

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
      fetchDocument(docId).then((response) => setDocument(response.data))
    }
  }, [docId])

  if (!document) {
    return <span>Loading...</span>
  }

  return (
    <PdfFocusProvider>
      <div className={cn('flex', inter.className)}>
        <ViewPdf
          file={{
            url: document.url,
            id: document.id,
            color: DocumentColorEnum.blue,
            fullName: getFilenameFromUrl(document.url) ?? 'Document',
          }}
        />
        <Conversation docId={docId} />
      </div>
    </PdfFocusProvider>
  )
}

export default DocumentConversation
