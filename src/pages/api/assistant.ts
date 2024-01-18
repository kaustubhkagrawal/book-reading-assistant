// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message?: string
  data?: any
  response?: string
}

const ragUrl = process.env.NEXT_PUBLIC_RAG_URL ?? 'http://localhost:8000/api'

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

          console.log('call', call)

          if (parameters?.query) {
            const response = await axios.post<{ response: string }>(
              `${ragUrl}/query`,
              { query: parameters?.query, assistant_id: call.assistantId },
            )

            console.log({ parameters })

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
