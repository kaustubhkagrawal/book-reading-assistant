'use client'

import { useCallback, useState } from 'react'
import { useResizeObserver } from '@wojtekmaj/react-hooks'
import { pdfjs, Document, Page, Outline } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

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

export default function Sample() {
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [searchText, setSearchText] = useState('')
  const [file, setFile] = useState<PDFFile>(
    'https://arxiv.org/pdf/2401.02412.pdf',
  )

  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null)
  const [containerWidth, setContainerWidth] = useState<number>()

  const textRenderer = useCallback(
    (textItem) => highlightPattern(textItem.str, searchText),
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
  function onChange(event) {
    setSearchText(event.target.value)
  }

  return (
    <div className="Example__container__document" ref={setContainerRef}>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess as any}
        options={options}
        onItemClick={onItemClick}
      >
        <Outline
        // onItemClick={onItemClick}
        />
        <Page pageNumber={pageNumber} customTextRenderer={textRenderer} />

        {/* {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={
                  containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
                }
              />
            ))} */}
      </Document>
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </p>
        <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </div>
  )
}
