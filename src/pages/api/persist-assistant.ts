// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Assistant } from '@vapi-ai/web/dist/api'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const vapiUrl = process.env.NEXT_PUBLIC_VAPI_API_URL ?? 'https://api.vapi.ai'
const vapiSecret = process.env.NEXT_PUBLIC_VAPI_NODE_TOKEN ?? ''

// CORS middleware wrapper
const allowCors =
  (fn: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, OPTIONS, PATCH, DELETE, POST, PUT',
    )
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    )

    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }

    return await fn(req, res)
  }

async function handler(
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

export default allowCors(handler)
