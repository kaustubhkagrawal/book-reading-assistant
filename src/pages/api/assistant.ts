// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type Data = {
  message?: string
  data?: any
  response?: string
}

const ragUrl = process.env.NEXT_PUBLIC_RAG_URL ?? 'http://localhost:8000/api'

const dictionary = {
  checkDeliveryStatus: () => {},
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
        if (functionCall?.name === 'queryBook') {
          const parameters = functionCall?.parameters

          if (parameters?.query) {
            const response = await axios.post<{ response: string }>(
              `${ragUrl}/query`,
              parameters,
            )

            console.log('response, ', response.data)

            return res.status(201).json(response.data)
          } else {
            return res.status(400).json({ message: 'Empty Query provided.' })
          }
        }

        return res.status(201).json({ data: functionCall?.parameters })
      }

      return res.status(201).json({})
    }

    return res.status(404).json({ message: 'Not Found' })
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
