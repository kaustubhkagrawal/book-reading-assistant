import { envConfig } from '@/config/env.config'
import { CreateAssistantDTO } from '@vapi-ai/web/dist/api'
import axios from 'axios'
import { ragApiInstance } from '.'

export const createAssistant = (documentId: string) => {
  return ragApiInstance
    .get(`/assistant/${documentId}`)
    .then((response) => response.data)
    .catch((error) => console.log(error))
}
