import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const apiBaseURI =
  process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000/'

const client = new ApolloClient({
  uri: new URL('/api/graphql', apiBaseURI).href,
  cache: new InMemoryCache(),
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
