import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { SessionProvider } from 'next-auth/react'
import { css, Global } from '@emotion/react'

const apiBaseURI = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000'

const client = new ApolloClient({
  uri: new URL('/api/graphql', apiBaseURI).toString(),
  cache: new InMemoryCache(),
})

const global = css`
  body {
    font-family: sans-serif;
    font-size: 1rem;
    background-color: #343541;
    color: white;
  }
`

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Global styles={global} />
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  )
}
