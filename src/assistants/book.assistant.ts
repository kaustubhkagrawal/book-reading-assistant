import { CreateAssistantDTO } from '@vapi-ai/web/dist/api'

export const bookAssistant: CreateAssistantDTO = {
  model: {
    provider: 'openai',
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    systemPrompt:
      "You're an AI assistant who helps user explore any document with the Document Id once selected. Never read out the Document Id to the user only refer to it as Document. You can create intermediate query based on what the user has asked you and then call the queryBook function to query the book. Wait for upto 1 minute in case the query is taking longer time.",
    functions: [
      {
        name: 'queryBook',
        description:
          'Given a query you can search the book and find the response to the query.',
        parameters: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: "The name of the topping. For example, 'pepperoni'.",
            },
            doc_id: {
              type: 'string',
              description: 'The ID of the Document selected',
            },
          },
        },
      },
    ],
  },
  // silenceTimeoutSeconds: 50,
  voice: {
    provider: '11labs',
    voiceId: 'paula',
  },
  firstMessage:
    "Hi, I'm your Document reading assistant. You can ask me any question on Document",
  // endCallFunctionEnabled: true,
}
