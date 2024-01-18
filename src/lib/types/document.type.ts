import { DocumentColorEnum } from '../utils/colors'

export interface PdfDocument {
  id: string
  url: string
  fullName: string
  color: DocumentColorEnum
}

export interface Citation {
  document_id: string
  text: string
  page_number: number
  score: number
  color?: DocumentColorEnum
}
