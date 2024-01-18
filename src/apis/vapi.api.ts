import { CreateAssistantDTO } from '@vapi-ai/web/dist/api'
import axios from 'axios'

export const createAssistant = (assistantDTO: CreateAssistantDTO) => {
  return axios
    .post(`/api/persist-assistant`, assistantDTO)
    .then((response) => response.data)
    .catch((error) => console.log(error))
}
