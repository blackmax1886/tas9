import type { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { SessionProvider } from 'next-auth/react'
import { css, Global } from '@emotion/react'
import { NextComponentType } from 'next'
import { RootLayout, GuardLayout } from '@/components/layout'

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
