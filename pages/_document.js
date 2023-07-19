import { Html, Head, Main, NextScript } from 'next/document'
import { Analytics } from '@vercel/analytics/react';


export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link rel="stylesheet" href="https://use.typekit.net/ueo8fbu.css"></link>
      <body>
        <Main />
        <NextScript />
        <Analytics />
      </body>
    </Html>
  )
}
