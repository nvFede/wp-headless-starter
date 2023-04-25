import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import { client } from "../lib/apollo"
import MainLayout from '@/layouts/MainLayout'

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ApolloProvider>
  )
}
