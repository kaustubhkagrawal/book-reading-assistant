export const envConfig = {
  ragUrl: process.env.NEXT_PUBLIC_RAG_URL ?? 'http://localhost:8000/api',
  vapi: {
    apiUrl: process.env.NEXT_PUBLIC_VAPI_API_URL ?? 'https://api.vapi.ai',
    token: process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN ?? 'vapi-web-token',
  },
}
