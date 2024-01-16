// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message?: string
  data?: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'POST') {
    const { message } = req.body

    const { type = 'function-call', functionCall = {}, call } = message
    console.log('callObj', call)

    if (type === 'function-call') {
      res.status(201).json({ data: functionCall?.parameters })
    }

    res.status(201).json({})
  }

  res.status(404).json({ message: 'Not Found' })
}
