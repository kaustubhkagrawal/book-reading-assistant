import { DocumentColorEnum } from '../utils/colors'
import { object } from 'zod'

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
