import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { css, Global } from '@emotion/react'
import { NextComponentType } from 'next'
import { SessionProvider } from 'next-auth/react'

import type { AppProps } from 'next/app'

import { RootLayout, GuardLayout } from '@/components/Layout'

type CustomAppProps = AppProps & {
  Component: NextComponentType & { isRootPage?: boolean }
}

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
    width: 100%;
    min-width: 100rem;
    margin: auto;
    overflow-y: scroll;
  }

  button {
    color: inherit;
    background-color: #4caf50; /* Green */
    border: none;
    padding: 0.5rem;
    text-align: center;
    font-size: inherit;
    border-radius: 0.25rem;
    corsor: pointer;
  }
`

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  const LayoutComponent = Component.isRootPage ? RootLayout : GuardLayout
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <LayoutComponent>
          <Global styles={global} />
          <Component {...pageProps} />
        </LayoutComponent>
      </ApolloProvider>
    </SessionProvider>
  )
}
