'use client'

import { Pagination } from '@nextui-org/pagination'
import { useCallback, useState } from 'react'
import { useResizeObserver } from '@wojtekmaj/react-hooks'
import { pdfjs, Document, Page, Outline } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import { PaginationComp } from './PaginationComp'
import { TextItem } from 'pdfjs-dist/types/src/display/api'

// import type { PDFDocumentProxy } from 'pdfjs-dist'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
}

function highlightPattern(text: string, pattern: string) {
  // console.log('string found for pattern - ', {
  //   searchStr,
  //   vale: text.search(JSON.parse(`"${searchStr}"`)),
  // })

  const stringWithEscapedTabs = text.replace(/(\s|’)/g, (match) => {
    if (match === ' ') {
      return '\\t'
    } else {
      return '\\u2019'
    }
  })

  return stringWithEscapedTabs.replace(
    pattern,
    (value) => `<mark>${value}</mark>`,
  )
}

const resizeObserverOptions = {}

const maxWidth = 800

type PDFFile = string | File | null

type PdfViewerProps = {
  file?: PDFFile
}
export default function PdfViewer(props: PdfViewerProps) {
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [searchText, setSearchText] = useState('')
  const [file, setFile] = useState<PDFFile>(
    props.file || 'https://arxiv.org/pdf/2401.02412.pdf',
  )

  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null)
  const [containerWidth, setContainerWidth] = useState<number>()

  const textRenderer = useCallback(
    (textItem: TextItem) => highlightPattern(textItem.str, searchText),
    [searchText],
  )

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries

    if (entry) {
      setContainerWidth(entry.contentRect.width)
    }
  }, [])

  useResizeObserver(containerRef, resizeObserverOptions, onResize)

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target

    if (files && files[0]) {
      setFile(files[0] || null)
    }
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }: any): void {
    setNumPages(nextNumPages)
    setPageNumber(1)
  }

  function onItemClick({ pageNumber: itemPageNumber }: any) {
    setPageNumber(itemPageNumber)
  }
  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset)
  }

  function previousPage() {
    changePage(-1)
  }

  function nextPage() {
    changePage(1)
  }

  return (
    <div className="flex flex-col overflow-scroll" ref={setContainerRef}>
      {/* <Pagination
        isCompact
        showControls
        total={numPages}
        initialPage={1}
        onChange={(nextPage) => setPageNumber(nextPage)}
        className="fixed z-10"
        classNames={
          {
            // wrapper: 'gap-0 overflow-visible h-8 rounded border border-divider',
            // item: 'w-8 h-8 text-small rounded-none bg-transparent',
            // cursor:
            //   'bg-gradient-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold',
          }
        }
      /> */}
      <div className={'h-screen overflow-scroll self-stretch'}>
        <Document
          className={''}
          file={file}
          onLoadSuccess={onDocumentLoadSuccess as any}
          options={options}
          onItemClick={onItemClick}
        >
          {/* <Outline /> */}
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              customTextRenderer={textRenderer}
              width={containerWidth}
            />
          ))}
        </Document>
      </div>
    </div>
  )
}
