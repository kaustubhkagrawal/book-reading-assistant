import { Html, Head, Main, NextScript } from 'next/document'

import { NextUIProvider } from '@nextui-org/react'

export default function Document() {
  return (
    <NextUIProvider>
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    </NextUIProvider>
  )
}
