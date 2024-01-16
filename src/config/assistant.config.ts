import { CreateAssistantDTO } from '@vapi-ai/web/dist/api'

export const assistantConfig: CreateAssistantDTO = {
  model: {
    provider: 'openai',
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    systemPrompt:
      "You're a pizza ordering assistant. The user will ask for toppings, you'll add them. When they're done, you'll redirect them to checkout and help them place order and track their delivery status.",
    functions: [
      {
        name: 'addTopping',
        description:
          'Used to add a topping to the pizza. and returns the cartId if successful.',
        parameters: {
          type: 'object',
          properties: {
            topping: {
              type: 'string',
              description: "The name of the topping. For example, 'pepperoni'.",
            },
          },
        },
      },
      {
        name: 'goToCheckout',
        description:
          'Redirects the user to checkout and order their pizza. Will Then redirect the user to check if the delivery agent has been assigned.',
        parameters: {
          type: 'object',
          properties: {
            cartId: {
              type: 'string',
              description: 'The cart Id created when pizza was customized.',
            },
          },
        },
      },
      {
        name: 'checkDeliveryStatus',
        description:
          'Check the delivery status and remaining time to delivery for a particular order using order Id. It returns whether the delivery agent was assigned, has the order been picked up, and what is the estimated delivery time.',
        parameters: {
          type: 'object',
          properties: {
            cartId: {
              type: 'string',
              description:
                'The order Id created when pizza order was placed during checkout.',
            },
          },
        },
      },
    ],
  },
  voice: {
    provider: '11labs',
    voiceId: 'paula',
  },
  firstMessage:
    "Hi, I'm the pizza ordering assistant. What toppings would you like?",
}
