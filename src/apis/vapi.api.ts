import { envConfig } from '@/config/env.config'
import { CreateAssistantDTO } from '@vapi-ai/web/dist/api'
import axios from 'axios'

export const createAssistant = (assistantDTO: CreateAssistantDTO) => {
  return axios
    .post(`${envConfig.apiUrl}/api/persist-assistant`, assistantDTO)
    .then((response) => response.data)
    .catch((error) => console.log(error))
}
