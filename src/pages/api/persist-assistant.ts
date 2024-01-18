// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Assistant } from '@vapi-ai/web/dist/api'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const vapiUrl = process.env.NEXT_PUBLIC_VAPI_API_URL ?? 'https://api.vapi.ai'
const vapiSecret = process.env.NEXT_PUBLIC_VAPI_NODE_TOKEN ?? ''

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Assistant | { message: string }>,
) {
  try {
    if (req.method === 'POST') {
      const assistantDTO = req.body

      const response = await axios.post(`${vapiUrl}/assistant`, assistantDTO, {
        headers: {
          Authorization: 'Bearer ' + vapiSecret,
        },
      })

      return res.status(201).json(response.data)
    }

    return res.status(404).json({ message: 'Not Found' })
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
