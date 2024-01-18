import { ViewPdf } from '../components/pdfViewer/ViewPdf'
import { PdfFocusProvider } from '../lib/context/PdfContext'
import { DocumentColorEnum } from '../lib/utils/colors'

const PdfChat = () => {
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
    </div>
  )
}

export default PdfChat
