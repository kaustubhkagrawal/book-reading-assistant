This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm install

cp example.env .env

pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This repo has the FE of the book-reading assistant. You can talk with any document. This Project also has a serverless endpoint which is used as a serverURL middleware for Vapi. In terms for voice based assistant, we are using Vapi AI.

There is a RAG Backend, which is responsible for managing document and doing RAG queries on the Document.
The Repository for RAG backend is [https://github.com/kaustubhkagrawal/doc-assistant-backend](https://github.com/kaustubhkagrawal/doc-assistant-backend)
