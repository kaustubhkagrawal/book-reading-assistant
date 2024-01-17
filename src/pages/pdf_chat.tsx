import * as React from 'react'
import dynamic from 'next/dynamic'

const PdfViewerComp = dynamic(
  () => import('../components/pdfViewer/PdfViewer'),
  {
    ssr: false,
  },
)

const PdfChat = () => {
  return <PdfViewerComp />
}

export default PdfChat
