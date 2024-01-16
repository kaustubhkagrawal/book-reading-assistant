// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message?: string
  data?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    if (req.method === 'POST') {
      const { message } = req.body

      const { type = 'function-call', functionCall = {}, call } = message
      console.log('payload message', message)

      if (type === 'function-call') {
        return res.status(201).json({ data: functionCall?.parameters })
      }

      return res.status(201).json({})
    }

    return res.status(404).json({ message: 'Not Found' })
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
