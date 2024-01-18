import { DocumentColorEnum } from '../utils/colors'

export interface PdfDocument {
  id: string
  url: string
  fullName: string
  color: DocumentColorEnum
}
