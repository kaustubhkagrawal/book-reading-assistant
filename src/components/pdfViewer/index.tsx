import PdfViewer from './PdfViewer'

function PdfComponent() {
  // return <ResizableDemo left={null} right={<PdfViewer />} />
  return (
    <div className="flex  self-center">
      <div className="flex-1">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et adipisci
        laudantium quam nulla vitae explicabo a natus tempore neque obcaecati,
        consequuntur sequi beatae assumenda maiores reiciendis excepturi rerum
        commodi porro.
      </div>
      <div className="flex-1 ">
        <PdfViewer />
      </div>
    </div>
  )
}

export default PdfComponent
