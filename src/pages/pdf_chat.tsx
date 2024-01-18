import { VapiButton } from '@/components/widgets/Conversation/VapiButton'
import { ViewPdf } from '../components/pdfViewer/ViewPdf'
import { PdfFocusProvider } from '../lib/context/pdf'
import { DocumentColorEnum } from '../utils/colors'

// const PdfViewerComp = dynamic(() => import('../components/pdfViewer/index'), {
//   ssr: false,
// })

const PdfChat = () => {
  // return <PdfViewerComp />
  return (
    <div className="flex">
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
      {/* <VapiButton /> */}
    </div>
  )
}

export default PdfChat
