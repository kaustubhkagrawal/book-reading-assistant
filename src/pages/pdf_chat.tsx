import * as React from 'react'
import dynamic from 'next/dynamic'
import { ViewPdf } from '../components/pdfViewer/ViewPdf'
import { DocumentType } from '../types/document.type'
import { DocumentColorEnum } from '../utils/colors'
import { PdfFocusProvider } from '../context/pdf'

// const PdfViewerComp = dynamic(() => import('../components/pdfViewer/index'), {
//   ssr: false,
// })

const PdfChat = () => {
  // return <PdfViewerComp />
  return (
    <PdfFocusProvider>
      <ViewPdf
        file={{
          url: 'https://arxiv.org/pdf/2401.02412.pdf',
          id: 'id_1',
          color: DocumentColorEnum.blue,
          fullName: 'Testing pdf demo',
        }}
      />
    </PdfFocusProvider>
  )
}

export default PdfChat
