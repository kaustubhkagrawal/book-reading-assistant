import { envConfig } from '@/config/env.config'
import axios from 'axios'

export const ragApiInstance = axios.create({
  baseURL: envConfig.ragUrl,
})

export const vapiApiInstance = axios.create({
  baseURL: envConfig.vapi.apiUrl,
  headers: {
    Authorization: 'Bearer ' + envConfig.vapi.token,
  },
})
